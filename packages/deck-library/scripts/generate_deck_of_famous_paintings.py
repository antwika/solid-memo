#!/usr/bin/env python3
"""Build the "Famous paintings" deck (picture -> title, painter and date) from
Wikidata and Wikimedia Commons, in the solid-memo Turtle deck format.

Generates decks/famous-paintings.ttl. Python 3.10+, standard library only.
Everything is fetched on every run (a few minutes, most of it one HEAD request
per picture); nothing is written to disk except the deck.

USAGE
  python3 scripts/generate_deck_of_famous_paintings.py \\
      -o decks/famous-paintings.ttl --creator "Name <email>"

  --top (default 150) sets the number of cards, --max-bytes (default 3 MB) the
  largest picture a card may link to, --width (default 1280) the width of the
  thumbnails linked.

SOURCES (all fetched on every run)
  Wikidata  https://www.wikidata.org                   CC0 1.0
            which paintings, their titles, painters and dates. Queried through
            the QLever mirror (https://qlever.dev/wikidata): the ranking query
            below times out on query.wikidata.org.
  Commons   https://commons.wikimedia.org              public domain only
            the pictures, linked (never copied) as Commons' own JPEG thumbnails.

METHOD
  1. Paintings (Q3305213) with a picture (P18) are ranked by their number of
     sitelinks, i.e. how many Wikipedias have an article about them: a rough
     but language-neutral measure of fame. Mona Lisa has 146.
  2. A painting is kept only when
       * it has an English title (or a "mul" one: Wikidata keeps names that
         are the same in every language, such as most painters', under the
         language code "mul" instead of repeating them per language);
       * every painter (P170) is known and named, with a date of death more than 70
         years before this year, so the painting is out of copyright
         everywhere that counts life + 70 years;
       * its Commons file is marked "Public domain" (no CC0, no CC BY-SA
         photos of a painting on a gallery wall), not copyrighted, with no
         attribution required and no restrictions noted (personality rights,
         trademarks, ...), so the deck's one Commons source, under the
         Public Domain Mark, is true of every card;
       * its thumbnail, at --width pixels, loads (HTTP 200) as image/jpeg and
         is at most --max-bytes. The originals are unusable as they are: a
         median of 7 MB, the largest 750 MB, some TIFF or PNG.
  3. The same file, or the same title by the same painters, is kept once:
     Wikidata has several items for some paintings.
  4. The back reads "Title — Painter, date". The date is the inception (P571)
     at its most precise statement: a year ("1889"), a decade ("1500s"), or
     left out when Wikidata knows only the century. A date after the
     painters' deaths is a mistake and ignored (one run dated Courbet's
     A Burial at Ornans 2020).

  Cards are "#q<Wikidata id>", so a card keeps its id when its title or
  picture is corrected in a later release.

REVIEW BEFORE RELEASING
  Wikidata's labels are edited by anyone and are sometimes vandalised (a run
  found "The Coronation of Gabo Napoleon"). The run prints every card; read
  the list before releasing a deck made from it. Wrong titles go in
  TITLE_FIXES, paintings that should not be in the deck in EXCLUDED.

PROVENANCE IN THE DECK
  As in generate_decks_for_swedish_learning.py: prov:wasDerivedFrom the two
  sources, and prov:wasGeneratedBy an activity naming the exact command line
  and this script, pinned to the commit at HEAD when the script is committed
  and unmodified there (otherwise to main, with a warning).
"""

from __future__ import annotations

import argparse
import csv
import io
import json
import os
import re
import shlex
import subprocess
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path

QLEVER_URL = "https://qlever.dev/api/wikidata"
COMMONS_API = "https://commons.wikimedia.org/w/api.php"
USER_AGENT = "solid-memo deck generator (https://github.com/antwika/solid-memo)"

WIKIDATA = "https://www.wikidata.org/"
COMMONS = "https://commons.wikimedia.org/"
CC0 = "<https://creativecommons.org/publicdomain/zero/1.0/>"
PD_MARK = "<https://creativecommons.org/publicdomain/mark/1.0/>"

