#!/usr/bin/env python3
"""Build the "Swedish labour market taxonomy: occupation changes" deck (a Swedish occupation name
as it was -> what it is called today, and what changed) from the labour market
taxonomy of Arbetsförmedlingen, the Swedish Public Employment Service (the
JobTech Taxonomy), in the solid-memo Turtle deck format.

Generates decks/swedish-labour-market-taxonomy-occupation-changes.ttl. Python 3.10+, standard library
only. One snapshot of the taxonomy's occupation names is fetched per version
(~0.7 MB each); with --cache-dir they are kept, since a published version never
changes.

USAGE
  python3 scripts/generate_deck_of_swedish_labour_market_taxonomy_occupation_changes.py \\
      -o decks/swedish-labour-market-taxonomy-occupation-changes.ttl --creator "Name <email>" \\
      [--from 1] [--to 31] [--cache-dir DIR] [--verbose] [--allow-uncommitted]

  The deck starts from --from (default: version 1, the first) and runs to
  --to (default: the newest version). The script prints a report of what it
  included, excluded and adjusted and why, then the release notes and the
  `npm run deck:release` command that releases the deck with them.

SOURCE
  Arbetsmarknadstaxonomi (JobTech Taxonomy), Arbetsförmedlingen
  https://taxonomy.api.jobtechdev.se/v1/taxonomy/   CC0 1.0 (as stated in
  Arbetsförmedlingen's DCAT record on dataportal.se), so the deck is CC0 too.

METHOD
  The static dumps on data.arbetsformedlingen.se list live concepts only, so
  the deck is built from the taxonomy's GraphQL API, which returns every
  occupation-name concept of a version, deprecated ones included, with the
  live concepts each deprecated one is replaced by:

    concepts(type: "occupation-name", version: N, include_deprecated: true)
      { id preferred_label deprecated replaced_by { id preferred_label } }

  One rule decides the cards: an outdated name is a name a concept had while
  it was live and no longer has, because the concept was renamed or
  deprecated. Its card has the outdated name on the front, and on the back
  what the concept is called today (itself if live, its successors if
  deprecated, " · " between them) and how and when the name went out of use:

    Aktiemäklare -> "Finansmäklare (Ersatt i taxonomiversion 30, …)"
    Motorman -> "Motorman fartyg (Nytt namn i taxonomiversion 31, …)"
    Scentekniker -> "Teatertekniker/Scentekniker (Ny synonym: Teatertekniker, …)"
    Hamnarbetare/Stuveriarbetare -> "Hamnarbetare (Synonymen Stuveriarbetare togs bort …)"
    X -> "Ingen ersättare (Utgick i taxonomiversion N, …)"

  Not cards: an old name that is today's name give or take punctuation,
  spacing or word order ("7-9" -> "7–9", "A/B" -> "B/A"), or exactly (a new
  concept with the same name, or a name the concept has again); and an old name
  a live concept has. Concepts that had the same outdated name share one card.

  The deck is cumulative, and meant to grow by one release per taxonomy
  version: a later run adds cards and changes backs, so an imported copy keeps
  its reviews when it is upgraded. A card goes only when its name comes back
  into use, as it would then be wrong. Card ids come from the front alone
  ("<slug>-<hash>"), since the outdated name never changes; the replaced_by
  links are always read from the newest version, as the taxonomy repoints them
  rather than chaining (see below). Every card's dcterms:created is the time of
  the version its name went out of use in, so a re-run that finds nothing new
  changes no card.

  The names left out, and every inconsistency below, are printed as a report
  of what the run included, excluded and adjusted, and why, with examples
  (--verbose: every name), and written into the deck as a comment before
  <#generation>; the description sums up the exclusions.

INCONSISTENCIES IN THE TAXONOMY
  - The static dumps (all-concepts.json) list live concepts only, without
    replaced-by links: hence the GraphQL API.
  - Renamed back: version 16 put back some 200 earlier names, and version 17
    undid it. Old names are compared with today's name, not version by version.
  - Relabelled at deprecation: a deprecated concept often gets an older name
    back ("Hamnarbetare" deprecated as "Hamnarbetare/Stuveriarbetare"). Such a
    label was never in use, so it is never a card.
  - Replaced by the same name: the taxonomy often deprecates a concept and
    makes a new one with the very same name. No card.
  - Repointing: when a replacement is itself replaced, the taxonomy changes the
    older concepts' replaced_by rather than chaining, so a back can change.
  - Replacements missing: some concepts had none when deprecated and got one
    later; one version dropped the replacements of a few, and the next put
    new ones back. The back names the last replacement given, or none.
  - Revived: a few concepts were deprecated and later made live again.
  - Names reused: a deprecated name that a live concept has (e.g.
    "Skatterådgivare") is left out.

REPRODUCIBILITY
  The deck is a pure function of the taxonomy versions read, this script and
  the command line, and records all three, so it can be reproduced byte for
  byte, today or years from now:
  - the script: prov:wasGeneratedBy an activity associated with the script at
    a pinned commit, with the script's SHA-256 and the Python and Unicode
    versions it ran with (slugs and case folding depend on them). The script
    refuses to run unless it is committed and unmodified at HEAD
    (--allow-uncommitted writes a draft pointing at main);
  - the command line, without options that do not change the output
    (--cache-dir, --verbose, --allow-uncommitted);
  - every taxonomy version read: its number, publication time, the GraphQL
    query that fetched it, and a SHA-256 of the answer normalised as
    checksum() describes. Re-running checks the versions against an existing
    deck's checksums and refuses to overwrite it if one has changed.
  Nothing depends on the time or place of the run: the deck's
  dcterms:modified is the newest version's publication time, each card's
  dcterms:created that of the version it records, and the concepts are
  processed in id order.

  The description says what the deck is, not what a release did: that goes in
  the release notes, which the script writes by comparing with the deck's
  previous release, if any.

LANGUAGE
  Solid Memo is English first. The deck is in deck format 4, which states the
  title and description in several languages: English, which the app shows,
  and Swedish (TEXTS). The keywords and the notes on the cards' backs are
  English, the occupation names Swedish.
"""

