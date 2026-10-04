# Integrals — provenance report

<!-- Generated from authored/integrals.json by scripts/authored_decks.py. Do not edit: change the dossier and rebuild. -->

**Deck:** [`decks/integrals.ttl`](../decks/integrals.ttl) · **Cards:** 42 · **Licence:** [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) · **Compiled by:** Anton Wiklund · **Created:** 2026-10-04

42 cards on integrals for calculus students: the definition of an antiderivative, the rules of integration (linearity, integration by parts, substitution, the fundamental theorem of calculus) and standard antiderivatives of powers and roots, exponential, logarithmic, trigonometric and hyperbolic functions, and of the forms that give arctan, arcsin and ln. Front: the integral or rule in plain notation such as ∫ sin x dx; back: the result, with + C for an indefinite integral; conditions on x in a note; angles in radians. Every result is machine-checked with SymPy by differentiation and numerical integration, and against the NIST Digital Library of Mathematical Functions and/or Wikipedia.

## Sources

| Source | Creator | Licence | Role | Retrieved | Used for |
|---|---|---|---|---|---|
| [Derivations and SymPy verification for the Solid Memo integrals deck](https://github.com/antwika/solid-memo/blob/main/packages/deck-library/authored/integrals.json) | Anton Wiklund (compiler); written by Claude (Anthropic, AI) at his direction | [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) | content | 2026-10-04 | The cards' notation and notes (the selection shared with English and Swedish Wikipedia), and the machine verification of 40 of the 42 cards (all but the two definition cards) and of the equivalent forms named in the notes with SymPy 1.14.0 and mpmath 1.3.0: symbolic differentiation of each claimed antiderivative, plus an independent numerical check that the definite integral computed by quadrature equals the difference of the antiderivative's values. The scripts' full text and output are recorded under Queries; the URL resolves once the dossier is merged into the main branch. |
| [Wikidata](https://www.wikidata.org/) | Wikidata contributors (Wikimedia Foundation) | [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) | content | 2026-10-04 | The English and Swedish names of the rules on the fronts and in the notes (antiderivative / primitiv funktion, integration by parts / partialintegration, integration by substitution / Integration genom substitution, fundamental theorem of calculus / analysens fundamentalsats, constant of integration, linearity of integration), all checked by the builder, and the defining formulas (P2534) of antiderivative, indefinite integral, constant of integration and integration by substitution, against which the cards were compared. The keyword infinitesimalkalkyl is the Swedish label of Q149972 (calculus). |
| [NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15)](https://dlmf.nist.gov/) | F. W. J. Olver, A. B. Olde Daalhuis, D. W. Lozier, B. I. Schneider, R. F. Boisvert, C. W. Clark, B. R. Miller, B. V. Saunders, H. S. Cohl, M. A. McClain (eds.); National Institute of Standards and Technology | All rights reserved | verification | 2026-10-04 | Independent check of the definition of the indefinite integral and of the rules (§1.4(iv)–(v): eqs. 1.4.16, 1.4.17, 1.4.19, 1.4.26–1.4.28) and of the antiderivatives it lists (§4.10, §4.23, §4.26, §4.40). Nothing copied; the evidence quotes the TeX of each equation as the pages give it. |
| [English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral)](https://en.wikipedia.org/wiki/Lists_of_integrals) | Wikipedia contributors | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | content | 2026-10-04 | Content: the selection of antiderivatives and the alternative forms named in the notes, which closely follow "Lists of integrals" § Integrals of simple functions (see Licensing). Also the independent check of the indefinite integral, five of the rules, the integral over an interval of length zero ("Integral", § Conventions) and all 32 antiderivative cards (the revision of each article read is named in the evidence). No text was copied; the formulas are written in the deck's own notation. |
| [Swedish Wikipedia: Primitiv funktion, Partialintegration, Integration genom substitution, Analysens fundamentalsats](https://sv.wikipedia.org/wiki/Primitiv_funktion) | Wikipedia contributors | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | content | 2026-10-04 | Content: the selection, which includes every row of the table "Några primitiva funktioner" and four of the eight rules of § Användbara räknelagar of "Primitiv funktion" (see Selection and Licensing), and the Swedish terms (primitiv funktion, partialintegration and partiell integration, integration genom substitution, variabelbyte, analysens fundamentalsats, standardprimitiver, integrationskonstant). Also an independent check of the rules and of the table of primitive functions. No text was copied beyond single terms. |

**Content** sources supplied information that is in the cards. **Verification** sources were only consulted to confirm facts: nothing was copied from them.

### Licence evidence

- **Derivations and SymPy verification for the Solid Memo integrals deck** — Own work of the deck's compiler, dedicated to the public domain (CC0 1.0 Universal, https://creativecommons.org/publicdomain/zero/1.0/); the deck as a whole is CC BY-SA 4.0 because of the Wikipedia-derived selection (see Licensing). The standard antiderivatives and integration rules are mathematical facts, which are not copyrightable; the wording, notation and verification are this dossier's own (the selection of cards and of the alternative forms in the notes follows English and Swedish Wikipedia closely and is attributed to them; see Licensing). The verification scripts are recorded verbatim under Queries.
- **Wikidata** — https://www.wikidata.org/wiki/Wikidata:Licensing (fetched 2026-10-04): "All structured data (i.e. the main, Property, Lexeme, and EntitySchema namespaces) is released into the public domain under Creative Commons Zero."
- **NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15)** — https://dlmf.nist.gov/about/notices (fetched 2026-10-04): "Authors of the works appearing in the Digital Library of Mathematical Functions (DLMF) have assigned copyright to the works to NIST ... All materials on this website are owned by NIST. Limited copying and internal distribution of the content of these pages is permitted for research and teaching. Reproduction, copying, or distribution for any commercial purpose is strictly prohibited." Not a public-domain US government work, so verification only.
- **English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral)** — https://en.wikipedia.org/wiki/Wikipedia:Copyrights (fetched 2026-10-04): "If you wish to reuse content from Wikipedia, read § Reusers' rights and obligations first. Then review the licenses: the Creative Commons Attribution-ShareAlike 4.0 International License and the GNU Free Documentation License."
- **Swedish Wikipedia: Primitiv funktion, Partialintegration, Integration genom substitution, Analysens fundamentalsats** — Footer of https://sv.wikipedia.org/wiki/Primitiv_funktion (fetched 2026-10-04): "Wikipedias text är tillgänglig under licensen Creative Commons Erkännande-dela-lika 4.0 Unported."

## Licensing

The deck is CC BY-SA 4.0. Its card content comes from four sources. The compiler's own derivations, notation and notes are dedicated to the public domain (CC0); the formulas themselves are mathematical facts, which are not copyrightable in any case. Wikidata (structured data under CC0) gave the English and Swedish names of the rules, and the cards were compared with its defining formulas (P2534). English Wikipedia ("Lists of integrals", § Integrals of simple functions) and Swedish Wikipedia ("Primitiv funktion", table "Några primitiva funktioner" and § Användbara räknelagar) are CC BY-SA 4.0. The deck's selection of antiderivatives beyond the editor's brief, and the alternative forms named in its notes, follow those lists closely; review round 3 found this. A list of standard first-course antiderivatives is largely dictated by the subject and may well have no protectable selection. But the overlap cannot be shown to be independent, and the licence policy lets a verification source contribute no selection. Both Wikipedias are therefore content sources, attributed in the deck, and the deck carries their licence, CC BY-SA 4.0. No Wikipedia text was copied: the formulas are written in the deck's own notation, and single established Swedish terms (partiell integration, variabelbyte, standardprimitiver, integrationskonstant) are used as words. The NIST Digital Library of Mathematical Functions is copyrighted by NIST with reuse limited to research and teaching. It was used only to verify facts, and nothing was taken from it. Every formula was re-derived and machine-checked with SymPy.

## Method

1. Who did the work: Anton Wiklund compiled this deck with the help of AI agents (Claude, by Anthropic), which did the research, drafting and cross-checking at his direction. The cards were checked by machine (SymPy and mpmath, live Wikidata and the app's SHACL and DCAT-AP validators) and in independent review rounds by further Claude agents, each logged under Quality control with its findings and how they were resolved. Anton Wiklund reviews every deck in full before it is released.
2. Selection: the integration rules and standard antiderivatives a first calculus course asks students to know by heart were listed from general mathematical knowledge, following the library editor's brief (∫xⁿ, ∫1/x, ∫eˣ, ∫aˣ, ∫sin, ∫cos, ∫sec², ∫1/(1 + x²), ∫1/√(1 − x²), ∫ln x, integration by parts, substitution, the fundamental theorem of calculus, linearity). Added to the brief: the definition of an antiderivative and of the indefinite integral; the constant; 1/x², √x, 1/√x; 1/(ax + b) and (ax + b)ⁿ; eᵏˣ; sin(kx), cos(kx); csc², sec·tan, csc·cot, tan, cot, sec; sin², cos²; 1/(a² + x²), 1/√(a² − x²), 1/√(x² + 1); sinh, cosh; f′/f; the derivative of an integral with a variable upper limit; and the integral over an interval of length zero. The additions and the alternative forms named in the notes were chosen with the Wikipedia articles used for cross-checking open, and they follow two of its lists closely (found in review round 3): the trigonometric cards are the run sin, cos, tan, cot, sec, (csc), sec², csc², sec·tan, csc·cot, sin², cos² of English Wikipedia's "Lists of integrals" § Integrals of simple functions, whose rational and exponential lines are also cards and whose alternative forms (ln|sec x| for tan, ln|tan(x/2 + π/4)| for sec, (x ∓ sin x·cos x)/2 for sin² and cos²) are those in the notes; and every row of the table "Några primitiva funktioner" of Swedish Wikipedia's "Primitiv funktion" (including 1/√(x² + a), here with a = 1) and four of the eight rules of its § Användbara räknelagar (∫a·f with a ≠ 0, ∫(f ± g), ∫ₐᵃ f = 0, ∫f′/f) are cards. The other four were left out: splitting the interval at a point c and reversing the limits need a subscript b, which Unicode lacks, to be written in plain text (see Selection); renaming the integration variable (∫f(x)dx = ∫f(t)dt) is a remark on notation rather than a rule to recall; and ∫f·f′ dx = f²/2 + C is a special case of substitution, which has its own card. Since the selection cannot be shown to have been made independently of these lists, both Wikipedias are content sources for it (see Licensing).
3. Notation: plain Unicode that reads as text (superscripts such as x², eˣ, xⁿ⁺¹; √ for the square root; · for multiplication; ′ U+2032 for the prime; − U+2212 for minus; ₐ and ᵇ, ˣ, ᵃ for the limits of a definite integral). Fronts and backs that are pure notation are tagged zxx (no language); the four fronts with words (the definition of an antiderivative, integration by parts, integration by substitution, the fundamental theorem of calculus) and all notes are in English and Swedish. Indefinite integrals carry + C on the back; the rules about integrals of arbitrary functions (sum, constant multiple, parts) are written, as is usual, without it. A front note states what each letter means (a constant, a > 0, k ≠ 0, F an antiderivative of f) wherever the front would otherwise be ambiguous, and a back note gives the conditions on x (x ≠ 0, x > 0, cos x ≠ 0, |x| < 1) and, where an antiderivative has several standard forms, the others. Angles are in radians.
4. Machine verification: every card except the two definition cards was written as a pair of SymPy expressions (integrand f on the front, claimed antiderivative F on the back) in the script verify_integrals.py, recorded verbatim under Queries with its output, and run with `uv run --with sympy python3 <scratch>/verify_integrals.py` (SymPy 1.14.0, mpmath 1.3.0). For each card it checks (1) symbolically that simplify(diff(F) − f) is 0, keeping the parameters general (k ≠ 0, a > 0, general n, a, b), on each piece of the domain where an absolute value has a fixed sign (|u| replaced by u or −u: x > 0 and x < 0 for ln|x|, cos x > 0 and < 0 for tan, sin x > 0 and < 0 for cot, sec x + tan x > 0 and < 0 for sec), and (2) independently numerically that the definite integral of f computed by quadrature (mpmath.quad, 30 digits) over an interval in each piece equals F(q) − F(p) to within 10⁻²⁰, for concrete parameter values (k = 3 and −1/2; a = 5 and 1/2; n = 5, 1/3, −2, π, −1/2 on [1/2, 2] and n = 5, −2, −3 on [−3, −1]). The rules are checked symbolically with undefined SymPy functions f, g, F (for example that d/dx(f·g − ∫f′·g dx) = f·g′ and d/dx F(g(x)) = F′(g(x))·g′(x)) and numerically with concrete functions (sin x + 2, x³ + 1, cos, 1/u, exp(−x²)): the fundamental theorem for x³, cos x, eˣ and 1/(1 + x²) with general limits; its derivative form by a central difference quotient (h = 10⁻¹⁰) of quadrature integrals. The equivalent forms and identities named in the notes (ln|sec x| for tan, ln|tan(x/2 + π/4)| for sec, (x ∓ sin x·cos x)/2 for sin² and cos², sin² x = (1 − cos(2x))/2 and cos² x = (1 + cos(2x))/2, −arccos x for arcsin, arsinh x for ln(x + √(x² + 1)), (2/3)·x^(3/2) for √x) are checked as identities symbolically and numerically at x = −0.7, 0.3 and 0.9 (0.7, 0.3 and 0.9 for √x). Result: 49 checks, 49 passed, each symbolically and numerically. To show the checks can fail, mutate.py (recorded under Queries) plants five wrong backs (cos(kx) without /k, ln x without − x, tan with the wrong sign, aˣ·ln a instead of aˣ/ln a, sin² with + instead of −) and confirms that both the symbolic and the numerical check catch every one. The two definition cards (antiderivative, indefinite integral) are definitions, not results, and are checked against the sources only.
5. Wikidata: the items of the rules (Q273328 integration by parts, Q1071270 integration by substitution, Q1217677 fundamental theorem of calculus, Q114326 antiderivative, Q80091 integral, Q8437543 indefinite integral, Q6553542 linearity of integration, Q1355804 constant of integration, Q423189 lists of integrals, Q1991596 definite integral, Q5054786 Cavalieri's quadrature formula, Q4201936 integral of the secant function, Q762521 logarithmic derivative) were found with wbsearchentities, and their English and Swedish labels and aliases, English and Swedish Wikipedia sitelinks and defining formulas (P2534, TeX) fetched with one wbgetentities request (both under Queries). The Swedish names on the fronts are the Swedish Wikidata labels (primitiv funktion, partialintegration, Integration genom substitution, analysens fundamentalsats), which are also the titles of the Swedish Wikipedia articles. The P2534 formulas were compared with the cards and agree with them (Wikidata states substitution for a definite integral, the card the equivalent indefinite form); the cards' formulas were not taken from Wikidata. Q80091, Q423189, Q1991596, Q5054786, Q4201936 and Q762521 were looked up as candidates and are not used on any card (a label check on Q4201936, integral of the secant function, was dropped in review round 3 because that name is on no card). The helper scripts are recorded verbatim under Queries.
6. Cross-checking: each card was compared, equation by equation, with the NIST DLMF (pages saved from https://dlmf.nist.gov/<section> with fetch.sh and read as text with each formula's TeX alttext by dlmf_eqs.py and dlmf_text.py: §1.4 for the rules and ∫xⁿ, §4.10 logarithms and exponentials, §4.23 integral representations of arcsin, arctan and gd⁻¹, §4.26 trigonometric, §4.40 hyperbolic functions) and with the wikitext of the English and Swedish Wikipedia articles (downloaded with action=raw; the revision read is named in each locator). Each card's evidence lists exactly the sources it was compared with. 22 cards have a DLMF equation; DLMF has none for the other 20 (among them aˣ, sin(kx), sec², sin², 1/(a² + x²)), which are checked against English and/or Swedish Wikipedia (the integral over an interval of length zero against Swedish Wikipedia's "Primitiv funktion" and English Wikipedia's "Integral", § Conventions). DLMF states several formulas for a complex variable or on a restricted interval without the absolute value (∫tan x dx = −ln(cos x) for −π/2 < x < π/2); the cards state the real-variable form with absolute values taught in calculus, verified on both signs. Where a card is a special case of a general formula in a source (n = −2, 1/2, −1/2 in the power formula; a = 1 in the arctan, arcsin and ln(x + √(x² + a²)) formulas; a = 1 in DLMF's ∫e^(az)), the locator says so.
7. Swedish text: the notes were written in Swedish directly, using the terms Wikidata and Swedish Wikipedia use (primitiv funktion, partialintegration, partiell integration (sv.wikipedia Partialintegration: "Partialintegration eller partiell integration"), integration genom substitution, variabelbyte (sv.wikipedia Primitiv funktion: "lämpliga variabelbyten"), analysens fundamentalsats, standardprimitiver, integrationskonstant (sv.wikipedia Integration genom substitution: "där C är en godtycklig integrationskonstant"; Partialintegration: "där vi låter bli att skriva ut integrationskonstanten"), konstant, kontinuerlig, produktregeln, kedjeregeln). The keyword infinitesimalkalkyl is the Swedish label of Wikidata Q149972 (calculus). Notation is the same in both languages; the notes of sec² and csc² give the definitions sec x = 1/cos x and csc x = 1/sin x, so that the cards can also be read as ∫ 1/cos² x dx and ∫ 1/sin² x dx.
8. The builder's Wikidata checks (python3 packages/deck-library/scripts/authored_decks.py build integrals) confirm the rule names against live Wikidata. Finally the built deck was validated with the app's SHACL and DCAT-AP validators (node packages/deck-library/scripts/validate_sources.ts integrals).

## Selection

Included: the definitions of an antiderivative and of the indefinite integral, eight rules (sum, constant multiple, integration by parts, substitution, the fundamental theorem of calculus in its evaluation and its derivative form, the integral over an interval of length zero, ∫f′/f) and 32 standard antiderivatives: the constant, powers and roots, 1/(ax + b) and (ax + b)ⁿ, eˣ, eᵏˣ, aˣ, ln x, the six basic trigonometric forms with sin(kx), cos(kx), sin² and cos², tan, cot and sec, the forms giving arctan, arcsin and ln(x + √(x² + 1)), and sinh, cosh; 42 cards in all. The choice of the antiderivatives beyond the editor's brief and of the alternative forms in the notes follows English Wikipedia's "Lists of integrals" (§ Integrals of simple functions) and the table and rules of Swedish Wikipedia's "Primitiv funktion" (see Method and Licensing). Left out: ∫csc x dx, whose standard forms differ (−ln|csc x + cot x|, ln|csc x − cot x|, ln|tan(x/2)|) so that one back would not be the one right answer; ∫1/(x² − a²) and ∫1/(1 − x²), given as a logarithm or as artanh/arcoth depending on the interval; the integrals of the inverse trigonometric and hyperbolic functions, tanh, coth, sech and csch, tan² x, reduction formulas and products such as x·eˣ, which are worked examples or beyond a first course; the reversal and additivity of the limits of a definite integral, since Unicode has no subscript b to write ∫ᵇₐ or ∫ᵇᶜ in plain text; improper and named definite integrals (Gaussian, Dirichlet); partial fractions and other methods that are procedures rather than facts.

## Queries

**Machine verification of 40 cards and 9 equivalent forms with SymPy (<scratch>/verify_integrals.py, run as: uv run --with sympy python3 <scratch>/verify_integrals.py); its output follows the script** (Derivations and SymPy verification for the Solid Memo integrals deck)

```
"""Machine-verify every card of the "integrals" deck with SymPy.

Run: uv run --with sympy python3 verify_integrals.py

For each antiderivative card the integrand f on the front and the claimed
antiderivative F on the back (without + C) are written as SymPy expressions.
A card passes when
  1. symbolic: simplify(diff(F, x) - f) == 0, on each piece of the stated
     domain (|u| is replaced by u or -u where the piece fixes the sign of u),
     for general parameters where the card has them, and
  2. numeric: on each piece, the definite integral of f computed by numerical
     quadrature (mpmath.quad, 30 digits) over an interval inside the piece
     equals F(q) - F(p) to within 1e-20 -- an independent check that does
     not use SymPy's differentiation or simplification -- for concrete
     parameter values.
Rules about arbitrary functions f, g are checked symbolically with undefined
SymPy functions and numerically with concrete functions.
"""
import mpmath as mp
import sympy as sp

mp.mp.dps = 30
x, t, u = sp.symbols("x t u", real=True)
xp = sp.symbols("xp", positive=True)
n = sp.symbols("n", real=True)
k = sp.symbols("k", real=True, nonzero=True)
a = sp.symbols("a", positive=True)
b, lo, hi = sp.symbols("b lo hi", real=True)
f, g, F = sp.Function("f"), sp.Function("g"), sp.Function("F")
TOL = mp.mpf("1e-20")
results = []


def num_close(lhs, rhs):
    return abs(mp.mpf(lhs) - mp.mpf(rhs)) < TOL


def quad(expr, p, q):
    fn = sp.lambdify(x, expr, "mpmath")
    return mp.quad(fn, [mp.mpf(sp.N(p, 40)), mp.mpf(sp.N(q, 40))])


def ev(expr, p):
    return mp.mpf(sp.N(expr.subs(x, p), 40))


def card(cid, f_expr, F_expr, pieces, params=None):
    """pieces: [(sign, p, q)]: on [p, q] the argument of every |.| in F has the
    given sign (+1, -1, or None when F has no |.|). params: concrete values
    for the numeric check (the symbolic check keeps the parameters general)."""
    sym = True
    for sign, p, q in pieces:
        G = F_expr if sign is None else F_expr.replace(sp.Abs, lambda e: sign * e)
        d = sp.simplify(sp.diff(G, x) - f_expr)
        if d != 0:
            # second attempt: simplify after rewriting in exp (trig/hyperbolic identities)
            d = sp.simplify(d.rewrite(sp.exp))
        sym &= d == 0
    num = True
    for params_set in (params or [{}]):
        fs, Fs = f_expr.subs(params_set), F_expr.subs(params_set)
        for sign, p, q in pieces:
            num &= num_close(quad(fs, p, q), ev(Fs, q) - ev(Fs, p))
    results.append((cid, sym, num))


# ---------------------------------------------------------------- rules
c1, c2 = sp.sin(x) + 2, x**3 + 1  # concrete f, g for the numeric rule checks
P, Q = sp.Rational(3, 10), sp.Rational(17, 10)

# sum rule: d/dx (∫f dx + ∫g dx) = f + g
sym = sp.simplify(sp.diff(sp.Integral(f(x), x) + sp.Integral(g(x), x), x) - (f(x) + g(x))) == 0
num = num_close(quad(c1 + c2, P, Q), quad(c1, P, Q) + quad(c2, P, Q))
results.append(("sum-rule", sym, num))

# constant multiple: d/dx (k·∫f dx) = k·f
sym = sp.simplify(sp.diff(k * sp.Integral(f(x), x), x) - k * f(x)) == 0
num = num_close(quad(7 * c1, P, Q), 7 * quad(c1, P, Q))
results.append(("constant-multiple", sym, num))

# integration by parts: d/dx (f·g − ∫f′·g dx) = f·g′
sym = sp.simplify(sp.diff(f(x) * g(x) - sp.Integral(sp.diff(f(x), x) * g(x), x), x)
                  - f(x) * sp.diff(g(x), x)) == 0
lhs = quad(c1 * sp.diff(c2, x), P, Q)
rhs = ev(c1 * c2, Q) - ev(c1 * c2, P) - quad(sp.diff(c1, x) * c2, P, Q)
results.append(("integration-by-parts", sym, num_close(lhs, rhs)))

# substitution: d/dx F(g(x)) = f(g(x))·g′(x) where F′ = f
sym = sp.simplify(sp.diff(F(g(x)), x)
                  - sp.Subs(sp.diff(F(u), u), u, g(x)).doit() * sp.diff(g(x), x)) == 0
# numeric with f = cos (F = sin) and g = x³ + 1, and with f = 1/u (F = ln u) and g = x² + 1
num = num_close(quad(sp.cos(c2) * sp.diff(c2, x), P, Q), ev(sp.sin(c2), Q) - ev(sp.sin(c2), P))
num &= num_close(quad(2 * x / (x**2 + 1), P, Q), ev(sp.log(x**2 + 1), Q) - ev(sp.log(x**2 + 1), P))
results.append(("substitution", sym, num))

# fundamental theorem, evaluation: ∫ₐᵇ f dx = F(b) − F(a) (symbolic for general limits, several f)
pairs = [(x**3, x**4 / 4), (sp.cos(x), sp.sin(x)), (sp.exp(x), sp.exp(x)), (1 / (1 + x**2), sp.atan(x))]
sym = all(sp.simplify(sp.integrate(fx, (x, lo, hi)) - (Fx.subs(x, hi) - Fx.subs(x, lo))) == 0 for fx, Fx in pairs)
num = all(num_close(quad(fx, P, Q), ev(Fx, Q) - ev(Fx, P)) for fx, Fx in pairs)
results.append(("ftc-evaluation", sym, num))

# fundamental theorem, derivative of the integral with a variable upper limit
sym = sp.simplify(sp.diff(sp.Integral(f(t), (t, lo, x)), x) - f(x)) == 0
h = mp.mpf("1e-10")
num = True
for fx in (sp.cos(x), sp.exp(-x**2), 1 / (1 + x**2)):  # exp(−x²) has no elementary antiderivative
    fn = sp.lambdify(x, fx, "mpmath")
    for p in (mp.mpf("0.4"), mp.mpf("1.3")):
        dq = (mp.quad(fn, [0, p + h]) - mp.quad(fn, [0, p - h])) / (2 * h)
        num &= abs(dq - fn(p)) < mp.mpf("1e-15")
results.append(("ftc-derivative", sym, num))

# zero-width interval: ∫ₐᵃ f dx = 0
sym = sp.Integral(f(x), (x, lo, lo)).doit() == 0
num = all(quad(fx, P, P) == 0 for fx, _ in pairs)
results.append(("zero-width-interval", sym, num))

# f′/f: d/dx ln|f| = f′/f, on pieces where f > 0 and where f < 0
sym = (sp.simplify(sp.diff(sp.log(f(x)), x) - sp.diff(f(x), x) / f(x)) == 0
       and sp.simplify(sp.diff(sp.log(-f(x)), x) - sp.diff(f(x), x) / f(x)) == 0)
num = num_close(quad(sp.diff(c2, x) / c2, P, Q), ev(sp.log(sp.Abs(c2)), Q) - ev(sp.log(sp.Abs(c2)), P))
s = sp.sin(x)  # negative on (π, 2π)
num &= num_close(quad(sp.cos(x) / s, 4, 6), ev(sp.log(sp.Abs(s)), 6) - ev(sp.log(sp.Abs(s)), 4))
results.append(("log-derivative", sym, num))

# ---------------------------------------------------------------- powers and rational functions
half, two = sp.Rational(1, 2), sp.Integer(2)
card("constant", k + 0 * x, k * x, [(None, -1, 2)], params=[{k: 3}])
# power rule: general n ≠ −1 symbolically for x > 0; numerically for several n
results.append(("power-rule",
                sp.simplify(sp.diff(xp**(n + 1) / (n + 1), xp) - xp**n) == 0,
                all(num_close(quad(x**m, half, two), ev(x**(m + 1) / (m + 1), two) - ev(x**(m + 1) / (m + 1), half))
                    for m in (sp.Integer(5), sp.Rational(1, 3), sp.Integer(-2), sp.pi, sp.Rational(-1, 2)))
                and all(num_close(quad(x**m, -3, -1), ev(x**(m + 1) / (m + 1), -1) - ev(x**(m + 1) / (m + 1), -3))
                        for m in (sp.Integer(5), sp.Integer(-2), sp.Integer(-3)))))
card("one-over-x", 1 / x, sp.log(sp.Abs(x)), [(1, half, 3), (-1, -3, -half)])
card("one-over-x-squared", 1 / x**2, -1 / x, [(None, half, 3), (None, -3, -half)])
card("square-root", sp.sqrt(x), sp.Rational(2, 3) * x * sp.sqrt(x), [(None, 0, 3)])
card("one-over-square-root", 1 / sp.sqrt(x), 2 * sp.sqrt(x), [(None, sp.Rational(1, 10), 3)])
# 1/(ax + b), general a ≠ 0 and b; pieces where ax + b > 0 and < 0 for a = 2, b = −1 (zero at 1/2)
ka, kb = sp.symbols("ka kb", real=True, nonzero=True)
results.append(("linear-reciprocal",
                all(sp.simplify(sp.diff(sp.log(s_ * (ka * x + kb)) / ka, x) - 1 / (ka * x + kb)) == 0 for s_ in (1, -1)),
                all(num_close(quad(1 / (A * x + B), p, q), ev(sp.log(sp.Abs(A * x + B)) / A, q) - ev(sp.log(sp.Abs(A * x + B)) / A, p))
                    for A, B in ((2, -1), (-3, 2)) for p, q in ((-2, sp.Rational(1, 4)), (sp.Rational(3, 4), 3))
                    if (A * p + B) * (A * q + B) > 0)))
nn = sp.symbols("nn", real=True)
results.append(("linear-power",
                sp.simplify(sp.diff((ka * xp + kb)**(nn + 1) / (ka * (nn + 1)), xp) - (ka * xp + kb)**nn) == 0,
                all(num_close(quad((A * x + B)**m, half, two), ev((A * x + B)**(m + 1) / (A * (m + 1)), two)
                              - ev((A * x + B)**(m + 1) / (A * (m + 1)), half))
                    for A, B in ((2, 1), (3, 5)) for m in (sp.Integer(4), sp.Rational(1, 2), sp.Integer(-3)))))

# ---------------------------------------------------------------- exponential and logarithmic
card("e-to-x", sp.exp(x), sp.exp(x), [(None, -1, 2)])
card("e-to-kx", sp.exp(k * x), sp.exp(k * x) / k, [(None, -1, 2)], params=[{k: 3}, {k: -half}])
card("a-to-x", a**x, a**x / sp.log(a), [(None, -1, 2)], params=[{a: 5}, {a: half}])
card("ln-x", sp.log(x), x * sp.log(x) - x, [(None, sp.Rational(1, 10), 4)])

# ---------------------------------------------------------------- trigonometric (x in radians)
pi = sp.pi
card("sin", sp.sin(x), -sp.cos(x), [(None, -1, 2)])
card("cos", sp.cos(x), sp.sin(x), [(None, -1, 2)])
card("sin-kx", sp.sin(k * x), -sp.cos(k * x) / k, [(None, -1, 2)], params=[{k: 3}, {k: -half}])
card("cos-kx", sp.cos(k * x), sp.sin(k * x) / k, [(None, -1, 2)], params=[{k: 3}, {k: -half}])
card("sec-squared", sp.sec(x)**2, sp.tan(x), [(None, -1, sp.Rational(3, 2))])
card("csc-squared", sp.csc(x)**2, -sp.cot(x), [(None, sp.Rational(1, 2), 3)])
card("sec-tan", sp.sec(x) * sp.tan(x), sp.sec(x), [(None, -1, sp.Rational(3, 2))])
card("csc-cot", sp.csc(x) * sp.cot(x), -sp.csc(x), [(None, sp.Rational(1, 2), 3)])
card("tan", sp.tan(x), -sp.log(sp.Abs(sp.cos(x))), [(1, -1, sp.Rational(3, 2)), (-1, 2, 4)])
card("cot", sp.cot(x), sp.log(sp.Abs(sp.sin(x))), [(1, sp.Rational(1, 2), 3), (-1, 4, 6)])
card("sec", sp.sec(x), sp.log(sp.Abs(sp.sec(x) + sp.tan(x))), [(1, -1, sp.Rational(3, 2)), (-1, 2, 4)])
card("sin-squared", sp.sin(x)**2, x / 2 - sp.sin(2 * x) / 4, [(None, -1, 2)])
card("cos-squared", sp.cos(x)**2, x / 2 + sp.sin(2 * x) / 4, [(None, -1, 2)])

# ---------------------------------------------------------------- inverse trigonometric and hyperbolic
card("arctan", 1 / (1 + x**2), sp.atan(x), [(None, -2, 3)])
card("arctan-a", 1 / (a**2 + x**2), sp.atan(x / a) / a, [(None, -2, 3)], params=[{a: 5}, {a: half}])
card("arcsin", 1 / sp.sqrt(1 - x**2), sp.asin(x), [(None, sp.Rational(-9, 10), sp.Rational(9, 10))])
card("arcsin-a", 1 / sp.sqrt(a**2 - x**2), sp.asin(x / a), [(None, sp.Rational(-9, 20), sp.Rational(9, 20))],
     params=[{a: 5}, {a: half}])
card("one-over-sqrt-x-squared-plus-one", 1 / sp.sqrt(x**2 + 1), sp.log(x + sp.sqrt(x**2 + 1)), [(None, -2, 3)])
card("sinh", sp.sinh(x), sp.cosh(x), [(None, -1, 2)])
card("cosh", sp.cosh(x), sp.sinh(x), [(None, -1, 2)])

# ---------------------------------------------------------------- equivalent forms named in the notes
forms = [
    ("tan: −ln|cos x| = ln|sec x|", -sp.log(sp.Abs(sp.cos(x))) - sp.log(sp.Abs(sp.sec(x)))),
    ("sin²: x/2 − sin(2x)/4 = (x − sin x·cos x)/2", x / 2 - sp.sin(2 * x) / 4 - (x - sp.sin(x) * sp.cos(x)) / 2),
    ("cos²: x/2 + sin(2x)/4 = (x + sin x·cos x)/2", x / 2 + sp.sin(2 * x) / 4 - (x + sp.sin(x) * sp.cos(x)) / 2),
    ("arcsin x and −arccos x differ by the constant π/2", sp.asin(x) - (-sp.acos(x)) - pi / 2),
    ("ln(x + √(x² + 1)) = arsinh x", sp.log(x + sp.sqrt(x**2 + 1)) - sp.asinh(x)),
    ("√x: (2/3)x√x = (2/3)x^(3/2)", sp.Rational(2, 3) * xp * sp.sqrt(xp) - sp.Rational(2, 3) * xp**sp.Rational(3, 2)),
    ("sec: sec x + tan x = tan(x/2 + π/4)", sp.sec(x) + sp.tan(x) - sp.tan(x / 2 + pi / 4)),
    ("sin² x = (1 − cos 2x)/2", sp.sin(x)**2 - (1 - sp.cos(2 * x)) / 2),
    ("cos² x = (1 + cos 2x)/2", sp.cos(x)**2 - (1 + sp.cos(2 * x)) / 2),
]
cpos = sp.Symbol("c", positive=True)  # stands for |cos x| > 0 in the tan identity
for label, e in forms:
    if label.startswith("tan"):
        # sec x = 1/cos x, so |sec x| = 1/|cos x|; write |cos x| = c > 0 and expand the logarithms
        symbolic = sp.simplify(sp.expand_log(-sp.log(cpos) - sp.log(1 / cpos), force=True)) == 0 \
            and sp.simplify(sp.sec(x) - 1 / sp.cos(x)) == 0
    else:
        symbolic = sp.simplify(e) == 0 or sp.simplify(e.rewrite(sp.log)) == 0 \
            or sp.simplify(e.rewrite(sp.exp)) == 0
    pts = (sp.Rational(-7, 10), sp.Rational(3, 10), sp.Rational(9, 10))
    e_num = e.subs(xp, x)
    numeric = all(abs(mp.mpf(sp.N(e_num.subs(x, abs(p) if xp in e.free_symbols else p), 40))) < TOL for p in pts)
    results.append((f"[form] {label}", symbolic, numeric))

bad = [r for r in results if not (r[1] and r[2])]
for cid, sym, num in results:
    print(f"{cid:52} symbolic={'ok' if sym else 'FAIL'} numeric={'ok' if num else 'FAIL'}")
print(f"{len(results)} checks, {len(results) - len(bad)} passed, {len(bad)} failed; sympy {sp.__version__}, mpmath {mp.__version__}")

# ---- output (2026-10-04)
# sum-rule                                             symbolic=ok numeric=ok
# constant-multiple                                    symbolic=ok numeric=ok
# integration-by-parts                                 symbolic=ok numeric=ok
# substitution                                         symbolic=ok numeric=ok
# ftc-evaluation                                       symbolic=ok numeric=ok
# ftc-derivative                                       symbolic=ok numeric=ok
# zero-width-interval                                  symbolic=ok numeric=ok
# log-derivative                                       symbolic=ok numeric=ok
# constant                                             symbolic=ok numeric=ok
# power-rule                                           symbolic=ok numeric=ok
# one-over-x                                           symbolic=ok numeric=ok
# one-over-x-squared                                   symbolic=ok numeric=ok
# square-root                                          symbolic=ok numeric=ok
# one-over-square-root                                 symbolic=ok numeric=ok
# linear-reciprocal                                    symbolic=ok numeric=ok
# linear-power                                         symbolic=ok numeric=ok
# e-to-x                                               symbolic=ok numeric=ok
# e-to-kx                                              symbolic=ok numeric=ok
# a-to-x                                               symbolic=ok numeric=ok
# ln-x                                                 symbolic=ok numeric=ok
# sin                                                  symbolic=ok numeric=ok
# cos                                                  symbolic=ok numeric=ok
# sin-kx                                               symbolic=ok numeric=ok
# cos-kx                                               symbolic=ok numeric=ok
# sec-squared                                          symbolic=ok numeric=ok
# csc-squared                                          symbolic=ok numeric=ok
# sec-tan                                              symbolic=ok numeric=ok
# csc-cot                                              symbolic=ok numeric=ok
# tan                                                  symbolic=ok numeric=ok
# cot                                                  symbolic=ok numeric=ok
# sec                                                  symbolic=ok numeric=ok
# sin-squared                                          symbolic=ok numeric=ok
# cos-squared                                          symbolic=ok numeric=ok
# arctan                                               symbolic=ok numeric=ok
# arctan-a                                             symbolic=ok numeric=ok
# arcsin                                               symbolic=ok numeric=ok
# arcsin-a                                             symbolic=ok numeric=ok
# one-over-sqrt-x-squared-plus-one                     symbolic=ok numeric=ok
# sinh                                                 symbolic=ok numeric=ok
# cosh                                                 symbolic=ok numeric=ok
# [form] tan: −ln|cos x| = ln|sec x|                   symbolic=ok numeric=ok
# [form] sin²: x/2 − sin(2x)/4 = (x − sin x·cos x)/2   symbolic=ok numeric=ok
# [form] cos²: x/2 + sin(2x)/4 = (x + sin x·cos x)/2   symbolic=ok numeric=ok
# [form] arcsin x and −arccos x differ by the constant π/2 symbolic=ok numeric=ok
# [form] ln(x + √(x² + 1)) = arsinh x                  symbolic=ok numeric=ok
# [form] √x: (2/3)x√x = (2/3)x^(3/2)                   symbolic=ok numeric=ok
# [form] sec: sec x + tan x = tan(x/2 + π/4)           symbolic=ok numeric=ok
# [form] sin² x = (1 − cos 2x)/2                       symbolic=ok numeric=ok
# [form] cos² x = (1 + cos 2x)/2                       symbolic=ok numeric=ok
# 49 checks, 49 passed, 0 failed; sympy 1.14.0, mpmath 1.3.0
```

**Mutation test showing that the checks catch wrong backs (<scratch>/mutate.py, run as: uv run --with sympy python3 <scratch>/mutate.py); its output follows the script** (Derivations and SymPy verification for the Solid Memo integrals deck)

```
"""Mutation test of verify_integrals.py: plant wrong backs and confirm both checks catch them.

Run: uv run --with sympy python3 mutate.py
"""
import os

HERE = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(HERE, "verify_integrals.py"), encoding="utf-8").read()
mutations = [
    ('card("cos-kx", sp.cos(k * x), sp.sin(k * x) / k,', 'card("cos-kx", sp.cos(k * x), sp.sin(k * x),'),
    ('card("ln-x", sp.log(x), x * sp.log(x) - x,', 'card("ln-x", sp.log(x), x * sp.log(x),'),
    ('card("tan", sp.tan(x), -sp.log(sp.Abs(sp.cos(x))),', 'card("tan", sp.tan(x), sp.log(sp.Abs(sp.cos(x))),'),
    ('card("a-to-x", a**x, a**x / sp.log(a),', 'card("a-to-x", a**x, a**x * sp.log(a),'),
    ('card("sin-squared", sp.sin(x)**2, x / 2 - sp.sin(2 * x) / 4,', 'card("sin-squared", sp.sin(x)**2, x / 2 + sp.sin(2 * x) / 4,'),
]
for old, new in mutations:
    assert old in src, old
    ns = {}
    exec(compile(src.replace(old, new).replace("print(", "(lambda *a, **k: None)("), "mutant", "exec"), ns)
    cid = new.split('"')[1]
    r = [r for r in ns["results"] if r[0] == cid][0]
    print(f"mutant {cid:12} symbolic={'caught' if not r[1] else 'MISSED'} numeric={'caught' if not r[2] else 'MISSED'}")

# ---- output (2026-10-04)
# mutant cos-kx       symbolic=caught numeric=caught
# mutant ln-x         symbolic=caught numeric=caught
# mutant tan          symbolic=caught numeric=caught
# mutant a-to-x       symbolic=caught numeric=caught
# mutant sin-squared  symbolic=caught numeric=caught
```

**Find the Wikidata items of the rules (wbsearchentities, one request per name, <scratch>/search.py, recorded verbatim below)** (Wikidata)

```
https://www.wikidata.org/w/api.php?action=wbsearchentities&search=<name>&language=en&format=json&limit=3
for <name> in: integration by parts; integration by substitution; fundamental theorem of calculus; antiderivative; integral; indefinite integral; linearity of integration; constant of integration; lists of integrals; definite integral; Cavalieri's quadrature formula; integral of the secant function; logarithmic derivative
```

**English and Swedish labels, aliases, Wikipedia sitelinks and defining formulas (P2534) of the items (<scratch>/entities.py, recorded verbatim below)** (Wikidata)

```
https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q273328%7CQ1071270%7CQ1217677%7CQ114326%7CQ80091%7CQ8437543%7CQ6553542%7CQ1355804%7CQ423189%7CQ1991596%7CQ5054786%7CQ4201936%7CQ762521%7CQ149972&props=labels%7Caliases%7Cclaims%7Csitelinks&languages=en%7Csv&sitefilter=enwiki%7Csvwiki&format=json
```

**Licence of Wikidata** (Wikidata)

```
https://www.wikidata.org/wiki/Wikidata:Licensing
```

**Wikitext of the English articles, their current revision ids, and the Wikipedia licence page (<scratch>/fetch.sh, <scratch>/revids.py, both recorded verbatim below)** (English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral))

```
https://en.wikipedia.org/w/index.php?title=Lists_of_integrals&action=raw
https://en.wikipedia.org/w/index.php?title=List_of_integrals_of_trigonometric_functions&action=raw
https://en.wikipedia.org/w/index.php?title=List_of_integrals_of_rational_functions&action=raw
https://en.wikipedia.org/w/index.php?title=List_of_integrals_of_irrational_functions&action=raw (a redirect; then) https://en.wikipedia.org/w/index.php?title=List_of_integrals_of_irrational_algebraic_functions&action=raw
https://en.wikipedia.org/w/index.php?title=List_of_integrals_of_hyperbolic_functions&action=raw
https://en.wikipedia.org/w/index.php?title=List_of_integrals_of_logarithmic_functions&action=raw
https://en.wikipedia.org/w/index.php?title=List_of_integrals_of_exponential_functions&action=raw
https://en.wikipedia.org/w/index.php?title=Integration_by_parts&action=raw
https://en.wikipedia.org/w/index.php?title=Integration_by_substitution&action=raw
https://en.wikipedia.org/w/index.php?title=Fundamental_theorem_of_calculus&action=raw
https://en.wikipedia.org/w/index.php?title=Antiderivative&action=raw
https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=ids%7Ctimestamp&format=json&titles=Lists%20of%20integrals%7CList%20of%20integrals%20of%20trigonometric%20functions%7CList%20of%20integrals%20of%20rational%20functions%7CList%20of%20integrals%20of%20irrational%20algebraic%20functions%7CIntegration%20by%20parts%7CIntegration%20by%20substitution%7CFundamental%20theorem%20of%20calculus%7CAntiderivative
https://en.wikipedia.org/wiki/Wikipedia:Copyrights
```

**Wikitext of the Swedish articles, their revision ids, and a rendered page for the licence footer (<scratch>/fetch.sh, <scratch>/revids.py, both recorded verbatim below)** (Swedish Wikipedia: Primitiv funktion, Partialintegration, Integration genom substitution, Analysens fundamentalsats)

```
https://sv.wikipedia.org/w/index.php?title=Primitiv_funktion&action=raw
https://sv.wikipedia.org/wiki/Primitiv_funktion
https://sv.wikipedia.org/w/index.php?title=Partialintegration&action=raw
https://sv.wikipedia.org/w/index.php?title=Integration_genom_substitution&action=raw
https://sv.wikipedia.org/w/index.php?title=Analysens_fundamentalsats&action=raw
https://sv.wikipedia.org/w/index.php?title=Integral&action=raw
https://sv.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=ids%7Ctimestamp&format=json&titles=Primitiv%20funktion%7CPartialintegration%7CIntegration%20genom%20substitution%7CAnalysens%20fundamentalsats
```

**DLMF terms of use and the sections with the integrals (saved as HTML and read as text with each formula's TeX alttext, <scratch>/dlmf_eqs.py and <scratch>/dlmf_text.py, recorded verbatim below; the pages were saved by <scratch>/fetch.sh)** (NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15))

```
https://dlmf.nist.gov/about/notices
https://dlmf.nist.gov/1.4
https://dlmf.nist.gov/4.10
https://dlmf.nist.gov/4.23
https://dlmf.nist.gov/4.26
https://dlmf.nist.gov/4.40
```

**search.py: the wbsearchentities requests (run as: python3 <scratch>/search.py)** (Wikidata)

```
import json, time, urllib.parse, urllib.request, os

UA = "solid-memo deck research (https://github.com/antwika/solid-memo)"
HERE = os.path.dirname(os.path.abspath(__file__))
names = ["integration by parts", "integration by substitution", "fundamental theorem of calculus",
         "antiderivative", "integral", "indefinite integral", "linearity of integration",
         "constant of integration", "lists of integrals", "definite integral", "Cavalieri's quadrature formula",
         "integral of the secant function", "logarithmic derivative"]
out = {}
for n in names:
    url = ("https://www.wikidata.org/w/api.php?action=wbsearchentities&search=" + urllib.parse.quote(n)
           + "&language=en&format=json&limit=3")
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    data = json.load(urllib.request.urlopen(req))
    out[n] = [(s["id"], s.get("label"), s.get("description")) for s in data["search"]]
    print(n, out[n])
    time.sleep(0.5)
json.dump(out, open(os.path.join(HERE, "search.json"), "w"), indent=1)
```

**entities.py: the wbgetentities request (run as: python3 <scratch>/entities.py)** (Wikidata)

```
import json, urllib.request, os

UA = "solid-memo deck research (https://github.com/antwika/solid-memo)"
HERE = os.path.dirname(os.path.abspath(__file__))
ids = "Q273328|Q1071270|Q1217677|Q114326|Q80091|Q8437543|Q6553542|Q1355804|Q423189|Q1991596|Q5054786|Q4201936|Q762521|Q149972"
url = ("https://www.wikidata.org/w/api.php?action=wbgetentities&ids=" + ids.replace("|", "%7C")
       + "&props=labels%7Caliases%7Cclaims%7Csitelinks&languages=en%7Csv&sitefilter=enwiki%7Csvwiki&format=json")
print(url)
data = json.load(urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA})))
json.dump(data, open(os.path.join(HERE, "entities.json"), "w"), indent=1, ensure_ascii=False)
for qid, e in data["entities"].items():
    lab = {l: v["value"] for l, v in e.get("labels", {}).items()}
    al = {l: [a["value"] for a in v] for l, v in e.get("aliases", {}).items()}
    sl = {k: v["title"] for k, v in e.get("sitelinks", {}).items()}
    f = [c["mainsnak"].get("datavalue", {}).get("value") for c in e.get("claims", {}).get("P2534", [])]
    print(qid, lab, al, sl)
    for x in f:
        print("   P2534:", x)
```

**fetch.sh: downloads the Wikipedia wikitext, the licence pages and the DLMF sections into <scratch> (run as: sh <scratch>/fetch.sh)** (English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral))

```
#!/bin/sh
D="$(dirname "$0")"
UA="solid-memo deck research (https://github.com/antwika/solid-memo)"
get() { curl -s -L -A "$UA" -o "$D/$1" "$2"; echo "$1 $(wc -c < "$D/$1")"; sleep 1; }
get en-lists.wiki "https://en.wikipedia.org/w/index.php?title=Lists_of_integrals&action=raw"
get en-trig.wiki "https://en.wikipedia.org/w/index.php?title=List_of_integrals_of_trigonometric_functions&action=raw"
get en-rational.wiki "https://en.wikipedia.org/w/index.php?title=List_of_integrals_of_rational_functions&action=raw"
get en-irrational.wiki "https://en.wikipedia.org/w/index.php?title=List_of_integrals_of_irrational_functions&action=raw"
get en-hyperbolic.wiki "https://en.wikipedia.org/w/index.php?title=List_of_integrals_of_hyperbolic_functions&action=raw"
get en-log.wiki "https://en.wikipedia.org/w/index.php?title=List_of_integrals_of_logarithmic_functions&action=raw"
get en-exp.wiki "https://en.wikipedia.org/w/index.php?title=List_of_integrals_of_exponential_functions&action=raw"
get en-parts.wiki "https://en.wikipedia.org/w/index.php?title=Integration_by_parts&action=raw"
get en-subst.wiki "https://en.wikipedia.org/w/index.php?title=Integration_by_substitution&action=raw"
get en-ftc.wiki "https://en.wikipedia.org/w/index.php?title=Fundamental_theorem_of_calculus&action=raw"
get en-antiderivative.wiki "https://en.wikipedia.org/w/index.php?title=Antiderivative&action=raw"
get en-copyrights.html "https://en.wikipedia.org/wiki/Wikipedia:Copyrights"
get sv-primitiv.wiki "https://sv.wikipedia.org/w/index.php?title=Primitiv_funktion&action=raw"
get sv-primitiv.html "https://sv.wikipedia.org/wiki/Primitiv_funktion"
get sv-partial.wiki "https://sv.wikipedia.org/w/index.php?title=Partialintegration&action=raw"
get sv-subst.wiki "https://sv.wikipedia.org/w/index.php?title=Integration_genom_substitution&action=raw"
get sv-ftc.wiki "https://sv.wikipedia.org/w/index.php?title=Analysens_fundamentalsats&action=raw"
get sv-integral.wiki "https://sv.wikipedia.org/w/index.php?title=Integral&action=raw"
get dlmf-notices.html "https://dlmf.nist.gov/about/notices"
get dlmf-1.4.html "https://dlmf.nist.gov/1.4"
get dlmf-4.10.html "https://dlmf.nist.gov/4.10"
get dlmf-4.26.html "https://dlmf.nist.gov/4.26"
get dlmf-4.40.html "https://dlmf.nist.gov/4.40"
get wd-licensing.html "https://www.wikidata.org/wiki/Wikidata:Licensing"
```

**revids.py: the revision ids of the Wikipedia articles read, and the DLMF release named on the saved pages (run as: python3 <scratch>/revids.py)** (English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral))

```
import json, os, re, urllib.parse, urllib.request

UA = "solid-memo deck research (https://github.com/antwika/solid-memo)"
HERE = os.path.dirname(os.path.abspath(__file__))
pages = {"en": ["Lists of integrals", "List of integrals of trigonometric functions", "List of integrals of rational functions",
                "List of integrals of irrational algebraic functions", "Integration by parts", "Integration by substitution",
                "Fundamental theorem of calculus", "Antiderivative"],
         "sv": ["Primitiv funktion", "Partialintegration", "Integration genom substitution", "Analysens fundamentalsats"]}
out = {}
for lang, titles in pages.items():
    url = (f"https://{lang}.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=ids%7Ctimestamp&format=json&titles="
           + urllib.parse.quote("|".join(titles)))
    print(url)
    data = json.load(urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA})))
    for p in data["query"]["pages"].values():
        out[f"{lang}:{p['title']}"] = p["revisions"][0]
        print(lang, p["title"], p["revisions"][0])
json.dump(out, open(os.path.join(HERE, "revids.json"), "w"), indent=1, ensure_ascii=False)
for name in ("dlmf-1.4.html", "dlmf-4.10.html"):
    t = open(os.path.join(HERE, name), encoding="utf-8").read()
    print(name, re.findall(r"Release [0-9.]+ of [0-9-]+", t)[:2])
```

**dlmf_eqs.py: prints each DLMF equation id with the TeX alttext of its formulas (run as: python3 <scratch>/dlmf_eqs.py dlmf-1.4.html dlmf-4.10.html dlmf-4.26.html dlmf-4.40.html)** (NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15))

```
"""Print each DLMF equation id with the TeX alttext of its math (saved pages)."""
import html, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
for name in sys.argv[1:]:
    t = open(os.path.join(HERE, name), encoding="utf-8").read()
    # equations are tables/divs with id="E<n>"; take alttext of math elements in order with the nearest preceding id
    for m in re.finditer(r'id="(E\d+[a-z]?)"|alttext="([^"]*)"', t):
        if m.group(1):
            print(f"\n[{name} {m.group(1)}]", end=" ")
        else:
            a = html.unescape(m.group(2))
            if len(a) > 8:
                print(a, end=" | ")
    print()
```

**dlmf_text.py: a saved DLMF page as plain text with each formula replaced by its TeX alttext, printing the context of each search string given (run as: python3 <scratch>/dlmf_text.py <page>.html <string> ...)** (NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15))