# Candidates fetched per card wanted: about a third are dropped by the filters.
OVERFETCH = 3

# Wikidata titles found wrong in review (vandalism, typos), by item. Better
# still, fix them on Wikidata too; an entry can go once Wikidata agrees.
TITLE_FIXES: dict[str, str] = {
    "Q1231009": "The Coronation of Napoleon",  # was "The Coronation of Gabo Napoleon"
    "Q1133420": "The Surrender of Breda",  # was "The Surrender of Brea"
}

# Paintings left out on review, by item, with the reason.
EXCLUDED: dict[str, str] = {
    "Q2045726": "lost; its Commons picture is Rubens's copy, not Leonardo's painting",
    # Pictures whose public-domain status carries a caveat.
    "Q1065493": "Tate claims copyright in its photograph (possible in the UK)",  # Ophelia, Millais
    "Q1899740": "picture from the Yorck Project DVD, under its compilation notice",  # Assumption of the Virgin, Titian
    # Nudity, left out so the deck suits every audience.
    "Q334138": "nudity",  # L'Origine du monde, Courbet
    "Q152867": "nudity",  # La maja desnuda, Goya
    "Q737062": "nudity",  # Olympia, Manet
    "Q727875": "nudity",  # Venus of Urbino, Titian
    "Q500812": "nudity",  # Sleeping Venus, Giorgione and Titian
    "Q1283024": "nudity",  # The Birth of Venus, Bouguereau
    "Q326503": "nudity",  # The Sleepers, Courbet
    "Q153441": "nudity",  # La fornarina, Raphael
    "Q1215604": "nudity",  # The Source, Ingres
    "Q2293936": "nudity",  # Self-Portrait as Bacchus, Caravaggio
    "Q2294441": "nudity",  # Danaë, Rembrandt
    "Q2027662": "nudity",  # The Turkish Bath, Ingres
    "Q794077": "nudity",  # Sacred and Profane Love, Titian
    "Q2360329": "nudity",  # Three Graces, Raphael
    "Q1430990": "nudity",  # Venus, Cupid, Folly and Time, Bronzino
}

QUERY = """\
PREFIX wd: <http://www.wikidata.org/entity/>
PREFIX wdt: <http://www.wikidata.org/prop/direct/>
PREFIX p: <http://www.wikidata.org/prop/>
PREFIX psv: <http://www.wikidata.org/prop/statement/value/>
PREFIX wikibase: <http://wikiba.se/ontology#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
SELECT ?p ?label ?img ?links ?creator ?creatorLabel ?died ?inception ?precision WHERE {
  { SELECT ?p ?links WHERE { ?p wdt:P31 wd:Q3305213 ; wikibase:sitelinks ?links }
    ORDER BY DESC(?links) LIMIT %d }
  ?p wdt:P18 ?img .
  OPTIONAL { ?p rdfs:label ?en FILTER(LANG(?en) = "en") }
  OPTIONAL { ?p rdfs:label ?mul FILTER(LANG(?mul) = "mul") }
  BIND(COALESCE(?en, ?mul) AS ?label)
  OPTIONAL { ?p wdt:P170 ?creator .
             OPTIONAL { ?creator rdfs:label ?creatorEn FILTER(LANG(?creatorEn) = "en") }
             OPTIONAL { ?creator rdfs:label ?creatorMul FILTER(LANG(?creatorMul) = "mul") }
             BIND(COALESCE(?creatorEn, ?creatorMul) AS ?creatorLabel)
             OPTIONAL { ?creator wdt:P570 ?died } }
  OPTIONAL { ?p p:P571/psv:P571 [ wikibase:timeValue ?inception ; wikibase:timePrecision ?precision ] }
}
"""


