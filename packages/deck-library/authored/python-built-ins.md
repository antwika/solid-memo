# Python built-in functions — provenance report

<!-- Generated from authored/python-built-ins.json by scripts/authored_decks.py. Do not edit: change the dossier and rebuild. -->

**Deck:** [`decks/python-built-ins.ttl`](../decks/python-built-ins.ttl) · **Cards:** 50 · **Licence:** [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) · **Compiled by:** Anton Wiklund · **Created:** 2026-10-04

50 everyday Python 3 built-in functions and operations, as of Python 3.14. Front: a task in plain words in English and Swedish; back: the Python expression that does it, using names such as xs (a list), s (a string) and d (a dict). Covers len, range, enumerate, zip, sorted, sum, min, max, round, the type conversions, print, input, open, any, all, map, filter, f-strings, slicing, list comprehensions, dict.get, string methods and in. Strings are written in double quotes. Every expression was run with Python 3.14.4 and checked against the official Python documentation.

## Sources

| Source | Creator | Licence | Role | Retrieved | Used for |
|---|---|---|---|---|---|
| [Test run of every card's expression with Python 3.14.4 (CPython)](https://github.com/antwika/solid-memo/blob/main/packages/deck-library/authored/python-built-ins.md#queries) | Claude (AI, Anthropic), authoring agent, at Anton Wiklund's direction | [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) | content | 2026-10-04 | The expression on every card: each expression was evaluated with sample values bound to the names on the front (print and input in a child Python process with captured standard input and output, open in a throwaway work directory), and the result is the evidence that the expression performs the task. Also every equivalent form and behaviour named in the notes (range(0, n), enumerate(xs, 1), xs.sort(), round(2.5), f'...', xs[0:3], d[k] raising KeyError, s.split(" "), v in d.values(), isinstance with bool, the file's default mode and encoding; dict(pairs) with a repeated key was run in review round 5 with check.py). |
| [The Python 3.14 documentation (docs.python.org, version 3.14.8)](https://docs.python.org/3/) | Python Software Foundation | All rights reserved | verification | 2026-10-04 | Pages consulted: Built-in Functions, Built-in Types, the Language Reference (Expressions; Lexical analysis), the string module's Format Specification Mini-Language and the Tutorial (Input and Output). Confirming for every card that the function, method or syntax is documented to do what the front says, and the behaviours in the notes (rounding of halves to even, mode 'r' as open's default and the locale encoding in 3.14, 'w' truncating, zip stopping at the shortest iterable, dict built from pairs keeping the last value, bool as a subclass of int, str.split with and without a separator, in on dictionaries testing keys). The built-in functions page is now served at builtins/functions.html and the built-in types at builtins/stdtypes.html (the old library/ addresses redirect there). The 3.15 Built-in Functions page (3.15.0rc3, https://docs.python.org/3.15/builtins/functions.html) and PEP 790 (https://peps.python.org/pep-0790/) were also consulted in review round 1 for open's default encoding. No wording, example or selection was copied into the cards: fronts and notes are the authoring agent's own words. |
| [Wikidata: Swedish labels and aliases of programming terms (list, string, integer, floating point, tuple, set, iterator, absolute value, computer file, function, standard output, list comprehension, associative array)](https://www.wikidata.org/wiki/Wikidata:Main_Page) | Wikidata contributors | [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) | verification | 2026-10-04 | Checking the Swedish terms on the fronts: lista (Q12139612, https://www.wikidata.org/wiki/Q12139612), sträng (alias of textsträng, Q184754), heltal (Q12503), flyttal (Q117879, https://www.wikidata.org/wiki/Q117879), mängd (Q36161), tupel (Q600590, https://www.wikidata.org/wiki/Q600590), iterator (Q1326388), absolutbelopp (Q120812), fil (Q82753), funktion (Q15810910), and that standard output (Q56303789, https://www.wikidata.org/wiki/Q56303789) has the Swedish label "Standard output", while list comprehension (Q795065) and associative array (Q80585, English alias "dict") have no Swedish label. flyttal and tupel were confirmed by a wbgetentities lookup of Q117879 and Q600590 in review round 3 (the second terms.rq did not return them, because their English labels are "floating point" and "𝑛-tuple"). No card states a Wikidata fact, so there are no Wikidata checks; Wikidata was queried live only for these Swedish terms. |
| [Svenskspråkiga Wikipedia: Flyttal, Iterator, Tupel, Python (programspråk), Standard output](https://sv.wikipedia.org/wiki/Flyttal) | Wikipedia contributors | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | verification | 2026-10-04 | Confirming the Swedish terms flyttal, iterator and tupel in running Swedish text (introductions of the articles Flyttal, revision 56930826, https://sv.wikipedia.org/w/index.php?oldid=56930826; Iterator, revision 48594463, https://sv.wikipedia.org/w/index.php?oldid=48594463; Tupel, revision 54313732, https://sv.wikipedia.org/w/index.php?oldid=54313732; Python (programspråk), revision 59278094, https://sv.wikipedia.org/w/index.php?oldid=59278094), and the loan term standard output on the print card (article Standard output, revision 51151527, https://sv.wikipedia.org/w/index.php?oldid=51151527, whose introduction uses the English term in Swedish text). The articles Standardströmmar, Lista (datastruktur), Associativ array, Mängd (datastruktur) and Slicing do not exist, and a search for "list comprehension" found nothing. Single words only; no text or selection copied. |

**Content** sources supplied information that is in the cards. **Verification** sources were only consulted to confirm facts: nothing was copied from them.

### Licence evidence

- **Test run of every card's expression with Python 3.14.4 (CPython)** — Written for this deck: the test script run_cards.py and its complete output are reproduced verbatim in the Queries section of this report (the URL above). The script and the authoring agent's annotations are dedicated to the public domain under CC0 1.0. The output consists of the values Python printed (reprs, a KeyError message); running a program and recording what its expressions evaluate to copies none of its code or documentation.
- **The Python 3.14 documentation (docs.python.org, version 3.14.8)** — https://docs.python.org/3/copyright.html (fetched 2026-10-04): "Python and this documentation is: Copyright © 2001 Python Software Foundation. All rights reserved."; its footer: "This page is licensed under the Python Software Foundation License Version 2. Examples, recipes, and other code in the documentation are additionally licensed under the Zero Clause BSD License." https://docs.python.org/3/license.html: "Python software and documentation are licensed under the Python Software Foundation License Version 2." The PSF License Version 2 is not one of the licences the library's policy accepts for content (it requires PSF's licence and copyright notice to be retained in derivative works) and the builder has no identifier for it, so the documentation is recorded under its copyright statement and used for verification only. Nothing from it is in the cards, not even the documentation's 0BSD-licensed examples; the evidence in this report summarises the cited passages in the authoring agent's own words, apart from the documented signatures and parameter names, which are the language's interface.
- **Wikidata: Swedish labels and aliases of programming terms (list, string, integer, floating point, tuple, set, iterator, absolute value, computer file, function, standard output, list comprehension, associative array)** — https://www.wikidata.org/wiki/Wikidata:Licensing (fetched 2026-10-04): "All structured data (i.e. the main, Property, Lexeme, and EntitySchema namespaces) is released into the public domain under Creative Commons Zero."
- **Svenskspråkiga Wikipedia: Flyttal, Iterator, Tupel, Python (programspråk), Standard output** — Footer of https://sv.wikipedia.org/wiki/Flyttal (fetched 2026-10-04): "Wikipedias text är tillgänglig under licensen Creative Commons Erkännande-dela-lika 4.0 Unported."

## Licensing

The deck is CC0 1.0. Its only content source is the authoring agent's own test run of the expressions with Python 3.14.4, whose script and output are reproduced in this report and dedicated to the public domain with the deck. Which expression performs a task is a fact about the language's behaviour and interface, and observing it copies nothing from Python's code or documentation; the names of functions, methods and operators are the language's interface and are needed to state the fact at all. The fronts, notes and the selection of tasks are the brief's and the authoring agent's own wording and choice. The Python documentation (copyright the Python Software Foundation, licensed under the PSF License Version 2, which the library's policy does not accept for content) was used for verification only: it confirmed that each expression does what the front says, and no sentence, example or list was copied from it. Wikidata (CC0) and Swedish Wikipedia (CC BY-SA 4.0) were consulted only to check single Swedish technical terms (lista, sträng, flyttal and so on), which are ordinary vocabulary, not protected expression; no text or selection was taken from them. No source's licence therefore requires attribution or share-alike, though every source is credited in the deck and this report.

## Method

1. Who did the work: Anton Wiklund compiled this deck with the help of AI agents (Claude, by Anthropic), which did the research, drafting and cross-checking at his direction. The cards were checked by machine (a test run of every expression with Python 3.14.4, live Wikidata and the app's SHACL and DCAT-AP validators) and in independent review rounds by further Claude agents, each logged under Quality control with its findings and how they were resolved. Anton Wiklund reviews every deck in full before it is released.
2. Candidate tasks: the library editor's brief named the functions and operations to cover (len, range, enumerate, zip, sorted, reversed, sum, min, max, abs, round, int, float, str, list, dict, set, tuple, isinstance, type, print, input, open, any, all, map, filter, f-strings, slicing, list comprehensions, dict.get, str.split, join, strip and upper, and in). For each, the authoring agent wrote one or two tasks in its own words, each phrased so that one expression answers it (see the ambiguity checks below). The list is the brief's and the agent's own; it was not taken from any published list, tutorial or cheat sheet.
3. Notation on the back: the expression exactly as typed in Python 3, using the names the front introduces: xs and ys for lists, s for a string, d for a dict, k for a key, x and n for a value or number, a and b for range bounds, f for a function or (on one card) an open file, path for a file path, words for a list of strings, pairs for a list of (key, value) tuples and name for a variable. String literals are written in double quotes (single quotes are equivalent in Python, as the f-string card's note says). Keyword arguments are written by name where Python's documentation shows them as keywords (reverse=True, start=1); the positional form enumerate(xs, 1) is named in a note. The back is code, text in no language, so it is tagged zxx.
4. Test run (the content source): the script run_cards.py (reproduced verbatim under Queries) was run with python3 on Linux on 2026-10-04: Python 3.14.4 (CPython, built with GCC 15.2.0), locale encoding UTF-8. For every card it binds sample values to the names on the front, evaluates the card's expression and prints its repr, then evaluates the equivalent forms and behaviours that the notes name, for example list(range(0, n)), enumerate(xs, 1), xs.sort(), round(2.5), f'Hello, {name}!', xs[0:3], d[k], s.split(" ") and 1 in d.values(); the one exception, the repeated-key behaviour in the dict-pairs note, was run in review round 5 with check.py (under Queries). print and input were run in a child Python process with standard input supplied and standard output captured; the open cards ran in a throwaway work directory (work/ in the scratch directory, emptied at the end of the run) with a small data file. The complete output is under Queries and every card's evidence cites its section ("CARD <id>"). The dossier was generated by make_dossier.py, which asserts that every card's back is, character for character, the expression that run_cards.py evaluated for that card.
5. Ambiguity checks: each front was written so that one expression answers it. Fronts name the result's form where Python offers several (a new list versus an iterator: sorted and xs[::-1] versus reversed; a number versus text: round(x, 2) versus f"{x:.2f}"; a built-in function versus a list comprehension: map and filter versus the two comprehension cards; a range object; an iterator of pairs from zip, or from enumerate counting from 0 or 1), the default value of dict.get, and whether a function counts subclasses (isinstance). Where Python accepts an exact synonym (range(0, n), enumerate(xs, 1), xs[0:3], open(path, "r"), f-strings in single quotes, f"{n}" for str(n), the dict comprehension for dict(pairs)), the back is the shortest or the form the documentation shows first, and the synonym is either named in the note or excluded by the front's wording. Because the study direction is front to back only, the builder's uniqueness check applies to the fronts, and every front is unique in both languages.
6. Cross-check (verification source): the Python 3 documentation (version 3.14.8, the current 3.14 documentation on the day) was downloaded with fetch_docs.sh (the pages Built-in Functions, Built-in Types, string, Expressions, Lexical analysis, Data Structures, Input and Output, An Informal Introduction and io), converted to text with txt.py, and the passages cited in the evidence were printed with docs_check.py; anchors.py confirmed that every anchor named in the evidence locators exists on the saved pages. For every card the documented behaviour agreed with the test run; the documentation's version (3.14.8) is a later bug-fix release of the same 3.14 series as the Python that ran the tests (3.14.4), and no difference between them affects a card. The output of docs_check.py is not reproduced here because it consists of the documentation's own text (PSF licence); the script and the exact command line are, and the evidence summarises each passage in the authoring agent's own words (the summaries that had stayed too close to the documentation's sentences were rewritten: thirteen in review round 3, and in review round 4, after every remaining summary had been compared with the live 3.14.8 pages, the other 34 that cite the documentation; the two open-read summaries and those of range-start-stop and enumerate-start, which were already in own words, were kept; in review round 5 all 51 summaries were compared with the live Built-in Functions and Built-in Types pages by six-word sequences (check.py, under Queries), which found only signatures and stock phrases in common). In review round 1 the 3.15 Built-in Functions page (3.15.0rc3, live on the day; 3.15.0 final is scheduled for 2026-10-09 in PEP 790) was compared with the 3.14 page: the only change that touches a card is open's default encoding, which becomes UTF-8 (PEP 686), and the open-read note now names the version.
7. Swedish text: the Swedish fronts and notes were written by the authoring agent in its own words, with Swedish computing terms checked against Wikidata's Swedish labels (query terms.rq, second version, and the Wikidata API, including a lookup of Q117879 and Q600590 for flyttal and tupel) and Swedish Wikipedia: lista, sträng, heltal, flyttal, mängd, tupel, iterator, absolutbelopp, fil, funktion. Wikidata's Swedish label for standard output is "Standard output", and Swedish Wikipedia's article on it is titled "Standard output" and uses the English term in Swedish text, so the Swedish print card keeps that term; list comprehension and associative array (dict) have no Swedish label and no Swedish Wikipedia article (nor has slicing), so the Swedish fronts use the Python terms list comprehension, dict ("dict-objektet d") and slice/slicing as loanwords. Python names, keywords and literal values inside the Swedish fronts (xs, path, None, True, "Name: ") stay as typed; quoted example values use Swedish quotation marks (”42”) in Swedish running text, while notes that show code keep the straight quotes and the ASCII minus sign Python requires. Other Swedish word choices are the authoring agent's own and were not looked up in a dictionary: element for an item of a list, blanktecken for whitespace, versaler for upper case, ledtext for an input prompt, "utlöser undantaget" for raising an exception, and "teckenkodningen från systemets språkinställning" for the locale encoding.
8. Wikidata identifiers: the first version of terms.rq used item ids guessed from memory; most were wrong (they returned, for example, a person, an insect and a town), so the query was rewritten to match the English labels instead, and the remaining ids were found with the Wikidata search API. Only the results of the second query and the API lookups were used.
9. Everything was then written into this dossier (make_dossier.py), built with the builder (scripts/authored_decks.py build python-built-ins) and validated with the app's SHACL and DCAT-AP validators (scripts/validate_sources.ts python-built-ins). There are no Wikidata checks: no card's fact or wording is a Wikidata statement or label; Wikidata was queried live only to confirm the Swedish terms (steps above).

## Selection

50 tasks covering the built-in functions and operations a Python beginner meets first, as the brief named them: len; range (from 0 and from a start); enumerate (from 0 and from 1); zip; sorted (ascending and descending); reversed; reversing with a slice; sum, min, max, abs; round (to an integer and to two decimals); the conversions int, float, str, list, dict, set and tuple; isinstance and type; print and input; open for reading and for writing and reading a whole file; any and all; map and filter; two list comprehensions (transforming and filtering); two f-strings (inserting a value; two decimals); slicing (first three, last item, last three); dict.get with and without a default; str.split (on whitespace and on a separator), join, strip and upper; and in on a list and on a dict. Python 3 only, as of Python 3.14. Left out: functions a beginner rarely needs (eval, exec, compile, vars, locals, globals, the async and attribute-access built-ins, memoryview, bytearray); variants that would need a front naming the exact syntax to be unambiguous (string formatting with % or str.format, lambda, generator expressions, sorted with key=, set and dict comprehensions, the walrus operator); operations whose idiomatic form is disputed (copying a list: xs[:], xs.copy() or list(xs)); and the with statement, which is a statement over several lines rather than an expression. Three further tested tasks (sorted(words, key=len), xs[i:j] and sub in s) were dropped before writing to keep the deck near the brief's size of about 45; their test sections were removed from the script.

## Queries

**Version of the Python used for the test run (also printed at the top of the run output)** (Test run of every card's expression with Python 3.14.4 (CPython))

```
python3 --version  ->  Python 3.14.4
which python3  ->  /usr/bin/python3
```

**Test script run_cards.py (final version), run on Linux with Python 3.14.4 on 2026-10-04 with: python3 <scratch>/run_cards.py > <scratch>/run-output.txt 2>&1** (Test run of every card's expression with Python 3.14.4 (CPython))

```
#!/usr/bin/env python3
"""Run the expression on every card of the python-built-ins deck, with sample
values bound to its names, and print what it gives. Also runs the equivalent
forms and behaviours that the back notes name.

Each test: (card id, setup code, expression on the back, extra lines to run
after it). The setup binds the names the front uses (xs, ys, s, d, k, ...)
to sample values; the expression is evaluated (eval) in that namespace and its
repr printed, together with what it is (type) where that matters. print and
input are run in a child Python process so that standard input and output can
be shown.

Usage: python3 run_cards.py  (prints to stdout; the file tests use a throwaway
work/ directory next to the script, emptied at the end)
"""
import io
import os
import subprocess
import sys


print("python", sys.version.replace("\n", " "))
print("implementation", sys.implementation.name)

# A throwaway work directory next to this script (emptied at the end).
WORK = os.path.join(os.path.dirname(os.path.abspath(__file__)), "work")
os.makedirs(WORK, exist_ok=True)
os.chdir(WORK)
print("locale encoding", __import__("locale").getencoding(), "| UTF-8 mode", sys.flags.utf8_mode)
with open("data.txt", "w", encoding="utf-8") as fh:
    fh.write("first line\nsecond line\n")

TESTS = [
    ("len", "xs = [3, 1, 4, 1, 5]", "len(xs)", []),
    ("range-stop", "n = 5", "range(n)", ["list(range(n))", "list(range(0, n))"]),
    ("range-start-stop", "a, b = 2, 6", "range(a, b)", ["list(range(a, b))"]),
    ("enumerate", "xs = ['a', 'b', 'c']", "enumerate(xs)", ["list(enumerate(xs))"]),
    ("enumerate-start", "xs = ['a', 'b', 'c']", "enumerate(xs, start=1)",
     ["list(enumerate(xs, start=1))", "list(enumerate(xs, 1))"]),
    ("zip", "xs, ys = [1, 2, 3], ['a', 'b', 'c']", "zip(xs, ys)",
     ["list(zip(xs, ys))", "list(zip([1, 2, 3], ['a', 'b']))"]),
    ("sorted", "xs = [3, 1, 2]", "sorted(xs)", ["xs", "type(sorted(xs))", "xs.sort()", "xs"]),
    ("sorted-reverse", "xs = [3, 1, 2]", "sorted(xs, reverse=True)", ["xs"]),
    ("reversed", "xs = [1, 2, 3]", "reversed(xs)", ["list(reversed(xs))", "xs"]),
    ("slice-reverse", "xs = [1, 2, 3]", "xs[::-1]", ["xs", "xs[::-1] is xs"]),
    ("sum", "xs = [1, 2, 3.5]", "sum(xs)", ["sum([])"]),
    ("min", "xs = [3, 1, 2]", "min(xs)", ["min(['b', 'a', 'c'])"]),
    ("max", "xs = [3, 1, 2]", "max(xs)", ["max(['b', 'a', 'c'])"]),
    ("abs", "x = -7.5", "abs(x)", ["abs(-3)", "abs(3 + 4j)"]),
    ("round", "x = 2.7", "round(x)", ["type(round(x))", "round(2.5)", "round(3.5)", "round(-2.7)"]),
    ("round-digits", "x = 3.14159", "round(x, 2)", ["round(2.675, 2)"]),
    ("int", "s = '42'", "int(s)", ["int(' 42\\n')", "int(2.9)"]),
    ("float", "s = '3.5'", "float(s)", ["float('1e3')"]),
    ("str", "n = 42", "str(n)", ["str(3.5)", "f'{n}'"]),
    ("list-chars", "s = 'abc'", "list(s)", []),
    ("dict-pairs", "pairs = [('a', 1), ('b', 2)]", "dict(pairs)", ["{k: v for k, v in pairs}"]),
    ("set", "xs = [3, 1, 3, 2, 1]", "set(xs)", ["type(set(xs))"]),
    ("tuple", "xs = [1, 2, 3]", "tuple(xs)", []),
    ("isinstance", "x = True", "isinstance(x, int)",
     ["isinstance(5, int)", "isinstance(5.0, int)", "type(x) is int", "issubclass(bool, int)"]),
    ("type", "x = 3.5", "type(x)", ["type('a')", "type([])"]),
    ("any", "xs = [0, '', 3]", "any(xs)", ["any([0, '', None])", "any([])"]),
    ("all", "xs = [1, 'a', 3]", "all(xs)", ["all([1, 0, 3])", "all([])"]),
    ("map", "xs = [1, 2, 3]; f = lambda x: x * 10", "map(f, xs)", ["list(map(f, xs))"]),
    ("filter", "xs = [-2, 0, 3, 5]; f = lambda x: x > 0", "filter(f, xs)", ["list(filter(f, xs))"]),
    ("listcomp-map", "xs = [1, 2, 3]; f = lambda x: x * 10", "[f(x) for x in xs]", []),
    ("listcomp-filter", "xs = [-2, 0, 3, 5]", "[x for x in xs if x > 0]", []),
    ("fstring", "name = 'Ada'", 'f"Hello, {name}!"', ["f'Hello, {name}!'"]),
    ("fstring-decimals", "x = 3.14159", 'f"{x:.2f}"', ['f"{2.5:.2f}"', 'format(x, ".2f")']),
    ("slice-first", "xs = [10, 20, 30, 40, 50]", "xs[:3]", ["xs[0:3]", "[1, 2][:3]"]),
    ("index-last", "xs = [10, 20, 30, 40, 50]", "xs[-1]", ["xs[len(xs) - 1]"]),
    ("slice-last", "xs = [10, 20, 30, 40, 50]", "xs[-3:]", ["[1, 2][-3:]"]),
    ("dict-get", "d = {'a': 1}; k = 'z'", "d.get(k)", ["d.get('a')", "d.get(k, None)", "d[k]"]),
    ("dict-get-default", "d = {'a': 1}; k = 'z'", "d.get(k, 0)", ["d.get('a', 0)", "d"]),
    ("split", "s = '  to be   or not '", "s.split()", ["s.split(' ')"]),
    ("split-sep", "s = 'a,b,,c'", 's.split(",")', []),
    ("join", "words = ['to', 'be', 'or']", '" ".join(words)', []),
    ("strip", "s = '\\t  hello world \\n'", "s.strip()", ["s"]),
    ("upper", "s = 'Hello, wörld'", "s.upper()", ["'ß'.upper()"]),
    ("in-list", "xs = [1, 2, 3]; x = 2", "x in xs", ["5 in xs"]),
    ("in-dict", "d = {'a': 1}; k = 'a'", "k in d", ["1 in d", "1 in d.values()"]),
    ("file-read", "f = open('data.txt', encoding='utf-8')", "f.read()", ["f.read()", "f.close()"]),
    ("open-read", "path = 'data.txt'", "open(path)",
     ["open(path).mode", "open(path, 'r').mode", "open(path).read()"]),
    ("open-write", "path = 'out.txt'; open(path, 'w', encoding='utf-8').write('old contents')",
     'open(path, "w")', ["open(path).read()", "open('new.txt', 'w').close()", "os.path.exists('new.txt')"]),
]

ns_base = {"os": os}
for cid, setup, expr, extra in TESTS:
    print()
    print(f"########## CARD {cid}")
    ns = dict(ns_base)
    print(f">>> {setup}")
    exec(setup, ns)
    for e in [expr, *extra]:
        try:
            v = eval(e, ns)
            print(f">>> {e}")
            print(repr(v))
        except Exception as ex:  # noqa: BLE001
            print(f">>> {e}")
            print(f"{type(ex).__name__}: {ex}")
    # Close any file objects left open by the expressions.
    for v in list(ns.values()):
        if isinstance(v, io.IOBase):
            v.close()


def child(cid, code, stdin=""):
    print()
    print(f"########## CARD {cid}")
    print("--- program:")
    print(code)
    r = subprocess.run([sys.executable, "-c", code], input=stdin, capture_output=True, text=True, cwd=WORK)
    print(f"--- stdin: {stdin!r}")
    print(f"--- stdout: {r.stdout!r}")
    print(f"--- stderr: {r.stderr!r}")
    print(f"--- exit {r.returncode}")


child("print", "x = 42\nprint(x)\nprint('a', 'b')\nprint([1, 'two'])")
child("input", 'answer = input("Name: ")\nprint(repr(answer))', stdin="Ada\n")

print()
print("cleanup: remove", sorted(os.listdir(WORK)), "from the work directory")
for name in sorted(os.listdir(WORK)):
    os.remove(os.path.join(WORK, name))
os.rmdir(WORK)
```

**Complete output of the final run (run-output.txt); the object addresses in reprs such as <enumerate object at 0x...> differ from run to run** (Test run of every card's expression with Python 3.14.4 (CPython))

```
python 3.14.4 (main, Aug 20 2026, 10:41:58) [GCC 15.2.0]
implementation cpython
locale encoding UTF-8 | UTF-8 mode 0

########## CARD len
>>> xs = [3, 1, 4, 1, 5]
>>> len(xs)
5

########## CARD range-stop
>>> n = 5
>>> range(n)
range(0, 5)
>>> list(range(n))
[0, 1, 2, 3, 4]
>>> list(range(0, n))
[0, 1, 2, 3, 4]

########## CARD range-start-stop
>>> a, b = 2, 6
>>> range(a, b)
range(2, 6)
>>> list(range(a, b))
[2, 3, 4, 5]

########## CARD enumerate
>>> xs = ['a', 'b', 'c']
>>> enumerate(xs)
<enumerate object at 0x7b7ff83edb20>
>>> list(enumerate(xs))
[(0, 'a'), (1, 'b'), (2, 'c')]

########## CARD enumerate-start
>>> xs = ['a', 'b', 'c']
>>> enumerate(xs, start=1)
<enumerate object at 0x7b7ff83edd50>
>>> list(enumerate(xs, start=1))
[(1, 'a'), (2, 'b'), (3, 'c')]
>>> list(enumerate(xs, 1))
[(1, 'a'), (2, 'b'), (3, 'c')]

########## CARD zip
>>> xs, ys = [1, 2, 3], ['a', 'b', 'c']
>>> zip(xs, ys)
<zip object at 0x7b7ff83f9980>
>>> list(zip(xs, ys))
[(1, 'a'), (2, 'b'), (3, 'c')]
>>> list(zip([1, 2, 3], ['a', 'b']))
[(1, 'a'), (2, 'b')]

########## CARD sorted
>>> xs = [3, 1, 2]
>>> sorted(xs)
[1, 2, 3]
>>> xs
[3, 1, 2]
>>> type(sorted(xs))
<class 'list'>
>>> xs.sort()
None
>>> xs
[1, 2, 3]

########## CARD sorted-reverse
>>> xs = [3, 1, 2]
>>> sorted(xs, reverse=True)
[3, 2, 1]
>>> xs
[3, 1, 2]

########## CARD reversed
>>> xs = [1, 2, 3]
>>> reversed(xs)
<list_reverseiterator object at 0x7b7ff84dd690>
>>> list(reversed(xs))
[3, 2, 1]
>>> xs
[1, 2, 3]

########## CARD slice-reverse
>>> xs = [1, 2, 3]
>>> xs[::-1]
[3, 2, 1]
>>> xs
[1, 2, 3]
>>> xs[::-1] is xs
False

########## CARD sum
>>> xs = [1, 2, 3.5]
>>> sum(xs)
6.5
>>> sum([])
0

########## CARD min
>>> xs = [3, 1, 2]
>>> min(xs)
1
>>> min(['b', 'a', 'c'])
'a'

########## CARD max
>>> xs = [3, 1, 2]
>>> max(xs)
3
>>> max(['b', 'a', 'c'])
'c'

########## CARD abs
>>> x = -7.5
>>> abs(x)
7.5
>>> abs(-3)
3
>>> abs(3 + 4j)
5.0

########## CARD round
>>> x = 2.7
>>> round(x)
3
>>> type(round(x))
<class 'int'>
>>> round(2.5)
2
>>> round(3.5)
4
>>> round(-2.7)
-3

########## CARD round-digits
>>> x = 3.14159
>>> round(x, 2)
3.14
>>> round(2.675, 2)
2.67

########## CARD int
>>> s = '42'
>>> int(s)
42
>>> int(' 42\n')
42
>>> int(2.9)
2

########## CARD float
>>> s = '3.5'
>>> float(s)
3.5
>>> float('1e3')
1000.0

########## CARD str
>>> n = 42
>>> str(n)
'42'
>>> str(3.5)
'3.5'
>>> f'{n}'
'42'

########## CARD list-chars
>>> s = 'abc'
>>> list(s)
['a', 'b', 'c']

########## CARD dict-pairs
>>> pairs = [('a', 1), ('b', 2)]
>>> dict(pairs)
{'a': 1, 'b': 2}
>>> {k: v for k, v in pairs}
{'a': 1, 'b': 2}

########## CARD set
>>> xs = [3, 1, 3, 2, 1]
>>> set(xs)
{1, 2, 3}
>>> type(set(xs))
<class 'set'>

########## CARD tuple
>>> xs = [1, 2, 3]
>>> tuple(xs)
(1, 2, 3)

########## CARD isinstance
>>> x = True
>>> isinstance(x, int)
True
>>> isinstance(5, int)
True
>>> isinstance(5.0, int)
False
>>> type(x) is int
False
>>> issubclass(bool, int)
True

########## CARD type
>>> x = 3.5
>>> type(x)
<class 'float'>
>>> type('a')
<class 'str'>
>>> type([])
<class 'list'>

########## CARD any
>>> xs = [0, '', 3]
>>> any(xs)
True
>>> any([0, '', None])
False
>>> any([])
False

########## CARD all
>>> xs = [1, 'a', 3]
>>> all(xs)
True
>>> all([1, 0, 3])
False
>>> all([])
True

########## CARD map
>>> xs = [1, 2, 3]; f = lambda x: x * 10
>>> map(f, xs)
<map object at 0x7b7ff83fbb00>
>>> list(map(f, xs))
[10, 20, 30]

########## CARD filter
>>> xs = [-2, 0, 3, 5]; f = lambda x: x > 0
>>> filter(f, xs)
<filter object at 0x7b7ff83e4730>
>>> list(filter(f, xs))
[3, 5]

########## CARD listcomp-map
>>> xs = [1, 2, 3]; f = lambda x: x * 10
>>> [f(x) for x in xs]
[10, 20, 30]

########## CARD listcomp-filter
>>> xs = [-2, 0, 3, 5]
>>> [x for x in xs if x > 0]
[3, 5]

########## CARD fstring
>>> name = 'Ada'
>>> f"Hello, {name}!"
'Hello, Ada!'
>>> f'Hello, {name}!'
'Hello, Ada!'

########## CARD fstring-decimals
>>> x = 3.14159
>>> f"{x:.2f}"
'3.14'
>>> f"{2.5:.2f}"
'2.50'
>>> format(x, ".2f")
'3.14'

########## CARD slice-first
>>> xs = [10, 20, 30, 40, 50]
>>> xs[:3]
[10, 20, 30]
>>> xs[0:3]
[10, 20, 30]
>>> [1, 2][:3]
[1, 2]

########## CARD index-last
>>> xs = [10, 20, 30, 40, 50]
>>> xs[-1]
50
>>> xs[len(xs) - 1]
50

########## CARD slice-last
>>> xs = [10, 20, 30, 40, 50]
>>> xs[-3:]
[30, 40, 50]
>>> [1, 2][-3:]
[1, 2]

########## CARD dict-get
>>> d = {'a': 1}; k = 'z'
>>> d.get(k)
None
>>> d.get('a')
1
>>> d.get(k, None)
None
>>> d[k]
KeyError: 'z'

########## CARD dict-get-default
>>> d = {'a': 1}; k = 'z'
>>> d.get(k, 0)
0
>>> d.get('a', 0)
1
>>> d
{'a': 1}

########## CARD split
>>> s = '  to be   or not '
>>> s.split()
['to', 'be', 'or', 'not']
>>> s.split(' ')
['', '', 'to', 'be', '', '', 'or', 'not', '']

########## CARD split-sep
>>> s = 'a,b,,c'
>>> s.split(",")
['a', 'b', '', 'c']

########## CARD join
>>> words = ['to', 'be', 'or']
>>> " ".join(words)
'to be or'

########## CARD strip
>>> s = '\t  hello world \n'
>>> s.strip()
'hello world'
>>> s
'\t  hello world \n'

########## CARD upper
>>> s = 'Hello, wörld'
>>> s.upper()
'HELLO, WÖRLD'
>>> 'ß'.upper()
'SS'

########## CARD in-list
>>> xs = [1, 2, 3]; x = 2
>>> x in xs
True
>>> 5 in xs
False

########## CARD in-dict
>>> d = {'a': 1}; k = 'a'
>>> k in d
True
>>> 1 in d
False
>>> 1 in d.values()
True

########## CARD file-read
>>> f = open('data.txt', encoding='utf-8')
>>> f.read()
'first line\nsecond line\n'
>>> f.read()
''
>>> f.close()
None

########## CARD open-read
>>> path = 'data.txt'
>>> open(path)
<_io.TextIOWrapper name='data.txt' mode='r' encoding='UTF-8'>
>>> open(path).mode
'r'
>>> open(path, 'r').mode
'r'
>>> open(path).read()
'first line\nsecond line\n'

########## CARD open-write
>>> path = 'out.txt'; open(path, 'w', encoding='utf-8').write('old contents')
>>> open(path, "w")
<_io.TextIOWrapper name='out.txt' mode='w' encoding='UTF-8'>
>>> open(path).read()
''
>>> open('new.txt', 'w').close()
None
>>> os.path.exists('new.txt')
True

########## CARD print
--- program:
x = 42
print(x)
print('a', 'b')
print([1, 'two'])
--- stdin: ''
--- stdout: "42\na b\n[1, 'two']\n"
--- stderr: ''
--- exit 0

########## CARD input
--- program:
answer = input("Name: ")
print(repr(answer))
--- stdin: 'Ada\n'
--- stdout: "Name: 'Ada'\n"
--- stderr: ''
--- exit 0

cleanup: remove ['data.txt', 'new.txt', 'out.txt'] from the work directory
```

**Licence pages of the Python documentation** (The Python 3.14 documentation (docs.python.org, version 3.14.8))

```
curl -sL -A "solid-memo deck research (https://github.com/antwika/solid-memo)" -o <scratch>/license.html -w "%{http_code} %{url_effective} %{size_download}\n" https://docs.python.org/3/license.html
  -> 200 https://docs.python.org/3/license.html 90881
curl -sL -A "solid-memo deck research (https://github.com/antwika/solid-memo)" -o <scratch>/copyright.html -w "%{http_code} %{url_effective} %{size_download}\n" https://docs.python.org/3/copyright.html
  -> 200 https://docs.python.org/3/copyright.html 14745
python3 <scratch>/txt.py <scratch>/copyright.html
python3 <scratch>/txt.py <scratch>/license.html "Terms and conditions for accessing|ZERO-CLAUSE|Zero-Clause|PYTHON SOFTWARE FOUNDATION LICENSE VERSION 2" 6
```

**txt.py: convert a saved HTML page to text and print the lines matching a pattern with context** (The Python 3.14 documentation (docs.python.org, version 3.14.8))

```
#!/usr/bin/env python3
"""Convert a saved HTML page to plain text and print the lines matching a pattern
with N lines of context: python3 txt.py <file.html> <regex> [N]"""
import html
import re
import sys
from html.parser import HTMLParser


class P(HTMLParser):
    def __init__(self):
        super().__init__()
        self.out = []
        self.skip = 0

    def handle_starttag(self, tag, attrs):
        if tag in ("script", "style"):
            self.skip += 1
        if tag in ("p", "div", "dt", "dd", "li", "br", "h1", "h2", "h3", "h4", "tr", "pre", "section"):
            self.out.append("\n")

    def handle_endtag(self, tag):
        if tag in ("script", "style"):
            self.skip -= 1

    def handle_data(self, data):
        if not self.skip:
            self.out.append(data)


def text(path):
    p = P()
    p.feed(open(path, encoding="utf-8").read())
    t = "".join(p.out)
    lines = [re.sub(r"[ \t]+", " ", l).strip() for l in t.splitlines()]
    return [l for l in lines if l]


if __name__ == "__main__":
    lines = text(sys.argv[1])
    pat = re.compile(sys.argv[2]) if len(sys.argv) > 2 else None
    n = int(sys.argv[3]) if len(sys.argv) > 3 else 2
    if not pat:
        print("\n".join(lines))
    else:
        for i, l in enumerate(lines):
            if pat.search(l):
                print(f"--- line {i}")
                print("\n".join(lines[i:i + n + 1]))
```

**fetch_docs.sh: download the documentation pages (run as: bash <scratch>/fetch_docs.sh), with its output** (The Python 3.14 documentation (docs.python.org, version 3.14.8))

```
#!/usr/bin/env bash
# Download the Python 3 documentation pages used to verify the cards.
D=$(dirname "$0")/docs
mkdir -p "$D"
UA="solid-memo deck research (https://github.com/antwika/solid-memo)"
for p in library/functions library/stdtypes library/string reference/expressions reference/lexical_analysis tutorial/datastructures tutorial/inputoutput tutorial/introduction library/io; do
  out="$D/$(echo "$p" | tr / _).html"
  curl -sL -A "$UA" -o "$out" -w "%{http_code} %{url_effective} %{size_download}\n" "https://docs.python.org/3/$p.html"
done

# output
200 https://docs.python.org/3/builtins/functions.html 318871
200 https://docs.python.org/3/builtins/stdtypes.html 773977
200 https://docs.python.org/3/library/string.html 129737
200 https://docs.python.org/3/reference/expressions.html 256109
200 https://docs.python.org/3/reference/lexical_analysis.html 155702
200 https://docs.python.org/3/tutorial/datastructures.html 101544
200 https://docs.python.org/3/tutorial/inputoutput.html 77440
200 https://docs.python.org/3/tutorial/introduction.html 71957
200 https://docs.python.org/3/library/io.html 181689
```

**Command lines used with txt.py to find the documentation's entries and anchors while writing docs_check.py** (The Python 3.14 documentation (docs.python.org, version 3.14.8))

```
python3 <scratch>/txt.py <scratch>/docs/library_functions.html "Documentation »|^(len|range|enumerate|zip|sorted|reversed|sum|min|max|abs|round|isinstance|print|input|open|any|all|map|filter)\(" 4
python3 <scratch>/txt.py <scratch>/docs/library_stdtypes.html "Documentation »$|^str\.upper\(\)¶|If sep is not specified or is None|^Any object can be tested for truth|positional argument is given and it is an iterable|^If a positional argument is given|^class str\(" 7
python3 <scratch>/txt.py <scratch>/docs/reference_expressions.html "Membership test operations¶|The operators in and not in test|For container types such as list, tuple, set|For the string and bytes types, x in y|^comprehension ::=|comprehension:|The comprehension consists of a single expression" 5
python3 <scratch>/txt.py <scratch>/docs/library_functions.html "^class str\(|str\(object|Version|encoding is not specified" 3
```

**docs_check.py: print the documentation passages cited in the evidence (run as: python3 <scratch>/docs_check.py > <scratch>/docs-output.txt; all 66 patterns were found). Its output is the documentation's own text and is not reproduced** (The Python 3.14 documentation (docs.python.org, version 3.14.8))

```
#!/usr/bin/env python3
"""Print the passages of the downloaded Python 3.14 documentation that the
cards' evidence cites: for each (page, pattern, lines) the first line matching
the pattern (a regular expression) and the given number of lines after it.

Usage: python3 docs_check.py  (reads docs/*.html saved by fetch_docs.sh)
"""
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from txt import text  # noqa: E402

D = os.path.join(os.path.dirname(os.path.abspath(__file__)), "docs")
F = "library_functions.html"      # served at builtins/functions.html
T = "library_stdtypes.html"       # served at builtins/stdtypes.html
E = "reference_expressions.html"
L = "reference_lexical_analysis.html"
S = "library_string.html"
IO = "tutorial_inputoutput.html"

CHECKS = [
    (F, r"^Built-in Functions", 0),
    (T, r"Documentation »$", 2),
    (F, r"^len\(object", 3),
    (F, r"^class range\(stop", 2),
    (T, r"^class range\(stop", 12),
    (F, r"^enumerate\(iterable", 4),
    (F, r"^zip\(\*iterables", 2),
    (F, r"^zip\(\) in conjunction", 0),
    (F, r"By default, zip\(\) stops when the shortest", 1),
    (F, r"^sorted\(iterable", 8),
    (F, r"^reversed\(object", 1),
    (T, r"^s\[i:j:k\]", 1),
    (T, r"slice of s from i to j with step k is defined", 3),
    (T, r"^If i or j is negative", 1),
    (T, r"values \(which end depends on the sign of k\)", 0),
    (T, r"The slice of s from i to j is defined", 4),
    (F, r"^sum\(iterable", 2),
    (F, r"^min\(iterable", 6),
    (F, r"^max\(iterable", 6),
    (F, r"^abs\(number", 3),
    (F, r"^round\(number", 9),
    (F, r"^class int\(number", 8),
    (F, r"^class float\(number", 4),
    (T, r"^class str\(\*, encoding", 7),
    (F, r"^class list\(iterable", 2),
    (T, r"^Lists may be constructed in several ways", 6),
    (F, r"^class dict\(\*\*kwargs", 4),
    (T, r"^If a positional argument is given and it defines a keys", 7),
    (F, r"^class set\(iterable", 4),
    (T, r"^A set object is an unordered collection", 2),
    (F, r"^class tuple\(iterable", 4),
    (F, r"^isinstance\(object", 3),
    (F, r"^class type\(object", 3),
    (F, r"^print\(\*objects", 6),
    (F, r"^input\(prompt", 3),
    (F, r"^open\(file, mode", 1),
    (F, r"^The default mode is 'r'", 2),
    (F, r"^'r'$", 3),
    (F, r"^'w'$", 1),
    (F, r"encoding is not specified the encoding used is platform-dependent", 2),
    (IO, r"^To read a file’s contents, call f.read", 6),
    (F, r"^any\(iterable", 1),
    (F, r"^all\(iterable", 1),
    (T, r"^Any object can be tested for truth", 7),
    (F, r"^map\(function", 2),
    (F, r"^filter\(function", 5),
    (E, r"^The comprehension consists of a single expression", 5),
    (E, r"^A list display is a possibly empty series", 6),
    (E, r"^A dict comprehension", 4),
    (L, r"^f-strings", 0),
    (L, r"A formatted string literal or f-string is a string literal", 6),
    (S, r"^'f'$", 5),
    (S, r"^The precision is a decimal integer", 4),
    (T, r"^get\(key, default=None", 3),
    (T, r"^str.split\(sep=None", 18),
    (T, r"^str.join\(iterable", 4),
    (T, r"^str.strip\(chars=None", 6),
    (T, r"^str.upper\(\)¶", 2),
    (T, r"^If sep is not specified or is None, a different splitting algorithm is", 6),
    (E, r"Membership test operations¶", 5),
    (E, r"^For the string and bytes types, x in y", 1),
    (T, r"^x in s$", 2),
    (T, r"^key in d$", 1),
    (T, r"^d\[key\]$", 2),
    (T, r"^sort\(\*, key=None, reverse=False\)", 2),
    (T, r"is a subclass of int", 1),
]

for page, pat, n in CHECKS:
    lines = text(os.path.join(D, page))
    rx = re.compile(pat)
    for i, l in enumerate(lines):
        if rx.search(l):
            print(f"=== {page} /{pat}/ (line {i})")
            print("\n".join(lines[i:i + n + 1]))
            break
    else:
        print(f"=== {page} /{pat}/ NOT FOUND")
```

**anchors.py: check that every anchor named in the evidence locators exists on the saved pages, with its output** (The Python 3.14 documentation (docs.python.org, version 3.14.8))

```
#!/usr/bin/env python3
"""Check that the anchors cited in the evidence locators exist in the saved pages."""
import os
import re

D = os.path.join(os.path.dirname(os.path.abspath(__file__)), "docs")
WANT = {
    "library_functions.html": ["len", "func-range", "enumerate", "zip", "sorted", "reversed", "sum", "min", "max",
                               "abs", "round", "int", "float", "func-str", "func-list", "func-dict", "func-set",
                               "func-tuple", "isinstance", "type", "print", "input", "open", "any", "all", "map",
                               "filter"],
    "library_stdtypes.html": ["dict.get", "str.split", "str.join", "str.strip", "str.upper", "list.sort",
                              "common-sequence-operations", "truth", "range", "typesmapping", "bltin-boolean-values",
                              "str"],
    "reference_expressions.html": ["comprehensions", "lists", "membership-test-operations", "slicings",
                                   "dictionary-displays"],
    "reference_lexical_analysis.html": ["f-strings", "formatted-string-literals"],
    "library_string.html": ["format-specification-mini-language"],
    "tutorial_inputoutput.html": ["methods-of-file-objects", "reading-and-writing-files"],
}
for page, ids in WANT.items():
    html = open(os.path.join(D, page), encoding="utf-8").read()
    have = set(re.findall(r'id="([^"]+)"', html))
    print(page, "missing:", [i for i in ids if i not in have])

# output
library_functions.html missing: []
library_stdtypes.html missing: []
reference_expressions.html missing: []
reference_lexical_analysis.html missing: []
library_string.html missing: []
tutorial_inputoutput.html missing: []
```

**terms.rq, first version (item ids guessed from memory; most turned out to be unrelated items and the result was not used), run with: curl -s -A "solid-memo deck research (https://github.com/antwika/solid-memo)" -H "Accept: text/csv" --data-urlencode query@<scratch>/terms.rq -o <scratch>/terms.csv https://query.wikidata.org/sparql** (Wikidata: Swedish labels and aliases of programming terms (list, string, integer, floating point, tuple, set, iterator, absolute value, computer file, function, standard output, list comprehension, associative array))

```
SELECT ?item ?en ?sv (GROUP_CONCAT(DISTINCT ?alias; separator=" | ") AS ?svAliases) WHERE {
  VALUES ?item { wd:Q28865 wd:Q184754 wd:Q1366218 wd:Q80071 wd:Q12737077 wd:Q273141 wd:Q2269282 wd:Q858656 wd:Q600590 wd:Q117879 wd:Q120976 wd:Q1427474 wd:Q1155 wd:Q2734437 wd:Q1052047 }
  OPTIONAL { ?item rdfs:label ?en FILTER(LANG(?en) = "en") }
  OPTIONAL { ?item rdfs:label ?sv FILTER(LANG(?sv) = "sv") }
  OPTIONAL { ?item skos:altLabel ?alias FILTER(LANG(?alias) = "sv") }
}
GROUP BY ?item ?en ?sv
```

**terms.rq, second version: Swedish labels and aliases of items with the given English labels, run with the same curl command; its result (terms.csv) follows** (Wikidata: Swedish labels and aliases of programming terms (list, string, integer, floating point, tuple, set, iterator, absolute value, computer file, function, standard output, list comprehension, associative array))

```
SELECT ?en ?item ?sv (GROUP_CONCAT(DISTINCT ?alias; separator=" | ") AS ?svAliases) WHERE {
  VALUES ?en { "standard streams"@en "associative array"@en "list"@en "set"@en "iterator"@en "tuple"@en "integer"@en "string"@en "absolute value"@en "list comprehension"@en "standard output"@en "standard input"@en "whitespace character"@en "array slicing"@en "letter case"@en "Python"@en "floating-point arithmetic"@en "computer file"@en "function"@en }
  ?item rdfs:label ?en .
  ?item rdfs:label ?sv FILTER(LANG(?sv) = "sv")
  OPTIONAL { ?item skos:altLabel ?alias FILTER(LANG(?alias) = "sv") }
}
GROUP BY ?en ?item ?sv
ORDER BY ?en

# result (terms.csv)
en,item,sv,svAliases
Python,http://www.wikidata.org/entity/Q18613777,Python,xkcd 353
Python,http://www.wikidata.org/entity/Q271218,Python,
Python,http://www.wikidata.org/entity/Q747452,Pyton,
Python,http://www.wikidata.org/entity/Q4363952,Python II,
Python,http://www.wikidata.org/entity/Q76417859,Python,
Python,http://www.wikidata.org/entity/Q15721,Python,
Python,http://www.wikidata.org/entity/Q15728,Python,
absolute value,http://www.wikidata.org/entity/Q120812,absolutbelopp,belopp | absolutvärde | absolutvärdesfunktion
computer file,http://www.wikidata.org/entity/Q82753,fil,datorfil | datafil
function,http://www.wikidata.org/entity/Q15810910,funktion,programfunktion
function,http://www.wikidata.org/entity/Q788331,Funktion,
function,http://www.wikidata.org/entity/Q1168263,funktion,
function,http://www.wikidata.org/entity/Q1474521,funktion,
function,http://www.wikidata.org/entity/Q2528683,funktion,
function,http://www.wikidata.org/entity/Q11348,funktion,
integer,http://www.wikidata.org/entity/Q12503,heltal,
iterator,http://www.wikidata.org/entity/Q1326388,iterator,
letter case,http://www.wikidata.org/entity/Q8188561,skiftläge,
list,http://www.wikidata.org/entity/Q12139612,lista,
set,http://www.wikidata.org/entity/Q36161,mängd,mängder | mängdoperation | mängdoperator
set,http://www.wikidata.org/entity/Q371609,set,
set,http://www.wikidata.org/entity/Q28813620,samling,
standard input,http://www.wikidata.org/entity/Q56303787,Standard input,
standard output,http://www.wikidata.org/entity/Q56303789,Standard output,
string,http://www.wikidata.org/entity/Q184754,textsträng,sträng
string,http://www.wikidata.org/entity/Q326426,sträng,
```

**Wikidata API lookups for the Swedish labels of list comprehension, associative array, iterator, standard output and list (the first wbgetentities call used guessed ids, Q1197850, Q2333573 and Q1150971, which are unrelated items, and was not used)** (Wikidata: Swedish labels and aliases of programming terms (list, string, integer, floating point, tuple, set, iterator, absolute value, computer file, function, standard output, list comprehension, associative array))

```
curl -s -A "solid-memo deck research (https://github.com/antwika/solid-memo)" "https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q1197850|Q2333573|Q1150971&props=labels|aliases&languages=en|sv&format=json"
curl -s -A "solid-memo deck research (https://github.com/antwika/solid-memo)" "https://www.wikidata.org/w/api.php?action=wbsearchentities&search=list%20comprehension&language=en&format=json&limit=3"  ->  Q795065
curl -s -A "solid-memo deck research (https://github.com/antwika/solid-memo)" "https://www.wikidata.org/w/api.php?action=wbsearchentities&search=associative%20array&language=en&format=json&limit=3"  ->  Q80585
curl -s -A "solid-memo deck research (https://github.com/antwika/solid-memo)" "https://www.wikidata.org/w/api.php?action=wbsearchentities&search=whitespace%20character&language=en&format=json&limit=3"  ->  no result
curl -s -A "solid-memo deck research (https://github.com/antwika/solid-memo)" "https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q795065|Q80585|Q1326388|Q56303789|Q12139612&props=labels|aliases|sitelinks&sitefilter=svwiki&languages=en|sv&format=json"
  -> Q795065 list comprehension: no sv label; Q80585 associative array: no sv label (en alias "dict"); Q1326388: sv "iterator" (svwiki Iterator); Q56303789: sv "Standard output" (svwiki Standard output); Q12139612: sv "lista"
```

**Wikidata licensing page** (Wikidata: Swedish labels and aliases of programming terms (list, string, integer, floating point, tuple, set, iterator, absolute value, computer file, function, standard output, list comprehension, associative array))

```
curl -s -A "solid-memo deck research (https://github.com/antwika/solid-memo)" -o <scratch>/wd-licensing.html -w "%{http_code}\n" https://www.wikidata.org/wiki/Wikidata:Licensing
python3 <scratch>/txt.py <scratch>/wd-licensing.html "All structured data" 0
```

**Introductions and revision ids of Swedish Wikipedia articles on the terms (Standardströmmar, Lista (datastruktur), Associativ array and Mängd (datastruktur) are missing)** (Svenskspråkiga Wikipedia: Flyttal, Iterator, Tupel, Python (programspråk), Standard output)

```
curl -s -A "solid-memo deck research (https://github.com/antwika/solid-memo)" "https://sv.wikipedia.org/w/api.php?action=query&prop=extracts|revisions&explaintext=1&exintro=1&rvprop=ids&redirects=1&format=json&titles=Standardstr%C3%B6mmar|Iterator|Flyttal|Tupel|Lista%20(datastruktur)|Associativ%20array|Python%20(programspr%C3%A5k)|M%C3%A4ngd%20(datastruktur)"
```

**Search for "list comprehension" on Swedish Wikipedia (0 hits) and the licence footer** (Svenskspråkiga Wikipedia: Flyttal, Iterator, Tupel, Python (programspråk), Standard output)

```
curl -s -A "solid-memo deck research (https://github.com/antwika/solid-memo)" "https://sv.wikipedia.org/w/api.php?action=query&list=search&srsearch=%22list+comprehension%22&format=json&srlimit=5"
curl -s -A "solid-memo deck research (https://github.com/antwika/solid-memo)" -o <scratch>/sv-flyttal.html -w "%{http_code}\n" https://sv.wikipedia.org/wiki/Flyttal
python3 <scratch>/txt.py <scratch>/sv-flyttal.html "Creative Commons" 1
```

**make_dossier.py: writes this dossier from its card table and the recorded scripts and outputs, asserting that every card's back is the expression run_cards.py evaluated (run as: python3 <scratch>/make_dossier.py)** (Test run of every card's expression with Python 3.14.4 (CPython))

```
python3 <scratch>/make_dossier.py  ->  wrote packages/deck-library/authored/python-built-ins.json 50 cards
```

**Review round 1: the 3.15 (rc3) and current 3.14 Built-in Functions pages and PEP 790, fetched and searched with fetch.sh and check.sh (run as: bash <scratch>/r1/fetch.sh; bash <scratch>/r1/check.sh), with check.sh's output** (The Python 3.14 documentation (docs.python.org, version 3.14.8))

```
curl -sL -A "solid-memo deck research (https://github.com/antwika/solid-memo)" -o <scratch>/r1/functions-315.html -w "%{http_code} %{url_effective}\n" https://docs.python.org/3.15/builtins/functions.html
  -> 200 https://docs.python.org/3.15/builtins/functions.html
curl -sL -A "solid-memo deck research (https://github.com/antwika/solid-memo)" -o <scratch>/r1/functions-3.html -w "%{http_code} %{url_effective}\n" https://docs.python.org/3/builtins/functions.html
  -> 200 https://docs.python.org/3/builtins/functions.html
curl -sL -A "solid-memo deck research (https://github.com/antwika/solid-memo)" -o <scratch>/r1/pep790.html -w "%{http_code} %{url_effective}\n" https://peps.python.org/pep-0790/
  -> 200 https://peps.python.org/pep-0790/
python3 <scratch>/txt.py <scratch>/r1/functions-315.html "Python 3.15|encoding is not specified|Changed in version 3.15: UTF-8" 2
python3 <scratch>/txt.py <scratch>/r1/functions-3.html "Documentation »|encoding is not specified" 2
python3 <scratch>/txt.py <scratch>/r1/pep790.html "3.15.0 candidate 3|3.15.0 final" 0

# output (documentation lines abridged to where they were found)
functions-315.html: title line "Built-in functions — Python 3.15.0rc3 documentation"; the open() encoding passage (line 1016) and a "Changed in version 3.15" note on the default encoding (PEP 686) (line 1151)
functions-3.html: "3.14.8 Documentation »"; the open() encoding passage (line 1008)
pep790.html: "3.15.0 candidate 3: Friday, 2026-10-02"; "3.15.0 final: Friday, 2026-10-09"
```

**Review round 3: Swedish labels of floating point (Q117879) and n-tuple (Q600590), which the second terms.rq did not return** (Wikidata: Swedish labels and aliases of programming terms (list, string, integer, floating point, tuple, set, iterator, absolute value, computer file, function, standard output, list comprehension, associative array))

```
curl -s -A "solid-memo deck research (https://github.com/antwika/solid-memo)" "https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q600590|Q117879&props=labels|aliases&languages=en|sv&format=json"
  -> Q600590: en "𝑛-tuple" (en alias "tuple"), sv "tupel"; Q117879: en "floating point" (en alias "float"), sv "flyttal"
```

**Review round 2: the Swedish Wikipedia articles Standard output (exists, revision 51151527) and Slicing (missing)** (Svenskspråkiga Wikipedia: Flyttal, Iterator, Tupel, Python (programspråk), Standard output)

```
curl -s -A "solid-memo deck research (https://github.com/antwika/solid-memo)" "https://sv.wikipedia.org/w/api.php?action=query&prop=extracts|revisions&explaintext=1&exintro=1&rvprop=ids&redirects=1&format=json&titles=Standard%20output|Slicing"
  -> Standard output: pageid 8105643, revision 51151527, introduction "Standard output förkortas stdout och syftar på utdata (output) i ett dataflöde. …"; Slicing: missing
```

**Review round 4: download the live Built-in Functions, Built-in Types and Tutorial (Input and Output) pages (all titled "Python 3.14.8 documentation") and convert them to text, run as python3 <scratch>/r4/fetch.py** (The Python 3.14 documentation (docs.python.org, version 3.14.8))

```
import urllib.request, re, html, os
D = os.path.dirname(os.path.abspath(__file__))
UA = "solid-memo deck research (https://github.com/antwika/solid-memo)"
pages = {
    "functions": "https://docs.python.org/3/builtins/functions.html",
    "stdtypes": "https://docs.python.org/3/builtins/stdtypes.html",
    "inputoutput": "https://docs.python.org/3/tutorial/inputoutput.html",
}
for k, u in pages.items():
    raw = urllib.request.urlopen(urllib.request.Request(u, headers={"User-Agent": UA})).read().decode()
    t = re.sub(r"<script.*?</script>|<style.*?</style>", "", raw, flags=re.S)
    t = html.unescape(re.sub(r"<[^>]+>", "", t))
    t = re.sub(r"[ \t]+", " ", t)
    open(os.path.join(D, k + ".txt"), "w").write(t)
    m = re.search(r"Python 3\.\d+\.\d+\S* documentation", t)
    print(k, len(t), m.group(0) if m else None)

```

**Review round 4: print the documentation passage behind each evidence summary (searching the saved text for the opening words of each entry) to compare it with the summary; the printed passages are the documentation's own text and are not reproduced** (The Python 3.14 documentation (docs.python.org, version 3.14.8))

```
python3 <scratch>/r4/near.py
```

**Review round 5: check.py, run as python3 <scratch>/r5/check.py on 2026-10-04 with Python 3.14.4: lists the python-docs summaries not named in rounds 3 and 4, compares every python-docs summary with the live Built-in Functions and Built-in Types pages (both titled "Python 3.14.8 documentation") by six-word sequences, and runs dict(pairs) with a repeated key; the script, then its output** (Test run of every card's expression with Python 3.14.4 (CPython))

```
#!/usr/bin/env python3
"""Review round 5: list python-docs evidence not named in rounds 3/4, compare
every python-docs summary with the live pages by 6-word n-grams, and run the
duplicate-key behaviour of dict(pairs)."""
import html
import json
import os
import re
import urllib.request

D = os.path.dirname(os.path.abspath(__file__))
DOSSIER = "packages/deck-library/authored/python-built-ins.json"  # the dossier
UA = "solid-memo deck research (https://github.com/antwika/solid-memo)"
PAGES = {
    "functions": "https://docs.python.org/3/builtins/functions.html",
    "stdtypes": "https://docs.python.org/3/builtins/stdtypes.html",
}


def words(t):
    return re.findall(r"[a-z0-9_]+", t.lower())


text = ""
for name, url in PAGES.items():
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    raw = urllib.request.urlopen(req).read().decode("utf-8")
    title = re.search(r"<title>(.*?)</title>", raw, re.S).group(1)
    print(name, url, "->", html.unescape(" ".join(title.split())))
    text += " " + html.unescape(re.sub(r"<[^>]+>", " ", raw))
w = words(text)
grams = {tuple(w[i:i + 6]) for i in range(len(w) - 5)}

d = json.load(open(DOSSIER))
named = set()
for r in d["qualityControl"]["rounds"]:
    if r["round"] in (3, 4):
        for f in r["findings"]:
            if f["card"] != "deck":
                named |= {x.strip() for x in f["card"].split(",")}
r4 = d["qualityControl"]["rounds"][4]["findings"][0]["resolution"]
m = re.search(r"besides the seven named, (.*?) were also close", r4)
named |= {x.strip() for x in re.split(r",| and ", m.group(1))}
total = 0
for c in d["cards"]:
    for e in c["evidence"]:
        if e["source"] != "python-docs":
            continue
        total += 1
        sw = words(e["says"])
        shared = [" ".join(sw[i:i + 6]) for i in range(len(sw) - 5)
                  if tuple(sw[i:i + 6]) in grams]
        flag = "" if c["id"] in named else "  [not named in rounds 3/4]"
        if flag or shared:
            print(c["id"] + flag, "| shared 6-grams:", shared or "none")
print("python-docs evidence entries:", total, "| cards named in rounds 3/4:",
      len(named))

print(">>> dict([('a', 1), ('a', 2)])")
print(repr(dict([('a', 1), ('a', 2)])))
print(">>> dict([('a', 1), ('b', 2), ('a', 3)])")
print(repr(dict([('a', 1), ('b', 2), ('a', 3)])))

functions https://docs.python.org/3/builtins/functions.html -> Built-in Functions — Python 3.14.8 documentation
stdtypes https://docs.python.org/3/builtins/stdtypes.html -> Built-in Types — Python 3.14.8 documentation
range-start-stop  [not named in rounds 3/4] | shared 6-grams: none
enumerate-start  [not named in rounds 3/4] | shared 6-grams: none
sorted | shared 6-grams: ['sorted iterable key none reverse false']
round-digits | shared 6-grams: ['digits after the decimal point the']
print | shared 6-grams: ['print objects sep end n file', 'objects sep end n file none', 'sep end n file none flush', 'end n file none flush false']
open-read  [not named in rounds 3/4] | shared 6-grams: none
open-read  [not named in rounds 3/4] | shared 6-grams: none
index-last | shared 6-grams: ['from the end of the sequence']
python-docs evidence entries: 51 | cards named in rounds 3/4: 47
>>> dict([('a', 1), ('a', 2)])
{'a': 2}
>>> dict([('a', 1), ('b', 2), ('a', 3)])
{'a': 3, 'b': 2}
```

## Quality control

7 rounds, 33 findings: 29 fixed, 1 rejected after checking, 3 needing no change. Every card's Wikidata checks (0 in all) are re-run against live Wikidata by `scripts/authored_decks.py check` before every build.

### Round 0: Every expression run with Python 3.14.4 (CPython) on sample values, print and input in a child process, open in a throwaway directory; every card checked against the Python 3.14.8 documentation; fronts checked for a single canonical answer; Swedish terms checked against Wikidata and Swedish Wikipedia; builder and validator checks. (2026-10-04)

**Reviewer:** Claude (AI) — authoring agent, machine checks · **Scope:** All 50 cards, and the equivalent forms and behaviours named in the notes.

All 50 expressions ran and gave the result the front describes; every equivalent form named in a note gave the same result, and the behaviours in the notes (rounding halves to even, zip stopping at the shorter list, KeyError from d[k], s.split(" ") keeping empty strings, in testing a dict's keys, bool counting as int) were observed. Every function, method and syntax is documented with the behaviour on the card. No Wikidata checks: no card's content is a Wikidata statement or label. The findings record the problems met while testing and the decisions about synonyms, notation and Swedish terms.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| (all) | First test run: the script stopped after the first card with "TypeError: close() missing required argument 'fd'": its clean-up step closed every object in the namespace that had close and read attributes, which included the os module. The run also used tempfile.mkdtemp, which put its work directory outside the scratch directory. | The clean-up now closes only io.IOBase objects, and the work directory is work/ next to the script, emptied at the end; the stray directory from the failed run (holding only the test's data.txt) was deleted. The final run is the one reproduced under Queries. | fixed |
| (all) | The documentation's Built-in Functions and Built-in Types pages have moved: https://docs.python.org/3/library/functions.html and library/stdtypes.html now redirect to builtins/functions.html and builtins/stdtypes.html, under a new section "Python built-ins reference". | The evidence locators use the new addresses (the anchors were checked with anchors.py). | fixed |
| (all) | Version: the installed Python is 3.14.4 while the online documentation is for 3.14.8. | Both are bug-fix releases of 3.14; none of the documented behaviours used differs from what 3.14.4 did. The description names the version that ran the tests. | no change needed |
| open-read, file-read | Without an encoding argument, open uses the locale encoding (locale.getencoding()), so the same file can be read differently on another system; the test ran with a UTF-8 locale and not in UTF-8 mode. | The open-read note says that without encoding=… the locale's encoding is used; the file-read test opened its file with encoding='utf-8'. (Review round 1: from Python 3.15 the default is UTF-8; the note now names the version.) | fixed |
| range-stop, enumerate-start, slice-first, fstring, str, open-read, dict-pairs | Each has an exact synonym that also answers the front: range(0, n), enumerate(xs, 1), xs[0:3], an f-string in single quotes, f"{n}", open(path, "r"), {k: v for k, v in pairs}. | The back gives the shortest form or the one the documentation shows first; the note names the synonym (all run in the test), except the dict comprehension, which the front excludes by asking for a dict built from the list rather than a comprehension. | no change needed |
| round, round-digits | round rounds halves to the even integer (round(2.5) is 2), and round(2.675, 2) gives 2.67 because 2.675 is not exactly representable; learners expecting school rounding may be surprised. | The round note states the half-to-even rule with the tested examples; the round-digits note points to f"{x:.2f}" for text and the front asks only for rounding to two places. | fixed |
| isinstance | "Whether x is an int" alone could be answered with type(x) is int, which gives a different result for True and False. | The front says subclasses of int count too, and the note explains bool and type(x) is int (both tested). | fixed |
| reversed, slice-reverse, map, filter, listcomp-map, listcomp-filter, round-digits, fstring-decimals | Pairs of tasks with the same effect could be answered by either expression. | The fronts name the form wanted: an iterator versus a new list made by slicing; a built-in function versus a list comprehension; a number versus an f-string. | fixed |
| listcomp-map, listcomp-filter, slice-reverse, dict-pairs, dict-get, dict-get-default, in-dict, print | Swedish has no established term for list comprehension, dict, slicing or standard output: Wikidata has no Swedish label for list comprehension (Q795065) or associative array (Q80585), and its Swedish label for standard output (Q56303789) is "Standard output"; Swedish Wikipedia has no article on list comprehension, associative array or slicing (corrected in review round 2: it does have an article titled "Standard output", revision 51151527, which uses the English term in Swedish text). | The Swedish fronts use the Python terms as loanwords (list comprehension, dict-objekt, slicing/slice, standard output), the same words a Swedish learner meets in Python code and documentation. | no change needed |
| (Swedish terms) | The first Wikidata query for Swedish terms (terms.rq, first version) and one API lookup used item ids guessed from memory; most were unrelated items. | Replaced by a query on the English labels and by the search API; only those results were used. Both attempts are recorded under Queries. | fixed |

### Round 1: Factual accuracy (2026-10-04)

**Reviewer:** Claude (AI) — independent Factual accuracy reviewer · **Scope:** All 50 cards: the recorded test run reproduced with Python 3.14.4, every back and note compared with the live 3.14.8 documentation, the 3.15.0rc3 Built-in Functions page checked for changes.

No wrong card. The open-read note on the default encoding holds for 3.14 but not for 3.15, whose final release is due on 2026-10-09; the note now names the version. The slice-reverse note now writes -1 with the ASCII minus Python requires. The suggestion to name repr(n) on the str card was declined.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| open-read | The note "Without encoding=…, the locale's encoding is used" holds only up to Python 3.14; Python 3.15 makes UTF-8 the default (PEP 686). 3.15.0rc3 documentation is live and 3.15.0 final is scheduled for 2026-10-09. | Confirmed: the 3.15 page (titled 3.15.0rc3) says UTF-8 is used by default and has a "Changed in version 3.15" note citing PEP 686; the 3.14.8 page still uses locale.getencoding(); PEP 790 lists rc3 on 2026-10-02 and the final on 2026-10-09. The note now reads "Without encoding=…, Python 3.14 and earlier use the locale's encoding; from 3.15 the default is UTF-8" (sv likewise), the evidence cites the 3.15 page and PEP 790, and method step 6 records the comparison. No other 3.15 change on the page touches a card. | fixed |
| slice-reverse | The note writes "−1" with U+2212 MINUS SIGN, which is not valid Python if copied; the back uses ASCII "-". | The note now reads "A slice with step -1." / "En slice med steg -1." with ASCII hyphen-minus. The "n − 1" on range fronts is prose and stays. | fixed |
| str | repr(n) and format(n) give the same string as str(n) for ints and floats; the note names only f"{n}". | Declined: the front asks for converting the number to a string, for which str(n) is the canonical answer; repr is the developer representation and differs from str for many other types, so naming it here would teach a misleading equivalence. The note keeps f"{n}". | rejected |

### Round 2: Language, translation and language tags (2026-10-04)

**Reviewer:** Claude (AI) — independent Language, translation and language tags reviewer · **Scope:** All 50 cards, title, description, keywords and the language tags in the built deck.

Tagging correct throughout. The dossier wrongly said Swedish Wikipedia has no article on standard output; corrected and the article added as a source for the print card. The Swedish split front now says "varje följd av blanktecken"; the Swedish open-write front, the dict-get note's verb and the map/filter fronts were reworded; the slice-reverse minus sign was fixed in round 1.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| deck, print | The dossier says Swedish Wikipedia has no article on standard output, but sv:Standard output exists (pageid 8105643, revision 51151527). | Confirmed with the sv.wikipedia API. The round-0 finding is corrected, the article (revision 51151527) is added to the wikipedia-sv source's title and usedFor and as evidence on the print card, and method step 7 cites it as support for keeping "standard output" in Swedish. | fixed |
| split | The Swedish front "uppdelade vid blanktecken" drops "runs of", so it does not separate s.split() from s.split(" "). | Swedish front now "Orden i strängen s, uppdelade vid varje följd av blanktecken". | fixed |
| open-write | The Swedish front reads as two steps in an odd order ("för skrivning och töm den först"). | Swedish front now "Öppna textfilen på sökvägen path för skrivning, så att den först töms". | fixed |
| dict-get | The Swedish note uses "ger" (gives/returns) for raising KeyError, the same verb used for returning values elsewhere. | Swedish note now "d[k] utlöser i stället undantaget KeyError när k saknas." | fixed |
| slice-reverse | The note uses U+2212 for the step -1. | Fixed in round 1 (ASCII hyphen-minus in both languages). | fixed |
| map, filter | "using a built-in function" / "med en inbyggd funktion" can be read as saying that f is a built-in function. | Fronts now end "with a call to a built-in function" / "med ett anrop av en inbyggd funktion". | fixed |

### Round 3: Licensing, attribution and documentation (2026-10-04)

**Reviewer:** Claude (AI) — independent Licensing, attribution and documentation reviewer · **Scope:** Sources, licence evidence, licensing statement, method, queries and the evidence of about 40 cards against the live documentation; reproduction of the recorded scripts.

Deck licence CC0 confirmed. Evidence summaries that had stayed close to the PSF documentation's sentences were rewritten in own words and the provenance claims made precise; the flyttal/tupel lookup was run and recorded; the round-0 standard-output error was corrected (round 2); the method now says Wikidata was queried live only for Swedish terms; source URLs were made specific in usedFor; the unchecked Swedish word choices are now stated as the author's own.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| filter, map, strip, dict-get, dict-get-default, in-dict, fstring-decimals, round, upper, sorted, join, split-sep, int | Several python-docs 'says' fields are near-verbatim sentences of the PSF-licensed documentation, while the dossier claims its own words and that nothing was copied. | Confirmed by comparing with the live 3.14.8 pages. The eleven named 'says' fields, plus split-sep (which repeated the documentation's '1,,2' example) and int (which repeated int('123')), were rewritten in the authoring agent's own words. The claims in method step 6 and in the python-docs licenseEvidence and usedFor now say precisely that nothing from the documentation is in the cards and that the evidence summarises it in own words apart from signatures and parameter names. The cards themselves were not affected. | fixed |
| deck | Round 0 says Swedish Wikipedia has no article on standard output; the article exists. | Same as round 2's first finding: corrected and the article added as a source. | fixed |
| deck | flyttal (Q117879) and tupel (Q600590) are claimed as checked against Wikidata, but no used query returned them. | Confirmed: the second terms.rq matched English labels that these items do not have. A wbgetentities lookup of Q600590\|Q117879 was run and recorded under Queries (sv "tupel" and "flyttal"); the wikidata source title now includes tuple and its usedFor and method step 7 cite the lookup. | fixed |
| deck | The mandated 'Who did the work' paragraph lists live Wikidata among the machine checks, while the deck has no Wikidata checks. | The paragraph is the library's mandated wording and was kept unchanged; Wikidata was in fact queried live in this deck, for the Swedish terms. The final method step now says so explicitly ("Wikidata was queried live only to confirm the Swedish terms"), and the wikidata source's usedFor says the same. Whether decks without Wikidata checks should drop the phrase is left to the library editor. | fixed |
| deck | The wikipedia-sv source URL points only to Flyttal and the wikidata URL to the Main Page. | The builder takes one URL per source, so these stay; the usedFor fields now give a revision URL for each Swedish Wikipedia article and item URLs for the main Wikidata items consulted. | fixed |
| deck | Method step 7 lists Swedish word choices (element, blanktecken, versaler, ledtext, the locale-encoding phrase) without a recorded dictionary check. | An attempt to query svenska.se from the command line returned only the site's script shell, so no dictionary check was recorded. Method step 7 now states plainly that these are the authoring agent's own word choices and were not looked up in a dictionary. | fixed |

### Round 4: Re-check of changed cards and a sample (facts, language, documentation) (2026-10-04)

**Reviewer:** Claude (AI) — independent re-check reviewer · **Scope:** The 18 cards changed in rounds 1–3 and every third card (33 cards): the expressions re-run with Python 3.14.4, backs and notes compared with the live 3.14.8 documentation and the 3.15.0rc3 page, Swedish text and language tags, the built files and validator, the metadata, the licence pages and the fixes claimed in rounds 1–3.

All checked cards correct; Swedish text, tags, built files, metadata, licence evidence and the earlier fixes confirmed. One warning: python-docs evidence summaries that round 3 had not touched were still near-verbatim to the documentation, contrary to the dossier's claim. All 34 such summaries were rewritten in own words and method step 6 now says exactly what was done. No card's front, back or notes changed.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| split, all, input, isinstance, len, slice-first, any | Several python-docs 'says' fields are still near-verbatim sentences of the PSF-licensed documentation (e.g. split's "runs of consecutive whitespace are regarded as a single separator", all's "Return True if all elements of the iterable are true (or if the iterable is empty)"), while method step 6, the python-docs licenseEvidence and the licensing paragraph say the evidence is in the authoring agent's own words. | Confirmed against the live 3.14.8 pages (Built-in Functions, Built-in Types, Tutorial: Input and Output), fetched again today. Every python-docs summary not rewritten in round 3 was compared with its passage; besides the seven named, reversed, type, abs, float, min, max, str, sum, zip, enumerate, sorted-reverse, round-digits, set, tuple, list-chars, dict-pairs, print, open-write, file-read, listcomp-map, listcomp-filter, fstring, index-last, slice-last, slice-reverse, range-stop and in-list were also close. All 34 were rewritten in own words, keeping only signatures, parameter names and code. The two open-read summaries were already in own words and stay, as do those of range-start-stop and enumerate-start (this list was completed in review round 5). Method step 6 now records both rewrites (13 in round 3, 34 in round 4), which makes the claim in the licenseEvidence and the licensing paragraph true; the round-4 commands are under Queries. Cards themselves unchanged. | fixed |

### Round 5: Re-check of changed cards and a sample (facts, language, documentation) (2026-10-04)

**Reviewer:** Claude (AI) — independent re-check reviewer · **Scope:** The 34 cards changed in round 4 and every third card (44 cards) against the live Python 3.14.8 documentation, the 3.15.0rc3 Built-in Functions page and PEP 790; Swedish text, language tags, metadata, licence decision, built files and the fixes claimed in round 4.

All checked cards correct; Swedish text, tags, metadata, the CC0 decision and round 4's fix confirmed. One warning (method step 6 miscounted the rewritten summaries) and two suggestions (an untested behaviour in the dict-pairs note; zip and enumerate fronts not naming the iterator) were all fixed.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| deck | Method step 6 accounts for 13 + 34 + 2 = 49 python-docs summaries, but the dossier has 51; those of range-start-stop and enumerate-start are in no list. | Confirmed with check.py (under Queries): of the 51 python-docs entries, only range-start-stop, enumerate-start and the two open-read ones are named in neither round 3 nor round 4. A six-word-sequence comparison with the live 3.14.8 pages found nothing in common for these two, and for the whole set only signatures (sorted, print) and stock phrases ("digits after the decimal point", "from the end of the sequence"). Method step 6 and round 4's resolution now name the two as kept and record the round-5 comparison. | fixed |
| dict-pairs | The note's repeated-key behaviour was never run, although method step 4 and the test-run source say every behaviour in the notes was; the note also repeated six words of the documentation's sentence. | Confirmed: run_cards.py's dict-pairs entry has no repeated key. check.py ran dict([('a', 1), ('a', 2)]) -> {'a': 2} and dict([('a', 1), ('b', 2), ('a', 3)]) -> {'a': 3, 'b': 2}, now in the card's test-run evidence; method step 4 and the source's usedFor say this case was run in round 5. The note was reworded: "A repeated key keeps the value from its last pair." / "En upprepad nyckel får värdet från sitt sista par." | fixed |
| zip, enumerate, enumerate-start | The fronts do not say which form of result they want, so list(zip(xs, ys)) or list(enumerate(xs)) could also be given; method step 5 says fronts name the form, and even claimed "an enumerate object" was named. | Applied: the fronts now begin "An iterator of pairs" / "En iterator med par", in the style of the map card. The zip note drops the now redundant "An iterator" and the enumerate note says "An enumerate object"; method step 5 now describes these fronts accurately. Backs unchanged; all fronts remain unique in both languages. | fixed |

### Round 6: Final full-deck review (facts and language) (2026-10-04)

**Reviewer:** Claude (AI) — independent final reviewer · **Scope:** All 50 cards in both languages against the recorded Python 3.14.4 test run, the live 3.14.8 documentation, the 3.15.0rc3 Built-in Functions page and PEP 790; Swedish text, language tags, evidence, metadata, the CC0 decision, the built files and the fixes claimed in round 5.

No factual or language errors; round 5's three fixes confirmed. One warning (method step 3 named the variable sub, which belonged to a dropped card) and three suggestions (state the Python 3.14 cut-off in the description; reword the isinstance note; merge two asides in method step 5) were all applied.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| deck | Method step 3 says the backs use "s and sub for strings", but no card uses sub; it belonged to the dropped task "sub in s". | Confirmed: no card contains the name sub, and the recorded run_cards.py has no such name (the only matches in Queries are re.sub in helper scripts). Method step 3 now says "s for a string". | fixed |
| deck | The description does not say the content is as of Python 3.14, although Python 3.15.0 (due 2026-10-09) changes open()'s default encoding. | Confirmed: PEP 790, fetched today, schedules 3.15.0 final for Friday 2026-10-09; the open-read note already pins the versions. The description now begins "50 everyday Python 3 built-in functions and operations, as of Python 3.14." / "… i Python 3, enligt version 3.14.", matching the selection's cut-off; the English stays within 50–110 words. | fixed |
| isinstance | The English backNote "So also True for True and False, …" has no verb and makes the two senses of True hard to tell apart. | Applied the suggested wording: "It also gives True for True and False, since bool is a subclass of int; type(x) is int ignores subclasses." / "Ger alltså True även för True och False, eftersom bool är en underklass till int; type(x) is int bortser från underklasser." The facts are unchanged and match the test run (isinstance(True, int) -> True, type(True) is int -> False). | fixed |
| deck | Method step 5 has two parenthetical asides back to back, which is hard to read. | Merged as suggested: the examples now follow "that the notes name" directly, and the round-5 exception (the repeated-key behaviour, run with check.py) is a separate clause. | fixed |

## Cards and evidence

| Card | Front | Back | Evidence |
|---|---|---|---|
| `len` | The number of items in the list xs (en) / Antalet element i listan xs (sv) | len(xs) (zxx) | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD len" — With xs = [3, 1, 4, 1, 5], len(xs) gave 5.<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/functions.html#len (len) — len(object) gives how many items the object holds; it works on sequences such as strings, tuples, lists and ranges and on collections such as dictionaries and sets. |
| `range-stop` | The integers 0, 1, …, n − 1 as a range object (en) / Heltalen 0, 1, …, n − 1 som ett range-objekt (sv) | range(n) (zxx) — *range(0, n) is the same; n itself is not included. (en) / range(0, n) är samma sak; n ingår inte. (sv)* | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD range-stop" — With n = 5, range(n) gave range(0, 5); list(range(n)) and list(range(0, n)) both gave [0, 1, 2, 3, 4].<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/functions.html#func-range and https://docs.python.org/3/builtins/stdtypes.html#range (class range) — range has the forms range(stop) and range(start, stop, step=1); a missing start means 0 and a missing step means 1, and with a positive step the values start, start + step, start + 2*step, … continue for as long as they stay below stop. |
| `range-start-stop` | The integers a, a + 1, …, b − 1 as a range object (en) / Heltalen a, a + 1, …, b − 1 som ett range-objekt (sv) | range(a, b) (zxx) | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD range-start-stop" — With a, b = 2, 6, range(a, b) gave range(2, 6); list(range(a, b)) gave [2, 3, 4, 5].<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/stdtypes.html#range (class range) — range(start, stop, step=1): with step 1 the items are start, start + 1, … while they are less than stop. |
| `enumerate` | An iterator of pairs (index, item) for the items of xs, counting from 0 (en) / En iterator med par (index, element) för elementen i xs, räknat från 0 (sv) | enumerate(xs) (zxx) — *An enumerate object; list(enumerate(xs)) gives the pairs as a list. (en) / Ett enumerate-objekt; list(enumerate(xs)) ger paren som en lista. (sv)* | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD enumerate" — With xs = ['a', 'b', 'c'], enumerate(xs) gave an enumerate object; list(enumerate(xs)) gave [(0, 'a'), (1, 'b'), (2, 'c')].<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/functions.html#enumerate (enumerate) — enumerate(iterable, start=0) gives an iterator; each step yields a tuple of a counter, beginning at start (0 unless given), and the next value of the iterable. |
| `enumerate-start` | An iterator of pairs (number, item) for the items of xs, numbered from 1 (en) / En iterator med par (nummer, element) för elementen i xs, numrerade från 1 (sv) | enumerate(xs, start=1) (zxx) — *enumerate(xs, 1) does the same. (en) / enumerate(xs, 1) gör samma sak. (sv)* | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD enumerate-start" — With xs = ['a', 'b', 'c'], list(enumerate(xs, start=1)) and list(enumerate(xs, 1)) both gave [(1, 'a'), (2, 'b'), (3, 'c')].<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/functions.html#enumerate (enumerate) — The signature is enumerate(iterable, start=0): the count starts from start, which can be passed by position or by name. |
| `zip` | An iterator of pairs (x, y) of the items at the same positions in xs and ys (en) / En iterator med par (x, y) av elementen på samma platser i xs och ys (sv) | zip(xs, ys) (zxx) — *It stops when the shorter list runs out. (en) / Den slutar när den kortare listan tar slut. (sv)* | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD zip" — With xs, ys = [1, 2, 3], ['a', 'b', 'c'], list(zip(xs, ys)) gave [(1, 'a'), (2, 'b'), (3, 'c')]; list(zip([1, 2, 3], ['a', 'b'])) gave [(1, 'a'), (2, 'b')].<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/functions.html#zip (zip) — zip(*iterables, strict=False) walks through the iterables side by side and yields one tuple per step, holding one item from each; unless strict is set, it ends with the shortest iterable. |
| `sorted` | A new list of the items of xs in ascending order (en) / En ny lista med elementen i xs i stigande ordning (sv) | sorted(xs) (zxx) — *xs itself is not changed; xs.sort() sorts it in place instead. (en) / xs själv ändras inte; xs.sort() sorterar i stället listan på plats. (sv)* | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD sorted" — With xs = [3, 1, 2], sorted(xs) gave [1, 2, 3] (a list) and xs was still [3, 1, 2]; xs.sort() returned None and xs became [1, 2, 3].<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/functions.html#sorted (sorted) and https://docs.python.org/3/builtins/stdtypes.html#list.sort (list.sort) — sorted(iterable, /, *, key=None, reverse=False) builds and gives back a new list holding the iterable's items in order; list.sort() reorders the list itself. |
| `sorted-reverse` | A new list of the items of xs in descending order (en) / En ny lista med elementen i xs i fallande ordning (sv) | sorted(xs, reverse=True) (zxx) | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD sorted-reverse" — With xs = [3, 1, 2], sorted(xs, reverse=True) gave [3, 2, 1]; xs was still [3, 1, 2].<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/functions.html#sorted (sorted) — reverse may only be passed by keyword; reverse=True puts the result in descending order, as though every comparison were turned around. |
| `reversed` | An iterator over the items of xs from last to first (en) / En iterator över elementen i xs från sista till första (sv) | reversed(xs) (zxx) | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD reversed" — With xs = [1, 2, 3], reversed(xs) gave a list_reverseiterator object; list(reversed(xs)) gave [3, 2, 1]; xs was unchanged.<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/functions.html#reversed (reversed) — reversed(object) gives an iterator that goes through a sequence backwards, from its last item to its first. |
| `slice-reverse` | A new list of the items of xs in reverse order, using slicing (en) / En ny lista med elementen i xs i omvänd ordning, med slicing (sv) | xs[::-1] (zxx) — *A slice with step -1. (en) / En slice med steg -1. (sv)* | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD slice-reverse" — With xs = [1, 2, 3], xs[::-1] gave [3, 2, 1]; xs was unchanged and xs[::-1] is xs gave False (a new list).<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/stdtypes.html#common-sequence-operations (s[i:j:k] and its notes) — s[i:j:k] picks every k-th item between i and j; when k is negative, a missing i or j stands for the far end in the direction of travel, so s[::-1] goes from the last item back to the first. |
| `sum` | The sum of the numbers in xs (en) / Summan av talen i xs (sv) | sum(xs) (zxx) — *0 for an empty xs. (en) / 0 om xs är tom. (sv)* | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD sum" — With xs = [1, 2, 3.5], sum(xs) gave 6.5; sum([]) gave 0.<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/functions.html#sum (sum) — sum(iterable, /, start=0) gives the total of start plus every item, added one after another from the left. |
| `min` | The smallest item in xs (en) / Det minsta elementet i xs (sv) | min(xs) (zxx) | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD min" — With xs = [3, 1, 2], min(xs) gave 1; min(['b', 'a', 'c']) gave 'a'.<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/functions.html#min (min) — Given a single iterable as its only positional argument, min gives back the least of its items. |
| `max` | The largest item in xs (en) / Det största elementet i xs (sv) | max(xs) (zxx) | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD max" — With xs = [3, 1, 2], max(xs) gave 3; max(['b', 'a', 'c']) gave 'c'.<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/functions.html#max (max) — Given a single iterable as its only positional argument, max gives back the greatest of its items. |
| `abs` | The absolute value of the number x (en) / Absolutbeloppet av talet x (sv) | abs(x) (zxx) | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD abs" — With x = -7.5, abs(x) gave 7.5; abs(-3) gave 3; abs(3 + 4j) gave 5.0.<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/functions.html#abs (abs) — abs(number) gives the distance of the number from zero; it accepts integers, floats, complex numbers (giving the magnitude) and any object that defines __abs__(). |
| `round` | The number x rounded to the nearest integer (en) / Talet x avrundat till närmaste heltal (sv) | round(x) (zxx) — *Halves go to the even integer: round(2.5) is 2 and round(3.5) is 4. (en) / Vid exakt hälften väljs det jämna heltalet: round(2.5) är 2 och round(3.5) är 4. (sv)* | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD round" — With x = 2.7, round(x) gave 3, an int; round(2.5) gave 2, round(3.5) gave 4, round(-2.7) gave -3.<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/functions.html#round (round) — Without ndigits (or with None), round gives an int, the integer closest to the number; a value exactly halfway between two integers goes to the even one. |
| `round-digits` | The number x rounded to two decimal places (en) / Talet x avrundat till två decimaler (sv) | round(x, 2) (zxx) — *The result is a number; for text with two decimals, use f"{x:.2f}". (en) / Resultatet är ett tal; för text med två decimaler, använd f"{x:.2f}". (sv)* | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD round-digits" — With x = 3.14159, round(x, 2) gave 3.14; round(2.675, 2) gave 2.67 (2.675 is not exactly representable as a float).<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/functions.html#round (round) — With a second argument ndigits, round keeps that many digits after the decimal point; the documentation warns that float representation can give unexpected results and uses 2.675 rounded to two places as its example. |
| `int` | The string s, such as "42", converted to an integer (en) / Strängen s, till exempel ”42”, omvandlad till ett heltal (sv) | int(s) (zxx) | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD int" — With s = '42', int(s) gave 42; int(' 42\n') gave 42.<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/functions.html#int (class int) — int(x) gives an integer object made from a number or from a string holding an integer literal (base 10 by default). |
| `float` | The string s, such as "3.5", converted to a floating-point number (en) / Strängen s, till exempel ”3.5”, omvandlad till ett flyttal (sv) | float(s) (zxx) | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD float" — With s = '3.5', float(s) gave 3.5; float('1e3') gave 1000.0.<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/functions.html#float (class float) — float(x) converts a number, or a string spelling a decimal number (optionally with sign, exponent or surrounding whitespace), into a float. |
| `str` | The number n converted to a string (en) / Talet n omvandlat till en sträng (sv) | str(n) (zxx) — *f"{n}" gives the same string. (en) / f"{n}" ger samma sträng. (sv)* | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD str" — With n = 42, str(n) gave '42' and f'{n}' gave '42'; str(3.5) gave '3.5'.<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/stdtypes.html#str (class str) — str(object), without encoding or errors, gives the object's informal string form, the one its __str__() method produces. |
| `list-chars` | A list of the characters of the string s (en) / En lista med tecknen i strängen s (sv) | list(s) (zxx) | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD list-chars" — With s = 'abc', list(s) gave ['a', 'b', 'c'].<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/functions.html#func-list (class list) and https://docs.python.org/3/builtins/stdtypes.html#list — list(iterable) makes a new list holding the iterable's items in the same order; looping over a string visits its characters one by one. |
| `dict-pairs` | A dict built from pairs, a list of (key, value) tuples (en) / Ett dict-objekt byggt av pairs, en lista med tupler (nyckel, värde) (sv) | dict(pairs) (zxx) — *A repeated key keeps the value from its last pair. (en) / En upprepad nyckel får värdet från sitt sista par. (sv)* | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD dict-pairs"; review round 5, check.py output — With pairs = [('a', 1), ('b', 2)], dict(pairs) gave {'a': 1, 'b': 2}; the comprehension {k: v for k, v in pairs} gave the same. In review round 5, dict([('a', 1), ('a', 2)]) gave {'a': 2} and dict([('a', 1), ('b', 2), ('a', 3)]) gave {'a': 3, 'b': 2}.<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/functions.html#func-dict (class dict) and https://docs.python.org/3/builtins/stdtypes.html#dict — dict(iterable) accepts an iterable of two-item entries and uses the first item of each as a key and the second as its value; when a key turns up again, its later value wins. |
| `set` | The items of xs without duplicates, as a set (en) / Elementen i xs utan dubbletter, som en mängd (sv) | set(xs) (zxx) — *A set has no defined order. (en) / En mängd har ingen bestämd ordning. (sv)* | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD set" — With xs = [3, 1, 3, 2, 1], set(xs) gave {1, 2, 3}, of type set.<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/functions.html#func-set (class set) and https://docs.python.org/3/builtins/stdtypes.html#set — set(iterable) makes a new set out of the iterable's elements; a set keeps each hashable element only once and has no order, which is why it is used to drop duplicates. |
| `tuple` | The list xs converted to a tuple (en) / Listan xs omvandlad till en tupel (sv) | tuple(xs) (zxx) | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD tuple" — With xs = [1, 2, 3], tuple(xs) gave (1, 2, 3).<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/functions.html#func-tuple (class tuple) — tuple(iterable) makes a tuple, Python's immutable sequence, with the iterable's items in the same order. |
| `isinstance` | Whether x is an int, counting subclasses of int too (en) / Om x är en int, underklasser till int inräknade (sv) | isinstance(x, int) (zxx) — *It also gives True for True and False, since bool is a subclass of int; type(x) is int ignores subclasses. (en) / Ger alltså True även för True och False, eftersom bool är en underklass till int; type(x) is int bortser från underklasser. (sv)* | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD isinstance" — isinstance(True, int) gave True, isinstance(5, int) True, isinstance(5.0, int) False; type(True) is int gave False; issubclass(bool, int) gave True.<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/functions.html#isinstance (isinstance) and https://docs.python.org/3/builtins/stdtypes.html#bltin-boolean-values (bool) — isinstance(object, classinfo) gives True when the object's class is classinfo or any class derived from it, including virtual subclasses; the Built-in Types page lists bool among the subclasses of int. |
| `type` | The type (class) of the object x (en) / Typen (klassen) för objektet x (sv) | type(x) (zxx) | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD type" — With x = 3.5, type(x) gave <class 'float'>; type('a') gave <class 'str'>, type([]) <class 'list'>.<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/functions.html#type (class type) — Called with a single argument, type gives back the object's type, an object such as <class 'float'>. |
| `print` | Write x to standard output, followed by a newline (en) / Skriv x till standard output, följt av en radbrytning (sv) | print(x) (zxx) | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD print" — A child Python process ran x = 42; print(x) and wrote '42\n' to standard output (exit status 0).<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/functions.html#print (print) — print(*objects, sep=' ', end='\n', file=None, flush=False) turns each argument into text the way str() would and sends it, followed by end (a newline unless changed), to file, which is sys.stdout when not given.<br>Svenskspråkiga Wikipedia: Flyttal, Iterator, Tupel, Python (programspråk), Standard output: https://sv.wikipedia.org/w/index.php?oldid=51151527 (Standard output, introduction) — The Swedish article is titled "Standard output" and uses the English term in Swedish running text, with the abbreviation stdout and the Swedish gloss utdata. |
| `input` | Read a line typed by the user, after showing the prompt "Name: " (en) / Läs en rad som användaren skriver, efter att ha visat ledtexten ”Name: ” (sv) | input("Name: ") (zxx) — *Returns the line as a string, without the newline. (en) / Ger raden som en sträng, utan radbrytningen. (sv)* | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD input" — A child Python process ran answer = input("Name: ") with 'Ada\n' on standard input: it wrote 'Name: ' to standard output and answer was 'Ada'.<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/functions.html#input (input) — input(prompt) shows the prompt on standard output with no newline after it, waits for one line from standard input and gives that line back as a str, minus its final newline. |
| `open-read` | Open the text file at path for reading (en) / Öppna textfilen på sökvägen path för läsning (sv) | open(path) (zxx) — *Mode "r" is the default, so open(path, "r") is the same. Without encoding=…, Python 3.14 and earlier use the locale's encoding; from 3.15 the default is UTF-8. (en) / Läget "r" är förvalt, så open(path, "r") är samma sak. Utan encoding=… använder Python 3.14 och tidigare teckenkodningen från systemets språkinställning; från 3.15 är UTF-8 förvalt. (sv)* | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD open-read" — With path = 'data.txt' (an existing file), open(path) gave a TextIOWrapper with mode 'r' and encoding 'UTF-8' (the run's locale encoding); open(path, 'r').mode was also 'r'; open(path).read() gave 'first line\nsecond line\n'.<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/functions.html#open (open) — open's mode parameter defaults to 'r', which opens a text file for reading ('rt' means the same). In 3.14, leaving out encoding makes Python ask locale.getencoding() for the current locale's encoding.<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3.15/builtins/functions.html#open (open; the page is titled "Python 3.15.0rc3 documentation") and https://peps.python.org/pep-0790/ (Python 3.15 release schedule) — In the 3.15 documentation, a text-mode open without an encoding uses UTF-8 unless Python's UTF-8 Mode is turned off; a version note marks this as new in 3.15 (PEP 686), replacing the locale encoding. PEP 790 lists 3.15.0 candidate 3 on 2026-10-02 and the final release as expected on 2026-10-09. |
| `open-write` | Open the text file at path for writing, emptying it first (en) / Öppna textfilen på sökvägen path för skrivning, så att den först töms (sv) | open(path, "w") (zxx) — *Creates the file if it does not exist. (en) / Skapar filen om den inte finns. (sv)* | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD open-write" — With path = 'out.txt' holding 'old contents', open(path, "w") gave a TextIOWrapper with mode 'w', after which open(path).read() gave '' (emptied); open('new.txt', 'w') created the missing file new.txt.<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/functions.html#open (open) — In the table of open's modes, 'w' is the mode for writing, and it empties the file before anything is written. |
| `file-read` | The whole contents of the open text file f, as one string (en) / Hela innehållet i den öppna textfilen f, som en sträng (sv) | f.read() (zxx) — *Reads from the current position to the end; at the end it gives "". (en) / Läser från aktuell position till slutet; vid slutet ger den "". (sv)* | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD file-read" — With f = open('data.txt', encoding='utf-8'), f.read() gave 'first line\nsecond line\n'; a second f.read() gave ''.<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/tutorial/inputoutput.html#methods-of-file-objects (f.read) — In text mode f.read() with no size reads everything that is left in the file and gives it as a str; once the end has been reached, a further call gives ''. |
| `any` | Whether at least one item of xs counts as true (en) / Om minst ett element i xs räknas som sant (sv) | any(xs) (zxx) — *False for an empty xs. (en) / False om xs är tom. (sv)* | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD any" — any([0, '', 3]) gave True; any([0, '', None]) gave False; any([]) gave False.<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/functions.html#any (any) and https://docs.python.org/3/builtins/stdtypes.html#truth (Truth Value Testing) — any(iterable) gives True as soon as one element counts as true and False otherwise, so an empty iterable gives False; the section on truth value testing says which objects count as true. |
| `all` | Whether every item of xs counts as true (en) / Om alla element i xs räknas som sanna (sv) | all(xs) (zxx) — *True for an empty xs. (en) / True om xs är tom. (sv)* | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD all" — all([1, 'a', 3]) gave True; all([1, 0, 3]) gave False; all([]) gave True.<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/functions.html#all (all) — all(iterable) gives False as soon as one element counts as false and True otherwise, so an empty iterable gives True. |
| `map` | An iterator of f(x) for each item x of xs, with a call to a built-in function (en) / En iterator med f(x) för varje element x i xs, med ett anrop av en inbyggd funktion (sv) | map(f, xs) (zxx) | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD map" — With xs = [1, 2, 3] and f = lambda x: x * 10, map(f, xs) gave a map object; list(map(f, xs)) gave [10, 20, 30].<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/functions.html#map (map) — map(function, iterable, ...) gives an iterator; each value it produces is the function called on the next item of the iterable. |
| `filter` | An iterator over the items x of xs for which f(x) counts as true, with a call to a built-in function (en) / En iterator över de element x i xs för vilka f(x) räknas som sant, med ett anrop av en inbyggd funktion (sv) | filter(f, xs) (zxx) | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD filter" — With xs = [-2, 0, 3, 5] and f = lambda x: x > 0, filter(f, xs) gave a filter object; list(filter(f, xs)) gave [3, 5].<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/functions.html#filter (filter) — filter(function, iterable) gives an iterator that keeps only the items for which calling the function gives a true result. |
| `listcomp-map` | A list of f(x) for each item x of xs, written as a list comprehension (en) / En lista med f(x) för varje element x i xs, skriven som en list comprehension (sv) | [f(x) for x in xs] (zxx) — *The loop variable may have any name. (en) / Loopvariabeln kan heta vad som helst. (sv)* | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD listcomp-map" — With xs = [1, 2, 3] and f = lambda x: x * 10, [f(x) for x in xs] gave [10, 20, 30].<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/reference/expressions.html#comprehensions and https://docs.python.org/3/reference/expressions.html#lists — A comprehension is an expression followed by one or more for clauses and optionally if clauses; inside square brackets it builds a new list from the values the expression produces. |
| `listcomp-filter` | A list of the items x of xs that are greater than 0, written as a list comprehension (en) / En lista med de element x i xs som är större än 0, skriven som en list comprehension (sv) | [x for x in xs if x > 0] (zxx) — *The loop variable may have any name. (en) / Loopvariabeln kan heta vad som helst. (sv)* | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD listcomp-filter" — With xs = [-2, 0, 3, 5], [x for x in xs if x > 0] gave [3, 5].<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/reference/expressions.html#comprehensions — In a comprehension the for and if clauses behave like nested statements, and an element is produced only when every clause lets it through, so an if clause drops the items whose condition is false. |
| `fstring` | An f-string giving "Hello, " followed by the value of name and "!" (en) / En f-sträng som ger ”Hello, ” följt av värdet av name och ”!” (sv) | f"Hello, {name}!" (zxx) — *Single quotes work the same: f'Hello, {name}!'. (en) / Enkla citattecken fungerar likadant: f'Hello, {name}!'. (sv)* | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD fstring" — With name = 'Ada', f"Hello, {name}!" gave 'Hello, Ada!'; f'Hello, {name}!' gave the same.<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/reference/lexical_analysis.html#f-strings (f-strings) — An f-string is a string literal with an f or F prefix; the expressions it holds in curly braces are evaluated when the line runs and their values put into the text. |
| `fstring-decimals` | An f-string giving the number x with exactly two decimals (en) / En f-sträng som ger talet x med exakt två decimaler (sv) | f"{x:.2f}" (zxx) — *2.5 gives "2.50". (en) / 2.5 ger "2.50". (sv)* | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD fstring-decimals" — With x = 3.14159, f"{x:.2f}" gave '3.14'; f"{2.5:.2f}" gave '2.50'; format(x, ".2f") gave '3.14'.<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/library/string.html#format-specification-mini-language — In a format specification, the type 'f' gives fixed-point output, and the precision written after the dot sets how many digits follow the decimal point. |
| `slice-first` | The first three items of the list xs (en) / De tre första elementen i listan xs (sv) | xs[:3] (zxx) — *xs[0:3] is the same; a shorter list gives all its items. (en) / xs[0:3] är samma sak; en kortare lista ger alla sina element. (sv)* | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD slice-first" — With xs = [10, 20, 30, 40, 50], xs[:3] and xs[0:3] both gave [10, 20, 30]; [1, 2][:3] gave [1, 2].<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/stdtypes.html#common-sequence-operations (s[i:j] and its notes) — s[i:j] takes the items whose index is at least i and below j; a missing i counts as 0, and a j larger than len(s) is cut down to len(s). |
| `index-last` | The last item of the list xs (en) / Det sista elementet i listan xs (sv) | xs[-1] (zxx) | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD index-last" — With xs = [10, 20, 30, 40, 50], xs[-1] gave 50, the same as xs[len(xs) - 1].<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/stdtypes.html#common-sequence-operations (s[i] and its notes) — A negative index counts from the end of the sequence: s[i] with a negative i means s[len(s) + i], so -1 is the last item. |
| `slice-last` | The last three items of the list xs (en) / De tre sista elementen i listan xs (sv) | xs[-3:] (zxx) | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD slice-last" — With xs = [10, 20, 30, 40, 50], xs[-3:] gave [30, 40, 50]; [1, 2][-3:] gave [1, 2].<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/stdtypes.html#common-sequence-operations (s[i:j] and its notes) — In a slice a negative bound counts from the end (len(s) + i); a missing j means the end of the sequence, and an i below -len(s) is treated as 0. |
| `dict-get` | The value for the key k in the dict d, or None if k is missing (en) / Värdet för nyckeln k i dict-objektet d, eller None om k saknas (sv) | d.get(k) (zxx) — *d[k] raises KeyError instead when k is missing. (en) / d[k] utlöser i stället undantaget KeyError när k saknas. (sv)* | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD dict-get" — With d = {'a': 1} and k = 'z', d.get(k) gave None and d[k] raised KeyError: 'z'; d.get('a') gave 1.<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/stdtypes.html#dict.get (dict.get, d[key]) — d.get(key) looks up key and falls back to the default argument, None unless given, when the key is absent, so it does not raise KeyError; plain d[key] raises KeyError for an absent key. |
| `dict-get-default` | The value for the key k in the dict d, or 0 if k is missing (en) / Värdet för nyckeln k i dict-objektet d, eller 0 om k saknas (sv) | d.get(k, 0) (zxx) | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD dict-get-default" — With d = {'a': 1} and k = 'z', d.get(k, 0) gave 0 and d was unchanged; d.get('a', 0) gave 1.<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/stdtypes.html#dict.get (dict.get) — The second argument of d.get is what it gives back when the key is absent; when the key is present, its value is given. |
| `split` | The words of the string s, split at runs of whitespace (en) / Orden i strängen s, uppdelade vid varje följd av blanktecken (sv) | s.split() (zxx) — *No empty strings for leading, trailing or repeated whitespace, unlike s.split(" "). (en) / Inga tomma strängar för inledande, avslutande eller upprepade blanktecken, till skillnad från s.split(" "). (sv)* | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD split" — With s = '  to be   or not ', s.split() gave ['to', 'be', 'or', 'not']; s.split(' ') gave ['', '', 'to', 'be', '', '', 'or', 'not', ''].<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/stdtypes.html#str.split (str.split) — Called with no separator (or None), str.split treats each stretch of whitespace as one break, however long, and leading or trailing whitespace produces no empty strings in the result. |
| `split-sep` | The parts of the string s between its commas (en) / Delarna av strängen s mellan dess kommatecken (sv) | s.split(",") (zxx) — *Two commas in a row give an empty string. (en) / Två kommatecken i rad ger en tom sträng. (sv)* | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD split-sep" — With s = 'a,b,,c', s.split(",") gave ['a', 'b', '', 'c'].<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/stdtypes.html#str.split (str.split) — With a separator argument, str.split cuts the string at every occurrence of it; two separators in a row are not merged, so an empty string appears between them. |
| `join` | The strings in words joined into one, with a space between each (en) / Strängarna i words sammanfogade till en, med ett mellanslag mellan varje (sv) | " ".join(words) (zxx) | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD join" — With words = ['to', 'be', 'or'], " ".join(words) gave 'to be or'.<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/stdtypes.html#str.join (str.join) — sep.join(iterable) gives one string made by putting the strings of the iterable together, with sep, the string the method is called on, between neighbouring items. |
| `strip` | The string s without leading and trailing whitespace (en) / Strängen s utan blanktecken i början och slutet (sv) | s.strip() (zxx) | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD strip" — With s = '\t  hello world \n', s.strip() gave 'hello world'; s was unchanged.<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/stdtypes.html#str.strip (str.strip) — str.strip() gives a new string with the given characters cut off both ends; with no argument, whitespace is what gets cut. |
| `upper` | The string s in upper case (en) / Strängen s med versaler (sv) | s.upper() (zxx) | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD upper" — With s = 'Hello, wörld', s.upper() gave 'HELLO, WÖRLD'.<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/builtins/stdtypes.html#str.upper (str.upper) — str.upper() gives a new string in which every character that has case is in upper case. |
| `in-list` | Whether x is an item of the list xs (en) / Om x är ett element i listan xs (sv) | x in xs (zxx) | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD in-list" — With xs = [1, 2, 3] and x = 2, x in xs gave True; 5 in xs gave False.<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/reference/expressions.html#membership-test-operations and https://docs.python.org/3/builtins/stdtypes.html#common-sequence-operations (x in s) — The membership operator x in s is True when some item of s compares equal to x and False when none does. |
| `in-dict` | Whether k is a key in the dict d (en) / Om k är en nyckel i dict-objektet d (sv) | k in d (zxx) — *in tests the keys only; v in d.values() tests the values. (en) / in testar bara nycklarna; v in d.values() testar värdena. (sv)* | Test run of every card's expression with Python 3.14.4 (CPython): run_cards.py output, section "CARD in-dict" — With d = {'a': 1} and k = 'a', k in d gave True; 1 in d gave False; 1 in d.values() gave True.<br>The Python 3.14 documentation (docs.python.org, version 3.14.8): https://docs.python.org/3/reference/expressions.html#membership-test-operations and https://docs.python.org/3/builtins/stdtypes.html#typesmapping (key in d) — Applied to a dictionary, the in operator checks the keys: key in d is True exactly when d has that key. |