```
"""Plain text of a saved DLMF page with each math element replaced by its TeX alttext."""
import html, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
t = open(os.path.join(HERE, sys.argv[1]), encoding="utf-8").read()
t = re.sub(r"<math[^>]*alttext=\"([^\"]*)\"[^>]*>.*?</math>", lambda m: " $" + m.group(1) + "$ ", t, flags=re.S)
t = re.sub(r"<script.*?</script>|<style.*?</style>", " ", t, flags=re.S)
t = re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", t)))
for pat in sys.argv[2:]:
    for m in re.finditer(re.escape(pat), t):
        print("...", t[max(0, m.start() - 300): m.start() + 500], "...\n")
```

**Review rounds 1–3: English Wikipedia "Integral" (revision and § Conventions), svenska.se (rendered by JavaScript, so it gave no entries) and DLMF §4.26 (the condition of eq. 4.26.6) (run as: python3 <scratch>/qc1/fetch.py)** (English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral))

```
"""QC round 1-3 fetches for the integrals deck: enwiki Integral (revision and § Conventions),
svenska.se entries, and DLMF 4.26 (condition of eq. 4.26.6)."""
import html, json, os, re, urllib.parse, urllib.request

UA = "solid-memo deck research (https://github.com/antwika/solid-memo)"
HERE = os.path.dirname(os.path.abspath(__file__))


def get(url):
    print("GET", url)
    return urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=60).read().decode("utf-8")


# 1. English Wikipedia "Integral": current revision id and the Conventions section.
rev = json.loads(get("https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=ids%7Ctimestamp&format=json&titles=Integral"))
print(json.dumps(rev["query"]["pages"], indent=1))
raw = get("https://en.wikipedia.org/w/index.php?title=Integral&action=raw")
open(os.path.join(HERE, "en-integral.wiki"), "w", encoding="utf-8").write(raw)
i = raw.find("=== Conventions")
print(raw[i:i + 1500] if i >= 0 else "no Conventions heading")
for m in re.finditer(r"\\int_a\^a", raw):
    print("...", raw[max(0, m.start() - 400): m.start() + 200], "...")

# 2. svenska.se (SAOL, SO) entries.
for w in ("integrationskonstant", "linjäritet", "linearitet"):
    for d in ("saol", "so"):
        t = get(f"https://svenska.se/tri/f_{d}.php?sok=" + urllib.parse.quote(w))
        txt = re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", t)))
        print(f"[{d} {w}]", txt[:600])

# 3. DLMF 4.26: the text around eq. 4.26.6.
t = get("https://dlmf.nist.gov/4.26")
open(os.path.join(HERE, "dlmf-4.26.html"), "w", encoding="utf-8").write(t)
t2 = re.sub(r"<math[^>]*alttext=\"([^\"]*)\"[^>]*>.*?</math>", lambda m: " $" + m.group(1) + "$ ", t, flags=re.S)
t2 = re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", t2)))
k = t2.find("\\cot x\\,\\mathrm{d}x")
print("[dlmf 4.26.6]", t2[max(0, k - 200): k + 300])
```

