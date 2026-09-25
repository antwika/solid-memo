#!/usr/bin/env python3
"""Build English -> Swedish vocabulary decks (nouns, verbs or adjectives) from
Språkbanken's Flex frequency list, in the solid-memo Turtle deck format.

Generates decks/swedish-nouns.ttl, swedish-verbs.ttl and swedish-adjectives.ttl.
Python 3.10+, standard library only. Everything (~300 MB) is streamed over HTTP
and processed in memory on every run (~20 s); nothing is written to disk except
the deck(s) named with -o.

USAGE
  python3 scripts/generate_decks_for_swedish_learning.py \\
      --pos nouns      -o decks/swedish-nouns.ttl \\
      --pos verbs      -o decks/swedish-verbs.ttl \\
      --pos adjectives -o decks/swedish-adjectives.ttl \\
      --creator "Name <email>"

  --pos and -o pair up in order; giving several avoids re-downloading per deck.
  --top (default 1000) sets the cards per deck, --min-freq (default 1 per
  million) drops rare word forms early, --title overrides the generated title,
  --closed-class-prior tunes the ambiguity heuristic described below.

SOURCES (all fetched on every run)
  Flex      https://sprakbanken.se/resurser/flex        CC BY 4.0
            relative frequency of every word *form* in novels, newspapers and
            web forums (Språkbanken Text, University of Gothenburg)
  SALDO     https://spraakbanken.gu.se/resurser/saldom   CC BY 4.0
            morphology: every inflected form -> lemma + part of speech; noun
            paradigms carry gender (Språkbanken)
  Folkets   https://folkets-lexikon.csc.kth.se           CC BY-SA 2.5
            Swedish -> English glosses, many entries linked to SALDO lemmas (KTH)
  Folkets is share-alike, so the decks are CC BY-SA 4.0.

METHOD
  Flex has no part-of-speech information, so every word form is looked up in
  SALDO and its frequency credited to the lemma(s) it belongs to. Nouns, verbs
  and adjectives are then ranked per lemma and the top N with a Folkets
  translation become cards.

  1. Stream saldom.xml and build  word form -> [lemgram, ...]
     (a lemgram is SALDO's lemma id, "hus..nn.1"; the POS is inside it).
  2. Stream flex.csv (from its zip), keep rows with combined frequency >= --min-freq.
  3. Look each word form up. Unambiguous forms sum onto their lemgram.
  4. Rank the lemmas of the requested POS, gloss them from Folkets, emit the
     top N that have a translation: English on the front, Swedish on the back.

  Decisions that shape the result:

  * Ambiguous forms. Many forms belong to several lemmas ("var" is a form of
    the verb vara, the pronoun var and the adverb var). With no sentence
    context, a form's frequency is split between candidates in proportion to
    the frequency each candidate already collected from its *unambiguous*
    forms. Closed-class words (pronouns, conjunctions, prepositions, ...) and
    uninflected adverbs get a fixed prior instead (--closed-class-prior,
    default 2000) because they have no other forms to collect evidence from;
    without it "men" would go to the rare noun rather than the conjunction.
    Weights are frozen before splitting so the result is order-independent.
  * Excluded from SALDO: multiword expressions (they list their constituent
    words as forms and would swallow every function word), compound-building
    stems ("upphäv-"), and inflections of single-letter lemmas (the letter r
    inflects to "ren", a homograph of reindeer). Single-letter lemmas are also
    dropped from the decks themselves.
  * Sense splits (vara..vb.1 be / vara..vb.2 last) are merged into one card
    per lemma, with the most frequent sense's glosses first.
  * Glosses come from Folkets by SALDO lemgram link where one exists, else by
    spelling and word class (untagged Folkets entries first, since they hold
    the core sense). Values are split on , and ;, de-duplicated
    case-insensitively and capped at four per card.
  * Skipped cards: lemmas with no Folkets translation, and lower-frequency
    lemmas whose gloss set is identical to a more frequent one (the front
    would have two right answers). The run prints both counts per deck.
  * Backs are always one word: the SALDO lemma, with en/ett prepended for
    nouns whose paradigm has fixed gender. Particle verbs (komma ihåg) and
    reflexives (gifta sig) are therefore absent or shown bare. Fronts and
    backs are sentence-cased.

KNOWN QUIRKS
  * Folkets sometimes leads with a minor sense, and its SALDO links can be
    loose: "vara" reads "last, am/are/is" (the "be" entry is untagged and
    unlinked), "skola" reads "train, teach" (the modal lives under "ska").
  * Web-forum English leaks into Flex: "the" ranks high as a "noun" because
    SALDO knows it as an archaic spelling of te (tea). Folkets has no gloss
    for it, so it is skipped, but similar cases may survive further down.

PROVENANCE IN THE DECKS
  Each deck records how it was made in W3C PROV-O: prov:wasDerivedFrom the
  three sources, and prov:wasGeneratedBy an activity naming the exact command
  line (rdfs:comment) and this script as a prov:SoftwareAgent. The script URL
  is pinned to the commit at HEAD when the script is committed and unmodified
  there -- the commit that will hold the generated decks cannot be referenced,
  as its SHA depends on their bytes -- otherwise it points at main and the run
  prints a warning. To get a pinned URL: commit the script first, then
  generate, then commit the decks.
"""

