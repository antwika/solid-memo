# Derivatives — provenance report

<!-- Generated from authored/derivatives.json by scripts/authored_decks.py. Do not edit: change the dossier and rebuild. -->

**Deck:** [`decks/derivatives.ttl`](../decks/derivatives.ttl) · **Cards:** 42 · **Licence:** [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) · **Compiled by:** Anton Wiklund · **Created:** 2026-10-04

42 cards on derivatives for calculus students: the definition, the differentiation rules (sum, product, quotient, chain and more) and the derivatives of powers, roots, exponential, logarithmic, trigonometric, inverse trigonometric, hyperbolic and inverse hyperbolic functions. The rule or function on the front in plain notation such as d/dx sin x, the derivative on the back; angles in radians. Every card is checked with the computer algebra system SymPy and against the NIST Digital Library of Mathematical Functions or Wikipedia (most cards both); rule names checked against Wikidata.

## Sources

| Source | Creator | Licence | Role | Retrieved | Used for |
|---|---|---|---|---|---|
| [Derivations and SymPy verification for the Solid Memo derivatives deck](https://github.com/antwika/solid-memo/blob/main/packages/deck-library/authored/derivatives.json) | Anton Wiklund (compiler); written by Claude (Anthropic, AI) at his direction | [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) | content | 2026-10-04 | The selection of cards, their notation and notes, and the machine verification of every card with SymPy 1.14.0 (symbolic differentiation plus an independent numerical difference quotient). The script's full text is recorded under Queries; the URL resolves once the dossier is merged into the main branch. |
| [Wikidata](https://www.wikidata.org/) | Wikidata contributors (Wikimedia Foundation) | [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) | content | 2026-10-04 | The English names of the rules used in the notes (except "Inverse function rule", the English Wikipedia section heading; the Wikidata English label of Q2143416 is "inverse functions and differentiation") and the Swedish names derivata, kedjeregeln and Kvotregeln (checked by the builder), and the defining formulas (P2534) of the rules and of the derivative, against which the cards were compared (the formulas were not taken from Wikidata). |
| [NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15)](https://dlmf.nist.gov/) | F. W. J. Olver, A. B. Olde Daalhuis, D. W. Lozier, B. I. Schneider, R. F. Boisvert, C. W. Clark, B. R. Miller, B. V. Saunders, H. S. Cohl, M. A. McClain (eds.); National Institute of Standards and Technology | All rights reserved | verification | 2026-10-04 | Independent check of the rules (§1.4(iii)) and of the derivatives of the elementary functions (§4.7, §4.20, §4.24, §4.34, §4.38). Nothing copied. |
| [Differentiation rules (English Wikipedia)](https://en.wikipedia.org/wiki/Differentiation_rules) | Wikipedia contributors | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | verification | 2026-10-04 | Independent check of the constant, power, constant-multiple, difference, reciprocal and inverse-function rules, the logarithmic derivative, and 19 of the listed derivatives, among them those DLMF does not list in that form (ln\|x\|, logₐ x, xˣ). The definition, the sum, product, quotient and chain rules and the remaining derivatives cite no English Wikipedia evidence; they are checked against DLMF, the SymPy derivation and, where noted, Swedish Wikipedia and Wikidata. Neither text nor the selection was copied. |
| [Derivata (Swedish Wikipedia)](https://sv.wikipedia.org/wiki/Derivata) | Wikipedia contributors | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | verification | 2026-10-04 | Check of the Swedish rule names (Produktregeln, Kvotregeln, kedjeregeln) and an independent check of the rules and the table of derivatives. Nothing copied. |
| [Logaritmisk derivering (Swedish Wikipedia)](https://sv.wikipedia.org/wiki/Logaritmisk_derivering) | Wikipedia contributors | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | verification | 2026-10-04 | Check of the Swedish term "den logaritmiska derivatan" for f′/f. Nothing copied beyond the term itself. |

**Content** sources supplied information that is in the cards. **Verification** sources were only consulted to confirm facts: nothing was copied from them.

### Licence evidence

- **Derivations and SymPy verification for the Solid Memo derivatives deck** — Own work of the deck's compiler, dedicated to the public domain together with the deck: the deck's dcterms:license is https://creativecommons.org/publicdomain/zero/1.0/ (CC0 1.0 Universal). The standard derivative formulas themselves are mathematical facts, which are not copyrightable; the wording and the selection are this dossier's own. The verification script is recorded verbatim under Queries.
- **Wikidata** — https://www.wikidata.org/wiki/Wikidata:Licensing (fetched 2026-10-04): "All structured data (i.e. the main, Property, Lexeme, and EntitySchema namespaces) is released into the public domain under Creative Commons Zero."
- **NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15)** — https://dlmf.nist.gov/about/notices (fetched 2026-10-04): "Authors of the works appearing in the Digital Library of Mathematical Functions (DLMF) have assigned copyright to the works to NIST ... All materials on this website are owned by NIST. Limited copying and internal distribution of the content of these pages is permitted for research and teaching. Reproduction, copying, or distribution for any commercial purpose is strictly prohibited." Not a public-domain US government work, so verification only.
- **Differentiation rules (English Wikipedia)** — https://en.wikipedia.org/wiki/Wikipedia:Copyrights (fetched 2026-10-04): "If you wish to reuse content from Wikipedia, read § Reusers' rights and obligations first. Then review the licenses: the Creative Commons Attribution-ShareAlike 4.0 International License and the GNU Free Documentation License."
- **Derivata (Swedish Wikipedia)** — Footer of https://sv.wikipedia.org/wiki/Derivata (fetched 2026-10-04): "Wikipedias text är tillgänglig under licensen Creative Commons Erkännande-dela-lika 4.0 Unported."
- **Logaritmisk derivering (Swedish Wikipedia)** — Footer of https://sv.wikipedia.org/wiki/Logaritmisk_derivering (fetched 2026-10-04): "Wikipedias text är tillgänglig under licensen Creative Commons Erkännande-dela-lika 4.0 Unported."

## Licensing

The deck is CC0 1.0. Its content comes from two sources whose licences allow anything: the compiler's own derivations, selection, notation and notes (dedicated to the public domain with the deck; the formulas are mathematical facts, which are not copyrightable in any case) and Wikidata (structured data under CC0), from which the English rule names in the notes and the Swedish names derivata, kedjeregeln and Kvotregeln were taken and against whose defining formulas (P2534) the cards were compared. The NIST Digital Library of Mathematical Functions is copyrighted by NIST with reuse limited to research and teaching, and English and Swedish Wikipedia are CC BY-SA 4.0; all were used only to verify facts. No text, notation layout or list was copied from them; single established terms (Produktregeln, den logaritmiska derivatan) are used as names, which carry no protectable expression. The selection overlaps Wikipedia's tables because both follow the standard first-course syllabus, and the alternative forms in the notes of tan, cot and tanh are standard identities; a list of standard derivatives and identities is dictated by the subject and carries no protectable selection. Every formula was re-derived and machine-checked with SymPy.

## Method

1. Research, drafting and cross-checking were done by AI agents (Claude, Anthropic) at Anton Wiklund's direction, with independent AI reviewers (quality-control rounds 1–3: factual accuracy; language and translation; licensing, attribution and documentation) and machine checks (SymPy, the builder's Wikidata checks, the app's SHACL and DCAT-AP validators). The cards have not yet been reviewed by a human subject expert.
2. Selection: the rules and derivatives a first calculus course asks students to know by heart were listed from general mathematical knowledge (no list was copied from any source): the definition of the derivative; the constant, power, constant-multiple, sum, difference, product, quotient, chain, reciprocal and inverse-function rules and the logarithmic derivative; the powers x, x², x³, √x, 1/x, 1/x²; eˣ, eᵏˣ, aˣ, ln x, ln|x|, logₐ x, xˣ; sin, cos, tan, cot, sec, csc, sin(kx), cos(kx); arcsin, arccos, arctan; sinh, cosh, tanh, arsinh, arcosh, artanh.
3. Notation: every function and derivative is written in plain Unicode that reads as text (superscripts such as x², eˣ, xⁿ⁻¹; √ for the square root; · for multiplication; ′ U+2032 for the prime; − U+2212 for minus). Functions are on the front as "d/dx <function>", rules about arbitrary differentiable functions f and g in prime notation, e.g. "(f·g)′". Fronts and backs that are pure notation are untagged; the one front with words (the definition card) and all notes are in English and Swedish. Where a derivative has several standard forms (tan, cot, tanh) the back gives one and the note names the others. A front note states what a letter means (a constant, a > 0) wherever the front would otherwise be ambiguous, and a back note gives the domain where the formula needs one.
4. Machine verification: every card was written as a SymPy expression in the script verify_derivatives.py (recorded verbatim under Queries) and run with `uv run --with sympy python3 verify_derivatives.py` (SymPy 1.14.0). For a function card the script checks that simplify(diff(front) − back) is 0, on the stated domain where one is needed (ln|x| for x > 0 and x < 0 separately, arcosh for x > 1), and independently that a central difference quotient (step 10⁻⁶, 30-digit arithmetic) of the front function equals the back at three points of the domain to within 10⁻⁶. For a rule card it checks the identity symbolically with undefined SymPy functions f and g and numerically with concrete functions (sin x + 2 and x³ + 1). The inverse-function rule is checked on exp/ln, sin/arcsin and tan/arctan and by solving the chain-rule identity f(f⁻¹(x)) = x for (f⁻¹)′; the definition card by computing the limit of the difference quotient for x³, sin x, eˣ, √x and 1/x symbolically and numerically by a one-sided difference quotient (h = 10⁻⁸, 30-digit arithmetic) at x = 1/2, 1 and 2. The equivalent forms named in the notes of tan, cot and tanh are checked as identities symbolically and by evaluating the differences of the forms at x = −0.7, 0.3 and 1.1. Result: 45 checks, 45 passed, each symbolically and numerically. (Until QC round 3 the numeric result of the definition card and of the three identities was a placeholder; the script was corrected and re-run.)
5. Rule names from Wikidata: the items of the rules (Q466720 product rule, Q531392 quotient rule, Q207455 chain rule, Q1190543 power rule, Q2141200 sum rule, Q1246553 reciprocal rule, Q1367447 constant factor rule, Q29175 derivative, Q4895685 linearity, Q762521 logarithmic derivative, Q2143416 inverse functions and differentiation, Q47306354 natural exponential function) were found with wbsearchentities, and their English and Swedish labels, Swedish aliases, Swedish Wikipedia sitelinks and defining formulas (P2534, TeX) fetched with wbgetentities and the SPARQL query under Queries. The SPARQL query also fetched Q90011163 (differentiation rule), Q204037 (natural logarithm), Q1256164 (cosine) and Q1129196 (tangent), looked up as candidates for names in the notes; they turned out not to be needed and no card uses them. The P2534 formulas were compared with the cards and agree with them; the cards' formulas were not taken from Wikidata. English rule names in the notes are the Wikidata English labels, with two exceptions: "Sum rule" is a short form of "sum rule in differentiation", and "Inverse function rule" is the common name used as the section heading in the English Wikipedia article Differentiation rules, since the Wikidata English label of Q2143416 is "inverse functions and differentiation"; the Swedish names are the Wikidata Swedish labels where they exist and fit (derivata, kedjeregeln, Kvotregeln), otherwise the Swedish Wikipedia term (Produktregeln, den logaritmiska derivatan) or a description in words.
6. Cross-checking: each card's derivative was compared by the authoring AI agent, equation by equation, with the NIST DLMF equation for it (§1.4(iii) for the rules, §4.7 logarithm and exponential, §4.20 trigonometric, §4.24 inverse trigonometric, §4.34 hyperbolic, §4.38 inverse hyperbolic functions; pages saved from https://dlmf.nist.gov/<section>) and/or with the wikitext of the English Wikipedia article Differentiation rules and the Swedish article Derivata (downloaded with action=raw). Each card's evidence lists exactly the sources it was compared with: most cards have both DLMF and Wikipedia; constant, constant multiple, difference, reciprocal and inverse-function rules, x, ln|x|, logₐ x and xˣ have Wikipedia (the reciprocal and inverse-function rules also Wikidata) but no DLMF equation; definition, sum and chain rules, eˣ, sin(kx) and cos(kx) have DLMF (and for some Wikidata) but no Wikipedia quote; sin(kx) and cos(kx) are checked against DLMF only through eqs. 4.20.1–4.20.2 combined with the chain rule 1.4.10. DLMF states the formulas for a complex variable z; the cards state the real-variable case taught in calculus.
7. Swedish text: the notes were written in Swedish directly, using the Swedish terms that Wikidata and Swedish Wikipedia use (derivata, produktregeln, kvotregeln, kedjeregeln, inre derivata, den logaritmiska derivatan (sv.wikipedia Logaritmisk derivering), konstant, invers funktion). The Swedish deck description calls the inverse trigonometric functions arcusfunktioner, the Swedish label of Wikidata Q674533 (inverse trigonometric function: sv "arcusfunktion"), and describes the inverse hyperbolic functions as "hyperboliska funktioner och deras inverser" because Wikidata Q640600 has no Swedish label. The keyword infinitesimalkalkyl is the Swedish label of Wikidata Q149972 (calculus).
8. The builder's Wikidata checks (python3 scripts/authored_decks.py build derivatives) confirm the rule names used in the notes against live Wikidata. Finally the built deck was validated with the app's SHACL and DCAT-AP validators (node scripts/validate_sources.ts derivatives).

## Selection

Included: the definition of the derivative, eleven differentiation rules, and the derivatives of 30 elementary functions that are standard in a first calculus course (powers and roots, exponential and logarithmic, trigonometric with sec and csc, the three main inverse trigonometric functions, the hyperbolic functions and their inverses), 42 cards in all. Left out: arcsec and arccsc, whose derivatives depend on the chosen range convention (they carry |x| under one convention; Swedish Wikipedia's table gives arcsec without the absolute value) — a card must have one right answer; arccot, less commonly taught and defined with two range conventions (its derivative −1/(1 + x²) is the same under both for x ≠ 0, but the conventions differ at 0); coth, sech, csch and their inverses, rarely taught; |x|, whose derivative x/|x| is less standard and undefined at 0; higher derivatives, Leibniz's general rule and Faà di Bruno's formula, beyond a first course; and differentiation of implicit or parametric functions, which are methods rather than facts. The general power rule (f^g)′ is left out as too long for a card; xˣ stands for it.

## Queries

**Machine verification of every card with SymPy (scratch/derivatives/verify_derivatives.py, run as: uv run --with sympy python3 verify_derivatives.py)** (Derivations and SymPy verification for the Solid Memo derivatives deck)

```
"""Machine-verify every card of the "derivatives" deck with SymPy.

Run: uv run --with sympy python3 verify_derivatives.py

For each card the function on the front and the claimed derivative on the
back are written as SymPy expressions. A card passes when
  1. symbolic: simplify(diff(front) - back) == 0 (on the stated domain), and
  2. numeric: a central difference quotient of the front function agrees with
     the back at three points of the domain to 1e-6 (an independent check
     that does not rely on SymPy's differentiation or simplification).
Rules about arbitrary functions f, g are checked symbolically with undefined
SymPy functions and numerically with concrete pairs of functions.
"""
import sympy as sp

x, y, h = sp.symbols("x y h", real=True)
n, k, c = sp.symbols("n k c", real=True)
a = sp.symbols("a", positive=True)
f, g = sp.Function("f"), sp.Function("g")

results = []


def numeric_ok(F, D, points, subs=None):
    subs = subs or {}
    F, D = F.subs(subs), D.subs(subs)
    eps = sp.Rational(1, 10**6)
    for p in points:
        p = sp.nsimplify(p)
        q = (F.subs(x, p + eps) - F.subs(x, p - eps)) / (2 * eps)
        if abs(sp.N(q, 30) - sp.N(D.subs(x, p), 30)) > 1e-6:
            return False
    return True


def card(cid, F, D, points, subs=None, assume=None):
    """F: the front function of x; D: the back (claimed derivative)."""
    expr = sp.diff(F, x) - D
    # assume: substitutions that put x on the stated domain (each piece checked)
    sym = all(sp.simplify(expr.subs(s)) == 0 for s in (assume or [{}]))
    num = numeric_ok(F, D, points, subs)
    results.append((cid, sym, num))


def rule(cid, sym_expr, concrete):
    """sym_expr: an expression in undefined f, g that must simplify to 0.
    concrete: list of (F, D) pairs of concrete functions checked numerically."""
    sym = sp.simplify(sym_expr.doit()) == 0
    num = all(numeric_ok(F, D, [sp.Rational(3, 10), sp.Rational(7, 10), sp.Rational(13, 10)]) for F, D in concrete)
    results.append((cid, sym, num))


u, v = sp.sin(x) + 2, x**3 + 1  # concrete f, g for the numeric rule checks (g > 0 on the points)
up, vp = sp.diff(u, x), sp.diff(v, x)

# --- Rules
rule("constant", sp.diff(c + 0 * x, x) - 0, [(c.subs(c, 5) + 0 * x, sp.Integer(0))])
xp = sp.symbols("xp", positive=True)
results.append(("power-rule",
                sp.simplify(sp.diff(xp**n, xp) - n * xp**(n - 1)) == 0,
                all(numeric_ok(x**m, m * x**(m - 1), [sp.Rational(1, 2), 1, 2]) for m in
                    (sp.Integer(5), sp.Rational(1, 3), sp.Integer(-2), sp.pi))))
rule("constant-multiple", sp.diff(c * f(x), x) - c * sp.diff(f(x), x), [(7 * u, 7 * up)])
rule("sum-rule", sp.diff(f(x) + g(x), x) - (sp.diff(f(x), x) + sp.diff(g(x), x)), [(u + v, up + vp)])
rule("difference-rule", sp.diff(f(x) - g(x), x) - (sp.diff(f(x), x) - sp.diff(g(x), x)), [(u - v, up - vp)])
rule("product-rule", sp.diff(f(x) * g(x), x) - (sp.diff(f(x), x) * g(x) + f(x) * sp.diff(g(x), x)), [(u * v, up * v + u * vp)])
rule("quotient-rule", sp.diff(f(x) / g(x), x) - (sp.diff(f(x), x) * g(x) - f(x) * sp.diff(g(x), x)) / g(x)**2,
     [(u / v, (up * v - u * vp) / v**2)])
rule("chain-rule", sp.diff(f(g(x)), x) - sp.Subs(sp.diff(f(y), y), y, g(x)) * sp.diff(g(x), x),
     [(sp.sin(v), sp.cos(v) * vp), (sp.exp(u), sp.exp(u) * up)])
rule("reciprocal-rule", sp.diff(1 / g(x), x) - (-sp.diff(g(x), x) / g(x)**2), [(1 / v, -vp / v**2)])
rule("logarithmic-derivative", sp.diff(sp.log(f(x)), x) - sp.diff(f(x), x) / f(x),
     [(sp.log(u), up / u), (sp.log(v), vp / v)])
# Inverse function rule: (f⁻¹)′(x) = 1/f′(f⁻¹(x)), checked on concrete pairs (f, f⁻¹).
inv_pairs = [(sp.exp(y), sp.log(x)), (y**3 + y, None), (sp.sin(y), sp.asin(x)), (sp.tan(y), sp.atan(x))]
ok_sym, ok_num = True, True
for fy, finv in inv_pairs:
    if finv is None:
        continue
    claimed = 1 / sp.diff(fy, y).subs(y, finv)
    ok_sym &= sp.simplify(sp.diff(finv, x) - claimed) == 0 or sp.simplify(
        (sp.diff(finv, x) - claimed).subs(x, sp.Rational(1, 2))) == 0
    ok_num &= numeric_ok(finv, claimed, [sp.Rational(1, 5), sp.Rational(1, 2), sp.Rational(9, 10)])
# a general check: differentiate f(f⁻¹(x)) = x with the chain rule and solve for (f⁻¹)′
finv = sp.Function("finv")
sol = sp.solve(sp.Eq(sp.diff(f(finv(x)), x), 1), sp.diff(finv(x), x))[0]
ok_sym &= sp.simplify(sol - 1 / sp.Subs(sp.diff(f(y), y), y, finv(x)).doit()) == 0
results.append(("inverse-function-rule", ok_sym, ok_num))
# Definition of the derivative: the limit gives the derivative for several concrete f.
defs = [xp**3, sp.sin(xp), sp.exp(xp), sp.sqrt(xp), 1 / xp]
ok = all(sp.simplify(sp.limit((F.subs(xp, xp + h) - F) / h, h, 0) - sp.diff(F, xp)) == 0 for F in defs)
# numeric: the one-sided difference quotient (F(p + h) − F(p))/h with h = 10⁻⁸ (30-digit
# arithmetic) is within 10⁻⁶ of the derivative at three points, for each concrete f
hn = sp.Rational(1, 10**8)
ok_num = all(abs(sp.N((F.subs(xp, p + hn) - F.subs(xp, p)) / hn, 30) - sp.N(sp.diff(F, xp).subs(xp, p), 30)) < 1e-6
             for F in defs for p in (sp.Rational(1, 2), 1, 2))
results.append(("definition", ok, ok_num))

# --- Powers
card("x", x, sp.Integer(1), [-1, 0.5, 2])
card("x-squared", x**2, 2 * x, [-1, 0.5, 2])
card("x-cubed", x**3, 3 * x**2, [-1, 0.5, 2])
card("square-root", sp.sqrt(xp).subs(xp, x), 1 / (2 * sp.sqrt(x)), [0.25, 1, 4])
card("one-over-x", 1 / x, -1 / x**2, [-2, 0.5, 3])
card("one-over-x-squared", 1 / x**2, -2 / x**3, [-2, 0.5, 3])

# --- Exponential and logarithmic functions
card("e-to-x", sp.exp(x), sp.exp(x), [-1, 0, 2])
card("e-to-kx", sp.exp(k * x), k * sp.exp(k * x), [-1, 0, 2], subs={k: 3})
card("a-to-x", a**x, a**x * sp.log(a), [-1, 0, 2], subs={a: 5})
card("ln-x", sp.log(x), 1 / x, [0.5, 1, 3])
card("ln-abs-x", sp.log(sp.Abs(x)), 1 / x, [-3, -0.5, 2], assume=[{x: xp}, {x: -xp}])  # x > 0 and x < 0
card("log-a-x", sp.log(x, a), 1 / (x * sp.log(a)), [0.5, 1, 3], subs={a: 10})
card("x-to-x", xp**xp, xp**xp * (sp.log(xp) + 1), [])  # symbolic in xp below
results[-1] = ("x-to-x", sp.simplify(sp.diff(xp**xp, xp) - xp**xp * (sp.log(xp) + 1)) == 0,
               numeric_ok(x**x, x**x * (sp.log(x) + 1), [0.5, 1, 2]))

# --- Trigonometric functions (x in radians)
card("sin", sp.sin(x), sp.cos(x), [-1, 0.3, 2])
card("cos", sp.cos(x), -sp.sin(x), [-1, 0.3, 2])
card("tan", sp.tan(x), 1 / sp.cos(x)**2, [-1, 0.3, 1.2])
card("cot", sp.cot(x), -1 / sp.sin(x)**2, [-1, 0.3, 2])
card("sec", sp.sec(x), sp.sec(x) * sp.tan(x), [-1, 0.3, 1.2])
card("csc", sp.csc(x), -sp.csc(x) * sp.cot(x), [-1, 0.3, 2])
card("sin-kx", sp.sin(k * x), k * sp.cos(k * x), [-1, 0.3, 2], subs={k: 3})
card("cos-kx", sp.cos(k * x), -k * sp.sin(k * x), [-1, 0.3, 2], subs={k: 3})

# --- Inverse trigonometric functions
card("arcsin", sp.asin(x), 1 / sp.sqrt(1 - x**2), [-0.5, 0.1, 0.9])
card("arccos", sp.acos(x), -1 / sp.sqrt(1 - x**2), [-0.5, 0.1, 0.9])
card("arctan", sp.atan(x), 1 / (1 + x**2), [-2, 0.1, 3])

# --- Hyperbolic functions and their inverses
card("sinh", sp.sinh(x), sp.cosh(x), [-1, 0.3, 2])
card("cosh", sp.cosh(x), sp.sinh(x), [-1, 0.3, 2])
card("tanh", sp.tanh(x), 1 / sp.cosh(x)**2, [-1, 0.3, 2])
card("arsinh", sp.asinh(x), 1 / sp.sqrt(x**2 + 1), [-2, 0.3, 3])
card("arcosh", sp.acosh(x), 1 / sp.sqrt(x**2 - 1), [1.5, 2, 5], assume=[{x: 1 + xp}])  # x > 1
card("artanh", sp.atanh(x), 1 / (1 - x**2), [-0.5, 0.1, 0.9])

# --- Equivalent forms named in back notes
alt = [
    ("tan: 1/cos² x = 1 + tan² x = sec² x", [1 / sp.cos(x)**2 - (1 + sp.tan(x)**2), 1 / sp.cos(x)**2 - sp.sec(x)**2]),
    ("cot: −1/sin² x = −(1 + cot² x) = −csc² x", [-1 / sp.sin(x)**2 + (1 + sp.cot(x)**2), -1 / sp.sin(x)**2 + sp.csc(x)**2]),
    ("tanh: 1/cosh² x = 1 − tanh² x = sech² x", [1 / sp.cosh(x)**2 - (1 - sp.tanh(x)**2), 1 / sp.cosh(x)**2 - sp.sech(x)**2]),
]
for label, exprs in alt:
    # numeric: each difference of forms evaluates to within 10⁻²⁰ of 0 at three points (30 digits)
    num = all(abs(sp.N(e.subs(x, sp.Rational(p, 10)), 30)) < 1e-20 for e in exprs for p in (-7, 3, 11))
    results.append((f"[alt] {label}", all(sp.simplify(e) == 0 for e in exprs), num))

bad = [r for r in results if not (r[1] and r[2])]
for cid, sym, num in results:
    print(f"{cid:28} symbolic={'ok' if sym else 'FAIL'} numeric={'ok' if num else 'FAIL'}")
print(f"{len(results)} checks, {len(results) - len(bad)} passed, {len(bad)} failed; sympy {sp.__version__}")

```

**Find the Wikidata items of the rules and functions (wbsearchentities, one request per name)** (Wikidata)

```
https://www.wikidata.org/w/api.php?action=wbsearchentities&search=<name>&language=en&format=json&limit=3
for <name> in: product rule; quotient rule; chain rule; power rule; sum rule in differentiation; reciprocal rule; inverse function rule; constant factor rule in differentiation; derivative; linearity of differentiation; logarithmic derivative; differentiation rules; inverse functions and differentiation; sine; cosine; tangent; exponential function; natural logarithm; hyperbolic sine; arcsine; arctangent; inverse hyperbolic sine; secant; cosecant; cotangent; absolute value; square root; derivative of the exponential function; inverse trigonometric functions; inverse trigonometric function
```

**English and Swedish labels, Swedish aliases and defining formulas of the items (SPARQL, https://query.wikidata.org/sparql)** (Wikidata)

```
SELECT ?item ?en ?sv (GROUP_CONCAT(DISTINCT ?svAlt; separator=" | ") AS ?svAlts) (GROUP_CONCAT(DISTINCT ?f; separator=" || ") AS ?formulas) WHERE {
  VALUES ?item { wd:Q466720 wd:Q531392 wd:Q207455 wd:Q1190543 wd:Q2141200 wd:Q1246553 wd:Q1367447 wd:Q29175 wd:Q4895685 wd:Q762521 wd:Q90011163 wd:Q2143416 wd:Q47306354 wd:Q204037 wd:Q1256164 wd:Q1129196 }
  OPTIONAL { ?item rdfs:label ?en FILTER(LANG(?en) = "en") }
  OPTIONAL { ?item rdfs:label ?sv FILTER(LANG(?sv) = "sv") }
  OPTIONAL { ?item skos:altLabel ?svAlt FILTER(LANG(?svAlt) = "sv") }
  OPTIONAL { ?item wdt:P2534 ?f }
} GROUP BY ?item ?en ?sv
```

**Labels, Swedish aliases, Swedish Wikipedia sitelinks and P2534 defining formulas (TeX) of the rule items** (Wikidata)

```
https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q466720%7CQ531392%7CQ207455%7CQ1190543%7CQ2141200%7CQ1246553%7CQ1367447%7CQ29175%7CQ4895685%7CQ762521%7CQ2143416%7CQ47306354&props=labels%7Caliases%7Cclaims%7Csitelinks&languages=en%7Csv&format=json
```

**Swedish name of the inverse trigonometric functions (found with wbsearchentities, search=inverse trigonometric function)** (Wikidata)

```
https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q674533&props=labels%7Caliases%7Cclaims%7Csitelinks&languages=en%7Csv&format=json
```

**Licence of Wikidata** (Wikidata)

```
https://www.wikidata.org/wiki/Wikidata:Licensing
```

**DLMF terms of use and the sections with the derivatives (saved as HTML and read as text)** (NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15))

```
https://dlmf.nist.gov/about/notices
https://dlmf.nist.gov/4
https://dlmf.nist.gov/1.4
https://dlmf.nist.gov/4.7
https://dlmf.nist.gov/4.20
https://dlmf.nist.gov/4.24
https://dlmf.nist.gov/4.34
https://dlmf.nist.gov/4.38
```

**Wikitext of the English article and the Wikipedia licence page** (Differentiation rules (English Wikipedia))

```
https://en.wikipedia.org/w/index.php?title=Differentiation+rules&action=raw
https://en.wikipedia.org/wiki/Wikipedia:Copyrights
```

**Wikitext and rendered page (licence footer) of the Swedish article, and the article on the product rule** (Derivata (Swedish Wikipedia))

```
https://sv.wikipedia.org/w/index.php?title=Derivata&action=raw
https://sv.wikipedia.org/wiki/Derivata
https://sv.wikipedia.org/w/index.php?title=Produktregeln&action=raw
https://sv.wikipedia.org/w/index.php?title=Arcusfunktion&action=raw (404: no such article; the term was checked on Wikidata instead)
```

**Swedish term for the logarithmic derivative (wikitext) and the page's licence footer** (Logaritmisk derivering (Swedish Wikipedia))

```
https://sv.wikipedia.org/w/index.php?title=Logaritmisk_derivering&action=raw
https://sv.wikipedia.org/wiki/Logaritmisk_derivering
```

**Swedish label of calculus for the keywords (QC round 2)** (Wikidata)

```
https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q149972&props=labels%7Csitelinks&languages=en%7Csv&sitefilter=svwiki&format=json
```

**Build, Wikidata checks and validation of the deck** (Derivations and SymPy verification for the Solid Memo derivatives deck)

```
python3 packages/deck-library/scripts/authored_decks.py build derivatives
node packages/deck-library/scripts/validate_sources.ts derivatives
```

**QC round 4: English and Swedish labels and aliases of Q2143416** (Wikidata)

```
curl -s -A "solid-memo deck research (https://github.com/antwika/solid-memo)" "https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q2143416&props=labels|aliases&languages=en|sv&format=json"
```

**QC round 4: re-fetch of the Differentiation rules wikitext for § Inverse function rule** (Differentiation rules (English Wikipedia))

```
curl -s -A "solid-memo deck research (https://github.com/antwika/solid-memo)" "https://en.wikipedia.org/w/index.php?title=Differentiation+rules&action=raw"
```

## Quality control

6 rounds, 33 findings: 28 fixed, 0 rejected after checking, 5 needing no change. Every card's Wikidata checks (10 in all) are re-run against live Wikidata by `scripts/authored_decks.py check` before every build.

### Round 0: Machine verification and source cross-checks (2026-10-04)

**Reviewer:** Claude (AI) — authoring agent, machine checks · **Scope:** All 42 cards

verify_derivatives.py (SymPy 1.14.0) ran 45 checks (42 cards plus the alternative forms named in the notes of tan, cot and tanh): 45 passed; 41 both symbolically and numerically, while the numeric result of the definition card and the three alternative-form identities was a placeholder until QC round 3 added real numeric checks (now 45 of 45 both ways). The first run had 2 symbolic failures that were artefacts of SymPy not simplifying without a domain (ln|x| and arcosh x); restricting x to the stated domain resolved them, the numerical checks having passed from the start. Every card was compared with DLMF and/or English or Swedish Wikipedia (each card's evidence lists which); no card's formula disagrees with any source. The builder's Wikidata checks cover the rule names used in the notes (11 label checks on 7 items; 10 since QC round 2 dropped the Swedish label check on Q762521). Discrepancies found in the sources are logged below; none changed a card's formula.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| ln-abs-x | SymPy did not simplify d/dx ln\|x\| − 1/x to 0 for a real x without a sign (it differentiates through sign(x)). | Checked separately for x > 0 and x < 0, where it simplifies to 0; the numerical check at x = −3, −0.5 and 2 had passed. | no change needed |
| arcosh | SymPy gives d/dx arcosh x as 1/(√(x − 1)·√(x + 1)) and did not simplify it to 1/√(x² − 1) for a real x without a domain. DLMF 4.38.10 gives ±(z² − 1)^(−1/2) with the sign by ℜz ≷ 0. | Checked for x > 1 (the real domain of arcosh), where the forms agree and the sign is +; a back note states x > 1. | no change needed |
| product-rule | Wikidata's Swedish label of Q466720 (product rule) is "Leibniz lag", while its Swedish Wikipedia sitelink and the section heading in sv:Derivata are "Produktregeln" ("Produktregeln (Leibniz formel)"); Leibniz's name is more often attached to the general rule for the n-th derivative of a product. | The Swedish note uses "Produktregeln", the name of the Swedish Wikipedia article; no Swedish label check on this card (the English label "product rule" is checked). | fixed |
| power-rule | Wikidata has no Swedish label for the power rule, sum rule, reciprocal rule, constant factor rule or inverse-function rule, and Swedish Wikipedia's Derivata gives the sum rule as "Additionsregeln" without other sources confirming that as the usual name. | The Swedish notes of these cards describe the rule in words instead of naming it. | fixed |
| sum-rule | Wikidata's English label of Q2141200 is "sum rule in differentiation", not the short "sum rule" in the note. | No label check on this card; the note's wording is a description, and the formula agrees with Wikidata P2534 "(f + g)'(x) = f'(x) + g'(x)". | no change needed |
| arccot | arccot is defined with two range conventions that differ at x = 0 (its derivative −1/(1 + x²) is the same for x ≠ 0, as QC round 1 pointed out); the derivatives of arcsec and arccsc depend on the convention (Wikipedia's table depends on the stated range, and Swedish Wikipedia's table gives d/dx arcsec x = 1/(x√(x² − 1)) without the absolute value). Swedish Wikipedia's table also gives d/dx arcoth x = −1/(1 − x²), the opposite sign to DLMF 4.38.14 and English Wikipedia (1/(1 − x²)). | Cards for arccot, arcsec, arccsc and arcoth were left out of the deck. | fixed |
| log-a-x | English Wikipedia states d/dx logₐ x = 1/(x ln a) with the condition c > 1 and adds that it also holds for other bases; DLMF has no separate equation for logₐ. | The front note states a > 0, a ≠ 1 (the bases for which logₐ is defined); SymPy confirms the formula for a general positive a. | no change needed |

### Round 1: Factual accuracy (2026-10-04)

**Reviewer:** Claude (AI) — independent factual accuracy reviewer · **Scope:** All 42 cards

No wrong formula found (independent SymPy script, DLMF equation sources, Wikipedia wikitext, Wikidata). One warning about overclaimed sourcing in the description and round 0, fixed; three suggestions on notes and the arccot exclusion, all applied after checking.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| deck | The description and round 0 said every card was checked against both DLMF and Wikipedia; several cards cite only one (sin-kx and cos-kx only DLMF; constant, ln-abs-x, log-a-x, x-to-x and others only Wikipedia). | Verified against the evidence arrays: 9 cards have no DLMF evidence and 6 no Wikipedia evidence. Description reworded (en "against the NIST Digital Library of Mathematical Functions or Wikipedia (most cards both)", sv "eller Wikipedia (de flesta mot båda)"); round 0 summary now says "DLMF and/or English or Swedish Wikipedia (each card's evidence lists which)"; method step 6 lists which cards lack which source. | fixed |
| deck | The selection's reason for leaving out arccot (derivative depends on the range convention) is inaccurate: −1/(1 + x²) holds for x ≠ 0 under both conventions. | Verified: arctan(1/x) and π/2 − arctan x both differentiate to −1/(1 + x²) for x ≠ 0; en:Differentiation rules and sv:Derivata give the formula without caveat. Exclusion reason changed to "less commonly taught and defined with two range conventions" (no card added, to keep the deck's scope); round 0's arccot finding reworded accordingly. | fixed |
| power-rule | The note "Holds for every real n (for x > 0 when n is not an integer)" leaves out x ≠ 0 for n ≤ 0 (0·x⁻¹ is undefined at 0). | Verified. Note now: "Power rule, for every real n: for x ≠ 0 when n ≤ 0, and for x > 0 when n is not an integer." (sv likewise). This keeps x = 0 for positive integer n, where the formula does hold. | fixed |
| arcosh | arcosh and artanh lack the note on alternative notations that arsinh has; DLMF writes arccosh and arctanh. | Verified against DLMF 4.38.10–4.38.11. Notes added in the arsinh style: "arcosh, the inverse of cosh, is also written arccosh or cosh⁻¹" and "artanh, the inverse of tanh, is also written arctanh or tanh⁻¹" (sv likewise), after the domain. | fixed |

### Round 2: Language and translation (2026-10-04)

**Reviewer:** Claude (AI) — independent language and translation reviewer · **Scope:** All 42 cards, title, description and keywords in English and Swedish

No errors in the cards' notation or Unicode. Three warnings on the description (inverse hyperbolic functions missing, card count mislabelled, checking overstated) and one on the reciprocal rule's Swedish note, all fixed; six suggestions, all applied.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| deck | The descriptions do not say clearly that the inverse hyperbolic functions are in the deck (the Swedish leaves them out). | Fixed: en "... inverse trigonometric, hyperbolic and inverse hyperbolic functions"; sv "... trigonometriska funktioner, arcusfunktioner, hyperboliska funktioner och deras inverser" (Wikidata Q640600 has no sv label, so a descriptive phrase). | fixed |
| deck | "42 derivatives" / "42 derivator" miscounts: 12 cards are rules or the definition. | Fixed: "42 cards on derivatives for calculus students: the definition, the differentiation rules ..." / "42 kort om derivator för den som läser matematisk analys: definitionen, deriveringsreglerna ...". | fixed |
| deck | The description overstates the checking (DLMF and Wikipedia for every card) and says rule names come from Wikidata, though Produktregeln comes from sv.wikipedia and "Sum rule" is not the Wikidata label. | Verified against the evidence arrays: 9 cards have no DLMF evidence and 6 no Wikipedia evidence. Description reworded (en "against the NIST Digital Library of Mathematical Functions or Wikipedia (most cards both)", sv "eller Wikipedia (de flesta mot båda)"); round 0 summary now says "DLMF and/or English or Swedish Wikipedia (each card's evidence lists which)"; method step 6 lists which cards lack which source. The Wikidata clause now reads "rule names checked against Wikidata" / "regelnamnen är kontrollerade mot Wikidata", and method step 5 says which names come from where. | fixed |
| deck | The Swedish rule list "(summa, produkt, kvot, kedjeregeln med flera)" mixes bare nouns and a full name. | Fixed to "(summa-, produkt-, kvot- och kedjeregeln med flera)"; the function list was likewise regularised to "exponential- och logaritmfunktioner, trigonometriska funktioner, ...". | fixed |
| reciprocal-rule | The Swedish note "Där g ≠ 0." is a fragment with nothing for "där" to refer to. | Fixed: "Derivatan av 1/g, där g ≠ 0." (Wikidata Q1246553 has no Swedish label, so a description). | fixed |
| logarithmic-derivative | The Swedish note speaks of the technique (logaritmisk derivering) while the English names f′/f; Swedish has "den logaritmiska derivatan". | Verified in sv.wikipedia Logaritmisk derivering (fetched today): "Den logaritmiska derivatan av en funktion f kan tas att vara ... f′(x)/f(x)". Swedish note now "Den logaritmiska derivatan, för f(x) > 0."; that article added as a verification source and as evidence; the sv label check on Q762521 ("Logaritmisk derivering", which names the technique) dropped and the mismatch recorded in the card's Wikidata evidence; the en label check kept. | fixed |
| log-a-x | The frontNote "a > 0, a ≠ 1, is a constant" puts the conditions where the subject should be; same pattern on a-to-x. | Fixed on both: "a is a constant, a > 0, a ≠ 1" / "a är en konstant, a > 0, a ≠ 1" and "a is a constant, a > 0" / "a är en konstant, a > 0". | fixed |
| sec | "sec x·tan x" (and "−csc x·cot x" on csc) can be read as sec(x·tan x). | Fixed: backs are now "sec x · tan x" and "−csc x · cot x", with spaces around the dot. | fixed |
| arcosh | arcosh and artanh lack the note on alternative spellings that arsinh has. | Same as round 1: notes added on arcosh (arccosh, cosh⁻¹) and artanh (arctanh, tanh⁻¹). | fixed |
| deck | Swedish keyword: add "infinitesimalkalkyl", Wikidata's Swedish label for calculus. | Verified (wbgetentities Q149972, fetched today: sv label "infinitesimalkalkyl", svwiki "Infinitesimalkalkyl"). Keyword added; "matematisk analys" kept. | fixed |

### Round 3: Licensing, attribution and documentation (2026-10-04)

**Reviewer:** Claude (AI) — independent licensing, attribution and documentation reviewer · **Scope:** All 42 cards, all sources and licence evidence, method, queries and round 0

No licensing errors; every licence quote verified. Three warnings on overstated documentation (sourcing and Wikidata role in the description, placeholder numeric results in the verification script, "compared by hand"), all fixed; five suggestions: four applied, one (the main-branch URL) needing no dossier change.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| deck | The description and method claim every card is checked against both DLMF and Wikipedia and that rule formulas come from Wikidata; the formulas were only compared with Wikidata. | Verified against the evidence arrays: 9 cards have no DLMF evidence and 6 no Wikipedia evidence. Description reworded (en "against the NIST Digital Library of Mathematical Functions or Wikipedia (most cards both)", sv "eller Wikipedia (de flesta mot båda)"); round 0 summary now says "DLMF and/or English or Swedish Wikipedia (each card's evidence lists which)"; method step 6 lists which cards lack which source. The description now says only that rule names are checked against Wikidata; method step 5, the Wikidata source's usedFor and the licensing text say the P2534 formulas were compared with the cards, not taken from them. | fixed |
| deck | In verify_derivatives.py the numeric result of the definition check and the three [alt] identity checks was hard-coded True, yet round 0 said all 45 passed both symbolically and numerically. | Verified in the script. Real numeric checks added: for the definition card a one-sided difference quotient (h = 10⁻⁸, 30 digits) of x³, sin x, eˣ, √x and 1/x at x = 1/2, 1, 2 must be within 10⁻⁶ of the derivative; for each identity the differences of the forms must vanish to 10⁻²⁰ at x = −0.7, 0.3, 1.1. Re-run with SymPy 1.14.0: 45 checks, 45 passed. The script under Queries, method step 4, round 0's summary and the affected cards' derivation evidence were updated. | fixed |
| deck | Method step 6 says each card "was compared by hand", although an AI agent did it and no human has reviewed the cards. | Fixed: "was compared by the authoring AI agent, equation by equation, with ...". | fixed |
| deck | Method step 1 does not mention the independent AI reviewers. | Fixed: step 1 now names the independent AI reviewers of QC rounds 1–3 and their lenses. | fixed |
| deck | The derivation source's URL on the main branch returns 404 because the dossier is not merged yet. | Correct but expected before merge; no release happens from this branch. The derivation source's usedFor now says the script text is under Queries and that the URL resolves once the dossier is merged into main. | no change needed |
| constant-multiple | The Swedish note "En konstant faktor kan flyttas ut ur derivatan" closely follows sv:Derivata's "En konstant (c) kan flyttas ut ur deriveringen"; the function list and the tan/cot/tanh alternative forms overlap Wikipedia's tables. | Swedish note reworded in own phrasing: "En konstant faktor följer med oförändrad vid derivering." The licensing text now explains that the overlap with Wikipedia's tables follows from the standard syllabus and standard identities, which carry no protectable selection. | fixed |
| inverse-function-rule | Two "says" fields are paraphrases: svwiki on inverse-function-rule and DLMF on logarithmic-derivative. | Verified against the saved wikitext and DLMF 4.7 page. Both now quote the source verbatim (Swedish text of sv:Derivata § Derivata av invers; DLMF "For a nonvanishing analytic function f(z), the general solution of the differential equation 4.7.5 ... is 4.7.6 w(z) = Ln(f(z)) + constant."). | fixed |
| deck | The recorded SPARQL query lists Q90011163, Q204037, Q1256164 and Q1129196, which the method never mentions. | The query was run as recorded (wd_labels.py, results saved). Method step 5 now says these are differentiation rule, natural logarithm, cosine and tangent, looked up as candidates and not needed. | fixed |

### Round 4: Final re-check (loop 1): changed cards, every third card, metadata, licence and documentation (2026-10-04)

**Reviewer:** Claude (AI) — independent final re-check reviewer · **Scope:** 25 of 42 cards (the 15 cards changed in round 3's fixes plus every third card), metadata, licence and documentation

All 25 checked cards correct and their quotes verbatim; SymPy re-run 45/45, builder and validators pass. Three documentation warnings, each verified against the dossier, live Wikidata and the English Wikipedia wikitext, and fixed; no card's front, back or notes changed (one evidence entry added).

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| deck | Method step 6 says the nine cards without DLMF evidence have Wikipedia "(and Wikidata)", but only the reciprocal and inverse-function rules among them have Wikidata evidence. | Verified by listing each card's evidence sources: constant, constant-multiple, difference-rule, x, ln-abs-x, log-a-x and x-to-x have no Wikidata evidence. Step 6 now reads "have Wikipedia (the reciprocal and inverse-function rules also Wikidata) but no DLMF equation". | fixed |
| inverse-function-rule | The enwiki source's usedFor claims English Wikipedia was an independent check of the inverse function rule, but the card's evidence had no enwiki entry. | Re-fetched https://en.wikipedia.org/w/index.php?title=Differentiation+rules&action=raw on 2026-10-04; § Inverse function rule states g′ = 1/(f′∘g) for the inverse g of f (g(f(x)) = x, f(g(y)) = y), which agrees with the card. Added that enwiki evidence entry to the card (the TeX rendered as text), so the usedFor is now accurate. | fixed |
| deck | Method step 5 and the Wikidata source's usedFor say the English rule names in the notes are Wikidata labels with "Sum rule" the only exception, but the Wikidata English label of Q2143416 is "inverse functions and differentiation", not "Inverse function rule". | Verified with wbgetentities (Q2143416: en label "inverse functions and differentiation", no aliases, no sv label). Step 5 now names "Inverse function rule" as a second exception, the section heading in English Wikipedia's Differentiation rules; the Wikidata usedFor says the same. The card has no Wikidata label check, so no check changed. | fixed |

### Round 5: Final re-check (loop 2): changed card inverse-function-rule, every third card (1, 4, 7, ..., 40), metadata, licence and documentation (2026-10-04)

**Reviewer:** Claude (AI) — independent final re-check reviewer · **Scope:** 15 of 42 cards (inverse-function-rule plus every third card), metadata, licence and documentation

All 15 checked cards correct and their quotes verbatim; builder, SymPy and validators pass. One documentation warning, verified by listing each card's evidence sources, and fixed by rewording the English Wikipedia source description; no card changed.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| deck | The enwiki source's usedFor says English Wikipedia was an independent check of "every rule", but sum-rule, product-rule, quotient-rule and chain-rule have no enwiki evidence, contradicting method step 6. | Verified by listing each card's evidence sources: 26 cards cite enwiki; definition, sum-rule, product-rule, quotient-rule, chain-rule and 11 derivative cards do not. Chose to reword rather than add evidence, so method step 6 and the round 1 and 3 counts stay accurate. The usedFor now names the rules that cite it (constant, power, constant-multiple, difference, reciprocal, inverse-function, logarithmic derivative) and 19 derivatives, and says the other cards are checked against DLMF, the SymPy derivation and, where noted, Swedish Wikipedia and Wikidata. | fixed |

## Cards and evidence

| Card | Front | Back | Evidence |
|---|---|---|---|
| `definition` | Definition of f′(x) (en) / Definitionen av f′(x) (sv) | lim h→0 (f(x + h) − f(x))/h — *The derivative is the limit of the difference quotient, where it exists. (en) / Derivatan är gränsvärdet av differenskvoten, där det existerar. (sv)* | Wikidata: Q29175 (derivative), P2534 defining formula — f'(x) = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §1.4(iii), eq. 1.4.4, https://dlmf.nist.gov/1.4.E4 — The derivative f′(x) of f(x) is defined by f′(x) = df/dx = lim h→0 (f(x+h) − f(x))/h.<br>Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, check "definition" — The limit of the difference quotient equals SymPy's derivative for x³, sin x, eˣ, √x and 1/x: symbolic=ok; one-sided difference quotient with h = 10⁻⁸ at x = 1/2, 1, 2 within 10⁻⁶ of the derivative: numeric=ok.<br>Wikidata checks: Q29175 en = derivative, Q29175 sv = derivata |
| `constant` | d/dx c | 0 | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, check "constant" — symbolic=ok numeric=ok<br>Differentiation rules (English Wikipedia): Differentiation rules, § Constant term rule — if f(x) is the constant function given by f(x) = c, then df/dx = 0.<br>Derivata (Swedish Wikipedia): Derivata, § Definition, Exempel — Derivatan av den konstanta funktionen f(x) = c är lika med noll |
| `power-rule` | d/dx xⁿ | n·xⁿ⁻¹ — *Power rule, for every real n: for x ≠ 0 when n ≤ 0, and for x > 0 when n is not an integer. (en) / Gäller för alla reella n: för x ≠ 0 när n ≤ 0, och för x > 0 när n inte är ett heltal. (sv)* | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, check "power-rule" — symbolic=ok (general n, x > 0) numeric=ok (n = 5, 1/3, −2, π)<br>Wikidata: Q1190543 (power rule), P2534 defining formula — \frac{\text{d}}{\text{d}x}x^n = nx^{n-1}<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.7(ii), eq. 4.7.10, https://dlmf.nist.gov/4.7.E10 — d/dz z^a = a z^(a−1)<br>Differentiation rules (English Wikipedia): Differentiation rules, § Polynomial or elementary power rule — If f(x) = x^r, for any real number r ≠ 0, then: f′(x) = r x^(r−1).<br>Wikidata checks: Q1190543 en = power rule |
| `constant-multiple` | (c·f)′ | c·f′ — *A constant factor can be moved outside the derivative. (en) / En konstant faktor följer med oförändrad vid derivering. (sv)* | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, check "constant-multiple" — symbolic=ok numeric=ok<br>Differentiation rules (English Wikipedia): Differentiation rules, § Linearity of differentiation — (af)′ = af′<br>Derivata (Swedish Wikipedia): Derivata, § Linjäritet — En konstant (c) kan flyttas ut ur deriveringen: (c·f)′ = c·f′ |
| `sum-rule` | (f + g)′ | f′ + g′ — *Sum rule: the derivative of a sum is the sum of the derivatives. (en) / Derivatan av en summa är summan av derivatorna. (sv)* | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, check "sum-rule" — symbolic=ok numeric=ok<br>Wikidata: Q2141200 (sum rule in differentiation), P2534 defining formula — (f + g)'(x) = f'(x) + g'(x)<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §1.4(iii), eq. 1.4.5, https://dlmf.nist.gov/1.4.E5 — (f + g)′(x) = f′(x) + g′(x) |
| `difference-rule` | (f − g)′ | f′ − g′ — *The derivative of a difference is the difference of the derivatives. (en) / Derivatan av en differens är differensen av derivatorna. (sv)* | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, check "difference-rule" — symbolic=ok numeric=ok<br>Differentiation rules (English Wikipedia): Differentiation rules, § Linearity of differentiation — (f − g)′ = f′ − g′. |
| `product-rule` | (f·g)′ | f′·g + f·g′ — *Product rule. (en) / Produktregeln. (sv)* | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, check "product-rule" — symbolic=ok numeric=ok<br>Wikidata: Q466720 (product rule), P2534 defining formula; Swedish Wikipedia sitelink — (f g)'(x) = f'(x) g(x) + f(x) g'(x); svwiki sitelink "Produktregeln" (Swedish label "Leibniz lag")<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §1.4(iii), eq. 1.4.6, https://dlmf.nist.gov/1.4.E6 — (fg)′(x) = f′(x)g(x) + f(x)g′(x)<br>Derivata (Swedish Wikipedia): Derivata, § Produktregeln (Leibniz formel) — Produkten av två deriverbara funktioner är deriverbar och derivatan ges av (f·g)′ = f′·g + f·g′<br>Wikidata checks: Q466720 en = product rule |
| `quotient-rule` | (f/g)′ | (f′·g − f·g′)/g² — *Quotient rule, where g ≠ 0. (en) / Kvotregeln, där g ≠ 0. (sv)* | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, check "quotient-rule" — symbolic=ok numeric=ok<br>Wikidata: Q531392 (quotient rule), P2534 defining formula — \left( \frac{f}{g} \right)'(x) = \frac{f'(x) g(x) - f(x) g'(x)}{(g(x))^2}<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §1.4(iii), eq. 1.4.7, https://dlmf.nist.gov/1.4.E7 — (f/g)′(x) = (f′(x)g(x) − f(x)g′(x))/(g(x))²<br>Derivata (Swedish Wikipedia): Derivata, § Kvotregeln — I de punkter där funktionen g är nollskild och där den har en derivata, är derivatan av kvoten f/g funktionen (f/g)′ = (f′·g − f·g′)/g²<br>Wikidata checks: Q531392 en = quotient rule, Q531392 sv = Kvotregeln |
| `chain-rule` | d/dx f(g(x)) | f′(g(x))·g′(x) — *Chain rule: the outer derivative times the inner derivative. (en) / Kedjeregeln: yttre derivatan gånger inre derivatan. (sv)* | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, check "chain-rule" — symbolic=ok numeric=ok<br>Wikidata: Q207455 (chain rule), P2534 defining formula; Swedish label and aliases — (f \circ g)'(x) = f'(g(x)) \cdot g'(x); sv label "kedjeregeln", sv aliases "Inre derivata", "Inre derivatan"<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §1.4(iii), eq. 1.4.10, https://dlmf.nist.gov/1.4.E10 — h′(x) = f′(g(x)) g′(x).<br>Wikidata checks: Q207455 en = chain rule, Q207455 sv = kedjeregeln |
| `reciprocal-rule` | (1/g)′ | −g′/g² — *Reciprocal rule, where g ≠ 0. (en) / Derivatan av 1/g, där g ≠ 0. (sv)* | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, check "reciprocal-rule" — symbolic=ok numeric=ok<br>Wikidata: Q1246553 (reciprocal rule), P2534 defining formula — \frac{\mathrm d}{\mathrm dx}\left(\frac{1}{f(x)}\right) = -\frac{f'(x)}{(f(x))^2}<br>Differentiation rules (English Wikipedia): Differentiation rules, § Reciprocal rule — The derivative of h(x) = 1/f(x) for any (nonvanishing) function f is: h′(x) = −f′(x)/(f(x))², wherever f is nonzero.<br>Wikidata checks: Q1246553 en = reciprocal rule |
| `inverse-function-rule` | (f⁻¹)′(x) | 1/f′(f⁻¹(x)) — *Inverse function rule, where f′(f⁻¹(x)) ≠ 0. (en) / Derivatan av en invers funktion, där f′(f⁻¹(x)) ≠ 0. (sv)* | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, check "inverse-function-rule" — symbolic=ok (exp/ln, sin/arcsin, tan/arctan, and solving d/dx f(f⁻¹(x)) = 1) numeric=ok<br>Wikidata: Q2143416 (inverse functions and differentiation), P2534 defining formula — \frac{\text{d}}{\text{d}y}f^{-1}(y) = \frac{1}{\frac{\text{d}}{\text{d}x}f\left(f^{-1}(y)\right)}<br>Differentiation rules (English Wikipedia): Differentiation rules, § Inverse function rule — If the function f has an inverse function g, meaning that g(f(x)) = x and f(g(y)) = y, then: g′ = 1/(f′∘g).<br>Derivata (Swedish Wikipedia): Derivata, § Derivata av invers — Anta att f : M → V är en funktion som är inverterbar och som har en derivata som är nollskild. Då är funktionens invers f⁻¹ : V → M också deriverbar och dess derivata ges av (f⁻¹)′(y) = 1/f′(f⁻¹(y)), y ∈ V |
| `logarithmic-derivative` | d/dx ln f(x) | f′(x)/f(x) — *Logarithmic derivative, for f(x) > 0. (en) / Den logaritmiska derivatan, för f(x) > 0. (sv)* | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, check "logarithmic-derivative" — symbolic=ok numeric=ok<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.7(i), eqs. 4.7.5–4.7.6, https://dlmf.nist.gov/4.7.E5 — For a nonvanishing analytic function f(z), the general solution of the differential equation 4.7.5 dw/dz = f′(z)/f(z) is 4.7.6 w(z) = Ln(f(z)) + constant.<br>Differentiation rules (English Wikipedia): Differentiation rules, § Logarithmic derivatives — (ln f)′ = f′/f<br>Wikidata: Q762521 (logarithmic derivative), labels and P2534 — en "logarithmic derivative", sv "Logaritmisk derivering"; \operatorname{L}(f) = \frac{f'}{f}. The sv label names the technique (logarithmic differentiation), not f′/f, so the Swedish note uses the Swedish Wikipedia term instead and no sv label check is made.<br>Logaritmisk derivering (Swedish Wikipedia): Logaritmisk derivering, lead — Den logaritmiska derivatan av en funktion f kan tas att vara d/dx(ln(f(x))) = 1/f(x) f′(x) = f′(x)/f(x)<br>Wikidata checks: Q762521 en = logarithmic derivative |
| `x` | d/dx x | 1 | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, check "x" — symbolic=ok numeric=ok<br>Differentiation rules (English Wikipedia): Differentiation rules, § Polynomial or elementary power rule — When r = 1, this formula becomes the special case that, if f(x) = x, then f′(x) = 1.<br>Derivata (Swedish Wikipedia): Derivata, § Polynomfunktion av grad ett — Derivatan av funktionen f(x) = x är funktionen f′ = 1. |
| `x-squared` | d/dx x² | 2x | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, check "x-squared" — symbolic=ok numeric=ok<br>Derivata (Swedish Wikipedia): Derivata, § Polynomfunktion av godtycklig grad — Funktionen f(x) = x² har derivatan (x²)′ = 2 ⋅ x^(2−1)<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.7(ii), eq. 4.7.10 with a = 2, https://dlmf.nist.gov/4.7.E10 — d/dz z^a = a z^(a−1) |
| `x-cubed` | d/dx x³ | 3x² | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, check "x-cubed" — symbolic=ok numeric=ok<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.7(ii), eq. 4.7.10 with a = 3, https://dlmf.nist.gov/4.7.E10 — d/dz z^a = a z^(a−1)<br>Derivata (Swedish Wikipedia): Derivata, § Polynomfunktion av godtycklig grad — om n är ett positivt heltal så har funktionen f(x) = xⁿ derivatan (xⁿ)′ = n ⋅ x^(n−1) |
| `square-root` | d/dx √x | 1/(2√x) — *For x > 0. (en) / För x > 0. (sv)* | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, check "square-root" — symbolic=ok numeric=ok<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.7(ii), eq. 4.7.10 with a = 1/2, https://dlmf.nist.gov/4.7.E10 — d/dz z^a = a z^(a−1)<br>Differentiation rules (English Wikipedia): Differentiation rules, § Generalized power rule — If f(x) = x^a, then f′(x) = a x^(a−1) when a is any nonzero real number and x is positive. |
| `one-over-x` | d/dx 1/x | −1/x² | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, check "one-over-x" — symbolic=ok numeric=ok<br>Derivata (Swedish Wikipedia): Derivata, § Kvotregeln, Bevis — vetskapen att derivatan av 1/x är -1/x²<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.7(ii), eq. 4.7.10 with a = −1, https://dlmf.nist.gov/4.7.E10 — d/dz z^a = a z^(a−1) |
| `one-over-x-squared` | d/dx 1/x² | −2/x³ | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, check "one-over-x-squared" — symbolic=ok numeric=ok<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.7(ii), eq. 4.7.10 with a = −2, https://dlmf.nist.gov/4.7.E10 — d/dz z^a = a z^(a−1)<br>Differentiation rules (English Wikipedia): Differentiation rules, § Polynomial or elementary power rule — If f(x) = x^r, for any real number r ≠ 0, then: f′(x) = r x^(r−1). |
| `e-to-x` | d/dx eˣ | eˣ | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, check "e-to-x" — symbolic=ok numeric=ok<br>Wikidata: Q47306354 (natural exponential function), P2534 defining formula — \frac{\mathrm d}{\mathrm dx}\exp(x)=\exp(x),\quad\exp(0)=1<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.7(ii), eq. 4.7.7, https://dlmf.nist.gov/4.7.E7 — d/dz e^z = e^z |
| `e-to-kx` | d/dx eᵏˣ | k·eᵏˣ | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, check "e-to-kx" — symbolic=ok numeric=ok (k = 3)<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.7(ii), eq. 4.7.8, https://dlmf.nist.gov/4.7.E8 — d/dz e^(az) = a e^(az)<br>Derivata (Swedish Wikipedia): Derivata, § Elementära funktioner och deras derivator (gallery) — f(x) = e^(kx), f′(x) = ke^(kx) |
| `a-to-x` | d/dx aˣ | aˣ·ln a | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, check "a-to-x" — symbolic=ok (general a > 0) numeric=ok (a = 5)<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.7(ii), eq. 4.7.9, https://dlmf.nist.gov/4.7.E9 — d/dz a^z = a^z ln a, a ≠ 0.<br>Derivata (Swedish Wikipedia): Derivata, § Elementära funktioner och deras derivator (gallery) — f(x) = a^x, f′(x) = a^x ln(a) |
| `ln-x` | d/dx ln x | 1/x — *For x > 0. (en) / För x > 0. (sv)* | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, check "ln-x" — symbolic=ok numeric=ok<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.7(i), eq. 4.7.1, https://dlmf.nist.gov/4.7.E1 — d/dz ln z = 1/z<br>Differentiation rules (English Wikipedia): Differentiation rules, § Derivatives of exponential and logarithmic functions — d/dx (ln x) = 1/x, x > 0. |
| `ln-abs-x` | d/dx ln\|x\| | 1/x — *For x ≠ 0. (en) / För x ≠ 0. (sv)* | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, check "ln-abs-x" — symbolic=ok (x > 0 and x < 0 separately) numeric=ok (x = −3, −0.5, 2)<br>Differentiation rules (English Wikipedia): Differentiation rules, § Derivatives of exponential and logarithmic functions — d/dx (ln \|x\|) = 1/x, x ≠ 0. |
| `log-a-x` | d/dx logₐ x | 1/(x·ln a) — *For x > 0. (en) / För x > 0. (sv)* | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, check "log-a-x" — symbolic=ok (general a > 0) numeric=ok (a = 10)<br>Differentiation rules (English Wikipedia): Differentiation rules, § Derivatives of exponential and logarithmic functions — d/dx (log_c x) = 1/(x ln c), c > 1. The equation above is also true for all c but yields a complex number if c < 0. |
| `x-to-x` | d/dx xˣ | xˣ·(ln x + 1) — *For x > 0. Write xˣ = exp(x·ln x) and use the chain rule. (en) / För x > 0. Skriv xˣ = exp(x·ln x) och använd kedjeregeln. (sv)* | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, check "x-to-x" — symbolic=ok (x > 0) numeric=ok<br>Differentiation rules (English Wikipedia): Differentiation rules, § Derivatives of exponential and logarithmic functions — d/dx (x^x) = x^x(1 + ln x). |
| `sin` | d/dx sin x | cos x | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, check "sin" — symbolic=ok numeric=ok<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.20, eq. 4.20.1, https://dlmf.nist.gov/4.20.E1 — d/dz sin z = cos z<br>Derivata (Swedish Wikipedia): Derivata, table of the trigonometric and hyperbolic functions — sin(x) \| cos(x) |
| `cos` | d/dx cos x | −sin x | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, check "cos" — symbolic=ok numeric=ok<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.20, eq. 4.20.2, https://dlmf.nist.gov/4.20.E2 — d/dz cos z = −sin z<br>Derivata (Swedish Wikipedia): Derivata, table of the trigonometric and hyperbolic functions — cos(x) \| −sin(x) |
| `tan` | d/dx tan x | 1/cos² x — *Equivalently 1 + tan² x or sec² x. (en) / Kan också skrivas 1 + tan² x eller sec² x. (sv)* | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, checks "tan" and "[alt] tan" — symbolic=ok numeric=ok; 1/cos² x = 1 + tan² x = sec² x: symbolic=ok numeric=ok (x = −0.7, 0.3, 1.1)<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.20, eq. 4.20.3, https://dlmf.nist.gov/4.20.E3 — d/dz tan z = sec² z<br>Differentiation rules (English Wikipedia): Differentiation rules, § Derivatives of trigonometric functions — d/dx tan x = sec² x = 1/cos² x = 1 + tan² x |
| `cot` | d/dx cot x | −1/sin² x — *Equivalently −(1 + cot² x) or −csc² x. (en) / Kan också skrivas −(1 + cot² x) eller −csc² x. (sv)* | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, checks "cot" and "[alt] cot" — symbolic=ok numeric=ok; −1/sin² x = −(1 + cot² x) = −csc² x: symbolic=ok numeric=ok (x = −0.7, 0.3, 1.1)<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.20, eq. 4.20.6, https://dlmf.nist.gov/4.20.E6 — d/dz cot z = −csc² z<br>Differentiation rules (English Wikipedia): Differentiation rules, § Derivatives of trigonometric functions — d/dx cot x = −csc² x = −1/sin² x = −1 − cot² x |
| `sec` | d/dx sec x | sec x · tan x | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, check "sec" — symbolic=ok numeric=ok<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.20, eq. 4.20.5, https://dlmf.nist.gov/4.20.E5 — d/dz sec z = sec z tan z<br>Differentiation rules (English Wikipedia): Differentiation rules, § Derivatives of trigonometric functions — d/dx sec x = sec x tan x |
| `csc` | d/dx csc x | −csc x · cot x | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, check "csc" — symbolic=ok numeric=ok<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.20, eq. 4.20.4, https://dlmf.nist.gov/4.20.E4 — d/dz csc z = −csc z cot z<br>Differentiation rules (English Wikipedia): Differentiation rules, § Derivatives of trigonometric functions — d/dx csc x = −csc x cot x |
| `sin-kx` | d/dx sin(kx) | k·cos(kx) | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, check "sin-kx" — symbolic=ok numeric=ok (k = 3)<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.20, eq. 4.20.1 with the chain rule §1.4(iii), eq. 1.4.10 — d/dz sin z = cos z; h′(x) = f′(g(x)) g′(x) (no separate equation for sin(kz); the card follows from these two) |
| `cos-kx` | d/dx cos(kx) | −k·sin(kx) | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, check "cos-kx" — symbolic=ok numeric=ok (k = 3)<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.20, eq. 4.20.2 with the chain rule §1.4(iii), eq. 1.4.10 — d/dz cos z = −sin z; h′(x) = f′(g(x)) g′(x) (no separate equation for cos(kz); the card follows from these two) |
| `arcsin` | d/dx arcsin x | 1/√(1 − x²) — *For −1 < x < 1. (en) / För −1 < x < 1. (sv)* | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, check "arcsin" — symbolic=ok numeric=ok<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.24(ii), eq. 4.24.7, https://dlmf.nist.gov/4.24.E7 — d/dz arcsin z = (1 − z²)^(−1/2)<br>Differentiation rules (English Wikipedia): Differentiation rules, § Derivatives of trigonometric functions — d/dx arcsin x = 1/√(1 − x²) |
| `arccos` | d/dx arccos x | −1/√(1 − x²) — *For −1 < x < 1. (en) / För −1 < x < 1. (sv)* | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, check "arccos" — symbolic=ok numeric=ok<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.24(ii), eq. 4.24.8, https://dlmf.nist.gov/4.24.E8 — d/dz arccos z = −(1 − z²)^(−1/2)<br>Differentiation rules (English Wikipedia): Differentiation rules, § Derivatives of trigonometric functions — d/dx arccos x = −1/√(1 − x²) |
| `arctan` | d/dx arctan x | 1/(1 + x²) | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, check "arctan" — symbolic=ok numeric=ok<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.24(ii), eq. 4.24.9, https://dlmf.nist.gov/4.24.E9 — d/dz arctan z = 1/(1 + z²)<br>Differentiation rules (English Wikipedia): Differentiation rules, § Derivatives of trigonometric functions — d/dx arctan x = 1/(1 + x²) |
| `sinh` | d/dx sinh x | cosh x | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, check "sinh" — symbolic=ok numeric=ok<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.34, eq. 4.34.1, https://dlmf.nist.gov/4.34.E1 — d/dz sinh z = cosh z<br>Differentiation rules (English Wikipedia): Differentiation rules, § Derivatives of hyperbolic functions — d/dx sinh x = cosh x |
| `cosh` | d/dx cosh x | sinh x | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, check "cosh" — symbolic=ok numeric=ok<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.34, eq. 4.34.2, https://dlmf.nist.gov/4.34.E2 — d/dz cosh z = sinh z<br>Differentiation rules (English Wikipedia): Differentiation rules, § Derivatives of hyperbolic functions — d/dx cosh x = sinh x |
| `tanh` | d/dx tanh x | 1/cosh² x — *Equivalently 1 − tanh² x or sech² x. (en) / Kan också skrivas 1 − tanh² x eller sech² x. (sv)* | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, checks "tanh" and "[alt] tanh" — symbolic=ok numeric=ok; 1/cosh² x = 1 − tanh² x = sech² x: symbolic=ok numeric=ok (x = −0.7, 0.3, 1.1)<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.34, eq. 4.34.3, https://dlmf.nist.gov/4.34.E3 — d/dz tanh z = sech² z<br>Differentiation rules (English Wikipedia): Differentiation rules, § Derivatives of hyperbolic functions — d/dx tanh x = sech² x = 1 − tanh² x |
| `arsinh` | d/dx arsinh x | 1/√(x² + 1) — *arsinh, the inverse of sinh, is also written arcsinh or sinh⁻¹. (en) / arsinh, inversen till sinh, skrivs också arcsinh eller sinh⁻¹. (sv)* | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, check "arsinh" — symbolic=ok numeric=ok<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.38(ii), eq. 4.38.9, https://dlmf.nist.gov/4.38.E9 — d/dz arcsinh z = (1 + z²)^(−1/2)<br>Derivata (Swedish Wikipedia): Derivata, table of the trigonometric and hyperbolic functions — arsinh(x) \| 1/√(x² + 1) |
| `arcosh` | d/dx arcosh x | 1/√(x² − 1) — *For x > 1. arcosh, the inverse of cosh, is also written arccosh or cosh⁻¹. (en) / För x > 1. arcosh, inversen till cosh, skrivs också arccosh eller cosh⁻¹. (sv)* | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, check "arcosh" — symbolic=ok (x > 1) numeric=ok<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.38(ii), eq. 4.38.10, https://dlmf.nist.gov/4.38.E10 — d/dz arccosh z = ±(z² − 1)^(−1/2), ℜz ≷ 0.<br>Differentiation rules (English Wikipedia): Differentiation rules, § Derivatives of hyperbolic functions — d/dx arcosh x = 1/√(x² − 1) |
| `artanh` | d/dx artanh x | 1/(1 − x²) — *For −1 < x < 1. artanh, the inverse of tanh, is also written arctanh or tanh⁻¹. (en) / För −1 < x < 1. artanh, inversen till tanh, skrivs också arctanh eller tanh⁻¹. (sv)* | Derivations and SymPy verification for the Solid Memo derivatives deck: verify_derivatives.py, check "artanh" — symbolic=ok numeric=ok<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §4.38(ii), eq. 4.38.11, https://dlmf.nist.gov/4.38.E11 — d/dz arctanh z = 1/(1 − z²)<br>Differentiation rules (English Wikipedia): Differentiation rules, § Derivatives of hyperbolic functions — d/dx artanh x = 1/(1 − x²) |