**Review rounds 1–2: Swedish Wikipedia full-text search for integrationskonstant(en), linjäritet and linearitet (run as: python3 <scratch>/qc1/svterms.py)** (Swedish Wikipedia: Primitiv funktion, Partialintegration, Integration genom substitution, Analysens fundamentalsats)

```
"""Swedish Wikipedia full-text search for the terms integrationskonstant, linjäritet and linearitet."""
import json, urllib.parse, urllib.request

UA = "solid-memo deck research (https://github.com/antwika/solid-memo)"
for q in ("integrationskonstant", "integrationskonstanten", "linjäritet", "linearitet"):
    url = ("https://sv.wikipedia.org/w/api.php?action=query&list=search&format=json&srlimit=5&srsearch="
           + urllib.parse.quote(q))
    d = json.load(urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA})))
    print(q, d["query"]["searchinfo"]["totalhits"])
    for r in d["query"]["search"]:
        print("   ", r["title"], "|", r["snippet"].replace('<span class="searchmatch">', "[").replace("</span>", "]"))
```

**Review round 4: wikitext of "Primitiv funktion" revision 57615470, to count the rules of § Användbara räknelagar** (Swedish Wikipedia: Primitiv funktion, Partialintegration, Integration genom substitution, Analysens fundamentalsats)