def open_url(url: str, *, method: str = "GET", data: bytes | None = None, accept: str | None = None):
    headers = {"User-Agent": USER_AGENT}
    if accept:
        headers["Accept"] = accept
    req = urllib.request.Request(url, method=method, data=data, headers=headers)
    for attempt in range(4):
        try:
            return urllib.request.urlopen(req, timeout=120)
        except urllib.error.HTTPError as e:
            if e.code not in (429, 500, 502, 503, 504) or attempt == 3:
                raise
        time.sleep(2 ** attempt)
    raise AssertionError("unreachable")


# --------------------------------------------------------------------------- Wikidata


@dataclass
class Painting:
    qid: str
    links: int
    file: str  # Commons file name, without "File:"
    title: str | None = None
    creators: dict[str, tuple[str | None, int | None]] = field(default_factory=dict)  # id -> (name, death year)
    inceptions: set[tuple[int, int]] = field(default_factory=set)  # (year, precision)

    def date(self) -> str | None:
        """The inception at its most precise statement: "1889", "1500s", or None.

        Statements dated after the painters' deaths are ignored: they are
        mistakes, or the date of something else (a restoration, an acquisition).
        """
        last_death = max((year for _, year in self.creators.values() if year is not None), default=None)
        possible = {(y, p) for y, p in self.inceptions if last_death is None or y <= last_death}
        if not possible:
            return None
        year, precision = min(possible, key=lambda yp: (-yp[1], yp[0]))
        if precision >= 9:
            return str(year)
        if precision == 8:
            return f"{year // 10 * 10}s"
        return None

    def painters(self) -> str:
        names = sorted(name for name, _ in self.creators.values() if name)
        return names[0] if len(names) == 1 else ", ".join(names[:-1]) + " and " + names[-1]


def load_paintings(candidates: int) -> list[Painting]:
    print(f"querying {QLEVER_URL} for the {candidates} paintings with the most sitelinks", file=sys.stderr)
    body = urllib.parse.urlencode({"query": QUERY % candidates}).encode()
    with open_url(QLEVER_URL, method="POST", data=body, accept="text/csv") as resp:
        rows = list(csv.DictReader(io.TextIOWrapper(resp, encoding="utf-8")))

    paintings: dict[str, Painting] = {}
    for row in rows:
        qid = row["p"].rsplit("/", 1)[1]
        file = urllib.parse.unquote(row["img"].split("Special:FilePath/", 1)[1])
        # an item with several pictures keeps the first one
        painting = paintings.setdefault(qid, Painting(qid, int(row["links"]), file))
        painting.title = TITLE_FIXES.get(qid) or painting.title or row["label"] or None
        if row["creator"]:
            cid = row["creator"].rsplit("/", 1)[1]
            died = int(row["died"][:5].rstrip("-")) if row["died"][:1].isdigit() else None
            name, known = painting.creators.get(cid, (None, None))
            # several dates of death: the latest is the safe one for copyright
            latest = max((d for d in (known, died) if d is not None), default=None)
            painting.creators[cid] = (name or row["creatorLabel"] or None, latest)
        if row["inception"][:1].isdigit() and row["precision"]:
            painting.inceptions.add((int(row["inception"][:4]), int(row["precision"])))
    return sorted(paintings.values(), key=lambda p: -p.links)


# --------------------------------------------------------------------------- Commons


@dataclass
class Picture:
    licence: str | None
    thumb: str | None
    unrestricted: bool = False  # not copyrighted, no attribution required, no restrictions noted

    def public_domain(self) -> bool:
        return self.licence == "Public domain" and self.unrestricted


