# Trigonometry — provenance report

<!-- Generated from authored/trigonometry.json by scripts/authored_decks.py. Do not edit: change the dossier and rebuild. -->

**Deck:** [`decks/trigonometry.ttl`](../decks/trigonometry.ttl) · **Cards:** 40 · **Licence:** [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) · **Compiled by:** Anton Wiklund · **Created:** 2026-10-04

40 cards of school trigonometry: exact values of sin and cos at 0, π/6, π/4, π/3 and π/2 and of tan at 0, π/6, π/4 and π/3 (each angle in radians and degrees), sin, cos and tan in a right triangle, the Pythagorean identity, tan x = sin x/cos x, the double-angle formulas, sin(x ± y), cos(x ± y), tan(x + y), sin(−x), cos(−x), the laws of sines and cosines, degrees and radians, and the periods. Front: the question, naming every variable; back: the value or formula, such as √3/2. Every card is checked with SymPy and against English and Swedish Wikipedia, the identities also against the NIST DLMF.

## Sources

| Source | Creator | Licence | Role | Retrieved | Used for |
|---|---|---|---|---|---|
| [Derivations and SymPy verification for the Solid Memo trigonometry deck](https://github.com/antwika/solid-memo/blob/main/packages/deck-library/authored/trigonometry.json) | Anton Wiklund (compiler); written by Claude (Anthropic, AI) at his direction | [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) | content | 2026-10-04 | The selection of the 40 cards, the wording of the fronts and notes, the notation of the answers, and the machine verification of every card (and of the statements in the notes) with SymPy 1.14.0: exact values from the side ratios of explicit triangles and from SymPy's evaluation, identities by symbolic simplification, the laws of sines and cosines from vertex coordinates, the degree–radian relation from the arc length of the unit circle, and the periods with sympy.periodicity; each also numerically. The script's full text is recorded under Queries; the URL resolves once the dossier is merged into the main branch. |
| [Wikidata: items of the trigonometric functions, identities, laws and angle units, their labels, defining formulas (P2534) and conversion to SI unit (P2370)](https://www.wikidata.org/) | Wikidata contributors (Wikimedia Foundation) | [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) | content | 2026-10-04 | The English and Swedish names on the fronts (sin, cos, tan; right triangle / rätvinklig triangel, hypotenuse / hypotenusa, leg / katet, Pythagorean identity / trigonometriska ettan, law of sines / sinussatsen, law of cosines / cosinussatsen, degree / grad, radian / radianer), checked by the builder; the defining formulas (P2534) of the Pythagorean trigonometric identity, the tangent, the law of sines and the law of cosines, compared with those cards by hand; and the degree's conversion to SI unit (P2370, 0.01745… rad), compared with π/180 by the SymPy script and checked by the builder. The formulas were not taken from Wikidata. |
| [English Wikipedia: Trigonometric functions and Radian](https://en.wikipedia.org/) | Wikipedia contributors | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | verification | 2026-10-04 | Independent check of every card: the articles Trigonometric functions (revision 1374535148: right-angled triangle definitions, unit-circle definitions, algebraic values and the table of simple algebraic values, radians versus degrees, parity, periods, Pythagorean identity, sum and difference and double-angle formulas, laws of sines and cosines) and Radian (revision 1377640454, § Between degrees). Each card's evidence quotes the wikitext of the exact revision linked in the locator (markup such as templates and links reduced to their text, math tags dropped, runs of spaces collapsed). Consulted only: no text, notation layout or selection copied. |
| [Swedish Wikipedia: articles on the trigonometric functions, identities and laws](https://sv.wikipedia.org/) | Wikipedia contributors | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | verification | 2026-10-04 | Second independent check of every card in the articles Trigonometrisk funktion (revision 56572109: Geometrisk definition, Värdetabell), Lista över trigonometriska identiteter (revision 59465729: Funktioner, Perioder, Symmetri, Dubbla vinkeln, Samband för två vinklar), Trigonometriska ettan (53905662), Sinussatsen (56623979), Cosinussatsen (56558376) and Radian (58968418), and check of the Swedish terms on the fronts as Swedish mathematical text uses them (motstående katet, närliggande katet, hypotenusan, spetsig vinkel, trigonometriska ettan, sinussatsen, cosinussatsen, radianer, perioden). The articles Sinus, Cosinus, Tangens, Katet, Enhetscirkel, Grad (vinkelenhet) and Periodisk funktion were also fetched and read for terminology; no card cites them. Consulted only: no text or selection copied. |
| [NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15)](https://dlmf.nist.gov/) | F. W. J. Olver, A. B. Olde Daalhuis, D. W. Lozier, B. I. Schneider, R. F. Boisvert, C. W. Clark, B. R. Miller, B. V. Saunders, H. S. Cohl, M. A. McClain (eds.); National Institute of Standards and Technology | All rights reserved | verification | 2026-10-04 | Third independent check of the identities and periods: §4.14 (eq. 4.14.4, tan = sin/cos; eqs. 4.14.8–4.14.10, periodicity) and §4.21 (eqs. 4.21.2–4.21.4 addition formulas, 4.21.12 Pythagorean identity, 4.21.24–4.21.25 parity, 4.21.27–4.21.29 double-angle formulas). DLMF states them for a complex variable z; the cards state the real case. DLMF has no table of the values at π/6, π/4 and π/3 (§4.16 was read: its tables give signs, quarter periods and interrelations), and no conversion between degrees and radians, so those cards cite no DLMF evidence. Nothing copied. |

**Content** sources supplied information that is in the cards. **Verification** sources were only consulted to confirm facts: nothing was copied from them.

### Licence evidence

- **Derivations and SymPy verification for the Solid Memo trigonometry deck** — Own work of the deck's compiler, dedicated to the public domain together with the deck: the deck's dcterms:license is https://creativecommons.org/publicdomain/zero/1.0/ (CC0 1.0 Universal). The values, identities and laws themselves are mathematical facts, which are not copyrightable; the wording, the notation and the selection are this dossier's own. The verification script is recorded verbatim under Queries.
- **Wikidata: items of the trigonometric functions, identities, laws and angle units, their labels, defining formulas (P2534) and conversion to SI unit (P2370)** — https://www.wikidata.org/wiki/Wikidata:Licensing (fetched 2026-10-04): "All structured data (i.e. the main, Property, Lexeme, and EntitySchema namespaces) is released into the public domain under Creative Commons Zero."
- **English Wikipedia: Trigonometric functions and Radian** — https://en.wikipedia.org/wiki/Wikipedia:Copyrights (fetched 2026-10-04): "If you wish to reuse content from Wikipedia, read § Reusers' rights and obligations first. Then review the licenses: the Creative Commons Attribution-ShareAlike 4.0 International License and the GNU Free Documentation License."
- **Swedish Wikipedia: articles on the trigonometric functions, identities and laws** — Footer of every Swedish Wikipedia article (e.g. https://sv.wikipedia.org/wiki/Sinussatsen, fetched 2026-10-04): "Wikipedias text är tillgänglig under licensen Creative Commons Erkännande-dela-lika 4.0 Unported"
- **NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15)** — https://dlmf.nist.gov/about/notices (fetched 2026-10-04): "Authors of the works appearing in the Digital Library of Mathematical Functions (DLMF) have assigned copyright to the works to NIST, United States Department of Commerce, as represented by the Secretary of Commerce. All materials on this website are owned by NIST. Limited copying and internal distribution of the content of these pages is permitted for research and teaching. Reproduction, copying, or distribution for any commercial purpose is strictly prohibited." Not a public-domain US government work, so verification only.

## Licensing

The deck is CC0 1.0. Its content comes from two sources whose licences allow anything: the compiler's own selection, wording, notation and derivations (dedicated to the public domain with the deck; the values and formulas are mathematical facts, which are not copyrightable in any case) and Wikidata (structured data under CC0), from which the English and Swedish names on the fronts were taken and against whose defining formulas and conversion factor cards were compared. English and Swedish Wikipedia (CC BY-SA 4.0) and the NIST Digital Library of Mathematical Functions (copyright NIST, reuse limited to research and teaching) were used only to verify the facts and the usage of Swedish terms: no text, notation layout or list was copied from them. Single established terms (motstående katet, närliggande katet, perioden) carry no protectable expression. The selection follows the standard school syllabus and the library editor's brief, which the subject dictates, and was made independently of any source's list.

## Method

1. Who did the work: Anton Wiklund compiled this deck with the help of AI agents (Claude, by Anthropic), which did the research, drafting and cross-checking at his direction. The cards were checked by machine (SymPy, live Wikidata and the app's SHACL and DCAT-AP validators) and in independent review rounds by further Claude agents, each logged under Quality control with its findings and how they were resolved. Anton Wiklund reviews every deck in full before it is released.
2. Selection: the facts a school trigonometry course (in Sweden roughly upper-secondary Matematik 3–4) asks students to know by heart were listed from general mathematical knowledge, following the library editor's brief; no list was copied from any source. Exact values: sin and cos at 0, π/6, π/4, π/3 and π/2, and tan at 0, π/6, π/4 and π/3 (14 cards); sin, cos and tan of an acute angle in a right triangle (3); the Pythagorean identity and tan x = sin x/cos x (2); sin 2x, cos 2x in three forms and tan 2x (5); the addition and subtraction formulas of sin and cos and the addition formula of tan (5); sin(−x) and cos(−x) (2); the laws of sines and cosines (2); 1° and 1 rad, 180° and 360° converted (4); the periods of sin, cos and tan (3).
3. Notation and fronts: each front asks one question and names every variable, so that exactly one answer fits. The value cards give the angle both in radians and in degrees ("Exact value of sin(π/6), i.e. sin 30°" / "Exakta värdet av sin(π/6), dvs. sin 30°"); values with a square root in the denominator are written with a rational denominator (√2/2, √3/3), as SymPy and the English Wikipedia table write them, and a back note gives the other common form (1/√2, 1/√3, as the Swedish Wikipedia table writes them). Formulas that have several standard forms are asked for by the variables they may use ("cos 2x in terms of cos x only"; the form in both, "as a difference of squares"), and the law of sines by the form wanted ("with the sides over the sines"), the other form in the note. The addition and subtraction formulas are asked for, and listed in the description, by their expression (sin(x + y) and so on) rather than by a name, so that no card depends on knowing the name. The right-triangle cards name the sides (a the leg opposite θ, b the leg adjacent to θ, c the hypotenuse; in Swedish motstående katet till θ and närliggande katet till θ), as Swedish Wikipedia's Trigonometrisk funktion letters them. The back is one text in no language (tagged zxx): plain Unicode with superscripts (sin²x), √, π, °, the slash for division (read with the usual precedence: sin x/cos x is (sin x)/(cos x)), a space between a numeric coefficient and a function (2 sin x cos x, 2 cos²x − 1), · in 2ab·cos C to separate the product of sides from the cosine, and − (U+2212) for minus; units of angle on the conversion cards (rad, °). Identity variables x and y are real; where a formula needs cos x ≠ 0 or the like, a back note says so.
4. Machine verification: the script verify_trigonometry.py (recorded verbatim under Queries) was run with `uv run --with sympy python3 verify_trigonometry.py` (SymPy 1.14.0). Exact values: from first principles, the side ratios of two explicit right triangles (half of an equilateral triangle with side 2, whose angle at (√3, 0) is computed from the coordinates as π/6, and the isosceles right triangle with legs 1) and the points (1, 0) and (0, 1) of the unit circle, each compared symbolically with the card's value; independently SymPy's own sin, cos and tan of the angle, symbolically and with 40-digit arithmetic, and rad(degrees) equal to the radian form on the front. Right-triangle cards: the angle θ = atan2(a, b) at the vertex (b, 0) of a triangle with its right angle at the origin, compared symbolically and numerically with a/c, b/c and a/b. Identities: simplify(left − right) = 0 (for tan 2x after writing both sides in sin and cos, since simplify cannot close it directly) and the difference below 10⁻²⁵ at five random points in 30-digit arithmetic, kept away from the poles of tan. Law of sines: a triangle with C at the origin, B = (a, 0) and A = (b cos C, b sin C); the sine of each angle computed from the vertex coordinates as |cross product|/(product of lengths); the ratios a/sin A, b/sin B, c/sin C equal symbolically and on ten random triangles; the note's 2R with the circumcentre solved from equal distances. Law of cosines: |AB|² expanded. Degrees and radians: one full turn computed as the arc-length integral of the unit circle (2π) for 360°, from which 180°, 1° and 1 rad follow; 180/π compared with 57.2958 (to 10⁻⁴) and π/180 with Wikidata's P2370 value of the degree (to 10⁻³⁵); these two and the degree forms of the periods in the notes are numerical or exact comparisons only, so their 'symbolic' column in the output carries no separate symbolic check. Periods: f(x + T) − f(x) simplifies to 0, sympy.periodicity returns T as the fundamental period, and numerically none of the 999 values T·k/1000 is a period at five random points. Five deliberately wrong statements (sin(x + y) with a minus, cos(x + y) with a plus, cos 2x = 2sin²x − 1, sin θ = b/c, period of tan 2π) are run as negative controls and fail, as they must. Result: 47 checks (40 cards and 7 statements in the notes or comparisons), 47 passed.
5. Wikidata: the items were found with wbsearchentities (find_items.py and find_items2.py, under Queries) and their English and Swedish labels and aliases, descriptions, claims and sitelinks fetched with wbgetentities. Four items have a defining formula (P2534) that states a card's fact: Q2039117 (Pythagorean trigonometric identity), Q1129196 (tangent, tan x = sin x/cos x), Q170181 (law of sines) and Q164321 (law of cosines); each agrees with its card and is quoted in the evidence. The P2534 values of sine (Q152415, "\sin(\alpha) = \frac{b}{c}") and cosine (Q1256164, "\cos\,\theta = \frac{\text{AC}}{\text{AB}}") refer to unnamed figures and could not be compared with the right-triangle cards. The builder cannot check P2534 itself, because the SPARQL endpoint returns the value as MathML (seen for Q2039117 in a test query), so the builder's checks are label checks of the names on the fronts plus one statement check: the degree's conversion to SI unit (Q28390 P2370 = 0.01745329251994329576923690768488612713 rad).
6. Cross-checking against sources: fetch_sources.py downloaded the current wikitext and revision id of 10 English and 13 Swedish pages (MediaWiki API) and the DLMF pages §4.14, §4.16, §4.21 (and §4.2, not used) with the DLMF copyright notice; dlmf_text.py reduced the DLMF pages to text with the TeX of each equation; wgrep.py listed the lines matching the card's terms and the section headings, and the section named in each evidence locator was then read in full by hand (the viewing commands for that reading are not recorded; the locators and revision links make it reproducible). Every card was compared with English Wikipedia (Trigonometric functions or Radian) and Swedish Wikipedia, and the 17 identity and period cards also with DLMF; the quoted wikitext (TeX as written in the source) is in each card's evidence with a link to the exact revision. No source disagrees with any card; the only differences are of notation (√2/2 or 1/√2; a/sin A or sin A/a), recorded in round 0. The script check_quotes.py (under Queries; the recorded text names the dossier by its repository path, the scratch copy by its absolute local path) then compared every Wikipedia quote with the saved wikitext of its revision after reducing both to plain text: its first run found 6 quotes whose parts were joined across intervening markup without an ellipsis or shortened with a trailing ellipsis (right-triangle cosine and tangent, tan x = sin x/cos x, sin(−x), cos 2x in cos x only and in sin x only), all corrected (it also flagged the 14 English table-row quotes, because of a bug in its own stripping of the column-header prefix, fixed in the script); the final run found every fragment except the Radian sentence whose {{tmath| {180^\circ}/{\pi} }} template the script cannot unwrap, compared by eye and verbatim.
7. Swedish text: the fronts and notes were written in Swedish directly, using Wikidata's Swedish labels and aliases (sinus, cosinus, rätvinklig triangel, hypotenusa, katet, trigonometriska ettan, sinussatsen, cosinussatsen, grad, radianer) and the terms of Swedish Wikipedia (motstående katet and närliggande katet from Trigonometrisk funktion § Geometrisk definition; perioden from Lista över trigonometriska identiteter § Perioder; udda and jämn funktion from § Symmetri; den omskrivna cirkelns radie from Sinussatsen; uttryckt i and enbart are ordinary Swedish). Decimals in the Swedish notes use the decimal comma (≈ 57,3°), as sv.wikipedia Radian writes 57,2958°. The keyword tangens is the word used in sv.wikipedia Trigonometrisk funktion; Wikidata's Swedish label of Q1129196 is "Tangens" with a capital letter, so it is not label-checked.
8. Finally the builder (python3 scripts/authored_decks.py build trigonometry) ran the Wikidata checks against live Wikidata and wrote the deck and this report, and the deck was validated with the app's SHACL and DCAT-AP validators (node scripts/validate_sources.ts trigonometry).

## Selection

Included: 40 standard facts of school trigonometry (listed in the method), each with one accepted answer given the front. Left out: tan(π/2) and tan 90°, which is undefined (the answer would be a word, not a value; the note on tan x = sin x/cos x says where tan is defined); values at other angles (π/12, 2π/3 and so on), which follow from these; the subtraction formula of tan and the half-angle, triple-angle, product-to-sum and sum-to-product formulas, beyond most school courses; cot, sec and csc, rarely taught in Swedish schools; inverse trigonometric functions and their ranges; the area formula ½ab·sin C, which is in the geometry-formulas deck; and sin(π − x), cos(π/2 − x) and similar reflection rules, of which sin(−x) and cos(−x) stand for the symmetry. The law of cosines is also a card in the geometry-formulas deck; it is kept here because it belongs with the law of sines in trigonometry, with a differently worded front. Angles in identities are real numbers (radians); the identities hold in any angle unit, the periods are given in radians on the back and in degrees in the note.

## Queries

**Machine verification of every card with SymPy (<scratch>/verify_trigonometry.py, run as: uv run --with sympy python3 <scratch>/verify_trigonometry.py)** (Derivations and SymPy verification for the Solid Memo trigonometry deck)

```
"""Machine-verify every card of the "trigonometry" deck with SymPy.

Run: uv run --with sympy python3 verify_trigonometry.py

Each card's answer (the back) is written as a SymPy expression and checked in two
independent ways:
  * symbolically: simplify(computed - claimed) == 0, where "computed" comes from
    first principles where possible (side ratios of explicit triangles, angles from
    vertex coordinates, the arc-length integral of the unit circle) and otherwise
    from SymPy's own evaluation of the functions;
  * numerically: the difference evaluated with 30-digit arithmetic (mpmath) at five
    random values of the variables, which must be below 1e-25.
Periods are also checked with sympy.periodicity, which returns the fundamental
(smallest positive) period. Deliberately wrong statements are run as negative
controls and must fail.
"""
import random

import sympy as sp

random.seed(20261004)
x, y = sp.symbols("x y", real=True)
a, b = sp.symbols("a b", positive=True)
results = []


def num_ok(expr, ranges=None):
    """|expr| < 1e-25 at five random points (30 digits); ranges: {symbol: (lo, hi)}."""
    free = sorted(expr.free_symbols, key=str)
    for _ in range(5):
        vals = {s: sp.Float(random.uniform(*(ranges or {}).get(s, (-3, 3))), 30) for s in free}
        if abs(sp.N(expr.subs(vals), 30)) >= 1e-25:
            return False
    return True


def check(cid, computed, claimed, ranges=None):
    diff = computed - claimed
    results.append((cid, sp.simplify(diff) == 0, num_ok(diff, ranges)))


# --- Exact values from first principles: side ratios of two explicit right triangles.
# Half of an equilateral triangle with side 2: legs 1 and sqrt(3), hypotenuse 2. The
# angle at the vertex (sqrt(3), 0) is computed from the coordinates and is pi/6.
P, Q = (sp.sqrt(3), 0), (0, 1)
hyp = sp.sqrt((P[0] - Q[0]) ** 2 + (P[1] - Q[1]) ** 2)
ang_P = sp.atan2(Q[1] - 0, P[0] - 0)  # angle at P between PO and PQ: tan = opposite/adjacent
assert sp.simplify(hyp - 2) == 0 and sp.simplify(sp.atan(sp.Rational(1) / sp.sqrt(3)) - sp.pi / 6) == 0
assert sp.simplify(ang_P - sp.pi / 6) == 0
s30, c30 = sp.Rational(1) / hyp, sp.sqrt(3) / hyp   # opposite 1, adjacent sqrt(3)
s60, c60 = c30, s30                                   # the other acute angle, pi/3
# Isosceles right triangle with legs 1: hypotenuse sqrt(2), angle pi/4.
s45 = c45 = 1 / sp.sqrt(2)
# Unit circle points for 0 and pi/2: (1, 0) and (0, 1).
first = {
    "sin-0": (0, 0), "sin-pi-6": (s30, sp.Rational(1, 2)), "sin-pi-4": (s45, sp.sqrt(2) / 2),
    "sin-pi-3": (s60, sp.sqrt(3) / 2), "sin-pi-2": (1, 1),
    "cos-0": (1, 1), "cos-pi-6": (c30, sp.sqrt(3) / 2), "cos-pi-4": (c45, sp.sqrt(2) / 2),
    "cos-pi-3": (c60, sp.Rational(1, 2)), "cos-pi-2": (0, 0),
    "tan-0": (0, 0), "tan-pi-6": (s30 / c30, sp.sqrt(3) / 3), "tan-pi-4": (s45 / c45, 1),
    "tan-pi-3": (s60 / c60, sp.sqrt(3)),
}
builtin = {"sin": sp.sin, "cos": sp.cos, "tan": sp.tan}
angles = {"0": (0, 0), "pi-6": (sp.pi / 6, 30), "pi-4": (sp.pi / 4, 45), "pi-3": (sp.pi / 3, 60), "pi-2": (sp.pi / 2, 90)}
for cid, (computed, claimed) in first.items():
    fn, ang = cid.split("-", 1)
    rad, deg = angles[ang]
    assert sp.rad(deg) == rad  # the degree form on the front is the same angle
    sym = sp.simplify(sp.sympify(computed) - claimed) == 0 and sp.simplify(builtin[fn](rad) - claimed) == 0
    num = abs(sp.N(builtin[fn](sp.N(rad, 40)) - sp.N(claimed, 40), 30)) < 1e-25
    results.append((cid, sym, num))
# The alternative forms in the notes: sqrt(2)/2 = 1/sqrt(2), sqrt(3)/3 = 1/sqrt(3).
check("note:sqrt2-over-2", sp.sqrt(2) / 2, 1 / sp.sqrt(2))
check("note:sqrt3-over-3", sp.sqrt(3) / 3, 1 / sp.sqrt(3))

# --- Right triangle: right angle at the origin, the acute angle theta at (b, 0), the third
# vertex (0, a). Opposite leg a, adjacent leg b, hypotenuse c = sqrt(a^2 + b^2).
theta = sp.atan2(a, b)  # the angle at (b, 0), from the coordinates
c = sp.sqrt(a**2 + b**2)
pos = {a: (0.2, 5), b: (0.2, 5)}
check("right-triangle-sine", sp.sin(theta), a / c, pos)
check("right-triangle-cosine", sp.cos(theta), b / c, pos)
check("right-triangle-tangent", sp.tan(theta), a / b, pos)

# --- Identities in one or two angles (x, y real).
check("pythagorean-identity", sp.sin(x) ** 2 + sp.cos(x) ** 2, 1)
cos_ok = {x: (-1.4, 1.4)}  # avoid cos x = 0 for tan
check("tan-in-sin-cos", sp.tan(x), sp.sin(x) / sp.cos(x), cos_ok)
check("sin-double-angle", sp.expand_trig(sp.sin(2 * x)), 2 * sp.sin(x) * sp.cos(x))
check("cos-double-angle", sp.expand_trig(sp.cos(2 * x)), sp.cos(x) ** 2 - sp.sin(x) ** 2)
check("cos-double-angle-cos", sp.expand_trig(sp.cos(2 * x)), 2 * sp.cos(x) ** 2 - 1)
check("cos-double-angle-sin", sp.expand_trig(sp.cos(2 * x)), 1 - 2 * sp.sin(x) ** 2)
# simplify() cannot close tan(2x) - 2tan x/(1 - tan²x) directly: both sides are first written in
# sin and cos (tan u = sin u/cos u), then simplified; the numeric check uses the original expressions.
tan_claim = 2 * sp.tan(x) / (1 - sp.tan(x) ** 2)
results.append(("tan-double-angle",
                sp.simplify(sp.sin(2 * x) / sp.cos(2 * x) - tan_claim.subs(sp.tan(x), sp.sin(x) / sp.cos(x))) == 0,
                num_ok(sp.tan(2 * x) - tan_claim, {x: (-0.7, 0.7)})))
check("sin-sum", sp.sin(x + y), sp.sin(x) * sp.cos(y) + sp.cos(x) * sp.sin(y))
check("sin-difference", sp.sin(x - y), sp.sin(x) * sp.cos(y) - sp.cos(x) * sp.sin(y))
check("cos-sum", sp.cos(x + y), sp.cos(x) * sp.cos(y) - sp.sin(x) * sp.sin(y))
check("cos-difference", sp.cos(x - y), sp.cos(x) * sp.cos(y) + sp.sin(x) * sp.sin(y))
check("tan-sum", sp.tan(x + y), (sp.tan(x) + sp.tan(y)) / (1 - sp.tan(x) * sp.tan(y)), {x: (-0.7, 0.7), y: (-0.7, 0.7)})
check("sin-negative-angle", sp.sin(-x), -sp.sin(x))
check("cos-negative-angle", sp.cos(-x), sp.cos(x))

# --- Law of sines and law of cosines on a triangle with the angle C at the origin, the
# vertex B = (a, 0) and the vertex A = (b cos C, b sin C), 0 < C < pi.
C = sp.symbols("C", positive=True)
Ap = sp.Matrix([b * sp.cos(C), b * sp.sin(C)])
Bp = sp.Matrix([a, 0])
Cp = sp.Matrix([0, 0])
c_len = sp.sqrt((Ap - Bp).dot(Ap - Bp))
check("law-of-cosines", sp.expand(sp.simplify((Ap - Bp).dot(Ap - Bp))), a**2 + b**2 - 2 * a * b * sp.cos(C),
      {a: (0.2, 5), b: (0.2, 5), C: (0.1, 3.0)})


def sin_at(V, U, W):
    """Sine of the interior angle at V from the coordinates: |cross(U - V, W - V)| / (|U - V| |W - V|)."""
    u, w = U - V, W - V
    return sp.Abs(u[0] * w[1] - u[1] * w[0]) / (sp.sqrt(u.dot(u)) * sp.sqrt(w.dot(w)))


sinA, sinB, sinC = sin_at(Ap, Bp, Cp), sin_at(Bp, Ap, Cp), sin_at(Cp, Ap, Bp)
sym_sines = all(sp.simplify(sp.refine(e, sp.Q.positive(sp.sin(C)))) == 0 for e in (
    sp.simplify(a / sinA - b / sinB), sp.simplify(b / sinB - c_len / sinC)))
num_sines = True
for _ in range(10):  # random triangles: the three ratios agree to 1e-25
    vals = {a: sp.Float(random.uniform(0.3, 5), 30), b: sp.Float(random.uniform(0.3, 5), 30),
            C: sp.Float(random.uniform(0.1, 3.0), 30)}
    r = [sp.N(e.subs(vals), 30) for e in (a / sinA, b / sinB, c_len / sinC)]
    num_sines &= abs(r[0] - r[1]) < 1e-25 and abs(r[1] - r[2]) < 1e-25
results.append(("law-of-sines", sym_sines, num_sines))
# The note: each ratio equals 2R, R the radius of the circumscribed circle. The circumcentre
# (a/2, k) is equidistant from C = (0, 0) and A; R is its distance from C.
k = sp.symbols("k", real=True)
k_sol = sp.solve(sp.Eq((a / 2) ** 2 + k**2, (a / 2 - Ap[0]) ** 2 + (k - Ap[1]) ** 2), k)[0]
R = sp.sqrt((a / 2) ** 2 + k_sol**2)
results.append(("note:law-of-sines-2R",
                sp.simplify(sp.refine(sp.simplify(c_len / sinC - 2 * R), sp.Q.positive(sp.sin(C)))) == 0
                or sp.simplify((c_len / sinC) ** 2 - 4 * R**2) == 0,
                num_ok(a / sinA - 2 * R, {a: (0.3, 5), b: (0.3, 5), C: (0.1, 3.0)})))
# The note's reciprocal form sin A/a = sin B/b = sin C/c holds whenever the first form does.
results.append(("note:law-of-sines-reciprocal", sp.simplify(sinA / a - sinB / b) == 0 or sym_sines,
                num_ok(sinA / a - sinB / b, {a: (0.3, 5), b: (0.3, 5), C: (0.1, 3.0)})))

# --- Radians and degrees: one full turn is the arc length of the unit circle.
phi = sp.symbols("phi", real=True)
turn = sp.integrate(sp.sqrt(sp.diff(sp.cos(phi), phi) ** 2 + sp.diff(sp.sin(phi), phi) ** 2), (phi, 0, 2 * sp.pi))
turn = sp.simplify(turn)  # = 2*pi radians for 360 degrees
check("degrees-360-in-radians", turn, 2 * sp.pi)
check("degrees-180-in-radians", turn * 180 / 360, sp.pi)
check("degree-in-radians", turn / 360, sp.pi / 180)
check("radian-in-degrees", 360 / turn, 180 / sp.pi)
wd_degree = sp.Float("0.01745329251994329576923690768488612713", 40)  # Wikidata Q28390 P2370
results.append(("wikidata:degree-P2370", True, abs(sp.N(sp.pi / 180, 40) - wd_degree) < 1e-35))
results.append(("note:radian-approx-57.3", True, abs(sp.N(180 / sp.pi, 30) - sp.Float("57.2958", 30)) < 1e-4))

# --- Periods: f(x + T) = f(x) for all x, and sympy.periodicity gives the smallest positive period.
for cid, f, T in (("period-sin", sp.sin(x), 2 * sp.pi), ("period-cos", sp.cos(x), 2 * sp.pi), ("period-tan", sp.tan(x), sp.pi)):
    sym = sp.simplify(f.subs(x, x + T) - f) == 0 and sp.periodicity(f, x) == T
    # numerically: no smaller positive T' in a grid of 1000 candidates is a period (fails at some test point)
    smaller = [T * k / 1000 for k in range(1, 1000)]
    pts = [sp.Float(random.uniform(-1.2, 1.2), 30) for _ in range(5)]
    num = num_ok(f.subs(x, x + T) - f, {x: (-1.2, 1.2)}) and all(
        any(abs(sp.N(f.subs(x, p + Tp) - f.subs(x, p), 30)) > 1e-10 for p in pts) for Tp in smaller)
    results.append((cid, sym, num))
results.append(("note:periods-in-degrees", sp.rad(360) == 2 * sp.pi and sp.rad(180) == sp.pi, True))

# --- Negative controls: deliberately wrong statements must fail.
n0 = len(results)
check("control:sin-sum-wrong-sign", sp.sin(x + y), sp.sin(x) * sp.cos(y) - sp.cos(x) * sp.sin(y))
check("control:cos-sum-wrong-sign", sp.cos(x + y), sp.cos(x) * sp.cos(y) + sp.sin(x) * sp.sin(y))
check("control:cos-double-wrong", sp.expand_trig(sp.cos(2 * x)), 2 * sp.sin(x) ** 2 - 1)
check("control:right-triangle-swapped", sp.sin(theta), b / c, pos)
results.append(("control:tan-period-2pi", sp.periodicity(sp.tan(x), x) == 2 * sp.pi, False))
negatives = results[n0:]
del results[n0:]
print("negative controls (must FAIL):", [(cid, s1, s2) for cid, s1, s2 in negatives])
assert not any(s1 or s2 for _, s1, s2 in negatives)

print(f"SymPy {sp.__version__}")
for cid, sym_ok, n_ok in results:
    print(f"{cid}: symbolic={'ok' if sym_ok else 'FAIL'} numeric={'ok' if n_ok else 'FAIL'}")
fails = [cid for cid, s1, s2 in results if not (s1 and s2)]
print(f"{len(results)} checks, {len(results) - len(fails)} passed" + (f", failed: {fails}" if fails else ""))

```

**Output of the verification run (SymPy 1.14.0)** (Derivations and SymPy verification for the Solid Memo trigonometry deck)

```
negative controls (must FAIL): [('control:sin-sum-wrong-sign', False, False), ('control:cos-sum-wrong-sign', False, False), ('control:cos-double-wrong', False, False), ('control:right-triangle-swapped', False, False), ('control:tan-period-2pi', False, False)]
SymPy 1.14.0
sin-0: symbolic=ok numeric=ok
sin-pi-6: symbolic=ok numeric=ok
sin-pi-4: symbolic=ok numeric=ok
sin-pi-3: symbolic=ok numeric=ok
sin-pi-2: symbolic=ok numeric=ok
cos-0: symbolic=ok numeric=ok
cos-pi-6: symbolic=ok numeric=ok
cos-pi-4: symbolic=ok numeric=ok
cos-pi-3: symbolic=ok numeric=ok
cos-pi-2: symbolic=ok numeric=ok
tan-0: symbolic=ok numeric=ok
tan-pi-6: symbolic=ok numeric=ok
tan-pi-4: symbolic=ok numeric=ok
tan-pi-3: symbolic=ok numeric=ok
note:sqrt2-over-2: symbolic=ok numeric=ok
note:sqrt3-over-3: symbolic=ok numeric=ok
right-triangle-sine: symbolic=ok numeric=ok
right-triangle-cosine: symbolic=ok numeric=ok
right-triangle-tangent: symbolic=ok numeric=ok
pythagorean-identity: symbolic=ok numeric=ok
tan-in-sin-cos: symbolic=ok numeric=ok
sin-double-angle: symbolic=ok numeric=ok
cos-double-angle: symbolic=ok numeric=ok
cos-double-angle-cos: symbolic=ok numeric=ok
cos-double-angle-sin: symbolic=ok numeric=ok
tan-double-angle: symbolic=ok numeric=ok
sin-sum: symbolic=ok numeric=ok
sin-difference: symbolic=ok numeric=ok
cos-sum: symbolic=ok numeric=ok
cos-difference: symbolic=ok numeric=ok
tan-sum: symbolic=ok numeric=ok
sin-negative-angle: symbolic=ok numeric=ok
cos-negative-angle: symbolic=ok numeric=ok
law-of-cosines: symbolic=ok numeric=ok
law-of-sines: symbolic=ok numeric=ok
note:law-of-sines-2R: symbolic=ok numeric=ok
note:law-of-sines-reciprocal: symbolic=ok numeric=ok
degrees-360-in-radians: symbolic=ok numeric=ok
degrees-180-in-radians: symbolic=ok numeric=ok
degree-in-radians: symbolic=ok numeric=ok
radian-in-degrees: symbolic=ok numeric=ok
wikidata:degree-P2370: symbolic=ok numeric=ok
note:radian-approx-57.3: symbolic=ok numeric=ok
period-sin: symbolic=ok numeric=ok
period-cos: symbolic=ok numeric=ok
period-tan: symbolic=ok numeric=ok
note:periods-in-degrees: symbolic=ok numeric=ok
47 checks, 47 passed

```

**Find the items of the functions, identities, laws and units (wbsearchentities) and fetch their labels, aliases, P2534 and sitelinks (<scratch>/find_items.py)** (Wikidata: items of the trigonometric functions, identities, laws and angle units, their labels, defining formulas (P2534) and conversion to SI unit (P2370))

```
"""Find the Wikidata items of the trigonometric functions, identities and laws, and fetch
their English and Swedish labels and aliases, defining formulas (P2534) and sitelinks.

Run: python3 find_items.py (writes items.json)
"""
import json
import time
import urllib.parse
import urllib.request

UA = "solid-memo deck research (https://github.com/antwika/solid-memo)"
API = "https://www.wikidata.org/w/api.php"
TERMS = [
    "sine", "cosine", "tangent", "trigonometric function", "Pythagorean trigonometric identity",
    "list of trigonometric identities", "trigonometric identity", "double-angle formula", "angle sum identity",
    "angle addition formula", "law of sines", "law of cosines", "radian", "degree", "hypotenuse", "cathetus",
    "periodic function", "period", "right triangle", "trigonometry", "unit circle", "even and odd functions",
    "tangent function", "sine function", "tangent of a sum",
]


def get(params):
    url = API + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    for attempt in range(5):
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                return json.load(r)
        except Exception:
            time.sleep(5 * (attempt + 1))
    raise RuntimeError(url)


found = {}
for t in TERMS:
    r = get({"action": "wbsearchentities", "search": t, "language": "en", "format": "json", "limit": 5, "type": "item"})
    found[t] = [(s["id"], s.get("label"), s.get("description")) for s in r.get("search", [])]
    time.sleep(0.3)
qids = sorted({q for v in found.values() for q, _, _ in v})
ents = {}
for i in range(0, len(qids), 50):
    r = get({"action": "wbgetentities", "ids": "|".join(qids[i:i + 50]), "props": "labels|aliases|descriptions|claims|sitelinks",
             "languages": "en|sv|mul", "sitefilter": "enwiki|svwiki", "format": "json"})
    for q, e in r["entities"].items():
        claims = e.get("claims", {})
        ents[q] = {
            "label": {l: v["value"] for l, v in e.get("labels", {}).items()},
            "aliases": {l: [a["value"] for a in v] for l, v in e.get("aliases", {}).items()},
            "description": e.get("descriptions", {}).get("en", {}).get("value"),
            "P2534": [c["mainsnak"].get("datavalue", {}).get("value") for c in claims.get("P2534", [])],
            "P2184": [c["mainsnak"].get("datavalue", {}).get("value") for c in claims.get("P2184", [])],
            "sitelinks": {k: v["title"] for k, v in e.get("sitelinks", {}).items()},
        }
import pathlib
(pathlib.Path(__file__).parent / "items.json").write_text(json.dumps({"search": found, "entities": ents}, ensure_ascii=False, indent=1))

```

**Second search (sum and difference formulas, period, sides) and every statement of the chosen items, among them P2370 of the degree (<scratch>/find_items2.py)** (Wikidata: items of the trigonometric functions, identities, laws and angle units, their labels, defining formulas (P2534) and conversion to SI unit (P2370))

```
"""Second search: the sum and difference formulas, and the conversion factors of the degree and
radian (P2370) plus every statement of the candidate items, written to items2.json.

Run: python3 find_items2.py (writes items2.json)
"""
import json
import pathlib
import time
import urllib.parse
import urllib.request

UA = "solid-memo deck research (https://github.com/antwika/solid-memo)"
API = "https://www.wikidata.org/w/api.php"
TERMS = ["angle sum and difference identities", "trigonometric addition formulas", "sum formula", "addition theorem",
         "sine of a sum", "angle addition", "subtraction formula", "tangent addition formula", "double angle",
         "sine law", "fundamental period", "period of a function", "opposite side", "adjacent side", "degree of arc",
         "exact trigonometric values", "special angles"]


def get(params):
    url = API + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    for attempt in range(5):
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                return json.load(r)
        except Exception:
            time.sleep(5 * (attempt + 1))
    raise RuntimeError(url)


found = {}
for t in TERMS:
    r = get({"action": "wbsearchentities", "search": t, "language": "en", "format": "json", "limit": 6, "type": "item"})
    found[t] = [(s["id"], s.get("label"), s.get("description")) for s in r.get("search", [])]
    time.sleep(0.3)
QIDS = ["Q28390", "Q33680", "Q152415", "Q1256164", "Q1129196", "Q2039117", "Q170181", "Q164321", "Q3748394",
        "Q184743", "Q126592", "Q158688", "Q104962", "Q110812", "Q273008", "Q93344", "Q8084"]
r = get({"action": "wbgetentities", "ids": "|".join(QIDS), "props": "labels|aliases|descriptions|claims|sitelinks",
         "languages": "en|sv|mul", "sitefilter": "enwiki|svwiki", "format": "json"})
ents = {}
for q, e in r["entities"].items():
    claims = {}
    for p, cs in e.get("claims", {}).items():
        claims[p] = [c["mainsnak"].get("datavalue", {}).get("value") for c in cs]
    ents[q] = {
        "label": {l: v["value"] for l, v in e.get("labels", {}).items()},
        "aliases": {l: [a["value"] for a in v] for l, v in e.get("aliases", {}).items()},
        "description": {l: v["value"] for l, v in e.get("descriptions", {}).items()},
        "claims": claims,
        "sitelinks": {k: v["title"] for k, v in e.get("sitelinks", {}).items()},
    }
(pathlib.Path(__file__).parent / "items2.json").write_text(
    json.dumps({"search": found, "entities": ents}, ensure_ascii=False, indent=1))

```

**Further candidate items found by the second search (none used on a card)** (Wikidata: items of the trigonometric functions, identities, laws and angle units, their labels, defining formulas (P2534) and conversion to SI unit (P2370))

```
curl -s -A "solid-memo deck research (https://github.com/antwika/solid-memo)" -o <scratch>/items3.json "https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q136500191|Q140142007|Q140142050|Q140471181|Q7841831|Q282331&props=labels|aliases|descriptions|claims|sitelinks&languages=en|sv|mul&sitefilter=enwiki|svwiki&format=json"
```

**Test of how the SPARQL endpoint returns a P2534 value (result: a MathML literal, so the builder cannot compare it)** (Wikidata: items of the trigonometric functions, identities, laws and angle units, their labels, defining formulas (P2534) and conversion to SI unit (P2370))

```
curl -s -A "solid-memo deck research (https://github.com/antwika/solid-memo)" -H "Accept: application/sparql-results+json" --data-urlencode "query=SELECT ?v WHERE { wd:Q2039117 wdt:P2534 ?v }" https://query.wikidata.org/sparql
```

**Licence of Wikidata** (Wikidata: items of the trigonometric functions, identities, laws and angle units, their labels, defining formulas (P2534) and conversion to SI unit (P2370))

```
curl -sL -A "solid-memo deck research (https://github.com/antwika/solid-memo)" -o <scratch>/wd-licensing.wikitext "https://www.wikidata.org/w/index.php?title=Wikidata:Licensing&action=raw"
```

**Wikitext and revision ids of the English and Swedish articles (and Wikipedia:Copyrights), and the DLMF pages §4.2, §4.14, §4.16, §4.21 and the DLMF copyright notice (<scratch>/fetch_sources.py)** (English Wikipedia: Trigonometric functions and Radian)

```
"""Fetch the verification sources: the current wikitext and revision id of the English and Swedish
Wikipedia articles (MediaWiki API, action=query&prop=revisions), and the DLMF sections and terms of use
(saved as HTML). Saves wiki/<lang>/<title>.wikitext, wiki/revisions.json and dlmf/<name>.html.

Run: python3 fetch_sources.py
"""
import json
import pathlib
import time
import urllib.parse
import urllib.request

UA = "solid-memo deck research (https://github.com/antwika/solid-memo)"
HERE = pathlib.Path(__file__).parent
TITLES = {
    "en": ["List of trigonometric identities", "Trigonometric functions", "Exact trigonometric values", "Law of sines",
           "Law of cosines", "Radian", "Degree (angle)", "Pythagorean trigonometric identity", "Sine and cosine",
           "Wikipedia:Copyrights"],
    "sv": ["Lista över trigonometriska identiteter", "Trigonometrisk funktion", "Sinussatsen", "Cosinussatsen",
           "Trigonometriska ettan", "Radian", "Grad (vinkelenhet)", "Sinus", "Cosinus", "Tangens", "Enhetscirkel",
           "Katet", "Periodisk funktion"],
}
DLMF = {"notices": "https://dlmf.nist.gov/about/notices", "4.14": "https://dlmf.nist.gov/4.14",
        "4.16": "https://dlmf.nist.gov/4.16", "4.21": "https://dlmf.nist.gov/4.21", "4.2": "https://dlmf.nist.gov/4.2"}


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    for attempt in range(5):
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                return r.read()
        except Exception:
            time.sleep(5 * (attempt + 1))
    raise RuntimeError(url)


revisions = {}
for lang, titles in TITLES.items():
    (HERE / "wiki" / lang).mkdir(parents=True, exist_ok=True)
    for t in titles:
        url = f"https://{lang}.wikipedia.org/w/api.php?" + urllib.parse.urlencode({
            "action": "query", "prop": "revisions", "titles": t, "rvprop": "ids|timestamp|content",
            "rvslots": "main", "redirects": 1, "format": "json", "formatversion": 2})
        data = json.loads(get(url))
        page = data["query"]["pages"][0]
        rev = page["revisions"][0]
        (HERE / "wiki" / lang / (t.replace("/", "_").replace(":", "_") + ".wikitext")).write_text(
            rev["slots"]["main"]["content"], encoding="utf-8")
        revisions[f"{lang}:{t}"] = {"title": page["title"], "revid": rev["revid"], "timestamp": rev["timestamp"]}
        time.sleep(0.5)
(HERE / "wiki" / "revisions.json").write_text(json.dumps(revisions, ensure_ascii=False, indent=1))
(HERE / "dlmf").mkdir(exist_ok=True)
for name, url in DLMF.items():
    (HERE / "dlmf" / f"{name}.html").write_bytes(get(url))
    time.sleep(1)
print(json.dumps(revisions, ensure_ascii=False, indent=1))

```

**DLMF pages reduced to text with the TeX of each equation (<scratch>/dlmf_text.py), then read and grepped for the equations quoted** (NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15))

```
"""Reduce the saved DLMF pages to plain text (MathML alttext kept as TeX) so they can be read and grepped.

Run: python3 dlmf_text.py (writes dlmf/<name>.txt)
"""
import html
import pathlib
import re

HERE = pathlib.Path(__file__).parent / "dlmf"
for p in sorted(HERE.glob("*.html")):
    s = p.read_text(encoding="utf-8", errors="replace")
    s = re.sub(r"<math[^>]*alttext=\"([^\"]*)\"[^>]*>.*?</math>", lambda m: " $" + html.unescape(m.group(1)) + "$ ", s, flags=re.S)
    s = re.sub(r"<script.*?</script>|<style.*?</style>", " ", s, flags=re.S)
    s = re.sub(r"<(br|p|div|tr|h\d|li)[^>]*>", "\n", s)
    s = re.sub(r"<[^>]+>", " ", s)
    s = html.unescape(s)
    s = re.sub(r"[ \t]+", " ", s)
    s = re.sub(r"\n\s*\n+", "\n", s)
    (HERE / (p.stem + ".txt")).write_text(s, encoding="utf-8")

```

**Lines of the saved articles that state each card's fact (<scratch>/wgrep.py; e.g. python3 <scratch>/wgrep.py sv "math|180|π" Sinussatsen "Trigonometriska ettan" Radian "Grad (vinkelenhet)" "Periodisk funktion", and the headings with "^=+"); the sections named in the evidence locators were then read in full by hand, with viewing commands not recorded** (Swedish Wikipedia: articles on the trigonometric functions, identities and laws)

```
"""Print the lines of saved articles matching a regex: python3 wgrep.py <lang> "<regex>" <title>...

Run: python3 wgrep.py sv "math" Sinussatsen
"""
import pathlib
import re
import sys

HERE = pathlib.Path(__file__).parent / "wiki"
lang, pat, *titles = sys.argv[1:]
for t in titles:
    for i, line in enumerate((HERE / lang / f"{t}.wikitext").read_text(encoding="utf-8").splitlines(), 1):
        if re.search(pat, line):
            print(f"{t}:{i}: {line[:400]}")

```

**Licence footer of Swedish Wikipedia (rendered page fetched, sentence extracted with <scratch>/licquotes.py together with the Wikidata and English Wikipedia licence sentences)** (Swedish Wikipedia: articles on the trigonometric functions, identities and laws)

```
curl -sL -A "solid-memo deck research (https://github.com/antwika/solid-memo)" -o <scratch>/sv-sinussatsen.html "https://sv.wikipedia.org/wiki/Sinussatsen"

"""Print the licence sentences of Wikidata, English Wikipedia and Swedish Wikipedia from the saved pages.

Run: python3 licquotes.py
"""
import pathlib
import re

HERE = pathlib.Path(__file__).parent
wd = (HERE / "wd-licensing.wikitext").read_text(encoding="utf-8")
print([l for l in wd.splitlines() if "Creative Commons Zero" in l][:2])
en = (HERE / "wiki" / "en" / "Wikipedia_Copyrights.wikitext").read_text(encoding="utf-8")
print([l[:400] for l in en.splitlines() if "Attribution-ShareAlike 4.0" in l][:2])
sv = (HERE / "sv-sinussatsen.html").read_text(encoding="utf-8")
print(re.findall(r"Wikipedias text är tillgänglig under licensen[^<]*<a[^>]*>[^<]*</a>", sv)[:1])

```

**Search for a Swedish Wikipedia article using the name "additionsformlerna" (no hits; the addition formulas are therefore asked for by their expression, not by a name)** (Swedish Wikipedia: articles on the trigonometric functions, identities and laws)

```
https://sv.wikipedia.org/w/api.php?action=query&list=search&srsearch=additionsformlerna%20trigonometri&format=json&srlimit=10
```

**Check every Wikipedia evidence quote against the saved wikitext of its revision, and the length of the description (<scratch>/check_quotes.py; final result: 1 fragment not found, the Radian {{tmath}} sentence, compared by eye; description 103 words in English, counted before round 1 changed the description, which is now 109 words)** (English Wikipedia: Trigonometric functions and Radian)

```
"""Check the Wikipedia evidence quotes of the dossier against the saved wikitext of the quoted revisions.

Each fragment of "says" (split at " … " and "; ") is looked for in the article after both are reduced:
templates such as {{mvar|θ}} and {{math|...}} and links [[a|b]] to their text, '' and <math> tags removed,
whitespace collapsed. Table-row quotes (cells joined with " | " or " || ") are checked cell by cell.
Prints every fragment not found, and the word count of the English description.

Run: python3 check_quotes.py (from the repository root; the copy that was run names the dossier by its absolute local path, replaced here by the repository path)
"""
import json
import pathlib
import re

HERE = pathlib.Path(__file__).parent
D = json.loads(pathlib.Path("packages/deck-library/authored/trigonometry.json").read_text())


def norm(s):
    for _ in range(3):
        s = re.sub(r"\{\{(?:mvar|math|tmath|pi)\|?(?:1=)?([^{}]*)\}\}", lambda m: m.group(1) or "π", s)
        s = s.replace("{{pi}}", "π")
    s = re.sub(r"\[\[(?:[^|\]]*\|)?([^\]]*)\]\]", r"\1", s)
    s = re.sub(r"</?math[^>]*>|''+|<u>|</u>|&nbsp;", " ", s)
    return re.sub(r"\s+", "", s)


missing = 0
for c in D["cards"]:
    for e in c["evidence"]:
        if e["source"] not in ("enwiki", "svwiki"):
            continue
        lang = e["source"][:2]
        title = re.match(r"\"([^\"]+)\"", e["locator"]).group(1)
        text = norm((HERE / "wiki" / lang / f"{title}.wikitext").read_text(encoding="utf-8"))
        says = re.sub(r"^Table row \(.*?\)\): |^Table row \([^)]*\): ", "", e["says"])
        frags = [f for part in re.split(r" … |; § [^:]*: ", says) for f in re.split(r" \|\|? ", part)]
        for f in frags:
            if norm(f) and norm(f) not in text:
                missing += 1
                print(c["id"], lang, title, "NOT FOUND:", f[:120])
print("fragments not found:", missing)
print("description words (en):", len(D["description"]["en"].split()), "(sv):", len(D["description"]["sv"].split()))

```

**Build, Wikidata checks and validation of the deck** (Derivations and SymPy verification for the Solid Memo trigonometry deck)

```
python3 packages/deck-library/scripts/authored_decks.py build trigonometry
node packages/deck-library/scripts/validate_sources.ts trigonometry
```

## Quality control

6 rounds, 23 findings: 18 fixed, 0 rejected after checking, 5 needing no change. Every card's Wikidata checks (119 in all) are re-run against live Wikidata by `scripts/authored_decks.py check` before every build.

### Round 0: Machine verification and source cross-checks (2026-10-04)

**Reviewer:** Claude (AI) — authoring agent, machine checks · **Scope:** All 40 cards

verify_trigonometry.py (SymPy 1.14.0) ran 47 checks (40 cards and 7 statements in the notes or comparisons with Wikidata): 47 passed, each symbolically (where a symbolic check applies) and numerically; five deliberately wrong statements used as negative controls failed as they must. Every card was compared with English and Swedish Wikipedia (quoted with revision links), the 17 identity and period cards also with the NIST DLMF, and 4 cards with a Wikidata defining formula (P2534); no source disagrees with any card. The builder's 119 Wikidata checks (118 label checks and one statement check, the degree's P2370) passed against live Wikidata. Decisions and discrepancies are logged below.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| sin-pi-4 | The sources write the value at π/4 and tan(π/6) in different forms: English Wikipedia's table √2/2 and √3/3, Swedish Wikipedia's table 1/√2 and 1/√3; both are common in schools, so a learner may give either. | The backs use the rational denominators √2/2 and √3/3 throughout (sin-pi-4, cos-pi-4, tan-pi-6), and a back note on each says "Also written 1/√2." / "Skrivs även 1/√2." (or 1/√3); the equality is checked by SymPy. | fixed |
| law-of-sines | The law of sines has two equally standard reciprocal forms (a/sin A = … and sin A/a = …; both in English Wikipedia and in Swedish Wikipedia's Sinussatsen), so a front that only names the law would have two right answers; the geometry-formulas deck left the law out for this reason. | The front asks for the form "with the sides over the sines" / "skriven med sidorna i täljaren", and the back note gives the reciprocal form and that each ratio is 2R. | fixed |
| cos-double-angle | cos 2x has three standard forms (cos²x − sin²x, 2cos²x − 1, 1 − 2sin²x). | Three cards, each asking for the form in the variables named on the front (cos x and sin x; cos x only; sin x only), and a note on the first naming the other two. | fixed |
| tan-double-angle | On the first run of the script, simplify(tan 2x − 2 tan x/(1 − tan²x)) did not reduce to 0 (the numerical check passed). | Both sides are now written in sin and cos before simplifying (tan u = sin u/cos u), which reduces to 0; the numerical check still uses the original expressions. Re-run: 47 of 47 pass. | fixed |
| sin-sum | No Swedish source fetched gives a settled Swedish name for the addition formulas (a Swedish Wikipedia search for "additionsformlerna" found nothing; Lista över trigonometriska identiteter lists them under "Samband för två vinklar" without a name). | The five addition-formula cards and the five double-angle cards ask for the expression ("sin(x + y) uttryckt i sin och cos för x och y") rather than a named formula. The Swedish deck description uses "additionsformlerna" and "formlerna för dubbla vinkeln" as descriptive phrases. (Round 2 later replaced "additionsformlerna" in the description with the expressions sin(x ± y), cos(x ± y), tan(x + y).) | fixed |
| law-of-cosines | The geometry-formulas deck already has a law-of-cosines card with the same answer. | Kept, since the brief asks for it and it belongs with the law of sines; the front is worded differently ("Law of cosines for a triangle with sides a, b, c and the angle C opposite c"). Noted in the selection. | no change needed |
| right-triangle-sine | Wikidata's defining formulas of sine (Q152415, "\sin(\alpha) = \frac{b}{c}") and cosine (Q1256164, "\cos\,\theta = \frac{\text{AC}}{\text{AB}}") use letters of a figure the statements do not define; they cannot be compared with the cards' a, b, c. | Not used as evidence; the right-triangle cards are checked against English and Swedish Wikipedia and by SymPy, and their Wikidata checks are label checks of the terms on the front. | no change needed |
| period-tan | DLMF eqs. 4.14.8–4.14.10 state that 2π (π for tan) is a period, not that it is the smallest one. | The smallest period is confirmed by English Wikipedia (§ Periods: "This is the smallest period, except for the tangent and the cotangent, which have π as smallest period"), Swedish Wikipedia and sympy.periodicity, plus a numerical search over smaller candidates; the DLMF evidence says what it does not state. | no change needed |
| tan-0 | Wikidata's Swedish label of the tangent (Q1129196) is "Tangens" with a capital letter, unlike sinus and cosinus. | No Swedish label check for the tangent; no front uses the Swedish word. The tan cards check the English label "tangent" and the alias "tan". | no change needed |

### Round 1: Factual accuracy (2026-10-04)

**Reviewer:** Claude (AI) — independent Factual accuracy reviewer · **Scope:** All 40 cards, the description, method and evidence; independent SymPy re-check, live Wikidata, DLMF and the cited Wikipedia revisions

No factual error on any card. One warning (the description claimed an exact value of tan at π/2, which is undefined) and two suggestions on the wording of cos-double-angle and on notation; all three verified and fixed (slash notation kept, see below).

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| deck | The description listed exact values of sin, cos and tan at 0, π/6, π/4, π/3 and π/2, but tan(π/2) is undefined and the deck has no such card (the selection says so); the description also did not mention the tan x = sin x/cos x card. | Verified: the 14 value cards have tan only at 0, π/6, π/4 and π/3, and English Wikipedia's table gives tan at π/2 as undefined, Swedish Wikipedia's as "Ej definierad". The description (en and sv) now says sin and cos at 0, π/6, π/4, π/3 and π/2 and tan at 0, π/6, π/4 and π/3, and names tan x = sin x/cos x; the English is 109 words. | fixed |
| cos-double-angle | The front "cos 2x in terms of cos x and sin x" is also answered correctly by 2cos²x − 1 and 1 − 2sin²x, which are expressions in cos x and sin x too, so the front did not single out cos²x − sin²x. | Agreed. The front now reads "cos 2x in terms of both cos x and sin x, as a difference of squares" / "cos 2x uttryckt i både cos x och sin x, som en skillnad mellan kvadrater"; of the three forms in DLMF 4.21.28 only cos²x − sin²x uses both and is a difference of squares. | fixed |
| tan-double-angle | Linear slash notation (sin x/cos x, 2 tan x/(1 − tan²x), a/sin A) could strictly be misparsed; spacing between a coefficient and a function varied (2 sin x vs 2cos²x). | Slash notation kept: read with the usual precedence it is unambiguous, it is the plain-text form DLMF itself uses (4.14.4 "tan z = sin z/cos z", 4.21.29), and the method now states the reading. Fixed: a numeric coefficient is now followed by a space throughout, as in 2 sin x cos x and 2 tan x: the backs of cos-double-angle-cos (2 cos²x − 1) and cos-double-angle-sin (1 − 2 sin²x) and the note of cos-double-angle in both languages. The · in 2ab·cos C is kept, as a separator between the product of the sides and the cosine, and the method now states both conventions. | fixed |

### Round 2: Language, translation and language tags (2026-10-04)

**Reviewer:** Claude (AI) — independent Language, translation and language tags reviewer · **Scope:** All 40 cards, title, description, keywords and the built TTL (language tags, Unicode, Swedish terminology)

No language errors; tags, Unicode and Swedish terms confirmed. Three suggestions, all verified and applied.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| right-triangle-sine | The Swedish fronts of the three right-triangle cards said "a motstående katet, b närliggande katet" without naming the angle, while the English says "the leg opposite θ" and "the leg adjacent to θ". | Fixed on right-triangle-sine, right-triangle-cosine and right-triangle-tangent: "a motstående katet till θ, b närliggande katet till θ och c hypotenusan", keeping the terms of Swedish Wikipedia's Trigonometrisk funktion. | fixed |
| deck | The description called the sum and difference formulas "addition formulas" / "additionsformlerna", while the method said no Swedish source fetched gives a settled name for them, and the deck also has the subtraction formulas. | The description now lists them by expression, sin(x ± y), cos(x ± y) and tan(x + y), in both languages, and the method sentence now says the formulas are asked for and listed by expression so that no card depends on knowing a name. | fixed |
| cos-double-angle-cos | Inconsistent spacing between a numeric coefficient and a function name on the backs (2 sin x cos x, 2 tan x vs 2cos²x − 1, 1 − 2sin²x; 2ab·cos C) and in the cos-double-angle note. | Fixed: a numeric coefficient is now followed by a space throughout, as in 2 sin x cos x and 2 tan x: the backs of cos-double-angle-cos (2 cos²x − 1) and cos-double-angle-sin (1 − 2 sin²x) and the note of cos-double-angle in both languages. The · in 2ab·cos C is kept, as a separator between the product of the sides and the cosine, and the method now states both conventions. | fixed |

### Round 3: Licensing, attribution and documentation (2026-10-04)

**Reviewer:** Claude (AI) — independent Licensing, attribution and documentation reviewer · **Scope:** Every source's licence page, the deck licence, every Wikipedia quote against its revision, DLMF equation numbers, Wikidata items, method, queries and selection

Licensing and attribution confirmed sound (CC0 from Wikidata and the compiler's derivation; Wikipedia and DLMF verification only). Two warnings (an absolute local path in a recorded script; an extra AI-authorship remark in the method) and two documentation suggestions fixed; the creator-string suggestion needs no change.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| deck | The recorded text of check_quotes.py named the dossier by an absolute local filesystem path, which was published in the report. | Verified. The recorded script now names the dossier by its repository path (packages/deck-library/authored/trigonometry.json, run from the repository root), and its run line and the method say that the copy actually run used the absolute local path, replaced in the record. | fixed |
| deck | The cross-checking method step said cards were compared "by the authoring AI agent", an AI-authorship remark outside the required who-did-the-work paragraph. | Removed; the sentence now reads "Every card was compared with English Wikipedia …". | fixed |
| sin-0 | The Swedish Wikipedia table-row quotes on the 14 exact-value cards omit the row's leading i varv cell and trailing cot, sec and csc cells without saying so. | Verified against the saved revision 56572109 (§ Värdetabell has the columns i varv, grader, radianer, sin α, cos α, tan α, cot α, sec α, csc α). On all 14 value cards the label now reads "Table row, cells grader \|\| radianer \|\| sin α \|\| cos α \|\| tan α (the cells i varv, cot α, sec α and csc α of the row omitted)"; the quoted cells are unchanged. | fixed |
| deck | The method said wgrep.py, grep and sed listed and read the evidence lines, but no grep or sed commands are recorded. | The method and the wgrep.py query entry now say that wgrep.py located the lines and headings and that the section named in each evidence locator was then read in full by hand, with the viewing commands not recorded; the locators and revision links make the evidence reproducible. | fixed |
| deck | The creator of the derivation source names Claude, as in 7 other authored decks. | No change: it is attribution of the derivation source, consistent with the library's other decks, not a remark about authorship or review. | no change needed |

### Round 4: Re-check of changed cards and a sample (facts, language, documentation) (2026-10-04)

**Reviewer:** Claude (AI) — independent re-check reviewer · **Scope:** 29 cards: the 20 changed in rounds 1–3 plus every third card in dossier order; metadata, description, keywords, method, queries, licensing; cited Wikipedia revisions, DLMF Release 1.2.8 equations and live Wikidata checks

Every fix logged in rounds 1–3 confirmed as made; facts, uniqueness of answers, language tags, Swedish terms, licensing and documentation found sound. One notation suggestion, fixed.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| cos-double-angle-cos | The derivation evidence of cos-double-angle-cos and cos-double-angle-sin still wrote the forms without the coefficient space ("(2cos²x − 1)", "(1 − 2sin²x)") after the backs were changed to "2 cos²x − 1" and "1 − 2 sin²x" in rounds 1 and 2. | Verified: the two 'says' texts are the dossier's own description of the check (only "symbolic=ok numeric=ok" is script output), so they now use the backs' notation, "(2 cos²x − 1)" and "(1 − 2 sin²x)". The DLMF 4.21.28 quotes keep DLMF's own notation (2cos²z − 1, 1 − 2sin²z), since they quote the source. | fixed |

### Round 5: Final full-deck review (facts and language) (2026-10-04)

**Reviewer:** Claude (AI) — independent final reviewer · **Scope:** All 40 cards; title, description, keywords, settings, selection, the 119 Wikidata checks against live Wikidata, and the fixes of rounds 1–4

No errors and no warnings: every back is correct, each front has exactly one right answer, tags, notation and Swedish terms are consistent, and the fixes of rounds 1–4 are in place. Two suggestions about out-of-date wording in the dossier's own documentation, both verified and fixed; no card changed.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| deck | The purpose of the recorded check_quotes.py query says "description 103 words in English", but the English description is now 109 words (round 1 lengthened it). | Verified: the English description has 109 words. The purpose now says the 103 was counted before round 1 changed the description, which is now 109 words; the script's result is kept as it was recorded. | fixed |
| sin-sum | The round 0 resolution says the Swedish description uses "additionsformlerna" as a descriptive phrase, but round 2 replaced it with the expressions, so the word is no longer in the description. | Verified: description.sv no longer contains "additionsformlerna". The round 0 entry is kept as the historical record, with a note that round 2 later replaced the word with sin(x ± y), cos(x ± y), tan(x + y). | fixed |

## Cards and evidence

| Card | Front | Back | Evidence |
|---|---|---|---|
| `sin-0` | Exact value of sin 0, i.e. sin 0° (en) / Exakta värdet av sin 0, dvs. sin 0° (sv) | 0 (zxx) | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "sin-0" — From the point (1, 0) of the unit circle: sin = y = 0; SymPy's sin(0) = 0; rad(0) = 0. symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Trigonometric functions", § Simple algebraic values, revision 1374535148: https://en.wikipedia.org/w/index.php?title=Trigonometric_functions&oldid=1374535148 — Table row (angle in radians \| degrees \| sin(θ) \| cos(θ) \| tan(θ)): 0 \| 0^\circ \| 0 \| 1 \| 0; § Algebraic values: \sin 0 &= \sin 0^\circ &&= \frac{\sqrt{0}}{2} &&= 0<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Trigonometrisk funktion", § Värdetabell, revision 56572109: https://sv.wikipedia.org/w/index.php?title=Trigonometrisk_funktion&oldid=56572109 — Table row, cells grader \|\| radianer \|\| sin α \|\| cos α \|\| tan α (the cells i varv, cot α, sec α and csc α of the row omitted): 0^\circ \|\| 0 \|\| 0 \|\| 1 \|\| 0<br>Wikidata: items of the trigonometric functions, identities, laws and angle units, their labels, defining formulas (P2534) and conversion to SI unit (P2370): Q152415 (sine) — en label "sine", en alias "sin", sv label "sinus"<br>Wikidata checks: Q152415 en = sine, Q152415 en = sin, Q152415 sv = sinus |
| `sin-pi-6` | Exact value of sin(π/6), i.e. sin 30° (en) / Exakta värdet av sin(π/6), dvs. sin 30° (sv) | 1/2 (zxx) | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "sin-pi-6" — From half of an equilateral triangle with side 2 (legs 1 and √3, hypotenuse 2, the angle at (√3, 0) computed from the coordinates as π/6): opposite/hypotenuse = 1/2; SymPy's sin(π/6) = 1/2; rad(30) = π/6. symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Trigonometric functions", § Simple algebraic values, revision 1374535148: https://en.wikipedia.org/w/index.php?title=Trigonometric_functions&oldid=1374535148 — Table row (angle in radians \| degrees \| sin(θ) \| cos(θ) \| tan(θ)): \frac{\pi}{6} \| 30^\circ \| \frac{1}{2} \| \frac{\sqrt{3}}{2} \| \frac{\sqrt{3}}{3}; § Algebraic values: \sin \frac\pi6 &= \sin 30^\circ &&= \frac{\sqrt1}2 &&= \frac{1}{2}<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Trigonometrisk funktion", § Värdetabell, revision 56572109: https://sv.wikipedia.org/w/index.php?title=Trigonometrisk_funktion&oldid=56572109 — Table row, cells grader \|\| radianer \|\| sin α \|\| cos α \|\| tan α (the cells i varv, cot α, sec α and csc α of the row omitted): 30^\circ \|\| \frac{\pi}{6} \|\| \frac{1}{2} \|\| \frac{\sqrt3}{2} \|\| \frac{1}{\sqrt3}<br>Wikidata: items of the trigonometric functions, identities, laws and angle units, their labels, defining formulas (P2534) and conversion to SI unit (P2370): Q152415 (sine) — en label "sine", en alias "sin", sv label "sinus"<br>Wikidata checks: Q152415 en = sine, Q152415 en = sin, Q152415 sv = sinus |
| `sin-pi-4` | Exact value of sin(π/4), i.e. sin 45° (en) / Exakta värdet av sin(π/4), dvs. sin 45° (sv) | √2/2 (zxx) — *Also written 1/√2. (en) / Skrivs även 1/√2. (sv)* | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "sin-pi-4" — From the isosceles right triangle with legs 1 and hypotenuse √2: opposite/hypotenuse = √2/2; SymPy's sin(π/4) = √2/2; rad(45) = π/4. The note's form checked as "note:sqrt2-over-2". symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Trigonometric functions", § Simple algebraic values, revision 1374535148: https://en.wikipedia.org/w/index.php?title=Trigonometric_functions&oldid=1374535148 — Table row (angle in radians \| degrees \| sin(θ) \| cos(θ) \| tan(θ)): \frac{\pi}{4} \| 45^\circ \| \frac{\sqrt{2}}{2} \| \frac{\sqrt{2}}{2} \| 1; § Algebraic values: \sin \frac\pi4 &= \sin 45^\circ &&= \frac{\sqrt{2}}{2} &&= \frac{1}{\sqrt{2}}<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Trigonometrisk funktion", § Värdetabell, revision 56572109: https://sv.wikipedia.org/w/index.php?title=Trigonometrisk_funktion&oldid=56572109 — Table row, cells grader \|\| radianer \|\| sin α \|\| cos α \|\| tan α (the cells i varv, cot α, sec α and csc α of the row omitted): 45^\circ \|\| \frac{\pi}{4} \|\| \frac{1}{\sqrt2} \|\| \frac{1}{\sqrt2} \|\| 1<br>Wikidata: items of the trigonometric functions, identities, laws and angle units, their labels, defining formulas (P2534) and conversion to SI unit (P2370): Q152415 (sine) — en label "sine", en alias "sin", sv label "sinus"<br>Wikidata checks: Q152415 en = sine, Q152415 en = sin, Q152415 sv = sinus |
| `sin-pi-3` | Exact value of sin(π/3), i.e. sin 60° (en) / Exakta värdet av sin(π/3), dvs. sin 60° (sv) | √3/2 (zxx) | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "sin-pi-3" — From the other acute angle (π/3) of the half equilateral triangle with legs 1 and √3 and hypotenuse 2: opposite/hypotenuse = √3/2; SymPy's sin(π/3) = √3/2; rad(60) = π/3. symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Trigonometric functions", § Simple algebraic values, revision 1374535148: https://en.wikipedia.org/w/index.php?title=Trigonometric_functions&oldid=1374535148 — Table row (angle in radians \| degrees \| sin(θ) \| cos(θ) \| tan(θ)): \frac{\pi}{3} \| 60^\circ \| \frac{\sqrt{3}}{2} \| \frac{1}{2} \| \sqrt{3}; § Algebraic values: \sin \frac\pi3 &= \sin 60^\circ &&= \frac{\sqrt{3}}{2}<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Trigonometrisk funktion", § Värdetabell, revision 56572109: https://sv.wikipedia.org/w/index.php?title=Trigonometrisk_funktion&oldid=56572109 — Table row, cells grader \|\| radianer \|\| sin α \|\| cos α \|\| tan α (the cells i varv, cot α, sec α and csc α of the row omitted): 60^\circ \|\| \frac{\pi}{3} \|\| \frac{\sqrt3}{2} \|\| \frac{1}{2} \|\| \sqrt3<br>Wikidata: items of the trigonometric functions, identities, laws and angle units, their labels, defining formulas (P2534) and conversion to SI unit (P2370): Q152415 (sine) — en label "sine", en alias "sin", sv label "sinus"<br>Wikidata checks: Q152415 en = sine, Q152415 en = sin, Q152415 sv = sinus |
| `sin-pi-2` | Exact value of sin(π/2), i.e. sin 90° (en) / Exakta värdet av sin(π/2), dvs. sin 90° (sv) | 1 (zxx) | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "sin-pi-2" — From the point (0, 1) of the unit circle: sin = y = 1; SymPy's sin(π/2) = 1; rad(90) = π/2. symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Trigonometric functions", § Simple algebraic values, revision 1374535148: https://en.wikipedia.org/w/index.php?title=Trigonometric_functions&oldid=1374535148 — Table row (angle in radians \| degrees \| sin(θ) \| cos(θ) \| tan(θ)): \frac{\pi}{2} \| 90^\circ \| 1 \| 0 \| {{n/a\|undefined}}; § Algebraic values: \sin \frac\pi2 &= \sin 90^\circ &&= \frac{\sqrt4}2 &&= 1<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Trigonometrisk funktion", § Värdetabell, revision 56572109: https://sv.wikipedia.org/w/index.php?title=Trigonometrisk_funktion&oldid=56572109 — Table row, cells grader \|\| radianer \|\| sin α \|\| cos α \|\| tan α (the cells i varv, cot α, sec α and csc α of the row omitted): 90^\circ \|\| \frac{\pi}{2} \|\| 1 \|\| 0 \|\| Ej definierad<br>Wikidata: items of the trigonometric functions, identities, laws and angle units, their labels, defining formulas (P2534) and conversion to SI unit (P2370): Q152415 (sine) — en label "sine", en alias "sin", sv label "sinus"<br>Wikidata checks: Q152415 en = sine, Q152415 en = sin, Q152415 sv = sinus |
| `cos-0` | Exact value of cos 0, i.e. cos 0° (en) / Exakta värdet av cos 0, dvs. cos 0° (sv) | 1 (zxx) | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "cos-0" — From the point (1, 0) of the unit circle: cos = x = 1; SymPy's cos(0) = 1; rad(0) = 0. symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Trigonometric functions", § Simple algebraic values, revision 1374535148: https://en.wikipedia.org/w/index.php?title=Trigonometric_functions&oldid=1374535148 — Table row (angle in radians \| degrees \| sin(θ) \| cos(θ) \| tan(θ)): 0 \| 0^\circ \| 0 \| 1 \| 0<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Trigonometrisk funktion", § Värdetabell, revision 56572109: https://sv.wikipedia.org/w/index.php?title=Trigonometrisk_funktion&oldid=56572109 — Table row, cells grader \|\| radianer \|\| sin α \|\| cos α \|\| tan α (the cells i varv, cot α, sec α and csc α of the row omitted): 0^\circ \|\| 0 \|\| 0 \|\| 1 \|\| 0<br>Wikidata: items of the trigonometric functions, identities, laws and angle units, their labels, defining formulas (P2534) and conversion to SI unit (P2370): Q1256164 (cosine) — en label "cosine", en alias "cos", sv label "cosinus"<br>Wikidata checks: Q1256164 en = cosine, Q1256164 en = cos, Q1256164 sv = cosinus |
| `cos-pi-6` | Exact value of cos(π/6), i.e. cos 30° (en) / Exakta värdet av cos(π/6), dvs. cos 30° (sv) | √3/2 (zxx) | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "cos-pi-6" — From half of an equilateral triangle with side 2 (legs 1 and √3, hypotenuse 2, the angle at (√3, 0) computed from the coordinates as π/6): adjacent/hypotenuse = √3/2; SymPy's cos(π/6) = √3/2; rad(30) = π/6. symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Trigonometric functions", § Simple algebraic values, revision 1374535148: https://en.wikipedia.org/w/index.php?title=Trigonometric_functions&oldid=1374535148 — Table row (angle in radians \| degrees \| sin(θ) \| cos(θ) \| tan(θ)): \frac{\pi}{6} \| 30^\circ \| \frac{1}{2} \| \frac{\sqrt{3}}{2} \| \frac{\sqrt{3}}{3}<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Trigonometrisk funktion", § Värdetabell, revision 56572109: https://sv.wikipedia.org/w/index.php?title=Trigonometrisk_funktion&oldid=56572109 — Table row, cells grader \|\| radianer \|\| sin α \|\| cos α \|\| tan α (the cells i varv, cot α, sec α and csc α of the row omitted): 30^\circ \|\| \frac{\pi}{6} \|\| \frac{1}{2} \|\| \frac{\sqrt3}{2} \|\| \frac{1}{\sqrt3}<br>Wikidata: items of the trigonometric functions, identities, laws and angle units, their labels, defining formulas (P2534) and conversion to SI unit (P2370): Q1256164 (cosine) — en label "cosine", en alias "cos", sv label "cosinus"<br>Wikidata checks: Q1256164 en = cosine, Q1256164 en = cos, Q1256164 sv = cosinus |
| `cos-pi-4` | Exact value of cos(π/4), i.e. cos 45° (en) / Exakta värdet av cos(π/4), dvs. cos 45° (sv) | √2/2 (zxx) — *Also written 1/√2. (en) / Skrivs även 1/√2. (sv)* | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "cos-pi-4" — From the isosceles right triangle with legs 1 and hypotenuse √2: adjacent/hypotenuse = √2/2; SymPy's cos(π/4) = √2/2; rad(45) = π/4. The note's form checked as "note:sqrt2-over-2". symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Trigonometric functions", § Simple algebraic values, revision 1374535148: https://en.wikipedia.org/w/index.php?title=Trigonometric_functions&oldid=1374535148 — Table row (angle in radians \| degrees \| sin(θ) \| cos(θ) \| tan(θ)): \frac{\pi}{4} \| 45^\circ \| \frac{\sqrt{2}}{2} \| \frac{\sqrt{2}}{2} \| 1<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Trigonometrisk funktion", § Värdetabell, revision 56572109: https://sv.wikipedia.org/w/index.php?title=Trigonometrisk_funktion&oldid=56572109 — Table row, cells grader \|\| radianer \|\| sin α \|\| cos α \|\| tan α (the cells i varv, cot α, sec α and csc α of the row omitted): 45^\circ \|\| \frac{\pi}{4} \|\| \frac{1}{\sqrt2} \|\| \frac{1}{\sqrt2} \|\| 1<br>Wikidata: items of the trigonometric functions, identities, laws and angle units, their labels, defining formulas (P2534) and conversion to SI unit (P2370): Q1256164 (cosine) — en label "cosine", en alias "cos", sv label "cosinus"<br>Wikidata checks: Q1256164 en = cosine, Q1256164 en = cos, Q1256164 sv = cosinus |
| `cos-pi-3` | Exact value of cos(π/3), i.e. cos 60° (en) / Exakta värdet av cos(π/3), dvs. cos 60° (sv) | 1/2 (zxx) | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "cos-pi-3" — From the other acute angle (π/3) of the half equilateral triangle with legs 1 and √3 and hypotenuse 2: adjacent/hypotenuse = 1/2; SymPy's cos(π/3) = 1/2; rad(60) = π/3. symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Trigonometric functions", § Simple algebraic values, revision 1374535148: https://en.wikipedia.org/w/index.php?title=Trigonometric_functions&oldid=1374535148 — Table row (angle in radians \| degrees \| sin(θ) \| cos(θ) \| tan(θ)): \frac{\pi}{3} \| 60^\circ \| \frac{\sqrt{3}}{2} \| \frac{1}{2} \| \sqrt{3}<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Trigonometrisk funktion", § Värdetabell, revision 56572109: https://sv.wikipedia.org/w/index.php?title=Trigonometrisk_funktion&oldid=56572109 — Table row, cells grader \|\| radianer \|\| sin α \|\| cos α \|\| tan α (the cells i varv, cot α, sec α and csc α of the row omitted): 60^\circ \|\| \frac{\pi}{3} \|\| \frac{\sqrt3}{2} \|\| \frac{1}{2} \|\| \sqrt3<br>Wikidata: items of the trigonometric functions, identities, laws and angle units, their labels, defining formulas (P2534) and conversion to SI unit (P2370): Q1256164 (cosine) — en label "cosine", en alias "cos", sv label "cosinus"<br>Wikidata checks: Q1256164 en = cosine, Q1256164 en = cos, Q1256164 sv = cosinus |
| `cos-pi-2` | Exact value of cos(π/2), i.e. cos 90° (en) / Exakta värdet av cos(π/2), dvs. cos 90° (sv) | 0 (zxx) | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "cos-pi-2" — From the point (0, 1) of the unit circle: cos = x = 0; SymPy's cos(π/2) = 0; rad(90) = π/2. symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Trigonometric functions", § Simple algebraic values, revision 1374535148: https://en.wikipedia.org/w/index.php?title=Trigonometric_functions&oldid=1374535148 — Table row (angle in radians \| degrees \| sin(θ) \| cos(θ) \| tan(θ)): \frac{\pi}{2} \| 90^\circ \| 1 \| 0 \| {{n/a\|undefined}}<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Trigonometrisk funktion", § Värdetabell, revision 56572109: https://sv.wikipedia.org/w/index.php?title=Trigonometrisk_funktion&oldid=56572109 — Table row, cells grader \|\| radianer \|\| sin α \|\| cos α \|\| tan α (the cells i varv, cot α, sec α and csc α of the row omitted): 90^\circ \|\| \frac{\pi}{2} \|\| 1 \|\| 0 \|\| Ej definierad<br>Wikidata: items of the trigonometric functions, identities, laws and angle units, their labels, defining formulas (P2534) and conversion to SI unit (P2370): Q1256164 (cosine) — en label "cosine", en alias "cos", sv label "cosinus"<br>Wikidata checks: Q1256164 en = cosine, Q1256164 en = cos, Q1256164 sv = cosinus |
| `tan-0` | Exact value of tan 0, i.e. tan 0° (en) / Exakta värdet av tan 0, dvs. tan 0° (sv) | 0 (zxx) | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "tan-0" — From the point (1, 0) of the unit circle: tan = y/x = 0; SymPy's tan(0) = 0; rad(0) = 0. symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Trigonometric functions", § Simple algebraic values, revision 1374535148: https://en.wikipedia.org/w/index.php?title=Trigonometric_functions&oldid=1374535148 — Table row (angle in radians \| degrees \| sin(θ) \| cos(θ) \| tan(θ)): 0 \| 0^\circ \| 0 \| 1 \| 0<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Trigonometrisk funktion", § Värdetabell, revision 56572109: https://sv.wikipedia.org/w/index.php?title=Trigonometrisk_funktion&oldid=56572109 — Table row, cells grader \|\| radianer \|\| sin α \|\| cos α \|\| tan α (the cells i varv, cot α, sec α and csc α of the row omitted): 0^\circ \|\| 0 \|\| 0 \|\| 1 \|\| 0<br>Wikidata: items of the trigonometric functions, identities, laws and angle units, their labels, defining formulas (P2534) and conversion to SI unit (P2370): Q1129196 (tangent) — en label "tangent", en alias "tan"<br>Wikidata checks: Q1129196 en = tangent, Q1129196 en = tan |
| `tan-pi-6` | Exact value of tan(π/6), i.e. tan 30° (en) / Exakta värdet av tan(π/6), dvs. tan 30° (sv) | √3/3 (zxx) — *Also written 1/√3. (en) / Skrivs även 1/√3. (sv)* | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "tan-pi-6" — From half of an equilateral triangle with side 2 (legs 1 and √3, hypotenuse 2, the angle at (√3, 0) computed from the coordinates as π/6): opposite/adjacent = √3/3; SymPy's tan(π/6) = √3/3; rad(30) = π/6. The note's form checked as "note:sqrt3-over-3". symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Trigonometric functions", § Simple algebraic values, revision 1374535148: https://en.wikipedia.org/w/index.php?title=Trigonometric_functions&oldid=1374535148 — Table row (angle in radians \| degrees \| sin(θ) \| cos(θ) \| tan(θ)): \frac{\pi}{6} \| 30^\circ \| \frac{1}{2} \| \frac{\sqrt{3}}{2} \| \frac{\sqrt{3}}{3}<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Trigonometrisk funktion", § Värdetabell, revision 56572109: https://sv.wikipedia.org/w/index.php?title=Trigonometrisk_funktion&oldid=56572109 — Table row, cells grader \|\| radianer \|\| sin α \|\| cos α \|\| tan α (the cells i varv, cot α, sec α and csc α of the row omitted): 30^\circ \|\| \frac{\pi}{6} \|\| \frac{1}{2} \|\| \frac{\sqrt3}{2} \|\| \frac{1}{\sqrt3}<br>Wikidata: items of the trigonometric functions, identities, laws and angle units, their labels, defining formulas (P2534) and conversion to SI unit (P2370): Q1129196 (tangent) — en label "tangent", en alias "tan"<br>Wikidata checks: Q1129196 en = tangent, Q1129196 en = tan |
| `tan-pi-4` | Exact value of tan(π/4), i.e. tan 45° (en) / Exakta värdet av tan(π/4), dvs. tan 45° (sv) | 1 (zxx) | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "tan-pi-4" — From the isosceles right triangle with legs 1 and hypotenuse √2: opposite/adjacent = 1; SymPy's tan(π/4) = 1; rad(45) = π/4. symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Trigonometric functions", § Simple algebraic values, revision 1374535148: https://en.wikipedia.org/w/index.php?title=Trigonometric_functions&oldid=1374535148 — Table row (angle in radians \| degrees \| sin(θ) \| cos(θ) \| tan(θ)): \frac{\pi}{4} \| 45^\circ \| \frac{\sqrt{2}}{2} \| \frac{\sqrt{2}}{2} \| 1<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Trigonometrisk funktion", § Värdetabell, revision 56572109: https://sv.wikipedia.org/w/index.php?title=Trigonometrisk_funktion&oldid=56572109 — Table row, cells grader \|\| radianer \|\| sin α \|\| cos α \|\| tan α (the cells i varv, cot α, sec α and csc α of the row omitted): 45^\circ \|\| \frac{\pi}{4} \|\| \frac{1}{\sqrt2} \|\| \frac{1}{\sqrt2} \|\| 1<br>Wikidata: items of the trigonometric functions, identities, laws and angle units, their labels, defining formulas (P2534) and conversion to SI unit (P2370): Q1129196 (tangent) — en label "tangent", en alias "tan"<br>Wikidata checks: Q1129196 en = tangent, Q1129196 en = tan |
| `tan-pi-3` | Exact value of tan(π/3), i.e. tan 60° (en) / Exakta värdet av tan(π/3), dvs. tan 60° (sv) | √3 (zxx) | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "tan-pi-3" — From the other acute angle (π/3) of the half equilateral triangle with legs 1 and √3 and hypotenuse 2: opposite/adjacent = √3; SymPy's tan(π/3) = √3; rad(60) = π/3. symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Trigonometric functions", § Simple algebraic values, revision 1374535148: https://en.wikipedia.org/w/index.php?title=Trigonometric_functions&oldid=1374535148 — Table row (angle in radians \| degrees \| sin(θ) \| cos(θ) \| tan(θ)): \frac{\pi}{3} \| 60^\circ \| \frac{\sqrt{3}}{2} \| \frac{1}{2} \| \sqrt{3}<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Trigonometrisk funktion", § Värdetabell, revision 56572109: https://sv.wikipedia.org/w/index.php?title=Trigonometrisk_funktion&oldid=56572109 — Table row, cells grader \|\| radianer \|\| sin α \|\| cos α \|\| tan α (the cells i varv, cot α, sec α and csc α of the row omitted): 60^\circ \|\| \frac{\pi}{3} \|\| \frac{\sqrt3}{2} \|\| \frac{1}{2} \|\| \sqrt3<br>Wikidata: items of the trigonometric functions, identities, laws and angle units, their labels, defining formulas (P2534) and conversion to SI unit (P2370): Q1129196 (tangent) — en label "tangent", en alias "tan"<br>Wikidata checks: Q1129196 en = tangent, Q1129196 en = tan |
| `right-triangle-sine` | sin θ in a right triangle where θ is an acute angle, a the leg opposite θ, b the leg adjacent to θ and c the hypotenuse (en) / sin θ i en rätvinklig triangel där θ är en spetsig vinkel, a motstående katet till θ, b närliggande katet till θ och c hypotenusan (sv) | a/c (zxx) | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "right-triangle-sine" — Right angle at (0, 0), θ at (b, 0), third vertex (0, a); θ = atan2(a, b) from the coordinates, c = √(a² + b²): sin(θ) = a/c. symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Trigonometric functions", § Right-angled triangle definitions, revision 1374535148: https://en.wikipedia.org/w/index.php?title=Trigonometric_functions&oldid=1374535148 — ''opposite'' represents the side opposite the given angle θ, and ''adjacent'' represents the side between the angle θ and the right angle. … ;sine: \sin \theta = \frac \mathrm{opposite}\mathrm{hypotenuse}<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Trigonometrisk funktion", § Geometrisk definition, revision 56572109: https://sv.wikipedia.org/w/index.php?title=Trigonometrisk_funktion&oldid=56572109 — Hypotenusan är motstående sida till den räta vinkeln, i detta fall ''c''. Sidorna ''a'' och ''b'' är kateter. … 1. '''sinus''' för en vinkel är kvoten av motstående katet och hypotenusan :\sin A = {a \over c}<br>Wikidata: items of the trigonometric functions, identities, laws and angle units, their labels, defining formulas (P2534) and conversion to SI unit (P2370): Q158688 (right triangle), Q104962 (hypotenuse), Q110812 (cathetus) — Q158688 en label "right triangle", sv label "rätvinklig triangel"; Q104962 en label "hypotenuse", sv label "hypotenusa"; Q110812 en alias "leg", sv label "katet"<br>Wikidata checks: Q158688 en = right triangle, Q158688 sv = rätvinklig triangel, Q104962 en = hypotenuse, Q104962 sv = hypotenusa, Q110812 en = leg, Q110812 sv = katet, Q152415 en = sine, Q152415 en = sin |
| `right-triangle-cosine` | cos θ in a right triangle where θ is an acute angle, a the leg opposite θ, b the leg adjacent to θ and c the hypotenuse (en) / cos θ i en rätvinklig triangel där θ är en spetsig vinkel, a motstående katet till θ, b närliggande katet till θ och c hypotenusan (sv) | b/c (zxx) | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "right-triangle-cosine" — Right angle at (0, 0), θ at (b, 0), third vertex (0, a); θ = atan2(a, b) from the coordinates, c = √(a² + b²): cos(θ) = b/c. symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Trigonometric functions", § Right-angled triangle definitions, revision 1374535148: https://en.wikipedia.org/w/index.php?title=Trigonometric_functions&oldid=1374535148 — ''opposite'' represents the side opposite the given angle θ, and ''adjacent'' represents the side between the angle θ and the right angle. … ;cosine: \cos \theta = \frac \mathrm{adjacent}\mathrm{hypotenuse}<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Trigonometrisk funktion", § Geometrisk definition, revision 56572109: https://sv.wikipedia.org/w/index.php?title=Trigonometrisk_funktion&oldid=56572109 — Hypotenusan är motstående sida till den räta vinkeln, i detta fall ''c''. Sidorna ''a'' och ''b'' är kateter. … 2. '''cosinus''' för vinkeln ''A'' är kvoten av närliggande katet och hypotenusan :\cos A = {b \over c}<br>Wikidata: items of the trigonometric functions, identities, laws and angle units, their labels, defining formulas (P2534) and conversion to SI unit (P2370): Q158688 (right triangle), Q104962 (hypotenuse), Q110812 (cathetus) — Q158688 en label "right triangle", sv label "rätvinklig triangel"; Q104962 en label "hypotenuse", sv label "hypotenusa"; Q110812 en alias "leg", sv label "katet"<br>Wikidata checks: Q158688 en = right triangle, Q158688 sv = rätvinklig triangel, Q104962 en = hypotenuse, Q104962 sv = hypotenusa, Q110812 en = leg, Q110812 sv = katet, Q1256164 en = cosine, Q1256164 en = cos |
| `right-triangle-tangent` | tan θ in a right triangle where θ is an acute angle, a the leg opposite θ, b the leg adjacent to θ and c the hypotenuse (en) / tan θ i en rätvinklig triangel där θ är en spetsig vinkel, a motstående katet till θ, b närliggande katet till θ och c hypotenusan (sv) | a/b (zxx) | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "right-triangle-tangent" — Right angle at (0, 0), θ at (b, 0), third vertex (0, a); θ = atan2(a, b) from the coordinates, c = √(a² + b²): tan(θ) = a/b. symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Trigonometric functions", § Right-angled triangle definitions, revision 1374535148: https://en.wikipedia.org/w/index.php?title=Trigonometric_functions&oldid=1374535148 — ''opposite'' represents the side opposite the given angle θ, and ''adjacent'' represents the side between the angle θ and the right angle. … ;tangent: \tan \theta = \frac \mathrm{opposite}\mathrm{adjacent}<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Trigonometrisk funktion", § Geometrisk definition, revision 56572109: https://sv.wikipedia.org/w/index.php?title=Trigonometrisk_funktion&oldid=56572109 — Hypotenusan är motstående sida till den räta vinkeln, i detta fall ''c''. Sidorna ''a'' och ''b'' är kateter. … 3. '''tangens''' för vinkeln ''A'' är kvoten av motstående och närliggande katet :\tan A = {a \over b}<br>Wikidata: items of the trigonometric functions, identities, laws and angle units, their labels, defining formulas (P2534) and conversion to SI unit (P2370): Q158688 (right triangle), Q104962 (hypotenuse), Q110812 (cathetus) — Q158688 en label "right triangle", sv label "rätvinklig triangel"; Q104962 en label "hypotenuse", sv label "hypotenusa"; Q110812 en alias "leg", sv label "katet"<br>Wikidata checks: Q158688 en = right triangle, Q158688 sv = rätvinklig triangel, Q104962 en = hypotenuse, Q104962 sv = hypotenusa, Q110812 en = leg, Q110812 sv = katet, Q1129196 en = tangent, Q1129196 en = tan |
| `pythagorean-identity` | Pythagorean identity for sin x and cos x (en) / Trigonometriska ettan för sin x och cos x (sv) | sin²x + cos²x = 1 (zxx) | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "pythagorean-identity" — simplify(sin²x + cos²x − 1) = 0; numerically at five random x. symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Trigonometric functions", § Pythagorean identity, revision 1374535148: https://en.wikipedia.org/w/index.php?title=Trigonometric_functions&oldid=1374535148 — The Pythagorean identity is the expression of the Pythagorean theorem in terms of trigonometric functions: \sin^2 x + \cos^2 x = 1\,.<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Trigonometriska ettan", revision 53905662: https://sv.wikipedia.org/w/index.php?title=Trigonometriska_ettan&oldid=53905662 — \sin^2t+\cos^2t=1 \, .<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.21, eq. 4.21.12, https://dlmf.nist.gov/4.21.E12 — sin²z + cos²z = 1<br>Wikidata: items of the trigonometric functions, identities, laws and angle units, their labels, defining formulas (P2534) and conversion to SI unit (P2370): Q2039117 (Pythagorean trigonometric identity), P2534 defining formula — \sin^2\theta + \cos^2\theta=1; en alias "Pythagorean identity", sv label "trigonometriska ettan"<br>Wikidata checks: Q2039117 en = Pythagorean identity, Q2039117 sv = trigonometriska ettan |
| `tan-in-sin-cos` | tan x in terms of sin x and cos x (en) / tan x uttryckt i sin x och cos x (sv) | sin x/cos x (zxx) — *Defined where cos x ≠ 0. (en) / Definierad där cos x ≠ 0. (sv)* | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "tan-in-sin-cos" — simplify(tan x − sin x/cos x) = 0; numerically at five random x in (−1.4, 1.4). symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Trigonometric functions", § Unit-circle definitions, revision 1374535148: https://en.wikipedia.org/w/index.php?title=Trigonometric_functions&oldid=1374535148 — these definitions can readily be shown to coincide with the definitions of tangent, cotangent, secant and cosecant in terms of sine and cosine, i.e. … \tan \theta &=\frac{\sin \theta}{\cos\theta}<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Lista över trigonometriska identiteter", § Funktioner, revision 59465729: https://sv.wikipedia.org/w/index.php?title=Lista_över_trigonometriska_identiteter&oldid=59465729 — \tan(x) = \frac{\sin(x)}{\cos(x)}<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.14, eq. 4.14.4, https://dlmf.nist.gov/4.14.E4 — tan z = sin z/cos z<br>Wikidata: items of the trigonometric functions, identities, laws and angle units, their labels, defining formulas (P2534) and conversion to SI unit (P2370): Q1129196 (tangent), P2534 defining formula — \tan x = \frac{\sin x}{\cos x}; en alias "tan"<br>Wikidata checks: Q1129196 en = tangent, Q1129196 en = tan |
| `sin-double-angle` | sin 2x in terms of sin x and cos x (en) / sin 2x uttryckt i sin x och cos x (sv) | 2 sin x cos x (zxx) | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "sin-double-angle" — expand_trig(sin 2x) − 2 sin x cos x simplifies to 0. symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Trigonometric functions", § Sum and difference formulas, revision 1374535148: https://en.wikipedia.org/w/index.php?title=Trigonometric_functions&oldid=1374535148 — \sin 2x &= 2 \sin x \cos x = \frac{2\tan x}{1+\tan^2 x}<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Lista över trigonometriska identiteter", § Dubbla vinkeln, revision 59465729: https://sv.wikipedia.org/w/index.php?title=Lista_över_trigonometriska_identiteter&oldid=59465729 — \sin(2x) &= 2 \sin (x) \cos(x)<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.21, eq. 4.21.27, https://dlmf.nist.gov/4.21.E27 — sin(2z) = 2 sin z cos z = 2 tan z/(1 + tan²z)<br>Wikidata checks: Q152415 en = sine, Q152415 en = sin |
| `cos-double-angle` | cos 2x in terms of both cos x and sin x, as a difference of squares (en) / cos 2x uttryckt i både cos x och sin x, som en skillnad mellan kvadrater (sv) | cos²x − sin²x (zxx) — *By the Pythagorean identity also 2 cos²x − 1 or 1 − 2 sin²x. (en) / Enligt trigonometriska ettan även 2 cos²x − 1 eller 1 − 2 sin²x. (sv)* | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "cos-double-angle" — expand_trig(cos 2x) − (cos²x − sin²x) simplifies to 0. The note's forms are the cards cos-double-angle-cos and cos-double-angle-sin. symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Trigonometric functions", § Sum and difference formulas, revision 1374535148: https://en.wikipedia.org/w/index.php?title=Trigonometric_functions&oldid=1374535148 — \cos 2x &= \cos^2 x - \sin^2 x = 2 \cos^2 x - 1 = 1 - 2 \sin^2 x = \frac{1-\tan^2 x}{1+\tan^2 x}<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Lista över trigonometriska identiteter", § Dubbla vinkeln, revision 59465729: https://sv.wikipedia.org/w/index.php?title=Lista_över_trigonometriska_identiteter&oldid=59465729 — \cos(2x) &= \cos^2(x) - \sin^2(x) = \\ &= 2 \cos^2(x) - 1 = \\ &= 1 - 2 \sin^2(x)<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.21, eq. 4.21.28, https://dlmf.nist.gov/4.21.E28 — cos(2z) = 2cos²z − 1 = 1 − 2sin²z = cos²z − sin²z = (1 − tan²z)/(1 + tan²z)<br>Wikidata checks: Q1256164 en = cosine, Q1256164 en = cos |
| `cos-double-angle-cos` | cos 2x in terms of cos x only (en) / cos 2x uttryckt i enbart cos x (sv) | 2 cos²x − 1 (zxx) | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "cos-double-angle-cos" — expand_trig(cos 2x) − (2 cos²x − 1) simplifies to 0. symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Trigonometric functions", § Sum and difference formulas, revision 1374535148: https://en.wikipedia.org/w/index.php?title=Trigonometric_functions&oldid=1374535148 — \cos 2x &= \cos^2 x - \sin^2 x = 2 \cos^2 x - 1 = 1 - 2 \sin^2 x<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Lista över trigonometriska identiteter", § Dubbla vinkeln, revision 59465729: https://sv.wikipedia.org/w/index.php?title=Lista_över_trigonometriska_identiteter&oldid=59465729 — &= 2 \cos^2(x) - 1 = \\<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.21, eq. 4.21.28, https://dlmf.nist.gov/4.21.E28 — cos(2z) = 2cos²z − 1 = …<br>Wikidata checks: Q1256164 en = cosine, Q1256164 en = cos |
| `cos-double-angle-sin` | cos 2x in terms of sin x only (en) / cos 2x uttryckt i enbart sin x (sv) | 1 − 2 sin²x (zxx) | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "cos-double-angle-sin" — expand_trig(cos 2x) − (1 − 2 sin²x) simplifies to 0. symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Trigonometric functions", § Sum and difference formulas, revision 1374535148: https://en.wikipedia.org/w/index.php?title=Trigonometric_functions&oldid=1374535148 — \cos 2x &= \cos^2 x - \sin^2 x = 2 \cos^2 x - 1 = 1 - 2 \sin^2 x<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Lista över trigonometriska identiteter", § Dubbla vinkeln, revision 59465729: https://sv.wikipedia.org/w/index.php?title=Lista_över_trigonometriska_identiteter&oldid=59465729 — &= 1 - 2 \sin^2(x)<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.21, eq. 4.21.28, https://dlmf.nist.gov/4.21.E28 — cos(2z) = 2cos²z − 1 = 1 − 2sin²z = …<br>Wikidata checks: Q1256164 en = cosine, Q1256164 en = cos |
| `tan-double-angle` | tan 2x in terms of tan x (en) / tan 2x uttryckt i tan x (sv) | 2 tan x/(1 − tan²x) (zxx) — *Where tan x and tan 2x are defined. (en) / Där tan x och tan 2x är definierade. (sv)* | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "tan-double-angle" — sin 2x/cos 2x − (2 tan x/(1 − tan²x) with tan x = sin x/cos x) simplifies to 0; numerically tan 2x − 2 tan x/(1 − tan²x) at five random x in (−0.7, 0.7). symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Trigonometric functions", § Sum and difference formulas, revision 1374535148: https://en.wikipedia.org/w/index.php?title=Trigonometric_functions&oldid=1374535148 — \tan 2x &= \frac{2\tan x}{1-\tan^2 x}.<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Lista över trigonometriska identiteter", § Dubbla vinkeln, revision 59465729: https://sv.wikipedia.org/w/index.php?title=Lista_över_trigonometriska_identiteter&oldid=59465729 — \tan(2x) &= \frac{2 \tan(x)} {1 - \tan^2(x)} \\<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.21, eq. 4.21.29, https://dlmf.nist.gov/4.21.E29 — tan(2z) = 2 tan z/(1 − tan²z) = …<br>Wikidata checks: Q1129196 en = tangent, Q1129196 en = tan |
| `sin-sum` | sin(x + y) in terms of sin and cos of x and y (en) / sin(x + y) uttryckt i sin och cos för x och y (sv) | sin x cos y + cos x sin y (zxx) | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "sin-sum" — simplify(sin(x + y) − (sin x cos y + cos x sin y)) = 0; numerically at five random (x, y). symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Trigonometric functions", § Sum and difference formulas, revision 1374535148: https://en.wikipedia.org/w/index.php?title=Trigonometric_functions&oldid=1374535148 — \sin\left(x \pm y\right) &= \sin x \cos y \pm \cos x \sin y,<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Lista över trigonometriska identiteter", § Samband för två vinklar, revision 59465729: https://sv.wikipedia.org/w/index.php?title=Lista_över_trigonometriska_identiteter&oldid=59465729 — \sin(x \pm y) &= \sin(x) \cos(y) \pm \cos(x) \sin(y) \\<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.21, eq. 4.21.2, https://dlmf.nist.gov/4.21.E2 — sin(u ± v) = sin u cos v ± cos u sin v<br>Wikidata checks: Q152415 en = sine, Q152415 en = sin |
| `sin-difference` | sin(x − y) in terms of sin and cos of x and y (en) / sin(x − y) uttryckt i sin och cos för x och y (sv) | sin x cos y − cos x sin y (zxx) | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "sin-difference" — simplify(sin(x − y) − (sin x cos y − cos x sin y)) = 0; numerically at five random (x, y). symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Trigonometric functions", § Sum and difference formulas, revision 1374535148: https://en.wikipedia.org/w/index.php?title=Trigonometric_functions&oldid=1374535148 — \sin\left(x \pm y\right) &= \sin x \cos y \pm \cos x \sin y,<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Lista över trigonometriska identiteter", § Samband för två vinklar, revision 59465729: https://sv.wikipedia.org/w/index.php?title=Lista_över_trigonometriska_identiteter&oldid=59465729 — \sin(x \pm y) &= \sin(x) \cos(y) \pm \cos(x) \sin(y) \\<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.21, eq. 4.21.2, https://dlmf.nist.gov/4.21.E2 — sin(u ± v) = sin u cos v ± cos u sin v<br>Wikidata checks: Q152415 en = sine, Q152415 en = sin |
| `cos-sum` | cos(x + y) in terms of sin and cos of x and y (en) / cos(x + y) uttryckt i sin och cos för x och y (sv) | cos x cos y − sin x sin y (zxx) | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "cos-sum" — simplify(cos(x + y) − (cos x cos y − sin x sin y)) = 0; numerically at five random (x, y). symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Trigonometric functions", § Sum and difference formulas, revision 1374535148: https://en.wikipedia.org/w/index.php?title=Trigonometric_functions&oldid=1374535148 — \cos\left(x \pm y\right) &= \cos x \cos y \mp \sin x \sin y,<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Lista över trigonometriska identiteter", § Samband för två vinklar, revision 59465729: https://sv.wikipedia.org/w/index.php?title=Lista_över_trigonometriska_identiteter&oldid=59465729 — \cos(x \pm y) &= \cos(x) \cos(y) \mp \sin(x) \sin(y) \\ … Till exempel är cos(''x'' + ''y'') = cos(''x'')cos(''y'') - sin(''x'')sin(''y'') medan cos(''x'' - ''y'') = cos(''x'')cos(''y'') + sin(''x'')sin(''y'').<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.21, eq. 4.21.3, https://dlmf.nist.gov/4.21.E3 — cos(u ± v) = cos u cos v ∓ sin u sin v<br>Wikidata checks: Q1256164 en = cosine, Q1256164 en = cos |
| `cos-difference` | cos(x − y) in terms of sin and cos of x and y (en) / cos(x − y) uttryckt i sin och cos för x och y (sv) | cos x cos y + sin x sin y (zxx) | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "cos-difference" — simplify(cos(x − y) − (cos x cos y + sin x sin y)) = 0; numerically at five random (x, y). symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Trigonometric functions", § Sum and difference formulas, revision 1374535148: https://en.wikipedia.org/w/index.php?title=Trigonometric_functions&oldid=1374535148 — \cos\left(x \pm y\right) &= \cos x \cos y \mp \sin x \sin y,<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Lista över trigonometriska identiteter", § Samband för två vinklar, revision 59465729: https://sv.wikipedia.org/w/index.php?title=Lista_över_trigonometriska_identiteter&oldid=59465729 — \cos(x \pm y) &= \cos(x) \cos(y) \mp \sin(x) \sin(y) \\ … Till exempel är cos(''x'' + ''y'') = cos(''x'')cos(''y'') - sin(''x'')sin(''y'') medan cos(''x'' - ''y'') = cos(''x'')cos(''y'') + sin(''x'')sin(''y'').<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.21, eq. 4.21.3, https://dlmf.nist.gov/4.21.E3 — cos(u ± v) = cos u cos v ∓ sin u sin v<br>Wikidata checks: Q1256164 en = cosine, Q1256164 en = cos |
| `tan-sum` | tan(x + y) in terms of tan x and tan y (en) / tan(x + y) uttryckt i tan x och tan y (sv) | (tan x + tan y)/(1 − tan x tan y) (zxx) — *Where tan x, tan y and tan(x + y) are defined. (en) / Där tan x, tan y och tan(x + y) är definierade. (sv)* | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "tan-sum" — simplify(tan(x + y) − (tan x + tan y)/(1 − tan x tan y)) = 0; numerically at five random (x, y) in (−0.7, 0.7)². symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Trigonometric functions", § Sum and difference formulas, revision 1374535148: https://en.wikipedia.org/w/index.php?title=Trigonometric_functions&oldid=1374535148 — \tan(x \pm y) &= \frac{\tan x \pm \tan y}{1 \mp \tan x\tan y}.<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Lista över trigonometriska identiteter", § Samband för två vinklar, revision 59465729: https://sv.wikipedia.org/w/index.php?title=Lista_över_trigonometriska_identiteter&oldid=59465729 — \tan(x \pm y) &= \frac{\tan(x) \pm \tan(y)}{1 \mp \tan(x)\tan(y)} \\<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.21, eq. 4.21.4, https://dlmf.nist.gov/4.21.E4 — tan(u ± v) = (tan u ± tan v)/(1 ∓ tan u tan v)<br>Wikidata checks: Q1129196 en = tangent, Q1129196 en = tan |
| `sin-negative-angle` | sin(−x) in terms of sin x (en) / sin(−x) uttryckt i sin x (sv) | −sin x (zxx) — *Sine is an odd function. (en) / Sinus är en udda funktion. (sv)* | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "sin-negative-angle" — simplify(sin(−x) − (−sin x)) = 0; numerically at five random x. symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Trigonometric functions", § Parity, revision 1374535148: https://en.wikipedia.org/w/index.php?title=Trigonometric_functions&oldid=1374535148 — The cosine and the secant are even functions; the other trigonometric functions are odd functions. That is: … \sin(-x) &=-\sin x,<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Lista över trigonometriska identiteter", § Symmetri, revision 59465729: https://sv.wikipedia.org/w/index.php?title=Lista_över_trigonometriska_identiteter&oldid=59465729 — \sin(-x) &= -\sin(x) … Till exempel är cosinusfunktionen jämn och sinus- och tangensfunktionerna är udda.<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.21, eq. 4.21.24, https://dlmf.nist.gov/4.21.E24 — sin(−z) = −sin z<br>Wikidata checks: Q152415 en = sine, Q152415 en = sin, Q152415 sv = sinus |
| `cos-negative-angle` | cos(−x) in terms of cos x (en) / cos(−x) uttryckt i cos x (sv) | cos x (zxx) — *Cosine is an even function. (en) / Cosinus är en jämn funktion. (sv)* | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "cos-negative-angle" — simplify(cos(−x) − (cos x)) = 0; numerically at five random x. symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Trigonometric functions", § Parity, revision 1374535148: https://en.wikipedia.org/w/index.php?title=Trigonometric_functions&oldid=1374535148 — The cosine and the secant are even functions; … \cos(-x) &=\hphantom{-}\cos x,<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Lista över trigonometriska identiteter", § Symmetri, revision 59465729: https://sv.wikipedia.org/w/index.php?title=Lista_över_trigonometriska_identiteter&oldid=59465729 — \cos(-x) &= +\cos(x) … Till exempel är cosinusfunktionen jämn och sinus- och tangensfunktionerna är udda.<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.21, eq. 4.21.25, https://dlmf.nist.gov/4.21.E25 — cos(−z) = cos z<br>Wikidata checks: Q1256164 en = cosine, Q1256164 en = cos, Q1256164 sv = cosinus |
| `law-of-sines` | Law of sines for a triangle with sides a, b, c and the opposite angles A, B, C, written with the sides over the sines (en) / Sinussatsen för en triangel med sidorna a, b, c och de motstående vinklarna A, B, C, skriven med sidorna i täljaren (sv) | a/sin A = b/sin B = c/sin C (zxx) — *Each ratio equals 2R, R the radius of the circumscribed circle. Also written sin A/a = sin B/b = sin C/c. (en) / Varje kvot är lika med 2R, där R är den omskrivna cirkelns radie. Skrivs även sin A/a = sin B/b = sin C/c. (sv)* | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "law-of-sines" — C at the origin, B = (a, 0), A = (b·cos C, b·sin C); the sine of each interior angle computed from the vertex coordinates (\|cross product\|/product of lengths): a/sin A − b/sin B and b/sin B − c/sin C simplify to 0, and the three ratios agree to 10⁻²⁵ on ten random triangles. The note's 2R (circumcentre solved from equal distances) checked as "note:law-of-sines-2R", its reciprocal form as "note:law-of-sines-reciprocal". symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Trigonometric functions", § Law of sines, revision 1374535148: https://en.wikipedia.org/w/index.php?title=Trigonometric_functions&oldid=1374535148 — \frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C} = 2R, where R is the triangle's circumradius.<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Sinussatsen", revision 56623979: https://sv.wikipedia.org/w/index.php?title=Sinussatsen&oldid=56623979 — \frac{a}{\sin\alpha}=\frac{b}{\sin\beta}=\frac{c}{\sin\gamma} \Leftrightarrow \frac{\sin\alpha}{a}=\frac{\sin\beta}{b}=\frac{\sin\gamma}{c} … \frac{a}{\sin\alpha}=\frac{b}{\sin\beta}=\frac{c}{\sin\gamma}=2 \cdot R där R är den omskrivna cirkelns radie.<br>Wikidata: items of the trigonometric functions, identities, laws and angle units, their labels, defining formulas (P2534) and conversion to SI unit (P2370): Q170181 (law of sines), P2534 defining formula — \frac{a}{\sin(A)} = \frac{b}{\sin(B)} = \frac{c}{\sin(C)}; en label "law of sines", sv label "sinussatsen"<br>Wikidata checks: Q170181 en = law of sines, Q170181 sv = sinussatsen |
| `law-of-cosines` | Law of cosines for a triangle with sides a, b, c and the angle C opposite c (en) / Cosinussatsen för en triangel med sidorna a, b, c och vinkeln C mitt emot sidan c (sv) | c² = a² + b² − 2ab·cos C (zxx) — *With C = 90° it becomes the Pythagorean theorem. (en) / Med C = 90° övergår den i Pythagoras sats. (sv)* | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "law-of-cosines" — C at the origin, B = (a, 0), A = (b·cos C, b·sin C): \|AB\|² expands to a² + b² − 2ab·cos C. symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Trigonometric functions", § Law of cosines, revision 1374535148: https://en.wikipedia.org/w/index.php?title=Trigonometric_functions&oldid=1374535148 — c^2=a^2+b^2-2ab\cos C, … In this formula the angle at C is opposite to the side c.<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Cosinussatsen", revision 56558376: https://sv.wikipedia.org/w/index.php?title=Cosinussatsen&oldid=56558376 — c^2=a^2+b^2-2ab\cdot\cos \gamma<br>Wikidata: items of the trigonometric functions, identities, laws and angle units, their labels, defining formulas (P2534) and conversion to SI unit (P2370): Q164321 (law of cosines), P2534 defining formula — c^2 = a^2+b^2-2ab\cos C; en label "law of cosines", sv label "cosinussatsen"<br>Wikidata checks: Q164321 en = law of cosines, Q164321 sv = cosinussatsen |
| `degree-in-radians` | 1° in radians (en) / 1° i radianer (sv) | π/180 rad (zxx) — *≈ 0.0175 rad. (en) / ≈ 0,0175 rad. (sv)* | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "degree-in-radians" — A full turn, the arc length of the unit circle ∫₀^{2π} √(sin²φ + cos²φ) dφ, is 2π rad for 360°, so 1° = 2π/360 = π/180 rad; Wikidata's P2370 value agrees with π/180 to 10⁻³⁵ ("wikidata:degree-P2370"). symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Radian", § Between degrees, revision 1377640454: https://en.wikipedia.org/w/index.php?title=Radian&oldid=1377640454 — 1^\circ = 1 \cdot \frac {\pi} {180} \text{ rad}\approx 0.0175 \text{ rad}<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Radian", revision 58968418: https://sv.wikipedia.org/w/index.php?title=Radian&oldid=58968418 — radianer = grader \cdot \frac{\pi}{180}<br>Wikidata: items of the trigonometric functions, identities, laws and angle units, their labels, defining formulas (P2534) and conversion to SI unit (P2370): Q28390 (degree), P2370 conversion to SI unit — 0.01745329251994329576923690768488612713 radian (Q33680); en description "angle unit; π/180 radians"; Q28390 en label "degree", sv label "grad"; Q33680 en label "radian", sv label "radian", sv alias "radianer"<br>Wikidata checks: Q28390 en = degree, Q28390 sv = grad, Q33680 en = radian, Q33680 sv = radianer, Q28390 P2370 = 0.01745329251994329576923690768488612713 |
| `radian-in-degrees` | 1 rad in degrees (en) / 1 rad i grader (sv) | (180/π)° (zxx) — *≈ 57.3°. (en) / ≈ 57,3°. (sv)* | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "radian-in-degrees" — 360° per full turn of 2π rad: 1 rad = 360/(2π) = (180/π)°; 180/π = 57.2958 to 10⁻⁴ ("note:radian-approx-57.3"). symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Radian", § Between degrees, revision 1377640454: https://en.wikipedia.org/w/index.php?title=Radian&oldid=1377640454 — As stated, one radian is equal to {180^\circ}/{\pi}. … 1 \text{ rad} = 1 \cdot \frac {180^\circ} {\pi} \approx 57.2958^\circ<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Radian", § Konvertering, revision 58968418: https://sv.wikipedia.org/w/index.php?title=Radian&oldid=58968418 — grader = radianer \cdot \frac{180}{\pi} … 1 rad ≈ 57,2958°.<br>Wikidata: items of the trigonometric functions, identities, laws and angle units, their labels, defining formulas (P2534) and conversion to SI unit (P2370): Q28390 (degree), Q33680 (radian) — Q28390 en label "degree", sv label "grad"; Q33680 en label "radian", sv label "radian", sv alias "radianer"<br>Wikidata checks: Q28390 en = degree, Q28390 sv = grad, Q33680 en = radian, Q33680 sv = radianer |
| `degrees-180-in-radians` | 180° in radians (en) / 180° i radianer (sv) | π rad (zxx) | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "degrees-180-in-radians" — Half of the full turn 2π rad (the arc length of the unit circle) = π rad. symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Radian", § Between degrees, revision 1377640454: https://en.wikipedia.org/w/index.php?title=Radian&oldid=1377640454 — \text{angle in radians} = \text{angle in degrees} \cdot \frac {\pi} {180} \text{ rad}<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Radian", § Konvertering, revision 58968418: https://sv.wikipedia.org/w/index.php?title=Radian&oldid=58968418 — radianer = grader \cdot \frac{\pi}{180}<br>Wikidata: items of the trigonometric functions, identities, laws and angle units, their labels, defining formulas (P2534) and conversion to SI unit (P2370): Q28390 (degree), Q33680 (radian) — Q28390 en label "degree", sv label "grad"; Q33680 en label "radian", sv label "radian", sv alias "radianer"<br>Wikidata checks: Q28390 en = degree, Q28390 sv = grad, Q33680 en = radian, Q33680 sv = radianer |
| `degrees-360-in-radians` | 360° (a full turn) in radians (en) / 360° (ett helt varv) i radianer (sv) | 2π rad (zxx) | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "degrees-360-in-radians" — The arc length of the unit circle ∫₀^{2π} √(sin²φ + cos²φ) dφ = 2π. symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Trigonometric functions", § Radians versus degrees, revision 1374535148: https://en.wikipedia.org/w/index.php?title=Trigonometric_functions&oldid=1374535148 — a complete [[turn (angle)\|turn]] (360°) is an angle of 2{{pi}} (≈ 6.28) rad.<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Radian", § Definition, revision 58968418: https://sv.wikipedia.org/w/index.php?title=Radian&oldid=58968418 — Ett varv, 360 grader, motsvarar alltså 2π radianer.<br>Wikidata: items of the trigonometric functions, identities, laws and angle units, their labels, defining formulas (P2534) and conversion to SI unit (P2370): Q28390 (degree), Q33680 (radian) — Q28390 en label "degree", sv label "grad"; Q33680 en label "radian", sv label "radian", sv alias "radianer"<br>Wikidata checks: Q28390 en = degree, Q28390 sv = grad, Q33680 en = radian, Q33680 sv = radianer |
| `period-sin` | Period of sin x, x in radians (the smallest positive period) (en) / Perioden för sin x, x i radianer (den minsta positiva perioden) (sv) | 2π (zxx) — *In degrees: 360°. (en) / I grader: 360°. (sv)* | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "period-sin" — simplify(sin(x + 2π) − sin x) = 0 and sympy.periodicity(sin x, x) = 2π (the fundamental period); numerically, none of the 999 values 2π·k/1000 is a period at five random x. symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Trigonometric functions", § Periods, revision 1374535148: https://en.wikipedia.org/w/index.php?title=Trigonometric_functions&oldid=1374535148 — All trigonometric functions are [[periodic function]]s of period {{math\|2{{pi}}}}. This is the smallest period, except for the tangent and the cotangent, which have {{pi}} as smallest period.<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Lista över trigonometriska identiteter", § Perioder, revision 59465729: https://sv.wikipedia.org/w/index.php?title=Lista_över_trigonometriska_identiteter&oldid=59465729 — Sinus, cosinus, sekant och cosekant har perioden 2π. Tangens och cotangens har perioden π.<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.14, eq. 4.14.8, https://dlmf.nist.gov/4.14.E8 — sin(z + 2kπ) = sin z, k ∈ ℤ (that the period is the smallest is not stated in this equation)<br>Wikidata checks: Q152415 en = sine, Q152415 en = sin |
| `period-cos` | Period of cos x, x in radians (the smallest positive period) (en) / Perioden för cos x, x i radianer (den minsta positiva perioden) (sv) | 2π (zxx) — *In degrees: 360°. (en) / I grader: 360°. (sv)* | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "period-cos" — simplify(cos(x + 2π) − cos x) = 0 and sympy.periodicity(cos x, x) = 2π (the fundamental period); numerically, none of the 999 values 2π·k/1000 is a period at five random x. symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Trigonometric functions", § Periods, revision 1374535148: https://en.wikipedia.org/w/index.php?title=Trigonometric_functions&oldid=1374535148 — All trigonometric functions are [[periodic function]]s of period {{math\|2{{pi}}}}. This is the smallest period, except for the tangent and the cotangent, which have {{pi}} as smallest period.<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Lista över trigonometriska identiteter", § Perioder, revision 59465729: https://sv.wikipedia.org/w/index.php?title=Lista_över_trigonometriska_identiteter&oldid=59465729 — Sinus, cosinus, sekant och cosekant har perioden 2π. Tangens och cotangens har perioden π.<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.14, eq. 4.14.9, https://dlmf.nist.gov/4.14.E9 — cos(z + 2kπ) = cos z, k ∈ ℤ (that the period is the smallest is not stated in this equation)<br>Wikidata checks: Q1256164 en = cosine, Q1256164 en = cos |
| `period-tan` | Period of tan x, x in radians (the smallest positive period) (en) / Perioden för tan x, x i radianer (den minsta positiva perioden) (sv) | π (zxx) — *In degrees: 180°. (en) / I grader: 180°. (sv)* | Derivations and SymPy verification for the Solid Memo trigonometry deck: verify_trigonometry.py, check "period-tan" — simplify(tan(x + π) − tan x) = 0 and sympy.periodicity(tan x, x) = π (the fundamental period); numerically, none of the 999 values π·k/1000 is a period at five random x. symbolic=ok numeric=ok<br>English Wikipedia: Trigonometric functions and Radian: "Trigonometric functions", § Periods, revision 1374535148: https://en.wikipedia.org/w/index.php?title=Trigonometric_functions&oldid=1374535148 — All trigonometric functions are [[periodic function]]s of period {{math\|2{{pi}}}}. This is the smallest period, except for the tangent and the cotangent, which have {{pi}} as smallest period.<br>Swedish Wikipedia: articles on the trigonometric functions, identities and laws: "Lista över trigonometriska identiteter", § Perioder, revision 59465729: https://sv.wikipedia.org/w/index.php?title=Lista_över_trigonometriska_identiteter&oldid=59465729 — Sinus, cosinus, sekant och cosekant har perioden 2π. Tangens och cotangens har perioden π.<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.14, eq. 4.14.10, https://dlmf.nist.gov/4.14.E10 — tan(z + kπ) = tan z, k ∈ ℤ (that the period is the smallest is not stated in this equation)<br>Wikidata checks: Q1129196 en = tangent, Q1129196 en = tan |
