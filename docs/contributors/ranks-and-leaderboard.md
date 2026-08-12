---
sidebar_position: 5
---

# Ranks and the Leaderboard

Your merged work across projects on Grainlify feeds your standing in the
community — shown as your rank and your position on the public leaderboard.

## How your position is calculated

Your score is **the number of pull requests you have merged in verified
Grainlify projects, in the last 90 days.**

That is the whole formula. In full:

| Counts | Does not count |
|---|---|
| A pull request you authored that was **merged** | A pull request that is still open |
| …in a project with **verified** status on Grainlify | A pull request that was closed without merging |
| …merged **within the last 90 days** | An issue you opened, or commented on |
| | A review you left |
| | Anything in a project that is not verified |
| | Anything merged more than 90 days ago (on the season board) |

Other details worth stating plainly:

- **Every merged pull request is worth exactly 1.** There is no weighting by
  size, difficulty, lines changed, or repository.
- **Ties break alphabetically** by username, so the order is stable rather
  than arbitrary.
- **Your username is matched case-insensitively.** If your commits carry two
  different spellings of your login, they are one contributor, not two.
- **Automated accounts are excluded.** Any account whose GitHub login ends in
  `[bot]` — Dependabot, CI bots, and Grainlify's own app among them — is left
  out of the ranking entirely.
- **The 90-day window is a rolling one**, not a fixed season with a start
  date. It always means "the last 90 days from right now".

### Why merged pull requests, and why a window

Two deliberate choices, both worth explaining rather than leaving you to
infer:

**Merged, not opened.** A metric that counts opened pull requests can be
topped by opening work and never landing it, which rewards precisely the
behaviour the GrainHack assignment design refuses to reward. Counting merges
means the board measures delivered work.

**Rolling, not all-time.** A cumulative all-time count is uncatchable: it
permanently favours whoever was present when the first projects were
onboarded, and anyone arriving later would be correct to conclude that rank
is not something available to them. A rolling window makes the board a
picture of who is active now.

### All-time view

The **All time** toggle on the leaderboard switches to the cumulative board —
every merge on record, same rules otherwise. It is a secondary view; the
90-day board is the default.

:::note This formula changed in August 2026
The leaderboard previously counted **every issue and pull request you had
authored**, all-time, without reading merge status and without excluding
bots. That inflated every score — most of all at the top of the board — and
it meant an unmerged pull request scored the same as a landed one. Scores
under the current formula are much smaller, and the ordering is different.
Nothing was taken away from you; the old number was measuring the wrong
thing.
:::

## Rank tiers

Your position places you into a tier, shown as a badge on your profile:

| Tier | Leaderboard position |
|---|---|
| 🏆 Conqueror | 1–5 |
| ⚔️ Ace | 6–10 |
| 👑 Crown | 11–20 |
| 💎 Diamond | 21–50 |
| 🥇 Gold | 51–100 |
| 🥈 Silver | 101–500 |
| 🥉 Bronze | 500+ |
| Unranked | No merged pull requests in the window |

The tier on your profile is computed from the same ranking as the public
board, so the two always agree.

## The Projects leaderboard

The **Projects** toggle ranks organisations rather than people. An
organisation's score is **the number of distinct contributors who merged a
pull request into its verified repositories**, over the same window and under
the same rules — merged only, bots excluded.

Someone who contributes to three repositories in the same organisation counts
once for that organisation, not three times.

## Filtering by ecosystem

The **Ecosystems** dropdown scopes either board to a single ecosystem: only
merges into projects in that ecosystem count, and the ranking is recomputed
for that ecosystem alone. Your position within an ecosystem is generally
different from your position overall.

## Why it matters

Your rank is a public signal of how active a contributor you are — it's
visible on your profile to anyone, including maintainers deciding who to
assign an issue to.

:::info Rank does not affect assignment odds or payouts
Your rank is presentational. It is **not** an input to GrainHack draw
weights, to maintainer-pool scoring, to issue application outcomes, or to any
payout or eligibility decision. A high rank does not improve your odds in a
draw, and a low one does not hurt them.

This is enforced in the codebase by an automated test, not merely by
convention.
:::

:::note Rank is reputational, not redeemable
Your tier is a badge, not a balance — it doesn't convert to USDC on its own.
The money track is **shares in the Founding Contributor Pool**, earned
overwhelmingly by getting pull requests merged. See
**[How Rewards Work](../rewards.md)** for how the two tracks differ.
:::