from __future__ import annotations

import argparse
import csv
import io
import os
import re
import shlex
import subprocess
import sys
import unicodedata
import urllib.request
import xml.etree.ElementTree as ET
import zipfile
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path

FLEX_URL = "https://spraakbanken.gu.se/resurser/data/flex.csv.zip"
FLEX_ZIP_MEMBER = "flex.csv"
SALDOM_URL = "https://svn.spraakdata.gu.se/sb-arkiv/pub/lmf/saldom/saldom.xml"
FOLKETS_URL = "https://folkets-lexikon.csc.kth.se/folkets/folkets_sv_en_public.xml"

# deck name -> (SALDO POS, Folkets word class, English label)
POS_CHOICES = {
    "nouns": ("nn", "nn", "nouns"),
    "verbs": ("vb", "vb", "verbs"),
    "adjectives": ("av", "jj", "adjectives"),
}

# msd values that mark compound-building stems ("upphäv-"), not real word forms.
COMPOUND_MSD = {"c", "ci", "cm", "sms"}

# Closed-class POS: uninflected, so they never collect "unambiguous" evidence in
# pass 1. Given a prior so that "men" goes to the conjunction, not the rare noun.
CLOSED_CLASS = {"pn", "kn", "pp", "sn", "in", "ie", "al", "nl"}

MAX_GLOSSES = 4  # English translations shown on the front of a card


# --------------------------------------------------------------------------- fetch


def open_url(url: str):
    print(f"fetching {url}", file=sys.stderr)
    return urllib.request.urlopen(url)


# --------------------------------------------------------------------------- SALDO


class Saldo:
    """word form -> lemgram indices, plus per-lemgram metadata."""

    def __init__(self) -> None:
        self.lemgrams: list[str] = []
        self.n_forms: list[int] = []
        self.paradigm: list[str] = []
        self.forms: dict[str, tuple[int, ...]] = {}

    @classmethod
    def load(cls, stream) -> "Saldo":
        self = cls()
        forms: dict[str, set[int]] = defaultdict(set)
        n_entries = 0

        for _, entry in ET.iterparse(stream, events=("end",)):
            if entry.tag != "LexicalEntry":
                continue
            n_entries += 1

            lemgram = paradigm = None
            for feat in entry.iterfind("./Lemma/FormRepresentation/feat"):
                att = feat.get("att")
                if att == "lemgram":
                    lemgram = feat.get("val")
                elif att == "paradigm":
                    paradigm = feat.get("val")
            # Skip multiword expressions ("i_akt_och_mening_att..snm.1"): SALDO
            # lists their constituent words as WordForms, which would swallow
            # every function word in the frequency list.
            if lemgram is None or "_" in lemma_of(lemgram) or is_multiword_pos(pos_of(lemgram)):
                entry.clear()
                continue

            idx = len(self.lemgrams)
            self.lemgrams.append(lemgram)
            self.paradigm.append(paradigm or "")
            lemma = lemma_of(lemgram)
            own_forms: set[str] = set()

            for wf in entry.iterfind("WordForm"):
                written = msd = None
                for feat in wf.iterfind("feat"):
                    att = feat.get("att")
                    if att == "writtenForm":
                        written = feat.get("val")
                    elif att == "msd":
                        msd = feat.get("val")
                if not written or msd in COMPOUND_MSD or written.endswith("-"):
                    continue
                # Letter names ("r..nn.1") inflect to "ren", "ret" — homographs
                # of real words. Let single-letter lemmas match only their bare
                # form, so "i" finds the preposition but "ren" never maps to "r".
                if len(lemma) == 1 and written != lemma:
                    continue
                forms[written].add(idx)
                own_forms.add(written)

            self.n_forms.append(len(own_forms))
            entry.clear()  # keep memory flat while streaming a 250 MB document

            if n_entries % 20000 == 0:
                print(f"\r  saldo: {n_entries} entries, {len(forms)} forms", end="", file=sys.stderr)

        print(file=sys.stderr)
        self.forms = {w: tuple(sorted(ids)) for w, ids in forms.items()}
        return self

    def lookup(self, word: str) -> tuple[int, ...] | None:
        # Flex is lowercased; SALDO capitalises proper nouns ("Sverige").
        return self.forms.get(word) or self.forms.get(word.lower()) or self.forms.get(word.capitalize())

    def article(self, idx: int) -> str | None:
        """'en' / 'ett' for a noun, from its paradigm name ("nn_6n_hus" -> n -> ett)."""
        m = re.match(r"nn_[0-9a-z]*?([un])(_|$)", self.paradigm[idx])
        return {"u": "en", "n": "ett"}[m.group(1)] if m else None


