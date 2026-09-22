# Spaced repetition (SM-2)

How Solid Memo schedules cards. Implemented entirely in the domain layer
([sm2.ts](../src/domain/sm2.ts), [scheduling.ts](../src/domain/scheduling.ts))
as pure functions.

## Review state

Each card carries one `ReviewState`:

| Field | Meaning |
|---|---|
| `easeFactor` | SM-2 easiness (starts 2.5, never below 1.3) |
| `intervalDays` | Days until the next review |
| `repetitions` | Consecutive correct answers |
| `due` | Study day ("YYYY-MM-DD") the card is next due |
| `firstReviewedAt` | Introduction timestamp (counts against the new-card budget) |
| `lastReviewedAt` | Latest review timestamp (counts against the review budget) |

A card with no `ReviewState` is *new*.

## The SM-2 transition

The user grades each answer with a quality `q` from 0 (blackout) to 5
(perfect). `applySm2` transitions `(easeFactor, intervalDays, repetitions)`:

```mermaid
flowchart TD
    A[answer graded q] --> B{q >= 3?}
    B -- no (lapse) --> C[repetitions = 0<br/>interval = 1 day<br/>ease factor kept]
    B -- yes --> D[update ease factor<br/>EF' = EF + 0.1 − (5−q)(0.08 + (5−q)·0.02)<br/>floor 1.3]
    D --> E{repetition #}
    E -- 1st --> F[interval = 1 day]
    E -- 2nd --> G[interval = 6 days]
    E -- 3rd+ --> H[interval = round(previous × EF')]
```

Decisions fixed in code (and tests):

- The **updated** ease factor drives interval growth (computed before the
  interval, per Wozniak's original description).
- Lapses (`q < 3`) keep the ease factor; only repetitions and interval reset.
  The card returns the next study day (interval 1).
- A grade of 0 or 1 additionally sends the card round again **within the
  session** (`repeatsInSession`); see *Practice sessions*. Each pass is a
  full SM-2 review, so the state stored after the repeat is the one that
  counts.

## Answer scales

Sessions grade with one of two button sets, chosen per instance in the
preferences (`sm:answerScale`, default `sm2`):

| Scale | Buttons | Records |
|---|---|---|
| `sm2` | 0 — Blackout … 5 — Easy | that grade |
| `minimal` | Again · Hard · Good · Easy | 1 · 3 · 4 · 5 |

The minimal scale is a view over SM-2, not a second algorithm. Again stands
for 0–1 and Hard for 2–3, but each button must record one value: Again
records 1 (0 and 1 schedule identically) and Hard records **3**, the lowest
passing grade — recording 2 would make Hard a lapse, indistinguishable from
Again. So on the minimal scale only Again repeats in the session
([answerScale.ts](../src/domain/answerScale.ts)).

## Study days and the queue

Scheduling works in *study days*, not calendar days. `studyDayOf` shifts an
instant back by `dayBoundaryHour` (default 4) before taking the local date —
reviewing at 03:00 still counts as yesterday. Timezone caveat: study days are
device-local; travelling shifts due times by a few hours (accepted for v1).

`buildStudyQueue` produces the day's session from cards + review states +
preferences (`now` is always passed in, never read from a clock — that keeps
it deterministic and testable):

- **due**: cards whose `due <= today`, oldest due first, capped at
  `maxReviewsPerDay` minus reviews already done today.
- **new**: cards without review state, **drawn at random** (Fisher–Yates
  over an injected `random` source, so tests stay deterministic), capped at
  `newCardsPerDay` minus cards introduced today. A long deck is therefore
  not introduced front to back.

Both budgets clamp at zero. The queue is a snapshot taken at session start;
the session then owns its own order (below) and a refetch never reshuffles
it.

## Practice sessions

A deck offers two session modes ([PracticeContainer](../src/ui/PracticeContainer.tsx)):

- **Study** — due cards only. The daily review pass; introduces nothing new.
- **Practice** — due cards first, then new cards up to the daily new-card
  budget.

A session walks its queue one card at a time: front → reveal → grade.
A card graded 0 or 1 is put back into the *remainder* of the session at a
random position (`requeueCard`) — never as the very next card, unless it is
the only card left, in which case it simply repeats until it passes. The
"Card x of y" counter grows with each repeat. Each answer runs the
`recordReview` use case
([useCases.ts](../src/application/useCases.ts)): load the card's stored
state (or start from the initial SM-2 state), apply the transition, compute
the next due day, persist to `reviews/<deckId>.ttl`, and return the new
state. A failed save keeps the card in place with an error; the queue only
advances on success. Ending the session invalidates the review caches so
other screens see fresh state.

Storage note: `sm:due` is stored as a plain `"YYYY-MM-DD"` string literal,
not `xsd:date` — a study day is a calendar label, and date round-trips
through `Date` objects risk timezone off-by-one shifts.

## Suggesting a session

The app only suggests a session that has something in it, so nobody starts
one to learn there was nothing to study. Both the deck page and each
deck-list row read the deck's queue for today:

| Today's queue | Deck page | Deck-list row |
|---|---|---|
| cards due | **Study** (primary) + Practice | **Study** |
| nothing due, new cards within budget | **Practice** only | **Practice** |
| nothing | "All cards have been studied" | "Nothing to study today" |
| unknown (loading / unreadable) | loading or error | no suggestion |

Rows load independently and share the `["studyQueue", deckUrl]` cache entry
with the deck page. Concurrent reads of the instance's preferences are
shared (one request for all rows) but never cached beyond the request.

## Resetting the day

The deck page offers **Reset today's study** once something has been
studied today. It undoes the current study day for that deck, as if the
day's sessions had not happened.

A review overwrites a card's state, so undoing needs a record of what was
overwritten. `recordReview` therefore stores a snapshot (`ReviewState.previous`,
the `sm:previous*` triples) of the state from **before the study day's first
review** — a second review the same day keeps that snapshot instead of
replacing it (`snapshotBeforeReview`).

`resetStudyDay` (pure, in [scheduling.ts](../src/domain/scheduling.ts)) then
decides, per card reviewed today:

| Card | Reset does |
|---|---|
| introduced today (`firstReviewedAt` is today) | removes its state — it is a new card again |
| reviewed today, has a snapshot | restores the snapshot (ease, interval, repetitions, due, last review) |
| reviewed today, no snapshot (state written before snapshots existed) | can't be restored: made due today, so it can at least be studied again |
| not reviewed today | untouched |

```mermaid
flowchart LR
    R[review today] -->|first of the day| S[snapshot previous state]
    R -->|again today| K[keep the morning's snapshot]
    X[Reset today's study] --> Q{card reviewed today?}
    Q -->|introduced today| N[remove state → new again]
    Q -->|has snapshot| B[restore snapshot]
    Q -->|no snapshot| D[due today]
```

Because the daily budgets are derived from the same timestamps
(`lastReviewedAt` / `firstReviewedAt` falling in today), restoring them also
frees today's review and new-card budget. All changes go out in one save of
the reviews document (`applyReviewChanges`), so a reset is never half-applied.
"Today" honours the instance's `dayBoundaryHour`, like the queue.