from __future__ import annotations

import argparse
import collections
import hashlib
import json
import os
import re
import shlex
import subprocess
import sys
import textwrap
import unicodedata
import urllib.parse
import urllib.request
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path

API = "https://taxonomy.api.jobtechdev.se/v1/taxonomy"
TAXONOMY = f"{API}/#Taxonomi"  # the dataset's IRI in Arbetsförmedlingen's DCAT catalogue
USER_AGENT = "solid-memo deck generator (https://github.com/antwika/solid-memo)"
CONCEPT_TYPE = "occupation-name"
QUERY = (
    '{ concepts(type: "%s", version: "%d", include_deprecated: true) '
    "{ id preferred_label deprecated replaced_by { id preferred_label } } }"
)


# --------------------------------------------------------------------------- taxonomy


@dataclass
class Concept:
    id: str
    label: str
    deprecated: bool
    replaced_by: list[str]


def fetch_json(url: str) -> object:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT, "Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=300) as resp:
        return json.load(resp)


def load_versions() -> dict[int, str]:
    """Taxonomy version -> the time it was published, as an xsd:dateTime."""
    url = f"{API}/main/versions"
    print(f"fetching {url}", file=sys.stderr)
    return {
        v["taxonomy/version"]: v["taxonomy/timestamp"]
        for v in fetch_json(url)  # type: ignore[union-attr]
    }


def snapshot_url(version: int) -> str:
    return f"{API}/graphql?" + urllib.parse.urlencode({"query": QUERY % (CONCEPT_TYPE, version)})


def load_snapshot(version: int, cache_dir: Path | None) -> tuple[dict[str, Concept], str]:
    """Every occupation-name concept of a version, deprecated ones included, by
    id in id order; and the SHA-256 of the snapshot normalised (see checksum)."""
    cached = cache_dir / f"{CONCEPT_TYPE}-{version}.json" if cache_dir else None
    if cached and cached.exists():
        data = json.loads(cached.read_text(encoding="utf-8"))
    else:
        print(f"fetching {CONCEPT_TYPE} concepts of taxonomy version {version}", file=sys.stderr)
        data = fetch_json(snapshot_url(version))
        if not isinstance(data, dict) or "data" not in data or data.get("errors"):
            sys.exit(f"taxonomy version {version}: unexpected response: {json.dumps(data)[:500]}")
        if cached:
            cached.parent.mkdir(parents=True, exist_ok=True)
            cached.write_text(json.dumps(data, ensure_ascii=False), encoding="utf-8")
    concepts = sorted(data["data"]["concepts"], key=lambda c: c["id"])
    snapshot = {
        c["id"]: Concept(c["id"], c["preferred_label"].strip(), c["deprecated"],
                         sorted({r["id"] for r in c["replaced_by"] or []}))
        for c in concepts
    }
    return snapshot, checksum(concepts)


def checksum(concepts: list[dict]) -> str:
    """SHA-256 of a snapshot, normalised so that it depends on the data alone and
    not on the order or formatting of the API's response: the concepts sorted by
    id, each concept's replaced_by sorted by id, as JSON with sorted keys, no
    whitespace and UTF-8 text. Recorded in the deck per version, so a later run
    can prove it read the same taxonomy."""
    normal = [{**c, "replaced_by": sorted(c["replaced_by"] or [], key=lambda r: r["id"])}
              for c in sorted(concepts, key=lambda c: c["id"])]
    text = json.dumps(normal, sort_keys=True, ensure_ascii=False, separators=(",", ":"))
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


# --------------------------------------------------------------------------- cards


def same_name(a: str, b: str) -> bool:
    """Whether two labels differ only in dashes, commas, slashes or spacing
    ("7-9" vs "7–9", "Kock, storhushåll" vs "Kock storhushåll")."""
    norm = lambda s: " ".join(re.sub(r"[,/]", " ", re.sub(r"[‐‑‒–—−]", "-", s)).split()).casefold()
    return norm(a) == norm(b)


def name_parts(label: str) -> set[str]:
    """The names a label joins with "/", normalised: "Verkställande direktör/VD" -> {..., "vd"}."""
    return {re.sub(r"[‐‑‒–—−]", "-", " ".join(p.split())).casefold() for p in label.split("/")}


def name_change(old: str, new: str) -> tuple[str | None, list[str], list[str]]:
    """How name `old` became `new`: (kind, synonyms added, synonyms removed).
    The kind is "punctuation" (dashes, commas, slashes or spacing only, "7-9" ->
    "7–9"), "reordered" (the same "/"-joined names in another order),
    "synonym_added" ("Scentekniker" -> "Teatertekniker/Scentekniker"),
    "synonym_removed" ("Hamnarbetare/Stuveriarbetare" -> "Hamnarbetare"), or
    None for any other change."""
    if same_name(old, new):
        return "punctuation", [], []
    parts = lambda label: {name_parts(p).pop(): p.strip() for p in label.split("/")}
    a, b = parts(old), parts(new)
    if a.keys() == b.keys():
        return "reordered", [], []
    if a.keys() < b.keys():
        return "synonym_added", [b[k] for k in b if k not in a], []
    if b.keys() < a.keys():
        return "synonym_removed", [], [a[k] for k in a if k not in b]
    return None, [], []


def card_id(front: str) -> str:
    """A card's fragment id, from its front alone: the outdated name never
    changes, so neither does the id, whichever concepts the name belonged to and
    however it went out of use. The hash tells spellings apart that slug alike
    ("Kock, storhushåll" and "Kock storhushåll")."""
    return f"{slug(front)}-{hashlib.sha1(front.encode()).hexdigest()[:6]}"


def by_name(label: str) -> str:
    return label.casefold()


@dataclass
class Card:
    id: str
    front: str
    replacements: list[str]  # labels
    version: int  # the taxonomy version it records
    kind: str = "replaced"  # a key of CARD_KINDS
    concept_ids: list[str] = field(default_factory=list)
    added: list[str] = field(default_factory=list)  # synonyms, for kind "synonym_added"
    removed: list[str] = field(default_factory=list)  # synonyms, for kind "synonym_removed"