def pos_of(lemgram: str) -> str:
    # "upphäva..vb.2" -> "vb"
    return lemgram.rsplit("..", 1)[1].split(".", 1)[0]


def lemma_of(lemgram: str) -> str:
    return lemgram.rsplit("..", 1)[0]


def is_multiword_pos(pos: str) -> bool:
    # "nnm", "vbm", "abm", ... are the multiword variants of "nn", "vb", "ab".
    # ("pm" is a proper noun, not multiword — hence the length check.)
    return len(pos) == 3 and pos.endswith("m")


# --------------------------------------------------------------------------- Flex


def read_flex(stream, min_freq: float):
    """Yield (word, total_freq) for rows above the threshold, straight from the zip."""
    with zipfile.ZipFile(io.BytesIO(stream.read())) as zf, zf.open(FLEX_ZIP_MEMBER) as raw:
        text = io.TextIOWrapper(raw, encoding="utf-8", newline="")
        for row in csv.reader(text, delimiter="\t"):
            if len(row) != 4:
                continue
            try:
                # some rows have a blank cell for a corpus the word never occurs in
                total = sum(float(x) if x else 0.0 for x in row[1:])
            except ValueError:
                continue
            if total >= min_freq:
                yield row[0], total


# --------------------------------------------------------------------------- Folkets


class Folkets:
    """Swedish -> English glosses, keyed by SALDO lemgram and by (word, class)."""

    def __init__(self) -> None:
        self.by_lemgram: dict[str, list[str]] = defaultdict(list)
        self.by_word: dict[tuple[str, str], list[str]] = defaultdict(list)

    @classmethod
    def load(cls, stream) -> "Folkets":
        self = cls()
        n = 0
        for _, word in ET.iterparse(stream, events=("end",)):
            if word.tag != "word":
                continue
            n += 1
            # direct <translation> children only — not the ones inside
            # <example>, <definition> or <idiom>
            glosses = [t.get("value") for t in word.findall("translation") if t.get("value")]
            if glosses:
                self.by_word[(word.get("value", ""), word.get("class", ""))].extend(glosses)
                for see in word.findall("see"):
                    if see.get("type") == "saldo":
                        # "hus||hus..1||hus..nn.1" -> "hus..nn.1"
                        self.by_lemgram[see.get("value", "").rsplit("||", 1)[-1]].extend(glosses)
            word.clear()
        print(f"  folkets: {n} entries, {len(self.by_lemgram)} linked to SALDO", file=sys.stderr)
        return self

    def glosses(self, lemgrams: list[str], lemma: str, word_class: str) -> list[str]:
        """Up to MAX_GLOSSES English glosses, in lemgram order (pass the most
        frequent sense first so it leads the card)."""
        raw: list[str] = []
        for lg in lemgrams:
            raw += self.by_lemgram.get(lg, [])
        if not raw:
            # Spelling fallback. Folkets' untagged entries (class="") carry the
            # core sense ("vara" -> be, "skola" -> will/shall) while the tagged
            # ones may be minor senses (vara/vb -> last), so untagged go first.
            raw = self.by_word.get((lemma, ""), []) + self.by_word.get((lemma, word_class), [])

        out: dict[str, str] = {}  # lowercase -> first spelling seen
        for value in raw:
            # one Folkets value can hold several glosses: "possess; be provided with"
            for g in re.split(r"[;,]", value):
                g = g.strip()
                if word_class == "vb":
                    g = re.sub(r"^to ", "", g)  # a few verb glosses carry "to", most don't
                if g:
                    out.setdefault(g.lower(), g)
        return list(out.values())[:MAX_GLOSSES]


