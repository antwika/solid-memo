# Git commands — provenance report

<!-- Generated from authored/git-commands.json by scripts/authored_decks.py. Do not edit: change the dossier and rebuild. -->

**Deck:** [`decks/git-commands.ttl`](../decks/git-commands.ttl) · **Cards:** 56 · **Licence:** [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) · **Compiled by:** Anton Wiklund · **Created:** 2026-10-04

56 everyday Git commands: the front describes a task in plain words in English and Swedish, the back is the command that does it, with placeholders such as <branch> or <file>. Uses the current commands Git recommends (git switch and git restore rather than git checkout, git config set), with older equivalents in notes. Every command was run with Git 2.53.0 in a test repository and checked against the official Git reference manual.

## Sources

| Source | Creator | Licence | Role | Retrieved | Used for |
|---|---|---|---|---|---|
| [Test run of every command with Git 2.53.0 in a throwaway repository](https://github.com/antwika/solid-memo/blob/main/packages/deck-library/authored/git-commands.md#queries) | Claude (AI, Anthropic), authoring agent, at Anton Wiklund's direction | [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) | content | 2026-10-04 | The command on every card: each command (with its placeholders filled in) was run in a throwaway repository, and the observed effect is the evidence that the command performs the task on the front. Also the older equivalents, long and short option forms and behaviours named in the notes: the sections 'CARD older-equivalents' (first run) and 'CARD notes-checks' (added in quality-control round 3, extended in rounds 4 and 5) run each of them. The one note fact the run cannot show is the Git version (2.46) that introduced the git config subcommands; it comes from the release notes (see Licensing). |
| [Git reference manual (git-scm.com/docs, latest version 2.56.0)](https://git-scm.com/docs) | The Git project | [GNU General Public License 2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.html) | verification | 2026-10-04 | Confirming for every card that the command and option are documented to do what the front says, and that git switch, git restore and the git config subcommands are the current documented forms. No wording or selection was copied: fronts and notes are the authoring agent's own words. |
| [Git 2.46.0 release notes (Documentation/RelNotes/2.46.0.adoc in the Git source repository)](https://github.com/git/git/blob/master/Documentation/RelNotes/2.46.0.adoc) | The Git project | [GNU General Public License 2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.html) | verification | 2026-10-04 | Confirming the Git version (2.46) in which git config gained its subcommands (git config set, get, ...), named in the notes of the two configuration cards. Nothing copied. |
| [Git's Swedish translation (po/sv.po in the Git source repository, for Git 2.56.0)](https://github.com/git/git/blob/master/po/sv.po) | Peter Krefting and the Git project | [GNU General Public License 2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.html) | verification | 2026-10-04 | Checking that the single Swedish technical terms on the fronts are the ones Git itself uses in Swedish: arkiv (repository), fjärrarkiv (remote), gren (branch), fjärrspårande gren (remote-tracking branch), uppströmsgren (upstream branch), incheckning / checka in (commit), köa / köad (stage / staged), ospårad (untracked), arbetskatalog (working tree), stycke (hunk), ombasering (rebase), sammanslagning / slå ihop (merge), tagg, annoterad (annotated). No sentences were copied; the Swedish fronts are the authoring agent's own wording. |

**Content** sources supplied information that is in the cards. **Verification** sources were only consulted to confirm facts: nothing was copied from them.

### Licence evidence

- **Test run of every command with Git 2.53.0 in a throwaway repository** — Written for this deck: the test script and its recorded output are reproduced verbatim in the Queries section of this report (the URL above). The test script and the authoring agent's annotations are dedicated to the public domain under CC0 1.0. The program messages quoted in the recorded output (such as Git's hint and error texts) are Git's own (GNU GPL v2, https://raw.githubusercontent.com/git/git/master/COPYING, fetched 2026-10-04: "the only valid version of the GPL as far as this project is concerned is _this_ particular version of the license (ie v2 ...)") and are reproduced only as a factual record of what the program printed; the deck itself contains none of them. Running a program and recording which command lines it accepts and what they do copies none of its code or documentation.
- **Git reference manual (git-scm.com/docs, latest version 2.56.0)** — https://git-scm.com/site (fetched 2026-10-04): "The reference manual is imported from the Git project, and is available under the GPL." The same page says the Pro Git book on the site is under a CC-BY-NC-SA licence; the book was not used.
- **Git 2.46.0 release notes (Documentation/RelNotes/2.46.0.adoc in the Git source repository)** — The Git source repository is licensed under the GPL v2: https://raw.githubusercontent.com/git/git/master/COPYING (fetched 2026-10-04): "Note that the only valid version of the GPL as far as this project is concerned is _this_ particular version of the license (ie v2, not v2.2 or v3.x or whatever)".
- **Git's Swedish translation (po/sv.po in the Git source repository, for Git 2.56.0)** — File header of https://raw.githubusercontent.com/git/git/master/po/sv.po (fetched 2026-10-04): "This file is distributed under the same license as the Git package." The Git package is GPL v2 (COPYING, see git-relnotes).

## Licensing

The deck is CC0 1.0. Its only content source is the authoring agent's own test run of the commands with the installed git program, whose script and output are reproduced in this report; the script and the agent's annotations are dedicated to the public domain with the deck, while the Git messages quoted in the output remain Git's (GPL-2.0) and are reproduced only as a factual record, none of them in the deck. Which command line performs a task is a fact about the program's behaviour, and observing it copies nothing from Git's GPL-2.0 code or documentation. The fronts, notes and the selection of tasks are the authoring agent's own wording and choice. The Git reference manual on git-scm.com, the Git 2.46.0 release notes and Git's Swedish translation file are all GPL-2.0 and were used as verification sources only: they confirmed that each command does what the front says and that the Swedish technical terms are the ones Git uses, and no sentence, example or list was copied from them (single technical terms such as 'gren', 'incheckning' or 'helt sammanslagen' are ordinary Swedish vocabulary, not protected expression). After review the fronts were checked against the manual's NAME lines and option texts and against their sv.po translations, and the five that followed them closely were reworded (quality-control rounds 2 and 3). In round 5 a reviewer noted that the fronts of branch-delete and branch-force-delete resemble git branch's short option help strings ('delete fully merged branch', 'delete branch (even if not merged)') and their sv.po translations; these are minimal functional descriptions of what the option does, the fronts are full sentences of the agent's own, and they were kept. One fact in the notes is not shown by the test run: that the git config subcommands arrived in Git 2.46. It comes from the 2.46.0 release notes; a release number is a bare fact, not copyrightable, and nothing else was taken from them. Command names and option spellings are the program's interface, needed to state the fact at all. The Pro Git book (CC BY-NC-SA) and third-party cheat sheets were not consulted, nor was the git-scm.com cheat sheet (MIT): the task list and wording were written independently, and the blame front, which a reviewer found resembled both the manual and that cheat sheet, was reworded. No source's licence therefore requires attribution or share-alike, though every source is credited in the deck and this report.

## Method

1. Who did the work: the research, drafting and cross-checking were done by AI agents (Claude, Anthropic) at Anton Wiklund's direction, with machine checks (a test run of every command in a throwaway repository, the builder's dossier checks, and the app's SHACL and DCAT-AP validators). Round 0 of the quality-control log is the authoring agent's own checks; reviews by independent AI reviewers are recorded as further rounds when they have taken place. No human subject expert has reviewed the cards yet.
2. Candidate tasks: the authoring agent drew up a list of about 60 everyday Git tasks covering setting up a repository, staging and committing, undoing changes, branches, merging and rebasing, history, remotes, stashing and tags (see Selection). The list is the agent's own; it was not taken from any published list or cheat sheet.
3. Current commands: where Git now offers a dedicated command, the deck uses it: git switch for changing and creating branches and git restore for discarding and unstaging changes (both documented in the current reference manual without any experimental warning, and suggested by git status itself: "use git restore --staged <file>... to unstage", "use git restore <file>... to discard changes in working directory"), and git config set for writing configuration, because the git-config manual lists the old form git config <name> <value> under DEPRECATED MODES and recommends the subcommands (introduced in Git 2.46.0 according to its release notes). The older equivalents (git checkout -b, git checkout -, git checkout <branch>, git checkout -- <file>, git reset <file>, git config --global ...) are given in back notes and were run too.
4. Notation on the back: the exact command as typed, with placeholders in angle brackets (<branch>, <file>, <commit>, <url>, <name>, <tag>, <message>, <email>, <old>, <new>, <new-name>) as in the Git manual's synopses, and quotes where a value usually contains spaces ("<name>", "<message>"). Short options are used where Git has them (-c, -A, -p, -u, -m, -a, -d, -D, -f); the long form is named in a note where it is commonly seen. Remote commands that need a remote name use origin, the name git clone gives the remote, and the front says so.
5. Test run (the content source): the script run-git-commands.sh (reproduced verbatim under Queries) was run with bash on Linux with the installed git, version 2.53.0, on 2026-10-04. It isolates itself from the user's own Git configuration (HOME, GIT_CONFIG_GLOBAL and GIT_CONFIG_NOSYSTEM point into the scratch directory), fixes the author and committer dates so that commit ids are repeatable, uses a bare repository in the scratch directory as the remote origin and a second clone of it to simulate another person's pushes, and runs every card's command with its placeholders filled in, followed by commands that show the effect (git status --short, git log --oneline, git branch, ls, git branch -r and so on). The editor is replaced by the command true (GIT_EDITOR=true) so that git commit --amend and git revert can run unattended, and git add -p was answered with y on standard input. The full output is reproduced under Queries; every card's evidence cites its section ("CARD <id>") and what it showed. In quality-control round 3 the script was extended, at the end only, with a section 'CARD notes-checks' that runs, in a fresh repository with its own bare remote, the remaining forms and behaviours the notes name: git add --patch, git show without an argument, git switch --create, git branch --delete --force, a git stash pop that conflicts and a git stash apply (each followed by git stash list), git stash -u with an ignored file present, git push without and with --tags, git tag -m without -a, git fetch -p after a branch was deleted in the remote repository, git clean -f and -f -d run from a subdirectory with a nested untracked directory, and git reset --hard leaving a commit that another branch still contains. The whole script was re-run with git 2.53.0 on 2026-10-04 (python3 gc-run.py, which runs bash run-git-commands.sh with its output in run-output.txt); the output of every earlier section was byte for byte the same as in the first run, and the full new output is under Queries. In quality-control round 4 two checks were appended at the end of that section: git reset --hard with one unstaged and one staged change followed by git fsck --lost-found, and git branch -d / -D on a branch that is merged into another branch but not into HEAD. The script was re-run the same way on 2026-10-04; the output of everything before the new checks was byte for byte the same as in the round-3 run. In quality-control round 5 two more were appended: git reset --hard HEAD~1 followed by git log ORIG_HEAD and git reset --hard ORIG_HEAD, and git branch -D on a branch that HEAD never visited, recreated from the commit id that git branch -D printed. The script was re-run the same way; the output of everything before the new checks was byte for byte the same as in the round-4 run.
6. Cross-check (verification source): for every card the git-scm.com manual page of the command (latest version, 2.56.0, fetched as HTML and converted to text on 2026-10-04 with fetch_docs.py, reproduced under Queries) was read at the option used, and the evidence records what it documents. Behaviour seen in the test run with Git 2.53.0 and documented for 2.56.0 agreed for every card; the one version difference found (git pull with diverged branches, see Quality control) affects only a note. The manual pages were read at the cited options with the helper scripts opts.py and grep2.py (print the lines after given headings of the converted pages), the manual's version with inspect.py, the licence page and the release notes with fetch.py, and Git's Swedish translation with po.py; all five are reproduced verbatim under Queries with the command lines used. The exact command lines of the first session were not recorded; the ones given were re-run in quality-control round 3 and produced the facts cited.
7. Swedish text: the Swedish fronts and notes were written by the authoring agent in its own words, using the technical terms of Git's own Swedish translation (po/sv.po, checked by searching the file for the English message strings, e.g. 'Changes to be committed' -> 'Ändringar att checka in', 'Untracked files' -> 'Ospårade filer', 'Stage this hunk' -> 'Köa stycket', 'remote-tracking branch' -> 'fjärrspårande gren'). Placeholders and commands on the backs and in notes are kept in their English form because they are typed literally. After review (rounds 2 and 3) the fronts were also compared with the manual's one-line NAME descriptions and option texts and with their sv.po translations, and the fronts that followed them closely (blame, rebase, pull-rebase, log-follow, fetch-prune) were rewritten with a different structure.
8. Ambiguity checks: each front was written so that one command answers it: fronts name the scope (one file, the whole working tree, the current directory), the remote (origin), whether to switch, keep or discard changes, and whether the stash includes untracked files. Pairs that look alike were made distinct on purpose: git restore --staged (unstage, file stays tracked) versus git rm --cached (stop tracking); git branch -d versus -D; git reset --soft versus --hard; git stash versus git stash -u; git pull versus git pull --rebase; git diff versus git diff --staged. Where Git accepts an exact synonym (--staged/--cached, -A/--all, -u/--set-upstream, HEAD~1/HEAD^, git stash/git stash push), the deck's form is the one the manual describes first or the shorter one, and the synonym is named in the note. Because the study direction is front to back only, the builder's uniqueness check applies to the fronts, and every front is unique in both languages.
9. Everything was then written into this dossier, built with the builder (scripts/authored_decks.py build git-commands) and validated with the app's SHACL and DCAT-AP validators (scripts/validate_sources.ts git-commands). There are no Wikidata checks: no card's fact or wording is a Wikidata statement or label.

## Selection

56 tasks that come up in everyday work with Git on the command line: setting up (init, clone, user name and email), the staging and committing cycle (status, add, diff, commit, amend), undoing changes (restore, revert, reset --soft and --hard, clean), moving and removing files (rm, rm --cached, mv), branches (list, create, switch, rename, delete, merge, rebase, cherry-pick), history (log, log --oneline, log --follow, show, blame, reflog), remotes (remote, fetch, pull, push, upstream, deleting a remote branch, pruning), the stash (stash, stash -u, list, pop) and annotated tags. Left out: plumbing commands; rarely needed or advanced porcelain (bisect, worktree, submodule, sparse-checkout, interactive rebase, filter-branch, reset --mixed, git switch --detach); commands whose canonical form is still disputed or changing between Git versions; commands that duplicate a card with another spelling (git checkout for switching and restoring, which appear only as older equivalents in notes); and tasks that cannot be phrased so that only one command answers them (for example 'stage all changes in this directory', which git add . and git add -A both do in the top-level directory). Three further tasks were tested but dropped at the end to keep the deck near 50 cards, and are mentioned in notes instead: listing all branches (git branch -a), listing tags (git tag) and a dry run of git clean (-n).

## Queries

**Version of the installed git used for the test run** (Test run of every command with Git 2.53.0 in a throwaway repository)

```
git --version  ->  git version 2.53.0
```

**Test script run-git-commands.sh (the section 'CARD notes-checks' was added in quality-control round 3 and extended at its end in rounds 4 and 5), run on Linux with git 2.53.0 on 2026-10-04 with: python3 gc-run.py (which runs bash run-git-commands.sh with stdout and stderr in run-output.txt)** (Test run of every command with Git 2.53.0 in a throwaway repository)

```
#!/usr/bin/env bash
# Exercise every command of the git-commands deck in a throwaway repository.
# Isolated from the user's configuration: HOME, global config and system config
# all point into this scratch directory; fixed dates make the run repeatable.
set -u
S=/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo/29afcb49-8c27-4a6e-be7b-e04afdd93785/scratchpad/git-commands/run
rm -rf "$S"
mkdir -p "$S/home"
export HOME="$S/home"
export GIT_CONFIG_GLOBAL="$S/home/.gitconfig"
export GIT_CONFIG_NOSYSTEM=1
export GIT_CEILING_DIRECTORIES="$S"
export GIT_PAGER=cat PAGER=cat GIT_EDITOR=true
export GIT_AUTHOR_DATE="2026-10-04T12:00:00Z" GIT_COMMITTER_DATE="2026-10-04T12:00:00Z"
export LC_ALL=C.UTF-8 LANGUAGE=en
card() { echo; echo "########## CARD $1"; }
run() { echo "\$ $*"; "$@" 2>&1; echo "[exit $?]"; }

card version
run git --version

# A bare repository plays the remote ("origin").
run git init --bare -b main "$S/remote.git"

card init
echo "-- the default branch name is set first so that this run's branches are called main"
run git config set --global init.defaultBranch main
mkdir "$S/project"; cd "$S/project"
run git init
run git branch --show-current
run git rev-parse --is-inside-work-tree

card config-name
run git config set --global user.name "Ada Lovelace"
card config-email
run git config set --global user.email "ada@example.org"
echo "-- check: global config file"; cat "$GIT_CONFIG_GLOBAL"
run git config get user.name
echo "-- older equivalent still accepted:"
run git config --global user.name "Ada Lovelace"
run git config get --global user.name

card status
echo hello > a.txt
run git status

card add-file
run git add a.txt
run git status --short

card commit-message
run git commit -m "First commit"
run git log --oneline

card diff
echo "hello world" > a.txt
run git diff

card restore
run git restore a.txt
run git status --short
run cat a.txt

card add-patch
printf 'one\ntwo\n' > b.txt; git add b.txt; git commit -q -m "Add b"
printf 'ONE\ntwo\n' > b.txt
echo "-- answering y to the single hunk"
echo y | git add -p 2>&1; echo
run git status --short

card diff-staged
run git diff --staged
echo "-- --cached is a synonym:"
run git diff --cached --stat
echo "-- what git status suggests for staged changes:"
run git status

card restore-staged
run git restore --staged b.txt
run git status --short
run git diff --stat

card add-all
echo new > c.txt; rm b.txt; echo changed >> a.txt
mkdir sub; echo x > sub/d.txt
cd sub
echo "-- run from a subdirectory: -A stages the whole tree"
run git add -A
cd ..
run git status --short
git commit -q -m "Add c and d, delete b, change a"

card commit-amend
echo extra > e.txt; git add e.txt
run git commit --amend --no-edit
run git show --stat --oneline HEAD
echo "-- (plain git commit --amend opens the editor; GIT_EDITOR=true here)"
echo more >> e.txt; git add e.txt
run git commit --amend
run git log --oneline

card rm
run git rm c.txt
run git status --short
run ls
git commit -q -m "Remove c"

card rm-cached
run git rm --cached e.txt
run git status --short
run ls
git commit -q -m "Stop tracking e"

card mv
run git mv a.txt alpha.txt
run git status --short
git commit -q -m "Rename a to alpha"

card log-follow
run git log --oneline --follow alpha.txt
echo "-- without --follow the history stops at the rename:"
run git log --oneline alpha.txt

card branch-create
run git branch feature
card branch-list
run git branch
card switch
run git switch feature
run git branch --show-current
card switch-previous
run git switch -
run git branch --show-current
card switch-create
run git switch -c topic
run git branch --show-current

card branch-rename
run git branch -m topic2
run git branch

card merge
echo f > f.txt; git add f.txt; git commit -q -m "Add f on topic2"
git switch -q main
run git merge topic2
run git log --oneline -n 2

card branch-delete
run git branch -d topic2
card branch-force-delete
git switch -q -c spike; echo s > s.txt; git add s.txt; git commit -q -m "Spike"; git switch -q main
run git branch -d spike
run git branch -D spike

card merge-abort
git switch -q -c conflict; echo theirs > alpha.txt; git commit -q -am "Theirs"
git switch -q main; echo ours > alpha.txt; git commit -q -am "Ours"
run git merge conflict
run git merge --abort
run git status --short

card rebase
git switch -q -c rebased conflict~1
echo r > r.txt; git add r.txt; git commit -q -m "Add r"
run git rebase main
run git log --oneline -n 3

card rebase-continue
git switch -q conflict
run git rebase main
echo resolved > alpha.txt; git add alpha.txt
run git rebase --continue
run git log --oneline -n 2

card rebase-abort
git switch -q -c conflict2 main~1; echo other > alpha.txt; git commit -q -am "Other"
run git rebase main
run git rebase --abort
run git status

card cherry-pick
git switch -q main
C=$(git rev-parse rebased)
run git cherry-pick "$C"
run git log --oneline -n 2

card log
run git log -n 2
card log-oneline
run git log --oneline -n 3
card show
run git show --stat HEAD
card blame
run git blame alpha.txt
card reflog
run git reflog -n 5

card revert
H=$(git rev-parse HEAD)
run git revert --no-edit "$H"
run git log --oneline -n 2
echo "-- (plain git revert <commit> opens the editor; GIT_EDITOR=true here)"
run git revert HEAD
run git log --oneline -n 1

card reset-soft
echo z > z.txt; git add z.txt; git commit -q -m "Commit to undo"
run git reset --soft HEAD~1
run git status --short
run git log --oneline -n 1
git commit -q -m "Add z"

card reset-hard
T=$(git rev-parse HEAD~1)
echo dirty >> alpha.txt
run git reset --hard "$T"
run git status --short
run git log --oneline -n 1

card stash
echo wip >> alpha.txt; echo untracked > u.txt
run git stash
run git status --short
card stash-list
run git stash list
card stash-pop
run git stash pop
run git stash list
card stash-untracked
run git stash -u
run git status --short
run git stash list
git stash pop -q

card clean-dry-run
git restore alpha.txt
run git clean -n
card clean
run git clean -f
run git status --short
echo "-- without -f (clean.requireForce defaults to true):"
echo u > u2.txt
run git clean
rm -f u2.txt

card tag-annotated
run git tag -a v1.0 -m "Version 1.0"
run git cat-file -t v1.0
card tag-list
run git tag

card remote-add
run git remote add origin "$S/remote.git"
card remote-list
run git remote -v

card push-upstream
run git push -u origin main
run git status -sb
card push
echo p > p.txt; git add p.txt; git commit -q -m "Add p"
run git push
card push-tag
run git push origin v1.0
run git ls-remote --tags origin

card clone
cd "$S"
run git clone "$S/remote.git" clone
cd "$S/clone"
run git log --oneline -n 1
run git branch -a
card branch-all
run git branch -a

# Someone else pushes from the clone.
git switch -q -c old-branch; git push -q -u origin old-branch 2>/dev/null
git switch -q main; echo q > q.txt; git add q.txt; git commit -q -m "Add q (from clone)"; git push -q 2>/dev/null

card fetch
cd "$S/project"
run git fetch
run git status -sb
run git log --oneline -n 1
card pull
run git pull
run git log --oneline -n 1

card push-delete
run git push origin --delete old-branch
card fetch-prune
cd "$S/clone"
run git branch -r
run git fetch --prune
run git branch -r

card pull-rebase
cd "$S/clone"; echo w > w.txt; git add w.txt; git commit -q -m "Add w (clone)"; git push -q 2>/dev/null
cd "$S/project"; echo l > l.txt; git add l.txt; git commit -q -m "Add l (local)"
echo "-- plain git pull with diverged branches and no pull.rebase setting:"
run git pull
run git pull --rebase
run git log --oneline -n 3

card older-equivalents
echo "-- the older or long forms named in the back notes, in a fresh repository"
mkdir "$S/older"; cd "$S/older"
git init -q; echo a > a.txt; git add a.txt; git commit -q -m "A"
run git checkout -b other
run git checkout -
run git branch --show-current
run git checkout other
run git branch --show-current
git checkout -q main
echo "-- git add . only covers the current directory and below:"
mkdir sub; echo s > sub/s.txt; echo top > top.txt
cd sub
run git add .
cd ..
run git status --short
git rm -q --cached sub/s.txt; rm -r sub top.txt
echo "-- git clean -f without -d leaves untracked directories; -d removes them:"
mkdir ud; echo x > ud/x.txt; echo y > y.txt
run git clean -f
run ls
run git clean -f -d
run ls
echo changed > a.txt
run git checkout -- a.txt
run cat a.txt
echo changed > a.txt; git add a.txt
run git reset a.txt
run git status --short
run git add --all
run git status --short
git commit -q -m "B"
run git reset --soft HEAD^
run git status --short
git commit -q -m "B again"
echo wip >> a.txt
run git stash push
run git stash list
git stash pop -q
git restore a.txt
echo u > u.txt
run git clean --dry-run
run git stash --include-untracked
run git status --short
git stash pop -q
rm u.txt
git remote add origin "$S/remote.git"
run git switch -c older-branch
run git push --set-upstream origin older-branch
run git push origin --delete older-branch
run git branch --move renamed
run git branch --show-current
run git log --pretty=oneline -n 1

# Added in quality-control round 3: the remaining forms and behaviours named in
# the back notes, in a fresh repository with its own bare remote.
card notes-checks
echo "-- forms and behaviours named in the back notes that the sections above do not show"
git init -q --bare -b main "$S/notes-remote.git"
mkdir "$S/notes"; cd "$S/notes"
git init -q; printf 'one\ntwo\n' > a.txt; git add a.txt; git commit -q -m "A"
git remote add origin "$S/notes-remote.git"; git push -q -u origin main 2>/dev/null

echo "-- add-patch: long form --patch (answering y to the single hunk)"
printf 'ONE\ntwo\n' > a.txt
echo y | git add --patch 2>&1; echo
run git status --short
git commit -q -m "B"

echo "-- show: without an argument git show shows HEAD"
run git show

echo "-- switch-create: long form --create"
run git switch --create x
run git branch --show-current
echo x > x.txt; git add x.txt; git commit -q -m "X"
git switch -q main
echo "-- branch-force-delete: --delete --force on the unmerged branch x"
run git branch --delete --force x
run git branch

echo "-- stash-pop: a pop that conflicts keeps the entry"
echo wip >> a.txt
run git stash
echo other > a.txt; git commit -q -am "Conflicting change"
run git stash pop
run git stash list
git reset -q --hard HEAD~1
echo "-- stash-pop: git stash apply (no conflict) does not remove the entry"
run git stash apply
run git stash list
git stash drop -q; git restore a.txt

echo "-- stash-untracked: -u stashes untracked files but leaves ignored ones"
echo "*.log" > .gitignore; git add .gitignore; git commit -q -m "Ignore logs"
echo log > debug.log; echo u > u.txt; echo wip >> a.txt
run git stash -u
run git status --short --ignored
git stash pop -q; rm u.txt debug.log; git restore a.txt

echo "-- push-tag: plain git push sends no tags; naming one or --tags does"
git push -q 2>/dev/null
run git tag -m "Version 1" v1
run git tag lightweight
run git push
run git ls-remote --tags origin
run git push --tags
run git ls-remote --tags origin

echo "-- tag-annotated: -m without -a also creates an annotated tag object"
run git cat-file -t v1
run git cat-file -t lightweight

echo "-- fetch-prune: short form -p"
git push -q origin main:gone 2>/dev/null; git fetch -q
run git branch -r
echo "-- the branch gone is deleted on the remote itself (as if by someone else)"
git --git-dir="$S/notes-remote.git" branch -q -D gone
run git fetch -p
run git branch -r

echo "-- clean: from a subdirectory, -f deletes untracked files there but not inside untracked directories, nor above it"
mkdir -p sub/nested; echo t > sub/t.txt; git add sub/t.txt; git commit -q -m "Sub"
echo top > top.u; echo s > sub/s.u; echo n > sub/nested/n.u
cd sub
run git clean -f
run git status --short --untracked-files=all
run git clean -f -d
cd ..
run git status --short --untracked-files=all
rm top.u

echo "-- reset-hard: commits left behind by the reset stay on another branch that contains them"
git switch -q -c keep; echo k > k.txt; git add k.txt; git commit -q -m "K"; git switch -q main; git merge -q keep
run git log --oneline -n 1
run git reset --hard HEAD~1
run git log --oneline -n 1
run git log --oneline -n 1 keep

echo "-- reset-hard: unstaged changes are lost, but staged content was already stored and git fsck finds it (added in quality-control round 4)"
echo "unstaged-content" >> a.txt; echo "staged-content" > s.txt; git add s.txt
run git reset --hard
run git status --short
run git fsck --lost-found
run git cat-file -p "$(git hash-object --stdin <<< staged-content)"

echo "-- branch-force-delete: a branch that is not merged into HEAD, but is contained in another branch (added in quality-control round 4)"
git switch -q -c feat; echo f > f.txt; git add f.txt; git commit -q -m "F"
git switch -q -c integ main; git merge -q --no-edit feat; git switch -q main
run git branch -d feat
run git branch -D feat
run git log --oneline -n 1 integ

echo "-- reset-hard: git reset stores the old branch tip in ORIG_HEAD, from which the dropped commit can be restored (added in quality-control round 5)"
echo o > o.txt; git add o.txt; git commit -q -m "O"
run git log --oneline -n 1
run git reset --hard HEAD~1
run git log --oneline -n 1 ORIG_HEAD
run git reset --hard ORIG_HEAD
run git log --oneline -n 1

echo "-- branch-force-delete: a branch never checked out leaves no HEAD reflog entry; git branch -D prints its tip, from which it can be recreated (added in quality-control round 5)"
N=$(git commit-tree -p HEAD -m "N" "HEAD^{tree}")
git update-ref refs/heads/side "$N"
OUT=$(git branch -D side 2>&1); echo "\$ git branch -D side"; echo "$OUT"
run git log -g --format=%s HEAD
TIP=$(echo "$OUT" | sed -n 's/.*(was \([0-9a-f]*\)).*/\1/p')
run git branch side "$TIP"
run git log --oneline -n 1 side
echo "########## END"
```

**Complete output of run-git-commands.sh (run-output.txt) from the round-5 run; each card's evidence cites its section** (Test run of every command with Git 2.53.0 in a throwaway repository)

```

########## CARD version
$ git --version
git version 2.53.0
[exit 0]
$ git init --bare -b main /tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo/29afcb49-8c27-4a6e-be7b-e04afdd93785/scratchpad/git-commands/run/remote.git
Initialized empty Git repository in /tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo/29afcb49-8c27-4a6e-be7b-e04afdd93785/scratchpad/git-commands/run/remote.git/
[exit 0]

########## CARD init
-- the default branch name is set first so that this run's branches are called main
$ git config set --global init.defaultBranch main
[exit 0]
$ git init
Initialized empty Git repository in /tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo/29afcb49-8c27-4a6e-be7b-e04afdd93785/scratchpad/git-commands/run/project/.git/
[exit 0]
$ git branch --show-current
main
[exit 0]
$ git rev-parse --is-inside-work-tree
true
[exit 0]

########## CARD config-name
$ git config set --global user.name Ada Lovelace
[exit 0]

########## CARD config-email
$ git config set --global user.email ada@example.org
[exit 0]
-- check: global config file
[init]
	defaultBranch = main
[user]
	name = Ada Lovelace
	email = ada@example.org
$ git config get user.name
Ada Lovelace
[exit 0]
-- older equivalent still accepted:
$ git config --global user.name Ada Lovelace
[exit 0]
$ git config get --global user.name
Ada Lovelace
[exit 0]

########## CARD status
$ git status
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	a.txt

nothing added to commit but untracked files present (use "git add" to track)
[exit 0]

########## CARD add-file
$ git add a.txt
[exit 0]
$ git status --short
A  a.txt
[exit 0]

########## CARD commit-message
$ git commit -m First commit
[main (root-commit) 492ca4a] First commit
 1 file changed, 1 insertion(+)
 create mode 100644 a.txt
[exit 0]
$ git log --oneline
492ca4a First commit
[exit 0]

########## CARD diff
$ git diff
diff --git a/a.txt b/a.txt
index ce01362..3b18e51 100644
--- a/a.txt
+++ b/a.txt
@@ -1 +1 @@
-hello
+hello world
[exit 0]

########## CARD restore
$ git restore a.txt
[exit 0]
$ git status --short
[exit 0]
$ cat a.txt
hello
[exit 0]

########## CARD add-patch
-- answering y to the single hunk
diff --git a/b.txt b/b.txt
index 814f4a4..4c1ee58 100644
--- a/b.txt
+++ b/b.txt
@@ -1,2 +1,2 @@
-one
+ONE
 two
(1/1) Stage this hunk [y,n,q,a,d,e,p,P,?]? 

$ git status --short
M  b.txt
[exit 0]

########## CARD diff-staged
$ git diff --staged
diff --git a/b.txt b/b.txt
index 814f4a4..4c1ee58 100644
--- a/b.txt
+++ b/b.txt
@@ -1,2 +1,2 @@
-one
+ONE
 two
[exit 0]
-- --cached is a synonym:
$ git diff --cached --stat
 b.txt | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
[exit 0]
-- what git status suggests for staged changes:
$ git status
On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	modified:   b.txt

[exit 0]

########## CARD restore-staged
$ git restore --staged b.txt
[exit 0]
$ git status --short
 M b.txt
[exit 0]
$ git diff --stat
 b.txt | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
[exit 0]

########## CARD add-all
-- run from a subdirectory: -A stages the whole tree
$ git add -A
[exit 0]
$ git status --short
M  a.txt
D  b.txt
A  c.txt
A  sub/d.txt
[exit 0]

########## CARD commit-amend
$ git commit --amend --no-edit
[main 6a157f3] Add c and d, delete b, change a
 Date: Sun Oct 4 12:00:00 2026 +0000
 5 files changed, 4 insertions(+), 2 deletions(-)
 delete mode 100644 b.txt
 create mode 100644 c.txt
 create mode 100644 e.txt
 create mode 100644 sub/d.txt
[exit 0]
$ git show --stat --oneline HEAD
6a157f3 Add c and d, delete b, change a
 a.txt     | 1 +
 b.txt     | 2 --
 c.txt     | 1 +
 e.txt     | 1 +
 sub/d.txt | 1 +
 5 files changed, 4 insertions(+), 2 deletions(-)
[exit 0]
-- (plain git commit --amend opens the editor; GIT_EDITOR=true here)
$ git commit --amend
[main 96417ea] Add c and d, delete b, change a
 Date: Sun Oct 4 12:00:00 2026 +0000
 5 files changed, 5 insertions(+), 2 deletions(-)
 delete mode 100644 b.txt
 create mode 100644 c.txt
 create mode 100644 e.txt
 create mode 100644 sub/d.txt
[exit 0]
$ git log --oneline
96417ea Add c and d, delete b, change a
753ec23 Add b
492ca4a First commit
[exit 0]

########## CARD rm
$ git rm c.txt
rm 'c.txt'
[exit 0]
$ git status --short
D  c.txt
[exit 0]
$ ls
a.txt
e.txt
sub
[exit 0]

########## CARD rm-cached
$ git rm --cached e.txt
rm 'e.txt'
[exit 0]
$ git status --short
D  e.txt
?? e.txt
[exit 0]
$ ls
a.txt
e.txt
sub
[exit 0]

########## CARD mv
$ git mv a.txt alpha.txt
[exit 0]
$ git status --short
R  a.txt -> alpha.txt
?? e.txt
[exit 0]

########## CARD log-follow
$ git log --oneline --follow alpha.txt
aa26240 Rename a to alpha
96417ea Add c and d, delete b, change a
492ca4a First commit
[exit 0]
-- without --follow the history stops at the rename:
$ git log --oneline alpha.txt
aa26240 Rename a to alpha
[exit 0]

########## CARD branch-create
$ git branch feature
[exit 0]

########## CARD branch-list
$ git branch
  feature
* main
[exit 0]

########## CARD switch
$ git switch feature
Switched to branch 'feature'
[exit 0]
$ git branch --show-current
feature
[exit 0]

########## CARD switch-previous
$ git switch -
Switched to branch 'main'
[exit 0]
$ git branch --show-current
main
[exit 0]

########## CARD switch-create
$ git switch -c topic
Switched to a new branch 'topic'
[exit 0]
$ git branch --show-current
topic
[exit 0]

########## CARD branch-rename
$ git branch -m topic2
[exit 0]
$ git branch
  feature
  main
* topic2
[exit 0]

########## CARD merge
$ git merge topic2
Updating aa26240..74b3cde
Fast-forward
 f.txt | 1 +
 1 file changed, 1 insertion(+)
 create mode 100644 f.txt
[exit 0]
$ git log --oneline -n 2
74b3cde Add f on topic2
aa26240 Rename a to alpha
[exit 0]

########## CARD branch-delete
$ git branch -d topic2
Deleted branch topic2 (was 74b3cde).
[exit 0]

########## CARD branch-force-delete
$ git branch -d spike
error: the branch 'spike' is not fully merged
hint: If you are sure you want to delete it, run 'git branch -D spike'
hint: Disable this message with "git config set advice.forceDeleteBranch false"
[exit 1]
$ git branch -D spike
Deleted branch spike (was 4a84072).
[exit 0]

########## CARD merge-abort
$ git merge conflict
Auto-merging alpha.txt
CONFLICT (content): Merge conflict in alpha.txt
Automatic merge failed; fix conflicts and then commit the result.
[exit 1]
$ git merge --abort
[exit 0]
$ git status --short
?? e.txt
[exit 0]

########## CARD rebase
$ git rebase main
Rebasing (1/1)
Successfully rebased and updated refs/heads/rebased.
[exit 0]
$ git log --oneline -n 3
042400e Add r
2e73ac9 Ours
74b3cde Add f on topic2
[exit 0]

########## CARD rebase-continue
$ git rebase main
Rebasing (1/1)
Auto-merging alpha.txt
CONFLICT (content): Merge conflict in alpha.txt
error: could not apply b967d4b... Theirs
hint: Resolve all conflicts manually, mark them as resolved with
hint: "git add/rm <conflicted_files>", then run "git rebase --continue".
hint: You can instead skip this commit: run "git rebase --skip".
hint: To abort and get back to the state before "git rebase", run "git rebase --abort".
hint: Disable this message with "git config set advice.mergeConflict false"
Could not apply b967d4b... # Theirs
[exit 1]
$ git rebase --continue
[detached HEAD 0e849d7] Theirs
 1 file changed, 1 insertion(+), 1 deletion(-)
Successfully rebased and updated refs/heads/conflict.
[exit 0]
$ git log --oneline -n 2
0e849d7 Theirs
2e73ac9 Ours
[exit 0]

########## CARD rebase-abort
$ git rebase main
Rebasing (1/1)
Auto-merging alpha.txt
CONFLICT (content): Merge conflict in alpha.txt
error: could not apply e1fcc57... Other
hint: Resolve all conflicts manually, mark them as resolved with
hint: "git add/rm <conflicted_files>", then run "git rebase --continue".
hint: You can instead skip this commit: run "git rebase --skip".
hint: To abort and get back to the state before "git rebase", run "git rebase --abort".
hint: Disable this message with "git config set advice.mergeConflict false"
Could not apply e1fcc57... # Other
[exit 1]
$ git rebase --abort
[exit 0]
$ git status
On branch conflict2
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	e.txt

nothing added to commit but untracked files present (use "git add" to track)
[exit 0]

########## CARD cherry-pick
$ git cherry-pick 042400e684cf406e3ba894895f9e8ae358439bdc
[main 042400e] Add r
 Date: Sun Oct 4 12:00:00 2026 +0000
 1 file changed, 1 insertion(+)
 create mode 100644 r.txt
[exit 0]
$ git log --oneline -n 2
042400e Add r
2e73ac9 Ours
[exit 0]

########## CARD log
$ git log -n 2
commit 042400e684cf406e3ba894895f9e8ae358439bdc
Author: Ada Lovelace <ada@example.org>
Date:   Sun Oct 4 12:00:00 2026 +0000

    Add r

commit 2e73ac9e4c976931a344846dbffd4f7eec393dfb
Author: Ada Lovelace <ada@example.org>
Date:   Sun Oct 4 12:00:00 2026 +0000

    Ours
[exit 0]

########## CARD log-oneline
$ git log --oneline -n 3
042400e Add r
2e73ac9 Ours
74b3cde Add f on topic2
[exit 0]

########## CARD show
$ git show --stat HEAD
commit 042400e684cf406e3ba894895f9e8ae358439bdc
Author: Ada Lovelace <ada@example.org>
Date:   Sun Oct 4 12:00:00 2026 +0000

    Add r

 r.txt | 1 +
 1 file changed, 1 insertion(+)
[exit 0]

########## CARD blame
$ git blame alpha.txt
2e73ac9e (Ada Lovelace 2026-10-04 12:00:00 +0000 1) ours
[exit 0]

########## CARD reflog
$ git reflog -n 5
042400e HEAD@{0}: cherry-pick: Add r
2e73ac9 HEAD@{1}: checkout: moving from conflict2 to main
e1fcc57 HEAD@{2}: rebase (abort): returning to refs/heads/conflict2
2e73ac9 HEAD@{3}: rebase (start): checkout main
e1fcc57 HEAD@{4}: commit: Other
[exit 0]

########## CARD revert
$ git revert --no-edit 042400e684cf406e3ba894895f9e8ae358439bdc
[main 085583d] Revert "Add r"
 Date: Sun Oct 4 12:00:00 2026 +0000
 1 file changed, 1 deletion(-)
 delete mode 100644 r.txt
[exit 0]
$ git log --oneline -n 2
085583d Revert "Add r"
042400e Add r
[exit 0]
-- (plain git revert <commit> opens the editor; GIT_EDITOR=true here)
$ git revert HEAD
[main e308664] Reapply "Add r"
 Date: Sun Oct 4 12:00:00 2026 +0000
 1 file changed, 1 insertion(+)
 create mode 100644 r.txt
[exit 0]
$ git log --oneline -n 1
e308664 Reapply "Add r"
[exit 0]

########## CARD reset-soft
$ git reset --soft HEAD~1
[exit 0]
$ git status --short
A  z.txt
?? e.txt
[exit 0]
$ git log --oneline -n 1
e308664 Reapply "Add r"
[exit 0]

########## CARD reset-hard
$ git reset --hard e308664610b5614f9b29115c09e2efce91ac1d22
HEAD is now at e308664 Reapply "Add r"
[exit 0]
$ git status --short
?? e.txt
[exit 0]
$ git log --oneline -n 1
e308664 Reapply "Add r"
[exit 0]

########## CARD stash
$ git stash
Saved working directory and index state WIP on main: e308664 Reapply "Add r"
[exit 0]
$ git status --short
?? e.txt
?? u.txt
[exit 0]

########## CARD stash-list
$ git stash list
stash@{0}: WIP on main: e308664 Reapply "Add r"
[exit 0]

########## CARD stash-pop
$ git stash pop
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   alpha.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	e.txt
	u.txt

no changes added to commit (use "git add" and/or "git commit -a")
Dropped refs/stash@{0} (214569046fc7e4db20028c0fa4a1ed7a17430675)
[exit 0]
$ git stash list
[exit 0]

########## CARD stash-untracked
$ git stash -u
Saved working directory and index state WIP on main: e308664 Reapply "Add r"
[exit 0]
$ git status --short
[exit 0]
$ git stash list
stash@{0}: WIP on main: e308664 Reapply "Add r"
[exit 0]

########## CARD clean-dry-run
$ git clean -n
Would remove e.txt
Would remove u.txt
[exit 0]

########## CARD clean
$ git clean -f
Removing e.txt
Removing u.txt
[exit 0]
$ git status --short
[exit 0]
-- without -f (clean.requireForce defaults to true):
$ git clean
fatal: clean.requireForce is true and -f not given: refusing to clean
[exit 128]

########## CARD tag-annotated
$ git tag -a v1.0 -m Version 1.0
[exit 0]
$ git cat-file -t v1.0
tag
[exit 0]

########## CARD tag-list
$ git tag
v1.0
[exit 0]

########## CARD remote-add
$ git remote add origin /tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo/29afcb49-8c27-4a6e-be7b-e04afdd93785/scratchpad/git-commands/run/remote.git
[exit 0]

########## CARD remote-list
$ git remote -v
origin	/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo/29afcb49-8c27-4a6e-be7b-e04afdd93785/scratchpad/git-commands/run/remote.git (fetch)
origin	/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo/29afcb49-8c27-4a6e-be7b-e04afdd93785/scratchpad/git-commands/run/remote.git (push)
[exit 0]

########## CARD push-upstream
$ git push -u origin main
To /tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo/29afcb49-8c27-4a6e-be7b-e04afdd93785/scratchpad/git-commands/run/remote.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
[exit 0]
$ git status -sb
## main...origin/main
[exit 0]

########## CARD push
$ git push
To /tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo/29afcb49-8c27-4a6e-be7b-e04afdd93785/scratchpad/git-commands/run/remote.git
   e308664..d780a72  main -> main
[exit 0]

########## CARD push-tag
$ git push origin v1.0
To /tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo/29afcb49-8c27-4a6e-be7b-e04afdd93785/scratchpad/git-commands/run/remote.git
 * [new tag]         v1.0 -> v1.0
[exit 0]
$ git ls-remote --tags origin
aa1bf6d69041298a8ac88a4b266f6eb892d8bc59	refs/tags/v1.0
e308664610b5614f9b29115c09e2efce91ac1d22	refs/tags/v1.0^{}
[exit 0]

########## CARD clone
$ git clone /tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo/29afcb49-8c27-4a6e-be7b-e04afdd93785/scratchpad/git-commands/run/remote.git clone
Cloning into 'clone'...
done.
[exit 0]
$ git log --oneline -n 1
d780a72 Add p
[exit 0]
$ git branch -a
* main
  remotes/origin/HEAD -> origin/main
  remotes/origin/main
[exit 0]

########## CARD branch-all
$ git branch -a
* main
  remotes/origin/HEAD -> origin/main
  remotes/origin/main
[exit 0]

########## CARD fetch
$ git fetch
From /tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo/29afcb49-8c27-4a6e-be7b-e04afdd93785/scratchpad/git-commands/run/remote
   d780a72..cbb8a30  main       -> origin/main
 * [new branch]      old-branch -> origin/old-branch
[exit 0]
$ git status -sb
## main...origin/main [behind 1]
[exit 0]
$ git log --oneline -n 1
d780a72 Add p
[exit 0]

########## CARD pull
$ git pull
Updating d780a72..cbb8a30
Fast-forward
 q.txt | 1 +
 1 file changed, 1 insertion(+)
 create mode 100644 q.txt
[exit 0]
$ git log --oneline -n 1
cbb8a30 Add q (from clone)
[exit 0]

########## CARD push-delete
$ git push origin --delete old-branch
To /tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo/29afcb49-8c27-4a6e-be7b-e04afdd93785/scratchpad/git-commands/run/remote.git
 - [deleted]         old-branch
[exit 0]

########## CARD fetch-prune
$ git branch -r
  origin/HEAD -> origin/main
  origin/main
  origin/old-branch
[exit 0]
$ git fetch --prune
From /tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo/29afcb49-8c27-4a6e-be7b-e04afdd93785/scratchpad/git-commands/run/remote
 - [deleted]         (none)     -> origin/old-branch
[exit 0]
$ git branch -r
  origin/HEAD -> origin/main
  origin/main
[exit 0]

########## CARD pull-rebase
-- plain git pull with diverged branches and no pull.rebase setting:
$ git pull
From /tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo/29afcb49-8c27-4a6e-be7b-e04afdd93785/scratchpad/git-commands/run/remote
   cbb8a30..9e0ae7f  main       -> origin/main
hint: You have divergent branches and need to specify how to reconcile them.
hint: You can do so by running one of the following commands sometime before
hint: your next pull:
hint:
hint:   git config pull.rebase false  # merge
hint:   git config pull.rebase true   # rebase
hint:   git config pull.ff only       # fast-forward only
hint:
hint: You can replace "git config" with "git config --global" to set a default
hint: preference for all repositories. You can also pass --rebase, --no-rebase,
hint: or --ff-only on the command line to override the configured default per
hint: invocation.
fatal: Need to specify how to reconcile divergent branches.
[exit 128]
$ git pull --rebase
Rebasing (1/1)
Successfully rebased and updated refs/heads/main.
[exit 0]
$ git log --oneline -n 3
4f7fbb0 Add l (local)
9e0ae7f Add w (clone)
cbb8a30 Add q (from clone)
[exit 0]

########## CARD older-equivalents
-- the older or long forms named in the back notes, in a fresh repository
$ git checkout -b other
Switched to a new branch 'other'
[exit 0]
$ git checkout -
Switched to branch 'main'
[exit 0]
$ git branch --show-current
main
[exit 0]
$ git checkout other
Switched to branch 'other'
[exit 0]
$ git branch --show-current
other
[exit 0]
-- git add . only covers the current directory and below:
$ git add .
[exit 0]
$ git status --short
A  sub/s.txt
?? top.txt
[exit 0]
-- git clean -f without -d leaves untracked directories; -d removes them:
$ git clean -f
Removing y.txt
[exit 0]
$ ls
a.txt
ud
[exit 0]
$ git clean -f -d
Removing ud/
[exit 0]
$ ls
a.txt
[exit 0]
$ git checkout -- a.txt
[exit 0]
$ cat a.txt
a
[exit 0]
$ git reset a.txt
Unstaged changes after reset:
M	a.txt
[exit 0]
$ git status --short
 M a.txt
[exit 0]
$ git add --all
[exit 0]
$ git status --short
M  a.txt
[exit 0]
$ git reset --soft HEAD^
[exit 0]
$ git status --short
M  a.txt
[exit 0]
$ git stash push
Saved working directory and index state WIP on main: c5b5348 B again
[exit 0]
$ git stash list
stash@{0}: WIP on main: c5b5348 B again
[exit 0]
$ git clean --dry-run
Would remove u.txt
[exit 0]
$ git stash --include-untracked
Saved working directory and index state WIP on main: c5b5348 B again
[exit 0]
$ git status --short
[exit 0]
Already up to date.
$ git switch -c older-branch
Switched to a new branch 'older-branch'
[exit 0]
$ git push --set-upstream origin older-branch
To /tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo/29afcb49-8c27-4a6e-be7b-e04afdd93785/scratchpad/git-commands/run/remote.git
 * [new branch]      older-branch -> older-branch
branch 'older-branch' set up to track 'origin/older-branch'.
[exit 0]
$ git push origin --delete older-branch
To /tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo/29afcb49-8c27-4a6e-be7b-e04afdd93785/scratchpad/git-commands/run/remote.git
 - [deleted]         older-branch
[exit 0]
$ git branch --move renamed
[exit 0]
$ git branch --show-current
renamed
[exit 0]
$ git log --pretty=oneline -n 1
c5b5348612a3a54952294242fa656e84119b058b B again
[exit 0]

########## CARD notes-checks
-- forms and behaviours named in the back notes that the sections above do not show
-- add-patch: long form --patch (answering y to the single hunk)
diff --git a/a.txt b/a.txt
index 814f4a4..4c1ee58 100644
--- a/a.txt
+++ b/a.txt
@@ -1,2 +1,2 @@
-one
+ONE
 two
(1/1) Stage this hunk [y,n,q,a,d,e,p,P,?]? 

$ git status --short
M  a.txt
[exit 0]
-- show: without an argument git show shows HEAD
$ git show
commit dcb641e4acc0e6443a8c038ea78b6f7af51654e0
Author: Ada Lovelace <ada@example.org>
Date:   Sun Oct 4 12:00:00 2026 +0000

    B

diff --git a/a.txt b/a.txt
index 814f4a4..4c1ee58 100644
--- a/a.txt
+++ b/a.txt
@@ -1,2 +1,2 @@
-one
+ONE
 two
[exit 0]
-- switch-create: long form --create
$ git switch --create x
Switched to a new branch 'x'
[exit 0]
$ git branch --show-current
x
[exit 0]
-- branch-force-delete: --delete --force on the unmerged branch x
$ git branch --delete --force x
Deleted branch x (was 4764814).
[exit 0]
$ git branch
* main
[exit 0]
-- stash-pop: a pop that conflicts keeps the entry
$ git stash
Saved working directory and index state WIP on main: dcb641e B
[exit 0]
$ git stash pop
Auto-merging a.txt
CONFLICT (content): Merge conflict in a.txt
On branch main
Your branch is ahead of 'origin/main' by 2 commits.
  (use "git push" to publish your local commits)

Unmerged paths:
  (use "git restore --staged <file>..." to unstage)
  (use "git add <file>..." to mark resolution)
	both modified:   a.txt

no changes added to commit (use "git add" and/or "git commit -a")
The stash entry is kept in case you need it again.
[exit 1]
$ git stash list
stash@{0}: WIP on main: dcb641e B
[exit 0]
-- stash-pop: git stash apply (no conflict) does not remove the entry
$ git stash apply
On branch main
Your branch is ahead of 'origin/main' by 1 commit.
  (use "git push" to publish your local commits)

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   a.txt

no changes added to commit (use "git add" and/or "git commit -a")
[exit 0]
$ git stash list
stash@{0}: WIP on main: dcb641e B
[exit 0]
-- stash-untracked: -u stashes untracked files but leaves ignored ones
$ git stash -u
Saved working directory and index state WIP on main: 4f6cac6 Ignore logs
[exit 0]
$ git status --short --ignored
!! debug.log
[exit 0]
-- push-tag: plain git push sends no tags; naming one or --tags does
$ git tag -m Version 1 v1
[exit 0]
$ git tag lightweight
[exit 0]
$ git push
Everything up-to-date
[exit 0]
$ git ls-remote --tags origin
[exit 0]
$ git push --tags
To /tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo/29afcb49-8c27-4a6e-be7b-e04afdd93785/scratchpad/git-commands/run/notes-remote.git
 * [new tag]         lightweight -> lightweight
 * [new tag]         v1 -> v1
[exit 0]
$ git ls-remote --tags origin
4f6cac6553776dd2e9b576dd9bc6c7ecfe1b8d0c	refs/tags/lightweight
273945a883f1a3c687bcb1911762a8727874fc38	refs/tags/v1
4f6cac6553776dd2e9b576dd9bc6c7ecfe1b8d0c	refs/tags/v1^{}
[exit 0]
-- tag-annotated: -m without -a also creates an annotated tag object
$ git cat-file -t v1
tag
[exit 0]
$ git cat-file -t lightweight
commit
[exit 0]
-- fetch-prune: short form -p
$ git branch -r
  origin/HEAD -> origin/main
  origin/gone
  origin/main
[exit 0]
-- the branch gone is deleted on the remote itself (as if by someone else)
$ git fetch -p
From /tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo/29afcb49-8c27-4a6e-be7b-e04afdd93785/scratchpad/git-commands/run/notes-remote
 - [deleted]         (none)     -> origin/gone
[exit 0]
$ git branch -r
  origin/HEAD -> origin/main
  origin/main
[exit 0]
-- clean: from a subdirectory, -f deletes untracked files there but not inside untracked directories, nor above it
$ git clean -f
Removing s.u
[exit 0]
$ git status --short --untracked-files=all
?? nested/n.u
?? ../top.u
[exit 0]
$ git clean -f -d
Removing nested/
[exit 0]
$ git status --short --untracked-files=all
?? top.u
[exit 0]
-- reset-hard: commits left behind by the reset stay on another branch that contains them
$ git log --oneline -n 1
04945d8 K
[exit 0]
$ git reset --hard HEAD~1
HEAD is now at 64ae875 Sub
[exit 0]
$ git log --oneline -n 1
64ae875 Sub
[exit 0]
$ git log --oneline -n 1 keep
04945d8 K
[exit 0]
-- reset-hard: unstaged changes are lost, but staged content was already stored and git fsck finds it (added in quality-control round 4)
$ git reset --hard
HEAD is now at 64ae875 Sub
[exit 0]
$ git status --short
[exit 0]
$ git fsck --lost-found
dangling tree 868b2f7fdacfea536094dabaadc95c3295c1da14
dangling commit 8a179cf6d24fb8e95f5bb14b6ba6ec9237be54e6
dangling commit 993b01e466d2d183621b66037944af629c292216
dangling commit 47648146d839ad825fc68294fa221801263c9f4a
dangling blob eee14ef7fa5ae2b67e711a1c5026d500c1fc6915
dangling commit ee6fa7817e145b7baf4dd486aeea081c81902439
[exit 0]
$ git cat-file -p eee14ef7fa5ae2b67e711a1c5026d500c1fc6915
staged-content
[exit 0]
-- branch-force-delete: a branch that is not merged into HEAD, but is contained in another branch (added in quality-control round 4)
$ git branch -d feat
error: the branch 'feat' is not fully merged
hint: If you are sure you want to delete it, run 'git branch -D feat'
hint: Disable this message with "git config set advice.forceDeleteBranch false"
[exit 1]
$ git branch -D feat
Deleted branch feat (was 20afa49).
[exit 0]
$ git log --oneline -n 1 integ
20afa49 F
[exit 0]
-- reset-hard: git reset stores the old branch tip in ORIG_HEAD, from which the dropped commit can be restored (added in quality-control round 5)
$ git log --oneline -n 1
b5c4307 O
[exit 0]
$ git reset --hard HEAD~1
HEAD is now at 64ae875 Sub
[exit 0]
$ git log --oneline -n 1 ORIG_HEAD
b5c4307 O
[exit 0]
$ git reset --hard ORIG_HEAD
HEAD is now at b5c4307 O
[exit 0]
$ git log --oneline -n 1
b5c4307 O
[exit 0]
-- branch-force-delete: a branch never checked out leaves no HEAD reflog entry; git branch -D prints its tip, from which it can be recreated (added in quality-control round 5)
$ git branch -D side
Deleted branch side (was 74cef95).
$ git log -g --format=%s HEAD
O
Sub
O
Sub
F
Sub
F
Sub
Sub
Sub
K
Sub
K
Sub
Sub
Ignore logs
Ignore logs
B
Conflicting change
B
B
X
B
B
A
[exit 0]
$ git branch side 74cef95
[exit 0]
$ git log --oneline -n 1 side
74cef95 N
[exit 0]
########## END
```

**Download the manual page of each command from git-scm.com and convert it to text (fetch_docs.py, run with python3)** (Git reference manual (git-scm.com/docs, latest version 2.56.0))

```
import urllib.request, time, re, html as H
cmds = "init clone config status add diff commit restore rm mv branch switch merge rebase cherry-pick log show blame reflog remote fetch pull push stash revert reset clean tag checkout".split()
d = "/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo/29afcb49-8c27-4a6e-be7b-e04afdd93785/scratchpad/git-commands/docs/"
for c in cmds:
    url = f"https://git-scm.com/docs/git-{c}"
    req = urllib.request.Request(url, headers={"User-Agent": "solid-memo deck research (https://github.com/antwika/solid-memo)"})
    try:
        raw = urllib.request.urlopen(req, timeout=60).read().decode("utf-8")
        open(d + f"git-{c}.html", "w").write(raw)
        m = re.search(r'<div id="main"[^>]*>(.*)', raw, re.S)
        body = m.group(1) if m else raw
        text = re.sub(r"<[^>]+>", "", body)
        text = H.unescape(re.sub(r"\n\s*\n+", "\n\n", text))
        open(d + f"git-{c}.txt", "w").write(text)
        print(c, len(raw))
    except Exception as e:
        print(c, "ERR", e)
    time.sleep(0.5)
```

**Licence of the Git source repository** (Git 2.46.0 release notes (Documentation/RelNotes/2.46.0.adoc in the Git source repository))

```
curl -s -A "solid-memo deck research (https://github.com/antwika/solid-memo)" -o COPYING https://raw.githubusercontent.com/git/git/master/COPYING
```

**Git's Swedish translation, searched for the English message strings of the terms used on the Swedish fronts (po.py: prints msgid => msgstr for msgids matching a pattern)** (Git's Swedish translation (po/sv.po in the Git source repository, for Git 2.56.0))

```
curl -s -A "solid-memo deck research (https://github.com/antwika/solid-memo)" -o sv.po https://raw.githubusercontent.com/git/git/master/po/sv.po
python3 po.py "^Changes to be committed" "^Changes not staged" "^Untracked files" "unstage" "staging area" "^stash" "upstream" "remote-tracking branch" "working tree" "^Switch branches" "^Create an empty Git repository" "^Record changes" "tag"
python3 po.py "^Create, list, delete or verify a tag" "annotated" "^Clone a repository" "^Download objects" "^Update remote refs" "^Fetch from and integrate" "^Join two or more" "^Reapply commits" "^Apply the changes introduced" "^Revert some existing" "^Stash the changes" "^Remove untracked" "^Show commit logs" "^Show what revision and author" "^Manage set of tracked" "^List, create, or delete branches" "^Move or rename" "^Remove files from the working" "^Show the working tree status" "^Show changes between" "^Manage reflog" "^Restore working tree files" "^Get and set" "^Show various types" "amend"
python3 po.py "^Stage this hunk" "^select hunks interactively" "^Remote" "^No stash entries" "^the commit" "^repository" "^Switched to a new branch"
grep -c -i "fjärrarkiv" sv.po
```

**gc-run.py: runs the test script and records its output (run with: python3 gc-run.py)** (Test run of every command with Git 2.53.0 in a throwaway repository)

```
import subprocess
S = "/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo/29afcb49-8c27-4a6e-be7b-e04afdd93785/scratchpad/git-commands/"
with open(S + "run-output.txt", "w") as out:
    r = subprocess.run(["bash", S + "run-git-commands.sh"], stdout=out, stderr=subprocess.STDOUT)
print("exit", r.returncode)
```

**fetch.py: fetches a URL with the deck's User-Agent, saves it and prints the text around matches of a pattern** (Git reference manual (git-scm.com/docs, latest version 2.56.0))

```
import urllib.request, re, sys, html as H
url, out = sys.argv[1], sys.argv[2]
req = urllib.request.Request(url, headers={"User-Agent": "solid-memo deck research (https://github.com/antwika/solid-memo)"})
raw = urllib.request.urlopen(req, timeout=60).read().decode("utf-8", "replace")
open(out, "w").write(raw)
text = H.unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", re.sub(r"(?s)<(script|style)[^>]*>.*?</\1>", " ", raw))))
pat = sys.argv[3] if len(sys.argv) > 3 else None
if pat:
    for m in re.finditer(pat, text, re.I):
        print("...", text[max(0, m.start() - 300):m.end() + 300])
else:
    print(text[:4000])
```

**Licence of the git-scm.com reference manual (and of the site's base content and the Pro Git book)** (Git reference manual (git-scm.com/docs, latest version 2.56.0))

```
python3 fetch.py https://git-scm.com/site site.html "licen|GPL"
```

**inspect.py: prints the version lines ('last updated in', version list) of a saved manual page** (Git reference manual (git-scm.com/docs, latest version 2.56.0))

```
import re, sys
s = open(sys.argv[1]).read()
for m in re.finditer(r'(Latest version|Last updated|2\.\d\d\.\d)', s):
    print(re.sub(r'\s+', ' ', s[max(0, m.start() - 200):m.start() + 150]))
    print('---')
i = s.find('<footer')
print(re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', s[i:i + 3000])))
```

**Version of the manual pages fetched** (Git reference manual (git-scm.com/docs, latest version 2.56.0))

```
python3 inspect.py docs/git-switch.html  ->  'git-switch last updated in 2.55.0', version list headed '2.56.0 no changes'
```

**opts.py: prints each cited option or section of the converted manual pages (run with: python3 opts.py)** (Git reference manual (git-scm.com/docs, latest version 2.56.0))

```
import re
D = "/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo/29afcb49-8c27-4a6e-be7b-e04afdd93785/scratchpad/git-commands/docs/"
checks = [
    ("init", r"^DESCRIPTION"), ("clone", r"^DESCRIPTION"),
    ("status", r"^DESCRIPTION"),
    ("add", r"^-A $"), ("add", r"^-p $"),
    ("diff", r"^git diff \[<options>\] \[--\] \[<path>"), ("diff", r"^git diff \[<options>\] --cached"),
    ("commit", r"^-m <msg> $"), ("commit", r"^--amend $"),
    ("restore", r"^-S $"), ("restore", r"^DESCRIPTION"),
    ("rm", r"^--cached $"), ("rm", r"^DESCRIPTION"), ("mv", r"^DESCRIPTION"),
    ("branch", r"^-a $"), ("branch", r"^-d $"), ("branch", r"^-D $"), ("branch", r"^-m $"), ("branch", r"^DESCRIPTION"),
    ("merge", r"^--abort $"), ("rebase", r"^--continue $"), ("rebase", r"^--abort $"), ("rebase", r"^DESCRIPTION"),
    ("cherry-pick", r"^DESCRIPTION"),
    ("log", r"^--follow $"), ("log", r"^--oneline $"), ("show", r"^DESCRIPTION"), ("blame", r"^DESCRIPTION"), ("reflog", r"^DESCRIPTION"),
    ("remote", r"^-v $"), ("remote", r"^add$"),
    ("fetch", r"^-p $"), ("fetch", r"^DESCRIPTION"), ("pull", r"^DESCRIPTION"), ("pull", r"^-r $"),
    ("push", r"^-u $"), ("push", r"^-d $"), ("push", r"^DESCRIPTION"),
    ("stash", r"^DESCRIPTION"), ("stash", r"^list "), ("stash", r"^pop "), ("stash", r"^-u $"),
    ("revert", r"^DESCRIPTION"), ("reset", r"^--soft $"), ("reset", r"^--hard $"),
    ("clean", r"^-n $"), ("clean", r"^-f $"), ("clean", r"^DESCRIPTION"),
    ("tag", r"^-a $"), ("tag", r"^DESCRIPTION"), ("config", r"^--global $"), ("switch", r"^DESCRIPTION"),
]
for cmd, pat in checks:
    lines = open(D + f"git-{cmd}.txt").read().split("\n")
    idx = [i for i, l in enumerate(lines) if re.search(pat, l)]
    print(f"===== git-{cmd} {pat} lines {idx[:3]}")
    if idx:
        i = idx[0]
        print("\n".join(lines[i:i + 12]))
```

**grep2.py: prints further passages of the converted manual pages cited in the evidence (run with: python3 grep2.py)** (Git reference manual (git-scm.com/docs, latest version 2.56.0))

```
import re
D = "/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo/29afcb49-8c27-4a6e-be7b-e04afdd93785/scratchpad/git-commands/docs/"
checks = [("diff", r"--staged is a synonym"), ("remote", r"^add \["), ("tag", r"^-l $"), ("tag", r"With no arguments|no arguments"),
          ("reflog", r"default action|^git reflog \[show\]|shorthand for"), ("pull", r"diverg"), ("log", r"^DESCRIPTION"),
          ("clone", r"^git clone \["), ("init", r"^git init \["), ("switch", r"synonymous to @\{-1\}"),
          ("commit", r"^DESCRIPTION"), ("push", r"^<repository>"), ("show", r"^<object>"), ("reset", r"^git reset \[--soft"),
          ("checkout", r"^git checkout -b"), ("branch", r"^git branch \[--track"), ("stash", r"^push \[")]
for cmd, pat in checks:
    lines = open(D + f"git-{cmd}.txt").read().split("\n")
    idx = [i for i, l in enumerate(lines) if re.search(pat, l)]
    print(f"===== git-{cmd} {pat} lines {idx[:4]}")
    for i in idx[:2]:
        print("\n".join(lines[max(0, i - 2):i + 9])); print("..")
```

**Manual passages checked in quality-control round 1 (run in the docs directory)** (Git reference manual (git-scm.com/docs, latest version 2.56.0))

```
grep -n -A3 "will not recurse into untracked" git-clean.txt
grep -n -B2 -A3 "This is the default" git-pull.txt
grep -n -A4 "^--follow-tags" git-push.txt
grep -n -A3 "^-m <msg>" git-tag.txt
grep -n -i -A3 "implies -a" git-tag.txt
grep -n -B1 -A4 "^-d $" git-clean.txt
grep -n -A6 "^-u $" git-stash.txt
grep -n -B1 -A2 "Show what revision" git-blame.txt
grep -n -B1 -A3 "^--follow" git-log.txt
grep -n -A3 "^-p $" git-fetch.txt
```

**Release in which git config gained subcommands** (Git 2.46.0 release notes (Documentation/RelNotes/2.46.0.adoc in the Git source repository))

```
python3 fetch.py https://raw.githubusercontent.com/git/git/master/Documentation/RelNotes/2.46.0.adoc relnotes-2.46.0.txt "subcommands"
```

**po.py: prints the file header of sv.po and msgid => msgstr for msgids matching each pattern** (Git's Swedish translation (po/sv.po in the Git source repository, for Git 2.56.0))

```
import re, sys
s = open("/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo/29afcb49-8c27-4a6e-be7b-e04afdd93785/scratchpad/git-commands/sv.po").read()
head = s[:1500]
print(head)
entries = re.findall(r'msgid ((?:".*"\n)+)msgstr ((?:".*"\n)+)', s)
def j(x): return "".join(re.findall(r'"(.*)"', x))
for pat in sys.argv[1:]:
    print("=====", pat)
    n = 0
    for a, b in entries:
        a, b = j(a), j(b)
        if re.search(pat, a) and len(a) < 90:
            print(repr(a), "=>", repr(b)); n += 1
            if n > 8: break
```

**Swedish strings checked in quality-control round 2 (run in the scratch directory)** (Git's Swedish translation (po/sv.po in the Git source repository, for Git 2.56.0))

```
grep -n -A1 'msgid "Restore working tree files"\|msgid "Revert some existing commits"\|msgid "Reapply commits on top\|msgid "Pushing to %s"\|msgid "delete fully merged branch"' sv.po
grep -n -A1 'msgid "Pushing to\|msgid "push tags\|msgid "Update remote refs' sv.po
grep -n -i -A1 'msgid "Show what revision\|msgid "Continue listing the history' sv.po
python3 po.py "^Pushing to" "^Reapply commits"
```

**4-gram comparison of the reworded fronts with the manual pages and sv.po (quality-control round 3; gc-ngram.py, run with: python3 gc-ngram.py)** (Test run of every command with Git 2.53.0 in a throwaway repository)

```
# Word 4-grams shared by each card's fronts and notes and the manual pages (en) or sv.po msgstrs (sv).
import glob, json, re
S = "/tmp/claude-1000/-home-antwika-dev-github-antwika-solid-memo/29afcb49-8c27-4a6e-be7b-e04afdd93785/scratchpad/git-commands/"
P = "/home/antwika/dev/github/antwika/solid-memo/.claude/worktrees/authored-decks/packages/deck-library/authored/git-commands.json"
words = lambda t: re.findall(r"[\wåäöÅÄÖ<>@{}~^.-]+", t.lower())
grams = lambda w: {tuple(w[i:i + 4]) for i in range(len(w) - 3)}
en = set()
for f in glob.glob(S + "docs/*.txt"):
    en |= grams(words(open(f, encoding="utf-8").read()))
po = open(S + "sv.po", encoding="utf-8").read()
sv = set()
for m in re.finditer(r'msgstr ((?:".*"\n)+)', po):
    sv |= grams(words("".join(re.findall(r'"(.*)"', m.group(1)))))
for c in json.load(open(P, encoding="utf-8"))["cards"]:
    for field in ("front", "backNote"):
        for lang, ref in (("en", en), ("sv", sv)):
            text = c.get(field, {}).get(lang)
            if text:
                hits = [" ".join(g) for g in grams(words(text)) if g in ref]
                if hits:
                    print(c["id"], field, lang, "|", "; ".join(sorted(hits)))
```

**Manual passages on ORIG_HEAD checked in quality-control round 5 (run in the docs directory)** (Git reference manual (git-scm.com/docs, latest version 2.56.0))

```
grep -n -i "ORIG_HEAD" git-reset.txt git-merge.txt git-rebase.txt
```

**Swedish strings checked in quality-control round 5 (run in the scratch directory)** (Git's Swedish translation (po/sv.po in the Git source repository, for Git 2.56.0))

```
grep -n -A1 'msgid "delete branch (even if not merged)"\|msgid "delete fully merged branch"\|msgid "Deleted branch %s (was %s).\\n"\|ORIG_HEAD\|msgid "tip' sv.po
grep -n -B3 "spets" sv.po
```

## Quality control

7 rounds, 38 findings: 34 fixed, 0 rejected after checking, 4 needing no change. Every card's Wikidata checks (0 in all) are re-run against live Wikidata by `scripts/authored_decks.py check` before every build.

### Round 0: Every command run in a throwaway repository with git 2.53.0 and checked against the git-scm.com reference manual (2.56.0); fronts checked for a single canonical answer; Swedish terms checked against Git's Swedish translation; builder and validator checks. (2026-10-04)

**Reviewer:** Claude (AI) — authoring agent, machine checks · **Scope:** All 56 cards, and the older equivalents and long forms named in the notes.

All 56 commands ran and had the effect the front describes; commands expected to fail (git branch -d on an unmerged branch, git clean without -f, git pull on diverged branches) failed as the notes say. Every command and option is documented in the current manual with the behaviour on the card. No Wikidata checks: no card's content is a Wikidata statement or label. The findings record the problems met while writing the test script and the decisions about current versus older commands.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| all | First test run: git init created a branch called master (with a hint that the default will become main in Git 3.0), so later steps that named main failed and the merge, rebase, clone and push sections did not test what they should. | The script now sets init.defaultBranch to main in its isolated global configuration before git init; the second and final runs exercised every section as intended. The card git init is unaffected (it creates a repository whichever default branch name is configured). | fixed |
| restore, restore-staged, add-patch | First test run: git add -p was run while a.txt also had an unstaged change, so the y answer staged a.txt and the restore and restore --staged steps did not show their effect on the intended file. | Reordered the script: git restore discards the change to a.txt first, then git add -p stages the single hunk in b.txt, git diff --staged shows it and git restore --staged b.txt unstages it (status ' M b.txt'). | fixed |
| config-name, config-email | Current versus older syntax: the git-config manual lists git config <name> <value> under DEPRECATED MODES, replaced by git config set (Git 2.46.0 release notes); but the old form still works in 2.53.0, is far more widely seen, and Git's own hint for git pull still prints 'git config pull.rebase false'. Learners on Git older than 2.46 cannot use the new form. | Following the brief's preference for what Git now recommends, the back is git config set --global ...; the note gives the older form and says it is still accepted. Both forms were run. | no change needed |
| pull | Version difference: with Git 2.53.0, git pull on diverged branches with no pull.rebase setting stopped with 'fatal: Need to specify how to reconcile divergent branches.'; the 2.56.0 manual describes --ff-only as the default when no reconciliation method is configured. Both refuse to merge or rebase on their own. | The note says only what holds for both: if both sides have new commits, Git asks you to choose --rebase or --no-rebase, or to set pull.rebase. | no change needed |
| add-all | Ambiguity: 'stage all changes' is also answered by git add . when run at the top of the repository. | The front says 'in the whole working tree'; the test showed git add -A run from a subdirectory stages changes outside it, while git add . run from a subdirectory staged only sub/s.txt and left top.txt untracked. The note states the difference. | fixed |
| clean | git clean -f removes untracked files but not untracked directories, and works from the current directory down. | Front says 'in the current directory and below'; the note mentions -d (tested: git clean -f left the directory ud, git clean -f -d removed it) and -n for a dry run (tested). | fixed |
| branch-all, tag-list, clean-dry-run | Run in the test script but dropped from the deck to keep it near the brief's 50 cards; their commands are mentioned in notes instead (git clean -n in the clean note). | Dropped; the CARD sections remain in the transcript as supporting runs. | no change needed |

### Round 1: factual accuracy (2026-10-04)

**Reviewer:** Claude (AI) — independent factual accuracy reviewer · **Scope:** All 56 cards, checked against the git-scm.com manual (2.56.0) and the reviewer's own test runs with git 2.53.0

The reviewer confirmed all 56 commands and every long and short form in the notes, and found one warning (the clean front overstated what git clean -f reaches) and four incomplete notes. All five were verified by the authoring agent against the manual and a new test section ('CARD notes-checks') and fixed.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| clean | The front 'Delete the untracked files in the current directory and below' overstates git clean -f: without -d it does not recurse into untracked directories, so files inside them stay. | Verified: the git-clean manual (-d) says git clean does not recurse into untracked directories without -d, and the new test run from a subdirectory left sub/nested/n.u (and top.u above it) while removing sub/s.u. Front now 'Delete the untracked files from the current directory down, leaving untracked directories alone' (sv to match); note says -d also deletes untracked directories and their contents. Evidence extended. | fixed |
| pull | The note named only --rebase / --no-rebase and pull.rebase; Git's hint also offers --ff-only and pull.ff only. | Verified in the recorded output (CARD pull-rebase hint) and the manual. Note now lists --rebase, --no-rebase (merge) or --ff-only, and pull.rebase or pull.ff (sv to match). Evidence records the hint. | fixed |
| tag-annotated | -m on its own implies -a, so git tag -m "<message>" <tag> also answers the front. | Verified: the git-tag manual says -m 'Implies -a if none of -a, -s, or -u <key-id> is given', and the new test made a tag object with git tag -m without -a. Added '-m on its own also implies -a.' to the note (sv to match). | fixed |
| push-tag | The note left out --follow-tags and push.followTags, which also push annotated tags. | Verified in the git-push manual (--follow-tags). Note now begins 'By default git push sends no tags unless you name them; --tags sends all of them.' The new test shows plain git push sending no tags and --tags sending both. | fixed |
| reset-hard | 'Commits left behind are only reachable through the reflog' is false when another branch or tag contains them. | Verified by the new test (the commit K stayed on the branch keep after git reset --hard HEAD~1 on main). Note now says commits that no other branch or tag contains are then only reachable through the reflog (sv to match). | fixed |

### Round 2: Language and translation (2026-10-04)

**Reviewer:** Claude (AI) — independent Language and translation reviewer · **Scope:** All 56 cards and the deck's title, description and keywords, with Git's Swedish translation (po/sv.po)

The reviewer found the Swedish terminology consistent with Git's own translation and no errors; two warnings (stash-pop's 'Återställ', merge-abort's 'stannat på konflikter') and seven suggestions. The authoring agent checked the cited sv.po strings and applied all nine.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| stash-pop | Swedish 'Återställ' is Git's Swedish word for restore, revert and reset, so it points to the wrong command and does not match 'Reapply'. | Verified in sv.po ('Restore working tree files' => 'Återställ filer i arbetskatalogen', 'Revert some existing commits' => 'Återställ några befintliga incheckningar'). Swedish front now 'Applicera de senast undanlagda ändringarna på nytt och ta bort dem från stash-listan'. | fixed |
| merge-abort | 'som stannat på konflikter' is unidiomatic. | Swedish front now 'Avbryt en sammanslagning som har stoppats av konflikter och gå tillbaka till läget före den'. | fixed |
| revert | 'tar bort dess ändringar' fits only commits that added lines. | Swedish front now '... som upphäver dess ändringar'. | fixed |
| reset-hard | English note opens 'Destructive:', Swedish 'Oåterkalleligt:', which also clashes with the reflog clause; the front says 'kasta' where restore says 'Kasta bort'. | Swedish note now opens 'Destruktivt:' and uses 'kastas bort'; the Swedish front says 'kasta bort'. (The note was also corrected in round 1.) | fixed |
| push-upstream | 'gör den skickade grenen till dess uppströmsgren' can be read as making the pushed branch its own upstream; English 'its' slightly ambiguous too. | Fronts now en 'Send a new local branch to origin for the first time and make origin's new branch the local branch's upstream', sv '... och ställ in den nya grenen i origin som den lokala grenens uppströmsgren'. | fixed |
| push-tag | English push fronts mix 'Send' and 'Push' (which gives away the subcommand); Swedish uses 'Skicka' throughout. | All three English push fronts now use 'Send' (push-tag: 'Send a single tag to origin'; push-upstream as above). | fixed |
| commit-amend | 'som du redan har skickat' is vague for 'already pushed'. | Swedish note now '... som du redan har skickat till ett fjärrarkiv (push).' 'Skickat' is kept rather than sv.po's 'sänt' so that it matches the deck's 'Skicka' on the push fronts. | fixed |
| branch-delete | 'som har slagits ihop helt' has awkward word order. | Swedish front now 'Ta bort en lokal gren som redan är helt sammanslagen' ('helt sammanslagen' is also Git's own Swedish term; a two-word technical term, not protected expression). | fixed |
| deck | Keyword 'git commands' is lower-case and only repeats the title. | Replaced by the pair 'commits' / 'incheckningar'. | fixed |

### Round 3: Licensing, attribution and documentation (2026-10-04)

**Reviewer:** Claude (AI) — independent Licensing, attribution and documentation reviewer · **Scope:** All 56 cards, every source's licence, the recorded test run (re-run by the reviewer) and the queries, with a 4-gram comparison of the cards against the manual, sv.po and the git-scm.com cheat sheet

The reviewer confirmed the licences, that CC0 is defensible and that the recorded test run is real and reproducible, and found one error (notes' forms and behaviours claimed as tested but never run), five warnings and two suggestions. All were verified and fixed except the suggestion to test Git 2.45 versus 2.46 in a container, which was declined in favour of documenting the source of that fact.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| add-patch, switch-create, fetch-prune, branch-force-delete, stash-pop, stash-untracked, push-tag, show | The test-run source claimed to cover the long forms and note behaviours, but the script never ran add --patch, switch --create, fetch -p, branch --delete --force, stash apply or a conflicting pop, stash -u with an ignored file, push --tags or git show without an argument. | Verified against the recorded script: correct. The script was extended at the end with a section 'CARD notes-checks' that runs each of them (and the new checks for rounds 1's clean, tag-annotated and reset-hard notes), re-run with git 2.53.0 (earlier sections' output unchanged byte for byte), re-embedded under Queries, and each card's evidence now cites what that section showed. | fixed |
| blame, rebase, pull-rebase, log-follow | Fronts paraphrase the manual's NAME lines or option text and their sv.po translations closely (blame nearly verbatim in both languages). | Verified against docs/git-blame.txt, git-log.txt and sv.po. Reworded with a different structure: blame 'For each line of a file, show the commit that last changed it and who made that commit'; rebase 'Move the current branch's commits so that they start from the tip of another branch'; pull-rebase 'Fetch the upstream and move your local commits so that they start from its new tip'; log-follow 'List the commits that changed one file, including those made before it was renamed' (Swedish rewritten likewise). A 4-gram comparison (gc-ngram.py, under Queries) now finds only generic phrases such as 'line of a file'. | fixed |
| fetch-prune | The English front repeats 'that no longer exist on the remote' from the --prune option text. | Front now en 'Fetch, and also delete your remote-tracking branches for branches that were deleted on the remote', sv 'Hämta och ta även bort de fjärrspårande grenar vars gren har tagits bort i fjärrarkivet'. | fixed |
| deck | The test-run source used the provenance report's URL, so in the deck the report node got the test run's title. | The source's URL is now the report's Queries section (…/authored/git-commands.md#queries), a distinct IRI; the report itself keeps its own role. Publishing the script as separate files was not done because only the dossier and the builder's outputs belong to this deck. | fixed |
| deck | The licence statement dedicated the whole recorded output to CC0, though it quotes Git's GPL message texts. | licenseEvidence and Licensing now dedicate only the script and the agent's annotations to CC0, and say the quoted Git messages remain Git's (GPL-2.0), are reproduced as a factual record, and are not in the deck. | fixed |
| deck | Queries incomplete: po.py, opts.py, grep2.py, inspect.py and fetch.py not reproduced; some searches described instead of recorded. | All five helpers (and the runner gc-run.py and the 4-gram script) are now reproduced verbatim with the command lines used. The first session's exact command lines were not recorded, so they were re-run in this round with the recorded command lines, and the method says so; the descriptive URL-only entries were replaced by these commands. | fixed |
| config-name, config-email | The 'since Git 2.46' fact comes only from the GPL release notes, a verification source. | Licensing now says this single version fact comes from the 2.46.0 release notes and is a bare fact, not copyrightable; the test-run source's usedFor says the run cannot show it. Testing Git 2.45 against 2.46 in containers was declined (it would mean pulling extra images onto the maintainer's machine for one release number). | fixed |
| deck | Licensing did not mention the git-scm.com cheat sheet (MIT), which several fronts resemble. | Licensing now says the git-scm.com cheat sheet was not consulted, the task list and wording were written independently, and the blame front was reworded after the reviewer found it resembled both the manual and the cheat sheet. | fixed |

### Round 4: Final re-check (loop 1): the 21 cards changed in the last fix, every third card, metadata, licence decision and documentation (2026-10-04)

**Reviewer:** Claude (AI) — independent Final re-check (loop 1): the 21 cards changed in the last fix, every third card, metadata, licence decision and documentation reviewer · **Scope:** 33 cards (the 21 changed in round 3 and every third card), the metadata, the licence decision and the documentation, re-checked against the git-scm.com manual, the 2.46.0 release notes, the site licence page, sv.po and the reviewer's own runs with git 2.53.0

The reviewer found one error, one warning and one suggestion; all three were verified and fixed. Two checks were appended to the test script's notes-checks section, the script was re-run (earlier output unchanged) and the new output re-embedded under Queries.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| branch-force-delete | The note said the deleted branch's unmerged commits could then only be found through the reflog. That is false when another branch or tag still contains them: git branch -d only checks the upstream or HEAD. | Verified with git 2.53.0 (new check at the end of CARD notes-checks): feat merged into integ but not main was refused by -d, deleted by -D, and its commit 20afa49 F was still on integ. The manual's -d text confirms the check is against the upstream or HEAD. Note now en 'Short for --delete --force. Commits that no other branch or tag contains can then only be found through the reflog.', sv 'Förkortning av --delete --force. Incheckningar som ingen annan gren eller tagg innehåller kan sedan bara hittas via referensloggen.'; evidence updated. | fixed |
| reset-hard | The note said discarded changes cannot be recovered, but staged content was already written to the object database and git fsck --lost-found finds it. | Verified with git 2.53.0 (new check at the end of CARD notes-checks): after git reset --hard, git fsck --lost-found listed the dangling blob eee14ef7… holding the staged content, and no blob for the unstaged change. Note now en 'Destructive: unstaged changes are lost, and commits that no other branch or tag contains are then only reachable through the reflog.', sv 'Destruktivt: oköade ändringar går förlorade, och incheckningar som ingen annan gren eller tagg innehåller nås sedan bara via referensloggen.' ('oköade ändringar' is Git's own sv.po term for unstaged changes); evidence updated. | fixed |
| deck | The 4-gram script was called ngram.py under Queries but gc-ngram.py in the round-3 log; the matching scratch file is gc-ngram.py. | The Queries purpose now names gc-ngram.py and how it was run (python3 gc-ngram.py), matching the round-3 log and the scratch file. | fixed |

### Round 5: Final re-check (loop 2): the cards changed in the last fix (branch-force-delete, reset-hard), every third card, metadata, licence decision and documentation (2026-10-04)

**Reviewer:** Claude (AI) — independent Final re-check (loop 2): the cards changed in the last fix (branch-force-delete, reset-hard), every third card, metadata, licence decision and documentation reviewer · **Scope:** 20 cards (branch-force-delete, reset-hard and every third card), the metadata, the licence decision and the documentation, re-checked against the git-scm.com manual (2.56.0), sv.po and the reviewer's own runs with git 2.53.0

The reviewer found one warning and two suggestions. The warning and the first suggestion were verified and fixed: two checks were appended to the test script's notes-checks section, the script was re-run (earlier output unchanged) and the new output re-embedded under Queries. The second suggestion was verified and handled by documenting the resemblance in the licensing statement; the fronts were kept.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| reset-hard | The note said commits no other branch or tag contains are then only reachable through the reflog, but git reset sets ORIG_HEAD to the old tip and the manual shows git reset --hard ORIG_HEAD as the way back; the git-docs evidence wrongly said the manual makes no claim about recovery. | Verified in the git-reset manual (DESCRIPTION: 'Before the operation, ORIG_HEAD is set to the tip of the current branch.'; EXAMPLES) and with git 2.53.0 (new check at the end of CARD notes-checks: after git reset --hard HEAD~1, ORIG_HEAD was 'b5c4307 O' and git reset --hard ORIG_HEAD restored it). The git-merge and git-rebase pages confirm those commands also set ORIG_HEAD, so it is overwritten later. Note now en 'Destructive: unstaged changes are lost. The old branch tip is kept in ORIG_HEAD (until another command such as reset, merge or rebase replaces it) and in the reflog, so dropped commits can be restored.', sv 'Destruktivt: oköade ändringar går förlorade. Grenens förra spets sparas i ORIG_HEAD (tills ett annat kommando, till exempel reset, merge eller rebase, ersätter den) och i referensloggen, så att bortkastade incheckningar kan återfås.' ('spets' is sv.po's term for a tip); the git-docs evidence now quotes the ORIG_HEAD sentences. | fixed |
| branch-force-delete | The note's 'only through the reflog' fails for a branch HEAD never visited (git branch -D also deletes the branch's own reflog); git branch -D prints the deleted tip's id, the easiest way back. | Verified with git 2.53.0 (new check at the end of CARD notes-checks): a branch made with git commit-tree and git update-ref left no HEAD reflog entry; git branch -D printed 'Deleted branch side (was 74cef95).' and git branch side 74cef95 recreated it. The reflog claim was dropped. Note now en 'Short for --delete --force. Git prints the deleted branch's last commit id ('was …'); git branch <branch> <id> recreates the branch.', sv 'Förkortning av --delete --force. Git skriver ut id:t för grenens sista incheckning ('var …'); git branch <gren> <id> återskapar grenen.' ('var' as in sv.po's 'Tog bort grenen %s (var %s).'); evidence updated. | fixed |
| branch-force-delete | The front closely follows git branch -h's '-D' help string and its sv.po translation, which the round-3 4-gram comparison did not cover. | Verified in sv.po: 'delete branch (even if not merged)' => 'ta bort gren (även om inte helt sammanslagen)' and 'delete fully merged branch' => 'ta bort helt sammanslagen gren'. These are minimal functional phrases stating what the option does, and the fronts are differently worded full sentences, so the fronts were kept; the resemblance and this decision are now stated in the licensing section. | no change needed |

### Round 6: Final full-deck review (facts and language) (2026-10-04)

**Reviewer:** Claude (AI) — independent final reviewer · **Scope:** all 56 cards

The reviewer checked all 56 cards, the metadata and round 5, found no factual errors, and raised two warnings and one suggestion about round 5's note changes. All three were verified (against the dossier's other notes, the round-4 test output and sv.po fetched 2026-10-04) and fixed.

| Card | Issue | Resolution | Outcome |
|---|---|---|---|
| branch-force-delete | The Swedish note used the Swedish placeholder <gren>, while the back, the English note, the deck description and every other Swedish note keep the English placeholders (<branch>, <file>, <name>, <email>). | Verified: the only Swedish placeholder in the dossier was this one. The sv note now reads 'git branch <branch> <id> återskapar grenen.' | fixed |
| reset-hard | 'Destructive: unstaged changes are lost' could be read as saying staged changes survive, but git reset --hard resets the index and working tree too; staged content is left only as a dangling blob for git fsck --lost-found. | Verified against the git-reset manual (--hard updates the index so nothing is staged) and the round-4 test (git status --short showed nothing afterwards; the staged content survived only as a dangling blob). Note now en 'Destructive: all uncommitted changes to tracked files are discarded (unstaged ones cannot be recovered at all). ...', sv 'Destruktivt: alla ej incheckade ändringar i spårade filer kastas bort (oköade ändringar går inte att få tillbaka alls). ...', matching the front's wording. | fixed |
| reset-hard | The Swedish note called a branch tip 'spets' while the rebase and pull-rebase fronts say 'topp'; sv.po itself is not consistent ('spets', 'ändpunkt', 'bastopp'), so round 5's claim that 'spets' is sv.po's term was only partly true. | Verified in sv.po (fetched 2026-10-04): 'från en spets', 'ny ändpunkt %s', 'en annan bastopp'. For consistency within the deck the sv note now says 'Grenens förra topp sparas i ORIG_HEAD ...'. | fixed |

## Cards and evidence

| Card | Front | Back | Evidence |
|---|---|---|---|
| `init` | Create a new, empty Git repository in the current directory (en) / Skapa ett nytt, tomt Git-arkiv i den aktuella katalogen (sv) | git init | Test run of every command with Git 2.53.0 in a throwaway repository: CARD init — git init in the new empty directory project printed 'Initialized empty Git repository in .../project/.git/'; git rev-parse --is-inside-work-tree then printed true.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-init (Description, Synopsis) — git init creates an empty repository, a .git directory, with an initial branch without commits; the directory argument is optional. |
| `clone` | Copy a remote repository, with its whole history, into a new directory (en) / Kopiera ett fjärrarkiv med hela dess historik till en ny katalog (sv) | git clone <url> | Test run of every command with Git 2.53.0 in a throwaway repository: CARD clone — git clone .../remote.git clone printed 'Cloning into 'clone'...'; in the clone git log showed the remote's latest commit and git branch -a showed main and remotes/origin/main.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-clone (Description) — git clone copies a repository into a newly created directory, creates remote-tracking branches for its branches and checks out an initial branch. |
| `config-name` | Set the name recorded in your commits, for all your repositories (en) / Ange namnet som skrivs in i dina incheckningar, för alla dina arkiv (sv) | git config set --global user.name "<name>" — *Subcommand form since Git 2.46. The older form git config --global user.name "<name>" is still accepted. (en) / Underkommandoformen finns sedan Git 2.46. Den äldre formen git config --global user.name "<name>" fungerar fortfarande. (sv)* | Test run of every command with Git 2.53.0 in a throwaway repository: CARD config-name — git config set --global user.name "Ada Lovelace" wrote 'name = Ada Lovelace' under [user] in the global configuration file; the older git config --global user.name "Ada Lovelace" also ran with exit status 0.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-config (Synopsis, --global, Deprecated modes) — Synopsis lists git config set ... <name> <value>; --global writes to the user's global ~/.gitconfig; the old git config <name> <value> is listed as deprecated and replaced by git config set.<br>Git 2.46.0 release notes (Documentation/RelNotes/2.46.0.adoc in the Git source repository): https://github.com/git/git/blob/master/Documentation/RelNotes/2.46.0.adoc — Git 2.46.0: the operation-mode options of git config (like --get) were deprecated and replaced with subcommands (like git config get). |
| `config-email` | Set the email address recorded in your commits, for all your repositories (en) / Ange e-postadressen som skrivs in i dina incheckningar, för alla dina arkiv (sv) | git config set --global user.email "<email>" — *Subcommand form since Git 2.46. The older form git config --global user.email "<email>" is still accepted. (en) / Underkommandoformen finns sedan Git 2.46. Den äldre formen git config --global user.email "<email>" fungerar fortfarande. (sv)* | Test run of every command with Git 2.53.0 in a throwaway repository: CARD config-email — git config set --global user.email "ada@example.org" wrote 'email = ada@example.org' under [user] in the global configuration file; later commits in the run have the author 'Ada Lovelace <ada@example.org>'.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-config (Synopsis, --global, Deprecated modes) — git config set <name> <value> sets a variable; --global writes to the user's global file; the form without set is deprecated.<br>Git 2.46.0 release notes (Documentation/RelNotes/2.46.0.adoc in the Git source repository): https://github.com/git/git/blob/master/Documentation/RelNotes/2.46.0.adoc — Git 2.46.0 replaced the git config mode options with subcommands. |
| `status` | Show which files are staged, modified or untracked (en) / Visa vilka filer som är köade, ändrade eller ospårade (sv) | git status | Test run of every command with Git 2.53.0 in a throwaway repository: CARD status, CARD diff-staged, CARD stash-pop — git status listed a.txt under 'Untracked files', a staged b.txt under 'Changes to be committed' and a modified alpha.txt under 'Changes not staged for commit'.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-status (Description) — git status shows paths that differ between the index and HEAD, paths that differ between the working tree and the index, and untracked paths. |
| `add-file` | Stage the changes in one file for the next commit (en) / Köa ändringarna i en fil inför nästa incheckning (sv) | git add <file> | Test run of every command with Git 2.53.0 in a throwaway repository: CARD add-file — git add a.txt, then git status --short showed 'A  a.txt' (staged).<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-add (Description) — git add updates the index with the current content of the given paths, preparing it for the next commit. |
| `add-all` | Stage every change in the whole working tree, including new and deleted files (en) / Köa alla ändringar i hela arbetskatalogen, även nya och borttagna filer (sv) | git add -A — *Long form: --all. git add . only stages changes in the current directory and below. (en) / Lång form: --all. git add . köar bara ändringar i den aktuella katalogen och dess underkataloger. (sv)* | Test run of every command with Git 2.53.0 in a throwaway repository: CARD add-all; CARD older-equivalents — Run from the subdirectory sub, git add -A staged a modified a.txt, a deleted b.txt, a new c.txt and a new sub/d.txt (status M, D, A, A). In the older-equivalents section git add --all did the same, and git add . run from sub staged only sub/s.txt and left top.txt untracked.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-add (-A, --all) — -A/--all adds, modifies and removes index entries to match the working tree; with no pathspec the entire working tree is covered. |
| `add-patch` | Choose interactively which parts (hunks) of your changes to stage (en) / Välj interaktivt vilka delar (stycken) av dina ändringar som ska köas (sv) | git add -p — *Long form: --patch. Answer y or n for each hunk. (en) / Lång form: --patch. Svara y eller n för varje stycke. (sv)* | Test run of every command with Git 2.53.0 in a throwaway repository: CARD add-patch; CARD notes-checks — git add -p showed the hunk '-one +ONE' in b.txt with the prompt '(1/1) Stage this hunk [y,n,q,a,d,e,p,P,?]?'; after answering y, git status --short showed 'M  b.txt' (staged). In a fresh repository, echo y \| git add --patch showed the single hunk with 'Stage this hunk [y,n,q,a,d,e,p,P,?]?' and git status --short then showed 'M  a.txt' (staged).<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-add (-p, --patch) — -p/--patch lets the user choose hunks between the index and the work tree interactively and adds them to the index.<br>Git's Swedish translation (po/sv.po in the Git source repository, for Git 2.56.0): msgid "Stage this hunk [y,n,q,a,d%s,?]? " — Translated 'Köa stycket [y,n,q,a,d%s,?]? ': hunk is 'stycke' in Git's Swedish. |
| `diff` | Show the changes in the working tree that are not yet staged (en) / Visa ändringarna i arbetskatalogen som ännu inte är köade (sv) | git diff | Test run of every command with Git 2.53.0 in a throwaway repository: CARD diff — After a.txt was changed from 'hello' to 'hello world' without staging, git diff showed '-hello' and '+hello world' for a.txt.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-diff (git diff [<options>] [--] [<path>...]) — Without arguments git diff shows the changes relative to the index, i.e. what could still be added to the index but has not been. |
| `diff-staged` | Show the staged changes that will go into the next commit (en) / Visa de köade ändringarna som kommer med i nästa incheckning (sv) | git diff --staged — *--cached is a synonym. (en) / --cached betyder samma sak. (sv)* | Test run of every command with Git 2.53.0 in a throwaway repository: CARD diff-staged — With the change to b.txt staged, git diff --staged showed '-one +ONE' for b.txt; git diff --cached --stat showed the same file.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-diff (git diff [<options>] --cached ...) — --cached shows the staged changes relative to HEAD (or a named commit); --staged is documented as a synonym of --cached. |
| `commit-message` | Commit the staged changes with a message given on the command line (en) / Checka in de köade ändringarna med ett meddelande som anges på kommandoraden (sv) | git commit -m "<message>" | Test run of every command with Git 2.53.0 in a throwaway repository: CARD commit-message — git commit -m "First commit" printed '[main (root-commit) ...] First commit, 1 file changed'; git log --oneline then listed 'First commit'.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-commit (Description, -m) — git commit creates a new commit from the contents of the index; -m <msg> uses the given text as the commit message. |
| `commit-amend` | Replace the last commit with a new one that also contains the staged changes, editing its message (en) / Ersätt den senaste incheckningen med en ny som även innehåller de köade ändringarna, och redigera meddelandet (sv) | git commit --amend — *Add --no-edit to keep the message unchanged. Avoid amending commits you have already pushed. (en) / Lägg till --no-edit för att behålla meddelandet. Undvik att ändra incheckningar som du redan har skickat till ett fjärrarkiv (push). (sv)* | Test run of every command with Git 2.53.0 in a throwaway repository: CARD commit-amend — With e.txt staged, git commit --amend --no-edit and then git commit --amend (editor replaced by true) each replaced the tip commit: the commit id changed, e.txt was added to it, and git log --oneline still showed three commits.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-commit (--amend) — --amend replaces the tip of the current branch with a new commit, using the original commit's message as the starting point when no other message is given. |
| `restore` | Discard the unstaged changes to a file (en) / Kasta bort de oköade ändringarna i en fil (sv) | git restore <file> — *Older equivalent: git checkout -- <file>. The discarded changes cannot be recovered. (en) / Äldre motsvarighet: git checkout -- <file>. Ändringarna som kastas går inte att få tillbaka. (sv)* | Test run of every command with Git 2.53.0 in a throwaway repository: CARD restore; CARD older-equivalents — git restore a.txt reverted the unstaged change: git status --short was empty and cat a.txt printed 'hello'. git checkout -- a.txt did the same in the older-equivalents section. git status itself suggests 'use "git restore <file>..." to discard changes in working directory' (CARD stash-pop).<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-restore (Description, -S/--staged) — git restore restores paths in the working tree; without --staged the working tree is restored, by default from the index. |
| `restore-staged` | Unstage a file but keep its changes in the working tree (en) / Ta bort en fil från kön men behåll ändringarna i arbetskatalogen (sv) | git restore --staged <file> — *Older equivalent: git reset <file>. (en) / Äldre motsvarighet: git reset <file>. (sv)* | Test run of every command with Git 2.53.0 in a throwaway repository: CARD restore-staged; CARD diff-staged; CARD older-equivalents — git status suggested 'use "git restore --staged <file>..." to unstage'; git restore --staged b.txt changed the status from 'M  b.txt' to ' M b.txt' and git diff --stat still showed the change. git reset a.txt likewise printed 'Unstaged changes after reset: M a.txt'.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-restore (-S, --staged); https://git-scm.com/docs/git-reset — --staged restores only the index, by default from HEAD; the git-reset page says git reset <pathspec> is equivalent to git restore --staged <pathspec>.<br>Git's Swedish translation (po/sv.po in the Git source repository, for Git 2.56.0): msgid "  (use \"git restore --staged <file>...\" to unstage)" — Translated '(använd ”git restore --staged <fil>...” för att ta bort från kö)': to unstage is 'ta bort från kö'. |
| `rm` | Delete a tracked file and stage its removal (en) / Ta bort en spårad fil och köa borttagningen (sv) | git rm <file> | Test run of every command with Git 2.53.0 in a throwaway repository: CARD rm — git rm c.txt printed "rm 'c.txt'"; git status --short showed 'D  c.txt' (staged deletion) and ls no longer listed c.txt.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-rm (Description) — git rm removes files from the working tree and the index (or from the index only with --cached). |
| `rm-cached` | Stop tracking a file but keep it in the working tree (en) / Sluta spåra en fil men behåll den i arbetskatalogen (sv) | git rm --cached <file> — *The file becomes untracked; list it in .gitignore to keep it out of later commits. (en) / Filen blir ospårad; lägg till den i .gitignore så att den inte kommer med i senare incheckningar. (sv)* | Test run of every command with Git 2.53.0 in a throwaway repository: CARD rm-cached — git rm --cached e.txt: git status --short showed 'D  e.txt' (removal staged) and '?? e.txt' (untracked), and ls still listed e.txt.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-rm (--cached) — --cached removes paths only from the index and leaves the working tree files alone. |
| `mv` | Rename a tracked file and stage the rename (en) / Byt namn på en spårad fil och köa namnbytet (sv) | git mv <old> <new> | Test run of every command with Git 2.53.0 in a throwaway repository: CARD mv — git mv a.txt alpha.txt, then git status --short showed 'R  a.txt -> alpha.txt' (staged rename).<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-mv (Description) — git mv moves or renames a file, directory or symlink and updates the index; the change must still be committed. |
| `branch-list` | List the local branches (en) / Visa de lokala grenarna (sv) | git branch — *The current branch is marked with *. Add -a to include remote-tracking branches. (en) / Den aktuella grenen är markerad med *. Lägg till -a för att även visa fjärrspårande grenar. (sv)* | Test run of every command with Git 2.53.0 in a throwaway repository: CARD branch-list; CARD branch-all — git branch printed '  feature' and '* main'. In the clone, git branch -a also listed remotes/origin/HEAD -> origin/main and remotes/origin/main.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-branch (Description, -a) — With no non-option arguments existing branches are listed and the current one is marked with an asterisk; -a lists both remote-tracking and local branches. |
| `branch-create` | Create a new branch without switching to it (en) / Skapa en ny gren utan att byta till den (sv) | git branch <branch> | Test run of every command with Git 2.53.0 in a throwaway repository: CARD branch-create, CARD branch-list — git branch feature ran with exit status 0; git branch then listed feature, with main still marked as current.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-branch (Synopsis, Description) — git branch <branch-name> [<start-point>] creates a new branch pointing at the current HEAD (or the start point) but does not switch to it. |
| `switch` | Switch to an existing branch (en) / Byt till en befintlig gren (sv) | git switch <branch> — *Older equivalent: git checkout <branch>. (en) / Äldre motsvarighet: git checkout <branch>. (sv)* | Test run of every command with Git 2.53.0 in a throwaway repository: CARD switch; CARD older-equivalents — git switch feature printed "Switched to branch 'feature'" and git branch --show-current printed feature. git checkout other likewise switched to other.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-switch (Description) — git switch <branch> switches to the given branch, updating the working tree and index; new commits go on that branch. |
| `switch-create` | Create a new branch and switch to it (en) / Skapa en ny gren och byt till den (sv) | git switch -c <branch> — *Older equivalent: git checkout -b <branch>. Long form: --create. (en) / Äldre motsvarighet: git checkout -b <branch>. Lång form: --create. (sv)* | Test run of every command with Git 2.53.0 in a throwaway repository: CARD switch-create; CARD older-equivalents; CARD notes-checks — git switch -c topic printed "Switched to a new branch 'topic'" and git branch --show-current printed topic. git checkout -b other printed "Switched to a new branch 'other'". In a fresh repository, git switch --create x printed 'Switched to a new branch 'x'' and git branch --show-current printed x.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-switch (-c, --create); https://git-scm.com/docs/git-checkout (git checkout -b) — -c/--create creates the new branch and switches to it (documented as the transactional equivalent of git branch followed by git switch); git checkout -b creates and checks out a new branch, with 'or git switch -c' given in its examples. |
| `switch-previous` | Switch back to the branch you were on before (en) / Byt tillbaka till grenen du var på innan (sv) | git switch - — *Older equivalent: git checkout -. (en) / Äldre motsvarighet: git checkout -. (sv)* | Test run of every command with Git 2.53.0 in a throwaway repository: CARD switch-previous; CARD older-equivalents — On feature after switching from main, git switch - printed "Switched to branch 'main'". git checkout - did the same in the older-equivalents section.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-switch (<branch>) — The branch argument - is documented as a synonym of @{-1}, the branch switched from last, for switching quickly between two branches. |
| `branch-rename` | Rename the current branch (en) / Byt namn på den aktuella grenen (sv) | git branch -m <new-name> — *Long form: --move. (en) / Lång form: --move. (sv)* | Test run of every command with Git 2.53.0 in a throwaway repository: CARD branch-rename; CARD older-equivalents — On topic, git branch -m topic2 ran and git branch showed '* topic2'. git branch --move renamed did the same in the older-equivalents section.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-branch (Synopsis, -m, --move) — git branch (-m\|-M) [<old-branch>] <new-branch>: -m/--move renames a branch with its config and reflog; the old name is optional. |
| `branch-delete` | Delete a local branch that has been fully merged (en) / Ta bort en lokal gren som redan är helt sammanslagen (sv) | git branch -d <branch> | Test run of every command with Git 2.53.0 in a throwaway repository: CARD branch-delete; CARD branch-force-delete — After topic2 was merged into main, git branch -d topic2 printed 'Deleted branch topic2'. On the unmerged branch spike it refused: "error: the branch 'spike' is not fully merged".<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-branch (-d, --delete) — -d/--delete deletes a branch, which must be fully merged in its upstream branch or in HEAD. |
| `branch-force-delete` | Delete a local branch even if it has not been merged (en) / Ta bort en lokal gren även om den inte har slagits ihop (sv) | git branch -D <branch> — *Short for --delete --force. Git prints the deleted branch's last commit id ('was …'); git branch <branch> <id> recreates the branch. (en) / Förkortning av --delete --force. Git skriver ut id:t för grenens sista incheckning ('var …'); git branch <branch> <id> återskapar grenen. (sv)* | Test run of every command with Git 2.53.0 in a throwaway repository: CARD branch-force-delete; CARD notes-checks — git branch -d spike refused because spike was not fully merged, with the hint "If you are sure you want to delete it, run 'git branch -D spike'"; git branch -D spike printed 'Deleted branch spike'. In a fresh repository, git branch --delete --force x deleted the unmerged branch x ('Deleted branch x (was 4764814).'). Added in quality-control round 4 (end of CARD notes-checks): with the commit F on the branch feat, merged into the branch integ but not into main, git branch -d feat on main printed "error: the branch 'feat' is not fully merged", git branch -D feat printed 'Deleted branch feat (was 20afa49).', and git log --oneline -n 1 integ still showed '20afa49 F', so a force-deleted branch's commits stay reachable from any other branch that contains them. Added in quality-control round 5 (end of CARD notes-checks): a branch side pointing at a commit 'N' that HEAD never visited (made with git commit-tree and git update-ref) was deleted with git branch -D side, which printed 'Deleted branch side (was 74cef95).'; git log -g --format=%s HEAD listed no 'N' (no HEAD reflog entry), and git branch side 74cef95 recreated the branch, git log --oneline -n 1 side showing '74cef95 N'.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-branch (-D) — -D is a shortcut for --delete --force. -d: the branch must be fully merged in its upstream branch, or in HEAD if no upstream was set (so 'not merged' is judged against the upstream or HEAD only, not against other branches). The sv.po translation of the message 'Deleted branch %s (was %s).' is 'Tog bort grenen %s (var %s).'. |
| `merge` | Merge another branch into the current branch (en) / Slå ihop en annan gren med den aktuella grenen (sv) | git merge <branch> | Test run of every command with Git 2.53.0 in a throwaway repository: CARD merge — On main, git merge topic2 printed 'Fast-forward' and git log showed topic2's commit 'Add f on topic2' on main.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-merge (Description) — git merge incorporates the changes from the named commits (since they diverged from the current branch) into the current branch. |
| `merge-abort` | Abandon a merge that stopped with conflicts and go back to the state before it (en) / Avbryt en sammanslagning som har stoppats av konflikter och gå tillbaka till läget före den (sv) | git merge --abort | Test run of every command with Git 2.53.0 in a throwaway repository: CARD merge-abort — git merge conflict stopped with 'CONFLICT (content): Merge conflict in alpha.txt'; git merge --abort exited 0 and git status --short showed no conflicted or staged files.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-merge (--abort) — --abort ends the conflict resolution and tries to reconstruct the pre-merge state; uncommitted changes present before the merge may not always be reconstructed. |
| `rebase` | Move the current branch's commits so that they start from the tip of another branch (en) / Flytta den aktuella grenens incheckningar så att de utgår från toppen av en annan gren (sv) | git rebase <branch> — *This rewrites the branch's commits; avoid rebasing commits others have already fetched. (en) / Detta skriver om grenens incheckningar; undvik att ombasera incheckningar som andra redan har hämtat. (sv)* | Test run of every command with Git 2.53.0 in a throwaway repository: CARD rebase — On the branch rebased, git rebase main printed 'Successfully rebased and updated refs/heads/rebased.'; git log showed its commit 'Add r' directly on top of main's latest commit 'Ours'.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-rebase (Description) — git rebase moves a series of commits onto a different starting point, e.g. a topic branch onto the current tip of another branch.<br>Git's Swedish translation (po/sv.po in the Git source repository, for Git 2.56.0): msgid "Reapply commits on top of another base tip" — Translated 'Applicera incheckningar på nytt ovanpå en annan bastopp'; rebase is 'ombasera'/'ombasering' elsewhere in the file. |
| `rebase-continue` | Continue a rebase after resolving and staging the conflicts (en) / Fortsätt en ombasering efter att du har löst och köat konflikterna (sv) | git rebase --continue | Test run of every command with Git 2.53.0 in a throwaway repository: CARD rebase-continue — git rebase main stopped with a conflict in alpha.txt and the hint to resolve, git add, then run git rebase --continue; after editing and git add alpha.txt, git rebase --continue printed 'Successfully rebased and updated refs/heads/conflict.'<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-rebase (--continue) — --continue restarts the rebasing process after a merge conflict has been resolved. |
| `rebase-abort` | Cancel a rebase in progress and return to the state before it began (en) / Avbryt en pågående ombasering och återgå till läget innan den började (sv) | git rebase --abort | Test run of every command with Git 2.53.0 in a throwaway repository: CARD rebase-abort — git rebase main on conflict2 stopped with a conflict; git rebase --abort exited 0 and git status showed 'On branch conflict2' with nothing to commit (only an untracked file).<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-rebase (--abort) — --abort aborts the rebase and resets HEAD to the original branch, where it was when the rebase started. |
| `cherry-pick` | Apply the change made by one existing commit as a new commit on the current branch (en) / Tillämpa ändringen från en befintlig incheckning som en ny incheckning på den aktuella grenen (sv) | git cherry-pick <commit> | Test run of every command with Git 2.53.0 in a throwaway repository: CARD cherry-pick — On main, git cherry-pick <id of 'Add r' on the branch rebased> printed '[main ...] Add r, create mode 100644 r.txt' and git log showed 'Add r' as main's new tip.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-cherry-pick (Description) — Given existing commits, git cherry-pick applies the change each introduces and records a new commit for each. |
| `log` | Show the commit history of the current branch (en) / Visa incheckningshistoriken för den aktuella grenen (sv) | git log | Test run of every command with Git 2.53.0 in a throwaway repository: CARD log — git log -n 2 showed the two newest commits of main, newest first, each with commit id, Author, Date and message.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-log (Description) — git log shows the commit logs: commits reachable from the given commits (HEAD by default), in reverse chronological order. |
| `log-oneline` | Show the commit history with one short line per commit (en) / Visa incheckningshistoriken med en kort rad per incheckning (sv) | git log --oneline | Test run of every command with Git 2.53.0 in a throwaway repository: CARD log-oneline — git log --oneline -n 3 printed three lines, each an abbreviated commit id and the subject, e.g. '042400e Add r'.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-log (--oneline) — --oneline is shorthand for --pretty=oneline --abbrev-commit. |
| `log-follow` | List the commits that changed one file, including those made before it was renamed (en) / Lista incheckningarna som ändrade en fil, även de som gjordes innan den bytte namn (sv) | git log --follow <file> | Test run of every command with Git 2.53.0 in a throwaway repository: CARD log-follow — After a.txt was renamed to alpha.txt, git log --oneline --follow alpha.txt listed three commits back to 'First commit', while git log --oneline alpha.txt listed only the rename commit.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-log (--follow) — --follow continues listing a file's history beyond renames; it works only for a single file. |
| `show` | Show a commit's author, message and changes (en) / Visa en incheckning med författare, meddelande och ändringar (sv) | git show <commit> — *Without an argument it shows the latest commit (HEAD). (en) / Utan argument visas den senaste incheckningen (HEAD). (sv)* | Test run of every command with Git 2.53.0 in a throwaway repository: CARD show; CARD notes-checks — git show --stat HEAD printed the commit id, 'Author: Ada Lovelace <ada@example.org>', the date, the message 'Add r' and the changed file r.txt. In a fresh repository, git show with no argument printed the latest commit, B (the commit HEAD pointed to), with its author, message and diff.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-show (Description, <object>) — For commits git show shows the log message and textual diff; the object defaults to HEAD. |
| `blame` | For each line of a file, show the commit that last changed it and who made that commit (en) / Visa för varje rad i en fil vilken incheckning som senast ändrade den och vem som gjorde incheckningen (sv) | git blame <file> | Test run of every command with Git 2.53.0 in a throwaway repository: CARD blame — git blame alpha.txt printed '2e73ac9e (Ada Lovelace 2026-10-04 12:00:00 +0000 1) ours': commit, author, date and line number for the file's one line.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-blame (Description) — git blame annotates each line of a file with information from the revision that last modified it. |
| `reflog` | Show where HEAD has recently pointed, to find lost commits (en) / Visa var HEAD nyligen har pekat, för att hitta förlorade incheckningar (sv) | git reflog | Test run of every command with Git 2.53.0 in a throwaway repository: CARD reflog — git reflog -n 5 listed entries HEAD@{0} to HEAD@{4} with the action that moved HEAD, e.g. 'cherry-pick: Add r', 'checkout: moving from conflict2 to main', 'rebase (abort): ...'.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-reflog (Synopsis, Description) — git reflog [show] shows the reference log, which records when the tips of branches and other references (HEAD by default) were updated in the local repository; HEAD@{2} means where HEAD was two moves ago. |
| `remote-list` | List the remotes with their URLs (en) / Visa fjärrarkiven med deras URL:er (sv) | git remote -v | Test run of every command with Git 2.53.0 in a throwaway repository: CARD remote-list — git remote -v printed origin with its URL twice, marked (fetch) and (push).<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-remote (-v, --verbose) — Without a subcommand git remote lists the remotes; -v/--verbose also shows each remote's URL. |
| `remote-add` | Add a new remote under a name of your choice (en) / Lägg till ett nytt fjärrarkiv under ett valfritt namn (sv) | git remote add <name> <url> | Test run of every command with Git 2.53.0 in a throwaway repository: CARD remote-add, CARD remote-list — git remote add origin .../remote.git ran with exit status 0 and git remote -v then listed origin with that URL.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-remote (add) — git remote add adds a remote with the given name for the repository at the given URL. |
| `fetch` | Download new commits and branches from the remote without changing your own branches (en) / Hämta nya incheckningar och grenar från fjärrarkivet utan att ändra dina egna grenar (sv) | git fetch | Test run of every command with Git 2.53.0 in a throwaway repository: CARD fetch — git fetch updated origin/main and created origin/old-branch; git status -sb then showed 'main...origin/main [behind 1]' and git log showed the local main unchanged.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-fetch (Description) — git fetch downloads branches and tags from other repositories with the objects needed and updates the remote-tracking branches. |
| `fetch-prune` | Fetch, and also delete your remote-tracking branches for branches that were deleted on the remote (en) / Hämta och ta även bort de fjärrspårande grenar vars gren har tagits bort i fjärrarkivet (sv) | git fetch --prune — *Short form: -p. (en) / Kort form: -p. (sv)* | Test run of every command with Git 2.53.0 in a throwaway repository: CARD fetch-prune; CARD notes-checks — After old-branch was deleted on the remote, git branch -r in the clone still listed origin/old-branch; git fetch --prune printed '- [deleted] (none) -> origin/old-branch' and git branch -r no longer listed it. In a fresh repository, after the branch gone was deleted in the remote repository itself, git fetch -p printed '- [deleted] (none) -> origin/gone' and git branch -r no longer listed origin/gone.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-fetch (-p, --prune) — -p/--prune removes, before fetching, any remote-tracking references that no longer exist on the remote.<br>Git's Swedish translation (po/sv.po in the Git source repository, for Git 2.56.0): msgid "prune remote-tracking branches no longer on remote" — Translated 'rensa fjärrspårande grenar ej längre på fjärren'. |
| `pull` | Fetch the current branch's upstream and integrate it into the current branch (en) / Hämta den aktuella grenens uppströmsgren och integrera den i den aktuella grenen (sv) | git pull — *If both sides have new commits, Git stops and asks you to choose --rebase, --no-rebase (merge) or --ff-only, or to set pull.rebase or pull.ff. (en) / Om båda sidor har nya incheckningar avbryter Git och ber dig välja --rebase, --no-rebase (sammanslagning) eller --ff-only, eller ställa in pull.rebase eller pull.ff. (sv)* | Test run of every command with Git 2.53.0 in a throwaway repository: CARD pull; CARD pull-rebase — With main behind origin/main, git pull printed 'Fast-forward' and main moved to 'Add q (from clone)'. When both sides had new commits, git pull stopped: 'hint: You have divergent branches and need to specify how to reconcile them.' ... 'fatal: Need to specify how to reconcile divergent branches.' In CARD pull-rebase, plain git pull on diverged branches stopped with exit status 128 after a hint listing 'git config pull.rebase false # merge', 'git config pull.rebase true # rebase', 'git config pull.ff only # fast-forward only' and the options --rebase, --no-rebase and --ff-only, then 'fatal: Need to specify how to reconcile divergent branches.'<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-pull (Description, --ff-only) — git pull runs git fetch and then integrates the fetched branch, by default the current branch's upstream, into the current branch; when no reconciliation method is configured it only fast-forwards and fails if the branches have diverged (2.56.0 manual). |
| `pull-rebase` | Fetch the upstream and move your local commits so that they start from its new tip (en) / Hämta uppströmsgrenen och flytta dina lokala incheckningar så att de utgår från dess nya topp (sv) | git pull --rebase | Test run of every command with Git 2.53.0 in a throwaway repository: CARD pull-rebase — With diverged branches, git pull --rebase printed 'Successfully rebased and updated refs/heads/main.'; git log showed the local commit 'Add l (local)' on top of the remote's 'Add w (clone)'.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-pull (-r, --rebase) — --rebase (true) rebases the current branch on top of the upstream branch after fetching. |
| `push` | Send the current branch's new commits to its upstream branch (en) / Skicka den aktuella grenens nya incheckningar till dess uppströmsgren (sv) | git push | Test run of every command with Git 2.53.0 in a throwaway repository: CARD push — With main tracking origin/main and one new commit, git push printed 'e308664..d780a72  main -> main'.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-push (Description) — git push updates branches or other references in remote repositories from the local repository and sends the data the remote lacks. |
| `push-upstream` | Send a new local branch to origin for the first time and make origin's new branch the local branch's upstream (en) / Skicka en ny lokal gren till origin för första gången och ställ in den nya grenen i origin som den lokala grenens uppströmsgren (sv) | git push -u origin <branch> — *Long form: --set-upstream. Afterwards plain git push and git pull use that branch. (en) / Lång form: --set-upstream. Därefter använder git push och git pull utan argument den grenen. (sv)* | Test run of every command with Git 2.53.0 in a throwaway repository: CARD push-upstream; CARD older-equivalents — git push -u origin main printed '* [new branch] main -> main' and "branch 'main' set up to track 'origin/main'."; git status -sb then showed 'main...origin/main'. git push --set-upstream origin older-branch did the same.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-push (-u, --set-upstream) — -u/--set-upstream adds an upstream (tracking) reference for every branch successfully pushed, used by argument-less git pull and other commands. |
| `push-delete` | Delete a branch on the remote origin (en) / Ta bort en gren i fjärrarkivet origin (sv) | git push origin --delete <branch> | Test run of every command with Git 2.53.0 in a throwaway repository: CARD push-delete — git push origin --delete old-branch printed '- [deleted] old-branch'; a later fetch with --prune in the clone removed origin/old-branch.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-push (-d, --delete) — -d/--delete deletes all listed refs from the remote repository. |
| `push-tag` | Send a single tag to origin (en) / Skicka en enskild tagg till origin (sv) | git push origin <tag> — *By default git push sends no tags unless you name them; --tags sends all of them. (en) / Som standard skickar git push inga taggar om du inte anger dem; --tags skickar alla. (sv)* | Test run of every command with Git 2.53.0 in a throwaway repository: CARD push, CARD push-tag; CARD notes-checks — git push -u origin main and git push sent only the branch; git push origin v1.0 then printed '* [new tag] v1.0 -> v1.0' and git ls-remote --tags origin listed refs/tags/v1.0. In a fresh repository with the tags v1 and lightweight, plain git push printed 'Everything up-to-date' and git ls-remote --tags origin listed no tags; git push --tags then sent both, and ls-remote listed refs/tags/lightweight and refs/tags/v1.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-push (<refspec>, --tags, --follow-tags) — Refs named on the command line are pushed to the remote; --tags pushes all refs under refs/tags in addition to the listed refspecs. --follow-tags (and the push.followTags setting) also pushes annotated tags that point at pushed commits, which is why the note says 'by default'. |
| `stash` | Set aside your uncommitted changes to tracked files and return to a clean working tree (en) / Lägg undan dina ej incheckade ändringar i spårade filer och återgå till en ren arbetskatalog (sv) | git stash — *Same as git stash push. Untracked files are left where they are. (en) / Samma som git stash push. Ospårade filer lämnas kvar. (sv)* | Test run of every command with Git 2.53.0 in a throwaway repository: CARD stash; CARD older-equivalents — git stash printed 'Saved working directory and index state WIP on main: ...'; git status --short then showed only the untracked files e.txt and u.txt. git stash push gave the same result.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-stash (Description, push) — git stash records the working directory and index state and goes back to a clean working directory matching HEAD; without arguments it is equivalent to git stash push. |
| `stash-untracked` | Stash your uncommitted changes, including untracked files (en) / Lägg undan dina ej incheckade ändringar, även ospårade filer (sv) | git stash -u — *Long form: --include-untracked. Ignored files are still left alone. (en) / Lång form: --include-untracked. Ignorerade filer lämnas fortfarande kvar. (sv)* | Test run of every command with Git 2.53.0 in a throwaway repository: CARD stash-untracked; CARD older-equivalents; CARD notes-checks — With alpha.txt modified and e.txt, u.txt untracked, git stash -u saved a stash and git status --short was then empty. git stash --include-untracked did the same. With a .gitignore listing *.log, an ignored debug.log, an untracked u.txt and a change to a.txt, git stash -u stashed u.txt and the change, and git status --short --ignored then showed only '!! debug.log'.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-stash (-u, --include-untracked) — With push, -u/--include-untracked also stashes all untracked files and then cleans them up. |
| `stash-list` | List your stash entries (en) / Visa dina undanlagda ändringar (stash-posterna) (sv) | git stash list | Test run of every command with Git 2.53.0 in a throwaway repository: CARD stash-list — git stash list printed 'stash@{0}: WIP on main: e308664 Reapply "Add r"'.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-stash (list) — git stash list lists the stash entries, stash@{0} being the latest, with the branch and commit each was made on.<br>Git's Swedish translation (po/sv.po in the Git source repository, for Git 2.56.0): msgid "No stash entries found." — Translated 'Inga ”stash”-poster hittades.': Git's Swedish keeps the word stash and calls the entries stash-poster. |
| `stash-pop` | Reapply the most recent stash and remove it from the stash list (en) / Applicera de senast undanlagda ändringarna på nytt och ta bort dem från stash-listan (sv) | git stash pop — *If applying gives conflicts, the entry is kept; git stash apply never removes it. (en) / Om det blir konflikter behålls posten; git stash apply tar aldrig bort den. (sv)* | Test run of every command with Git 2.53.0 in a throwaway repository: CARD stash-pop; CARD notes-checks — git stash pop brought back the change to alpha.txt (shown as modified) and printed 'Dropped refs/stash@{0} (...)'; git stash list was then empty. A git stash pop that conflicted printed 'CONFLICT (content): Merge conflict in a.txt' and 'The stash entry is kept in case you need it again.', and git stash list still showed stash@{0}; after a reset, git stash apply applied the change without conflict and git stash list still showed stash@{0}.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-stash (pop, apply) — pop removes a stashed state from the stash list and applies it on top of the working tree; on conflicts it is not removed. apply is like pop but does not remove the state from the list. |
| `revert` | Undo an earlier commit by making a new commit that reverses its changes (en) / Ångra en tidigare incheckning genom att göra en ny incheckning som upphäver dess ändringar (sv) | git revert <commit> — *Safe for commits that are already shared, because history is not rewritten. (en) / Säkert även för incheckningar som redan delats, eftersom historiken inte skrivs om. (sv)* | Test run of every command with Git 2.53.0 in a throwaway repository: CARD revert — git revert --no-edit <id of 'Add r'> created the new commit 'Revert "Add r"' that deleted r.txt, with 'Add r' still in the history; git revert HEAD (editor replaced by true) then created 'Reapply "Add r"'.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-revert (Description) — git revert reverts the changes introduced by existing commits and records new commits for that; it is for reversing earlier commits, not for discarding uncommitted changes. |
| `reset-soft` | Undo the last commit but keep its changes staged (en) / Ångra den senaste incheckningen men behåll dess ändringar köade (sv) | git reset --soft HEAD~1 — *HEAD^ means the same as HEAD~1. (en) / HEAD^ betyder samma sak som HEAD~1. (sv)* | Test run of every command with Git 2.53.0 in a throwaway repository: CARD reset-soft; CARD older-equivalents — After committing z.txt, git reset --soft HEAD~1 left 'A  z.txt' staged and git log showed the previous commit as the tip. git reset --soft HEAD^ likewise left the undone commit's change staged ('M  a.txt').<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-reset (--soft) — --soft moves the branch to the given commit and leaves the working tree files and the index unchanged. |
| `reset-hard` | Move the current branch to a given commit and discard all uncommitted changes to tracked files (en) / Flytta den aktuella grenen till en viss incheckning och kasta bort alla ej incheckade ändringar i spårade filer (sv) | git reset --hard <commit> — *Destructive: all uncommitted changes to tracked files are discarded (unstaged ones cannot be recovered at all). The old branch tip is kept in ORIG_HEAD (until another command such as reset, merge or rebase replaces it) and in the reflog, so dropped commits can be restored. (en) / Destruktivt: alla ej incheckade ändringar i spårade filer kastas bort (oköade ändringar går inte att få tillbaka alls). Grenens förra topp sparas i ORIG_HEAD (tills ett annat kommando, till exempel reset, merge eller rebase, ersätter den) och i referensloggen, så att bortkastade incheckningar kan återfås. (sv)* | Test run of every command with Git 2.53.0 in a throwaway repository: CARD reset-hard; CARD notes-checks — With an uncommitted change to alpha.txt, git reset --hard <id of the commit before 'Add z'> printed 'HEAD is now at e308664 Reapply "Add r"'; git status --short showed only the untracked e.txt, and the 'Add z' commit was gone from git log. With the commit K on both main and the branch keep, git reset --hard HEAD~1 on main moved main to 'Sub', while git log -n 1 keep still showed 'K'. Added in quality-control round 4 (end of CARD notes-checks): with an unstaged change to a.txt and the new file s.txt staged, git reset --hard printed 'HEAD is now at 64ae875 Sub' and git status --short showed nothing; git fsck --lost-found then listed 'dangling blob eee14ef7…', whose content (git cat-file -p) was 'staged-content', and no blob with the unstaged change, so staged content can still be found with git fsck while unstaged changes are lost. Added in quality-control round 5 (end of CARD notes-checks): after committing 'O', git reset --hard HEAD~1 printed 'HEAD is now at 64ae875 Sub', git log --oneline -n 1 ORIG_HEAD showed 'b5c4307 O', and git reset --hard ORIG_HEAD printed 'HEAD is now at b5c4307 O'.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-reset (DESCRIPTION, --hard, EXAMPLES); https://git-scm.com/docs/git-merge and https://git-scm.com/docs/git-rebase (ORIG_HEAD) — --hard overwrites files with the version from the commit, removes tracked files not in it, and updates the index so nothing is staged. Description: 'Before the operation, ORIG_HEAD is set to the tip of the current branch.' The examples say '"reset" copies the old head to .git/ORIG_HEAD' and that 'git reset --hard ORIG_HEAD will let you go back to where you were'. The git-merge and git-rebase pages say those commands also set ORIG_HEAD. |
| `clean` | Delete the untracked files from the current directory down, leaving untracked directories alone (en) / Ta bort de ospårade filerna från den aktuella katalogen och nedåt, men lämna ospårade kataloger orörda (sv) | git clean -f — *Without -f Git refuses. Add -d to delete untracked directories and their contents too; -n only lists what would be deleted. (en) / Utan -f vägrar Git. Lägg till -d för att även ta bort ospårade kataloger med innehåll; -n visar bara vad som skulle tas bort. (sv)* | Test run of every command with Git 2.53.0 in a throwaway repository: CARD clean-dry-run, CARD clean; CARD older-equivalents; CARD notes-checks — git clean -n printed 'Would remove e.txt', 'Would remove u.txt'; git clean -f printed 'Removing e.txt', 'Removing u.txt'; plain git clean failed with 'fatal: clean.requireForce is true and -f not given: refusing to clean'. git clean -f left the untracked directory ud, and git clean -f -d removed it. Run from the tracked subdirectory sub, git clean -f removed the untracked sub/s.u but left the file in the untracked directory sub/nested and the untracked top.u in the directory above (git status --short --untracked-files=all: '?? nested/n.u', '?? ../top.u'); git clean -f -d then printed 'Removing nested/'.<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-clean (Description, -f, -n, -d) — git clean removes files not under version control, starting from the current directory; it refuses without -f unless clean.requireForce is false; -n only shows what would be done; -d recurses into untracked directories. Under -d: without a pathspec, git clean does not recurse into untracked directories unless -d is given. |
| `tag-annotated` | Create an annotated tag with a message on the current commit (en) / Skapa en annoterad tagg med ett meddelande på den aktuella incheckningen (sv) | git tag -a <tag> -m "<message>" — *-m on its own also implies -a. git tag with no arguments lists the tags. (en) / -m ensamt innebär också -a. git tag utan argument visar taggarna. (sv)* | Test run of every command with Git 2.53.0 in a throwaway repository: CARD tag-annotated, CARD tag-list; CARD notes-checks — git tag -a v1.0 -m "Version 1.0" ran; git cat-file -t v1.0 printed 'tag' (a tag object, i.e. annotated) and git tag printed v1.0. git tag -m "Version 1" v1 without -a also created a tag object (git cat-file -t v1 printed 'tag'), while the lightweight git tag lightweight pointed straight at a commit (printed 'commit').<br>Git reference manual (git-scm.com/docs, latest version 2.56.0): https://git-scm.com/docs/git-tag (Description, -a, -l) — -a makes an unsigned annotated tag object, which requires a message (given with -m or typed in an editor); running git tag without arguments lists all tags. Under -m: implies -a if none of -a, -s or -u is given.<br>Git's Swedish translation (po/sv.po in the Git source repository, for Git 2.56.0): msgid "annotated tag, needs a message" — Translated 'annoterad tagg, behöver meddelande'. |