# What each kind of card says, as (title, why), for the report.
CARD_KINDS: dict[str, tuple[str, str]] = {
    "replaced": ("replaced names",
                 "a name that was live and is now deprecated, with the concepts that replace it. "
                 "Front: the old name; back: what replaces it today, and the version it was replaced in"),
    "renamed": ("renamed names",
                "a concept still in use whose earlier name differs from today's by more than "
                "punctuation, word order or synonyms"),
    "synonym_added": ("names that got a new synonym",
                      "the name is still valid, but a synonym was added to it (by a rename or by a new "
                      "concept replacing it), so the learner meets the new term; the back names it"),
    "discontinued": ("names that went out of use with nothing replacing them",
                     "the concept is deprecated and the taxonomy names no successor (yet); the back says "
                     "so, and names the successor if a later version adds one, so the card and its "
                     "reviews stay"),
    "synonym_removed": ("names that lost a synonym",
                        "a synonym in the name went out of use (by a rename or by a new concept "
                        "replacing it); the back names the synonym removed"),
}


@dataclass
class LeftOut:
    """An outdated name that is not a card, and why."""
    label: str
    concept_id: str
    version: int
    reason: str  # a key of LEFT_OUT_BECAUSE


LEFT_OUT_BECAUSE = {
    "live_name": "deprecated, but a live occupation has the same name",
    "live_old_name": "renamed, but a live occupation has the old name",
}

# Why each kind of name is or is not a card, as (section, title, reason). Used
# for the report the script prints and the comment it writes into the deck.
WHY: dict[str, tuple[str, str, str]] = {
    "live_name": ("excluded", "deprecated names a live occupation still has",
                  "another concept that is in use today has exactly this name, so a card calling "
                  "the name outdated would be wrong"),
    "live_old_name": ("excluded", "old names of renamed concepts that a live occupation has",
                      "the old name is in use today by another concept, so it is not outdated"),
    "never_live": ("excluded", "deprecated concepts that were never live in the versions read",
                   "already deprecated in the first version read, or created deprecated: nobody met "
                   "them as a current name, so there is no change to learn"),
    "same_name": ("excluded", "names replaced by a new concept with the same name",
                  "the taxonomy deprecated the concept and made a new one with the very same name: "
                  "the name did not change, so there is nothing to learn"),
    "renamed_back": ("excluded", "old names a concept has again today",
                     "the taxonomy renamed and renamed back (version 16 put back some 200 earlier "
                     "names and version 17 undid it), so old names are compared with the current "
                     "name, not version by version: the old name is the current one"),
    "punctuation": ("excluded", "changes of punctuation or spacing only",
                    "only dashes, commas, slashes or spacing changed (\"7-9\" -> \"7–9\"), whether by a "
                    "rename or by a new concept replacing the old one: nothing to learn"),
    "reordered": ("excluded", "changes of word order only",
                  "the same synonyms in another order (\"A/B\" -> \"B/A\"), whether by a rename or by a "
                  "new concept replacing the old one: nothing to learn"),
    "revived": ("excluded", "names deprecated and later taken back into use",
                "the concept is live again, so the name is not outdated; a card an earlier release had "
                "for it is removed, since it would now be wrong"),
    "relabelled_at_deprecation": ("adjusted", "concepts given another name as they were deprecated",
                                  "the taxonomy often puts back an older name on a concept it deprecates "
                                  "(\"Hamnarbetare\" deprecated as \"Hamnarbetare/Stuveriarbetare\"); "
                                  "such a label was never in use, so the card is for the name the "
                                  "concept last had while live"),
    "renamed_then_replaced": ("adjusted", "old names of concepts that were renamed and later replaced",
                              "the old name keeps its card, which now names what replaces the concept "
                              "today, so a learner who studied it keeps its reviews"),
    "replacement_missing": ("adjusted", "replaced names whose replacement the taxonomy has dropped",
                            "the newest version names nothing replacing them, though an earlier one "
                            "did: the back names the last replacement given, rather than the card "
                            "disappearing for a release"),
    "shared_name": ("adjusted", "outdated names that two concepts had",
                    "one card per name, naming the successors of both: two cards with the same front "
                    "would contradict each other"),
    "replacement_added": ("adjusted", "replaced names that had no replacement when deprecated",
                          "the taxonomy added what replaces them in a later version; the back shows "
                          "it, with the version the name went out of use in"),
    "repointed": ("adjusted", "replaced names whose replacement was itself replaced later",
                  "the taxonomy repoints the old name to the new successor instead of chaining, and "
                  "the back shows who replaces it today; a later release may change such a back"),
}

# Why the deck is built the way it is, for the report and the deck comment.
METHOD = [
    "The static dumps on data.arbetsformedlingen.se (all-concepts.json) list live concepts only, "
    "without replaced-by links, so the deck is built from the taxonomy's GraphQL API, which returns "
    "deprecated concepts and what replaces them.",
    "The taxonomy keeps replaced_by pointing at live concepts, so the latest version alone says what "
    "every outdated name is called today; the earlier versions are read only to find when each name "
    "went out of use.",
    "One rule decides the cards: an outdated name is a name a concept had while it was live and no "
    "longer has. The back names what the concept is called today (itself if live, its successors if "
    "deprecated), and how and when the name went out of use. Labels given only at deprecation are "
    "never cards.",
    "The deck is cumulative: a later release adds cards and changes backs, so a copy imported by a "
    "learner keeps its reviews when it is upgraded. A card is removed only if its name comes back into "
    "use (give or take punctuation), since the card would then be wrong.",
]


Met = dict[str, list[str]]  # a key of WHY -> one line per time it was met, e.g. "Kaplan: Komminister → …"


