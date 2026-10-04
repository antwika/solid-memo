# Unix shell commands — provenance report

<!-- Generated from authored/unix-shell-commands.json by scripts/authored_decks.py. Do not edit: change the dossier and rebuild. -->

**Deck:** [`decks/unix-shell-commands.ttl`](../decks/unix-shell-commands.ttl) · **Cards:** 55 · **Licence:** [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) · **Compiled by:** Anton Wiklund · **Created:** 2026-10-04

55 everyday Unix and Linux shell commands: the front describes a task in plain words in English and Swedish, the back is the command that does it, with placeholders such as <file> or <dir>. Covers moving around the directory tree, files and directories, viewing and searching files (grep, find), permissions, processes and jobs, tar archives, pipes and redirection, disk usage and networking basics. POSIX commands and options are preferred; notes say where a command is GNU, XSI or Linux-specific. Every command was run with dash and bash on Linux (uutils and GNU coreutils) and checked against the POSIX.1-2024 specification and the GNU manuals.

## Sources

| Source | Creator | Licence | Role | Retrieved | Used for |
|---|---|---|---|---|---|
| [Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory](https://github.com/antwika/solid-memo/blob/main/packages/deck-library/authored/unix-shell-commands.md#queries) | Claude (AI, Anthropic), authoring agent, at Anton Wiklund's direction | [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) | content | 2026-10-04 | The command on every card: each command, with its placeholders filled in, was run in a throwaway directory, and the observed effect is the evidence that the command performs the task on the front. Also the behaviours named in the notes (ls -A, cd ~, rm with a write-protected file, cp -r, find with an unquoted pattern, chmod +x under umask 077, kill on a process that ignores SIGTERM, kill -s KILL, ps aux, tar -xf without -z, the order of 2>&1, &> in bash and dash, wc -l without a final newline, tee -a, scp without a colon, df -k/-P, du -sk, curl -o). |
| [The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>](https://pubs.opengroup.org/onlinepubs/9799919799/) | IEEE and The Open Group | All rights reserved | verification | 2026-10-04 | Confirming for every POSIX command that the utility and option do what the front says, and for the notes which options are POSIX, which are XSI (ps -e/-f, kill -9, df) and which are not in POSIX at all (grep -r, cp -r, df -h, du -h, tar; the utility page tar.html does not exist, pax does). No wording, example or selection was copied. |
| [GNU Coreutils manual (for version 9.12)](https://www.gnu.org/software/coreutils/manual/coreutils.html) | Free Software Foundation (David MacKenzie, Jim Meyering and others) | [GNU Free Documentation License 1.3](https://www.gnu.org/licenses/fdl-1.3.html) | verification | 2026-10-04 | Confirming the GNU options the deck uses or names in notes that POSIX lacks or words differently: df -h and du -h (--human-readable), du -s (--summarize), cp -r, ls -a/-A, tail -f (--follow), head -n (--lines), ln -s, mkdir -p (--parents). Nothing copied. |
| [GNU Grep manual (for version 3.12)](https://www.gnu.org/software/grep/manual/grep.html) | Free Software Foundation | [GNU Free Documentation License 1.3](https://www.gnu.org/licenses/fdl-1.3.html) | verification | 2026-10-04 | Confirming grep -r (--recursive), which POSIX does not specify. Nothing copied. |
| [GNU tar manual (for version 1.35.90, 11 June 2026)](https://www.gnu.org/software/tar/manual/tar.html) | Free Software Foundation | [GNU Free Documentation License 1.3](https://www.gnu.org/licenses/fdl-1.3.html) | verification | 2026-10-04 | Confirming tar's -c, -x, -t, -z and -f options, that the archive name must directly follow f in a cluster of short options, and that GNU tar recognizes a compressed archive by itself when reading it. Nothing copied. |
| [Bash Reference Manual (Edition 5.3, 18 May 2025)](https://www.gnu.org/software/bash/manual/bash.html) | Free Software Foundation (Chet Ramey and Brian Fox) | [GNU Free Documentation License 1.3](https://www.gnu.org/licenses/fdl-1.3.html) | verification | 2026-10-04 | Confirming bash's &>word redirection (named in a note as a bash extension), cd without an argument, the tilde, and the jobs and fg built-ins. Nothing copied. |
| [curl man page (curl.se/docs/manpage.html, describing curl 8.23.0)](https://curl.se/docs/manpage.html) | Daniel Stenberg and the curl contributors | Unknown | verification | 2026-10-04 | Confirming curl -O (save under the remote file name, in the current directory), -o and curl's default of writing to standard output. Nothing copied. |
| [OpenSSH manual pages ssh(1) and scp(1) (man.openbsd.org, OpenBSD-current)](https://man.openbsd.org/ssh.1) | The OpenBSD and OpenSSH projects | Unknown | verification | 2026-10-04 | Confirming ssh's [user@]hostname destination and scp's [user@]host:[path] form for a remote file. Nothing copied. |
| [ping(8) manual page of iputils (man7.org, from the iputils repository of 2026-07-16)](https://man7.org/linux/man-pages/man8/ping.8.html) | The iputils project | Unknown | verification | 2026-10-04 | Confirming ping -c count (stop after sending count echo requests). Nothing copied. |
| [Swedish translations (sv.po) of GNU coreutils, grep, tar, findutils and bash, latest versions at the Translation Project](https://translationproject.org/latest/coreutils/sv.po) | Göran Uddeborg, Anders Jonsson, Daniel Nylander and other Swedish translators; Free Software Foundation | Unknown | verification | 2026-10-04 | Checking that the Swedish technical terms on the fronts are the ones the GNU tools use in Swedish: aktuell katalog, föräldrakatalog, hemkatalog, arbetskatalog, rättigheter, ägare, grupp, symbolisk länk, långt listningsformat, nyast först, mönster, gemener och versaler, radnummer, arkiv, bakgrunden / förgrunden, jobb, process-id, filsystem, läsbart format. No sentences were copied; the fronts are the authoring agent's own wording. The translations' 'standard fel' for standard error was replaced in quality-control round 1 by 'standard error (stderr)', the term of the Swedish Wikipedia article. |
| [Standard error and Kommandotolk (Swedish Wikipedia)](https://sv.wikipedia.org/wiki/Standard_error) | Wikipedia contributors | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | verification | 2026-10-04 | Quality-control round 1: check of the Swedish terms 'standard error (stderr)' (article Standard error) and 'rör (pipes)' and 'kommandotolk' (article Kommandotolk). Single terms only; nothing copied. |

**Content** sources supplied information that is in the cards. **Verification** sources were only consulted to confirm facts: nothing was copied from them.

### Licence evidence

- **Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory** — Written for this deck: the test scripts and their recorded output are reproduced verbatim in the Queries section of this report (the URL above). The scripts and the authoring agent's annotations are dedicated to the public domain under CC0 1.0. The program messages quoted in the recorded output (error messages of ls, rm, cp, mkdir, chown, the text of the curl licence file and of the ls manual page that the tests printed, and so on) belong to those programs and are reproduced only as a factual record of what the programs printed; the deck itself contains none of them. Running a program and recording which command lines it accepts and what they do copies none of its code or documentation.
- **The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>** — Footer of every page, e.g. https://pubs.opengroup.org/onlinepubs/9799919799/utilities/ls.html (fetched 2026-10-04): "Copyright © 2001-2024 The IEEE and The Open Group, All Rights Reserved". Verification only.
- **GNU Coreutils manual (for version 9.12)** — Title page of the manual (fetched 2026-10-04): "Copyright © 1994–2026 Free Software Foundation, Inc. Permission is granted to copy, distribute and/or modify this document under the terms of the GNU Free Documentation License, Version 1.3 or any later version published by the Free Software Foundation; with no Invariant Sections, with no Front-Cover Texts, and with no Back-Cover Texts." GFDL documentation is verification only under the library's policy.
- **GNU Grep manual (for version 3.12)** — Title page of the manual (fetched 2026-10-04): "Copyright © 1999–2002, 2005, 2008–2025 Free Software Foundation, Inc. Permission is granted to copy, distribute and/or modify this document under the terms of the GNU Free Documentation License, Version 1.3 or any later version published by the Free Software Foundation; with no Invariant Sections, with no Front-Cover Texts, and with no Back-Cover Texts." Verification only.
- **GNU tar manual (for version 1.35.90, 11 June 2026)** — Title page of the manual (fetched 2026-10-04): "Copyright © 1992, 1994–1997, 1999–2001, 2003–2017, 2021–2026 Free Software Foundation, Inc. Permission is granted to copy, distribute and/or modify this document under the terms of the GNU Free Documentation License, Version 1.3 or any later version published by the Free Software Foundation; with the Invariant Sections being “GNU General Public License”, with the Front-Cover Texts being “A GNU Manual”, ..." Verification only.
- **Bash Reference Manual (Edition 5.3, 18 May 2025)** — Notice at the head of the manual's HTML source (fetched 2026-10-04): "Copyright © 1988-2025 Free Software Foundation, Inc. Permission is granted to copy, distribute and/or modify this document under the terms of the GNU Free Documentation License, Version 1.3 or any later version published by the Free Software Foundation; with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts." Verification only.
- **curl man page (curl.se/docs/manpage.html, describing curl 8.23.0)** — Licence: the curl licence, an MIT/X-style licence, recorded as "unknown" only because the builder has no licence id for it. https://curl.se/docs/copyright.html (fetched 2026-10-04): "Copyright (c) 1996 - 2026, Daniel Stenberg, daniel@haxx.se, and many contributors, see the THANKS file. All rights reserved. Permission to use, copy, modify, and distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies." Because the licence requires its notice, the page is used for verification only: nothing is copied from it.
- **OpenSSH manual pages ssh(1) and scp(1) (man.openbsd.org, OpenBSD-current)** — The manual pages carry no licence on the web page; OpenSSH's licence file https://raw.githubusercontent.com/openssh/openssh-portable/master/LICENCE (fetched 2026-10-04) gives BSD-style terms for its parts, beginning with Tatu Ylonen's: "As far as I am concerned, the code I have written for this software can be used freely for any purpose. Any derived versions of this software must be clearly marked as such". Recorded as "unknown" because the builder has no licence id for these terms; verification only, nothing copied. The scp page is https://man.openbsd.org/scp.1.
- **ping(8) manual page of iputils (man7.org, from the iputils repository of 2026-07-16)** — The page states no licence; iputils' licence file https://raw.githubusercontent.com/iputils/iputils/master/LICENSE (fetched 2026-10-04) says "ping: BSD-3-Clause". Recorded as "unknown" because the builder has no id for BSD-3-Clause; verification only, nothing copied.
- **Swedish translations (sv.po) of GNU coreutils, grep, tar, findutils and bash, latest versions at the Translation Project** — Header of each file, e.g. https://translationproject.org/latest/coreutils/sv.po (fetched 2026-10-04): "This file is distributed under the same license as the coreutils package." (likewise for grep, tar, findutils and bash; the others are at https://translationproject.org/latest/<package>/sv.po). The packages are under the GNU GPL, for which the builder has an id only for version 2; recorded as "unknown", verification only.
- **Standard error and Kommandotolk (Swedish Wikipedia)** — Footer of https://sv.wikipedia.org/wiki/Standard_error (fetched 2026-10-04): "Wikipedias text är tillgänglig under licensen Creative Commons Erkännande-dela-lika 4.0 Unported."

## Licensing

The deck is CC0 1.0. Its only content source is the authoring agent's own test runs of the commands on Ubuntu 26.04, whose scripts and output are reproduced in this report; the scripts and the agent's annotations are dedicated to the public domain with the deck, while the program messages quoted in the output remain their programs' and are reproduced only as a factual record, none of them in the deck. Which command line performs a task is a fact about a program's behaviour and interface, and observing it copies nothing from the programs' code or documentation. The fronts, notes and the selection of tasks are the authoring agent's own wording and choice. The POSIX.1-2024 specification (all rights reserved by the IEEE and The Open Group), the GNU coreutils, grep and tar manuals and the Bash Reference Manual (GFDL 1.3), the curl man page (curl licence, notice required), the OpenSSH and iputils manual pages (BSD-style terms) and the GNU tools' Swedish translations (GPL) were all used as verification sources only: they confirmed that each command and option does what the front says, which options are POSIX, XSI or GNU, and which Swedish technical terms the tools use, and no sentence, example or list was copied from them (single technical terms such as 'aktuell katalog' or 'föräldrakatalog' are ordinary Swedish vocabulary, not protected expression). Command names, option letters and the shell's operators are the programs' interface and are needed to state the fact at all. No cheat sheet or third-party tutorial was consulted. No source's licence therefore requires attribution or share-alike, though every source is credited in the deck and this report.

## Method

1. Who did the work: the research, drafting and cross-checking were done by AI agents (Claude, Anthropic) at Anton Wiklund's direction, with machine checks (test runs of every command in a throwaway directory, the builder's dossier checks, and the app's SHACL and DCAT-AP validators). Round 0 of the quality-control log is the authoring agent's own checks; reviews by independent AI reviewers are recorded as further rounds when they have taken place. No human subject expert has reviewed the cards yet.
2. Candidate tasks: the authoring agent drew up its own working list of roughly 70 everyday shell tasks in the areas the library editor asked for (moving between directories, files and directories, viewing files, searching with grep and find, permissions, processes, tar archives, pipes and redirection, disk usage, networking basics), then cut it to 55. The working list itself was not saved; what was left out is recorded by kind under Selection, together with the four tasks that were tested and then dropped. The list was not taken from any published list, cheat sheet or manual.
3. Portability: for each task the deck uses the POSIX.1-2024 utility and option where one exists (checked on the utility's page of the specification, pubs.opengroup.org/onlinepubs/9799919799/utilities/<name>.html, and chapter 2 of the Shell and Utilities volume for redirection, pipelines, background lists and the tilde). Where the usual answer is not POSIX the card keeps the usual answer and its note says so: grep -r (GNU), df -h and du -sh (-h is GNU; POSIX has -k), tar (not in POSIX.1-2024, which has pax; GNU tar options), ping (iputils), curl and ssh/scp (not POSIX utilities). Where the answer is POSIX but in the XSI option group the note says that too (ps -ef, kill -9, with the non-XSI kill -s KILL). Synonyms are named in notes rather than given cards of their own (ls -A, cd ~, rm -R, cp -r, kill -s KILL, tar -xf, bash's &>).
4. Notation on the back: the exact command as typed, text in no language (tagged zxx), with placeholders in angle brackets for what the user supplies (<file>, <dir>, <path>, <source>, <target>, <old>, <new>, <link>, <pattern>, <command>, <command1>, <command2>, <user>, <host>, <pid>, <archive>, <url>, <file1>, <file2>), as in the git-commands deck. Placeholders are English words because they stand for what is typed; the fronts explain them in both languages. Where the task names a concrete value (20 lines, 4 echo requests, .txt, the octal mode 644) the back uses that value. The published Markdown report shows these placeholders as typed only when read as raw Markdown or in a viewer that keeps unknown tags: GitHub's renderer drops text such as <file> as an unknown HTML tag. The dossier (JSON) and the deck (Turtle) hold them intact.
5. Test runs (the content source): the script run-shell-commands.sh (reproduced verbatim under Queries) creates a fresh work directory inside the scratch directory, sets HOME to a directory inside it, TZ=UTC, LC_ALL=C.UTF-8 and umask 022, and for every card runs the command with its placeholders filled in followed by commands that show its effect (pwd, ls, find, cat, wc, ls -l, ps, wait status, and so on); a final section 'CARD notes-checks' runs the behaviours named in notes. It was run on 2026-10-04 on Ubuntu 26.04 LTS (Linux 6.18 under WSL2) twice by sc-run.py: run 1 with dash (the system's /bin/sh) and the default PATH, where most coreutils are uutils coreutils 0.8.0 (Ubuntu 26.04's default) and rm, cp, mv and df are GNU coreutils 9.7; run 2 with bash 5.3.9 and a directory of links to the GNU coreutils 9.7 binaries (/usr/bin/gnu*) first in PATH, so that every coreutils command was GNU's. Other programs: GNU grep 3.12, GNU findutils 4.10.0, GNU tar 1.35, gzip 1.14, GNU diffutils 3.12, procps-ng 4.0.4 (ps, kill), iputils ping 20250605, curl 8.18.0, OpenSSH 10.2p1. The versions were recorded with env.py and env2.py and with dpkg-query. On Ubuntu 26.04 the package named 'coreutils' (9.5-1ubuntu2+0.0.0~ubuntu25) is a transitional package that installs uutils (rust-coreutils 0.8.0); the GNU binaries (/usr/bin/gnu*) come from the package gnu-coreutils 9.7-3ubuntu2.1. The two outputs differ only in the work-directory path, process IDs, ping times, process counts and the wording of some error messages (uutils versus GNU); every command had the same effect in both. Both full outputs are reproduced under Queries, and every card's evidence cites its section ("CARD <id>").
6. Job control: jobs and fg need an interactive shell with a terminal (in the non-interactive test script dash answered "can't access tty; job control turned off" and fg failed, see Quality control), so jobs-pty.py runs dash -i and bash -i in a pseudo-terminal and types sleep 3 &, jobs, fg and jobs into each; its output is under Queries.
7. Networking: ping -c 4 was run against the loopback address 127.0.0.1. curl -O and curl -o downloaded https://raw.githubusercontent.com/curl/curl/master/COPYING (gnu.org did not answer reliably from the research environment). No SSH server was available, so ssh and scp were verified as far as possible without one: ssh -G alice@example.org (prints the configuration ssh would use: user alice, hostname example.org, port 22, without connecting), and ssh and scp with -v against github.com as user git, with the user's own SSH configuration, keys and known_hosts kept out (-F /dev/null, BatchMode, PubkeyAuthentication=no, a known_hosts file in the scratch directory); the debug output shows 'Authenticating to github.com:22 as 'git'' and the server's 'Permission denied (publickey)', i.e. the command lines are parsed as a login as <user> on <host>, and for scp that the remote side is reached over SSH. A completed login and file transfer were not observed.
8. Cross-check (verification sources): for every card the matching page of POSIX.1-2024 (fetched with fetch_posix.py and converted to text) or, for commands and options outside POSIX, the GNU coreutils, grep or tar manual, the Bash Reference Manual, the curl man page, the OpenSSH ssh(1) and scp(1) pages or the iputils ping(8) page (fetched with fetch_more.py) was read at the option used; the passages were printed with posix-opts.py, gnu-opts.py, more-opts.py and px.py (all reproduced under Queries with the command lines used), and each card's evidence records what the source says. Observed behaviour and documented behaviour agreed for every card. The licence statements were printed with lic.py.
9. Swedish text: the Swedish fronts and notes were written by the authoring agent in its own words, using the technical terms of the GNU tools' own Swedish translations (coreutils, grep, tar, findutils and bash sv.po from the Translation Project, searched with po.py for the English message strings; e.g. 'current directory' -> 'aktuell katalog', 'make parent directories as needed' -> 'skapa föräldrakataloger vid behov', 'use a long listing format' -> 'använd långt listningsformat', 'sort by time, newest first' -> 'sortera efter tid, nyast först', 'ignore case distinctions' -> 'skilj ej på gemener och versaler', 'Move job to the foreground' -> 'Flytta ett jobb till förgrunden', 'invalid process id' -> 'ogiltigt process-id', standard error -> 'standard fel', which quality-control round 2 (the language review) replaced by 'standard error (stderr)' after the Swedish Wikipedia article Standard error). Commands and placeholders are kept as typed. Swedish conventions: lower-case common nouns, 'Ctrl' and program names as written.
10. Ambiguity checks: each front states the scope (current directory, recursively, every depth, the whole file), the count (20 lines, 4 requests), whether files are replaced or appended to, and which way a copy goes, so that one command answers it; where an exact synonym exists it is named in the note. Pairs that look alike were made distinct on purpose: ls -a versus ls -l versus ls -lt; mkdir versus mkdir -p; rmdir versus rm -r; rm versus rm -r; cp versus cp -R; grep, -i, -v, -n, -r; > versus >> versus 2> versus > <file> 2>&1; kill versus kill -9; tar -czf versus -xzf. The study direction is front to back only (many backs are short commands that a reverse card could not phrase uniquely), so the builder's uniqueness check applies to the fronts, and every front is unique in both languages.
11. Everything was then written into this dossier, built with the builder (scripts/authored_decks.py build unix-shell-commands) and validated with the app's SHACL and DCAT-AP validators (scripts/validate_sources.ts unix-shell-commands). There are no Wikidata checks: no card's fact or wording is a Wikidata statement or label.

## Selection

55 tasks that come up in everyday work in a Unix or Linux shell: moving around (pwd, cd to home, to the parent, back to the previous directory), listing (ls -a, -l, -lt), files and directories (mkdir, mkdir -p, rmdir, rm, rm -r, cp, cp -R, mv, touch, ln -s), viewing (cat, head, tail, tail -f, wc -l, diff, sort), searching (grep and its -i, -v, -n and -r options; find by name and by type), permissions and ownership (chmod +x, chmod 644, chown), processes and jobs (ps -ef, kill, kill -9, &, jobs, fg), tar archives (create and extract gzip-compressed), pipes and redirection (>, >>, 2>, > file 2>&1, |, tee), disk usage (df -h, du -sh), networking (ping -c, curl -O, ssh, scp) and man. Left out: interactive programs whose use is not a command line (editors, less and more, top); commands without a single canonical answer for the task (downloading a file without naming the tool, where curl and wget both answer; finding where a command lives, where command -v, type and which compete; paging a file, where less and more compete); options whose exact behaviour differs widely between implementations (find -size with M suffixes, sed -i, ls --color); shell-specific features beyond what notes mention (history, aliases, brace expansion); administration commands that need root (useradd, mount, systemctl) and package managers, which differ by distribution. Four tasks were tested in the first draft but dropped to keep the deck near 50 cards: grep -c, chmod go-w, chown <user>:<group> and tar -tzf. Each remaining card is atomic: one command, one option set.

## Queries

**Versions of the shell and tools used (env.py; output re-run when the dossier was assembled)** (Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory)

```
import subprocess, shutil
cmds = [["bash", "--version"], ["ls", "--version"], ["grep", "-V"], ["find", "--version"], ["tar", "--version"],
        ["ps", "--version"], ["gzip", "--version"], ["du", "--version"], ["df", "--version"], ["curl", "--version"],
        ["ssh", "-V"], ["ping", "-V"], ["uname", "-a"], ["cat", "/etc/os-release"], ["sh", "-c", "echo $0"]]
for c in cmds:
    try:
        r = subprocess.run(c, capture_output=True, text=True)
        print("$", " ".join(c)); print((r.stdout + r.stderr).strip().splitlines()[:2] if c[0] != "cat" else r.stdout[:200])
    except Exception as e:
        print("$", " ".join(c), "->", e)
for t in ["less", "more", "dash", "pkill", "pgrep", "top", "scp", "sshd", "wget", "pax", "nohup", "man", "tee", "file", "busybox", "posh"]:
    print(t, shutil.which(t))

# output
$ bash --version
['GNU bash, version 5.3.9(1)-release (x86_64-pc-linux-gnu)', 'Copyright (C) 2025 Free Software Foundation, Inc.']
$ ls --version
['ls (uutils coreutils) 0.8.0']
$ grep -V
['grep (GNU grep) 3.12', 'Copyright (C) 2025 Free Software Foundation, Inc.']
$ find --version
['find (GNU findutils) 4.10.0', 'Copyright (C) 2024 Free Software Foundation, Inc.']
$ tar --version
['tar (GNU tar) 1.35', 'Copyright (C) 2023 Free Software Foundation, Inc.']
$ ps --version
['ps from procps-ng 4.0.4']
$ gzip --version
['gzip 1.14', 'Copyright (C) 2025 Free Software Foundation, Inc.']
$ du --version
['du (uutils coreutils) 0.8.0']
$ df --version
['df (GNU coreutils) 9.7', 'Packaged by Ubuntu (9.7-3ubuntu2.1)']
$ curl --version
['curl 8.18.0 (x86_64-pc-linux-gnu) libcurl/8.18.0 OpenSSL/3.5.5 zlib/1.3.1 brotli/1.2.0 zstd/1.5.7 libidn2/2.3.8 libpsl/0.21.2 libssh2/1.11.1 nghttp2/1.68.0 librtmp/2.3 mit-krb5/1.22.1 OpenLDAP/2.6.10', 'Release-Date: 2026-01-07, security patched: 8.18.0-1ubuntu2.7']
$ ssh -V
['OpenSSH_10.2p1 Ubuntu-2ubuntu3.6, OpenSSL 3.5.5 27 Jan 2026']
$ ping -V
['ping from iputils 20250605', 'libcap: yes, IDN: yes, NLS: no, error.h: yes, getrandom(): yes, __fpending(): yes']
$ uname -a
['Linux antwika 6.18.40.1-microsoft-standard-WSL2 #1 SMP PREEMPT_DYNAMIC Fri Jul 31 22:12:15 UTC 2026 x86_64 GNU/Linux']
$ cat /etc/os-release
PRETTY_NAME="Ubuntu 26.04 LTS"
NAME="Ubuntu"
VERSION_ID="26.04"
VERSION="26.04 (Resolute Raccoon)"
VERSION_CODENAME=resolute
ID=ubuntu
ID_LIKE=debian
HOME_URL="https://www.ubuntu.com/"
SUPPORT_URL="ht
$ sh -c echo $0
['sh']
less /usr/bin/less
more /usr/bin/more
dash /usr/bin/dash
pkill /usr/bin/pkill
pgrep /usr/bin/pgrep
top /usr/bin/top
scp /usr/bin/scp
sshd None
wget /usr/bin/wget
pax None
nohup /usr/bin/nohup
man /usr/bin/man
tee /usr/bin/tee
file /usr/bin/file
busybox None
posh None
```

**Which implementation each coreutils command is on Ubuntu 26.04 (env2.py; output re-run when the dossier was assembled)** (Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory)

```
import subprocess, shutil, glob, os
for t in ["pwd", "ls", "mkdir", "rmdir", "rm", "cp", "mv", "touch", "ln", "cat", "head", "tail", "wc", "sort", "uniq", "diff",
          "chmod", "chown", "chgrp", "du", "df", "tee", "kill", "ps", "env", "date"]:
    p = shutil.which(t)
    real = os.path.realpath(p) if p else None
    try:
        v = subprocess.run([t, "--version"], capture_output=True, text=True).stdout.splitlines()[:1]
    except Exception as e:
        v = str(e)
    print(t, p, real, v)
print(sorted(glob.glob("/usr/bin/gnu*"))[:60])
print(sorted(glob.glob("/usr/lib/cargo/bin/coreutils/*"))[:5])

# output
pwd /usr/bin/pwd /usr/lib/cargo/bin/coreutils/pwd ['pwd (uutils coreutils) 0.8.0']
ls /usr/bin/ls /usr/lib/cargo/bin/coreutils/ls ['ls (uutils coreutils) 0.8.0']
mkdir /usr/bin/mkdir /usr/lib/cargo/bin/coreutils/mkdir ['mkdir (uutils coreutils) 0.8.0']
rmdir /usr/bin/rmdir /usr/lib/cargo/bin/coreutils/rmdir ['rmdir (uutils coreutils) 0.8.0']
rm /usr/bin/rm /usr/bin/gnurm ['rm (GNU coreutils) 9.7']
cp /usr/bin/cp /usr/bin/gnucp ['cp (GNU coreutils) 9.7']
mv /usr/bin/mv /usr/bin/gnumv ['mv (GNU coreutils) 9.7']
touch /usr/bin/touch /usr/lib/cargo/bin/coreutils/touch ['touch (uutils coreutils) 0.8.0']
ln /usr/bin/ln /usr/lib/cargo/bin/coreutils/ln ['ln (uutils coreutils) 0.8.0']
cat /usr/bin/cat /usr/lib/cargo/bin/coreutils/cat ['cat (uutils coreutils) 0.8.0']
head /usr/bin/head /usr/lib/cargo/bin/coreutils/head ['head (uutils coreutils) 0.8.0']
tail /usr/bin/tail /usr/lib/cargo/bin/coreutils/tail ['tail (uutils coreutils) 0.8.0']
wc /usr/bin/wc /usr/lib/cargo/bin/coreutils/wc ['wc (uutils coreutils) 0.8.0']
sort /usr/bin/sort /usr/lib/cargo/bin/coreutils/sort ['sort (uutils coreutils) 0.8.0']
uniq /usr/bin/uniq /usr/lib/cargo/bin/coreutils/uniq ['uniq (uutils coreutils) 0.8.0']
diff /usr/bin/diff /usr/bin/diff ['diff (GNU diffutils) 3.12']
chmod /usr/bin/chmod /usr/lib/cargo/bin/coreutils/chmod ['chmod (uutils coreutils) 0.8.0']
chown /usr/bin/chown /usr/lib/cargo/bin/coreutils/chown ['chown (uutils coreutils) 0.8.0']
chgrp /usr/bin/chgrp /usr/lib/cargo/bin/coreutils/chgrp ['chgrp (uutils coreutils) 0.8.0']
du /usr/bin/du /usr/lib/cargo/bin/coreutils/du ['du (uutils coreutils) 0.8.0']
df /usr/bin/df /usr/bin/gnudf ['df (GNU coreutils) 9.7']
tee /usr/bin/tee /usr/lib/cargo/bin/coreutils/tee ['tee (uutils coreutils) 0.8.0']
kill /usr/bin/kill /usr/bin/kill ['kill from procps-ng 4.0.4']
ps /usr/bin/ps /usr/bin/ps ['ps from procps-ng 4.0.4']
env /usr/bin/env /usr/lib/cargo/bin/coreutils/env ['env (uutils coreutils) 0.8.0']
date /usr/bin/date /usr/lib/cargo/bin/coreutils/date ['date (uutils coreutils) 0.8.0']
['/usr/bin/gnu[', '/usr/bin/gnuarch', '/usr/bin/gnub2sum', '/usr/bin/gnubase32', '/usr/bin/gnubase64', '/usr/bin/gnubasename', '/usr/bin/gnubasenc', '/usr/bin/gnucat', '/usr/bin/gnuchcon', '/usr/bin/gnuchgrp', '/usr/bin/gnuchmod', '/usr/bin/gnuchown', '/usr/bin/gnucksum', '/usr/bin/gnucomm', '/usr/bin/gnucp', '/usr/bin/gnucsplit', '/usr/bin/gnucut', '/usr/bin/gnudate', '/usr/bin/gnudd', '/usr/bin/gnudf', '/usr/bin/gnudir', '/usr/bin/gnudircolors', '/usr/bin/gnudirname', '/usr/bin/gnudu', '/usr/bin/gnuecho', '/usr/bin/gnuenv', '/usr/bin/gnuexpand', '/usr/bin/gnuexpr', '/usr/bin/gnufactor', '/usr/bin/gnufalse', '/usr/bin/gnufmt', '/usr/bin/gnufold', '/usr/bin/gnugroups', '/usr/bin/gnuhead', '/usr/bin/gnuhostid', '/usr/bin/gnuid', '/usr/bin/gnuinstall', '/usr/bin/gnujoin', '/usr/bin/gnulink', '/usr/bin/gnuln', '/usr/bin/gnulogname', '/usr/bin/gnuls', '/usr/bin/gnumd5sum', '/usr/bin/gnumkdir', '/usr/bin/gnumkfifo', '/usr/bin/gnumknod', '/usr/bin/gnumktemp', '/usr/bin/gnumv', '/usr/bin/gnunice', '/usr/bin/gnunl', '/usr/bin/gnunohup', '/usr/bin/gnunproc', '/usr/bin/gnunumfmt', '/usr/bin/gnuod', '/usr/bin/gnupaste', '/usr/bin/gnupathchk', '/usr/bin/gnupinky', '/usr/bin/gnupr', '/usr/bin/gnuprintenv', '/usr/bin/gnuprintf']
['/usr/lib/cargo/bin/coreutils/[', '/usr/lib/cargo/bin/coreutils/arch', '/usr/lib/cargo/bin/coreutils/b2sum', '/usr/lib/cargo/bin/coreutils/base32', '/usr/lib/cargo/bin/coreutils/base64']
```

**Installed package versions** (Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory)

```
dpkg-query -W dash bash coreutils coreutils-from-uutils rust-coreutils procps iputils-ping openssh-client diffutils

# output
bash	5.3-2ubuntu1
coreutils	9.5-1ubuntu2+0.0.0~ubuntu25
coreutils-from-uutils	0.0.0~ubuntu25
dash	0.5.12-12ubuntu3
diffutils	1:3.12-1ubuntu0.1
iputils-ping	3:20250605-1ubuntu1
openssh-client	1:10.2p1-2ubuntu3.6
procps	2:4.0.4-9ubuntu1
rust-coreutils	0.8.0-0ubuntu3
```

**Test script run-shell-commands.sh (final version), run by sc-run.py with dash and with bash** (Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory)

```
# Exercise every command of the unix-shell-commands deck in a throwaway directory.
# POSIX sh syntax: run with dash (default PATH) and with bash (GNU coreutils first in PATH).
# Usage: <shell> run-shell-commands.sh <work-dir>
set -u
W=$1
rm -rf "$W"; mkdir -p "$W"; cd "$W" || exit 1
export HOME="$W/home" TZ=UTC LC_ALL=C.UTF-8 MANPAGER=cat MANWIDTH=80
mkdir "$HOME"
umask 022
card() { printf '\n########## CARD %s\n' "$1"; }
run() { printf '$ %s\n' "$*"; eval "$*"; printf '[exit %s]\n' "$?"; }

card versions
run 'ls --version | head -n 1; df --version | head -n 1; grep --version | head -n 1; find --version | head -n 1; tar --version | head -n 1; ps --version; command -v ls cp df'

card pwd
mkdir -p "$W/nav/sub/deeper"
run 'cd "$W/nav/sub"'
run 'pwd'

card cd-home
run 'cd /'
run 'cd'
run 'pwd'
run 'cd /; cd ~; pwd'

card cd-parent
run 'cd "$W/nav/sub/deeper"'
run 'cd ..'
run 'pwd'

card cd-previous
run 'cd "$W/nav"; cd "$W/nav/sub/deeper"'
run 'cd -'
run 'pwd'
cd "$W"

card ls-all
mkdir lsdemo; cd lsdemo
printf 'x\n' > a.txt; printf 'yy\n' > b.txt; printf 'z\n' > .hidden
touch -t 202601010000 a.txt; touch -t 202603010000 b.txt; touch -t 202602010000 .hidden
run 'ls'
run 'ls -a'
run 'ls -A'

card ls-long
run 'ls -l | sed "s/ [0-9]* [a-z]* [a-z]* / N user group /"'

card ls-time
run 'ls -lt | sed "s/ [0-9]* [a-z]* [a-z]* / N user group /"'
cd "$W"

card mkdir
run 'mkdir reports'
run 'ls -ld reports | cut -c1-10'

card mkdir-parents
run 'mkdir projects/2026/notes'
run 'mkdir -p projects/2026/notes'
run 'find projects'
run 'mkdir -p projects/2026/notes'

card rmdir
mkdir emptydir fulldir; touch fulldir/f
run 'rmdir emptydir'
run 'ls -d emptydir'
run 'rmdir fulldir'

card rm
printf 'old\n' > junk.txt
run 'rm junk.txt'
run 'ls junk.txt'
run 'rm fulldir'

card rm-recursive
mkdir -p tree/a/b; touch tree/x tree/a/y tree/a/b/z
run 'rm -r tree'
run 'ls tree'
mkdir -p tree2/a; touch tree2/a/y; chmod a-w tree2/a/y
run 'rm -r tree2 </dev/null'
run 'ls tree2'

card cp
printf 'original\n' > notes.txt
run 'cp notes.txt notes-copy.txt'
run 'cat notes-copy.txt'
run 'cp projects projects-copy'

card cp-recursive
touch projects/2026/notes/todo.txt
run 'cp -R projects projects-copy'
run 'find projects-copy'
run 'cp -r projects projects-copy2 && find projects-copy2 | wc -l'

card mv-rename
printf 'draft\n' > draft.txt
run 'mv draft.txt final.txt'
run 'ls draft.txt final.txt'

card touch
run 'touch empty.txt'
run 'wc -c empty.txt'
touch -t 200001010000 final.txt
run 'ls -l final.txt | cut -d" " -f6-'
run 'touch final.txt'
run 'ls -l final.txt | awk "{print \$6, \$7, \$8, \$9}" | sed "s/[0-9][0-9]:[0-9][0-9]/HH:MM/"; cat final.txt'

card ln-symbolic
printf 'target text\n' > target.txt
run 'ln -s target.txt link.txt'
run 'ls -l link.txt | sed "s/.* link.txt/link.txt/"'
run 'cat link.txt'

card cat
printf 'line one\nline two\n' > short.txt
run 'cat short.txt'

card head-20
i=1; while [ $i -le 30 ]; do echo "line $i"; i=$((i + 1)); done > thirty.txt
run 'head -n 20 thirty.txt | tr "\n" " "; echo'
run 'head thirty.txt | wc -l'

card tail-20
run 'tail -n 20 thirty.txt | tr "\n" " "; echo'
run 'tail thirty.txt | wc -l'

card tail-follow
printf 'start\n' > app.log
tail -f app.log > follow.out 2>&1 & tp=$!
sleep 1; printf 'new entry 1\n' >> app.log; printf 'new entry 2\n' >> app.log; sleep 2
kill $tp; wait $tp 2>/dev/null
echo '$ tail -f app.log   (in the background; two lines appended after 1 s; stopped after 2 s more)'
run 'cat follow.out'

card wc-lines
run 'wc -l thirty.txt'

card diff
printf 'apples\nbread\nmilk\n' > list1.txt; printf 'apples\nbutter\nmilk\n' > list2.txt
run 'diff list1.txt list2.txt'

card sort
printf 'pear\napple\ncherry\nbanana\n' > fruit.txt
run 'sort fruit.txt'

card grep
printf 'Apple pie\napple juice\nbanana bread\nCherry jam\n' > food.txt
run 'grep apple food.txt'

card grep-i
run 'grep -i apple food.txt'

card grep-v
run 'grep -v apple food.txt'

card grep-n
run 'grep -n apple food.txt'

card grep-r
mkdir -p src/lib; printf 'TODO: fix\n' > src/main.c; printf 'done\n' > src/util.c; printf 'x TODO\n' > src/lib/deep.c
run 'grep -r TODO src | sort'
run 'grep TODO src'
run 'find src -type f -exec grep TODO {} + | sort'

card find-name
mkdir -p docs/sub/deep; touch docs/a.txt docs/sub/b.txt docs/sub/c.md docs/sub/deep/d.txt
cd docs
run "find . -name '*.txt' | sort"
run 'find . -name *.txt'

card find-dirs
run 'find . -type d | sort'
cd "$W"

card chmod-x
printf '#!/bin/sh\necho hello from script\n' > hello.sh
run 'ls -l hello.sh | cut -c1-10'
run './hello.sh'
run 'chmod +x hello.sh'
run 'ls -l hello.sh | cut -c1-10'
run './hello.sh'
printf '#!/bin/sh\necho hi\n' > h2.sh; printf '#!/bin/sh\necho hi\n' > h3.sh
run '(umask 077; chmod +x h2.sh; chmod a+x h3.sh); ls -l h2.sh h3.sh | cut -c1-10'

card chmod-644
printf 'data\n' > perm.txt; chmod 600 perm.txt
run 'chmod 644 perm.txt'
run 'ls -l perm.txt | cut -c1-10'

card chown
printf 'mine\n' > owned.txt
run 'chown "$(id -un)" owned.txt'
run 'ls -n owned.txt | awk "{print \$3}"; id -u'
run 'chown root owned.txt'

card ps-ef
sleep 30 & sp=$!
run 'ps -ef | head -n 1'
run 'ps -ef | awk -v p=$sp "\$2 == p {print \$2, \$8, \$9}"'
run 'ps -e | wc -l; ps -ef | wc -l'
run 'ps aux | head -n 1'
kill $sp; wait $sp 2>/dev/null

card kill
sleep 300 & pid=$!
run 'kill $pid'
run 'wait $pid'

card kill-9
sh -c 'trap "" TERM; while :; do sleep 1; done' & pid=$!
sleep 1
run 'kill $pid; sleep 1; kill -0 $pid && echo "still running: TERM ignored"'
run 'kill -9 $pid'
run 'wait $pid'
sh -c 'trap "" TERM; while :; do sleep 1; done' & pid=$!
sleep 1
run 'kill -s KILL $pid'
run 'wait $pid'

card background
run 'sleep 2 & echo "prompt is back; background job PID $!"'
run 'wait'

card jobs
echo '(tested interactively in a pseudo-terminal: see jobs-pty.py and its output)'

card fg
echo '(tested interactively in a pseudo-terminal: see jobs-pty.py and its output)'

card tar-create
mkdir -p project/src; printf 'readme\n' > project/README; printf 'code\n' > project/src/main.c
run 'tar -czf project.tar.gz project'
run 'gzip -t project.tar.gz && echo gzip OK'
run 'tar -tzf project.tar.gz | sort'

card tar-extract
mkdir unpack unpack2
run '(cd unpack && tar -xzf ../project.tar.gz && find . | sort)'
run '(cd unpack2 && tar -xf ../project.tar.gz && find . | sort)'

card redirect-out
run 'echo first > out.txt; echo second > out.txt; cat out.txt'

card redirect-append
run 'echo first > log.txt; echo second >> log.txt; cat log.txt'

card redirect-stderr
touch exists.txt
run 'ls exists.txt missing.txt 2> errors.txt'
run 'cat errors.txt'

card redirect-both
run 'ls exists.txt missing.txt > both.txt 2>&1'
run 'cat both.txt'
run 'ls exists.txt missing.txt 2>&1 > wrong-order.txt'
run 'cat wrong-order.txt'
run 'bash -c "ls exists.txt missing.txt &> amp-bash.txt"; cat amp-bash.txt'
run 'dash -c "ls exists.txt missing.txt &> amp-dash.txt"; sleep 1; wc -c amp-dash.txt'

card pipe
run 'printf "b\na\nc\n" | sort'
run 'grep -i apple food.txt | wc -l'

card tee
run 'echo "saved and shown" | tee tee-out.txt'
run 'cat tee-out.txt'

card df-h
run 'df -h | head -n 2 | sed "s/  */ /g"'
run 'df -k | head -n 1; df -P | head -n 1'

card du-sh
mkdir sized; head -c 3000000 /dev/zero > sized/big.bin; head -c 10000 /dev/zero > sized/small.bin
run 'du -sh sized'
run 'du -sk sized'
run 'du -h sized | wc -l'

card ping
run 'ping -c 4 127.0.0.1 | sed -n "1p;\$p" ; ping -c 4 127.0.0.1 | grep -c "bytes from"'

card curl-o
mkdir dl
run '(cd dl && curl -O https://raw.githubusercontent.com/curl/curl/master/COPYING 2>/dev/null; ls -l | awk "NR > 1 {print \$5, \$9}"; head -n 2 COPYING)'

card ssh
SSHOPT="-F /dev/null -o BatchMode=yes -o PubkeyAuthentication=no -o PasswordAuthentication=no -o UserKnownHostsFile=$W/known_hosts -o StrictHostKeyChecking=accept-new"
run 'ssh -G alice@example.org | grep -E "^(user|hostname|port) "'
run "ssh $SSHOPT -v git@github.com 2>&1 | grep -E 'Connecting to|Authenticating to|Permission denied' | sed 's/\[[0-9a-f.:]*\]/[ip]/'"

card scp
printf 'payload\n' > upload.txt
run "scp $SSHOPT -v upload.txt git@github.com:backup/ 2>&1 | grep -E 'Executing: program|Connecting to|Authenticating to|Permission denied|Connection closed' | sed 's/\[[0-9a-f.:]*\]/[ip]/'"

card man
run 'man ls 2>&1 | head -n 6'

card notes-checks
run 'printf "a\nb" | wc -l'
run 'echo one | tee note-tee.txt >/dev/null; echo two | tee -a note-tee.txt >/dev/null; cat note-tee.txt'
run 'scp upload.txt alice@example.org; ls -l alice@example.org | cut -c1-10; cat alice@example.org'
run 'mkdir -p existing/dir; mkdir -p existing/dir; mkdir existing/dir'
run 'mv final.txt reports; ls reports'
run '(cd dl && curl -o chosen-name.txt https://raw.githubusercontent.com/curl/curl/master/COPYING 2>/dev/null; ls)'
run 'curl -s https://raw.githubusercontent.com/curl/curl/master/COPYING | head -n 1'

echo
echo "########## END"
```

**sc-run.py: runs the test script twice (dash with the default PATH; bash with GNU coreutils first in PATH) and records the outputs** (Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory)

```
# Run run-shell-commands.sh twice and record the output:
#   run 1: dash, the system's default PATH (Ubuntu 26.04: uutils coreutils 0.8.0 for most
#          utilities, GNU coreutils 9.7 for rm, cp, mv and df)
#   run 2: bash, with a directory of links to the GNU coreutils 9.7 binaries (/usr/bin/gnu*)
#          first in PATH, so every coreutils command is GNU's
import os, subprocess, glob
S = "/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo--claude-worktrees-authored-decks/0d3ab5ce-8aa3-4420-b0eb-935ec077f401/scratchpad/decks/unix-shell-commands/"
gnubin = S + "gnubin"
os.makedirs(gnubin, exist_ok=True)
for p in glob.glob("/usr/bin/gnu*"):
    name = os.path.basename(p)[3:]
    link = os.path.join(gnubin, name)
    if name and not os.path.lexists(link):
        os.symlink(p, link)
base = dict(os.environ)
runs = [("run1-dash-default.txt", ["dash", S + "run-shell-commands.sh", S + "work1"], base["PATH"]),
        ("run2-bash-gnu.txt", ["bash", S + "run-shell-commands.sh", S + "work2"], gnubin + ":" + base["PATH"])]
for out, cmd, path in runs:
    env = dict(base, PATH=path)
    with open(S + out, "w") as f:
        r = subprocess.run(cmd, stdout=f, stderr=subprocess.STDOUT, env=env, stdin=subprocess.DEVNULL)
    print(out, "exit", r.returncode)
```

**Complete output of run 1 (dash 0.5.12, default PATH: uutils coreutils 0.8.0 with GNU rm, cp, mv, df), run-1 file run1-dash-default.txt** (Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory)

```

########## CARD versions
$ ls --version | head -n 1; df --version | head -n 1; grep --version | head -n 1; find --version | head -n 1; tar --version | head -n 1; ps --version; command -v ls cp df
ls (uutils coreutils) 0.8.0
df (GNU coreutils) 9.7
grep (GNU grep) 3.12
find (GNU findutils) 4.10.0
tar (GNU tar) 1.35
ps from procps-ng 4.0.4
/usr/bin/ls
[exit 0]

########## CARD pwd
$ cd "$W/nav/sub"
[exit 0]
$ pwd
/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo--claude-worktrees-authored-decks/0d3ab5ce-8aa3-4420-b0eb-935ec077f401/scratchpad/decks/unix-shell-commands/work1/nav/sub
[exit 0]

########## CARD cd-home
$ cd /
[exit 0]
$ cd
[exit 0]
$ pwd
/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo--claude-worktrees-authored-decks/0d3ab5ce-8aa3-4420-b0eb-935ec077f401/scratchpad/decks/unix-shell-commands/work1/home
[exit 0]
$ cd /; cd ~; pwd
/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo--claude-worktrees-authored-decks/0d3ab5ce-8aa3-4420-b0eb-935ec077f401/scratchpad/decks/unix-shell-commands/work1/home
[exit 0]

########## CARD cd-parent
$ cd "$W/nav/sub/deeper"
[exit 0]
$ cd ..
[exit 0]
$ pwd
/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo--claude-worktrees-authored-decks/0d3ab5ce-8aa3-4420-b0eb-935ec077f401/scratchpad/decks/unix-shell-commands/work1/nav/sub
[exit 0]

########## CARD cd-previous
$ cd "$W/nav"; cd "$W/nav/sub/deeper"
[exit 0]
$ cd -
/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo--claude-worktrees-authored-decks/0d3ab5ce-8aa3-4420-b0eb-935ec077f401/scratchpad/decks/unix-shell-commands/work1/nav
[exit 0]
$ pwd
/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo--claude-worktrees-authored-decks/0d3ab5ce-8aa3-4420-b0eb-935ec077f401/scratchpad/decks/unix-shell-commands/work1/nav
[exit 0]

########## CARD ls-all
$ ls
a.txt
b.txt
[exit 0]
$ ls -a
.
..
.hidden
a.txt
b.txt
[exit 0]
$ ls -A
.hidden
a.txt
b.txt
[exit 0]

########## CARD ls-long
$ ls -l | sed "s/ [0-9]* [a-z]* [a-z]* / N user group /"
total 8
-rw-r--r-- N user group 2 Jan  1  2026 a.txt
-rw-r--r-- N user group 3 Mar  1  2026 b.txt
[exit 0]

########## CARD ls-time
$ ls -lt | sed "s/ [0-9]* [a-z]* [a-z]* / N user group /"
total 8
-rw-r--r-- N user group 3 Mar  1  2026 b.txt
-rw-r--r-- N user group 2 Jan  1  2026 a.txt
[exit 0]

########## CARD mkdir
$ mkdir reports
[exit 0]
$ ls -ld reports | cut -c1-10
drwxr-xr-x
[exit 0]

########## CARD mkdir-parents
$ mkdir projects/2026/notes
mkdir: No such file or directory
[exit 1]
$ mkdir -p projects/2026/notes
[exit 0]
$ find projects
projects
projects/2026
projects/2026/notes
[exit 0]
$ mkdir -p projects/2026/notes
[exit 0]

########## CARD rmdir
$ rmdir emptydir
[exit 0]
$ ls -d emptydir
ls: cannot access 'emptydir': No such file or directory
[exit 2]
$ rmdir fulldir
rmdir: failed to remove 'fulldir': Directory not empty
[exit 1]

########## CARD rm
$ rm junk.txt
[exit 0]
$ ls junk.txt
ls: cannot access 'junk.txt': No such file or directory
[exit 2]
$ rm fulldir
rm: cannot remove 'fulldir': Is a directory
[exit 1]

########## CARD rm-recursive
$ rm -r tree
[exit 0]
$ ls tree
ls: cannot access 'tree': No such file or directory
[exit 2]
$ rm -r tree2 </dev/null
[exit 0]
$ ls tree2
ls: cannot access 'tree2': No such file or directory
[exit 2]

########## CARD cp
$ cp notes.txt notes-copy.txt
[exit 0]
$ cat notes-copy.txt
original
[exit 0]
$ cp projects projects-copy
cp: -r not specified; omitting directory 'projects'
[exit 1]

########## CARD cp-recursive
$ cp -R projects projects-copy
[exit 0]
$ find projects-copy
projects-copy
projects-copy/2026
projects-copy/2026/notes
projects-copy/2026/notes/todo.txt
[exit 0]
$ cp -r projects projects-copy2 && find projects-copy2 | wc -l
4
[exit 0]

########## CARD mv-rename
$ mv draft.txt final.txt
[exit 0]
$ ls draft.txt final.txt
ls: cannot access 'draft.txt': No such file or directory
final.txt
[exit 2]

########## CARD touch
$ touch empty.txt
[exit 0]
$ wc -c empty.txt
0 empty.txt
[exit 0]
$ ls -l final.txt | cut -d" " -f6-
Jan  1  2000 final.txt
[exit 0]
$ touch final.txt
[exit 0]
$ ls -l final.txt | awk "{print \$6, \$7, \$8, \$9}" | sed "s/[0-9][0-9]:[0-9][0-9]/HH:MM/"; cat final.txt
Oct 4 HH:MM final.txt
draft
[exit 0]

########## CARD ln-symbolic
$ ln -s target.txt link.txt
[exit 0]
$ ls -l link.txt | sed "s/.* link.txt/link.txt/"
link.txt -> target.txt
[exit 0]
$ cat link.txt
target text
[exit 0]

########## CARD cat
$ cat short.txt
line one
line two
[exit 0]

########## CARD head-20
$ head -n 20 thirty.txt | tr "\n" " "; echo
line 1 line 2 line 3 line 4 line 5 line 6 line 7 line 8 line 9 line 10 line 11 line 12 line 13 line 14 line 15 line 16 line 17 line 18 line 19 line 20 
[exit 0]
$ head thirty.txt | wc -l
10
[exit 0]

########## CARD tail-20
$ tail -n 20 thirty.txt | tr "\n" " "; echo
line 11 line 12 line 13 line 14 line 15 line 16 line 17 line 18 line 19 line 20 line 21 line 22 line 23 line 24 line 25 line 26 line 27 line 28 line 29 line 30 
[exit 0]
$ tail thirty.txt | wc -l
10
[exit 0]

########## CARD tail-follow
$ tail -f app.log   (in the background; two lines appended after 1 s; stopped after 2 s more)
$ cat follow.out
start
new entry 1
new entry 2
[exit 0]

########## CARD wc-lines
$ wc -l thirty.txt
30 thirty.txt
[exit 0]

########## CARD diff
$ diff list1.txt list2.txt
2c2
< bread
---
> butter
[exit 1]

########## CARD sort
$ sort fruit.txt
apple
banana
cherry
pear
[exit 0]

########## CARD grep
$ grep apple food.txt
apple juice
[exit 0]

########## CARD grep-i
$ grep -i apple food.txt
Apple pie
apple juice
[exit 0]

########## CARD grep-v
$ grep -v apple food.txt
Apple pie
banana bread
Cherry jam
[exit 0]

########## CARD grep-n
$ grep -n apple food.txt
2:apple juice
[exit 0]

########## CARD grep-r
$ grep -r TODO src | sort
src/lib/deep.c:x TODO
src/main.c:TODO: fix
[exit 0]
$ grep TODO src
grep: src: Is a directory
[exit 2]
$ find src -type f -exec grep TODO {} + | sort
src/lib/deep.c:x TODO
src/main.c:TODO: fix
[exit 0]

########## CARD find-name
$ find . -name '*.txt' | sort
./a.txt
./sub/b.txt
./sub/deep/d.txt
[exit 0]
$ find . -name *.txt
./a.txt
[exit 0]

########## CARD find-dirs
$ find . -type d | sort
.
./sub
./sub/deep
[exit 0]

########## CARD chmod-x
$ ls -l hello.sh | cut -c1-10
-rw-r--r--
[exit 0]
$ ./hello.sh
/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo--claude-worktrees-authored-decks/0d3ab5ce-8aa3-4420-b0eb-935ec077f401/scratchpad/decks/unix-shell-commands/run-shell-commands.sh: 1: eval: ./hello.sh: Permission denied
[exit 126]
$ chmod +x hello.sh
[exit 0]
$ ls -l hello.sh | cut -c1-10
-rwxr-xr-x
[exit 0]
$ ./hello.sh
hello from script
[exit 0]
$ (umask 077; chmod +x h2.sh; chmod a+x h3.sh); ls -l h2.sh h3.sh | cut -c1-10
-rwxr--r--
-rwxr-xr-x
[exit 0]

########## CARD chmod-644
$ chmod 644 perm.txt
[exit 0]
$ ls -l perm.txt | cut -c1-10
-rw-r--r--
[exit 0]

########## CARD chown
$ chown "$(id -un)" owned.txt
[exit 0]
$ ls -n owned.txt | awk "{print \$3}"; id -u
1000
1000
[exit 0]
$ chown root owned.txt
chown: changing ownership of 'owned.txt': Operation not permitted (os error 1)
[exit 1]

########## CARD ps-ef
$ ps -ef | head -n 1
UID          PID    PPID  C STIME TTY          TIME CMD
[exit 0]
$ ps -ef | awk -v p=$sp "\$2 == p {print \$2, \$8, \$9}"
2283140 sleep 30
[exit 0]
$ ps -e | wc -l; ps -ef | wc -l
96
96
[exit 0]
$ ps aux | head -n 1
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
[exit 0]

########## CARD kill
$ kill $pid
[exit 0]
$ wait $pid
Terminated
[exit 143]

########## CARD kill-9
$ kill $pid; sleep 1; kill -0 $pid && echo "still running: TERM ignored"
still running: TERM ignored
[exit 0]
$ kill -9 $pid
[exit 0]
$ wait $pid
Killed
[exit 137]
$ kill -s KILL $pid
[exit 0]
$ wait $pid
Killed
[exit 137]

########## CARD background
$ sleep 2 & echo "prompt is back; background job PID $!"
prompt is back; background job PID 2283274
[exit 0]
$ wait
[exit 0]

########## CARD jobs
(tested interactively in a pseudo-terminal: see jobs-pty.py and its output)

########## CARD fg
(tested interactively in a pseudo-terminal: see jobs-pty.py and its output)

########## CARD tar-create
$ tar -czf project.tar.gz project
[exit 0]
$ gzip -t project.tar.gz && echo gzip OK
gzip OK
[exit 0]
$ tar -tzf project.tar.gz | sort
project/
project/README
project/src/
project/src/main.c
[exit 0]

########## CARD tar-extract
$ (cd unpack && tar -xzf ../project.tar.gz && find . | sort)
.
./project
./project/README
./project/src
./project/src/main.c
[exit 0]
$ (cd unpack2 && tar -xf ../project.tar.gz && find . | sort)
.
./project
./project/README
./project/src
./project/src/main.c
[exit 0]

########## CARD redirect-out
$ echo first > out.txt; echo second > out.txt; cat out.txt
second
[exit 0]

########## CARD redirect-append
$ echo first > log.txt; echo second >> log.txt; cat log.txt
first
second
[exit 0]

########## CARD redirect-stderr
$ ls exists.txt missing.txt 2> errors.txt
exists.txt
[exit 2]
$ cat errors.txt
ls: cannot access 'missing.txt': No such file or directory
[exit 0]

########## CARD redirect-both
$ ls exists.txt missing.txt > both.txt 2>&1
[exit 2]
$ cat both.txt
ls: cannot access 'missing.txt': No such file or directory
exists.txt
[exit 0]
$ ls exists.txt missing.txt 2>&1 > wrong-order.txt
ls: cannot access 'missing.txt': No such file or directory
[exit 2]
$ cat wrong-order.txt
exists.txt
[exit 0]
$ bash -c "ls exists.txt missing.txt &> amp-bash.txt"; cat amp-bash.txt
ls: cannot access 'missing.txt': No such file or directory
exists.txt
[exit 0]
$ dash -c "ls exists.txt missing.txt &> amp-dash.txt"; sleep 1; wc -c amp-dash.txt
ls: cannot access 'missing.txt': No such file or directory
exists.txt
0 amp-dash.txt
[exit 0]

########## CARD pipe
$ printf "b\na\nc\n" | sort
a
b
c
[exit 0]
$ grep -i apple food.txt | wc -l
2
[exit 0]

########## CARD tee
$ echo "saved and shown" | tee tee-out.txt
saved and shown
[exit 0]
$ cat tee-out.txt
saved and shown
[exit 0]

########## CARD df-h
$ df -h | head -n 2 | sed "s/  */ /g"
Filesystem Size Used Avail Use% Mounted on
none 7.8G 0 7.8G 0% /usr/lib/modules/6.18.40.1-microsoft-standard-WSL2
[exit 0]
$ df -k | head -n 1; df -P | head -n 1
Filesystem      1K-blocks       Used  Available Use% Mounted on
Filesystem     1024-blocks       Used  Available Capacity Mounted on
[exit 0]

########## CARD du-sh
$ du -sh sized
2.9M	sized
[exit 0]
$ du -sk sized
2944	sized
[exit 0]
$ du -h sized | wc -l
1
[exit 0]

########## CARD ping
$ ping -c 4 127.0.0.1 | sed -n "1p;\$p" ; ping -c 4 127.0.0.1 | grep -c "bytes from"
PING 127.0.0.1 (127.0.0.1) 56(84) bytes of data.
rtt min/avg/max/mdev = 0.034/0.042/0.055/0.008 ms
4
[exit 0]

########## CARD curl-o
$ (cd dl && curl -O https://raw.githubusercontent.com/curl/curl/master/COPYING 2>/dev/null; ls -l | awk "NR > 1 {print \$5, \$9}"; head -n 2 COPYING)
1088 COPYING
COPYRIGHT AND PERMISSION NOTICE

[exit 0]

########## CARD ssh
$ ssh -G alice@example.org | grep -E "^(user|hostname|port) "
Pseudo-terminal will not be allocated because stdin is not a terminal.
user alice
hostname example.org
port 22
[exit 0]
$ ssh -F /dev/null -o BatchMode=yes -o PubkeyAuthentication=no -o PasswordAuthentication=no -o UserKnownHostsFile=/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo--claude-worktrees-authored-decks/0d3ab5ce-8aa3-4420-b0eb-935ec077f401/scratchpad/decks/unix-shell-commands/work1/known_hosts -o StrictHostKeyChecking=accept-new -v git@github.com 2>&1 | grep -E 'Connecting to|Authenticating to|Permission denied' | sed 's/\[[0-9a-f.:]*\]/[ip]/'
debug1: Connecting to github.com [ip] port 22.
debug1: Authenticating to github.com:22 as 'git'
git@github.com: Permission denied (publickey).
[exit 0]

########## CARD scp
$ scp -F /dev/null -o BatchMode=yes -o PubkeyAuthentication=no -o PasswordAuthentication=no -o UserKnownHostsFile=/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo--claude-worktrees-authored-decks/0d3ab5ce-8aa3-4420-b0eb-935ec077f401/scratchpad/decks/unix-shell-commands/work1/known_hosts -o StrictHostKeyChecking=accept-new -v upload.txt git@github.com:backup/ 2>&1 | grep -E 'Executing: program|Connecting to|Authenticating to|Permission denied|Connection closed' | sed 's/\[[0-9a-f.:]*\]/[ip]/'
Executing: program /usr/bin/ssh host github.com, user git, command sftp
debug1: Connecting to github.com [ip] port 22.
debug1: Authenticating to github.com:22 as 'git'
git@github.com: Permission denied (publickey).
scp: Connection closed
[exit 0]

########## CARD man
$ man ls 2>&1 | head -n 6
LS(1)                       General Commands Manual                       LS(1)

NAME
       ls  -  List  directory  contents.  Ignore files and directories starting
       with a '.' by default

[exit 0]

########## CARD notes-checks
$ printf "a\nb" | wc -l
1
[exit 0]
$ echo one | tee note-tee.txt >/dev/null; echo two | tee -a note-tee.txt >/dev/null; cat note-tee.txt
one
two
[exit 0]
$ scp upload.txt alice@example.org; ls -l alice@example.org | cut -c1-10; cat alice@example.org
-rw-r--r--
payload
[exit 0]
$ mkdir -p existing/dir; mkdir -p existing/dir; mkdir existing/dir
mkdir: existing/dir: File exists
[exit 1]
$ mv final.txt reports; ls reports
final.txt
[exit 0]
$ (cd dl && curl -o chosen-name.txt https://raw.githubusercontent.com/curl/curl/master/COPYING 2>/dev/null; ls)
COPYING
chosen-name.txt
[exit 0]
$ curl -s https://raw.githubusercontent.com/curl/curl/master/COPYING | head -n 1
COPYRIGHT AND PERMISSION NOTICE
[exit 0]

########## END
```

**Complete output of run 2 (bash 5.3.9, GNU coreutils 9.7 for every coreutils command), file run2-bash-gnu.txt** (Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory)

```

########## CARD versions
$ ls --version | head -n 1; df --version | head -n 1; grep --version | head -n 1; find --version | head -n 1; tar --version | head -n 1; ps --version; command -v ls cp df
ls (GNU coreutils) 9.7
df (GNU coreutils) 9.7
grep (GNU grep) 3.12
find (GNU findutils) 4.10.0
tar (GNU tar) 1.35
ps from procps-ng 4.0.4
/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo--claude-worktrees-authored-decks/0d3ab5ce-8aa3-4420-b0eb-935ec077f401/scratchpad/decks/unix-shell-commands/gnubin/ls
/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo--claude-worktrees-authored-decks/0d3ab5ce-8aa3-4420-b0eb-935ec077f401/scratchpad/decks/unix-shell-commands/gnubin/cp
/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo--claude-worktrees-authored-decks/0d3ab5ce-8aa3-4420-b0eb-935ec077f401/scratchpad/decks/unix-shell-commands/gnubin/df
[exit 0]

########## CARD pwd
$ cd "$W/nav/sub"
[exit 0]
$ pwd
/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo--claude-worktrees-authored-decks/0d3ab5ce-8aa3-4420-b0eb-935ec077f401/scratchpad/decks/unix-shell-commands/work2/nav/sub
[exit 0]

########## CARD cd-home
$ cd /
[exit 0]
$ cd
[exit 0]
$ pwd
/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo--claude-worktrees-authored-decks/0d3ab5ce-8aa3-4420-b0eb-935ec077f401/scratchpad/decks/unix-shell-commands/work2/home
[exit 0]
$ cd /; cd ~; pwd
/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo--claude-worktrees-authored-decks/0d3ab5ce-8aa3-4420-b0eb-935ec077f401/scratchpad/decks/unix-shell-commands/work2/home
[exit 0]

########## CARD cd-parent
$ cd "$W/nav/sub/deeper"
[exit 0]
$ cd ..
[exit 0]
$ pwd
/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo--claude-worktrees-authored-decks/0d3ab5ce-8aa3-4420-b0eb-935ec077f401/scratchpad/decks/unix-shell-commands/work2/nav/sub
[exit 0]

########## CARD cd-previous
$ cd "$W/nav"; cd "$W/nav/sub/deeper"
[exit 0]
$ cd -
/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo--claude-worktrees-authored-decks/0d3ab5ce-8aa3-4420-b0eb-935ec077f401/scratchpad/decks/unix-shell-commands/work2/nav
[exit 0]
$ pwd
/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo--claude-worktrees-authored-decks/0d3ab5ce-8aa3-4420-b0eb-935ec077f401/scratchpad/decks/unix-shell-commands/work2/nav
[exit 0]

########## CARD ls-all
$ ls
a.txt
b.txt
[exit 0]
$ ls -a
.
..
.hidden
a.txt
b.txt
[exit 0]
$ ls -A
.hidden
a.txt
b.txt
[exit 0]

########## CARD ls-long
$ ls -l | sed "s/ [0-9]* [a-z]* [a-z]* / N user group /"
total 8
-rw-r--r-- N user group 2 Jan  1  2026 a.txt
-rw-r--r-- N user group 3 Mar  1  2026 b.txt
[exit 0]

########## CARD ls-time
$ ls -lt | sed "s/ [0-9]* [a-z]* [a-z]* / N user group /"
total 8
-rw-r--r-- N user group 3 Mar  1  2026 b.txt
-rw-r--r-- N user group 2 Jan  1  2026 a.txt
[exit 0]

########## CARD mkdir
$ mkdir reports
[exit 0]
$ ls -ld reports | cut -c1-10
drwxr-xr-x
[exit 0]

########## CARD mkdir-parents
$ mkdir projects/2026/notes
mkdir: cannot create directory ‘projects/2026/notes’: No such file or directory
[exit 1]
$ mkdir -p projects/2026/notes
[exit 0]
$ find projects
projects
projects/2026
projects/2026/notes
[exit 0]
$ mkdir -p projects/2026/notes
[exit 0]

########## CARD rmdir
$ rmdir emptydir
[exit 0]
$ ls -d emptydir
ls: cannot access 'emptydir': No such file or directory
[exit 2]
$ rmdir fulldir
rmdir: failed to remove 'fulldir': Directory not empty
[exit 1]

########## CARD rm
$ rm junk.txt
[exit 0]
$ ls junk.txt
ls: cannot access 'junk.txt': No such file or directory
[exit 2]
$ rm fulldir
rm: cannot remove 'fulldir': Is a directory
[exit 1]

########## CARD rm-recursive
$ rm -r tree
[exit 0]
$ ls tree
ls: cannot access 'tree': No such file or directory
[exit 2]
$ rm -r tree2 </dev/null
[exit 0]
$ ls tree2
ls: cannot access 'tree2': No such file or directory
[exit 2]

########## CARD cp
$ cp notes.txt notes-copy.txt
[exit 0]
$ cat notes-copy.txt
original
[exit 0]
$ cp projects projects-copy
cp: -r not specified; omitting directory 'projects'
[exit 1]

########## CARD cp-recursive
$ cp -R projects projects-copy
[exit 0]
$ find projects-copy
projects-copy
projects-copy/2026
projects-copy/2026/notes
projects-copy/2026/notes/todo.txt
[exit 0]
$ cp -r projects projects-copy2 && find projects-copy2 | wc -l
4
[exit 0]

########## CARD mv-rename
$ mv draft.txt final.txt
[exit 0]
$ ls draft.txt final.txt
ls: cannot access 'draft.txt': No such file or directory
final.txt
[exit 2]

########## CARD touch
$ touch empty.txt
[exit 0]
$ wc -c empty.txt
0 empty.txt
[exit 0]
$ ls -l final.txt | cut -d" " -f6-
Jan  1  2000 final.txt
[exit 0]
$ touch final.txt
[exit 0]
$ ls -l final.txt | awk "{print \$6, \$7, \$8, \$9}" | sed "s/[0-9][0-9]:[0-9][0-9]/HH:MM/"; cat final.txt
Oct 4 HH:MM final.txt
draft
[exit 0]

########## CARD ln-symbolic
$ ln -s target.txt link.txt
[exit 0]
$ ls -l link.txt | sed "s/.* link.txt/link.txt/"
link.txt -> target.txt
[exit 0]
$ cat link.txt
target text
[exit 0]

########## CARD cat
$ cat short.txt
line one
line two
[exit 0]

########## CARD head-20
$ head -n 20 thirty.txt | tr "\n" " "; echo
line 1 line 2 line 3 line 4 line 5 line 6 line 7 line 8 line 9 line 10 line 11 line 12 line 13 line 14 line 15 line 16 line 17 line 18 line 19 line 20 
[exit 0]
$ head thirty.txt | wc -l
10
[exit 0]

########## CARD tail-20
$ tail -n 20 thirty.txt | tr "\n" " "; echo
line 11 line 12 line 13 line 14 line 15 line 16 line 17 line 18 line 19 line 20 line 21 line 22 line 23 line 24 line 25 line 26 line 27 line 28 line 29 line 30 
[exit 0]
$ tail thirty.txt | wc -l
10
[exit 0]

########## CARD tail-follow
$ tail -f app.log   (in the background; two lines appended after 1 s; stopped after 2 s more)
$ cat follow.out
start
new entry 1
new entry 2
[exit 0]

########## CARD wc-lines
$ wc -l thirty.txt
30 thirty.txt
[exit 0]

########## CARD diff
$ diff list1.txt list2.txt
2c2
< bread
---
> butter
[exit 1]

########## CARD sort
$ sort fruit.txt
apple
banana
cherry
pear
[exit 0]

########## CARD grep
$ grep apple food.txt
apple juice
[exit 0]

########## CARD grep-i
$ grep -i apple food.txt
Apple pie
apple juice
[exit 0]

########## CARD grep-v
$ grep -v apple food.txt
Apple pie
banana bread
Cherry jam
[exit 0]

########## CARD grep-n
$ grep -n apple food.txt
2:apple juice
[exit 0]

########## CARD grep-r
$ grep -r TODO src | sort
src/lib/deep.c:x TODO
src/main.c:TODO: fix
[exit 0]
$ grep TODO src
grep: src: Is a directory
[exit 2]
$ find src -type f -exec grep TODO {} + | sort
src/lib/deep.c:x TODO
src/main.c:TODO: fix
[exit 0]

########## CARD find-name
$ find . -name '*.txt' | sort
./a.txt
./sub/b.txt
./sub/deep/d.txt
[exit 0]
$ find . -name *.txt
./a.txt
[exit 0]

########## CARD find-dirs
$ find . -type d | sort
.
./sub
./sub/deep
[exit 0]

########## CARD chmod-x
$ ls -l hello.sh | cut -c1-10
-rw-r--r--
[exit 0]
$ ./hello.sh
/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo--claude-worktrees-authored-decks/0d3ab5ce-8aa3-4420-b0eb-935ec077f401/scratchpad/decks/unix-shell-commands/run-shell-commands.sh: line 11: ./hello.sh: Permission denied
[exit 126]
$ chmod +x hello.sh
[exit 0]
$ ls -l hello.sh | cut -c1-10
-rwxr-xr-x
[exit 0]
$ ./hello.sh
hello from script
[exit 0]
$ (umask 077; chmod +x h2.sh; chmod a+x h3.sh); ls -l h2.sh h3.sh | cut -c1-10
-rwxr--r--
-rwxr-xr-x
[exit 0]

########## CARD chmod-644
$ chmod 644 perm.txt
[exit 0]
$ ls -l perm.txt | cut -c1-10
-rw-r--r--
[exit 0]

########## CARD chown
$ chown "$(id -un)" owned.txt
[exit 0]
$ ls -n owned.txt | awk "{print \$3}"; id -u
1000
1000
[exit 0]
$ chown root owned.txt
chown: changing ownership of 'owned.txt': Operation not permitted
[exit 1]

########## CARD ps-ef
$ ps -ef | head -n 1
UID          PID    PPID  C STIME TTY          TIME CMD
[exit 0]
$ ps -ef | awk -v p=$sp "\$2 == p {print \$2, \$8, \$9}"
2287176 sleep 30
[exit 0]
$ ps -e | wc -l; ps -ef | wc -l
135
135
[exit 0]
$ ps aux | head -n 1
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
[exit 0]

########## CARD kill
$ kill $pid
[exit 0]
$ wait $pid
[exit 143]

########## CARD kill-9
$ kill $pid; sleep 1; kill -0 $pid && echo "still running: TERM ignored"
still running: TERM ignored
[exit 0]
$ kill -9 $pid
[exit 0]
$ wait $pid
/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo--claude-worktrees-authored-decks/0d3ab5ce-8aa3-4420-b0eb-935ec077f401/scratchpad/decks/unix-shell-commands/run-shell-commands.sh: line 11: 2287201 Killed                     sh -c 'trap "" TERM; while :; do sleep 1; done'
[exit 137]
$ kill -s KILL $pid
[exit 0]
$ wait $pid
/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo--claude-worktrees-authored-decks/0d3ab5ce-8aa3-4420-b0eb-935ec077f401/scratchpad/decks/unix-shell-commands/run-shell-commands.sh: line 11: 2287415 Killed                     sh -c 'trap "" TERM; while :; do sleep 1; done'
[exit 137]

########## CARD background
$ sleep 2 & echo "prompt is back; background job PID $!"
prompt is back; background job PID 2287455
[exit 0]
$ wait
[exit 0]

########## CARD jobs
(tested interactively in a pseudo-terminal: see jobs-pty.py and its output)

########## CARD fg
(tested interactively in a pseudo-terminal: see jobs-pty.py and its output)

########## CARD tar-create
$ tar -czf project.tar.gz project
[exit 0]
$ gzip -t project.tar.gz && echo gzip OK
gzip OK
[exit 0]
$ tar -tzf project.tar.gz | sort
project/
project/README
project/src/
project/src/main.c
[exit 0]

########## CARD tar-extract
$ (cd unpack && tar -xzf ../project.tar.gz && find . | sort)
.
./project
./project/README
./project/src
./project/src/main.c
[exit 0]
$ (cd unpack2 && tar -xf ../project.tar.gz && find . | sort)
.
./project
./project/README
./project/src
./project/src/main.c
[exit 0]

########## CARD redirect-out
$ echo first > out.txt; echo second > out.txt; cat out.txt
second
[exit 0]

########## CARD redirect-append
$ echo first > log.txt; echo second >> log.txt; cat log.txt
first
second
[exit 0]

########## CARD redirect-stderr
$ ls exists.txt missing.txt 2> errors.txt
exists.txt
[exit 2]
$ cat errors.txt
ls: cannot access 'missing.txt': No such file or directory
[exit 0]

########## CARD redirect-both
$ ls exists.txt missing.txt > both.txt 2>&1
[exit 2]
$ cat both.txt
ls: cannot access 'missing.txt': No such file or directory
exists.txt
[exit 0]
$ ls exists.txt missing.txt 2>&1 > wrong-order.txt
ls: cannot access 'missing.txt': No such file or directory
[exit 2]
$ cat wrong-order.txt
exists.txt
[exit 0]
$ bash -c "ls exists.txt missing.txt &> amp-bash.txt"; cat amp-bash.txt
ls: cannot access 'missing.txt': No such file or directory
exists.txt
[exit 0]
$ dash -c "ls exists.txt missing.txt &> amp-dash.txt"; sleep 1; wc -c amp-dash.txt
ls: cannot access 'missing.txt': No such file or directory
exists.txt
0 amp-dash.txt
[exit 0]

########## CARD pipe
$ printf "b\na\nc\n" | sort
a
b
c
[exit 0]
$ grep -i apple food.txt | wc -l
2
[exit 0]

########## CARD tee
$ echo "saved and shown" | tee tee-out.txt
saved and shown
[exit 0]
$ cat tee-out.txt
saved and shown
[exit 0]

########## CARD df-h
$ df -h | head -n 2 | sed "s/  */ /g"
Filesystem Size Used Avail Use% Mounted on
none 7.8G 0 7.8G 0% /usr/lib/modules/6.18.40.1-microsoft-standard-WSL2
[exit 0]
$ df -k | head -n 1; df -P | head -n 1
Filesystem      1K-blocks       Used  Available Use% Mounted on
Filesystem     1024-blocks       Used  Available Capacity Mounted on
[exit 0]

########## CARD du-sh
$ du -sh sized
2.9M	sized
[exit 0]
$ du -sk sized
2944	sized
[exit 0]
$ du -h sized | wc -l
1
[exit 0]

########## CARD ping
$ ping -c 4 127.0.0.1 | sed -n "1p;\$p" ; ping -c 4 127.0.0.1 | grep -c "bytes from"
PING 127.0.0.1 (127.0.0.1) 56(84) bytes of data.
rtt min/avg/max/mdev = 0.020/0.031/0.054/0.013 ms
4
[exit 0]

########## CARD curl-o
$ (cd dl && curl -O https://raw.githubusercontent.com/curl/curl/master/COPYING 2>/dev/null; ls -l | awk "NR > 1 {print \$5, \$9}"; head -n 2 COPYING)
1088 COPYING
COPYRIGHT AND PERMISSION NOTICE

[exit 0]

########## CARD ssh
$ ssh -G alice@example.org | grep -E "^(user|hostname|port) "
Pseudo-terminal will not be allocated because stdin is not a terminal.
user alice
hostname example.org
port 22
[exit 0]
$ ssh -F /dev/null -o BatchMode=yes -o PubkeyAuthentication=no -o PasswordAuthentication=no -o UserKnownHostsFile=/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo--claude-worktrees-authored-decks/0d3ab5ce-8aa3-4420-b0eb-935ec077f401/scratchpad/decks/unix-shell-commands/work2/known_hosts -o StrictHostKeyChecking=accept-new -v git@github.com 2>&1 | grep -E 'Connecting to|Authenticating to|Permission denied' | sed 's/\[[0-9a-f.:]*\]/[ip]/'
debug1: Connecting to github.com [ip] port 22.
debug1: Authenticating to github.com:22 as 'git'
git@github.com: Permission denied (publickey).
[exit 0]

########## CARD scp
$ scp -F /dev/null -o BatchMode=yes -o PubkeyAuthentication=no -o PasswordAuthentication=no -o UserKnownHostsFile=/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo--claude-worktrees-authored-decks/0d3ab5ce-8aa3-4420-b0eb-935ec077f401/scratchpad/decks/unix-shell-commands/work2/known_hosts -o StrictHostKeyChecking=accept-new -v upload.txt git@github.com:backup/ 2>&1 | grep -E 'Executing: program|Connecting to|Authenticating to|Permission denied|Connection closed' | sed 's/\[[0-9a-f.:]*\]/[ip]/'
Executing: program /usr/bin/ssh host github.com, user git, command sftp
debug1: Connecting to github.com [ip] port 22.
debug1: Authenticating to github.com:22 as 'git'
git@github.com: Permission denied (publickey).
scp: Connection closed
[exit 0]

########## CARD man
$ man ls 2>&1 | head -n 6
LS(1)                       General Commands Manual                       LS(1)

NAME
       ls  -  List  directory  contents.  Ignore files and directories starting
       with a '.' by default

[exit 0]

########## CARD notes-checks
$ printf "a\nb" | wc -l
1
[exit 0]
$ echo one | tee note-tee.txt >/dev/null; echo two | tee -a note-tee.txt >/dev/null; cat note-tee.txt
one
two
[exit 0]
$ scp upload.txt alice@example.org; ls -l alice@example.org | cut -c1-10; cat alice@example.org
-rw-r--r--
payload
[exit 0]
$ mkdir -p existing/dir; mkdir -p existing/dir; mkdir existing/dir
mkdir: cannot create directory ‘existing/dir’: File exists
[exit 1]
$ mv final.txt reports; ls reports
final.txt
[exit 0]
$ (cd dl && curl -o chosen-name.txt https://raw.githubusercontent.com/curl/curl/master/COPYING 2>/dev/null; ls)
COPYING
chosen-name.txt
[exit 0]
$ curl -s https://raw.githubusercontent.com/curl/curl/master/COPYING | head -n 1
COPYRIGHT AND PERMISSION NOTICE
[exit 0]

########## END
```

**jobs-pty.py: background job, jobs and fg typed into interactive dash and bash in a pseudo-terminal** (Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory)

```
# Test background jobs, jobs and fg in an interactive shell (dash -i and bash -i)
# running in a pseudo-terminal, as a user at a terminal would type them.
import os, pty, time, select
S = "/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo--claude-worktrees-authored-decks/0d3ab5ce-8aa3-4420-b0eb-935ec077f401/scratchpad/decks/unix-shell-commands/"
lines = ["sleep 3 &", "echo prompt-is-back", "jobs", "fg", "echo fg-exit-status $?", "jobs", "echo jobs-exit-status $?", "exit"]
def session(argv, env):
    pid, fd = pty.fork()
    if pid == 0:
        os.execvpe(argv[0], argv, env)
    out = b""
    def drain(t):
        nonlocal out
        end = time.time() + t
        while time.time() < end:
            r, _, _ = select.select([fd], [], [], 0.1)
            if r:
                try:
                    out += os.read(fd, 4096)
                except OSError:
                    return
    drain(1)
    for l in lines:
        os.write(fd, (l + "\n").encode())
        drain(4 if l == "fg" else 0.7)
    os.waitpid(pid, 0)
    return out.decode("utf-8", "replace").replace("\r", "")
env = {"PATH": os.environ["PATH"], "HOME": S + "work-pty", "TERM": "dumb", "PS1": "$ ", "LC_ALL": "C.UTF-8", "ENV": "/dev/null"}
os.makedirs(S + "work-pty", exist_ok=True)
with open(S + "jobs-pty-output.txt", "w") as f:
    for argv in (["dash", "-i"], ["bash", "--norc", "--noprofile", "-i"]):
        f.write(f"########## {' '.join(argv)} (in a pseudo-terminal)\n" + session(argv, env) + "\n")
print(open(S + "jobs-pty-output.txt").read())
```

**Output of jobs-pty.py (jobs-pty-output.txt)** (Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory)

```
########## dash -i (in a pseudo-terminal)
$ sleep 3 &
$ echo prompt-is-back
prompt-is-back
$ jobs
[1] + Running                    sleep 3
$ fg
sleep 3
$ echo fg-exit-status $?
fg-exit-status 0
$ jobs
$ echo jobs-exit-status $?
jobs-exit-status 0
$ exit

########## bash --norc --noprofile -i (in a pseudo-terminal)
$ sleep 3 &
[1] 2253903
$ echo prompt-is-back
prompt-is-back
$ jobs
[1]+  Running                    sleep 3 &
$ fg
sleep 3
$ echo fg-exit-status $?
fg-exit-status 0
$ jobs
$ echo jobs-exit-status $?
jobs-exit-status 0
$ exit
exit
```

**fetch_posix.py: download the POSIX.1-2024 utility pages and chapter 2 and convert them to text (tar.html answered 404: tar is not in POSIX.1-2024)** (The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>)

```
# Download the POSIX.1-2024 (The Open Group Base Specifications Issue 8) pages
# of the utilities and shell sections the deck uses, and convert them to text.
import urllib.request, time, re, os, html as H
S = "/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo--claude-worktrees-authored-decks/0d3ab5ce-8aa3-4420-b0eb-935ec077f401/scratchpad/decks/unix-shell-commands/posix/"
os.makedirs(S, exist_ok=True)
BASE = "https://pubs.opengroup.org/onlinepubs/9799919799/"
UA = {"User-Agent": "solid-memo deck research (https://github.com/antwika/solid-memo)"}
pages = ["utilities/" + u + ".html" for u in
         "cd pwd ls mkdir rmdir rm cp mv touch ln cat head tail wc diff sort grep find chmod chown ps kill jobs fg man df du tee tar pax".split()]
pages += ["utilities/V3_chap02.html", "frontmatter/notices.html", "help/codes.html"]
def text(raw):
    raw = re.sub(r"(?is)<(script|style).*?</\1>", "", raw)
    raw = re.sub(r"(?i)<br\s*/?>|</p>|</pre>|</h\d>|</dt>|</dd>|</li>|</tr>", "\n", raw)
    t = H.unescape(re.sub(r"<[^>]+>", "", raw))
    return re.sub(r"[ \t]+", " ", t)
for p in pages:
    name = p.replace("/", "_")
    try:
        raw = urllib.request.urlopen(urllib.request.Request(BASE + p, headers=UA), timeout=60).read().decode("utf-8", "replace")
        open(S + name, "w").write(raw)
        open(S + name.replace(".html", ".txt"), "w").write(text(raw))
        print("ok", p, len(raw))
    except Exception as e:
        print("FAIL", p, e)
    time.sleep(0.5)
```

**px.py: print the non-blank lines after each match of a pattern in a converted page (used with the command lines listed below)** (The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>)

```
# px.py <dir> <file-stem> <regex> [lines]: print the non-blank lines after each match
# of <regex> in <dir>/<file-stem>.txt (a converted manual or specification page).
import re, sys
S = "/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo--claude-worktrees-authored-decks/0d3ab5ce-8aa3-4420-b0eb-935ec077f401/scratchpad/decks/unix-shell-commands/"
d, stem, pat = sys.argv[1], sys.argv[2], sys.argv[3]
n = int(sys.argv[4]) if len(sys.argv) > 4 else 6
lines = [l.strip() for l in open(f"{S}{d}/{stem}.txt", encoding="utf-8", errors="replace") if l.strip()]
for i, l in enumerate(lines):
    if re.search(pat, l):
        print(f"== {stem}:{i}: " + " | ".join(lines[i:i + n]))
```

**posix-opts.py: print the POSIX passages cited in the evidence** (The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>)

```
# Print the POSIX.1-2024 passages cited in the evidence (run with: python3 posix-opts.py)
import re
D = "/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo--claude-worktrees-authored-decks/0d3ab5ce-8aa3-4420-b0eb-935ec077f401/scratchpad/decks/unix-shell-commands/posix/"
checks = [
    ("cd", r"^If no directory operand is given and the HOME", 2), ("cd", r"^When a <hyphen-minus> is used as the operand", 3),
    ("pwd", r"^The pwd utility shall write", 2),
    ("ls", r"^-a$", 3), ("ls", r"^-A$", 3), ("ls", r"^-l$", 3), ("ls", r"^-t$", 4),
    ("mkdir", r"^-p$", 4), ("rmdir", r"^The rmdir utility shall remove", 2),
    ("rm", r"^-R$", 3), ("rm", r"^-r$", 2), ("rm", r"^-f$", 3), ("rm", r"^-i$", 2),
    ("cp", r"^-R$", 3), ("cp", r"^-r$", 3),
    ("mv", r"^In the first synopsis form", 3), ("touch", r"^The touch utility shall change", 3), ("touch", r"^If a file at path", 2),
    ("ln", r"^-s$", 2), ("cat", r"^The cat utility shall read", 2),
    ("head", r"^-n number$", 3), ("head", r"^If no options are specified", 2), ("tail", r"^-n number$", 2), ("tail", r"^-f$", 4),
    ("wc", r"^-l$", 2), ("diff", r"^The diff utility shall compare", 2), ("sort", r"^The sort utility shall perform", 2),
    ("grep", r"^-i$", 3), ("grep", r"^-v$", 2), ("grep", r"^-n$", 2), ("grep", r"^-c$", 2),
    ("find", r"^-name pattern$", 3), ("find", r"^-type c$", 3),
    ("chmod", r"^The who symbols", 4), ("chmod", r"^The perm symbols", 3), ("chmod", r"0644|644", 2), ("chmod", r"^-R$", 2),
    ("chown", r"^The chown utility shall set", 3), ("chown", r"appropriate privileges", 2),
    ("ps", r"^-e$", 2), ("ps", r"^-f$", 2), ("kill", r"^If no signal is specified", 2), ("kill", r"^9 *KILL|^KILL$", 3), ("kill", r"^-signal_number", 3),
    ("jobs", r"^The jobs utility shall display", 2), ("fg", r"^If job control is enabled", 4), ("fg", r"^job_id$", 3),
    ("man", r"^The man utility shall write", 2),
    ("df", r"^-k$", 2), ("df", r"^-P$", 2), ("du", r"^-s$", 2), ("du", r"^-k$", 2),
    ("tee", r"^The tee utility shall copy", 2),
]
for util, pat, n in checks:
    lines = [l.strip() for l in open(f"{D}utilities_{util}.txt", encoding="utf-8") if l.strip()]
    hits = [i for i, l in enumerate(lines) if re.search(pat, l)]
    for i in hits[:2]:
        print(f"[{util} {pat}] " + " | ".join(lines[i:i + n]))
    if not hits:
        print(f"[{util} {pat}] NOT FOUND")
```

**more-opts.py: print further passages cited for the notes (POSIX <signal.h>, tail, grep, cd, mkdir, tee, ln, mv, ls, find; GNU, iputils, curl, scp and tar pages)** (The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>)

```
# Print further passages cited in the notes' evidence (run with: python3 more-opts.py)
import re, html as H
S = "/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo--claude-worktrees-authored-decks/0d3ab5ce-8aa3-4420-b0eb-935ec077f401/scratchpad/decks/unix-shell-commands/"
raw = open(S + "posix/basedefs_signal.h.html", encoding="utf-8").read()
open(S + "posix/basedefs_signal.h.txt", "w").write(re.sub(r"[ \t]+", " ", H.unescape(re.sub(r"<[^>]+>", "\n", raw))))
checks = [
    ("posix/basedefs_signal.h", r"SIGKILL", 4), ("posix/basedefs_signal.h", r"cannot be caught or ignored", 1),
    ("posix/utilities_tail", r"If neither -c nor -n|-n 10", 2),
    ("posix/utilities_grep", r"^-E$", 3), ("posix/utilities_grep", r"basic regular expression", 2),
    ("posix/utilities_cd", r"dot-dot", 2),
    ("posix/utilities_mkdir", r"^-p$", 8),
    ("posix/utilities_tee", r"^-a$", 2),
    ("posix/utilities_ln", r"^ln \[-fs\]|^ln -s|source_file target_file", 2),
    ("posix/utilities_mv", r"^In the second synopsis form", 3),
    ("posix/utilities_ls", r"^-A$", 2),
    ("posix/utilities_find", r"^-type c$|^-type", 4),
    ("docs/coreutils", r"^‘-r’$", 4),
    ("docs/ping", r"^-c count", 4), ("docs/ping", r"until|interrupted|SIGINT", 2),
    ("docs/curl-manpage", r"^-o, --output <file>$", 3), ("docs/curl-manpage", r"stdout|standard output", 2),
    ("docs/scp", r"colon|':'", 2),
    ("docs/tar", r"^8\.3\.7 GNU tar and POSIX tar", 2),
]
for f, pat, n in checks:
    lines = [l.strip() for l in open(S + f + ".txt", encoding="utf-8", errors="replace") if l.strip()]
    hits = [i for i, l in enumerate(lines) if re.search(pat, l)]
    for i in hits[:2]:
        print(f"[{f} {pat}] " + " | ".join(lines[i:i + n])[:600])
    if not hits:
        print(f"[{f} {pat}] NOT FOUND")
```

**fetch_more.py: download the GNU manuals, the curl, OpenSSH and iputils manual pages, the licence pages and the Swedish translations (the findutils manual URL and two POSIX front-matter URLs answered 404 and were not used)** (GNU Coreutils manual (for version 9.12))

```
# Download the other verification sources (manuals, man pages, translations,
# licence pages) and convert the HTML ones to text.
import urllib.request, time, re, os, html as H
S = "/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo--claude-worktrees-authored-decks/0d3ab5ce-8aa3-4420-b0eb-935ec077f401/scratchpad/decks/unix-shell-commands/docs/"
os.makedirs(S, exist_ok=True)
UA = {"User-Agent": "solid-memo deck research (https://github.com/antwika/solid-memo)"}
urls = {
    "coreutils": "https://www.gnu.org/software/coreutils/manual/coreutils.html",
    "grep": "https://www.gnu.org/software/grep/manual/grep.html",
    "tar": "https://www.gnu.org/software/tar/manual/tar.html",
    "bash": "https://www.gnu.org/software/bash/manual/bash.html",
    "findutils": "https://www.gnu.org/software/findutils/manual/html_mono/find.html",
    "curl-manpage": "https://curl.se/docs/manpage.html",
    "curl-copyright": "https://curl.se/docs/copyright.html",
    "ssh": "https://man.openbsd.org/ssh.1",
    "scp": "https://man.openbsd.org/scp.1",
    "ping": "https://man7.org/linux/man-pages/man8/ping.8.html",
    "iputils-license": "https://raw.githubusercontent.com/iputils/iputils/master/LICENSE",
    "openssh-licence": "https://raw.githubusercontent.com/openssh/openssh-portable/master/LICENCE",
    "posix-index": "https://pubs.opengroup.org/onlinepubs/9799919799/",
    "posix-title": "https://pubs.opengroup.org/onlinepubs/9799919799/frontmatter/title.html",
    "posix-copyright": "https://pubs.opengroup.org/onlinepubs/9799919799/frontmatter/copyright.html",
    "fdl": "https://www.gnu.org/licenses/fdl-1.3.txt",
    "coreutils-sv-po": "https://translationproject.org/latest/coreutils/sv.po",
    "grep-sv-po": "https://translationproject.org/latest/grep/sv.po",
    "tar-sv-po": "https://translationproject.org/latest/tar/sv.po",
    "findutils-sv-po": "https://translationproject.org/latest/findutils/sv.po",
    "bash-sv-po": "https://translationproject.org/latest/bash/sv.po",
}
def text(raw):
    raw = re.sub(r"(?is)<(script|style).*?</\1>", "", raw)
    raw = re.sub(r"(?i)<br\s*/?>|</p>|</pre>|</h\d>|</dt>|</dd>|</li>|</tr>|</div>", "\n", raw)
    t = H.unescape(re.sub(r"<[^>]+>", "", raw))
    return re.sub(r"[ \t]+", " ", t)
for k, u in urls.items():
    try:
        raw = urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=90).read().decode("utf-8", "replace")
        ext = ".po" if u.endswith(".po") else ".raw"
        open(S + k + ext, "w").write(raw)
        open(S + k + ".txt", "w").write(text(raw) if "<html" in raw[:2000].lower() or "<!doctype" in raw[:200].lower() else raw)
        print("ok", k, len(raw))
    except Exception as e:
        print("FAIL", k, u, e)
    time.sleep(0.5)
```

**lic.py: print the licence statements and versions of the downloaded sources** (GNU Coreutils manual (for version 9.12))

```
# Print the licence statements and versions of the downloaded verification sources.
import re
D = "/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo--claude-worktrees-authored-decks/0d3ab5ce-8aa3-4420-b0eb-935ec077f401/scratchpad/decks/unix-shell-commands/docs/"
def show(k, pat, n=400):
    s = re.sub(r"\s+", " ", open(D + k + ".txt", encoding="utf-8", errors="replace").read())
    for m in list(re.finditer(pat, s))[:2]:
        print(f"[{k}] ...{s[max(0, m.start() - 60):m.start() + n]}...")
for k in ["coreutils", "grep", "tar", "bash"]:
    show(k, r"This manual documents version|This manual is for|Copyright ©", 260)
    show(k, r"Permission is granted to copy", 330)
show("curl-copyright", r"COPYRIGHT AND PERMISSION NOTICE|Permission to use", 400)
show("curl-manpage", r"This is the curl man page|curl \d+\.\d+\.\d+", 120)
show("ssh", r"OpenBSD|\$Mdocdate", 120)
show("ping", r"COLOPHON|This page is part", 500)
show("iputils-license", r".", 300)
show("openssh-licence", r"ssh.1|manual|Tatu Ylonen", 400)
for k in ["coreutils-sv-po", "grep-sv-po", "tar-sv-po", "findutils-sv-po", "bash-sv-po"]:
    s = open(D + k + ".txt", encoding="utf-8").read()
    print(k, re.sub(r"\s+", " ", s[:700]))
```

**gnu-opts.py: print the passages of the GNU manuals and the man pages cited in the evidence** (GNU Coreutils manual (for version 9.12))

```
# Print the passages of the GNU manuals and man pages cited in the evidence (run with: python3 gnu-opts.py)
import re
D = "/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo--claude-worktrees-authored-decks/0d3ab5ce-8aa3-4420-b0eb-935ec077f401/scratchpad/decks/unix-shell-commands/docs/"
checks = [
    ("coreutils", r"^‘-h’$|^-h$", 4), ("coreutils", r"^‘--human-readable’", 3),
    ("coreutils", r"^‘-s’$", 3), ("coreutils", r"^‘--summarize’", 3),
    ("coreutils", r"^‘-R’$", 3), ("coreutils", r"^‘--recursive’$", 3),
    ("coreutils", r"^‘--almost-all’", 3), ("coreutils", r"^‘--all’", 3),
    ("coreutils", r"^‘--follow\[=how\]’", 4),
    ("coreutils", r"^‘--lines=\[-\]num’|^‘--lines=num’", 3),
    ("coreutils", r"^‘--symbolic’", 3),
    ("coreutils", r"^‘--parents’", 3),
    ("grep", r"^-r$", 4), ("grep", r"^--recursive$", 4),
    ("tar", r"^‘--gzip’", 4), ("tar", r"recognize the compression|automatically detect|compression program automatically", 3),
    ("tar", r"^‘--create’$", 2), ("tar", r"^‘--extract’$", 2), ("tar", r"^‘--list’$", 2), ("tar", r"^‘--file=archive’$", 2),
    ("tar", r"POSIX|pax", 1),
    ("bash", r"^Redirecting Standard Output and Standard Error", 8),
    ("bash", r"^Tilde Expansion", 6),
    ("bash", r"^cd$|^cd ¶", 8),
    ("curl-manpage", r"^-O, --remote-name", 4),
    ("ssh", r"^ssh \[-46", 3), ("ssh", r"connects and logs into the specified destination", 3),
    ("scp", r"copies files between hosts", 3), ("scp", r"scp://\[user@\]host|\[user@\]host:\[path\]", 2),
    ("ping", r"^-c count", 3),
]
for k, pat, n in checks:
    lines = [l.strip() for l in open(D + k + ".txt", encoding="utf-8", errors="replace") if l.strip()]
    hits = [i for i, l in enumerate(lines) if re.search(pat, l)]
    for i in hits[:2]:
        print(f"[{k} {pat}] " + " | ".join(lines[i:i + n])[:700])
    if not hits:
        print(f"[{k} {pat}] NOT FOUND")
```

**po.py: print msgid => msgstr for the msgids of a Swedish translation that match a pattern** (Swedish translations (sv.po) of GNU coreutils, grep, tar, findutils and bash, latest versions at the Translation Project)

```
# po.py <package> <regex>...: print msgid => msgstr (first 220 chars each) for the
# msgids of docs/<package>-sv-po.po that match any regex (case-insensitive).
import re, sys
D = "/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo--claude-worktrees-authored-decks/0d3ab5ce-8aa3-4420-b0eb-935ec077f401/scratchpad/decks/unix-shell-commands/docs/"
s = open(D + sys.argv[1] + "-sv-po.po", encoding="utf-8").read()
entries = re.findall(r'msgid ((?:".*"\n)+)msgstr ((?:".*"\n)+)', s)
def j(x): return "".join(re.findall(r'"(.*)"', x)).replace("\\n", " ")
for pat in sys.argv[2:]:
    hits = [(a, b) for a, b in ((j(a), j(b)) for a, b in entries) if re.search(pat, a, re.I)]
    for a, b in hits[:4]:
        print(f"[{pat}] {a[:220]!r} => {b[:220]!r}")
```

**All command lines run during research, in order, verbatim except that the scratch directory is abbreviated S and S/px.py D** (Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory)

```
# Command lines run during research, in order. S stands for the scratch directory
# /tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo--claude-worktrees-authored-decks/0d3ab5ce-8aa3-4420-b0eb-935ec077f401/scratchpad/decks/unix-shell-commands
# and D for S/px.py (each line below was one separate command).
python3 S/env.py
python3 S/env2.py
python3 S/fetch_posix.py
grep -n -A6 "^SYNOPSIS" S/posix/utilities_grep.txt S/posix/utilities_kill.txt S/posix/utilities_df.txt S/posix/utilities_du.txt S/posix/utilities_ps.txt S/posix/utilities_cp.txt S/posix/utilities_head.txt
python3 D posix utilities_kill "^SYNOPSIS" 8
python3 S/fetch_more.py
cat S/docs/posix-index.raw; grep -o -i '[^.]*copyright[^.]*\.' S/posix/utilities_ls.txt | head
tail -c 2500 S/posix/utilities_ls.html
curl -s -A "solid-memo deck research (https://github.com/antwika/solid-memo)" -o S/posix/mindex.html https://pubs.opengroup.org/onlinepubs/9799919799/mindex.html
python3 S/lic.py
python3 S/po.py coreutils "do not ignore entries starting" "^Print the full filename of the current working" "use a long listing" "sort by time, newest first" "make parent directories as needed" "Remove the DIRECTORY\(ies\), if they are empty" "remove directories and their contents recursively" "copy directories recursively" "Rename SOURCE to DEST" "Update the access and modification times" "make symbolic links instead" "^Concatenate FILE" "Print the first 10 lines" "Print the last 10 lines" "output appended data as the file grows" "print the newline counts" "Write sorted concatenation" "Change the mode of each FILE" "Change the owner and/or group" "Copy standard input to each FILE" "print sizes in human readable" "display only a total for each" "Show information about the file system" "List information about the FILEs"
python3 S/po.py grep "ignore case distinctions" "select non-matching lines" "print line number with output" "print only a count of selected" "Search for PATTERNS in each FILE" "--recursive"
python3 S/po.py tar "^create a new archive" "^extract files from an archive" "^list the contents of an archive" "filter the archive through gzip"
python3 S/po.py bash "^Move job to the foreground" "^Display status of jobs" "^Change the shell working directory" "no job control" "^Print the name of the current working directory" "Send a signal to a job" "HOME shell variable" "OLDPWD"
python3 S/sc-run.py    # first run (see Quality control round 0)
python3 S/jobs-pty.py
python3 S/sc-run.py    # second run
diff S/run1-dash-default.txt S/run2-bash-gnu.txt
python3 S/posix-opts.py
python3 D posix utilities_cd "hyphen-minus" 4
python3 D posix utilities_cp "^-r" 3
python3 D posix utilities_touch "does not exist" 2
python3 D posix utilities_head "^-n" 3
python3 D posix utilities_tail "^-n" 3
python3 D posix utilities_find "^-name" 3
python3 D posix utilities_find "^-type" 3
python3 D posix utilities_chmod "umask|file mode creation mask" 3
python3 D posix utilities_chmod "octal|absolute mode|^0644|^644|S_IRUSR" 3
python3 D posix utilities_kill "SIGTERM" 2
python3 D posix utilities_kill "^9|KILL" 2
python3 D posix utilities_jobs "shall display the status|^The jobs utility" 2
python3 D posix utilities_ps "^\[XSI\]" 3
grep -n -i "\-r\b" S/posix/utilities_cp.txt | head
grep -n -i -B1 -A3 "^-r\b\|rm -r\|-R. option\|recursive" S/posix/utilities_grep.txt | head -20
sed -n 558,570p S/posix/utilities_cp.txt
grep -c "" S/posix/utilities_grep.txt
grep -n "recurs" S/posix/utilities_grep.txt
python3 D posix utilities_V3_chap02 "^2\.7\.2 Redirecting Output$" 4
python3 D posix utilities_V3_chap02 "^2\.7\.3 Appending" 3
python3 D posix utilities_V3_chap02 "^2\.7\.6 Duplicating an Output" 4
python3 D posix utilities_V3_chap02 "^2\.7\.1 Redirecting Input$" 3
python3 D posix utilities_V3_chap02 "^2\.9\.2 Pipelines" 4
python3 D posix utilities_V3_chap02 "^Asynchronous AND-OR Lists|^2\.9\.3\.1 Asynchronous" 4
python3 D posix utilities_V3_chap02 "^2\.6\.1 Tilde Expansion" 4
python3 D posix utilities_V3_chap02 "would be equivalent to|first be redirected|order in which redirections" 3
python3 D posix utilities_V3_chap02 "^Output redirection using the '>' format" 3
python3 D posix utilities_V3_chap02 "^2\.7 Redirection$" 6
python3 D posix utilities_V3_chap02 "evaluated from beginning to end|order of redirection|left to right|beginning to end" 2
sed -n '/^2.7 Redirection/,/^2.7.1 Redirecting Input/p' S/posix/utilities_V3_chap02.txt | grep -v '^\s*$' | head -40; sed -n '/^2.7.2 Redirecting Output/,/^2.7.3/p' S/posix/utilities_V3_chap02.txt | grep -v '^\s*$'
grep -n -i "If more than one redirection operator\|evaluated from left\|shall be evaluated\|truncated to zero length\|If the file does not exist, it shall be created" S/posix/utilities_V3_chap02.txt | head; grep -n -A3 "2>&1" S/posix/utilities_V3_chap02.txt | head -20
sed -n '1824,1830p;918,945p;1008,1020p' S/posix/utilities_V3_chap02.txt | grep -v '^\s*$'
python3 D posix utilities_V3_chap02 "^2\.7\.2 Redirecting Output$" 12
python3 D posix utilities_V3_chap02 "^2\.7\.6 Duplicating an Output" 9
python3 D posix utilities_V3_chap02 "^2\.7\.3 Appending" 7
python3 D posix utilities_V3_chap02 "truncated|shall be truncated|the file shall be opened|In all other cases" 3 | head -8
python3 D posix utilities_V3_chap02 "^In all other cases \(noclobber" 4
python3 S/gnu-opts.py
python3 D docs coreutils "^‘-h’" 4 | head -6
python3 D docs grep "^-r$|^‘-r’|-r$" 3 | head -3
python3 D docs tar "^‘-z’|^‘--gzip’|^-z$" 4 | head -3
python3 D docs tar "recognize|recognizes|detect the compression|Reading compressed archive" 3 | head -5
python3 D docs tar "8\.3\.7 GNU tar and POSIX tar" 6 | tail -1
python3 D docs tar "^Reading compressed archive is even simpler" 4
python3 D docs tar "^-c$|^--create$" 3 | head -2
python3 D docs tar "^-x$|^-t$" 3 | head -3
python3 D docs tar "^-f archive-name|^-f archive$|^--file=archive-name" 3 | head -2
python3 D docs grep "^-R$|^‘-r’|^-r ¶|--recursive" 3 | head -4
python3 D docs bash "&>word" 4 | head -3
python3 D docs ssh "^ssh \[|connects and logs into" 3 | head -3
python3 D docs bash "^jobs ¶|^fg ¶" 5
python3 D docs bash "^&>word$" 8 | head -2
python3 D docs bash "This text is a brief description|This is Edition|Permission is granted to copy" 3 | head -3
python3 D docs bash "^If the characters following the tilde|^If this login name is the null string" 3 | head -2
python3 D docs ping "^-c count" 2
python3 D docs ssh "Mdocdate|OpenBSD-current|OpenBSD 7" 1 | head -3
python3 D docs bash "^Copyright ©" 6 | head -3
grep -n -i -o ".\{0,200\}Free Documentation License.\{0,200\}" S/docs/bash.raw | head -4    # refused by the system grep (pattern too complex)
python3 -c "import re;s=open('S/docs/bash.raw').read()
for m in list(re.finditer('Free Documentation License',s))[:3]: print(repr(re.sub(r'<[^>]+>','',s[m.start()-400:m.start()+150])));print()"
python3 S/po.py coreutils "home directory" "^  -i, --interactive          prompt before every removal" "mode of each FILE" "standard error" "executable" "process ID|PID"; python3 S/po.py bash "background" "^Redirection" "standard error|stderr" "home directory"; python3 S/po.py findutils "^paths must precede|directory|-type"
python3 S/sc-run.py    # third run: interrupted (www.gnu.org did not answer; see Quality control)
python3 S/sc-run.py    # fourth and final run, after switching the curl URL; its outputs are reproduced above
curl -s -A "solid-memo deck research (https://github.com/antwika/solid-memo)" -o S/posix/basedefs_signal.h.html https://pubs.opengroup.org/onlinepubs/9799919799/basedefs/signal.h.html
python3 S/more-opts.py
grep -B3 "Copy directories recursively" S/docs/coreutils.txt | grep -v '^\s*$'; grep -B3 -A2 "Run in the background\|ping will run" S/docs/ping.txt | head; grep -i -B2 -A4 "If ping does not receive\|ping will\b" S/docs/ping.txt | head -20
python3 -c "
s=open('S/docs/coreutils.txt').read()
i=s.find('Copy directories recursively'); print(repr(s[i-150:i+40]))"
dpkg-query -W dash bash coreutils coreutils-from-uutils rust-coreutils procps iputils-ping openssh-client diffutils
python3 D posix utilities_rm "^NAME$|-R option is not specified" 3
python3 D posix utilities_cp "^NAME$|^In the first synopsis form" 3
python3 D posix utilities_mkdir "^NAME$|^The mkdir utility shall create" 2
python3 D posix utilities_touch "^If neither the -t|current time" 2
python3 D posix utilities_cd "^For each dot-dot component" 6
python3 D posix utilities_rm "is of type directory" 3
python3 D posix utilities_cp "^The first synopsis form" 3
```

**Quality-control round 3: installed versions of the packages that provide the GNU binaries and the other tools ('coreutils' on Ubuntu 26.04 is a transitional package for uutils; GNU coreutils is the package gnu-coreutils)** (Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory)

```
dpkg-query -W gnu-coreutils findutils grep tar curl gzip coreutils

# output
coreutils	9.5-1ubuntu2+0.0.0~ubuntu25
curl	8.18.0-1ubuntu2.7
findutils	4.10.0-3build2
gnu-coreutils	9.7-3ubuntu2.1
grep	3.12-1
gzip	1.14-1~exp2ubuntu1.1
tar	1.35+dfsg-4ubuntu0.4
```

**Quality-control round 1: qc1-tests.sh, re-tests of the reviewers' findings (run as: dash qc1-tests.sh S/qc1/work), with its output** (Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory)

```
# QC round 1 re-tests for the review findings (ln -s relative target, grep with one file,
# df with and without -a). Usage: sh qc1-tests.sh <work-dir>
set -u
W=$1
rm -rf "$W"; mkdir -p "$W"; cd "$W" || exit 1
export LC_ALL=C.UTF-8
echo '## ln -s: a relative target is resolved from the link directory'
mkdir sub; echo x > t.txt
ln -s t.txt sub/l; echo "\$ cat sub/l"; cat sub/l; echo "[exit $?]"
ln -s ../t.txt sub/l2; echo "\$ cat sub/l2"; cat sub/l2; echo "[exit $?]"
ln -s does-not-exist dangling; echo "\$ ls -l dangling | cut -c1"; ls -l dangling | cut -c1; echo "[exit $?]"
echo '## grep -r versus find -exec grep, one file in the tree'
mkdir src; echo TODO > src/a.c
echo '$ grep -r TODO src'; grep -r TODO src
echo '$ find src -type f -exec grep TODO {} +'; find src -type f -exec grep TODO {} +
echo '$ find src -type f -exec grep TODO /dev/null {} +'; find src -type f -exec grep TODO /dev/null {} +
echo '## find . -type d includes .'
mkdir -p d/sub/deep; cd d; find . -type d; cd ..
echo '## df -h versus df -ah (line counts)'
echo "df -h: $(df -h | wc -l) lines; df -ah: $(df -ah | wc -l) lines"

# output (dash 0.5.12, default PATH)
## ln -s: a relative target is resolved from the link directory
$ cat sub/l
cat: sub/l: No such file or directory
[exit 1]
$ cat sub/l2
x
[exit 0]
$ ls -l dangling | cut -c1
l
[exit 0]
## grep -r versus find -exec grep, one file in the tree
$ grep -r TODO src
src/a.c:TODO
$ find src -type f -exec grep TODO {} +
TODO
$ find src -type f -exec grep TODO /dev/null {} +
src/a.c:TODO
## find . -type d includes .
.
./sub
./sub/deep
## df -h versus df -ah (line counts)
df -h: 22 lines; df -ah: 45 lines
```

**Quality-control round 3: output of the po.py command lines listed above (re-run on the same downloaded sv.po files: rerun-po.sh), the record of the Swedish terms** (Swedish translations (sv.po) of GNU coreutils, grep, tar, findutils and bash, latest versions at the Translation Project)

```
S=S
python3 $S/po.py coreutils "do not ignore entries starting" "^Print the full filename of the current working" "use a long listing" "sort by time, newest first" "make parent directories as needed" "Remove the DIRECTORY\(ies\), if they are empty" "remove directories and their contents recursively" "copy directories recursively" "Rename SOURCE to DEST" "Update the access and modification times" "make symbolic links instead" "^Concatenate FILE" "Print the first 10 lines" "Print the last 10 lines" "output appended data as the file grows" "print the newline counts" "Write sorted concatenation" "Change the mode of each FILE" "Change the owner and/or group" "Copy standard input to each FILE" "print sizes in human readable" "display only a total for each" "Show information about the file system" "List information about the FILEs"
python3 $S/po.py grep "ignore case distinctions" "select non-matching lines" "print line number with output" "print only a count of selected" "Search for PATTERNS in each FILE" "--recursive"
python3 $S/po.py tar "^create a new archive" "^extract files from an archive" "^list the contents of an archive" "filter the archive through gzip"
python3 $S/po.py bash "^Move job to the foreground" "^Display status of jobs" "^Change the shell working directory" "no job control" "^Print the name of the current working directory" "Send a signal to a job" "HOME shell variable" "OLDPWD"
python3 $S/po.py coreutils "home directory" "^  -i, --interactive          prompt before every removal" "mode of each FILE" "standard error" "executable" "process ID|PID"
python3 $S/po.py bash "background" "^Redirection" "standard error|stderr" "home directory"
python3 $S/po.py findutils "^paths must precede|directory|-type"

# output
[do not ignore entries starting] '  -a, --all          do not ignore entries starting with . ' => '  -a, --all          bortse inte från poster som inleds med . '
[^Print the full filename of the current working] 'Print the full filename of the current working directory.  ' => 'Skriv ut hela filnamnet på aktuell katalog.  '
[use a long listing] '  -l          use a long listing format ' => '  -l          använd långt listningsformat '
[sort by time, newest first] '  -t          sort by time, newest first; see --time ' => '  -t          sortera efter tid, nyast först; se --time '
[make parent directories as needed] '  -p, --parents          no error if existing, make parent directories as needed,          with their file modes unaffected by any -m option ' => '  -p, --parents          inget fel om den finns, skapa föräldrakataloger vid behov,          med sina filrättigheter opåverkade av eventuell -m-flagga '
[Remove the DIRECTORY\(ies\), if they are empty] 'Remove the DIRECTORY(ies), if they are empty.  ' => 'Ta bort KATALOG(er), om de är tomma.  '
[remove directories and their contents recursively] '  -r, -R, --recursive          remove directories and their contents recursively ' => '  -r, -R, --recursive          ta bort kataloger och deras innehåll rekursivt '
[copy directories recursively] '  -R, -r, --recursive          copy directories recursively ' => '  -R, -r, --recursive          kopiera kataloger rekursivt '
[Rename SOURCE to DEST] 'Rename SOURCE to DEST, or move SOURCE(s) to DIRECTORY. ' => 'Byt namn på KÄLLA till DEST eller flytta KÄLLor till KATALOG. '
[Update the access and modification times] 'Update the access and modification times of each FILE to the current time.  A FILE argument that does not exist is created empty, unless -c or -h is supplied.  A FILE argument string of - is handled specially and causes ' => 'Uppdatera åtkomst- och ändringstiderna på varje fil till aktuell tid.  Ett FIL-argument som inte finns skapas tomt, om inte -c eller -h anges.  En - som FIL-argumentsträng hanteras speciellt och får touch att ändra tiden'
[make symbolic links instead] '  -s, --symbolic-link          make symbolic links instead of copying ' => '  -s, --symbolic-link          gör symboliska länkar istället för att kopiera '
[make symbolic links instead] '  -s, --symbolic          make symbolic links instead of hard links ' => '  -s, --symbolic          gör symboliska länkar istället för hårda länkar '
[^Concatenate FILE] 'Concatenate FILE(s) to standard output. ' => 'Sammanfoga FIL(er) till standard ut. '
[output appended data as the file grows] "  -f, --follow[={name|descriptor}]          output appended data as the file grows;          an absent option argument means 'descriptor' " => '  -f, --follow[={namn|filidentifierare}]          skriv ut nya rader i takt med att filen växer;          ett utelämnat argument betyder ”filidentifierare” '
[print the newline counts] '  -l, --lines          print the newline counts ' => '  -l, --lines          skriv antalet rader '
[Write sorted concatenation] 'Write sorted concatenation of all FILE(s) to standard output. ' => 'Skriv en sorterad sammanfogning av alla FIL(er) till standard ut. '
[Change the mode of each FILE] 'Change the mode of each FILE to MODE. With --reference, change the mode of each FILE to that of RFILE.  ' => 'Ändra rättigheterna för varje FIL till RÄTTIGHET. Med --reference, ändra rättigheter för varje FIL till dem hos RFIL.  '
[Change the owner and/or group] 'Change the owner and/or group of each FILE to OWNER and/or GROUP. With --reference, change the owner and group of each FILE to those of RFILE.  ' => 'Ändra ägaren och/eller gruppen på varje FIL till ÄGARE och/eller GRUPP. Med --reference, ändra ägaren och gruppen för varje FIL till dem för RFIL.  '
[Copy standard input to each FILE] 'Copy standard input to each FILE, and also to standard output.  ' => 'Kopiera standard in till varje FIL, och även till standard ut.  '
[print sizes in human readable] '  -h, --human-readable          print sizes in human readable format (e.g., 1K 234M 2G) ' => '  -h, --human-readable          skriv storlekar i läsbart format (t.ex. 1K 234M 2G) '
[display only a total for each] '  -s, --summarize          display only a total for each argument ' => '  -s, --summarize          visa bara summan för varje argument '
[Show information about the file system] 'Show information about the file system on which each FILE resides, or all file systems by default. ' => 'Visa information om filsystemet där varje FIL ligger, eller annars alla filsystem. '
[List information about the FILEs] 'List information about the FILEs (the current directory by default). Sort entries alphabetically if none of -cftuvSUX nor --sort is specified. ' => 'Visa information om FILerna (aktuell katalog om inget anges).  Sortera posterna alfabetiskt om ingen av -cftuvSUX eller --sort anges. '
[ignore case distinctions] '  -e, --regexp=PATTERNS     use PATTERNS for matching   -f, --file=FILE           take PATTERNS from FILE   -i, --ignore-case         ignore case distinctions in patterns and data       --no-ignore-case      do not ignor' => '  -e, --regexp=MÖNSTER       använd MÖNSTER som ett reguljärt uttryck   -f, --file=FIL             ta MÖNSTER från FIL   -i, --ignore-case          skilj ej på gemener och versaler i mönster och data       --no-ignore-ca'
[select non-matching lines] ' Miscellaneous:   -s, --no-messages         suppress error messages   -v, --invert-match        select non-matching lines   -V, --version             display version information and exit       --help                displ' => ' Diverse:   -s, --no-messages         visa inga felmeddelanden   -v, --invert-match        välj rader utan träffar   -V, --version             visa versionsinformation och avsluta       --help                visa detta h'
[print line number with output] ' Output control:   -m, --max-count=NUM       stop after NUM selected lines   -b, --byte-offset         print the byte offset with output lines   -n, --line-number         print line number with output lines       --line-' => ' Kontroll av utmatning:   -m, --max-count=ANTAL     avsluta efter ANTAL träffar   -b, --byte-offset         skriv ut byte-offset med utmatningsrader   -n, --line-number         skriv ut radnummer med utmatningsrader     '
[print only a count of selected] '  -L, --files-without-match  print only names of FILEs with no selected lines   -l, --files-with-matches  print only names of FILEs with selected lines   -c, --count               print only a count of selected lines per' => '  -L, --files-without-match  skriv endast ut namn på FILer utan valda rader   -l, --files-with-matches  skriv endast ut namn på FILer med valda rader   -c, --count               skriv endast ut antalet valda rader per FI'
[Search for PATTERNS in each FILE] 'Search for PATTERNS in each FILE. ' => 'Sök efter MÖNSTER i varje FIL. '
[--recursive] "  -I                        equivalent to --binary-files=without-match   -d, --directories=ACTION  how to handle directories;                             ACTION is 'read', 'recurse', or 'skip'   -D, --devices=ACTION     " => '  -I                        samma som --binary-files=without-match   -d, --directories=ÅTGÄRD  hur kataloger ska hanteras;                             ÅTGÄRD är ”read”, ”recurse” eller ”skip”   -D, --devices=ÅTGÄRD      '
[^create a new archive] 'create a new archive' => 'skapa ett nytt arkiv'
[^extract files from an archive] 'extract files from an archive' => 'extrahera filer från arkivet'
[^list the contents of an archive] 'list the contents of an archive' => 'visa innehållet i arkivet'
[^Move job to the foreground] "Move job to the foreground.          Place the job identified by JOB_SPEC in the foreground, making it the     current job.  If JOB_SPEC is not present, the shell's notion of the     current job is used.          Exit St" => 'Flytta ett jobb till förgrunden.          Placera jobbet som identifieras av JOBBSPEC i förgrunden, och gör det     till det aktuella jobbet.  Om ingen JOBBSPEC finns används skalets     begrep om det aktuella jobbet.   '
[^Display status of jobs] 'Display status of jobs.          Lists the active jobs.  JOBSPEC restricts output to that job.     Without options, the status of all active jobs is displayed.          Options:       -l\\tlists process IDs in addition to' => 'Visa status på jobb.          Lista de aktiva jobben.  JOBBSPEC begränsar utdata till det jobbet.     Utan flaggor visas status på alla aktiva jobb.          Flaggor:       -l\\tlistar process-id:n utöver den normala info'
[^Change the shell working directory] 'Change the shell working directory.          Change the current directory to DIR.  The default DIR is the value of the     HOME shell variable. If DIR is \\"-\\", it is converted to $OLDPWD.          The variable CDPATH de' => 'Ändra skalets arbetskatalog.          Ändra den aktuella katalogen till KAT.  Standardvärde på KAT är värdet     på skalvariabeln HOME. Om KAT är ”-” konverteras den till $OLDPWD.          Variabeln CDPATH definierar sök'
[no job control] '%s: no job control' => '%s: ingen jobbstyrning'
[no job control] 'no job control' => 'ingen jobbstyrning'
[no job control] 'initialize_job_control: no job control in background' => 'initialize_job_control: ingen jobbstyrning i bakgrunden'
[no job control] 'no job control in this shell' => 'ingen jobbstyrning i detta skal'
[^Print the name of the current working directory] 'Print the name of the current working directory.          Options:       -L\\tprint the value of $PWD if it names the current working     \\t\\tdirectory       -P\\tprint the physical directory, without any symbolic links   ' => 'Skriv namnet på den aktuella arbetskatalogen.          Flaggor:       -L\\tskriv värdet på $PWD om det är namnet på den aktuella     \\t\\tarbetskatalogen       -P\\tskriv den fysiska katalogen, utan några symboliska länkar '
[Send a signal to a job] 'Send a signal to a job.          Send the processes identified by PID or JOBSPEC the signal named by     SIGSPEC or SIGNUM.  If neither SIGSPEC nor SIGNUM is present, then     SIGTERM is assumed.          Options:       ' => 'Skicka en signal till ett jobb.          Skicka processerna som identifieras av PID eller JOBBSPEC signalerna som     namnges av SIGSPEC eller SIGNUM.  Om varken SIGSPEC eller SIGNUM är     angivna antas SIGTERM.        '
[HOME shell variable] 'Change the shell working directory.          Change the current directory to DIR.  The default DIR is the value of the     HOME shell variable. If DIR is \\"-\\", it is converted to $OLDPWD.          The variable CDPATH de' => 'Ändra skalets arbetskatalog.          Ändra den aktuella katalogen till KAT.  Standardvärde på KAT är värdet     på skalvariabeln HOME. Om KAT är ”-” konverteras den till $OLDPWD.          Variabeln CDPATH definierar sök'
[OLDPWD] 'OLDPWD not set' => 'OLDPWD är inte satt'
[OLDPWD] 'Change the shell working directory.          Change the current directory to DIR.  The default DIR is the value of the     HOME shell variable. If DIR is \\"-\\", it is converted to $OLDPWD.          The variable CDPATH de' => 'Ändra skalets arbetskatalog.          Ändra den aktuella katalogen till KAT.  Standardvärde på KAT är värdet     på skalvariabeln HOME. Om KAT är ”-” konverteras den till $OLDPWD.          Variabeln CDPATH definierar sök'
[home directory] "  -b     omit the user's home directory and shell in long format " => '  -b     utelämna användarens hemkatalog och skal i det långa formatet '
[mode of each FILE] 'Change the mode of each FILE to MODE. With --reference, change the mode of each FILE to that of RFILE.  ' => 'Ändra rättigheterna för varje FIL till RÄTTIGHET. Med --reference, ändra rättigheter för varje FIL till dem hos RFIL.  '
[standard error] '      --debug          annotate the parsed date,          and warn about questionable usage to standard error ' => '      --debug          annotera det tolkade datumet,          och varna för tveksam användning till standard fel '
[standard error] "  status=LEVEL    The LEVEL of information to print to standard error;                   'none' suppresses everything but error messages,                   'noxfer' suppresses the final transfer statistics,              " => '  status=NIVÅ     NIVÅ av information som skall utelämnas från standard fel;                   ”none” utelämnar allt utom felmeddelanden,                   ”noxfer” utelämnar den avslutande överföringsstatistiken,       '
[standard error] " Sending a %s signal to a running 'dd' process makes it print I/O statistics to standard error and then resume copying.  Options are:  " => ' Att skicka en %s-signal till en körande ”dd”-process får den att skriva in-/utstatistik på standard fel, och sedan fortsätta kopiera.  Flaggorna är:  '
[standard error] '      --list-signal-handling          list non default signal handling to standard error ' => '      --list-signal-handling          lista icke-standardhantering av signaler till standard fel '
[process ID|PID] 'Usage: %s [-s SIGNAL | -SIGNAL] PID...   or:  %s -l [SIGNAL]...   or:  %s -t [SIGNAL]... ' => 'Användning: %s [-s SIGNAL | -SIGNAL] PID...    eller:   %s -l [SIGNAL]...    eller:   %s -t [SIGNAL]... '
[process ID|PID] " SIGNAL may be a signal name like 'HUP', or a signal number like '1', or the exit status of a process terminated by a signal. PID is an integer; if negative it identifies a process group. " => ' SIGNAL kan vara ett signalnamn som ”HUP” eller ett signalnummer som ”1”, eller en slutstatus från en process avslutad av en signal.  PID är ett heltal; om det är negativt identifierar det en processgrupp. '
[process ID|PID] '%s: invalid process id' => '%s: ogiltigt process-id'
[process ID|PID] 'no process ID specified' => 'inget process-ID angivet'
[background] '%s: job %d already in background' => '%s: jobb %d är redan i bakgrunden'
[background] 'initialize_job_control: no job control in background' => 'initialize_job_control: ingen jobbstyrning i bakgrunden'
[background] "Move jobs to the background.          Place the jobs identified by each JOB_SPEC in the background, as if they     had been started with `&'.  If JOB_SPEC is not present, the shell's notion     of the current job is used" => 'Flytta jobb till bakgrunden.          Placera jobben som identifieras av varje JOBBSPEC i bakgrunden som om de     hade startats med ”&”.  Om ingen JOBBSPEC finns används skalets begrepp     om det aktuella jobbet.      '
[background] "Resume job in foreground.          Equivalent to the JOB_SPEC argument to the `fg' command.  Resume a     stopped or background job.  JOB_SPEC can specify either a job name     or a job number.  Following JOB_SPEC with a" => 'Återuppta jobb i förgrunden.          Likvärdigt med JOBBSPEC-argumentet till kommandot ”fg”.  Återuppta     ett stoppat eller bakgrundsjobb.  JOBBSPEC kan ange antingen ett     jobbnamn eller ett jobbnummer.  Om JOBBSPE'
[^Redirection] 'redirection error: cannot duplicate fd' => 'omdirigeringsfel: det går inte att duplicera fb'
[standard error|stderr] "Select words from a list and execute commands.          The WORDS are expanded, generating a list of words.  The     set of expanded words is printed on the standard error, each     preceded by a number.  If `in WORDS' i" => "Välj ord från en lista och exekvera kommandon.          ORD expanderas och genererar en lista med ord.  Mängden av     expanderade ord skrivs på standard fel, vart och ett föregånget     av ett tal.  Om `in ORD' inte är "
[home directory] "Display the list of currently remembered directories.  Directories     find their way onto the list with the `pushd' command; you can get     back up through the list with the `popd' command.          Options:       -c\\t" => 'Visa listan av kataloger i minnet just nu.  Kataloger hamnar i listan     med kommandot ”pushd”.  Du kan komma tillbaka upp genom listan med     kommandot ”popd”.          Flaggor:       -c\\tnollställ katalogstacken geno'
[home directory] "Display directory stack.          Display the list of currently remembered directories.  Directories     find their way onto the list with the `pushd' command; you can get     back up through the list with the `popd' com" => 'Visa katalogstacken.          Visa listan av kataloger i minnet för närvarande.  Kataloger kommer     in på listan med kommandot ”pushd”.  Du kan komma tillbaka upp genom     listan med kommandot ”popd”.          Flaggor'
[^paths must precede|directory|-type] 'Failed to save working directory in order to run a command on %s' => 'Misslyckades att spara arbetskatalogen för att köra ett kommando på %s'
[^paths must precede|directory|-type] 'Failed to change directory to %s' => 'Misslyckades med att byta katalog to %s'
[^paths must precede|directory|-type] 'Failed to change directory' => 'Misslyckades med att byta katalog'
[^paths must precede|directory|-type] 'Symbolic link %s is part of a loop in the directory hierarchy; we have already visited the directory to which it points.' => 'Symboliska länken %s är en del av en slinga i kataloghierarkin; vi har redan besökt katalogen till vilken den pekar.'
```

**Quality-control round 3: output of lic.py (licence statements and versions of the downloaded sources), re-run on the same files** (GNU Coreutils manual (for version 9.12))

```
python3 S/lic.py

# output
[coreutils] ...: Introduction, Up: (dir) [Contents][Index] GNU Coreutils ¶ This manual documents version 9.12 of the GNU core utilities, including the standard programs for text and file manipulation. Copyright © 1994–2026 Free Software Foundation, Inc. Permission is granted to copy, distribute and/or modify this document under the t...
[coreutils] ...uding the standard programs for text and file manipulation. Copyright © 1994–2026 Free Software Foundation, Inc. Permission is granted to copy, distribute and/or modify this document under the terms of the GNU Free Documentation License, Version 1.3 or any later version published by the Free Software Foundation; with n...
[coreutils] ...ation. Copyright © 1994–2026 Free Software Foundation, Inc. Permission is granted to copy, distribute and/or modify this document under the terms of the GNU Free Documentation License, Version 1.3 or any later version published by the Free Software Foundation; with no Invariant Sections, with no Front-Cover Texts, and with no Back-Cover Texts. A copy of the license is included in the sec...
[coreutils] ...es just after the title page: Copyright (C) year your name. Permission is granted to copy, distribute and/or modify this document under the terms of the GNU Free Documentation License, Version 1.3 or any later version published by the Free Software Foundation; with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts. A copy of the license is included in the section entit...
[grep] ...prints lines that contain a match for one or more patterns. This manual is for version 3.12 of GNU Grep. This manual is for grep, a pattern matching engine. Copyright © 1999–2002, 2005, 2008–2025 Free Software Foundation, Inc. Permission is granted to copy, distribute and/or modify this document under the terms of the ...
[grep] ...more patterns. This manual is for version 3.12 of GNU Grep. This manual is for grep, a pattern matching engine. Copyright © 1999–2002, 2005, 2008–2025 Free Software Foundation, Inc. Permission is granted to copy, distribute and/or modify this document under the terms of the GNU Free Documentation License, Version 1.3 o...
[grep] ...© 1999–2002, 2005, 2008–2025 Free Software Foundation, Inc. Permission is granted to copy, distribute and/or modify this document under the terms of the GNU Free Documentation License, Version 1.3 or any later version published by the Free Software Foundation; with no Invariant Sections, with no Front-Cover Texts, and with no Back-Cover Texts. A copy of the license is included in the sec...
[grep] ...es just after the title page: Copyright (C) year your name. Permission is granted to copy, distribute and/or modify this document under the terms of the GNU Free Documentation License, Version 1.3 or any later version published by the Free Software Foundation; with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts. A copy of the license is included in the section entit...
[tar] ...tion, Up: (dir) [Contents][Index] GNU tar: an archiver tool This manual is for GNU tar (version 1.35.90, 11 June 2026), which creates and extracts files from archives. Copyright © 1992, 1994–1997, 1999–2001, 2003–2017, 2021–2026 Free Software Foundation, Inc. Permission is granted to copy, distribute and/or modify this...
[tar] ...June 2026), which creates and extracts files from archives. Copyright © 1992, 1994–1997, 1999–2001, 2003–2017, 2021–2026 Free Software Foundation, Inc. Permission is granted to copy, distribute and/or modify this document under the terms of the GNU Free Documentation License, Version 1.3 or any later version published ...
[tar] ...9–2001, 2003–2017, 2021–2026 Free Software Foundation, Inc. Permission is granted to copy, distribute and/or modify this document under the terms of the GNU Free Documentation License, Version 1.3 or any later version published by the Free Software Foundation; with the Invariant Sections being “GNU General Public License”, with the Front-Cover Texts being “A GNU Manual”, and with the Bac...
[tar] ...es just after the title page: Copyright (C) year your name. Permission is granted to copy, distribute and/or modify this document under the terms of the GNU Free Documentation License, Version 1.3 or any later version published by the Free Software Foundation; with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts. A copy of the license is included in the section entit...
[bash] ...U Free Documentation License ¶ Version 1.3, 3 November 2008 Copyright © 2000, 2001, 2002, 2007, 2008 Free Software Foundation, Inc. http://fsf.org/ Everyone is permitted to copy and distribute verbatim copies of this license document, but changing it is not allowed. PREAMBLE The purpose of this License is to make a man...
[bash] ...es just after the title page: Copyright (C) year your name. Permission is granted to copy, distribute and/or modify this document under the terms of the GNU Free Documentation License, Version 1.3 or any later version published by the Free Software Foundation; with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts. A copy of the license is included in the section entit...
[curl-copyright] ...k out our position on the curl name issue. The curl license COPYRIGHT AND PERMISSION NOTICE Copyright (c) 1996 - 2026, Daniel Stenberg, daniel@haxx.se, and many contributors, see the THANKS file. All rights reserved. Permission to use, copy, modify, and distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies. THE SOFTWARE IS PROVIDED "AS IS", WI...
[curl-copyright] ...any contributors, see the THANKS file. All rights reserved. Permission to use, copy, modify, and distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRI...
[curl-manpage] ...low pieces to be reused in the target filename. Starting in curl 8.21.0, the separate globbing parts can be named and referenced by their names. The case sensitive alphanumeric nam...
[curl-manpage] ...y with the --silent option. Version This man page describes curl 8.23.0. If you use a later version, chances are this man page does not fully document it. If you use an earlier ver...
[ssh] ... ssh(1) - OpenBSD manual pages OpenBSD manual page server Manual Page Search Parameters Search query: man apropos All Sections 1 -...
[ssh] ... ssh(1) - OpenBSD manual pages OpenBSD manual page server Manual Page Search Parameters Search query: man apropos All Sections 1 - General Commands 2 -...
[ping] ...ILS | BUGS | SEE ALSO | HISTORY | SECURITY | AVAILABILITY | COLOPHON PING(8) iputils PING(8) NAME top ping - send ICMP ECHO_REQUEST to network hosts SYNOPSIS top ping [-aAbBdCDfhHjLnOqrRUvV346] [-c count] [-e identifier] [-F flowlabel] [-i interval] [-I interface] [-l preload] [-m mark] [-M pmtudisc_option] [-N nodeinfo_option] [-w deadline] [-W timeout] [-p pattern] [-Q tos] [-s packetsize] [-S sndbuf] [-t ttl] [-T timestamp option] [hop...] {destination} DESCRIPTION top ping uses the ICMP protocol's mandatory ECHO_REQUEST datagram to elicit an ICMP ECH...
[ping] ...uid root. AVAILABILITY top ping is part of iputils package. COLOPHON top This page is part of the iputils (IP utilities) project. Information about the project can be found at ⟨http://www.skbuff.net/iputils/⟩. If you have a bug report for this manual page, send it to yoshfuji@skbuff.net, netdev@vger.kernel.org. This page was obtained from the project's upstream Git repository ⟨https://github.com/iputils/iputils.git⟩ on 2026-08-04. (At that time, the date of the most recent commit that was found in the repository was 2026-07-16.) If you discover any rende...
[iputils-license] ...arping: GPL-2.0-or-later clockdiff: BSD-3-Clause ping: BSD-3-Clause tracepath: GPL-2.0-or-later Files containing license texts are available in Documentation directory. ...
[iputils-license] ...arping: GPL-2.0-or-later clockdiff: BSD-3-Clause ping: BSD-3-Clause tracepath: GPL-2.0-or-later Files containing license texts are available in Documentation directory. ...
[openssh-licence] ...that. OpenSSH contains no GPL code. 1) * Copyright (c) 1995 Tatu Ylonen <ylo@cs.hut.fi>, Espoo, Finland * All rights reserved * * As far as I am concerned, the code I have written for this software * can be used freely for any purpose. Any derived versions of this * software must be clearly marked as such, and if the derived work is * incompatible with the protocol description in the RFC file, it must be * called by a name other than "ssh" or "Secure Shell...
coreutils-sv-po # Swedish messages for coreutils. # Copyright © 1997, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2020, 2021, 2023, 2024, 2025, 2026 Free Software Foundation, Inc. # This file is distributed under the same license as the coreutils package. # Peter Antman <peter.antman@abc.se>, 1997. # Thomas Olsson <cid95tho@lustudat.student.lu.se>, 1997. # Daniel Resare <daniel@resare.com> 1999, 2000. # Göran Uddeborg <goeran@uddeborg.se>, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2020, 2021, 2023, 2024, 2025, 2026. # # $Revision: 1.241 $ # msgid "" msgstr
grep-sv-po # Swedish messages for GNU Grep # Copyright © 1996, 1998, 1999, 2000, 2001, 2006, 2007, 2008, 2009, 2010, 2011, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2025 Free Software Foundation, Inc. # This file is distributed under the same license as the grep package. # Thomas Olsson <cid95tho@student1.lu.se>, 1996. # Daniel Resare <daniel@resare.com>, 1998, 1999, 2000, 2001. # Daniel Nylander <po@danielnylander.se>, 2006, 2007, 2008, 2009, 2010, 2011. # Anders Jonsson <anders.jonsson@norsjovallen.se>, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2025. # msgid "" msgstr "" "Project-Id-Version: grep 3.11.68\n" "Report-Msgid-Bugs-To: bug-grep@gnu.org\n" "POT-Creation-D
tar-sv-po # Swedish messages for tar # Copyright © 1996, 2001, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2013, 2014, 2016, 2017, 2023, 2025 Free Software Foundation, Inc. # This file is distributed under the same license as the tar package. # Jan Djärv <jan.h.d@swipnet.se>, 2000, 2001, 2004, 2006, 2007, 2008, 2009, 2010, 2011, 2013, 2014 # Anders Jonsson <anders.jonsson@norsjovallen.se>, 2016, 2017 # Göran Uddeborg <goeran@uddeborg.se>, 2019, 2023, 2025 # # $Id: tar.po,v 1.10 2025-10-21 12:00:34+02 göran Exp $ #: src/create.c:1539 msgid "" msgstr "" "Project-Id-Version: tar 1.35.90\n" "Report-Msgid-Bugs-To: bug-tar@gnu.org\n" "POT-Creation-Date: 2025-10-19 09:40+0300\n" "PO-Revision-Date: 2025-1
findutils-sv-po # Swedish messages for findutils. # Copyright © 1996, 2001, 2004, 2006, 2007, 2008, 2009, 2014, 2015, 2022 Free Software Foundation, Inc. # This file is distributed under the same license as the findutils package. # # Johan Linde <jl@theophys.kth.se>, 1996. # Christian Rose <menthos@menthos.com>, 2001, 2004. # Daniel Nylander <po@danielnylander.se>, 2006, 2007, 2008, 2009. # Göran Uddeborg <goeran@uddeborg.se>, 2014, 2015, 2022, 2026. # # $Revision: 1.16 $ # msgid "" msgstr "" "Project-Id-Version: findutils 4.10.0.164\n" "Report-Msgid-Bugs-To: bug-findutils@gnu.org\n" "POT-Creation-Date: 2026-06-28 18:33+0100\n" "PO-Revision-Date: 2026-06-29 11:46+0200\n" "Last-Translator: Göran Uddeborg <go
bash-sv-po # Swedish translation of bash # Copyright © 2008, 2009, 2010, 2011, 2013, 2014, 2015, 2016, 2018, 2019, 2020, 2022, 2025 Free Software Foundation, Inc. # This file is distributed under the same license as the bash package. # # Göran Uddeborg <goeran@uddeborg.se>, 2008, 2009, 2010, 2011, 2013, 2014, 2015, 2016, 2018, 2019, 2020, 2022, 2025. # # $Revision: 1.35 $ msgid "" msgstr "" "Project-Id-Version: bash 5.3-rc2\n" "Report-Msgid-Bugs-To: \n" "POT-Creation-Date: 2025-04-22 09:37-0400\n" "PO-Revision-Date: 2025-06-04 22:59+0200\n" "Last-Translator: Göran Uddeborg <goeran@uddeborg.se>\n" "Language-Team: Swedish <tp-sv@listor.tp-sv.se>\n" "Language: sv\n" "MIME-Version: 1.0\n" "Content-Type: te
```

**Quality-control round 3: output of posix-opts.py (POSIX passages cited in the evidence), re-run on the same downloaded pages** (The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>)

```
python3 S/posix-opts.py

# output
[cd ^If no directory operand is given and the HOME] If no directory operand is given and the HOME environment variable is empty or undefined, the default behavior is | implementation-defined and no further steps shall be taken.
[cd ^If no directory operand is given and the HOME] If no directory operand is given and the HOME environment variable is set to a non-empty value, the cd | utility shall behave as if the directory named in the HOME environment variable was specified as the directory
[cd ^When a <hyphen-minus> is used as the operand] NOT FOUND
[pwd ^The pwd utility shall write] The pwd utility shall write to standard output an absolute pathname of the current working directory, which does not | contain the filenames dot or dot-dot.
[ls ^-a$] -a | Write out all directory entries, including those whose names begin with a <period> ('.'). | -c
[ls ^-A$] -A | Write out all directory entries, including those whose names begin with a <period> ('.') but excluding the | entries dot and dot-dot (if they exist).
[ls ^-l$] -l | (The letter ell.) Do not follow symbolic links named as operands unless the -H or -L options are specified. Write | out in long format (see the STDOUT section). Disable the -C, -m, and -x options.
[ls ^-t$] -t | Sort with the primary key being time modified (most recently modified first) and the secondary key being filename in the | collating sequence. For a symbolic link, the time used as the sort key is that of the symbolic link itself, unless ls is | evaluating its file information to be that of the file referenced by the link (see the -H and -L options).
[mkdir ^-p$] -p | Create any missing intermediate pathname components. | For each dir operand that does not name an existing directory, before performing the actions described in the DESCRIPTION | above, the mkdir utility shall create any pathname components of the path prefix of dir that do not name an existing
[rmdir ^The rmdir utility shall remove] The rmdir utility shall remove the directory entry specified by each dir operand. | For each dir operand, the rmdir utility shall perform actions equivalent to the rmdir() function called with the dir operand as its only argument.
[rm ^-R$] -R | Remove file hierarchies. See the DESCRIPTION. | -r
[rm ^-r$] -r | Equivalent to -R.
[rm ^-f$] -f | Do not prompt for confirmation. Do not write diagnostic messages or modify the exit status in the case of no file operands, or | in the case of operands that do not exist. Any previous occurrences of the -i option shall be ignored.
[rm ^-i$] -i | Prompt for confirmation as described previously. Any previous occurrences of the -f option shall be ignored.
[cp ^-R$] -R | Copy file hierarchies. | Specifying more than one of the mutually-exclusive options -H, -L, and -P shall not be considered an error.
[cp ^-r$] NOT FOUND
[mv ^In the first synopsis form] In the first synopsis form, the mv utility shall move the file named by the source_file operand to the destination | specified by the target_file. This first synopsis form is assumed when the final operand does not name an existing directory | and is not a symbolic link referring to an existing directory. In this case, if source_file names a non-directory file and
[touch ^The touch utility shall change] The touch utility shall change the last data modification timestamps, the last data access timestamps, or both. | The time used can be specified by the -t time option-argument, the corresponding time fields of the file | referenced by the -r ref_file option-argument, or the -d date_time option-argument, as specified in the
[touch ^If a file at path] NOT FOUND
[ln ^-s$] -s | Create symbolic links instead of hard links. If the -s option is specified, the -L and -P options shall be
[cat ^The cat utility shall read] The cat utility shall read files in sequence and shall write their contents to the standard output in the same | sequence.
[head ^-n number$] NOT FOUND
[head ^If no options are specified] If no options are specified, head shall act as if -n 10 had been specified. | OPERANDS
[tail ^-n number$] NOT FOUND
[tail ^-f$] -f | If the input file is a regular file or if the file operand specifies a FIFO, do not terminate after the last line of the | input file has been copied, but read and copy further bytes from the input file when they become available. If no file | operand is specified and standard input is a pipe or FIFO, the -f option shall be ignored. If the input file is not a FIFO,
[wc ^-l$] -l | Write to the standard output the number of <newline> characters in each input file.
[diff ^The diff utility shall compare] The diff utility shall compare the contents of file1 and file2 and write to standard output a list of | changes necessary to convert file1 into file2. This list should be minimal. No output shall be produced if the files
[sort ^The sort utility shall perform] The sort utility shall perform one of the following functions: | Sort lines of all the named files together and write the result to the specified output.
[grep ^-i$] -i | Perform pattern matching in a case-insensitive manner; see XBD 9.2 Regular | Expression General Requirements.
[grep ^-v$] -v | Select lines not matching any of the specified patterns. If the -v option is not specified, selected lines shall be
[grep ^-n$] -n | Precede each output line by its relative line number in the file, each file starting at line 1. The line number counter shall
[grep ^-c$] -c | Write only a count of selected lines to standard output.
[find ^-name pattern$] NOT FOUND
[find ^-type c$] NOT FOUND
[chmod ^The who symbols] The who symbols u, g, and o shall specify the user, group, and other parts of | the file mode bits, respectively. A who consisting of the symbol a shall be equivalent to ugo. | The perm symbols r, w, and x represent the read, write, and | execute/search portions of file mode bits, respectively. The perm symbol s shall represent the
[chmod ^The perm symbols] The perm symbols r, w, and x represent the read, write, and | execute/search portions of file mode bits, respectively. The perm symbol s shall represent the | set-user-ID-on-execution (when who contains or implies u) and set-group-ID-on-execution (when
[chmod 0644|644] NOT FOUND
[chmod ^-R$] -R | Recursively change file mode bits. For each file operand that names a directory, chmod shall change the file mode
[chown ^The chown utility shall set] The chown utility shall set the user ID of the file named by each file operand to the user ID specified by the | owner operand. | For each file operand, or, if the -R option is used, each file encountered while walking the directory trees
[chown appropriate privileges] Unless chown is invoked by a process with appropriate privileges, the set-user-ID and set-group-ID bits of a regular file | shall be cleared upon successful completion; the set-user-ID and set-group-ID bits of other file types may be cleared.
[chown appropriate privileges] Only the owner of a file or the user with appropriate privileges may change the owner or group of a file. | Some implementations restrict the use of chown to a user with appropriate privileges.
[ps ^-e$] -e | [XSI]
[ps ^-f$] -f | [XSI]
[kill ^If no signal is specified] NOT FOUND
[kill ^9 *KILL|^KILL$] NOT FOUND
[kill ^-signal_number] -signal_number | [XSI] | Specify a non-negative decimal integer, signal_number, representing the signal to be used instead of SIGTERM, as the
[jobs ^The jobs utility shall display] NOT FOUND
[fg ^If job control is enabled] If job control is enabled (see the description of set -m), the shell | is interactive, and the current shell execution environment (see 2.13 Shell | Execution Environment) is not a subshell environment, the fg utility shall move a background job in the current | execution environment into the foreground, as described in 2.11 Job
[fg ^job_id$] job_id | Specify the job to be run as a foreground job. If no job_id operand is given, the job_id for the job that was | most recently suspended, placed in the background, or run as a background job shall be used. The format of job_id is
[man ^The man utility shall write] The man utility shall write information about each of the name operands. If name is the name of a standard | utility, man at a minimum shall write a message describing the syntax used by the standard utility, its options, operands,
[man ^The man utility shall write] The man utility shall write text describing the syntax of the utility name, its options and its operands, or, when | -k is specified, lines from the summary database. The format of this text is implementation-defined.
[df ^-k$] -k | Use 1024-byte units, instead of the default 512-byte units, when writing space figures.
[df ^-P$] -P | Produce output in the format described in the STDOUT section.
[du ^-s$] -s | Instead of the default output, report only the total sum for each of the specified files.
[du ^-k$] -k | Write the files sizes in units of 1024 bytes, rather than the default 512-byte units.
[tee ^The tee utility shall copy] The tee utility shall copy standard input to standard output, making a copy in zero or more files. The tee utility | shall not buffer output.
```

**Quality-control round 3: output of gnu-opts.py (passages of the GNU manuals and man pages cited in the evidence), re-run on the same downloaded pages** (GNU Coreutils manual (for version 9.12))

```
python3 S/gnu-opts.py

# output
[coreutils ^‘-h’$|^-h$] NOT FOUND
[coreutils ^‘--human-readable’] ‘--human-readable’ | Append a size letter to each size, such as ‘M’ for mebibytes. | Powers of 1024 are used, not 1000; ‘M’ stands for 1,048,576 bytes.
[coreutils ^‘--human-readable’] ‘--human-readable’ | Append a size letter to each size, such as ‘M’ for mebibytes. | Powers of 1024 are used, not 1000; ‘M’ stands for 1,048,576 bytes.
[coreutils ^‘-s’$] ‘-s’ | ‘--quiet’ | ‘--silent’
[coreutils ^‘--summarize’] ‘--summarize’ | Display only a total for each argument. | ‘-t size’ ¶
[coreutils ^‘-R’$] ‘-R’ | ‘--recursive’ | Copy directories recursively. By default, do not follow symbolic
[coreutils ^‘-R’$] ‘-R’ | ‘--recursive’ | Remove the listed directories and their contents recursively.
[coreutils ^‘--recursive’$] ‘--recursive’ | List the contents of all directories recursively. | Next: Sorting the output, Previous: Which files are listed, Up: ls: List directory contents   [Contents][Index]
[coreutils ^‘--recursive’$] ‘--recursive’ | Copy directories recursively. By default, do not follow symbolic | links in the source unless used together with the --link
[coreutils ^‘--almost-all’] ‘--almost-all’ | In directories, do not ignore all file names that start with ‘.’; | ignore only . and ... The --all (-a)
[coreutils ^‘--all’] ‘--all’ | Also convert all sequences of two or more blanks just before a tab stop, | even if they occur after non-blank characters in a line.
[coreutils ^‘--all’] ‘--all’ | In directories, do not ignore file names that start with ‘.’. | ‘-A’ ¶
[coreutils ^‘--follow\[=how\]’] ‘--follow[=how]’ | Loop forever trying to read more characters at the end of the file, | presumably because the file is growing. | If more than one file is given, tail prints a header whenever it
[coreutils ^‘--lines=\[-\]num’|^‘--lines=num’] ‘--lines=[-]num’ | Output the first num lines. | However, if num is prefixed with a ‘-’,
[coreutils ^‘--symbolic’] ‘--symbolic’ | Make symbolic links instead of hard links. This option merely produces | an error message on systems that do not support symbolic links.
[coreutils ^‘--parents’] ‘--parents’ ¶ | Form the name of each destination file by appending to the target | directory a slash and the specified name of the source file. The last
[coreutils ^‘--parents’] ‘--parents’ | Make any missing parent directories for each argument, setting their | file permission bits to ‘=rwx,u+wx’,
[grep ^-r$] NOT FOUND
[grep ^--recursive$] --recursive | For each directory operand, | read and process all files in that directory, recursively. | Follow symbolic links on the command line, but skip symlinks
[tar ^‘--gzip’] NOT FOUND
[tar recognize the compression|automatically detect|compression program automatically] automatically detects archives in incremental format. | There may be cases, when such processing is required for normal archives | too. Consider the following example:
[tar recognize the compression|automatically detect|compression program automatically] GNU tar is tries to automatically detect NUL-terminated file | lists, so in many cases it is safe to use them even without the | --null option. In this case tar will print a
[tar ^‘--create’$] NOT FOUND
[tar ^‘--extract’$] NOT FOUND
[tar ^‘--list’$] NOT FOUND
[tar ^‘--file=archive’$] NOT FOUND
[tar POSIX|pax] 8.3.7 GNU tar and POSIX tar
[tar POSIX|pax] Support for POSIX archives was added by Sergey Poznyakoff.
[bash ^Redirecting Standard Output and Standard Error] Redirecting Standard Output and Standard Error | Appending Standard Output and Standard Error | Here Documents | Here Strings | Duplicating File Descriptors | Moving File Descriptors | Opening File Descriptors for Reading and Writing | 3.6.1 Redirecting Input ¶
[bash ^Tilde Expansion] Tilde Expansion | Shell Parameter Expansion | Command Substitution | Arithmetic Expansion | Process Substitution | Word Splitting
[bash ^Tilde Expansion] Tilde Expansion (see Tilde Expansion). | Interactive shells are described in Interactive Shells. | Invoked as an interactive login shell, or with --login ¶ | When Bash is invoked as an interactive login shell, or as a | non-interactive shell with the --login option, it first reads and | executes commands from the file /etc/profile, if that file exists.
[bash ^cd$|^cd ¶] cd ¶ | cd [-L] [-@] [directory] | cd -P [-e] [-@] [directory] | Change the current working directory to directory. | If directory is not supplied, the value of the HOME | shell variable is used as directory. | If the shell variable | CDPATH exists,
[curl-manpage ^-O, --remote-name] -O, --remote-name | -R, --remote-time | --remove-on-error | --request-target
[curl-manpage ^-O, --remote-name] -O, --remote-name | Write output to a local file named like the remote file we get. (Only the file part of the remote file is used, the path is cut off.) | The file is saved in the current working directory. If you want the file saved in a different directory, make sure you change the current working directory before invoking curl with this option or use --output-dir. | The remote filename to use for saving is extracted from the given URL, nothing else, and if it already exists it is overwritten. If you want the server to be able to choose the filename refer to --remote-header-name which can be used in addition to this option. If the server chooses a filename and that name already exists it 
[ssh ^ssh \[-46] NOT FOUND
[ssh connects and logs into the specified destination] NOT FOUND
[scp copies files between hosts] scp copies files between hosts on a | network. | scp uses the SFTP protocol over an
[scp scp://\[user@\]host|\[user@\]host:\[path\]] the form [user@]host:[path], or a URI in the form | scp://[user@]host[:port][/path]. Local file names
[scp scp://\[user@\]host|\[user@\]host:\[path\]] scp://[user@]host[:port][/path]. Local file names | can be made explicit using absolute or relative pathnames to avoid
[ping ^-c count] -c count | Stop after sending count ECHO_REQUEST packets. With deadline | option, ping waits for count ECHO_REPLY packets, until the
```

**Quality-control round 3: output of more-opts.py (further passages cited for the notes), re-run on the same downloaded pages** (The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>)

```
python3 S/more-opts.py

# output
[posix/basedefs_signal.h SIGKILL] SIGKILL | T | Kill (cannot be caught or ignored). | SIGPIPE
[posix/basedefs_signal.h cannot be caught or ignored] Kill (cannot be caught or ignored).
[posix/basedefs_signal.h cannot be caught or ignored] Stop executing (cannot be caught or ignored).
[posix/utilities_tail If neither -c nor -n|-n 10] If none of the -c, -n or -r options is specified, -n 10 shall be assumed. | OPERANDS
[posix/utilities_grep ^-E$] -E | Match using extended regular expressions. Treat each pattern specified as an ERE, as described in XBD 9.4 Extended Regular Expressions. If any entire ERE pattern matches some part of | an input line excluding the terminating <newline>, the line shall be matched. A null ERE shall match every line.
[posix/utilities_grep basic regular expression] default, an input line shall be selected if any pattern, treated as an entire basic regular expression (BRE) as described in XBD | 9.3 Basic Regular Expressions, matches any part of the line excluding
[posix/utilities_cd dot-dot] If the first component of the directory operand is dot or dot-dot, proceed to step 6. | Starting with the first pathname in the <colon>-separated pathnames of CDPATH (see the ENVIRONMENT VARIABLES
[posix/utilities_cd dot-dot] For each dot-dot component, if there is a preceding component and it is neither root nor dot-dot, then: | If the preceding component does not refer (in the context of pathname resolution with symbolic links followed) to a directory,
[posix/utilities_mkdir ^-p$] -p | Create any missing intermediate pathname components. | For each dir operand that does not name an existing directory, before performing the actions described in the DESCRIPTION | above, the mkdir utility shall create any pathname components of the path prefix of dir that do not name an existing | directory by performing actions equivalent to first calling the mkdir() function with | the following arguments: | A pathname naming the missing pathname component, ending with a trailing <slash> character, as the path | argument
[posix/utilities_tee ^-a$] -a | Append the output to the files.
[posix/utilities_ln ^ln \[-fs\]|^ln -s|source_file target_file] ln [-fs] [-L|-P] source_file target_file | ln [-fs] [-L|-P] source_file... target_dir
[posix/utilities_ln ^ln \[-fs\]|^ln -s|source_file target_file] ln [-fs] [-L|-P] source_file... target_dir | DESCRIPTION
[posix/utilities_mv ^In the second synopsis form] In the second synopsis form, mv shall move each file named by a source_file operand to a destination file in the | existing directory named by the target_dir operand, or referenced if target_dir is a symbolic link referring to an | existing directory. The destination path for each source_file shall be the concatenation of the target directory, a single
[posix/utilities_ls ^-A$] -A | Write out all directory entries, including those whose names begin with a <period> ('.') but excluding the
[posix/utilities_find ^-type c$|^-type] -type c | The primary shall evaluate as true if the type of the file is c, where c is 'b', 'c', | 'd', 'l', 'p', 'f', or 's' for block special file, character special file, directory, | symbolic link, FIFO, regular file, or socket, respectively.
[docs/coreutils ^‘-r’$] NOT FOUND
[docs/ping ^-c count] -c count | Stop after sending count ECHO_REQUEST packets. With deadline | option, ping waits for count ECHO_REPLY packets, until the | timeout expires.
[docs/ping until|interrupted|SIGINT] option, ping waits for count ECHO_REPLY packets, until the | timeout expires.
[docs/ping until|interrupted|SIGINT] deadline expire or until count probes are answered or for some | error notification from network.
[docs/curl-manpage ^-o, --output <file>$] -o, --output <file> | Write output to the given file instead of stdout. If you are using globbing in the URL to fetch multiple documents, you should quote the URL and you can use "#" followed by a number in the filename. That variable gets replaced with the current glob text. Like in: | curl "http://{one,two}.example.com" -o "file_#1.txt"
[docs/curl-manpage stdout|standard output] If not told otherwise, curl writes the received data to stdout. It can be instructed to instead save that data into a local file, using the --output or --remote-name options. If curl is given multiple URLs to transfer on the command line, it similarly needs multiple options for where to save them. | curl does not parse or otherwise "understand" the content it gets or writes as output. It does no encoding or decoding, unless explicitly asked to with dedicated command line options.
[docs/curl-manpage stdout|standard output] (HTTP) Specify to which file you want curl to write all cookies after a completed operation. curl writes all cookies from its in-memory cookie storage to the given file at the end of operations. Even if no cookies are known, a file is created so that it removes any formerly existing cookies from the file. The file uses the Netscape cookie file format. If you set the filename to a single minus, "-", the cookies are written to stdout. | The file specified with --cookie-jar is only used for output. No cookies are read from the file. To read cookies, use the --cookie option. Both options can speci
[docs/scp colon|':'] NOT FOUND
[docs/tar ^8\.3\.7 GNU tar and POSIX tar] 8.3.7 GNU tar and POSIX tar | 8.3.7.1 Controlling Extended Header Keywords
[docs/tar ^8\.3\.7 GNU tar and POSIX tar] 8.3.7 GNU tar and POSIX tar | Starting from version 1.14 GNU tar features full support for
```

**Quality-control round 2: Swedish Wikipedia introductions for the stderr, pipe and command-interpreter terms (Pipe (Unix) and Rör (datavetenskap) do not exist), and the page fetched for its licence footer** (Standard error and Kommandotolk (Swedish Wikipedia))

```
https://sv.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=1&exintro=1&format=json&titles=Standard%20error|Kommandotolk|Pipe%20(Unix)|R%C3%B6r%20(datavetenskap)&redirects=1
https://sv.wikipedia.org/wiki/Standard_error
```

## Quality control

5 rounds, 31 findings: 26 fixed, 0 rejected after checking, 5 needing no change. Every card's Wikidata checks (0 in all) are re-run against live Wikidata by `scripts/authored_decks.py check` before every build.

### Round 0: Every command run in a throwaway directory with dash (uutils/GNU coreutils mix) and with bash (GNU coreutils 9.7), jobs and fg in a pseudo-terminal; every command and option checked against POSIX.1-2024 or, outside POSIX, the GNU manuals and the curl, OpenSSH and iputils manual pages; fronts checked for a single canonical answer; Swedish terms checked against the GNU tools' Swedish translations; builder and validator checks. (2026-10-04)

**Reviewer:** Claude (AI) — authoring agent, machine checks · **Scope:** All 55 cards, and the synonyms and behaviours named in the notes.

All 55 commands ran and had the effect the front describes in both runs, except that ssh and scp could be followed only up to authentication (no SSH server available; see the finding). Commands expected to fail did (mkdir without -p on a missing parent, rmdir on a non-empty directory, rm and cp on a directory without -r/-R, grep on a directory without -r, running a script before chmod +x, chown to root as an ordinary user, kill on a process ignoring SIGTERM). Every command and option is documented with the behaviour on the card. No Wikidata checks: no card's content is a Wikidata statement or label. The findings record the problems met while writing the tests and the decisions about portable versus usual forms.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| jobs, fg | First test run: in the non-interactive script, dash answered set -m with "can't access tty; job control turned off", jobs printed the job without its command, and fg failed with "job (null) not created under job control". POSIX makes fg depend on job control in an interactive shell. | jobs and fg are tested instead in interactive dash and bash sessions in a pseudo-terminal (jobs-pty.py), where jobs listed 'sleep 3' as Running, fg brought it to the foreground and returned with status 0 when it finished, and jobs then listed nothing. The script's jobs and fg sections now point to that test. | fixed |
| tar-extract, pipe, curl-o | First test run: a cd inside the eval'd command line of tar-extract changed the script's own directory, so the second extraction, the pipe example and the curl test ran in the wrong directory ("can't cd to unpack2", "food.txt: No such file or directory"). | Commands that change directory now run in a subshell ( ... ); the next run exercised every section as intended. | fixed |
| curl-o | Third test run (after the notes-checks section was added): www.gnu.org did not answer reliably from the research environment, so curl -O saved nothing in run 2 and a later curl hung; the run was stopped. | The curl tests download https://raw.githubusercontent.com/curl/curl/master/COPYING instead; the final runs downloaded it in both runs (1088 bytes, saved as COPYING). | fixed |
| ssh, scp | No SSH server was available, so a completed login or file transfer could not be observed. | Verified the parsing and the connection up to authentication: ssh -G alice@example.org shows user alice and hostname example.org; ssh -v and scp -v to github.com as git (with the user's own keys and configuration excluded) reach 'Authenticating to github.com:22 as 'git'' and are refused by the server; scp runs ssh with 'host github.com, user git'. Together with the OpenSSH manual pages this confirms the command lines; recorded as an open limitation. | no change needed |
| grep-r, df-h, du-sh, tar-create, tar-extract | Portability: the usual answers use options that are not in POSIX.1-2024 (grep -r; -h of df and du; tar is not in POSIX at all: the specification's utilities/tar.html returned HTTP 404 and pax is specified instead). | Kept the usual answers, which work on the systems learners meet, and the notes give the portable alternative (find ... -exec grep ... +, df -k / df -P, du -sk) or say that tar follows GNU tar. All alternatives were run. | no change needed |
| ps-ef, kill-9 | ps -e and -f and kill's numeric -signal_number form are in POSIX's XSI option group, not the base; the base form of kill -9 is kill -s KILL <pid>. | Kept ps -ef and kill -9, the forms most often used, and the notes name the XSI status and the base form; kill -s KILL and ps aux were run too. | no change needed |
| cd-home, ls-all, rm-recursive, cp-recursive | Each task has an exact or near synonym that also answers it: cd ~, ls -A (without . and ..), rm -R and rm -rf, cp -r. | The back gives the shortest POSIX form (cd, ls -a, rm -r, cp -R) and the note names the synonym and the difference, each run in the tests. | no change needed |
| chmod-x | chmod +x without u, g, o or a is affected by the umask, so its result is not 'executable for everyone' in general: under umask 077 the test gave -rwxr--r-- while chmod a+x gave -rwxr-xr-x. | The front says only 'make a file executable', and the note explains the umask and chmod a+x. | fixed |
| chown | As an ordinary user the test could only 'change' a file's owner to the same user; changing it to root failed with 'Operation not permitted'. | The test records both; POSIX confirms that only the owner or a user with appropriate privileges may change the owner, and that some implementations restrict chown to privileged users. The note says giving a file away usually needs superuser privileges. | no change needed |

### Round 1: Factual accuracy (2026-10-04)

**Reviewer:** Claude (AI) — independent Factual accuracy reviewer · **Scope:** All 55 cards, against the POSIX.1-2024 utility pages, the GNU df man page and the reviewer's own tests in dash and bash.

No wrong command was found. Two warnings (df-h's 'every mounted file system' and ln-symbolic's 'same order as cp' note) and three suggestions were all confirmed by the authoring agent's re-tests (qc1-tests.sh, under Queries) and the sources, and all five were applied.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| df-h | The front said 'every mounted file system', but GNU df leaves out pseudo, duplicate and inaccessible file systems unless -a is given, so taken literally the front would need df -ah. | Confirmed in the GNU coreutils manual (df -a: such file systems 'are omitted by default') and by re-test (df -h 22 lines, df -ah 45). The front now says 'the mounted file systems' / 'de monterade filsystemen', and the note says that GNU df leaves out pseudo file systems such as /proc unless -a is given. | fixed |
| ln-symbolic | The note 'Same order as cp: first the existing file, then the name of the new link' was misleading: the target need not exist, and a relative target is resolved from the link's directory, not the current one, so following the cp analogy can make a broken link. | Confirmed by re-test: ln -s t.txt sub/l gave a broken link, ln -s ../t.txt sub/l2 worked, and a link to a missing name was created. The note now reads 'First what the link points to, then the name of the new link. A relative target is resolved from the link's directory, not from the current one.' (and the same in Swedish). | fixed |
| grep-r | The suggested portable equivalent find <dir> -type f -exec grep <pattern> {} + prints no file names when grep gets only one file; and 'A GNU grep option' suggested only GNU has -r. | Confirmed by re-test and by POSIX grep (the file-name prefix only when more than one file argument appears). The note now gives find <dir> -type f -exec grep <pattern> /dev/null {} + and says 'Not in POSIX (GNU grep has it)', which no longer implies that only GNU has it. BSD grep is not named because no BSD source was checked. | fixed |
| df-h | The note did not say that POSIX.1-2024 puts the whole df utility in the XSI option group, unlike the ps-ef and kill-9 notes. | Confirmed on the POSIX df page (SYNOPSIS '[XSI] df [-k] [-P\|-t] [file...]'). The note now says that df itself is in POSIX's XSI option group. | fixed |
| find-dirs | The front asked for directories 'below the current directory', but the answer also lists . itself. | Front changed to 'List the current directory and all directories below it, at every depth' / 'Lista aktuell katalog och alla kataloger under den, på alla nivåer'; the note now says that the current directory comes first, written as a dot (re-test: ., ./sub, ./sub/deep in that order). | fixed |

### Round 2: Language, translation and language tags (2026-10-04)

**Reviewer:** Claude (AI) — independent Language, translation and language tags reviewer · **Scope:** All 55 cards, the title, the description and the keywords.

Language tags were found correct throughout (fronts and notes en + sv, backs zxx). One error (the split compound 'standard fel'), three warnings and six suggestions about the Swedish were checked; all were applied. The untagged dcat:keyword literals are written so by the builder for every deck and are outside this deck's dossier.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| redirect-stderr | The Swedish note wrote 'standard fel', which reads as a split compound ('a typical mistake'); Swedish technical writing uses the English term. | 'standard fel' is the term of the GNU tools' own Swedish translations (see the po.py output under Queries), but the Swedish Wikipedia article is named 'Standard error' ('Standard error förkortas stderr ...'), and the two-word form is ambiguous to a general reader. The note now reads 'standard error (stderr)' in both languages; Swedish Wikipedia added as a verification source. | fixed |
| deck | The Swedish description read 'att röra sig mellan kataloger, filer och kataloger', repeating 'kataloger' so that the list items ran together. | Swedish now 'Omfattar förflyttning i katalogträdet, filer och kataloger, ...'; English made to match: 'Covers moving around the directory tree, files and directories, ...'. | fixed |
| grep, find-name | The Swedish notes used 'citera'/'ociterat' for shell quoting, a calque of English 'quote'. | Rewritten with 'sätt det inom citattecken' and 'utan citattecken', as suggested. | fixed |
| ps-ef | Missing genitive: 'hör till POSIX XSI-tillägg'. | Now 'hör till POSIX:s XSI-tillägg', consistent with 'GNU:s'. | fixed |
| kill, kill-9 | 'givet dess process-id' calques 'given its process ID', and intransitive 'stoppa' is colloquial. | Fronts now '..., med hjälp av dess process-id' and 'Tvinga en process att avslutas omedelbart ...'. | fixed |
| wc-lines | 'Strikt räknar wc -l ...' renders 'Strictly,' word for word. | Now 'Strikt taget räknar wc -l ...'. | fixed |
| find-dirs | The Swedish note 'Listan tar även med . själv.' was awkward. | The note was rewritten together with the front (round 1): 'Den aktuella katalogen kommer först i listan, skriven som en punkt.' | fixed |
| tar-create | 'Packa en katalog i ett ... tar-arkiv' reads as putting the directory into an existing archive. | Now 'Packa ihop en katalog till ett gzip-komprimerat tar-arkiv'. | fixed |
| deck | The Swedish keyword 'terminalen' was in the definite form; the builder also writes keywords without language tags. | Replaced by 'kommandotolk', the Swedish Wikipedia article name for a command-line interface. The untagged keyword literals come from the builder and apply to every deck; they are left to the library maintainer, as the reviewer said. | fixed |
| deck | 'rör' alone may not be recognised; many Swedish readers know the concept as 'pipe'. | Description now says 'rör (pipes) och omdirigering', the form the Swedish Wikipedia article Kommandotolk uses ('I de flesta skal är rör (pipes) av central betydelse'). | fixed |

### Round 3: Licensing, attribution and documentation (2026-10-04)

**Reviewer:** Claude (AI) — independent Licensing, attribution and documentation reviewer · **Scope:** Licensing and attribution of all 10 sources; evidence of about 25 cards spot-checked against live sources and the downloaded copies; the documentation.

The CC0 licence was confirmed sound and every 'says' that was sampled was accurate. One warning (placeholders lost when GitHub renders the report) and four suggestions about the record were handled: the version record, the outputs of the passage-printing scripts and the rm-recursive wording were improved, and the method now says plainly that the working list of candidates was not saved.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| deck | The published Markdown report puts angle-bracket placeholders (<file>, <dir>, <signal.h>) outside code spans; GitHub's sanitiser drops them as unknown HTML tags, which corrupts the description and the Back column as rendered. | The fix belongs in the builder's report renderer, which this deck's author does not change; it is left to the library maintainer (it affects git-commands too). Until then the method's notation step says that the report shows the placeholders only as raw Markdown and that the dossier and the Turtle deck hold them intact. The cards themselves are unaffected. | fixed |
| deck | The recorded dpkg output showed 'coreutils 9.5' next to the claim 'GNU coreutils 9.7'. | Confirmed: on Ubuntu 26.04 'coreutils' is a transitional package for uutils and the GNU binaries come from gnu-coreutils 9.7-3ubuntu2.1. A dpkg-query for gnu-coreutils, findutils, grep, tar, curl and gzip with its output was added to Queries, and the method explains the transitional package. | fixed |
| deck | Only the command lines of the passage-printing scripts (po.py, lic.py, posix-opts.py, gnu-opts.py, more-opts.py) were recorded, not their output. | Their outputs were re-run on the same downloaded files and added to Queries (po.py: every msgid => msgstr pair used for the Swedish terms). The single px.py and grep calls are not reproduced; the passages they printed are quoted in the cards' evidence. | fixed |
| rm-recursive | The note was a close, reordered paraphrase of GNU rm's help string for -f (a verification-only source). | Reworded: 'rm -rf also skips the prompt for write-protected files and stays silent about missing names; use it with care.' (Swedish to match). The tail-follow front was judged acceptable by the reviewer and kept. | fixed |
| deck | The method said the agent drew up about 70 tasks and cut them to 55, but the full candidate list is not recorded. | The working list was not saved and cannot honestly be reconstructed now. The method now says so, and points to Selection, which records the excluded kinds of task by name and the four tasks tested and then dropped. | fixed |

### Round 4: Re-check of changed cards and a sample (facts, language, documentation) (2026-10-04)

**Reviewer:** Claude (AI) — independent re-check reviewer · **Scope:** The 13 cards changed after rounds 1-3 and every third card (27 cards checked), the metadata, the description, the licence decision and the documentation.

The reviewer confirmed every fix of rounds 1-3 and found no factual, language or language-tag errors in the cards. One documentation error (fixes attributed to the wrong review round) was fixed, and the suggestion to say in the ps-ef note that ps itself is XSI was applied after checking the live POSIX page.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| deck | The method's Swedish-text step said quality-control round 1 replaced 'standard fel', but that change was made in round 2 (the language review); and the Queries entry with the second dpkg-query (gnu-coreutils etc.) was labelled round 1 although it answers a round 3 finding. | Confirmed against the log. The method now says round 2 (the language review). Every Queries entry labelled 'Quality-control round 1' was checked against the finding it answers and relabelled: the gnu-coreutils dpkg-query and the outputs of po.py, lic.py, posix-opts.py, gnu-opts.py and more-opts.py are round 3 (the record findings); the Swedish Wikipedia fetch is round 2 (the stderr, pipe and kommandotolk terms); qc1-tests.sh stays round 1 (the ln -s, grep -r, df and find-dirs re-tests). | fixed |
| ps-ef | POSIX.1-2024 marks the whole ps utility as XSI, not only -e and -f; the note mentioned only the options, unlike the df-h note. | Confirmed on https://pubs.opengroup.org/onlinepubs/9799919799/utilities/ps.html fetched 2026-10-04 (SYNOPSIS begins '[XSI] ps [-aAw] ...'). The note now reads 'ps itself, like -e and -f, is in POSIX's XSI option group.' / 'ps självt hör, liksom -e och -f, till POSIX:s XSI-tillägg.', and the POSIX evidence cites the SYNOPSIS. | fixed |

## Cards and evidence

| Card | Front | Back | Evidence |
|---|---|---|---|
| `pwd` | Print the full path of the directory you are in (en) / Skriv ut den fullständiga sökvägen till katalogen du står i (sv) | pwd (zxx) | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD pwd (runs 1 and 2) — After cd into .../work1/nav/sub, pwd printed the absolute path ending in /work1/nav/sub (run 2: /work2/nav/sub).<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/pwd.html (DESCRIPTION) — The pwd utility writes to standard output an absolute pathname of the current working directory. |
| `cd-home` | Go to your home directory (en) / Gå till din hemkatalog (sv) | cd (zxx) — *cd ~ does the same: the shell replaces ~ with your home directory. (en) / cd ~ gör samma sak: skalet ersätter ~ med din hemkatalog. (sv)* | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD cd-home — From /, cd with no argument followed by pwd printed .../work1/home, the value of HOME; cd / then cd ~ then pwd printed the same.<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/cd.html (DESCRIPTION); utilities/V3_chap02.html (2.6.1 Tilde Expansion) — If no directory operand is given and HOME is set to a non-empty value, cd behaves as if the directory named in HOME was given; a tilde-prefix with an empty login name is replaced by the value of HOME.<br>Bash Reference Manual (Edition 5.3, 18 May 2025): https://www.gnu.org/software/bash/manual/bash.html (Bourne Shell Builtins: cd; Tilde Expansion) — cd changes the current working directory; if directory is not supplied, the value of the HOME shell variable is used. If the login name after the tilde is the null string, the tilde is replaced with the value of HOME. |
| `cd-parent` | Move up to the parent of the current directory (en) / Gå upp till den aktuella katalogens föräldrakatalog (sv) | cd .. (zxx) | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD cd-parent — In .../nav/sub/deeper, cd .. followed by pwd printed .../nav/sub.<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/cd.html (DESCRIPTION, steps for dot-dot) — cd handles a directory operand whose first component is dot or dot-dot specially, and for each dot-dot component removes the preceding component of the path, moving to the parent directory. |
| `cd-previous` | Go back to the directory you were in before the last change of directory (en) / Gå tillbaka till katalogen du var i före det senaste katalogbytet (sv) | cd - (zxx) — *cd - also prints the directory it changes to. (en) / cd - skriver också ut katalogen som den byter till. (sv)* | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD cd-previous — After cd .../nav then cd .../nav/sub/deeper, cd - printed .../nav and pwd confirmed .../nav (in dash and bash).<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/cd.html (DESCRIPTION) — When the directory operand is a single '-', cd behaves as if it contained the value of OLDPWD, except that after setting PWD it writes the new value to standard output. |
| `ls-all` | List all files in the current directory, including hidden ones (en) / Lista alla filer i aktuell katalog, även dolda (sv) | ls -a (zxx) — *Hidden files are those whose names begin with a dot. ls -A shows them too but leaves out the entries . and .. (en) / Dolda filer är de vars namn börjar med punkt. ls -A visar dem också men utelämnar posterna . och .. (sv)* | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD ls-all — In a directory with a.txt, b.txt and .hidden, ls printed a.txt b.txt; ls -a printed . .. .hidden a.txt b.txt; ls -A printed .hidden a.txt b.txt (uutils 0.8.0 and GNU 9.7 alike).<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/ls.html (OPTIONS -a, -A) — -a: write out all directory entries, including those whose names begin with a period. -A: the same but excluding the entries dot and dot-dot.<br>GNU Coreutils manual (for version 9.12): https://www.gnu.org/software/coreutils/manual/coreutils.html (ls: Which files are listed, -a/--all, -A/--almost-all) — --all: in directories, do not ignore file names that start with '.'; --almost-all: do not ignore them, but ignore . and .. |
| `ls-long` | List the files in the current directory in long format, with permissions, owner, size and modification time (en) / Lista filerna i aktuell katalog i långt format, med rättigheter, ägare, storlek och ändringstid (sv) | ls -l (zxx) | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD ls-long — ls -l printed 'total 8' and one line per file: mode (-rw-r--r--), then link count, owner and group (replaced by 'N user group' in the recorded output by a sed filter), size, modification date and name, e.g. '2 Jan 1 2026 a.txt'.<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/ls.html (OPTIONS -l) — -l: write out in long format (see the STDOUT section). |
| `ls-time` | List the files in the current directory in long format, most recently modified first (en) / Lista filerna i aktuell katalog i långt format, de senast ändrade först (sv) | ls -lt (zxx) | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD ls-time — With a.txt modified 1 Jan 2026 and b.txt 1 Mar 2026, ls -l listed a.txt first (by name) and ls -lt listed b.txt first.<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/ls.html (OPTIONS -t, -l) — -t: sort with the primary key being time modified (most recently modified first); -l: long format. |
| `mkdir` | Create a new directory (en) / Skapa en ny katalog (sv) | mkdir <dir> (zxx) | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD mkdir — mkdir reports exited 0 and ls -ld reports showed drwxr-xr-x.<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/mkdir.html (NAME, DESCRIPTION) — mkdir makes directories: it creates the directories specified by the operands. |
| `mkdir-parents` | Create a directory, along with any parent directories in its path that do not exist yet (en) / Skapa en katalog, tillsammans med de föräldrakataloger i sökvägen som inte finns ännu (sv) | mkdir -p <path> (zxx) — *Without -p, mkdir fails when a parent directory is missing. (en) / Utan -p misslyckas mkdir när en föräldrakatalog saknas. (sv)* | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD mkdir-parents — mkdir projects/2026/notes failed ('No such file or directory', exit 1); mkdir -p projects/2026/notes exited 0 and find listed projects, projects/2026 and projects/2026/notes; repeating mkdir -p also exited 0.<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/mkdir.html (OPTIONS -p) — -p: create any missing intermediate pathname components.<br>GNU Coreutils manual (for version 9.12): https://www.gnu.org/software/coreutils/manual/coreutils.html (mkdir, -p/--parents) — --parents: make any missing parent directories for each argument. |
| `rmdir` | Remove an empty directory (en) / Ta bort en tom katalog (sv) | rmdir <dir> (zxx) — *rmdir refuses to remove a directory that is not empty. (en) / rmdir vägrar ta bort en katalog som inte är tom. (sv)* | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD rmdir — rmdir emptydir exited 0 and the directory was gone; rmdir fulldir failed with 'Directory not empty' (exit 1).<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/rmdir.html (DESCRIPTION) — rmdir removes the directory entry specified by each dir operand, acting as the rmdir() function does. |
| `rm` | Delete a file (en) / Ta bort en fil (sv) | rm <file> (zxx) | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD rm — rm junk.txt exited 0 and ls junk.txt then reported 'No such file or directory'; rm on a directory failed with 'Is a directory'.<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/rm.html (NAME, DESCRIPTION) — rm removes directory entries (those named by its file operands); for a file of type directory, if none of -r, -R or -d is specified, rm writes a diagnostic message instead. |
| `rm-recursive` | Delete a directory together with everything in it (en) / Ta bort en katalog tillsammans med allt dess innehåll (sv) | rm -r <dir> (zxx) — *-R is the same. rm -rf also skips the prompt for write-protected files and stays silent about missing names; use it with care. (en) / -R är detsamma. rm -rf hoppar dessutom över frågan för skrivskyddade filer och tiger om namn som saknas; använd det med försiktighet. (sv)* | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD rm-recursive — rm -r tree removed a directory with files two levels deep (ls tree: 'No such file or directory'); rm -r also removed tree2 containing a write-protected file when standard input was not a terminal.<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/rm.html (OPTIONS -R, -r, -f) — -R: remove file hierarchies; -r: equivalent to -R; -f: do not prompt for confirmation, and do not write diagnostics or change the exit status for operands that do not exist.<br>GNU Coreutils manual (for version 9.12): https://www.gnu.org/software/coreutils/manual/coreutils.html (rm, -r/-R/--recursive) — -r, -R, --recursive: remove the listed directories and their contents recursively. |
| `cp` | Copy a file (en) / Kopiera en fil (sv) | cp <source> <target> (zxx) | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD cp — cp notes.txt notes-copy.txt exited 0 and the copy contained 'original'; cp on a directory without -R failed ('-r not specified; omitting directory').<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/cp.html (SYNOPSIS, DESCRIPTION) — First synopsis form cp source_file target_file copies the contents of source_file to target_file. |
| `cp-recursive` | Copy a directory together with everything in it (en) / Kopiera en katalog tillsammans med allt dess innehåll (sv) | cp -R <source> <target> (zxx) — *POSIX specifies -R; GNU cp also accepts -r, as BSD systems historically did. (en) / POSIX anger -R; GNU:s cp godtar också -r, liksom BSD-system traditionellt har gjort. (sv)* | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD cp-recursive — cp -R projects projects-copy copied the directory with its subdirectories and file (find listed 4 entries); cp -r did the same (GNU cp 9.7 in both runs).<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/cp.html (OPTIONS -R; RATIONALE) — -R: copy file hierarchies. The rationale says earlier versions had -r, which is no longer specified by POSIX.1-2024 but may be present in some implementations.<br>GNU Coreutils manual (for version 9.12): https://www.gnu.org/software/coreutils/manual/coreutils.html (cp, -r/-R/--recursive) — cp lists '-r', '-R' and '--recursive' together: copy directories recursively. |
| `mv-rename` | Rename a file (en) / Byt namn på en fil (sv) | mv <old> <new> (zxx) — *If <new> is an existing directory, the file is moved into it instead. (en) / Om <new> är en befintlig katalog flyttas filen in i den i stället. (sv)* | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD mv-rename; CARD notes-checks — mv draft.txt final.txt left only final.txt; in notes-checks, mv final.txt reports (an existing directory) moved the file into reports.<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/mv.html (DESCRIPTION) — First synopsis form: mv moves the file named by source_file to target_file when the final operand does not name an existing directory; second form: each source_file is moved into the existing directory target_dir. |
| `touch` | Create an empty file, or update the timestamps of a file that already exists (en) / Skapa en tom fil, eller uppdatera tidsstämplarna för en fil som redan finns (sv) | touch <file> (zxx) | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD touch — touch empty.txt created a 0-byte file (wc -c: 0); for final.txt dated Jan 1 2000, touch final.txt changed the date to the current day (Oct 4) and left the contents ('draft') unchanged.<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/touch.html (DESCRIPTION) — touch changes the last data modification and/or access timestamps of files (to the current time by default); a file that does not exist is created (by calling creat()). |
| `ln-symbolic` | Create a symbolic link that points to a file (en) / Skapa en symbolisk länk som pekar på en fil (sv) | ln -s <target> <link> (zxx) — *First what the link points to, then the name of the new link. A relative target is resolved from the link's directory, not from the current one. (en) / Först det länken pekar på, sedan namnet på den nya länken. Ett relativt mål tolkas från länkens katalog, inte från den aktuella. (sv)* | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD ln-symbolic — ln -s target.txt link.txt exited 0; ls -l showed 'link.txt -> target.txt' and cat link.txt printed the target's text.<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/ln.html (SYNOPSIS, OPTIONS -s) — Synopsis ln [-fs] [-L\|-P] source_file target_file; -s: create symbolic links instead of hard links.<br>Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: QC round 1 re-test (qc1-tests.sh, ln section) — With t.txt in the current directory, ln -s t.txt sub/l made a broken link (cat sub/l: 'No such file or directory'), while ln -s ../t.txt sub/l2 worked (cat printed 'x'); ln -s does-not-exist dangling also succeeded and created a link (ls -l type 'l'). |
| `cat` | Print the whole contents of a file to the terminal (en) / Skriv ut hela innehållet i en fil i terminalen (sv) | cat <file> (zxx) | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD cat — cat short.txt printed both of its lines, 'line one' and 'line two'.<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/cat.html (DESCRIPTION) — cat reads files in sequence and writes their contents to standard output in the same sequence. |
| `head-20` | Show the first 20 lines of a file (en) / Visa de 20 första raderna i en fil (sv) | head -n 20 <file> (zxx) — *Without -n, head shows the first 10 lines. (en) / Utan -n visar head de 10 första raderna. (sv)* | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD head-20 — On a 30-line file, head -n 20 printed lines 1 to 20; head without options printed 10 lines.<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/head.html (OPTIONS -n, DESCRIPTION) — -n number: like -c number but measured in lines; if no options are specified, head acts as if -n 10 had been specified. |
| `tail-20` | Show the last 20 lines of a file (en) / Visa de 20 sista raderna i en fil (sv) | tail -n 20 <file> (zxx) — *Without -n, tail shows the last 10 lines. (en) / Utan -n visar tail de 10 sista raderna. (sv)* | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD tail-20 — On a 30-line file, tail -n 20 printed lines 11 to 30; tail without options printed 10 lines.<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/tail.html (OPTIONS -n, DESCRIPTION) — -n number: the starting location is measured in lines (a plain number counts from the end); if none of -c, -n or -r is specified, -n 10 is assumed. |
| `tail-follow` | Show the end of a file and keep printing new lines as they are added to it (en) / Visa slutet av en fil och fortsätt skriva ut nya rader när de läggs till (sv) | tail -f <file> (zxx) | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD tail-follow — tail -f app.log ran in the background; two lines appended to the file after 1 s appeared in its output after 'start'; tail kept running until it was killed.<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/tail.html (OPTIONS -f) — -f: for a regular file, do not terminate after the last line but read and copy further bytes as they become available.<br>GNU Coreutils manual (for version 9.12): https://www.gnu.org/software/coreutils/manual/coreutils.html (tail, -f/--follow) — --follow: loop forever trying to read more characters at the end of the file, presumably because the file is growing. |
| `wc-lines` | Count the lines in a file (en) / Räkna raderna i en fil (sv) | wc -l <file> (zxx) — *Strictly, wc -l counts newline characters, so a last line without a newline is not counted. (en) / Strikt taget räknar wc -l radbrytningstecken, så en sista rad utan radbrytning räknas inte. (sv)* | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD wc-lines; CARD notes-checks — wc -l thirty.txt printed '30 thirty.txt'; printf 'a\nb' \| wc -l printed 1.<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/wc.html (OPTIONS -l) — -l: write the number of <newline> characters in each input file. |
| `diff` | Show the line-by-line differences between two files (en) / Visa skillnaderna rad för rad mellan två filer (sv) | diff <file1> <file2> (zxx) | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD diff — For two three-line lists differing in line 2, diff printed '2c2', '< bread', '---', '> butter' and exited 1.<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/diff.html (DESCRIPTION) — diff compares the contents of file1 and file2 and writes a list of changes necessary to convert file1 into file2; no output if the files are identical. |
| `sort` | Print the lines of a file in sorted order (en) / Skriv ut raderna i en fil i sorterad ordning (sv) | sort <file> (zxx) | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD sort — sort fruit.txt (pear, apple, cherry, banana) printed apple, banana, cherry, pear.<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/sort.html (DESCRIPTION) — sort sorts the lines of all the named files together and writes the result to the specified output (standard output by default). |
| `grep` | Print the lines of a file that match a pattern (en) / Skriv ut de rader i en fil som matchar ett mönster (sv) | grep <pattern> <file> (zxx) — *The pattern is a basic regular expression; quote it if it contains spaces or special characters. (en) / Mönstret är ett grundläggande reguljärt uttryck; sätt det inom citattecken om det innehåller blanksteg eller specialtecken. (sv)* | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD grep — grep apple food.txt printed only 'apple juice' (not 'Apple pie').<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/grep.html (DESCRIPTION, OPTIONS -E) — By default an input line is selected if any pattern, treated as an entire basic regular expression (BRE), matches any part of the line; -E uses extended regular expressions instead. |
| `grep-i` | Print the lines of a file that match a pattern, ignoring the difference between upper and lower case (en) / Skriv ut de rader i en fil som matchar ett mönster, utan att skilja på versaler och gemener (sv) | grep -i <pattern> <file> (zxx) | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD grep-i — grep -i apple food.txt printed 'Apple pie' and 'apple juice'.<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/grep.html (OPTIONS -i) — -i: perform pattern matching in a case-insensitive manner. |
| `grep-v` | Print the lines of a file that do not match a pattern (en) / Skriv ut de rader i en fil som inte matchar ett mönster (sv) | grep -v <pattern> <file> (zxx) | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD grep-v — grep -v apple food.txt printed 'Apple pie', 'banana bread' and 'Cherry jam' (every line without lower-case 'apple').<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/grep.html (OPTIONS -v) — -v: select lines not matching any of the specified patterns. |
| `grep-n` | Print the lines of a file that match a pattern, each preceded by its line number (en) / Skriv ut de rader i en fil som matchar ett mönster, var och en med sitt radnummer först (sv) | grep -n <pattern> <file> (zxx) | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD grep-n — grep -n apple food.txt printed '2:apple juice'.<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/grep.html (OPTIONS -n) — -n: precede each output line by its relative line number in the file, each file starting at line 1. |
| `grep-r` | Search all files in a directory and its subdirectories, recursively, for a pattern (en) / Sök rekursivt efter ett mönster i alla filer i en katalog och dess underkataloger (sv) | grep -r <pattern> <dir> (zxx) — *Not in POSIX (GNU grep has it). A portable equivalent: find <dir> -type f -exec grep <pattern> /dev/null {} + (en) / Finns inte i POSIX (GNU grep har den). Portabel motsvarighet: find <dir> -type f -exec grep <pattern> /dev/null {} + (sv)* | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD grep-r — grep -r TODO src printed 'src/lib/deep.c:x TODO' and 'src/main.c:TODO: fix'; grep TODO src without -r failed ('src: Is a directory'); find src -type f -exec grep TODO {} + printed the same two lines as grep -r.<br>GNU Grep manual (for version 3.12): https://www.gnu.org/software/grep/manual/grep.html (File and Directory Selection, -r/--recursive) — -r, --recursive: for each directory operand, read and process all files in that directory, recursively.<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/grep.html (SYNOPSIS) — The synopsis is grep [-E\|-F] [-c\|-l\|-q] [-insvx] ... ; no recursive option is specified.<br>Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: QC round 1 re-test (qc1-tests.sh, grep section) — With one file src/a.c containing TODO: grep -r TODO src printed 'src/a.c:TODO'; find src -type f -exec grep TODO {} + printed only 'TODO'; find src -type f -exec grep TODO /dev/null {} + printed 'src/a.c:TODO'.<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/grep.html (STDOUT) — If more than one file argument appears, and -q is not specified, the grep utility shall prefix each output line by "%s:", <file>. |
| `find-name` | Find all files whose names end in .txt in the current directory and all its subdirectories (en) / Hitta alla filer vars namn slutar på .txt i aktuell katalog och alla dess underkataloger (sv) | find . -name '*.txt' (zxx) — *Quote the pattern so that find, not the shell, matches it: an unquoted *.txt is replaced by matching names in the current directory before find runs. (en) / Sätt mönstret inom citattecken så att find och inte skalet matchar det: utan citattecken ersätts *.txt av matchande namn i aktuell katalog innan find körs. (sv)* | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD find-name — find . -name '*.txt' printed ./a.txt, ./sub/b.txt and ./sub/deep/d.txt (not ./sub/c.md); find . -name *.txt unquoted printed only ./a.txt, because the shell had expanded the pattern to a.txt.<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/find.html (-name pattern) — -name pattern is true if the basename of the current pathname matches pattern using the shell's pattern matching notation; find walks the hierarchy below each path operand. |
| `find-dirs` | List the current directory and all directories below it, at every depth (en) / Lista aktuell katalog och alla kataloger under den, på alla nivåer (sv) | find . -type d (zxx) — *The current directory comes first in the list, written as a dot. (en) / Den aktuella katalogen kommer först i listan, skriven som en punkt. (sv)* | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD find-dirs — find . -type d printed ., ./sub and ./sub/deep, and no files.<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/find.html (-type c) — -type c is true if the type of the file is c, where 'd' stands for directory (b, c, l, p, f, s for the other types).<br>Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: QC round 1 re-test (qc1-tests.sh, find section) — In a directory d with sub/deep below it, find . -type d printed ., ./sub and ./sub/deep, in that order. |
| `chmod-x` | Make a file executable (en) / Gör en fil körbar (sv) | chmod +x <file> (zxx) — *Without u, g, o or a, chmod leaves out the bits your umask masks; chmod a+x gives everyone execute permission regardless. (en) / Utan u, g, o eller a hoppar chmod över de bitar som din umask maskerar; chmod a+x ger alla körrättighet oavsett umask. (sv)* | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD chmod-x — ./hello.sh first failed with 'Permission denied' (exit 126); after chmod +x hello.sh the mode was -rwxr-xr-x (umask 022) and ./hello.sh printed 'hello from script'. Under umask 077, chmod +x gave -rwxr--r-- while chmod a+x gave -rwxr-xr-x.<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/chmod.html (DESCRIPTION, symbolic mode; APPLICATION USAGE) — The who symbols u, g, o and a; x is the execute/search permission. With + and no who, the bits are set except for those with corresponding bits in the file mode creation mask (umask) of the invoking process. |
| `chmod-644` | Using an octal number, give a file read and write permission for its owner and read-only permission for everyone else (en) / Använd ett oktalt tal för att ge en fil läs- och skrivrättighet för ägaren och enbart läsrättighet för alla andra (sv) | chmod 644 <file> (zxx) — *The digits are for owner, group and others; 6 = read (4) + write (2), 4 = read. (en) / Siffrorna gäller ägare, grupp och övriga; 6 = läsa (4) + skriva (2), 4 = läsa. (sv)* | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD chmod-644 — On a file with mode 600, chmod 644 perm.txt gave -rw-r--r--.<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/chmod.html (DESCRIPTION, octal mode table) — For an octal integer mode operand the file mode bits are set absolutely: 0400 S_IRUSR, 0200 S_IWUSR, 0040 S_IRGRP, 0004 S_IROTH and so on; all other permission bits are cleared. |
| `chown` | Change the owner of a file (en) / Byt ägare på en fil (sv) | chown <user> <file> (zxx) — *Giving a file to another user usually requires superuser (root) privileges. (en) / Att ge en fil till en annan användare kräver oftast superanvändarbehörighet (root). (sv)* | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD chown — As user 1000, chown "$(id -un)" owned.txt exited 0 and the owner stayed 1000; chown root owned.txt failed with 'Operation not permitted' (uutils and GNU).<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/chown.html (DESCRIPTION, APPLICATION USAGE) — chown sets the user ID of each file operand to the user ID specified by the owner operand. Only the owner of a file or the user with appropriate privileges may change the owner or group; some implementations restrict chown to users with appropriate privileges. |
| `ps-ef` | List every process running on the system, in full format (en) / Lista alla processer som körs på systemet, i fullständigt format (sv) | ps -ef (zxx) — *ps itself, like -e and -f, is in POSIX's XSI option group. The BSD-style ps aux gives a similar list; the procps ps on Linux accepts both. (en) / ps självt hör, liksom -e och -f, till POSIX:s XSI-tillägg. Den BSD-liknande formen ps aux ger en liknande lista; procps ps på Linux godtar båda. (sv)* | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD ps-ef — ps -ef printed the header 'UID PID PPID C STIME TTY TIME CMD' and a line for the test's own background 'sleep 30'; it listed as many processes as ps -e; ps aux printed 'USER PID %CPU %MEM VSZ RSS TTY STAT START TIME COMMAND' (procps-ng 4.0.4).<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/ps.html (SYNOPSIS; OPTIONS -e, -f) — SYNOPSIS: '[XSI] ps [-aAw] [-defl] [-g grouplist] ...' (the utility is marked XSI); OPTIONS: -e [XSI]: write information for all processes (equivalent to -A); -f [XSI]: generate a full listing. |
| `kill` | Ask a process to terminate, given its process ID (en) / Be en process att avsluta sig, med hjälp av dess process-id (sv) | kill <pid> (zxx) — *Sends SIGTERM, which a process can catch or ignore. (en) / Skickar SIGTERM, som en process kan fånga eller ignorera. (sv)* | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD kill; CARD kill-9 — kill $pid on a background sleep 300 exited 0 and wait reported status 143 (128 + 15, SIGTERM); a shell that had run trap '' TERM was still running after kill.<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/kill.html (DESCRIPTION) — kill sends a signal to the processes specified by each pid operand: the signal given by -s or -signal_name, or SIGTERM if none of these options is specified. |
| `kill-9` | Force a process to stop immediately with a signal it cannot catch or ignore, given its process ID (en) / Tvinga en process att avslutas omedelbart med en signal som den inte kan fånga eller ignorera, med hjälp av dess process-id (sv) | kill -9 <pid> (zxx) — *9 is SIGKILL. The numeric form is an XSI option; kill -s KILL <pid> does the same on every POSIX system. (en) / 9 är SIGKILL. Den numeriska formen är ett XSI-tillägg; kill -s KILL <pid> gör samma sak på alla POSIX-system. (sv)* | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD kill-9 — A shell ignoring SIGTERM survived kill; kill -9 $pid ended it and wait reported status 137 (128 + 9, 'Killed'); kill -s KILL $pid on a second such shell did the same.<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/kill.html (SYNOPSIS, OPTIONS -signal_number); basedefs/signal.h.html — Synopsis: kill [-s signal_name] pid..., and [XSI] kill [-signal_number] pid...; the table maps 9 to SIGKILL. <signal.h> describes SIGKILL as 'Kill (cannot be caught or ignored)'. |
| `background` | Start a command in the background, so that the shell is ready for the next command at once (en) / Starta ett kommando i bakgrunden, så att skalet genast är redo för nästa kommando (sv) | <command> & (zxx) | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD background; jobs-pty output — sleep 2 & returned at once and the next command printed 'prompt is back; background job PID ...'; in the interactive shells, the prompt came back right after 'sleep 3 &'.<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/V3_chap02.html (2.9.3.1 Asynchronous AND-OR Lists) — If an AND-OR list is terminated by '&', the shell executes it asynchronously in a subshell in the background and does not wait for it to terminate before executing the next command. |
| `jobs` | List the background jobs started from the current shell (en) / Lista bakgrundsjobben som startats från det aktuella skalet (sv) | jobs (zxx) | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: jobs-pty output (dash -i and bash -i in a pseudo-terminal) — After sleep 3 &, jobs printed '[1] + Running sleep 3' (dash) and '[1]+ Running sleep 3 &' (bash).<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/jobs.html (DESCRIPTION) — jobs displays the status of background jobs that were created in the current shell execution environment; by default all background jobs, running and suspended.<br>Bash Reference Manual (Edition 5.3, 18 May 2025): https://www.gnu.org/software/bash/manual/bash.html (Job Control Builtins: jobs) — The first form of jobs lists the active jobs. |
| `fg` | Bring the most recent background job back to the foreground (en) / Ta tillbaka det senaste bakgrundsjobbet till förgrunden (sv) | fg (zxx) | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: jobs-pty output (dash -i and bash -i in a pseudo-terminal) — fg printed 'sleep 3', waited for it to finish and returned status 0; jobs then listed nothing.<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/fg.html (DESCRIPTION, OPERANDS) — If job control is enabled and the shell is interactive, fg moves a background job into the foreground; without a job_id operand it uses the job most recently suspended, placed in the background or run as a background job.<br>Bash Reference Manual (Edition 5.3, 18 May 2025): https://www.gnu.org/software/bash/manual/bash.html (Job Control Builtins: fg) — fg resumes the job in the foreground; if no jobspec is supplied, it resumes the current job. |
| `tar-create` | Pack a directory into a gzip-compressed tar archive (en) / Packa ihop en katalog till ett gzip-komprimerat tar-arkiv (sv) | tar -czf <archive>.tar.gz <dir> (zxx) — *c = create, z = gzip, f = archive file name, which must follow straight after. tar is not in POSIX (which specifies pax); these are GNU tar's options. (en) / c = skapa, z = gzip, f = arkivets filnamn, som måste följa direkt efter. tar finns inte i POSIX (som anger pax); flaggorna är GNU tar:s. (sv)* | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD tar-create — tar -czf project.tar.gz project exited 0; gzip -t confirmed a valid gzip file; tar -tzf listed project/, project/README, project/src/ and project/src/main.c (GNU tar 1.35).<br>GNU tar manual (for version 1.35.90, 11 June 2026): https://www.gnu.org/software/tar/manual/tar.html (Three most frequently used operations; -f; -z; option clusters) — -c / --create: create a new tar archive; -f / --file: specify the name of an archive file; -z / --gzip: filter the archive through gzip. In a cluster like 'tar -cfz', z becomes the value for option f, 'probably not what was intended'.<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/tar.html (HTTP 404) and utilities/pax.html — POSIX.1-2024 has no tar utility page (the URL answered 404); the archiving utility it specifies is pax. |
| `tar-extract` | Unpack a gzip-compressed tar archive into the current directory (en) / Packa upp ett gzip-komprimerat tar-arkiv i aktuell katalog (sv) | tar -xzf <archive>.tar.gz (zxx) — *GNU tar recognizes the compression by itself when reading, so tar -xf <archive>.tar.gz works too. (en) / GNU tar känner själv igen komprimeringen vid läsning, så tar -xf <archive>.tar.gz fungerar också. (sv)* | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD tar-extract — In an empty directory, tar -xzf ../project.tar.gz recreated project/README and project/src/main.c; tar -xf without z did the same in another directory.<br>GNU tar manual (for version 1.35.90, 11 June 2026): https://www.gnu.org/software/tar/manual/tar.html (-x; Creating and Reading Compressed Archives) — -x / --extract: extract members from the archive into the file system. 'Reading compressed archive is even simpler: you don't need to specify any additional options as GNU tar recognizes its format automatically.' |
| `redirect-out` | Write a command's output to a file, replacing whatever the file contained (en) / Skriv ett kommandos utdata till en fil och ersätt det som fanns i filen (sv) | <command> > <file> (zxx) | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD redirect-out — echo first > out.txt; echo second > out.txt; cat out.txt printed only 'second'.<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/V3_chap02.html (2.7.2 Redirecting Output) — [n]>word with n omitted refers to standard output; the file is created empty if it does not exist, otherwise opened as if with O_TRUNC (truncated). |
| `redirect-append` | Add a command's output to the end of a file (en) / Lägg till ett kommandos utdata i slutet av en fil (sv) | <command> >> <file> (zxx) | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD redirect-append — echo first > log.txt; echo second >> log.txt; cat log.txt printed 'first' and 'second'.<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/V3_chap02.html (2.7.3 Appending Redirected Output) — [n]>>word opens the file for output as if with O_APPEND; if it does not exist it is created. |
| `redirect-stderr` | Write a command's error messages to a file (en) / Skriv ett kommandos felmeddelanden till en fil (sv) | <command> 2> <file> (zxx) — *2 is file descriptor 2, standard error (stderr). (en) / 2 är fildeskriptor 2, standard error (stderr). (sv)* | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD redirect-stderr — ls exists.txt missing.txt 2> errors.txt printed 'exists.txt' on the terminal, and errors.txt contained the 'cannot access 'missing.txt'' message.<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/V3_chap02.html (2.7 Redirection; 2.7.2 Redirecting Output) — The format is [n]redir-op word, where n designates the file descriptor; [n]>word redirects file descriptor n (standard output when omitted).<br>Standard error and Kommandotolk (Swedish Wikipedia): Standard error (sv.wikipedia.org/wiki/Standard_error), introduction, via the API — Standard error förkortas stderr och är det dataflöde dit felmeddelanden normalt dirigeras i unixliknande system. |
| `redirect-both` | Write both a command's output and its error messages to the same file (en) / Skriv både ett kommandos utdata och dess felmeddelanden till samma fil (sv) | <command> > <file> 2>&1 (zxx) — *Order matters: 2>&1 must come after > <file>. Bash also accepts &> <file>, which is not POSIX: dash runs the command in the background and leaves the file empty. (en) / Ordningen spelar roll: 2>&1 måste stå efter > <file>. Bash godtar också &> <file>, som inte är POSIX: dash kör då kommandot i bakgrunden och lämnar filen tom. (sv)* | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD redirect-both — ls exists.txt missing.txt > both.txt 2>&1 printed nothing and both.txt held both the error and 'exists.txt'; with 2>&1 > wrong-order.txt the error still went to the terminal. bash -c with &> amp-bash.txt wrote both lines to the file; dash -c with &> left amp-dash.txt at 0 bytes and printed both lines on the terminal.<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/V3_chap02.html (2.7.6 Duplicating an Output File Descriptor; 2.7 Redirection) — [n]>&word makes file descriptor n a copy of the descriptor denoted by word; if more than one redirection operator is specified with a command, the order of evaluation is from beginning to end.<br>Bash Reference Manual (Edition 5.3, 18 May 2025): https://www.gnu.org/software/bash/manual/bash.html (Redirecting Standard Output and Standard Error) — Bash allows both standard output and standard error to be redirected to word with &>word (preferred) or >&word; this is semantically equivalent to >word 2>&1. |
| `pipe` | Use one command's output as the input of another command (en) / Använd ett kommandos utdata som indata till ett annat kommando (sv) | <command1> \| <command2> (zxx) | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD pipe — printf 'b\na\nc\n' \| sort printed a, b, c; grep -i apple food.txt \| wc -l printed 2.<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/V3_chap02.html (2.9.2 Pipelines) — A pipeline is a sequence of commands separated by '\|'; for each command but the last, the shell connects its standard output to the standard input of the next command. |
| `tee` | Show a command's output on the screen and save it to a file at the same time (en) / Visa ett kommandos utdata på skärmen och spara det i en fil samtidigt (sv) | <command> \| tee <file> (zxx) — *tee -a appends to the file instead of replacing its contents. (en) / tee -a lägger till i filen i stället för att ersätta innehållet. (sv)* | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD tee; CARD notes-checks — echo 'saved and shown' \| tee tee-out.txt printed the line, and the file contained it; echo one \| tee f then echo two \| tee -a f left both lines in f.<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/tee.html (DESCRIPTION, OPTIONS -a) — tee copies standard input to standard output, making a copy in zero or more files; -a appends the output to the files. |
| `df-h` | Show the size, used and free space of the mounted file systems, in human-readable units (en) / Visa storlek, använt och ledigt utrymme för de monterade filsystemen, i lättlästa enheter (sv) | df -h (zxx) — *-h is not in POSIX (GNU df has it), and df itself is in POSIX's XSI option group, with -k (1024-byte units) and -P (portable output format). GNU df leaves out pseudo file systems such as /proc unless -a is given. (en) / -h finns inte i POSIX (GNU df har den), och df hör självt till POSIX:s XSI-tillägg, med -k (enheter om 1024 byte) och -P (portabelt utdataformat). GNU df utelämnar pseudofilsystem som /proc om inte -a anges. (sv)* | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD df-h — df -h printed 'Filesystem Size Used Avail Use% Mounted on' and sizes such as 7.8G; df -k headed its column 1K-blocks and df -P 1024-blocks (GNU coreutils 9.7 in both runs).<br>GNU Coreutils manual (for version 9.12): https://www.gnu.org/software/coreutils/manual/coreutils.html (df, -h/--human-readable) — -h, --human-readable: append a size letter to each size, such as 'M' for mebibytes; powers of 1024 are used.<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/df.html (SYNOPSIS, OPTIONS) — Synopsis [XSI] df [-k] [-P\|-t] [file...]: -k uses 1024-byte units instead of the default 512-byte units; -P produces the format of the STDOUT section. No -h option.<br>GNU Coreutils manual (for version 9.12): https://www.gnu.org/software/coreutils/manual/coreutils.html (df invocation, -a/--all; local copy docs/coreutils.txt line 19191) — -a, --all: Include in the listing dummy, duplicate, or inaccessible file systems, which are omitted by default. Dummy file systems are typically special purpose pseudo file systems such as '/proc', with no associated storage.<br>Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: QC round 1 re-test (qc1-tests.sh, df section) — On the test machine df -h printed 22 lines and df -ah 45 lines: without -a, GNU df 9.7 left out the pseudo and duplicate file systems. |
| `du-sh` | Show the total disk space used by a directory, in human-readable units (en) / Visa det totala diskutrymme som en katalog använder, i lättlästa enheter (sv) | du -sh <dir> (zxx) — *-s gives one total; -h is not in POSIX (GNU du has it). Portable: du -sk <dir> gives the total in kibibytes. (en) / -s ger en enda summa; -h finns inte i POSIX (GNU du har den). Portabelt: du -sk <dir> ger summan i kibibyte. (sv)* | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD du-sh — For a directory holding about 3 MB, du -sh sized printed '2.9M sized' (one line) and du -sk sized printed '2944 sized' (uutils 0.8.0 and GNU 9.7 alike).<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/du.html (SYNOPSIS, OPTIONS -s, -k) — Synopsis du [-a\|-s] [-kx] [-H\|-L] [file...]; -s reports only the total sum for each file; -k uses 1024-byte units. No -h option.<br>GNU Coreutils manual (for version 9.12): https://www.gnu.org/software/coreutils/manual/coreutils.html (du, -s/--summarize, -h/--human-readable) — --summarize: display only a total for each argument; --human-readable: append a size letter such as 'M', powers of 1024. |
| `ping` | Check whether a host answers on the network, sending exactly 4 echo requests (en) / Kontrollera om en värd svarar i nätverket genom att skicka exakt 4 ekoförfrågningar (sv) | ping -c 4 <host> (zxx) — *ping is not a POSIX utility; this is the Linux (iputils) ping. (en) / ping är inget POSIX-verktyg; detta är Linux-varianten (iputils). (sv)* | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD ping — ping -c 4 127.0.0.1 printed 'PING 127.0.0.1 ...', four 'bytes from' replies and a summary line, then stopped (iputils 20250605).<br>ping(8) manual page of iputils (man7.org, from the iputils repository of 2026-07-16): https://man7.org/linux/man-pages/man8/ping.8.html (OPTIONS -c count) — -c count: stop after sending count ECHO_REQUEST packets. |
| `curl-o` | Download a file with curl into the current directory, keeping the file name from the URL (en) / Ladda ned en fil med curl till aktuell katalog och behåll filnamnet från URL:en (sv) | curl -O <url> (zxx) — *Capital O. Without it curl writes the data to the terminal; lower-case -o <file> saves it under a name you choose. (en) / Versalt O. Utan flaggan skriver curl data till terminalen; gement -o <file> sparar under ett namn du väljer. (sv)* | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD curl-o; CARD notes-checks — curl -O https://raw.githubusercontent.com/curl/curl/master/COPYING saved a 1088-byte file named COPYING in the current directory; curl -o chosen-name.txt saved chosen-name.txt; curl -s without either wrote the text to standard output (curl 8.18.0).<br>curl man page (curl.se/docs/manpage.html, describing curl 8.23.0): https://curl.se/docs/manpage.html (-O, --remote-name; -o, --output; DESCRIPTION) — -O writes output to a local file named like the remote file (only the file part), saved in the current working directory; -o writes output to the given file instead of stdout; if not told otherwise, curl writes the received data to stdout. |
| `ssh` | Log in to a remote machine over SSH as a given user (en) / Logga in på en fjärrdator via SSH som en viss användare (sv) | ssh <user>@<host> (zxx) | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD ssh — ssh -G alice@example.org reported 'user alice', 'hostname example.org', 'port 22'; ssh -v to github.com as git (user's keys and configuration excluded) showed 'Connecting to github.com ... port 22', 'Authenticating to github.com:22 as 'git'' and the server's 'Permission denied (publickey)' (OpenSSH 10.2p1). No completed login was observed: no SSH server was available.<br>OpenSSH manual pages ssh(1) and scp(1) (man.openbsd.org, OpenBSD-current): https://man.openbsd.org/ssh.1 (DESCRIPTION) — ssh connects and logs into the specified destination, which may be given as [user@]hostname or as a URI. |
| `scp` | Copy a local file to a directory on a remote machine with scp (secure copy over SSH) (en) / Kopiera en lokal fil till en katalog på en fjärrdator med scp (säker kopiering över SSH) (sv) | scp <file> <user>@<host>:<dir> (zxx) — *Mind the colon after the host: without it, scp makes a local copy named <user>@<host>. (en) / Glöm inte kolonet efter värden: utan det gör scp en lokal kopia med namnet <user>@<host>. (sv)* | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD scp; CARD notes-checks — scp -v upload.txt git@github.com:backup/ ran 'program /usr/bin/ssh host github.com, user git, command sftp' and reached 'Authenticating to github.com:22 as 'git'' before the server refused the login (no completed transfer observed: no SSH server available). scp upload.txt alice@example.org without a colon created a local file named alice@example.org containing 'payload'.<br>OpenSSH manual pages ssh(1) and scp(1) (man.openbsd.org, OpenBSD-current): https://man.openbsd.org/scp.1 (DESCRIPTION) — scp copies files between hosts on a network using SFTP over SSH; remote files are given in the form [user@]host:[path] or as an scp:// URI. |
| `man` | Show the manual page of a command (en) / Visa manualsidan för ett kommando (sv) | man <command> (zxx) | Test runs of every command with dash 0.5.12 and bash 5.3.9 on Ubuntu 26.04 (uutils coreutils 0.8.0 and GNU coreutils 9.7) in a throwaway directory: CARD man — man ls (with MANPAGER=cat) printed the manual page headed 'LS(1) General Commands Manual' with its NAME section.<br>The Open Group Base Specifications Issue 8 (IEEE Std 1003.1-2024, POSIX.1-2024): the Shell and Utilities volume (utility pages and chapter 2, Shell Command Language) and <signal.h>: https://pubs.opengroup.org/onlinepubs/9799919799/utilities/man.html (DESCRIPTION) — man writes information about each of the name operands; for a standard utility, at a minimum a message describing its syntax, options and operands. |
