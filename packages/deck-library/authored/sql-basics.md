# SQL basics — provenance report

<!-- Generated from authored/sql-basics.json by scripts/authored_decks.py. Do not edit: change the dossier and rebuild. -->

**Deck:** [`decks/sql-basics.ttl`](../decks/sql-basics.ttl) · **Cards:** 48 · **Licence:** [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) · **Compiled by:** Anton Wiklund · **Created:** 2026-10-04

48 everyday SQL statements: the front describes a task in plain words in English and Swedish, the back is the one statement that does it, on three example tables (customers, products and orders) and in one style: upper-case keywords, AS for aliases, <> for not equal and a closing semicolon. Every statement runs unchanged in both SQLite and PostgreSQL, so rows are limited with LIMIT; FETCH FIRST, which SQLite rejects, is given in a note. Each was run in SQLite 3.53 and PostgreSQL 16 and checked against both projects' documentation.

## Sources

| Source | Creator | Licence | Role | Retrieved | Used for |
|---|---|---|---|---|---|
| [Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database](https://github.com/antwika/solid-memo/blob/main/packages/deck-library/authored/sql-basics.md#queries) | Claude (AI, Anthropic), authoring agent, at Anton Wiklund's direction | [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) | content | 2026-10-04 | The statement on every card: each was run exactly as printed on the card, in a fresh copy of the example database, in SQLite and in PostgreSQL, followed where needed by queries that show its effect; the observed result is the evidence that the statement does what the front says. Also the alternative forms and behaviours named in the notes (section NOTES of the output: FETCH FIRST, OFFSET ... FETCH NEXT, !=, = NULL, LIKE and letter case, ILIKE, AS left out, JOIN without INNER, LEFT OUTER JOIN, ASC, TRUNCATE, ADD without COLUMN, foreign-key enforcement, DROP TABLE IF EXISTS, CREATE UNIQUE INDEX, EXISTS, aggregates in WHERE, VARCHAR, table-constraint forms). |
| [SQL As Understood By SQLite (the SQLite documentation, sqlite.org)](https://www.sqlite.org/lang.html) | D. Richard Hipp and the SQLite developers | Public domain | verification | 2026-10-04 | Confirming for every card that SQLite documents the statement or clause to do what the front says (pages lang_select, lang_expr, lang_aggfunc, lang_insert, lang_update, lang_delete, lang_createtable, lang_altertable, lang_droptable, lang_createindex, lang_dropindex and foreignkeys, fetched on 2026-10-04 with fetch_docs.py, and the statement list lang.html, fetched with fetch.py). Although the documentation is public domain and could be used as content, nothing was taken from it: the fronts, notes and the selection are the authoring agent's own. |
| [PostgreSQL 18 Documentation (postgresql.org/docs/current)](https://www.postgresql.org/docs/current/) | The PostgreSQL Global Development Group | Unknown | verification | 2026-10-04 | Confirming for every card that PostgreSQL documents the statement or clause to do what the front says, and, as background for the deck's choice of forms, what it says about the SQL standard (LIMIT and OFFSET are not standard and SQL:2008 introduced OFFSET ... FETCH FIRST\|NEXT; <> is the standard spelling of not equal; ILIKE is a PostgreSQL extension; the text type is not in the SQL standard). Since the third review round no card states any of these standard facts: the notes give only what the test run showed (pages sql-select, sql-insert, sql-update, sql-delete, sql-truncate, sql-createtable, sql-altertable, sql-droptable, sql-createindex, sql-dropindex, functions-aggregate, functions-matching, functions-comparison, functions-subquery, queries-table-expressions, queries-limit, queries-order, queries-select-lists, fetched on 2026-10-04 with fetch_docs.py, and datatype-character, sql-expressions and functions-comparisons, fetched with fetch.py). The test server was PostgreSQL 16.2; the pages read are for version 18, and nothing cited differs between them for these statements, all of which ran on 16.2. |
| [Microsoft's Swedish documentation: Underfrågor (SQL Server), Beräkningar med fältvärden i SQL-funktioner, Koppla tabeller och frågor](https://learn.microsoft.com/sv-se/sql/relational-databases/performance/subqueries?view=sql-server-ver17) | Microsoft | Unknown | verification | 2026-10-04 | Confirming three Swedish database terms used in the deck, found by the language review (second review round), whose fixes fetched and checked each page on 2026-10-04: 'underfråga' (subquery, https://learn.microsoft.com/sv-se/sql/relational-databases/performance/subqueries?view=sql-server-ver17), 'mängdfunktion' (aggregate function, https://support.microsoft.com/sv-SE/Access/calculating-fields-in-sql-functions) and 'inre koppling' (inner join, https://support.microsoft.com/sv-se/office/koppla-tabeller-och-fr%C3%A5gor-3f5838bd-24a0-4832-9bc1-07061a1478f6). Only single terms were checked; no text was taken. |
| [Wikidata](https://www.wikidata.org/) | Wikidata contributors | [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) | verification | 2026-10-04 | Swedish database terms: the Swedish label of Q934729 (primary key), 'primärnyckel', used on two Swedish fronts and checked by the builder against live Wikidata. Wikidata has no Swedish labels for foreign key (Q1056760), database index (Q580427) or subquery (Q12045831) (queries q1.rq and q2.rq). Of these, 'index' and 'underfråga' are used in the deck and were checked against Swedish Wikipedia and Microsoft's Swedish documentation; foreign key was looked up but no card uses the term. |
| [Swedish Wikipedia: articles Databasnyckel and Structured Query Language](https://sv.wikipedia.org/wiki/Databasnyckel) | Swedish Wikipedia contributors | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | verification | 2026-10-04 | Checking the Swedish database terms used on the fronts (tabell, kolumn, primärnyckel, index) against https://sv.wikipedia.org/wiki/Databasnyckel, and the verbs for the basic statements (hämta, lägga till, ta bort and the pattern 'Sätt ... till ...' for UPDATE) against the examples in https://sv.wikipedia.org/wiki/Structured_Query_Language ('Hämta ut värdena ... från tabellen', 'Lägg till en person i tabellen', 'Sätt värdet namn till ... för alla personer i tabellen', 'Ta bort ...'). Only single terms and ordinary verbs were checked; no sentence or list was taken, so the articles are a verification source and their share-alike licence does not apply to the deck. Both articles have the same licence footer (the Structured Query Language article's was checked by the third review round on 2026-10-04). |

**Content** sources supplied information that is in the cards. **Verification** sources were only consulted to confirm facts: nothing was copied from them.

### Licence evidence

- **Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database** — Written for this deck: the test script run_sql.py and its complete output are reproduced verbatim in the Queries section of this report (the URL above). The script, the example data and the authoring agent's annotations are dedicated to the public domain under CC0 1.0 with the deck. The error messages quoted in the output are the database programs' own (SQLite: public domain, https://www.sqlite.org/copyright.html; PostgreSQL: PostgreSQL Licence, https://www.postgresql.org/about/licence/) and are reproduced only as a factual record of what the programs printed; the deck contains none of them. Running a program and recording which statements it accepts and what they do copies none of its code or documentation.
- **SQL As Understood By SQLite (the SQLite documentation, sqlite.org)** — https://www.sqlite.org/copyright.html (fetched 2026-10-04): "SQLite is in the Public Domain. All of the code and documentation in SQLite has been dedicated to the public domain by the authors." and "Anyone is free to copy, modify, publish, use, compile, sell, or distribute the original SQLite code ... The previous paragraph applies to the deliverable code and documentation in SQLite".
- **PostgreSQL 18 Documentation (postgresql.org/docs/current)** — Licence: the PostgreSQL Licence, a permissive BSD/MIT-style licence, recorded as "unknown" only because the builder has no licence id for it. https://www.postgresql.org/docs/current/legalnotice.html (fetched 2026-10-04): "Portions Copyright © 1996-2026, PostgreSQL Global Development Group ... Permission to use, copy, modify, and distribute this software and its documentation for any purpose, without fee, and without a written agreement is hereby granted, provided that the above copyright notice and this paragraph and the following two paragraphs appear in all copies." Because the licence requires its notice to accompany copies, the documentation is used for verification only: nothing is copied from it.
- **Microsoft's Swedish documentation: Underfrågor (SQL Server), Beräkningar med fältvärden i SQL-funktioner, Koppla tabeller och frågor** — All rights reserved. Microsoft Terms of Use, https://www.microsoft.com/en-us/legal/terms-of-use (fetched 2026-10-04): "Unless otherwise specified, the Services are for your personal and non-commercial use. You may not modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information, software, products or services obtained from the Services." Used for verification only: nothing was copied.
- **Wikidata** — https://www.wikidata.org/wiki/Wikidata:Copyright (fetched 2026-10-04), page footer: "All structured data from the main, Property, Lexeme, and EntitySchema namespaces is available under the Creative Commons CC0 License".
- **Swedish Wikipedia: articles Databasnyckel and Structured Query Language** — Footer of https://sv.wikipedia.org/wiki/Databasnyckel (fetched 2026-10-04): "Wikipedias text är tillgänglig under licensen Creative Commons Erkännande-dela-lika 4.0 Unported."

## Licensing

The deck is CC0 1.0. Its only content source is the authoring agent's own test run of the statements in SQLite and PostgreSQL, whose script and output are reproduced in this report and dedicated to the public domain with the deck; the database programs' messages quoted in the output remain theirs and are reproduced only as a factual record, none of them in the deck. Which statement performs a task is a fact about the language and the programs' behaviour, and running them copies nothing from their code or documentation. The fronts, the notes, the example tables and the selection of tasks are the authoring agent's own wording and choice; SQL keywords and syntax are the language's interface, needed to state the fact at all. The SQLite documentation is in the public domain and would allow any use, but it was used only to verify. The PostgreSQL documentation is under the permissive PostgreSQL Licence, which requires its copyright notice to accompany copies; it was used as a verification source only: no sentence, example or list was copied from it, and no card states a fact that only it supplied (what it says about the SQL standard informed the choice of forms but is not stated on any card; the notes give only what the test run showed). Its licence appears as "Unknown" in the source table only because the builder has no licence id for the PostgreSQL Licence; the licence evidence quotes it. Wikidata (CC0) confirmed one Swedish term, Microsoft's Swedish documentation (all rights reserved) confirmed three single terms and nothing was copied from it, and Swedish Wikipedia (CC BY-SA 4.0) was used only to confirm single Swedish technical terms, which are ordinary vocabulary and not protected expression; no text or selection was taken from it, so its share-alike condition does not reach the deck. No tutorial, textbook or cheat sheet was consulted. No source's licence therefore requires attribution or share-alike, though every source is credited in the deck and this report.

## Method

1. Who did the work: Anton Wiklund compiled this deck with the help of AI agents (Claude, by Anthropic), which did the research, drafting and cross-checking at his direction. The cards were checked by machine (a test run of every statement in SQLite and PostgreSQL, live Wikidata and the app's SHACL and DCAT-AP validators) and in independent review rounds by further Claude agents, each logged under Quality control with its findings and how they were resolved. Anton Wiklund reviews every deck in full before it is released.
2. Candidate tasks: the authoring agent drew up a list of everyday SQL tasks following the editor's brief (SELECT, WHERE, ORDER BY, GROUP BY, HAVING, joins, INSERT, UPDATE, DELETE, CREATE TABLE, ALTER TABLE, DROP TABLE, indexes, DISTINCT, LIMIT, COUNT/SUM/AVG, NULL tests, LIKE, IN, BETWEEN, aliases and subqueries) and wrote a statement for each. The list and the wording are the agent's own; they were not taken from any published tutorial, cheat sheet or list.
3. Example database: every task works on three small tables of the agent's own design, named on the fronts: customers (id, name, email, city, country), products (id, name, category, price) and orders (id, customer_id, total), with 7, 8 and 5 rows. The data were chosen so that each statement's effect is visible and the pitfalls the notes mention actually occur: three customers have no email, one has no city, one name begins with a lower-case a, two customers have no orders, the prices include the boundary value 200, and so on. Table and column names, and the text values in the fronts (Lund, Norway, books, Gustav), are written as on the back; text values are in single quotes on the back.
4. One style (the deck's convention, stated so that each front has one canonical answer): SQL keywords and function names in upper case; table and column names in lower case; one statement per card, on one line, ending with a semicolon; AS written for every column and table alias; <> for not equal; INNER JOIN and LEFT JOIN written in those forms; ascending order not written (ASC is the default), DESC written; in a join condition the column of the table named first comes first; constraints as column constraints (id INTEGER PRIMARY KEY, customer_id INTEGER REFERENCES customers (id)); a space before a parenthesised column list. Above all, every statement must run unchanged in both SQLite and PostgreSQL. This rule decides the two cases where the brief asked for a choice: rows are limited with LIMIT (and OFFSET), which both accept, although it is not standard SQL; the standard OFFSET ... FETCH FIRST|NEXT ... ROWS ONLY works in PostgreSQL but is a syntax error in SQLite, and is given in the notes. Likewise the whole table is emptied with DELETE FROM orders; because SQLite has no TRUNCATE. Equivalent forms that are also correct (!=, AS left out, JOIN without INNER, LEFT OUTER JOIN, ASC, ADD without COLUMN, EXISTS, table constraints) were run too and are named in notes where a learner is likely to meet them.
5. Test run (the content source): the script run_sql.py (reproduced verbatim under Queries) was run on Linux on 2026-10-04 with: uv run --python 3.12 --with pgserver --with "psycopg[binary]" python3 <scratch>/run_sql.py. It uses Python's sqlite3 module (SQLite 3.53.1, the library bundled with the Python 3.12 build that uv installed) and a throwaway PostgreSQL 16.2 server started from the pgserver package's bundled binaries, reached with psycopg. For each card it builds a fresh copy of the example database (an in-memory SQLite database; in PostgreSQL the schema public is dropped and recreated), runs the card's statement exactly as printed on the card, and then runs check queries that show the effect (the changed rows, the remaining rows, the table's columns, the catalogue of indexes, or inserts that must fail). Its last section, NOTES, runs the alternative forms and behaviours named in the notes in both engines. The full output (run-output.txt) is reproduced under Queries; each card's evidence cites its section ("CARD <id>") and what it showed. The card backs in this dossier were generated from the statements the script ran (make_dossier.py asserts that every back is exactly the tested statement).
6. Cross-check (verification sources): for every card the relevant pages of the SQLite documentation (sqlite.org, public domain) and of the PostgreSQL 18 documentation (postgresql.org/docs/current) were downloaded and converted to text with fetch_docs.py and read at the clause used, with the helper scripts grepdocs.py and lines.py (all reproduced under Queries with the pattern files and command lines used); the PostgreSQL character-types page and the licence pages were fetched with fetch.py. The evidence records what each documents. The documentation agreed with the observed behaviour for every card. What the PostgreSQL documentation says about the SQL standard (LIMIT not standard, FETCH FIRST standard since SQL:2008, <> the standard not-equal, ILIKE an extension, TEXT not a standard type) informed the deck's choice of forms; since the ISO standard itself is not freely available, and the PostgreSQL documentation is only a verification source, no card states these facts: the notes say only which engine accepted which form in the test run.
7. Swedish text: the Swedish fronts and notes were written by the authoring agent in its own words. The database terms follow established Swedish usage: 'primärnyckel' is Wikidata's Swedish label for primary key (Q934729, checked by the builder); 'tabell', 'kolumn' and 'index' are the terms of Swedish Wikipedia's article Databasnyckel, and its article Structured Query Language describes the basic statements as hämta, lägga till, sätt ... till and ta bort. Wikidata has no Swedish label for subquery, and a search of Swedish Wikipedia found neither 'underfråga' nor 'delfråga' in this sense (svsearch.py); the fronts use 'underfråga', which the language review confirmed in Microsoft's Swedish documentation (Underfrågor (SQL Server)), where the review also confirmed 'mängdfunktion' (aggregate function) and 'inre koppling' (inner join). Ordinary words were used for the rest (stigande / fallande for ascending / descending, dubbletter, medelvärde, värdelista, intervallvillkor). Table names, column names and data values stay in their English form in both languages, because they are typed literally.
8. Ambiguity checks: each front names the table, the columns, the values and, where SQL offers several constructs, the construct to use ('using a list of values' for IN, 'using one range test' for BETWEEN, 'using a subquery', 'without a WHERE clause' for COUNT(email), 'joining orders to customers on ...'). Pairs that look alike were made distinct: WHERE versus HAVING (where-group-by, having), COUNT(*) versus COUNT(email) versus COUNT(DISTINCT city), INNER versus LEFT JOIN, DELETE FROM orders versus DROP TABLE orders, LIMIT versus LIMIT ... OFFSET. Because the study direction is front to back only, the builder's uniqueness check applies to the fronts, and every front is unique in both languages.
9. Everything was then written into this dossier with make_dossier.py, built with the builder (scripts/authored_decks.py build sql-basics), which also ran the Wikidata check, and validated with the app's SHACL and DCAT-AP validators (scripts/validate_sources.ts sql-basics). The changes made after the review rounds (logged under Quality control) were made directly in this dossier; the card backs, and therefore the tested statements, did not change.

## Selection

48 statements that cover the everyday core of SQL as the editor's brief asked: reading rows (SELECT with * and named columns, DISTINCT, column and table aliases), filtering (=, <>, AND, OR, IN, BETWEEN, LIKE with a prefix and a substring, IS NULL and IS NOT NULL), sorting (ascending, descending, two keys), limiting (LIMIT, LIMIT with OFFSET), aggregates (COUNT(*), COUNT(column), COUNT(DISTINCT), SUM, AVG, MAX), grouping (GROUP BY with COUNT and SUM, HAVING, WHERE with GROUP BY), joins (INNER and LEFT), subqueries (IN and a scalar subquery), changing data (INSERT of one and of two rows, UPDATE of one row and of every row with an expression, DELETE of one row and of all rows) and the schema (CREATE TABLE with a primary key, NOT NULL and a foreign key, ALTER TABLE ADD, RENAME and DROP COLUMN, DROP TABLE, CREATE and DROP INDEX). Left out: statements that do not run unchanged in both SQLite and PostgreSQL (TRUNCATE, FETCH FIRST, ILIKE, which appear only in notes); RIGHT and FULL joins, CROSS JOIN and NATURAL JOIN (less common in everyday use; LEFT JOIN covers the outer-join idea); NOT IN with a subquery (it silently returns no rows when the subquery yields a NULL, a pitfall too large for one card); CASE, UNION, views, transactions, window functions and common table expressions (beyond the basics); MIN, ALTER TABLE RENAME TO, DROP TABLE IF EXISTS and CREATE UNIQUE INDEX as cards of their own (they are mentioned in notes or were dropped to keep the deck near the brief's 45 cards); and any task that could not be phrased so that, under the deck's stated style, exactly one statement answers it.

## Queries

**pgprobe.py: start-up probe of pgserver's bundled PostgreSQL server (prints its version), run once before run_sql.py; it affects no card** (Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database)

```
import pgserver, os, tempfile
d = os.path.join(os.path.dirname(os.path.abspath(__file__)), "pgdata")
srv = pgserver.get_server(d, cleanup_mode="stop")
print(srv.psql("SELECT version();"))

(run as <scratch>/pgprobe.py in a uv environment with pgserver; its exact command line was not recorded)
```

**Test script run_sql.py (run on Linux on 2026-10-04 with: uv run --python 3.12 --with pgserver --with "psycopg[binary]" python3 <scratch>/run_sql.py; it writes run-output.txt next to itself)** (Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database)

```
"""Run every statement of the sql-basics deck in SQLite and in PostgreSQL.

Run with:  uv run --python 3.12 --with pgserver --with "psycopg[binary]" python3 run_sql.py
For each card a fresh database is built from the fixture below (in SQLite an
in-memory database; in PostgreSQL the schema public is dropped and recreated in
a throwaway cluster started by pgserver), the card's statement is run exactly
as it is printed on the card, and then the check queries show its effect.
The section 'NOTES' runs the alternative forms and behaviours named in the
cards' notes. The output is written to run-output.txt next to this script.
"""
import json, os, sqlite3, sys
from decimal import Decimal

import pgserver
import psycopg

HERE = os.path.dirname(os.path.abspath(__file__))

SCHEMA = {
    "customers": "CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT, city TEXT, country TEXT);",
    "products": "CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT NOT NULL, category TEXT, price NUMERIC(10, 2));",
    "orders": "CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER REFERENCES customers (id), total NUMERIC(10, 2));",
}
DATA = {
    "customers": """INSERT INTO customers (id, name, email, city, country) VALUES
 (1, 'Ada', 'ada@example.com', 'Lund', 'Sweden'),
 (2, 'Bo', NULL, 'Malmö', 'Sweden'),
 (3, 'Anna', 'anna@example.org', 'Oslo', 'Norway'),
 (4, 'Carl', 'carl@test.se', 'Lund', 'Sweden'),
 (5, 'Dina', NULL, 'Aarhus', 'Denmark'),
 (6, 'alice', 'alice@mail.fi', 'Helsinki', 'Finland'),
 (7, 'Erik', NULL, NULL, 'Sweden');""",
    "products": """INSERT INTO products (id, name, category, price) VALUES
 (1, 'Atlas', 'books', 150.00),
 (2, 'Novel', 'books', 89.00),
 (3, 'Cookbook', 'books', 120.00),
 (4, 'Lamp', 'home', 200.00),
 (5, 'Mug', 'home', 45.00),
 (6, 'Chair', 'home', 450.00),
 (7, 'Pen', 'office', 12.50),
 (8, 'Desk', 'office', 1200.00);""",
    "orders": """INSERT INTO orders (id, customer_id, total) VALUES
 (1, 1, 100.00), (2, 1, 250.00), (3, 3, 75.50), (4, 4, 300.00), (5, 4, 20.00);""",
}
FIXTURES = {
    "full": ["customers", "products", "orders"],
    "no-orders": ["customers", "products"],
    "empty": [],
}

# (card id, fixture, statement exactly as on the card, check queries)
CARDS = [
    ("select-all", "full", "SELECT * FROM customers;", []),
    ("select-columns", "full", "SELECT name, city FROM customers;", []),
    ("select-distinct", "full", "SELECT DISTINCT city FROM customers;", []),
    ("column-alias", "full", "SELECT name AS customer_name FROM customers;", []),
    ("table-alias", "full", "SELECT c.name FROM customers AS c;", []),
    ("where-equals", "full", "SELECT * FROM customers WHERE city = 'Lund';", []),
    ("where-not-equal", "full", "SELECT * FROM customers WHERE city <> 'Lund';", []),
    ("where-and", "full", "SELECT * FROM products WHERE category = 'books' AND price < 100;", []),
    ("where-or", "full", "SELECT * FROM customers WHERE city = 'Lund' OR country = 'Norway';", []),
    ("in-list", "full", "SELECT * FROM customers WHERE country IN ('Sweden', 'Norway', 'Denmark');", []),
    ("between", "full", "SELECT * FROM products WHERE price BETWEEN 100 AND 200;", []),
    ("like-prefix", "full", "SELECT * FROM customers WHERE name LIKE 'A%';", []),
    ("like-contains", "full", "SELECT * FROM customers WHERE email LIKE '%example%';", []),
    ("is-null", "full", "SELECT * FROM customers WHERE email IS NULL;", []),
    ("is-not-null", "full", "SELECT * FROM customers WHERE email IS NOT NULL;", []),
    ("order-by", "full", "SELECT * FROM customers ORDER BY name;", []),
    ("order-by-desc", "full", "SELECT * FROM products ORDER BY price DESC;", []),
    ("order-by-two", "full", "SELECT * FROM customers ORDER BY country, name;", []),
    ("limit", "full", "SELECT * FROM products ORDER BY price DESC LIMIT 3;", []),
    ("limit-offset", "full", "SELECT * FROM products ORDER BY name LIMIT 3 OFFSET 3;",
     ["SELECT id, name FROM products ORDER BY name;"]),
    ("count-rows", "full", "SELECT COUNT(*) FROM customers;", []),
    ("count-column", "full", "SELECT COUNT(email) FROM customers;", []),
    ("count-distinct", "full", "SELECT COUNT(DISTINCT city) FROM customers;", []),
    ("sum", "full", "SELECT SUM(total) FROM orders;", []),
    ("avg", "full", "SELECT AVG(price) FROM products;", []),
    ("max", "full", "SELECT MAX(price) FROM products;", []),
    ("group-by-count", "full", "SELECT city, COUNT(*) FROM customers GROUP BY city;", []),
    ("group-by-sum", "full", "SELECT customer_id, SUM(total) FROM orders GROUP BY customer_id;", []),
    ("having", "full", "SELECT city, COUNT(*) FROM customers GROUP BY city HAVING COUNT(*) > 1;", []),
    ("where-group-by", "full", "SELECT category, COUNT(*) FROM products WHERE price > 100 GROUP BY category;", []),
    ("inner-join", "full",
     "SELECT orders.id, customers.name FROM orders INNER JOIN customers ON orders.customer_id = customers.id;", []),
    ("left-join", "full",
     "SELECT customers.name, orders.id FROM customers LEFT JOIN orders ON customers.id = orders.customer_id;", []),
    ("subquery-in", "full", "SELECT * FROM customers WHERE id IN (SELECT customer_id FROM orders);", []),
    ("subquery-scalar", "full", "SELECT * FROM products WHERE price > (SELECT AVG(price) FROM products);", []),
    ("insert", "full", "INSERT INTO customers (id, name) VALUES (8, 'Gustav');",
     ["SELECT * FROM customers WHERE id = 8;"]),
    ("insert-many", "full", "INSERT INTO customers (id, name) VALUES (8, 'Gustav'), (9, 'Hanna');",
     ["SELECT * FROM customers WHERE id >= 8 ORDER BY id;"]),
    ("update", "full", "UPDATE customers SET city = 'Lund' WHERE id = 2;",
     ["SELECT id, name, city FROM customers ORDER BY id;"]),
    ("update-expression", "full", "UPDATE products SET price = price * 1.1;",
     ["SELECT id, name, price FROM products ORDER BY id;"]),
    ("delete", "full", "DELETE FROM customers WHERE id = 5;",
     ["SELECT id, name FROM customers ORDER BY id;"]),
    ("delete-all", "full", "DELETE FROM orders;",
     ["SELECT COUNT(*) FROM orders;"]),
    ("create-table", "empty", "CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT NOT NULL);",
     ["INSERT INTO customers (id, name) VALUES (1, 'Ada');",
      "INSERT INTO customers (id, name) VALUES (1, 'Bo');",
      "INSERT INTO customers (id, name) VALUES (2, NULL);",
      "SELECT * FROM customers;"]),
    ("create-table-fk", "no-orders",
     "CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER REFERENCES customers (id));",
     ["INSERT INTO orders (id, customer_id) VALUES (1, 1);",
      "SELECT * FROM orders;"]),
    ("alter-add-column", "full", "ALTER TABLE customers ADD COLUMN phone TEXT;",
     ["SELECT * FROM customers WHERE id = 1;"]),
    ("alter-rename-column", "full", "ALTER TABLE customers RENAME COLUMN name TO full_name;",
     ["SELECT id, full_name FROM customers WHERE id = 1;"]),
    ("alter-drop-column", "full", "ALTER TABLE customers DROP COLUMN email;",
     ["SELECT * FROM customers WHERE id = 1;"]),
    ("drop-table", "full", "DROP TABLE orders;",
     ["SELECT * FROM orders;"]),
    ("create-index", "full", "CREATE INDEX idx_customers_city ON customers (city);",
     ["INDEXES customers"]),
    ("drop-index", "full", "DROP INDEX idx_customers_city;",
     ["INDEXES customers"]),
]
# Card statements that need state the fixture does not have.
PRE = {"drop-index": ["CREATE INDEX idx_customers_city ON customers (city);"]}

# Alternative forms and behaviours named in notes: (label, fixture, statements)
NOTES = [
    ("standard FETCH FIRST instead of LIMIT", "full",
     ["SELECT * FROM products ORDER BY price DESC FETCH FIRST 3 ROWS ONLY;"]),
    ("standard OFFSET ... FETCH NEXT", "full",
     ["SELECT * FROM products ORDER BY name OFFSET 3 ROWS FETCH NEXT 3 ROWS ONLY;"]),
    ("!= as an alternative to <>", "full", ["SELECT * FROM customers WHERE city != 'Lund';"]),
    ("= NULL matches nothing", "full", ["SELECT * FROM customers WHERE email = NULL;"]),
    ("LIKE and letter case (lower-case pattern)", "full", ["SELECT * FROM customers WHERE name LIKE 'a%';"]),
    ("ILIKE (PostgreSQL only)", "full", ["SELECT * FROM customers WHERE name ILIKE 'a%';"]),
    ("AS left out for a column alias", "full", ["SELECT name customer_name FROM customers;"]),
    ("AS left out for a table alias", "full", ["SELECT c.name FROM customers c;"]),
    ("JOIN without INNER", "full",
     ["SELECT orders.id, customers.name FROM orders JOIN customers ON orders.customer_id = customers.id;"]),
    ("LEFT OUTER JOIN spelled out", "full",
     ["SELECT customers.name, orders.id FROM customers LEFT OUTER JOIN orders ON customers.id = orders.customer_id;"]),
    ("ASC written out", "full", ["SELECT * FROM customers ORDER BY name ASC;"]),
    ("BETWEEN equals >= AND <=", "full", ["SELECT * FROM products WHERE price >= 100 AND price <= 200;"]),
    ("COUNT(*) with WHERE email IS NOT NULL", "full",
     ["SELECT COUNT(*) FROM customers WHERE email IS NOT NULL;"]),
    ("MIN", "full", ["SELECT MIN(price) FROM products;"]),
    ("IN equals ORs", "full",
     ["SELECT * FROM customers WHERE country = 'Sweden' OR country = 'Norway' OR country = 'Denmark';"]),
    ("TRUNCATE", "full", ["TRUNCATE orders;", "SELECT COUNT(*) FROM orders;"]),
    ("ADD without COLUMN", "full", ["ALTER TABLE customers ADD phone TEXT;", "SELECT * FROM customers WHERE id = 1;"]),
    ("foreign key not enforced by default in SQLite", "full",
     ["INSERT INTO orders (id, customer_id, total) VALUES (9, 99, 1.00);", "SELECT * FROM orders WHERE id = 9;"]),
    ("foreign key enforced in SQLite after PRAGMA foreign_keys = ON", "full",
     ["PRAGMA foreign_keys = ON;", "INSERT INTO orders (id, customer_id, total) VALUES (9, 99, 1.00);"]),
    ("DROP TABLE on a missing table, then IF EXISTS", "full",
     ["DROP TABLE orders;", "DROP TABLE orders;", "DROP TABLE IF EXISTS orders;"]),
    ("UNIQUE INDEX", "full",
     ["CREATE UNIQUE INDEX idx_customers_email ON customers (email);",
      "INSERT INTO customers (id, name, email) VALUES (8, 'Gustav', 'ada@example.com');"]),
    ("NULLs in GROUP BY and COUNT(DISTINCT)", "full",
     ["SELECT city, COUNT(*) FROM customers WHERE city IS NULL GROUP BY city;"]),
    ("subquery-in with EXISTS", "full",
     ["SELECT * FROM customers WHERE EXISTS (SELECT 1 FROM orders WHERE orders.customer_id = customers.id);"]),
    ("HAVING with WHERE-like use refused in WHERE", "full",
     ["SELECT city, COUNT(*) FROM customers WHERE COUNT(*) > 1 GROUP BY city;"]),
    ("foreign key written as a table constraint", "no-orders",
     ["CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, FOREIGN KEY (customer_id) REFERENCES customers (id));",
      "PRAGMA foreign_keys = ON;",
      "INSERT INTO orders (id, customer_id) VALUES (1, 99);"]),
    ("primary key written as a table constraint", "empty",
     ["CREATE TABLE customers (id INTEGER, name TEXT NOT NULL, PRIMARY KEY (id));",
      "INSERT INTO customers (id, name) VALUES (1, 'Ada');",
      "INSERT INTO customers (id, name) VALUES (1, 'Bo');"]),
    ("VARCHAR instead of TEXT", "empty",
     ["CREATE TABLE customers (id INTEGER PRIMARY KEY, name VARCHAR(100) NOT NULL);"]),
    ("UPDATE without WHERE changes every row", "full",
     ["UPDATE customers SET city = 'Lund';", "SELECT COUNT(*) FROM customers WHERE city = 'Lund';"]),
]


def fmt(v):
    if isinstance(v, Decimal):
        return str(v)
    if isinstance(v, float):
        return repr(v)
    return "NULL" if v is None else str(v)


def show(cols, rows):
    if cols:
        print("    | " + " | ".join(cols))
    for r in rows:
        print("    | " + " | ".join(fmt(v) for v in r))
    print(f"    ({len(rows)} row{'s' if len(rows) != 1 else ''})")


class Lite:
    name = "SQLite " + sqlite3.sqlite_version

    def reset(self, fixture):
        self.db = sqlite3.connect(":memory:", isolation_level=None)
        for t in FIXTURES[fixture]:
            self.db.execute(SCHEMA[t])
            self.db.execute(DATA[t])

    def run(self, sql):
        if sql.startswith("INDEXES "):
            sql = f"SELECT name FROM sqlite_master WHERE type = 'index' AND tbl_name = '{sql.split()[1]}' AND sql IS NOT NULL;"
        try:
            cur = self.db.execute(sql)
            cols = [c[0] for c in cur.description] if cur.description else []
            rows = cur.fetchall()
            if cols:
                show(cols, rows)
            else:
                print(f"    ok ({cur.rowcount} row{'s' if cur.rowcount != 1 else ''} affected)" if cur.rowcount >= 0 else "    ok")
        except sqlite3.Error as e:
            print(f"    ERROR: {e}")


class Pg:
    def __init__(self):
        self.srv = pgserver.get_server(os.path.join(HERE, "pgdata"), cleanup_mode="stop")
        self.conn = psycopg.connect(self.srv.get_uri(), autocommit=True)
        self.name = self.conn.execute("SHOW server_version;").fetchone()[0]
        self.name = "PostgreSQL " + self.name

    def reset(self, fixture):
        self.conn.execute("DROP SCHEMA IF EXISTS public CASCADE;")
        self.conn.execute("CREATE SCHEMA public;")
        for t in FIXTURES[fixture]:
            self.conn.execute(SCHEMA[t])
            self.conn.execute(DATA[t])

    def run(self, sql):
        if sql.startswith("INDEXES "):
            sql = f"SELECT indexname FROM pg_indexes WHERE schemaname = 'public' AND tablename = '{sql.split()[1]}' AND indexname NOT LIKE '%_pkey';"
        try:
            cur = self.conn.execute(sql)
            if cur.description:
                show([c.name for c in cur.description], cur.fetchall())
            else:
                print(f"    ok ({cur.rowcount} row{'s' if cur.rowcount != 1 else ''} affected; {cur.statusmessage})")
        except psycopg.Error as e:
            print(f"    ERROR: {str(e).strip().splitlines()[0]}")


def main():
    engines = [Lite(), Pg()]
    print("Engines: " + "; ".join(e.name for e in engines))
    print("Fixture tables and rows:")
    for t in ("customers", "products", "orders"):
        print("  " + SCHEMA[t])
        print("  " + DATA[t].replace("\n", "\n  "))
    for cid, fixture, stmt, checks in CARDS:
        print(f"\n########## CARD {cid} (fixture: {fixture})")
        for e in engines:
            print(f"--- {e.name}")
            e.reset(fixture)
            for s in PRE.get(cid, []):
                print(f"  (setup) {s}")
                e.run(s)
            print(f"  $ {stmt}")
            e.run(stmt)
            for c in checks:
                print(f"  check $ {c}")
                e.run(c)
    print("\n########## NOTES")
    for label, fixture, stmts in NOTES:
        print(f"\n=== NOTE {label} (fixture: {fixture})")
        for e in engines:
            print(f"--- {e.name}")
            e.reset(fixture)
            for s in stmts:
                print(f"  $ {s}")
                e.run(s)
    json.dump([{"id": c[0], "statement": c[2]} for c in CARDS],
              open(os.path.join(HERE, "statements.json"), "w"), indent=1)


with open(os.path.join(HERE, "run-output.txt"), "w", encoding="utf-8") as out:
    sys.stdout = out
    main()
sys.stdout = sys.__stdout__
print("wrote run-output.txt")
```

**Complete output of run_sql.py (run-output.txt); each card's evidence cites its section** (Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database)

```
Engines: SQLite 3.53.1; PostgreSQL 16.2
Fixture tables and rows:
  CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT, city TEXT, country TEXT);
  INSERT INTO customers (id, name, email, city, country) VALUES
   (1, 'Ada', 'ada@example.com', 'Lund', 'Sweden'),
   (2, 'Bo', NULL, 'Malmö', 'Sweden'),
   (3, 'Anna', 'anna@example.org', 'Oslo', 'Norway'),
   (4, 'Carl', 'carl@test.se', 'Lund', 'Sweden'),
   (5, 'Dina', NULL, 'Aarhus', 'Denmark'),
   (6, 'alice', 'alice@mail.fi', 'Helsinki', 'Finland'),
   (7, 'Erik', NULL, NULL, 'Sweden');
  CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT NOT NULL, category TEXT, price NUMERIC(10, 2));
  INSERT INTO products (id, name, category, price) VALUES
   (1, 'Atlas', 'books', 150.00),
   (2, 'Novel', 'books', 89.00),
   (3, 'Cookbook', 'books', 120.00),
   (4, 'Lamp', 'home', 200.00),
   (5, 'Mug', 'home', 45.00),
   (6, 'Chair', 'home', 450.00),
   (7, 'Pen', 'office', 12.50),
   (8, 'Desk', 'office', 1200.00);
  CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER REFERENCES customers (id), total NUMERIC(10, 2));
  INSERT INTO orders (id, customer_id, total) VALUES
   (1, 1, 100.00), (2, 1, 250.00), (3, 3, 75.50), (4, 4, 300.00), (5, 4, 20.00);

########## CARD select-all (fixture: full)
--- SQLite 3.53.1
  $ SELECT * FROM customers;
    | id | name | email | city | country
    | 1 | Ada | ada@example.com | Lund | Sweden
    | 2 | Bo | NULL | Malmö | Sweden
    | 3 | Anna | anna@example.org | Oslo | Norway
    | 4 | Carl | carl@test.se | Lund | Sweden
    | 5 | Dina | NULL | Aarhus | Denmark
    | 6 | alice | alice@mail.fi | Helsinki | Finland
    | 7 | Erik | NULL | NULL | Sweden
    (7 rows)
--- PostgreSQL 16.2
  $ SELECT * FROM customers;
    | id | name | email | city | country
    | 1 | Ada | ada@example.com | Lund | Sweden
    | 2 | Bo | NULL | Malmö | Sweden
    | 3 | Anna | anna@example.org | Oslo | Norway
    | 4 | Carl | carl@test.se | Lund | Sweden
    | 5 | Dina | NULL | Aarhus | Denmark
    | 6 | alice | alice@mail.fi | Helsinki | Finland
    | 7 | Erik | NULL | NULL | Sweden
    (7 rows)

########## CARD select-columns (fixture: full)
--- SQLite 3.53.1
  $ SELECT name, city FROM customers;
    | name | city
    | Ada | Lund
    | Bo | Malmö
    | Anna | Oslo
    | Carl | Lund
    | Dina | Aarhus
    | alice | Helsinki
    | Erik | NULL
    (7 rows)
--- PostgreSQL 16.2
  $ SELECT name, city FROM customers;
    | name | city
    | Ada | Lund
    | Bo | Malmö
    | Anna | Oslo
    | Carl | Lund
    | Dina | Aarhus
    | alice | Helsinki
    | Erik | NULL
    (7 rows)

########## CARD select-distinct (fixture: full)
--- SQLite 3.53.1
  $ SELECT DISTINCT city FROM customers;
    | city
    | Lund
    | Malmö
    | Oslo
    | Aarhus
    | Helsinki
    | NULL
    (6 rows)
--- PostgreSQL 16.2
  $ SELECT DISTINCT city FROM customers;
    | city
    | NULL
    | Aarhus
    | Helsinki
    | Lund
    | Oslo
    | Malmö
    (6 rows)

########## CARD column-alias (fixture: full)
--- SQLite 3.53.1
  $ SELECT name AS customer_name FROM customers;
    | customer_name
    | Ada
    | Bo
    | Anna
    | Carl
    | Dina
    | alice
    | Erik
    (7 rows)
--- PostgreSQL 16.2
  $ SELECT name AS customer_name FROM customers;
    | customer_name
    | Ada
    | Bo
    | Anna
    | Carl
    | Dina
    | alice
    | Erik
    (7 rows)

########## CARD table-alias (fixture: full)
--- SQLite 3.53.1
  $ SELECT c.name FROM customers AS c;
    | name
    | Ada
    | Bo
    | Anna
    | Carl
    | Dina
    | alice
    | Erik
    (7 rows)
--- PostgreSQL 16.2
  $ SELECT c.name FROM customers AS c;
    | name
    | Ada
    | Bo
    | Anna
    | Carl
    | Dina
    | alice
    | Erik
    (7 rows)

########## CARD where-equals (fixture: full)
--- SQLite 3.53.1
  $ SELECT * FROM customers WHERE city = 'Lund';
    | id | name | email | city | country
    | 1 | Ada | ada@example.com | Lund | Sweden
    | 4 | Carl | carl@test.se | Lund | Sweden
    (2 rows)
--- PostgreSQL 16.2
  $ SELECT * FROM customers WHERE city = 'Lund';
    | id | name | email | city | country
    | 1 | Ada | ada@example.com | Lund | Sweden
    | 4 | Carl | carl@test.se | Lund | Sweden
    (2 rows)

########## CARD where-not-equal (fixture: full)
--- SQLite 3.53.1
  $ SELECT * FROM customers WHERE city <> 'Lund';
    | id | name | email | city | country
    | 2 | Bo | NULL | Malmö | Sweden
    | 3 | Anna | anna@example.org | Oslo | Norway
    | 5 | Dina | NULL | Aarhus | Denmark
    | 6 | alice | alice@mail.fi | Helsinki | Finland
    (4 rows)
--- PostgreSQL 16.2
  $ SELECT * FROM customers WHERE city <> 'Lund';
    | id | name | email | city | country
    | 2 | Bo | NULL | Malmö | Sweden
    | 3 | Anna | anna@example.org | Oslo | Norway
    | 5 | Dina | NULL | Aarhus | Denmark
    | 6 | alice | alice@mail.fi | Helsinki | Finland
    (4 rows)

########## CARD where-and (fixture: full)
--- SQLite 3.53.1
  $ SELECT * FROM products WHERE category = 'books' AND price < 100;
    | id | name | category | price
    | 2 | Novel | books | 89
    (1 row)
--- PostgreSQL 16.2
  $ SELECT * FROM products WHERE category = 'books' AND price < 100;
    | id | name | category | price
    | 2 | Novel | books | 89.00
    (1 row)

########## CARD where-or (fixture: full)
--- SQLite 3.53.1
  $ SELECT * FROM customers WHERE city = 'Lund' OR country = 'Norway';
    | id | name | email | city | country
    | 1 | Ada | ada@example.com | Lund | Sweden
    | 3 | Anna | anna@example.org | Oslo | Norway
    | 4 | Carl | carl@test.se | Lund | Sweden
    (3 rows)
--- PostgreSQL 16.2
  $ SELECT * FROM customers WHERE city = 'Lund' OR country = 'Norway';
    | id | name | email | city | country
    | 1 | Ada | ada@example.com | Lund | Sweden
    | 3 | Anna | anna@example.org | Oslo | Norway
    | 4 | Carl | carl@test.se | Lund | Sweden
    (3 rows)

########## CARD in-list (fixture: full)
--- SQLite 3.53.1
  $ SELECT * FROM customers WHERE country IN ('Sweden', 'Norway', 'Denmark');
    | id | name | email | city | country
    | 1 | Ada | ada@example.com | Lund | Sweden
    | 2 | Bo | NULL | Malmö | Sweden
    | 3 | Anna | anna@example.org | Oslo | Norway
    | 4 | Carl | carl@test.se | Lund | Sweden
    | 5 | Dina | NULL | Aarhus | Denmark
    | 7 | Erik | NULL | NULL | Sweden
    (6 rows)
--- PostgreSQL 16.2
  $ SELECT * FROM customers WHERE country IN ('Sweden', 'Norway', 'Denmark');
    | id | name | email | city | country
    | 1 | Ada | ada@example.com | Lund | Sweden
    | 2 | Bo | NULL | Malmö | Sweden
    | 3 | Anna | anna@example.org | Oslo | Norway
    | 4 | Carl | carl@test.se | Lund | Sweden
    | 5 | Dina | NULL | Aarhus | Denmark
    | 7 | Erik | NULL | NULL | Sweden
    (6 rows)

########## CARD between (fixture: full)
--- SQLite 3.53.1
  $ SELECT * FROM products WHERE price BETWEEN 100 AND 200;
    | id | name | category | price
    | 1 | Atlas | books | 150
    | 3 | Cookbook | books | 120
    | 4 | Lamp | home | 200
    (3 rows)
--- PostgreSQL 16.2
  $ SELECT * FROM products WHERE price BETWEEN 100 AND 200;
    | id | name | category | price
    | 1 | Atlas | books | 150.00
    | 3 | Cookbook | books | 120.00
    | 4 | Lamp | home | 200.00
    (3 rows)

########## CARD like-prefix (fixture: full)
--- SQLite 3.53.1
  $ SELECT * FROM customers WHERE name LIKE 'A%';
    | id | name | email | city | country
    | 1 | Ada | ada@example.com | Lund | Sweden
    | 3 | Anna | anna@example.org | Oslo | Norway
    | 6 | alice | alice@mail.fi | Helsinki | Finland
    (3 rows)
--- PostgreSQL 16.2
  $ SELECT * FROM customers WHERE name LIKE 'A%';
    | id | name | email | city | country
    | 1 | Ada | ada@example.com | Lund | Sweden
    | 3 | Anna | anna@example.org | Oslo | Norway
    (2 rows)

########## CARD like-contains (fixture: full)
--- SQLite 3.53.1
  $ SELECT * FROM customers WHERE email LIKE '%example%';
    | id | name | email | city | country
    | 1 | Ada | ada@example.com | Lund | Sweden
    | 3 | Anna | anna@example.org | Oslo | Norway
    (2 rows)
--- PostgreSQL 16.2
  $ SELECT * FROM customers WHERE email LIKE '%example%';
    | id | name | email | city | country
    | 1 | Ada | ada@example.com | Lund | Sweden
    | 3 | Anna | anna@example.org | Oslo | Norway
    (2 rows)

########## CARD is-null (fixture: full)
--- SQLite 3.53.1
  $ SELECT * FROM customers WHERE email IS NULL;
    | id | name | email | city | country
    | 2 | Bo | NULL | Malmö | Sweden
    | 5 | Dina | NULL | Aarhus | Denmark
    | 7 | Erik | NULL | NULL | Sweden
    (3 rows)
--- PostgreSQL 16.2
  $ SELECT * FROM customers WHERE email IS NULL;
    | id | name | email | city | country
    | 2 | Bo | NULL | Malmö | Sweden
    | 5 | Dina | NULL | Aarhus | Denmark
    | 7 | Erik | NULL | NULL | Sweden
    (3 rows)

########## CARD is-not-null (fixture: full)
--- SQLite 3.53.1
  $ SELECT * FROM customers WHERE email IS NOT NULL;
    | id | name | email | city | country
    | 1 | Ada | ada@example.com | Lund | Sweden
    | 3 | Anna | anna@example.org | Oslo | Norway
    | 4 | Carl | carl@test.se | Lund | Sweden
    | 6 | alice | alice@mail.fi | Helsinki | Finland
    (4 rows)
--- PostgreSQL 16.2
  $ SELECT * FROM customers WHERE email IS NOT NULL;
    | id | name | email | city | country
    | 1 | Ada | ada@example.com | Lund | Sweden
    | 3 | Anna | anna@example.org | Oslo | Norway
    | 4 | Carl | carl@test.se | Lund | Sweden
    | 6 | alice | alice@mail.fi | Helsinki | Finland
    (4 rows)

########## CARD order-by (fixture: full)
--- SQLite 3.53.1
  $ SELECT * FROM customers ORDER BY name;
    | id | name | email | city | country
    | 1 | Ada | ada@example.com | Lund | Sweden
    | 3 | Anna | anna@example.org | Oslo | Norway
    | 2 | Bo | NULL | Malmö | Sweden
    | 4 | Carl | carl@test.se | Lund | Sweden
    | 5 | Dina | NULL | Aarhus | Denmark
    | 7 | Erik | NULL | NULL | Sweden
    | 6 | alice | alice@mail.fi | Helsinki | Finland
    (7 rows)
--- PostgreSQL 16.2
  $ SELECT * FROM customers ORDER BY name;
    | id | name | email | city | country
    | 1 | Ada | ada@example.com | Lund | Sweden
    | 3 | Anna | anna@example.org | Oslo | Norway
    | 2 | Bo | NULL | Malmö | Sweden
    | 4 | Carl | carl@test.se | Lund | Sweden
    | 5 | Dina | NULL | Aarhus | Denmark
    | 7 | Erik | NULL | NULL | Sweden
    | 6 | alice | alice@mail.fi | Helsinki | Finland
    (7 rows)

########## CARD order-by-desc (fixture: full)
--- SQLite 3.53.1
  $ SELECT * FROM products ORDER BY price DESC;
    | id | name | category | price
    | 8 | Desk | office | 1200
    | 6 | Chair | home | 450
    | 4 | Lamp | home | 200
    | 1 | Atlas | books | 150
    | 3 | Cookbook | books | 120
    | 2 | Novel | books | 89
    | 5 | Mug | home | 45
    | 7 | Pen | office | 12.5
    (8 rows)
--- PostgreSQL 16.2
  $ SELECT * FROM products ORDER BY price DESC;
    | id | name | category | price
    | 8 | Desk | office | 1200.00
    | 6 | Chair | home | 450.00
    | 4 | Lamp | home | 200.00
    | 1 | Atlas | books | 150.00
    | 3 | Cookbook | books | 120.00
    | 2 | Novel | books | 89.00
    | 5 | Mug | home | 45.00
    | 7 | Pen | office | 12.50
    (8 rows)

########## CARD order-by-two (fixture: full)
--- SQLite 3.53.1
  $ SELECT * FROM customers ORDER BY country, name;
    | id | name | email | city | country
    | 5 | Dina | NULL | Aarhus | Denmark
    | 6 | alice | alice@mail.fi | Helsinki | Finland
    | 3 | Anna | anna@example.org | Oslo | Norway
    | 1 | Ada | ada@example.com | Lund | Sweden
    | 2 | Bo | NULL | Malmö | Sweden
    | 4 | Carl | carl@test.se | Lund | Sweden
    | 7 | Erik | NULL | NULL | Sweden
    (7 rows)
--- PostgreSQL 16.2
  $ SELECT * FROM customers ORDER BY country, name;
    | id | name | email | city | country
    | 5 | Dina | NULL | Aarhus | Denmark
    | 6 | alice | alice@mail.fi | Helsinki | Finland
    | 3 | Anna | anna@example.org | Oslo | Norway
    | 1 | Ada | ada@example.com | Lund | Sweden
    | 2 | Bo | NULL | Malmö | Sweden
    | 4 | Carl | carl@test.se | Lund | Sweden
    | 7 | Erik | NULL | NULL | Sweden
    (7 rows)

########## CARD limit (fixture: full)
--- SQLite 3.53.1
  $ SELECT * FROM products ORDER BY price DESC LIMIT 3;
    | id | name | category | price
    | 8 | Desk | office | 1200
    | 6 | Chair | home | 450
    | 4 | Lamp | home | 200
    (3 rows)
--- PostgreSQL 16.2
  $ SELECT * FROM products ORDER BY price DESC LIMIT 3;
    | id | name | category | price
    | 8 | Desk | office | 1200.00
    | 6 | Chair | home | 450.00
    | 4 | Lamp | home | 200.00
    (3 rows)

########## CARD limit-offset (fixture: full)
--- SQLite 3.53.1
  $ SELECT * FROM products ORDER BY name LIMIT 3 OFFSET 3;
    | id | name | category | price
    | 8 | Desk | office | 1200
    | 4 | Lamp | home | 200
    | 5 | Mug | home | 45
    (3 rows)
  check $ SELECT id, name FROM products ORDER BY name;
    | id | name
    | 1 | Atlas
    | 6 | Chair
    | 3 | Cookbook
    | 8 | Desk
    | 4 | Lamp
    | 5 | Mug
    | 2 | Novel
    | 7 | Pen
    (8 rows)
--- PostgreSQL 16.2
  $ SELECT * FROM products ORDER BY name LIMIT 3 OFFSET 3;
    | id | name | category | price
    | 8 | Desk | office | 1200.00
    | 4 | Lamp | home | 200.00
    | 5 | Mug | home | 45.00
    (3 rows)
  check $ SELECT id, name FROM products ORDER BY name;
    | id | name
    | 1 | Atlas
    | 6 | Chair
    | 3 | Cookbook
    | 8 | Desk
    | 4 | Lamp
    | 5 | Mug
    | 2 | Novel
    | 7 | Pen
    (8 rows)

########## CARD count-rows (fixture: full)
--- SQLite 3.53.1
  $ SELECT COUNT(*) FROM customers;
    | COUNT(*)
    | 7
    (1 row)
--- PostgreSQL 16.2
  $ SELECT COUNT(*) FROM customers;
    | count
    | 7
    (1 row)

########## CARD count-column (fixture: full)
--- SQLite 3.53.1
  $ SELECT COUNT(email) FROM customers;
    | COUNT(email)
    | 4
    (1 row)
--- PostgreSQL 16.2
  $ SELECT COUNT(email) FROM customers;
    | count
    | 4
    (1 row)

########## CARD count-distinct (fixture: full)
--- SQLite 3.53.1
  $ SELECT COUNT(DISTINCT city) FROM customers;
    | COUNT(DISTINCT city)
    | 5
    (1 row)
--- PostgreSQL 16.2
  $ SELECT COUNT(DISTINCT city) FROM customers;
    | count
    | 5
    (1 row)

########## CARD sum (fixture: full)
--- SQLite 3.53.1
  $ SELECT SUM(total) FROM orders;
    | SUM(total)
    | 745.5
    (1 row)
--- PostgreSQL 16.2
  $ SELECT SUM(total) FROM orders;
    | sum
    | 745.50
    (1 row)

########## CARD avg (fixture: full)
--- SQLite 3.53.1
  $ SELECT AVG(price) FROM products;
    | AVG(price)
    | 283.3125
    (1 row)
--- PostgreSQL 16.2
  $ SELECT AVG(price) FROM products;
    | avg
    | 283.3125000000000000
    (1 row)

########## CARD max (fixture: full)
--- SQLite 3.53.1
  $ SELECT MAX(price) FROM products;
    | MAX(price)
    | 1200
    (1 row)
--- PostgreSQL 16.2
  $ SELECT MAX(price) FROM products;
    | max
    | 1200.00
    (1 row)

########## CARD group-by-count (fixture: full)
--- SQLite 3.53.1
  $ SELECT city, COUNT(*) FROM customers GROUP BY city;
    | city | COUNT(*)
    | NULL | 1
    | Aarhus | 1
    | Helsinki | 1
    | Lund | 2
    | Malmö | 1
    | Oslo | 1
    (6 rows)
--- PostgreSQL 16.2
  $ SELECT city, COUNT(*) FROM customers GROUP BY city;
    | city | count
    | NULL | 1
    | Aarhus | 1
    | Helsinki | 1
    | Lund | 2
    | Oslo | 1
    | Malmö | 1
    (6 rows)

########## CARD group-by-sum (fixture: full)
--- SQLite 3.53.1
  $ SELECT customer_id, SUM(total) FROM orders GROUP BY customer_id;
    | customer_id | SUM(total)
    | 1 | 350
    | 3 | 75.5
    | 4 | 320
    (3 rows)
--- PostgreSQL 16.2
  $ SELECT customer_id, SUM(total) FROM orders GROUP BY customer_id;
    | customer_id | sum
    | 3 | 75.50
    | 4 | 320.00
    | 1 | 350.00
    (3 rows)

########## CARD having (fixture: full)
--- SQLite 3.53.1
  $ SELECT city, COUNT(*) FROM customers GROUP BY city HAVING COUNT(*) > 1;
    | city | COUNT(*)
    | Lund | 2
    (1 row)
--- PostgreSQL 16.2
  $ SELECT city, COUNT(*) FROM customers GROUP BY city HAVING COUNT(*) > 1;
    | city | count
    | Lund | 2
    (1 row)

########## CARD where-group-by (fixture: full)
--- SQLite 3.53.1
  $ SELECT category, COUNT(*) FROM products WHERE price > 100 GROUP BY category;
    | category | COUNT(*)
    | books | 2
    | home | 2
    | office | 1
    (3 rows)
--- PostgreSQL 16.2
  $ SELECT category, COUNT(*) FROM products WHERE price > 100 GROUP BY category;
    | category | count
    | home | 2
    | books | 2
    | office | 1
    (3 rows)

########## CARD inner-join (fixture: full)
--- SQLite 3.53.1
  $ SELECT orders.id, customers.name FROM orders INNER JOIN customers ON orders.customer_id = customers.id;
    | id | name
    | 1 | Ada
    | 2 | Ada
    | 3 | Anna
    | 4 | Carl
    | 5 | Carl
    (5 rows)
--- PostgreSQL 16.2
  $ SELECT orders.id, customers.name FROM orders INNER JOIN customers ON orders.customer_id = customers.id;
    | id | name
    | 1 | Ada
    | 2 | Ada
    | 3 | Anna
    | 4 | Carl
    | 5 | Carl
    (5 rows)

########## CARD left-join (fixture: full)
--- SQLite 3.53.1
  $ SELECT customers.name, orders.id FROM customers LEFT JOIN orders ON customers.id = orders.customer_id;
    | name | id
    | Ada | 1
    | Ada | 2
    | Bo | NULL
    | Anna | 3
    | Carl | 4
    | Carl | 5
    | Dina | NULL
    | alice | NULL
    | Erik | NULL
    (9 rows)
--- PostgreSQL 16.2
  $ SELECT customers.name, orders.id FROM customers LEFT JOIN orders ON customers.id = orders.customer_id;
    | name | id
    | Ada | 1
    | Ada | 2
    | Anna | 3
    | Carl | 4
    | Carl | 5
    | Bo | NULL
    | Dina | NULL
    | alice | NULL
    | Erik | NULL
    (9 rows)

########## CARD subquery-in (fixture: full)
--- SQLite 3.53.1
  $ SELECT * FROM customers WHERE id IN (SELECT customer_id FROM orders);
    | id | name | email | city | country
    | 1 | Ada | ada@example.com | Lund | Sweden
    | 3 | Anna | anna@example.org | Oslo | Norway
    | 4 | Carl | carl@test.se | Lund | Sweden
    (3 rows)
--- PostgreSQL 16.2
  $ SELECT * FROM customers WHERE id IN (SELECT customer_id FROM orders);
    | id | name | email | city | country
    | 1 | Ada | ada@example.com | Lund | Sweden
    | 3 | Anna | anna@example.org | Oslo | Norway
    | 4 | Carl | carl@test.se | Lund | Sweden
    (3 rows)

########## CARD subquery-scalar (fixture: full)
--- SQLite 3.53.1
  $ SELECT * FROM products WHERE price > (SELECT AVG(price) FROM products);
    | id | name | category | price
    | 6 | Chair | home | 450
    | 8 | Desk | office | 1200
    (2 rows)
--- PostgreSQL 16.2
  $ SELECT * FROM products WHERE price > (SELECT AVG(price) FROM products);
    | id | name | category | price
    | 6 | Chair | home | 450.00
    | 8 | Desk | office | 1200.00
    (2 rows)

########## CARD insert (fixture: full)
--- SQLite 3.53.1
  $ INSERT INTO customers (id, name) VALUES (8, 'Gustav');
    ok (1 row affected)
  check $ SELECT * FROM customers WHERE id = 8;
    | id | name | email | city | country
    | 8 | Gustav | NULL | NULL | NULL
    (1 row)
--- PostgreSQL 16.2
  $ INSERT INTO customers (id, name) VALUES (8, 'Gustav');
    ok (1 row affected; INSERT 0 1)
  check $ SELECT * FROM customers WHERE id = 8;
    | id | name | email | city | country
    | 8 | Gustav | NULL | NULL | NULL
    (1 row)

########## CARD insert-many (fixture: full)
--- SQLite 3.53.1
  $ INSERT INTO customers (id, name) VALUES (8, 'Gustav'), (9, 'Hanna');
    ok (2 rows affected)
  check $ SELECT * FROM customers WHERE id >= 8 ORDER BY id;
    | id | name | email | city | country
    | 8 | Gustav | NULL | NULL | NULL
    | 9 | Hanna | NULL | NULL | NULL
    (2 rows)
--- PostgreSQL 16.2
  $ INSERT INTO customers (id, name) VALUES (8, 'Gustav'), (9, 'Hanna');
    ok (2 rows affected; INSERT 0 2)
  check $ SELECT * FROM customers WHERE id >= 8 ORDER BY id;
    | id | name | email | city | country
    | 8 | Gustav | NULL | NULL | NULL
    | 9 | Hanna | NULL | NULL | NULL
    (2 rows)

########## CARD update (fixture: full)
--- SQLite 3.53.1
  $ UPDATE customers SET city = 'Lund' WHERE id = 2;
    ok (1 row affected)
  check $ SELECT id, name, city FROM customers ORDER BY id;
    | id | name | city
    | 1 | Ada | Lund
    | 2 | Bo | Lund
    | 3 | Anna | Oslo
    | 4 | Carl | Lund
    | 5 | Dina | Aarhus
    | 6 | alice | Helsinki
    | 7 | Erik | NULL
    (7 rows)
--- PostgreSQL 16.2
  $ UPDATE customers SET city = 'Lund' WHERE id = 2;
    ok (1 row affected; UPDATE 1)
  check $ SELECT id, name, city FROM customers ORDER BY id;
    | id | name | city
    | 1 | Ada | Lund
    | 2 | Bo | Lund
    | 3 | Anna | Oslo
    | 4 | Carl | Lund
    | 5 | Dina | Aarhus
    | 6 | alice | Helsinki
    | 7 | Erik | NULL
    (7 rows)

########## CARD update-expression (fixture: full)
--- SQLite 3.53.1
  $ UPDATE products SET price = price * 1.1;
    ok (8 rows affected)
  check $ SELECT id, name, price FROM products ORDER BY id;
    | id | name | price
    | 1 | Atlas | 165
    | 2 | Novel | 97.9
    | 3 | Cookbook | 132
    | 4 | Lamp | 220.00000000000003
    | 5 | Mug | 49.50000000000001
    | 6 | Chair | 495.00000000000006
    | 7 | Pen | 13.750000000000002
    | 8 | Desk | 1320
    (8 rows)
--- PostgreSQL 16.2
  $ UPDATE products SET price = price * 1.1;
    ok (8 rows affected; UPDATE 8)
  check $ SELECT id, name, price FROM products ORDER BY id;
    | id | name | price
    | 1 | Atlas | 165.00
    | 2 | Novel | 97.90
    | 3 | Cookbook | 132.00
    | 4 | Lamp | 220.00
    | 5 | Mug | 49.50
    | 6 | Chair | 495.00
    | 7 | Pen | 13.75
    | 8 | Desk | 1320.00
    (8 rows)

########## CARD delete (fixture: full)
--- SQLite 3.53.1
  $ DELETE FROM customers WHERE id = 5;
    ok (1 row affected)
  check $ SELECT id, name FROM customers ORDER BY id;
    | id | name
    | 1 | Ada
    | 2 | Bo
    | 3 | Anna
    | 4 | Carl
    | 6 | alice
    | 7 | Erik
    (6 rows)
--- PostgreSQL 16.2
  $ DELETE FROM customers WHERE id = 5;
    ok (1 row affected; DELETE 1)
  check $ SELECT id, name FROM customers ORDER BY id;
    | id | name
    | 1 | Ada
    | 2 | Bo
    | 3 | Anna
    | 4 | Carl
    | 6 | alice
    | 7 | Erik
    (6 rows)

########## CARD delete-all (fixture: full)
--- SQLite 3.53.1
  $ DELETE FROM orders;
    ok (5 rows affected)
  check $ SELECT COUNT(*) FROM orders;
    | COUNT(*)
    | 0
    (1 row)
--- PostgreSQL 16.2
  $ DELETE FROM orders;
    ok (5 rows affected; DELETE 5)
  check $ SELECT COUNT(*) FROM orders;
    | count
    | 0
    (1 row)

########## CARD create-table (fixture: empty)
--- SQLite 3.53.1
  $ CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT NOT NULL);
    ok
  check $ INSERT INTO customers (id, name) VALUES (1, 'Ada');
    ok (1 row affected)
  check $ INSERT INTO customers (id, name) VALUES (1, 'Bo');
    ERROR: UNIQUE constraint failed: customers.id
  check $ INSERT INTO customers (id, name) VALUES (2, NULL);
    ERROR: NOT NULL constraint failed: customers.name
  check $ SELECT * FROM customers;
    | id | name
    | 1 | Ada
    (1 row)
--- PostgreSQL 16.2
  $ CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT NOT NULL);
    ok (-1 rows affected; CREATE TABLE)
  check $ INSERT INTO customers (id, name) VALUES (1, 'Ada');
    ok (1 row affected; INSERT 0 1)
  check $ INSERT INTO customers (id, name) VALUES (1, 'Bo');
    ERROR: duplicate key value violates unique constraint "customers_pkey"
  check $ INSERT INTO customers (id, name) VALUES (2, NULL);
    ERROR: null value in column "name" of relation "customers" violates not-null constraint
  check $ SELECT * FROM customers;
    | id | name
    | 1 | Ada
    (1 row)

########## CARD create-table-fk (fixture: no-orders)
--- SQLite 3.53.1
  $ CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER REFERENCES customers (id));
    ok
  check $ INSERT INTO orders (id, customer_id) VALUES (1, 1);
    ok (1 row affected)
  check $ SELECT * FROM orders;
    | id | customer_id
    | 1 | 1
    (1 row)
--- PostgreSQL 16.2
  $ CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER REFERENCES customers (id));
    ok (-1 rows affected; CREATE TABLE)
  check $ INSERT INTO orders (id, customer_id) VALUES (1, 1);
    ok (1 row affected; INSERT 0 1)
  check $ SELECT * FROM orders;
    | id | customer_id
    | 1 | 1
    (1 row)

########## CARD alter-add-column (fixture: full)
--- SQLite 3.53.1
  $ ALTER TABLE customers ADD COLUMN phone TEXT;
    ok
  check $ SELECT * FROM customers WHERE id = 1;
    | id | name | email | city | country | phone
    | 1 | Ada | ada@example.com | Lund | Sweden | NULL
    (1 row)
--- PostgreSQL 16.2
  $ ALTER TABLE customers ADD COLUMN phone TEXT;
    ok (-1 rows affected; ALTER TABLE)
  check $ SELECT * FROM customers WHERE id = 1;
    | id | name | email | city | country | phone
    | 1 | Ada | ada@example.com | Lund | Sweden | NULL
    (1 row)

########## CARD alter-rename-column (fixture: full)
--- SQLite 3.53.1
  $ ALTER TABLE customers RENAME COLUMN name TO full_name;
    ok
  check $ SELECT id, full_name FROM customers WHERE id = 1;
    | id | full_name
    | 1 | Ada
    (1 row)
--- PostgreSQL 16.2
  $ ALTER TABLE customers RENAME COLUMN name TO full_name;
    ok (-1 rows affected; ALTER TABLE)
  check $ SELECT id, full_name FROM customers WHERE id = 1;
    | id | full_name
    | 1 | Ada
    (1 row)

########## CARD alter-drop-column (fixture: full)
--- SQLite 3.53.1
  $ ALTER TABLE customers DROP COLUMN email;
    ok
  check $ SELECT * FROM customers WHERE id = 1;
    | id | name | city | country
    | 1 | Ada | Lund | Sweden
    (1 row)
--- PostgreSQL 16.2
  $ ALTER TABLE customers DROP COLUMN email;
    ok (-1 rows affected; ALTER TABLE)
  check $ SELECT * FROM customers WHERE id = 1;
    | id | name | city | country
    | 1 | Ada | Lund | Sweden
    (1 row)

########## CARD drop-table (fixture: full)
--- SQLite 3.53.1
  $ DROP TABLE orders;
    ok
  check $ SELECT * FROM orders;
    ERROR: no such table: orders
--- PostgreSQL 16.2
  $ DROP TABLE orders;
    ok (-1 rows affected; DROP TABLE)
  check $ SELECT * FROM orders;
    ERROR: relation "orders" does not exist

########## CARD create-index (fixture: full)
--- SQLite 3.53.1
  $ CREATE INDEX idx_customers_city ON customers (city);
    ok
  check $ INDEXES customers
    | name
    | idx_customers_city
    (1 row)
--- PostgreSQL 16.2
  $ CREATE INDEX idx_customers_city ON customers (city);
    ok (-1 rows affected; CREATE INDEX)
  check $ INDEXES customers
    | indexname
    | idx_customers_city
    (1 row)

########## CARD drop-index (fixture: full)
--- SQLite 3.53.1
  (setup) CREATE INDEX idx_customers_city ON customers (city);
    ok
  $ DROP INDEX idx_customers_city;
    ok
  check $ INDEXES customers
    | name
    (0 rows)
--- PostgreSQL 16.2
  (setup) CREATE INDEX idx_customers_city ON customers (city);
    ok (-1 rows affected; CREATE INDEX)
  $ DROP INDEX idx_customers_city;
    ok (-1 rows affected; DROP INDEX)
  check $ INDEXES customers
    | indexname
    (0 rows)

########## NOTES

=== NOTE standard FETCH FIRST instead of LIMIT (fixture: full)
--- SQLite 3.53.1
  $ SELECT * FROM products ORDER BY price DESC FETCH FIRST 3 ROWS ONLY;
    ERROR: near "FETCH": syntax error
--- PostgreSQL 16.2
  $ SELECT * FROM products ORDER BY price DESC FETCH FIRST 3 ROWS ONLY;
    | id | name | category | price
    | 8 | Desk | office | 1200.00
    | 6 | Chair | home | 450.00
    | 4 | Lamp | home | 200.00
    (3 rows)

=== NOTE standard OFFSET ... FETCH NEXT (fixture: full)
--- SQLite 3.53.1
  $ SELECT * FROM products ORDER BY name OFFSET 3 ROWS FETCH NEXT 3 ROWS ONLY;
    ERROR: near "OFFSET": syntax error
--- PostgreSQL 16.2
  $ SELECT * FROM products ORDER BY name OFFSET 3 ROWS FETCH NEXT 3 ROWS ONLY;
    | id | name | category | price
    | 8 | Desk | office | 1200.00
    | 4 | Lamp | home | 200.00
    | 5 | Mug | home | 45.00
    (3 rows)

=== NOTE != as an alternative to <> (fixture: full)
--- SQLite 3.53.1
  $ SELECT * FROM customers WHERE city != 'Lund';
    | id | name | email | city | country
    | 2 | Bo | NULL | Malmö | Sweden
    | 3 | Anna | anna@example.org | Oslo | Norway
    | 5 | Dina | NULL | Aarhus | Denmark
    | 6 | alice | alice@mail.fi | Helsinki | Finland
    (4 rows)
--- PostgreSQL 16.2
  $ SELECT * FROM customers WHERE city != 'Lund';
    | id | name | email | city | country
    | 2 | Bo | NULL | Malmö | Sweden
    | 3 | Anna | anna@example.org | Oslo | Norway
    | 5 | Dina | NULL | Aarhus | Denmark
    | 6 | alice | alice@mail.fi | Helsinki | Finland
    (4 rows)

=== NOTE = NULL matches nothing (fixture: full)
--- SQLite 3.53.1
  $ SELECT * FROM customers WHERE email = NULL;
    | id | name | email | city | country
    (0 rows)
--- PostgreSQL 16.2
  $ SELECT * FROM customers WHERE email = NULL;
    | id | name | email | city | country
    (0 rows)

=== NOTE LIKE and letter case (lower-case pattern) (fixture: full)
--- SQLite 3.53.1
  $ SELECT * FROM customers WHERE name LIKE 'a%';
    | id | name | email | city | country
    | 1 | Ada | ada@example.com | Lund | Sweden
    | 3 | Anna | anna@example.org | Oslo | Norway
    | 6 | alice | alice@mail.fi | Helsinki | Finland
    (3 rows)
--- PostgreSQL 16.2
  $ SELECT * FROM customers WHERE name LIKE 'a%';
    | id | name | email | city | country
    | 6 | alice | alice@mail.fi | Helsinki | Finland
    (1 row)

=== NOTE ILIKE (PostgreSQL only) (fixture: full)
--- SQLite 3.53.1
  $ SELECT * FROM customers WHERE name ILIKE 'a%';
    ERROR: near "ILIKE": syntax error
--- PostgreSQL 16.2
  $ SELECT * FROM customers WHERE name ILIKE 'a%';
    | id | name | email | city | country
    | 1 | Ada | ada@example.com | Lund | Sweden
    | 3 | Anna | anna@example.org | Oslo | Norway
    | 6 | alice | alice@mail.fi | Helsinki | Finland
    (3 rows)

=== NOTE AS left out for a column alias (fixture: full)
--- SQLite 3.53.1
  $ SELECT name customer_name FROM customers;
    | customer_name
    | Ada
    | Bo
    | Anna
    | Carl
    | Dina
    | alice
    | Erik
    (7 rows)
--- PostgreSQL 16.2
  $ SELECT name customer_name FROM customers;
    | customer_name
    | Ada
    | Bo
    | Anna
    | Carl
    | Dina
    | alice
    | Erik
    (7 rows)

=== NOTE AS left out for a table alias (fixture: full)
--- SQLite 3.53.1
  $ SELECT c.name FROM customers c;
    | name
    | Ada
    | Bo
    | Anna
    | Carl
    | Dina
    | alice
    | Erik
    (7 rows)
--- PostgreSQL 16.2
  $ SELECT c.name FROM customers c;
    | name
    | Ada
    | Bo
    | Anna
    | Carl
    | Dina
    | alice
    | Erik
    (7 rows)

=== NOTE JOIN without INNER (fixture: full)
--- SQLite 3.53.1
  $ SELECT orders.id, customers.name FROM orders JOIN customers ON orders.customer_id = customers.id;
    | id | name
    | 1 | Ada
    | 2 | Ada
    | 3 | Anna
    | 4 | Carl
    | 5 | Carl
    (5 rows)
--- PostgreSQL 16.2
  $ SELECT orders.id, customers.name FROM orders JOIN customers ON orders.customer_id = customers.id;
    | id | name
    | 1 | Ada
    | 2 | Ada
    | 3 | Anna
    | 4 | Carl
    | 5 | Carl
    (5 rows)

=== NOTE LEFT OUTER JOIN spelled out (fixture: full)
--- SQLite 3.53.1
  $ SELECT customers.name, orders.id FROM customers LEFT OUTER JOIN orders ON customers.id = orders.customer_id;
    | name | id
    | Ada | 1
    | Ada | 2
    | Bo | NULL
    | Anna | 3
    | Carl | 4
    | Carl | 5
    | Dina | NULL
    | alice | NULL
    | Erik | NULL
    (9 rows)
--- PostgreSQL 16.2
  $ SELECT customers.name, orders.id FROM customers LEFT OUTER JOIN orders ON customers.id = orders.customer_id;
    | name | id
    | Ada | 1
    | Ada | 2
    | Anna | 3
    | Carl | 4
    | Carl | 5
    | Bo | NULL
    | Dina | NULL
    | alice | NULL
    | Erik | NULL
    (9 rows)

=== NOTE ASC written out (fixture: full)
--- SQLite 3.53.1
  $ SELECT * FROM customers ORDER BY name ASC;
    | id | name | email | city | country
    | 1 | Ada | ada@example.com | Lund | Sweden
    | 3 | Anna | anna@example.org | Oslo | Norway
    | 2 | Bo | NULL | Malmö | Sweden
    | 4 | Carl | carl@test.se | Lund | Sweden
    | 5 | Dina | NULL | Aarhus | Denmark
    | 7 | Erik | NULL | NULL | Sweden
    | 6 | alice | alice@mail.fi | Helsinki | Finland
    (7 rows)
--- PostgreSQL 16.2
  $ SELECT * FROM customers ORDER BY name ASC;
    | id | name | email | city | country
    | 1 | Ada | ada@example.com | Lund | Sweden
    | 3 | Anna | anna@example.org | Oslo | Norway
    | 2 | Bo | NULL | Malmö | Sweden
    | 4 | Carl | carl@test.se | Lund | Sweden
    | 5 | Dina | NULL | Aarhus | Denmark
    | 7 | Erik | NULL | NULL | Sweden
    | 6 | alice | alice@mail.fi | Helsinki | Finland
    (7 rows)

=== NOTE BETWEEN equals >= AND <= (fixture: full)
--- SQLite 3.53.1
  $ SELECT * FROM products WHERE price >= 100 AND price <= 200;
    | id | name | category | price
    | 1 | Atlas | books | 150
    | 3 | Cookbook | books | 120
    | 4 | Lamp | home | 200
    (3 rows)
--- PostgreSQL 16.2
  $ SELECT * FROM products WHERE price >= 100 AND price <= 200;
    | id | name | category | price
    | 1 | Atlas | books | 150.00
    | 3 | Cookbook | books | 120.00
    | 4 | Lamp | home | 200.00
    (3 rows)

=== NOTE COUNT(*) with WHERE email IS NOT NULL (fixture: full)
--- SQLite 3.53.1
  $ SELECT COUNT(*) FROM customers WHERE email IS NOT NULL;
    | COUNT(*)
    | 4
    (1 row)
--- PostgreSQL 16.2
  $ SELECT COUNT(*) FROM customers WHERE email IS NOT NULL;
    | count
    | 4
    (1 row)

=== NOTE MIN (fixture: full)
--- SQLite 3.53.1
  $ SELECT MIN(price) FROM products;
    | MIN(price)
    | 12.5
    (1 row)
--- PostgreSQL 16.2
  $ SELECT MIN(price) FROM products;
    | min
    | 12.50
    (1 row)

=== NOTE IN equals ORs (fixture: full)
--- SQLite 3.53.1
  $ SELECT * FROM customers WHERE country = 'Sweden' OR country = 'Norway' OR country = 'Denmark';
    | id | name | email | city | country
    | 1 | Ada | ada@example.com | Lund | Sweden
    | 2 | Bo | NULL | Malmö | Sweden
    | 3 | Anna | anna@example.org | Oslo | Norway
    | 4 | Carl | carl@test.se | Lund | Sweden
    | 5 | Dina | NULL | Aarhus | Denmark
    | 7 | Erik | NULL | NULL | Sweden
    (6 rows)
--- PostgreSQL 16.2
  $ SELECT * FROM customers WHERE country = 'Sweden' OR country = 'Norway' OR country = 'Denmark';
    | id | name | email | city | country
    | 1 | Ada | ada@example.com | Lund | Sweden
    | 2 | Bo | NULL | Malmö | Sweden
    | 3 | Anna | anna@example.org | Oslo | Norway
    | 4 | Carl | carl@test.se | Lund | Sweden
    | 5 | Dina | NULL | Aarhus | Denmark
    | 7 | Erik | NULL | NULL | Sweden
    (6 rows)

=== NOTE TRUNCATE (fixture: full)
--- SQLite 3.53.1
  $ TRUNCATE orders;
    ERROR: near "TRUNCATE": syntax error
  $ SELECT COUNT(*) FROM orders;
    | COUNT(*)
    | 5
    (1 row)
--- PostgreSQL 16.2
  $ TRUNCATE orders;
    ok (-1 rows affected; TRUNCATE TABLE)
  $ SELECT COUNT(*) FROM orders;
    | count
    | 0
    (1 row)

=== NOTE ADD without COLUMN (fixture: full)
--- SQLite 3.53.1
  $ ALTER TABLE customers ADD phone TEXT;
    ok
  $ SELECT * FROM customers WHERE id = 1;
    | id | name | email | city | country | phone
    | 1 | Ada | ada@example.com | Lund | Sweden | NULL
    (1 row)
--- PostgreSQL 16.2
  $ ALTER TABLE customers ADD phone TEXT;
    ok (-1 rows affected; ALTER TABLE)
  $ SELECT * FROM customers WHERE id = 1;
    | id | name | email | city | country | phone
    | 1 | Ada | ada@example.com | Lund | Sweden | NULL
    (1 row)

=== NOTE foreign key not enforced by default in SQLite (fixture: full)
--- SQLite 3.53.1
  $ INSERT INTO orders (id, customer_id, total) VALUES (9, 99, 1.00);
    ok (1 row affected)
  $ SELECT * FROM orders WHERE id = 9;
    | id | customer_id | total
    | 9 | 99 | 1
    (1 row)
--- PostgreSQL 16.2
  $ INSERT INTO orders (id, customer_id, total) VALUES (9, 99, 1.00);
    ERROR: insert or update on table "orders" violates foreign key constraint "orders_customer_id_fkey"
  $ SELECT * FROM orders WHERE id = 9;
    | id | customer_id | total
    (0 rows)

=== NOTE foreign key enforced in SQLite after PRAGMA foreign_keys = ON (fixture: full)
--- SQLite 3.53.1
  $ PRAGMA foreign_keys = ON;
    ok
  $ INSERT INTO orders (id, customer_id, total) VALUES (9, 99, 1.00);
    ERROR: FOREIGN KEY constraint failed
--- PostgreSQL 16.2
  $ PRAGMA foreign_keys = ON;
    ERROR: syntax error at or near "PRAGMA"
  $ INSERT INTO orders (id, customer_id, total) VALUES (9, 99, 1.00);
    ERROR: insert or update on table "orders" violates foreign key constraint "orders_customer_id_fkey"

=== NOTE DROP TABLE on a missing table, then IF EXISTS (fixture: full)
--- SQLite 3.53.1
  $ DROP TABLE orders;
    ok
  $ DROP TABLE orders;
    ERROR: no such table: orders
  $ DROP TABLE IF EXISTS orders;
    ok
--- PostgreSQL 16.2
  $ DROP TABLE orders;
    ok (-1 rows affected; DROP TABLE)
  $ DROP TABLE orders;
    ERROR: table "orders" does not exist
  $ DROP TABLE IF EXISTS orders;
    ok (-1 rows affected; DROP TABLE)

=== NOTE UNIQUE INDEX (fixture: full)
--- SQLite 3.53.1
  $ CREATE UNIQUE INDEX idx_customers_email ON customers (email);
    ok
  $ INSERT INTO customers (id, name, email) VALUES (8, 'Gustav', 'ada@example.com');
    ERROR: UNIQUE constraint failed: customers.email
--- PostgreSQL 16.2
  $ CREATE UNIQUE INDEX idx_customers_email ON customers (email);
    ok (-1 rows affected; CREATE INDEX)
  $ INSERT INTO customers (id, name, email) VALUES (8, 'Gustav', 'ada@example.com');
    ERROR: duplicate key value violates unique constraint "idx_customers_email"

=== NOTE NULLs in GROUP BY and COUNT(DISTINCT) (fixture: full)
--- SQLite 3.53.1
  $ SELECT city, COUNT(*) FROM customers WHERE city IS NULL GROUP BY city;
    | city | COUNT(*)
    | NULL | 1
    (1 row)
--- PostgreSQL 16.2
  $ SELECT city, COUNT(*) FROM customers WHERE city IS NULL GROUP BY city;
    | city | count
    | NULL | 1
    (1 row)

=== NOTE subquery-in with EXISTS (fixture: full)
--- SQLite 3.53.1
  $ SELECT * FROM customers WHERE EXISTS (SELECT 1 FROM orders WHERE orders.customer_id = customers.id);
    | id | name | email | city | country
    | 1 | Ada | ada@example.com | Lund | Sweden
    | 3 | Anna | anna@example.org | Oslo | Norway
    | 4 | Carl | carl@test.se | Lund | Sweden
    (3 rows)
--- PostgreSQL 16.2
  $ SELECT * FROM customers WHERE EXISTS (SELECT 1 FROM orders WHERE orders.customer_id = customers.id);
    | id | name | email | city | country
    | 1 | Ada | ada@example.com | Lund | Sweden
    | 3 | Anna | anna@example.org | Oslo | Norway
    | 4 | Carl | carl@test.se | Lund | Sweden
    (3 rows)

=== NOTE HAVING with WHERE-like use refused in WHERE (fixture: full)
--- SQLite 3.53.1
  $ SELECT city, COUNT(*) FROM customers WHERE COUNT(*) > 1 GROUP BY city;
    ERROR: misuse of aggregate: COUNT()
--- PostgreSQL 16.2
  $ SELECT city, COUNT(*) FROM customers WHERE COUNT(*) > 1 GROUP BY city;
    ERROR: aggregate functions are not allowed in WHERE

=== NOTE foreign key written as a table constraint (fixture: no-orders)
--- SQLite 3.53.1
  $ CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, FOREIGN KEY (customer_id) REFERENCES customers (id));
    ok
  $ PRAGMA foreign_keys = ON;
    ok
  $ INSERT INTO orders (id, customer_id) VALUES (1, 99);
    ERROR: FOREIGN KEY constraint failed
--- PostgreSQL 16.2
  $ CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, FOREIGN KEY (customer_id) REFERENCES customers (id));
    ok (-1 rows affected; CREATE TABLE)
  $ PRAGMA foreign_keys = ON;
    ERROR: syntax error at or near "PRAGMA"
  $ INSERT INTO orders (id, customer_id) VALUES (1, 99);
    ERROR: insert or update on table "orders" violates foreign key constraint "orders_customer_id_fkey"

=== NOTE primary key written as a table constraint (fixture: empty)
--- SQLite 3.53.1
  $ CREATE TABLE customers (id INTEGER, name TEXT NOT NULL, PRIMARY KEY (id));
    ok
  $ INSERT INTO customers (id, name) VALUES (1, 'Ada');
    ok (1 row affected)
  $ INSERT INTO customers (id, name) VALUES (1, 'Bo');
    ERROR: UNIQUE constraint failed: customers.id
--- PostgreSQL 16.2
  $ CREATE TABLE customers (id INTEGER, name TEXT NOT NULL, PRIMARY KEY (id));
    ok (-1 rows affected; CREATE TABLE)
  $ INSERT INTO customers (id, name) VALUES (1, 'Ada');
    ok (1 row affected; INSERT 0 1)
  $ INSERT INTO customers (id, name) VALUES (1, 'Bo');
    ERROR: duplicate key value violates unique constraint "customers_pkey"

=== NOTE VARCHAR instead of TEXT (fixture: empty)
--- SQLite 3.53.1
  $ CREATE TABLE customers (id INTEGER PRIMARY KEY, name VARCHAR(100) NOT NULL);
    ok
--- PostgreSQL 16.2
  $ CREATE TABLE customers (id INTEGER PRIMARY KEY, name VARCHAR(100) NOT NULL);
    ok (-1 rows affected; CREATE TABLE)

=== NOTE UPDATE without WHERE changes every row (fixture: full)
--- SQLite 3.53.1
  $ UPDATE customers SET city = 'Lund';
    ok (7 rows affected)
  $ SELECT COUNT(*) FROM customers WHERE city = 'Lund';
    | COUNT(*)
    | 7
    (1 row)
--- PostgreSQL 16.2
  $ UPDATE customers SET city = 'Lund';
    ok (7 rows affected; UPDATE 7)
  $ SELECT COUNT(*) FROM customers WHERE city = 'Lund';
    | count
    | 7
    (1 row)
```

**make_dossier.py checks that the card backs are exactly the tested statements (statements.json, written by run_sql.py); make_dossier.py only assembles the dossier from the texts shown in it and makes this assertion. Later changes from the review rounds were made directly in the dossier** (Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database)

```
python3 <scratch>/make_dossier.py   (assert [c[0] for c in CARDS] == list(statements); back = {"zxx": statements[cid]})
```

**fetch_docs.py: download the SQLite and PostgreSQL documentation pages and licence pages used, and convert them to text (run with: python3 <scratch>/fetch_docs.py)** (SQL As Understood By SQLite (the SQLite documentation, sqlite.org))

```
"""Fetch the documentation and licence pages used by the sql-basics deck, save the
raw HTML in docs/ and a plain-text conversion next to it (docs/<name>.txt)."""
import html, os, re, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
DOCS = os.path.join(HERE, "docs")
os.makedirs(DOCS, exist_ok=True)
UA = "solid-memo deck research (https://github.com/antwika/solid-memo)"
PAGES = {
    "sqlite-copyright": "https://www.sqlite.org/copyright.html",
    "sqlite-select": "https://www.sqlite.org/lang_select.html",
    "sqlite-expr": "https://www.sqlite.org/lang_expr.html",
    "sqlite-aggfunc": "https://www.sqlite.org/lang_aggfunc.html",
    "sqlite-insert": "https://www.sqlite.org/lang_insert.html",
    "sqlite-update": "https://www.sqlite.org/lang_update.html",
    "sqlite-delete": "https://www.sqlite.org/lang_delete.html",
    "sqlite-createtable": "https://www.sqlite.org/lang_createtable.html",
    "sqlite-altertable": "https://www.sqlite.org/lang_altertable.html",
    "sqlite-droptable": "https://www.sqlite.org/lang_droptable.html",
    "sqlite-createindex": "https://www.sqlite.org/lang_createindex.html",
    "sqlite-dropindex": "https://www.sqlite.org/lang_dropindex.html",
    "sqlite-foreignkeys": "https://www.sqlite.org/foreignkeys.html",
    "sqlite-nulls": "https://www.sqlite.org/nulls.html",
    "pg-legalnotice": "https://www.postgresql.org/docs/current/legalnotice.html",
    "pg-licence": "https://www.postgresql.org/about/licence/",
    "pg-select": "https://www.postgresql.org/docs/current/sql-select.html",
    "pg-insert": "https://www.postgresql.org/docs/current/sql-insert.html",
    "pg-update": "https://www.postgresql.org/docs/current/sql-update.html",
    "pg-delete": "https://www.postgresql.org/docs/current/sql-delete.html",
    "pg-truncate": "https://www.postgresql.org/docs/current/sql-truncate.html",
    "pg-createtable": "https://www.postgresql.org/docs/current/sql-createtable.html",
    "pg-altertable": "https://www.postgresql.org/docs/current/sql-altertable.html",
    "pg-droptable": "https://www.postgresql.org/docs/current/sql-droptable.html",
    "pg-createindex": "https://www.postgresql.org/docs/current/sql-createindex.html",
    "pg-dropindex": "https://www.postgresql.org/docs/current/sql-dropindex.html",
    "pg-functions-aggregate": "https://www.postgresql.org/docs/current/functions-aggregate.html",
    "pg-functions-matching": "https://www.postgresql.org/docs/current/functions-matching.html",
    "pg-functions-comparison": "https://www.postgresql.org/docs/current/functions-comparison.html",
    "pg-functions-subquery": "https://www.postgresql.org/docs/current/functions-subquery.html",
    "pg-queries-table-expressions": "https://www.postgresql.org/docs/current/queries-table-expressions.html",
    "pg-queries-limit": "https://www.postgresql.org/docs/current/queries-limit.html",
    "pg-queries-order": "https://www.postgresql.org/docs/current/queries-order.html",
    "pg-queries-select-lists": "https://www.postgresql.org/docs/current/queries-select-lists.html",
}


def text(raw: str) -> str:
    raw = re.sub(r"(?is)<(script|style).*?</\1>", " ", raw)
    raw = re.sub(r"(?i)<br\s*/?>|</p>|</div>|</h\d>|</li>|</tr>|</pre>|</dt>|</dd>", "\n", raw)
    raw = re.sub(r"<[^>]+>", "", raw)
    raw = html.unescape(raw)
    raw = re.sub(r"[ \t\r\f\v]+", " ", raw)
    return re.sub(r"\n\s*\n+", "\n", raw)


for name, url in PAGES.items():
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as r:
        raw = r.read().decode("utf-8", "replace")
    open(os.path.join(DOCS, name + ".html"), "w", encoding="utf-8").write(raw)
    open(os.path.join(DOCS, name + ".txt"), "w", encoding="utf-8").write(text(raw))
    print(name, url, len(raw))
```

**grepdocs.py: print the lines of the converted pages that match patterns (run with: python3 <scratch>/grepdocs.py @<scratch>/patterns1.txt, then patterns2.txt and patterns3.txt, and python3 <scratch>/grepdocs.py sqlite-select "ascending|DESC keyword" "AS keyword|column-alias" "inner join|INNER JOIN" "ORDER BY expression")** (SQL As Understood By SQLite (the SQLite documentation, sqlite.org))

```
"""Print the lines of a converted documentation page (docs/<name>.txt) that match a pattern,
with one line of context after each: python3 grepdocs.py <name> <regex> [<regex>...]
or python3 grepdocs.py @<file>, where each line of <file> is "<name> <regex>"."""
import os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
if sys.argv[1].startswith("@"):
    jobs = [l.rstrip("\n").split(" ", 1) for l in open(sys.argv[1][1:], encoding="utf-8") if l.strip()]
else:
    jobs = [(sys.argv[1], p) for p in sys.argv[2:]]
for name, pat in jobs:
    lines = open(os.path.join(HERE, "docs", name + ".txt"), encoding="utf-8").read().splitlines()
    print(f"=== {name}: /{pat}/")
    n = 0
    for i, l in enumerate(lines):
        if re.search(pat, l):
            print(f"{i + 1}: {l.strip()[:400]}")
            if i + 1 < len(lines):
                print(f"{i + 2}: {lines[i + 1].strip()[:400]}")
            n += 1
            if n >= 4:
                break
```

**Pattern file patterns1.txt (PostgreSQL pages)** (PostgreSQL 18 Documentation (postgresql.org/docs/current))

```
pg-select ASC
pg-select \[ INNER \]
pg-select FETCH \{
pg-select LIMIT \{
pg-select [Aa]lias
pg-select WHERE condition
pg-select GROUP BY will condense
pg-select \* in the output list|written as \*
pg-select OFFSET says
pg-queries-table-expressions INNER is the default|INNER and OUTER are optional|The words INNER and OUTER
pg-queries-table-expressions AS key word is optional|AS is optional
pg-queries-table-expressions table alias
pg-queries-select-lists AS keyword is optional|AS key word is optional
pg-queries-select-lists DISTINCT
pg-queries-order ASC
pg-queries-limit LIMIT
pg-queries-limit OFFSET says
pg-functions-matching LIKE pattern
pg-functions-matching underscore|percent sign
pg-functions-matching ILIKE
pg-functions-comparison IS NULL
pg-functions-comparison <> is the standard|!= is an alias|!= operator
pg-functions-comparison BETWEEN
pg-functions-comparison = NULL
pg-functions-aggregate count \( \* \)
pg-functions-aggregate count \( "any" \)
pg-functions-aggregate ^ ?sum
pg-functions-aggregate ^ ?avg
pg-functions-aggregate ^ ?max
pg-functions-subquery The right-hand side is a parenthesized subquery
pg-functions-subquery IN
```

**Pattern file patterns2.txt (SQLite pages)** (SQL As Understood By SQLite (the SQLite documentation, sqlite.org))

```
sqlite-select LIMIT clause is used to place an upper bound
sqlite-select OFFSET
sqlite-select DISTINCT
sqlite-select ASC
sqlite-select HAVING
sqlite-select LEFT JOIN|LEFT OUTER JOIN
sqlite-select \"\*\"|an asterisk
sqlite-select AS
sqlite-select GROUP BY clause
sqlite-select WHERE clause
sqlite-expr LIKE operator does a pattern matching
sqlite-expr case-insensitive|case sensitive
sqlite-expr percent symbol|underscore
sqlite-expr BETWEEN
sqlite-expr IS NOT|ISNULL
sqlite-expr != and <>|<> and !=|"!=" and "<>"
sqlite-expr IN and NOT IN operators take
sqlite-expr scalar subquery|SELECT statement enclosed in parentheses
sqlite-aggfunc avg\(X\)
sqlite-aggfunc count\(X\)|count\(\*\)
sqlite-aggfunc max\(X\)
sqlite-aggfunc sum\(X\)
sqlite-aggfunc DISTINCT
sqlite-insert VALUES
sqlite-insert column-name|list of column names
sqlite-update SET
sqlite-update WHERE clause
sqlite-delete WHERE clause
sqlite-delete Truncate Optimization|truncate
sqlite-createtable PRIMARY KEY
sqlite-createtable NOT NULL
sqlite-createtable REFERENCES|foreign key
sqlite-altertable RENAME COLUMN
sqlite-altertable RENAME TO
sqlite-altertable ADD COLUMN
sqlite-altertable DROP COLUMN
sqlite-altertable 3\.35|3\.25
sqlite-droptable DROP TABLE statement removes
sqlite-droptable IF EXISTS
sqlite-createindex CREATE INDEX command consists
sqlite-createindex UNIQUE
sqlite-dropindex DROP INDEX statement removes
sqlite-foreignkeys PRAGMA foreign_keys
sqlite-foreignkeys disabled by default
sqlite-nulls NULL
```

**Pattern file patterns3.txt (SQLite and PostgreSQL pages)** (PostgreSQL 18 Documentation (postgresql.org/docs/current))

```
sqlite-expr ^ ?pattern matches any|SQLite only$|understands upper/lower|considered to be
sqlite-expr x>=y AND x<=z|BETWEEN operator is logically equivalent
sqlite-expr The != and <> operators|Equals can be either
sqlite-expr ISNULL and NOTNULL|IS NOT NULL
sqlite-aggfunc The count\(X\) function returns|of times that X is not NULL
sqlite-aggfunc The avg\(\) function
sqlite-aggfunc The sum\(\) and total\(\)
sqlite-aggfunc In any aggregate function that takes a single argument
sqlite-aggfunc maximum value
sqlite-altertable 3\.35
sqlite-select ascending order|descending order
sqlite-select DISTINCT, then
sqlite-select HAVING clause
sqlite-select upper bound on the number of rows|the first M rows
sqlite-select OFFSET clause|is the OFFSET
sqlite-select column alias|AS keyword
sqlite-select ON clause
sqlite-select GROUP BY expressions
sqlite-insert explicitly lists
sqlite-insert one or more new rows
sqlite-update SET clause|assignments
sqlite-createtable INTEGER PRIMARY KEY
sqlite-createtable NOT NULL constraint
sqlite-createtable Each table in SQLite may have at most one PRIMARY KEY
sqlite-createindex followed by the name of the new index
pg-insert column_name|INSERT inserts new rows
pg-insert VALUES
pg-insert multirow|Insert multiple rows
pg-update UPDATE changes the values|SET
pg-update without a WHERE|WHERE condition
pg-delete DELETE deletes rows|If the WHERE clause is absent
pg-delete TRUNCATE
pg-truncate TRUNCATE quickly removes|has the same effect as an unqualified DELETE
pg-truncate SQL:2008|Compatibility
pg-createtable PRIMARY KEY \(
pg-createtable NOT NULL
pg-createtable REFERENCES reftable
pg-createtable These clauses specify a foreign key constraint
pg-altertable ADD \[ COLUMN \]
pg-altertable DROP \[ COLUMN \]
pg-altertable RENAME \[ COLUMN \]
pg-altertable RENAME TO
pg-altertable The key word COLUMN is noise|COLUMN is noise
pg-droptable DROP TABLE removes
pg-droptable IF EXISTS
pg-createindex CREATE INDEX constructs
pg-createindex UNIQUE
pg-dropindex DROP INDEX drops
```

**lines.py: print line ranges of the converted pages; run as python3 <scratch>/lines.py sqlite-expr:486-530 sqlite-expr:652-665 sqlite-aggfunc:434-437 sqlite-aggfunc:479-484 sqlite-altertable:693-700 sqlite-createindex:465-470 sqlite-insert:519-530 sqlite-select:2150-2160 sqlite-select:3170-3190** (SQL As Understood By SQLite (the SQLite documentation, sqlite.org))

```
"""Print line ranges of converted documentation pages: python3 lines.py <name>:<from>-<to> ..."""
import os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
for spec in sys.argv[1:]:
    name, rng = spec.split(":")
    a, b = map(int, rng.split("-"))
    lines = open(os.path.join(HERE, "docs", name + ".txt"), encoding="utf-8").read().splitlines()
    print(f"=== {name} {a}-{b}")
    print(" ".join(l.strip() for l in lines[a - 1:b]))
```

**Licence of the SQLite documentation (fetched by fetch_docs.py as sqlite-copyright)** (SQL As Understood By SQLite (the SQLite documentation, sqlite.org))

```
https://www.sqlite.org/copyright.html
```

**Licence of the PostgreSQL documentation (fetched by fetch_docs.py as pg-legalnotice and pg-licence)** (PostgreSQL 18 Documentation (postgresql.org/docs/current))

```
https://www.postgresql.org/docs/current/legalnotice.html
https://www.postgresql.org/about/licence/
```

**fetch.py: fetch a page with the deck's User-Agent and print the text around a pattern** (PostgreSQL 18 Documentation (postgresql.org/docs/current))

```
"""Fetch a URL with the deck's User-Agent, save it under docs/<name>.html and print the text
around each match of a pattern: python3 fetch.py <name> <url> <regex>"""
import html, os, re, sys, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
name, url, pat = sys.argv[1:4]
req = urllib.request.Request(url, headers={"User-Agent": "solid-memo deck research (https://github.com/antwika/solid-memo)"})
raw = urllib.request.urlopen(req, timeout=60).read().decode("utf-8", "replace")
os.makedirs(os.path.join(HERE, "docs"), exist_ok=True)
open(os.path.join(HERE, "docs", name + ".html"), "w", encoding="utf-8").write(raw)
text = re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", re.sub(r"(?is)<(script|style).*?</\1>", " ", raw))))
for m in list(re.finditer(pat, text))[:3]:
    print("...", text[max(0, m.start() - 200):m.end() + 300], "...")
```

**The text type and the SQL standard** (PostgreSQL 18 Documentation (postgresql.org/docs/current))

```
python3 <scratch>/fetch.py pg-datatype-character https://www.postgresql.org/docs/current/datatype-character.html "not in the SQL standard"
```

**Scalar subqueries and DISTINCT in aggregate expressions; IN with a list of values** (PostgreSQL 18 Documentation (postgresql.org/docs/current))

```
python3 <scratch>/fetch.py pg-sql-expressions https://www.postgresql.org/docs/current/sql-expressions.html "scalar subquery is|DISTINCT expression"
python3 <scratch>/fetch.py pg-functions-comparisons https://www.postgresql.org/docs/current/functions-comparisons.html "IN \(value"
```

**SQLite's list of SQL statements, checked for TRUNCATE (there is none)** (SQL As Understood By SQLite (the SQLite documentation, sqlite.org))

```
python3 <scratch>/fetch.py sqlite-lang https://www.sqlite.org/lang.html "TRUNCATE|DELETE"
```

**verify_quotes.py: checks that every phrase quoted from the documentation in the evidence occurs in the saved pages (run with: python3 <scratch>/verify_quotes.py; a MISSING line for sqlite-lang TRUNCATE and sqlite-select FETCH is the expected result, confirming their absence; the other MISSING lines were spacing artefacts of the conversion or wording corrected in the evidence)** (SQL As Understood By SQLite (the SQLite documentation, sqlite.org))

```
"""Check that phrases quoted or paraphrased in the evidence occur in the saved documentation
pages (whitespace and HTML tags normalised): python3 verify_quotes.py"""
import html, os, re

HERE = os.path.dirname(os.path.abspath(__file__))


def text(name):
    raw = open(os.path.join(HERE, "docs", name + ".html"), encoding="utf-8").read()
    raw = re.sub(r"(?is)<(script|style).*?</\1>", " ", raw)
    t = html.unescape(re.sub(r"<[^>]+>", " ", raw))
    t = re.sub(r"\s+", " ", t)
    return re.sub(r" ([,.;:)])", r"\1", t).replace("( ", "(")


CHECKS = [
    ("pg-functions-comparisons", "IN (value"),
    ("pg-functions-comparisons", "The result is “true” if the left-hand expression's result is equal to any of the right-hand expressions"),
    ("pg-sql-expressions", "invokes the aggregate once for each distinct value of the expression"),
    ("pg-sql-expressions", "A scalar subquery is an ordinary SELECT query in parentheses that returns exactly one row with one column."),
    ("pg-select", "* in the output list is shorthand"),
    ("pg-queries-select-lists", "The select list determines which columns of the intermediate table are actually output."),
    ("pg-select", "Aggregate functions, if any are used, are computed across all rows making up each group, producing a separate value for each group."),
    ("pg-update", "An expression to assign to the column. The expression can use the old values of this and other columns in the table."),
    ("pg-functions-aggregate", "Computes the sum of the non-null input values."),
    ("pg-functions-aggregate", "Computes the average (arithmetic mean) of all the non-null input values"),
    ("pg-functions-aggregate", "Computes the maximum of the non-null input values."),
    ("sqlite-select", "The list of expressions between the SELECT and FROM keywords is known as the result expression list."),
    ("sqlite-select", "Only rows for which the WHERE clause expression evaluates to true are included"),
    ("sqlite-select", "For the purposes of grouping rows, NULL values are considered equal"),
    ("sqlite-select", "is evaluated once for each group of rows"),
    ("sqlite-select", "an extra row is added to the output for each row in the original left-hand input dataset that does not match any row in the right-hand dataset"),
    ("sqlite-select", "If two rows are equal"),
    ("sqlite-select", "are sorted in ascending (smaller values first) order by default"),
    ("sqlite-select", "AS column-alias"),
    ("sqlite-select", "AS table-alias"),
    ("sqlite-select", "WHERE clause processing: The input data is filtered using the WHERE clause expression"),
    ("sqlite-select", "aggregate query with a GROUP BY clause"),
    ("sqlite-expr", "The LIKE, GLOB, REGEXP, MATCH, and extract operators"),
    ("sqlite-expr", "The IN and NOT IN operators"),
    ("sqlite-expr", "A subquery that returns a single column is a scalar subquery and can be used most anywhere."),
    ("sqlite-delete", "If the WHERE clause is not present, all records in the table are deleted."),
    ("sqlite-delete", "truncate"),
    ("sqlite-altertable", "The new column is always appended to the end of the list of existing columns."),
    ("sqlite-altertable", "The RENAME COLUMN TO syntax changes the column-name of table table-name into new-column-name."),
    ("sqlite-createtable", "then the primary key for the table consists of that single column"),
    ("sqlite-createtable", "REFERENCES foreign-table"),
    ("sqlite-foreignkeys", "must be enabled separately for each database connection"),
    ("sqlite-foreignkeys", "Foreign key constraints are disabled by default (for backwards compatibility)"),
    ("sqlite-update", "The scalar expressions may refer to columns of the row being updated. In this case all scalar expressions are evaluated before any assignments are made."),
    ("sqlite-lang", "TRUNCATE"),
    # second pass, after the first run
    ("pg-functions-comparisons", "is equal to any of the right-hand expressions"),
    ("pg-queries-select-lists", "The simplest kind of select list is * which emits all columns that the table expression produces."),
    ("sqlite-select", "then the list of expressions attached to the ORDER BY determine the order in which rows are returned"),
    ("sqlite-select", "each aggregate expression in the result-set is evaluated once for each group of rows"),
    ("sqlite-select", "the order in which rows are returned"),
    ("sqlite-select", "Each expression in the result-set is then evaluated once for each group of rows."),
    ("sqlite-select", "FETCH"),
    ("sqlite-select", "If there is an ON clause then the ON expression is evaluated for each row of the cartesian product as a boolean expression. Only rows for which the expression evaluates to true are included"),
    ("sqlite-insert", "must match the number of specified columns"),
    ("pg-select", "The clauses LIMIT and OFFSET are PostgreSQL-specific syntax, also used by MySQL."),
]
for name, phrase in CHECKS:
    t = text(name)
    i = t.find(phrase)
    if i < 0:
        i2 = t.lower().find(phrase.lower()[:40])
        print(f"MISSING {name}: {phrase!r}" + (f"  ~ {t[i2:i2 + 300]!r}" if i2 >= 0 else ""))
    else:
        print(f"ok      {name}: {t[max(0, i - 80):i + len(phrase) + 120]!r}")
```

**Licence of Wikidata** (Wikidata)

```
python3 <scratch>/fetch.py wikidata-copyright https://www.wikidata.org/wiki/Wikidata:Copyright "CC0"
```

**sparql.py: run a SPARQL file against https://query.wikidata.org/sparql and print the rows (run as python3 <scratch>/sparql.py <scratch>/q1.rq and <scratch>/q2.rq)** (Wikidata)

```
"""Run a SPARQL query file against the Wikidata Query Service; save JSON next to it and print rows."""
import json, sys, time, urllib.parse, urllib.request, urllib.error

path = sys.argv[1]
q = open(path, encoding="utf-8").read()
data = urllib.parse.urlencode({"query": q, "format": "json"}).encode()
req = urllib.request.Request("https://query.wikidata.org/sparql", data=data, headers={
    "User-Agent": "solid-memo deck research (https://github.com/antwika/solid-memo)",
    "Accept": "application/sparql-results+json"})
for attempt in range(5):
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            res = json.load(r)
        break
    except urllib.error.HTTPError as e:
        if e.code == 429:
            time.sleep(10)
            continue
        raise
open(path.rsplit(".", 1)[0] + ".json", "w", encoding="utf-8").write(json.dumps(res, ensure_ascii=False, indent=1))
for b in res["results"]["bindings"]:
    print(" | ".join(f"{k}={v['value']}" for k, v in b.items()))
```

**q1.rq: items with candidate English database-term labels and their Swedish labels** (Wikidata)

```
SELECT ?item ?en ?sv ?svAlt WHERE {
  VALUES ?en { "SQL"@en "primary key"@en "foreign key"@en "database index"@en "Join"@en "Null"@en "subquery"@en "Select"@en "relational database"@en "table"@en "column"@en "row"@en "SQLite"@en "PostgreSQL"@en "Join (SQL)"@en "null (SQL)"@en "Null (SQL)"@en "join"@en "Data Manipulation Language"@en "Data Definition Language"@en }
  ?item rdfs:label ?en .
  OPTIONAL { ?item rdfs:label ?sv FILTER(LANG(?sv) = "sv") }
  OPTIONAL { ?item skos:altLabel ?svAlt FILTER(LANG(?svAlt) = "sv") }
}
```

**q2.rq: descriptions, Swedish labels and Swedish Wikipedia articles of the database-term items** (Wikidata)

```
SELECT ?item ?enDesc ?sv ?svDesc ?svwiki WHERE {
  VALUES ?item { wd:Q47607 wd:Q934729 wd:Q1056760 wd:Q496946 wd:Q580427 wd:Q2003535 wd:Q12045831 wd:Q1179138 wd:Q3183033 wd:Q377551 wd:Q1424777 wd:Q1366302 wd:Q4817 wd:Q192490 wd:Q319417 }
  OPTIONAL { ?item schema:description ?enDesc FILTER(LANG(?enDesc) = "en") }
  OPTIONAL { ?item rdfs:label ?sv FILTER(LANG(?sv) = "sv") }
  OPTIONAL { ?item schema:description ?svDesc FILTER(LANG(?svDesc) = "sv") }
  OPTIONAL { ?svwiki schema:about ?item ; schema:isPartOf <https://sv.wikipedia.org/> }
}
```

**svwiki.py: plain-text extracts of Swedish Wikipedia articles (run as python3 <scratch>/svwiki.py "Structured Query Language" "Främmande nyckel" "Primärnyckel" "Index (databas)" "Join (SQL)" and python3 <scratch>/svwiki.py "Databasnyckel" "Relationsdatabas")** (Swedish Wikipedia: articles Databasnyckel and Structured Query Language)

```
"""Fetch plain-text extracts of Swedish Wikipedia articles (terminology check) and save them."""
import json, os, sys, urllib.parse, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
titles = sys.argv[1:]
url = "https://sv.wikipedia.org/w/api.php?" + urllib.parse.urlencode({
    "action": "query", "prop": "extracts", "explaintext": 1, "format": "json", "redirects": 1,
    "titles": "|".join(titles)})
print(url)
req = urllib.request.Request(url, headers={"User-Agent": "solid-memo deck research (https://github.com/antwika/solid-memo)"})
d = json.load(urllib.request.urlopen(req, timeout=60))
open(os.path.join(HERE, "svwiki.json"), "w", encoding="utf-8").write(json.dumps(d, ensure_ascii=False, indent=1))
for p in d["query"]["pages"].values():
    print("=====", p["title"])
    print(p.get("extract", "MISSING")[:4000])
```

**svsearch.py: full-text hit counts on Swedish Wikipedia for candidate Swedish terms (run as python3 <scratch>/svsearch.py "främmande nyckel" "sekundärnyckel" "primärnyckel" "underfråga" "delfråga" "inre koppling" "databasindex" "unikt index" "NULL-värde" "dubbletter")** (Swedish Wikipedia: articles Databasnyckel and Structured Query Language)

```
"""Count Swedish Wikipedia full-text hits for candidate Swedish SQL terms (terminology check)."""
import json, sys, urllib.parse, urllib.request

for term in sys.argv[1:]:
    url = "https://sv.wikipedia.org/w/api.php?" + urllib.parse.urlencode({
        "action": "query", "list": "search", "srsearch": f'"{term}"', "srlimit": 3, "format": "json"})
    req = urllib.request.Request(url, headers={"User-Agent": "solid-memo deck research (https://github.com/antwika/solid-memo)"})
    d = json.load(urllib.request.urlopen(req, timeout=60))
    hits = d["query"]["searchinfo"]["totalhits"]
    print(f"{term!r}: {hits} hits; e.g. " + "; ".join(r["title"] for r in d["query"]["search"]))
```

**Licence of Swedish Wikipedia text (page footer)** (Swedish Wikipedia: articles Databasnyckel and Structured Query Language)

```
python3 <scratch>/fetch.py svwiki-databasnyckel https://sv.wikipedia.org/wiki/Databasnyckel "Creative Commons"
```

**Swedish terms underfråga, mängdfunktion and inre koppling (second review round), and Microsoft's terms of use** (Microsoft's Swedish documentation: Underfrågor (SQL Server), Beräkningar med fältvärden i SQL-funktioner, Koppla tabeller och frågor)

```
python3 <scratch>/fetch.py ms-join-sv "https://support.microsoft.com/sv-se/office/koppla-tabeller-och-fr%C3%A5gor-3f5838bd-24a0-4832-9bc1-07061a1478f6" "inre koppling"
python3 <scratch>/fetch.py ms-subqueries-sv "https://learn.microsoft.com/sv-se/sql/relational-databases/performance/subqueries?view=sql-server-ver17" "[Uu]nderfråga"
python3 <scratch>/fetch.py ms-aggregate-sv "https://support.microsoft.com/sv-SE/Access/calculating-fields-in-sql-functions" "mängdfunktion"
python3 <scratch>/fetch.py ms-terms "https://www.microsoft.com/en-us/legal/terms-of-use" "Microsoft reserves|non-commercial|personal use|Copyright Notice"
```

**Web search used to find the Microsoft pages (results not used as sources)** (Microsoft's Swedish documentation: Underfrågor (SQL Server), Beräkningar med fältvärden i SQL-funktioner, Koppla tabeller och frågor)

```
WebSearch: support.microsoft.com sv-se "underfråga" Kapsla en fråga i en annan fråga
WebSearch: support.microsoft.com sv-se "SQL-mängdfunktioner" Access
```

## Quality control

6 rounds, 30 findings: 22 fixed, 0 rejected after checking, 8 needing no change. Every card's Wikidata checks (2 in all) are re-run against live Wikidata by `scripts/authored_decks.py check` before every build.

### Round 0: Every statement run exactly as printed in SQLite 3.53.1 and PostgreSQL 16.2 on fresh example data; every card checked against the SQLite and PostgreSQL documentation; fronts checked for a single canonical answer under the deck's stated style; Swedish terms checked against Wikidata and Swedish Wikipedia; builder (including the live Wikidata check) and validator checks. (2026-10-04)

**Reviewer:** Claude (AI) — authoring agent, machine checks · **Scope:** All 48 cards, and the alternative forms and behaviours named in the notes.

All 48 statements ran without error in both engines and had the effect the front describes; the forms the notes describe as failing (FETCH FIRST, OFFSET ... FETCH NEXT, TRUNCATE and ILIKE in SQLite; COUNT(*) in WHERE; a second DROP TABLE; a duplicate in a unique index; an order for a missing customer once foreign keys are enforced) failed as stated. Every clause used is documented by both projects with the behaviour on the card. The Wikidata check (the Swedish label primärnyckel, on the two cards that use the term) passed. The findings record the decisions about dialect differences and ambiguity.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| limit, limit-offset | The brief points out that LIMIT is not standard SQL and that FETCH FIRST is. The test run showed that SQLite 3.53.1 rejects FETCH FIRST 3 ROWS ONLY ('near "FETCH": syntax error') and OFFSET 3 ROWS FETCH NEXT 3 ROWS ONLY ('near "OFFSET": syntax error'), while PostgreSQL accepts both forms and LIMIT; the PostgreSQL documentation says LIMIT and OFFSET are PostgreSQL-specific syntax also used by MySQL and that SQL:2008 introduced OFFSET ... FETCH. | Chose LIMIT, because the deck's rule is that every statement runs unchanged in both SQLite and PostgreSQL, the two engines it was tested on; the standard form is given in each card's note, and the description says so. | no change needed |
| delete-all | 'Delete every row but keep the table' is also answered by TRUNCATE orders in PostgreSQL (and TRUNCATE TABLE in the SQL:2008 standard, according to the PostgreSQL documentation), so the front would have two answers. | The test run showed SQLite has no TRUNCATE ('near "TRUNCATE": syntax error'), so under the deck's both-engines rule DELETE FROM orders; is the one answer; the note names TRUNCATE. | fixed |
| like-prefix | LIKE behaves differently in the two engines: SQLite matched Ada, Anna and alice for 'A%', PostgreSQL only Ada and Anna (SQLite's LIKE ignores the case of ASCII letters by default; PostgreSQL's is case-sensitive and offers ILIKE). | The statement is the same in both, and the front ('begins with A') is answered by it in both; the note explains the difference so that a learner is not surprised. The example data include the lower-case name alice to show it. | fixed |
| create-table-fk | SQLite accepted an order for a nonexistent customer under a REFERENCES constraint, because foreign keys are disabled by default; PostgreSQL refused it. | Note added: SQLite enforces the reference only after PRAGMA foreign_keys = ON; (tested: then 'FOREIGN KEY constraint failed'). | fixed |
| create-table, create-table-fk, alter-add-column | TEXT is not a standard SQL type (the PostgreSQL documentation: 'Although the text type is not in the SQL standard, several other SQL database management systems have it as well'); the standard character type is VARCHAR(n). | Kept TEXT, which both engines document and accept, because a length limit would add an arbitrary number to every front; the fronts name the type, so the answer is fixed. The note on create-table names VARCHAR(n), and VARCHAR(100) was run in both engines. | no change needed |
| column-alias, table-alias, inner-join, left-join, where-not-equal, order-by, alter-add-column, create-table, create-table-fk | SQL accepts several spellings for the same statement: AS may be left out, INNER and OUTER are optional, != equals <>, ASC is the default, COLUMN is optional in ADD COLUMN, and keys can be declared as column or table constraints. A learner who writes another correct form could be marked wrong. | The deck states one style (method, step 'One style', and the description), every alternative was run in both engines (section NOTES), and the commonest alternatives are named in the notes. | no change needed |
| update-expression | price * 1.1 is stored as a floating-point number in SQLite even in a NUMERIC(10, 2) column (Lamp became 220.00000000000003), while PostgreSQL rounds to two decimals (220.00). | The statement does what the front asks in both engines; the difference concerns the column type, not the statement, and is recorded in the evidence only. | no change needed |
| all | Version differences: the test ran on SQLite 3.53.1 (bundled with the Python 3.12 build uv installed; the system's own python3 has SQLite 3.46.1) and PostgreSQL 16.2 (pgserver's bundled server), while the PostgreSQL documentation read is version 18. | Every statement on the cards is long-established syntax documented in the current versions; nothing cited from the version 18 pages differs for these statements, and the description names the versions tested. | no change needed |
| subquery-in, subquery-scalar | Wikidata has no Swedish label for subquery (Q12045831), and Swedish Wikipedia uses neither 'underfråga' nor 'delfråga' in this sense, so the Swedish term could not be confirmed from a source. | The Swedish fronts use 'underfråga', a transparent compound (under + fråga); this is the agent's choice and is left for the language review. | no change needed |
| max, insert-many, count-distinct | The brief asked for about 45 cards; the draft had 48. | Kept 48: each covers a distinct, frequently used construct; MIN, CREATE UNIQUE INDEX and DROP TABLE IF EXISTS appear in notes rather than as cards of their own. | no change needed |

### Round 1: Factual accuracy (2026-10-04)

**Reviewer:** Claude (AI) — independent Factual accuracy reviewer · **Scope:** All 48 cards: every statement re-run in SQLite 3.46.1 on the deck's example data, PostgreSQL behaviour checked against the recorded output and the documentation, every note tested for refutation.

No factual errors. Three fronts did not have exactly one right answer or were not exactly what the statement does in both engines, and one note overstated what the standard says; all four were fixed after checking the reviewer's evidence against the test output and the documentation.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| where-group-by | The front asked for 'each value of category', but WHERE drops a category none of whose rows has price above 100 instead of listing it with 0; the example data hide this because every category has such a row. | Confirmed (PostgreSQL docs: 'WHERE filters individual rows before the application of GROUP BY'). Front reworded to ask only for the categories that have such rows ('... that has rows with price above 100, with the number of those rows' / '... som har rader där price är över 100, med antalet sådana rader'); the note now says a category with no such row does not appear, and the test-run evidence says the example data cannot show this. | fixed |
| like-prefix | In SQLite LIKE 'A%' also returns alice, which does not begin with a capital A, so the statement does not do exactly what 'begins with A' says in both engines. | Confirmed by the deck's own test output and the SQLite documentation. Front made case-neutral and names the construct ('begins with the letter A, using LIKE' / 'börjar med bokstaven A, med LIKE'); the note now says that in SQLite this also matches a lower-case a, while PostgreSQL's LIKE is case-sensitive and PostgreSQL has ILIKE. | fixed |
| update-expression | 'Raise price by 10 percent' has several equally correct answers (price * 1.10, 1.1 * price, price + price * 0.1), and SQLite's result is a floating-point approximation that the card does not mention. | Front now names the operation: 'Multiply price by 1.1 in every row of products' / 'Multiplicera price med 1,1 i alla rader i products'. Note added: in SQLite the result is a floating-point number, 200 becoming 220.00000000000003 (CARD update-expression in the test output). The statement is unchanged. | fixed |
| create-table | The note called VARCHAR(n) 'the standard type', although the standard has more than one character type (character varying(n) and character(n)). | Confirmed (PostgreSQL datatype-character page). Together with round 3's first finding the note was reduced to what the test run showed: 'VARCHAR(100) in place of TEXT is accepted by both too.' The 'SQL defines two primary character types' quote was added to the PostgreSQL evidence. | fixed |

### Round 2: Language, translation and language tags (2026-10-04)

**Reviewer:** Claude (AI) — independent Language, translation and language tags reviewer · **Scope:** All 48 cards in both languages, the title, description, keywords and the language tags in the dossier and the built TTL.

Language tags correct throughout and the Swedish idiomatic overall. One note treated NULL as a city and was reworded; the Swedish inner-join note now uses 'inre koppling'; 'underfråga' and 'mängdfunktion' are now sourced; numbers are written as digits on both LIMIT cards; English uses 'Remove' for dropping schema objects and 'Delete' only for DELETE.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| select-distinct | The note treated NULL as a kind of city ('A NULL city ...' / 'En stad som är NULL ...'), against the deck's own phrasing 'rows where city is NULL'. | Reworded as suggested: 'Rows where city is NULL give one NULL row in the result.' / 'Rader där city är NULL ger en enda NULL-rad i resultatet.' (matches the test output: one NULL row). | fixed |
| inner-join | The Swedish note mixed in the English noun 'join' ('en inre join'); the established Swedish term is 'inre koppling'. | Confirmed in Microsoft's Swedish page 'Koppla tabeller och frågor' (fetched 2026-10-04: 'alternativ 1 är en inre koppling'). Swedish note now: 'INNER kan utelämnas: JOIN ensamt ger en inre koppling.' The page was added as a verification source (microsoft-docs-sv); nothing was copied. | fixed |
| subquery-in, subquery-scalar | 'underfråga' was recorded as the authoring agent's unsourced choice. | Confirmed on Microsoft's Swedish page 'Underfrågor (SQL Server)' (learn.microsoft.com, fetched 2026-10-04: 'En underfråga är en fråga som är kapslad i ...'; the URL the reviewer gave was replaced by this one, found by web search). Kept the term; added the page as evidence on both cards and updated the Swedish-text method step. | fixed |
| having | 'mängdfunktion' in the note was not recorded as checked. | Confirmed on Microsoft's Swedish page 'Beräkningar med fältvärden i SQL-funktioner' (fetched 2026-10-04: '... i en SQL-mängdfunktion ...'). Kept the term and added the page as evidence. | fixed |
| limit, limit-offset | Numbers written as a word on limit ('three' / 'tre') and as digits on limit-offset. | limit now uses the digit, as in the SQL: 'the 3 rows in products with the highest price' / 'de 3 rader i products som har högst price'. | fixed |
| drop-table, drop-index, alter-drop-column | English used 'Delete' for dropping a table and an index but 'Remove' for a column, and 'Delete' is also the verb for DELETE. | drop-table and drop-index now say 'Remove the table orders together with all its rows' and 'Remove the index idx_customers_city'; 'Delete' is kept for the DELETE cards. Swedish already used 'Ta bort' throughout. | fixed |

### Round 3: Licensing, attribution and documentation (2026-10-04)

**Reviewer:** Claude (AI) — independent Licensing, attribution and documentation reviewer · **Scope:** All sources and licence pages (re-fetched), the evidence on all 48 cards, the method, queries and licensing text, compared with the scratch files.

Licensing sound and the CC0 choice holds. A few facts in notes (standard status, MySQL support, TRUNCATE being faster) came only from the PostgreSQL documentation, a verification source; they were removed from the cards, so the notes now state only what the test run showed. The documentation no longer claims 'främmande nyckel' is used, credits the Swedish Wikipedia SQL article by URL, and records pgprobe.py. The PostgreSQL licence still shows as 'Unknown' because the builder has no id for it, which is outside this dossier.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| limit, limit-offset, delete-all, create-table | The notes stated facts that only the PostgreSQL documentation (a verification source) supplied: LIMIT works in MySQL (never tested), LIMIT is not standard while FETCH FIRST / OFFSET ... FETCH NEXT is, TRUNCATE is faster, TEXT is not standard while VARCHAR(n) is; the licensing text called the documentation verification only. | Took option (a). The notes now give only what the test run showed: limit 'FETCH FIRST 3 ROWS ONLY in place of LIMIT 3 also works in PostgreSQL, but not in SQLite.'; limit-offset likewise for OFFSET 3 ROWS FETCH NEXT 3 ROWS ONLY; delete-all 'PostgreSQL also has TRUNCATE orders; SQLite has no TRUNCATE.'; create-table 'VARCHAR(100) in place of TEXT is accepted by both too.' The description no longer calls FETCH FIRST 'the standard'. The postgresql-docs usedFor, the cross-check method step and the licensing paragraph now say that what the documentation says about the standard informed the choice of forms but no card states it. | fixed |
| deck (sources sv-wikipedia and wikidata, method 'Swedish text') | The documentation said 'främmande nyckel' is used on the fronts, but no card uses it. | Confirmed (no front or note contains it). Removed it from the sv-wikipedia usedFor and the Swedish-text step; the wikidata usedFor now says foreign key was looked up but no card uses the term. | fixed |
| deck (sources.postgresql-docs.license) | The report and the TTL show the PostgreSQL documentation's licence as 'Unknown', because the builder has no id for the PostgreSQL Licence. | Correct, but it cannot be fixed in this dossier: the licence id must be added to the builder's LICENCES, which is outside this deck's files, so it is passed to the editor. Until then the licenceEvidence quotes the licence, and the licensing paragraph now explains why it appears as 'Unknown'. | no change needed |
| deck (sources.sv-wikipedia) | The source title names the Structured Query Language article but only the Databasnyckel URL was recorded, and the 'Sätt ... till' pattern was not credited. | usedFor now gives both article URLs and names the verb pattern 'Sätt ... till ...' (checked in the article's examples: 'Sätt värdet namn till ... för alla personer i tabellen Person'). Both articles carry the same CC BY-SA 4.0 footer; nothing was copied. | fixed |
| deck (queries) | pgprobe.py, a PostgreSQL start-up probe run before run_sql.py, was not recorded, and make_dossier.py was described only by an excerpt. | Added pgprobe.py verbatim with its command line under Queries; the make_dossier.py entry now says it only assembles the dossier from the texts in it and asserts that the backs are the tested statements, and that later review changes were made directly in the dossier. | fixed |

### Round 4: Re-check of changed cards and a sample (facts, language, documentation) (2026-10-04)

**Reviewer:** Claude (AI) — independent re-check reviewer · **Scope:** The 14 cards changed in rounds 1–3 and every third card in dossier order (28 cards); all 48 statements re-run in SQLite 3.46.1 on the example data; the SQLite, PostgreSQL, Microsoft Swedish and Swedish Wikipedia pages re-fetched; the live Wikidata label of Q934729; the built TTL and report.

No errors. Every fix claimed in rounds 1–3 is in the dossier, the TTL and the report. One warning: the update-expression note and evidence overstated SQLite's behaviour; fixed. Two suggestions, both applied: a clearer description sentence and a corrected credit for the Microsoft term checks.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| update-expression | The note ('In SQLite the result is a floating-point number') and the evidence ('stores the results as floating-point numbers', Pen 'from 12.50 to 13.75' in both) say more than the test run showed: SQLite stored 165, 132 and 1320 as integers and showed Pen as 13.750000000000002; the effect comes from the NUMERIC(10, 2) column, and the 200 in the note depends on the example data. | Confirmed in the recorded output (CARD update-expression, SQLite 3.53.1: Atlas 165, Pen 13.750000000000002, Desk 1320) and by a re-run in SQLite 3.46.1 with a NUMERIC(10, 2) column (150.00 → 165 integer, 200.00 → 220.00000000000003 real, 12.50 → 13.750000000000002 real). Note now: 'In SQLite the result can be inexact: in the deck's example table, where price is NUMERIC(10, 2), 200 becomes 220.00000000000003.' / 'I SQLite kan resultatet bli inexakt: i kortlekens exempeltabell, där price är NUMERIC(10, 2), blir 200 220,00000000000003.' The evidence now gives SQLite's 165 and 13.750000000000002 and says it stored inexact results as floating-point numbers and exact ones as integers. | fixed |
| deck | The description sentence 'so rows are limited with LIMIT, with FETCH FIRST, which SQLite rejects, in a note' (and its Swedish) is hard to parse. | Reworded as suggested: 'so rows are limited with LIMIT; FETCH FIRST, which SQLite rejects, is given in a note.' / 'så antalet rader begränsas med LIMIT; FETCH FIRST, som SQLite inte godtar, nämns i en anteckning.' | fixed |
| deck (queries[24], sources.microsoft-docs-sv) | The recorded Microsoft fetch commands credit the 'third and second review rounds', but round 3 records nothing about the Microsoft pages; the usedFor says the terms were 'checked again on 2026-10-04' without saying by whom. | Confirmed: only round 2 found and added the pages. The purpose now says '(second review round)', and the usedFor says the terms were found by the language review (second review round), whose fixes fetched and checked each page on 2026-10-04. | fixed |

### Round 5: Re-check of changed cards and a sample (facts, language, documentation) (2026-10-04)

**Reviewer:** Claude (AI) — independent re-check reviewer · **Scope:** The card changed in round 4 (update-expression), every third card in dossier order (cards 2, 5, ..., 47), the deck metadata and documentation, and every fix claimed in round 4; the update-expression statement re-run in SQLite 3.46.1 with a NUMERIC(10, 2) column; the SQLite and PostgreSQL UPDATE pages re-fetched.

No errors; every fix claimed in round 4 is in the dossier, the TTL and the report. One warning, fixed: the Swedish note on update-expression put two numbers side by side, which reads as one number with a space as thousands separator. One suggestion, applied: the max front now names the construct, as other fronts do.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| update-expression | The Swedish note 'där price är NUMERIC(10, 2), blir 200 220,00000000000003' puts two numbers side by side; since Swedish groups thousands with a space, it can be read as the single number 200 220,00000000000003. | Confirmed: Swedish writes thousands with a space as separator, so '200 220,0...' is ambiguous. The note now reads '... där price är NUMERIC(10, 2), ändras 200 till 220,00000000000003.' The English note ('200 becomes 220.00000000000003') was already unambiguous and is unchanged. | fixed |
| max | 'Find the highest value in the column price of products' could also be answered with SELECT price FROM products ORDER BY price DESC LIMIT 1; (taught in this deck), which is not quite the same since PostgreSQL sorts NULL first with DESC. | Applied: the front now names the construct, as fronts such as like-prefix and subquery-in do: 'Find the highest value in the column price of products using an aggregate function' / 'Ta fram det högsta värdet i kolumnen price i products med en mängdfunktion'. 'mängdfunktion' is the term already used and checked in Microsoft's Swedish documentation (second review round). The back and evidence are unchanged. | fixed |

## Cards and evidence

| Card | Front | Back | Evidence |
|---|---|---|---|
| `select-all` | Select every column of every row in the table customers (en) / Hämta alla kolumner för alla rader i tabellen customers (sv) | SELECT * FROM customers; (zxx) | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD select-all — Both engines returned all 7 rows of customers with all five columns (id, name, email, city, country).<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_select.html (2.4 Generation of the set of result rows) — If a result expression is the special expression "*" then all columns in the input data are substituted for that one expression.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/queries-select-lists.html (7.3.1 Select-List Items) — The simplest kind of select list is * which emits all columns that the table expression produces. |
| `select-columns` | Select the columns name and city, in that order, of every row in customers (en) / Hämta kolumnerna name och city, i den ordningen, för alla rader i customers (sv) | SELECT name, city FROM customers; (zxx) | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD select-columns — Both returned 7 rows with exactly the columns name and city, in that order.<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_select.html (2.4 Generation of the set of result rows) — The list of expressions between the SELECT and FROM keywords is known as the result expression list.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/queries-select-lists.html (7.3 Select Lists) — The select list determines which columns of the intermediate table are actually output. |
| `select-distinct` | Select the column city of customers with duplicate values removed (en) / Hämta kolumnen city i customers med dubbletter borttagna (sv) | SELECT DISTINCT city FROM customers; (zxx) — *Rows where city is NULL give one NULL row in the result. (en) / Rader där city är NULL ger en enda NULL-rad i resultatet. (sv)* | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD select-distinct — Both returned 6 rows: Lund once (two customers live there), Malmö, Oslo, Aarhus, Helsinki and one NULL row (the row order differs between the engines).<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_select.html (2.6 Removal of duplicate rows) — If the simple SELECT is a SELECT DISTINCT, then duplicate rows are removed from the set of result rows before it is returned.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/sql-select.html (DISTINCT Clause) — If SELECT DISTINCT is specified, all duplicate rows are removed from the result set (one row is kept from each group of duplicates). |
| `column-alias` | Select the column name of customers, renamed customer_name in the result (en) / Hämta kolumnen name i customers, med namnet customer_name i resultatet (sv) | SELECT name AS customer_name FROM customers; (zxx) — *AS may be left out in SQLite and PostgreSQL; this deck always writes it. (en) / AS kan utelämnas i SQLite och PostgreSQL; den här kortleken skriver alltid ut det. (sv)* | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD column-alias — Both returned the 7 names under the column heading customer_name. The form without AS, SELECT name customer_name FROM customers;, gave the same result in both (NOTES: AS left out for a column alias).<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_select.html (result-column syntax diagram) — The result-column diagram shows expr followed by an optional AS and a column-alias.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/sql-select.html (Omitting the AS Key Word) — The optional key word AS can be omitted before an output column name in the SQL standard; PostgreSQL requires AS if the name matches a keyword, and the recommended practice is to use AS. |
| `table-alias` | Select the column name of customers, giving the table the alias c and naming the column through it (en) / Hämta kolumnen name i customers, med aliaset c för tabellen och kolumnen angiven via aliaset (sv) | SELECT c.name FROM customers AS c; (zxx) — *AS may be left out here too: FROM customers c. (en) / AS kan utelämnas även här: FROM customers c. (sv)* | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD table-alias — Both returned the 7 names. The form without AS, SELECT c.name FROM customers c;, gave the same result in both (NOTES: AS left out for a table alias).<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_select.html (table-or-subquery syntax diagram; 2.4) — The table-or-subquery diagram shows table-name followed by an optional AS and a table-alias; "If the expression is the alias of a table or subquery in the FROM clause followed by ".*" then all columns from the named table or subquery are substituted".<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/queries-table-expressions.html (7.2.1.2 Table and Column Aliases) — To create a table alias, write FROM table_reference AS alias ... The AS key word is optional noise. |
| `where-equals` | Select every column of the rows in customers where city is Lund (en) / Hämta alla kolumner för raderna i customers där city är Lund (sv) | SELECT * FROM customers WHERE city = 'Lund'; (zxx) | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD where-equals — Both returned the two rows with city Lund (ids 1 and 4).<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_select.html (2.3 WHERE clause filtering) — If a WHERE clause is specified, the WHERE expression is evaluated for each row in the input data as a boolean expression. Only rows for which the WHERE clause expression evaluates to true are included from the dataset before continuing.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/sql-select.html (WHERE Clause) — Any row that does not satisfy this condition will be eliminated from the output. |
| `where-not-equal` | Select every column of the rows in customers where city is not Lund (en) / Hämta alla kolumner för raderna i customers där city inte är Lund (sv) | SELECT * FROM customers WHERE city <> 'Lund'; (zxx) — *!= also works in SQLite and PostgreSQL. Rows where city is NULL are not returned. (en) / != fungerar också i SQLite och PostgreSQL. Rader där city är NULL kommer inte med. (sv)* | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD where-not-equal — Both returned ids 2, 3, 5 and 6, but not id 7, whose city is NULL. city != 'Lund' returned the same four rows in both (NOTES: != as an alternative to <>).<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_expr.html (Operators) — The not-equal operator can be either != or <>. All operators generally evaluate to NULL when any operand is NULL.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/functions-comparison.html (9.2 Comparison Functions and Operators) — <> is the standard SQL notation for "not equal". != is an alias ... Ordinary comparison operators yield null (signifying "unknown"), not true or false, when either input is null. |
| `where-and` | Select every column of the rows in products where category is books and price is below 100 (en) / Hämta alla kolumner för raderna i products där category är books och price är under 100 (sv) | SELECT * FROM products WHERE category = 'books' AND price < 100; (zxx) | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD where-and — Both returned only id 2 (Novel, books, 89); Atlas and Cookbook (books, 150 and 120) were excluded.<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_select.html (2.3 WHERE clause filtering) — Only rows for which the WHERE clause expression evaluates to true are included from the dataset before continuing.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/sql-select.html (WHERE Clause) — where condition is any expression that evaluates to a result of type boolean. Any row that does not satisfy this condition will be eliminated from the output. |
| `where-or` | Select every column of the rows in customers where city is Lund or country is Norway (en) / Hämta alla kolumner för raderna i customers där city är Lund eller country är Norway (sv) | SELECT * FROM customers WHERE city = 'Lund' OR country = 'Norway'; (zxx) | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD where-or — Both returned ids 1, 3 and 4 (Lund, Norway, Lund).<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_expr.html (Operators) — When paired with NULL: AND evaluates to 0 (false) when the other operand is false; and OR evaluates to 1 (true) when the other operand is true.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/sql-select.html (WHERE Clause) — where condition is any expression that evaluates to a result of type boolean. Any row that does not satisfy this condition will be eliminated from the output. |
| `in-list` | Select every column of the rows in customers where country is one of Sweden, Norway and Denmark, using a list of values (en) / Hämta alla kolumner för raderna i customers där country är något av Sweden, Norway och Denmark, med en värdelista (sv) | SELECT * FROM customers WHERE country IN ('Sweden', 'Norway', 'Denmark'); (zxx) — *The same as three conditions joined with OR. (en) / Samma sak som tre villkor förenade med OR. (sv)* | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD in-list — Both returned ids 1, 2, 3, 4, 5 and 7 (not id 6, Finland). The three conditions joined with OR returned the same rows (NOTES: IN equals ORs).<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_expr.html (The IN and NOT IN operators) — The IN and NOT IN operators take an expression on the left and a list of values or a subquery on the right.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/functions-comparisons.html (9.25.1 IN) — expression IN (value [, ...]): The right-hand side is a parenthesized list of expressions. The result is true if the left-hand expression's result is equal to any of the right-hand expressions. This is a shorthand notation for expression = value1 OR expression = value2 OR ... |
| `between` | Select every column of the rows in products where price is from 100 to 200, both included, using one range test (en) / Hämta alla kolumner för raderna i products där price är från 100 till 200, båda inräknade, med ett enda intervallvillkor (sv) | SELECT * FROM products WHERE price BETWEEN 100 AND 200; (zxx) — *BETWEEN includes both ends: price >= 100 AND price <= 200. (en) / BETWEEN tar med båda gränserna: price >= 100 AND price <= 200. (sv)* | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD between — Both returned Atlas (150), Cookbook (120) and Lamp (200), so 200 was included. price >= 100 AND price <= 200 returned the same three (NOTES: BETWEEN equals >= AND <=).<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_expr.html (6. The BETWEEN operator) — "x BETWEEN y AND z" is equivalent to "x>=y AND x<=z" except that with BETWEEN, the x expression is only evaluated once.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/functions-comparison.html (Table 9.2 Comparison Predicates) — datatype BETWEEN datatype AND datatype: Between (inclusive of the range endpoints). |
| `like-prefix` | Select every column of the rows in customers where name begins with the letter A, using LIKE (en) / Hämta alla kolumner för raderna i customers där name börjar med bokstaven A, med LIKE (sv) | SELECT * FROM customers WHERE name LIKE 'A%'; (zxx) — *% stands for any run of characters. In SQLite this also matches a lower-case a, because SQLite's LIKE ignores the case of ASCII letters; PostgreSQL's LIKE is case-sensitive, and PostgreSQL has ILIKE for case-insensitive matching. (en) / % står för en godtycklig följd av tecken. I SQLite matchar detta också ett litet a, eftersom LIKE i SQLite bortser från skillnaden mellan stora och små ASCII-bokstäver; LIKE i PostgreSQL skiljer på dem, och PostgreSQL har ILIKE för matchning utan hänsyn till skiftläge. (sv)* | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD like-prefix — SQLite returned Ada, Anna and alice; PostgreSQL returned Ada and Anna only. With the pattern 'a%' SQLite again returned all three and PostgreSQL only alice; ILIKE 'a%' returned all three in PostgreSQL and was a syntax error in SQLite (NOTES: LIKE and letter case; ILIKE).<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_expr.html (The LIKE, GLOB, REGEXP, MATCH, and extract operators) — A percent symbol ("%") in the LIKE pattern matches any sequence of zero or more characters ... Any other character matches itself or its lower/upper case equivalent (i.e. case-insensitive matching). SQLite only understands upper/lower case for ASCII characters by default.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/functions-matching.html (9.7.1 LIKE) — A percent sign (%) matches any sequence of zero or more characters. The key word ILIKE can be used instead of LIKE to make the match case-insensitive ... This is not in the SQL standard but is a PostgreSQL extension. |
| `like-contains` | Select every column of the rows in customers where email contains example (en) / Hämta alla kolumner för raderna i customers där email innehåller example (sv) | SELECT * FROM customers WHERE email LIKE '%example%'; (zxx) | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD like-contains — Both returned ids 1 and 3 (ada@example.com and anna@example.org).<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_expr.html (The LIKE operator) — A percent symbol ("%") in the LIKE pattern matches any sequence of zero or more characters in the string.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/functions-matching.html (9.7.1 LIKE) — LIKE pattern matching always covers the entire string. Therefore, if it's desired to match a sequence anywhere within a string, the pattern must start and end with a percent sign. |
| `is-null` | Select every column of the rows in customers where email is NULL (en) / Hämta alla kolumner för raderna i customers där email är NULL (sv) | SELECT * FROM customers WHERE email IS NULL; (zxx) — *email = NULL matches no row: a comparison with NULL is unknown, never true. (en) / email = NULL träffar ingen rad: en jämförelse med NULL blir okänd, aldrig sann. (sv)* | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD is-null — Both returned ids 2, 5 and 7. WHERE email = NULL returned 0 rows in both (NOTES: = NULL matches nothing).<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_expr.html (Operators) — The IS and IS NOT operators work like = and != except when one or both of the operands are NULL ... All operators generally evaluate to NULL when any operand is NULL.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/functions-comparison.html (Table 9.3; 9.2) — expression IS NULL tests whether the value is null. Do not write expression = NULL because NULL is not "equal to" NULL. |
| `is-not-null` | Select every column of the rows in customers where email is not NULL (en) / Hämta alla kolumner för raderna i customers där email inte är NULL (sv) | SELECT * FROM customers WHERE email IS NOT NULL; (zxx) | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD is-not-null — Both returned ids 1, 3, 4 and 6.<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_expr.html (Operators) — If one operand is NULL and the other is not, then the IS operator evaluates to 0 (false) and the IS NOT operator is 1 (true).<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/functions-comparison.html (Table 9.3 Comparison Predicates) — datatype IS NOT NULL → boolean: test whether value is not null. |
| `order-by` | Select every column of every row in customers, sorted by name in ascending order (en) / Hämta alla kolumner för alla rader i customers, sorterade stigande efter name (sv) | SELECT * FROM customers ORDER BY name; (zxx) — *Ascending is the default; ASC may be written out. (en) / Stigande ordning är standard; ASC kan skrivas ut. (sv)* | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD order-by — Both returned the 7 rows in the order Ada, Anna, Bo, Carl, Dina, Erik, alice. ORDER BY name ASC gave the same order (NOTES: ASC written out).<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_select.html (4. The ORDER BY clause) — Each ORDER BY expression may be optionally followed by one of the keywords ASC (smaller values are returned first) or DESC (larger values are returned first). If neither ASC or DESC are specified, rows are sorted in ascending (smaller values first) order by default.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/queries-order.html (7.5 Sorting Rows) — Each expression can be followed by an optional ASC or DESC keyword to set the sort direction to ascending or descending. ASC order is the default. |
| `order-by-desc` | Select every column of every row in products, sorted by price in descending order (en) / Hämta alla kolumner för alla rader i products, sorterade fallande efter price (sv) | SELECT * FROM products ORDER BY price DESC; (zxx) | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD order-by-desc — Both returned the 8 products from Desk (1200) down to Pen (12.50).<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_select.html (4. The ORDER BY clause) — DESC (larger values are returned first).<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/queries-order.html (7.5 Sorting Rows) — Each expression can be followed by an optional ASC or DESC keyword to set the sort direction to ascending or descending. |
| `order-by-two` | Select every column of every row in customers, sorted in ascending order by country and then by name (en) / Hämta alla kolumner för alla rader i customers, sorterade stigande först efter country och sedan efter name (sv) | SELECT * FROM customers ORDER BY country, name; (zxx) | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD order-by-two — Both returned Dina (Denmark), alice (Finland), Anna (Norway), then Ada, Bo, Carl and Erik (Sweden).<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_select.html (4. The ORDER BY clause) — If a SELECT statement does have an ORDER BY clause, then the list of expressions attached to the ORDER BY determine the order in which rows are returned to the user; if neither ASC or DESC are specified, rows are sorted in ascending order by default.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/sql-select.html (ORDER BY Clause) — If two rows are equal according to the leftmost expression, they are compared according to the next expression and so on. |
| `limit` | Select every column of the 3 rows in products with the highest price (en) / Hämta alla kolumner för de 3 rader i products som har högst price (sv) | SELECT * FROM products ORDER BY price DESC LIMIT 3; (zxx) — *FETCH FIRST 3 ROWS ONLY in place of LIMIT 3 also works in PostgreSQL, but not in SQLite. (en) / FETCH FIRST 3 ROWS ONLY i stället för LIMIT 3 fungerar också i PostgreSQL, men inte i SQLite. (sv)* | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD limit — Both returned Desk (1200), Chair (450) and Lamp (200). With FETCH FIRST 3 ROWS ONLY in place of LIMIT 3, PostgreSQL returned the same rows and SQLite stopped with 'near "FETCH": syntax error' (NOTES: standard FETCH FIRST instead of LIMIT).<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_select.html (The LIMIT clause) — The LIMIT clause is used to place an upper bound on the number of rows returned by the entire SELECT statement ... the SELECT returns the first N rows of its result set only. (No FETCH clause appears in SQLite's SELECT syntax.)<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/sql-select.html (LIMIT Clause; Compatibility: LIMIT and OFFSET) — The clauses LIMIT and OFFSET are PostgreSQL-specific syntax, also used by MySQL. The SQL:2008 standard has introduced the clauses OFFSET ... FETCH {FIRST\|NEXT} ... for the same functionality. |
| `limit-offset` | Select every column of the rows in products sorted by name in ascending order, skipping the first 3 rows and returning the next 3 (en) / Hämta alla kolumner för raderna i products sorterade stigande efter name, men hoppa över de 3 första raderna och returnera de 3 följande (sv) | SELECT * FROM products ORDER BY name LIMIT 3 OFFSET 3; (zxx) — *OFFSET 3 ROWS FETCH NEXT 3 ROWS ONLY in place of LIMIT 3 OFFSET 3 also works in PostgreSQL, but not in SQLite. (en) / OFFSET 3 ROWS FETCH NEXT 3 ROWS ONLY i stället för LIMIT 3 OFFSET 3 fungerar också i PostgreSQL, men inte i SQLite. (sv)* | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD limit-offset — Sorted by name the products are Atlas, Chair, Cookbook, Desk, Lamp, Mug, Novel, Pen; both engines returned Desk, Lamp and Mug. OFFSET 3 ROWS FETCH NEXT 3 ROWS ONLY returned the same in PostgreSQL and stopped SQLite with 'near "OFFSET": syntax error' (NOTES: standard OFFSET ... FETCH NEXT).<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_select.html (The LIMIT clause) — If an expression has an OFFSET clause, then the first M rows are omitted from the result set returned by the SELECT statement and the next N rows are returned, where M and N are the values that the OFFSET and LIMIT clauses evaluate to.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/queries-limit.html (7.6 LIMIT and OFFSET); sql-select.html (LIMIT Clause) — OFFSET says to skip that many rows before beginning to return rows ... If both OFFSET and LIMIT appear, then OFFSET rows are skipped before starting to count the LIMIT rows that are returned. SQL:2008 introduced OFFSET start ROWS FETCH NEXT count ROWS ONLY. |
| `count-rows` | Count the rows in customers (en) / Räkna raderna i customers (sv) | SELECT COUNT(*) FROM customers; (zxx) | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD count-rows — Both returned 7.<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_aggfunc.html (count(*)) — The count(*) function (with no arguments) returns the total number of rows in the group.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/functions-aggregate.html (Table 9.62) — count ( * ) → bigint: Computes the number of input rows. |
| `count-column` | Count the values in the column email of customers that are not NULL, without a WHERE clause (en) / Räkna de värden i kolumnen email i customers som inte är NULL, utan WHERE-villkor (sv) | SELECT COUNT(email) FROM customers; (zxx) — *COUNT(column) skips NULLs; COUNT(*) counts every row. (en) / COUNT(kolumn) hoppar över NULL; COUNT(*) räknar alla rader. (sv)* | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD count-column — Both returned 4 (three of the seven customers have email NULL). COUNT(*) with WHERE email IS NOT NULL also returned 4 (NOTES).<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_aggfunc.html (count(X)) — The count(X) function returns a count of the number of times that X is not NULL in a group.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/functions-aggregate.html (Table 9.62) — count ( "any" ) → bigint: Computes the number of input rows in which the input value is not null. |
| `count-distinct` | Count the different values in the column city of customers (en) / Räkna de olika värdena i kolumnen city i customers (sv) | SELECT COUNT(DISTINCT city) FROM customers; (zxx) — *NULL is not counted. (en) / NULL räknas inte. (sv)* | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD count-distinct — Both returned 5 (Lund, Malmö, Oslo, Aarhus, Helsinki): the NULL city of id 7 was not counted, although SELECT DISTINCT city returns it as a sixth row (CARD select-distinct).<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_aggfunc.html (1. Syntax; count(X)) — In any aggregate function that takes a single argument, that argument can be preceded by the keyword DISTINCT. In such cases, duplicate elements are filtered before being passed into the aggregate function; count(X) counts the times X is not NULL.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/functions-aggregate.html (count); sql-expressions.html (4.2.7 Aggregate Expressions) — count ( "any" ) computes the number of input rows in which the input value is not null; the form aggregate_name (DISTINCT expression ...) invokes the aggregate once for each distinct value of the expression found in the input rows. |
| `sum` | Add up the column total over every row in orders (en) / Summera kolumnen total över alla rader i orders (sv) | SELECT SUM(total) FROM orders; (zxx) | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD sum — SQLite returned 745.5 and PostgreSQL 745.50 (100 + 250 + 75.50 + 300 + 20).<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_aggfunc.html (sum(X)) — The sum() and total() aggregate functions return the sum of all non-NULL values in the group.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/functions-aggregate.html (Table 9.62) — sum ( numeric ) → numeric: Computes the sum of the non-null input values. |
| `avg` | Compute the average of the column price over every row in products (en) / Beräkna medelvärdet av kolumnen price över alla rader i products (sv) | SELECT AVG(price) FROM products; (zxx) | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD avg — SQLite returned 283.3125 and PostgreSQL 283.3125000000000000 (2266.50 / 8).<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_aggfunc.html (avg(X)) — The avg() function returns the average value of all non-NULL X within a group.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/functions-aggregate.html (Table 9.62) — avg ( numeric ) → numeric: Computes the average (arithmetic mean) of all the non-null input values. |
| `max` | Find the highest value in the column price of products using an aggregate function (en) / Ta fram det högsta värdet i kolumnen price i products med en mängdfunktion (sv) | SELECT MAX(price) FROM products; (zxx) — *MIN(price) gives the lowest. (en) / MIN(price) ger det lägsta. (sv)* | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD max — SQLite returned 1200 and PostgreSQL 1200.00. MIN(price) returned 12.5 and 12.50 (NOTES: MIN).<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_aggfunc.html (max(X)) — The max() aggregate function returns the maximum value of all values in the group.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/functions-aggregate.html (Table 9.62) — max ( see text ) → same as input type: Computes the maximum of the non-null input values. |
| `group-by-count` | Select each value of city in customers with the number of rows that have it (en) / Hämta varje värde i city i customers med antalet rader som har det värdet (sv) | SELECT city, COUNT(*) FROM customers GROUP BY city; (zxx) | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD group-by-count — Both returned 6 groups: Lund 2 and Aarhus, Helsinki, Malmö, Oslo and NULL 1 each (in a different row order).<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_select.html (2.4 Generation of the set of result rows) — Rows for which the results of evaluating the GROUP BY expressions are the same get assigned to the same group; for the purposes of grouping rows, NULL values are considered equal.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/sql-select.html (GROUP BY Clause) — GROUP BY will condense into a single row all selected rows that share the same values for the grouped expressions. |
| `group-by-sum` | Select each value of customer_id in orders with the sum of total for that value (en) / Hämta varje värde i customer_id i orders med summan av total för det värdet (sv) | SELECT customer_id, SUM(total) FROM orders GROUP BY customer_id; (zxx) | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD group-by-sum — Both returned customer 1: 350, 3: 75.5 and 4: 320 (PostgreSQL as 350.00, 75.50 and 320.00, in another row order).<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_select.html (2.4 Generation of the set of result rows) — Each expression in the result-set is then evaluated once for each group of rows. If the expression is an aggregate expression, it is evaluated across all rows in the group ... Each group of input dataset rows contributes a single row to the set of result rows.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/sql-select.html (GROUP BY Clause) — Aggregate functions, if any are used, are computed across all rows making up each group, producing a separate value for each group. |
| `having` | Select each value of city in customers with its number of rows, keeping only the cities that occur more than once (en) / Hämta varje värde i city i customers med dess antal rader, men behåll bara de städer som förekommer mer än en gång (sv) | SELECT city, COUNT(*) FROM customers GROUP BY city HAVING COUNT(*) > 1; (zxx) — *HAVING filters groups; an aggregate such as COUNT(*) is not allowed in WHERE. (en) / HAVING filtrerar grupper; en mängdfunktion som COUNT(*) är inte tillåten i WHERE. (sv)* | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD having — Both returned the single row Lund, 2. Putting COUNT(*) > 1 in WHERE was refused by both: SQLite 'misuse of aggregate: COUNT()', PostgreSQL 'aggregate functions are not allowed in WHERE' (NOTES).<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_select.html (2.4 Generation of the set of result rows) — If a HAVING clause is specified, it is evaluated once for each group of rows as a boolean expression. If the result of evaluating the HAVING clause is false, the group is discarded.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/sql-select.html (HAVING Clause) — HAVING eliminates group rows that do not satisfy the condition. HAVING is different from WHERE: WHERE filters individual rows before the application of GROUP BY, while HAVING filters group rows created by GROUP BY.<br>Microsoft's Swedish documentation: Underfrågor (SQL Server), Beräkningar med fältvärden i SQL-funktioner, Koppla tabeller och frågor: https://support.microsoft.com/sv-SE/Access/calculating-fields-in-sql-functions — 'Du kan använda argumentet stränguttryck i en SQL-mängdfunktion för att utföra beräkningar på värden i ett fält.' (term check only) |
| `where-group-by` | Select each value of category in products that has rows with price above 100, with the number of those rows (en) / Hämta varje värde i category i products som har rader där price är över 100, med antalet sådana rader (sv) | SELECT category, COUNT(*) FROM products WHERE price > 100 GROUP BY category; (zxx) — *WHERE filters rows before they are grouped, so a category with no such row does not appear. (en) / WHERE filtrerar rader innan de grupperas, så en kategori utan sådana rader kommer inte med. (sv)* | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD where-group-by — Both returned books 2, home 2 and office 1 (Atlas and Cookbook; Lamp and Chair; Desk). Every category in the example data has at least one product above 100, so the result shows no category being left out; that a category with no such row is left out follows from WHERE filtering before grouping (the documentation below).<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_select.html (2. Simple Select Processing) — The processing steps listed in order: "WHERE clause processing: The input data is filtered using the WHERE clause expression. GROUP BY, HAVING and result-column expression processing: The set of result rows is computed by aggregating the data ..."<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/sql-select.html (HAVING Clause) — WHERE filters individual rows before the application of GROUP BY, while HAVING filters group rows created by GROUP BY. |
| `inner-join` | Select orders.id and customers.name for every order that has a matching customer, joining orders to customers on orders.customer_id = customers.id (en) / Hämta orders.id och customers.name för varje order som har en matchande kund, genom att koppla orders till customers med orders.customer_id = customers.id (sv) | SELECT orders.id, customers.name FROM orders INNER JOIN customers ON orders.customer_id = customers.id; (zxx) — *INNER may be left out: JOIN alone is an inner join. (en) / INNER kan utelämnas: JOIN ensamt ger en inre koppling. (sv)* | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD inner-join — Both returned 5 rows: orders 1 and 2 with Ada, 3 with Anna, 4 and 5 with Carl. With JOIN instead of INNER JOIN the result was the same (NOTES: JOIN without INNER).<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_select.html (2.1 Determination of input data) — There is no difference between the "INNER JOIN", "JOIN" and "," join operators ... If there is an ON clause then the ON expression is evaluated for each row of the cartesian product as a boolean expression. Only rows for which the expression evaluates to true are included from the dataset.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/queries-table-expressions.html (7.2.1.1 Joined Tables) — The words INNER and OUTER are optional in all forms. INNER is the default; LEFT, RIGHT, and FULL imply an outer join.<br>Microsoft's Swedish documentation: Underfrågor (SQL Server), Beräkningar med fältvärden i SQL-funktioner, Koppla tabeller och frågor: https://support.microsoft.com/sv-se/office/koppla-tabeller-och-fr%C3%A5gor-3f5838bd-24a0-4832-9bc1-07061a1478f6 (Koppla tabeller och frågor) — 'Det finns fyra grundläggande typer av kopplingar: inre kopplingar, yttre kopplingar, korskopplingar ...' and 'alternativ 1 är en inre koppling, 2 är en vänster yttre koppling och 3 är en höger yttre koppling.' (term check only) |
| `left-join` | Select customers.name and orders.id for every customer, including customers with no order, joining customers to orders on customers.id = orders.customer_id (en) / Hämta customers.name och orders.id för varje kund, även kunder utan order, genom att koppla customers till orders med customers.id = orders.customer_id (sv) | SELECT customers.name, orders.id FROM customers LEFT JOIN orders ON customers.id = orders.customer_id; (zxx) — *Customers with no order get NULL as orders.id. LEFT OUTER JOIN means the same. (en) / Kunder utan order får NULL som orders.id. LEFT OUTER JOIN betyder samma sak. (sv)* | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD left-join — Both returned 9 rows: the five orders with their customers, and Bo, Dina, alice and Erik with NULL as orders.id. LEFT OUTER JOIN gave the same (NOTES).<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_select.html (2.1 Determination of input data) — If the join-operator is a "LEFT JOIN" or "LEFT OUTER JOIN", then after the ON or USING filtering clauses have been applied, an extra row is added to the output for each row in the original left-hand input dataset that does not match any row in the right-hand dataset. The added rows contain NULL values in the columns that would normally contain values copied from the right-hand input dataset.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/sql-select.html (FROM Clause) — LEFT OUTER JOIN returns all rows in the qualified Cartesian product ... plus one copy of each row in the left-hand table for which there was no right-hand row that passed the join condition ... extended ... by inserting null values for the right-hand columns. |
| `subquery-in` | Select every column of the rows in customers whose id is among the customer_id values in orders, using a subquery (en) / Hämta alla kolumner för raderna i customers vars id finns bland värdena i customer_id i orders, med en underfråga (sv) | SELECT * FROM customers WHERE id IN (SELECT customer_id FROM orders); (zxx) — *WHERE EXISTS (SELECT 1 FROM orders WHERE orders.customer_id = customers.id) gives the same rows. (en) / WHERE EXISTS (SELECT 1 FROM orders WHERE orders.customer_id = customers.id) ger samma rader. (sv)* | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD subquery-in — Both returned ids 1, 3 and 4 once each, although customers 1 and 4 have two orders each. The EXISTS form returned the same rows (NOTES: subquery-in with EXISTS).<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_expr.html (The IN and NOT IN operators; Subquery expressions) — The IN and NOT IN operators take an expression on the left and a list of values or a subquery on the right ... A SELECT statement enclosed in parentheses is a subquery.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/functions-subquery.html (9.24.2 IN) — expression IN (subquery): The right-hand side is a parenthesized subquery, which must return exactly one column ... The result of IN is "true" if any equal subquery row is found.<br>Microsoft's Swedish documentation: Underfrågor (SQL Server), Beräkningar med fältvärden i SQL-funktioner, Koppla tabeller och frågor: https://learn.microsoft.com/sv-se/sql/relational-databases/performance/subqueries?view=sql-server-ver17 (Underfrågor (SQL Server)) — The Swedish page is titled 'Underfrågor (SQL Server)' and says 'En underfråga är en fråga som är kapslad i en SELECT, INSERT, UPDATE eller DELETE-instruktion eller inuti en annan underfråga.' (term check only) |
| `subquery-scalar` | Select every column of the rows in products whose price is above the average price of all products, using a subquery (en) / Hämta alla kolumner för raderna i products där price är högre än medelvärdet av price för alla rader, med en underfråga (sv) | SELECT * FROM products WHERE price > (SELECT AVG(price) FROM products); (zxx) | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD subquery-scalar — Both returned Chair (450) and Desk (1200), the two products above the average 283.3125.<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_expr.html (Subquery expressions) — A SELECT statement enclosed in parentheses is a subquery ... A subquery that returns a single column is a scalar subquery and can be used most anywhere.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/sql-expressions.html (4.2.11 Scalar Subqueries) — A scalar subquery is an ordinary SELECT query in parentheses that returns exactly one row with one column. The SELECT query is executed and the single returned value is used in the surrounding value expression.<br>Microsoft's Swedish documentation: Underfrågor (SQL Server), Beräkningar med fältvärden i SQL-funktioner, Koppla tabeller och frågor: https://learn.microsoft.com/sv-se/sql/relational-databases/performance/subqueries?view=sql-server-ver17 (Underfrågor (SQL Server)) — The Swedish page is titled 'Underfrågor (SQL Server)' and says 'En underfråga är en fråga som är kapslad i en SELECT, INSERT, UPDATE eller DELETE-instruktion eller inuti en annan underfråga.' (term check only) |
| `insert` | Add a row to customers with id 8 and name Gustav, naming only those two columns (en) / Lägg till en rad i customers med id 8 och name Gustav, där bara de två kolumnerna anges (sv) | INSERT INTO customers (id, name) VALUES (8, 'Gustav'); (zxx) — *Columns not named get their default value, here NULL. (en) / Kolumner som inte anges får sitt standardvärde, här NULL. (sv)* | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD insert — Both reported 1 row inserted; the new row was 8, Gustav, with email, city and country NULL.<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_insert.html (Overview) — The first form (with the "VALUES" keyword) creates one or more new rows in an existing table ... If a column-name list is specified, then the number of values in each term of the VALUE list must match the number of specified columns.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/sql-insert.html (Description) — The target column names can be listed in any order ... Each column not present in the explicit or implicit column list will be filled with a default value, either its declared default value or null if there is none. |
| `insert-many` | Add two rows to customers in one statement, id 8 with name Gustav and id 9 with name Hanna, naming only the columns id and name (en) / Lägg till två rader i customers med en enda sats, id 8 med name Gustav och id 9 med name Hanna, där bara kolumnerna id och name anges (sv) | INSERT INTO customers (id, name) VALUES (8, 'Gustav'), (9, 'Hanna'); (zxx) | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD insert-many — Both reported 2 rows inserted: 8 Gustav and 9 Hanna, with the other columns NULL.<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_insert.html (Overview) — The first form (with the "VALUES" keyword) creates one or more new rows in an existing table.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/sql-insert.html (Synopsis; Examples) — VALUES ( { expression \| DEFAULT } [, ...] ) [, ...]; the examples show how 'To insert multiple rows using the multirow VALUES syntax'. |
| `update` | Set city to Lund in the row of customers whose id is 2 (en) / Sätt city till Lund i den rad i customers vars id är 2 (sv) | UPDATE customers SET city = 'Lund' WHERE id = 2; (zxx) — *Without WHERE, UPDATE changes every row. (en) / Utan WHERE ändrar UPDATE alla rader. (sv)* | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD update — Both reported 1 row updated; afterwards Bo (id 2) had city Lund and the other rows were unchanged. UPDATE customers SET city = 'Lund'; without WHERE changed all 7 rows (NOTES).<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_update.html (Overview) — If the UPDATE statement does not have a WHERE clause, all rows in the table are modified by the UPDATE. Otherwise, the UPDATE affects only those rows for which the WHERE clause boolean expression is true.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/sql-update.html (Description) — UPDATE changes the values of the specified columns in all rows that satisfy the condition. Only the columns to be modified need be mentioned in the SET clause. |
| `update-expression` | Multiply price by 1.1 in every row of products (en) / Multiplicera price med 1,1 i alla rader i products (sv) | UPDATE products SET price = price * 1.1; (zxx) — *In SQLite the result can be inexact: in the deck's example table, where price is NUMERIC(10, 2), 200 becomes 220.00000000000003. (en) / I SQLite kan resultatet bli inexakt: i kortlekens exempeltabell, där price är NUMERIC(10, 2), ändras 200 till 220,00000000000003. (sv)* | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD update-expression — Both reported 8 rows updated; Atlas went from 150 to 165 and Pen from 12.50 to 13.75 (PostgreSQL showed 165.00 and 13.75; SQLite showed 165 and 13.750000000000002: in the price column, NUMERIC(10, 2), it stored inexact results such as 220.00000000000003 for Lamp as floating-point numbers and exact ones such as 165 for Atlas as integers).<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_update.html (Overview) — The scalar expressions may refer to columns of the row being updated. In this case all scalar expressions are evaluated before any assignments are made.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/sql-update.html (Parameters: expression) — expression: An expression to assign to the column. The expression can use the old values of this and other columns in the table. |
| `delete` | Delete the row of customers whose id is 5 (en) / Ta bort den rad i customers vars id är 5 (sv) | DELETE FROM customers WHERE id = 5; (zxx) | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD delete — Both reported 1 row deleted; the remaining ids were 1, 2, 3, 4, 6 and 7.<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_delete.html (Overview) — If a WHERE clause is supplied, then only those rows for which the WHERE clause boolean expression is true are deleted. Rows for which the expression is false or NULL are retained.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/sql-delete.html (Description) — DELETE deletes rows that satisfy the WHERE clause from the specified table. |
| `delete-all` | Delete every row of orders but keep the table (en) / Ta bort alla rader i orders men behåll tabellen (sv) | DELETE FROM orders; (zxx) — *PostgreSQL also has TRUNCATE orders; SQLite has no TRUNCATE. (en) / PostgreSQL har också TRUNCATE orders; SQLite saknar TRUNCATE. (sv)* | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD delete-all — Both reported 5 rows deleted, and SELECT COUNT(*) FROM orders then returned 0 (the table still existed). TRUNCATE orders emptied the table in PostgreSQL and stopped SQLite with 'near "TRUNCATE": syntax error' (NOTES).<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_delete.html (Overview; 4. The Truncate Optimization) — If the WHERE clause is not present, all records in the table are deleted. When the WHERE clause and RETURNING clause are both omitted ... SQLite erases the table content without visiting each row: this "truncate" optimization makes the delete run much faster. The list of statements in lang.html (SQL As Understood By SQLite) has no TRUNCATE statement.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/sql-delete.html (Description); sql-truncate.html — If the WHERE clause is absent, the effect is to delete all rows in the table. The result is a valid, but empty table. TRUNCATE provides a faster mechanism to remove all rows from a table. |
| `create-table` | Create a table customers with an INTEGER column id as its primary key and a TEXT column name that must not be NULL (en) / Skapa en tabell customers med en INTEGER-kolumn id som primärnyckel och en TEXT-kolumn name som inte får vara NULL (sv) | CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT NOT NULL); (zxx) — *VARCHAR(100) in place of TEXT is accepted by both too. (en) / VARCHAR(100) i stället för TEXT godtas också av båda. (sv)* | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD create-table — In an empty database both created the table and accepted (1, 'Ada'); a second row with id 1 was refused (SQLite 'UNIQUE constraint failed: customers.id', PostgreSQL 'duplicate key value violates unique constraint "customers_pkey"') and a NULL name was refused as a NOT NULL violation in both. VARCHAR(100) in place of TEXT was accepted by both (NOTES).<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_createtable.html (3.5 The PRIMARY KEY; 3.8 NOT NULL constraints) — Each table in SQLite may have at most one PRIMARY KEY. If the keywords PRIMARY KEY are added to a column definition, then the primary key for the table consists of that single column ... A NOT NULL constraint may only be attached to a column definition.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/sql-createtable.html (PRIMARY KEY; NOT NULL); datatype-character.html — The PRIMARY KEY constraint specifies that a column or columns of a table can contain only unique (non-duplicate), nonnull values. NOT NULL: the column is not allowed to contain null values. (datatype-character.html: SQL defines two primary character types: character varying(n) and character(n) ... Although the text type is not in the SQL standard, several other SQL database management systems have it as well.)<br>Wikidata: https://www.wikidata.org/wiki/Q934729 (label, sv) — Q934729 'primary key' ('set of attributes (columns) that uniquely specify a tuple (row) in a relation') has the Swedish label 'primärnyckel'.<br>Swedish Wikipedia: articles Databasnyckel and Structured Query Language: https://sv.wikipedia.org/wiki/Databasnyckel (sections Primär nyckel, Främmande nycklar) — The article uses 'primärnyckel', 'kolumner', 'tabell', 'index' and 'främmande nyckel' ('En främmande nyckel är värdet på en primärnyckel i en annan tabell').<br>Wikidata checks: Q934729 sv = primärnyckel |
| `create-table-fk` | Create a table orders with an INTEGER column id as its primary key and an INTEGER column customer_id that references id in customers (en) / Skapa en tabell orders med en INTEGER-kolumn id som primärnyckel och en INTEGER-kolumn customer_id som refererar till id i customers (sv) | CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER REFERENCES customers (id)); (zxx) — *SQLite enforces the reference only after PRAGMA foreign_keys = ON; (en) / SQLite kontrollerar referensen först efter PRAGMA foreign_keys = ON; (sv)* | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD create-table-fk — With customers present both created the table and accepted an order for customer 1. In the full fixture an order for the nonexistent customer 99 was accepted by SQLite by default and refused by PostgreSQL ('violates foreign key constraint'); after PRAGMA foreign_keys = ON; SQLite refused it too ('FOREIGN KEY constraint failed'). The table-constraint form FOREIGN KEY (customer_id) REFERENCES customers (id) was accepted by both (NOTES).<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_createtable.html (column-constraint syntax: foreign-key-clause); foreignkeys.html (2. Enabling Foreign Key Support) — A column constraint may be REFERENCES foreign-table ( column-name ). Foreign key constraints are disabled by default (for backwards compatibility), so must be enabled separately for each database connection: PRAGMA foreign_keys = ON;<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/sql-createtable.html (REFERENCES) — REFERENCES reftable [ ( refcolumn ) ] (column constraint): These clauses specify a foreign key constraint, which requires that a group of one or more columns of the new table must only contain values that match values in the referenced column(s) of some row of the referenced table.<br>Wikidata: https://www.wikidata.org/wiki/Q934729 (label, sv) — Q934729 'primary key' ('set of attributes (columns) that uniquely specify a tuple (row) in a relation') has the Swedish label 'primärnyckel'.<br>Swedish Wikipedia: articles Databasnyckel and Structured Query Language: https://sv.wikipedia.org/wiki/Databasnyckel (sections Primär nyckel, Främmande nycklar) — The article uses 'primärnyckel', 'kolumner', 'tabell', 'index' and 'främmande nyckel' ('En främmande nyckel är värdet på en primärnyckel i en annan tabell').<br>Wikidata checks: Q934729 sv = primärnyckel |
| `alter-add-column` | Add a TEXT column phone to the table customers (en) / Lägg till en TEXT-kolumn phone i tabellen customers (sv) | ALTER TABLE customers ADD COLUMN phone TEXT; (zxx) — *The word COLUMN may be left out. (en) / Ordet COLUMN kan utelämnas. (sv)* | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD alter-add-column — Both added the column; SELECT * then showed phone as a sixth column, NULL for the existing rows. ADD phone TEXT without the word COLUMN worked too (NOTES: ADD without COLUMN).<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_altertable.html (4. ALTER TABLE ADD COLUMN) — The ADD COLUMN syntax is used to add a new column to an existing table. The new column is always appended to the end of the list of existing columns.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/sql-altertable.html (ADD [ COLUMN ]; Notes) — This form adds a new column to the table, using the same syntax as CREATE TABLE ... The key word COLUMN is noise and can be omitted. |
| `alter-rename-column` | Rename the column name of the table customers to full_name (en) / Byt namn på kolumnen name i tabellen customers till full_name (sv) | ALTER TABLE customers RENAME COLUMN name TO full_name; (zxx) | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD alter-rename-column — Both renamed it; SELECT id, full_name FROM customers WHERE id = 1 then returned 1, Ada.<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_altertable.html (3. ALTER TABLE RENAME COLUMN) — The RENAME COLUMN TO syntax changes the column-name of table table-name into new-column-name.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/sql-altertable.html (Synopsis; RENAME) — ALTER TABLE ... RENAME [ COLUMN ] column_name TO new_column_name. |
| `alter-drop-column` | Remove the column email from the table customers (en) / Ta bort kolumnen email ur tabellen customers (sv) | ALTER TABLE customers DROP COLUMN email; (zxx) | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD alter-drop-column — Both removed it; SELECT * then showed the columns id, name, city and country.<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_altertable.html (5. ALTER TABLE DROP COLUMN) — The DROP COLUMN syntax is used to remove an existing column from a table.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/sql-altertable.html (DROP [ COLUMN ]) — This form drops a column from a table. Indexes and table constraints involving the column will be automatically dropped as well. |
| `drop-table` | Remove the table orders together with all its rows (en) / Ta bort tabellen orders med alla dess rader (sv) | DROP TABLE orders; (zxx) — *DROP TABLE IF EXISTS orders; gives no error if the table is missing. (en) / DROP TABLE IF EXISTS orders; ger inget fel om tabellen saknas. (sv)* | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD drop-table — Both dropped it; SELECT * FROM orders then failed ('no such table: orders' / 'relation "orders" does not exist'). A second DROP TABLE orders failed, while DROP TABLE IF EXISTS orders succeeded (NOTES).<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_droptable.html — The DROP TABLE statement removes a table added with the CREATE TABLE statement ... The optional IF EXISTS clause suppresses the error that would normally result if the table does not exist.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/sql-droptable.html (Description; IF EXISTS) — DROP TABLE removes tables from the database ... To empty a table of rows without destroying the table, use DELETE or TRUNCATE. IF EXISTS: Do not throw an error if the table does not exist. |
| `create-index` | Create an index named idx_customers_city on the column city of customers (en) / Skapa ett index med namnet idx_customers_city på kolumnen city i customers (sv) | CREATE INDEX idx_customers_city ON customers (city); (zxx) — *CREATE UNIQUE INDEX also forbids duplicate values. (en) / CREATE UNIQUE INDEX förbjuder dessutom dubbletter. (sv)* | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD create-index — Both created it; the catalogue (sqlite_master in SQLite, pg_indexes in PostgreSQL) then listed idx_customers_city on customers. CREATE UNIQUE INDEX idx_customers_email ON customers (email); then refused a second ada@example.com in both (NOTES: UNIQUE INDEX).<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_createindex.html — The CREATE INDEX command consists of the keywords "CREATE INDEX" followed by the name of the new index, the keyword "ON", the name of a previously created table that is to be indexed, and a parenthesized list of table column names ... If the UNIQUE keyword appears between CREATE and INDEX then duplicate index entries are not allowed.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/sql-createindex.html (Synopsis; Description; UNIQUE) — CREATE [ UNIQUE ] INDEX ... name ON table_name ( column_name ... ). CREATE INDEX constructs an index on the specified column(s) of the specified relation. UNIQUE causes the system to check for duplicate values. |
| `drop-index` | Remove the index idx_customers_city (en) / Ta bort indexet idx_customers_city (sv) | DROP INDEX idx_customers_city; (zxx) | Test run of every statement in SQLite 3.53.1 and PostgreSQL 16.2 on a small example database: CARD drop-index — After the index had been created, both dropped it, and the catalogue query then listed no index on customers (the query leaves out PostgreSQL's own primary-key index).<br>SQL As Understood By SQLite (the SQLite documentation, sqlite.org): https://www.sqlite.org/lang_dropindex.html — The DROP INDEX statement removes an index added with the CREATE INDEX statement.<br>PostgreSQL 18 Documentation (postgresql.org/docs/current): https://www.postgresql.org/docs/current/sql-dropindex.html (Description) — DROP INDEX drops an existing index from the database system. |