def build_cards(snaps: dict[int, dict[str, Concept]], since: int,
                to: int) -> tuple[list[Card], list[LeftOut], Met]:
    """The deck's cards, the names left out, and every time one of the
    taxonomy's inconsistencies (see WHY) was met.

    One rule: an outdated name is a name a concept had while it was live, and
    no longer has. Its card names what the concept is called today (itself if
    live, its successors if deprecated), and how and when the name went out of
    use. Labels a concept gets only as it is deprecated (the taxonomy often puts
    back an older name then) are never cards: nobody met them in use."""
    latest = snaps[to]
    live_labels = {c.label for c in latest.values() if not c.deprecated}
    errors: list[str] = []
    left_out: list[LeftOut] = []
    met: Met = collections.defaultdict(list)
    cards: dict[str, Card] = {}  # by front

    def live_in(cid: str, v: int) -> bool:
        return cid in snaps[v] and not snaps[v][cid].deprecated

    def labels_in(v: int, ids: list[str]) -> list[str]:
        return sorted({snaps[v][r].label for r in ids if r in snaps[v]}, key=by_name)

    def norm(label: str) -> str:
        return " ".join(re.sub(r"[,/]", " ", re.sub(r"[‐‑‒–—−]", "-", label)).split()).casefold()

    for cid, now in latest.items():
        live_versions = [v for v in range(since - 1, to + 1) if live_in(cid, v)]
        if not live_versions:
            if now.deprecated:
                met["never_live"].append(f"{now.label} ({cid})")
            continue

        # What the concept is called today.
        went = None  # the version it was deprecated in, if it is
        if not now.deprecated:
            current = [now.label]
            if any(cid in snaps[v] and snaps[v][cid].deprecated for v in range(since, to)):
                back = max(v for v in range(since, to + 1) if live_in(cid, v) and not live_in(cid, v - 1))
                met["revived"].append(f"{now.label} ({cid}): deprecated, and live again since version {back}")
        else:
            went = live_versions[-1] + 1
            last_live = snaps[live_versions[-1]][cid].label
            if now.label != last_live:
                met["relabelled_at_deprecation"].append(
                    f"{last_live} → labelled {now.label} when deprecated in version {went}")
            if now.replaced_by:
                current = []
                for rid in now.replaced_by:
                    if rid in latest and not latest[rid].deprecated:
                        current.append(latest[rid].label)
                    else:
                        errors.append(f"  {now.label!r} ({cid}) is replaced by {rid}, "
                                      f"which is not a live concept in version {to}")
                current = sorted(set(current), key=by_name)
            else:  # the taxonomy has dropped its replacement: name the last one it gave
                last = next((v for v in range(to - 1, went - 1, -1) if snaps[v][cid].replaced_by), None)
                current = labels_in(last, snaps[last][cid].replaced_by) if last is not None else []
                if current:
                    met["replacement_missing"].append(f"{last_live}: none in version {to}, "
                                                      f"{' · '.join(current)} in version {last}")
            then = snaps[went][cid].replaced_by
            if not current:
                pass  # discontinued: the card says nothing replaces it
            elif not then:
                met["replacement_added"].append(f"{last_live}: deprecated in version {went} with no "
                                                f"replacement → {' · '.join(current)} (version {to})")
            elif now.replaced_by and set(then) != set(now.replaced_by):
                met["repointed"].append(f"{last_live}: {' · '.join(labels_in(went, then))} (version {went}) "
                                        f"→ {' · '.join(current)} (version {to})")

        # Its outdated names, and the version each went out of use in: renamed
        # while live, or deprecated. Names that differ only in punctuation are
        # one name, the most recent spelling kept.
        gone: dict[str, int] = {}
        for v in range(since, to + 1):
            if live_in(cid, v - 1):
                label = snaps[v - 1][cid].label
                if not live_in(cid, v) or snaps[v][cid].label != label:
                    gone[label] = v
        spellings: dict[str, tuple[str, int]] = {}
        for label, v in sorted(gone.items(), key=lambda kv: kv[1]):
            if norm(label) in spellings:
                met["punctuation"].append(f"{spellings[norm(label)][0]} → {label} (version {v}, both "
                                          f"old names of {cid})")
            spellings[norm(label)] = (label, v)

        for label, v in spellings.values():
            by_deprecation = went is not None and v == went
            if not now.deprecated and label == now.label:
                met["renamed_back"].append(f"{label}: gone in version {v}, its name again today")
                continue
            kind, added, removed = name_change(label, current[0]) if len(current) == 1 else (None, [], [])
            if len(current) == 1 and label == current[0]:
                kind = "same_name"
            if kind in ("punctuation", "reordered", "same_name"):
                how = ", as a new concept" if now.deprecated else ""
                met[kind].append(f"{label} → {current[0]} (version {v}{how})")
                continue
            if label in live_labels:
                left_out.append(LeftOut(label, cid, v, "live_name" if by_deprecation else "live_old_name"))
                continue
            if now.deprecated and not by_deprecation:
                met["renamed_then_replaced"].append(f"{label} → {snaps[v][cid].label} (version {v}) → "
                                                    f"{' · '.join(current)} (version {went})")
            kind = kind or ("discontinued" if not current else "replaced" if by_deprecation else "renamed")
            if label in cards:  # two concepts had this name: one card, naming the successors of both
                card = cards[label]
                met["shared_name"].append(f"{label}: a name of {card.concept_ids[0]} and of {cid}")
                card.replacements = sorted({*card.replacements, *current}, key=by_name)
                card.kind = next(k for k in ("replaced", "renamed", "discontinued") if k in (card.kind, kind)
                                 or k == "discontinued")
                if card.kind == "discontinued" and card.replacements:
                    card.kind = "replaced"
                card.added, card.removed = [], []
                card.version = min(card.version, v)
                card.concept_ids.append(cid)
            else:
                cards[label] = Card(card_id(label), label, current, v, kind=kind, concept_ids=[cid],
                                    added=added, removed=removed)

    if errors:
        sys.exit("the taxonomy is not as this script expects:\n" + "\n".join(errors))
    result = sorted(cards.values(), key=lambda c: (by_name(c.front), c.id))
    for what, values in (("front", [c.front for c in result]), ("id", [c.id for c in result])):
        duplicates = sorted({x for x in values if values.count(x) > 1})
        if duplicates:
            sys.exit(f"cards with the same {what}:\n" + "\n".join(f"  {x!r}" for x in duplicates))
    return result, sorted(left_out, key=lambda x: by_name(x.label)), met