# --------------------------------------------------------------------------- ranking


def rank_lemmas(saldo: Saldo, rows: list[tuple[str, float]], closed_class_prior: float):
    """Return {lemgram idx: summed frequency} over all POS."""
    freq: dict[int, float] = defaultdict(float)
    ambiguous: list[tuple[float, tuple[int, ...]]] = []
    n_unknown = 0

    # Pass 1: unambiguous forms give each lemgram its evidence.
    for word, f in rows:
        cands = saldo.lookup(word)
        if not cands:
            n_unknown += 1
        elif len(cands) == 1:
            freq[cands[0]] += f
        else:
            ambiguous.append((f, cands))

    # Pass 2: split ambiguous forms by each candidate's unambiguous mass plus a
    # prior. Candidates that cannot gather evidence — closed-class words (kn, pp,
    # pn, ...) and uninflected adverbs — get the prior, since a homograph that is
    # a conjunction or adverb is almost always that rather than the rare noun
    # ("men", "nu", "här"). Everything else gets a tiny floor so it is never
    # exactly 0. (Single-form *adjectives* like "på..av.1" do not get the prior:
    # they would otherwise tie with the preposition.) Weights are frozen from
    # pass 1 so the result does not depend on processing order.
    FLOOR = 0.01
    base_mass = dict(freq)

    def prior(c: int) -> float:
        pos = pos_of(saldo.lemgrams[c])
        if pos in CLOSED_CLASS or (pos == "ab" and saldo.n_forms[c] == 1):
            return closed_class_prior
        return FLOOR

    for f, cands in ambiguous:
        weights = [base_mass.get(c, 0.0) + prior(c) for c in cands]
        total_w = sum(weights)
        for c, w in zip(cands, weights):
            freq[c] += f * w / total_w

    print(f"  {len(rows)} forms: {len(rows) - len(ambiguous) - n_unknown} unambiguous, "
          f"{len(ambiguous)} ambiguous (split), {n_unknown} not in SALDO", file=sys.stderr)
    return freq


def lemmas_for_pos(saldo: Saldo, freq: dict[int, float], pos: str):
    """Merge SALDO sense splits ("vara..vb.1" be / "vara..vb.2" last) into one
    entry per lemma, ranked by frequency: [(lemma, [lemgrams], freq, idx), ...].
    Within an entry the lemgrams are ordered most frequent first, so the
    dominant sense's glosses lead the card; idx is that dominant lemgram."""
    merged: dict[str, list[tuple[float, int]]] = defaultdict(list)
    for idx, f in freq.items():
        lg = saldo.lemgrams[idx]
        if pos_of(lg) != pos:
            continue
        lemma = lemma_of(lg)
        if len(lemma) == 1:
            continue  # letter names ("a..nn.1", "t..nn.1") are not vocabulary
        merged[lemma].append((f, idx))

    entries = []
    for lemma, senses in merged.items():
        senses.sort(key=lambda t: -t[0])
        entries.append((lemma, [saldo.lemgrams[i] for _, i in senses], sum(f for f, _ in senses), senses[0][1]))
    return sorted(entries, key=lambda t: -t[2])


# --------------------------------------------------------------------------- provenance

REPO_URL = "https://github.com/antwika/solid-memo"