```
curl -s -A "solid-memo deck research (https://github.com/antwika/solid-memo)" "https://sv.wikipedia.org/w/index.php?title=Primitiv_funktion&oldid=57615470&action=raw" -o <scratch>/sv-primitiv-r4.txt
```

**Build, Wikidata checks and validation of the deck** (Derivations and SymPy verification for the Solid Memo integrals deck)

```
python3 packages/deck-library/scripts/authored_decks.py build integrals
node packages/deck-library/scripts/validate_sources.ts integrals
```

## Quality control

6 rounds, 29 findings: 18 fixed, 1 rejected after checking, 10 needing no change. Every card's Wikidata checks (11 in all) are re-run against live Wikidata by `scripts/authored_decks.py check` before every build.

### Round 0: Machine verification and source cross-checks (2026-10-04)

**Reviewer:** Claude (AI) — authoring agent, machine checks · **Scope:** All 42 cards

verify_integrals.py (SymPy 1.14.0, mpmath 1.3.0) ran 49 checks (40 cards plus 9 equivalent forms and identities named in the notes): 49 passed, each symbolically and numerically; the mutation test caught all 5 planted errors both ways. The first run had one symbolic failure, an artefact of SymPy not simplifying a logarithm identity (below). Every card was compared with DLMF and/or English or Swedish Wikipedia (each card's evidence lists which); no card's formula disagrees with any source once conventions are accounted for. The builder's Wikidata checks cover the rule names (12 label checks on 7 items). Discrepancies and convention differences found in the sources are logged below.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| tan | The first run reported symbolic=FAIL for the equivalent form −ln\|cos x\| = ln\|sec x\|: SymPy does not combine ln\|cos x\| + ln\|sec x\| without knowing \|cos x\| > 0 (the numeric check passed). | The script now checks the identity with \|cos x\| written as a positive symbol c and sec x = 1/cos x checked separately; both pass. No change to the card. | no change needed |
| power-rule | DLMF eq. 1.4.17 gives ∫xⁿ dx with the cases n ≠ −1 and n = −1, but its symbol list describes n as "nonnegative integer", which does not fit the case n = −1; the card states the rule for every real n ≠ −1. | The card's general real n rests on the SymPy derivation (general n for x > 0; numerically for n = 5, 1/3, −2, π, −1/2 and on negative x for integer n) and on English and Swedish Wikipedia, which state it for n ≠ −1; the back note gives x > 0 for non-integer n and x ≠ 0 for negative integer n. | no change needed |
| cot | DLMF gives ∫tan x dx = −ln(cos x) for −π/2 < x < π/2 and ∫cot x dx = ln(sin x) without absolute values; Wikipedia and the cards use −ln\|cos x\| and ln\|sin x\|. | The absolute-value forms hold on every interval where the integrand is defined; SymPy confirms them on both signs of cos x and sin x. Back notes give cos x ≠ 0 and sin x ≠ 0. | no change needed |
| sec | The integral of sec x has several standard forms: ln\|sec x + tan x\| (English Wikipedia), ln\|tan(x/2 + π/4)\| (Wikipedia) and gd⁻¹ x (DLMF 4.26.5, for −π/2 < x < π/2, with gd⁻¹ x = ln tan(x/2 + π/4) = ln(sec x + tan x) by DLMF 4.23.42). | The back gives ln\|sec x + tan x\| + C, the usual textbook form; the note names ln\|tan(x/2 + π/4)\| + C, whose equality is checked as an identity (sec x + tan x = tan(x/2 + π/4)). | no change needed |
| csc | ∫csc x dx is given as −ln\|csc x + cot x\| + C, ln\|csc x − cot x\| + C or ln\|tan(x/2)\| + C (English Wikipedia; DLMF 4.26.4 ln(tan(x/2))); a learner giving any of them would be right. | No card for csc x (see Selection). | fixed |
| arcsin | ∫1/√(1 − x²) dx can be written arcsin x + C or −arccos x + C (the two differ by the constant π/2). | The back gives arcsin x + C, as DLMF 4.23.1 and both Wikipedias do; the note says −arccos x + C is also correct and why (identity checked by the script). | no change needed |
| ftc-derivative | The English Wikipedia article notes that the literature is not consistent about which part of the fundamental theorem is called the first and which the second. | The cards and notes name the fundamental theorem of calculus without numbering its parts. | fixed |
| integration-by-parts | Wikidata's Swedish label of Q273328 is "partialintegration" with alias "partiell integration"; Swedish Wikipedia gives both ("Partialintegration eller partiell integration"). | The Swedish front uses Partialintegration (the label and article title); the note gives the other name. Both are builder checks. | no change needed |
| constant-multiple | Swedish Wikipedia states ∫a·f(x) dx = a·∫f(x) dx only for a ≠ 0; for a = 0 the left side is an arbitrary constant while the right side is 0. | The front note states k ≠ 0 and the back note explains why. | fixed |
| indefinite-integral | Wikidata has no Swedish label for indefinite integral (Q8437543), linearity of integration (Q6553542), constant of integration (Q1355804) or integral of the secant function (Q4201936). | Only English label checks on these items; the Swedish notes describe the concepts in words ("en godtycklig konstant", "Integrationen är linjär"). | no change needed |
| substitution | The first build had machine checks on the defining formulas (P2534) of Q114326, Q8437543 and Q1071270 with the TeX strings that wbgetentities returns; the builder's SPARQL query returns these math values as rendered MathML, so the checks failed although the statements are there. | The three P2534 checks were dropped; the formulas are still quoted (as TeX, from wbgetentities) in the cards' evidence, and the rule names remain builder checks. | fixed |
| deck | The reversal rule ∫ᵇₐ f dx = −∫ₐᵇ f dx and additivity ∫ₐᵇ + ∫ᵇᶜ = ∫ₐᶜ (DLMF 1.4.20–1.4.21, Swedish Wikipedia) cannot be written in plain Unicode: there is no subscript letter b. | Both left out (see Selection); ∫ₐᵃ f(x) dx = 0, which can be written, is in the deck. | fixed |

### Round 1: Factual accuracy (2026-10-04)

**Reviewer:** Claude (AI) — independent Factual accuracy reviewer · **Scope:** All 42 cards; the reviewer's own mpmath check (30 antiderivatives, other parameter values, both signs), a re-run of verify_integrals.py, all DLMF equations, Wikipedia revisions and Wikidata values

No factual errors and no warnings; five suggestions. Three were applied (the domain note of linear-power, a second external source for zero-width-interval, the Swedish term integrationskonstanten), one was applied in round 3 (the Q4201936 label check, dropped), and one was declined (the domain notes of power-rule and square-root are both correct as they stand).

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| linear-power | The back note gives the condition ax + b > 0 for non-integer n but not ax + b ≠ 0 for a negative integer n, unlike the power-rule card. | Correct: for a negative integer n the integrand has a non-integrable singularity at ax + b = 0, so the formula holds on each side of it only. The note now reads "For ax + b > 0 when n is not an integer, and for ax + b ≠ 0 when n is a negative integer." (Swedish to match), the same wording as power-rule. | fixed |
| power-rule | power-rule says x > 0 for non-integer n, while square-root (n = 1/2) says x ≥ 0. | Declined. Both are correct. power-rule's note covers every non-integer n, including negative ones such as −1/2 where x = 0 is excluded, so x > 0 is the condition that holds for all of them. square-root gives the whole domain of √x, where (2/3)·x√x is a one-sided antiderivative at 0. Making the general note more detailed would make it harder to read. | rejected |
| zero-width-interval | The only external evidence is Swedish Wikipedia. | Confirmed live: English Wikipedia "Integral", § Conventions (revision 1375764364, fetched 2026-10-04) says "With a = b, this implies: ∫ₐᵃ f(x) dx = 0". Added as evidence. The method's cross-checking step names it. | fixed |
| sec | The label check on Q4201936 ("integral of the secant function") verifies a name that is on no card. The checks on Q6553542 and Q1355804 only verify names in the English notes. | The Q4201936 check and its evidence entry were dropped (see round 3). The sec card still has the derivation, DLMF 4.23.41–42 and English Wikipedia as evidence. The checks on Q6553542 (linearity of integration) and Q1355804 (constant of integration) stay: those names are in the English notes, and the checks confirm the terms the learner reads. | fixed |
| indefinite-integral | The English note names the constant of integration, but the Swedish note does not name integrationskonstant. | svenska.se is rendered by JavaScript and gave no entry, but Swedish Wikipedia, already a source, uses the term: "Integration genom substitution" says "där C är en godtycklig integrationskonstant" and "Partialintegration" says "där vi låter bli att skriva ut integrationskonstanten" (full-text search, 2026-10-04). The Swedish note now reads "C är en godtycklig konstant, integrationskonstanten." | fixed |

### Round 2: Language, translation and language tags (2026-10-04)

**Reviewer:** Claude (AI) — independent Language, translation and language tags reviewer · **Scope:** All 42 cards, the title, description and keywords; language tags in the dossier and the built TTL

No errors or warnings; four suggestions. Two were applied (integrationskonstanten in the Swedish note of indefinite-integral, and "Följer av" instead of "Ur" in the sin² and cos² notes); "linjäritet" and the Swedish-only alternative name in the integration-by-parts note were kept.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| deck | The Swedish description says "linjäritet", while Wikidata's Swedish label of Q1753188 is "linearitet". | Kept. Both forms are in use. The Swedish Wikipedia article is titled "Linjäritet" and opens "Linjäritet eller linearitet", and a full-text search finds 71 pages with "linjäritet" and 9 with "linearitet" (2026-10-04). | no change needed |
| indefinite-integral | The Swedish note omits the term integrationskonstant that the English note gives. | Applied as in round 1: "C är en godtycklig konstant, integrationskonstanten." | fixed |
| integration-by-parts | The Swedish note adds the alternative name "partiell integration" that the English note does not have. | Deliberate: the alternative name is a fact about Swedish usage (Swedish Wikipedia: "Partialintegration eller partiell integration"; a Wikidata alias). | no change needed |
| sin-squared | "Ur sin² x = …" (and "Ur cos² x = …" on cos-squared) reads as a calque of "From …". | Both Swedish notes now begin "Följer av sin² x = (1 − cos 2x)/2." and "Följer av cos² x = (1 + cos 2x)/2." | fixed |

### Round 3: Licensing, attribution and documentation (2026-10-04)

**Reviewer:** Claude (AI) — independent Licensing, attribution and documentation reviewer · **Scope:** All 42 cards' evidence, every source's licence page, the method, selection, licensing and queries

One warning and four suggestions. The warning was right: the selection and the alternative forms in the notes follow two CC BY-SA Wikipedia lists too closely for the claim that no list was copied. Both Wikipedias are now content sources and the deck is CC BY-SA 4.0, with the overlap documented in Method, Selection and Licensing. The Q4201936 check was dropped, the DLMF quote for cot now gives the condition 0 < x < π, and the helper scripts are recorded verbatim. The AI mention in the derivation source's creator was kept.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| deck | The method says no list was copied, but the cards outside the brief and the alternative forms in the notes closely follow English Wikipedia's "Lists of integrals" § Integrals of simple functions and the table and rules of Swedish Wikipedia's "Primitiv funktion", both CC BY-SA 4.0 and marked as verification only. | Confirmed against the cited revisions: the trigonometric run, the alternative forms and every row of the Swedish table are in the deck. Those articles were open for cross-checking while the cards were drafted, so the selection cannot be shown to be independent of them. Both Wikipedias are now content sources (role content, attributed in the deck by the builder) and the deck is CC-BY-SA-4.0. The "no list was copied" claim was removed. Method step 2, Selection and Licensing now describe the overlap and why the deck carries the licence. No card changed. | fixed |
| sec | The Q4201936 label check verifies text that is on no card, and the wikidata source's usedFor lists "integral of the secant function" among the names on the cards. | Dropped the check and its evidence entry and removed the name from wikidata.usedFor. The method now lists Q4201936 among the items looked up but not used. The builder now runs 11 label checks on 6 items (round 0 records the earlier 12 on 7). | fixed |
| deck | The derivation source's creator reads "Anton Wiklund (compiler); written by Claude (Anthropic, AI) at his direction", which is an AI remark outside the method's first paragraph. | Kept. It is accurate attribution of who wrote the derivation scripts and agrees with the method's first paragraph. The same string is used by six other decks (derivatives, trigonometry, geometry-formulas, physics-equations, roman-numerals, chess-openings), so any change belongs to a library-wide decision rather than to this deck alone. | no change needed |
| cot | The DLMF quote for eq. 4.26.6 leaves out its condition 0 < x < π. | Confirmed on https://dlmf.nist.gov/4.26 (fetched 2026-10-04): "\int\cot x\,\mathrm{d}x=\ln\left(\sin x\right), 0<x<\pi". The quote now includes the condition. Round 0 is left as written; its finding on cot is about the missing absolute value, which this condition explains. | fixed |
| deck | The helper scripts search.py, entities.py, fetch.sh, revids.py, dlmf_eqs.py and dlmf_text.py are named under Queries but their text is not recorded. | All six are now recorded verbatim under Queries, as are the scripts run for these review rounds. | fixed |

### Round 4: Re-check of changed cards and a sample (facts, language, documentation) (2026-10-04)

**Reviewer:** Claude (AI) — independent re-check reviewer · **Scope:** The 7 cards changed in rounds 1–3 and every third card (18 cards), against the cited Wikipedia revisions, DLMF and live Wikidata; the fixes claimed in rounds 1–3; the sources, method and selection

Every fix claimed in rounds 1–3 is present and every evidence quote checked matches its source. One error and one suggestion, both confirmed and fixed: the derivation source's licence evidence still called the deck CC0 after the round 3 relicence, and the method's selection paragraph and the Swedish Wikipedia source overstated which rules of § Användbara räknelagar are cards. No card changed.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| deck | The derivation source's licenseEvidence still says the deck's dcterms:license is CC0 1.0, contradicting the deck's CC BY-SA 4.0 licence set in round 3. | Confirmed: the dossier's license field, Licensing and the built TTL all say CC BY-SA 4.0. The sentence now says the compiler's own work is dedicated to the public domain (CC0 1.0) and that the deck as a whole is CC BY-SA 4.0 because of the Wikipedia-derived selection. | fixed |
| deck | The method's selection paragraph (step 2) says the rules of Swedish Wikipedia's § Användbara räknelagar "that plain text can write" are cards, but the section also has ∫f(x)dx = ∫f(t)dt and ∫f·f′ dx = f²/2 + C, which plain text can write and which are not cards. | Confirmed against revision 57615470 (action=raw, fetched 2026-10-04): the section has eight rules, four of which are cards (∫a·f, ∫(f ± g), ∫ₐᵃ f = 0, ∫f′/f); splitting the interval and reversing the limits are not cards either. Method step 2 now says "four of the eight rules" and gives why the other four were left out, with the same reason for the two limit rules as Selection (plain text has no subscript b); the Swedish Wikipedia source's usedFor was corrected the same way. | fixed |

### Round 5: Final full-deck review (facts and language) (2026-10-04)

**Reviewer:** Claude (AI) — independent final reviewer · **Scope:** All 42 cards (facts, ambiguity, language tags, Swedish), the deck's title, description, keywords, counts, study direction and licence, two source details re-checked live, and the fixes claimed in round 4

No errors and no warnings; every result, condition in the notes and Swedish term is correct, the description and counts match the cards, and both round 4 fixes are present and correct. One optional notation suggestion, applied: the notes of sin-squared and cos-squared now bracket the argument of cos as the backs and the rest of the deck do.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| sin-squared | Notation is inconsistent within the card: the back writes sin(2x) with brackets but the note writes the identity as (1 − cos 2x)/2 without them; cos-squared does the same. Elsewhere the deck brackets multi-symbol arguments, as in sin(kx) and cos(kx). | Confirmed (both notations are correct; this is about consistency). The English and Swedish notes of sin-squared and cos-squared now read "(1 − cos(2x))/2" and "(1 + cos(2x))/2", and the method's description of the identity checks was written the same way. The identities themselves are unchanged and remain machine-checked (verify_integrals.py, checks "[form] sin² x = (1 − cos 2x)/2" and "[form] cos² x = (1 + cos 2x)/2", whose labels are kept verbatim as recorded output). | fixed |

## Cards and evidence

| Card | Front | Back | Evidence |
|---|---|---|---|
| `antiderivative-definition` | F is an antiderivative of f if … (en) / F är en primitiv funktion till f om … (sv) | F′(x) = f(x) (zxx) — *For every x in the interval considered. (en) / För alla x i det aktuella intervallet. (sv)* | Wikidata: Q114326 (antiderivative) — P2534 defining formula: F'(x)=f(x); en label "antiderivative", sv label "primitiv funktion"<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §1.4(iv), https://dlmf.nist.gov/1.4.iv — If $F^{\prime}(x)=f(x)$, then $\int f\,\mathrm{d}x=F(x)+C$, where $C$ is a constant.<br>Swedish Wikipedia: Primitiv funktion, Partialintegration, Integration genom substitution, Analysens fundamentalsats: "Primitiv funktion", introduction, revision 57615470: https://sv.wikipedia.org/w/index.php?title=Primitiv_funktion&oldid=57615470 — Inom matematisk analys är en funktion F en primitiv funktion till f om funktionen f är dess derivata, det vill säga om F '(x)=f(x).<br>Wikidata checks: Q114326 en = antiderivative, Q114326 sv = primitiv funktion |
| `indefinite-integral` | ∫ f(x) dx (zxx) | F(x) + C (zxx) — *C is an arbitrary constant, the constant of integration. (en) / C är en godtycklig konstant, integrationskonstanten. (sv)* | Wikidata: Q8437543 (indefinite integral) — P2534 defining formula: F'(x) = f(x) \Rightarrow \int f(x) \mathrm{d} x = F(x) + C<br>Wikidata: Q1355804 (constant of integration) — P2534 defining formula: \int f(x)\ \mathrm d x = F(x) + C; en label "constant of integration"<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): §1.4(iv), https://dlmf.nist.gov/1.4.iv — If $F^{\prime}(x)=f(x)$, then $\int f\,\mathrm{d}x=F(x)+C$, where $C$ is a constant.<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "Antiderivative", § Basic formulae, revision 1372210386: https://en.wikipedia.org/w/index.php?title=Antiderivative&oldid=1372210386 — If \frac{d}{dx} f(x) = g(x), then \int g(x) dx = f(x) + C.<br>Swedish Wikipedia: Primitiv funktion, Partialintegration, Integration genom substitution, Analysens fundamentalsats: "Primitiv funktion", introduction, revision 57615470: https://sv.wikipedia.org/w/index.php?title=Primitiv_funktion&oldid=57615470 — Om en primitiv funktion är F(x), så kan alla primitiva funktioner skrivas F(x) + C.<br>Wikidata checks: Q1355804 en = constant of integration |
| `sum-rule` | ∫ (f(x) + g(x)) dx (zxx) | ∫ f(x) dx + ∫ g(x) dx (zxx) — *Linearity of integration: integrate term by term; the same holds for a difference. (en) / Integrationen är linjär: integrera term för term; detsamma gäller en differens. (sv)* | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "sum-rule" — symbolic=ok numeric=ok<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): eq. 1.4.19, https://dlmf.nist.gov/1.4.E19 — \int^{b}_{a}(cf(x)+dg(x))\,\mathrm{d}x=c\int^{b}_{a}f(x)\,\mathrm{d}x+d\int^{b}_{a}g(x)\,\mathrm{d}x<br>Swedish Wikipedia: Primitiv funktion, Partialintegration, Integration genom substitution, Analysens fundamentalsats: "Primitiv funktion", § Användbara räknelagar, revision 57615470: https://sv.wikipedia.org/w/index.php?title=Primitiv_funktion&oldid=57615470 — \int\left(f(x) \pm g(x)\right)dx = \int f(x)dx \pm \int g(x)dx<br>Wikidata checks: Q6553542 en = linearity of integration |
| `constant-multiple` | ∫ k·f(x) dx (zxx) | k·∫ f(x) dx (zxx) — *A constant factor can be moved outside the integral. For k = 0 the left side is an arbitrary constant, hence k ≠ 0. (en) / En konstant faktor kan flyttas ut ur integralen. För k = 0 är vänsterledet en godtycklig konstant, därav k ≠ 0. (sv)* | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "constant-multiple" — symbolic=ok numeric=ok<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): eq. 1.4.19, https://dlmf.nist.gov/1.4.E19 — \int^{b}_{a}(cf(x)+dg(x))\,\mathrm{d}x=c\int^{b}_{a}f(x)\,\mathrm{d}x+d\int^{b}_{a}g(x)\,\mathrm{d}x<br>Swedish Wikipedia: Primitiv funktion, Partialintegration, Integration genom substitution, Analysens fundamentalsats: "Primitiv funktion", § Användbara räknelagar, revision 57615470: https://sv.wikipedia.org/w/index.php?title=Primitiv_funktion&oldid=57615470 — \int a\cdot f(x)dx = a\cdot\int f(x)dx — förutsatt att konstanten a inte är lika med noll |
| `integration-by-parts` | Integration by parts: ∫ f(x)·g′(x) dx (en) / Partialintegration: ∫ f(x)·g′(x) dx (sv) | f(x)·g(x) − ∫ f′(x)·g(x) dx (zxx) — *The integral form of the product rule. (en) / Integralformen av produktregeln; kallas även partiell integration. (sv)* | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "integration-by-parts" — symbolic=ok numeric=ok<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): eq. 1.4.16, https://dlmf.nist.gov/1.4.E16 — \int fg\,\mathrm{d}x=\left(\int f\,\mathrm{d}x\right)g-\int\left(\int f\,\mathrm{d}x\right)\frac{\mathrm{d}g}{\mathrm{d}x}\,\mathrm{d}x.<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "Integration by parts", § Theorem, revision 1370001209: https://en.wikipedia.org/w/index.php?title=Integration_by_parts&oldid=1370001209 — \int u(x)v'(x)\,dx  = u(x)v(x) - \int u'(x)v(x) \,dx,<br>Swedish Wikipedia: Primitiv funktion, Partialintegration, Integration genom substitution, Analysens fundamentalsats: "Partialintegration", § Bevis, revision 59187073: https://sv.wikipedia.org/w/index.php?title=Partialintegration&oldid=59187073 — Detta ger formeln för partiell integration som \int u(x)v'(x)\,dx \ =\ u(x)v(x) - \int u'(x)v(x) \,dx,<br>Wikidata: Q273328 (integration by parts) — en label "integration by parts", sv label "partialintegration", sv aliases "partiell Integrering", "partiell integration"<br>Wikidata checks: Q273328 en = integration by parts, Q273328 sv = partialintegration, Q273328 sv = partiell integration |
| `substitution` | Integration by substitution: ∫ f(g(x))·g′(x) dx (en) / Integration genom substitution: ∫ f(g(x))·g′(x) dx (sv) | F(g(x)) + C (zxx) — *Substitute u = g(x), du = g′(x) dx: ∫ f(u) du = F(u) + C. The integral form of the chain rule. (en) / Variabelbyte u = g(x), du = g′(x) dx: ∫ f(u) du = F(u) + C. Integralformen av kedjeregeln. (sv)* | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "substitution" — symbolic=ok numeric=ok<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): eq. 1.4.28, https://dlmf.nist.gov/1.4.E28 — \int^{b}_{a}f(\phi(x))\phi^{\prime}(x)\,\mathrm{d}x=\int^{\phi(b)}_{\phi(a)}f(t)\,\mathrm{d}t.<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "Integration by substitution", § Substitution for a single variable, Proof, revision 1360144432: https://en.wikipedia.org/w/index.php?title=Integration_by_substitution&oldid=1360144432 — Since f is continuous, it has an antiderivative F. ... (F \circ g)'(x) = F'(g(x)) \cdot g'(x) = f(g(x)) \cdot g'(x).<br>Swedish Wikipedia: Primitiv funktion, Partialintegration, Integration genom substitution, Analysens fundamentalsats: "Integration genom substitution", § Bevis, revision 57633976: https://sv.wikipedia.org/w/index.php?title=Integration_genom_substitution&oldid=57633976 — Då ƒ är kontinuerlig, har den en primitiv funktion F. ... (F \circ \varphi)'(t) = F'(\varphi(t))\varphi'(t) = f(\varphi(t))\varphi'(t)<br>Wikidata: Q1071270 (integration by substitution) — en label "integration by substitution", sv label "Integration genom substitution"; P2534: \int_a^b f(\phi(x)) \phi'(x) \, \mathrm{d}x = \int_{\phi(a)}^{\phi(b)} f(t) \, \mathrm{d}t<br>Wikidata checks: Q1071270 en = integration by substitution, Q1071270 sv = Integration genom substitution |
| `ftc-evaluation` | Fundamental theorem of calculus: ∫ₐᵇ f(x) dx (en) / Analysens fundamentalsats: ∫ₐᵇ f(x) dx (sv) | F(b) − F(a) (zxx) — *Also written [F(x)]ₐᵇ. (en) / Skrivs även [F(x)]ₐᵇ. (sv)* | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "ftc-evaluation" — symbolic=ok numeric=ok<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): eq. 1.4.26, https://dlmf.nist.gov/1.4.E26 — For $F^{\prime}(x)=f(x)$ with $f(x)$ continuous, $\int^{b}_{a}f(x)\,\mathrm{d}x=F(b)-F(a)$<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "Fundamental theorem of calculus", § Corollary, revision 1368883841: https://en.wikipedia.org/w/index.php?title=Fundamental_theorem_of_calculus&oldid=1368883841 — if f is a real-valued continuous function on [a,b] and F is an antiderivative of f in [a,b], then \int_a^b f(t)\, dt = F(b)-F(a).<br>Swedish Wikipedia: Primitiv funktion, Partialintegration, Integration genom substitution, Analysens fundamentalsats: "Analysens fundamentalsats", statement, revision 54921345: https://sv.wikipedia.org/w/index.php?title=Analysens_fundamentalsats&oldid=54921345 — Om G är en primitiv funktion till f så sammanfaller den med integralen av funktionen f: G(x) = G(a) + \int_{a}^{x} f(t)\,dt, \qquad x \in [a,b].<br>Wikidata: Q1217677 (fundamental theorem of calculus) — en label "fundamental theorem of calculus", sv label "analysens fundamentalsats", sv aliases "Analysens huvudsats", "Integralkalkylens huvudsats"<br>Wikidata checks: Q1217677 en = fundamental theorem of calculus, Q1217677 sv = analysens fundamentalsats |
| `ftc-derivative` | d/dx ∫ₐˣ f(t) dt (zxx) | f(x) (zxx) — *Fundamental theorem of calculus: integrating and then differentiating gives f back. (en) / Analysens fundamentalsats: att integrera och sedan derivera ger tillbaka f. (sv)* | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "ftc-derivative" — symbolic=ok numeric=ok<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): eq. 1.4.27, https://dlmf.nist.gov/1.4.E27 — For $F^{\prime}(x)=f(x)$ with $f(x)$ continuous, ... \frac{\mathrm{d}}{\mathrm{d}x}\int^{x}_{a}f(t)\,\mathrm{d}t=f(x).<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "Fundamental theorem of calculus", § First part, revision 1368883841: https://en.wikipedia.org/w/index.php?title=Fundamental_theorem_of_calculus&oldid=1368883841 — Let f be a continuous real-valued function defined on a closed interval [a, b]. Let F be the function defined, for all x in [a, b], by F(x) = \int_a^x f(t)\, dt. Then ... F'(x) = f(x) for all x in (a, b)<br>Swedish Wikipedia: Primitiv funktion, Partialintegration, Integration genom substitution, Analysens fundamentalsats: "Analysens fundamentalsats", statement, revision 54921345: https://sv.wikipedia.org/w/index.php?title=Analysens_fundamentalsats&oldid=54921345 — Antag att en funktion f är kontinuerlig i intervallet [a,b] och definiera F(x)=\int_a^x f(t)\,dt ... F^\prime(x) = f(x), \qquad x \in (a,b). |
| `zero-width-interval` | ∫ₐᵃ f(x) dx (zxx) | 0 (zxx) — *An integral over an interval of length zero. (en) / En integral över ett intervall med längden noll. (sv)* | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "zero-width-interval" — symbolic=ok numeric=ok<br>Swedish Wikipedia: Primitiv funktion, Partialintegration, Integration genom substitution, Analysens fundamentalsats: "Primitiv funktion", § Användbara räknelagar, revision 57615470: https://sv.wikipedia.org/w/index.php?title=Primitiv_funktion&oldid=57615470 — \int_a^a f(x)dx = 0<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "Integral", § Conventions, revision 1375764364: https://en.wikipedia.org/w/index.php?title=Integral&oldid=1375764364 — Integrals can also be defined if a > b: \int_a^b f(x) \, dx = - \int_b^a f(x) \, dx. With a = b, this implies: \int_a^a f(x) \, dx = 0. |
| `log-derivative` | ∫ f′(x)/f(x) dx (zxx) | ln\|f(x)\| + C (zxx) — *Where f(x) ≠ 0. Example: ∫ tan x dx = −ln\|cos x\| + C. (en) / Där f(x) ≠ 0. Exempel: ∫ tan x dx = −ln\|cos x\| + C. (sv)* | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "log-derivative" — symbolic=ok numeric=ok<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "List of integrals of rational functions", § Miscellaneous integrands, revision 1350437329: https://en.wikipedia.org/w/index.php?title=List_of_integrals_of_rational_functions&oldid=1350437329 — \int\frac{f'(x)}{f(x)} \, dx= \ln\left\| f(x)\right\| + C<br>Swedish Wikipedia: Primitiv funktion, Partialintegration, Integration genom substitution, Analysens fundamentalsats: "Primitiv funktion", § Användbara räknelagar, revision 57615470: https://sv.wikipedia.org/w/index.php?title=Primitiv_funktion&oldid=57615470 — \int\frac{f'(x)}{f(x)}dx = \ln\|f(x)\| + C |
| `constant` | ∫ k dx (zxx) | kx + C (zxx) | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "constant" — symbolic=ok numeric=ok<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "Antiderivative", § Basic formulae, revision 1372210386: https://en.wikipedia.org/w/index.php?title=Antiderivative&oldid=1372210386 — \int a\ dx = ax + C<br>Swedish Wikipedia: Primitiv funktion, Partialintegration, Integration genom substitution, Analysens fundamentalsats: "Primitiv funktion", table "Några primitiva funktioner", revision 57615470: https://sv.wikipedia.org/w/index.php?title=Primitiv_funktion&oldid=57615470 — k \| kx + C |
| `power-rule` | ∫ xⁿ dx (zxx) | xⁿ⁺¹/(n + 1) + C (zxx) — *For x > 0 when n is not an integer, and for x ≠ 0 when n is a negative integer. For n = −1: ln\|x\| + C. (en) / För x > 0 när n inte är ett heltal, och för x ≠ 0 när n är ett negativt heltal. För n = −1: ln\|x\| + C. (sv)* | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "power-rule" — symbolic=ok (general n, x > 0) numeric=ok (n = 5, 1/3, −2, π, −1/2 on [1/2, 2]; n = 5, −2, −3 on [−3, −1])<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): eq. 1.4.17, https://dlmf.nist.gov/1.4.E17 — \int x^{n}\,\mathrm{d}x=\begin{cases}\dfrac{x^{n+1}}{n+1}+C,&\quad n\not=-1,\\ \ln\left\|x\right\|+C,&\quad n=-1.\end{cases}<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "Lists of integrals", § Rational functions, revision 1371952357: https://en.wikipedia.org/w/index.php?title=Lists_of_integrals&oldid=1371952357 — \int x^n\,dx = \frac{x^{n+1}}{n+1} + C \qquad\text{(for } n\neq -1\text{)} (Cavalieri's quadrature formula)<br>Swedish Wikipedia: Primitiv funktion, Partialintegration, Integration genom substitution, Analysens fundamentalsats: "Primitiv funktion", table "Några primitiva funktioner", revision 57615470: https://sv.wikipedia.org/w/index.php?title=Primitiv_funktion&oldid=57615470 — x^n ~~~ (n \ne -1) \| \frac{x^{n+1}}{n+1} + C |
| `one-over-x` | ∫ 1/x dx (zxx) | ln\|x\| + C (zxx) — *For x ≠ 0. For x > 0 this is ln x + C; the constant may differ on the two sides of 0. (en) / För x ≠ 0. För x > 0 blir det ln x + C; konstanten kan vara olika på var sida om 0. (sv)* | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "one-over-x" — symbolic=ok (x > 0 and x < 0 separately) numeric=ok<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): eq. 1.4.17, https://dlmf.nist.gov/1.4.E17 — \int x^{n}\,\mathrm{d}x= ... \ln\left\|x\right\|+C,&\quad n=-1.<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "Lists of integrals", § Rational functions, revision 1371952357: https://en.wikipedia.org/w/index.php?title=Lists_of_integrals&oldid=1371952357 — \int {1 \over x}\,dx = \ln \left\|x \right\| + C<br>Swedish Wikipedia: Primitiv funktion, Partialintegration, Integration genom substitution, Analysens fundamentalsats: "Primitiv funktion", table "Några primitiva funktioner", revision 57615470: https://sv.wikipedia.org/w/index.php?title=Primitiv_funktion&oldid=57615470 — x^{-1} = \frac{1}{x} \| \ln{\|x\|} + C |
| `one-over-x-squared` | ∫ 1/x² dx (zxx) | −1/x + C (zxx) — *For x ≠ 0. The power rule with n = −2. (en) / För x ≠ 0. Potensregeln med n = −2. (sv)* | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "one-over-x-squared" — symbolic=ok numeric=ok<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "Lists of integrals", § Rational functions (the power formula with n = −2), revision 1371952357: https://en.wikipedia.org/w/index.php?title=Lists_of_integrals&oldid=1371952357 — \int x^n\,dx = \frac{x^{n+1}}{n+1} + C \qquad\text{(for } n\neq -1\text{)}<br>Swedish Wikipedia: Primitiv funktion, Partialintegration, Integration genom substitution, Analysens fundamentalsats: "Primitiv funktion", table "Några primitiva funktioner" (with n = −2), revision 57615470: https://sv.wikipedia.org/w/index.php?title=Primitiv_funktion&oldid=57615470 — x^n ~~~ (n \ne -1) \| \frac{x^{n+1}}{n+1} + C |
| `square-root` | ∫ √x dx (zxx) | (2/3)·x√x + C (zxx) — *For x ≥ 0. Also written (2/3)·x^(3/2) + C: the power rule with n = 1/2. (en) / För x ≥ 0. Skrivs även (2/3)·x^(3/2) + C: potensregeln med n = 1/2. (sv)* | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "square-root" — symbolic=ok numeric=ok<br>Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "[form] √x: (2/3)x√x = (2/3)x^(3/2)" — symbolic=ok numeric=ok<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "Lists of integrals", § Rational functions (the power formula with n = 1/2), revision 1371952357: https://en.wikipedia.org/w/index.php?title=Lists_of_integrals&oldid=1371952357 — \int x^n\,dx = \frac{x^{n+1}}{n+1} + C \qquad\text{(for } n\neq -1\text{)}<br>Swedish Wikipedia: Primitiv funktion, Partialintegration, Integration genom substitution, Analysens fundamentalsats: "Primitiv funktion", table "Några primitiva funktioner" (with n = 1/2), revision 57615470: https://sv.wikipedia.org/w/index.php?title=Primitiv_funktion&oldid=57615470 — x^n ~~~ (n \ne -1) \| \frac{x^{n+1}}{n+1} + C |
| `one-over-square-root` | ∫ 1/√x dx (zxx) | 2√x + C (zxx) — *For x > 0. The power rule with n = −1/2. (en) / För x > 0. Potensregeln med n = −1/2. (sv)* | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "one-over-square-root" — symbolic=ok numeric=ok<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "Lists of integrals", § Rational functions (the power formula with n = −1/2), revision 1371952357: https://en.wikipedia.org/w/index.php?title=Lists_of_integrals&oldid=1371952357 — \int x^n\,dx = \frac{x^{n+1}}{n+1} + C \qquad\text{(for } n\neq -1\text{)}<br>Swedish Wikipedia: Primitiv funktion, Partialintegration, Integration genom substitution, Analysens fundamentalsats: "Primitiv funktion", table "Några primitiva funktioner" (with n = −1/2), revision 57615470: https://sv.wikipedia.org/w/index.php?title=Primitiv_funktion&oldid=57615470 — x^n ~~~ (n \ne -1) \| \frac{x^{n+1}}{n+1} + C |
| `linear-reciprocal` | ∫ 1/(ax + b) dx (zxx) | (1/a)·ln\|ax + b\| + C (zxx) — *For ax + b ≠ 0. (en) / För ax + b ≠ 0. (sv)* | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "linear-reciprocal" — symbolic=ok (general a ≠ 0 and b, ax + b > 0 and < 0 separately) numeric=ok (a, b = 2, −1 and −3, 2)<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "Lists of integrals", § Rational functions, revision 1371952357: https://en.wikipedia.org/w/index.php?title=Lists_of_integrals&oldid=1371952357 — \int\frac{c}{ax + b} \, dx= \frac{c}{a}\ln\left\|ax + b\right\| + C<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "List of integrals of rational functions", § Integrands of the form x^m(ax + b)^n, revision 1350437329: https://en.wikipedia.org/w/index.php?title=List_of_integrals_of_rational_functions&oldid=1350437329 — \int\frac{1}{ax + b} \, dx= \begin{cases} \dfrac{1}{a}\ln(-(ax + b)) + C^- & ax+b<0 \\ \dfrac{1}{a}\ln(ax + b) + C^+ & ax+b>0 \end{cases} |
| `linear-power` | ∫ (ax + b)ⁿ dx (zxx) | (ax + b)ⁿ⁺¹/(a(n + 1)) + C (zxx) — *The power rule with the substitution u = ax + b. For ax + b > 0 when n is not an integer, and for ax + b ≠ 0 when n is a negative integer. (en) / Potensregeln med variabelbytet u = ax + b. För ax + b > 0 när n inte är ett heltal, och för ax + b ≠ 0 när n är ett negativt heltal. (sv)* | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "linear-power" — symbolic=ok (general a ≠ 0, b and n) numeric=ok (a, b = 2, 1 and 3, 5; n = 4, 1/2, −3)<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "Lists of integrals", § Rational functions, revision 1371952357: https://en.wikipedia.org/w/index.php?title=Lists_of_integrals&oldid=1371952357 — \int (ax + b)^n \, dx= \frac{(ax + b)^{n+1}}{a(n + 1)} + C \qquad\text{(for } n\neq -1\text{)} |
| `e-to-x` | ∫ eˣ dx (zxx) | eˣ + C (zxx) | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "e-to-x" — symbolic=ok numeric=ok<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): eq. 4.10.8, https://dlmf.nist.gov/4.10.E8 (with a = 1) — \int e^{az}\,\mathrm{d}z=\frac{e^{az}}{a},<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "Antiderivative", § Basic formulae, revision 1372210386: https://en.wikipedia.org/w/index.php?title=Antiderivative&oldid=1372210386 — \int e^{x}\ dx = e^{x} + C<br>Swedish Wikipedia: Primitiv funktion, Partialintegration, Integration genom substitution, Analysens fundamentalsats: "Primitiv funktion", table "Några primitiva funktioner", revision 57615470: https://sv.wikipedia.org/w/index.php?title=Primitiv_funktion&oldid=57615470 — e^x \| e^x + C |
| `e-to-kx` | ∫ eᵏˣ dx (zxx) | eᵏˣ/k + C (zxx) | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "e-to-kx" — symbolic=ok (general k ≠ 0) numeric=ok (k = 3 and −1/2)<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): eq. 4.10.8, https://dlmf.nist.gov/4.10.E8 — \int e^{az}\,\mathrm{d}z=\frac{e^{az}}{a},<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "Lists of integrals", § Exponential functions, revision 1371952357: https://en.wikipedia.org/w/index.php?title=Lists_of_integrals&oldid=1371952357 — \int e^{ax}\,dx = \frac{1}{a}e^{ax} + C |
| `a-to-x` | ∫ aˣ dx (zxx) | aˣ/ln a + C (zxx) | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "a-to-x" — symbolic=ok (general a > 0) numeric=ok (a = 5 and 1/2)<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "Antiderivative", § Basic formulae, revision 1372210386: https://en.wikipedia.org/w/index.php?title=Antiderivative&oldid=1372210386 — \int a^{x}\ dx = \frac{a^{x}}{\ln a} + C;\ a > 0,\ a \neq 1<br>Swedish Wikipedia: Primitiv funktion, Partialintegration, Integration genom substitution, Analysens fundamentalsats: "Primitiv funktion", table "Några primitiva funktioner", revision 57615470: https://sv.wikipedia.org/w/index.php?title=Primitiv_funktion&oldid=57615470 — a^x ~~~ (a > 0, a \ne 1) \| \frac{a^x}{\ln a} + C |
| `ln-x` | ∫ ln x dx (zxx) | x·ln x − x + C (zxx) — *For x > 0. Found by integration by parts with ln x = 1·ln x. (en) / För x > 0. Fås med partialintegration av 1·ln x. (sv)* | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "ln-x" — symbolic=ok numeric=ok<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): eq. 4.10.2, https://dlmf.nist.gov/4.10.E2 — \int\ln z\,\mathrm{d}z=z\ln z-z,<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "Lists of integrals", § Logarithms, revision 1371952357: https://en.wikipedia.org/w/index.php?title=Lists_of_integrals&oldid=1371952357 — \int \ln x\,dx = x \ln x - x + C = x (\ln x - 1) + C |
| `sin` | ∫ sin x dx (zxx) | −cos x + C (zxx) | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "sin" — symbolic=ok numeric=ok<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): eq. 4.26.1, https://dlmf.nist.gov/4.26.E1 — \int\sin x\,\mathrm{d}x =-\cos x,<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "Lists of integrals", § Trigonometric functions, revision 1371952357: https://en.wikipedia.org/w/index.php?title=Lists_of_integrals&oldid=1371952357 — \int \sin x \, dx = -\cos x + C<br>Swedish Wikipedia: Primitiv funktion, Partialintegration, Integration genom substitution, Analysens fundamentalsats: "Primitiv funktion", table "Några primitiva funktioner", revision 57615470: https://sv.wikipedia.org/w/index.php?title=Primitiv_funktion&oldid=57615470 — \sin (x) \| - \cos (x) + C |
| `cos` | ∫ cos x dx (zxx) | sin x + C (zxx) | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "cos" — symbolic=ok numeric=ok<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): eq. 4.26.2, https://dlmf.nist.gov/4.26.E2 — \int\cos x\,\mathrm{d}x =\sin x.<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "Lists of integrals", § Trigonometric functions, revision 1371952357: https://en.wikipedia.org/w/index.php?title=Lists_of_integrals&oldid=1371952357 — \int \cos x\, dx = \sin x + C<br>Swedish Wikipedia: Primitiv funktion, Partialintegration, Integration genom substitution, Analysens fundamentalsats: "Primitiv funktion", table "Några primitiva funktioner", revision 57615470: https://sv.wikipedia.org/w/index.php?title=Primitiv_funktion&oldid=57615470 — \cos (x) \| \sin (x) + C |
| `sin-kx` | ∫ sin(kx) dx (zxx) | −cos(kx)/k + C (zxx) | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "sin-kx" — symbolic=ok (general k ≠ 0) numeric=ok (k = 3 and −1/2)<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "List of integrals of trigonometric functions", § Integrands involving only sine, revision 1343468911: https://en.wikipedia.org/w/index.php?title=List_of_integrals_of_trigonometric_functions&oldid=1343468911 — \int\sin ax\,dx = -\frac{1}{a}\cos ax+C |
| `cos-kx` | ∫ cos(kx) dx (zxx) | sin(kx)/k + C (zxx) | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "cos-kx" — symbolic=ok (general k ≠ 0) numeric=ok (k = 3 and −1/2)<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "List of integrals of trigonometric functions", § Integrands involving only cosine, revision 1343468911: https://en.wikipedia.org/w/index.php?title=List_of_integrals_of_trigonometric_functions&oldid=1343468911 — \int\cos ax\,dx = \frac{1}{a}\sin ax+C |
| `sec-squared` | ∫ sec² x dx (zxx) | tan x + C (zxx) — *sec x = 1/cos x, so this is ∫ 1/cos² x dx. For cos x ≠ 0. (en) / sec x = 1/cos x, så detta är ∫ 1/cos² x dx. För cos x ≠ 0. (sv)* | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "sec-squared" — symbolic=ok numeric=ok<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "Lists of integrals", § Trigonometric functions, revision 1371952357: https://en.wikipedia.org/w/index.php?title=Lists_of_integrals&oldid=1371952357 — \int \sec^2 x \, dx = \tan x + C<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "Antiderivative", § Basic formulae, revision 1372210386: https://en.wikipedia.org/w/index.php?title=Antiderivative&oldid=1372210386 — \int \sec^2{x}\ dx = \tan{x} + C |
| `csc-squared` | ∫ csc² x dx (zxx) | −cot x + C (zxx) — *csc x = 1/sin x, so this is ∫ 1/sin² x dx. For sin x ≠ 0. (en) / csc x = 1/sin x, så detta är ∫ 1/sin² x dx. För sin x ≠ 0. (sv)* | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "csc-squared" — symbolic=ok numeric=ok<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "Lists of integrals", § Trigonometric functions, revision 1371952357: https://en.wikipedia.org/w/index.php?title=Lists_of_integrals&oldid=1371952357 — \int \csc^2 x \, dx = -\cot x + C<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "Antiderivative", § Basic formulae, revision 1372210386: https://en.wikipedia.org/w/index.php?title=Antiderivative&oldid=1372210386 — \int \csc^2{x}\ dx = -\cot{x} + C |
| `sec-tan` | ∫ sec x·tan x dx (zxx) | sec x + C (zxx) — *For cos x ≠ 0. (en) / För cos x ≠ 0. (sv)* | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "sec-tan" — symbolic=ok numeric=ok<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "Lists of integrals", § Trigonometric functions, revision 1371952357: https://en.wikipedia.org/w/index.php?title=Lists_of_integrals&oldid=1371952357 — \int \sec x \, \tan x \, dx = \sec x + C<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "Antiderivative", § Basic formulae, revision 1372210386: https://en.wikipedia.org/w/index.php?title=Antiderivative&oldid=1372210386 — \int \sec{x}\tan{x}\ dx = \sec{x} + C |
| `csc-cot` | ∫ csc x·cot x dx (zxx) | −csc x + C (zxx) — *For sin x ≠ 0. (en) / För sin x ≠ 0. (sv)* | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "csc-cot" — symbolic=ok numeric=ok<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "Lists of integrals", § Trigonometric functions, revision 1371952357: https://en.wikipedia.org/w/index.php?title=Lists_of_integrals&oldid=1371952357 — \int \csc x \, \cot x \, dx = -\csc x + C<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "Antiderivative", § Basic formulae, revision 1372210386: https://en.wikipedia.org/w/index.php?title=Antiderivative&oldid=1372210386 — \int \csc{x}\cot{x}\ dx = -\csc{x} + C |
| `tan` | ∫ tan x dx (zxx) | −ln\|cos x\| + C (zxx) — *For cos x ≠ 0. Also written ln\|sec x\| + C. (en) / För cos x ≠ 0. Skrivs även ln\|sec x\| + C. (sv)* | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "tan" — symbolic=ok (cos x > 0 and cos x < 0 separately) numeric=ok<br>Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "[form] tan: −ln\|cos x\| = ln\|sec x\|" — symbolic=ok numeric=ok<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): eq. 4.26.3, https://dlmf.nist.gov/4.26.E3 — \int\tan x\,\mathrm{d}x =-\ln\left(\cos x\right), -\tfrac{1}{2}\pi<x<\tfrac{1}{2}\pi<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "Lists of integrals", § Trigonometric functions, revision 1371952357: https://en.wikipedia.org/w/index.php?title=Lists_of_integrals&oldid=1371952357 — \int \tan x \, dx = \ln\left\| \sec x \right\| + C = -\ln\left\| \cos x \right\| + C |
| `cot` | ∫ cot x dx (zxx) | ln\|sin x\| + C (zxx) — *For sin x ≠ 0. (en) / För sin x ≠ 0. (sv)* | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "cot" — symbolic=ok (sin x > 0 and sin x < 0 separately) numeric=ok<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): eq. 4.26.6, https://dlmf.nist.gov/4.26.E6 — \int\cot x\,\mathrm{d}x=\ln\left(\sin x\right), 0<x<\pi<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "Lists of integrals", § Trigonometric functions, revision 1371952357: https://en.wikipedia.org/w/index.php?title=Lists_of_integrals&oldid=1371952357 — \int \cot x \, dx =  -\ln\left\| \csc x \right\| + C = \ln\left\| \sin x \right\| + C |
| `sec` | ∫ sec x dx (zxx) | ln\|sec x + tan x\| + C (zxx) — *For cos x ≠ 0. Also written ln\|tan(x/2 + π/4)\| + C. (en) / För cos x ≠ 0. Skrivs även ln\|tan(x/2 + π/4)\| + C. (sv)* | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "sec" — symbolic=ok (sec x + tan x > 0 and < 0 separately) numeric=ok<br>Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "[form] sec: sec x + tan x = tan(x/2 + π/4)" — symbolic=ok numeric=ok<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): eq. 4.23.41, https://dlmf.nist.gov/4.23.E41 — {\operatorname{gd}^{-1}}\left(x\right)=\int_{0}^{x}\sec t\,\mathrm{d}t, -\frac{1}{2}\pi<x<\frac{1}{2}\pi<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): eq. 4.23.42, https://dlmf.nist.gov/4.23.E42 — {\operatorname{gd}^{-1}}\left(x\right)=\ln\tan\left(\tfrac{1}{2}x+\tfrac{1}{4}\pi\right)=\ln\left(\sec x+\tan x\right)=\operatorname{arcsinh}\left(\tan x\right)= ...<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "Lists of integrals", § Trigonometric functions, revision 1371952357: https://en.wikipedia.org/w/index.php?title=Lists_of_integrals&oldid=1371952357 — \int \sec x \, dx = \ln\left\| \sec x + \tan x\right\| + C = \ln\left\| \tan\left(\dfrac{x}{2} + \dfrac{\pi}{4}\right) \right\| + C |
| `sin-squared` | ∫ sin² x dx (zxx) | x/2 − sin(2x)/4 + C (zxx) — *From sin² x = (1 − cos(2x))/2. Also written (x − sin x·cos x)/2 + C. (en) / Följer av sin² x = (1 − cos(2x))/2. Skrivs även (x − sin x·cos x)/2 + C. (sv)* | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "sin-squared" — symbolic=ok numeric=ok<br>Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "[form] sin²: x/2 − sin(2x)/4 = (x − sin x·cos x)/2" — symbolic=ok numeric=ok<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "Lists of integrals", § Trigonometric functions, revision 1371952357: https://en.wikipedia.org/w/index.php?title=Lists_of_integrals&oldid=1371952357 — \int \sin^2 x \, dx = \frac{1}{2}\left(x - \frac{\sin 2x}{2} \right) + C = \frac{1}{2}(x - \sin x\cos x ) + C<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "List of integrals of trigonometric functions", § Integrands involving only sine, revision 1343468911: https://en.wikipedia.org/w/index.php?title=List_of_integrals_of_trigonometric_functions&oldid=1343468911 — \int\sin^2 {ax}\,dx = \frac{x}{2} - \frac{1}{4a} \sin 2ax +C= \frac{x}{2} - \frac{1}{2a} \sin ax\cos ax +C |
| `cos-squared` | ∫ cos² x dx (zxx) | x/2 + sin(2x)/4 + C (zxx) — *From cos² x = (1 + cos(2x))/2. Also written (x + sin x·cos x)/2 + C. (en) / Följer av cos² x = (1 + cos(2x))/2. Skrivs även (x + sin x·cos x)/2 + C. (sv)* | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "cos-squared" — symbolic=ok numeric=ok<br>Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "[form] cos²: x/2 + sin(2x)/4 = (x + sin x·cos x)/2" — symbolic=ok numeric=ok<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "Lists of integrals", § Trigonometric functions, revision 1371952357: https://en.wikipedia.org/w/index.php?title=Lists_of_integrals&oldid=1371952357 — \int \cos^2 x \, dx = \frac{1}{2}\left(x + \frac{\sin 2x}{2} \right) + C = \frac{1}{2}(x + \sin x\cos x ) + C<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "List of integrals of trigonometric functions", § Integrands involving only cosine, revision 1343468911: https://en.wikipedia.org/w/index.php?title=List_of_integrals_of_trigonometric_functions&oldid=1343468911 — \int\cos^2 {ax}\,dx = \frac{x}{2} + \frac{1}{4a} \sin 2ax +C = \frac{x}{2} + \frac{1}{2a} \sin ax\cos ax +C |
| `arctan` | ∫ 1/(1 + x²) dx (zxx) | arctan x + C (zxx) — *For every real x. (en) / För alla reella x. (sv)* | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "arctan" — symbolic=ok numeric=ok<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): eq. 4.23.3, https://dlmf.nist.gov/4.23.E3 — \operatorname{Arctan}z =\int_{0}^{z}\frac{\,\mathrm{d}t}{1+t^{2}}, z\neq\pm\mathrm{i}<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "List of integrals of rational functions", § Miscellaneous integrands (with a = 1), revision 1350437329: https://en.wikipedia.org/w/index.php?title=List_of_integrals_of_rational_functions&oldid=1350437329 — \int\frac{1}{x^2+a^2} \, dx = \frac{1}{a}\arctan\frac{x}{a}\,\! + C<br>Swedish Wikipedia: Primitiv funktion, Partialintegration, Integration genom substitution, Analysens fundamentalsats: "Primitiv funktion", table "Några primitiva funktioner" (with a = 1), revision 57615470: https://sv.wikipedia.org/w/index.php?title=Primitiv_funktion&oldid=57615470 — \frac{1}{a^2+x^2} \| \frac{1}{a}\arctan\frac{x}{a} + C om a\neq 0 |
| `arctan-a` | ∫ 1/(a² + x²) dx (zxx) | (1/a)·arctan(x/a) + C (zxx) | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "arctan-a" — symbolic=ok (general a > 0) numeric=ok (a = 5 and 1/2)<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "List of integrals of rational functions", § Miscellaneous integrands, revision 1350437329: https://en.wikipedia.org/w/index.php?title=List_of_integrals_of_rational_functions&oldid=1350437329 — \int\frac{1}{x^2+a^2} \, dx = \frac{1}{a}\arctan\frac{x}{a}\,\! + C<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "Antiderivative", § Basic formulae, revision 1372210386: https://en.wikipedia.org/w/index.php?title=Antiderivative&oldid=1372210386 — \int \frac{1}{a^2 + x^2}\ dx = \frac{1}{a}\arctan\left(\frac{x}{a}\right) + C<br>Swedish Wikipedia: Primitiv funktion, Partialintegration, Integration genom substitution, Analysens fundamentalsats: "Primitiv funktion", table "Några primitiva funktioner", revision 57615470: https://sv.wikipedia.org/w/index.php?title=Primitiv_funktion&oldid=57615470 — \frac{1}{a^2+x^2} \| \frac{1}{a}\arctan\frac{x}{a} + C om a\neq 0 |
| `arcsin` | ∫ 1/√(1 − x²) dx (zxx) | arcsin x + C (zxx) — *For −1 < x < 1. −arccos x + C is also correct, since arcsin x + arccos x = π/2. (en) / För −1 < x < 1. Även −arccos x + C är rätt, eftersom arcsin x + arccos x = π/2. (sv)* | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "arcsin" — symbolic=ok numeric=ok<br>Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "[form] arcsin x and −arccos x differ by the constant π/2" — symbolic=ok numeric=ok<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): eq. 4.23.1, https://dlmf.nist.gov/4.23.E1 — \operatorname{Arcsin}z =\int_{0}^{z}\frac{\,\mathrm{d}t}{(1-t^{2})^{1/2}},<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): eq. 4.23.16, https://dlmf.nist.gov/4.23.E16 — \operatorname{arccos}z =\tfrac{1}{2}\pi-\operatorname{arcsin}z,<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "List of integrals of irrational algebraic functions", § Integrals involving u = √(a² − x²) (with a = 1), revision 1335537946: https://en.wikipedia.org/w/index.php?title=List_of_integrals_of_irrational_algebraic_functions&oldid=1335537946 — \int\frac{dx}{u} = \arcsin\frac{x}{a} \qquad\mbox{(}\|x\|\leq\|a\|\mbox{)}<br>Swedish Wikipedia: Primitiv funktion, Partialintegration, Integration genom substitution, Analysens fundamentalsats: "Primitiv funktion", table "Några primitiva funktioner" (with a = 1), revision 57615470: https://sv.wikipedia.org/w/index.php?title=Primitiv_funktion&oldid=57615470 — \frac{1}{\sqrt{a^2-x^2}} \| \arcsin\frac{x}{a} + C om a>0 |
| `arcsin-a` | ∫ 1/√(a² − x²) dx (zxx) | arcsin(x/a) + C (zxx) — *For −a < x < a. (en) / För −a < x < a. (sv)* | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "arcsin-a" — symbolic=ok (general a > 0) numeric=ok (a = 5 and 1/2)<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "List of integrals of irrational algebraic functions", § Integrals involving u = √(a² − x²), revision 1335537946: https://en.wikipedia.org/w/index.php?title=List_of_integrals_of_irrational_algebraic_functions&oldid=1335537946 — \int\frac{dx}{u} = \arcsin\frac{x}{a} \qquad\mbox{(}\|x\|\leq\|a\|\mbox{)}<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "Antiderivative", § Basic formulae, revision 1372210386: https://en.wikipedia.org/w/index.php?title=Antiderivative&oldid=1372210386 — \int \frac{1}\sqrt{a^2 - x^2}\ dx = \arcsin\left(\frac{x}{a}\right) + C<br>Swedish Wikipedia: Primitiv funktion, Partialintegration, Integration genom substitution, Analysens fundamentalsats: "Primitiv funktion", table "Några primitiva funktioner", revision 57615470: https://sv.wikipedia.org/w/index.php?title=Primitiv_funktion&oldid=57615470 — \frac{1}{\sqrt{a^2-x^2}} \| \arcsin\frac{x}{a} + C om a>0 |
| `one-over-sqrt-x-squared-plus-one` | ∫ 1/√(x² + 1) dx (zxx) | ln(x + √(x² + 1)) + C (zxx) — *For every real x. Equal to arsinh x + C. (en) / För alla reella x. Lika med arsinh x + C. (sv)* | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "one-over-sqrt-x-squared-plus-one" — symbolic=ok numeric=ok<br>Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "[form] ln(x + √(x² + 1)) = arsinh x" — symbolic=ok numeric=ok<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "List of integrals of irrational algebraic functions", § Integrals involving r = √(a² + x²) (with a = 1), revision 1335537946: https://en.wikipedia.org/w/index.php?title=List_of_integrals_of_irrational_algebraic_functions&oldid=1335537946 — \int\frac{dx}{r} = \operatorname{arsinh}\frac{x}{a} = \ln\left( \frac{x+r}{a} \right)<br>Swedish Wikipedia: Primitiv funktion, Partialintegration, Integration genom substitution, Analysens fundamentalsats: "Primitiv funktion", table "Några primitiva funktioner" (with a = 1), revision 57615470: https://sv.wikipedia.org/w/index.php?title=Primitiv_funktion&oldid=57615470 — \frac{1}{\sqrt{x^2+a}} \| \ln\left\|x+\sqrt{x^2+a}\right\| + C om a\neq 0 |
| `sinh` | ∫ sinh x dx (zxx) | cosh x + C (zxx) | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "sinh" — symbolic=ok numeric=ok<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): eq. 4.40.1, https://dlmf.nist.gov/4.40.E1 — \int\sinh x\,\mathrm{d}x =\cosh x,<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "Lists of integrals", § Hyperbolic functions, revision 1371952357: https://en.wikipedia.org/w/index.php?title=Lists_of_integrals&oldid=1371952357 — \int \sinh x \, dx = \cosh x + C |
| `cosh` | ∫ cosh x dx (zxx) | sinh x + C (zxx) | Derivations and SymPy verification for the Solid Memo integrals deck: verify_integrals.py, check "cosh" — symbolic=ok numeric=ok<br>NIST Digital Library of Mathematical Functions, Release 1.2.8 (2026-09-15): eq. 4.40.2, https://dlmf.nist.gov/4.40.E2 — \int\cosh x\,\mathrm{d}x =\sinh x,<br>English Wikipedia: Lists of integrals and related articles (List of integrals of trigonometric, rational and irrational algebraic functions; Antiderivative; Integration by parts; Integration by substitution; Fundamental theorem of calculus; Integral): "Lists of integrals", § Hyperbolic functions, revision 1371952357: https://en.wikipedia.org/w/index.php?title=Lists_of_integrals&oldid=1371952357 — \int \cosh x \, dx = \sinh x + C |