# --------------------------------------------------------------------------- provenance

REPO_URL = "https://github.com/antwika/solid-memo"


# Options that do not change the deck, left out of the command it records.
NOT_RECORDED = {"--cache-dir": True, "--verbose": False, "--allow-uncommitted": False}


@dataclass
class Provenance:
    script_url: str  # pinned to a commit, unless --allow-uncommitted
    script_sha256: str
    commit: str | None  # None: the script is not committed and unmodified
    command: str  # the command line that reproduces the deck
    python: str


def script_provenance(allow_uncommitted: bool) -> Provenance:
    """This run, for the deck's PROV block. The script must be committed and
    unmodified at HEAD, so the deck can name the exact code that made it;
    --allow-uncommitted writes a draft pointing at `main` instead."""
    script = Path(__file__).resolve()

    def git(*args: str) -> str | None:
        try:
            return subprocess.run(["git", *args], cwd=script.parent, capture_output=True,
                                  text=True, check=True).stdout.strip()
        except (OSError, subprocess.CalledProcessError):
            return None

    top = git("rev-parse", "--show-toplevel")
    rel = os.path.relpath(script, top).replace(os.sep, "/") if top else script.name
    argv, skip = [], False
    for arg in sys.argv[1:]:
        name = arg.split("=", 1)[0]
        if skip:
            skip = False
        elif name in NOT_RECORDED:
            skip = NOT_RECORDED[name] and "=" not in arg
        else:
            argv.append(arg)
    command = shlex.join(["python3", rel, *argv])

    sha = git("rev-parse", "HEAD") if top else None
    tracked = top and git("ls-files", "--error-unmatch", str(script)) is not None
    clean = tracked and git("status", "--porcelain", "--", str(script)) == ""
    commit = sha if sha and clean else None
    if commit is None:
        if not allow_uncommitted:
            sys.exit(f"{rel} is not committed and unmodified at HEAD, so the deck could not name the "
                     "code that made it. Commit it first, or pass --allow-uncommitted for a draft.")
        print(f"warning: {rel} is not committed and unmodified at HEAD; this is a draft, and its "
              "provenance points at 'main' instead of a commit", file=sys.stderr)
    return Provenance(
        script_url=f"{REPO_URL}/blob/{commit or 'main'}/{rel}",
        script_sha256=hashlib.sha256(script.read_bytes()).hexdigest(),
        commit=commit,
        command=command,
        python=f"Python {sys.version.split()[0]}, Unicode {unicodedata.unidata_version}",
    )


def recorded_checksums(path: Path) -> dict[int, str]:
    """Taxonomy version -> snapshot checksum, as a deck written by this script records them."""
    if not path.exists():
        return {}
    text = path.read_text(encoding="utf-8")
    return {int(v): h for v, h in re.findall(
        r'^<#taxonomy-version-(\d+)>\n(?:    .*\n)*?    spdx:checksum \[.*?spdx:checksumValue "([0-9a-f]+)"',
        text, re.M)}


# --------------------------------------------------------------------------- Turtle


def ttl_str(s: str) -> str:
    return '"' + s.replace("\\", "\\\\").replace('"', '\\"').replace("\n", " ") + '"'


def slug(s: str) -> str:
    """ASCII, for card ids: "Förskollärare" -> "forskollarare"."""
    ascii_ = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", ascii_.lower()).strip("-")


def aligned(predicate: str, objects: list[str]) -> str:
    """An object list in the house style: one object per line, aligned under the first."""
    return (" ,\n" + " " * (5 + len(predicate))).join(objects)


def xsd_datetime(timestamp: str) -> str:
    """The API's timestamps ("2026-08-12T12:30:58.521Z") in the decks' form, whole seconds."""
    when = datetime.fromisoformat(timestamp.replace("Z", "+00:00")).astimezone(timezone.utc)
    return when.strftime("%Y-%m-%dT%H:%M:%S.000Z")


# The deck's texts, by language. Deck format 4 states a title and description
# in several languages, one of them English, which Solid Memo shows.
TEXTS = {
    "en": {
        "title": "Swedish labour market taxonomy: occupation changes",
        "description": (
            "Swedish occupation names that have changed in the labour market taxonomy of "
            "Arbetsförmedlingen, the Swedish Public Employment Service (the JobTech Taxonomy), since its "
            "first version ({first_date}). The name as it was is on the front. The back shows what the "
            "occupation is called today and what changed: a new name, a replacement by one or more other "
            "occupations, a synonym added or removed, or no replacement at all, with the taxonomy version "
            "and date of the change. The names are in Swedish. The deck grows by one release for every new "
            "version of the taxonomy; each release's notes say what it changed."
        ),
    },
    "sv": {
        "title": "Svensk arbetsmarknadstaxonomi: yrkesändringar",
        "description": (
            "Svenska yrkesbenämningar som har ändrats i Arbetsförmedlingens arbetsmarknadstaxonomi "
            "(JobTech Taxonomy) sedan dess första version ({first_date}). Benämningen som den var står på "
            "framsidan. Baksidan visar vad yrket heter i dag och vad som ändrades: ett nytt namn, ett eller "
            "flera andra yrken som ersätter det, en synonym som lagts till eller tagits bort, eller ingen "
            "ersättare alls, med taxonomiversion och datum för ändringen. Leken växer med en ny utgåva för "
            "varje ny version av taxonomin; varje utgåvas anteckningar säger vad den ändrade."
        ),
    },
}
KEYWORDS = ["occupations", "labour market", "Sweden", "Arbetsförmedlingen", "JobTech Taxonomy"]


def english_list(items: list[str]) -> str:
    return items[0] if len(items) == 1 else ", ".join(items[:-1]) + " and " + items[-1]


