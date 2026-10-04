# Media types (MIME types) — provenance report

<!-- Generated from authored/media-types.json by scripts/authored_decks.py. Do not edit: change the dossier and rebuild. -->

**Deck:** [`decks/media-types.ttl`](../decks/media-types.ttl) · **Cards:** 40 · **Licence:** [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) · **Compiled by:** Anton Wiklund · **Created:** 2026-10-04

40 common file types and the media types (MIME types) they are registered under in the IANA Media Types registry, as of its update of 24 September 2026: text, documents and data, archives, images, audio, video and fonts. Front: the kind of file with its usual extension, e.g. "PNG image (.png)"; back: the registered media type, e.g. "image/png". Notes give the obsolete, deprecated or alias types that the registry, its templates or the RFCs name, such as application/javascript. Media types from the IANA registry, extensions from Wikidata, checked against IANA's registration templates, the RFCs and MDN Web Docs.

## Sources

| Source | Creator | Licence | Role | Retrieved | Used for |
|---|---|---|---|---|---|
| [Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24)](https://www.iana.org/assignments/media-types/media-types.xhtml) | Internet Assigned Numbers Authority (IANA), operated by Public Technical Identifiers, an affiliate of ICANN | [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) | content | 2026-10-04 | The media type on every back (the registry's "Template" column, i.e. type/subtype), the check that each is registered and not marked OBSOLETED or DEPRECATED, and the registry rows behind the notes (application/javascript and application/vnd.geo+json obsoleted, text/xml registered, image/x-icon absent). |
| [IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png)](https://www.iana.org/assignments/media-types/) | Internet Assigned Numbers Authority (IANA); the templates were written by each type's registrant (often as part of an RFC) | Unknown | verification | 2026-10-04 | Confirming the file extension on every front (the template's "File extension(s)" field; for application/zip, PKWARE's application note filed as its template; text/plain and image/gif have no template) and the deprecated aliases named in the notes. |
| [Wikidata: file formats with their MIME type (P1163) and file extension (P1195)](https://www.wikidata.org/) | Wikidata contributors | [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) | content | 2026-10-04 | The file extension on every front (P1195), an independent check of every media type (P1163, best rank), the format names and their Swedish labels and aliases (Javascript, Zip, Epub, Opendocument, Truetype, V-card, Stilmall). |
| [The RFCs that register or define the media types on the cards: RFC 2046, 3003, 3302, 4180, 4337, 5334, 5545, 6350, 6713, 6922, 7303, 7763, 7903, 7946, 8081, 8118, 8259, 9239, 9512, 9559, 9639 and 9649 (plain-text versions from the RFC Editor)](https://www.rfc-editor.org/) | IETF, the Independent Submission stream (RFC 7903) and the authors of each RFC; published by the RFC Editor | All rights reserved | verification | 2026-10-04 | Confirming each type's registration and file extension in the RFC that defines it (where there is one), and the statements behind the notes: text/javascript the only current JavaScript type (RFC 9239), text/xml an alias and application/xml recommended (RFC 7303), .ogg for Vorbis-only Ogg files (RFC 5334). Nothing copied but attributed citations. |
| [Common media types (MDN Web Docs)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types/Common_types) | Mozilla and individual contributors | [CC BY-SA 2.5](https://creativecommons.org/licenses/by-sa/2.5/) | verification | 2026-10-04 | An independent, non-IANA check of the extension and media type of the 33 cards whose type MDN's table lists (read from the page's source file in the mdn/content repository). The deck's selection was made before this table was consulted and does not follow it. Nothing copied. |
| [Svenska Akademiens ordböcker: Svenska Akademiens ordlista (SAOL) and Svensk ordbok (SO)](https://svenska.se/) | Svenska Akademien | All rights reserved | verification | 2026-10-04 | Confirming that the Swedish common nouns on the fronts are dictionary words (teckensnitt, arbetsbok, e-bok, ljudfil, textfil, arkiv, dokument, bild, ikon, presentation, modul, fil, webb, komprimera) through the search API behind svenska.se. |

**Content** sources supplied information that is in the cards. **Verification** sources were only consulted to confirm facts: nothing was copied from them.

### Licence evidence

- **Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24)** — https://www.iana.org/help/licensing-terms (Joint Statement of IANA and IETF Concerning Copyright Rights in the Protocol Registries, 10 November 2021): "“Protocol Registries” means the technical protocol registry data directly linked at either https://www.iana.org/protocols or https://www.ietf.org/assignments/ ; it does not include any other material on or linked from those pages (e.g., the RFC documents that are linked on those pages are excluded)." … "both IANA and IETF affirm that any applicable rights that they may have in the Protocol Registries are subject to the Creative Commons CC0 1.0 dedication". The Media Types registry is linked directly from https://www.iana.org/protocols (checked in the saved page).
- **IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png)** — The CC0 joint statement (https://www.iana.org/help/licensing-terms) covers the "technical protocol registry data directly linked" at https://www.iana.org/protocols and excludes "any other material on or linked from those pages (e.g., the RFC documents …)". The templates are linked from the registry, not from the protocols page, and many reproduce RFC text (IETF Trust terms, see the RFC source). Their status is therefore treated as unknown, and they are used for verification only: nothing copied but short citations in the evidence.
- **Wikidata: file formats with their MIME type (P1163) and file extension (P1195)** — https://www.wikidata.org/wiki/Wikidata:Licensing — "All structured data (i.e. the main, Property, Lexeme, and EntitySchema namespaces) is released into the public domain under Creative Commons Zero."
- **The RFCs that register or define the media types on the cards: RFC 2046, 3003, 3302, 4180, 4337, 5334, 5545, 6350, 6713, 6922, 7303, 7763, 7903, 7946, 8081, 8118, 8259, 9239, 9512, 9559, 9639 and 9649 (plain-text versions from the RFC Editor)** — IETF Trust Legal Provisions 5.0 (https://trustee.ietf.org/wp-content/uploads/Corrected-TLP-5.0-legal-provsions.pdf, linked from https://trustee.ietf.org/documents/trust-legal-provisions/), Section 3.c grants outside the IETF Standards Process only rights "to copy, publish, display and distribute IETF Contributions and IETF Documents in full and without modification" and "unmodified portions … provided that … each such portion is clearly attributed to IETF and identifies the RFC"; Section 3.d: not granted is "any license to modify IETF Contributions or IETF Documents, or portions thereof … in any context outside the IETF Standards Process". Used for verification only; the evidence quotes short unmodified portions, each naming its RFC. TLP 5.0 Section 2.b applies its licences "only with respect to … IETF RFCs and other IETF Documents that are published after the Effective Date" (25 March 2015), and Section 2.c leaves earlier ones (RFC 2046, 3003, 3302, 4180, 4337, 5334, 5545, 6350, 6713, 6922 and 7303) "subject to the licensing provisions of the IETF copyright policy document in effect at the time of their contribution or publication" (RFCs 2026, 3978, 4748 and earlier TLP versions), none of which is a licence to modify outside the IETF; RFC 7903 is an Independent Submission, to which Section 8.f applies the same Legal Provisions ("applied to documents submitted and published in the Independent Submission Stream following December 28, 2009").
- **Common media types (MDN Web Docs)** — https://github.com/mdn/content/blob/main/LICENSE.md — "All prose content is available under ([CC-BY-SA 2.5](https://creativecommons.org/licenses/by-sa/2.5/))." Used for verification only, so the deck takes on no share-alike condition.
- **Svenska Akademiens ordböcker: Svenska Akademiens ordlista (SAOL) and Svensk ordbok (SO)** — https://svenska.se/om-webbplatsen/ (curl, without running its scripts) shows only the footer "© Svenska Akademien" and no licence or reuse statement; treated as all rights reserved, so used for verification only, nothing copied.

## Licensing

The deck is CC0 1.0. Its content sources are IANA's Media Types registry, whose data IANA and the IETF dedicate to the public domain under CC0 1.0 (joint statement of 10 November 2021), and Wikidata, whose structured data is CC0. The media types come from the registry, the file extensions and format names from Wikidata, and the selection of 40 types is the compiler's own, made by the criteria under Selection; the wording of the fronts and notes is the compiler's own. IANA's registration templates (status unknown, often reproducing RFC text), the RFCs (IETF Trust Legal Provisions: no licence to modify outside the IETF), MDN Web Docs (CC BY-SA 2.5) and Svenska Akademien's dictionaries (© Svenska Akademien, no licence stated) were used only to verify facts the content sources gave: no text, list or selection was taken from them, and MDN's table was consulted only after the selection was made. The evidence in the provenance report quotes short, unmodified passages of them, each attributed to its source and, for the RFCs, naming the RFC, as citations. That a type is registered under a name and used with an extension is a fact, so verifying it against these sources puts no conditions on the deck. Some fronts coincide with generic descriptions also used in MDN's table (e.g. "ZIP archive", "RAR archive"); these are ordinary names of the formats, not text taken from MDN. The RFCs published before 25 March 2015 fall under the IETF copyright provisions in force when they were published, and the Independent Submission RFC 7903 under the Legal Provisions as applied to that stream; none grants a licence to modify, and the deck relies on none, since it only cites them.

## Method

1. Who did the work: Anton Wiklund compiled this deck with the help of AI agents (Claude, by Anthropic), which did the research, drafting and cross-checking at his direction. The cards were checked by machine (a script that stops on any mismatch with IANA's registry tables, registration templates, the RFCs and MDN, live Wikidata and the app's SHACL and DCAT-AP validators) and in independent review rounds by further Claude agents, each logged under Quality control with its findings and how they were resolved. Anton Wiklund reviews every deck in full before it is released.
2. 1. Registry: IANA's Media Types registry was downloaded on 2026-10-04 as media-types.xml (header "updated 2026-09-24") and as the eight per-type CSV tables (application, audio, font, image, model, text, video, multipart; query 1). IANA's licensing-terms page and the protocols page were saved with it to confirm that the registry is one of the CC0 "Protocol Registries". Each CSV row gives the subtype name (with any OBSOLETED or DEPRECATED marker), the full type in the "Template" column and the references.
3. 2. Candidates: a list of 104 candidate types for file formats in everyday use (documents, data and web files, archives, images, audio, video, fonts and 3D models, together with the unofficial names often seen for them, such as audio/wav or video/webm) was written from general knowledge and looked up in the CSV tables by look.py (query 2), which printed for each whether it is registered and with which references. Unregistered types were dropped (see Selection).
4. 3. Registration templates: for 61 shortlisted types (the registered candidates most likely to make a card, and the types they could be confused with), IANA's registration template was downloaded (templates.py and templates2.py, queries 3 and 4) and its "File extension(s)" field and any deprecated-alias statements were extracted (exts.py, query 5). This showed where a file extension belongs to more than one registered type (.ttf and .otf under font/ttf, font/otf and font/sfnt; .xml under application/xml and text/xml; RTF registered both as application/rtf and as text/rtf) and that the video/quicktime template names no extension.
5. 4. Wikidata: the file-format items carrying each media type as P1163 (MIME type) were listed with their file extensions (P1195), labels and number of sitelinks (queries 6 to 8), and for each card the main format item was chosen: the item with the most sitelinks whose best-rank P1163 holds the card's type and whose P1195 holds the card's extension; where the general item lacks the statement, a more specific item was used (JPEG: Q110098625 Exif Image File Format (Compressed), since the general JPEG item Q2195 holds image/jpeg only at deprecated rank and has no P1195; Office Open XML: the three ECMA-376 1st Edition document items; FLAC: Q131481410; Matroska: Q27967512 Matroska Video; WOFF2: Q18413771). Query 10 fetched every P1163 statement with its rank and the best-rank (truthy) P1195 values of the items used on the cards and of the JFIF item Q26329975 (query 11 for the JPEG item Q110098625 and the general JPEG item Q2195); query 12 fetched their English and Swedish labels, Swedish aliases and Swedish Wikipedia titles. After review, query 16 (q8.rq) fetched every P1195 statement of the 40 items with its rank; the evidence quotes that full list (e.g. GeoJSON Q5533904: geojson preferred, json normal), and every card's extension is a best-rank value.
6. 5. RFCs and MDN: the RFCs named in the registry's references for the chosen types were downloaded in plain text from the RFC Editor, with the IETF Trust Legal Provisions (query 13); MDN's "Common media types" table was downloaded as the Markdown source of the page from the mdn/content repository with its licence file, and parsed into rows by mdn.py (query 14).
7. 6. Cards: cards.py (query 15) assembled every card from the saved files: the registry row (stopping if the type is missing or marked OBSOLETED or DEPRECATED), the template's extension field, the Wikidata statements (stopping unless the card's type is a best-rank P1163 value and the card's extension a P1195 value of the item), the RFC's "File extension(s)" line (located under the matching "Type name" and "Subtype name") and the MDN row (stopping if MDN gives another type). Every "says" text is cut from the saved file it cites. make_dossier.py (query 18) then added the registry rows and RFC passages behind the notes, added the font/otf template and the extra font/ttf template lines, replaced cards.py's TrueType note with a reworded one, added the Swedish-dictionary and Swedish-alias evidence and wrote this dossier with its documentation; sparql.py (query 17) ran every SPARQL query, and grep.py and rfcext.py (query 19) were used to read the saved files.
8. 7. Wording: the front names the kind of file in plain words with the extension in brackets, in English and Swedish (the compiler's own wording, e.g. "PNG image (.png)" / "PNG-bild (.png)"). Format names follow Wikidata's Swedish labels where Swedish writes them differently (Javascript, Zip, Epub, Opendocument, Truetype, V-card, Powerpoint as in "Microsoft Powerpoint"). This one rule is applied to every Swedish format name, so the deck keeps Wikidata's Swedish form even where it keeps internal capitals (WebAssembly, WebP, iCalendar), rather than imposing a single capitalisation style; V-card is also the Swedish Wikipedia title; "stilmall" is a Swedish alias of the CSS item; the Swedish common nouns were looked up in SAOL and Svensk ordbok through svenska.se's search API (query 9): teckensnitt, arbetsbok, e-bok, ljudfil, textfil, arkiv, dokument, bild, ikon, presentation, modul, fil, webb and komprimera have entries in SAOL, and all but textfil also in Svensk ordbok; videofil, textdokument and stilmall are in neither and are regular compounds (video + fil, text + dokument, stil + mall). The back is the media type exactly as in the registry's "Template" column, as text in no language (zxx), since a media type is a code.
9. 8. Notes: a back note names an obsolete, deprecated or unregistered name still seen for the same files where the registry, the template or the RFC states it (application/x-gzip and similar informal names, application/javascript, text/xml, text/x-vcard and text/directory, the YAML x- names, application/vnd.geo+json, application/x-rar-compressed, image/x-icon, audio/x-flac, video/x-matroska, application/font-woff), or explains the extension (.ogg, .ttf). The XML card has a front note, because both application/xml and text/xml are registered for .xml files: it asks for the type RFC 7303 recommends.
10. 9. Machine checks: for every card the builder checks against live Wikidata that the format item has the card's media type as a best-rank P1163 value and the card's extension as a best-rank P1195 value (80 checks). These confirm the Wikidata side only; the IANA registry row, the template and the RFC for every card rest on the saved files and the stops in cards.py, recorded in each card's evidence. The built deck was validated with the app's SHACL and DCAT-AP validators (validate_sources.ts).
11. 10. Review: three independent review rounds (facts; language and tags; licensing and documentation) were resolved by round1.py (query 21), which reads the saved files, rewrites the Wikidata evidence from query 16, adds the gzip note and its RFC 6713 passage, the font/sfnt template line, the reworded Swedish notes and TrueType note, and the documentation changes, and logs rounds 1 to 3. "utfasad" for "deprecated" was checked in Svensk ordbok ("fasa ut": "successivt avveckla"; query 21).

## Selection

40 file types in common use, as of IANA's Media Types registry of 24 September 2026: 8 text formats (plain text, HTML, CSS, JavaScript, CSV, Markdown, iCalendar, vCard), 15 application formats (JSON, PDF, ZIP, gzip, XML, EPUB, the three Office Open XML documents, OpenDocument text, WebAssembly, SQL, YAML, GeoJSON, RAR), 9 image formats (PNG, JPEG, GIF, SVG, WebP, AVIF, BMP, TIFF, ICO), 3 audio formats (MP3, Ogg Vorbis, FLAC), 2 video formats (MP4, Matroska) and 3 fonts (WOFF, WOFF2, TrueType). A type is in the deck only if (a) it is registered in the IANA registry and not marked OBSOLETED or DEPRECATED there; (b) the extension on the front is named for it by its IANA template or RFC, or, for text/plain and image/gif, which have no template, and application/zip, whose template has no extension field, by Wikidata and MDN; (c) the front, read with the description, has exactly one current registered answer; and (d) Wikidata has a format item with the type and the extension, so the card can be checked by machine. Left out because the common type is not registered: WAV (audio/wav, audio/x-wav and audio/vnd.wave are all absent from the registry), WebM (video/webm, audio/webm), MIDI (audio/midi), 7z, tar, bzip2 and xz archives, shell scripts, Android packages, AVI (video/x-msvideo) and RSS (application/rss+xml). Left out because the extension has more than one registered answer: RTF (application/rtf and text/rtf), OpenType .otf (font/otf, font/sfnt and font/ttf all list it). Left out because IANA's template names no extension: QuickTime (video/quicktime). Left out to keep the deck to about 40 cards, though registered: the legacy Microsoft Office formats (.doc, .xls, .ppt), the other OpenDocument types, HEIC, JPEG XL, APNG, AAC, Opus, MP4 audio (.m4a), Ogg video, 3GPP, MPEG video, MPEG transport streams, OpenType font collections, glTF, STL and other 3D models, JSON-LD, XHTML, the web app manifest, Zstandard, Java archives and SQLite databases. The Ogg card keeps audio/ogg although the registry also lists audio/vorbis (RFC 5215): that type depends on RTP framing and is defined only for transfer via RTP, so it is not a type for .ogg files; the back note says so. XML is kept with a front note: RFC 7303 registers text/xml as an alias of application/xml and recommends application/xml, so the card asks for the recommended type.

## Queries

**1. The registry, its licence statement and the protocols page (sh <scratch>/fetch.sh; the IETF Trust URL in it answered 404 and was replaced by query 13)** (Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24))

```
#!/bin/sh
S=<scratch>
UA="solid-memo deck research (https://github.com/antwika/solid-memo)"
cd "$S"
curl -sL -A "$UA" -o media-types.xml -w "%{http_code} %{url_effective} %{size_download}\n" https://www.iana.org/assignments/media-types/media-types.xml
curl -sL -A "$UA" -o licensing-terms.html -w "%{http_code} %{url_effective} %{size_download}\n" https://www.iana.org/help/licensing-terms
curl -sL -A "$UA" -o protocols.html -w "%{http_code} %{url_effective} %{size_download}\n" https://www.iana.org/protocols
curl -sL -A "$UA" -o ietf-trust-tlp.html -w "%{http_code} %{url_effective} %{size_download}\n" https://trustee.ietf.org/assets/documents/trust-legal-provisions/
for t in application audio font image model text video multipart; do
curl -sL -A "$UA" -o "$t.csv" -w "%{http_code} %{url_effective} %{size_download}\n" https://www.iana.org/assignments/media-types/$t.csv
done

```

**2. Which candidate types are registered (python3 <scratch>/look.py, reading the saved CSV tables)** (Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24))

```
import csv,sys,glob,os
S=os.path.dirname(os.path.abspath(__file__))
rows={}
for f in glob.glob(S+'/*.csv'):
    for r in csv.DictReader(open(f,encoding='utf-8')):
        rows[r['Template'].lower()]=r
want="""text/plain text/html text/css text/javascript application/javascript text/csv text/markdown text/calendar text/vcard text/xml text/tab-separated-values text/vtt
application/json application/pdf application/zip application/gzip application/xml application/rtf application/epub+zip
application/vnd.openxmlformats-officedocument.wordprocessingml.document application/vnd.openxmlformats-officedocument.spreadsheetml.sheet application/vnd.openxmlformats-officedocument.presentationml.presentation
application/vnd.oasis.opendocument.text application/vnd.oasis.opendocument.spreadsheet application/vnd.oasis.opendocument.presentation application/msword application/vnd.ms-excel application/vnd.ms-powerpoint
application/wasm application/sql application/yaml application/x-tar application/vnd.rar application/x-7z-compressed application/ld+json application/rss+xml application/atom+xml application/java-archive application/vnd.android.package-archive application/octet-stream application/postscript application/geo+json application/toml application/x-sh application/zstd application/x-bzip2 application/x-xz application/manifest+json application/xhtml+xml application/vnd.sqlite3 application/x-sqlite3 application/vnd.debian.binary-package application/vnd.apple.mpegurl application/dicom application/mbox
image/png image/jpeg image/gif image/svg+xml image/webp image/avif image/bmp image/tiff image/heic image/vnd.microsoft.icon image/jxl image/x-icon image/apng image/jp2
audio/mpeg audio/ogg audio/flac audio/wav audio/vnd.wave audio/x-wav audio/mp4 audio/aac audio/opus audio/midi audio/webm audio/matroska audio/3gpp
video/mp4 video/webm video/quicktime video/mpeg video/matroska video/x-matroska video/ogg video/3gpp video/mp2t video/x-msvideo video/av1
font/woff font/woff2 font/ttf font/otf font/collection model/gltf+json model/gltf-binary model/stl model/obj model/3mf model/vrml""".split()
for w in want:
    r=rows.get(w)
    print(w, '->', (r['Name'], r['Reference']) if r else 'NOT REGISTERED')

```

**3. Registration templates of the first candidates (python3 <scratch>/templates.py)** (IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png))

```
#!/usr/bin/env python3
"""Download the IANA registration template of every media type on the deck into <scratch>/templates/."""
import os, time, urllib.request

S = os.path.dirname(os.path.abspath(__file__))
UA = "solid-memo deck research (https://github.com/antwika/solid-memo)"
TYPES = """text/plain text/html text/css text/javascript application/javascript text/csv text/markdown text/calendar text/vcard
application/json application/pdf application/zip application/gzip application/xml text/xml application/epub+zip
application/vnd.openxmlformats-officedocument.wordprocessingml.document application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
application/vnd.openxmlformats-officedocument.presentationml.presentation application/vnd.oasis.opendocument.text application/wasm
application/sql application/yaml application/geo+json image/png image/jpeg image/gif image/svg+xml image/webp image/avif image/bmp image/tiff
image/vnd.microsoft.icon audio/mpeg audio/ogg audio/flac video/mp4 video/quicktime video/matroska font/woff font/woff2 font/ttf""".split()
os.makedirs(f"{S}/templates", exist_ok=True)
for t in TYPES:
    url = f"https://www.iana.org/assignments/media-types/{t}"
    out = f"{S}/templates/{t.replace('/', '__')}.txt"
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=60) as r:
            body = r.read()
            open(out, "wb").write(body)
            print(r.status, url, len(body))
    except Exception as e:
        print("ERR", url, e)
    time.sleep(1)

```

**4. Registration templates of further candidates and of the types they could be confused with (python3 <scratch>/templates2.py)** (IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png))

```
#!/usr/bin/env python3
"""Download further IANA registration templates (candidates and the types they could be confused with) into <scratch>/templates/."""
import os, time, urllib.request

S = os.path.dirname(os.path.abspath(__file__))
UA = "solid-memo deck research (https://github.com/antwika/solid-memo)"
TYPES = """font/otf font/sfnt font/collection application/vnd.rar application/xhtml+xml application/ld+json text/tab-separated-values video/ogg
application/vnd.oasis.opendocument.spreadsheet image/heic application/zstd application/ogg application/mp4 application/vnd.ms-excel
application/msword image/tiff-fx text/rtf application/rtf application/x-www-form-urlencoded""".split()
for t in TYPES:
    url = f"https://www.iana.org/assignments/media-types/{t}"
    out = f"{S}/templates/{t.replace('/', '__')}.txt"
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=60) as r:
            body = r.read()
            open(out, "wb").write(body)
            print(r.status, url, len(body))
    except Exception as e:
        print("ERR", url, e)
    time.sleep(1)

```

**5. The file-extension and deprecated-alias lines of every saved template (python3 <scratch>/exts.py)** (IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png))

```
#!/usr/bin/env python3
"""Print each saved template's size and its file-extension lines (with the following line)."""
import glob, os, re
S = os.path.dirname(os.path.abspath(__file__))
for f in sorted(glob.glob(f"{S}/templates/*.txt")):
    t = open(f, encoding="utf-8", errors="replace").read()
    lines = t.splitlines()
    print("==", os.path.basename(f), len(t))
    if len(t) < 100:
        print("   ", t.strip())
    for i, l in enumerate(lines):
        if re.search(r"extension", l, re.I):
            print("   ", l.strip(), "|", lines[i + 1].strip() if i + 1 < len(lines) else "")
        if re.search(r"deprecated|obsolete|alias", l, re.I):
            print("   *", l.strip())

```

**6. Every item with one of the candidate types as P1163, with extensions and labels (python3 <scratch>/sparql.py <scratch>/q1.rq <scratch>/q1.json; too many minor items, superseded by query 7)** (Wikidata: file formats with their MIME type (P1163) and file extension (P1195))

```
SELECT ?item ?mime ?rank ?ext ?en ?sv WHERE {
  VALUES ?mime { "text/plain" "text/html" "text/css" "text/javascript" "application/javascript" "text/csv" "text/markdown" "text/calendar" "text/vcard"
    "application/json" "application/pdf" "application/zip" "application/gzip" "application/xml" "text/xml" "application/epub+zip"
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document" "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    "application/vnd.openxmlformats-officedocument.presentationml.presentation" "application/vnd.oasis.opendocument.text" "application/wasm"
    "application/sql" "application/yaml" "application/geo+json" "image/png" "image/jpeg" "image/gif" "image/svg+xml" "image/webp" "image/avif"
    "image/bmp" "image/tiff" "image/vnd.microsoft.icon" "audio/mpeg" "audio/ogg" "audio/flac" "video/mp4" "video/quicktime" "video/matroska"
    "font/woff" "font/woff2" "font/ttf" }
  ?item p:P1163 ?st . ?st ps:P1163 ?mime ; wikibase:rank ?rank .
  OPTIONAL { ?item wdt:P1195 ?ext }
  OPTIONAL { ?item rdfs:label ?en FILTER(LANG(?en) = "en") }
  OPTIONAL { ?item rdfs:label ?sv FILTER(LANG(?sv) = "sv") }
}
ORDER BY ?mime ?item

```

**7. The same, limited to items with at least 8 sitelinks, grouped (python3 <scratch>/sparql.py q2.rq q2.json); sparql.py posts the query to https://query.wikidata.org/sparql with the User-Agent "solid-memo deck research (https://github.com/antwika/solid-memo)"** (Wikidata: file formats with their MIME type (P1163) and file extension (P1195))

```
SELECT ?mime ?item ?links ?rank ?en ?sv (GROUP_CONCAT(DISTINCT ?ext; separator=" ") AS ?exts) WHERE {
  VALUES ?mime { "text/plain" "text/html" "text/css" "text/javascript" "application/javascript" "text/csv" "text/markdown" "text/calendar" "text/vcard"
    "application/json" "application/pdf" "application/zip" "application/gzip" "application/xml" "text/xml" "application/epub+zip"
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document" "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    "application/vnd.openxmlformats-officedocument.presentationml.presentation" "application/vnd.oasis.opendocument.text" "application/wasm"
    "application/sql" "application/yaml" "application/geo+json" "image/png" "image/jpeg" "image/gif" "image/svg+xml" "image/webp" "image/avif"
    "image/bmp" "image/tiff" "image/vnd.microsoft.icon" "audio/mpeg" "audio/ogg" "audio/flac" "video/mp4" "video/quicktime" "video/matroska"
    "font/woff" "font/woff2" "font/ttf" }
  ?item p:P1163 ?st . ?st ps:P1163 ?mime ; wikibase:rank ?rank .
  ?item wikibase:sitelinks ?links .
  FILTER(?links >= 8)
  OPTIONAL { ?item wdt:P1195 ?ext }
  OPTIONAL { ?item rdfs:label ?en FILTER(LANG(?en) = "en") }
  OPTIONAL { ?item rdfs:label ?sv FILTER(LANG(?sv) = "sv") }
}
GROUP BY ?mime ?item ?links ?rank ?en ?sv
ORDER BY ?mime DESC(?links)

```

**8. Items by file extension for the types query 7 did not find, and items with the remaining types (python3 <scratch>/sparql.py q3.rq q3.json; then q4.rq q4.json)** (Wikidata: file formats with their MIME type (P1163) and file extension (P1195))

```
SELECT ?ext ?item ?links ?en ?sv (GROUP_CONCAT(DISTINCT CONCAT(?mime, " [", STRAFTER(STR(?rank), "#"), "]"); separator=" ; ") AS ?mimes) WHERE {
  VALUES ?ext { "flac" "mkv" "docx" "xlsx" "pptx" "woff2" "jpg" "jpeg" "odt" "gz" }
  ?item wdt:P1195 ?ext ; wikibase:sitelinks ?links .
  FILTER(?links >= 8)
  OPTIONAL { ?item p:P1163 ?st . ?st ps:P1163 ?mime ; wikibase:rank ?rank . }
  OPTIONAL { ?item rdfs:label ?en FILTER(LANG(?en) = "en") }
  OPTIONAL { ?item rdfs:label ?sv FILTER(LANG(?sv) = "sv") }
}
GROUP BY ?ext ?item ?links ?en ?sv
ORDER BY ?ext DESC(?links)

# q4.rq
SELECT ?mime ?item ?links ?rank ?en ?sv (GROUP_CONCAT(DISTINCT ?ext; separator=" ") AS ?exts) WHERE {
  VALUES ?mime { "audio/flac" "audio/x-flac" "video/matroska" "font/woff2" "image/heic" "image/heif" "application/vnd.rar" "application/x-rar-compressed"
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document" "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    "application/vnd.openxmlformats-officedocument.presentationml.presentation" "application/vnd.oasis.opendocument.spreadsheet" "image/jpeg" "image/gif" }
  ?item p:P1163 ?st . ?st ps:P1163 ?mime ; wikibase:rank ?rank .
  ?item wikibase:sitelinks ?links .
  OPTIONAL { ?item wdt:P1195 ?ext }
  OPTIONAL { ?item rdfs:label ?en FILTER(LANG(?en) = "en") }
  OPTIONAL { ?item rdfs:label ?sv FILTER(LANG(?sv) = "sv") }
}
GROUP BY ?mime ?item ?links ?rank ?en ?sv
ORDER BY ?mime DESC(?links)

```

**9. Swedish common nouns in SAOL and Svensk ordbok (python3 <scratch>/svenska.py), and the site's about page for its terms** (Svenska Akademiens ordböcker: Svenska Akademiens ordlista (SAOL) and Svensk ordbok (SO))

```
#!/usr/bin/env python3
"""Look up the Swedish common nouns on the fronts in SAOL and Svensk ordbok through svenska.se's search API; save to saol.json."""
import json, os, time, urllib.parse, urllib.request
S = os.path.dirname(os.path.abspath(__file__))
UA = "solid-memo deck research (https://github.com/antwika/solid-memo)"
out = {}
for w in ["teckensnitt", "stilmall", "arbetsbok", "ljudfil", "videofil", "textfil", "e-bok", "arkiv", "dokument", "bild", "ikon",
          "presentation", "modul", "fil", "textdokument", "komprimera", "webb"]:
    for dic in ("saol", "so"):
        url = f"https://svenska.se/api/search/{dic}?q={urllib.parse.quote(w)}&exactMatch=true"
        try:
            body = urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=60).read().decode("utf-8")
            data = json.loads(body)
        except Exception as e:
            data = {"error": str(e)}
        out[f"{dic}:{w}"] = data
        hits = data if isinstance(data, list) else data.get("results", data.get("hits", data))
        print(dic, w, "|", json.dumps(hits, ensure_ascii=False)[:220])
        time.sleep(0.5)
json.dump(out, open(f"{S}/saol.json", "w", encoding="utf-8"), indent=1, ensure_ascii=False)

# then:
curl -sL -A "solid-memo deck research (https://github.com/antwika/solid-memo)" -o svenska-om.html -w "%{http_code} %{url_effective} %{size_download}\n" https://svenska.se/om-webbplatsen/
```

**10. All P1163 statements with rank, the truthy P1163 values and the P1195 values of the items used on the cards (python3 <scratch>/sparql.py q6.rq q6.json; the evidence cites it as "query 10 (q6.rq)")** (Wikidata: file formats with their MIME type (P1163) and file extension (P1195))

```
SELECT ?item ?en (GROUP_CONCAT(DISTINCT CONCAT(?mime, " [", STRAFTER(STR(?rank), "#"), "]"); separator=" ; ") AS ?mimes)
       (GROUP_CONCAT(DISTINCT ?truthy; separator=" ; ") AS ?truthyMimes) (GROUP_CONCAT(DISTINCT ?ext; separator=" ") AS ?exts) WHERE {
  VALUES ?item { wd:Q86920 wd:Q8811 wd:Q46441 wd:Q2005 wd:Q935809 wd:Q1193600 wd:Q284651 wd:Q305941 wd:Q2063 wd:Q42332 wd:Q136218
    wd:Q10287816 wd:Q2115 wd:Q475488 wd:Q3033641 wd:Q3570403 wd:Q3596397 wd:Q184473 wd:Q20155677 wd:Q47607 wd:Q281876 wd:Q5533904
    wd:Q243303 wd:Q178051 wd:Q26329975 wd:Q2192 wd:Q2078 wd:Q62617958 wd:Q59913607 wd:Q192869 wd:Q215106 wd:Q729366 wd:Q42591
    wd:Q11885120 wd:Q131481410 wd:Q336316 wd:Q27967512 wd:Q918221 wd:Q18413771 wd:Q751800 }
  OPTIONAL { ?item rdfs:label ?en FILTER(LANG(?en) = "en") }
  OPTIONAL { ?item p:P1163 ?st . ?st ps:P1163 ?mime ; wikibase:rank ?rank . }
  OPTIONAL { ?item wdt:P1163 ?truthy }
  OPTIONAL { ?item wdt:P1195 ?ext }
}
GROUP BY ?item ?en

```

**11. The same for the JPEG items (python3 <scratch>/sparql.py q7.rq q7.json)** (Wikidata: file formats with their MIME type (P1163) and file extension (P1195))

```
SELECT ?item ?en (GROUP_CONCAT(DISTINCT CONCAT(?mime, " [", STRAFTER(STR(?rank), "#"), "]"); separator=" ; ") AS ?mimes)
       (GROUP_CONCAT(DISTINCT ?truthy; separator=" ; ") AS ?truthyMimes) (GROUP_CONCAT(DISTINCT ?ext; separator=" ") AS ?exts) WHERE {
  VALUES ?item { wd:Q110098625 wd:Q2195 }
  OPTIONAL { ?item rdfs:label ?en FILTER(LANG(?en) = "en") }
  OPTIONAL { ?item p:P1163 ?st . ?st ps:P1163 ?mime ; wikibase:rank ?rank . }
  OPTIONAL { ?item wdt:P1163 ?truthy }
  OPTIONAL { ?item wdt:P1195 ?ext }
}
GROUP BY ?item ?en

```

**12. English and Swedish labels, Swedish aliases and Swedish Wikipedia titles of the format items (python3 <scratch>/sparql.py q5.rq q5.json; the evidence cites it as "query 12 (q5.rq)")** (Wikidata: file formats with their MIME type (P1163) and file extension (P1195))

```
SELECT ?item ?en ?sv ?svtitle (GROUP_CONCAT(DISTINCT ?alias; separator=" ; ") AS ?svaliases) WHERE {
  VALUES ?item { wd:Q86920 wd:Q8811 wd:Q46441 wd:Q2005 wd:Q935809 wd:Q1193600 wd:Q284651 wd:Q305941 wd:Q2063 wd:Q42332 wd:Q136218
    wd:Q10287816 wd:Q2115 wd:Q475488 wd:Q279979 wd:Q184473 wd:Q20155677 wd:Q47607 wd:Q281876 wd:Q5533904 wd:Q243303 wd:Q178051
    wd:Q2195 wd:Q2192 wd:Q2078 wd:Q62617958 wd:Q59913607 wd:Q192869 wd:Q215106 wd:Q729366 wd:Q42591 wd:Q11885120 wd:Q27881556
    wd:Q336316 wd:Q223535 wd:Q918221 wd:Q751800 wd:Q11266 wd:Q11272 wd:Q2003 }
  OPTIONAL { ?item rdfs:label ?en FILTER(LANG(?en) = "en") }
  OPTIONAL { ?item rdfs:label ?sv FILTER(LANG(?sv) = "sv") }
  OPTIONAL { ?item skos:altLabel ?alias FILTER(LANG(?alias) = "sv") }
  OPTIONAL { ?a schema:about ?item ; schema:isPartOf <https://sv.wikipedia.org/> ; schema:name ?svtitle }
}
GROUP BY ?item ?en ?sv ?svtitle

```

**13. The RFCs, the IETF Trust Legal Provisions page and MDN's table and licence (python3 <scratch>/fetch2.py), then the TLP 5.0 PDF** (The RFCs that register or define the media types on the cards: RFC 2046, 3003, 3302, 4180, 4337, 5334, 5545, 6350, 6713, 6922, 7303, 7763, 7903, 7946, 8081, 8118, 8259, 9239, 9512, 9559, 9639 and 9649 (plain-text versions from the RFC Editor))

```
#!/usr/bin/env python3
"""Fetch the IETF Trust legal provisions, the RFCs cited on the cards and MDN's list of common media types into <scratch>/."""
import os, time, urllib.request

S = os.path.dirname(os.path.abspath(__file__))
UA = "solid-memo deck research (https://github.com/antwika/solid-memo)"
URLS = {
    "ietf-tlp-index.html": "https://trustee.ietf.org/documents/trust-legal-provisions/",
    "mdn-common-types.html": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types/Common_types",
    "mdn-common-types.md": "https://raw.githubusercontent.com/mdn/content/main/files/en-us/web/http/guides/mime_types/common_types/index.md",
    "mdn-license.md": "https://raw.githubusercontent.com/mdn/content/main/LICENSE.md",
}
for rfc in (2046, 4180, 7763, 5545, 6350, 8259, 8118, 6713, 7303, 9239, 6922, 9512, 7946, 9649, 7903, 3302, 3003, 5334, 9639, 4337, 9559, 8081):
    URLS[f"rfc{rfc}.txt"] = f"https://www.rfc-editor.org/rfc/rfc{rfc}.txt"
for name, url in URLS.items():
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=60) as r:
            body = r.read()
            open(f"{S}/{name}", "wb").write(body)
            print(r.status, r.geturl(), len(body))
    except Exception as e:
        print("ERR", url, e)
    time.sleep(1)

# then:
curl -sL -A "solid-memo deck research (https://github.com/antwika/solid-memo)" -o tlp5.pdf -w "%{http_code} %{size_download}\n" https://trustee.ietf.org/wp-content/uploads/Corrected-TLP-5.0-legal-provsions.pdf
```

**14. MDN's table parsed into rows (python3 <scratch>/mdn.py)** (Common media types (MDN Web Docs))

```
#!/usr/bin/env python3
"""Parse MDN's common media types table (mdn-common-types.md) into mdn.json: [[extension cell, kind cell, type cell]]."""
import json, os, re
S = os.path.dirname(os.path.abspath(__file__))
rows = []
for line in open(f"{S}/mdn-common-types.md", encoding="utf-8"):
    if line.startswith("| `."):
        cells = [re.sub(r"\s+", " ", c).strip() for c in line.strip().strip("|").split("|")]
        rows.append(cells)
json.dump(rows, open(f"{S}/mdn.json", "w", encoding="utf-8"), indent=1, ensure_ascii=False)
for r in rows:
    print(" | ".join(r)[:300])

```

**15. The cards assembled with their evidence from the saved files (python3 <scratch>/cards.py; then python3 <scratch>/make_dossier.py, which wrote this dossier)** (Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24))

```
#!/usr/bin/env python3
"""Assemble the cards of the media-types dossier from the saved sources.

Reads <scratch>/*.csv (IANA registry), <scratch>/templates/*.txt (IANA registration
templates), <scratch>/q6.json and q7.json (Wikidata), <scratch>/mdn.json (MDN table) and
<scratch>/rfc*.txt, and writes <scratch>/cards.json plus a cross-check report on stdout.
Every 'says' text is cut from the saved file it cites; the script stops if something
it expects is not there.
"""
import csv, glob, json, os, re, sys

S = os.path.dirname(os.path.abspath(__file__))
TODAY = "2026-10-04"

# id, en front, sv front, media type, extension, Wikidata item (P1163 / P1195), RFC (number) or None, MDN extension cell or None
CARDS = [
    ("plain-text", "Plain text file (.txt)", "Textfil (.txt)", "text/plain", "txt", "Q86920", 2046, "`.txt`"),
    ("html", "HTML document (.html)", "HTML-dokument (.html)", "text/html", "html", "Q8811", None, "`.htm`, `.html`"),
    ("css", "CSS style sheet (.css)", "CSS-stilmall (.css)", "text/css", "css", "Q46441", None, "`.css`"),
    ("javascript", "JavaScript file (.js)", "Javascript-fil (.js)", "text/javascript", "js", "Q2005", 9239, "`.js`"),
    ("csv", "CSV file (.csv)", "CSV-fil (.csv)", "text/csv", "csv", "Q935809", 4180, "`.csv`"),
    ("markdown", "Markdown document (.md)", "Markdown-dokument (.md)", "text/markdown", "md", "Q1193600", 7763, "`.md`"),
    ("icalendar", "iCalendar file (.ics)", "iCalendar-fil (.ics)", "text/calendar", "ics", "Q284651", 5545, "`.ics`"),
    ("vcard", "vCard file (.vcf)", "V-card-fil (.vcf)", "text/vcard", "vcf", "Q305941", 6350, None),
    ("json", "JSON file (.json)", "JSON-fil (.json)", "application/json", "json", "Q2063", 8259, "`.json`"),
    ("pdf", "PDF document (.pdf)", "PDF-dokument (.pdf)", "application/pdf", "pdf", "Q42332", 8118, "`.pdf`"),
    ("zip", "ZIP archive (.zip)", "Zip-arkiv (.zip)", "application/zip", "zip", "Q136218", None, "`.zip`"),
    ("gzip", "Gzip-compressed file (.gz)", "Gzip-komprimerad fil (.gz)", "application/gzip", "gz", "Q10287816", 6713, "`.gz`"),
    ("xml", "XML document (.xml)", "XML-dokument (.xml)", "application/xml", "xml", "Q2115", 7303, "`.xml`"),
    ("epub", "EPUB e-book (.epub)", "E-bok i Epub-format (.epub)", "application/epub+zip", "epub", "Q475488", None, "`.epub`"),
    ("docx", "Word document (.docx)", "Word-dokument (.docx)",
     "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "docx", "Q3033641", None, "`.docx`"),
    ("xlsx", "Excel workbook (.xlsx)", "Excel-arbetsbok (.xlsx)",
     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "xlsx", "Q3570403", None, "`.xlsx`"),
    ("pptx", "PowerPoint presentation (.pptx)", "Powerpoint-presentation (.pptx)",
     "application/vnd.openxmlformats-officedocument.presentationml.presentation", "pptx", "Q3596397", None, "`.pptx`"),
    ("odt", "OpenDocument text document (.odt)", "Textdokument i Opendocument-format (.odt)",
     "application/vnd.oasis.opendocument.text", "odt", "Q184473", None, "`.odt`"),
    ("wasm", "WebAssembly module (.wasm)", "WebAssembly-modul (.wasm)", "application/wasm", "wasm", "Q20155677", None, "`.wasm`"),
    ("sql", "SQL file (.sql)", "SQL-fil (.sql)", "application/sql", "sql", "Q47607", 6922, None),
    ("yaml", "YAML file (.yaml)", "YAML-fil (.yaml)", "application/yaml", "yaml", "Q281876", 9512, None),
    ("geojson", "GeoJSON file (.geojson)", "GeoJSON-fil (.geojson)", "application/geo+json", "geojson", "Q5533904", 7946, None),
    ("rar", "RAR archive (.rar)", "RAR-arkiv (.rar)", "application/vnd.rar", "rar", "Q243303", None, "`.rar`"),
    ("png", "PNG image (.png)", "PNG-bild (.png)", "image/png", "png", "Q178051", None, "`.png`"),
    ("jpeg", "JPEG image (.jpg)", "JPEG-bild (.jpg)", "image/jpeg", "jpg", "Q110098625", 2046, "`.jpeg`, `.jpg`"),
    ("gif", "GIF image (.gif)", "GIF-bild (.gif)", "image/gif", "gif", "Q2192", 2046, "`.gif`"),
    ("svg", "SVG image (.svg)", "SVG-bild (.svg)", "image/svg+xml", "svg", "Q2078", None, "`.svg`"),
    ("webp", "WebP image (.webp)", "WebP-bild (.webp)", "image/webp", "webp", "Q62617958", 9649, "`.webp`"),
    ("avif", "AVIF image (.avif)", "AVIF-bild (.avif)", "image/avif", "avif", "Q59913607", None, "`.avif`"),
    ("bmp", "BMP image (.bmp)", "BMP-bild (.bmp)", "image/bmp", "bmp", "Q192869", 7903, "`.bmp`"),
    ("tiff", "TIFF image (.tif)", "TIFF-bild (.tif)", "image/tiff", "tif", "Q215106", 3302, "`.tif`, `.tiff`"),
    ("ico", "ICO icon (.ico)", "ICO-ikon (.ico)", "image/vnd.microsoft.icon", "ico", "Q729366", None, "`.ico`"),
    ("mp3", "MP3 audio file (.mp3)", "MP3-ljudfil (.mp3)", "audio/mpeg", "mp3", "Q42591", 3003, "`.mp3`"),
    ("ogg-vorbis", "Ogg Vorbis audio file (.ogg)", "Ogg Vorbis-ljudfil (.ogg)", "audio/ogg", "ogg", "Q11885120", 5334, None),
    ("flac", "FLAC audio file (.flac)", "FLAC-ljudfil (.flac)", "audio/flac", "flac", "Q131481410", 9639, None),
    ("mp4-video", "MP4 video file (.mp4)", "MP4-videofil (.mp4)", "video/mp4", "mp4", "Q336316", 4337, "`.mp4`"),
    ("matroska-video", "Matroska video file (.mkv)", "Matroska-videofil (.mkv)", "video/matroska", "mkv", "Q27967512", 9559, None),
    ("woff", "WOFF web font (.woff)", "WOFF-webbteckensnitt (.woff)", "font/woff", "woff", "Q918221", 8081, "`.woff`"),
    ("woff2", "WOFF2 web font (.woff2)", "WOFF2-webbteckensnitt (.woff2)", "font/woff2", "woff2", "Q18413771", 8081, "`.woff2`"),
    ("truetype", "TrueType font (.ttf)", "Truetype-teckensnitt (.ttf)", "font/ttf", "ttf", "Q751800", 8081, "`.ttf`"),
]

NOTES = {
    "javascript": ("application/javascript is obsolete: RFC 9239 (2022) made text/javascript the only current type.",
                   "application/javascript är föråldrad: RFC 9239 (2022) gjorde text/javascript till den enda aktuella typen."),
    "xml": ("text/xml is registered as an alias, but RFC 7303 recommends application/xml.",
            "text/xml är registrerad som alias, men RFC 7303 rekommenderar application/xml."),
    "vcard": ("text/x-vcard and text/directory are deprecated in favour of text/vcard (RFC 6350).",
              "text/x-vcard och text/directory är avförda till förmån för text/vcard (RFC 6350)."),
    "yaml": ("application/x-yaml, text/yaml and text/x-yaml are deprecated, unregistered aliases (RFC 9512).",
             "application/x-yaml, text/yaml och text/x-yaml är avförda alias som aldrig registrerats (RFC 9512)."),
    "geojson": ("application/vnd.geo+json is obsolete, replaced by application/geo+json (RFC 7946).",
                "application/vnd.geo+json är föråldrad och ersatt av application/geo+json (RFC 7946)."),
    "rar": ("application/x-rar-compressed is a deprecated alias.",
            "application/x-rar-compressed är ett avfört alias."),
    "ico": ("The often-seen image/x-icon is not registered.",
            "Den ofta förekommande image/x-icon är inte registrerad."),
    "ogg-vorbis": ("Ogg audio in general uses .oga; .ogg is for Ogg files with only Vorbis audio (RFC 5334).",
                   "Ogg-ljud i allmänhet har .oga; .ogg används för Ogg-filer med enbart Vorbis-ljud (RFC 5334)."),
    "flac": ("audio/x-flac is a deprecated alias (RFC 9639).",
             "audio/x-flac är ett avfört alias (RFC 9639)."),
    "matroska-video": ("video/x-matroska is a deprecated alias (RFC 9559).",
                       "video/x-matroska är ett avfört alias (RFC 9559)."),
    "woff": ("application/font-woff is deprecated in favour of font/woff (RFC 8081).",
             "application/font-woff är avförd till förmån för font/woff (RFC 8081)."),
    "truetype": ("IANA lists .ttf and .otf under both font/ttf and font/otf; font/ttf is the type for TrueType fonts (RFC 8081).",
                 "IANA anger .ttf och .otf för både font/ttf och font/otf; font/ttf är typen för Truetype-teckensnitt (RFC 8081)."),
}
FRONT_NOTES = {
    "xml": ("the type RFC 7303 recommends", "den typ som RFC 7303 rekommenderar"),
}

# Extra template lines to quote (deprecated aliases and the like), matched by regex on the template text.
TEMPLATE_EXTRA = {
    "text/javascript": r"Deprecated alias names for this type:\s+application/javascript,",
    "application/yaml": r"Deprecated alias names for this type: application/x-yaml, text/\s+yaml, and text/x-yaml\.\s+These names are used but are not\s+registered\.",
    "application/vnd.rar": r"Deprecated alias names for this type: application/x-rar-compressed",
    "audio/flac": r"Deprecated alias names for this type: audio/x-flac",
    "video/matroska": r"Deprecated alias names for this type: video/x-matroska",
    "font/woff": r"Deprecated Alias:\s+The existing registration \"application/font-\s+woff\" is deprecated in favor of \"font/woff\"\.",
    "text/vcard": r"They should be considered deprecated in\s+favor of text/vcard\.",
    "audio/ogg": r"In particular, \.ogg is used for Ogg files that\s+contain only a Vorbis bitstream",
}


def squash(s):
    return re.sub(r"\s+", " ", s).strip()


def die(msg):
    sys.exit("STOP: " + msg)


# IANA registry rows
registry = {}
for f in glob.glob(f"{S}/*.csv"):
    top = os.path.basename(f)[:-4]
    for r in csv.DictReader(open(f, encoding="utf-8")):
        registry[r["Template"]] = (top, r)

# Wikidata (q6: statements with ranks; q7: the jpeg item)
wd = {}
for qf in ("q6.json", "q7.json"):
    p = f"{S}/{qf}"
    if os.path.exists(p):
        for b in json.load(open(p, encoding="utf-8"))["results"]["bindings"]:
            q = b["item"]["value"].rsplit("/", 1)[1]
            wd[q] = {k: v["value"] for k, v in b.items()}

mdn = {r[0]: r for r in json.load(open(f"{S}/mdn.json", encoding="utf-8"))}


def template_ext(t):
    path = f"{S}/templates/{t.replace('/', '__')}.txt"
    text = open(path, encoding="utf-8", errors="replace").read()
    if text.strip() == "No registration template available.":
        return text.strip(), None
    if t == "application/zip":  # the template is PKWARE's APPNOTE, without a "File extension(s)" field
        m = re.search(r"for suggesting\s+the extension \.ZIP for this software\.", text)
        return squash(m.group(0)), text
    m = re.search(r"File extension\(s\)\s*:.*?(?=\n\s*\n|\n\s*(?:\d\.\s*)?Macintosh|\n\s*(?:\d\.\s*)?Apple|\n\s*macOS)", text, re.S | re.I)
    if not m:
        return None, text
    return squash(m.group(0)), text


def rfc_line(num, t, ext):
    path = f"{S}/rfc{num}.txt"
    lines = open(path, encoding="utf-8", errors="replace").read().split("\n")
    sub = t.split("/", 1)[1]
    if num == 2046:
        # RFC 2046 defines no file extensions; quote where it defines the subtype
        want = {"image/jpeg": ("An initial subtype is \"jpeg\"", "Section 4.2", 2),
                "image/gif": ("subtypes are defined for two widely-used image", "Section 3, item (2), image", 2),
                "text/plain": ("The simplest and most important subtype of \"text\" is \"plain\"", "Section 4.1.3", 1)}[t]
        for i, l in enumerate(lines):
            if want[0] in l:
                s = squash(" ".join(lines[i:i + want[2]]))
                if t == "image/gif":
                    s = s[s.index("subtypes are defined"):]
                if t == "text/plain":
                    s = s[:s.index('"plain".') + 8]
                if t == "image/jpeg":
                    s = s[s.index("An initial subtype"):]
                return f"RFC 2046, {want[1]} (line {i + 1})", s
        die("rfc2046 line")
    # find "Subtype name: <sub>" then the following File extension(s) line
    for i, l in enumerate(lines):
        top = t.split("/", 1)[0]
        above = " ".join(lines[max(0, i - 3):i])
        if re.search(rf"(Subtype name|MIME subtype name):\s*{re.escape(sub)}\s*$", l, re.I) and \
                re.search(rf"(Type name|MIME media type name):\s*{re.escape(top)}\b", above, re.I):
            for j in range(i, min(i + 200, len(lines))):
                if re.search(r"File extension\(s\)", lines[j]):
                    k = j
                    block = [lines[j].strip()]
                    while k + 1 < len(lines) and lines[k + 1].startswith("      ") and lines[k + 1].strip():
                        k += 1
                        block.append(lines[k].strip())
                    s = squash(" ".join(block))
                    s = re.split(r" (?=Macintosh|Apple Uniform|Object Identifier|Uniform Type|Windows Clipboard|A uniform type)", s)[0]
                    return f"RFC {num}, registration of {t}, \"File extension(s)\" (line {j + 1})", s
    die(f"rfc{num} {t}")


cards = []
report = []
for cid, en, sv, t, ext, qid, rfc, mdnkey in CARDS:
    top, row = registry.get(t, (None, None))
    if not row:
        die(f"{t} not in the registry")
    if re.search(r"OBSOLETE|DEPRECATED", row["Name"]):
        die(f"{t} is {row['Name']}")
    ev = [{
        "source": "iana-media-types",
        "locator": f"Media Types registry (updated 2026-09-24), \"{top}\" table ({top}.csv), row \"{row['Name']}\"",
        "says": f"Name \"{row['Name']}\" | Template \"{row['Template']}\" | Reference \"{row['Reference']}\"",
        "retrieved": TODAY,
    }]
    ext_line, text = template_ext(t)
    if ext_line is None:
        die(f"no extension line in the template of {t}")
    says = ext_line if ext_line.startswith("No registration") else f"\"{ext_line}\""
    if t in TEMPLATE_EXTRA:
        m = re.search(TEMPLATE_EXTRA[t], text)
        if not m:
            die(f"template extra for {t}")
        says += f"; \"{squash(m.group(0))}\""
    ev.append({
        "source": "iana-templates",
        "locator": f"Registration template https://www.iana.org/assignments/media-types/{t}",
        "says": says,
        "retrieved": TODAY,
    })
    w = wd.get(qid)
    if not w:
        die(f"{qid} not in the Wikidata results")
    truthy = w.get("truthyMimes", "").split(" ; ")
    exts = w.get("exts", "").split(" ")
    if t not in truthy:
        die(f"{qid}: {t} not a best-rank P1163 ({truthy})")
    if ext not in exts:
        die(f"{qid}: {ext} not a P1195 ({exts})")
    label = w.get("en", "")
    ev.append({
        "source": "wikidata",
        "locator": f"{qid}" + (f" ({label})" if label else " (no en label)") + ", query 10 (q6.rq)",
        "says": f"P1163 (MIME type) statements: {w.get('mimes')}; P1195 (file extension): {' '.join(sorted(exts))}",
        "retrieved": TODAY,
    })
    if rfc:
        loc, line = rfc_line(rfc, t, ext)
        ev.append({"source": "rfcs", "locator": loc + f": https://www.rfc-editor.org/rfc/rfc{rfc}.txt",
                   "says": f"\"{line}\"", "retrieved": TODAY})
    if mdnkey:
        r = mdn.get(mdnkey)
        if not r:
            die(f"MDN row {mdnkey}")
        if t not in r[2]:
            die(f"MDN row {mdnkey} has {r[2]}")
        ev.append({"source": "mdn", "locator": f"\"Common media types\", table row {mdnkey}",
                   "says": f"{r[0]} | {r[1]} | {r[2]}", "retrieved": TODAY})
    if len({e['source'] for e in ev} - {'iana-media-types', 'wikidata'}) < 1:
        die(f"{cid}: no verification")
    card = {"id": cid, "front": {"en": en, "sv": sv}}
    if cid in FRONT_NOTES:
        card["frontNote"] = {"en": FRONT_NOTES[cid][0], "sv": FRONT_NOTES[cid][1]}
    card["back"] = {"zxx": t}
    if cid in NOTES:
        card["backNote"] = {"en": NOTES[cid][0], "sv": NOTES[cid][1]}
    card["evidence"] = ev
    card["checks"] = [{"qid": qid, "property": "P1163", "expect": t}, {"qid": qid, "property": "P1195", "expect": ext}]
    # the extension on the front must be named by IANA's template or the RFC (or, without a template, MDN)
    hay = (ext_line + " " + " ".join(e["says"] for e in ev if e["source"] in ("rfcs", "mdn"))).lower()
    if not re.search(rf"(?<![a-z0-9]){re.escape(ext)}(?![a-z0-9])", hay):
        report.append(f"{cid}: extension {ext} not named by the template/RFC/MDN")
    report.append(f"{cid}: {t} | template: {ext_line[:90]} | WD {qid} {exts} | MDN {mdnkey and mdn[mdnkey][2][:60]}")
    cards.append(card)

json.dump(cards, open(f"{S}/cards.json", "w", encoding="utf-8"), indent=2, ensure_ascii=False)
print("\n".join(report))
print(len(cards), "cards")

```

**16. Every P1195 (file extension) statement with its rank for the 40 items on the cards (python3 <scratch>/sparql.py <scratch>/q8.rq <scratch>/q8.json); the Wikidata evidence quotes it** (Wikidata: file formats with their MIME type (P1163) and file extension (P1195))

```
SELECT ?item (GROUP_CONCAT(DISTINCT CONCAT(?ext, " [", STRAFTER(STR(?rank), "#"), "]"); separator=" ; ") AS ?exts) WHERE {
  VALUES ?item { wd:Q2005 wd:Q2063 wd:Q2078 wd:Q2115 wd:Q2192 wd:Q8811 wd:Q42332 wd:Q42591 wd:Q46441 wd:Q47607 wd:Q86920
    wd:Q136218 wd:Q178051 wd:Q184473 wd:Q192869 wd:Q215106 wd:Q243303 wd:Q281876 wd:Q284651 wd:Q305941 wd:Q336316 wd:Q475488
    wd:Q729366 wd:Q751800 wd:Q918221 wd:Q935809 wd:Q1193600 wd:Q3033641 wd:Q3570403 wd:Q3596397 wd:Q5533904 wd:Q10287816
    wd:Q11885120 wd:Q18413771 wd:Q20155677 wd:Q27967512 wd:Q59913607 wd:Q62617958 wd:Q110098625 wd:Q131481410 }
  OPTIONAL { ?item p:P1195 ?st . ?st ps:P1195 ?ext ; wikibase:rank ?rank . }
}
GROUP BY ?item

```

**17. sparql.py, which ran queries 6 to 12 and 16 against https://query.wikidata.org/sparql** (Wikidata: file formats with their MIME type (P1163) and file extension (P1195))

```
#!/usr/bin/env python3
"""Usage: python3 sparql.py <query.rq> <out.json> — runs a query on query.wikidata.org and prints a compact table."""
import json, sys, time, urllib.parse, urllib.request, urllib.error

UA = "solid-memo deck research (https://github.com/antwika/solid-memo)"
q = open(sys.argv[1], encoding="utf-8").read()
data = urllib.parse.urlencode({"query": q, "format": "json"}).encode()
for attempt in range(6):
    try:
        req = urllib.request.Request("https://query.wikidata.org/sparql", data=data, headers={
            "User-Agent": UA, "Accept": "application/sparql-results+json"})
        res = json.load(urllib.request.urlopen(req, timeout=120))
        break
    except urllib.error.HTTPError as e:
        if e.code == 429 or e.code >= 500:
            time.sleep(10 * (attempt + 1)); continue
        raise
json.dump(res, open(sys.argv[2], "w", encoding="utf-8"), indent=1, ensure_ascii=False)
for b in res["results"]["bindings"]:
    print(" | ".join(f"{k}={v['value'].replace('http://www.wikidata.org/entity/', '').replace('http://wikiba.se/ontology#', '')}"
                     + (f"@{v['xml:lang']}" if 'xml:lang' in v else '') for k, v in b.items()))

```

**18. make_dossier.py (python3 <scratch>/make_dossier.py), which completed the cards from cards.json and wrote the first version of this dossier (the worktree path is written as <repo>/)** (Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24))

```
#!/usr/bin/env python3
"""Write authored/media-types.json from <scratch>/cards.json plus the deck's documentation."""
import json, os, re, sys

S = os.path.dirname(os.path.abspath(__file__))
OUT = "<repo>/packages/deck-library/authored/media-types.json"
TODAY = "2026-10-04"
cards = json.load(open(f"{S}/cards.json", encoding="utf-8"))
by_id = {c["id"]: c for c in cards}


def squash(s):
    return re.sub(r"\s+", " ", s).strip()


def cut(path, pattern):
    text = open(path, encoding="utf-8", errors="replace").read()
    m = re.search(pattern, text, re.S)
    if not m:
        sys.exit(f"STOP: {pattern!r} not in {path}")
    return squash(m.group(0))


def ev(cid, source):
    return next(e for e in by_id[cid]["evidence"] if e["source"] == source)


def add_after(cid, source, entry):
    evs = by_id[cid]["evidence"]
    i = max(i for i, e in enumerate(evs) if e["source"] == source)
    evs.insert(i + 1, entry)


# Registry rows for the aliases named in notes
ev("javascript", "iana-media-types")["says"] += \
    "; application table, row \"javascript (OBSOLETED in favor of text/javascript)\" | Template \"application/javascript\" | Reference \"[RFC 4329][RFC 9239]\""
ev("xml", "iana-media-types")["says"] += "; text table, row \"xml\" | Template \"text/xml\" | Reference \"[RFC 7303]\""
ev("geojson", "iana-media-types")["says"] += \
    "; row \"vnd.geo+json (OBSOLETED by [RFC 7946] in favor of application/geo+json)\" | Template \"application/vnd.geo+json\" | Reference \"[Sean_Gillies]\""
ev("ico", "iana-media-types")["says"] += "; the image table has no row \"x-icon\" (image/x-icon is not registered)"

# RFC passages behind the notes
add_after("javascript", "rfcs", {
    "source": "rfcs", "locator": "RFC 9239, Section 1 (Introduction): https://www.rfc-editor.org/rfc/rfc9239.txt",
    "says": "\"" + cut(f"{S}/rfc9239.txt", r"The most widely supported media type in\s+use is text/javascript; all others are considered historical and\s+obsolete aliases of text/javascript\.") + "\"",
    "retrieved": TODAY})
add_after("xml", "rfcs", {
    "source": "rfcs", "locator": "RFC 7303, Abstract and Section 9.2: https://www.rfc-editor.org/rfc/rfc7303.txt",
    "says": "\"" + cut(f"{S}/rfc7303.txt", r"while defining text/xml and text/\s+xml-external-parsed-entity as aliases for the respective application/\s+types\.") + "\"; \""
            + cut(f"{S}/rfc7303.txt", r"However, application/xml and application/xml-\s+external-parsed-entity are still RECOMMENDED, to avoid possible\s+confusion based on the earlier distinction\.") + "\"",
    "retrieved": TODAY})
ev("truetype", "iana-templates")["says"] += "; \"" + cut(f"{S}/templates/font__ttf.txt", r"Typically, the \.ttf extension is only used for fonts containing\s+TrueType outlines") \
    + "\"; \"" + cut(f"{S}/templates/font__ttf.txt", r"Macintosh Universal Type Identifier code:\s+\"public\.truetype-font\"") \
    + "\"; \"" + cut(f"{S}/templates/font__ttf.txt", r"@font-face Format:\s+truetype") + "\""
add_after("truetype", "iana-templates", {
    "source": "iana-templates", "locator": "Registration template https://www.iana.org/assignments/media-types/font/otf",
    "says": "\"" + cut(f"{S}/templates/font__otf.txt", r"File extension\(s\):\s+Font file extensions used for OFF / OpenType\s+fonts: \.ttf and \.otf") + "\"",
    "retrieved": TODAY})
by_id["truetype"]["backNote"] = {
    "en": "IANA lists .ttf and .otf for both font/ttf and font/otf; .ttf is typically used for fonts with TrueType outlines.",
    "sv": "IANA anger .ttf och .otf för både font/ttf och font/otf; .ttf används oftast för teckensnitt med Truetype-konturer.",
}

# Swedish wording that rests on a Wikidata alias or a dictionary entry
SV_EVIDENCE = {
    "css": ("wikidata", "Q46441 (Cascading Style Sheets), sv aliases (query 12, q5.rq)", "sv label \"Cascading Style Sheets\"; sv aliases \"Stilmallar\", \"Stilmall\""),
    "truetype": ("svenska-akademien", "SAOL and Svensk ordbok, search API, \"teckensnitt\" (query 9)", "SAOL: one entry, \"tecken|snitt\"; Svensk ordbok: one entry, \"teckensnitt\""),
    "woff": ("svenska-akademien", "SAOL and Svensk ordbok, search API, \"teckensnitt\" and \"webb\" (query 9)", "SAOL and Svensk ordbok: one entry each for \"teckensnitt\" and for \"webb\""),
    "woff2": ("svenska-akademien", "SAOL and Svensk ordbok, search API, \"teckensnitt\" and \"webb\" (query 9)", "SAOL and Svensk ordbok: one entry each for \"teckensnitt\" and for \"webb\""),
    "xlsx": ("svenska-akademien", "SAOL and Svensk ordbok, search API, \"arbetsbok\" (query 9)", "SAOL: one entry, \"arbets|bok\"; Svensk ordbok: one entry, \"arbetsbok\""),
    "epub": ("svenska-akademien", "SAOL and Svensk ordbok, search API, \"e-bok\" (query 9)", "SAOL: one entry, \"e-bok\" (plural e-böcker); Svensk ordbok: one entry, \"e-bok\""),
}
for cid, (src, loc, says) in SV_EVIDENCE.items():
    by_id[cid]["evidence"].append({"source": src, "locator": loc, "says": says, "retrieved": TODAY})

sources = {
    "iana-media-types": {
        "title": "Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24)",
        "creator": "Internet Assigned Numbers Authority (IANA), operated by Public Technical Identifiers, an affiliate of ICANN",
        "url": "https://www.iana.org/assignments/media-types/media-types.xhtml",
        "license": "CC0-1.0",
        "licenseEvidence": "https://www.iana.org/help/licensing-terms (Joint Statement of IANA and IETF Concerning Copyright Rights in the Protocol Registries, 10 November 2021): \"“Protocol Registries” means the technical protocol registry data directly linked at either https://www.iana.org/protocols or https://www.ietf.org/assignments/ ; it does not include any other material on or linked from those pages (e.g., the RFC documents that are linked on those pages are excluded).\" … \"both IANA and IETF affirm that any applicable rights that they may have in the Protocol Registries are subject to the Creative Commons CC0 1.0 dedication\". The Media Types registry is linked directly from https://www.iana.org/protocols (checked in the saved page).",
        "role": "content",
        "retrieved": TODAY,
        "usedFor": "The media type on every back (the registry's \"Template\" column, i.e. type/subtype), the check that each is registered and not marked OBSOLETED or DEPRECATED, and the registry rows behind the notes (application/javascript and application/vnd.geo+json obsoleted, text/xml registered, image/x-icon absent).",
    },
    "iana-templates": {
        "title": "IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png)",
        "creator": "Internet Assigned Numbers Authority (IANA); the templates were written by each type's registrant (often as part of an RFC)",
        "url": "https://www.iana.org/assignments/media-types/",
        "license": "unknown",
        "licenseEvidence": "The CC0 joint statement (https://www.iana.org/help/licensing-terms) covers the \"technical protocol registry data directly linked\" at https://www.iana.org/protocols and excludes \"any other material on or linked from those pages (e.g., the RFC documents …)\". The templates are linked from the registry, not from the protocols page, and many reproduce RFC text (IETF Trust terms, see the RFC source). Their status is therefore treated as unknown, and they are used for verification only: nothing copied but short citations in the evidence.",
        "role": "verification",
        "retrieved": TODAY,
        "usedFor": "Confirming the file extension on every front (the template's \"File extension(s)\" field; for application/zip, PKWARE's application note filed as its template; text/plain and image/gif have no template) and the deprecated aliases named in the notes.",
    },
    "wikidata": {
        "title": "Wikidata: file formats with their MIME type (P1163) and file extension (P1195)",
        "creator": "Wikidata contributors",
        "url": "https://www.wikidata.org/",
        "license": "CC0-1.0",
        "licenseEvidence": "https://www.wikidata.org/wiki/Wikidata:Licensing — \"All structured data (i.e. the main, Property, Lexeme, and EntitySchema namespaces) is released into the public domain under Creative Commons Zero.\"",
        "role": "content",
        "retrieved": TODAY,
        "usedFor": "The file extension on every front (P1195), an independent check of every media type (P1163, best rank), the format names and their Swedish labels and aliases (Javascript, Zip, Epub, Opendocument, Truetype, V-card, Stilmall).",
    },
    "rfcs": {
        "title": "The RFCs that register or define the media types on the cards: RFC 2046, 3003, 3302, 4180, 4337, 5334, 5545, 6350, 6713, 6922, 7303, 7763, 7903, 7946, 8081, 8118, 8259, 9239, 9512, 9559, 9639 and 9649 (plain-text versions from the RFC Editor)",
        "creator": "Internet Engineering Task Force (IETF) and the authors of each RFC; published by the RFC Editor",
        "url": "https://www.rfc-editor.org/",
        "license": "all-rights-reserved",
        "licenseEvidence": "IETF Trust Legal Provisions 5.0 (https://trustee.ietf.org/wp-content/uploads/Corrected-TLP-5.0-legal-provsions.pdf, linked from https://trustee.ietf.org/documents/trust-legal-provisions/), Section 3.c grants outside the IETF Standards Process only rights \"to copy, publish, display and distribute IETF Contributions and IETF Documents in full and without modification\" and \"unmodified portions … provided that … each such portion is clearly attributed to IETF and identifies the RFC\"; Section 3.d: not granted is \"any license to modify IETF Contributions or IETF Documents, or portions thereof … in any context outside the IETF Standards Process\". Used for verification only; the evidence quotes short unmodified portions, each naming its RFC.",
        "role": "verification",
        "retrieved": TODAY,
        "usedFor": "Confirming each type's registration and file extension in the RFC that defines it (where there is one), and the statements behind the notes: text/javascript the only current JavaScript type (RFC 9239), text/xml an alias and application/xml recommended (RFC 7303), .ogg for Vorbis-only Ogg files (RFC 5334). Nothing copied but attributed citations.",
    },
    "mdn": {
        "title": "Common media types (MDN Web Docs)",
        "creator": "Mozilla and individual contributors",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types/Common_types",
        "license": "CC-BY-SA-2.5",
        "licenseEvidence": "https://github.com/mdn/content/blob/main/LICENSE.md — \"All prose content is available under ([CC-BY-SA 2.5](https://creativecommons.org/licenses/by-sa/2.5/)).\" Used for verification only, so the deck takes on no share-alike condition.",
        "role": "verification",
        "retrieved": TODAY,
        "usedFor": "An independent, non-IANA check of the extension and media type of the {N_MDN} cards whose type MDN's table lists (read from the page's source file in the mdn/content repository). The deck's selection was made before this table was consulted and does not follow it. Nothing copied.",
    },
    "svenska-akademien": {
        "title": "Svenska Akademiens ordböcker: Svenska Akademiens ordlista (SAOL) and Svensk ordbok (SO)",
        "creator": "Svenska Akademien",
        "url": "https://svenska.se/",
        "license": "all-rights-reserved",
        "licenseEvidence": "https://svenska.se/om-webbplatsen/ (curl, without running its scripts) shows only the footer \"© Svenska Akademien\" and no licence or reuse statement; treated as all rights reserved, so used for verification only, nothing copied.",
        "role": "verification",
        "retrieved": TODAY,
        "usedFor": "Confirming that the Swedish common nouns on the fronts are dictionary words (teckensnitt, arbetsbok, e-bok, ljudfil, textfil, arkiv, dokument, bild, ikon, presentation, modul, fil, webb, komprimera) through the search API behind svenska.se.",
    },
}

method = [
    "Who did the work: Anton Wiklund compiled this deck with the help of AI agents (Claude, by Anthropic), which did the research, drafting and cross-checking at his direction. The cards were checked by machine (live Wikidata and the app's SHACL and DCAT-AP validators) and in independent review rounds by further Claude agents, each logged under Quality control with its findings and how they were resolved. Anton Wiklund reviews every deck in full before it is released.",
    "1. Registry: IANA's Media Types registry was downloaded on 2026-10-04 as media-types.xml (header \"updated 2026-09-24\") and as the eight per-type CSV tables (application, audio, font, image, model, text, video, multipart; query 1). IANA's licensing-terms page and the protocols page were saved with it to confirm that the registry is one of the CC0 \"Protocol Registries\". Each CSV row gives the subtype name (with any OBSOLETED or DEPRECATED marker), the full type in the \"Template\" column and the references.",
    "2. Candidates: a list of 104 candidate types for file formats in everyday use (documents, data and web files, archives, images, audio, video, fonts and 3D models, together with the unofficial names often seen for them, such as audio/wav or video/webm) was written from general knowledge and looked up in the CSV tables by look.py (query 2), which printed for each whether it is registered and with which references. Unregistered types were dropped (see Selection).",
    "3. Registration templates: for 61 shortlisted types (the registered candidates most likely to make a card, and the types they could be confused with), IANA's registration template was downloaded (templates.py and templates2.py, queries 3 and 4) and its \"File extension(s)\" field and any deprecated-alias statements were extracted (exts.py, query 5). This showed where a file extension belongs to more than one registered type (.ttf and .otf under font/ttf, font/otf and font/sfnt; .xml under application/xml and text/xml; RTF registered both as application/rtf and as text/rtf) and that the video/quicktime template names no extension.",
    "4. Wikidata: the file-format items carrying each media type as P1163 (MIME type) were listed with their file extensions (P1195), labels and number of sitelinks (queries 6 to 8), and for each card the main format item was chosen: the item with the most sitelinks whose best-rank P1163 holds the card's type and whose P1195 holds the card's extension; where the general item lacks the statement, a more specific item was used (JPEG: Q110098625 Exif Image File Format (Compressed), since the general JPEG item Q2195 holds image/jpeg only at deprecated rank and has no P1195; Office Open XML: the three ECMA-376 1st Edition document items; FLAC: Q131481410; Matroska: Q27967512 Matroska Video; WOFF2: Q18413771). Query 10 fetched every P1163 statement with its rank and the P1195 values of the items used on the cards and of the JFIF item Q26329975 (query 11 for the JPEG item Q110098625 and the general JPEG item Q2195); query 12 fetched their English and Swedish labels, Swedish aliases and Swedish Wikipedia titles.",
    "5. RFCs and MDN: the RFCs named in the registry's references for the chosen types were downloaded in plain text from the RFC Editor, with the IETF Trust Legal Provisions (query 13); MDN's \"Common media types\" table was downloaded as the Markdown source of the page from the mdn/content repository with its licence file, and parsed into rows by mdn.py (query 14).",
    "6. Cards: cards.py (query 15) assembled every card from the saved files: the registry row (stopping if the type is missing or marked OBSOLETED or DEPRECATED), the template's extension field, the Wikidata statements (stopping unless the card's type is a best-rank P1163 value and the card's extension a P1195 value of the item), the RFC's \"File extension(s)\" line (located under the matching \"Type name\" and \"Subtype name\") and the MDN row (stopping if MDN gives another type). Every \"says\" text is cut from the saved file it cites. make_dossier.py added the registry rows and RFC passages behind the notes and wrote this dossier.",
    "7. Wording: the front names the kind of file in plain words with the extension in brackets, in English and Swedish (the compiler's own wording, e.g. \"PNG image (.png)\" / \"PNG-bild (.png)\"). Format names follow Wikidata's Swedish labels where Swedish writes them differently (Javascript, Zip, Epub, Opendocument, Truetype, V-card, Powerpoint as in \"Microsoft Powerpoint\"); \"stilmall\" is a Swedish alias of the CSS item; the Swedish common nouns were looked up in SAOL and Svensk ordbok through svenska.se's search API (query 9): teckensnitt, arbetsbok, e-bok, ljudfil, textfil, arkiv, dokument, bild, ikon, presentation, modul, fil, webb and komprimera have entries; videofil, textdokument and stilmall do not and are regular compounds (video + fil, text + dokument, stil + mall). The back is the media type exactly as in the registry's \"Template\" column, as text in no language (zxx), since a media type is a code.",
    "8. Notes: a back note names an obsolete, deprecated or unregistered name still seen for the same files where the registry, the template or the RFC states it (application/javascript, text/xml, text/x-vcard and text/directory, the YAML x- names, application/vnd.geo+json, application/x-rar-compressed, image/x-icon, audio/x-flac, video/x-matroska, application/font-woff), or explains the extension (.ogg, .ttf). The XML card has a front note, because both application/xml and text/xml are registered for .xml files: it asks for the type RFC 7303 recommends.",
    "9. Machine checks: for every card the builder checks against live Wikidata that the format item has the card's media type as a best-rank P1163 value and the card's extension as a P1195 value (80 checks). These confirm the Wikidata side only; the IANA registry row, the template and the RFC for every card rest on the saved files and the stops in cards.py, recorded in each card's evidence. The built deck was validated with the app's SHACL and DCAT-AP validators (validate_sources.ts).",
]

selection = (
    "40 file types in common use, as of IANA's Media Types registry of 24 September 2026: 8 text formats (plain text, HTML, CSS, JavaScript, CSV, Markdown, iCalendar, vCard), "
    "15 application formats (JSON, PDF, ZIP, gzip, XML, EPUB, the three Office Open XML documents, OpenDocument text, WebAssembly, SQL, YAML, GeoJSON, RAR), "
    "9 image formats (PNG, JPEG, GIF, SVG, WebP, AVIF, BMP, TIFF, ICO), 3 audio formats (MP3, Ogg Vorbis, FLAC), 2 video formats (MP4, Matroska) and 3 fonts (WOFF, WOFF2, TrueType). "
    "A type is in the deck only if (a) it is registered in the IANA registry and not marked OBSOLETED or DEPRECATED there; (b) the extension on the front is named for it by its IANA template or RFC, or, for text/plain and image/gif, which have no template, by Wikidata and MDN; "
    "(c) the front, read with the description, has exactly one current registered answer; and (d) Wikidata has a format item with the type and the extension, so the card can be checked by machine. "
    "Left out because the common type is not registered: WAV (audio/wav, audio/x-wav and audio/vnd.wave are all absent from the registry), WebM (video/webm, audio/webm), MIDI (audio/midi), 7z, tar, bzip2 and xz archives, shell scripts, Android packages, AVI (video/x-msvideo) and RSS (application/rss+xml). "
    "Left out because the extension has more than one registered answer: RTF (application/rtf and text/rtf), OpenType .otf (font/otf, font/sfnt and font/ttf all list it). "
    "Left out because IANA's template names no extension: QuickTime (video/quicktime). "
    "Left out to keep the deck to about 40 cards, though registered: the legacy Microsoft Office formats (.doc, .xls, .ppt), the other OpenDocument types, HEIC, JPEG XL, APNG, AAC, Opus, MP4 audio (.m4a), Ogg video, 3GPP, MPEG video, MPEG transport streams, OpenType font collections, glTF, STL and other 3D models, JSON-LD, XHTML, the web app manifest, Zstandard, Java archives and SQLite databases. "
    "XML is kept with a front note: RFC 7303 registers text/xml as an alias of application/xml and recommends application/xml, so the card asks for the recommended type."
)

licensing = (
    "The deck is CC0 1.0. Its content sources are IANA's Media Types registry, whose data IANA and the IETF dedicate to the public domain under CC0 1.0 (joint statement of 10 November 2021), and Wikidata, whose structured data is CC0. "
    "The media types come from the registry, the file extensions and format names from Wikidata, and the selection of 40 types is the compiler's own, made by the criteria under Selection; the wording of the fronts and notes is the compiler's own. "
    "IANA's registration templates (status unknown, often reproducing RFC text), the RFCs (IETF Trust Legal Provisions: no licence to modify outside the IETF), MDN Web Docs (CC BY-SA 2.5) and Svenska Akademien's dictionaries (© Svenska Akademien, no licence stated) were used only to verify facts the content sources gave: no text, list or selection was taken from them, and MDN's table was consulted only after the selection was made. "
    "The evidence in the provenance report quotes short, unmodified passages of them, each attributed to its source and, for the RFCs, naming the RFC, as citations. That a type is registered under a name and used with an extension is a fact, so verifying it against these sources puts no conditions on the deck."
)

queries = [
    {"source": "iana-media-types", "purpose": "1. The registry, its licence statement and the protocols page (sh <scratch>/fetch.sh; the IETF Trust URL in it answered 404 and was replaced by query 13)",
     "query": open(f"{S}/fetch.sh", encoding="utf-8").read()},
    {"source": "iana-media-types", "purpose": "2. Which candidate types are registered (python3 <scratch>/look.py, reading the saved CSV tables)",
     "query": open(f"{S}/look.py", encoding="utf-8").read().replace(S, "<scratch>")},
    {"source": "iana-templates", "purpose": "3. Registration templates of the first candidates (python3 <scratch>/templates.py)",
     "query": open(f"{S}/templates.py", encoding="utf-8").read()},
    {"source": "iana-templates", "purpose": "4. Registration templates of further candidates and of the types they could be confused with (python3 <scratch>/templates2.py)",
     "query": open(f"{S}/templates2.py", encoding="utf-8").read()},
    {"source": "iana-templates", "purpose": "5. The file-extension and deprecated-alias lines of every saved template (python3 <scratch>/exts.py)",
     "query": open(f"{S}/exts.py", encoding="utf-8").read()},
    {"source": "wikidata", "purpose": "6. Every item with one of the candidate types as P1163, with extensions and labels (python3 <scratch>/sparql.py <scratch>/q1.rq <scratch>/q1.json; too many minor items, superseded by query 7)",
     "query": open(f"{S}/q1.rq", encoding="utf-8").read()},
    {"source": "wikidata", "purpose": "7. The same, limited to items with at least 8 sitelinks, grouped (python3 <scratch>/sparql.py q2.rq q2.json); sparql.py posts the query to https://query.wikidata.org/sparql with the User-Agent \"solid-memo deck research (https://github.com/antwika/solid-memo)\"",
     "query": open(f"{S}/q2.rq", encoding="utf-8").read()},
    {"source": "wikidata", "purpose": "8. Items by file extension for the types query 7 did not find, and items with the remaining types (python3 <scratch>/sparql.py q3.rq q3.json; then q4.rq q4.json)",
     "query": open(f"{S}/q3.rq", encoding="utf-8").read() + "\n# q4.rq\n" + open(f"{S}/q4.rq", encoding="utf-8").read()},
    {"source": "svenska-akademien", "purpose": "9. Swedish common nouns in SAOL and Svensk ordbok (python3 <scratch>/svenska.py), and the site's about page for its terms",
     "query": open(f"{S}/svenska.py", encoding="utf-8").read() + "\n# then:\ncurl -sL -A \"solid-memo deck research (https://github.com/antwika/solid-memo)\" -o svenska-om.html -w \"%{http_code} %{url_effective} %{size_download}\\n\" https://svenska.se/om-webbplatsen/"},
    {"source": "wikidata", "purpose": "10. All P1163 statements with rank, the truthy P1163 values and the P1195 values of the items used on the cards (python3 <scratch>/sparql.py q6.rq q6.json; the evidence cites it as \"query 10 (q6.rq)\")",
     "query": open(f"{S}/q6.rq", encoding="utf-8").read()},
    {"source": "wikidata", "purpose": "11. The same for the JPEG items (python3 <scratch>/sparql.py q7.rq q7.json)",
     "query": open(f"{S}/q7.rq", encoding="utf-8").read()},
    {"source": "wikidata", "purpose": "12. English and Swedish labels, Swedish aliases and Swedish Wikipedia titles of the format items (python3 <scratch>/sparql.py q5.rq q5.json; the evidence cites it as \"query 12 (q5.rq)\")",
     "query": open(f"{S}/q5.rq", encoding="utf-8").read()},
    {"source": "rfcs", "purpose": "13. The RFCs, the IETF Trust Legal Provisions page and MDN's table and licence (python3 <scratch>/fetch2.py), then the TLP 5.0 PDF",
     "query": open(f"{S}/fetch2.py", encoding="utf-8").read() + "\n# then:\ncurl -sL -A \"solid-memo deck research (https://github.com/antwika/solid-memo)\" -o tlp5.pdf -w \"%{http_code} %{size_download}\\n\" https://trustee.ietf.org/wp-content/uploads/Corrected-TLP-5.0-legal-provsions.pdf"},
    {"source": "mdn", "purpose": "14. MDN's table parsed into rows (python3 <scratch>/mdn.py)",
     "query": open(f"{S}/mdn.py", encoding="utf-8").read()},
    {"source": "iana-media-types", "purpose": "15. The cards assembled with their evidence from the saved files (python3 <scratch>/cards.py; then python3 <scratch>/make_dossier.py, which wrote this dossier)",
     "query": open(f"{S}/cards.py", encoding="utf-8").read()},
]

wd_notes = [
    ("javascript", "Wikidata's JavaScript item Q2005 also holds, at normal rank, unregistered or obsolete names (text/x-javascript, application/x-javascript, text/javascript1.0–1.5, text/livescript and others); text/javascript is its only preferred value.",
     "The card follows IANA and RFC 9239 (text/javascript). The check reads Wikidata's best rank (text/javascript), so it is unaffected. No change to Wikidata's data is implied by the deck.", "no change needed"),
    ("woff", "Wikidata's WOFF item Q918221 holds application/font-woff at normal rank, although IANA marks it \"DEPRECATED in favor of font/woff\"; font/woff is the preferred value.",
     "The card gives font/woff and its note names application/font-woff as deprecated (template and RFC 8081).", "no change needed"),
    ("matroska-video", "Wikidata's Matroska Video item Q27967512 holds video/matroska and video/x-matroska at equal (normal) rank; IANA's template names video/x-matroska a deprecated alias. The general Matroska item Q223535 has no video/matroska statement at all (only x- types, two of them deprecated).",
     "The card gives video/matroska (registry, template, RFC 9559) and checks it on Q27967512; the note names video/x-matroska as deprecated.", "no change needed"),
    ("jpeg", "Wikidata's general JPEG item Q2195 holds image/jpeg only at deprecated rank and has no P1195, so it cannot be checked; the JFIF item Q26329975 has image/jpeg but no P1195.",
     "The card is checked on Q110098625 (Exif Image File Format (Compressed)), which has image/jpeg (normal rank, best) and P1195 jpg and jpeg. The type itself rests on the registry, the template (\"jpg, jpeg\"), RFC 2046 and MDN.", "no change needed"),
    ("svg", "Wikidata's SVG item Q2078 also holds \"image/SVG\" at normal rank, which is not a registered type.",
     "The card gives image/svg+xml (registry, template, MDN); the check is on that value.", "no change needed"),
    ("geojson", "IANA's application/geo+json template and RFC 7946 list both .json and .geojson as extensions.",
     "The front uses .geojson, the extension specific to GeoJSON (Wikidata's only P1195 value for Q5533904); a .json file is a JSON file (application/json), so .json on this front would be ambiguous.", "no change needed"),
    ("ogg-vorbis", "IANA's audio/ogg template lists .oga, .ogg, .spx and .opus; RFC 5334 obsoleted .ogg for application/ogg (now .ogx).",
     "The front names \"Ogg Vorbis audio\", for which RFC 5334 and the template keep .ogg; the note explains .oga for Ogg audio in general.", "no change needed"),
    ("truetype", "IANA's templates for font/ttf, font/otf and font/sfnt all list \".ttf and .otf\".",
     "The front names a TrueType font; the font/ttf template ties itself to TrueType (\"public.truetype-font\", \"@font-face Format: truetype\") and says .ttf is typically used for fonts with TrueType outlines, and Wikidata's TrueType item and MDN give font/ttf. The note states the overlap. OpenType (.otf) was left out as ambiguous.", "fixed"),
    ("xml", "Both application/xml and text/xml are registered (intended usage COMMON) with the extension .xml; Wikidata's XML item Q2115 holds both at normal rank.",
     "Kept, with a front note asking for the type RFC 7303 recommends (application/xml; RFC 7303 defines text/xml as an alias), and a back note naming text/xml.", "fixed"),
    ("tiff", "IANA's image/tiff template and RFC 3302 give the extension as \".TIF\" (upper case); Wikidata and MDN give tif and tiff.",
     "The front writes .tif in lower case, as on the other cards; file extensions are not case-sensitive on the systems where .TIF was common.", "no change needed"),
    ("zip", "The application/zip template on IANA's site is PKWARE's ZIP application note and has no \"File extension(s)\" field.",
     "The extension rests on Wikidata (P1195 zip) and MDN; the template only mentions \"the extension .ZIP for this software\".", "no change needed"),
]

rounds = [{
    "round": 0,
    "date": TODAY,
    "reviewer": "Claude (AI) — authoring agent, machine checks",
    "lens": "Machine and source checks: every card's type looked up in IANA's registry tables (registered, not obsolete or deprecated), its extension in IANA's template and the RFC, its type and extension in Wikidata (best-rank P1163, P1195) and MDN; Wikidata checks run by the builder.",
    "scope": "All 40 cards.",
    "summary": "All 40 types are registered and none is marked OBSOLETED or DEPRECATED in the registry of 2026-09-24. For every card Wikidata's chosen item has the type as a best-rank P1163 value and the front's extension as a P1195 value; the template or RFC names the extension for every card that has one (ZIP, plain text and GIF rest on Wikidata and MDN for the extension); MDN, where it lists the type ({N_MDN} cards), gives the same type and extension. No source gives a different registered type for any front. The findings record where the sources hold further values and how the cards deal with them.",
    "findings": [{"card": c, "issue": i, "resolution": r, "outcome": o} for c, i, r, o in wd_notes],
}]

dossier = {
    "name": "media-types",
    "title": {"en": "Media types (MIME types)", "sv": "Medietyper (MIME-typer)"},
    "description": {
        "en": "40 common file types and the media types (MIME types) they are registered under in the IANA Media Types registry, as of its update of 24 September 2026: text, documents and data, archives, images, audio, video and fonts. Front: the kind of file with its usual extension, e.g. \"PNG image (.png)\"; back: the registered media type, e.g. \"image/png\". Where an obsolete or unofficial name is still seen, such as application/javascript, a note gives it. Media types from the IANA registry, extensions from Wikidata, checked against IANA's registration templates, the RFCs and MDN Web Docs.",
        "sv": "40 vanliga filtyper och de medietyper (MIME-typer) som de är registrerade under i IANA:s register över medietyper, enligt dess uppdatering den 24 september 2026: text, dokument och data, arkiv, bilder, ljud, video och teckensnitt. Framsida: filtypen med sin vanliga filändelse, t.ex. ”PNG-bild (.png)”; baksida: den registrerade medietypen, t.ex. ”image/png”. Där ett föråldrat eller inofficiellt namn fortfarande förekommer, som application/javascript, anges det i en anteckning. Medietyperna är hämtade från IANA:s register och filändelserna från Wikidata, kontrollerade mot IANA:s registreringsmallar, RFC:erna och MDN Web Docs.",
    },
    "keywords": {
        "en": ["media types", "MIME types", "file extensions", "file formats", "IANA", "web development"],
        "sv": ["medietyper", "MIME-typer", "filändelser", "filformat", "IANA", "webbutveckling"],
    },
    "topics": ["computing"],
    "studyDirection": "frontToBack",
    "sides": {"front": ["en", "sv"], "back": ["zxx"]},
    "license": "CC0-1.0",
    "created": "2026-10-04T12:00:00.000Z",
    "creator": {"name": "Anton Wiklund", "email": "antonwiklund91@gmail.com"},
    "sources": sources,
    "method": method,
    "selection": selection,
    "queries": queries,
    "licensing": licensing,
    "qualityControl": {"rounds": rounds},
    "cards": cards,
}
n_mdn = sum(any(e["source"] == "mdn" for e in c["evidence"]) for c in cards)
text = json.dumps(dossier, indent=2, ensure_ascii=False).replace("{N_MDN}", str(n_mdn)).replace(S, "<scratch>") + "\n"
if "/tmp/claude" in text:
    sys.exit("STOP: absolute scratch path in the dossier")
open(OUT, "w", encoding="utf-8").write(text)
print("wrote", OUT, len(cards), "cards;", len(dossier["description"]["en"].split()), "words in the English description")

```

**19. Helpers for reading the saved files: python3 <scratch>/grep.py <file> <regex> [context], and python3 <scratch>/rfcext.py (type, subtype and file-extension lines of every saved RFC)** (The RFCs that register or define the media types on the cards: RFC 2046, 3003, 3302, 4180, 4337, 5334, 5545, 6350, 6713, 6922, 7303, 7763, 7903, 7946, 8081, 8118, 8259, 9239, 9512, 9559, 9639 and 9649 (plain-text versions from the RFC Editor))

```
#!/usr/bin/env python3
"""Usage: grep.py <file> <regex> [context]: print matching lines with context."""
import re, sys
lines = open(sys.argv[1], encoding="utf-8", errors="replace").read().splitlines()
ctx = int(sys.argv[3]) if len(sys.argv) > 3 else 3
pat = re.compile(sys.argv[2], re.I)
for i, l in enumerate(lines):
    if pat.search(l):
        print(f"--- {i + 1}")
        print("\n".join(lines[max(0, i - ctx): i + ctx + 1]))

# rfcext.py:
#!/usr/bin/env python3
"""For each saved RFC, print the 'Type name'/'Subtype name' lines and the file-extension lines (with the next line)."""
import glob, os, re
S = os.path.dirname(os.path.abspath(__file__))
for f in sorted(glob.glob(f"{S}/rfc*.txt")):
    lines = open(f, encoding="utf-8", errors="replace").read().splitlines()
    print("==", os.path.basename(f))
    for i, l in enumerate(lines):
        if re.search(r"(sub)?type name|MIME media type name|file extension", l, re.I):
            nxt = lines[i + 1].strip() if i + 1 < len(lines) else ""
            print(f"   {i + 1}: {l.strip()} | {nxt}")

```

**20. Further downloads during authoring whose exact commands were not kept: the registry's HTML page https://www.iana.org/assignments/media-types/media-types.xhtml (saved as media-types.xhtml; not read by any script, the cards rest on the XML and CSV files of query 1) and nine svenska.se pages for arbetsbok, arkiv, e-bok, filändelse, ljudfil, medietyp, stilmall, teckensnitt and textfil (saved as so-<word>.html; script-only page shells with no dictionary text, not used — the dictionary evidence comes from the search API of query 9)** (Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24))

```
(not recorded at the time; curl with the User-Agent "solid-memo deck research (https://github.com/antwika/solid-memo)")
```

**21. Review fixes: Svensk ordbok's entry for "fasa ut", then python3 <scratch>/round1.py, which applied rounds 1 to 3 to this dossier** (Svenska Akademiens ordböcker: Svenska Akademiens ordlista (SAOL) and Svensk ordbok (SO))

```
curl -s -A "solid-memo deck research (https://github.com/antwika/solid-memo)" -o <scratch>/round1/so-fasa-ut.json "https://svenska.se/api/search/so?q=fasa%20ut&exactMatch=true"

# round1.py:
#!/usr/bin/env python3
"""Apply the fixes from review rounds 1-3 to authored/media-types.json and log the rounds."""
import json, os, re, sys

S = os.path.dirname(os.path.abspath(__file__))
REPO = "<repo>/"
OUT = REPO + "packages/deck-library/authored/media-types.json"
TODAY = "2026-10-04"
d = json.load(open(OUT, encoding="utf-8"))
by_id = {c["id"]: c for c in d["cards"]}


def squash(s):
    return re.sub(r"\s+", " ", s).strip()


def cut(path, pattern):
    text = open(path, encoding="utf-8", errors="replace").read()
    m = re.search(pattern, text, re.S)
    if not m:
        sys.exit(f"STOP: {pattern!r} not in {path}")
    return squash(m.group(0))


def scrub(text):
    return text.replace(S, "<scratch>").replace(REPO, "<repo>/")


def rep(text, old, new):
    if old not in text:
        sys.exit(f"STOP: {old[:60]!r} not found")
    return text.replace(old, new)


def add_after(cid, source, entry):
    evs = by_id[cid]["evidence"]
    i = max(i for i, e in enumerate(evs) if e["source"] == source)
    evs.insert(i + 1, entry)


# --- Wikidata P1195 with ranks (query 16, q8.rq) replaces the truthy-only list on every card
ranked = {}
for b in json.load(open(f"{S}/q8.json", encoding="utf-8"))["results"]["bindings"]:
    q = b["item"]["value"].rsplit("/", 1)[1]
    parts = b["exts"]["value"].split(" ; ")
    ranked[q] = " ; ".join(sorted(parts, key=lambda p: ({"PreferredRank": 0, "NormalRank": 1}.get(p.split("[")[1][:-1], 2), p.lower())))
for c in d["cards"]:
    qid = c["checks"][0]["qid"]
    ext = next(ch["expect"] for ch in c["checks"] if ch["property"] == "P1195")
    best = [p.split(" [")[0] for p in ranked[qid].split(" ; ")
            if p.endswith("[PreferredRank]")] or [p.split(" [")[0] for p in ranked[qid].split(" ; ") if p.endswith("[NormalRank]")]
    if ext not in best:
        sys.exit(f"STOP: {c['id']}: {ext} not best-rank P1195 of {qid} ({ranked[qid]})")
    for e in c["evidence"]:
        if e["source"] == "wikidata" and "P1195 (file extension):" in e["says"]:
            q10 = "query 11 (q7.rq)" if qid == "Q110098625" else "query 10 (q6.rq)"
            e["locator"] = re.sub(r", query 10 \(q6\.rq\)$", f", {q10} for P1163 and query 16 (q8.rq) for P1195", e["locator"])
            e["says"] = re.sub(r"P1195 \(file extension\): .*$", f"P1195 (file extension) statements: {ranked[qid]}", e["says"])

# --- Round 1: gzip note and RFC 6713 Section 1
by_id["gzip"]["backNote"] = {
    "en": "application/x-gzip and similar informal names are replaced by application/gzip (RFC 6713).",
    "sv": "application/x-gzip och liknande inofficiella namn ersätts av application/gzip (RFC 6713).",
}
g = by_id["gzip"]
g_keys = list(g.keys())
g2 = {}
for k in g_keys:
    g2[k] = g[k]
    if k == "back":
        g2["backNote"] = g["backNote"]
by_id["gzip"].clear(); by_id["gzip"].update(g2)
add_after("gzip", "rfcs", {
    "source": "rfcs", "locator": "RFC 6713, Section 1 (Introduction): https://www.rfc-editor.org/rfc/rfc6713.txt",
    "says": "\"" + cut(f"{S}/rfc6713.txt", r"Some applications have informally used media types such as\s+application/gzip-compressed, .*?The media types\s+defined in this document should replace those media types in future\s+applications\.") + "\"",
    "retrieved": TODAY})

# --- Round 2: "utfasad" for deprecated, and the Ogg note
SV = {
    "vcard": "text/x-vcard och text/directory är utfasade till förmån för text/vcard (RFC 6350).",
    "yaml": "application/x-yaml, text/yaml och text/x-yaml är utfasade alias som aldrig har registrerats (RFC 9512).",
    "rar": "application/x-rar-compressed är ett utfasat alias.",
    "flac": "audio/x-flac är ett utfasat alias (RFC 9639).",
    "matroska-video": "video/x-matroska är ett utfasat alias (RFC 9559).",
    "woff": "application/font-woff är utfasad till förmån för font/woff (RFC 8081).",
    "ogg-vorbis": "Ogg-ljudfiler i allmänhet har filändelsen .oga; .ogg används för Ogg-filer med enbart Vorbis-ljud (RFC 5334).",
}
for cid, sv in SV.items():
    by_id[cid]["backNote"]["sv"] = sv

# --- Round 3: TrueType note in the compiler's words, with font/sfnt and its template
by_id["truetype"]["backNote"] = {
    "en": "IANA's font/ttf, font/otf and font/sfnt templates all name .ttf and .otf; .ttf files are usually fonts with TrueType outlines (RFC 8081).",
    "sv": "IANA:s mallar för font/ttf, font/otf och font/sfnt anger alla .ttf och .otf; .ttf-filer är oftast teckensnitt med Truetype-konturer (RFC 8081).",
}
add_after("truetype", "iana-templates", {
    "source": "iana-templates", "locator": "Registration template https://www.iana.org/assignments/media-types/font/sfnt",
    "says": "\"" + cut(f"{S}/templates/font__sfnt.txt", r"File extension\(s\):\s+Font file extensions used for OFF / OpenType\s+fonts: \.ttf and \.otf") + "\"",
    "retrieved": TODAY})

# --- Sources
src = d["sources"]["rfcs"]
src["creator"] = "IETF, the Independent Submission stream (RFC 7903) and the authors of each RFC; published by the RFC Editor"
src["licenseEvidence"] += (
    " TLP 5.0 Section 2.b applies its licences \"only with respect to … IETF RFCs and other IETF Documents that are published after the Effective Date\" "
    "(25 March 2015), and Section 2.c leaves earlier ones (RFC 2046, 3003, 3302, 4180, 4337, 5334, 5545, 6350, 6713, 6922 and 7303) \"subject to the licensing "
    "provisions of the IETF copyright policy document in effect at the time of their contribution or publication\" (RFCs 2026, 3978, 4748 and earlier TLP "
    "versions), none of which is a licence to modify outside the IETF; RFC 7903 is an Independent Submission, to which Section 8.f applies the same Legal "
    "Provisions (\"applied to documents submitted and published in the Independent Submission Stream following December 28, 2009\").")

# --- Method, selection, licensing
m = d["method"]
m[0] = rep(m[0], "checked by machine (live Wikidata",
                    "checked by machine (a script that stops on any mismatch with IANA's registry tables, registration templates, the RFCs and MDN, live Wikidata")
m[4] = rep(m[4], 
    "Query 10 fetched every P1163 statement with its rank and the P1195 values of the items used on the cards",
    "Query 10 fetched every P1163 statement with its rank and the best-rank (truthy) P1195 values of the items used on the cards")
m[4] += (" After review, query 16 (q8.rq) fetched every P1195 statement of the 40 items with its rank; the evidence quotes that full list "
         "(e.g. GeoJSON Q5533904: geojson preferred, json normal), and every card's extension is a best-rank value.")
m[6] = rep(m[6], 
    "make_dossier.py added the registry rows and RFC passages behind the notes and wrote this dossier.",
    "make_dossier.py (query 18) then added the registry rows and RFC passages behind the notes, added the font/otf template and the extra font/ttf "
    "template lines, replaced cards.py's TrueType note with a reworded one, added the Swedish-dictionary and Swedish-alias evidence and wrote this dossier "
    "with its documentation; sparql.py (query 17) ran every SPARQL query, and grep.py and rfcext.py (query 19) were used to read the saved files.")
m[7] = rep(m[7], 
    "teckensnitt, arbetsbok, e-bok, ljudfil, textfil, arkiv, dokument, bild, ikon, presentation, modul, fil, webb and komprimera have entries; videofil, textdokument and stilmall do not",
    "teckensnitt, arbetsbok, e-bok, ljudfil, textfil, arkiv, dokument, bild, ikon, presentation, modul, fil, webb and komprimera have entries in SAOL, "
    "and all but textfil also in Svensk ordbok; videofil, textdokument and stilmall are in neither")
m[8] = rep(m[8], "a back note names an obsolete, deprecated or unregistered name still seen for the same files where the registry, the template or the RFC states it (",
                    "a back note names an obsolete, deprecated or unregistered name still seen for the same files where the registry, the template or the RFC states it (application/x-gzip and similar informal names, ")
m[9] = rep(m[9], "and the card's extension as a P1195 value (80 checks)", "and the card's extension as a best-rank P1195 value (80 checks)")
m.append("10. Review: three independent review rounds (facts; language and tags; licensing and documentation) were resolved by round1.py (query 21), "
         "which reads the saved files, rewrites the Wikidata evidence from query 16, adds the gzip note and its RFC 6713 passage, the font/sfnt template line, "
         "the reworded Swedish notes and TrueType note, and the documentation changes, and logs rounds 1 to 3. \"utfasad\" for \"deprecated\" was checked in "
         "Svensk ordbok (\"fasa ut\": \"successivt avveckla\"; query 21).")

d["selection"] = rep(d["selection"], 
    "or, for text/plain and image/gif, which have no template, by Wikidata and MDN",
    "or, for text/plain and image/gif, which have no template, and application/zip, whose template has no extension field, by Wikidata and MDN")
d["licensing"] += (" Some fronts coincide with generic descriptions also used in MDN's table (e.g. \"ZIP archive\", \"RAR archive\"); these are ordinary "
                   "names of the formats, not text taken from MDN. The RFCs published before 25 March 2015 fall under the IETF copyright provisions in force "
                   "when they were published, and the Independent Submission RFC 7903 under the Legal Provisions as applied to that stream; none grants a "
                   "licence to modify, and the deck relies on none, since it only cites them.")

# --- Queries
Q = d["queries"]
Q.append({"source": "wikidata", "purpose": "16. Every P1195 (file extension) statement with its rank for the 40 items on the cards (python3 <scratch>/sparql.py <scratch>/q8.rq <scratch>/q8.json); the Wikidata evidence quotes it",
          "query": open(f"{S}/q8.rq", encoding="utf-8").read()})
Q.append({"source": "wikidata", "purpose": "17. sparql.py, which ran queries 6 to 12 and 16 against https://query.wikidata.org/sparql",
          "query": scrub(open(f"{S}/sparql.py", encoding="utf-8").read())})
Q.append({"source": "iana-media-types", "purpose": "18. make_dossier.py (python3 <scratch>/make_dossier.py), which completed the cards from cards.json and wrote the first version of this dossier (the worktree path is written as <repo>/)",
          "query": scrub(open(f"{S}/make_dossier.py", encoding="utf-8").read())})
Q.append({"source": "rfcs", "purpose": "19. Helpers for reading the saved files: python3 <scratch>/grep.py <file> <regex> [context], and python3 <scratch>/rfcext.py (type, subtype and file-extension lines of every saved RFC)",
          "query": scrub(open(f"{S}/grep.py", encoding="utf-8").read()) + "\n# rfcext.py:\n" + scrub(open(f"{S}/rfcext.py", encoding="utf-8").read())})
Q.append({"source": "iana-media-types", "purpose": "20. Further downloads during authoring whose exact commands were not kept: the registry's HTML page https://www.iana.org/assignments/media-types/media-types.xhtml (saved as media-types.xhtml; not read by any script, the cards rest on the XML and CSV files of query 1) and nine svenska.se pages for arbetsbok, arkiv, e-bok, filändelse, ljudfil, medietyp, stilmall, teckensnitt and textfil (saved as so-<word>.html; script-only page shells with no dictionary text, not used — the dictionary evidence comes from the search API of query 9)",
          "query": "(not recorded at the time; curl with the User-Agent \"solid-memo deck research (https://github.com/antwika/solid-memo)\")"})
Q.append({"source": "svenska-akademien", "purpose": "21. Review fixes: Svensk ordbok's entry for \"fasa ut\", then python3 <scratch>/round1.py, which applied rounds 1 to 3 to this dossier",
          "query": "curl -s -A \"solid-memo deck research (https://github.com/antwika/solid-memo)\" -o <scratch>/round1/so-fasa-ut.json \"https://svenska.se/api/search/so?q=fasa%20ut&exactMatch=true\"\n\n# round1.py:\n"
                   + scrub(open(os.path.abspath(__file__), encoding="utf-8").read())})

# --- Quality-control rounds
F = lambda card, issue, resolution, outcome: {"card": card, "issue": issue, "resolution": resolution, "outcome": outcome}
rounds = d["qualityControl"]["rounds"]
rounds.append({
    "round": 1, "date": TODAY, "reviewer": "Claude (AI) — independent Factual accuracy reviewer", "lens": "Factual accuracy",
    "scope": "All 40 cards, the description, selection and method, against IANA's media-types.xml, 37 live registration templates, ten RFCs and live Wikidata (all 80 checks re-run).",
    "summary": "No errors. Every back type is registered and current, every front has one right answer and every extension is named by the template or RFC (or, for text/plain, image/gif and application/zip, by Wikidata and MDN); all 12 notes match their sources. One warning (no note on application/x-gzip although RFC 6713 names it) and two suggestions; all three applied.",
    "findings": [
        F("gzip", "The description promises a note where an obsolete or unofficial name is still seen, but the gzip card has none, although RFC 6713 Section 1 names informal types, application/x-gzip among them.",
          "Confirmed in the saved RFC 6713 (Section 1). Added the back note \"application/x-gzip and similar informal names are replaced by application/gzip (RFC 6713).\" (Swedish to match), quoted RFC 6713 Section 1 in the evidence and added gzip to method step 8.", "fixed"),
        F("deck", "Selection (b) names only text/plain and image/gif as resting on Wikidata and MDN for the extension, but application/zip does too: its template is PKWARE's APPNOTE without an extension field.",
          "Agreed (round 0 already says so for ZIP). Selection (b) now names application/zip, \"whose template has no extension field\".", "fixed"),
        F("truetype", "The TrueType note recorded in cards.py (query 15) differs from the published one; the record did not show where the published wording came from.",
          "make_dossier.py, which replaced the note, was not recorded. It is now recorded verbatim as query 18 and method step 6 says it replaced the note; the note itself was reworded again in round 3, by round1.py (query 21).", "fixed"),
    ]})
rounds.append({
    "round": 2, "date": TODAY, "reviewer": "Claude (AI) — independent Language, translation and language tags reviewer", "lens": "Language, translation and language tags",
    "scope": "All 40 cards, title, description and keywords in English and Swedish; language tags in the dossier and the built TTL.",
    "summary": "Tags correct throughout (backs zxx, everything else en or sv, nothing untagged); Swedish format names match Wikidata and sv.wikipedia. One warning: six Swedish notes used \"avförd\" for \"deprecated\", which says the name was struck off; replaced by \"utfasad\". One suggestion on the Ogg note, applied.",
    "findings": [
        F("vcard, yaml, rar, flac, matroska-video, woff", "\"avförd/avfört/avförda\" for \"deprecated\" means removed from a list or context (Svensk ordbok: avföra), which misstates the status of a discouraged alias and contradicts \"never registered\" in the YAML note.",
          "Agreed. Svensk ordbok gives \"fasa ut\" as \"successivt avveckla\" (looked up today, query 21). The six notes now say \"utfasad/utfasat/utfasade\" (YAML: \"… är utfasade alias som aldrig har registrerats\"), which keeps them distinct from \"föråldrad\" for the OBSOLETED types.", "fixed"),
        F("ogg-vorbis", "\"Ogg-ljud i allmänhet har .oga\" is clipped: a file, not a sound, has an extension.",
          "Now \"Ogg-ljudfiler i allmänhet har filändelsen .oga; .ogg används för Ogg-filer med enbart Vorbis-ljud (RFC 5334).\"", "fixed"),
    ]})
rounds.append({
    "round": 3, "date": TODAY, "reviewer": "Claude (AI) — independent Licensing, attribution and documentation reviewer", "lens": "Licensing, attribution and documentation",
    "scope": "Every source's licence page, the licensing text, the recorded queries against the scratch files, and spot checks of the evidence against live sources (all 40 registry rows, 33 MDN rows, 22 RFC and template quotes, P1195 of all 40 Wikidata items).",
    "summary": "The CC0 deck licence complies: the content sources (IANA registry, Wikidata) are CC0 and the others were used for verification only. The problems were in the documentation: the Wikidata evidence quoted only best-rank P1195 values (and round 0 called .geojson Q5533904's only one), make_dossier.py and some helpers were not recorded, and the RFC licence evidence cited only TLP 5.0. All fixed; of four suggestions, all applied. While revising, the JPEG card's Wikidata locator was also corrected: its item Q110098625 was read by query 11 (q7.rq), not query 10.",
    "findings": [
        F("geojson", "Round 0 says .geojson is Wikidata's only P1195 value for Q5533904; it also has json at normal rank. Query 10 read P1195 through the truthy wdt: path, so only best-rank values were seen.",
          "Confirmed: query 16 (q8.rq, p:P1195/ps:P1195 with ranks) gives geojson [PreferredRank] ; json [NormalRank]. The evidence now quotes both. Round 0 is kept as logged; its statement is corrected here: .geojson is Q5533904's preferred P1195 value, and .json on the front would be ambiguous with application/json. The card is unchanged.", "fixed"),
        F("html, geojson, rar, flac, mp4-video", "The Wikidata evidence labelled \"P1195 (file extension)\" lists only best-rank values but reads as the complete list; method step 4 says query 10 fetched \"the P1195 values\".",
          "Query 16 fetched every P1195 statement with its rank for all 40 items, and every card's Wikidata evidence now quotes that full ranked list (htm, rev/r00/r01, oga/fla, m4a/m4b/m4p/m4r/m4v and json now appear at normal rank). Method steps 4 and 9 say that query 10 and the builder's checks read best-rank values. Every card's extension is a best-rank value (round1.py stops otherwise).", "fixed"),
        F("deck", "make_dossier.py, which changed card content and evidence and wrote round 0, is not recorded; nor are sparql.py, grep.py, rfcext.py, the media-types.xhtml download and nine svenska.se page downloads.",
          "Recorded: sparql.py (query 17), make_dossier.py verbatim (query 18, with the worktree path written as <repo>/), grep.py and rfcext.py (query 19). The commands for media-types.xhtml and the so-*.html pages were not kept; query 20 says so, what they were and that neither was used (the svenska.se pages are script-only page shells). Method step 6 now says what make_dossier.py changed.", "fixed"),
        F("deck", "The RFC licence evidence cites only TLP 5.0, which applies only to RFCs published after 25 March 2015 (11 of the 22 are older), and RFC 7903 is an Independent Submission, not an IETF-stream RFC.",
          "Confirmed in the saved TLP 5.0 PDF (Sections 2.b, 2.c, 8.f) and the RFC 7903 header (\"Independent Submission\"). The licence evidence now quotes Sections 2.b, 2.c and 8.f and lists the older RFCs; the creator reads \"IETF, the Independent Submission stream (RFC 7903) and the authors of each RFC; published by the RFC Editor\"; the licensing text says so. The conclusion (verification only, cited, no licence needed) is unchanged.", "fixed"),
        F("truetype", "The note's second half closely paraphrases the font/ttf template, and it leaves out font/sfnt, which also lists .ttf and .otf.",
          "Reworded: \"IANA's font/ttf, font/otf and font/sfnt templates all name .ttf and .otf; .ttf files are usually fonts with TrueType outlines (RFC 8081).\" (Swedish to match); the font/sfnt template line was added to the evidence.", "fixed"),
        F("deck", "Method step 7 says textfil has an entry in SAOL and Svensk ordbok; saol.json shows SAOL only.",
          "Confirmed (so:textfil 0 hits). Step 7 now says the words have entries in SAOL, and all but textfil also in Svensk ordbok.", "fixed"),
        F("odt", "Some fronts (\"OpenDocument text document\", \"ZIP archive\", \"RAR archive\") match MDN's \"Kind of document\" cells word for word, while the licensing says nothing was taken from MDN.",
          "These are the ordinary names of the formats, and the fronts were fixed in templates.py/cards.py before MDN was fetched. The licensing text now says the coincidence is not text taken from MDN. No card changed.", "fixed"),
        F("deck", "The first method paragraph could name the deck's own machine checks (cards.py stops on any mismatch with the registry, templates, RFCs and MDN).",
          "Added to the \"checked by machine\" list in the first method paragraph.", "fixed"),
    ]})

text = json.dumps(d, indent=2, ensure_ascii=False) + "\n"
if S in text or REPO in text:
    sys.exit("STOP: absolute path in the dossier")
open(OUT, "w", encoding="utf-8").write(text)
print("wrote", OUT)

```

**22. Review round 4: the audio/vorbis template and RFC 5215, then python3 <scratch>/round4.py, which applied round 4 to this dossier** (IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png))

```
curl -s -A "solid-memo deck research (https://github.com/antwika/solid-memo)" -o <scratch>/rfc5215.txt https://www.rfc-editor.org/rfc/rfc5215.txt
curl -s -A "solid-memo deck research (https://github.com/antwika/solid-memo)" -o <scratch>/audio-vorbis.txt https://www.iana.org/assignments/media-types/audio/vorbis

# round4.py:
#!/usr/bin/env python3
"""Apply review round 4 (audio/vorbis on the Ogg card) to authored/media-types.json and log it."""
import json, os, re, sys

S = os.path.dirname(os.path.abspath(__file__))
REPO = "<repo>/"
OUT = REPO + "packages/deck-library/authored/media-types.json"
TODAY = "2026-10-04"
d = json.load(open(OUT, encoding="utf-8"))
if any(r["round"] == 4 for r in d["qualityControl"]["rounds"]):
    sys.exit("STOP: round 4 already logged")
c = next(c for c in d["cards"] if c["id"] == "ogg-vorbis")


def squash(s):
    return re.sub(r"\s+", " ", s).strip()


def cut(path, pattern):
    m = re.search(pattern, open(path, encoding="utf-8").read(), re.S)
    if not m:
        sys.exit(f"STOP: {pattern!r} not in {path}")
    return squash(m.group(0))


tmpl = cut(f"{S}/audio-vorbis.txt", r"This media type depends on RTP framing, hence is only defined for\s+transfer via RTP \[RFC3550\]\.")
rfc = cut(f"{S}/rfc5215.txt", r"This media type depends on RTP framing, hence is only defined for\s+transfer via RTP \[RFC3550\]\.")

c["backNote"] = {
    "en": "Ogg audio in general uses .oga; .ogg is for Ogg files with only Vorbis audio (RFC 5334). audio/vorbis is only for RTP streaming, not files (RFC 5215).",
    "sv": "Ogg-ljudfiler i allmänhet har filändelsen .oga; .ogg används för Ogg-filer med enbart Vorbis-ljud (RFC 5334). audio/vorbis gäller bara strömning via RTP, inte filer (RFC 5215).",
}
evs = c["evidence"]
i = max(i for i, e in enumerate(evs) if e["source"] == "iana-templates")
evs.insert(i + 1, {
    "source": "iana-templates",
    "locator": "Registration template https://www.iana.org/assignments/media-types/audio/vorbis, \"Restriction on usage\"",
    "says": "\"" + tmpl + "\"",
    "retrieved": TODAY})
evs.append({
    "source": "rfcs",
    "locator": "RFC 5215, Section 10.1, registration of audio/vorbis, \"Restrictions on usage\": https://www.rfc-editor.org/rfc/rfc5215.txt",
    "says": "\"" + rfc + "\"",
    "retrieved": TODAY})

old = "XML is kept with a front note:"
if old not in d["selection"]:
    sys.exit("STOP: selection anchor not found")
d["selection"] = d["selection"].replace(old, "The Ogg card keeps audio/ogg although the registry also lists audio/vorbis (RFC 5215): that type depends on RTP framing and is defined only for transfer via RTP, so it is not a type for .ogg files; the back note says so. " + old)

d["queries"].append({
    "source": "iana-templates",
    "purpose": "22. Review round 4: the audio/vorbis template and RFC 5215, then python3 <scratch>/round4.py, which applied round 4 to this dossier",
    "query": "curl -s -A \"solid-memo deck research (https://github.com/antwika/solid-memo)\" -o <scratch>/rfc5215.txt https://www.rfc-editor.org/rfc/rfc5215.txt\n"
             "curl -s -A \"solid-memo deck research (https://github.com/antwika/solid-memo)\" -o <scratch>/audio-vorbis.txt https://www.iana.org/assignments/media-types/audio/vorbis\n\n# round4.py:\n"
             + open(__file__, encoding="utf-8").read(),
})

d["qualityControl"]["rounds"].append({
    "round": 4,
    "date": TODAY,
    "reviewer": "Claude (AI) — independent re-check reviewer",
    "lens": "Re-check of changed cards and a sample (facts, language, documentation)",
    "scope": "All 40 cards (rounds 1 to 3 touched every card's evidence): the live IANA registry tables and templates, RFCs, all 80 Wikidata checks against live SPARQL, the 12 notes, language tags in the dossier and TTL, the generated report, the description, keywords, licensing and the fixes logged in rounds 1 to 3.",
    "summary": "No errors or warnings: every back type is registered, current and spelled as in the registry; every front extension is named by its template, RFC or (for plain text, GIF and ZIP) Wikidata and MDN; all notes match their sources; all Wikidata checks pass; every fix logged in rounds 1 to 3 is in the dossier. One suggestion, on the Ogg card, applied.",
    "findings": [{
        "card": "ogg-vorbis",
        "issue": "The registry also lists audio/vorbis (RFC 5215), which a learner might give for an Ogg Vorbis file; the note does not say why it is not the answer.",
        "resolution": "Confirmed today: the audio/vorbis template and RFC 5215 Section 10.1 say \"This media type depends on RTP framing, hence is only defined for transfer via RTP [RFC3550].\" The back note now adds \"audio/vorbis is only for RTP streaming, not files (RFC 5215).\" (Swedish to match), both quotes are in the card's evidence, the selection explains the choice, and the commands are recorded as query 22.",
        "outcome": "fixed"}],
})

text = json.dumps(d, indent=2, ensure_ascii=False) + "\n"
text = text.replace(S, "<scratch>").replace(REPO, "<repo>/")
if S in text or REPO in text or ("/tmp/" + "claude-") in text:
    sys.exit("STOP: absolute path in the dossier")
open(OUT, "w", encoding="utf-8").write(text)
print("wrote", OUT)

```

## Quality control

6 rounds, 29 findings: 20 fixed, 0 rejected after checking, 9 needing no change. Every card's Wikidata checks (80 in all) are re-run against live Wikidata by `scripts/authored_decks.py check` before every build.

### Round 0: Machine and source checks: every card's type looked up in IANA's registry tables (registered, not obsolete or deprecated), its extension in IANA's template and the RFC, its type and extension in Wikidata (best-rank P1163, P1195) and MDN; Wikidata checks run by the builder. (2026-10-04)

**Reviewer:** Claude (AI) — authoring agent, machine checks · **Scope:** All 40 cards.

All 40 types are registered and none is marked OBSOLETED or DEPRECATED in the registry of 2026-09-24. For every card Wikidata's chosen item has the type as a best-rank P1163 value and the front's extension as a P1195 value; the template or RFC names the extension for every card that has one (ZIP, plain text and GIF rest on Wikidata and MDN for the extension); MDN, where it lists the type (33 cards), gives the same type and extension. No source gives a different registered type for any front. The findings record where the sources hold further values and how the cards deal with them.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| javascript | Wikidata's JavaScript item Q2005 also holds, at normal rank, unregistered or obsolete names (text/x-javascript, application/x-javascript, text/javascript1.0–1.5, text/livescript and others); text/javascript is its only preferred value. | The card follows IANA and RFC 9239 (text/javascript). The check reads Wikidata's best rank (text/javascript), so it is unaffected. No change to Wikidata's data is implied by the deck. | no change needed |
| woff | Wikidata's WOFF item Q918221 holds application/font-woff at normal rank, although IANA marks it "DEPRECATED in favor of font/woff"; font/woff is the preferred value. | The card gives font/woff and its note names application/font-woff as deprecated (template and RFC 8081). | no change needed |
| matroska-video | Wikidata's Matroska Video item Q27967512 holds video/matroska and video/x-matroska at equal (normal) rank; IANA's template names video/x-matroska a deprecated alias. The general Matroska item Q223535 has no video/matroska statement at all (only x- types, two of them deprecated). | The card gives video/matroska (registry, template, RFC 9559) and checks it on Q27967512; the note names video/x-matroska as deprecated. | no change needed |
| jpeg | Wikidata's general JPEG item Q2195 holds image/jpeg only at deprecated rank and has no P1195, so it cannot be checked; the JFIF item Q26329975 has image/jpeg but no P1195. | The card is checked on Q110098625 (Exif Image File Format (Compressed)), which has image/jpeg (normal rank, best) and P1195 jpg and jpeg. The type itself rests on the registry, the template ("jpg, jpeg"), RFC 2046 and MDN. | no change needed |
| svg | Wikidata's SVG item Q2078 also holds "image/SVG" at normal rank, which is not a registered type. | The card gives image/svg+xml (registry, template, MDN); the check is on that value. | no change needed |
| geojson | IANA's application/geo+json template and RFC 7946 list both .json and .geojson as extensions. | The front uses .geojson, the extension specific to GeoJSON (Wikidata's only P1195 value for Q5533904); a .json file is a JSON file (application/json), so .json on this front would be ambiguous. | no change needed |
| ogg-vorbis | IANA's audio/ogg template lists .oga, .ogg, .spx and .opus; RFC 5334 obsoleted .ogg for application/ogg (now .ogx). | The front names "Ogg Vorbis audio", for which RFC 5334 and the template keep .ogg; the note explains .oga for Ogg audio in general. | no change needed |
| truetype | IANA's templates for font/ttf, font/otf and font/sfnt all list ".ttf and .otf". | The front names a TrueType font; the font/ttf template ties itself to TrueType ("public.truetype-font", "@font-face Format: truetype") and says .ttf is typically used for fonts with TrueType outlines, and Wikidata's TrueType item and MDN give font/ttf. The note states the overlap. OpenType (.otf) was left out as ambiguous. | fixed |
| xml | Both application/xml and text/xml are registered (intended usage COMMON) with the extension .xml; Wikidata's XML item Q2115 holds both at normal rank. | Kept, with a front note asking for the type RFC 7303 recommends (application/xml; RFC 7303 defines text/xml as an alias), and a back note naming text/xml. | fixed |
| tiff | IANA's image/tiff template and RFC 3302 give the extension as ".TIF" (upper case); Wikidata and MDN give tif and tiff. | The front writes .tif in lower case, as on the other cards; file extensions are not case-sensitive on the systems where .TIF was common. | no change needed |
| zip | The application/zip template on IANA's site is PKWARE's ZIP application note and has no "File extension(s)" field. | The extension rests on Wikidata (P1195 zip) and MDN; the template only mentions "the extension .ZIP for this software". | no change needed |

### Round 1: Factual accuracy (2026-10-04)

**Reviewer:** Claude (AI) — independent Factual accuracy reviewer · **Scope:** All 40 cards, the description, selection and method, against IANA's media-types.xml, 37 live registration templates, ten RFCs and live Wikidata (all 80 checks re-run).

No errors. Every back type is registered and current, every front has one right answer and every extension is named by the template or RFC (or, for text/plain, image/gif and application/zip, by Wikidata and MDN); all 12 notes match their sources. One warning (no note on application/x-gzip although RFC 6713 names it) and two suggestions; all three applied.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| gzip | The description promises a note where an obsolete or unofficial name is still seen, but the gzip card has none, although RFC 6713 Section 1 names informal types, application/x-gzip among them. | Confirmed in the saved RFC 6713 (Section 1). Added the back note "application/x-gzip and similar informal names are replaced by application/gzip (RFC 6713)." (Swedish to match), quoted RFC 6713 Section 1 in the evidence and added gzip to method step 8. | fixed |
| deck | Selection (b) names only text/plain and image/gif as resting on Wikidata and MDN for the extension, but application/zip does too: its template is PKWARE's APPNOTE without an extension field. | Agreed (round 0 already says so for ZIP). Selection (b) now names application/zip, "whose template has no extension field". | fixed |
| truetype | The TrueType note recorded in cards.py (query 15) differs from the published one; the record did not show where the published wording came from. | make_dossier.py, which replaced the note, was not recorded. It is now recorded verbatim as query 18 and method step 6 says it replaced the note; the note itself was reworded again in round 3, by round1.py (query 21). | fixed |

### Round 2: Language, translation and language tags (2026-10-04)

**Reviewer:** Claude (AI) — independent Language, translation and language tags reviewer · **Scope:** All 40 cards, title, description and keywords in English and Swedish; language tags in the dossier and the built TTL.

Tags correct throughout (backs zxx, everything else en or sv, nothing untagged); Swedish format names match Wikidata and sv.wikipedia. One warning: six Swedish notes used "avförd" for "deprecated", which says the name was struck off; replaced by "utfasad". One suggestion on the Ogg note, applied.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| vcard, yaml, rar, flac, matroska-video, woff | "avförd/avfört/avförda" for "deprecated" means removed from a list or context (Svensk ordbok: avföra), which misstates the status of a discouraged alias and contradicts "never registered" in the YAML note. | Agreed. Svensk ordbok gives "fasa ut" as "successivt avveckla" (looked up today, query 21). The six notes now say "utfasad/utfasat/utfasade" (YAML: "… är utfasade alias som aldrig har registrerats"), which keeps them distinct from "föråldrad" for the OBSOLETED types. | fixed |
| ogg-vorbis | "Ogg-ljud i allmänhet har .oga" is clipped: a file, not a sound, has an extension. | Now "Ogg-ljudfiler i allmänhet har filändelsen .oga; .ogg används för Ogg-filer med enbart Vorbis-ljud (RFC 5334)." | fixed |

### Round 3: Licensing, attribution and documentation (2026-10-04)

**Reviewer:** Claude (AI) — independent Licensing, attribution and documentation reviewer · **Scope:** Every source's licence page, the licensing text, the recorded queries against the scratch files, and spot checks of the evidence against live sources (all 40 registry rows, 33 MDN rows, 22 RFC and template quotes, P1195 of all 40 Wikidata items).

The CC0 deck licence complies: the content sources (IANA registry, Wikidata) are CC0 and the others were used for verification only. The problems were in the documentation: the Wikidata evidence quoted only best-rank P1195 values (and round 0 called .geojson Q5533904's only one), make_dossier.py and some helpers were not recorded, and the RFC licence evidence cited only TLP 5.0. All fixed; of four suggestions, all applied. While revising, the JPEG card's Wikidata locator was also corrected: its item Q110098625 was read by query 11 (q7.rq), not query 10.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| geojson | Round 0 says .geojson is Wikidata's only P1195 value for Q5533904; it also has json at normal rank. Query 10 read P1195 through the truthy wdt: path, so only best-rank values were seen. | Confirmed: query 16 (q8.rq, p:P1195/ps:P1195 with ranks) gives geojson [PreferredRank] ; json [NormalRank]. The evidence now quotes both. Round 0 is kept as logged; its statement is corrected here: .geojson is Q5533904's preferred P1195 value, and .json on the front would be ambiguous with application/json. The card is unchanged. | fixed |
| html, geojson, rar, flac, mp4-video | The Wikidata evidence labelled "P1195 (file extension)" lists only best-rank values but reads as the complete list; method step 4 says query 10 fetched "the P1195 values". | Query 16 fetched every P1195 statement with its rank for all 40 items, and every card's Wikidata evidence now quotes that full ranked list (htm, rev/r00/r01, oga/fla, m4a/m4b/m4p/m4r/m4v and json now appear at normal rank). Method steps 4 and 9 say that query 10 and the builder's checks read best-rank values. Every card's extension is a best-rank value (round1.py stops otherwise). | fixed |
| deck | make_dossier.py, which changed card content and evidence and wrote round 0, is not recorded; nor are sparql.py, grep.py, rfcext.py, the media-types.xhtml download and nine svenska.se page downloads. | Recorded: sparql.py (query 17), make_dossier.py verbatim (query 18, with the worktree path written as <repo>/), grep.py and rfcext.py (query 19). The commands for media-types.xhtml and the so-*.html pages were not kept; query 20 says so, what they were and that neither was used (the svenska.se pages are script-only page shells). Method step 6 now says what make_dossier.py changed. | fixed |
| deck | The RFC licence evidence cites only TLP 5.0, which applies only to RFCs published after 25 March 2015 (11 of the 22 are older), and RFC 7903 is an Independent Submission, not an IETF-stream RFC. | Confirmed in the saved TLP 5.0 PDF (Sections 2.b, 2.c, 8.f) and the RFC 7903 header ("Independent Submission"). The licence evidence now quotes Sections 2.b, 2.c and 8.f and lists the older RFCs; the creator reads "IETF, the Independent Submission stream (RFC 7903) and the authors of each RFC; published by the RFC Editor"; the licensing text says so. The conclusion (verification only, cited, no licence needed) is unchanged. | fixed |
| truetype | The note's second half closely paraphrases the font/ttf template, and it leaves out font/sfnt, which also lists .ttf and .otf. | Reworded: "IANA's font/ttf, font/otf and font/sfnt templates all name .ttf and .otf; .ttf files are usually fonts with TrueType outlines (RFC 8081)." (Swedish to match); the font/sfnt template line was added to the evidence. | fixed |
| deck | Method step 7 says textfil has an entry in SAOL and Svensk ordbok; saol.json shows SAOL only. | Confirmed (so:textfil 0 hits). Step 7 now says the words have entries in SAOL, and all but textfil also in Svensk ordbok. | fixed |
| odt | Some fronts ("OpenDocument text document", "ZIP archive", "RAR archive") match MDN's "Kind of document" cells word for word, while the licensing says nothing was taken from MDN. | These are the ordinary names of the formats, and the fronts were fixed in templates.py/cards.py before MDN was fetched. The licensing text now says the coincidence is not text taken from MDN. No card changed. | fixed |
| deck | The first method paragraph could name the deck's own machine checks (cards.py stops on any mismatch with the registry, templates, RFCs and MDN). | Added to the "checked by machine" list in the first method paragraph. | fixed |

### Round 4: Re-check of changed cards and a sample (facts, language, documentation) (2026-10-04)

**Reviewer:** Claude (AI) — independent re-check reviewer · **Scope:** All 40 cards (rounds 1 to 3 touched every card's evidence): the live IANA registry tables and templates, RFCs, all 80 Wikidata checks against live SPARQL, the 12 notes, language tags in the dossier and TTL, the generated report, the description, keywords, licensing and the fixes logged in rounds 1 to 3.

No errors or warnings: every back type is registered, current and spelled as in the registry; every front extension is named by its template, RFC or (for plain text, GIF and ZIP) Wikidata and MDN; all notes match their sources; all Wikidata checks pass; every fix logged in rounds 1 to 3 is in the dossier. One suggestion, on the Ogg card, applied.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| ogg-vorbis | The registry also lists audio/vorbis (RFC 5215), which a learner might give for an Ogg Vorbis file; the note does not say why it is not the answer. | Confirmed today: the audio/vorbis template and RFC 5215 Section 10.1 say "This media type depends on RTP framing, hence is only defined for transfer via RTP [RFC3550]." The back note now adds "audio/vorbis is only for RTP streaming, not files (RFC 5215)." (Swedish to match), both quotes are in the card's evidence, the selection explains the choice, and the commands are recorded as query 22. | fixed |

### Round 5: Final full-deck review (facts and language) (2026-10-04)

**Reviewer:** Claude (AI) — independent final reviewer · **Scope:** All 40 cards: every back type against IANA's live per-type CSV tables, the vnd.rar template, the text/directory registry row, the text of RFC 7303, the Wikidata Swedish labels of 14 items, language tags, the description and its counts, keywords, study direction, licence and round 4's fix.

No errors: all 40 back types are registered and current, every extension and alias note matches its source, and every front has one right answer. One warning (the description promised a note for every obsolete or unofficial name) and three suggestions (the RFC 7303 section number in the XML evidence, mixed capitalisation of Swedish format names, the wording of the ICO note). All four were verified; the description, the XML locator, the method and the ICO note were changed, and V-card-fil was kept.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| deck | The description says a note gives any obsolete or unofficial name that is still seen, but zip (application/x-zip-compressed), mp3 (audio/mp3) and bmp (image/x-ms-bmp, image/x-bmp) have no note, and IANA's registry records none of those informal names. | Confirmed: the notes are based on what the registry, the templates and the RFCs (and, for ICO, the type's absence from the registry) say, and the deck has no CC0 or primary source for informal names such as audio/mp3. The sentence now reads "Notes give the obsolete, deprecated or alias types that the registry, its templates or the RFCs name, such as application/javascript." (sv: "Anteckningar anger de föråldrade, utfasade eller alternativa typer som registret, dess registreringsmallar eller RFC:erna nämner, som application/javascript."). The ICO note stays: it adds context and the sentence no longer claims to list every note's kind. The English description is 98 words. | fixed |
| xml | The RFC 7303 evidence gives "Abstract and Section 9.2" as the locator, but the RECOMMENDED sentence is in Section 4.1. | Confirmed in https://www.rfc-editor.org/rfc/rfc7303.txt fetched today: "4.1.  XML MIME Entities" starts at line 482 and the sentence "However, application/xml and application/xml-external-parsed-entity are still RECOMMENDED" is at lines 537-539, before "4.2." at line 585; Section 9.2 (line 1127) is the text/xml registration. The locator now reads "RFC 7303, Abstract and Section 4.1". | fixed |
| plain-text | Swedish fronts mix initial-capital forms (Javascript-fil, Powerpoint-presentation, Truetype-teckensnitt, Opendocument-format, Epub-format, Zip-arkiv) with internal-capital forms (WebAssembly-modul, WebP-bild, iCalendar-fil); V-card-fil reads awkwardly and vCard-fil is common. | Verified with wbgetentities today: Q305941 sv "V-card" (Swedish Wikipedia title "V-card"), Q20155677 sv "WebAssembly", Q62617958 sv "WebP" (svwiki "WebP"), Q284651 sv "iCalendar". Every form follows its Wikidata Swedish label, which is the deck's single naming rule, so the fronts are kept, including V-card-fil, which matches both Wikidata and Swedish Wikipedia. Method step 7 now says explicitly that the rule is applied to every Swedish format name, even where the label keeps internal capitals, rather than imposing one capitalisation style. | fixed |
| ico | The note "Den ofta förekommande image/x-icon är inte registrerad." has no head noun before the code; the English has the same issue in a milder form. | Applied: en "The often-seen type image/x-icon is not registered."; sv "Den ofta förekommande typen image/x-icon är inte registrerad." | fixed |

## Cards and evidence

| Card | Front | Back | Evidence |
|---|---|---|---|
| `plain-text` | Plain text file (.txt) (en) / Textfil (.txt) (sv) | text/plain (zxx) | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "text" table (text.csv), row "plain" — Name "plain" \| Template "text/plain" \| Reference "[RFC 2046][RFC 3676][RFC 5147]"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/text/plain — No registration template available.<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q86920 (text file), query 10 (q6.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: text/plain [NormalRank]; P1195 (file extension) statements: text [NormalRank] ; txt [NormalRank]<br>The RFCs that register or define the media types on the cards: RFC 2046, 3003, 3302, 4180, 4337, 5334, 5545, 6350, 6713, 6922, 7303, 7763, 7903, 7946, 8081, 8118, 8259, 9239, 9512, 9559, 9639 and 9649 (plain-text versions from the RFC Editor): RFC 2046, Section 4.1.3 (line 569): https://www.rfc-editor.org/rfc/rfc2046.txt — "The simplest and most important subtype of "text" is "plain"."<br>Common media types (MDN Web Docs): "Common media types", table row `.txt` — `.txt` \| Text, (generally {{Glossary("ASCII")}} or ISO 8859-_n_) \| `text/plain`<br>Wikidata checks: Q86920 P1163 = text/plain, Q86920 P1195 = txt |
| `html` | HTML document (.html) (en) / HTML-dokument (.html) (sv) | text/html (zxx) | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "text" table (text.csv), row "html" — Name "html" \| Template "text/html" \| Reference "[W3C][Robin_Berjon]"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/text/html — "File extension(s) : "html" and "htm" are commonly used."<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q8811 (HTML), query 10 (q6.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: text/html [NormalRank]; P1195 (file extension) statements: html [PreferredRank] ; htm [NormalRank]<br>Common media types (MDN Web Docs): "Common media types", table row `.htm`, `.html` — `.htm`, `.html` \| HyperText Markup Language (HTML) \| `text/html`<br>Wikidata checks: Q8811 P1163 = text/html, Q8811 P1195 = html |
| `css` | CSS style sheet (.css) (en) / CSS-stilmall (.css) (sv) | text/css (zxx) | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "text" table (text.csv), row "css" — Name "css" \| Template "text/css" \| Reference "[W3C][https://www.w3.org/TR/css]"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/text/css — "File extension(s): .css"<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q46441 (Cascading Style Sheets), query 10 (q6.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: text/css [NormalRank]; P1195 (file extension) statements: css [NormalRank]<br>Common media types (MDN Web Docs): "Common media types", table row `.css` — `.css` \| Cascading Style Sheets (CSS) \| `text/css`<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q46441 (Cascading Style Sheets), sv aliases (query 12, q5.rq) — sv label "Cascading Style Sheets"; sv aliases "Stilmallar", "Stilmall"<br>Wikidata checks: Q46441 P1163 = text/css, Q46441 P1195 = css |
| `javascript` | JavaScript file (.js) (en) / Javascript-fil (.js) (sv) | text/javascript (zxx) — *application/javascript is obsolete: RFC 9239 (2022) made text/javascript the only current type. (en) / application/javascript är föråldrad: RFC 9239 (2022) gjorde text/javascript till den enda aktuella typen. (sv)* | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "text" table (text.csv), row "javascript" — Name "javascript" \| Template "text/javascript" \| Reference "[RFC 9239]"; application table, row "javascript (OBSOLETED in favor of text/javascript)" \| Template "application/javascript" \| Reference "[RFC 4329][RFC 9239]"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/text/javascript — "File extension(s): .js, .mjs"; "Deprecated alias names for this type: application/javascript,"<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q2005 (JavaScript), query 10 (q6.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: application/javascript [DeprecatedRank] ; text/x-ecmascript [NormalRank] ; text/x-javascript [NormalRank] ; application/x-javascript [NormalRank] ; text/ecmascript [DeprecatedRank] ; text/javascript1.1 [NormalRank] ; application/ecmascript [DeprecatedRank] ; text/javascript1.0 [NormalRank] ; application/x-ecmascript [NormalRank] ; text/javascript [PreferredRank] ; text/javascript1.5 [NormalRank] ; text/javascript1.3 [NormalRank] ; text/livescript [NormalRank] ; text/javascript1.2 [NormalRank] ; text/javascript1.4 [NormalRank]; P1195 (file extension) statements: js [NormalRank] ; mjs [NormalRank]<br>The RFCs that register or define the media types on the cards: RFC 2046, 3003, 3302, 4180, 4337, 5334, 5545, 6350, 6713, 6922, 7303, 7763, 7903, 7946, 8081, 8118, 8259, 9239, 9512, 9559, 9639 and 9649 (plain-text versions from the RFC Editor): RFC 9239, registration of text/javascript, "File extension(s)" (line 506): https://www.rfc-editor.org/rfc/rfc9239.txt — "File extension(s): .js, .mjs"<br>The RFCs that register or define the media types on the cards: RFC 2046, 3003, 3302, 4180, 4337, 5334, 5545, 6350, 6713, 6922, 7303, 7763, 7903, 7946, 8081, 8118, 8259, 9239, 9512, 9559, 9639 and 9649 (plain-text versions from the RFC Editor): RFC 9239, Section 1 (Introduction): https://www.rfc-editor.org/rfc/rfc9239.txt — "The most widely supported media type in use is text/javascript; all others are considered historical and obsolete aliases of text/javascript."<br>Common media types (MDN Web Docs): "Common media types", table row `.js` — `.js` \| JavaScript \| `text/javascript` (Specifications: [HTML](https://html.spec.whatwg.org/multipage/#scriptingLanguages) and [RFC 9239](https://www.rfc-editor.org/info/rfc9239/))<br>Wikidata checks: Q2005 P1163 = text/javascript, Q2005 P1195 = js |
| `csv` | CSV file (.csv) (en) / CSV-fil (.csv) (sv) | text/csv (zxx) | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "text" table (text.csv), row "csv" — Name "csv" \| Template "text/csv" \| Reference "[RFC 4180][RFC 7111]"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/text/csv — "File extension(s): CSV"<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q935809 (comma-separated values), query 10 (q6.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: text/csv [NormalRank]; P1195 (file extension) statements: csv [NormalRank]<br>The RFCs that register or define the media types on the cards: RFC 2046, 3003, 3302, 4180, 4337, 5334, 5545, 6350, 6713, 6922, 7303, 7763, 7903, 7946, 8081, 8118, 8259, 9239, 9512, 9559, 9639 and 9649 (plain-text versions from the RFC Editor): RFC 4180, registration of text/csv, "File extension(s)" (line 258): https://www.rfc-editor.org/rfc/rfc4180.txt — "File extension(s): CSV"<br>Common media types (MDN Web Docs): "Common media types", table row `.csv` — `.csv` \| Comma-separated values (CSV) \| `text/csv`<br>Wikidata checks: Q935809 P1163 = text/csv, Q935809 P1195 = csv |
| `markdown` | Markdown document (.md) (en) / Markdown-dokument (.md) (sv) | text/markdown (zxx) | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "text" table (text.csv), row "markdown" — Name "markdown" \| Template "text/markdown" \| Reference "[RFC 7763]"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/text/markdown — "File extension(s): .md, .markdown"<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q1193600 (Markdown), query 10 (q6.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: text/markdown [NormalRank]; P1195 (file extension) statements: markdown [NormalRank] ; md [NormalRank] ; mdown [NormalRank] ; mdtext [NormalRank] ; mdtxt [NormalRank] ; mdwn [NormalRank] ; mkd [NormalRank] ; mkdn [NormalRank]<br>The RFCs that register or define the media types on the cards: RFC 2046, 3003, 3302, 4180, 4337, 5334, 5545, 6350, 6713, 6922, 7303, 7763, 7903, 7946, 8081, 8118, 8259, 9239, 9512, 9559, 9639 and 9649 (plain-text versions from the RFC Editor): RFC 7763, registration of text/markdown, "File extension(s)" (line 373): https://www.rfc-editor.org/rfc/rfc7763.txt — "File extension(s): .md, .markdown"<br>Common media types (MDN Web Docs): "Common media types", table row `.md` — `.md` \| Markdown \| `text/markdown`<br>Wikidata checks: Q1193600 P1163 = text/markdown, Q1193600 P1195 = md |
| `icalendar` | iCalendar file (.ics) (en) / iCalendar-fil (.ics) (sv) | text/calendar (zxx) | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "text" table (text.csv), row "calendar" — Name "calendar" \| Template "text/calendar" \| Reference "[RFC 5545]"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/text/calendar — "File extension(s): The file extension of "ics" is to be used to designate a file containing (an arbitrary set of) calendaring and scheduling information consistent with this MIME content type."<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q284651 (iCalendar), query 10 (q6.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: text/calendar [NormalRank]; P1195 (file extension) statements: iCal [NormalRank] ; icalendar [NormalRank] ; ics [NormalRank] ; ifb [NormalRank] ; iFBf [NormalRank]<br>The RFCs that register or define the media types on the cards: RFC 2046, 3003, 3302, 4180, 4337, 5334, 5545, 6350, 6713, 6922, 7303, 7763, 7903, 7946, 8081, 8118, 8259, 9239, 9512, 9559, 9639 and 9649 (plain-text versions from the RFC Editor): RFC 5545, registration of text/calendar, "File extension(s)" (line 8427): https://www.rfc-editor.org/rfc/rfc5545.txt — "File extension(s): The file extension of "ics" is to be used to designate a file containing (an arbitrary set of) calendaring and scheduling information consistent with this MIME content type."<br>Common media types (MDN Web Docs): "Common media types", table row `.ics` — `.ics` \| iCalendar format \| `text/calendar`<br>Wikidata checks: Q284651 P1163 = text/calendar, Q284651 P1195 = ics |
| `vcard` | vCard file (.vcf) (en) / V-card-fil (.vcf) (sv) | text/vcard (zxx) — *text/x-vcard and text/directory are deprecated in favour of text/vcard (RFC 6350). (en) / text/x-vcard och text/directory är utfasade till förmån för text/vcard (RFC 6350). (sv)* | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "text" table (text.csv), row "vcard" — Name "vcard" \| Template "text/vcard" \| Reference "[RFC 6350]"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/text/vcard — "File extension(s): .vcf .vcard"; "They should be considered deprecated in favor of text/vcard."<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q305941 (vCard), query 10 (q6.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: text/vcard [PreferredRank] ; text/x-vcard [DeprecatedRank] ; text/directory [DeprecatedRank]; P1195 (file extension) statements: vcard [NormalRank] ; vcf [NormalRank]<br>The RFCs that register or define the media types on the cards: RFC 2046, 3003, 3302, 4180, 4337, 5334, 5545, 6350, 6713, 6922, 7303, 7763, 7903, 7946, 8081, 8118, 8259, 9239, 9512, 9559, 9639 and 9649 (plain-text versions from the RFC Editor): RFC 6350, registration of text/vcard, "File extension(s)" (line 3266): https://www.rfc-editor.org/rfc/rfc6350.txt — "File extension(s): .vcf .vcard"<br>Wikidata checks: Q305941 P1163 = text/vcard, Q305941 P1195 = vcf |
| `json` | JSON file (.json) (en) / JSON-fil (.json) (sv) | application/json (zxx) | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "application" table (application.csv), row "json" — Name "json" \| Template "application/json" \| Reference "[RFC 8259]"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/application/json — "File extension(s): .json"<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q2063 (JSON), query 10 (q6.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: application/json [NormalRank]; P1195 (file extension) statements: json [NormalRank]<br>The RFCs that register or define the media types on the cards: RFC 2046, 3003, 3302, 4180, 4337, 5334, 5545, 6350, 6713, 6922, 7303, 7763, 7903, 7946, 8081, 8118, 8259, 9239, 9512, 9559, 9639 and 9649 (plain-text versions from the RFC Editor): RFC 8259, registration of application/json, "File extension(s)" (line 596): https://www.rfc-editor.org/rfc/rfc8259.txt — "File extension(s): .json"<br>Common media types (MDN Web Docs): "Common media types", table row `.json` — `.json` \| JSON format \| `application/json`<br>Wikidata checks: Q2063 P1163 = application/json, Q2063 P1195 = json |
| `pdf` | PDF document (.pdf) (en) / PDF-dokument (.pdf) (sv) | application/pdf (zxx) | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "application" table (application.csv), row "pdf" — Name "pdf" \| Template "application/pdf" \| Reference "[RFC 8118]"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/application/pdf — "File extension(s): .pdf"<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q42332 (PDF), query 10 (q6.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: application/acrobat [DeprecatedRank] ; application/pdf [PreferredRank] ; application/x-pdf [NormalRank] ; application/x-bzpdf [NormalRank] ; application/x-gzpdf [NormalRank]; P1195 (file extension) statements: pdf [NormalRank]<br>The RFCs that register or define the media types on the cards: RFC 2046, 3003, 3302, 4180, 4337, 5334, 5545, 6350, 6713, 6922, 7303, 7763, 7903, 7946, 8081, 8118, 8259, 9239, 9512, 9559, 9639 and 9649 (plain-text versions from the RFC Editor): RFC 8118, registration of application/pdf, "File extension(s)" (line 463): https://www.rfc-editor.org/rfc/rfc8118.txt — "File extension(s): .pdf"<br>Common media types (MDN Web Docs): "Common media types", table row `.pdf` — `.pdf` \| Adobe [Portable Document Format](https://www.adobe.com/acrobat/about-adobe-pdf.html) (PDF) \| `application/pdf`<br>Wikidata checks: Q42332 P1163 = application/pdf, Q42332 P1195 = pdf |
| `zip` | ZIP archive (.zip) (en) / Zip-arkiv (.zip) (sv) | application/zip (zxx) | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "application" table (application.csv), row "zip" — Name "zip" \| Template "application/zip" \| Reference "[Paul_Lindner]"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/application/zip — "for suggesting the extension .ZIP for this software."<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q136218 (ZIP), query 10 (q6.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: application/x-zip [DeprecatedRank] ; multipart/x-zip [DeprecatedRank] ; application/x-zip-compressed [DeprecatedRank] ; application/zip [NormalRank]; P1195 (file extension) statements: zip [NormalRank]<br>Common media types (MDN Web Docs): "Common media types", table row `.zip` — `.zip` \| ZIP archive \| `application/zip`. Note, Windows uploads `.zip` files with the non-standard MIME type `application/x-zip-compressed`.<br>Wikidata checks: Q136218 P1163 = application/zip, Q136218 P1195 = zip |
| `gzip` | Gzip-compressed file (.gz) (en) / Gzip-komprimerad fil (.gz) (sv) | application/gzip (zxx) — *application/x-gzip and similar informal names are replaced by application/gzip (RFC 6713). (en) / application/x-gzip och liknande inofficiella namn ersätts av application/gzip (RFC 6713). (sv)* | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "application" table (application.csv), row "gzip" — Name "gzip" \| Template "application/gzip" \| Reference "[RFC 6713]"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/application/gzip — "File extension(s): gz"<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q10287816 (GZIP), query 10 (q6.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: application/gzip [PreferredRank] ; application/x-gzip [NormalRank]; P1195 (file extension) statements: gz [NormalRank] ; gzip [NormalRank] ; tgz [NormalRank]<br>The RFCs that register or define the media types on the cards: RFC 2046, 3003, 3302, 4180, 4337, 5334, 5545, 6350, 6713, 6922, 7303, 7763, 7903, 7946, 8081, 8118, 8259, 9239, 9512, 9559, 9639 and 9649 (plain-text versions from the RFC Editor): RFC 6713, registration of application/gzip, "File extension(s)" (line 161): https://www.rfc-editor.org/rfc/rfc6713.txt — "File extension(s): gz"<br>The RFCs that register or define the media types on the cards: RFC 2046, 3003, 3302, 4180, 4337, 5334, 5545, 6350, 6713, 6922, 7303, 7763, 7903, 7946, 8081, 8118, 8259, 9239, 9512, 9559, 9639 and 9649 (plain-text versions from the RFC Editor): RFC 6713, Section 1 (Introduction): https://www.rfc-editor.org/rfc/rfc6713.txt — "Some applications have informally used media types such as application/gzip-compressed, application/gzipped, application/ x-gunzip, application/x-gzip, application/x-gzip-compressed, and gzip/document to describe data compressed with gzip. The media types defined in this document should replace those media types in future applications."<br>Common media types (MDN Web Docs): "Common media types", table row `.gz` — `.gz` \| GZip Compressed Archive \| `application/gzip`. Note, Windows and macOS upload `.gz` files with the non-standard MIME type `application/x-gzip`.<br>Wikidata checks: Q10287816 P1163 = application/gzip, Q10287816 P1195 = gz |
| `xml` | XML document (.xml) (en) / XML-dokument (.xml) (sv) | application/xml (zxx) — *text/xml is registered as an alias, but RFC 7303 recommends application/xml. (en) / text/xml är registrerad som alias, men RFC 7303 rekommenderar application/xml. (sv)* | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "application" table (application.csv), row "xml" — Name "xml" \| Template "application/xml" \| Reference "[RFC 7303]"; text table, row "xml" \| Template "text/xml" \| Reference "[RFC 7303]"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/application/xml — "File extension(s): .xml"<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q2115 (XML), query 10 (q6.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: text/xml [NormalRank] ; application/xml [NormalRank]; P1195 (file extension) statements: xml [NormalRank]<br>The RFCs that register or define the media types on the cards: RFC 2046, 3003, 3302, 4180, 4337, 5334, 5545, 6350, 6713, 6922, 7303, 7763, 7903, 7946, 8081, 8118, 8259, 9239, 9512, 9559, 9639 and 9649 (plain-text versions from the RFC Editor): RFC 7303, registration of application/xml, "File extension(s)" (line 1100): https://www.rfc-editor.org/rfc/rfc7303.txt — "File extension(s): .xml"<br>The RFCs that register or define the media types on the cards: RFC 2046, 3003, 3302, 4180, 4337, 5334, 5545, 6350, 6713, 6922, 7303, 7763, 7903, 7946, 8081, 8118, 8259, 9239, 9512, 9559, 9639 and 9649 (plain-text versions from the RFC Editor): RFC 7303, Abstract and Section 4.1: https://www.rfc-editor.org/rfc/rfc7303.txt — "while defining text/xml and text/ xml-external-parsed-entity as aliases for the respective application/ types."; "However, application/xml and application/xml- external-parsed-entity are still RECOMMENDED, to avoid possible confusion based on the earlier distinction."<br>Common media types (MDN Web Docs): "Common media types", table row `.xml` — `.xml` \| XML \| `application/xml` is recommended as of [RFC 7303](https://datatracker.ietf.org/doc/html/rfc7303#section-4.1) (section 4.1), but `text/xml` is still used sometimes. You can assign a specific MIME type to a file with `.xml` extension depending on how its contents are meant to be interpreted. For instance, an Atom feed is `application/atom+xml`, but `application/xml` serves as a valid default.<br>Wikidata checks: Q2115 P1163 = application/xml, Q2115 P1195 = xml |
| `epub` | EPUB e-book (.epub) (en) / E-bok i Epub-format (.epub) (sv) | application/epub+zip (zxx) | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "application" table (application.csv), row "epub+zip" — Name "epub+zip" \| Template "application/epub+zip" \| Reference "[W3C][EPUB_3_WG]"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/application/epub+zip — "File extension(s): OCF ZIP container files are most often identified with the extension .epub."<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q475488 (no en label), query 10 (q6.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: application/epub+zip [NormalRank]; P1195 (file extension) statements: epub [NormalRank]<br>Common media types (MDN Web Docs): "Common media types", table row `.epub` — `.epub` \| Electronic publication (EPUB) \| `application/epub+zip`<br>Svenska Akademiens ordböcker: Svenska Akademiens ordlista (SAOL) and Svensk ordbok (SO): SAOL and Svensk ordbok, search API, "e-bok" (query 9) — SAOL: one entry, "e-bok" (plural e-böcker); Svensk ordbok: one entry, "e-bok"<br>Wikidata checks: Q475488 P1163 = application/epub+zip, Q475488 P1195 = epub |
| `docx` | Word document (.docx) (en) / Word-dokument (.docx) (sv) | application/vnd.openxmlformats-officedocument.wordprocessingml.document (zxx) | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "application" table (application.csv), row "vnd.openxmlformats-officedocument.wordprocessingml.document" — Name "vnd.openxmlformats-officedocument.wordprocessingml.document" \| Template "application/vnd.openxmlformats-officedocument.wordprocessingml.document" \| Reference "[Makoto_Murata]"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/application/vnd.openxmlformats-officedocument.wordprocessingml.document — "File extension(s) : docx"<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q3033641 (Office Open XML Wordprocessing Document, ECMA-376 1st Edition), query 10 (q6.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: application/vnd.openxmlformats-officedocument.wordprocessingml.document [NormalRank]; P1195 (file extension) statements: docx [NormalRank]<br>Common media types (MDN Web Docs): "Common media types", table row `.docx` — `.docx` \| Microsoft Word (OpenXML) \| `application/vnd.openxmlformats-officedocument.wordprocessingml.document`<br>Wikidata checks: Q3033641 P1163 = application/vnd.openxmlformats-officedocument.wordprocessingml.document, Q3033641 P1195 = docx |
| `xlsx` | Excel workbook (.xlsx) (en) / Excel-arbetsbok (.xlsx) (sv) | application/vnd.openxmlformats-officedocument.spreadsheetml.sheet (zxx) | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "application" table (application.csv), row "vnd.openxmlformats-officedocument.spreadsheetml.sheet" — Name "vnd.openxmlformats-officedocument.spreadsheetml.sheet" \| Template "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" \| Reference "[Makoto_Murata]"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/application/vnd.openxmlformats-officedocument.spreadsheetml.sheet — "File extension(s): xlsx"<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q3570403 (Office Open XML Spreadsheet Document, ECMA-376 1st Edition), query 10 (q6.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet [NormalRank]; P1195 (file extension) statements: xlsx [NormalRank]<br>Common media types (MDN Web Docs): "Common media types", table row `.xlsx` — `.xlsx` \| Microsoft Excel (OpenXML) \| `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`<br>Svenska Akademiens ordböcker: Svenska Akademiens ordlista (SAOL) and Svensk ordbok (SO): SAOL and Svensk ordbok, search API, "arbetsbok" (query 9) — SAOL: one entry, "arbets\|bok"; Svensk ordbok: one entry, "arbetsbok"<br>Wikidata checks: Q3570403 P1163 = application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, Q3570403 P1195 = xlsx |
| `pptx` | PowerPoint presentation (.pptx) (en) / Powerpoint-presentation (.pptx) (sv) | application/vnd.openxmlformats-officedocument.presentationml.presentation (zxx) | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "application" table (application.csv), row "vnd.openxmlformats-officedocument.presentationml.presentation" — Name "vnd.openxmlformats-officedocument.presentationml.presentation" \| Template "application/vnd.openxmlformats-officedocument.presentationml.presentation" \| Reference "[Makoto_Murata]"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/application/vnd.openxmlformats-officedocument.presentationml.presentation — "File extension(s) : pptx"<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q3596397 (Office Open XML Presentation Document, ECMA-376 1st Edition), query 10 (q6.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: application/vnd.openxmlformats-officedocument.presentationml.presentation [NormalRank]; P1195 (file extension) statements: pptx [NormalRank]<br>Common media types (MDN Web Docs): "Common media types", table row `.pptx` — `.pptx` \| Microsoft PowerPoint (OpenXML) \| `application/vnd.openxmlformats-officedocument.presentationml.presentation`<br>Wikidata checks: Q3596397 P1163 = application/vnd.openxmlformats-officedocument.presentationml.presentation, Q3596397 P1195 = pptx |
| `odt` | OpenDocument text document (.odt) (en) / Textdokument i Opendocument-format (.odt) (sv) | application/vnd.oasis.opendocument.text (zxx) | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "application" table (application.csv), row "vnd.oasis.opendocument.text" — Name "vnd.oasis.opendocument.text" \| Template "application/vnd.oasis.opendocument.text" \| Reference "[OASIS_TC_Admin][OASIS]"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/application/vnd.oasis.opendocument.text — "File extension(s) : odt"<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q184473 (OpenDocument), query 10 (q6.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: application/vnd.oasis.opendocument.text [NormalRank]; P1195 (file extension) statements: fodt [NormalRank] ; odt [NormalRank]<br>Common media types (MDN Web Docs): "Common media types", table row `.odt` — `.odt` \| OpenDocument text document \| `application/vnd.oasis.opendocument.text`<br>Wikidata checks: Q184473 P1163 = application/vnd.oasis.opendocument.text, Q184473 P1195 = odt |
| `wasm` | WebAssembly module (.wasm) (en) / WebAssembly-modul (.wasm) (sv) | application/wasm (zxx) | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "application" table (application.csv), row "wasm" — Name "wasm" \| Template "application/wasm" \| Reference "[W3C][Eric_Prudhommeaux]"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/application/wasm — "File extension(s): .wasm"<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q20155677 (WebAssembly), query 10 (q6.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: application/wasm [NormalRank]; P1195 (file extension) statements: wasm [NormalRank] ; wast [NormalRank]<br>Common media types (MDN Web Docs): "Common media types", table row `.wasm` — `.wasm` \| WebAssembly binary module \| `application/wasm`<br>Wikidata checks: Q20155677 P1163 = application/wasm, Q20155677 P1195 = wasm |
| `sql` | SQL file (.sql) (en) / SQL-fil (.sql) (sv) | application/sql (zxx) | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "application" table (application.csv), row "sql" — Name "sql" \| Template "application/sql" \| Reference "[RFC 6922]"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/application/sql — "File extension(s): sql"<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q47607 (SQL), query 10 (q6.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: application/x-sql [NormalRank] ; application/sql [NormalRank]; P1195 (file extension) statements: sql [NormalRank]<br>The RFCs that register or define the media types on the cards: RFC 2046, 3003, 3302, 4180, 4337, 5334, 5545, 6350, 6713, 6922, 7303, 7763, 7903, 7946, 8081, 8118, 8259, 9239, 9512, 9559, 9639 and 9649 (plain-text versions from the RFC Editor): RFC 6922, registration of application/sql, "File extension(s)" (line 183): https://www.rfc-editor.org/rfc/rfc6922.txt — "File extension(s): sql"<br>Wikidata checks: Q47607 P1163 = application/sql, Q47607 P1195 = sql |
| `yaml` | YAML file (.yaml) (en) / YAML-fil (.yaml) (sv) | application/yaml (zxx) — *application/x-yaml, text/yaml and text/x-yaml are deprecated, unregistered aliases (RFC 9512). (en) / application/x-yaml, text/yaml och text/x-yaml är utfasade alias som aldrig har registrerats (RFC 9512). (sv)* | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "application" table (application.csv), row "yaml" — Name "yaml" \| Template "application/yaml" \| Reference "[YAML][RFC 9512]"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/application/yaml — "File extension(s): "yaml" (preferred) and "yml". See Section 3.3 of RFC 9512."; "Deprecated alias names for this type: application/x-yaml, text/ yaml, and text/x-yaml. These names are used but are not registered."<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q281876 (YAML), query 10 (q6.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: application/x-yaml [DeprecatedRank] ; text/yaml [DeprecatedRank] ; application/yaml [PreferredRank] ; text/x-yaml [DeprecatedRank]; P1195 (file extension) statements: yaml [NormalRank] ; yml [NormalRank]<br>The RFCs that register or define the media types on the cards: RFC 2046, 3003, 3302, 4180, 4337, 5334, 5545, 6350, 6713, 6922, 7303, 7763, 7903, 7946, 8081, 8118, 8259, 9239, 9512, 9559, 9639 and 9649 (plain-text versions from the RFC Editor): RFC 9512, registration of application/yaml, "File extension(s)" (line 227): https://www.rfc-editor.org/rfc/rfc9512.txt — "File extension(s): "yaml" (preferred) and "yml". See Section 3.3 of this document."<br>Wikidata checks: Q281876 P1163 = application/yaml, Q281876 P1195 = yaml |
| `geojson` | GeoJSON file (.geojson) (en) / GeoJSON-fil (.geojson) (sv) | application/geo+json (zxx) — *application/vnd.geo+json is obsolete, replaced by application/geo+json (RFC 7946). (en) / application/vnd.geo+json är föråldrad och ersatt av application/geo+json (RFC 7946). (sv)* | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "application" table (application.csv), row "geo+json" — Name "geo+json" \| Template "application/geo+json" \| Reference "[RFC 7946]"; row "vnd.geo+json (OBSOLETED by [RFC 7946] in favor of application/geo+json)" \| Template "application/vnd.geo+json" \| Reference "[Sean_Gillies]"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/application/geo+json — "File extension(s): .json, .geojson"<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q5533904 (GeoJSON), query 10 (q6.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: application/vnd.geo+json [NormalRank] ; application/geo+json [PreferredRank] ; application/json [DeprecatedRank]; P1195 (file extension) statements: geojson [PreferredRank] ; json [NormalRank]<br>The RFCs that register or define the media types on the cards: RFC 2046, 3003, 3302, 4180, 4337, 5334, 5545, 6350, 6713, 6922, 7303, 7763, 7903, 7946, 8081, 8118, 8259, 9239, 9512, 9559, 9639 and 9649 (plain-text versions from the RFC Editor): RFC 7946, registration of application/geo+json, "File extension(s)" (line 1051): https://www.rfc-editor.org/rfc/rfc7946.txt — "File extension(s): .json, .geojson"<br>Wikidata checks: Q5533904 P1163 = application/geo+json, Q5533904 P1195 = geojson |
| `rar` | RAR archive (.rar) (en) / RAR-arkiv (.rar) (sv) | application/vnd.rar (zxx) — *application/x-rar-compressed is a deprecated alias. (en) / application/x-rar-compressed är ett utfasat alias. (sv)* | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "application" table (application.csv), row "vnd.rar" — Name "vnd.rar" \| Template "application/vnd.rar" \| Reference "[Kim_Scarborough]"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/application/vnd.rar — "File extension(s): .rar"; "Deprecated alias names for this type: application/x-rar-compressed"<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q243303 (RAR), query 10 (q6.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: application/x-rar-compressed [DeprecatedRank] ; application/vnd.rar [NormalRank]; P1195 (file extension) statements: rar [PreferredRank] ; r00 [NormalRank] ; r01 [NormalRank] ; rev [NormalRank]<br>Common media types (MDN Web Docs): "Common media types", table row `.rar` — `.rar` \| RAR archive \| `application/vnd.rar`<br>Wikidata checks: Q243303 P1163 = application/vnd.rar, Q243303 P1195 = rar |
| `png` | PNG image (.png) (en) / PNG-bild (.png) (sv) | image/png (zxx) | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "image" table (image.csv), row "png" — Name "png" \| Template "image/png" \| Reference "[W3C][PNG_WG][PNG]"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/image/png — "File extension(s): .png"<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q178051 (Portable Network Graphics), query 10 (q6.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: image/png [NormalRank]; P1195 (file extension) statements: png [NormalRank]<br>Common media types (MDN Web Docs): "Common media types", table row `.png` — `.png` \| Portable Network Graphics \| `image/png`<br>Wikidata checks: Q178051 P1163 = image/png, Q178051 P1195 = png |
| `jpeg` | JPEG image (.jpg) (en) / JPEG-bild (.jpg) (sv) | image/jpeg (zxx) | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "image" table (image.csv), row "jpeg" — Name "jpeg" \| Template "image/jpeg" \| Reference "[RFC 2045][RFC 2046]"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/image/jpeg — "File extension(s): jpg, jpeg"<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q110098625 (Exif Image File Format (Compressed)), query 11 (q7.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: image/jpeg [NormalRank]; P1195 (file extension) statements: jpeg [NormalRank] ; jpg [NormalRank]<br>The RFCs that register or define the media types on the cards: RFC 2046, 3003, 3302, 4180, 4337, 5334, 5545, 6350, 6713, 6922, 7303, 7763, 7903, 7946, 8081, 8118, 8259, 9239, 9512, 9559, 9639 and 9649 (plain-text versions from the RFC Editor): RFC 2046, Section 4.2 (line 592): https://www.rfc-editor.org/rfc/rfc2046.txt — "An initial subtype is "jpeg" for the JPEG format using JFIF encoding [JPEG]."<br>Common media types (MDN Web Docs): "Common media types", table row `.jpeg`, `.jpg` — `.jpeg`, `.jpg` \| JPEG images \| `image/jpeg`<br>Wikidata checks: Q110098625 P1163 = image/jpeg, Q110098625 P1195 = jpg |
| `gif` | GIF image (.gif) (en) / GIF-bild (.gif) (sv) | image/gif (zxx) | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "image" table (image.csv), row "gif" — Name "gif" \| Template "image/gif" \| Reference "[RFC 2045][RFC 2046]"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/image/gif — No registration template available.<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q2192 (GIF), query 10 (q6.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: image/gif [NormalRank]; P1195 (file extension) statements: gif [NormalRank]<br>The RFCs that register or define the media types on the cards: RFC 2046, 3003, 3302, 4180, 4337, 5334, 5545, 6350, 6713, 6922, 7303, 7763, 7903, 7946, 8081, 8118, 8259, 9239, 9512, 9559, 9639 and 9649 (plain-text versions from the RFC Editor): RFC 2046, Section 3, item (2), image (line 235): https://www.rfc-editor.org/rfc/rfc2046.txt — "subtypes are defined for two widely-used image formats, jpeg and gif."<br>Common media types (MDN Web Docs): "Common media types", table row `.gif` — `.gif` \| Graphics Interchange Format (GIF) \| `image/gif`<br>Wikidata checks: Q2192 P1163 = image/gif, Q2192 P1195 = gif |
| `svg` | SVG image (.svg) (en) / SVG-bild (.svg) (sv) | image/svg+xml (zxx) | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "image" table (image.csv), row "svg+xml" — Name "svg+xml" \| Template "image/svg+xml" \| Reference "[W3C][http://www.w3.org/TR/SVG/mimereg.html]"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/image/svg+xml — "File extension(s): svg Note that the extension 'svgz' is used as an alias for 'svg.gz' [rfc1952], i.e. octet streams of type image/svg+xml, subsequently compressed with gzip."<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q2078 (no en label), query 10 (q6.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: image/SVG [NormalRank] ; image/svg+xml [NormalRank]; P1195 (file extension) statements: svg [NormalRank] ; svgz [NormalRank]<br>Common media types (MDN Web Docs): "Common media types", table row `.svg` — `.svg` \| Scalable Vector Graphics (SVG) \| `image/svg+xml`<br>Wikidata checks: Q2078 P1163 = image/svg+xml, Q2078 P1195 = svg |
| `webp` | WebP image (.webp) (en) / WebP-bild (.webp) (sv) | image/webp (zxx) | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "image" table (image.csv), row "webp" — Name "webp" \| Template "image/webp" \| Reference "[RFC 9649]"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/image/webp — "File extension(s): webp"<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q62617958 (WebP), query 10 (q6.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: image/webp [NormalRank]; P1195 (file extension) statements: webp [NormalRank]<br>The RFCs that register or define the media types on the cards: RFC 2046, 3003, 3302, 4180, 4337, 5334, 5545, 6350, 6713, 6922, 7303, 7763, 7903, 7946, 8081, 8118, 8259, 9239, 9512, 9559, 9639 and 9649 (plain-text versions from the RFC Editor): RFC 9649, registration of image/webp, "File extension(s)" (line 2242): https://www.rfc-editor.org/rfc/rfc9649.txt — "File extension(s): webp"<br>Common media types (MDN Web Docs): "Common media types", table row `.webp` — `.webp` \| WEBP image \| `image/webp`<br>Wikidata checks: Q62617958 P1163 = image/webp, Q62617958 P1195 = webp |
| `avif` | AVIF image (.avif) (en) / AVIF-bild (.avif) (sv) | image/avif (zxx) | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "image" table (image.csv), row "avif" — Name "avif" \| Template "image/avif" \| Reference "[Alliance_for_Open_Media][Cyril_Concolato]"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/image/avif — "File extension(s): avif, heif, heifs or hif"<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q59913607 (AV1 Image File Format), query 10 (q6.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: image/avif [NormalRank]; P1195 (file extension) statements: avif [NormalRank]<br>Common media types (MDN Web Docs): "Common media types", table row `.avif` — `.avif` \| AVIF image \| `image/avif`<br>Wikidata checks: Q59913607 P1163 = image/avif, Q59913607 P1195 = avif |
| `bmp` | BMP image (.bmp) (en) / BMP-bild (.bmp) (sv) | image/bmp (zxx) | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "image" table (image.csv), row "bmp" — Name "bmp" \| Template "image/bmp" \| Reference "[RFC 7903]"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/image/bmp — "File extension(s): .bmp, .dib"<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q192869 (Windows Bitmap), query 10 (q6.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: image/x-bmp [NormalRank] ; image/bmp [PreferredRank] ; image/x-ms-bmp [DeprecatedRank]; P1195 (file extension) statements: bmp [NormalRank] ; dib [NormalRank] ; rle [NormalRank]<br>The RFCs that register or define the media types on the cards: RFC 2046, 3003, 3302, 4180, 4337, 5334, 5545, 6350, 6713, 6922, 7303, 7763, 7903, 7946, 8081, 8118, 8259, 9239, 9512, 9559, 9639 and 9649 (plain-text versions from the RFC Editor): RFC 7903, registration of image/bmp, "File extension(s)" (line 535): https://www.rfc-editor.org/rfc/rfc7903.txt — "File extension(s): .bmp, .dib"<br>Common media types (MDN Web Docs): "Common media types", table row `.bmp` — `.bmp` \| Windows OS/2 Bitmap Graphics \| `image/bmp`<br>Wikidata checks: Q192869 P1163 = image/bmp, Q192869 P1195 = bmp |
| `tiff` | TIFF image (.tif) (en) / TIFF-bild (.tif) (sv) | image/tiff (zxx) | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "image" table (image.csv), row "tiff" — Name "tiff" \| Template "image/tiff" \| Reference "[RFC 3302]"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/image/tiff — "File extension(s): .TIF"<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q215106 (TIFF), query 10 (q6.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: image/tiff [NormalRank]; P1195 (file extension) statements: tif [NormalRank] ; tiff [NormalRank]<br>The RFCs that register or define the media types on the cards: RFC 2046, 3003, 3302, 4180, 4337, 5334, 5545, 6350, 6713, 6922, 7303, 7763, 7903, 7946, 8081, 8118, 8259, 9239, 9512, 9559, 9639 and 9649 (plain-text versions from the RFC Editor): RFC 3302, registration of image/tiff, "File extension(s)" (line 274): https://www.rfc-editor.org/rfc/rfc3302.txt — "File extension(s): .TIF"<br>Common media types (MDN Web Docs): "Common media types", table row `.tif`, `.tiff` — `.tif`, `.tiff` \| Tagged Image File Format (TIFF) \| `image/tiff`<br>Wikidata checks: Q215106 P1163 = image/tiff, Q215106 P1195 = tif |
| `ico` | ICO icon (.ico) (en) / ICO-ikon (.ico) (sv) | image/vnd.microsoft.icon (zxx) — *The often-seen type image/x-icon is not registered. (en) / Den ofta förekommande typen image/x-icon är inte registrerad. (sv)* | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "image" table (image.csv), row "vnd.microsoft.icon" — Name "vnd.microsoft.icon" \| Template "image/vnd.microsoft.icon" \| Reference "[Simon_Butcher]"; the image table has no row "x-icon" (image/x-icon is not registered)<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/image/vnd.microsoft.icon — "File extension(s) : ico"<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q729366 (ICO), query 10 (q6.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: image/vnd.microsoft.icon [NormalRank] ; image/x-icon [DeprecatedRank]; P1195 (file extension) statements: ico [NormalRank]<br>Common media types (MDN Web Docs): "Common media types", table row `.ico` — `.ico` \| Icon format \| `image/vnd.microsoft.icon`<br>Wikidata checks: Q729366 P1163 = image/vnd.microsoft.icon, Q729366 P1195 = ico |
| `mp3` | MP3 audio file (.mp3) (en) / MP3-ljudfil (.mp3) (sv) | audio/mpeg (zxx) | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "audio" table (audio.csv), row "mpeg" — Name "mpeg" \| Template "audio/mpeg" \| Reference "[RFC 3003]"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/audio/mpeg — "File extension(s): .mp1, .mp2, .mp3"<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q42591 (no en label), query 10 (q6.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: audio/mpa-robust [NormalRank] ; audio/mp3 [DeprecatedRank] ; audio/mpeg [PreferredRank] ; audio/MPA [NormalRank] ; audio/mpg [NormalRank] ; audio/x-mpeg [NormalRank] ; audio/x-mp3 [NormalRank]; P1195 (file extension) statements: mp3 [NormalRank]<br>The RFCs that register or define the media types on the cards: RFC 2046, 3003, 3302, 4180, 4337, 5334, 5545, 6350, 6713, 6922, 7303, 7763, 7903, 7946, 8081, 8118, 8259, 9239, 9512, 9559, 9639 and 9649 (plain-text versions from the RFC Editor): RFC 3003, registration of audio/mpeg, "File extension(s)" (line 145): https://www.rfc-editor.org/rfc/rfc3003.txt — "File extension(s): .mp1, .mp2, .mp3"<br>Common media types (MDN Web Docs): "Common media types", table row `.mp3` — `.mp3` \| MP3 audio \| `audio/mpeg`<br>Wikidata checks: Q42591 P1163 = audio/mpeg, Q42591 P1195 = mp3 |
| `ogg-vorbis` | Ogg Vorbis audio file (.ogg) (en) / Ogg Vorbis-ljudfil (.ogg) (sv) | audio/ogg (zxx) — *Ogg audio in general uses .oga; .ogg is for Ogg files with only Vorbis audio (RFC 5334). audio/vorbis is only for RTP streaming, not files (RFC 5215). (en) / Ogg-ljudfiler i allmänhet har filändelsen .oga; .ogg används för Ogg-filer med enbart Vorbis-ljud (RFC 5334). audio/vorbis gäller bara strömning via RTP, inte filer (RFC 5215). (sv)* | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "audio" table (audio.csv), row "ogg" — Name "ogg" \| Template "audio/ogg" \| Reference "[RFC 5334][RFC 7845]"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/audio/ogg — "File extension(s): .oga, .ogg, .spx, .opus"; "In particular, .ogg is used for Ogg files that contain only a Vorbis bitstream"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/audio/vorbis, "Restriction on usage" — "This media type depends on RTP framing, hence is only defined for transfer via RTP [RFC3550]."<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q11885120 (Vorbis), query 10 (q6.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: application/ogg [NormalRank] ; audio/vorbis-config [NormalRank] ; audio/vorbis [NormalRank] ; audio/ogg [NormalRank]; P1195 (file extension) statements: oga [NormalRank] ; ogg [NormalRank] ; sb0 [NormalRank]<br>The RFCs that register or define the media types on the cards: RFC 2046, 3003, 3302, 4180, 4337, 5334, 5545, 6350, 6713, 6922, 7303, 7763, 7903, 7946, 8081, 8118, 8259, 9239, 9512, 9559, 9639 and 9649 (plain-text versions from the RFC Editor): RFC 5334, registration of audio/ogg, "File extension(s)" (line 524): https://www.rfc-editor.org/rfc/rfc5334.txt — "File extension(s): .oga, .ogg, .spx"<br>The RFCs that register or define the media types on the cards: RFC 2046, 3003, 3302, 4180, 4337, 5334, 5545, 6350, 6713, 6922, 7303, 7763, 7903, 7946, 8081, 8118, 8259, 9239, 9512, 9559, 9639 and 9649 (plain-text versions from the RFC Editor): RFC 5215, Section 10.1, registration of audio/vorbis, "Restrictions on usage": https://www.rfc-editor.org/rfc/rfc5215.txt — "This media type depends on RTP framing, hence is only defined for transfer via RTP [RFC3550]."<br>Wikidata checks: Q11885120 P1163 = audio/ogg, Q11885120 P1195 = ogg |
| `flac` | FLAC audio file (.flac) (en) / FLAC-ljudfil (.flac) (sv) | audio/flac (zxx) — *audio/x-flac is a deprecated alias (RFC 9639). (en) / audio/x-flac är ett utfasat alias (RFC 9639). (sv)* | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "audio" table (audio.csv), row "flac" — Name "flac" \| Template "audio/flac" \| Reference "[RFC 9639]"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/audio/flac — "File extension(s): flac"; "Deprecated alias names for this type: audio/x-flac"<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q131481410 (Free Lossless Audio Codec), query 10 (q6.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: audio/x-flac [DeprecatedRank] ; audio/flac [NormalRank]; P1195 (file extension) statements: flac [PreferredRank] ; fla [NormalRank] ; oga [NormalRank]<br>The RFCs that register or define the media types on the cards: RFC 2046, 3003, 3302, 4180, 4337, 5334, 5545, 6350, 6713, 6922, 7303, 7763, 7903, 7946, 8081, 8118, 8259, 9239, 9512, 9559, 9639 and 9649 (plain-text versions from the RFC Editor): RFC 9639, registration of audio/flac, "File extension(s)" (line 2408): https://www.rfc-editor.org/rfc/rfc9639.txt — "File extension(s): flac"<br>Wikidata checks: Q131481410 P1163 = audio/flac, Q131481410 P1195 = flac |
| `mp4-video` | MP4 video file (.mp4) (en) / MP4-videofil (.mp4) (sv) | video/mp4 (zxx) | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "video" table (video.csv), row "mp4" — Name "mp4" \| Template "video/mp4" \| Reference "[RFC 4337][RFC 6381]"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/video/mp4 — "File extension(s): mp4 and mpg4 are both declared at <http://pitch.nist.gov/nics/>."<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q336316 (MPEG-4 Part 14), query 10 (q6.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: video/mp4 [NormalRank] ; audio/mp4 [NormalRank]; P1195 (file extension) statements: mp4 [PreferredRank] ; m4a [NormalRank] ; m4b [NormalRank] ; m4p [NormalRank] ; m4r [NormalRank] ; m4v [NormalRank]<br>The RFCs that register or define the media types on the cards: RFC 2046, 3003, 3302, 4180, 4337, 5334, 5545, 6350, 6713, 6922, 7303, 7763, 7903, 7946, 8081, 8118, 8259, 9239, 9512, 9559, 9639 and 9649 (plain-text versions from the RFC Editor): RFC 4337, registration of video/mp4, "File extension(s)" (line 204): https://www.rfc-editor.org/rfc/rfc4337.txt — "File extension(s): mp4 and mpg4 are both declared at <http://pitch.nist.gov/nics/>."<br>Common media types (MDN Web Docs): "Common media types", table row `.mp4` — `.mp4` \| MP4 video \| `video/mp4`<br>Wikidata checks: Q336316 P1163 = video/mp4, Q336316 P1195 = mp4 |
| `matroska-video` | Matroska video file (.mkv) (en) / Matroska-videofil (.mkv) (sv) | video/matroska (zxx) — *video/x-matroska is a deprecated alias (RFC 9559). (en) / video/x-matroska är ett utfasat alias (RFC 9559). (sv)* | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "video" table (video.csv), row "matroska" — Name "matroska" \| Template "video/matroska" \| Reference "[RFC 9559]"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/video/matroska — "File extension(s): mkv"; "Deprecated alias names for this type: video/x-matroska"<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q27967512 (Matroska Video), query 10 (q6.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: video/matroska [NormalRank] ; video/x-matroska [NormalRank]; P1195 (file extension) statements: mkv [NormalRank]<br>The RFCs that register or define the media types on the cards: RFC 2046, 3003, 3302, 4180, 4337, 5334, 5545, 6350, 6713, 6922, 7303, 7763, 7903, 7946, 8081, 8118, 8259, 9239, 9512, 9559, 9639 and 9649 (plain-text versions from the RFC Editor): RFC 9559, registration of video/matroska, "File extension(s)" (line 7807): https://www.rfc-editor.org/rfc/rfc9559.txt — "File extension(s): mkv"<br>Wikidata checks: Q27967512 P1163 = video/matroska, Q27967512 P1195 = mkv |
| `woff` | WOFF web font (.woff) (en) / WOFF-webbteckensnitt (.woff) (sv) | font/woff (zxx) — *application/font-woff is deprecated in favour of font/woff (RFC 8081). (en) / application/font-woff är utfasad till förmån för font/woff (RFC 8081). (sv)* | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "font" table (font.csv), row "woff" — Name "woff" \| Template "font/woff" \| Reference "[RFC 8081]"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/font/woff — "File extension(s): woff"; "Deprecated Alias: The existing registration "application/font- woff" is deprecated in favor of "font/woff"."<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q918221 (Web Open Font Format), query 10 (q6.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: font/woff [PreferredRank] ; application/font-woff [NormalRank]; P1195 (file extension) statements: woff [NormalRank]<br>The RFCs that register or define the media types on the cards: RFC 2046, 3003, 3302, 4180, 4337, 5334, 5545, 6350, 6713, 6922, 7303, 7763, 7903, 7946, 8081, 8118, 8259, 9239, 9512, 9559, 9639 and 9649 (plain-text versions from the RFC Editor): RFC 8081, registration of font/woff, "File extension(s)" (line 777): https://www.rfc-editor.org/rfc/rfc8081.txt — "File extension(s): woff"<br>Common media types (MDN Web Docs): "Common media types", table row `.woff` — `.woff` \| Web Open Font Format (WOFF) \| `font/woff`<br>Svenska Akademiens ordböcker: Svenska Akademiens ordlista (SAOL) and Svensk ordbok (SO): SAOL and Svensk ordbok, search API, "teckensnitt" and "webb" (query 9) — SAOL and Svensk ordbok: one entry each for "teckensnitt" and for "webb"<br>Wikidata checks: Q918221 P1163 = font/woff, Q918221 P1195 = woff |
| `woff2` | WOFF2 web font (.woff2) (en) / WOFF2-webbteckensnitt (.woff2) (sv) | font/woff2 (zxx) | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "font" table (font.csv), row "woff2" — Name "woff2" \| Template "font/woff2" \| Reference "[RFC 8081]"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/font/woff2 — "File extension(s): woff2"<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q18413771 (Web Open Font Format, version 2), query 10 (q6.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: font/woff2 [NormalRank]; P1195 (file extension) statements: woff2 [NormalRank]<br>The RFCs that register or define the media types on the cards: RFC 2046, 3003, 3302, 4180, 4337, 5334, 5545, 6350, 6713, 6922, 7303, 7763, 7903, 7946, 8081, 8118, 8259, 9239, 9512, 9559, 9639 and 9649 (plain-text versions from the RFC Editor): RFC 8081, registration of font/woff2, "File extension(s)" (line 838): https://www.rfc-editor.org/rfc/rfc8081.txt — "File extension(s): woff2"<br>Common media types (MDN Web Docs): "Common media types", table row `.woff2` — `.woff2` \| Web Open Font Format (WOFF) \| `font/woff2`<br>Svenska Akademiens ordböcker: Svenska Akademiens ordlista (SAOL) and Svensk ordbok (SO): SAOL and Svensk ordbok, search API, "teckensnitt" and "webb" (query 9) — SAOL and Svensk ordbok: one entry each for "teckensnitt" and for "webb"<br>Wikidata checks: Q18413771 P1163 = font/woff2, Q18413771 P1195 = woff2 |
| `truetype` | TrueType font (.ttf) (en) / Truetype-teckensnitt (.ttf) (sv) | font/ttf (zxx) — *IANA's font/ttf, font/otf and font/sfnt templates all name .ttf and .otf; .ttf files are usually fonts with TrueType outlines (RFC 8081). (en) / IANA:s mallar för font/ttf, font/otf och font/sfnt anger alla .ttf och .otf; .ttf-filer är oftast teckensnitt med Truetype-konturer (RFC 8081). (sv)* | Media Types (IANA protocol registry; media-types.xml and the per-type CSV tables, last updated 2026-09-24): Media Types registry (updated 2026-09-24), "font" table (font.csv), row "ttf" — Name "ttf" \| Template "font/ttf" \| Reference "[RFC 8081]"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/font/ttf — "File extension(s): Font file extensions used for TrueType / OFF / OpenType fonts: .ttf and .otf"; "Typically, the .ttf extension is only used for fonts containing TrueType outlines"; "Macintosh Universal Type Identifier code: "public.truetype-font""; "@font-face Format: truetype"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/font/otf — "File extension(s): Font file extensions used for OFF / OpenType fonts: .ttf and .otf"<br>IANA Media Types registry: the registration templates of the types on the cards (one page per type, e.g. https://www.iana.org/assignments/media-types/image/png): Registration template https://www.iana.org/assignments/media-types/font/sfnt — "File extension(s): Font file extensions used for OFF / OpenType fonts: .ttf and .otf"<br>Wikidata: file formats with their MIME type (P1163) and file extension (P1195): Q751800 (TrueType Font), query 10 (q6.rq) for P1163 and query 16 (q8.rq) for P1195 — P1163 (MIME type) statements: font/ttf [NormalRank] ; application/font-sfnt [DeprecatedRank]; P1195 (file extension) statements: dfont [NormalRank] ; tte [NormalRank] ; ttf [NormalRank]<br>The RFCs that register or define the media types on the cards: RFC 2046, 3003, 3302, 4180, 4337, 5334, 5545, 6350, 6713, 6922, 7303, 7763, 7903, 7946, 8081, 8118, 8259, 9239, 9512, 9559, 9639 and 9649 (plain-text versions from the RFC Editor): RFC 8081, registration of font/ttf, "File extension(s)" (line 517): https://www.rfc-editor.org/rfc/rfc8081.txt — "File extension(s): Font file extensions used for TrueType / OFF / OpenType fonts: .ttf and .otf"<br>Common media types (MDN Web Docs): "Common media types", table row `.ttf` — `.ttf` \| TrueType Font \| `font/ttf`<br>Svenska Akademiens ordböcker: Svenska Akademiens ordlista (SAOL) and Svensk ordbok (SO): SAOL and Svensk ordbok, search API, "teckensnitt" (query 9) — SAOL: one entry, "tecken\|snitt"; Svensk ordbok: one entry, "teckensnitt"<br>Wikidata checks: Q751800 P1163 = font/ttf, Q751800 P1195 = ttf |