def load_pictures(files: list[str], width: int) -> dict[str, Picture]:
    """Commons file name -> its licence and the URL of its thumbnail at `width`."""
    print(f"asking Commons for the licences and thumbnails of {len(files)} files", file=sys.stderr)
    pictures: dict[str, Picture] = {}
    for i in range(0, len(files), 50):
        params = {
            "action": "query", "format": "json", "formatversion": "2",
            "titles": "|".join("File:" + f for f in files[i:i + 50]),
            "prop": "imageinfo", "iiprop": "extmetadata|url", "iiurlwidth": str(width),
        }
        with open_url(COMMONS_API + "?" + urllib.parse.urlencode(params)) as resp:
            data = json.load(resp)
        # the API answers with normalized titles ("_" -> " "); map them back
        titles = {n["to"]: n["from"] for n in data["query"].get("normalized", [])}
        for page in data["query"]["pages"]:
            file = titles.get(page["title"], page["title"]).removeprefix("File:")
            info = (page.get("imageinfo") or [{}])[0]
            meta = {k: v.get("value") for k, v in info.get("extmetadata", {}).items()}
            unrestricted = (meta.get("Copyrighted") == "False" and meta.get("AttributionRequired") == "false"
                            and not meta.get("Restrictions"))
            thumb = info.get("thumburl", "").split("?", 1)[0] or None  # drop the utm_ tracking query
            pictures[file] = Picture(meta.get("LicenseShortName"), thumb, unrestricted)
    return pictures


def check_thumbnail(url: str, max_bytes: int) -> str | None:
    """None when the thumbnail loads as a JPEG of at most max_bytes, else why not."""
    try:
        with open_url(url, method="HEAD") as resp:
            kind = resp.headers.get("Content-Type", "")
            size = int(resp.headers.get("Content-Length", -1))
    except (urllib.error.URLError, TimeoutError) as e:
        return f"does not load ({e})"
    if kind != "image/jpeg":
        return f"is {kind or 'of no type'}, not image/jpeg"
    if size < 0:
        return "has no Content-Length"
    if size > max_bytes:
        return f"is {size / 1e6:.1f} MB"
    return None


# --------------------------------------------------------------------------- selection


def select(paintings: list[Painting], pictures: dict[str, Picture], *, top: int,
           max_bytes: int, this_year: int) -> list[tuple[Painting, str]]:
    cards: list[tuple[Painting, str]] = []
    seen_files: set[str] = set()
    seen_works: set[tuple[str, frozenset[str]]] = set()
    skipped: dict[str, int] = {}

    def skip(reason: str, painting: Painting, detail: str = "") -> None:
        skipped[reason] = skipped.get(reason, 0) + 1
        print(f"  skip {painting.qid} {painting.title or '?'}: {reason}{detail}", file=sys.stderr)

    for painting in paintings:
        if len(cards) >= top:
            break
        if painting.qid in EXCLUDED:
            skip("excluded on review", painting, f": {EXCLUDED[painting.qid]}")
            continue
        if not painting.title or re.fullmatch(r"Q\d+", painting.title):
            skip("no English title", painting)
            continue
        if not painting.creators or any(name is None for name, _ in painting.creators.values()):
            skip("painter unknown or unnamed", painting)
            continue
        died = [year for _, year in painting.creators.values()]
        if any(year is None or year + 70 >= this_year for year in died):
            skip("painter died within 70 years, or date of death unknown", painting)
            continue
        work = (painting.title.casefold(), frozenset(painting.creators))
        if painting.file in seen_files or work in seen_works:
            skip("duplicate", painting)
            continue
        picture = pictures.get(painting.file)
        if not picture or not picture.public_domain():
            skip("picture not public domain", painting, f" ({picture.licence if picture else 'no file'})")
            continue
        if not picture.thumb:
            skip("no thumbnail", painting)
            continue
        if problem := check_thumbnail(picture.thumb, max_bytes):
            skip("thumbnail unusable", painting, f": {problem}")
            continue
        seen_files.add(painting.file)
        seen_works.add(work)
        cards.append((painting, picture.thumb))
        time.sleep(0.05)  # be gentle with Wikimedia's servers

    print(f"kept {len(cards)}; skipped " + ", ".join(f"{n} {r}" for r, n in skipped.items()), file=sys.stderr)
    return cards


def back_text(painting: Painting) -> str:
    date = painting.date()
    return f"{painting.title} — {painting.painters()}" + (f", {date}" if date else "")


# --------------------------------------------------------------------------- provenance

REPO_URL = "https://github.com/antwika/solid-memo"


