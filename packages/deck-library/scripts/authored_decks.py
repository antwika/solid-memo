#!/usr/bin/env python3
"""Check and build the library's authored decks from their dossiers.

An authored deck is researched and written by hand, card by card, rather than
generated from one dataset. Everything known about how it was made lives in
its dossier, authored/<name>.json: the sources and their licences, how the
information was acquired, the selection criteria, every card with the
evidence for it, and a log of the quality-control rounds. From the dossier
this script writes

  decks/<name>.ttl     the deck source (released with npm run deck:release)
  authored/<name>.md   the provenance report: sources, licences, method,
                       quality control and the evidence for every card

and nothing else. The output depends on the dossier and this script alone
(no clock, no network), so a deck can be rebuilt byte for byte.

USAGE
  python3 scripts/authored_decks.py check <name>... | --all [--offline]
  python3 scripts/authored_decks.py build <name>... | --all [--offline]
  python3 scripts/authored_decks.py sync --all

  check validates the dossiers and runs their Wikidata checks; build does
  the same and then writes the deck and its report. --offline skips the
  Wikidata checks (a build must not be released from an offline check).
  sync (offline, run by CI) fails when a deck or report is not what its
  dossier builds to: edit the dossier, never the outputs.
  Python 3.10+, standard library only.

THE DOSSIER (authored/<name>.json)
  name              the deck's name, the dossier's file name.
  title, description
                    {"en": ..., "sv": ...}: English required, Swedish expected.
  keywords          {"en": [...], "sv": [...]}: the keywords in each language
                    (library deck format 5 tags each one); a word written the
                    same in both, such as "UNESCO", is listed under each.
  topics            Solid Memo topic ids (vocab/topics.ttl), e.g. ["history"].
  studyDirection    "frontToBack" | "backToFront" | "bidirectional".
  sides             the languages of the cards' text: {"front": ["en", "sv"],
                    "back": ["en", "sv"]}. ["zxx"] means text in no language
                    (codes, formulas, numbers, symbols). A card may give one
                    side as {"zxx": "H₂O"} when its text has no language.
                    [""] (untagged, its language not stated) is how the
                    first authored decks wrote such text; a new dossier
                    states every text's language, zxx included.
  license           the deck's licence: CC0-1.0, CC-BY-4.0 or CC-BY-SA-4.0.
  created           the deck's creation time, "YYYY-MM-DDTHH:MM:SS.000Z".
  creator           {"name": ..., "email": ...}: who compiled the deck.
  sources           {key: {title, creator, url, license, licenseEvidence,
                    role, retrieved, usedFor}}. role "content": cards contain
                    information taken from it; "verification": consulted to
                    check facts only, nothing taken from it. license is one
                    of LICENCES below.
  method            paragraphs: how the information was acquired, step by step.
  selection         paragraph: what is in the deck and what was left out, and why.
  queries           [{source, purpose, query}]: the exact queries and URLs run.
  licensing         paragraph: why the deck's licence complies with every source's.
  qualityControl    {"rounds": [{round, date, reviewer, lens, scope, summary,
                    findings: [{card, issue, resolution, outcome}]}]}
                    outcome: "fixed" | "rejected" | "no change needed".
  cards             [{id, front, back, frontNote?, backLabel?, backNote?,
                    evidence: [{source, locator, says, retrieved}],
                    checks?: [...]}]
                    id: lower-case letters, digits and dashes, stable forever.
                    front, back, notes, label: {lang: text}.
                    evidence: at least two entries from two distinct sources,
                    one of them a content source.
                    checks: machine checks against Wikidata, run by check and
                    build: {"qid": "Q34", "label": "sv", "equals": "Sverige"}
                    (the label or one of the aliases in that language), or
                    {"qid": "Q283", "property": "P274", "expect": "H₂O"}
                    (some value of the property: an item id "Q…", a string,
                    or a year for a date).

LICENCE POLICY
  A deck may contain information from a source only as its licence allows:
    * CC0-1.0, PDM-1.0 and public-domain sources: anything goes;
    * CC-BY-*: the deck is CC-BY-4.0 or CC-BY-SA-4.0, the source attributed;
    * CC-BY-SA-*: the deck is CC-BY-SA-4.0, the source attributed;
    * anything else (all rights reserved, unknown): verification only.
  A verification source contributes no text and no selection: it only
  confirms facts the content sources gave, and facts are not copyrightable.
  Attribution is in the deck itself (prov:wasDerivedFrom, each source with
  its title, creators and licence) and in the report.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import time
import unicodedata
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent  # packages/deck-library
AUTHORED = ROOT / "authored"
DECKS = ROOT / "decks"
REPO_URL = "https://github.com/antwika/solid-memo"
SCRIPT_PATH = "packages/deck-library/scripts/authored_decks.py"
REPORT_URL = f"{REPO_URL}/blob/main/packages/deck-library/authored/{{name}}.md"
SPARQL = "https://query.wikidata.org/sparql"
USER_AGENT = "solid-memo authored deck checker (https://github.com/antwika/solid-memo)"

# Licence id -> (IRI or None, human name, kind). kind: "open" (anything goes),
# "by", "by-sa" or "closed" (verification only).
LICENCES: dict[str, tuple[str | None, str, str]] = {
    "CC0-1.0": ("https://creativecommons.org/publicdomain/zero/1.0/", "CC0 1.0 Universal", "open"),
    "PDM-1.0": ("https://creativecommons.org/publicdomain/mark/1.0/", "Public Domain Mark 1.0", "open"),
    "public-domain": (None, "Public domain", "open"),
    "CC-BY-3.0-IGO": ("https://creativecommons.org/licenses/by/3.0/igo/", "CC BY 3.0 IGO", "by"),
    "CC-BY-4.0": ("https://creativecommons.org/licenses/by/4.0/", "CC BY 4.0", "by"),
    "CC-BY-SA-2.5": ("https://creativecommons.org/licenses/by-sa/2.5/", "CC BY-SA 2.5", "by-sa"),
    "CC-BY-SA-3.0": ("https://creativecommons.org/licenses/by-sa/3.0/", "CC BY-SA 3.0", "by-sa"),
    "CC-BY-SA-4.0": ("https://creativecommons.org/licenses/by-sa/4.0/", "CC BY-SA 4.0", "by-sa"),
    "GFDL-1.3": ("https://www.gnu.org/licenses/fdl-1.3.html", "GNU Free Documentation License 1.3", "closed"),
    "GPL-2.0": ("https://www.gnu.org/licenses/old-licenses/gpl-2.0.html", "GNU General Public License 2.0", "closed"),
    "all-rights-reserved": (None, "All rights reserved", "closed"),
    "unknown": (None, "Unknown", "closed"),
}
DECK_LICENCES = {"CC0-1.0", "CC-BY-4.0", "CC-BY-SA-4.0"}

# The topics a deck may name: vocab/topics.ttl, with the ones the authored
# decks add.
TOPICS = {
    "languages", "swedish", "spanish", "latin", "greek",
    "geography", "computing", "science", "chemistry", "physics", "astronomy", "biology",
    "art", "music", "literature", "history", "mythology", "mathematics", "sports",
    "economics", "labour-market", "french", "german", "italian", "finnish", "portuguese", "film",
}
# BCP 47 tag -> EU authority-table language (vocab/external.ttl).
LANGUAGES = {"en": "ENG", "sv": "SWE", "es": "SPA", "la": "LAT", "it": "ITA", "el": "ELL", "fr": "FRA", "de": "DEU",
             "fi": "FIN", "pt": "POR"}
# Text in no language (BCP 47): a tag, but not a language the deck is in.
NO_LANGUAGE = "zxx"
DIRECTIONS = {"frontToBack", "backToFront", "bidirectional"}
TEXT_FIELDS = ("front", "back", "frontNote", "backLabel", "backNote")
ID = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")
DATE_TIME = re.compile(r"^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.000Z$")
DATE = re.compile(r"^\d{4}-\d{2}-\d{2}$")


class DossierError(Exception):
    pass


# --------------------------------------------------------------------------- checks


def load(name: str) -> dict:
    path = AUTHORED / f"{name}.json"
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError:
        raise DossierError(f"{path} does not exist") from None
    except json.JSONDecodeError as e:
        raise DossierError(f"{path}: not JSON: {e}") from None


def text_problems(where: str, text: object) -> list[str]:
    if not isinstance(text, str) or not text:
        return [f"{where}: empty or not a string"]
    problems = []
    if text != text.strip():
        problems.append(f"{where}: leading or trailing whitespace in {text!r}")
    if "  " in text or "\n" in text or "\t" in text:
        problems.append(f"{where}: double space, tab or line break in {text!r}")
    if unicodedata.normalize("NFC", text) != text:
        problems.append(f"{where}: not NFC-normalised: {text!r}")
    return problems


def lang_text_problems(where: str, value: object, langs: list[str] | None, *, english: bool) -> list[str]:
    """A {lang: text} map. langs: the languages the side must have exactly (None: any, English required)."""
    if not isinstance(value, dict) or not value:
        return [f"{where}: expected {{lang: text}}"]
    problems = []
    for lang, text in value.items():
        if lang and lang not in LANGUAGES and lang != NO_LANGUAGE:
            problems.append(f"{where}: language {lang!r} unknown (add it to LANGUAGES and vocab/external.ttl)")
        problems += text_problems(f"{where}@{lang or 'untagged'}", text)
    keys = set(value)
    if "" in keys and len(keys) > 1:
        problems.append(f"{where}: untagged text and tagged text together")
    elif NO_LANGUAGE in keys and len(keys) > 1:
        problems.append(f"{where}: text in no language ({NO_LANGUAGE}) and in a language together")
    elif keys == {""}:
        if english:
            problems.append(f"{where}: must be language-tagged, with English")
    elif langs is not None and keys != set(langs):
        problems.append(f"{where}: languages {sorted(keys)}, expected {sorted(langs)}")
    elif english and "en" not in keys:
        problems.append(f"{where}: no English text")
    return problems


def check_dossier(d: dict, name: str) -> list[str]:
    p: list[str] = []
    required = ["name", "title", "description", "keywords", "topics", "studyDirection", "sides", "license",
                "created", "creator", "sources", "method", "selection", "queries", "licensing",
                "qualityControl", "cards"]
    missing = [k for k in required if k not in d]
    if missing:
        return [f"missing fields: {', '.join(missing)}"]
    if d["name"] != name:
        p.append(f"name {d['name']!r} is not the file name {name!r}")
    if not ID.match(name):
        p.append(f"name {name!r}: lower-case letters, digits and dashes")
    for field in ("title", "description"):
        p += lang_text_problems(field, d[field], None, english=True)
        if "sv" not in d[field]:
            p.append(f"{field}: no Swedish text")
    keywords = d["keywords"]
    if not isinstance(keywords, dict) or set(keywords) != {"en", "sv"}:
        p.append('keywords: {"en": [...], "sv": [...]}')
    else:
        for lang, words in keywords.items():
            if not isinstance(words, list) or not words:
                p.append(f"keywords.{lang}: a non-empty list")
                continue
            for i, k in enumerate(words):
                p += text_problems(f"keywords.{lang}[{i}]", k)
            if len(set(words)) != len(words):
                p.append(f"keywords.{lang}: duplicates")
    for t in d["topics"]:
        if t not in TOPICS:
            p.append(f"topics: {t!r} unknown")
    if d["studyDirection"] not in DIRECTIONS:
        p.append(f"studyDirection: one of {sorted(DIRECTIONS)}")
    sides = d["sides"]
    if not isinstance(sides, dict) or set(sides) != {"front", "back"}:
        p.append('sides: {"front": [...], "back": [...]}')
        return p
    for side, langs in sides.items():
        lone = ("" in langs or NO_LANGUAGE in langs) and len(langs) > 1
        if not langs or lone or any(l and l not in LANGUAGES and l != NO_LANGUAGE for l in langs):
            p.append(f"sides.{side}: languages from LANGUAGES, or [\"{NO_LANGUAGE}\"] for no language")
    if d["license"] not in DECK_LICENCES:
        p.append(f"license: one of {sorted(DECK_LICENCES)}")
    if not DATE_TIME.match(str(d["created"])):
        p.append("created: YYYY-MM-DDTHH:MM:SS.000Z")
    creator = d["creator"]
    if not isinstance(creator, dict) or not creator.get("name"):
        p.append("creator: {name, email}")

    # Sources and the licence policy.
    sources = d["sources"]
    urls = [s.get("url") for s in sources.values()]
    for url in sorted({u for u in urls if urls.count(u) > 1}):
        p.append(f"sources: {url} is the address of more than one source (each is a subject of its own in the deck)")
    content_kinds = set()
    for key, s in sources.items():
        where = f"sources.{key}"
        if not ID.match(key):
            p.append(f"{where}: key in lower-case letters, digits and dashes")
        for f in ("title", "creator", "url", "license", "licenseEvidence", "role", "retrieved", "usedFor"):
            if not s.get(f):
                p.append(f"{where}: no {f}")
        if s.get("license") not in LICENCES:
            p.append(f"{where}: license {s.get('license')!r} not in LICENCES")
            continue
        if not str(s.get("url", "")).startswith("https://"):
            p.append(f"{where}: url must be https://")
        if s.get("retrieved") and not DATE.match(s["retrieved"]):
            p.append(f"{where}: retrieved YYYY-MM-DD")
        kind = LICENCES[s["license"]][2]
        if s.get("role") == "content":
            if kind == "closed":
                p.append(f"{where}: {s['license']} allows no reuse: a verification source only")
            content_kinds.add(kind)
        elif s.get("role") != "verification":
            p.append(f"{where}: role is content or verification")
    if not any(s.get("role") == "content" for s in sources.values()):
        p.append("sources: no content source")
    if "by-sa" in content_kinds and d["license"] != "CC-BY-SA-4.0":
        p.append("license: a CC BY-SA content source makes the deck CC-BY-SA-4.0")
    elif "by" in content_kinds and d["license"] not in ("CC-BY-4.0", "CC-BY-SA-4.0"):
        p.append("license: a CC BY content source makes the deck CC-BY-4.0 (or CC-BY-SA-4.0)")

    for field in ("method",):
        if not isinstance(d[field], list) or not d[field]:
            p.append(f"{field}: a list of paragraphs")
    for field in ("selection", "licensing"):
        if not isinstance(d[field], str) or len(d[field]) < 40:
            p.append(f"{field}: a paragraph")
    for i, q in enumerate(d["queries"]):
        if q.get("source") not in sources or not q.get("purpose") or not q.get("query"):
            p.append(f"queries[{i}]: {{source, purpose, query}} with a known source")
    rounds = d["qualityControl"].get("rounds") if isinstance(d["qualityControl"], dict) else None
    if not isinstance(rounds, list):
        p.append("qualityControl: {rounds: [...]}")
        rounds = []
    for r in rounds:
        for f in ("round", "date", "reviewer", "lens", "scope", "summary", "findings"):
            if f not in r:
                p.append(f"qualityControl round {r.get('round')}: no {f}")
        for fi in r.get("findings", []):
            if fi.get("outcome") not in ("fixed", "rejected", "no change needed"):
                p.append(f"qualityControl round {r.get('round')}: finding outcome {fi.get('outcome')!r}")

    # Cards.
    cards = d["cards"]
    if not isinstance(cards, list) or not cards:
        return p + ["cards: a non-empty list"]
    ids = set()
    seen: dict[tuple[str, str, str], str] = {}
    for c in cards:
        cid = c.get("id", "")
        where = f"card {cid or '?'}"
        if not ID.match(cid):
            p.append(f"{where}: id in lower-case letters, digits and dashes")
        if cid in ids:
            p.append(f"{where}: duplicate id")
        ids.add(cid)
        for side in ("front", "back"):
            if side not in c:
                p.append(f"{where}: no {side}")
                continue
            value = c[side]
            langs = sides[side]
            if isinstance(value, dict) and set(value) in ({""}, {NO_LANGUAGE}) and langs != list(value):
                p += lang_text_problems(f"{where}.{side}", value, None, english=False)  # no language by exception
            else:
                p += lang_text_problems(f"{where}.{side}", value, langs, english=False)
            if isinstance(value, dict):
                for lang, text in value.items():
                    key = (side, lang, text.casefold() if isinstance(text, str) else "")
                    unique = side == "front" or d["studyDirection"] != "frontToBack"
                    if unique and key in seen:
                        p.append(f"{where}.{side}@{lang or 'untagged'}: same text as card {seen[key]}: {text!r} "
                                 "(a card must have one answer)")
                    seen.setdefault(key, cid)
        for field in ("frontNote", "backLabel", "backNote"):
            if field in c:
                p += lang_text_problems(f"{where}.{field}", c[field], None, english=True)
        unknown = set(c) - {"id", *TEXT_FIELDS, "evidence", "checks"}
        if unknown:
            p.append(f"{where}: unknown fields {sorted(unknown)}")
        evidence = c.get("evidence", [])
        used = {e.get("source") for e in evidence}
        if len(used) < 2:
            p.append(f"{where}: evidence from at least two distinct sources")
        if not any(sources.get(s, {}).get("role") == "content" for s in used):
            p.append(f"{where}: no evidence from a content source")
        for e in evidence:
            if e.get("source") not in sources:
                p.append(f"{where}: evidence names unknown source {e.get('source')!r}")
            if not e.get("locator") or not e.get("says"):
                p.append(f"{where}: evidence needs a locator and what it says")
            if e.get("retrieved") and not DATE.match(e["retrieved"]):
                p.append(f"{where}: evidence retrieved YYYY-MM-DD")
        for ch in c.get("checks", []):
            if not re.match(r"^Q\d+$", str(ch.get("qid", ""))):
                p.append(f"{where}: check without a Wikidata qid")
            elif not (("label" in ch and "equals" in ch) or ("property" in ch and "expect" in ch)):
                p.append(f"{where}: check is {{qid, label, equals}} or {{qid, property, expect}}")
    return p


# --------------------------------------------------------------------------- Wikidata


def sparql(query: str) -> list[dict]:
    data = urllib.parse.urlencode({"query": query, "format": "json"}).encode()
    req = urllib.request.Request(SPARQL, data=data, headers={
        "User-Agent": USER_AGENT, "Accept": "application/sparql-results+json",
        "Content-Type": "application/x-www-form-urlencoded"})
    for attempt in range(5):
        try:
            with urllib.request.urlopen(req, timeout=120) as resp:
                return json.load(resp)["results"]["bindings"]
        except urllib.error.HTTPError as e:
            if e.code in (429, 500, 502, 503, 504) and attempt < 4:
                time.sleep(int(e.headers.get("Retry-After", "0") or 0) or 5 * (attempt + 1))
                continue
            raise
        except (urllib.error.URLError, TimeoutError):
            if attempt < 4:
                time.sleep(5 * (attempt + 1))
                continue
            raise
    return []


def same_value(want: str, got: str) -> bool:
    """A year matches a date in it ("1889" ~ "1889-03-31T00:00:00Z"); numbers match numerically."""
    if re.fullmatch(r"-?\d{1,4}", want) and re.match(r"-?\d+-", got):
        return int(re.match(r"(-?\d+)-", got).group(1)) == int(want)
    try:
        return float(want) == float(got)
    except ValueError:
        return False


def run_checks(d: dict) -> list[str]:
    checks = [(c["id"], ch) for c in d["cards"] for ch in c.get("checks", [])]
    if not checks:
        return []
    labels: dict[tuple[str, str], set[str]] = {}
    values: dict[tuple[str, str], set[str]] = {}
    label_qids = sorted({ch["qid"] for _, ch in checks if "label" in ch})
    prop_pairs = sorted({(ch["qid"], ch["property"]) for _, ch in checks if "property" in ch})
    for i in range(0, len(label_qids), 150):
        chunk = " ".join(f"wd:{q}" for q in label_qids[i:i + 150])
        langs = " ".join(f'"{l}"' for l in sorted({ch["label"] for _, ch in checks if "label" in ch}))
        rows = sparql(f"""SELECT ?item ?text WHERE {{
  VALUES ?item {{ {chunk} }}
  VALUES ?lang {{ {langs} }}
  {{ ?item rdfs:label ?text }} UNION {{ ?item skos:altLabel ?text }}
  FILTER(LANG(?text) = ?lang || LANG(?text) = "mul")
}}""")
        # The language of each binding is on the literal.
        for r in rows:
            q = r["item"]["value"].rsplit("/", 1)[1]
            labels.setdefault((q, r["text"].get("xml:lang", "")), set()).add(r["text"]["value"])
    for i in range(0, len(prop_pairs), 100):
        chunk = " ".join(f"(wd:{q} <http://www.wikidata.org/prop/direct/{pr}>)" for q, pr in prop_pairs[i:i + 100])
        rows = sparql(f"""SELECT ?item ?p ?v WHERE {{
  VALUES (?item ?p) {{ {chunk} }}
  ?item ?p ?v .
}}""")
        for r in rows:
            q = r["item"]["value"].rsplit("/", 1)[1]
            pr = r["p"]["value"].rsplit("/", 1)[1]
            v = r["v"]
            text = v["value"]
            if v["type"] == "uri" and text.startswith("http://www.wikidata.org/entity/"):
                text = text.rsplit("/", 1)[1]
            values.setdefault((q, pr), set()).add(text)
    problems = []
    for cid, ch in checks:
        if "label" in ch:
            got = labels.get((ch["qid"], ch["label"]), set()) | labels.get((ch["qid"], "mul"), set())
            if ch["equals"] not in got:
                problems.append(f"card {cid}: Wikidata {ch['qid']} has no {ch['label']} label or alias "
                                f"{ch['equals']!r} (has {sorted(got)[:6]})")
        else:
            got = values.get((ch["qid"], ch["property"]), set())
            want = str(ch["expect"])
            ok = want in got or any(same_value(want, g) for g in got)
            if not ok:
                problems.append(f"card {cid}: Wikidata {ch['qid']} {ch['property']} is {sorted(got)[:6]}, "
                                f"not {want!r}")
    return problems


# --------------------------------------------------------------------------- Turtle


def lit(s: str) -> str:
    return '"' + s.replace("\\", "\\\\").replace('"', '\\"') + '"'


def lang_lits(value: dict) -> list[str]:
    order = {"en": 0, "sv": 1}
    return [lit(t) + (f"@{l}" if l else "") for l, t in sorted(value.items(), key=lambda x: (order.get(x[0], 2), x[0]))]


def aligned(predicate: str, objects: list[str]) -> str:
    return (" ,\n" + " " * (5 + len(predicate))).join(objects)


def triple(predicate: str, objects: list[str], last: bool = False) -> str:
    return f"    {predicate} {aligned(predicate, objects)} {'.' if last else ';'}"


def slug(s: str) -> str:
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def deck_languages(d: dict) -> list[str]:
    langs = {l for side in d["sides"].values() for l in side if l in LANGUAGES}
    for c in d["cards"]:
        for f in ("front", "back"):
            langs |= {l for l in c[f] if l in LANGUAGES}
    order = {"en": 0, "sv": 1}
    return sorted(langs, key=lambda l: (order.get(l, 2), l))


def render_turtle(d: dict) -> str:
    name = d["name"]
    report = REPORT_URL.format(name=name)
    deck_licence = LICENCES[d["license"]][0]
    creator_id = f"#{slug(d['creator']['name'])}"
    content = [k for k, s in d["sources"].items() if s["role"] == "content"]
    every = list(d["sources"])
    descriptions = {l: f"{t} " + ({"sv": f"Källor, metod och kvalitetskontroll: {report}"}.get(l)
                                  or f"Sources, method and quality control: {report}")
                    for l, t in d["description"].items()}
    out = [
        f"@base <https://solid-memo.com/decks/{name}> .",
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
        triple("dcterms:title", lang_lits(d["title"])),
        f"    dcterms:creator <{creator_id}> ;",
        f"    dcterms:license <{deck_licence}> ;",
        triple("dcterms:description", lang_lits(descriptions)),
        triple("prov:wasDerivedFrom", [f"<{d['sources'][k]['url']}>" for k in content]),
        "    prov:wasGeneratedBy <#compilation> ;",
        f'    dcterms:created "{d["created"]}"^^xsd:dateTime ;',
    ]
    if d.get("modified"):
        out.append(f'    dcterms:modified "{d["modified"]}"^^xsd:dateTime ;')
    out += [
        triple("dcat:theme", ["<http://publications.europa.eu/resource/authority/data-theme/EDUC>",
                              *[f"topic:{t}" for t in d["topics"]]]),
        triple("dcat:keyword", [f"{lit(k)}@{l}" for l in ("en", "sv") for k in d["keywords"][l]]),
        triple("dcterms:language", [f"<http://publications.europa.eu/resource/authority/language/{LANGUAGES[l]}>"
                                    for l in deck_languages(d)]),
        f"    solid-memo:studyDirection solid-memo:{d['studyDirection']} ;",
        "    solid-memo:formatVersion 5 .",
        "",
        f"<{creator_id}>",
        "    a foaf:Agent ;",
        f"    foaf:name {lit(d['creator']['name'])}" + (" ;" if d["creator"].get("email") else " ."),
    ]
    if d["creator"].get("email"):
        out.append(f"    foaf:mbox <mailto:{d['creator']['email']}> .")
    licence_iris = sorted({deck_licence} | {LICENCES[s["license"]][0] for s in d["sources"].values()
                                            if LICENCES[s["license"]][0]})
    for iri in licence_iris:
        out += ["", f"<{iri}>", "    a dcterms:LicenseDocument ."]
    script_url = f"{REPO_URL}/blob/main/{SCRIPT_PATH}"
    out += [
        "",
        "# How this deck was made (W3C PROV-O): researched card by card from the sources below,",
        "# each card checked against at least two of them. The full record is the provenance report.",
        "<#compilation>",
        "    a prov:Activity ;",
        f'    prov:endedAtTime "{d["created"]}"^^xsd:dateTime ;',
        triple("prov:used", [f"<{d['sources'][k]['url']}>" for k in every]),
        triple("prov:wasAssociatedWith", [f"<{creator_id}>", f"<{script_url}>"]),
        f"    rdfs:seeAlso <{report}> ;",
        f"    rdfs:comment {lit(f'Compiled from the dossier authored/{name}.json, which records every source, the method, the quality-control rounds and the evidence for each card; built with python3 {SCRIPT_PATH} build {name}.')} .",
        "",
        f"<{script_url}>",
        "    a prov:SoftwareAgent ;",
        '    dcterms:title "authored_decks.py" .',
    ]
    for k in every:
        s = d["sources"][k]
        iri = LICENCES[s["license"]][0]
        out += ["", f"<{s['url']}>", f"    dcterms:title {lit(s['title'])} ;",
                f"    dcterms:creator {lit(s['creator'])}" + (" ;" if iri else " .")]
        if iri:
            out.append(f"    dcterms:license <{iri}> .")
    for c in d["cards"]:
        out += ["", f"<#{c['id']}>", "    a solid-memo:Card ;", "    solid-memo:formatVersion 4 ;",
                f'    dcterms:created "{d["created"]}"^^xsd:dateTime ;']
        fields = [("front", "solid-memo:front"), ("frontNote", "solid-memo:frontNote"),
                  ("backLabel", "solid-memo:backLabel"), ("back", "solid-memo:back"),
                  ("backNote", "solid-memo:backNote")]
        present = [(f, pred) for f, pred in fields if f in c]
        for i, (f, pred) in enumerate(present):
            out.append(triple(pred, lang_lits(c[f]), last=i == len(present) - 1))
    return "\n".join(out) + "\n"


# --------------------------------------------------------------------------- report


def md_escape(s: str) -> str:
    return s.replace("|", "\\|").replace("\n", " ")


def side_text(value: dict) -> str:
    return " / ".join(f"{t}" + (f" ({l})" if l else "") for l, t in value.items())


def render_report(d: dict) -> str:
    name = d["name"]
    lic_iri, lic_name, _ = LICENCES[d["license"]]
    rounds = d["qualityControl"]["rounds"]
    findings = [f for r in rounds for f in r["findings"]]
    out = [
        f"# {d['title']['en']} — provenance report",
        "",
        f"<!-- Generated from authored/{name}.json by scripts/authored_decks.py. Do not edit: change the dossier and rebuild. -->",
        "",
        f"**Deck:** [`decks/{name}.ttl`](../decks/{name}.ttl) · **Cards:** {len(d['cards'])} · "
        f"**Licence:** [{lic_name}]({lic_iri}) · **Compiled by:** {d['creator']['name']} · "
        f"**Created:** {d['created'][:10]}",
        "",
        d["description"]["en"],
        "",
        "## Sources",
        "",
        "| Source | Creator | Licence | Role | Retrieved | Used for |",
        "|---|---|---|---|---|---|",
    ]
    for k, s in d["sources"].items():
        iri, lname, _ = LICENCES[s["license"]]
        licence = f"[{lname}]({iri})" if iri else lname
        out.append(f"| [{md_escape(s['title'])}]({s['url']}) | {md_escape(s['creator'])} | {licence} | "
                   f"{s['role']} | {s['retrieved']} | {md_escape(s['usedFor'])} |")
    out += ["", "**Content** sources supplied information that is in the cards. **Verification** sources were "
            "only consulted to confirm facts: nothing was copied from them.", "", "### Licence evidence", ""]
    for k, s in d["sources"].items():
        out.append(f"- **{s['title']}** — {s['licenseEvidence']}")
    out += ["", "## Licensing", "", d["licensing"], "", "## Method", ""]
    for i, para in enumerate(d["method"], 1):
        out.append(f"{i}. {para}")
    out += ["", "## Selection", "", d["selection"], ""]
    if d["queries"]:
        out += ["## Queries", ""]
        for q in d["queries"]:
            out += [f"**{q['purpose']}** ({d['sources'][q['source']]['title']})", "", "```", q["query"], "```", ""]
    out += ["## Quality control", "",
            f"{len(rounds)} rounds, {len(findings)} findings: "
            f"{sum(f['outcome'] == 'fixed' for f in findings)} fixed, "
            f"{sum(f['outcome'] == 'rejected' for f in findings)} rejected after checking, "
            f"{sum(f['outcome'] == 'no change needed' for f in findings)} needing no change. "
            f"Every card's Wikidata checks ({sum(len(c.get('checks', [])) for c in d['cards'])} in all) "
            "are re-run against live Wikidata by `scripts/authored_decks.py check` before every build.", ""]
    for r in rounds:
        out += [f"### Round {r['round']}: {r['lens']} ({r['date']})", "",
                f"**Reviewer:** {r['reviewer']} · **Scope:** {r['scope']}", "", r["summary"], ""]
        if r["findings"]:
            out += ["| Card | Issue | Resolution | Outcome |", "|---|---|---|---|"]
            for f in r["findings"]:
                out.append(f"| {md_escape(str(f.get('card', '—')))} | {md_escape(f['issue'])} | "
                           f"{md_escape(f['resolution'])} | {f['outcome']} |")
            out.append("")
    out += ["## Cards and evidence", "", "| Card | Front | Back | Evidence |", "|---|---|---|---|"]
    for c in d["cards"]:
        ev = "<br>".join(f"{d['sources'][e['source']]['title']}: {md_escape(e['locator'])} — "
                         f"{md_escape(e['says'])}" for e in c["evidence"])
        checks = c.get("checks", [])
        if checks:
            ev += "<br>Wikidata checks: " + ", ".join(
                f"{ch['qid']} {ch.get('label', ch.get('property'))} = {md_escape(str(ch.get('equals', ch.get('expect'))))}"
                for ch in checks)
        back = side_text(c["back"])
        if c.get("backNote"):
            back += f" — *{side_text(c['backNote'])}*"
        out.append(f"| `{c['id']}` | {md_escape(side_text(c['front']))} | {md_escape(back)} | {ev} |")
    return "\n".join(out) + "\n"


# --------------------------------------------------------------------------- main


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("command", choices=["check", "build", "sync"])
    ap.add_argument("names", nargs="*")
    ap.add_argument("--all", action="store_true", help="every dossier in authored/")
    ap.add_argument("--offline", action="store_true", help="skip the Wikidata checks")
    args = ap.parse_args()
    names = sorted(p.stem for p in AUTHORED.glob("*.json")) if args.all else args.names
    if not names:
        ap.error("name a deck, or --all")
    failed = False
    for name in names:
        try:
            d = load(name)
            problems = check_dossier(d, name)
            if not problems and args.command == "sync":
                problems = [f"{path.relative_to(ROOT)} is not what authored/{name}.json builds to: "
                            f"python3 scripts/authored_decks.py build {name}"
                            for path, text in ((DECKS / f"{name}.ttl", render_turtle(d)),
                                               (AUTHORED / f"{name}.md", render_report(d)))
                            if not path.exists() or path.read_text(encoding="utf-8") != text]
            elif not problems and not args.offline:
                problems = run_checks(d)
        except DossierError as e:
            problems = [str(e)]
        if problems:
            failed = True
            print(f"{name}: {len(problems)} problems", file=sys.stderr)
            for pr in problems:
                print(f"  {pr}", file=sys.stderr)
            continue
        n_checks = sum(len(c.get("checks", [])) for c in d["cards"])
        if args.command == "build":
            (DECKS / f"{name}.ttl").write_text(render_turtle(d), encoding="utf-8")
            (AUTHORED / f"{name}.md").write_text(render_report(d), encoding="utf-8")
            print(f"{name}: built decks/{name}.ttl and authored/{name}.md ({len(d['cards'])} cards, "
                  f"{n_checks} Wikidata checks{' skipped' if args.offline else ' passed'})", file=sys.stderr)
        elif args.command == "sync":
            print(f"{name}: in sync with its dossier", file=sys.stderr)
        else:
            print(f"{name}: ok ({len(d['cards'])} cards, {n_checks} Wikidata checks"
                  f"{' skipped' if args.offline else ' passed'})", file=sys.stderr)
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
