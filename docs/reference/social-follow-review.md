# Social follow review

*Last updated: 16 August 2026*

The admin queue for follow-proof submissions: how a decision is made, what it
grants, and the guards around it.

## What an approval actually grants

**Eligibility for the Founding Contributor Pool, and nothing else.** No
points, no shares, no money. Following is a requirement worth zero shares.

The check runs at settlement, not at approval: `founding.Eligible` re-reads
`social_follow_submissions.status` and only `approved` passes. `revoked` is the
case that distinction exists for — an approval that has since been withdrawn
must not confer eligibility, and it is the path most likely to break silently,
because a revoked submission still looks like a submission.

:::warning What this does not verify
It re-reads a stored approval — a screenshot an admin accepted. It is **not** a
live check against LinkedIn or X, which offer no API for it. What it
guarantees is that the approval has not been revoked, not that the follow
still exists.
:::

## The queue

```
GET  /admin/social-follow/submissions?status=&limit=&offset=
GET  /admin/social-follow/submissions/:id/proofs
GET  /admin/social-follow/reason-codes
POST /admin/social-follow/submissions/bulk-approve
POST /admin/social-follow/submissions/:id/approve
POST /admin/social-follow/submissions/:id/reject
POST /admin/social-follow/submissions/:id/revoke
```

All admin-only.

### Collapsed rows, proofs on demand

A row shows login, avatar, submitted date and status — 66px, about nine
visible at once. Expanding it fetches that submission's proofs.

This is a payload fix as much as a layout one. The screenshots are base64 data
URLs in `TEXT` columns, **~775kB per row**, and the list used to send both with
every row:

| | payload |
| --- | --- |
| page of 10, with screenshots | 7.57 MB |
| page of 50, without | 0.01 MB |

`/proofs` returns **both platforms together**, and there is deliberately no
endpoint for one. A decision covers both, and judging one platform without the
other in view is half a decision — the property the atomic submission model
exists to hold.

### Pagination

Default 50, ceiling 100. Both numbers were previously 10 and 20 and were set
by payload rather than by what a reviewer wants to see.

The cap survives for a different reason now: **bulk-approve refuses a
selection larger than one page**, and that is what keeps "approve everything on
screen" bounded to what somebody could plausibly have looked at.

The response carries `total`, `limit`, `offset` and `has_more`. `has_more` is
in the envelope rather than derived by the caller because the UI has to be able
to say how many rows are *not* on screen — otherwise "select all on this page"
is a label rather than a fact.

## Rejection reason codes

Six codes, defined once in Go and fetched by the picker from
`GET /admin/social-follow/reason-codes`:

| Code | Label | Note required |
| --- | --- | --- |
| `x_no_follow` | X proof doesn't show a follow | no |
| `linkedin_no_follow` | LinkedIn proof doesn't show a follow | no |
| `unreadable` | Screenshot unreadable or wrong image | no |
| `wrong_account` | Wrong account followed | no |
| `duplicate` | Duplicate submission | no |
| `other` | Other | **yes** |

`reason_code` is stored **alongside** the free-text `decision_reason`, not
instead of it. Decisions made before codes existed carry only a note, and that
note is the only record of why those contributors were turned down.

Only `other` requires a note: every other code names the actual problem, and a
mandatory note on all of them would collect "see above". `other` without a note
would tell a contributor their proof failed for "Other", which reads as an
answer while saying nothing.

The label is resolved server-side into every response carrying a code, so the
admin queue, the contributor's page and the notification cannot disagree about
what a code means. The `CHECK` constraint in migration `000065` is the second
copy, and `TestSocialFollowReasonCodes_MatchTheDatabaseConstraint` reads the
migration and asserts they match.

## Bulk approval

`POST /admin/social-follow/submissions/bulk-approve` takes up to one page of
ids and returns **three lists**:

| List | Meaning | Action needed |
| --- | --- | --- |
| `approved` | applied | — |
| `skipped` | already decided, or gone | none — the queue moved |
| `failed` | something went wrong | retry |

Skipped and failed are deliberately separate. A skip is the system working; a
failure is the system not working. Reporting "3 failed" for three rows that
were already approved sends somebody hunting a bug that is not there, and
reporting "20 approved" when 3 were not is the lie this reporting exists to
avoid.

**Every row is its own transaction.** One stale row must not discard nineteen
valid approvals.

The UI reports all three counts and keeps failures selected so a retry is one
click. It never shows a bare "Done".

## Status guards

`socialFollowCanTransition` is the single definition of which decisions apply
to which state:

```
pending  -> approved, rejected
approved -> revoked
```

Everything else is refused with `409` and the row's actual status.

Approve and reject were previously **unguarded**. Acting on a stale row
silently overwrote whatever decision was already there, fired a fresh
notification, and left nothing indicating it — including approving something
already rejected, which reverses a decision somebody made for a reason. Rare
with a single button; likely the moment a reviewer selects a page and acts on
all of it, because the queue moves underneath them.

### `FOR UPDATE`

The status is read `FOR UPDATE` inside the decision transaction. Two admins
working the same queue is the normal case, not the exotic one, and without the
row lock both can approve the same submission and both are told they did.

## What the contributor sees

Every decision is recorded in `social_follow_decisions` — decision, reason,
reason code, actor, timestamp — and the contributor is notified in-app and by
email (subject to their preferences). `GET /social-follow/me` returns the
status, the code, the note and a resolved `decision_text` combining them.

A revocation is the one that matters most: eligibility disappearing silently,
and only becoming visible when the pool is shared out, is exactly how a fair
decision comes to look arbitrary.