def script_provenance() -> tuple[str, str]:
    """Return (script_url, command) describing this run for the deck's PROV block.

    Pinned to the commit at HEAD when the script is committed there and
    unmodified, otherwise `main` with a warning (see the module docstring).
    """
    script = Path(__file__).resolve()

    def git(*args: str) -> str | None:
        try:
            return subprocess.run(["git", *args], cwd=script.parent, capture_output=True,
                                  text=True, check=True).stdout.strip()
        except (OSError, subprocess.CalledProcessError):
            return None

    top = git("rev-parse", "--show-toplevel")
    rel = os.path.relpath(script, top).replace(os.sep, "/") if top else script.name
    command = shlex.join(["python3", rel, *sys.argv[1:]])

    ref = "main"
    sha = git("rev-parse", "HEAD") if top else None
    tracked = top and git("ls-files", "--error-unmatch", str(script)) is not None
    clean = tracked and git("status", "--porcelain", "--", str(script)) == ""
    if sha and clean:
        ref = sha
    else:
        print(f"warning: {rel} is not committed and clean at HEAD; provenance URL will "
              f"point at 'main' instead of a commit", file=sys.stderr)
    return f"{REPO_URL}/blob/{ref}/{rel}", command


# --------------------------------------------------------------------------- Turtle


def ttl_str(s: str) -> str:
    return '"' + s.replace("\\", "\\\\").replace('"', '\\"').replace("\n", " ") + '"'


