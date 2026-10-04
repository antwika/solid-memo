# Geometry formulas — provenance report

<!-- Generated from authored/geometry-formulas.json by scripts/authored_decks.py. Do not edit: change the dossier and rebuild. -->

**Deck:** [`decks/geometry-formulas.ttl`](../decks/geometry-formulas.ttl) · **Cards:** 39 · **Licence:** [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) · **Compiled by:** Anton Wiklund · **Created:** 2026-10-04

39 formulas of school geometry: perimeters, areas, diagonals and angle sums of plane figures (square, rectangle, parallelogram, trapezoid, rhombus, triangle, polygon, circle, sector), the Pythagorean theorem and the law of cosines, and volumes and surface areas of solids (cube, rectangular box, prism, cylinder, pyramid, cone, sphere). Front: what is asked, naming every variable, e.g. "Area of a circle with radius r"; back: the formula in plain notation, e.g. "πr²". Every formula is derived and machine-checked with the computer algebra system SymPy and checked against English Wikipedia (and, for 35 cards, Swedish Wikipedia) and, where it has one, Wikidata's defining formula.

## Sources

| Source | Creator | Licence | Role | Retrieved | Used for |
|---|---|---|---|---|---|
| [Derivations and SymPy verification for the Solid Memo geometry formulas deck](https://github.com/antwika/solid-memo/blob/main/packages/deck-library/authored/geometry-formulas.json) | Anton Wiklund (compiler); written by Claude (Anthropic, AI) at his direction | [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) | content | 2026-10-04 | The selection of the 39 cards, the wording of the fronts and notes, the notation of the formulas, and the machine verification of every formula (and of the alternative forms in the notes) with SymPy 1.14.0 from first principles: shoelace areas, distances, arc-length, area, volume and surface integrals, and interior angles from vertex coordinates (with the tolerances and limits stated in the method). The script's full text is recorded under Queries; the URL resolves once the dossier is merged into the main branch. |
| [Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534)](https://www.wikidata.org/) | Wikidata contributors (Wikimedia Foundation) | [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) | content | 2026-10-04 | The English and Swedish names of the figures and theorems on the fronts (labels and aliases, checked by the builder: kvadrat, rektangel, parallellogram, parallelltrapets, romb, triangel, liksidig triangel, Herons formel, Pythagoras sats, hypotenusa, katet, cosinussatsen, vinkelsumma, polygon, cirkel, omkretsen, cirkelsektor, båglängd, kub, rymddiagonal, rätblock, prisma, cylinder, Mantelyta, pyramid, kon, klot, sfär …) and, for the nine items that have one stating a card's formula, the defining formula (P2534), against which the card was compared. The formulas themselves were not taken from Wikidata. |
| [English Wikipedia: articles on the figures and formulas](https://en.wikipedia.org/) | Wikipedia contributors | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | verification | 2026-10-04 | Independent check of every card's formula in the articles Square, Rectangle, Parallelogram, Trapezoid, Rhombus, Triangle, Equilateral triangle, Heron's formula, Pythagorean theorem, Law of cosines, Sum of angles of a triangle, Polygon, Regular polygon, Circle, Circular arc, Circular sector, Cube, Space diagonal, Rectangular cuboid, Prism (geometry), Cylinder, Lateral surface, Pyramid (geometry), Cone and Sphere: each card's evidence quotes the formula from the wikitext of the exact revision linked in the locator (fetched 2026-10-04 with the MediaWiki API). Consulted only: no text, notation layout or selection copied. |
| [Swedish Wikipedia: articles on the figures and formulas](https://sv.wikipedia.org/) | Wikipedia contributors | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | verification | 2026-10-04 | Second independent check of the formulas in the articles Kvadrat, Rektangel, Parallellogram, Parallelltrapets, Romb, Triangel, Liksidig triangel, Herons formel, Pythagoras sats, Cosinussatsen, Vinkelsumma, Polygon, Area, Omkrets, Cirkelbåge, Cirkelsektor, Randvinkelsatsen (reached through the redirect Medelpunktsvinkel), Kub, Begränsningsarea, Rätblock, Rymddiagonal, Prisma (geometri), Cylinder, Mantelyta, Pyramid (geometri), Kon, Klot and Sfär, and check of the Swedish terms on the fronts as Swedish mathematical text uses them (basen, höjden, kateterna, hypotenusan, medelpunktsvinkeln, kantlängden, basarean, begränsningsarea, mantelarea, n-hörning, klot and sfär) and of what s stands for on the cone (the cone cards' front note defines s in the compiler's own words, not in the article's). Each evidence locator links the exact revision quoted. Consulted only: no text or selection copied. |

**Content** sources supplied information that is in the cards. **Verification** sources were only consulted to confirm facts: nothing was copied from them.

### Licence evidence

- **Derivations and SymPy verification for the Solid Memo geometry formulas deck** — Own work of the deck's compiler, dedicated to the public domain together with the deck: the deck's dcterms:license is https://creativecommons.org/publicdomain/zero/1.0/ (CC0 1.0 Universal). The geometry formulas themselves are mathematical facts, which are not copyrightable; the wording, the notation and the selection are this dossier's own. The verification script is recorded verbatim under Queries.
- **Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534)** — https://www.wikidata.org/wiki/Wikidata:Licensing (fetched 2026-10-04): "All structured data (i.e. the main, Property, Lexeme, and EntitySchema namespaces) is released into the public domain under Creative Commons Zero."
- **English Wikipedia: articles on the figures and formulas** — https://en.wikipedia.org/wiki/Wikipedia:Copyrights (fetched 2026-10-04): "Permission is granted to copy, distribute and/or modify Wikipedia's text under the terms of the Creative Commons Attribution-ShareAlike 4.0 International License and, unless otherwise noted, the GNU Free Documentation License, unversioned, with no invariant sections, front-cover texts, or back-cover texts."
- **Swedish Wikipedia: articles on the figures and formulas** — Footer of every Swedish Wikipedia article (e.g. https://sv.wikipedia.org/wiki/Kon, fetched 2026-10-04): "Wikipedias text är tillgänglig under licensen Creative Commons Erkännande-dela-lika 4.0 Unported"

## Licensing

The deck is CC0 1.0. Its content comes from two sources whose licences allow anything: the compiler's own selection, wording, notation and derivations (dedicated to the public domain with the deck; the formulas are mathematical facts, which are not copyrightable in any case) and Wikidata (structured data under CC0), from which the English and Swedish names of the figures and theorems were taken and against whose defining formulas (P2534) cards were compared. English and Swedish Wikipedia (CC BY-SA 4.0) were used only to verify the formulas and the usage of Swedish terms: no text, notation layout or list was copied from them; single established terms (begränsningsarea, mantelarea, basarea, medelpunktsvinkel, n-hörning) carry no protectable expression, and the definition of the cone's s in the front note is the compiler's own wording, not the Kon article's. The selection follows the standard school syllabus, which is dictated by the subject, and was made independently. OpenStax textbooks (CC BY) and the NIST DLMF (reuse limited to research and teaching) were not used.

## Method

1. Research, drafting and cross-checking were done by AI agents (Claude, by Anthropic) at Anton Wiklund's direction, with machine checks (SymPy, the builder's Wikidata checks against live Wikidata, the app's SHACL and DCAT-AP validators); the dossier is written to be reviewed by independent AI reviewers in later quality-control rounds. The cards have not yet been reviewed by a human subject expert.
2. Selection: the formulas a school geometry course (in Sweden roughly compulsory school and upper-secondary Matematik 1–3) asks students to know or use were listed from general mathematical knowledge; no list was copied from any source. Plane figures: area, perimeter and diagonal of the square and rectangle; area of the parallelogram, trapezoid, rhombus (from its diagonals), triangle (base and height; two sides and the included angle; equilateral; Heron's formula); the Pythagorean theorem and the law of cosines; the angle sum of a triangle and of an n-sided polygon and the interior angle of a regular polygon; the area and circumference of a circle, the length of an arc and the area of a sector (angle in radians). Solids: volume, surface area and space diagonal of the cube and the rectangular box; volume of the prism and the pyramid (base area B); volume, lateral and total surface area of the right circular cylinder and cone; volume and surface area of the sphere.
3. Notation: the front says what is asked and names every variable in it ("Area of a circle with radius r" / "Arean av en cirkel med radien r"), so that exactly one formula answers it; angles are in degrees where the front says so and in radians for the arc and sector. The back is the formula's right-hand side only ("πr²", not "A = πr²"), because the back is one text in no language (tagged zxx) shared by both languages, and the letter for a quantity differs between them (perimeter and circumference: P and C in English, O in Swedish school mathematics, as sv.wikipedia Rektangel and Omkrets write). The exceptions are the two relations whose answer is an equation (Pythagorean theorem, law of cosines) and the three angle cards, whose answer is an angle in degrees. Plain Unicode that reads as text: superscripts ² ³, √ with parentheses around a compound radicand, π, θ, · for multiplication where letters would run together (ab·sin C, (n − 2)·180°), the vulgar fraction ½ for halves, a slash for thirds and quarters (Bh/3, πr²h/3, (4/3)πr³, (√3/4)a²) and − (U+2212) for minus. Where a formula has another common form (2a + 2b, bh/2, 2πr(r + h), πr(r + s), degree forms of the arc and sector) a back note names it.
4. Machine verification: the script verify_geometry.py (recorded verbatim under Queries) was run with `uv run --with sympy python3 verify_geometry.py` (SymPy 1.14.0). It does not test the formulas against themselves: each is compared with a value computed from first principles: polygon areas by the shoelace formula on explicit vertices with free symbols for the dimensions and for any shear or offset (parallelogram, trapezoid, triangle apex), so the result is shown independent of the shape's slant; lengths as Euclidean distances between explicit points; the circumference and arc length by the arc-length integral of (r cos φ, r sin φ); circle and sector areas and the cylinder and sphere volumes by integrals in polar, cylindrical or spherical coordinates; the pyramid and cone volumes by integrating the cross-section area B(1 − z/h)² and π(r(1 − z/h))²; the lateral areas of the cylinder and cone and the area of the sphere by the surface integral of |r_u × r_v| over a parametrisation; Heron's formula by expanding s(s − a)(s − b)(s − c) in the squared side lengths of a triangle with vertices (0,0), (c,0), (p,q) and comparing with the squared shoelace area; angles: for the triangle, the interior angles of three concrete triangles (equilateral, right isosceles, 30-60-90) computed exactly from their vertex coordinates, plus ten random triangles numerically; for the polygon angle sum and the regular polygon's interior angle, the check for general n is only an algebraic identity (n equal angles of π − 2π/n, i.e. assuming the regular n-gon's exterior angle 2π/n, sum to (n − 2)·180°, and one of them is (n − 2)·180°/n), while the angles computed from vertex coordinates are checked numerically only: three random convex polygons for each n from 3 to 12 (sum within 10⁻¹⁸ of (n − 2)·180°) and the regular n-gon for n = 3 … 12 (angle within 10⁻²⁰ of (n − 2)·180°/n). For the cards that go through the script's check() function a check passes when simplify(computed − claimed) is 0 and, independently, the difference evaluates to below 10⁻²⁰ at five random positive values of the variables (30-digit arithmetic). Heron's formula is checked symbolically as a polynomial identity in the squared side lengths, and numerically on five random triangles whose side lengths are computed in double precision, with a tolerance of 10⁻¹². Three deliberately wrong formulas (sphere volume 4πr³, cone lateral area πrh, trapezoid area (a + b)h) are run as negative controls and must fail, which they do. Result: 49 checks (39 cards, a second check each for the prism and pyramid, and 8 alternative forms and facts stated in the notes: 2a + 2b, 2πr(r + h), πr(r + s), s = √(r² + h²), the equilateral triangle's height (√3/2)a, πd²/4 and the degree forms of the sector and arc), 49 passed both symbolically and numerically.
5. Wikidata: the items of the figures and theorems were found with wbsearchentities (find_items.py and find_items2.py, under Queries; the second also ran a SPARQL query for every item with a defining formula, P2534, whose English label names a figure or quantity), and their English and Swedish labels and aliases, descriptions, P2534 values (TeX) and Wikipedia sitelinks were fetched with wbgetentities (get_entities.py). Of the items fetched, nine have a P2534 formula that states a card's formula (Area of a circle, circumference, central angle, Heron's formula, Pythagorean theorem, law of cosines, surface area of an open cylinder, of a closed cylinder and of an open cone), used for ten cards; each agrees with its card and is quoted in the card's evidence. (The P2534 values of area, volume, sphere, ball, arc length and perimeter are general definitions and were not used.) The builder cannot check P2534 itself, because the SPARQL endpoint returns the truthy P2534 value rendered as MathML rather than as TeX, so the builder's checks are label checks: the English and Swedish names of the figure or theorem on each card's front (and the Wikidata items whose P2534 was compared, by their English label).
6. Cross-checking against Wikipedia: fetch_wiki.py downloaded the current wikitext and revision id of 33 English and 35 Swedish articles (MediaWiki API, action=query&prop=revisions), and find_quotes.py and grep listed the lines stating each formula. For every card the formula was compared by the authoring AI agent with the English article and, for all but four cards (square diagonal, rectangle diagonal, triangle area from two sides and the included angle, cube space diagonal, which the Swedish articles fetched do not state), with a Swedish article; the quoted wikitext (TeX as written in the source) is in each card's evidence with a link to the exact revision. No formula in any source disagrees with any card. The script check_quotes.py (under Queries) then compared every quote with the saved wikitext of its revision, after stripping markup, and every section named in a locator with the article's headings; its first run found 27 quotes that did not match exactly (mostly lines joined across the wikitext, TeX spacing such as \, and \!, and section names given from memory, such as Cube § Measurement and Pyramid § Mensuration), all corrected to the source; the final run found every quote except one Cube fragment inside a nested template, compared by eye.
7. Swedish text: the fronts and notes were written in Swedish directly, using the terms of Wikidata's Swedish labels (kvadrat, rektangel, parallellogram, parallelltrapets, romb, triangel, liksidig triangel, Herons formel, Pythagoras sats, hypotenusa, katet, cosinussatsen, vinkelsumma, polygon, cirkel, omkretsen, cirkelsektor, båglängd, kub, rymddiagonal, rätblock, prisma, cylinder, Mantelyta, pyramid, kon, klot, sfär) and of Swedish Wikipedia (basen och höjden, de parallella sidorna, kantlängden, basarean (Rätblock), begränsningsarea (the article Begränsningsarea), mantelarea, n-hörning and hörnvinkel (Polygon), medelpunktsvinkel (Randvinkelsatsen, revision 56854947, reached through the redirect Medelpunktsvinkel; Cirkelbåge writes mittpunktsvinkel), the volume of a klot and the area of a sfär (Klot, Sfär)). For the slant height of the cone no Swedish source fetched gives a settled term (sv.wikipedia Kon defines s as "avståndet från basytans kant till konens spets", Mantelyta as "sidans längd"), so the Swedish front says "sidan s" and a front note defines s in the compiler's own words, in both languages ("s: the straight distance along the side from the apex to the rim of the base" / "s: den raka sträckan längs mantelytan från spetsen till basens rand"; a first draft that followed the Kon article's phrasing was reworded in quality-control round 3, and "straight" / "raka" was added in round 4 so that s is clearly the straight generator line, not any path on the surface).
8. Finally the builder (python3 scripts/authored_decks.py build geometry-formulas) ran the Wikidata label checks against live Wikidata and wrote the deck and this report, and the deck was validated with the app's SHACL and DCAT-AP validators (node scripts/validate_sources.ts geometry-formulas).

## Selection

Included: 39 formulas of school geometry (see the method for the list): every one a standard result with one accepted form, asked for on the front with every variable named. Left out: the law of sines, whose answer can be written in two reciprocal forms (a/sin A = … or sin A/a = …), so a card would not have one right answer; the area of a regular polygon and of an ellipse, the frustum, the spherical cap and segment and the torus, beyond most school courses; the number of diagonals of a polygon, the sum of exterior angles and the inscribed-angle theorem, theorems rather than formulas to learn by heart or less commonly taught; area and perimeter formulas that only restate a card (circle area from the diameter, the sector and arc with the angle in degrees, the cone's slant height s = √(r² + h²)), which are given in the back notes instead; and formulas of analytic geometry (distance between points, equation of a circle) and trigonometric identities, which belong in other decks. Non-Euclidean geometry is out of scope: the angle sums hold in the plane.

## Queries

**Machine verification of every card with SymPy (scratch/geometry-formulas/verify_geometry.py, run as: uv run --with sympy python3 verify_geometry.py)** (Derivations and SymPy verification for the Solid Memo geometry formulas deck)

```
"""Machine-verify every card of the "geometry-formulas" deck with SymPy.

Run: uv run --with sympy python3 verify_geometry.py

Each card's formula (the back) is written as a SymPy expression and checked
against an independent computation from first principles:
  * areas of polygons: the shoelace formula on explicit vertex coordinates
    (with free symbols for the shape's dimensions and any shear/offset);
  * lengths: the Euclidean distance between explicit points, or the arc-length
    integral of a parametrised curve;
  * areas of curved regions and volumes: double or triple integrals in polar,
    cylindrical or spherical coordinates, or integrals of cross-section areas;
  * curved surface areas: the surface integral |r_u x r_v| du dv of a
    parametrisation;
  * angle sums: interior angles computed from vertex coordinates.
A symbolic check passes when simplify(computed - claimed) == 0; every card
is also evaluated numerically at random positive values (30-digit precision)
as a second, independent check of the symbolic result.
"""
import random

import sympy as sp

random.seed(20261004)
a, b, c, h, r, d, t, s = sp.symbols("a b c h r d t s", positive=True)
d1, d2, B, theta, C = sp.symbols("d1 d2 B theta C", positive=True)
x, y, z, u, v, rho, phi = sp.symbols("x y z u v rho phi", real=True)
results = []


def shoelace(pts):
    n = len(pts)
    return sp.Rational(1, 2) * sp.Abs(sum(pts[i][0] * pts[(i + 1) % n][1] - pts[(i + 1) % n][0] * pts[i][1]
                                         for i in range(n)))


def dist(p, q):
    return sp.sqrt(sum((pi - qi) ** 2 for pi, qi in zip(p, q)))


def check(cid, computed, claimed, assume=None, numeric_subs=None):
    """computed: the first-principles value; claimed: the card's formula."""
    diff = sp.simplify(sp.refine(computed - claimed, assume) if assume is not None else computed - claimed)
    sym = diff == 0
    free = sorted((computed - claimed).free_symbols, key=str)
    num = True
    for _ in range(5):
        vals = {sym_: sp.Float(random.uniform(0.3, 5), 30) for sym_ in free}
        if numeric_subs:
            vals.update(numeric_subs(vals))
        num &= abs(sp.N((computed - claimed).subs(vals), 30)) < 1e-20
    results.append((cid, sym, num))


def surface_area(R, u_rng, v_rng):
    ru, rv = sp.diff(R, u), sp.diff(R, v)
    n = ru.cross(rv)
    integrand = sp.simplify(sp.sqrt(sp.simplify(n.dot(n))))
    return sp.integrate(integrand, (u, *u_rng), (v, *v_rng))


# --- Plane figures
check("square-area", sp.integrate(1, (x, 0, a), (y, 0, a)), a**2)
check("square-perimeter", sum(dist(p, q) for p, q in [((0, 0), (a, 0)), ((a, 0), (a, a)), ((a, a), (0, a)), ((0, a), (0, 0))]), 4 * a)
check("square-diagonal", dist((0, 0), (a, a)), a * sp.sqrt(2))
check("rectangle-area", sp.integrate(1, (x, 0, a), (y, 0, b)), a * b)
check("rectangle-perimeter", sum(dist(p, q) for p, q in [((0, 0), (a, 0)), ((a, 0), (a, b)), ((a, b), (0, b)), ((0, b), (0, 0))]), 2 * (a + b))
check("rectangle-diagonal", dist((0, 0), (a, b)), sp.sqrt(a**2 + b**2))
# parallelogram with base b, height h and arbitrary shear t
check("parallelogram-area", shoelace([(0, 0), (b, 0), (b + t, h), (t, h)]), b * h)
# triangle with base b on the x-axis and apex at (t, h), any t
check("triangle-area", shoelace([(0, 0), (b, 0), (t, h), ]), sp.Rational(1, 2) * b * h)
# sides a and b meeting at angle C (0 < C < pi): C at the origin, a along the x-axis
check("triangle-area-sine", shoelace([(0, 0), (a, 0), (b * sp.cos(C), b * sp.sin(C))]),
      sp.Rational(1, 2) * a * b * sp.sin(C), assume=sp.Q.positive(sp.sin(C)),
      numeric_subs=lambda vals: {C: sp.Float(random.uniform(0.1, 3.0), 30)})
eq = [(0, 0), (a, 0), (a / 2, a * sp.sqrt(3) / 2)]
assert all(sp.simplify(dist(eq[i], eq[(i + 1) % 3]) - a) == 0 for i in range(3))  # really equilateral
check("equilateral-triangle-area", shoelace(eq), sp.sqrt(3) / 4 * a**2)
# Heron: a triangle with vertices (0,0), (c,0), (p,q); compare squared areas as polynomials
p_, q_ = sp.symbols("p q", positive=True)
A2, B2, C2 = (p_ - c) ** 2 + q_**2, p_**2 + q_**2, c**2  # squared side lengths a², b², c²
area2 = (c * q_ / 2) ** 2
sa, sb, sc = sp.symbols("sa sb sc", positive=True)
heron_poly = sp.expand((sa + sb + sc) * (-sa + sb + sc) * (sa - sb + sc) * (sa + sb - sc) / 16)  # = s(s-a)(s-b)(s-c)
heron_sq = heron_poly.subs({sa**4: A2**2, sb**4: B2**2, sc**4: C2**2}).subs({sa**2: A2, sb**2: B2, sc**2: C2})
sym_heron = sp.simplify(heron_sq - area2) == 0
num_heron = True
for _ in range(5):
    P = [(0.0, 0.0), (random.uniform(1, 5), 0.0), (random.uniform(-2, 5), random.uniform(0.5, 5))]
    la, lb, lc = (sp.Float(((P[i][0] - P[j][0]) ** 2 + (P[i][1] - P[j][1]) ** 2) ** 0.5, 30) for i, j in ((1, 2), (0, 2), (0, 1)))
    sp_ = (la + lb + lc) / 2
    heron_val = sp.sqrt(sp_ * (sp_ - la) * (sp_ - lb) * (sp_ - lc))
    num_heron &= abs(heron_val - shoelace([tuple(sp.Float(k, 30) for k in pt) for pt in P])) < 1e-12
results.append(("herons-formula", sym_heron, num_heron))
# trapezoid with parallel sides a (bottom) and b (top), height h, top offset t
check("trapezoid-area", shoelace([(0, 0), (a, 0), (t + b, h), (t, h)]), sp.Rational(1, 2) * (a + b) * h)
rh = [(d1 / 2, 0), (0, d2 / 2), (-d1 / 2, 0), (0, -d2 / 2)]
assert len({sp.simplify(dist(rh[i], rh[(i + 1) % 4])) for i in range(4)}) == 1  # all sides equal: a rhombus
check("rhombus-area", shoelace(rh), sp.Rational(1, 2) * d1 * d2)
# circle: area by a polar double integral, circumference by the arc-length integral
check("circle-area", sp.integrate(rho, (rho, 0, r), (phi, 0, 2 * sp.pi)), sp.pi * r**2)
circ = sp.Matrix([r * sp.cos(phi), r * sp.sin(phi)])
arc_integrand = sp.simplify(sp.sqrt(sp.diff(circ, phi).dot(sp.diff(circ, phi))))
check("circle-circumference-radius", sp.integrate(arc_integrand, (phi, 0, 2 * sp.pi)), 2 * sp.pi * r)
check("circle-circumference-diameter", sp.integrate(arc_integrand, (phi, 0, 2 * sp.pi)).subs(r, d / 2), sp.pi * d)
check("arc-length", sp.integrate(arc_integrand, (phi, 0, theta)), r * theta)
check("sector-area", sp.integrate(rho, (rho, 0, r), (phi, 0, theta)), sp.Rational(1, 2) * r**2 * theta)
# --- Triangles and polygons
check("pythagorean-theorem", dist((a, 0), (0, b)) ** 2, a**2 + b**2)  # legs on the axes, hypotenuse² = c²
check("law-of-cosines", sp.expand(dist((a, 0), (b * sp.cos(C), b * sp.sin(C))) ** 2),
      a**2 + b**2 - 2 * a * b * sp.cos(C))


def interior_angle_sum(pts):
    """Sum of the interior angles (radians) of a convex polygon given counter-clockwise."""
    n, total = len(pts), 0
    for i in range(n):
        p0, p1, p2 = pts[i - 1], pts[i], pts[(i + 1) % n]
        v1 = (p0[0] - p1[0], p0[1] - p1[1])
        v2 = (p2[0] - p1[0], p2[1] - p1[1])
        total += sp.acos((v1[0] * v2[0] + v1[1] * v2[1]) / (sp.sqrt(v1[0]**2 + v1[1]**2) * sp.sqrt(v2[0]**2 + v2[1]**2)))
    return total


def random_convex(n):
    angles = sorted(random.uniform(0, 2 * 3.141592653589793) for _ in range(n))
    return [(sp.cos(sp.Float(t_, 30)), sp.sin(sp.Float(t_, 30))) for t_ in angles]  # points on a circle: convex


tri_ok = all(abs(sp.N(interior_angle_sum(random_convex(3)) * 180 / sp.pi, 30) - 180) < 1e-20 for _ in range(10))
# symbolic: exact interior angles of three concrete triangles (equilateral, right isosceles, 30-60-90)
tri_sym = all(sp.simplify(interior_angle_sum(T) - sp.pi) == 0 for T in (
    [(0, 0), (2, 0), (1, sp.sqrt(3))], [(0, 0), (1, 0), (0, 1)], [(0, 0), (sp.sqrt(3), 0), (0, 1)]))
results.append(("triangle-angle-sum", tri_ok and tri_sym, tri_ok))
n = sp.symbols("n", integer=True, positive=True)
poly_num = all(abs(sp.N(interior_angle_sum(random_convex(k)) * 180 / sp.pi, 30) - (k - 2) * 180) < 1e-18
               for k in range(3, 13) for _ in range(3))
# symbolic: the regular n-gon has n equal interior angles of pi - 2*pi/n (exterior angle 2*pi/n)
poly_sym = sp.simplify(n * (sp.pi - 2 * sp.pi / n) * 180 / sp.pi - (n - 2) * 180) == 0
results.append(("polygon-angle-sum", poly_sym, poly_num))
reg_num = True
for k in range(3, 13):
    pts = [(sp.cos(2 * sp.pi * i / k), sp.sin(2 * sp.pi * i / k)) for i in range(k)]
    p0, p1, p2 = pts[-1], pts[0], pts[1]
    v1 = (p0[0] - p1[0], p0[1] - p1[1]); v2 = (p2[0] - p1[0], p2[1] - p1[1])
    ang = sp.acos((v1[0] * v2[0] + v1[1] * v2[1]) / (sp.sqrt(v1[0]**2 + v1[1]**2) * sp.sqrt(v2[0]**2 + v2[1]**2)))
    reg_num &= abs(sp.N(ang * 180 / sp.pi, 30) - sp.N(sp.Rational((k - 2) * 180, k), 30)) < 1e-20
reg_sym = sp.simplify((sp.pi - 2 * sp.pi / n) * 180 / sp.pi - (n - 2) * 180 / n) == 0
results.append(("regular-polygon-interior-angle", reg_sym, reg_num))
# --- Solids
check("cube-volume", sp.integrate(1, (x, 0, a), (y, 0, a), (z, 0, a)), a**3)
check("cube-surface-area", 6 * sp.integrate(1, (x, 0, a), (y, 0, a)), 6 * a**2)
check("cube-space-diagonal", dist((0, 0, 0), (a, a, a)), a * sp.sqrt(3))
check("cuboid-volume", sp.integrate(1, (x, 0, a), (y, 0, b), (z, 0, c)), a * b * c)
check("cuboid-surface-area", 2 * (sp.integrate(1, (x, 0, a), (y, 0, b)) + sp.integrate(1, (y, 0, b), (z, 0, c))
                                  + sp.integrate(1, (x, 0, a), (z, 0, c))), 2 * (a * b + b * c + a * c))
check("cuboid-space-diagonal", dist((0, 0, 0), (a, b, c)), sp.sqrt(a**2 + b**2 + c**2))
# prism: every cross-section parallel to the base has the base area B; checked on a
# triangular prism (base: triangle with legs a, b) and on a general base area B
check("prism-volume", sp.integrate(shoelace([(0, 0), (a, 0), (0, b)]), (z, 0, h)), sp.Rational(1, 2) * a * b * h)
check("prism-volume", sp.integrate(B, (z, 0, h)), B * h)
check("cylinder-volume", sp.integrate(rho, (rho, 0, r), (phi, 0, 2 * sp.pi), (z, 0, h)), sp.pi * r**2 * h)
cyl = sp.Matrix([r * sp.cos(u), r * sp.sin(u), v])
lateral_cyl = surface_area(cyl, (0, 2 * sp.pi), (0, h))
check("cylinder-lateral-area", lateral_cyl, 2 * sp.pi * r * h)
check("cylinder-surface-area", lateral_cyl + 2 * sp.integrate(rho, (rho, 0, r), (phi, 0, 2 * sp.pi)),
      2 * sp.pi * r**2 + 2 * sp.pi * r * h)
# pyramid: the cross-section at height z is the base scaled by (1 - z/h), area B(1 - z/h)²
check("pyramid-volume", sp.integrate(B * (1 - z / h) ** 2, (z, 0, h)), B * h / 3)
check("pyramid-volume", sp.integrate((a * (1 - z / h)) ** 2, (z, 0, h)), a**2 * h / 3)  # square pyramid, base a²
check("cone-volume", sp.integrate(sp.pi * (r * (1 - z / h)) ** 2, (z, 0, h)), sp.pi * r**2 * h / 3)
cone = sp.Matrix([u * sp.cos(v), u * sp.sin(v), h * (1 - u / r)])
lateral_cone = surface_area(cone, (0, r), (0, 2 * sp.pi))
slant = sp.sqrt(r**2 + h**2)
check("cone-lateral-area", lateral_cone, sp.pi * r * slant)  # = πrs with s = √(r² + h²)
check("cone-surface-area", lateral_cone + sp.pi * r**2, sp.pi * r**2 + sp.pi * r * slant)
check("sphere-volume", sp.integrate(rho**2 * sp.sin(u), (rho, 0, r), (u, 0, sp.pi), (v, 0, 2 * sp.pi)),
      sp.Rational(4, 3) * sp.pi * r**3)
sph = sp.Matrix([r * sp.sin(u) * sp.cos(v), r * sp.sin(u) * sp.sin(v), r * sp.cos(u)])
ru, rv = sp.diff(sph, u), sp.diff(sph, v)
nrm = sp.simplify(ru.cross(rv).dot(ru.cross(rv)))  # r⁴ sin²u
integrand = r**2 * sp.sin(u)  # √(r⁴ sin²u) on 0 ≤ u ≤ π
assert sp.simplify(nrm - integrand**2) == 0
check("sphere-surface-area", sp.integrate(integrand, (u, 0, sp.pi), (v, 0, 2 * sp.pi)), 4 * sp.pi * r**2)
# --- Alternative forms named in the notes
check("note:rectangle-perimeter", 2 * a + 2 * b, 2 * (a + b))
check("note:cylinder-surface-area", 2 * sp.pi * r * (r + h), 2 * sp.pi * r**2 + 2 * sp.pi * r * h)
check("note:cone-surface-area", sp.pi * r * (r + s), sp.pi * r**2 + sp.pi * r * s)
check("note:cone-slant-height", dist((0, 0), (r, h)), slant)
check("note:equilateral-height", dist((a / 2, 0), eq[2]), sp.sqrt(3) / 2 * a)  # apex to the midpoint of the base
check("note:circle-area-diameter", sp.pi * (d / 2) ** 2, sp.pi * d**2 / 4)
check("note:sector-degrees", sp.Rational(1, 2) * r**2 * (t * sp.pi / 180), t / 360 * sp.pi * r**2)  # t degrees
check("note:arc-degrees", r * (t * sp.pi / 180), t / 360 * 2 * sp.pi * r)

# --- Negative controls: deliberately wrong formulas must fail (shows the checks can fail)
controls = list(results)
check("control:sphere-volume-wrong", sp.integrate(rho**2 * sp.sin(u), (rho, 0, r), (u, 0, sp.pi), (v, 0, 2 * sp.pi)),
      4 * sp.pi * r**3)
check("control:cone-lateral-wrong", lateral_cone, sp.pi * r * h)
check("control:trapezoid-wrong", shoelace([(0, 0), (a, 0), (t + b, h), (t, h)]), (a + b) * h)
negatives = results[len(controls):]
del results[len(controls):]
print("negative controls (must FAIL):", [(cid, s1, s2) for cid, s1, s2 in negatives])
assert not any(s1 or s2 for _, s1, s2 in negatives)

print(f"SymPy {sp.__version__}")
for cid, sym_ok, num_ok in results:
    print(f"{cid}: symbolic={'ok' if sym_ok else 'FAIL'} numeric={'ok' if num_ok else 'FAIL'}")
fails = [cid for cid, s1, s2 in results if not (s1 and s2)]
print(f"{len(results)} checks, {len(results) - len(fails)} passed" + (f", failed: {fails}" if fails else ""))

```

**Output of the verification run (SymPy 1.14.0), re-run in quality-control round 3 after the note check of the square's area from its diagonal was replaced by the equilateral triangle's height** (Derivations and SymPy verification for the Solid Memo geometry formulas deck)

```
negative controls (must FAIL): [('control:sphere-volume-wrong', False, False), ('control:cone-lateral-wrong', False, False), ('control:trapezoid-wrong', False, False)]
SymPy 1.14.0
square-area: symbolic=ok numeric=ok
square-perimeter: symbolic=ok numeric=ok
square-diagonal: symbolic=ok numeric=ok
rectangle-area: symbolic=ok numeric=ok
rectangle-perimeter: symbolic=ok numeric=ok
rectangle-diagonal: symbolic=ok numeric=ok
parallelogram-area: symbolic=ok numeric=ok
triangle-area: symbolic=ok numeric=ok
triangle-area-sine: symbolic=ok numeric=ok
equilateral-triangle-area: symbolic=ok numeric=ok
herons-formula: symbolic=ok numeric=ok
trapezoid-area: symbolic=ok numeric=ok
rhombus-area: symbolic=ok numeric=ok
circle-area: symbolic=ok numeric=ok
circle-circumference-radius: symbolic=ok numeric=ok
circle-circumference-diameter: symbolic=ok numeric=ok
arc-length: symbolic=ok numeric=ok
sector-area: symbolic=ok numeric=ok
pythagorean-theorem: symbolic=ok numeric=ok
law-of-cosines: symbolic=ok numeric=ok
triangle-angle-sum: symbolic=ok numeric=ok
polygon-angle-sum: symbolic=ok numeric=ok
regular-polygon-interior-angle: symbolic=ok numeric=ok
cube-volume: symbolic=ok numeric=ok
cube-surface-area: symbolic=ok numeric=ok
cube-space-diagonal: symbolic=ok numeric=ok
cuboid-volume: symbolic=ok numeric=ok
cuboid-surface-area: symbolic=ok numeric=ok
cuboid-space-diagonal: symbolic=ok numeric=ok
prism-volume: symbolic=ok numeric=ok
prism-volume: symbolic=ok numeric=ok
cylinder-volume: symbolic=ok numeric=ok
cylinder-lateral-area: symbolic=ok numeric=ok
cylinder-surface-area: symbolic=ok numeric=ok
pyramid-volume: symbolic=ok numeric=ok
pyramid-volume: symbolic=ok numeric=ok
cone-volume: symbolic=ok numeric=ok
cone-lateral-area: symbolic=ok numeric=ok
cone-surface-area: symbolic=ok numeric=ok
sphere-volume: symbolic=ok numeric=ok
sphere-surface-area: symbolic=ok numeric=ok
note:rectangle-perimeter: symbolic=ok numeric=ok
note:cylinder-surface-area: symbolic=ok numeric=ok
note:cone-surface-area: symbolic=ok numeric=ok
note:cone-slant-height: symbolic=ok numeric=ok
note:equilateral-height: symbolic=ok numeric=ok
note:circle-area-diameter: symbolic=ok numeric=ok
note:sector-degrees: symbolic=ok numeric=ok
note:arc-degrees: symbolic=ok numeric=ok
49 checks, 49 passed

```

**Find the items of the figures and theorems (wbsearchentities) and fetch their labels, aliases, P2534 and sitelinks (find_items.py)** (Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534))

```
"""Find the Wikidata items of the shapes and theorems; fetch labels, aliases, P2534.

Run: python3 find_items.py > items.json
"""
import json
import time
import urllib.parse
import urllib.request

UA = "solid-memo deck research (https://github.com/antwika/solid-memo)"
API = "https://www.wikidata.org/w/api.php"
TERMS = [
    "square", "rectangle", "parallelogram", "triangle", "trapezoid", "rhombus", "circle",
    "circular sector", "arc length", "circumference", "equilateral triangle", "Pythagorean theorem",
    "law of cosines", "law of sines", "sum of angles of a triangle", "polygon", "regular polygon",
    "internal angle", "diagonal", "space diagonal", "cube", "cuboid", "rectangular cuboid", "prism", "cylinder",
    "cone", "sphere", "ball", "pyramid", "area", "volume", "surface area", "perimeter", "radian", "area of a circle",
    "triangle area", "volume of a sphere", "Heron's formula", "slant height", "lateral surface", "right circular cone",
    "right circular cylinder", "hypotenuse", "cathetus", "central angle", "isosceles trapezoid",
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
    r = get({"action": "wbsearchentities", "search": t, "language": "en", "format": "json", "limit": 3, "type": "item"})
    found[t] = [(s["id"], s.get("label"), s.get("description")) for s in r.get("search", [])]
    time.sleep(0.3)
qids = sorted({q for v in found.values() for q, _, _ in v})
ents = {}
for i in range(0, len(qids), 50):
    r = get({"action": "wbgetentities", "ids": "|".join(qids[i:i + 50]), "props": "labels|aliases|claims|sitelinks",
             "languages": "en|sv|mul", "sitefilter": "enwiki|svwiki", "format": "json"})
    for q, e in r["entities"].items():
        ents[q] = {
            "label": {l: v["value"] for l, v in e.get("labels", {}).items()},
            "aliases": {l: [a["value"] for a in v] for l, v in e.get("aliases", {}).items()},
            "P2534": [c["mainsnak"].get("datavalue", {}).get("value") for c in e.get("claims", {}).get("P2534", [])],
            "sitelinks": {k: v["title"] for k, v in e.get("sitelinks", {}).items()},
        }
print(json.dumps({"search": found, "entities": ents}, ensure_ascii=False, indent=1))

```

**Second search for the figures the first missed, and every item with a defining formula (P2534) whose English label names a figure or quantity (find_items2.py, SPARQL at https://query.wikidata.org/sparql)** (Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534))

```
"""Second search: the shapes the first search missed, and every item with a defining
formula (P2534) whose English label names an area, volume, perimeter or angle sum.

Run: python3 find_items2.py > items2.json
"""
import json
import time
import urllib.parse
import urllib.request

UA = "solid-memo deck research (https://github.com/antwika/solid-memo)"
API = "https://www.wikidata.org/w/api.php"
SPARQL = "https://query.wikidata.org/sparql"
TERMS = ["square", "rhombus", "cube", "cone", "pyramid", "prism", "ball", "polygon", "regular polygon",
         "sum of angles", "volume of a cone", "volume of a pyramid", "surface area of a sphere", "angle", "slant height",
         "triangle area formula"]
QUERY = """SELECT ?item ?en ?sv ?f WHERE {
  ?item wdt:P2534 ?f ; rdfs:label ?en .
  FILTER(LANG(?en) = "en")
  FILTER(REGEX(?en, "(area|volume|perimeter|circumference|sum of|angle|diagonal|surface|sector|arc|pyramid|cone|cylinder|sphere|ball|cube|cuboid|prism|trapez|rhomb|parallelogram|triangle|square|rectangle|polygon)", "i"))
  OPTIONAL { ?item rdfs:label ?sv . FILTER(LANG(?sv) = "sv") }
}"""


def get(url, params, data=None):
    req = urllib.request.Request(url + "?" + urllib.parse.urlencode(params), headers={
        "User-Agent": UA, "Accept": "application/sparql-results+json, application/json"})
    for attempt in range(5):
        try:
            with urllib.request.urlopen(req, timeout=120) as r:
                return json.load(r)
        except Exception:
            time.sleep(5 * (attempt + 1))
    raise RuntimeError(url)


found = {}
for t in TERMS:
    r = get(API, {"action": "wbsearchentities", "search": t, "language": "en", "format": "json", "limit": 12, "type": "item"})
    found[t] = [(s["id"], s.get("label"), s.get("description")) for s in r.get("search", [])]
    time.sleep(0.3)
rows = get(SPARQL, {"query": QUERY, "format": "json"})["results"]["bindings"]
p2534 = [{k: v["value"] for k, v in r.items()} for r in rows]
print(json.dumps({"search": found, "p2534": p2534}, ensure_ascii=False, indent=1))

```

**Labels (en, sv, mul), aliases, descriptions, P2534 (TeX), P31/P279 and sitelinks of the chosen items (get_entities.py)** (Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534))

```
"""Labels (en, sv, mul), aliases, descriptions, P2534 (TeX), P31/P279 and sitelinks of the chosen items.

Run: python3 get_entities.py > entities.json
"""
import json
import urllib.parse
import urllib.request

UA = "solid-memo deck research (https://github.com/antwika/solid-memo)"
QIDS = ("Q164 Q209 Q45867 Q19821 Q46303 Q41159 Q17278 Q203435 Q157002 Q37555 Q714886 Q7840113 Q189791 Q2737929 "
        "Q812880 Q262959 Q180544 Q34132 Q42344 Q3358290 Q12507 Q838611 Q6495712 Q104962 Q110812 Q1094399 Q33680 "
        "Q670036 Q28474 Q843905 Q4115331 Q30090856 Q30090890 Q96675379 Q30092368 Q30091310 Q11518 Q164321 Q170181 "
        "Q861555 Q2933696 Q1304927 Q20183185 Q7538676 Q11500 Q39297 Q1379273 Q158688 Q182714").split()
out = {}
for i in range(0, len(QIDS), 50):
    url = "https://www.wikidata.org/w/api.php?" + urllib.parse.urlencode({
        "action": "wbgetentities", "ids": "|".join(QIDS[i:i + 50]), "props": "labels|aliases|descriptions|claims|sitelinks",
        "languages": "en|sv|mul", "sitefilter": "enwiki|svwiki", "format": "json"})
    with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=60) as r:
        data = json.load(r)
    for q, e in data["entities"].items():
        claims = e.get("claims", {})
        out[q] = {
            "label": {l: v["value"] for l, v in e.get("labels", {}).items()},
            "aliases": {l: [a["value"] for a in v] for l, v in e.get("aliases", {}).items()},
            "description": e.get("descriptions", {}).get("en", {}).get("value"),
            "P2534": [c["mainsnak"].get("datavalue", {}).get("value") for c in claims.get("P2534", [])],
            "P31": [c["mainsnak"].get("datavalue", {}).get("value", {}).get("id") for c in claims.get("P31", [])],
            "P279": [c["mainsnak"].get("datavalue", {}).get("value", {}).get("id") for c in claims.get("P279", [])],
            "sitelinks": {k: v["title"] for k, v in e.get("sitelinks", {}).items()},
        }
print(json.dumps(out, ensure_ascii=False, indent=1))

```

**Licence of Wikidata** (Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534))

```
curl -sL -A "solid-memo deck research (https://github.com/antwika/solid-memo)" "https://www.wikidata.org/w/index.php?title=Wikidata:Licensing&action=raw"
```

**Wikitext and revision ids of the English and Swedish articles (fetch_wiki.py)** (English Wikipedia: articles on the figures and formulas)

```
"""Fetch the current wikitext and revision id of the English and Swedish Wikipedia articles
consulted to verify the cards. Saves wiki/<lang>/<title>.wikitext and wiki/revisions.json.

Run: python3 fetch_wiki.py
"""
import json
import pathlib
import time
import urllib.parse
import urllib.request

UA = "solid-memo deck research (https://github.com/antwika/solid-memo)"
HERE = pathlib.Path(__file__).parent / "wiki"
TITLES = {
    "en": ["Square", "Rectangle", "Parallelogram", "Triangle", "Trapezoid", "Rhombus", "Circle", "Area of a circle",
           "Circumference", "Circular sector", "Circular arc", "Equilateral triangle", "Pythagorean theorem",
           "Law of cosines", "Sum of angles of a triangle", "Polygon", "Internal angle", "Regular polygon", "Cube",
           "Rectangular cuboid", "Space diagonal", "Prism (geometry)", "Cylinder", "Cone", "Sphere",
           "Pyramid (geometry)", "Heron's formula", "Lateral surface", "Volume", "Surface area", "Perimeter", "Area",
           "Radian"],
    "sv": ["Kvadrat", "Rektangel", "Parallellogram", "Triangel", "Parallelltrapets", "Romb", "Cirkel", "Cirkelsektor",
           "Cirkelbåge", "Liksidig triangel", "Pythagoras sats", "Cosinussatsen", "Vinkelsumma", "Polygon", "Kub",
           "Rätblock", "Rymddiagonal", "Prisma (geometri)", "Cylinder", "Kon", "Sfär", "Klot", "Pyramid (geometri)",
           "Herons formel", "Mantelyta", "Omkrets", "Area", "Volym", "Radian", "Båglängd", "Diagonal (geometri)",
           "Medelpunktsvinkel", "Begränsningsarea", "Katet", "Hypotenusa"],
}
revs = {}
for lang, titles in TITLES.items():
    (HERE / lang).mkdir(parents=True, exist_ok=True)
    for t in titles:
        url = f"https://{lang}.wikipedia.org/w/api.php?" + urllib.parse.urlencode({
            "action": "query", "prop": "revisions", "titles": t, "rvprop": "ids|content", "rvslots": "main",
            "redirects": 1, "format": "json", "formatversion": 2})
        with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=60) as r:
            data = json.load(r)
        page = data["query"]["pages"][0]
        if "missing" in page:
            revs[f"{lang}:{t}"] = None
            continue
        rev = page["revisions"][0]
        (HERE / lang / (t.replace("/", "_") + ".wikitext")).write_text(rev["slots"]["main"]["content"], encoding="utf-8")
        revs[f"{lang}:{t}"] = {"title": page["title"], "revid": rev["revid"]}
        time.sleep(0.2)
(HERE / "revisions.json").write_text(json.dumps(revs, ensure_ascii=False, indent=1), encoding="utf-8")
print(json.dumps(revs, ensure_ascii=False, indent=1))

```

**Lines of the saved articles that state each card's formula (find_quotes.py; further greps such as grep -n -E "c\^2 ?= ?a\^2|2ab ?\\cos" on Law of cosines.wikitext and on Triangle.wikitext and Circumference.wikitext for the triangle-area and circumference lines)** (English Wikipedia: articles on the figures and formulas)

```
"""For each card, print the lines of the saved English and Swedish articles that state its formula
(candidate evidence quotes, read by eye afterwards). Output: quotes.txt

Run: python3 find_quotes.py
"""
import pathlib
import re

HERE = pathlib.Path(__file__).parent
SEARCH = {
    "square": [("en", "Square", r"P=4|d=\\sqrt2|area.*\\ell\^2|\\ell\^2"), ("sv", "Kvadrat", r"math|area|omkrets|diagonal")],
    "rectangle": [("en", "Rectangle", r"math"), ("sv", "Rektangel", r"math|area|omkrets|diagonal")],
    "parallelogram": [("en", "Parallelogram", r"K\s*=|A\s*=|bh|b h|base.*height"), ("sv", "Parallellogram", r"math|area")],
    "triangle": [("en", "Triangle", r"frac\{1\}\{2\}|\\tfrac12|frac12|sin|180|\\pi"), ("sv", "Triangel", r"math|area|180")],
    "equilateral": [("en", "Equilateral triangle", r"sqrt\{?3"), ("sv", "Liksidig triangel", r"math|sqrt")],
    "heron": [("en", "Heron's formula", r"s\(s|s-a|s - a"), ("sv", "Herons formel", r"math")],
    "trapezoid": [("en", "Trapezoid", r"frac\{?1\}?\{?2\}?.*h|a\+b|a \+ b"), ("sv", "Parallelltrapets", r"math|area")],
    "rhombus": [("en", "Rhombus", r"p\s*\\cdot\s*q|pq|d_1|\\frac\{pq\}|frac\{p"), ("sv", "Romb", r"math|area|diagonal")],
    "circle": [("en", "Circle", r"\\pi r|pi d|2\\pi"), ("en", "Area of a circle", r"A\s*=\s*\\pi r\^2|\\pi r\^2"),
               ("en", "Circumference", r"C\s*=|2\\pi r|\\pi d"), ("sv", "Cirkel", r"math|area|omkrets|pi")],
    "sector": [("en", "Circular sector", r"theta|L\s*=|A\s*=|frac"), ("en", "Circular arc", r"r\\theta|L\s*=|theta r"),
               ("sv", "Cirkelsektor", r"math|area|båg"), ("sv", "Cirkelbåge", r"math|längd")],
    "pythagoras": [("en", "Pythagorean theorem", r"a\^2\s*\+\s*b\^2\s*=\s*c\^2"), ("sv", "Pythagoras sats", r"a\^2|katet|hypotenusa")],
    "cosines": [("en", "Law of cosines", r"c\^2\s*=\s*a\^2\s*\+\s*b\^2\s*-\s*2ab"), ("sv", "Cosinussatsen", r"math|c\^2")],
    "angles": [("en", "Sum of angles of a triangle", r"180|\\pi"), ("en", "Polygon", r"180|n\s*-\s*2|n-2"),
               ("en", "Internal angle", r"180|n\s*-\s*2|n-2"), ("en", "Regular polygon", r"180|n\s*-\s*2|n-2"),
               ("sv", "Vinkelsumma", r"180|n\s*-\s*2|n-2"), ("sv", "Polygon", r"180|n\s*-\s*2|n-2"), ("sv", "Triangel", r"180")],
    "cube": [("en", "Cube", r"a\^3|6a\^2|sqrt\{?3|sqrt3"), ("sv", "Kub", r"math|volym|area|diagonal"),
             ("en", "Space diagonal", r"sqrt"), ("sv", "Rymddiagonal", r"math|sqrt")],
    "cuboid": [("en", "Rectangular cuboid", r"math"), ("sv", "Rätblock", r"math|volym|area|diagonal")],
    "prism": [("en", "Prism (geometry)", r"V\s*=|Bh|B h|base.*height"), ("sv", "Prisma (geometri)", r"math|volym|basyta|bottenyta")],
    "cylinder": [("en", "Cylinder", r"\\pi r\^2 ?h|2\\pi r ?h|2 ?\\pi r ?\(r"), ("sv", "Cylinder", r"math|volym|mantel|area"),
                 ("sv", "Mantelyta", r"math|cylinder|kon"), ("en", "Lateral surface", r"math|pi")],
    "pyramid": [("en", "Pyramid (geometry)", r"frac\{?1\}?\{?3\}?|frac13|\\tfrac13|Bh|/3"), ("sv", "Pyramid (geometri)", r"math|volym|frac")],
    "cone": [("en", "Cone", r"frac\{?1\}?\{?3\}?|\\pi r\s*\\ell|\\pi r ?l|\\pi r ?s|slant|\\ell"), ("sv", "Kon", r"math|volym|mantel|sida|generatris")],
    "sphere": [("en", "Sphere", r"frac\{4\}\{3\}|4\\pi r\^2|frac43"), ("sv", "Sfär", r"math|area|volym"), ("sv", "Klot", r"math|volym|area")],
    "terms": [("sv", "Begränsningsarea", r"."), ("sv", "Mantelyta", r"."), ("sv", "Omkrets", r"math|cirkel|O\s*="),
              ("sv", "Area", r"math|A\s*="), ("sv", "Volym", r"math|V\s*=")],
}
out = []
for key, items in SEARCH.items():
    out.append(f"######## {key}")
    for lang, title, rx in items:
        p = HERE / "wiki" / lang / (title.replace("/", "_") + ".wikitext")
        out.append(f"===== {lang}:{title}")
        n = 0
        for i, line in enumerate(p.read_text(encoding="utf-8").splitlines(), 1):
            if re.search(rx, line, re.I):
                out.append(f"{i}: {line[:450]}")
                n += 1
                if n >= 14:
                    break
(HERE / "quotes.txt").write_text("\n".join(out), encoding="utf-8")
print(len(out))

```

**Check every Wikipedia quote in the evidence against the saved wikitext of the linked revision, and every section named in a locator against the article's headings (check_quotes.py; result: all quotes and sections found except one fragment of the Cube article, whose {{nowrap|1=<math> a \sqrt{3} </math>.}} template the script's markup stripping cannot unwrap; that line was compared by eye and is verbatim)** (English Wikipedia: articles on the figures and formulas)

```
"""Check every Wikipedia evidence quote of the dossier against the saved wikitext of the quoted revision:
each fragment of "says" (split at " … ") must occur in the article after both are reduced to plain
text (markup, refs, math tags and whitespace removed), and the section named in the locator must be
a heading of the article.

Run: python3 check_quotes.py
"""
import html
import json
import pathlib
import re

HERE = pathlib.Path(__file__).parent
D = json.loads(pathlib.Path("/home/antwika/dev/github/antwika/solid-memo/.claude/worktrees/authored-decks/packages/deck-library/authored/geometry-formulas.json").read_text(encoding="utf-8"))
REVS = json.loads((HERE / "wiki" / "revisions.json").read_text(encoding="utf-8"))
BY_TITLE = {(k.split(":", 1)[0], v["title"]): k.split(":", 1)[1] for k, v in REVS.items() if v}


def plain(s):
    s = re.sub(r"^[:*]+", "", s, flags=re.M)
    s = re.sub(r"\{\{anchor\|[^{}]*\}\}", "", s)
    s = re.sub(r"<ref[^>]*/>", "", s)
    s = re.sub(r"<ref[^>]*>.*?</ref>", "", s, flags=re.S)
    s = re.sub(r"\{\{(sfnp?|r|efn|rp)\|[^{}]*\}\}", "", s)
    s = re.sub(r"\{\{(?:tmath|math|mvar)\|(?:1=)?((?:[^{}]|\{\{[^{}]*\}\}|\{[^{}]*\})*)\}\}", r"\1", s)
    s = re.sub(r"\{\{sfrac\|(\d+)\|(\d+)\}\}", r"\1/\2", s)
    s = re.sub(r"\{\{nowrap\|(?:1=)?([^{}]*)\}\}", r"\1", s)
    s = re.sub(r"\{\{pi\}\}|\{\{Pi\}\}", "π", s)
    s = re.sub(r"\[\[(?:[^|\]]*\|)?([^\]]*)\]\]", r"\1", s)
    s = re.sub(r"</?(math|sup|sub|small)[^>]*>", "", s)
    s = s.replace("'''", "").replace("''", "")
    s = html.unescape(s).replace(" ", " ")
    return re.sub(r"\s+", "", s).replace("_", "")


bad = 0
for c in D["cards"]:
    for e in c["evidence"]:
        if e["source"] not in ("enwiki", "svwiki"):
            continue
        lang = "en" if e["source"] == "enwiki" else "sv"
        title = re.match(r"\"([^\"]+)\"", e["locator"]).group(1)
        fname = BY_TITLE[(lang, title)]
        text = (HERE / "wiki" / lang / (fname.replace("/", "_") + ".wikitext")).read_text(encoding="utf-8")
        flat = plain(text)
        m = re.search(r"§ ([^,]+),", e["locator"])
        if m and m.group(1) not in ("infobox",):
            heads = re.findall(r"^=+\s*(.*?)\s*=+\s*$", text, flags=re.M)
            heads = [plain(h) for h in heads]
            if plain(m.group(1)) not in heads:
                bad += 1
                print(f"{c['id']}: section {m.group(1)!r} not a heading of {title}: {heads[:15]}")
        for frag in e["says"].split(" … "):
            frag = frag.strip().rstrip(".").replace("ℓ", "\\ell")
            if plain(frag) not in flat:
                bad += 1
                print(f"{c['id']}: {lang}:{title}: fragment not found: {frag!r}")
print("problems:", bad)

```

**Licence of English Wikipedia** (English Wikipedia: articles on the figures and formulas)

```
curl -sL -A "solid-memo deck research (https://github.com/antwika/solid-memo)" "https://en.wikipedia.org/w/index.php?title=Wikipedia:Copyrights&action=raw"
```

**Licence footer of Swedish Wikipedia** (Swedish Wikipedia: articles on the figures and formulas)

```
curl -sL -A "solid-memo deck research (https://github.com/antwika/solid-memo)" "https://sv.wikipedia.org/wiki/Kon" | grep -o -m2 "Wikipedias text är tillgänglig under licensen[^<]*<a[^>]*>[^<]*</a>"
```

**Search for a Swedish term for the slant height of a cone (no usable result)** (Swedish Wikipedia: articles on the figures and formulas)

```
https://sv.wikipedia.org/w/api.php?action=query&list=search&srsearch=sidlinje%20kon&format=json&srlimit=10 ; web searches "kon mantelarea \"sidlinje\" formel matematik" and "matteboken kon volym mantelarea sidlinjen"; the PDFs https://ncm.gu.se/wp-content/uploads/2023/04/3943_21_1.pdf and https://www.math.kth.se/math/student/courses/5B1117/ME/200405/Kursboken/buktarea.pdf searched for sidlinje|mantel|generatris (no match)
```

**Build, Wikidata checks and validation of the deck** (Derivations and SymPy verification for the Solid Memo geometry formulas deck)

```
python3 packages/deck-library/scripts/authored_decks.py build geometry-formulas
node packages/deck-library/scripts/validate_sources.ts geometry-formulas
```

## Quality control

5 rounds, 25 findings: 22 fixed, 0 rejected after checking, 3 needing no change. Every card's Wikidata checks (78 in all) are re-run against live Wikidata by `scripts/authored_decks.py check` before every build.

### Round 0: Machine verification and source cross-checks (2026-10-04)

**Reviewer:** Claude (AI) — authoring agent, machine checks · **Scope:** All 39 cards

verify_geometry.py (SymPy 1.14.0) ran 49 checks (39 cards, a second check for the prism and the pyramid, and 8 alternative forms named in the notes): 49 passed, each symbolically and numerically; three deliberately wrong formulas used as negative controls failed as they must. Every card was compared with the English Wikipedia article (35 cards also with a Swedish article, quoted with revision links) and, for 10 cards, with Wikidata's defining formula (P2534); no source disagrees with any card's formula. The builder's Wikidata checks (78 label checks) cover the English and Swedish names on the fronts and the items whose P2534 was compared. Discrepancies and decisions are logged below.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| cube-surface-area | Swedish Wikipedia's Kub calls the cube's total surface 6a² its "sammanlagda mantelarea", and Rätblock gives the box's total surface 2(s₁ + s₂)h + 2s₁s₂ as "Mantelarean", while the article Begränsningsarea (and Mantelyta, for cylinder and cone) reserves mantelarea for the lateral surface and calls the total begränsningsarea. | The Swedish fronts use begränsningsarea for the total surface (cube, box, cylinder, cone) and mantelarea only for the lateral surface (cylinder, cone), as the articles Begränsningsarea and Mantelyta define them. | fixed |
| circle-circumference-radius | The brief's model back "A = πr²" puts a quantity letter on the back, but the back is one text in no language shared by English and Swedish, and the letters differ (perimeter P and circumference C in English, O in Swedish: sv.wikipedia Rektangel "O = 2 b + 2 h", Omkrets "O = 2 \pi r"). | Every back gives the right-hand side only ("2πr"); the front names the quantity. | fixed |
| cone-lateral-area | No Swedish source fetched gives a settled school term for the slant height (sv.wikipedia Kon: "s = avståndet från basytans kant till konens spets"; Mantelyta: "s sidans längd"); searches for "sidlinje" found nothing citable. | The Swedish fronts say "sidan s" (after Mantelyta) and a front note in both languages defines s as the distance from the edge of the base to the apex. | fixed |
| law-of-cosines | The law of sines was planned as a card, but its answer can be written as a/sin A = b/sin B = c/sin C or as sin A/a = sin B/b = sin C/c (Wikidata P2534 of Q170181 gives the first), so the card would have two right answers. | The law of sines is left out (see the selection). | fixed |
| sphere-volume | English says "volume of a sphere" for the solid that Swedish calls klot (sfär is the surface): Wikidata separates Q12507 sphere (sv sfär) and Q838611 ball (sv klot). | The English front keeps the school usage "Volume of a sphere"; the Swedish front says "Volymen av ett klot"; the note explains. Label checks on Q838611 (sv klot) and Q12507 (en sphere). | fixed |
| herons-formula | Wikidata has two P2534 forms (with s, and the expanded ¼√((a+b+c)(−a+b+c)(a−b+c)(a+b−c))), and the semiperimeter s must be defined for the card to have one answer. | The back is the s form; a front note defines s = (a + b + c)/2. The script checks the expanded product identity symbolically. | fixed |
| triangle-angle-sum | A first draft of the symbolic check summed the two base angles of a triangle with π minus their sum, which is true by construction and tests nothing. | Replaced by the exact interior angles, computed from vertex coordinates, of three concrete triangles (equilateral, right isosceles, 30-60-90), plus the numerical check of ten random triangles. A tautological check of the radian form was removed for the same reason. | fixed |
| cube-volume | check_quotes.py found that 27 Wikipedia quotes or section names in the first draft of the evidence were not verbatim: lines of the article joined into one quote, TeX spacing (\, \! \ ) dropped, a Greek letter rendered instead of its TeX, and section names that are not headings of the revision (Cube has § Measurement, Pyramid (geometry) § Mensuration, Parallelogram § Area formula with an anchor). | Each quote was corrected to the wikitext of the linked revision, with … marking omitted text, and each section to the article's heading; the re-run found all but one fragment in the Cube article, which sits in a nested {{nowrap}} template and was compared by eye. | fixed |
| cylinder-lateral-area | The builder's property checks read the truthy P2534 value through SPARQL, which returns MathML, so a P2534 check against the TeX string would fail although the TeX (wbgetentities) agrees with the card. | No P2534 checks; the P2534 TeX from wbgetentities is quoted in the evidence of the 10 cards concerned, and the builder checks those items by label. | no change needed |

### Round 1: Factual accuracy (2026-10-04)

**Reviewer:** Claude (AI) — independent factual accuracy reviewer · **Scope:** All 39 cards: formulas re-derived with an independent script (Monte Carlo, polyline, mesh and coordinate methods), live Wikidata P2534 values of the 9 formula items, the builder's Wikidata checks

No factual errors: every formula, every alternative form in the notes and every context note was confirmed independently, the nine P2534 values agree with the cards and the builder's 78 Wikidata checks pass. Three suggestions: say "convex" on the regular-polygon card (fixed), stop the description claiming a Swedish Wikipedia check for every card (fixed), and note that the Wikidata checks confirm labels, not formulas (already documented; P2534 re-confirmed by hand).

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| regular-polygon-interior-angle | The front does not say convex; (n − 2)·180°/n holds only for convex regular polygons, not for regular star polygons such as the pentagram {5/2} (36°). | Confirmed (en.wikipedia Regular polygon, revision 1378025830, quoted in the card's evidence: "For a regular convex n-gon"). The front now reads "Each interior angle of a regular convex polygon with n sides, in degrees" / "Varje inre vinkel i en regelbunden konvex n-hörning, i grader". | fixed |
| deck | The description says every formula was checked against English and Swedish Wikipedia, but four cards (square diagonal, rectangle diagonal, triangle area from two sides and the included angle, cube space diagonal) have no Swedish article check. | Confirmed against the method and round 0. The description now says "checked against English Wikipedia (and, for 35 cards, Swedish Wikipedia)" / "kontrollerad mot engelska Wikipedia (och för 35 kort svenska Wikipedia)". | fixed |
| cylinder-lateral-area | The Wikidata checks are label checks only; for the items whose P2534 formula was compared they test an English item label that is not on any card, so they confirm which item was consulted, not the formula (cylinder-lateral-area, cylinder-surface-area, cone-lateral-area, circle-area). | Correct and already documented (method step 5 and round 0: SPARQL returns P2534 as MathML, so the builder cannot check it). The P2534 values of the nine items (Q30090890, Q30090856, Q96675379, Q4115331, Q843905, Q1094399, Q182714, Q11518, Q164321) were re-fetched with wbgetentities on 2026-10-04 in this round and still agree with the cards (Q843905 now also gives the form τ·r, Q1094399 also θ = φ/2 for the inscribed angle, Q182714 also the expanded product form). No change to the cards. | no change needed |

### Round 2: Language, translation and language tags (2026-10-04)

**Reviewer:** Claude (AI) — independent language, translation and language tags reviewer · **Scope:** All 39 cards, the title, description and keywords in English and Swedish, the language tags in the dossier and the built deck, and the typography

No errors in the language tags (fronts and notes en + sv, every back zxx, nothing untagged on the cards) or in the Swedish terms. One warning, the cuboid-volume notes saying different things in the two languages (fixed), and suggestions on the sector note's wording (fixed), "inre" on the regular-polygon front (fixed; the suggested Swedish label check is not possible), "delas upp i" (fixed) and the untagged keywords and source titles (Swedish source title made English; the tagging itself is a builder matter outside this dossier).

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| cuboid-volume | The back notes say different things: en "A rectangular box is also called a rectangular cuboid.", sv "Längd · bredd · höjd." | Both notes now start with the same reading, en "Length · width · height." / sv "Längd · bredd · höjd."; the English note keeps the alias "rectangular cuboid" as a deliberate English-only aside, because it explains the English front's term "rectangular box" and Swedish has the single term rätblock. | fixed |
| sector-area | The note says "Also r²θ/2." / "Även r²θ/2.", breaking the deck's "Also written …" / "Skrivs även …" pattern; the Swedish fragment is terse. | Now "Also written r²θ/2. …" / "Skrivs även r²θ/2. …". | fixed |
| regular-polygon-interior-angle | The Swedish front drops "interior" ("Varje vinkel i en regelbunden n-hörning"), and the card has no Swedish label check. | The Swedish front now says "Varje inre vinkel i en regelbunden konvex n-hörning, i grader" (with "konvex" from round 1); sv.wikipedia Polygon (revision 59699482, quoted in the evidence) writes "Summan av alla (inre) hörnvinklar". A Swedish label check is not possible: Q714886 (regular polygon), re-fetched with wbgetentities on 2026-10-04, has an English label only and no Swedish label or alias. | fixed |
| polygon-angle-sum | "den kan delas i n − 2 trianglar" is slightly unidiomatic; Swedish says "delas upp i". | Now "den kan delas upp i n − 2 trianglar". | fixed |
| deck | One source title is Swedish while the others are English. | The Swedish Wikipedia source's title is now English like the others ("Swedish Wikipedia: articles on the figures and formulas"). | fixed |
| deck | The keywords and source titles in the built deck carry no language tag. | The dossier format gives keywords and source titles as plain strings, so tagging them is a change to the builder, which is outside this deck's dossier; left for the library. (Split from the source-title finding in quality-control round 4, which pointed out that this part had been counted as fixed.) | no change needed |

### Round 3: Licensing, attribution and documentation (2026-10-04)

**Reviewer:** Claude (AI) — independent licensing, attribution and documentation reviewer · **Scope:** All 39 cards: licences of every source re-fetched, all 68 Wikipedia quotes compared with their revisions, Wikidata values re-fetched, the recorded scripts re-run, the wording of fronts and notes compared with the cited articles

No errors; the CC0 licence complies with every source. Two warnings, both fixed: the cone cards' Swedish front note followed the wording of sv.wikipedia Kon although the dossier said nothing was copied (reworded independently), and the method overstated the tolerances and the independence of the polygon angle checks (method rewritten to state exactly what is checked). Three suggestions, all fixed: a locator for "medelpunktsvinkeln", a note check that matched no note (replaced by a check of the equilateral triangle's height, script re-run: 49 of 49 pass), and the English Wikipedia source URL pointing at an uncited article.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| cone-lateral-area | The front note on cone-lateral-area and cone-surface-area, sv "s: avståndet från basens kant till spetsen", closely follows sv.wikipedia Kon ("s = avståndet från basytans kant till konens spets"), while the dossier lists svwiki as verification-only with no text copied. | Confirmed against the Kon wikitext (revision 57328450). The note on both cone cards is reworded in the compiler's own words: en "s: the length along the side from the apex to the rim of the base", sv "s: sträckan längs mantelytan från spetsen till basens rand"; the svwiki usedFor, the method and the licensing now say so. | fixed |
| deck | Method step 4 claims a 10⁻²⁰ tolerance in 30-digit arithmetic for every check, but Heron's formula uses double-precision side lengths with 10⁻¹² and the polygon sums 10⁻¹⁸; and it calls the regular n-gon angle checks exact computations from vertex coordinates, while for general n they are algebraic identities from the exterior angle 2π/n, the coordinate-based angles being checked only numerically for n = 3 … 12. | Confirmed in verify_geometry.py. Method step 4 now states the tolerances per check (10⁻²⁰ for check(), 10⁻¹² for Heron's numerical check, 10⁻¹⁸ for random polygon sums), that the general-n polygon checks are algebraic identities assuming the exterior angle 2π/n, and that the angles from vertex coordinates are checked numerically only; the evidence of polygon-angle-sum and regular-polygon-interior-angle says the same. | fixed |
| arc-length | The Swedish fronts of arc-length and sector-area say "medelpunktsvinkeln", whose source (sv.wikipedia Randvinkelsatsen, reached through the redirect Medelpunktsvinkel, revision 56854947) is missing from svwiki.usedFor and from both cards' evidence. | Confirmed in the saved wikitext. Randvinkelsatsen is added to svwiki.usedFor and the method, and both cards have an svwiki evidence entry linking revision 56854947 and quoting "Medelpunktsvinkeln är vinkeln i cirkelns medelpunkt mellan radierna till två punkter på cirkelns periferi" (markup stripped). | fixed |
| square-diagonal | The check "note:square-diagonal-area" (A = d²/2) verifies a form that no note names, while the equilateral-triangle-area note's "The height is (√3/2)a" is not checked. | The check is replaced by "note:equilateral-height" (distance from the base midpoint (a/2, 0) to the apex (a/2, a√3/2) = (√3/2)a). The script was re-run (uv run --with sympy python3 verify_geometry.py, SymPy 1.14.0): 49 checks, 49 passed, negative controls fail; the script and output under Queries, the method and the equilateral-triangle-area evidence are updated. | fixed |
| deck | The English Wikipedia source's URL is the article Area, which no card cites. | The URL is now https://en.wikipedia.org/, matching the title "articles on the figures and formulas"; for consistency the Swedish source's URL is now https://sv.wikipedia.org/. Each card's evidence links the exact revision used. | fixed |

### Round 4: Re-check of changed cards and a sample (facts, language, documentation) (2026-10-04)

**Reviewer:** Claude (AI) — independent re-check reviewer · **Scope:** 19 cards: the 8 changed in rounds 2–3 plus every third card in dossier order; the recorded verify_geometry.py re-run (49 of 49 pass), the generated deck and report re-rendered and compared, the cited Wikipedia revisions and the Wikidata values re-fetched

No errors or warnings; every fix claimed in earlier rounds is in the dossier. Two suggestions, both applied: the round-2 finding on keywords and source titles was counted as fixed although only the source-title part was changed (split into a fixed finding and a no-change-needed one), and the cone cards' front note now says the slant height is the straight distance.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| deck | In round 2 the finding on untagged keywords and source titles plus one Swedish source title is marked "fixed", although its resolution says the tagging was left for the library; only the source title was changed. | Confirmed: only sources.svwiki.title was changed. The round-2 finding is split into two: the Swedish source title (fixed) and the tagging of keywords and source titles (no change needed, builder scope), so the report's tally now matches what was done. | fixed |
| cone-lateral-area | The front note on cone-lateral-area and cone-surface-area defines s as the length "along the side" / "längs mantelytan" from the apex to the rim, which does not say the path is straight; a path on the lateral surface could be curved. | Applied in the compiler's own words on both cone cards: en "s: the straight distance along the side from the apex to the rim of the base", sv "s: den raka sträckan längs mantelytan från spetsen till basens rand". The slant height is the straight segment (generator) from apex to rim; the method is updated. The formulas and evidence are unchanged. | fixed |

## Cards and evidence

| Card | Front | Back | Evidence |
|---|---|---|---|
| `square-area` | Area of a square with side a (en) / Arean av en kvadrat med sidan a (sv) | a² (zxx) | Derivations and SymPy verification for the Solid Memo geometry formulas deck: verify_geometry.py, check "square-area" — ∫∫ 1 dx dy over [0, a] × [0, a] = a². symbolic=ok numeric=ok<br>English Wikipedia: articles on the figures and formulas: "Square", revision 1375907649: https://en.wikipedia.org/w/index.php?title=Square&oldid=1375907649 — A square whose four sides have length ℓ … A=\ell^2=\tfrac12 d^2.<br>Swedish Wikipedia: articles on the figures and formulas: "Kvadrat", introduction, revision 56112767: https://sv.wikipedia.org/w/index.php?title=Kvadrat&oldid=56112767 — Arean av en kvadrat vars sida är a är lika med a2 och dess omkrets är 4a.<br>Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534): Q164 (square) — en label "square", sv label "kvadrat"<br>Wikidata checks: Q164 en = square, Q164 sv = kvadrat |
| `square-perimeter` | Perimeter of a square with side a (en) / Omkretsen av en kvadrat med sidan a (sv) | 4a (zxx) | Derivations and SymPy verification for the Solid Memo geometry formulas deck: verify_geometry.py, check "square-perimeter" — Sum of the four side lengths of the square with vertices (0,0), (a,0), (a,a), (0,a) = 4a. symbolic=ok numeric=ok<br>English Wikipedia: articles on the figures and formulas: "Square", revision 1375907649: https://en.wikipedia.org/w/index.php?title=Square&oldid=1375907649 — A square whose four sides have length ℓ has perimeter P=4\ell<br>Swedish Wikipedia: articles on the figures and formulas: "Kvadrat", introduction, revision 56112767: https://sv.wikipedia.org/w/index.php?title=Kvadrat&oldid=56112767 — Arean av en kvadrat vars sida är a är lika med a2 och dess omkrets är 4a.<br>Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534): Q28474 (perimeter) — en label "perimeter", sv label "omkrets"<br>Wikidata checks: Q28474 en = perimeter, Q28474 sv = omkrets |
| `square-diagonal` | Diagonal of a square with side a (en) / Diagonalen i en kvadrat med sidan a (sv) | a√2 (zxx) — *Also written √2·a. By the Pythagorean theorem: d² = a² + a². (en) / Skrivs även √2·a. Enligt Pythagoras sats: d² = a² + a². (sv)* | Derivations and SymPy verification for the Solid Memo geometry formulas deck: verify_geometry.py, check "square-diagonal" — Distance from (0,0) to (a,a) = a√2. symbolic=ok numeric=ok<br>English Wikipedia: articles on the figures and formulas: "Square", revision 1375907649: https://en.wikipedia.org/w/index.php?title=Square&oldid=1375907649 — A square whose four sides have length ℓ has … diagonal length d=\sqrt2\ell.<br>Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534): Q189791 (diagonal) — en label "diagonal", sv label "diagonal"<br>Wikidata checks: Q189791 en = diagonal, Q189791 sv = diagonal |
| `rectangle-area` | Area of a rectangle with sides a and b (en) / Arean av en rektangel med sidorna a och b (sv) | ab (zxx) | Derivations and SymPy verification for the Solid Memo geometry formulas deck: verify_geometry.py, check "rectangle-area" — ∫∫ 1 dx dy over [0, a] × [0, b] = ab. symbolic=ok numeric=ok<br>English Wikipedia: articles on the figures and formulas: "Rectangle", § Formulae, revision 1378189380: https://en.wikipedia.org/w/index.php?title=Rectangle&oldid=1378189380 — If a rectangle has length ℓ and width w, then: it has area A = \ell w<br>Swedish Wikipedia: articles on the figures and formulas: "Rektangel", revision 57190318: https://sv.wikipedia.org/w/index.php?title=Rektangel&oldid=57190318 — Om den ena sidlängden är b (basen) och den andra sidlängden är h (höjden), kan omkretsen O och arean A beräknas med. … O = 2 b + 2 h … A = b \cdot h<br>Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534): Q209 (rectangle) — en label "rectangle", sv label "rektangel"<br>Wikidata checks: Q209 en = rectangle, Q209 sv = rektangel |
| `rectangle-perimeter` | Perimeter of a rectangle with sides a and b (en) / Omkretsen av en rektangel med sidorna a och b (sv) | 2(a + b) (zxx) — *Also written 2a + 2b. (en) / Skrivs även 2a + 2b. (sv)* | Derivations and SymPy verification for the Solid Memo geometry formulas deck: verify_geometry.py, check "rectangle-perimeter" — Sum of the four side lengths of the rectangle with vertices (0,0), (a,0), (a,b), (0,b) = 2(a + b); the note's form 2a + 2b checked as "note:rectangle-perimeter". symbolic=ok numeric=ok<br>English Wikipedia: articles on the figures and formulas: "Rectangle", § Formulae, revision 1378189380: https://en.wikipedia.org/w/index.php?title=Rectangle&oldid=1378189380 — it has perimeter P = 2\ell + 2w = 2(\ell + w)<br>Swedish Wikipedia: articles on the figures and formulas: "Rektangel", revision 57190318: https://sv.wikipedia.org/w/index.php?title=Rektangel&oldid=57190318 — O = 2 b + 2 h<br>Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534): Q209 (rectangle) — en label "rectangle", sv label "rektangel"<br>Wikidata checks: Q209 en = rectangle, Q209 sv = rektangel |
| `rectangle-diagonal` | Diagonal of a rectangle with sides a and b (en) / Diagonalen i en rektangel med sidorna a och b (sv) | √(a² + b²) (zxx) | Derivations and SymPy verification for the Solid Memo geometry formulas deck: verify_geometry.py, check "rectangle-diagonal" — Distance from (0,0) to (a,b) = √(a² + b²). symbolic=ok numeric=ok<br>English Wikipedia: articles on the figures and formulas: "Rectangle", § Formulae, revision 1378189380: https://en.wikipedia.org/w/index.php?title=Rectangle&oldid=1378189380 — each diagonal has length d=\sqrt{\ell^2 + w^2}<br>Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534): Q189791 (diagonal) — en label "diagonal", sv label "diagonal"<br>Wikidata checks: Q189791 sv = diagonal |
| `parallelogram-area` | Area of a parallelogram with base b and height h (en) / Arean av en parallellogram med basen b och höjden h (sv) | bh (zxx) — *The height is measured at right angles to the base. (en) / Höjden mäts vinkelrätt mot basen. (sv)* | Derivations and SymPy verification for the Solid Memo geometry formulas deck: verify_geometry.py, check "parallelogram-area" — Shoelace area of (0,0), (b,0), (b+t,h), (t,h) = bh for every shear t. symbolic=ok numeric=ok<br>English Wikipedia: articles on the figures and formulas: "Parallelogram", § Area formula, revision 1378189285: https://en.wikipedia.org/w/index.php?title=Parallelogram&oldid=1378189285 — A parallelogram with base b and height h … K = bh.<br>Swedish Wikipedia: articles on the figures and formulas: "Parallellogram", revision 55901309: https://sv.wikipedia.org/w/index.php?title=Parallellogram&oldid=55901309 — Arean av en parallellogram är lika med en sidas längd multiplicerat med det vinkelräta avståndet till motstående sida: Arean = a\,h= a\,b\,\sin \alpha<br>Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534): Q45867 (parallelogram) — en label "parallelogram", sv label "parallellogram"<br>Wikidata checks: Q45867 en = parallelogram, Q45867 sv = parallellogram |
| `trapezoid-area` | Area of a trapezoid with parallel sides a and b and height h (en) / Arean av ett parallelltrapets med de parallella sidorna a och b och höjden h (sv) | ½(a + b)h (zxx) — *Also written (a + b)h/2: the mean of the parallel sides times the height. Called a trapezium in British English. (en) / Skrivs även (a + b)h/2: medelvärdet av de parallella sidorna gånger höjden. (sv)* | Derivations and SymPy verification for the Solid Memo geometry formulas deck: verify_geometry.py, check "trapezoid-area" — Shoelace area of (0,0), (a,0), (t+b,h), (t,h) = (a + b)h/2 for every offset t. symbolic=ok numeric=ok<br>English Wikipedia: articles on the figures and formulas: "Trapezoid", infobox, revision 1378189132: https://en.wikipedia.org/w/index.php?title=Trapezoid&oldid=1378189132 — area = \tfrac12(a + b) h<br>Swedish Wikipedia: articles on the figures and formulas: "Parallelltrapets", revision 57190320: https://sv.wikipedia.org/w/index.php?title=Parallelltrapets&oldid=57190320 — Arean hos ett parallelltrapets beräknas som produkten av höjden och medelvärdet av de parallella sidorna: A=\frac{a+b}{2}\cdot h.<br>Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534): Q46303 (trapezoid) — en label "trapezoid", en alias "trapezium", sv label "parallelltrapets"<br>Wikidata checks: Q46303 en = trapezoid, Q46303 sv = parallelltrapets |
| `rhombus-area` | Area of a rhombus with diagonals d₁ and d₂ (en) / Arean av en romb med diagonalerna d₁ och d₂ (sv) | ½d₁d₂ (zxx) — *Also written d₁d₂/2. (en) / Skrivs även d₁d₂/2. (sv)* | Derivations and SymPy verification for the Solid Memo geometry formulas deck: verify_geometry.py, check "rhombus-area" — Shoelace area of (±d₁/2, 0), (0, ±d₂/2), whose four sides are equal (a rhombus), = d₁d₂/2. symbolic=ok numeric=ok<br>English Wikipedia: articles on the figures and formulas: "Rhombus", infobox, revision 1367089392: https://en.wikipedia.org/w/index.php?title=Rhombus&oldid=1367089392 — area = K = \frac{p \cdot q}{2} (half the product of the diagonals)<br>Swedish Wikipedia: articles on the figures and formulas: "Romb", revision 56547229: https://sv.wikipedia.org/w/index.php?title=Romb&oldid=56547229 — A = \frac {d_1 \cdot d_2} {2} … där … d1 och d2 är diagonalerna.<br>Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534): Q41159 (rhombus) — en label "rhombus", sv label "romb"<br>Wikidata checks: Q41159 en = rhombus, Q41159 sv = romb |
| `triangle-area` | Area of a triangle with base b and height h (en) / Arean av en triangel med basen b och höjden h (sv) | ½bh (zxx) — *Also written bh/2. (en) / Skrivs även bh/2. (sv)* | Derivations and SymPy verification for the Solid Memo geometry formulas deck: verify_geometry.py, check "triangle-area" — Shoelace area of (0,0), (b,0), (t,h) = bh/2 for every apex position t. symbolic=ok numeric=ok<br>English Wikipedia: articles on the figures and formulas: "Triangle", § Area, revision 1369029950: https://en.wikipedia.org/w/index.php?title=Triangle&oldid=1369029950 — take half the product of the length of one side b (the base) times the corresponding altitude h: T = \tfrac{1}{2}bh.<br>Swedish Wikipedia: articles on the figures and formulas: "Triangel", § Area, revision 57770802: https://sv.wikipedia.org/w/index.php?title=Triangel&oldid=57770802 — Triangelns area är en höjd multiplicerad med motsvarande sida dividerat med 2 … A = \frac {a h_a}{2}<br>Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534): Q19821 (triangle) — en label "triangle", sv label "triangel"<br>Wikidata checks: Q19821 en = triangle, Q19821 sv = triangel |
| `triangle-area-sine` | Area of a triangle with sides a and b and the angle C between them (en) / Arean av en triangel med sidorna a och b och vinkeln C mellan dem (sv) | ½ab·sin C (zxx) — *Also written (ab·sin C)/2. (en) / Skrivs även (ab·sin C)/2. (sv)* | Derivations and SymPy verification for the Solid Memo geometry formulas deck: verify_geometry.py, check "triangle-area-sine" — Shoelace area of (0,0), (a,0), (b·cos C, b·sin C) = ½ab·sin C for 0 < C < π. symbolic=ok numeric=ok<br>English Wikipedia: articles on the figures and formulas: "Triangle", § Area, revision 1369029950: https://en.wikipedia.org/w/index.php?title=Triangle&oldid=1369029950 — If two sides a and b and their included angle \gamma are known … the area of the triangle is: T = \tfrac{1}{2}ab \sin \gamma.<br>Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534): Q19821 (triangle) — en label "triangle", sv label "triangel"<br>Wikidata checks: Q19821 sv = triangel |
| `equilateral-triangle-area` | Area of an equilateral triangle with side a (en) / Arean av en liksidig triangel med sidan a (sv) | (√3/4)a² (zxx) — *Also written a²√3/4. The height is (√3/2)a. (en) / Skrivs även a²√3/4. Höjden är (√3/2)a. (sv)* | Derivations and SymPy verification for the Solid Memo geometry formulas deck: verify_geometry.py, check "equilateral-triangle-area" — Shoelace area of (0,0), (a,0), (a/2, a√3/2), whose three sides all equal a, = (√3/4)a²; the note's height, the distance from (a/2, 0) to the apex, = (√3/2)a, checked as "note:equilateral-height". symbolic=ok numeric=ok<br>English Wikipedia: articles on the figures and formulas: "Equilateral triangle", § Area, revision 1378096713: https://en.wikipedia.org/w/index.php?title=Equilateral_triangle&oldid=1378096713 — T = \frac{\sqrt{3}}{4}t^2.<br>Swedish Wikipedia: articles on the figures and formulas: "Liksidig triangel", revision 56184924: https://sv.wikipedia.org/w/index.php?title=Liksidig_triangel&oldid=56184924 — En liksidig triangels area ges av: A = \frac{a^2\sqrt{3}}{4} = \frac{h^2}{\sqrt{3}}<br>Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534): Q157002 (equilateral triangle) — en label "equilateral triangle", sv label "liksidig triangel"<br>Wikidata checks: Q157002 en = equilateral triangle, Q157002 sv = liksidig triangel |
| `herons-formula` | Heron's formula: area of a triangle with sides a, b and c (en) / Herons formel: arean av en triangel med sidorna a, b och c (sv) | √(s(s − a)(s − b)(s − c)) (zxx) | Derivations and SymPy verification for the Solid Memo geometry formulas deck: verify_geometry.py, check "herons-formula" — For a triangle (0,0), (c,0), (p,q): s(s − a)(s − b)(s − c), expanded in the squared side lengths, equals (cq/2)², the squared shoelace area; and at five random triangles √(s(s − a)(s − b)(s − c)) equals the shoelace area to 10⁻¹². symbolic=ok numeric=ok<br>English Wikipedia: articles on the figures and formulas: "Heron's formula", introduction, revision 1371067560: https://en.wikipedia.org/w/index.php?title=Heron's_formula&oldid=1371067560 — A = \sqrt{s(s-a)(s-b)(s-c)}.<br>Swedish Wikipedia: articles on the figures and formulas: "Herons formel", revision 57929753: https://sv.wikipedia.org/w/index.php?title=Herons_formel&oldid=57929753 — Area=\sqrt{s\left(s-a\right)\left(s-b\right)\left(s-c\right)} … s = \frac{1}{2}\left(a+b+c\right)<br>Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534): Q182714 (Heron's formula), P2534 defining formula — A=\sqrt{s(s-a)(s-b)(s-c)}; s=\frac{a+b+c}{2}; en label "Heron's formula", sv label "Herons formel"<br>Wikidata checks: Q182714 en = Heron's formula, Q182714 sv = Herons formel |
| `pythagorean-theorem` | Pythagorean theorem for a right triangle with legs a and b and hypotenuse c (en) / Pythagoras sats för en rätvinklig triangel med kateterna a och b och hypotenusan c (sv) | a² + b² = c² (zxx) | Derivations and SymPy verification for the Solid Memo geometry formulas deck: verify_geometry.py, check "pythagorean-theorem" — Legs on the axes, (a,0) and (0,b): the squared distance between them (the hypotenuse c²) = a² + b². symbolic=ok numeric=ok<br>English Wikipedia: articles on the figures and formulas: "Pythagorean theorem", introduction, revision 1377023641: https://en.wikipedia.org/w/index.php?title=Pythagorean_theorem&oldid=1377023641 — a^2 + b^2 = c^2 .<br>Swedish Wikipedia: articles on the figures and formulas: "Pythagoras sats", revision 59655360: https://sv.wikipedia.org/w/index.php?title=Pythagoras_sats&oldid=59655360 — I en rätvinklig triangel är kvadraten på hypotenusan lika med summan av kvadraterna på kateterna. … a^2 + b^2 = c^2 där a och b är kateternas längder och c hypotenusans längd.<br>Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534): Q11518 (Pythagorean theorem), P2534 defining formula — c^2=a^2+b^2; en label "Pythagorean theorem", sv label "Pythagoras sats"; Q104962 sv label "hypotenusa"; Q110812 sv label "katet", en alias "leg"<br>Wikidata checks: Q11518 en = Pythagorean theorem, Q11518 sv = Pythagoras sats, Q104962 en = hypotenuse, Q104962 sv = hypotenusa, Q110812 en = leg, Q110812 sv = katet |
| `law-of-cosines` | Law of cosines: c² in a triangle with sides a, b, c and the angle C opposite c (en) / Cosinussatsen: c² i en triangel med sidorna a, b, c och vinkeln C mitt emot sidan c (sv) | c² = a² + b² − 2ab·cos C (zxx) — *With C = 90° it becomes the Pythagorean theorem. (en) / Med C = 90° övergår den i Pythagoras sats. (sv)* | Derivations and SymPy verification for the Solid Memo geometry formulas deck: verify_geometry.py, check "law-of-cosines" — C at the origin, B = (a,0), A = (b·cos C, b·sin C): \|AB\|² expands to a² + b² − 2ab·cos C. symbolic=ok numeric=ok<br>English Wikipedia: articles on the figures and formulas: "Law of cosines", introduction, revision 1357255136: https://en.wikipedia.org/w/index.php?title=Law_of_cosines&oldid=1357255136 — c^2 &= a^2 + b^2 - 2ab\cos\gamma<br>Swedish Wikipedia: articles on the figures and formulas: "Cosinussatsen", revision 56558376: https://sv.wikipedia.org/w/index.php?title=Cosinussatsen&oldid=56558376 — c^2=a^2+b^2-2ab\cdot\cos \gamma<br>Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534): Q164321 (law of cosines), P2534 defining formula — c^2 = a^2+b^2-2ab\cos C; en label "law of cosines", sv label "cosinussatsen"<br>Wikidata checks: Q164321 en = law of cosines, Q164321 sv = cosinussatsen |
| `triangle-angle-sum` | Sum of the interior angles of a triangle, in degrees (en) / Vinkelsumman i en triangel, i grader (sv) | 180° (zxx) — *π radians. In plane (Euclidean) geometry. (en) / π radianer. I plan (euklidisk) geometri. (sv)* | Derivations and SymPy verification for the Solid Memo geometry formulas deck: verify_geometry.py, check "triangle-angle-sum" — Exact interior angles (from the vertex coordinates) of an equilateral, a right isosceles and a 30-60-90 triangle sum to π; ten random triangles sum to 180° to 10⁻²⁰. symbolic=ok numeric=ok<br>English Wikipedia: articles on the figures and formulas: "Sum of angles of a triangle", introduction, revision 1347539890: https://en.wikipedia.org/w/index.php?title=Sum_of_angles_of_a_triangle&oldid=1347539890 — In a Euclidean space, the sum of angles of a triangle equals a straight angle (180 degrees, π radians, two right angles, or a half-turn).<br>Swedish Wikipedia: articles on the figures and formulas: "Vinkelsumma", revision 50466849: https://sv.wikipedia.org/w/index.php?title=Vinkelsumma&oldid=50466849 — I Euklidisk geometri kan man visa att triangelns vinkelsumma är 180°.<br>Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534): Q7840113 (angle sum theorem) — en alias "sum of angles of a triangle", sv label "vinkelsumma"; description "theorem that, in Euclidean geometry, the sum of angles of a triangle is π radians"<br>Wikidata checks: Q7840113 en = sum of angles of a triangle, Q7840113 sv = vinkelsumma |
| `polygon-angle-sum` | Sum of the interior angles of a polygon with n sides, in degrees (en) / Vinkelsumman i en n-hörning, i grader (sv) | (n − 2)·180° (zxx) — *For a simple polygon (its sides do not cross); it splits into n − 2 triangles. (en) / För en enkel polygon (sidorna korsar inte varandra); den kan delas upp i n − 2 trianglar. (sv)* | Derivations and SymPy verification for the Solid Memo geometry formulas deck: verify_geometry.py, check "polygon-angle-sum" — n·(π − 2π/n) = (n − 2)π holds symbolically (an algebraic identity, assuming the regular n-gon's exterior angle 2π/n); the angles of random convex polygons with 3 to 12 sides (three each), computed from their vertices, sum to (n − 2)·180° within 10⁻¹⁸. symbolic=ok numeric=ok<br>English Wikipedia: articles on the figures and formulas: "Polygon", § Angles, revision 1378188951: https://en.wikipedia.org/w/index.php?title=Polygon&oldid=1378188951 — The sum of the interior angles of a simple n-gon is (n − 2) × π radians or (n − 2) × 180 degrees.<br>Swedish Wikipedia: articles on the figures and formulas: "Polygon", revision 59699482: https://sv.wikipedia.org/w/index.php?title=Polygon&oldid=59699482 — Summan av alla (inre) hörnvinklar i en n-hörning är (n-2)·180°<br>Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534): Q37555 (polygon) — en label "polygon", sv label "polygon", sv alias "månghörning"<br>Wikidata checks: Q37555 en = polygon, Q37555 sv = polygon |
| `regular-polygon-interior-angle` | Each interior angle of a regular convex polygon with n sides, in degrees (en) / Varje inre vinkel i en regelbunden konvex n-hörning, i grader (sv) | (n − 2)·180°/n (zxx) — *For a regular hexagon: 120°. (en) / För en regelbunden sexhörning: 120°. (sv)* | Derivations and SymPy verification for the Solid Memo geometry formulas deck: verify_geometry.py, check "regular-polygon-interior-angle" — (π − 2π/n)·180/π = (n − 2)·180/n holds symbolically (an algebraic identity, assuming the regular n-gon's exterior angle 2π/n); the angle computed from the vertices of the regular n-gon for n = 3 … 12 agrees numerically to 10⁻²⁰. symbolic=ok numeric=ok<br>English Wikipedia: articles on the figures and formulas: "Regular polygon", § Angles, revision 1378025830: https://en.wikipedia.org/w/index.php?title=Regular_polygon&oldid=1378025830 — For a regular convex n-gon, each interior angle has a measure of: \frac{(n - 2)180}{n} degrees<br>Swedish Wikipedia: articles on the figures and formulas: "Polygon", revision 59699482: https://sv.wikipedia.org/w/index.php?title=Polygon&oldid=59699482 — Eftersom en regelbunden n-hörning har vinkelsumman (n-2)·180° och har n stycken lika stora hörnvinklar, är var och en av dessa \textstyle{\frac{n-2}{n}180^\circ}.<br>Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534): Q714886 (regular polygon) — en label "regular polygon" (no sv label)<br>Wikidata checks: Q714886 en = regular polygon |
| `circle-area` | Area of a circle with radius r (en) / Arean av en cirkel med radien r (sv) | πr² (zxx) — *With diameter d: πd²/4. (en) / Med diametern d: πd²/4. (sv)* | Derivations and SymPy verification for the Solid Memo geometry formulas deck: verify_geometry.py, check "circle-area" — ∫₀^{2π}∫₀^r ρ dρ dφ = πr²; the note's form πd²/4 checked as "note:circle-area-diameter". symbolic=ok numeric=ok<br>English Wikipedia: articles on the figures and formulas: "Circle", § Area enclosed, revision 1371130265: https://en.wikipedia.org/w/index.php?title=Circle&oldid=1371130265 — \mathrm{Area} = \pi r^2.<br>Swedish Wikipedia: articles on the figures and formulas: "Area", § Grundläggande formler för area, revision 59685598: https://sv.wikipedia.org/w/index.php?title=Area&oldid=59685598 — A = \pi r^2 (cirkel)<br>Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534): Q4115331 (Area of a circle), P2534 defining formula — A=\pi r^2; Q17278 en label "circle", sv label "cirkel"<br>Wikidata checks: Q4115331 en = Area of a circle, Q17278 en = circle, Q17278 sv = cirkel |
| `circle-circumference-radius` | Circumference of a circle with radius r (en) / Omkretsen av en cirkel med radien r (sv) | 2πr (zxx) | Derivations and SymPy verification for the Solid Memo geometry formulas deck: verify_geometry.py, check "circle-circumference-radius" — Arc-length integral of (r·cos φ, r·sin φ) over 0 ≤ φ ≤ 2π = 2πr. symbolic=ok numeric=ok<br>English Wikipedia: articles on the figures and formulas: "Circle", § Circumference, revision 1371130265: https://en.wikipedia.org/w/index.php?title=Circle&oldid=1371130265 — C = 2\pi r = \pi d.<br>Swedish Wikipedia: articles on the figures and formulas: "Omkrets", § Längden av cirkelns omkrets, revision 52216046: https://sv.wikipedia.org/w/index.php?title=Omkrets&oldid=52216046 — Omkretsens längd O är relaterad till en cirkels diameters längd d, via den enkla formeln O = \pi d eller O = 2 \pi r, där r är cirkelns radie.<br>Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534): Q843905 (circumference), P2534 defining formula — C=\pi\cdot{d}=2\pi\cdot{r}=\tau\cdot{r}; en label "circumference", sv label "omkretsen"<br>Wikidata checks: Q843905 en = circumference, Q843905 sv = omkretsen, Q17278 sv = cirkel |
| `circle-circumference-diameter` | Circumference of a circle with diameter d (en) / Omkretsen av en cirkel med diametern d (sv) | πd (zxx) | Derivations and SymPy verification for the Solid Memo geometry formulas deck: verify_geometry.py, check "circle-circumference-diameter" — The arc-length integral 2πr with r = d/2 = πd. symbolic=ok numeric=ok<br>English Wikipedia: articles on the figures and formulas: "Circle", § Circumference, revision 1371130265: https://en.wikipedia.org/w/index.php?title=Circle&oldid=1371130265 — C = 2\pi r = \pi d.<br>Swedish Wikipedia: articles on the figures and formulas: "Omkrets", § Längden av cirkelns omkrets, revision 52216046: https://sv.wikipedia.org/w/index.php?title=Omkrets&oldid=52216046 — O = \pi d eller O = 2 \pi r<br>Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534): Q843905 (circumference), P2534 defining formula — C=\pi\cdot{d}=2\pi\cdot{r}=\tau\cdot{r}<br>Wikidata checks: Q843905 en = circumference |
| `arc-length` | Length of a circular arc with radius r and central angle θ in radians (en) / Längden av en cirkelbåge med radien r och medelpunktsvinkeln θ i radianer (sv) | rθ (zxx) — *With the angle v in degrees: (v/360°)·2πr. (en) / Med vinkeln v i grader: (v/360°)·2πr. (sv)* | Derivations and SymPy verification for the Solid Memo geometry formulas deck: verify_geometry.py, check "arc-length" — Arc-length integral of (r·cos φ, r·sin φ) over 0 ≤ φ ≤ θ = rθ; the note's degree form checked as "note:arc-degrees". symbolic=ok numeric=ok<br>English Wikipedia: articles on the figures and formulas: "Circular arc", § Length, revision 1369475850: https://en.wikipedia.org/w/index.php?title=Circular_arc&oldid=1369475850 — L = \theta r.<br>Swedish Wikipedia: articles on the figures and formulas: "Cirkelbåge", revision 43356493: https://sv.wikipedia.org/w/index.php?title=Cirkelbåge&oldid=43356493 — Cirkelbågens längd, båglängden, är proportionell mot radien r och mittpunktsvinkeln β: … \ b = r \beta … där mittpunktsvinkeln \beta anges i radianer.<br>Swedish Wikipedia: articles on the figures and formulas: "Randvinkelsatsen" (redirect from Medelpunktsvinkel), revision 56854947: https://sv.wikipedia.org/w/index.php?title=Randvinkelsatsen&oldid=56854947 — Medelpunktsvinkeln är vinkeln i cirkelns medelpunkt mellan radierna till två punkter på cirkelns periferi<br>Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534): Q1094399 (central angle), P2534 defining formula — L = r \theta; Q670036 en label "arc length", sv label "båglängd"; Q33680 sv label "radian"<br>Wikidata checks: Q1094399 en = central angle, Q670036 sv = båglängd, Q33680 sv = radian |
| `sector-area` | Area of a circular sector with radius r and central angle θ in radians (en) / Arean av en cirkelsektor med radien r och medelpunktsvinkeln θ i radianer (sv) | ½r²θ (zxx) — *Also written r²θ/2. With the angle v in degrees: (v/360°)·πr². (en) / Skrivs även r²θ/2. Med vinkeln v i grader: (v/360°)·πr². (sv)* | Derivations and SymPy verification for the Solid Memo geometry formulas deck: verify_geometry.py, check "sector-area" — ∫₀^θ∫₀^r ρ dρ dφ = r²θ/2; the note's degree form checked as "note:sector-degrees". symbolic=ok numeric=ok<br>English Wikipedia: articles on the figures and formulas: "Circular sector", § Area, revision 1359469494: https://en.wikipedia.org/w/index.php?title=Circular_sector&oldid=1359469494 — A = \pi r^2\, \frac{\theta}{2 \pi} = \frac{r^2 \theta}{2}<br>Swedish Wikipedia: articles on the figures and formulas: "Cirkelsektor", § Area, revision 56452156: https://sv.wikipedia.org/w/index.php?title=Cirkelsektor&oldid=56452156 — Arean av en cirkelsektor där cirkelns radie är r och vinkeln \theta anges i radianer är A = \frac{\theta}{2\pi}\cdot r^2\pi = \frac{\theta}{2} r^2<br>Swedish Wikipedia: articles on the figures and formulas: "Randvinkelsatsen" (redirect from Medelpunktsvinkel), revision 56854947: https://sv.wikipedia.org/w/index.php?title=Randvinkelsatsen&oldid=56854947 — Medelpunktsvinkeln är vinkeln i cirkelns medelpunkt mellan radierna till två punkter på cirkelns periferi<br>Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534): Q203435 (circular sector) — en label "circular sector", sv label "cirkelsektor"<br>Wikidata checks: Q203435 en = circular sector, Q203435 sv = cirkelsektor |
| `cube-volume` | Volume of a cube with edge a (en) / Volymen av en kub med kantlängden a (sv) | a³ (zxx) | Derivations and SymPy verification for the Solid Memo geometry formulas deck: verify_geometry.py, check "cube-volume" — ∫∫∫ 1 over [0, a]³ = a³. symbolic=ok numeric=ok<br>English Wikipedia: articles on the figures and formulas: "Cube", § Measurement, revision 1377274610: https://en.wikipedia.org/w/index.php?title=Cube&oldid=1377274610 — V = a^3.<br>Swedish Wikipedia: articles on the figures and formulas: "Kub", revision 59213216: https://sv.wikipedia.org/w/index.php?title=Kub&oldid=59213216 — Om varje kant har längden a är kubens volym lika med a3<br>Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534): Q812880 (cube) — en label "cube", sv label "kub"<br>Wikidata checks: Q812880 en = cube, Q812880 sv = kub |
| `cube-surface-area` | Surface area of a cube with edge a (en) / Begränsningsarean av en kub med kantlängden a (sv) | 6a² (zxx) | Derivations and SymPy verification for the Solid Memo geometry formulas deck: verify_geometry.py, check "cube-surface-area" — Six faces of ∫∫ 1 over [0, a]² = 6a². symbolic=ok numeric=ok<br>English Wikipedia: articles on the figures and formulas: "Cube", § Measurement, revision 1377274610: https://en.wikipedia.org/w/index.php?title=Cube&oldid=1377274610 — The surface area of a cube A is six times the area of a square: A = 6a^2.<br>Swedish Wikipedia: articles on the figures and formulas: "Begränsningsarea", revision 56407223: https://sv.wikipedia.org/w/index.php?title=Begränsningsarea&oldid=56407223 — En kub vars kant har längden s begränsas av sex kvadratiska begränsningsytor, samtliga med arean s^2\,\!. Begränsningsarean för kuben skrivs därför förenklat 6s^2\,\!.<br>Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534): Q812880 (cube) — en label "cube", sv label "kub"<br>Wikidata checks: Q812880 sv = kub |
| `cube-space-diagonal` | Space diagonal of a cube with edge a (en) / Rymddiagonalen i en kub med kantlängden a (sv) | a√3 (zxx) — *Also written √3·a. A face diagonal is a√2. (en) / Skrivs även √3·a. En sidoytas diagonal är a√2. (sv)* | Derivations and SymPy verification for the Solid Memo geometry formulas deck: verify_geometry.py, check "cube-space-diagonal" — Distance from (0,0,0) to (a,a,a) = a√3. symbolic=ok numeric=ok<br>English Wikipedia: articles on the figures and formulas: "Space diagonal", revision 1367636683: https://en.wikipedia.org/w/index.php?title=Space_diagonal&oldid=1367636683 — in a cube with edge length a, all four space diagonals are axial diagonals, of common length a\sqrt {3}.<br>English Wikipedia: articles on the figures and formulas: "Cube", § Measurement, revision 1377274610: https://en.wikipedia.org/w/index.php?title=Cube&oldid=1377274610 — the space diagonal of the cube is a line connecting two vertices that are not in the same face, formulated as a \sqrt{3}.<br>Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534): Q2737929 (space diagonal) — en label "space diagonal", sv label "rymddiagonal"<br>Wikidata checks: Q2737929 en = space diagonal, Q2737929 sv = rymddiagonal |
| `cuboid-volume` | Volume of a rectangular box with edges a, b and c (en) / Volymen av ett rätblock med kantlängderna a, b och c (sv) | abc (zxx) — *Length · width · height. A rectangular box is also called a rectangular cuboid. (en) / Längd · bredd · höjd. (sv)* | Derivations and SymPy verification for the Solid Memo geometry formulas deck: verify_geometry.py, check "cuboid-volume" — ∫∫∫ 1 over [0, a] × [0, b] × [0, c] = abc. symbolic=ok numeric=ok<br>English Wikipedia: articles on the figures and formulas: "Rectangular cuboid", revision 1359944608: https://en.wikipedia.org/w/index.php?title=Rectangular_cuboid&oldid=1359944608 — If a rectangular cuboid has length a, width b, and height c, then: … Its volume is the product of the rectangular area and its height: V=abc.<br>Swedish Wikipedia: articles on the figures and formulas: "Rätblock", revision 53937550: https://sv.wikipedia.org/w/index.php?title=Rätblock&oldid=53937550 — Volym = längd∙bredd∙höjd = basarean∙höjd<br>Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534): Q262959 (rectangular cuboid) — en label "rectangular cuboid", en alias "box", sv label "rätblock"<br>Wikidata checks: Q262959 en = box, Q262959 sv = rätblock |
| `cuboid-surface-area` | Surface area of a rectangular box with edges a, b and c (en) / Begränsningsarean av ett rätblock med kantlängderna a, b och c (sv) | 2(ab + bc + ac) (zxx) — *Also written 2ab + 2bc + 2ac: two faces of each size. (en) / Skrivs även 2ab + 2bc + 2ac: två sidoytor av varje storlek. (sv)* | Derivations and SymPy verification for the Solid Memo geometry formulas deck: verify_geometry.py, check "cuboid-surface-area" — Two faces each of ab, bc and ac (each ∫∫ 1 over the face) = 2(ab + bc + ac). symbolic=ok numeric=ok<br>English Wikipedia: articles on the figures and formulas: "Rectangular cuboid", revision 1359944608: https://en.wikipedia.org/w/index.php?title=Rectangular_cuboid&oldid=1359944608 — its surface area is the sum of the area of all faces: A=2(ab+ac+bc).<br>Swedish Wikipedia: articles on the figures and formulas: "Begränsningsarea", revision 56407223: https://sv.wikipedia.org/w/index.php?title=Begränsningsarea&oldid=56407223 — Ett rätblock vars kanter har längden a, b respektive c begränsas av sex rektangulära begränsningsytor; två med arean ab, två med arean ac och två med arean bc. Begränsningsarean för rätblocket kan därför förenklat skrivas 2(ab+ac+bc).<br>Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534): Q262959 (rectangular cuboid) — en alias "box", sv label "rätblock"<br>Wikidata checks: Q262959 sv = rätblock |
| `cuboid-space-diagonal` | Space diagonal of a rectangular box with edges a, b and c (en) / Rymddiagonalen i ett rätblock med kantlängderna a, b och c (sv) | √(a² + b² + c²) (zxx) | Derivations and SymPy verification for the Solid Memo geometry formulas deck: verify_geometry.py, check "cuboid-space-diagonal" — Distance from (0,0,0) to (a,b,c) = √(a² + b² + c²). symbolic=ok numeric=ok<br>English Wikipedia: articles on the figures and formulas: "Rectangular cuboid", revision 1359944608: https://en.wikipedia.org/w/index.php?title=Rectangular_cuboid&oldid=1359944608 — its space diagonal can be found by … using the Pythagorean theorem: d=\sqrt{a^2 + b^2 + c^2}.<br>Swedish Wikipedia: articles on the figures and formulas: "Rymddiagonal", revision 49772599: https://sv.wikipedia.org/w/index.php?title=Rymddiagonal&oldid=49772599 — Rymddiagonalen för ett rätblock med sidorna a, b och c är: \sqrt{a^2+b^2+c^2}<br>Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534): Q2737929 (space diagonal) — en label "space diagonal", sv label "rymddiagonal"<br>Wikidata checks: Q2737929 sv = rymddiagonal, Q262959 sv = rätblock |
| `prism-volume` | Volume of a prism with base area B and height h (en) / Volymen av ett prisma med basarean B och höjden h (sv) | Bh (zxx) — *The height is the perpendicular distance between the two bases. (en) / Höjden är det vinkelräta avståndet mellan de två basytorna. (sv)* | Derivations and SymPy verification for the Solid Memo geometry formulas deck: verify_geometry.py, check "prism-volume" — Every cross-section parallel to the base has area B: ∫₀^h B dz = Bh; also a triangular prism with legs a, b: ∫₀^h ½ab dz = ½abh. symbolic=ok numeric=ok<br>English Wikipedia: articles on the figures and formulas: "Prism (geometry)", § Volume, revision 1330525767: https://en.wikipedia.org/w/index.php?title=Prism_(geometry)&oldid=1330525767 — The volume of a prism is the product of the area of the base by the height … V = Bh, where B is the base area and h is the height.<br>Swedish Wikipedia: articles on the figures and formulas: "Prisma (geometri)", revision 53937565: https://sv.wikipedia.org/w/index.php?title=Prisma_(geometri)&oldid=53937565 — Volymen av ett prisma är arean av basen multiplicerat med höjden.<br>Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534): Q180544 (prism) — en label "prism", sv label "prisma"<br>Wikidata checks: Q180544 en = prism, Q180544 sv = prisma |
| `cylinder-volume` | Volume of a cylinder with radius r and height h (en) / Volymen av en cylinder med radien r och höjden h (sv) | πr²h (zxx) — *A circular cylinder: base area πr² times height. (en) / En cirkulär cylinder: basarean πr² gånger höjden. (sv)* | Derivations and SymPy verification for the Solid Memo geometry formulas deck: verify_geometry.py, check "cylinder-volume" — ∫₀^h∫₀^{2π}∫₀^r ρ dρ dφ dz = πr²h. symbolic=ok numeric=ok<br>English Wikipedia: articles on the figures and formulas: "Cylinder", § Volume, revision 1365472311: https://en.wikipedia.org/w/index.php?title=Cylinder&oldid=1365472311 — V = \pi r^2h<br>Swedish Wikipedia: articles on the figures and formulas: "Cylinder", § Volym och yta, revision 57651105: https://sv.wikipedia.org/w/index.php?title=Cylinder&oldid=57651105 — Volymen av en rät cirkulär cylinder med höjden h och radien r är π r2 h.<br>Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534): Q34132 (cylinder) — en label "cylinder", sv label "cylinder"<br>Wikidata checks: Q34132 en = cylinder, Q34132 sv = cylinder |
| `cylinder-lateral-area` | Lateral surface area of a right circular cylinder with radius r and height h (en) / Mantelarean av en rät cirkulär cylinder med radien r och höjden h (sv) | 2πrh (zxx) — *The curved surface only, without the two circular ends. (en) / Bara den välvda ytan, utan de två cirkelformade ändytorna. (sv)* | Derivations and SymPy verification for the Solid Memo geometry formulas deck: verify_geometry.py, check "cylinder-lateral-area" — Surface integral of (r·cos u, r·sin u, v), \|r_u × r_v\| = r, over 0 ≤ u ≤ 2π, 0 ≤ v ≤ h = 2πrh. symbolic=ok numeric=ok<br>English Wikipedia: articles on the figures and formulas: "Lateral surface", § Cylinder, revision 1338033961: https://en.wikipedia.org/w/index.php?title=Lateral_surface&oldid=1338033961 — For a right circular cylinder with radius r and height h … A_lateral = 2πrh<br>Swedish Wikipedia: articles on the figures and formulas: "Mantelyta", revision 55579585: https://sv.wikipedia.org/w/index.php?title=Mantelyta&oldid=55579585 — Storleken av en cirkulär cylinders mantelyta är 2\pi r h, där r är tvärsnittsradien och h är höjden.<br>Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534): Q30090890 (surface area of an open cylinder), P2534 defining formula — L=2 \pi rh; Q6495712 en label "lateral surface", sv label "Mantelyta"<br>Wikidata checks: Q30090890 en = surface area of an open cylinder, Q6495712 en = lateral surface, Q6495712 sv = Mantelyta |
| `cylinder-surface-area` | Total surface area of a right circular cylinder with radius r and height h (en) / Begränsningsarean av en rät cirkulär cylinder med radien r och höjden h (sv) | 2πr² + 2πrh (zxx) — *Also written 2πr(r + h): the two ends plus the lateral surface. (en) / Skrivs även 2πr(r + h): de två ändytorna plus mantelytan. (sv)* | Derivations and SymPy verification for the Solid Memo geometry formulas deck: verify_geometry.py, check "cylinder-surface-area" — Lateral surface integral 2πrh plus two discs of ∫∫ ρ dρ dφ = πr² each = 2πr² + 2πrh; the note's form 2πr(r + h) checked as "note:cylinder-surface-area". symbolic=ok numeric=ok<br>English Wikipedia: articles on the figures and formulas: "Cylinder", § Surface area, revision 1365472311: https://en.wikipedia.org/w/index.php?title=Cylinder&oldid=1365472311 — A = L + 2B = 2\pi rh + 2\pi r^2 = 2 \pi r (h + r) = \pi d (r + h)<br>Swedish Wikipedia: articles on the figures and formulas: "Cylinder", § Volym och yta, revision 57651105: https://sv.wikipedia.org/w/index.php?title=Cylinder&oldid=57651105 — Den totala arean är 2 π r h+2 π r2, det vill säga omkretsen gånger höjden dvs mantelytan plus "botten" och "locket".<br>Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534): Q30090856 (surface area of a closed cylinder), P2534 defining formula — A=2 \pi r(r + h) = \pi d(r + h)=L+2B<br>Wikidata checks: Q30090856 en = surface area of a closed cylinder |
| `pyramid-volume` | Volume of a pyramid with base area B and height h (en) / Volymen av en pyramid med basarean B och höjden h (sv) | Bh/3 (zxx) — *A third of the prism with the same base and height. Also written ⅓Bh. (en) / En tredjedel av prismat med samma bas och höjd. Skrivs även ⅓Bh. (sv)* | Derivations and SymPy verification for the Solid Memo geometry formulas deck: verify_geometry.py, check "pyramid-volume" — The cross-section at height z has area B(1 − z/h)²: ∫₀^h B(1 − z/h)² dz = Bh/3; also a square pyramid with base a²: a²h/3. symbolic=ok numeric=ok<br>English Wikipedia: articles on the figures and formulas: "Pyramid (geometry)", § Mensuration, revision 1378353262: https://en.wikipedia.org/w/index.php?title=Pyramid_(geometry)&oldid=1378353262 — V = \frac{1}{3}Bh.<br>Swedish Wikipedia: articles on the figures and formulas: "Pyramid (geometri)", revision 59651221: https://sv.wikipedia.org/w/index.php?title=Pyramid_(geometri)&oldid=59651221 — Volymen V för en pyramid är V={B \cdot h \over 3}<br>Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534): Q3358290 (pyramid) — en label "pyramid", sv label "pyramid"<br>Wikidata checks: Q3358290 en = pyramid, Q3358290 sv = pyramid |
| `cone-volume` | Volume of a cone with radius r and height h (en) / Volymen av en kon med radien r och höjden h (sv) | πr²h/3 (zxx) — *A third of the cylinder with the same base and height. Also written ⅓πr²h. (en) / En tredjedel av cylindern med samma bas och höjd. Skrivs även ⅓πr²h. (sv)* | Derivations and SymPy verification for the Solid Memo geometry formulas deck: verify_geometry.py, check "cone-volume" — The cross-section at height z is a disc of radius r(1 − z/h): ∫₀^h π(r(1 − z/h))² dz = πr²h/3. symbolic=ok numeric=ok<br>English Wikipedia: articles on the figures and formulas: "Cone", § Volume, revision 1378349736: https://en.wikipedia.org/w/index.php?title=Cone&oldid=1378349736 — V = \frac{1}{3} \pi r^2 h<br>Swedish Wikipedia: articles on the figures and formulas: "Kon", revision 57328450: https://sv.wikipedia.org/w/index.php?title=Kon&oldid=57328450 — Den cirkulära konens volym är V={\pi r^2 h \over 3} där r = radien och h = höjden.<br>Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534): Q42344 (cone) — en label "cone", sv label "kon"<br>Wikidata checks: Q42344 en = cone, Q42344 sv = kon |
| `cone-lateral-area` | Lateral surface area of a right circular cone with radius r and slant height s (en) / Mantelarean av en rät cirkulär kon med radien r och sidan s (sv) | πrs (zxx) — *s = √(r² + h²), where h is the height. (en) / s = √(r² + h²), där h är höjden. (sv)* | Derivations and SymPy verification for the Solid Memo geometry formulas deck: verify_geometry.py, check "cone-lateral-area" — Surface integral of (u·cos v, u·sin v, h(1 − u/r)) over 0 ≤ u ≤ r, 0 ≤ v ≤ 2π = πr√(r² + h²) = πrs, with s = √(r² + h²) (checked as "note:cone-slant-height"). symbolic=ok numeric=ok<br>English Wikipedia: articles on the figures and formulas: "Cone", § Surface area, revision 1378349736: https://en.wikipedia.org/w/index.php?title=Cone&oldid=1378349736 — The lateral surface area of a right circular cone is LSA = \pi r \ell where r is the radius of the circle at the bottom of the cone and \ell is the slant height of the cone.<br>Swedish Wikipedia: articles on the figures and formulas: "Kon", revision 57328450: https://sv.wikipedia.org/w/index.php?title=Kon&oldid=57328450 — Mantelytan är M =\pi r s\, där r = radien och s = avståndet från basytans kant till konens spets. s = \sqrt{r^2 + h^2}<br>Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534): Q96675379 (surface area of an open cone), P2534 defining formula — S=pi*r*s<br>Wikidata checks: Q96675379 en = surface area of an open cone, Q42344 sv = kon |
| `cone-surface-area` | Total surface area of a right circular cone with radius r and slant height s (en) / Begränsningsarean av en rät cirkulär kon med radien r och sidan s (sv) | πr² + πrs (zxx) — *Also written πr(r + s): the base plus the lateral surface. (en) / Skrivs även πr(r + s): basytan plus mantelytan. (sv)* | Derivations and SymPy verification for the Solid Memo geometry formulas deck: verify_geometry.py, check "cone-surface-area" — Lateral surface integral πrs plus the base disc πr² = πr² + πrs; the note's form πr(r + s) checked as "note:cone-surface-area". symbolic=ok numeric=ok<br>English Wikipedia: articles on the figures and formulas: "Cone", § Surface area, revision 1378349736: https://en.wikipedia.org/w/index.php?title=Cone&oldid=1378349736 — Radius and slant height … \pi r^2+\pi r \ell … \pi r(r+\ell) where r is the radius and \ell is the slant height.<br>Swedish Wikipedia: articles on the figures and formulas: "Kon", revision 57328450: https://sv.wikipedia.org/w/index.php?title=Kon&oldid=57328450 — Konens totala area blir alltså: A =\pi r^2 + \pi r s<br>Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534): Q42344 (cone) — en label "cone", sv label "kon"<br>Wikidata checks: Q42344 en = cone |
| `sphere-volume` | Volume of a sphere with radius r (en) / Volymen av ett klot med radien r (sv) | (4/3)πr³ (zxx) — *Also written 4πr³/3. Strictly the volume of the ball the sphere encloses (Swedish: klot). (en) / Skrivs även 4πr³/3. Klotet är den kropp som sfären omsluter. (sv)* | Derivations and SymPy verification for the Solid Memo geometry formulas deck: verify_geometry.py, check "sphere-volume" — ∫₀^{2π}∫₀^π∫₀^r ρ² sin u dρ du dv = 4πr³/3. symbolic=ok numeric=ok<br>English Wikipedia: articles on the figures and formulas: "Sphere", § Enclosed volume, revision 1377691302: https://en.wikipedia.org/w/index.php?title=Sphere&oldid=1377691302 — V = \frac{4}{3}\pi r^3 = \frac{\pi}{6}\ d^3 \approx 0.5236 \cdot d^3<br>Swedish Wikipedia: articles on the figures and formulas: "Klot", revision 56452187: https://sv.wikipedia.org/w/index.php?title=Klot&oldid=56452187 — Klotets volym kan beräknas med formeln V={4\pi r^3\over 3}<br>Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534): Q838611 (ball) — en label "ball", sv label "klot"; Q12507 en label "sphere", sv label "sfär"<br>Wikidata checks: Q838611 sv = klot, Q12507 en = sphere |
| `sphere-surface-area` | Surface area of a sphere with radius r (en) / Arean av en sfär med radien r (sv) | 4πr² (zxx) — *Four times the area of a great circle, πr². (en) / Fyra gånger arean av en storcirkel, πr². (sv)* | Derivations and SymPy verification for the Solid Memo geometry formulas deck: verify_geometry.py, check "sphere-surface-area" — Surface integral of (r sin u cos v, r sin u sin v, r cos u), \|r_u × r_v\| = r² sin u, over 0 ≤ u ≤ π, 0 ≤ v ≤ 2π = 4πr². symbolic=ok numeric=ok<br>English Wikipedia: articles on the figures and formulas: "Sphere", § Surface area, revision 1377691302: https://en.wikipedia.org/w/index.php?title=Sphere&oldid=1377691302 — A = 4\pi r^2.<br>Swedish Wikipedia: articles on the figures and formulas: "Sfär", revision 58511577: https://sv.wikipedia.org/w/index.php?title=Sfär&oldid=58511577 — Sfärens area är A=4\pi \cdot r^{2}<br>Wikidata: items of the geometric figures and theorems, their English and Swedish labels and their defining formulas (P2534): Q12507 (sphere) — en label "sphere", sv label "sfär"<br>Wikidata checks: Q12507 en = sphere, Q12507 sv = sfär |