def back_text(card: Card, versions: dict[int, str]) -> str:
    """The current name(s), then what changed and when: "Hamnarbetare (synonym
    Stuveriarbetare removed in taxonomy version 24, 2025-01-14)"."""
    when = f"in taxonomy version {card.version}, {versions[card.version][:10]}"
    if card.kind == "synonym_added":
        what = (f"synonym {card.added[0]} added" if len(card.added) == 1
                else f"synonyms {english_list(card.added)} added")
    elif card.kind == "synonym_removed":
        what = (f"synonym {card.removed[0]} removed" if len(card.removed) == 1
                else f"synonyms {english_list(card.removed)} removed")
    elif card.kind == "discontinued":
        return f"No replacement (went out of use {when})"
    else:
        what = "renamed" if card.kind == "renamed" else "replaced"
    return f"{' · '.join(card.replacements)} ({what} {when})"


CC0 = "<https://creativecommons.org/publicdomain/zero/1.0/>"


def comment_lines(lines: list[str], width: int = 96) -> list[str]:
    """Lines as a Turtle comment block, wrapped; "- " and "  " lines keep their indent."""
    out: list[str] = []
    for line in lines:
        indent = "    " if line.startswith(("- ", "  ")) else ""
        out += ["#" if not line else "# " + w
                for w in (textwrap.wrap(line, width, subsequent_indent=indent) or [""])]
    return out


def notes_comment(left_out: list[LeftOut], met: Met) -> list[str]:
    """The deck's comment block: the names left out, and how each of the
    taxonomy's inconsistencies was handled and how often."""
    lines = [f"Left out: {len(left_out)} outdated names are not cards:"]
    lines += [f"  {x.label} ({x.concept_id}), version {x.version}: {LEFT_OUT_BECAUSE[x.reason]}"
              for x in left_out]
    lines += ["", "Inconsistencies in the taxonomy, and how they were handled:"]
    lines += [f"- {len(met[key])} {title}: {why}." for key, (_, title, why) in WHY.items() if met.get(key)]
    lines += ["", "Method:"] + [f"- {m}" for m in METHOD]
    return comment_lines(lines)


def plural(n: int, word: str) -> str:
    return f"{n} {word}" if n == 1 else f"{n} {word}s"


PHRASES = {"replaced": "names replaced", "renamed": "renamed", "synonym_added": "with a synonym added",
           "synonym_removed": "with a synonym removed", "discontinued": "gone with no replacement"}


def previous_release(output: Path) -> tuple[int, int | None, dict[str, tuple[str, str]]] | None:
    """The deck's latest release, if any: (its number, the newest taxonomy
    version it records, its cards by id as (front, back))."""
    folder = output.resolve().parent.parent / "releases" / output.stem
    numbered = sorted((int(f.stem), f) for f in folder.glob("*.ttl") if f.stem.isdigit()) if folder.is_dir() else []
    if not numbered:
        return None
    number, path = numbered[-1]
    text = path.read_text(encoding="utf-8")
    versions = [int(v) for v in re.findall(r"^<#taxonomy-version-(\d+)>", text, re.M)]
    cards = {m[0]: (m[1], m[2]) for m in re.findall(
        r'^<#([^>]+)>\n    a solid-memo:Card ;\n(?:    .*\n)*?    solid-memo:front "(.*?)" ;\n'
        r'    solid-memo:back "(.*?)" \.', text, re.M)}
    return number, max(versions) if versions else None, cards


def release_notes(cards: list[Card], left_out: list[LeftOut], met: Met, *, versions: dict[int, str],
                  start: int, to: int, previous: tuple[int, int | None, dict[str, tuple[str, str]]] | None,
                  provenance: Provenance) -> str:
    """Notes for releasing this deck: what this release covers and changes, what
    it left out and why, and how the taxonomy's inconsistencies were handled."""
    by_kind = {kind: [c for c in cards if c.kind == kind] for kind in CARD_KINDS}
    counts = lambda cs: ", ".join(f"{sum(1 for c in cs if c.kind == k)} {p}" for k, p in PHRASES.items()
                                  if any(c.kind == k for c in cs))
    if previous is None or previous[1] is None:
        notes = [f"First release. Covers JobTech Taxonomy versions {start} to {to} ({versions[start][:10]} to "
                 f"{versions[to][:10]}): {len(cards)} cards, {counts(cards)}."]
    else:
        number, was, old = previous
        now = {c.id: (c.front, ttl_str(back_text(c, versions))[1:-1]) for c in cards}
        added = [c for c in cards if c.id not in old]
        changed = [i for i in now.keys() & old.keys() if now[i] != old[i]]
        removed = sorted(old[i][0] for i in old.keys() - now.keys())
        notes = [f"Adds JobTech Taxonomy version{'s' if to - was > 1 else ''} "
                 f"{f'{was + 1} to {to}' if to - was > 1 else to} ({versions[to][:10]}) to release {number}, "
                 f"which covered versions {start} to {was}: {plural(len(added), 'card')} added"
                 + (f" ({counts(added)})" if added else "") + f", {plural(len(changed), 'back')} changed"
                 + (f", and {plural(len(removed), 'card')} removed because {'its name is' if len(removed) == 1 else 'their names are'} "
                    f"in use again ({'; '.join(removed)})" if removed else "") + "."]
        notes.append(f"The whole deck now has {plural(len(cards), 'card')}: {counts(cards)}.")
    if previous is not None and previous[1] is not None:
        notes.append("Across the whole deck:")
    if left_out:
        notes.append(f"Left out: {len(left_out)} outdated names that a current occupation still has "
                     f"({'; '.join(x.label for x in left_out)}), since a card calling them outdated would be wrong.")
    handled = [f"{len(met[k])} {title}" for k, (where, title, _) in WHY.items()
               if where != "excluded" and k not in LEFT_OUT_BECAUSE and met.get(k)]
    skipped = [f"{len(met[k])} {title}" for k, (where, title, _) in WHY.items()
               if where == "excluded" and k not in LEFT_OUT_BECAUSE and met.get(k)]
    if skipped:
        notes.append(f"Not cards, as nothing changed that a learner could study: {'; '.join(skipped)}.")
    if handled:
        notes.append(f"Taxonomy inconsistencies handled: {'; '.join(handled)}.")
    notes.append(f"Generated by {Path(provenance.script_url).name} at commit "
                 f"{provenance.commit or 'none (draft)'}; the deck records the command, the script's "
                 "SHA-256 and a SHA-256 of every taxonomy version read.")
    return " ".join(notes)