def slug(s: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def aligned(predicate: str, objects: list[str]) -> str:
    """An object list in the house style: one object per line, aligned under the first."""
    return (" ,\n" + " " * (5 + len(predicate))).join(objects)


def write_deck(path: Path, cards: list[tuple[Painting, str]], *, creator: str | None, created: str,
               script_url: str, command: str) -> None:
    description = (
        f"{len(cards)} of the world's most famous paintings, ranked by how many Wikipedias have an "
        "article about them: the painting on the front, its title, painter and date on the back. "
        "Only paintings long out of copyright are included. Titles, painters and dates from "
        "Wikidata; the pictures are public-domain reproductions on Wikimedia Commons, shown "
        "from there."
    )
    sources = [f"<{WIKIDATA}>", f"<{COMMONS}>"]
    out: list[str] = [
        f"@base <https://solid-memo.com/decks/{slug(path.stem)}> .",
        "",
        "@prefix solid-memo: <https://solid-memo.com/vocab/v1#> .",
        "@prefix dcterms:    <http://purl.org/dc/terms/> .",
        "@prefix prov:       <http://www.w3.org/ns/prov#> .",
        "@prefix rdfs:       <http://www.w3.org/2000/01/rdf-schema#> .",
        "@prefix xsd:        <http://www.w3.org/2001/XMLSchema#> .",
        "@prefix dcat:       <http://www.w3.org/ns/dcat#> .",
        "@prefix foaf:       <http://xmlns.com/foaf/0.1/> .",
        "@prefix topic:      <https://solid-memo.com/vocab/topics#> .",
        "",
        "<>",
        "    a solid-memo:Deck ,",
        "      dcat:Dataset ;",
        '    dcterms:title "Famous paintings" ;',
    ]
    creator_name, creator_email = None, None
    if creator:
        match = re.fullmatch(r"\s*(.*?)\s*<([^\s<>@]+@[^\s<>@]+)>\s*", creator)
        creator_name, creator_email = (match.group(1), match.group(2)) if match else (creator.strip(), None)
        out.append(f"    dcterms:creator <#{slug(creator_name)}> ;")
    out += [
        f"    dcterms:license {CC0} ;",
        f"    dcterms:description {ttl_str(description)} ;",
        f"    prov:wasDerivedFrom {aligned('prov:wasDerivedFrom', sources)} ;",
        "    prov:wasGeneratedBy <#generation> ;",
        f'    dcterms:created "{created}"^^xsd:dateTime ;',
        "    dcat:theme "
        + aligned("dcat:theme", ["<http://publications.europa.eu/resource/authority/data-theme/EDUC>", "topic:art"])
        + " ;",
        "    dcat:keyword " + aligned("dcat:keyword", ['"art"', '"art history"', '"paintings"']) + " ;",
        "    dcterms:language <http://publications.europa.eu/resource/authority/language/ENG> ;",
        "    solid-memo:studyDirection solid-memo:frontToBack ;",
        "    solid-memo:formatVersion 3 .",
        "",
    ]
    if creator_name is not None:
        out += [f"<#{slug(creator_name)}>", "    a foaf:Agent ;"]
        out.append(f"    foaf:name {ttl_str(creator_name)}" + (" ;" if creator_email else " ."))
        if creator_email:
            out.append(f"    foaf:mbox <mailto:{creator_email}> .")
        out.append("")
    out += [
        CC0,
        "    a dcterms:LicenseDocument .",
        "",
        PD_MARK,
        "    a dcterms:LicenseDocument .",
        "",
        "# How this deck was produced (W3C PROV-O). Re-run the command below to regenerate it.",
        "<#generation>",
        "    a prov:Activity ;",
        f'    prov:endedAtTime "{created}"^^xsd:dateTime ;',
        f"    prov:used {aligned('prov:used', sources)} ;",
        f"    prov:wasAssociatedWith <{script_url}> ;",
        f"    rdfs:comment {ttl_str(command)} .",
        "",
        f"<{script_url}>",
        "    a prov:SoftwareAgent ;",
        f"    dcterms:title {ttl_str(Path(script_url).name)} .",
        "",
        f"<{WIKIDATA}>",
        '    dcterms:title "Wikidata" ;',
        '    dcterms:creator "Wikidata contributors" ;',
        f"    dcterms:license {CC0} .",
        "",
        f"<{COMMONS}>",
        '    dcterms:title "Wikimedia Commons (public-domain reproductions of the paintings)" ;',
        '    dcterms:creator "Wikimedia Commons contributors" ;',
        f"    dcterms:license {PD_MARK} .",
    ]
    for painting, thumb in cards:
        out += [
            "",
            f"<#{painting.qid.lower()}>",
            "    a solid-memo:Card ;",
            "    solid-memo:formatVersion 2 ;",  # format 2: a card with a picture
            f'    dcterms:created "{created}"^^xsd:dateTime ;',
            f"    solid-memo:frontImage <{thumb}> ;",
            f"    solid-memo:back {ttl_str(back_text(painting))} .",
        ]

    path.write_text("\n".join(out) + "\n", encoding="utf-8")


# --------------------------------------------------------------------------- main


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("-o", "--output", type=Path, required=True, help="deck file to write (.ttl)")
    ap.add_argument("--top", type=int, default=150, help="cards in the deck (default 150)")
    ap.add_argument("--max-bytes", type=int, default=3_000_000,
                    help="largest thumbnail a card may link to, in bytes (default 3000000)")
    ap.add_argument("--width", type=int, default=1280, help="width of the linked thumbnails (default 1280)")
    ap.add_argument("--creator", default=None, help='dcterms:creator, e.g. "Name <email>"')
    args = ap.parse_args()
    if args.output.suffix != ".ttl":
        ap.error(f"{args.output}: output must be a .ttl file")

    now = datetime.now(timezone.utc)
    paintings = load_paintings(args.top * OVERFETCH)
    pictures = load_pictures(sorted({p.file for p in paintings}), args.width)
    cards = select(paintings, pictures, top=args.top, max_bytes=args.max_bytes, this_year=now.year)
    if len(cards) < args.top:
        print(f"warning: only {len(cards)} of the {args.top} cards asked for", file=sys.stderr)

    script_url, command = script_provenance()
    write_deck(args.output, cards, creator=args.creator, created=now.strftime("%Y-%m-%dT%H:%M:%S.000Z"),
               script_url=script_url, command=command)
    print(f"wrote {args.output}: {len(cards)} cards. Review them before releasing:", file=sys.stderr)
    for painting, _ in cards:
        print(f"  {painting.links:4}  {painting.qid:>10}  {back_text(painting)}", file=sys.stderr)


if __name__ == "__main__":
    main()
