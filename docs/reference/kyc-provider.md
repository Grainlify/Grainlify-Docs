# KYC provider (Didit)

*Last updated: 16 August 2026*

Identity verification runs through **Didit**. This page covers the status
mapping, when a contributor may start a new session, and the admin reset — the
three places this has gone wrong.

## Status mapping

`mapDiditStatus` translates Didit's vocabulary into ours and reports whether it
recognised the input:

| Didit sends | We store |
| --- | --- |
| `approved`, `verified` | `verified` |
| `rejected`, `declined` | `rejected` |
| `in review`, `inreview`, `resubmitted` | `in_review` |
| `pending`, `in progress`, `in_progress`, `inprogress`, `awaiting user` | `pending` |
| `expired`, `kyc expired`, `abandoned` | `expired` |
| `not started`, `notstarted`, `not_started` | `not_started` |
| anything else | **unchanged**, logged at error level |

Three of these are worth explaining:

- **`in progress` with a space** is the form Didit v3 actually sends. Its
  absence from the switch is what made it the most common unrecognised value.
- **`resubmitted`** means fresh documents went back to Didit for a decision, so
  it is a review state, not a start-again one.
- **`abandoned`** maps to `expired` deliberately. `expired` is in the
  start-a-new-session allow list, so somebody who walked away can begin again
  instead of being stranded behind a session they will never finish.

### Why unknown statuses were erasing verifications

The previous version had no "unrecognised" branch. Anything it did not match
fell through to a default that wrote `not_started`, so **five real Didit
statuses were being turned into "never started"** — including live and
completed verifications.

The current version returns `(status, recognised)`. On `false` the caller
**keeps the stored status** rather than writing a guess, and logs at error
level, because a status we have never seen means Didit has added one and the
switch needs a deliberate decision about it. Silence there is how the previous
version did its damage.

## `canStartNewKYCSession`

```go
"", "expired", "not_started"   -> may start a new session
everything else                -> may not
```

So `pending`, `in_review`, `verified` and `rejected` all block a new session.
`pending` and `in_review` block it because a session is live and the
contributor should resume the existing link, which `/kyc/status` hands back,
rather than start a second one.

**`rejected` is terminal from the UI.** A contributor whose documents were
refused cannot start again on their own — that is what the admin reset exists
for.

## Admin reset

```
POST /admin/kyc/:id/reset     (admin only, audited to kyc_reset_audit)
GET  /admin/kyc/:id/resets
```

Until this existed the only exit was an admin running `UPDATE` by hand against
production — which happened, for four contributors, and left no record of who
did it or why.

What it deliberately does **not** do:

- **It does not clear `kyc_data`.** That field holds Didit's decision including
  the reason for the refusal, and it is the only copy on our side. A retry does
  not need it cleared, so destroying it would be an unnecessary, irreversible
  loss of the record a dispute turns on. The next decision overwrites it
  naturally.
- **It does not mark anybody verified.** The only status it can produce is
  `expired`, which means "try again", not "you passed". A reset must never be a
  route to granting verification without verifying.

## The 403 gap: a stranded contributor cannot self-heal

When Grainlify moved Didit accounts, sessions created against the retired
account stopped being readable. Didit answers those with **403**, not 404.

`diditSessionUnreachable` therefore matches both families:

```
gone:      404, not found, not_found, does not exist, doesn't exist,
           no such, not available, deleted, invalid
not ours:  403, permission, forbidden, unauthorized, 401
```

When a session is unreachable the status path treats it as dead and lets the
contributor start again. Before `403` was in that list, those contributors sat
in `pending` forever: the status poll could not read the session, so nothing
ever moved them to `expired`, and `canStartNewKYCSession` refuses `pending`.

:::warning The gap that remains
A contributor stranded in a state that is **not** unreachable — a genuine
`in_review` that Didit never resolves — still cannot start again on their own.
`in_review` is not in the allow list, and nothing expires it on a timer.

A staleness rule was considered and **not built**: advisory rather than
automatic, measured from a new `kyc_session_started_at` column rather than
`updated_at`, allowing a retry without rewriting the status. It is not
implemented, and the current exit for such a contributor is an admin reset.
:::

## Where verification triggers other things

A transition to `verified` is the hook for two separate systems, called from
both the status poll and the webhook so neither has to remember:

- **Referral completion** — see [Referrals](../contributors/referrals.md).
  Verification alone completes a referral.
- **Founding Contributor Pool** — assigns the permanent wave and grants the
  verification share plus the referrer's capped verify-only share.

Both are best-effort: verification must succeed regardless of what happens in
either.