def script_provenance() -> tuple[str, str]:
    """Return (script_url, command) describing this run for the deck's PROV block.

    The URL points at the script in the GitHub repo. It is pinned to the commit
    at HEAD only when the script is committed there and unmodified — the commit
    that will later hold the generated decks cannot be known yet (its SHA
    depends on their bytes), but the commit holding the script as it ran can.
    Otherwise it falls back to `main` and warns.
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


def sentence_case(s: str) -> str:
    # only the first character; str.capitalize() would lowercase "Swedish", "US"
    return s[:1].upper() + s[1:]


def slug(s: str) -> str:
    ascii_ = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", ascii_.lower()).strip("-") or "card"


SOURCES = (
    "<https://sprakbanken.se/resurser/flex>",
    "<https://spraakbanken.gu.se/resurser/saldom>",
    "<https://folkets-lexikon.csc.kth.se/folkets/>",
)


def write_deck(path: Path, *, title: str, description: str, creator: str | None,
               cards: list[tuple[str, str]], created: str, script_url: str, command: str) -> None:
    deck_slug = slug(path.stem)
    def objects(predicate: str) -> str:
        """The sources as a Turtle object list, continuation lines aligned under the first."""
        return (" ,\n" + " " * (5 + len(predicate))).join(SOURCES)

    out: list[str] = [
        f"@base <https://solid-memo.com/decks/{deck_slug}> .",
        "",
        "@prefix solid-memo: <https://solid-memo.com/vocab/v1#> .",
        "@prefix dcterms:    <http://purl.org/dc/terms/> .",
        "@prefix prov:       <http://www.w3.org/ns/prov#> .",
        "@prefix rdfs:       <http://www.w3.org/2000/01/rdf-schema#> .",
        "@prefix xsd:        <http://www.w3.org/2001/XMLSchema#> .",
        "",
        "<>",
        "    a solid-memo:Deck ;",
        f"    dcterms:title {ttl_str(title)} ;",
    ]
    if creator:
        out.append(f"    dcterms:creator {ttl_str(creator)} ;")
    out += [
        "    dcterms:license <https://creativecommons.org/licenses/by-sa/4.0/> ;",
        f"    dcterms:description {ttl_str(description)} ;",
        f"    dcterms:source {objects('dcterms:source')} ;",
        f"    prov:wasDerivedFrom {objects('prov:wasDerivedFrom')} ;",
        "    prov:wasGeneratedBy <#generation> ;",
        f'    dcterms:created "{created}"^^xsd:dateTime ;',
        '    solid-memo:direction "front-to-back" ;',
        "    solid-memo:formatVersion 2 .",
        "",
        "# How this deck was produced (W3C PROV-O). Re-run the command below to regenerate it.",
        "<#generation>",
        "    a prov:Activity ;",
        f'    prov:endedAtTime "{created}"^^xsd:dateTime ;',
        f"    prov:used {objects('prov:used')} ;",
        f"    prov:wasAssociatedWith <{script_url}> ;",
        f"    rdfs:comment {ttl_str(command)} .",
        "",
        f"<{script_url}>",
        "    a prov:SoftwareAgent ;",
        f"    dcterms:title {ttl_str(Path(script_url).name)} .",
        "",
        "<https://sprakbanken.se/resurser/flex>",
        '    dcterms:title "Flex (word frequencies in novels, newspapers and web forums)" ;',
        '    dcterms:creator "Språkbanken Text, University of Gothenburg" ;',
        "    dcterms:license <https://creativecommons.org/licenses/by/4.0/> .",
        "",
        "<https://spraakbanken.gu.se/resurser/saldom>",
        '    dcterms:title "SALDO morphology" ;',
        '    dcterms:creator "Språkbanken Text, University of Gothenburg" ;',
        "    dcterms:license <https://creativecommons.org/licenses/by/4.0/> .",
        "",
        "<https://folkets-lexikon.csc.kth.se/folkets/>",
        '    dcterms:title "Folkets lexikon (Swedish–English)" ;',
        '    dcterms:creator "KTH Royal Institute of Technology and contributors" ;',
        "    dcterms:license <https://creativecommons.org/licenses/by-sa/2.5/> .",
    ]

    used_ids: set[str] = set()
    for front, back in cards:
        base = slug(back)
        card_id, n = base, 2
        while card_id in used_ids:
            card_id, n = f"{base}-{n}", n + 1
        used_ids.add(card_id)
        out += [
            "",
            f"<#{card_id}>",
            "    a solid-memo:Card ;",
            "    solid-memo:formatVersion 1 ;",
            f'    dcterms:created "{created}"^^xsd:dateTime ;',
            f"    solid-memo:front {ttl_str(front)} ;",
            f"    solid-memo:back {ttl_str(back)} .",
        ]

    path.write_text("\n".join(out) + "\n", encoding="utf-8")


# --------------------------------------------------------------------------- main


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--pos", action="append", choices=sorted(POS_CHOICES), required=True,
                    help="word class of the deck; repeat, paired in order with -o, for several decks")
    ap.add_argument("-o", "--output", action="append", type=Path, required=True,
                    help="deck file to write (.ttl); repeat, paired in order with --pos")
    ap.add_argument("--top", type=int, default=1000, help="cards per deck (default 1000)")
    ap.add_argument("--min-freq", type=float, default=1.0,
                    help="drop word forms whose combined frequency (per million, summed "
                         "over the three corpora) is below this (default 1.0)")
    ap.add_argument("--title", action="append", default=[],
                    help="deck title; repeat, paired in order with --pos (default generated)")
    ap.add_argument("--creator", default=None, help='dcterms:creator, e.g. "Name <email>"')
    ap.add_argument("--closed-class-prior", type=float, default=2000.0,
                    help="weight (per-million units) given to closed-class and uninflected-adverb "
                         "readings when splitting an ambiguous form (default 2000)")
    args = ap.parse_args()

    if len(args.pos) != len(args.output):
        ap.error(f"got {len(args.pos)} --pos but {len(args.output)} -o; they pair up one to one")
    if args.title and len(args.title) != len(args.pos):
        ap.error("--title must be given once per --pos, or not at all")
    for p in args.output:
        if p.suffix != ".ttl":
            ap.error(f"{p}: output must be a .ttl file")

    with open_url(SALDOM_URL) as resp:
        saldo = Saldo.load(resp)
    print(f"  {len(saldo.lemgrams)} lemgrams, {len(saldo.forms)} distinct word forms", file=sys.stderr)

    with open_url(FLEX_URL) as resp:
        rows = list(read_flex(resp, args.min_freq))
    freq = rank_lemmas(saldo, rows, args.closed_class_prior)

    with open_url(FOLKETS_URL) as resp:
        folkets = Folkets.load(resp)

    created = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.000Z")
    script_url, command = script_provenance()

    for i, (pos_name, out_path) in enumerate(zip(args.pos, args.output)):
        saldo_pos, folkets_class, label = POS_CHOICES[pos_name]
        ranked = lemmas_for_pos(saldo, freq, saldo_pos)

        cards: list[tuple[str, str]] = []
        used_fronts: set[str] = set()
        n_untranslated = n_dup_front = 0
        for lemma, lemgrams, _f, idx in ranked:
            if len(cards) >= args.top:
                break
            glosses = folkets.glosses(lemgrams, lemma, folkets_class)
            if not glosses:
                n_untranslated += 1
                continue
            front = ", ".join(glosses)
            if front in used_fronts:
                n_dup_front += 1  # a less frequent word with the exact same glosses
                continue
            used_fronts.add(front)
            back = lemma
            if saldo_pos == "nn" and (art := saldo.article(idx)):
                back = f"{art} {lemma}"
            cards.append((sentence_case(front), sentence_case(back)))

        title = args.title[i] if args.title else f"Swedish {label}: the {len(cards)} most common"
        # Learner-facing blurb only; how the deck was made is in its PROV block.
        description = (
            f"The {len(cards)} most frequent Swedish {label}, ranked by how often they appear in "
            "novels, newspapers and web forums. English on the front, Swedish on the back"
            + (" with its en/ett article" if saldo_pos == "nn" else "")
            + ". Frequencies from Språkbanken's Flex, word classes from SALDO, translations from Folkets lexikon."
        )
        write_deck(out_path, title=title, description=description, creator=args.creator, cards=cards,
                   created=created, script_url=script_url, command=command)
        print(f"wrote {out_path}: {len(cards)} cards  (skipped {n_untranslated} without a Folkets "
              f"translation, {n_dup_front} with duplicate fronts)", file=sys.stderr)


if __name__ == "__main__":
    main()