def report(cards: list[Card], left_out: list[LeftOut], met: Met, *, versions: dict[int, str],
           since: int, to: int, verbose: bool) -> str:
    """What the run included, excluded and adjusted, and why, with examples."""
    by_kind = {kind: [c for c in cards if c.kind == kind] for kind in CARD_KINDS}
    split = sorted((c for c in by_kind["replaced"] if len(c.replacements) > 1), key=lambda c: -len(c.replacements))
    lines: list[str] = [
        f"Changes to occupation names in the JobTech Taxonomy, starting from version {since - 1} "
        f"({versions[since - 1][:10]}) up to version {to} ({versions[to][:10]}): {len(cards)} cards. "
        "Examples are the newest changes.",
    ]

    def entry(count: int, title: str, why: str, examples: list[str]) -> None:
        lines.append("")
        lines.append(f"- {count} {title}: {why}.")
        shown = examples if verbose else examples[:3]
        lines.extend(f"      {e}" for e in shown)
        if len(examples) > len(shown):
            lines.append(f"      … and {len(examples) - len(shown)} more (--verbose lists them all)")

    def newest_first(cs: list[Card]) -> list[Card]:
        return sorted(cs, key=lambda c: (-c.version, by_name(c.front)))

    def card_line(c: Card) -> str:
        return f"{c.front} → {' · '.join(c.replacements)} (version {c.version})"

    lines += ["", "INCLUDED"]
    for kind, (title, why) in CARD_KINDS.items():
        if not by_kind[kind]:
            continue
        entry(len(by_kind[kind]), title, why, [card_line(c) for c in newest_first(by_kind[kind])])
        if kind == "replaced":
            entry(len(split), "of them split into several names",
                  "the taxonomy replaced one name with more specific ones; the back lists them all",
                  [f"{c.front} → {len(c.replacements)} names: {' · '.join(c.replacements)}" for c in split])

    for section in ("excluded", "adjusted"):
        lines += ["", section.upper()]
        if section == "excluded":
            for reason in LEFT_OUT_BECAUSE:
                these = [x for x in left_out if x.reason == reason]
                if these:
                    _, title, why = WHY[reason]
                    entry(len(these), title, why,
                          [f"{x.label} ({x.concept_id}), version {x.version}" for x in these])
        for key, (where, title, why) in WHY.items():
            if where == section and key not in LEFT_OUT_BECAUSE and met.get(key):
                entry(len(met[key]), title, why, met[key])

    lines += ["", "WHY THE DECK IS BUILT THIS WAY"] + [f"- {m}" for m in METHOD]
    return "\n".join(w for line in lines
                     for w in (textwrap.wrap(line, 100, subsequent_indent=" " * (len(line) - len(line.lstrip()) + 2))
                               or [""]))


SPDX_PREFIX = "@prefix spdx:       <http://spdx.org/rdf/terms#> ."


