# Roman numerals — provenance report

<!-- Generated from authored/roman-numerals.json by scripts/authored_decks.py. Do not edit: change the dossier and rebuild. -->

**Deck:** [`decks/roman-numerals.ttl`](../decks/roman-numerals.ttl) · **Cards:** 40 · **Licence:** [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) · **Compiled by:** Anton Wiklund · **Created:** 2026-10-04

40 Roman numerals in the standard modern notation: the seven symbols I, V, X, L, C, D and M, the six subtractive pairs IV, IX, XL, XC, CD and CM, and 27 further numbers from 2 to 3999, among them years such as MCMXCIX (1999) and MMXXVI (2026). Front: the Roman numeral; back: its value in Arabic numerals; studied in both directions. Notes name older forms such as IIII on clock faces. Every card was computed and checked by two independent converters and against English Wikipedia's table of the standard form, and against Wikidata, Wiktionary and Swedish Wikipedia where they cover the numeral.

## Sources

| Source | Creator | Licence | Role | Retrieved | Used for |
|---|---|---|---|---|---|
| [Conversion and machine checks for the Solid Memo Roman numerals deck](https://github.com/antwika/solid-memo/blob/main/packages/deck-library/authored/roman-numerals.json) | Anton Wiklund (compiler); written by Claude (Anthropic, AI) at his direction | [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) | content | 2026-10-04 | The selection of the 40 numerals, the convention (standard subtractive notation, 1 to 3999), every front and back (each numeral and value computed by the compiler's own converter), the wording of the notes in English and Swedish, and the machine verification of every card with verify_roman.py (query 13): own converter in both directions, an exhaustive self-test over 1–3999 against the independent implementation in the PyPI package roman 5.2, negative controls, and the facts in the notes (3999 the largest, 3888 the longest, MDCLXVI each symbol once). The URL resolves once the dossier is merged into the main branch. |
| [Wikidata: the items for the Roman numerals 1–12, 50, 100, 500 and 1000 (instances of Roman numerals, Q38918), with their English labels and aliases and numeric values (P1181)](https://www.wikidata.org/wiki/Q38918) | Wikidata contributors | [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) | content | 2026-10-04 | Second check of the 14 cards whose numeral has a Wikidata item (I, II, III, IV, V, VI, VIII, IX, X, XII, L, C, D, M): each item is an instance of Roman numerals (Q38918), its English alias is the numeral in Latin letters and its numeric value (P1181) is the card's back. The builder checks the value, the class and the alias against live Wikidata. The value agrees with the compiler's own computation; nothing else was taken. |
| [Roman numerals (English Wikipedia), revision 1377908551](https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551) | Wikipedia contributors | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | verification | 2026-10-04 | Independent check of every card against the article's table of the standard form ("Individual decimal places": the numeral for each digit 1–9 of the units, tens and hundreds and 1–3 of the thousands; each card's evidence names the cells its numeral is made of), its worked examples 39 = XXXIX and 1776 = MDCCLXXVI, its statement that 3999 (MMMCMXCIX) is the largest number written this way, the line that MediaWiki renders as the current year (MMXXVI on 2026-10-04), and the older additive forms IIII, VIIII, XXXX and CCCC and IIII on clock faces named in four notes, and the historical subtractive forms IIC and IC that qualify the notes of XLIX and XCIX. Nothing copied: the selection and wording are the deck's own. |
| [Romerska siffror (Swedish Wikipedia), revision 59692021](https://sv.wikipedia.org/w/index.php?title=Romerska_siffror&oldid=59692021) | Wikipedia contributors | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | verification | 2026-10-04 | Check of the Swedish terms (romerska siffror; tecken; subtrahera; urtavla) and of the 19 cards whose numeral or rule the article states: the seven symbols, II, CCC, IV, IX, CM, VI, VIII, XCIX (not IC), MCMXCIX (not MIM), the rule that I is subtracted only from V and X and its exception IC in older use (notes of XLIX and XCIX), and IIII, XXXX and CCCC as older forms (IIII on clocks, in an image caption). Nothing copied. |
| [English Wiktionary: Translingual entries for Roman numerals](https://en.wiktionary.org/wiki/Category:Roman_numerals) | Wiktionary contributors | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | verification | 2026-10-04 | Further check of the 25 cards whose numeral has a Translingual entry giving its value as a Roman numeral (the definition line is quoted in each card's evidence, with the revision). Of the 40 numerals, MCMXCIX, MMXXVI, MMMDCCCLXXXVIII, MMMCMXCIX, CDXLIV, DCCC, CMXCIX, MDCLXVI, MCDXCII, MDCCLXXVI, MCMXLV and MCMLXXXIV have no entry, and the entries CCC, CD and CM give no Roman numeral sense (query 6, query 12). |
| [roman 5.2 (Python package: integer to Roman numerals converter)](https://pypi.org/project/roman/5.2/) | Mark Pilgrim (author); Zope Foundation and Contributors (maintainers) | Unknown | verification | 2026-10-04 | Independent implementation of standard Roman numerals (toRoman, fromRoman), installed with uv (--with roman==5.2) and run by verify_roman.py: its results agree with the compiler's converter on every number from 1 to 3999 and on every card. |

**Content** sources supplied information that is in the cards. **Verification** sources were only consulted to confirm facts: nothing was copied from them.

### Licence evidence

- **Conversion and machine checks for the Solid Memo Roman numerals deck** — Own work of the deck's compiler, dedicated to the public domain together with the deck: the deck's dcterms:license is https://creativecommons.org/publicdomain/zero/1.0/ (CC0 1.0 Universal). The value of a Roman numeral is a mathematical fact, which is not copyrightable; the selection of numbers and the wording of the notes are this dossier's own. The verification script is recorded verbatim under Queries (query 13).
- **Wikidata: the items for the Roman numerals 1–12, 50, 100, 500 and 1000 (instances of Roman numerals, Q38918), with their English labels and aliases and numeric values (P1181)** — https://www.wikidata.org/wiki/Wikidata:Licensing (raw text fetched 2026-10-04, query 5): "All structured data (i.e. the main, Property, Lexeme, and EntitySchema namespaces) is released into the public domain under Creative Commons Zero."
- **Roman numerals (English Wikipedia), revision 1377908551** — Footer of the article page (https://en.wikipedia.org/wiki/Roman_numerals, fetched 2026-10-04, query 9): "Text is available under the Creative Commons Attribution-ShareAlike 4.0 License; additional terms may apply." Used for verification only: nothing is copied from it.
- **Romerska siffror (Swedish Wikipedia), revision 59692021** — Footer of the article page (https://sv.wikipedia.org/wiki/Romerska_siffror, fetched 2026-10-04, query 10): "Wikipedias text är tillgänglig under licensen Creative Commons Erkännande-dela-lika 4.0 Unported." Used for verification only: nothing is copied from it.
- **English Wiktionary: Translingual entries for Roman numerals** — Footer of every Wiktionary page (e.g. https://en.wiktionary.org/wiki/MCM, fetched 2026-10-04, query 7, read by query 12): "Definitions and other text are available under the Creative Commons Attribution-ShareAlike License; additional terms may apply.", linking to https://creativecommons.org/licenses/by-sa/4.0/. Used for verification only: nothing is copied from it.
- **roman 5.2 (Python package: integer to Roman numerals converter)** — PyPI metadata of the package (https://pypi.org/pypi/roman/json, fetched 2026-10-04, query 11): "license": "ZPL-2.1", classifier "License :: OSI Approved :: Zope Public License". The Zope Public License 2.1 is a permissive software licence that the builder has no identifier for, so it is recorded as "unknown". The package was only run as an independent implementation to check the compiler's converter: nothing from it is in the deck.

## Licensing

The deck's content is the compiler's own: the selection of the 40 numbers, the convention and the wording of the notes are his, and the value of a Roman numeral is a mathematical fact, computed here by his own script. The only other content source is Wikidata (CC0), whose numeric values agree for 14 numerals. So the deck is CC0 1.0 like the rest of the library. The English and Swedish Wikipedia articles and Wiktionary (CC BY-SA 4.0) and the roman Python package (Zope Public License 2.1, recorded as unknown) were used for verification only: they confirmed facts the cards already had, and no wording, table or selection was copied from them. The deck's selection is not the Wikipedia table (which lists digit forms, not numbers) nor any list of examples. Three of the numbers, 39, 1776 and 3999, coincide with the English article's worked examples; within the editor's brief, 39 was chosen as a subtractive pair combined with other symbols, 1776 as a year often met in Roman numerals and 3999 as the largest standard numeral. Three isolated numbers are facts, not a copied selection.

## Method

1. Who did the work: Anton Wiklund compiled this deck with the help of AI agents (Claude, by Anthropic), which did the research, drafting and cross-checking at his direction. The cards were checked by machine (a Python conversion script with an independent implementation, live Wikidata and the app's SHACL and DCAT-AP validators) and in independent review rounds by further Claude agents, each logged under Quality control with its findings and how they were resolved. Anton Wiklund reviews every deck in full before it is released.
2. 1. Convention: the deck uses the standard modern notation, the one in which every number from 1 to 3999 has exactly one numeral: a number is written digit by digit, from the thousands down, each digit by its fixed form (units I, II, III, IV, V, VI, VII, VIII, IX; tens X to XC and hundreds C to CM likewise; thousands M, MM, MMM), and a zero digit is left out. Subtraction therefore occurs only in the six pairs IV, IX, XL, XC, CD and CM. This is what makes the cards unambiguous and lets them be studied in both directions; older and non-standard forms (IIII, VIIII, XXXX, CCCC, IL, IC, MIM) are named in notes, never on a front or back.
3. 2. Selection: the 40 numbers were chosen by the compiler following the library editor's brief, not taken from a list: the seven symbols (I, V, X, L, C, D, M); the six subtractive pairs (IV, IX, XL, XC, CD, CM); and 27 further numbers chosen to practise each kind of construction: small numbers (2, 3, 6, 8, 12, 14, 19, 24), numbers that combine a subtractive pair with other symbols (39, 42, 49, 99, 444, 999), repeated and additive forms (80, 300, 800, 2000), MDCLXVI (1666, each symbol once), years often met in Roman numerals (1492, 1776, 1945, 1984, 1999 and the current year 2026), the longest numeral below 4000 (3888) and the largest (3999).
4. 3. Fronts and backs: each front is the numeral in capital Latin letters (I, V, X, L, C, D, M; not the Unicode Roman numeral characters (U+2160–U+2188); the Swedish Wikipedia article, citing the Unicode Standard 5.0 for U+2160–U+2182, says these are meant mainly for text in Chinese characters and recommends ordinary letters instead) and each back the value in Arabic numerals without separators, both tagged zxx (text in no language). The backs are all different, so the deck is studied in both directions. The dossier nevertheless declares the back side as ["en", "sv"]: these are the languages of the back notes, and the builder takes the deck's languages (dcterms:language) only from the declared sides and the fronts and backs, so with both sides declared zxx it wrote an empty language list and the Turtle did not parse (QC round 0). Every front and back is still tagged zxx in the built deck.
5. 4. Machine verification (query 13): verify_roman.py, run with `uv run --with roman==5.2 python3 <scratch>/verify_roman.py <dossier>`, reads this dossier and (a) converts every front with the compiler's own strict parser, which accepts only numerals in standard notation, and with roman.fromRoman, and every back with the compiler's converter and with roman.toRoman (roman 5.2, the PyPI package of Mark Pilgrim and the Zope Foundation, an independent implementation); all four results must agree with the card; (b) checks that the front is the concatenation of the place-table forms of the back's digits (printed per card, e.g. 3888 = MMM + DCCC + LXXX + VIII); (c) runs both implementations over every number from 1 to 3999 (all agree) and checks that 4000 has no standard numeral; (d) checks that 16 non-standard strings (IIII, VIIII, XXXX, CCCC, IL, IC, IM, XM, VX, LC, DM, MIM, VV, MMMM, IXI and the empty string) are rejected; (e) computes the facts used in notes: 3999 = MMMCMXCIX is the largest number, 3888 the only number with the longest numeral (15 symbols), and MDCLXVI uses each of the seven symbols once. All 40 cards passed; the results are in each card's evidence.
6. 5. Wikidata (queries 1–4): a search for Wikidata items with a Unicode Roman numeral character (P487 in U+2160–U+2188, query 1) and for a Wikidata property holding Roman numerals (query 2: none exists) led to the class Roman numerals (Q38918); its instances (query 3) include one item per numeral for 1–12, 50, 100, 500 and 1000 (described "Roman numeral N", with the numeral in Latin letters as English alias and its value as P1181 numeric value). Their full data was fetched with wbgetentities (query 4, which also fetched the items for VII and XI, not in the deck, and two Unicode-character items, to understand a label anomaly). The 14 cards among these numerals have three builder checks each (P1181 value, P31 Q38918, English alias), run against live Wikidata on every build. No Wikidata item exists for the other 26 numerals.
7. 6. Second and third sources for every card: the English Wikipedia article Roman numerals (revision 1377908551 of 2026-10-01, the current revision on 2026-10-04; wikitext through the API, query 8, and the rendered page, query 9) states the standard form in a table of the numeral for each digit of each decimal place; every card's numeral was compared with the cells for its digits, and the article's own examples (39, 1776, 3999 and the current year, rendered by MediaWiki as MMXXVI) were compared where they exist. The English Wiktionary's Translingual entries (query 6 listed which exist, query 7 fetched them) give the value of 25 of the numerals. The Swedish Wikipedia article Romerska siffror (revision 59692021, query 10) states 19 of the numerals or the rules in their notes. All agree with the cards; no discrepancy was found.
8. 7. Swedish text: the notes were written in Swedish by the compiler, with the terms of the Swedish Wikipedia article (romerska siffror, tecken, subtraheras, urtavla) and Wikidata's Swedish alias "Romerska siffror" of Q38918 for the deck's title. Numbers and numerals are the same in both languages and are tagged zxx.
9. 8. Excluded: numbers of 4000 and more (no standard notation: overlines, the apostrophus forms CIↃ and the Unicode characters ↁ ↂ ↇ ↈ vary by period and source); zero and fractions (no Roman numeral in the standard system); lower-case numerals (i, ii, …), which are the same numerals in another case; non-standard forms as fronts or backs, because a card must have one answer.

## Selection

40 numerals in the standard modern notation, all between 1 and 3999: the seven symbols I (1), V (5), X (10), L (50), C (100), D (500) and M (1000); the six subtractive pairs IV (4), IX (9), XL (40), XC (90), CD (400) and CM (900); and 27 further numbers chosen by the compiler to practise each construction: 2, 3, 6, 8, 12, 14, 19, 24, 39, 42, 49, 80, 99, 300, 444, 800, 999, 1492, 1666, 1776, 1945, 1984, 1999, 2000, 2026 (the year of the deck), 3888 (the longest numeral below 4000) and 3999 (the largest). Standard notation means each number is written digit by digit from the thousands down, so every number has exactly one numeral and the deck can be studied both ways. Left out: numbers of 4000 and more (written with overlines or special forms that vary by period), zero and fractions, lower-case numerals, and the Unicode Roman numeral characters. Older additive forms (IIII, VIIII, XXXX, CCCC) and the non-standard IL, IC and MIM appear only in the notes of the cards they concern.

## Queries

**1. Items with a Unicode Roman numeral character (P487 in U+2160–U+2188), their numeric value and labels (sh <scratch>/run.sh q1; run.sh, verbatim: "#!/bin/sh\n# Usage: sh run.sh qN  -> runs qN.rq against the Wikidata Query Service, writes qN.csv\nH=$(dirname \"$0\")\ncurl -s -H \"User-Agent: solid-memo deck research (https://github.com/antwika/solid-memo)\" -H \"Accept: text/csv\" --data-urlencode query@\"$H/$1.rq\" https://query.wikidata.org/sparql > \"$H/$1.csv\"\nwc -l \"$H/$1.csv\"\n"; for q1 it runs: curl -s -H "User-Agent: solid-memo deck research (https://github.com/antwika/solid-memo)" -H "Accept: text/csv" --data-urlencode query@<scratch>/q1.rq https://query.wikidata.org/sparql > <scratch>/q1.csv)** (Wikidata: the items for the Roman numerals 1–12, 50, 100, 500 and 1000 (instances of Roman numerals, Q38918), with their English labels and aliases and numeric values (P1181))

```
SELECT ?item ?char ?value ?en ?sv WHERE {
  ?item wdt:P487 ?char .
  FILTER(STRLEN(?char) = 1 && ?char >= "Ⅰ" && ?char <= "ↈ")
  OPTIONAL { ?item wdt:P1181 ?value }
  OPTIONAL { ?item rdfs:label ?en FILTER(LANG(?en) = "en") }
  OPTIONAL { ?item rdfs:label ?sv FILTER(LANG(?sv) = "sv") }
}
ORDER BY ?char

```

**2. Is there a Wikidata property for Roman numerals? (sh <scratch>/run.sh q2; none was found: the matches are romanization systems, Roman Empire/Republic databases and unrelated names containing 'roman' (Romania, Igromania, romantic))** (Wikidata: the items for the Roman numerals 1–12, 50, 100, 500 and 1000 (instances of Roman numerals, Q38918), with their English labels and aliases and numeric values (P1181))

```
SELECT ?p ?pLabel ?type WHERE {
  ?p a wikibase:Property ; wikibase:propertyType ?type ; rdfs:label ?l .
  FILTER(LANG(?l) = "en" && CONTAINS(LCASE(?l), "roman"))
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}

```

**3. The instances of Roman numerals (Q38918), with value, English label, description and aliases (sh <scratch>/run.sh q3)** (Wikidata: the items for the Roman numerals 1–12, 50, 100, 500 and 1000 (instances of Roman numerals, Q38918), with their English labels and aliases and numeric values (P1181))

```
SELECT ?item ?en ?desc ?value (GROUP_CONCAT(DISTINCT ?alias; separator="|") AS ?aliases) WHERE {
  ?item wdt:P31 wd:Q38918 .
  OPTIONAL { ?item wdt:P1181 ?value }
  OPTIONAL { ?item rdfs:label ?en FILTER(LANG(?en) = "en") }
  OPTIONAL { ?item schema:description ?desc FILTER(LANG(?desc) = "en") }
  OPTIONAL { ?item skos:altLabel ?alias FILTER(LANG(?alias) = "en") }
}
GROUP BY ?item ?en ?desc ?value
ORDER BY ?value

```

**4. Full labels, descriptions, aliases and statements of the 16 numeral items (1–12, 50, 100, 500, 1000; VII and XI are not in the deck), of Q38918 and of two Unicode-character items (Q87524053 Ⅵ, Q87524049 Ⅳ), fetched to understand the label anomaly of Q3594834 (saved as <scratch>/entities1.json)** (Wikidata: the items for the Roman numerals 1–12, 50, 100, 500 and 1000 (instances of Roman numerals, Q38918), with their English labels and aliases and numeric values (P1181))

```
curl -s -A "solid-memo deck research (https://github.com/antwika/solid-memo)" -o <scratch>/entities1.json "https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q3147025|Q3594830|Q3594832|Q3594831|Q3553034|Q3594834|Q3594833|Q3594835|Q3594836|Q3570499|Q3594837|Q3594839|Q3206231|Q2932176|Q3011516|Q3273364|Q38918|Q87524053|Q87524049&props=labels|descriptions|aliases|claims&languages=en|sv|mul&format=json"
```

**5. Licence of Wikidata's structured data (part of sh <scratch>/fetch.sh, then grep in <scratch>/read_pages.py)** (Wikidata: the items for the Roman numerals 1–12, 50, 100, 500 and 1000 (instances of Roman numerals, Q38918), with their English labels and aliases and numeric values (P1181))

```
curl -s -A "solid-memo deck research (https://github.com/antwika/solid-memo)" -o <scratch>/wd-licensing.txt "https://www.wikidata.org/w/index.php?title=Wikidata:Licensing&action=raw"
```

**6. Which of the 40 numerals have a Wiktionary entry (missing: CDXLIV, DCCC, CMXCIX, MDCLXVI, MCDXCII, MDCCLXXVI, MCMXLV, MCMLXXXIV, MCMXCIX, MMXXVI, MMMDCCCLXXXVIII, MMMCMXCIX)** (English Wiktionary: Translingual entries for Roman numerals)

```
curl -s -A "solid-memo deck research (https://github.com/antwika/solid-memo)" -o <scratch>/wikt-exists.json "https://en.wiktionary.org/w/api.php?action=query&format=json&titles=I|V|X|L|C|D|M|IV|IX|XL|XC|CD|CM|II|III|VI|VIII|XII|XIV|XIX|XXIV|XXXIX|XLII|XLIX|LXXX|XCIX|CCC|CDXLIV|DCCC|CMXCIX|MDCLXVI|MCDXCII|MDCCLXXVI|MCMXLV|MCMLXXXIV|MCMXCIX|MM|MMXXVI|MMMDCCCLXXXVIII|MMMCMXCIX&prop=revisions&rvprop=ids"
```

**7. Wikitext of the 28 existing entries, the rendered English article, the licence footers and the PyPI metadata (sh <scratch>/fetch.sh; the script, verbatim)** (English Wiktionary: Translingual entries for Roman numerals)

```
#!/bin/sh
# Fetches the raw pages used for verification into this directory.
H=$(dirname "$0")
UA="solid-memo deck research (https://github.com/antwika/solid-memo)"
# 1. Wiktionary wikitext of the entries that exist (wikt-exists.json lists them)
curl -s -A "$UA" -o "$H/wikt.json" "https://en.wiktionary.org/w/api.php?action=query&format=json&titles=I|V|X|L|C|D|M|IV|IX|XL|XC|CD|CM|II|III|VI|VIII|XII|XIV|XIX|XXIV|XXXIX|XLII|XLIX|LXXX|XCIX|CCC|MM&prop=revisions&rvprop=ids|timestamp|content&rvslots=main"
# 2. Rendered English Wikipedia article (the "this year" line uses MediaWiki's own Roman numeral formatter)
curl -s -A "$UA" -o "$H/enwiki-rendered.html" "https://en.wikipedia.org/w/index.php?title=Roman_numerals&action=render"
# 3. Licences
curl -s -A "$UA" -o "$H/wd-licensing.txt" "https://www.wikidata.org/w/index.php?title=Wikidata:Licensing&action=raw"
curl -s -A "$UA" -o "$H/wikt-page.html" "https://en.wiktionary.org/wiki/MCM"
curl -s -A "$UA" -o "$H/enwiki-page.html" "https://en.wikipedia.org/wiki/Roman_numerals"
curl -s -A "$UA" -o "$H/svwiki-page.html" "https://sv.wikipedia.org/wiki/Romerska_siffror"
# 4. The roman package's metadata on PyPI
curl -s -A "$UA" -o "$H/pypi-roman.json" "https://pypi.org/pypi/roman/json"
ls -la "$H"

```

**8. Wikitext of the English article (current revision on 2026-10-04: 1377908551, 2026-10-01T22:25:06Z)** (Roman numerals (English Wikipedia), revision 1377908551)

```
curl -s -A "solid-memo deck research (https://github.com/antwika/solid-memo)" -o <scratch>/enwiki.json "https://en.wikipedia.org/w/api.php?action=query&format=json&titles=Roman_numerals&prop=revisions&rvprop=ids|timestamp|content&rvslots=main&redirects=1"
```

**9. Rendered article (the "this year" line, rendered MMXXVI) and the licence footer (in <scratch>/fetch.sh; read by <scratch>/read_pages.py)** (Roman numerals (English Wikipedia), revision 1377908551)

```
curl -s -A "solid-memo deck research (https://github.com/antwika/solid-memo)" -o <scratch>/enwiki-rendered.html "https://en.wikipedia.org/w/index.php?title=Roman_numerals&action=render"
curl -s -A "solid-memo deck research (https://github.com/antwika/solid-memo)" -o <scratch>/enwiki-page.html "https://en.wikipedia.org/wiki/Roman_numerals"
```

**10. Wikitext of the Swedish article (current revision on 2026-10-04: 59692021, 2026-09-21T06:24:34Z) and the licence footer (page fetched in <scratch>/fetch.sh)** (Romerska siffror (Swedish Wikipedia), revision 59692021)

```
curl -s -A "solid-memo deck research (https://github.com/antwika/solid-memo)" -o <scratch>/svwiki.json "https://sv.wikipedia.org/w/api.php?action=query&format=json&titles=Romerska_siffror&prop=revisions&rvprop=ids|timestamp|content&rvslots=main&redirects=1"
```

**11. Version and licence of the roman package (in <scratch>/fetch.sh)** (roman 5.2 (Python package: integer to Roman numerals converter))

```
curl -s -A "solid-memo deck research (https://github.com/antwika/solid-memo)" -o <scratch>/pypi-roman.json "https://pypi.org/pypi/roman/json"
```

**12. Definition lines of the Wiktionary entries, the rendered "this year" line, the licence footers and the PyPI licence (python3 <scratch>/read_pages.py), then the cards with their evidence quotes built from the same saved files (python3 <scratch>/gen_cards.py, which writes <scratch>/cards.json). Both scripts verbatim below; read_pages.py as corrected in QC round 3 (its Wiktionary footer pattern was "Text is available under", which does not occur on Wiktionary), gen_cards.py as run for the first draft (the notes changed later in QC round 1 and 2 were edited in the dossier directly). The dossier itself was first assembled by a further script, <scratch>/make_dossier.py (the "merge.py" of gen_cards.py's docstring), from cards.json and metadata written by hand; the licence quotes in it were transcribed by hand from read_pages.py's output, and the Wiktionary quote was mis-transcribed until QC round 3. Since then the dossier is edited directly.** (English Wiktionary: Translingual entries for Roman numerals)

```
# ---- read_pages.py ----
"""Print the evidence lines from the fetched pages (Wiktionary definitions, licence footers, PyPI)."""
import json
import re
from pathlib import Path

H = Path(__file__).parent

w = json.loads((H / "wikt.json").read_text())
out = {}
for p in w["query"]["pages"].values():
    r = p["revisions"][0]
    t = r["slots"]["main"]["*"]
    # Translingual section only
    m = re.search(r"==Translingual==(.*?)(\n==[^=]|\Z)", t, re.S)
    sec = m.group(1) if m else ""
    lines = [l for l in sec.splitlines() if l.startswith("# ") and re.search(r"[Nn]umeral|\d", l)]
    out[p["title"]] = {"revid": r["revid"], "timestamp": r["timestamp"], "lines": lines[:4]}
    print(p["title"], r["revid"], r["timestamp"], lines[:4])
(H / "wikt-lines.json").write_text(json.dumps(out, ensure_ascii=False, indent=1))

html = (H / "enwiki-rendered.html").read_text()
i = html.find("this year")
print("RENDERED this year:", re.sub(r"<[^>]+>", "", html[max(0, i - 400):i + 20]))

for f, pat in [("wd-licensing.txt", r"All structured data.{0,200}"),
               ("wikt-page.html", r"Definitions and other text are available under.{0,300}"),
               ("enwiki-page.html", r"Text is available under.{0,300}"),
               ("svwiki-page.html", r"Texten är tillgänglig.{0,300}|Wikipedias text.{0,300}")]:
    m = re.search(pat, (H / f).read_text(), re.S)
    print(f, re.sub(r"<[^>]+>", "", m.group(0)) if m else None)

pj = json.loads((H / "pypi-roman.json").read_text())
info = pj["info"]
print("PYPI", info["name"], info["version"], info.get("license"), info.get("license_expression"), info.get("author"), info.get("home_page"), info.get("project_urls"), [c for c in info["classifiers"] if "License" in c])

# ---- gen_cards.py ----
"""Build the cards (with evidence and checks) of the roman-numerals dossier.

Reads the saved raw data in this directory (wikt.json, entities1.json, verify_results.json)
and writes cards.json, which the dossier's "cards" field is set to by merge.py.
"""
import json
import re
from pathlib import Path

H = Path(__file__).parent
DAY = "2026-10-04"

# (numeral, value) in deck order
CARDS = [
    ("I", 1), ("V", 5), ("X", 10), ("L", 50), ("C", 100), ("D", 500), ("M", 1000),
    ("IV", 4), ("IX", 9), ("XL", 40), ("XC", 90), ("CD", 400), ("CM", 900),
    ("II", 2), ("III", 3), ("VI", 6), ("VIII", 8), ("XII", 12), ("XIV", 14), ("XIX", 19), ("XXIV", 24),
    ("XXXIX", 39), ("XLII", 42), ("XLIX", 49), ("LXXX", 80), ("XCIX", 99), ("CCC", 300), ("CDXLIV", 444),
    ("DCCC", 800), ("CMXCIX", 999), ("MCDXCII", 1492), ("MDCLXVI", 1666), ("MDCCLXXVI", 1776),
    ("MCMXLV", 1945), ("MCMLXXXIV", 1984), ("MCMXCIX", 1999), ("MM", 2000), ("MMXXVI", 2026),
    ("MMMDCCCLXXXVIII", 3888), ("MMMCMXCIX", 3999),
]

WIKIDATA = {  # numeral -> item "Roman numeral N" (instance of Roman numerals Q38918)
    "I": "Q3147025", "V": "Q3553034", "X": "Q3570499", "L": "Q3206231", "C": "Q2932176", "D": "Q3011516",
    "M": "Q3273364", "II": "Q3594830", "III": "Q3594832", "IV": "Q3594831", "VI": "Q3594834",
    "VIII": "Q3594835", "IX": "Q3594836", "XII": "Q3594839",
}

NOTES = {
    "IV": ("Standard form; older inscriptions and many clock faces write IIII.",
           "Standardformen; äldre inskrifter och många urtavlor skriver IIII."),
    "IX": ("Standard form; older texts also write VIIII.",
           "Standardformen; äldre texter skriver även VIIII."),
    "XL": ("Standard form; older texts also write XXXX.",
           "Standardformen; äldre texter skriver även XXXX."),
    "CD": ("Standard form; older texts also write CCCC.",
           "Standardformen; äldre texter skriver även CCCC."),
    "XLIX": ("Not IL: I is subtracted only from V and X.",
             "Inte IL: I subtraheras bara från V och X."),
    "XCIX": ("Not IC: I is subtracted only from V and X.",
             "Inte IC: I subtraheras bara från V och X."),
    "MCMXCIX": ("Not MIM: the number is written digit by digit (M + CM + XC + IX).",
                "Inte MIM: talet skrivs siffra för siffra (M + CM + XC + IX)."),
    "MDCLXVI": ("Each of the seven symbols once, in descending order.",
                "Vart och ett av de sju tecknen en gång, i fallande ordning."),
    "MMMDCCCLXXXVIII": ("The longest numeral below 4000: 15 symbols.",
                        "Det längsta romerska talet under 4000: 15 tecken."),
    "MMMCMXCIX": ("The largest number in standard notation.",
                  "Det största talet i standardformen."),
}

ENWIKI_REV = 1377908551
ENWIKI = f"https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid={ENWIKI_REV}"
SVWIKI_REV = 59692021
SVWIKI = f"https://sv.wikipedia.org/w/index.php?title=Romerska_siffror&oldid={SVWIKI_REV}"
PLACE_NAMES = ["Thousands", "Hundreds", "Tens", "Units"]
PLACES = [  # the cells of the article's table "Individual decimal places"
    ["", "M", "MM", "MMM"],
    ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"],
    ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"],
    ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
]

# Extra lines of the English article (wikitext, {{rn|...}} templates shown as written)
EN_EXTRA = {
    39: "* 39 = {{rn|XXX}} + {{rn|IX}} = '''{{rn|XXXIX}}'''.",
    1776: "* 1776 = {{rn|M}} + {{rn|DCC}} + {{rn|LXX}} + {{rn|VI}} = '''{{rn|MDCCLXXVI}}''' (the date written on the book held by the [[Statue of Liberty]]).",
    3999: "The largest number that can be represented in this manner is 3,999 ('''{{rn|MMMCMXCIX}}''')",
}
EN_ADDITIVE = ("Other forms: \"While subtractive notation for 4, 40, and 400 ({{rn|IV}}, {{rn|XL}}, and {{rn|CD}}) "
               "is the modern standard, [[additive notation]] to represent these numbers ({{rn|IIII}}, {{rn|XXXX}}, "
               "and {{rn|CCCC}}) … was often used\"")
SV = {
    1: ("Talsystemets principer", "*I = 1"), 5: ("Talsystemets principer", "*V = 5"),
    10: ("Talsystemets principer", "*X = 10"), 50: ("Talsystemets principer", "*L = 50"),
    100: ("Talsystemets principer", "*C = 100"), 500: ("Talsystemets principer", "*D = 500"),
    1000: ("Talsystemets principer", "*M = 1000"),
    2: ("Talsystemets principer, regel 1", "II = 1 + 1 = 2"),
    300: ("Talsystemets principer, regel 1", "CCC = 100 + 100 + 100 = 300"),
    4: ("Talsystemets principer, regel 2", "IV = 5 − 1 = 4"),
    9: ("Talsystemets principer, regel 2", "IX = 10 − 1 = 9"),
    900: ("Talsystemets principer, regel 2", "CM = 1000 − 100 = 900"),
    6: ("Talsystemets principer, regel 3", "VI = 5 + 1 = 6"),
    8: ("Talsystemets principer, regel 3", "VIII = 5 + 1 + 1 + 1 = 8"),
    1999: ("Talsystemets principer, regel 3; Exemplet 1999",
           "MCMXCIX = 1000 + (1000 − 100) + (100 − 10) + (10 − 1) = 1999 … 1999 alltså inte skrivas MIM (1000 + 1000 − 1) "
           "utan måste skrivas MCMXCIX"),
    99: ("Exemplet 1999", "Sålunda kan 99 inte skrivas IC, utan måste skrivas som XCIX."),
}
SV_EXTRA_NOTE = {
    "IV": ("caption of the image \"Katarina kyrka tornur\"; Talsystemets principer, regel 1",
           "Observera att siffran \"4\" skrivs med fyra streck, vilket är vanligt för ur med romerska siffror. … "
           "dock kan 4 skrivas som IIII (1 + 1 + 1 + 1) och 40 som XXXX (10 + 10 + 10 + 10)."),
    "XL": ("Talsystemets principer, regel 1",
           "dock kan 4 skrivas som IIII (1 + 1 + 1 + 1) och 40 som XXXX (10 + 10 + 10 + 10)."),
    "CD": ("Exemplet 1999", "Romarna använde sig ofta av fyra likadana tecken som adderades, både för I (IIII), X (XXXX) och C (CCCC)."),
    "IX": ("Exemplet 1999", "Detta medför åtta olika sätt att ange 1999: … * MCMXCVIIII"),
    "XLIX": ("Talsystemets principer", "I (1) får exempelvis bara subtraheras från V (5) och X (10), inte från L (50) och högre."),
}


def wikt_lines():
    w = json.loads((H / "wikt.json").read_text())
    out = {}
    for p in w["query"]["pages"].values():
        r = p["revisions"][0]
        t = r["slots"]["main"]["*"]
        sec = re.search(r"==Translingual==(.*?)(\n==[^=]|\Z)", t, re.S).group(1)
        lines = [l for l in sec.splitlines() if l.startswith("# ") and re.search(r"[Rr]oman numeral|[Cc]ardinal number", l)]
        if p["title"] == "I":
            lines = ["{{head|mul|numeral|upper case Roman numeral||lower case|i}}",
                     *[l for l in sec.splitlines() if l.startswith("# {{senseid|mul|one}}")]]
        if lines:
            out[p["title"]] = (r["revid"], lines)
    return out


def entities():
    d = json.loads((H / "entities1.json").read_text())["entities"]
    out = {}
    for q, e in d.items():
        amount = [s["mainsnak"]["datavalue"]["value"]["amount"] for s in e.get("claims", {}).get("P1181", [])]
        out[q] = {"label": e.get("labels", {}).get("en", {}).get("value"),
                  "desc": e.get("descriptions", {}).get("en", {}).get("value"),
                  "aliases": [a["value"] for a in e.get("aliases", {}).get("en", [])],
                  "P1181": amount}
    return out


def main():
    verify = {c["id"]: c for c in json.loads((H / "verify_results.json").read_text())["cards"]} \
        if (H / "verify_results.json").exists() else {}
    wikt = wikt_lines()
    ents = entities()
    cards = []
    for numeral, n in CARDS:
        cid = numeral.lower()
        ev = []
        v = verify.get(cid)
        if v:
            says = (f"from_roman(\"{numeral}\") = {v['from_roman']}; roman.fromRoman(\"{numeral}\") = {v['roman.fromRoman']}; "
                    f"to_roman({n}) = {v['to_roman']}; roman.toRoman({n}) = {v['roman.toRoman']}; "
                    f"decimal places: {v['places']}: {'OK' if v['ok'] else 'FAIL'}")
        else:
            says = "PENDING"
        ev.append({"source": "derivation", "locator": f"verify_roman.py (query 13), card \"{cid}\"; verify_results.json",
                   "says": says, "retrieved": DAY})
        if numeral in WIKIDATA:
            q = WIKIDATA[numeral]
            e = ents[q]
            ev.append({"source": "wikidata", "locator": f"{q} (wbgetentities, query 4; instances of Roman numerals Q38918, query 3)",
                       "says": f"en label \"{e['label']}\"; en description \"{e['desc']}\"; en alias(es) {', '.join(e['aliases'])}; "
                               f"P31 (instance of) Roman numerals (Q38918); P1181 (numeric value) {e['P1181'][0]}",
                       "retrieved": DAY})
        digits = [n // 1000, n // 100 % 10, n // 10 % 10, n % 10]
        cells = []
        for i, dgt in enumerate(digits):
            if dgt:
                cells.append(f"{PLACE_NAMES[i]}, row {dgt}: {PLACES[i][dgt]}")
        en_says = "Table \"Individual decimal places\": " + "; ".join(cells)
        if n in EN_EXTRA:
            en_says += ". " + EN_EXTRA[n]
        if n == 2026:
            en_says += (". The line \"{{#time:Y}} = '''{{rn|{{#time:xrY}}}}''' (this year)\", rendered by MediaWiki's own "
                        "Roman numeral formatter (#time with xr) on 2026-10-04 (query 9): \"MMXXVI (this year)\"")
        if numeral in ("IV", "XL", "CD"):
            en_says += ". " + EN_ADDITIVE
        if numeral == "IV":
            en_says += (". \"Modern [[clock face]]s that use Roman numerals still very often use {{rn|IIII}} for four "
                        "o'clock but {{rn|IX}} for nine o'clock\"")
        if numeral == "IX":
            en_says += (". \"The numerals for 4 ({{rn|IV}}) and 9 ({{rn|IX}}) are written using [[subtractive notation]] … "
                        "instead of {{rn|IIII}} and {{rn|VIIII}}\"")
        ev.append({"source": "enwiki", "locator": f"\"Roman numerals\", section Standard form (and Other forms where quoted), "
                                                  f"revision {ENWIKI_REV}: {ENWIKI}",
                   "says": en_says, "retrieved": DAY})
        if n in SV or numeral in SV_EXTRA_NOTE:
            parts = []
            secs = []
            if n in SV:
                secs.append(SV[n][0])
                parts.append(SV[n][1])
            if numeral in SV_EXTRA_NOTE:
                secs.append(SV_EXTRA_NOTE[numeral][0])
                parts.append(SV_EXTRA_NOTE[numeral][1])
            ev.append({"source": "svwiki", "locator": f"\"Romerska siffror\", {'; '.join(secs)}, revision {SVWIKI_REV}: {SVWIKI}",
                       "says": " … ".join(parts), "retrieved": DAY})
        if numeral in wikt:
            rev, lines = wikt[numeral]
            ev.append({"source": "wiktionary", "locator": f"\"{numeral}\", Translingual, revision {rev}: "
                                                         f"https://en.wiktionary.org/w/index.php?title={numeral}&oldid={rev}",
                       "says": " | ".join(lines), "retrieved": DAY})
        card = {"id": cid, "front": {"zxx": numeral}, "back": {"zxx": str(n)}}
        if numeral in NOTES:
            card["backNote"] = {"en": NOTES[numeral][0], "sv": NOTES[numeral][1]}
        card["evidence"] = ev
        if numeral in WIKIDATA:
            q = WIKIDATA[numeral]
            card["checks"] = [{"qid": q, "property": "P1181", "expect": str(n)},
                              {"qid": q, "property": "P31", "expect": "Q38918"},
                              {"qid": q, "label": "en", "equals": numeral}]
        cards.append(card)
    (H / "cards.json").write_text(json.dumps(cards, ensure_ascii=False, indent=2) + "\n")
    print(len(cards), "cards;", sum("checks" in c for c in cards), "with checks;",
          sum(any(e["source"] == "wiktionary" for e in c["evidence"]) for c in cards), "with Wiktionary;",
          sum(any(e["source"] == "svwiki" for e in c["evidence"]) for c in cards), "with svwiki")


if __name__ == "__main__":
    main()

```

**13. Machine verification of every card (uv run --with roman==5.2 python3 <scratch>/verify_roman.py <dossier>); the script, verbatim:** (Conversion and machine checks for the Solid Memo Roman numerals deck)

```
"""Machine-check every card of the "roman-numerals" deck.

Run: uv run --with roman==5.2 python3 verify_roman.py <dossier.json>

1. Own converter (this file): to_roman(n) writes n in standard subtractive notation
   by decimal places, from the place table PLACES (thousands M-MMM; hundreds, tens and
   units each 1-9, with the subtractive forms CD/CM, XL/XC, IV/IX); from_roman(s)
   accepts only a numeral that to_roman would write (strict regular expression
   STRICT), then sums the symbol values with the rule "a smaller value before a
   larger one is subtracted".
2. Self-test over the whole range 1-3999: from_roman(to_roman(n)) == n, and every
   result equals the independent implementation roman.toRoman(n) (PyPI package
   "roman", Zope Foundation), whose fromRoman must also return n.
3. Every card: the front (zxx) is parsed by from_roman and by roman.fromRoman and must
   give the back (zxx); to_roman(back) and roman.toRoman(back) must give the front;
   the front must be the concatenation of the place-table entries for the back's
   digits (the decomposition is printed, e.g. 3888 = MMM + DCCC + LXXX + VIII).
4. Negative controls: non-standard numerals (IIII, VIIII, XXXX, CCCC, IL, IC, IM, XM,
   VX, LC, DM, MIM, VV, MMMM, IXI, '') must be rejected by from_roman.
5. Facts in notes: 3999 is the largest number to_roman can write (4000 has no
   standard numeral here); 3888 is the only number in 1-3999 with the longest
   numeral; MDCLXVI uses each of the seven symbols exactly once.
Results are written to verify_results.json next to this script.
"""
import importlib.metadata
import json
import re
import sys
from pathlib import Path

import roman

H = Path(__file__).parent

VALUES = {"I": 1, "V": 5, "X": 10, "L": 50, "C": 100, "D": 500, "M": 1000}
PLACES = [
    ["", "M", "MM", "MMM"],
    ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"],
    ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"],
    ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
]
STRICT = re.compile(r"^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$")


def parts(n: int) -> list[str]:
    if not 1 <= n <= 3999:
        raise ValueError(f"{n}: outside 1-3999")
    digits = [n // 1000, n // 100 % 10, n // 10 % 10, n % 10]
    return [PLACES[i][d] for i, d in enumerate(digits) if d]


def to_roman(n: int) -> str:
    return "".join(parts(n))


def from_roman(s: str) -> int:
    if not s or not STRICT.match(s):
        raise ValueError(f"{s!r}: not a numeral in standard notation")
    total = 0
    for i, ch in enumerate(s):
        v = VALUES[ch]
        if i + 1 < len(s) and VALUES[s[i + 1]] > v:
            total -= v
        else:
            total += v
    return total


def main(dossier: str) -> int:
    d = json.loads(Path(dossier).read_text(encoding="utf-8"))
    problems: list[str] = []
    # 2. Self-test over the whole range.
    lengths = {}
    for n in range(1, 4000):
        r = to_roman(n)
        lengths[n] = len(r)
        if from_roman(r) != n:
            problems.append(f"self-test: from_roman(to_roman({n})) != {n}")
        if roman.toRoman(n) != r:
            problems.append(f"self-test: roman.toRoman({n}) = {roman.toRoman(n)} != {r}")
        if roman.fromRoman(r) != n:
            problems.append(f"self-test: roman.fromRoman({r}) != {n}")
    try:
        to_roman(4000)
        problems.append("to_roman(4000) did not fail")
    except ValueError:
        pass
    # 4. Negative controls.
    negatives = ["IIII", "VIIII", "XXXX", "CCCC", "IL", "IC", "IM", "XM", "VX", "LC", "DM", "MIM", "VV",
                 "MMMM", "IXI", ""]
    rejected = []
    for s in negatives:
        try:
            from_roman(s)
            problems.append(f"negative control {s!r} accepted")
        except ValueError:
            rejected.append(s)
    # 5. Facts in notes.
    longest = max(lengths.values())
    longest_ns = [n for n, l in lengths.items() if l == longest]
    facts = {
        "largest": to_roman(3999),
        "longest": {"length": longest, "numbers": longest_ns, "numeral": [to_roman(n) for n in longest_ns]},
        "mdclxvi_each_symbol_once": sorted("MDCLXVI") == sorted(VALUES) and len(set("MDCLXVI")) == 7,
    }
    # 3. Every card.
    cards = []
    for c in d["cards"]:
        front, back = c["front"].get("zxx"), c["back"].get("zxx")
        if front is None or back is None or not back.isdigit():
            problems.append(f"{c['id']}: front/back not zxx numeral/number")
            continue
        n = int(back)
        row = {"id": c["id"], "front": front, "back": n}
        try:
            row["from_roman"] = from_roman(front)
            row["roman.fromRoman"] = roman.fromRoman(front)
            row["to_roman"] = to_roman(n)
            row["roman.toRoman"] = roman.toRoman(n)
            row["places"] = " + ".join(parts(n))
        except Exception as e:  # noqa: BLE001
            problems.append(f"{c['id']}: {e}")
            continue
        ok = (row["from_roman"] == n and row["roman.fromRoman"] == n and row["to_roman"] == front
              and row["roman.toRoman"] == front and "".join(parts(n)) == front)
        row["ok"] = ok
        if not ok:
            problems.append(f"{c['id']}: mismatch {row}")
        cards.append(row)
        print(f"{c['id']:<22} {front:<16} = {n:<5} places: {row['places']:<26} roman pkg: "
              f"{row['roman.toRoman']} / {row['roman.fromRoman']}  {'OK' if ok else 'FAIL'}")
    result = {"roman_package_version": importlib.metadata.version("roman"), "self_test_range": "1-3999",
              "negative_controls_rejected": rejected, "facts": facts, "cards": cards, "problems": problems}
    (H / "verify_results.json").write_text(json.dumps(result, ensure_ascii=False, indent=1) + "\n")
    print("facts:", json.dumps(facts))
    print("negative controls rejected:", rejected)
    print(f"{len(cards)} cards checked; problems: {len(problems)}")
    for p in problems:
        print("PROBLEM", p)
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1]))

```

## Quality control

6 rounds, 24 findings: 19 fixed, 1 rejected after checking, 4 needing no change. Every card's Wikidata checks (42 in all) are re-run against live Wikidata by `scripts/authored_decks.py check` before every build.

### Round 0: Machine checks and sources: every card computed and verified by verify_roman.py with two independent implementations; every card against the English Wikipedia standard-form table; the 14 numerals with Wikidata items against their numeric values; Wiktionary and the Swedish Wikipedia where they state a numeral; the facts in the notes. (2026-10-04)

**Reviewer:** Claude (AI) — authoring agent, machine checks · **Scope:** All 40 cards, the sources and the deck metadata.

All 40 cards pass the script (own converter and roman 5.2 agree on every card and on all of 1–3999; all 16 negative controls rejected) and agree with the Wikipedia table, Wikidata (14 cards), Wiktionary (25) and the Swedish Wikipedia (19). No Wikidata check was skipped. Findings concern Wikidata data quality and the reach of the sources, none a card.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| vi | The Wikidata Query Service returned the English label of Q3594834 (Roman numeral 6) as the flag emoji "🇻🇮" (queries 1 and 3), while the entity API (query 4) gave the label "Ⅵ"; the alias "VI", the class and the value 6 are the same in both. | The card's checks use the P1181 value, the P31 class and the English alias "VI", not the label, so they do not depend on the label shown; the evidence quotes the entity API. | no change needed |
| cd | The Wiktionary entries CCC, CD and CM have no Roman numeral sense (they give a bond credit rating and the ISO 3166 codes of the DR Congo and Cameroon), and 12 numerals have no entry at all. | These cards rest on the script, the Wikipedia table and, for CD, CM and CCC, the Swedish Wikipedia or the table's own cell; Wiktionary is cited only where it gives the value. | no change needed |
| mmxxvi | The English article's example for the current year is computed on rendering (MediaWiki's #time parser function with the xr Roman numeral formatter) and changes every year. | Cited as rendered on 2026-10-04 ("MMXXVI (this year)"); the card's value does not depend on the date. | no change needed |
| mmmdccclxxxviii | The note calls MMMDCCCLXXXVIII the longest numeral below 4000; no cited source states this. | Computed by verify_roman.py over all of 1–3999 ({"length": 15, "numbers": [3888], "numeral": ["MMMDCCCLXXXVIII"]}), part of the derivation source. | no change needed |
| (deck) | With both sides declared as text in no language (zxx), the builder wrote an empty dcterms:language and the Turtle did not parse ("Expected entity but got ;"): it takes the deck's languages only from the sides and the fronts and backs, not from the notes. | Every front and back stays tagged zxx; the back side is declared ["en", "sv"], the languages of the back notes, which the builder accepts with zxx backs as text in no language by exception, so the deck's languages are English and Swedish (the notes, title and description). Reported to the library editor as a builder limitation. | fixed |
| iv | The brief asked for historic variants such as IIII on clocks in notes; Wikipedia names IIII, XXXX and CCCC as additive forms for 4, 40 and 400 and VIIII for 9. | Notes on IV (IIII, older inscriptions and clock faces), IX (VIIII), XL (XXXX) and CD (CCCC); IL, IC and MIM named in the notes of XLIX, XCIX and MCMXCIX. | fixed |

### Round 1: Factual accuracy (2026-10-04)

**Reviewer:** Claude (AI) — independent Factual accuracy reviewer · **Scope:** All 40 cards, re-checked with the reviewer's own greedy converter, live Wikidata, the English Wikipedia (rev. 1377908551) and the Swedish Wikipedia (rev. 59692021); the description.

All 40 cards are correct; every front converts to its back and back, the backs are unique, and 3888 is the only number with the longest numeral. The 14 Wikidata items pass. Three findings, all applied: the description overstated the Wikidata and Wiktionary checks, and the notes of XLIX and XCIX stated the subtraction rule without saying it is the standard form's.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| (deck) | The description said every card was checked against Wikidata, Wikipedia and Wiktionary, but Wikidata covers only 14 cards and Wiktionary 25. | Confirmed against the dossier's own sources. Description now (en): "Every card was computed and checked by two independent converters and against English Wikipedia's table of the standard form, and against Wikidata, Wiktionary and Swedish Wikipedia where they cover the numeral."; Swedish likewise (merged with the same finding of round 3). | fixed |
| xlix | The note "Not IL: I is subtracted only from V and X." states the rule absolutely, though the English article gives historic IIC (98) and IC (99). | Confirmed in the saved wikitext of revision 1377908551 ("There are historical examples of other subtractive forms: … IIC for 98, … and IC for 99"). Note now "Not IL: in the standard form, I is subtracted only from V and X." / "Inte IL: i standardformen subtraheras I bara från V och X."; the sentence added to the card's English Wikipedia evidence, and the Swedish article's rule "I kan bara sättas till vänster om V eller X" to its Swedish evidence. | fixed |
| xcix | The note "Not IC: I is subtracted only from V and X." is unqualified, though IC for 99 is attested historically, as the cited Swedish article itself says. | Confirmed (enwiki: "and IC for 99"; svwiki rev. 59692021: "Denna regel följs inte alltid, XCIX kan förkortas IC."). Note now "Not IC: in the standard form, I is subtracted only from V and X (IC occurs in some older texts)." / "Inte IC: i standardformen subtraheras I bara från V och X (IC förekommer i vissa äldre texter)."; both quotes added to the card's evidence. | fixed |

### Round 2: Language, translation and language tags (2026-10-04)

**Reviewer:** Claude (AI) — independent Language, translation and language tags reviewer · **Scope:** All 40 cards in both languages, the title, description, keywords and language tags.

No language errors; every front and back is zxx, the notes are en and sv, the Swedish terms follow the Swedish Wikipedia. One warning about the declared back-side languages, documented in the method because the builder cannot take zxx on both sides; two wording suggestions applied.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| (deck) | sides.back is declared ["en", "sv"] although every back is zxx; this works around a builder limitation and misstates the back side's language in the dossier. | Confirmed that the builder's deck_languages() reads only the sides and the fronts and backs, so declaring the back zxx would again give an empty dcterms:language (round 0); the builder is outside this deck's scope. The workaround is kept and now explained in method step 3, not only in the QC log; the built deck still tags every back zxx. The builder change (deriving the deck languages also from the title, description and notes) is left to the library editor. | fixed |
| iv, ix, xl, cd | The Swedish notes make an inanimate subject write ("urtavlor skriver IIII", "äldre texter skriver även VIIII"); the passive "skrivs", as in the Swedish article, is more idiomatic. | Applied: "Standardformen; i äldre inskrifter och på många urtavlor skrivs 4 som IIII.", "Standardformen; i äldre texter skrivs 9 även som VIIII." and likewise 40 (XXXX) and 400 (CCCC). The English notes are unchanged. | fixed |
| mmmcmxcix | "The largest number in standard notation." reads as if a number were in a notation. | Now "The largest number standard notation can write." / "Det största tal som kan skrivas i standardformen." | fixed |

### Round 3: Licensing, attribution and documentation (2026-10-04)

**Reviewer:** Claude (AI) — independent Licensing, attribution and documentation reviewer · **Scope:** Every source's licence and terms page, the licensing paragraph, the method and queries, and the evidence of 25 cards spot-checked against the cited revisions.

All recorded licences are right and the CC0 deck uses only its own derivation and CC0 Wikidata as content. One error (the Wiktionary footer was misquoted) and three warnings (the Unicode range attributed to the Swedish article, the description's checks, unrecorded scripts) were confirmed and fixed; the five suggestions were applied.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| (deck) | The Wiktionary licenseEvidence quoted the footer as "Text is available under …"; the page says "Definitions and other text are available under …", and read_pages.py's pattern could not have matched it. | Confirmed in the saved <scratch>/wikt-page.html (footer links to //creativecommons.org/licenses/by-sa/4.0/). Quote corrected; read_pages.py's pattern corrected and the script rerun, and it now prints the footer. | fixed |
| (deck) | Method step 3 attributed the range U+2160–U+2188 to the Swedish article, which gives U+2160 to U+2182. | Confirmed in the saved wikitext ("teckenplatserna U+2160 till U+2182"). Step 3 now gives the full block U+2160–U+2188 as the deck's own statement and attributes only U+2160–U+2182 to the article, citing the Unicode Standard 5.0. | fixed |
| (deck) | The description overstated the cross-checks: only 14 cards have Wikidata and 25 Wiktionary evidence. | Same as round 1; fixed there, naming the Swedish Wikipedia as this finding suggested. | fixed |
| (deck) | read_pages.py, gen_cards.py and run.sh were named but not recorded, and make_dossier.py, which wrote the licence quotes into the dossier, was not mentioned. | read_pages.py (corrected) and gen_cards.py are now recorded verbatim in query 12 and run.sh in query 1; query 12 says that make_dossier.py assembled the first dossier and that its licence quotes were transcribed by hand from read_pages.py's output. | fixed |
| (deck) | The purpose of query 4 spoke of 14 items, but the call fetched 19 ids, including VII, XI and two Unicode-character items. | Purpose corrected as suggested; method step 5 says why the extra items were fetched. | fixed |
| (deck) | The purpose of query 2 said the result lists only romanization and Roman Empire identifiers, but it also lists Romania, Igromania and 'romantic orientation'. | Confirmed in <scratch>/q2.csv; purpose corrected. | fixed |
| (deck) | The licensing paragraph says the selection is not any list of examples, but 39, 1776 and 3999 are the English article's worked examples. | Sentence added to the licensing paragraph naming the overlap and why it is not a copied selection. | fixed |
| (deck) | The roman package is cited with an unversioned URL, and its creator could follow PyPI's fields. | URL now https://pypi.org/project/roman/5.2/ (resolves, HTTP 200 on 2026-10-04); creator "Mark Pilgrim (author); Zope Foundation and Contributors (maintainers)", as in the saved PyPI metadata. | fixed |
| iv | The Swedish Wikipedia locator named "regel 2; caption", but the quoted "dock kan 4 skrivas som IIII …" is in rule 1. | Locator now "Talsystemets principer, regel 1 och 2; caption of the image 'Katarina kyrka tornur'". | fixed |

### Round 4: Re-check of changed cards and a sample (facts, language, documentation) (2026-10-04)

**Reviewer:** Claude (AI) — independent re-check reviewer · **Scope:** The 7 cards changed in round 3's fixes (iv, ix, xl, cd, xlix, xcix, mmmcmxcix) and every third card (19 cards in all), checked against the cited English and Swedish Wikipedia and Wiktionary revisions and live Wikidata; the description, keywords, topics, method, licensing and the fixes claimed in rounds 1 to 3.

No errors: every sampled card, quote and Wikidata statement was confirmed and every earlier fix was found in place. Two suggestions: the paraphrase in the iv/xl/cd English Wikipedia evidence was replaced by the article's own words; the AI mention in the derivation source's creator was declined as a library-wide choice.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| xl | The English Wikipedia evidence of iv, xl and cd ended with the editorial gloss "[were also used]", where the article says "was often used". | Confirmed in the raw wikitext of revision 1377908551 (query 8), line 75: "… ({{rn\|IIII}}, {{rn\|XXXX}}, and {{rn\|CCCC}})<ref name="caes0050">…</ref> was often used, including in compound numbers like 24 …". The quote in iv, xl and cd now continues "… was often used", the ellipsis standing for the footnote; gen_cards.py (in query 12) changed to match. | fixed |
| (deck) | The derivation source's creator, "Anton Wiklund (compiler); written by Claude (Anthropic, AI) at his direction", mentions AI authorship outside the method's first paragraph. | Declined for this deck alone: the reviewer notes that the same wording is used in the other derivation dossiers, so changing it only here would make the library inconsistent. The field is an accurate attribution of who wrote the derivation scripts. Any change belongs to a library-wide pass over all derivation dossiers, outside this deck's scope. | rejected |

### Round 5: Final full-deck review (facts and language) (2026-10-04)

**Reviewer:** Claude (AI) — independent final reviewer · **Scope:** All 40 cards (fronts, backs, notes and evidence), with each numeral decomposed by decimal place and the 14 Wikidata-checked items confirmed by a live SPARQL query; the title, description (word count and counts), keywords, topics, method, licensing and the fixes claimed in rounds 1 to 4.

No errors or warnings: every card, note and Wikidata statement was confirmed, the Swedish was found idiomatic and every earlier fix was found in place. One suggestion: the licensing sentence on the overlap with the English article's worked examples explained why 1776 and 3999 were chosen but not 39; it was reworded.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| (deck) | The licensing sentence on the three numbers that coincide with the English article's worked examples (39, 1776, 3999) said they "were chosen as a common year and the range limit within the editor's brief", which does not explain 39, and its closing clause read awkwardly. | Confirmed against method step 2, which lists 39 among the numbers that combine a subtractive pair with other symbols, 1776 among the years often met in Roman numerals and 3999 as the largest. The sentence now gives each number's reason in those words and ends "Three isolated numbers are facts, not a copied selection." | fixed |

## Cards and evidence

| Card | Front | Back | Evidence |
|---|---|---|---|
| `i` | I (zxx) | 1 (zxx) | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "i"; verify_results.json — from_roman("I") = 1; roman.fromRoman("I") = 1; to_roman(1) = I; roman.toRoman(1) = I; decimal places: I: OK<br>Wikidata: the items for the Roman numerals 1–12, 50, 100, 500 and 1000 (instances of Roman numerals, Q38918), with their English labels and aliases and numeric values (P1181): Q3147025 (wbgetentities, query 4; instances of Roman numerals Q38918, query 3) — en label "Ⅰ"; en description "Roman numeral 1"; en alias(es) I; P31 (instance of) Roman numerals (Q38918); P1181 (numeric value) +1<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Units, row 1: I<br>Romerska siffror (Swedish Wikipedia), revision 59692021: "Romerska siffror", Talsystemets principer, revision 59692021: https://sv.wikipedia.org/w/index.php?title=Romerska_siffror&oldid=59692021 — *I = 1<br>English Wiktionary: Translingual entries for Roman numerals: "I", Translingual, revision 93317017: https://en.wiktionary.org/w/index.php?title=I&oldid=93317017 — {{head\|mul\|numeral\|upper case Roman numeral\|\|lower case\|i}} \| # {{senseid\|mul\|one}} [[cardinal\|Cardinal]] number [[one]].<br>Wikidata checks: Q3147025 P1181 = 1, Q3147025 P31 = Q38918, Q3147025 en = I |
| `v` | V (zxx) | 5 (zxx) | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "v"; verify_results.json — from_roman("V") = 5; roman.fromRoman("V") = 5; to_roman(5) = V; roman.toRoman(5) = V; decimal places: V: OK<br>Wikidata: the items for the Roman numerals 1–12, 50, 100, 500 and 1000 (instances of Roman numerals, Q38918), with their English labels and aliases and numeric values (P1181): Q3553034 (wbgetentities, query 4; instances of Roman numerals Q38918, query 3) — en label "Ⅴ"; en description "Roman numeral 5"; en alias(es) V; P31 (instance of) Roman numerals (Q38918); P1181 (numeric value) +5<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Units, row 5: V<br>Romerska siffror (Swedish Wikipedia), revision 59692021: "Romerska siffror", Talsystemets principer, revision 59692021: https://sv.wikipedia.org/w/index.php?title=Romerska_siffror&oldid=59692021 — *V = 5<br>English Wiktionary: Translingual entries for Roman numerals: "V", Translingual, revision 92387408: https://en.wiktionary.org/w/index.php?title=V&oldid=92387408 — # {{senseid\|mul\|five}} The Roman numeral for [[5]].<br>Wikidata checks: Q3553034 P1181 = 5, Q3553034 P31 = Q38918, Q3553034 en = V |
| `x` | X (zxx) | 10 (zxx) | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "x"; verify_results.json — from_roman("X") = 10; roman.fromRoman("X") = 10; to_roman(10) = X; roman.toRoman(10) = X; decimal places: X: OK<br>Wikidata: the items for the Roman numerals 1–12, 50, 100, 500 and 1000 (instances of Roman numerals, Q38918), with their English labels and aliases and numeric values (P1181): Q3570499 (wbgetentities, query 4; instances of Roman numerals Q38918, query 3) — en label "Ⅹ"; en description "Roman numeral 10"; en alias(es) X; P31 (instance of) Roman numerals (Q38918); P1181 (numeric value) +10<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Tens, row 1: X<br>Romerska siffror (Swedish Wikipedia), revision 59692021: "Romerska siffror", Talsystemets principer, revision 59692021: https://sv.wikipedia.org/w/index.php?title=Romerska_siffror&oldid=59692021 — *X = 10<br>English Wiktionary: Translingual entries for Roman numerals: "X", Translingual, revision 93410370: https://en.wiktionary.org/w/index.php?title=X&oldid=93410370 — # {{senseid\|mul\|ten}} The [[Roman numeral]] [[ten]] ([[10]]).<br>Wikidata checks: Q3570499 P1181 = 10, Q3570499 P31 = Q38918, Q3570499 en = X |
| `l` | L (zxx) | 50 (zxx) | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "l"; verify_results.json — from_roman("L") = 50; roman.fromRoman("L") = 50; to_roman(50) = L; roman.toRoman(50) = L; decimal places: L: OK<br>Wikidata: the items for the Roman numerals 1–12, 50, 100, 500 and 1000 (instances of Roman numerals, Q38918), with their English labels and aliases and numeric values (P1181): Q3206231 (wbgetentities, query 4; instances of Roman numerals Q38918, query 3) — en label "Ⅼ"; en description "Roman numeral 50"; en alias(es) L; P31 (instance of) Roman numerals (Q38918); P1181 (numeric value) +50<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Tens, row 5: L<br>Romerska siffror (Swedish Wikipedia), revision 59692021: "Romerska siffror", Talsystemets principer, revision 59692021: https://sv.wikipedia.org/w/index.php?title=Romerska_siffror&oldid=59692021 — *L = 50<br>English Wiktionary: Translingual entries for Roman numerals: "L", Translingual, revision 93317058: https://en.wiktionary.org/w/index.php?title=L&oldid=93317058 — # [[Roman numeral]] [[fifty]] ([[50]])<br>Wikidata checks: Q3206231 P1181 = 50, Q3206231 P31 = Q38918, Q3206231 en = L |
| `c` | C (zxx) | 100 (zxx) | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "c"; verify_results.json — from_roman("C") = 100; roman.fromRoman("C") = 100; to_roman(100) = C; roman.toRoman(100) = C; decimal places: C: OK<br>Wikidata: the items for the Roman numerals 1–12, 50, 100, 500 and 1000 (instances of Roman numerals, Q38918), with their English labels and aliases and numeric values (P1181): Q2932176 (wbgetentities, query 4; instances of Roman numerals Q38918, query 3) — en label "Ⅽ"; en description "Roman numeral 100"; en alias(es) C; P31 (instance of) Roman numerals (Q38918); P1181 (numeric value) +100<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Hundreds, row 1: C<br>Romerska siffror (Swedish Wikipedia), revision 59692021: "Romerska siffror", Talsystemets principer, revision 59692021: https://sv.wikipedia.org/w/index.php?title=Romerska_siffror&oldid=59692021 — *C = 100<br>English Wiktionary: Translingual entries for Roman numerals: "C", Translingual, revision 93412115: https://en.wiktionary.org/w/index.php?title=C&oldid=93412115 — # {{senseid\|mul\|Q37413}} [[Roman numeral]] [[hundred]] ([[100]]).<br>Wikidata checks: Q2932176 P1181 = 100, Q2932176 P31 = Q38918, Q2932176 en = C |
| `d` | D (zxx) | 500 (zxx) | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "d"; verify_results.json — from_roman("D") = 500; roman.fromRoman("D") = 500; to_roman(500) = D; roman.toRoman(500) = D; decimal places: D: OK<br>Wikidata: the items for the Roman numerals 1–12, 50, 100, 500 and 1000 (instances of Roman numerals, Q38918), with their English labels and aliases and numeric values (P1181): Q3011516 (wbgetentities, query 4; instances of Roman numerals Q38918, query 3) — en label "Ⅾ"; en description "Roman numeral 500"; en alias(es) D; P31 (instance of) Roman numerals (Q38918); P1181 (numeric value) +500<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Hundreds, row 5: D<br>Romerska siffror (Swedish Wikipedia), revision 59692021: "Romerska siffror", Talsystemets principer, revision 59692021: https://sv.wikipedia.org/w/index.php?title=Romerska_siffror&oldid=59692021 — *D = 500<br>English Wiktionary: Translingual entries for Roman numerals: "D", Translingual, revision 93410266: https://en.wiktionary.org/w/index.php?title=D&oldid=93410266 — # {{q\|[[Roman numeral]]s}} [[five hundred\|Five hundred]] (500).<br>Wikidata checks: Q3011516 P1181 = 500, Q3011516 P31 = Q38918, Q3011516 en = D |
| `m` | M (zxx) | 1000 (zxx) | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "m"; verify_results.json — from_roman("M") = 1000; roman.fromRoman("M") = 1000; to_roman(1000) = M; roman.toRoman(1000) = M; decimal places: M: OK<br>Wikidata: the items for the Roman numerals 1–12, 50, 100, 500 and 1000 (instances of Roman numerals, Q38918), with their English labels and aliases and numeric values (P1181): Q3273364 (wbgetentities, query 4; instances of Roman numerals Q38918, query 3) — en label "Ⅿ"; en description "Roman numeral 1000"; en alias(es) M; P31 (instance of) Roman numerals (Q38918); P1181 (numeric value) +1000<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Thousands, row 1: M<br>Romerska siffror (Swedish Wikipedia), revision 59692021: "Romerska siffror", Talsystemets principer, revision 59692021: https://sv.wikipedia.org/w/index.php?title=Romerska_siffror&oldid=59692021 — *M = 1000<br>English Wiktionary: Translingual entries for Roman numerals: "M", Translingual, revision 93317075: https://en.wiktionary.org/w/index.php?title=M&oldid=93317075 — # {{senseid\|mul\|Q43016}} {{q\|[[Roman numeral]]s}} [[thousand#English:_Q43016\|thousand]] ([[one thousand#English:_Q43016\|one thousand]])<br>Wikidata checks: Q3273364 P1181 = 1000, Q3273364 P31 = Q38918, Q3273364 en = M |
| `iv` | IV (zxx) | 4 (zxx) — *Standard form; older inscriptions and many clock faces write IIII. (en) / Standardformen; i äldre inskrifter och på många urtavlor skrivs 4 som IIII. (sv)* | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "iv"; verify_results.json — from_roman("IV") = 4; roman.fromRoman("IV") = 4; to_roman(4) = IV; roman.toRoman(4) = IV; decimal places: IV: OK<br>Wikidata: the items for the Roman numerals 1–12, 50, 100, 500 and 1000 (instances of Roman numerals, Q38918), with their English labels and aliases and numeric values (P1181): Q3594831 (wbgetentities, query 4; instances of Roman numerals Q38918, query 3) — en label "Ⅳ"; en description "Roman numeral 4"; en alias(es) IV; P31 (instance of) Roman numerals (Q38918); P1181 (numeric value) +4<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Units, row 4: IV. Other forms: "While subtractive notation for 4, 40, and 400 ({{rn\|IV}}, {{rn\|XL}}, and {{rn\|CD}}) is the modern standard, [[additive notation]] to represent these numbers ({{rn\|IIII}}, {{rn\|XXXX}}, and {{rn\|CCCC}}) … was often used". "Modern [[clock face]]s that use Roman numerals still very often use {{rn\|IIII}} for four o'clock but {{rn\|IX}} for nine o'clock"<br>Romerska siffror (Swedish Wikipedia), revision 59692021: "Romerska siffror", Talsystemets principer, regel 1 och 2; caption of the image "Katarina kyrka tornur", revision 59692021: https://sv.wikipedia.org/w/index.php?title=Romerska_siffror&oldid=59692021 — IV = 5 − 1 = 4 … Observera att siffran "4" skrivs med fyra streck, vilket är vanligt för ur med romerska siffror. … dock kan 4 skrivas som IIII (1 + 1 + 1 + 1) och 40 som XXXX (10 + 10 + 10 + 10).<br>English Wiktionary: Translingual entries for Roman numerals: "IV", Translingual, revision 90074658: https://en.wiktionary.org/w/index.php?title=IV&oldid=90074658 — # A [[Roman numeral]] representing four ([[four\|4]]).<br>Wikidata checks: Q3594831 P1181 = 4, Q3594831 P31 = Q38918, Q3594831 en = IV |
| `ix` | IX (zxx) | 9 (zxx) — *Standard form; older texts also write VIIII. (en) / Standardformen; i äldre texter skrivs 9 även som VIIII. (sv)* | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "ix"; verify_results.json — from_roman("IX") = 9; roman.fromRoman("IX") = 9; to_roman(9) = IX; roman.toRoman(9) = IX; decimal places: IX: OK<br>Wikidata: the items for the Roman numerals 1–12, 50, 100, 500 and 1000 (instances of Roman numerals, Q38918), with their English labels and aliases and numeric values (P1181): Q3594836 (wbgetentities, query 4; instances of Roman numerals Q38918, query 3) — en label "Ⅸ"; en description "Roman numeral 9"; en alias(es) IX; P31 (instance of) Roman numerals (Q38918); P1181 (numeric value) +9<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Units, row 9: IX. "The numerals for 4 ({{rn\|IV}}) and 9 ({{rn\|IX}}) are written using [[subtractive notation]] … instead of {{rn\|IIII}} and {{rn\|VIIII}}"<br>Romerska siffror (Swedish Wikipedia), revision 59692021: "Romerska siffror", Talsystemets principer, regel 2; Exemplet 1999, revision 59692021: https://sv.wikipedia.org/w/index.php?title=Romerska_siffror&oldid=59692021 — IX = 10 − 1 = 9 … Detta medför åtta olika sätt att ange 1999: … * MCMXCVIIII<br>English Wiktionary: Translingual entries for Roman numerals: "IX", Translingual, revision 92360770: https://en.wiktionary.org/w/index.php?title=IX&oldid=92360770 — # [[Roman numeral]] [[nine]] ([[9]])<br>Wikidata checks: Q3594836 P1181 = 9, Q3594836 P31 = Q38918, Q3594836 en = IX |
| `xl` | XL (zxx) | 40 (zxx) — *Standard form; older texts also write XXXX. (en) / Standardformen; i äldre texter skrivs 40 även som XXXX. (sv)* | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "xl"; verify_results.json — from_roman("XL") = 40; roman.fromRoman("XL") = 40; to_roman(40) = XL; roman.toRoman(40) = XL; decimal places: XL: OK<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Tens, row 4: XL. Other forms: "While subtractive notation for 4, 40, and 400 ({{rn\|IV}}, {{rn\|XL}}, and {{rn\|CD}}) is the modern standard, [[additive notation]] to represent these numbers ({{rn\|IIII}}, {{rn\|XXXX}}, and {{rn\|CCCC}}) … was often used"<br>Romerska siffror (Swedish Wikipedia), revision 59692021: "Romerska siffror", Talsystemets principer, regel 1, revision 59692021: https://sv.wikipedia.org/w/index.php?title=Romerska_siffror&oldid=59692021 — dock kan 4 skrivas som IIII (1 + 1 + 1 + 1) och 40 som XXXX (10 + 10 + 10 + 10).<br>English Wiktionary: Translingual entries for Roman numerals: "XL", Translingual, revision 92491039: https://en.wiktionary.org/w/index.php?title=XL&oldid=92491039 — # {{n-g\|A [[Roman numeral]] representing}} [[forty]] ([[40]]). [[Category:Roman numerals]] |
| `xc` | XC (zxx) | 90 (zxx) | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "xc"; verify_results.json — from_roman("XC") = 90; roman.fromRoman("XC") = 90; to_roman(90) = XC; roman.toRoman(90) = XC; decimal places: XC: OK<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Tens, row 9: XC<br>English Wiktionary: Translingual entries for Roman numerals: "XC", Translingual, revision 90402526: https://en.wiktionary.org/w/index.php?title=XC&oldid=90402526 — # {{n-g\|A [[Roman numeral]] representing}} the number [[ninety]] ([[90]]). |
| `cd` | CD (zxx) | 400 (zxx) — *Standard form; older texts also write CCCC. (en) / Standardformen; i äldre texter skrivs 400 även som CCCC. (sv)* | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "cd"; verify_results.json — from_roman("CD") = 400; roman.fromRoman("CD") = 400; to_roman(400) = CD; roman.toRoman(400) = CD; decimal places: CD: OK<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Hundreds, row 4: CD. Other forms: "While subtractive notation for 4, 40, and 400 ({{rn\|IV}}, {{rn\|XL}}, and {{rn\|CD}}) is the modern standard, [[additive notation]] to represent these numbers ({{rn\|IIII}}, {{rn\|XXXX}}, and {{rn\|CCCC}}) … was often used"<br>Romerska siffror (Swedish Wikipedia), revision 59692021: "Romerska siffror", Exemplet 1999, revision 59692021: https://sv.wikipedia.org/w/index.php?title=Romerska_siffror&oldid=59692021 — Romarna använde sig ofta av fyra likadana tecken som adderades, både för I (IIII), X (XXXX) och C (CCCC). |
| `cm` | CM (zxx) | 900 (zxx) | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "cm"; verify_results.json — from_roman("CM") = 900; roman.fromRoman("CM") = 900; to_roman(900) = CM; roman.toRoman(900) = CM; decimal places: CM: OK<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Hundreds, row 9: CM<br>Romerska siffror (Swedish Wikipedia), revision 59692021: "Romerska siffror", Talsystemets principer, regel 2, revision 59692021: https://sv.wikipedia.org/w/index.php?title=Romerska_siffror&oldid=59692021 — CM = 1000 − 100 = 900 |
| `ii` | II (zxx) | 2 (zxx) | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "ii"; verify_results.json — from_roman("II") = 2; roman.fromRoman("II") = 2; to_roman(2) = II; roman.toRoman(2) = II; decimal places: II: OK<br>Wikidata: the items for the Roman numerals 1–12, 50, 100, 500 and 1000 (instances of Roman numerals, Q38918), with their English labels and aliases and numeric values (P1181): Q3594830 (wbgetentities, query 4; instances of Roman numerals Q38918, query 3) — en label "Ⅱ"; en description "Roman numeral 2"; en alias(es) II; P31 (instance of) Roman numerals (Q38918); P1181 (numeric value) +2<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Units, row 2: II<br>Romerska siffror (Swedish Wikipedia), revision 59692021: "Romerska siffror", Talsystemets principer, regel 1, revision 59692021: https://sv.wikipedia.org/w/index.php?title=Romerska_siffror&oldid=59692021 — II = 1 + 1 = 2<br>English Wiktionary: Translingual entries for Roman numerals: "II", Translingual, revision 91967443: https://en.wiktionary.org/w/index.php?title=II&oldid=91967443 — # {{senseid\|mul\|Q200}} {{cln\|mul\|cardinal numbers}} [[two]] ([[2]])<br>Wikidata checks: Q3594830 P1181 = 2, Q3594830 P31 = Q38918, Q3594830 en = II |
| `iii` | III (zxx) | 3 (zxx) | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "iii"; verify_results.json — from_roman("III") = 3; roman.fromRoman("III") = 3; to_roman(3) = III; roman.toRoman(3) = III; decimal places: III: OK<br>Wikidata: the items for the Roman numerals 1–12, 50, 100, 500 and 1000 (instances of Roman numerals, Q38918), with their English labels and aliases and numeric values (P1181): Q3594832 (wbgetentities, query 4; instances of Roman numerals Q38918, query 3) — en label "Ⅲ"; en description "Roman numeral 3"; en alias(es) III; P31 (instance of) Roman numerals (Q38918); P1181 (numeric value) +3<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Units, row 3: III<br>English Wiktionary: Translingual entries for Roman numerals: "III", Translingual, revision 90400826: https://en.wiktionary.org/w/index.php?title=III&oldid=90400826 — # {{n-g\|A [[Roman numeral]] representing}} the number [[three]] ([[3]]).<br>Wikidata checks: Q3594832 P1181 = 3, Q3594832 P31 = Q38918, Q3594832 en = III |
| `vi` | VI (zxx) | 6 (zxx) | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "vi"; verify_results.json — from_roman("VI") = 6; roman.fromRoman("VI") = 6; to_roman(6) = VI; roman.toRoman(6) = VI; decimal places: VI: OK<br>Wikidata: the items for the Roman numerals 1–12, 50, 100, 500 and 1000 (instances of Roman numerals, Q38918), with their English labels and aliases and numeric values (P1181): Q3594834 (wbgetentities, query 4; instances of Roman numerals Q38918, query 3) — en label "Ⅵ"; en description "Roman numeral 6"; en alias(es) VI; P31 (instance of) Roman numerals (Q38918); P1181 (numeric value) +6<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Units, row 6: VI<br>Romerska siffror (Swedish Wikipedia), revision 59692021: "Romerska siffror", Talsystemets principer, regel 3, revision 59692021: https://sv.wikipedia.org/w/index.php?title=Romerska_siffror&oldid=59692021 — VI = 5 + 1 = 6<br>English Wiktionary: Translingual entries for Roman numerals: "VI", Translingual, revision 90074644: https://en.wiktionary.org/w/index.php?title=VI&oldid=90074644 — # A [[Roman numeral]] representing six ([[six\|6]]).<br>Wikidata checks: Q3594834 P1181 = 6, Q3594834 P31 = Q38918, Q3594834 en = VI |
| `viii` | VIII (zxx) | 8 (zxx) | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "viii"; verify_results.json — from_roman("VIII") = 8; roman.fromRoman("VIII") = 8; to_roman(8) = VIII; roman.toRoman(8) = VIII; decimal places: VIII: OK<br>Wikidata: the items for the Roman numerals 1–12, 50, 100, 500 and 1000 (instances of Roman numerals, Q38918), with their English labels and aliases and numeric values (P1181): Q3594835 (wbgetentities, query 4; instances of Roman numerals Q38918, query 3) — en label "Ⅷ"; en description "Roman numeral 8"; en alias(es) VIII; P31 (instance of) Roman numerals (Q38918); P1181 (numeric value) +8<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Units, row 8: VIII<br>Romerska siffror (Swedish Wikipedia), revision 59692021: "Romerska siffror", Talsystemets principer, regel 3, revision 59692021: https://sv.wikipedia.org/w/index.php?title=Romerska_siffror&oldid=59692021 — VIII = 5 + 1 + 1 + 1 = 8<br>English Wiktionary: Translingual entries for Roman numerals: "VIII", Translingual, revision 90074646: https://en.wiktionary.org/w/index.php?title=VIII&oldid=90074646 — # A [[Roman numeral]] representing the number eight (8).<br>Wikidata checks: Q3594835 P1181 = 8, Q3594835 P31 = Q38918, Q3594835 en = VIII |
| `xii` | XII (zxx) | 12 (zxx) | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "xii"; verify_results.json — from_roman("XII") = 12; roman.fromRoman("XII") = 12; to_roman(12) = XII; roman.toRoman(12) = XII; decimal places: X + II: OK<br>Wikidata: the items for the Roman numerals 1–12, 50, 100, 500 and 1000 (instances of Roman numerals, Q38918), with their English labels and aliases and numeric values (P1181): Q3594839 (wbgetentities, query 4; instances of Roman numerals Q38918, query 3) — en label "Ⅻ"; en description "Roman numeral 12"; en alias(es) XII; P31 (instance of) Roman numerals (Q38918); P1181 (numeric value) +12<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Tens, row 1: X; Units, row 2: II<br>English Wiktionary: Translingual entries for Roman numerals: "XII", Translingual, revision 90074632: https://en.wiktionary.org/w/index.php?title=XII&oldid=90074632 — # [[Roman numeral]] [[twelve]] ([[12]]).<br>Wikidata checks: Q3594839 P1181 = 12, Q3594839 P31 = Q38918, Q3594839 en = XII |
| `xiv` | XIV (zxx) | 14 (zxx) | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "xiv"; verify_results.json — from_roman("XIV") = 14; roman.fromRoman("XIV") = 14; to_roman(14) = XIV; roman.toRoman(14) = XIV; decimal places: X + IV: OK<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Tens, row 1: X; Units, row 4: IV<br>English Wiktionary: Translingual entries for Roman numerals: "XIV", Translingual, revision 91946057: https://en.wiktionary.org/w/index.php?title=XIV&oldid=91946057 — # {{senseid\|mul\|Q38582}} {{lb\|mul\|[[Roman numeral]]s}} [[fourteen#English:_Q38582\|fourteen]] |
| `xix` | XIX (zxx) | 19 (zxx) | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "xix"; verify_results.json — from_roman("XIX") = 19; roman.fromRoman("XIX") = 19; to_roman(19) = XIX; roman.toRoman(19) = XIX; decimal places: X + IX: OK<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Tens, row 1: X; Units, row 9: IX<br>English Wiktionary: Translingual entries for Roman numerals: "XIX", Translingual, revision 90074622: https://en.wiktionary.org/w/index.php?title=XIX&oldid=90074622 — # {{n-g\|A [[Roman numeral]] representing}} the number [[nineteen]] ([[19]]). |
| `xxiv` | XXIV (zxx) | 24 (zxx) | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "xxiv"; verify_results.json — from_roman("XXIV") = 24; roman.fromRoman("XXIV") = 24; to_roman(24) = XXIV; roman.toRoman(24) = XXIV; decimal places: XX + IV: OK<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Tens, row 2: XX; Units, row 4: IV<br>English Wiktionary: Translingual entries for Roman numerals: "XXIV", Translingual, revision 90074611: https://en.wiktionary.org/w/index.php?title=XXIV&oldid=90074611 — # {{n-g\|A [[Roman numeral]] representing}} the number [[twenty-four]] ([[24]]). |
| `xxxix` | XXXIX (zxx) | 39 (zxx) | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "xxxix"; verify_results.json — from_roman("XXXIX") = 39; roman.fromRoman("XXXIX") = 39; to_roman(39) = XXXIX; roman.toRoman(39) = XXXIX; decimal places: XXX + IX: OK<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Tens, row 3: XXX; Units, row 9: IX. * 39 = {{rn\|XXX}} + {{rn\|IX}} = '''{{rn\|XXXIX}}'''.<br>English Wiktionary: Translingual entries for Roman numerals: "XXXIX", Translingual, revision 90074579: https://en.wiktionary.org/w/index.php?title=XXXIX&oldid=90074579 — # {{n-g\|A [[Roman numeral]] representing}} the number [[thirty-nine]] ([[39]]). |
| `xlii` | XLII (zxx) | 42 (zxx) | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "xlii"; verify_results.json — from_roman("XLII") = 42; roman.fromRoman("XLII") = 42; to_roman(42) = XLII; roman.toRoman(42) = XLII; decimal places: XL + II: OK<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Tens, row 4: XL; Units, row 2: II<br>English Wiktionary: Translingual entries for Roman numerals: "XLII", Translingual, revision 90074572: https://en.wiktionary.org/w/index.php?title=XLII&oldid=90074572 — # {{n-g\|A [[Roman numeral]] representing}} the number [[forty-two]] ([[42]]). |
| `xlix` | XLIX (zxx) | 49 (zxx) — *Not IL: in the standard form, I is subtracted only from V and X. (en) / Inte IL: i standardformen subtraheras I bara från V och X. (sv)* | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "xlix"; verify_results.json — from_roman("XLIX") = 49; roman.fromRoman("XLIX") = 49; to_roman(49) = XLIX; roman.toRoman(49) = XLIX; decimal places: XL + IX: OK<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Tens, row 4: XL; Units, row 9: IX. Other forms: "There are historical examples of other subtractive forms: {{rn\|IIIXX}} for 17, … {{rn\|IIIC}} for 97, … {{rn\|IIC}} for 98, … and {{rn\|IC}} for 99."<br>Romerska siffror (Swedish Wikipedia), revision 59692021: "Romerska siffror", Talsystemets principer; Exemplet 1999, revision 59692021: https://sv.wikipedia.org/w/index.php?title=Romerska_siffror&oldid=59692021 — I (1) får exempelvis bara subtraheras från V (5) och X (10), inte från L (50) och högre. … En regel, som tillämpades av romarna, var att ett mindre tal som sätts före ett större tal måste vara minst 1/10 av det större talet. Det vill säga I kan bara sättas till vänster om V eller X<br>English Wiktionary: Translingual entries for Roman numerals: "XLIX", Translingual, revision 90074559: https://en.wiktionary.org/w/index.php?title=XLIX&oldid=90074559 — # {{n-g\|A [[Roman numeral]] representing}} the number [[forty-nine]] ([[49]]). |
| `lxxx` | LXXX (zxx) | 80 (zxx) | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "lxxx"; verify_results.json — from_roman("LXXX") = 80; roman.fromRoman("LXXX") = 80; to_roman(80) = LXXX; roman.toRoman(80) = LXXX; decimal places: LXXX: OK<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Tens, row 8: LXXX<br>English Wiktionary: Translingual entries for Roman numerals: "LXXX", Translingual, revision 90402483: https://en.wiktionary.org/w/index.php?title=LXXX&oldid=90402483 — # {{n-g\|A [[Roman numeral]] representing}} the number [[eighty]] ([[80]]). |
| `xcix` | XCIX (zxx) | 99 (zxx) — *Not IC: in the standard form, I is subtracted only from V and X (IC occurs in some older texts). (en) / Inte IC: i standardformen subtraheras I bara från V och X (IC förekommer i vissa äldre texter). (sv)* | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "xcix"; verify_results.json — from_roman("XCIX") = 99; roman.fromRoman("XCIX") = 99; to_roman(99) = XCIX; roman.toRoman(99) = XCIX; decimal places: XC + IX: OK<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Tens, row 9: XC; Units, row 9: IX. Other forms: "There are historical examples of other subtractive forms: {{rn\|IIIXX}} for 17, … {{rn\|IIIC}} for 97, … {{rn\|IIC}} for 98, … and {{rn\|IC}} for 99."<br>Romerska siffror (Swedish Wikipedia), revision 59692021: "Romerska siffror", Exemplet 1999; Alternativa former, revision 59692021: https://sv.wikipedia.org/w/index.php?title=Romerska_siffror&oldid=59692021 — Sålunda kan 99 inte skrivas IC, utan måste skrivas som XCIX. … Denna regel följs inte alltid, XCIX kan förkortas IC.<br>English Wiktionary: Translingual entries for Roman numerals: "XCIX", Translingual, revision 87632334: https://en.wiktionary.org/w/index.php?title=XCIX&oldid=87632334 — # {{n-g\|A [[Roman numeral]] representing}} the number [[ninety-nine]] ([[99]]). |
| `ccc` | CCC (zxx) | 300 (zxx) | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "ccc"; verify_results.json — from_roman("CCC") = 300; roman.fromRoman("CCC") = 300; to_roman(300) = CCC; roman.toRoman(300) = CCC; decimal places: CCC: OK<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Hundreds, row 3: CCC<br>Romerska siffror (Swedish Wikipedia), revision 59692021: "Romerska siffror", Talsystemets principer, regel 1, revision 59692021: https://sv.wikipedia.org/w/index.php?title=Romerska_siffror&oldid=59692021 — CCC = 100 + 100 + 100 = 300 |
| `cdxliv` | CDXLIV (zxx) | 444 (zxx) | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "cdxliv"; verify_results.json — from_roman("CDXLIV") = 444; roman.fromRoman("CDXLIV") = 444; to_roman(444) = CDXLIV; roman.toRoman(444) = CDXLIV; decimal places: CD + XL + IV: OK<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Hundreds, row 4: CD; Tens, row 4: XL; Units, row 4: IV |
| `dccc` | DCCC (zxx) | 800 (zxx) | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "dccc"; verify_results.json — from_roman("DCCC") = 800; roman.fromRoman("DCCC") = 800; to_roman(800) = DCCC; roman.toRoman(800) = DCCC; decimal places: DCCC: OK<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Hundreds, row 8: DCCC |
| `cmxcix` | CMXCIX (zxx) | 999 (zxx) | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "cmxcix"; verify_results.json — from_roman("CMXCIX") = 999; roman.fromRoman("CMXCIX") = 999; to_roman(999) = CMXCIX; roman.toRoman(999) = CMXCIX; decimal places: CM + XC + IX: OK<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Hundreds, row 9: CM; Tens, row 9: XC; Units, row 9: IX |
| `mcdxcii` | MCDXCII (zxx) | 1492 (zxx) | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "mcdxcii"; verify_results.json — from_roman("MCDXCII") = 1492; roman.fromRoman("MCDXCII") = 1492; to_roman(1492) = MCDXCII; roman.toRoman(1492) = MCDXCII; decimal places: M + CD + XC + II: OK<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Thousands, row 1: M; Hundreds, row 4: CD; Tens, row 9: XC; Units, row 2: II |
| `mdclxvi` | MDCLXVI (zxx) | 1666 (zxx) — *Each of the seven symbols once, in descending order. (en) / Vart och ett av de sju tecknen en gång, i fallande ordning. (sv)* | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "mdclxvi"; verify_results.json — from_roman("MDCLXVI") = 1666; roman.fromRoman("MDCLXVI") = 1666; to_roman(1666) = MDCLXVI; roman.toRoman(1666) = MDCLXVI; decimal places: M + DC + LX + VI: OK<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Thousands, row 1: M; Hundreds, row 6: DC; Tens, row 6: LX; Units, row 6: VI |
| `mdcclxxvi` | MDCCLXXVI (zxx) | 1776 (zxx) | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "mdcclxxvi"; verify_results.json — from_roman("MDCCLXXVI") = 1776; roman.fromRoman("MDCCLXXVI") = 1776; to_roman(1776) = MDCCLXXVI; roman.toRoman(1776) = MDCCLXXVI; decimal places: M + DCC + LXX + VI: OK<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Thousands, row 1: M; Hundreds, row 7: DCC; Tens, row 7: LXX; Units, row 6: VI. * 1776 = {{rn\|M}} + {{rn\|DCC}} + {{rn\|LXX}} + {{rn\|VI}} = '''{{rn\|MDCCLXXVI}}''' (the date written on the book held by the [[Statue of Liberty]]). |
| `mcmxlv` | MCMXLV (zxx) | 1945 (zxx) | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "mcmxlv"; verify_results.json — from_roman("MCMXLV") = 1945; roman.fromRoman("MCMXLV") = 1945; to_roman(1945) = MCMXLV; roman.toRoman(1945) = MCMXLV; decimal places: M + CM + XL + V: OK<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Thousands, row 1: M; Hundreds, row 9: CM; Tens, row 4: XL; Units, row 5: V |
| `mcmlxxxiv` | MCMLXXXIV (zxx) | 1984 (zxx) | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "mcmlxxxiv"; verify_results.json — from_roman("MCMLXXXIV") = 1984; roman.fromRoman("MCMLXXXIV") = 1984; to_roman(1984) = MCMLXXXIV; roman.toRoman(1984) = MCMLXXXIV; decimal places: M + CM + LXXX + IV: OK<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Thousands, row 1: M; Hundreds, row 9: CM; Tens, row 8: LXXX; Units, row 4: IV |
| `mcmxcix` | MCMXCIX (zxx) | 1999 (zxx) — *Not MIM: the number is written digit by digit (M + CM + XC + IX). (en) / Inte MIM: talet skrivs siffra för siffra (M + CM + XC + IX). (sv)* | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "mcmxcix"; verify_results.json — from_roman("MCMXCIX") = 1999; roman.fromRoman("MCMXCIX") = 1999; to_roman(1999) = MCMXCIX; roman.toRoman(1999) = MCMXCIX; decimal places: M + CM + XC + IX: OK<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Thousands, row 1: M; Hundreds, row 9: CM; Tens, row 9: XC; Units, row 9: IX<br>Romerska siffror (Swedish Wikipedia), revision 59692021: "Romerska siffror", Talsystemets principer, regel 3; Exemplet 1999, revision 59692021: https://sv.wikipedia.org/w/index.php?title=Romerska_siffror&oldid=59692021 — MCMXCIX = 1000 + (1000 − 100) + (100 − 10) + (10 − 1) = 1999 … 1999 alltså inte skrivas MIM (1000 + 1000 − 1) utan måste skrivas MCMXCIX |
| `mm` | MM (zxx) | 2000 (zxx) | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "mm"; verify_results.json — from_roman("MM") = 2000; roman.fromRoman("MM") = 2000; to_roman(2000) = MM; roman.toRoman(2000) = MM; decimal places: MM: OK<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Thousands, row 2: MM<br>English Wiktionary: Translingual entries for Roman numerals: "MM", Translingual, revision 91053203: https://en.wiktionary.org/w/index.php?title=MM&oldid=91053203 — # [[two\|Two]] [[thousand]] (2000) in [[Roman numeral]]s. |
| `mmxxvi` | MMXXVI (zxx) | 2026 (zxx) | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "mmxxvi"; verify_results.json — from_roman("MMXXVI") = 2026; roman.fromRoman("MMXXVI") = 2026; to_roman(2026) = MMXXVI; roman.toRoman(2026) = MMXXVI; decimal places: MM + XX + VI: OK<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Thousands, row 2: MM; Tens, row 2: XX; Units, row 6: VI. The line "{{#time:Y}} = '''{{rn\|{{#time:xrY}}}}''' (this year)", rendered by MediaWiki's own Roman numeral formatter (#time with xr) on 2026-10-04 (query 9): "MMXXVI (this year)" |
| `mmmdccclxxxviii` | MMMDCCCLXXXVIII (zxx) | 3888 (zxx) — *The longest numeral below 4000: 15 symbols. (en) / Det längsta romerska talet under 4000: 15 tecken. (sv)* | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "mmmdccclxxxviii"; verify_results.json — from_roman("MMMDCCCLXXXVIII") = 3888; roman.fromRoman("MMMDCCCLXXXVIII") = 3888; to_roman(3888) = MMMDCCCLXXXVIII; roman.toRoman(3888) = MMMDCCCLXXXVIII; decimal places: MMM + DCCC + LXXX + VIII: OK<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Thousands, row 3: MMM; Hundreds, row 8: DCCC; Tens, row 8: LXXX; Units, row 8: VIII |
| `mmmcmxcix` | MMMCMXCIX (zxx) | 3999 (zxx) — *The largest number standard notation can write. (en) / Det största tal som kan skrivas i standardformen. (sv)* | Conversion and machine checks for the Solid Memo Roman numerals deck: verify_roman.py (query 13), card "mmmcmxcix"; verify_results.json — from_roman("MMMCMXCIX") = 3999; roman.fromRoman("MMMCMXCIX") = 3999; to_roman(3999) = MMMCMXCIX; roman.toRoman(3999) = MMMCMXCIX; decimal places: MMM + CM + XC + IX: OK<br>Roman numerals (English Wikipedia), revision 1377908551: "Roman numerals", section Standard form (and Other forms where quoted), revision 1377908551: https://en.wikipedia.org/w/index.php?title=Roman_numerals&oldid=1377908551 — Table "Individual decimal places": Thousands, row 3: MMM; Hundreds, row 9: CM; Tens, row 9: XC; Units, row 9: IX. The largest number that can be represented in this manner is 3,999 ('''{{rn\|MMMCMXCIX}}''') |
