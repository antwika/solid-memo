#!/usr/bin/env python3
"""Cross-check what Solid Memo publishes with an independent SHACL engine.

The build validates the deck library and the tests validate the
vocabulary with rdf-validate-shacl (SHACL Core). This script checks the
same published documents with pySHACL, a separate implementation that
also runs SPARQL-based constraints (SkoHub's SKOS best practice has
some), so a disagreement between the engines, or a constraint the
browser's engine cannot run, fails CI (see docs/validation.md):

- DCAT-AP 3 over the built library: dist/decks/index.ttl and every
  release dist/decks/<name>/<n>.ttl, each with the index and the
  reference data (vocab/external.ttl, vocab/topics.ttl) beside it;
- DCAT-AP 3 over a pod catalog document as the app writes it (the
  format-3 fixture tooling/fixtures/deck/v3/valid/pod.ttl);
- SkoHub's SKOS shapes, best practice included, over vocab/v1.ttl and
  vocab/topics.ttl, where warnings fail too.

Solid Memo's own shapes are not run here: they have no targets (the app
picks a subject's shape by its class and format version), which is what
the build and the tests check them with.

Run after `npm run build`:  python3 scripts/shacl_crosscheck.py
"""

from __future__ import annotations

import sys
from pathlib import Path

from pyshacl import validate
from rdflib import Graph

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://solid-memo.com/"


def graph(*documents: tuple[Path, str]) -> Graph:
    """The documents parsed into one graph, each against its own base."""
    merged = Graph()
    for path, base in documents:
        merged.parse(path, format="turtle", publicID=base)
    return merged


def site(path: str) -> tuple[Path, str]:
    """A file of the repository, as the site publishes it."""
    return ROOT / path, SITE + path


def check(label: str, data: Graph, shapes: Graph, *, warnings_fail: bool) -> bool:
    conforms, _, text = validate(
        data,
        shacl_graph=shapes,
        inference="none",
        advanced=True,
        allow_warnings=not warnings_fail,
        allow_infos=True,
    )
    print(f"{'ok  ' if conforms else 'FAIL'} {label}")
    if not conforms:
        print(text)
    return conforms


def main() -> int:
    dist = ROOT / "dist" / "decks"
    if not (dist / "index.ttl").exists():
        print("dist/decks/index.ttl is missing: run `npm run build` first.")
        return 1
    dcat_ap = graph(site("vendor/dcat-ap/3.0.1/dcat-ap-SHACL.ttl"))
    skos = graph(site("vendor/skohub/skos.shacl.ttl"), site("vendor/skohub/skos.bestPractice.shacl.ttl"))
    reference = [site("vocab/external.ttl"), site("vocab/topics.ttl")]
    index = (dist / "index.ttl", SITE + "decks/index.ttl")

    results = [check("decks/index.ttl (DCAT-AP)", graph(index, *reference), dcat_ap, warnings_fail=False)]
    for release in sorted(dist.glob("*/*.ttl")):
        name = release.relative_to(dist).as_posix()
        data = graph((release, f"{SITE}decks/{name}"), index, *reference)
        results.append(check(f"decks/{name} (DCAT-AP)", data, dcat_ap, warnings_fail=False))
    pod = (ROOT / "tooling/fixtures/deck/v3/valid/pod.ttl", "https://pod.example/solid-memo/main/catalog.ttl")
    results.append(check("a pod catalog document (DCAT-AP)", graph(pod, *reference), dcat_ap, warnings_fail=False))
    for vocab in ("vocab/v1.ttl", "vocab/topics.ttl"):
        results.append(check(f"{vocab} (SKOS, best practice)", graph(site(vocab)), skos, warnings_fail=True))
    failed = results.count(False)
    print(f"{len(results) - failed} of {len(results)} documents conform.")
    return 0 if failed == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