def write_deck(path: Path, cards: list[Card], left_out: list[LeftOut], met: Met, *,
               versions: dict[int, str], checksums: dict[int, str], start: int, to: int,
               creator: str | None, provenance: Provenance) -> None:
    """The deck, a pure function of its inputs: the taxonomy versions read (by
    checksum), this script (by commit) and the command line. Nothing in it
    depends on when or where it is run, so re-running the recorded command at
    the recorded commit reproduces the file byte for byte."""
    def lang_literals(key: str, **values: str) -> list[str]:
        """The text in every language, English first: ["…"@en, "…"@sv]."""
        return [f"{ttl_str(TEXTS[lang][key].format(**values))}@{lang}" for lang in TEXTS]

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
        SPDX_PREFIX,
        "",
        "<>",
        "    a solid-memo:Deck ,",
        "      dcat:Dataset ;",
        "    dcterms:title " + aligned("dcterms:title", lang_literals("title")) + " ;",
    ]
    creator_name, creator_email = None, None
    if creator:
        match = re.fullmatch(r"\s*(.*?)\s*<([^\s<>@]+@[^\s<>@]+)>\s*", creator)
        creator_name, creator_email = (match.group(1), match.group(2)) if match else (creator.strip(), None)
        out.append(f"    dcterms:creator <#{slug(creator_name)}> ;")
    out += [
        f"    dcterms:license {CC0} ;",
        "    dcterms:description "
        + aligned("dcterms:description", lang_literals("description", first_date=versions[start][:10]))
        + " ;",
        f"    prov:wasDerivedFrom <{TAXONOMY}> ;",
        "    prov:wasGeneratedBy <#generation> ;",
        f'    dcterms:modified "{xsd_datetime(versions[to])}"^^xsd:dateTime ;',
        "    dcat:theme "
        + aligned("dcat:theme", ["<http://publications.europa.eu/resource/authority/data-theme/EDUC>",
                                 "topic:labour-market"])
        + " ;",
        "    dcat:keyword " + aligned("dcat:keyword", [ttl_str(k) for k in KEYWORDS]) + " ;",
        "    dcterms:language "
        + aligned("dcterms:language", ["<http://publications.europa.eu/resource/authority/language/ENG>",
                                       "<http://publications.europa.eu/resource/authority/language/SWE>"])
        + " ;",
        "    solid-memo:studyDirection solid-memo:frontToBack ;",
        "    solid-memo:formatVersion 4 .",
        "",
    ]
    if creator_name is not None:
        out += [f"<#{slug(creator_name)}>", "    a foaf:Agent ;"]
        out.append(f"    foaf:name {ttl_str(creator_name)}" + (" ;" if creator_email else " ."))
        if creator_email:
            out.append(f"    foaf:mbox <mailto:{creator_email}> .")
        out.append("")
    reproduce = (f"git checkout {provenance.commit} && {provenance.command}" if provenance.commit
                 else f"{provenance.command} (a draft: the script was not committed)")
    out += [
        CC0,
        "    a dcterms:LicenseDocument .",
        "",
        "spdx:checksumAlgorithm_sha256",
        "    a spdx:ChecksumAlgorithm .",
        "",
        *comment_lines([
            "How this deck was produced (W3C PROV-O). It is a pure function of the taxonomy versions "
            "read, this script and the command line, and records all three: the script by commit and "
            "SHA-256, and every taxonomy version by its publication time, the query that fetched it and "
            "a SHA-256 of the answer, normalised as the script's checksum() describes. To reproduce it "
            "byte for byte, from the repository root:",
            f"  {reproduce}",
            "The script refuses to overwrite this file if a taxonomy version no longer matches its "
            "checksum here.",
            "",
            *[line.removeprefix("# ").removeprefix("#") for line in notes_comment(left_out, met)],
        ]),
        "<#generation>",
        "    a prov:Activity ;",
        "    prov:used " + aligned("prov:used", [f"<#taxonomy-version-{v}>" for v in range(start, to + 1)]) + " ;",
        f"    prov:wasAssociatedWith <{provenance.script_url}> ;",
        f"    rdfs:comment {ttl_str(f'{provenance.command} ({provenance.python})')} .",
        "",
        f"<{provenance.script_url}>",
        "    a prov:SoftwareAgent ;",
        f"    dcterms:title {ttl_str(Path(provenance.script_url).name)} ;",
        "    spdx:checksum [ a spdx:Checksum ; spdx:algorithm spdx:checksumAlgorithm_sha256 ; "
        f'spdx:checksumValue "{provenance.script_sha256}"^^xsd:hexBinary ] .',
        "",
        f"<{TAXONOMY}>",
        '    dcterms:title "Arbetsmarknadstaxonomi (JobTech Taxonomy)" ;',
        '    dcterms:creator "Arbetsförmedlingen" ;',
        f"    dcterms:license {CC0} .",
    ]
    for v in range(start, to + 1):
        out += [
            "",
            f"<#taxonomy-version-{v}>",
            "    a prov:Entity ;",
            f'    dcterms:title "JobTech Taxonomy version {v}: {CONCEPT_TYPE} concepts, deprecated ones included" ;',
            f"    dcterms:isVersionOf <{TAXONOMY}> ;",
            f'    dcat:version "{v}" ;',
            f'    dcterms:issued "{versions[v]}"^^xsd:dateTime ;',
            f"    rdfs:seeAlso <{snapshot_url(v)}> ;",
            "    spdx:checksum [ a spdx:Checksum ; spdx:algorithm spdx:checksumAlgorithm_sha256 ; "
            f'spdx:checksumValue "{checksums[v]}"^^xsd:hexBinary ] .',
        ]
    for card in cards:
        out += [
            "",
            f"<#{card.id}>",
            "    a solid-memo:Card ;",
            "    solid-memo:formatVersion 1 ;",
            f'    dcterms:created "{xsd_datetime(versions[card.version])}"^^xsd:dateTime ;',
            f"    solid-memo:front {ttl_str(card.front)} ;",
            f"    solid-memo:back {ttl_str(back_text(card, versions))} .",
        ]

    path.write_text("\n".join(out) + "\n", encoding="utf-8")


# --------------------------------------------------------------------------- main


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("-o", "--output", type=Path, required=True, help="deck file to write (.ttl)")
    ap.add_argument("--creator", default=None, help='dcterms:creator, e.g. "Name <email>"')
    ap.add_argument("--from", dest="start", type=int, default=1,
                    help="taxonomy version the deck starts from (default: 1, the first)")
    ap.add_argument("--to", type=int, default=None, help="newest taxonomy version to include (default: the newest)")
    ap.add_argument("--cache-dir", type=Path, default=None,
                    help="keep fetched snapshots here and reuse them (checksums still apply)")
    ap.add_argument("--verbose", action="store_true",
                    help="list every name in the report, not just three examples of each kind")
    ap.add_argument("--allow-uncommitted", action="store_true",
                    help="write a draft although this script is not committed and unmodified")
    args = ap.parse_args()
    if args.output.suffix != ".ttl":
        ap.error(f"{args.output}: output must be a .ttl file")
    provenance = script_provenance(args.allow_uncommitted)

    versions = load_versions()
    to = args.to if args.to is not None else max(versions)
    if not (min(versions) <= args.start < to and to in versions):
        ap.error(f"need {min(versions)} <= --from < --to <= {max(versions)}")
    snaps, checksums = {}, {}
    for v in range(args.start, to + 1):
        snaps[v], checksums[v] = load_snapshot(v, args.cache_dir)
    changed = {v: h for v, h in recorded_checksums(args.output).items() if v in checksums and checksums[v] != h}
    if changed:
        sys.exit(f"{args.output} was made from taxonomy versions whose content has changed since: "
                 + ", ".join(f"version {v} (was {h[:12]}…, now {checksums[v][:12]}…)" for v, h in sorted(changed.items()))
                 + ". A published version should never change; find out why before overwriting the deck.")

    since = args.start + 1  # the first version whose changes can be seen
    cards, left_out, met = build_cards(snaps, since, to)
    print(report(cards, left_out, met, versions=versions, since=since, to=to, verbose=args.verbose),
          file=sys.stderr)
    write_deck(args.output, cards, left_out, met, versions=versions, checksums=checksums, start=args.start, to=to,
               creator=args.creator, provenance=provenance)
    notes = release_notes(cards, left_out, met, versions=versions, start=args.start, to=to,
                          previous=previous_release(args.output), provenance=provenance)
    print(f"\nwrote {args.output}: {len(cards)} cards\n\nRELEASE NOTES\n"
          + textwrap.fill(notes, 100, initial_indent="  ", subsequent_indent="  ")
          + f"\n\nTo release it:\n  npm run deck:release -- {args.output.stem} --notes {shlex.quote(notes)}",
          file=sys.stderr)


if __name__ == "__main__":
    main()
