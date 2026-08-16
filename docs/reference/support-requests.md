# Support requests

*Last updated: 16 August 2026*

The in-app **Get help** widget, its five categories, and how a submission
reaches a human.

## The shape

```
POST /support-requests        (also served at the legacy /bug-reports path)
```

Public and unauthenticated. Somebody who cannot sign in is exactly the person
most likely to need support, so a missing or invalid token means *anonymous*,
not rejected.

Categories are `bug`, `kyc`, `idea`, `help`, `other`, enforced in three
places that are asserted to agree: a `CHECK` constraint on
`support_requests.category`, a Go map, and a TypeScript union covered by a
frontend test.

## Persist first, deliver after

The endpoint writes a `support_requests` row, **then** fans out to sinks.

This is the whole design. The original version relayed straight to a Discord
webhook and stored nothing — the channel was the system of record — so a
failed webhook returned 502 and the report, along with whatever the person had
typed, was gone.

Now:

- Delivery failures never reach the reporter. A 403, a dead topic, a rate
  limit — the response is still `200`, because the report *did* succeed.
- The only honest failure is the database write, which returns `503`
  `report_not_saved`. The frontend deliberately keeps the person's text in the
  box on any error.

## Routing

| Category | Destination | Column stamped |
| --- | --- | --- |
| `bug` | Telegram topic 1700 + Discord | `telegram_delivered_at`, `discord_delivered_at` |
| `idea` | Telegram topic 1702 + Discord | same |
| `help` | Telegram topic 1703 + Discord | same |
| `other` | Telegram topic 1704 + Discord | same |
| `kyc` | **Admin Telegram DM only** | `telegram_admin_dm_delivered_at` |

### Why KYC is DM-only

The Telegram group is readable without joining, so anything in a topic is
published.

An earlier design posted a stub next to the DM — "🪪 KYC request #1234,
replied privately". It was dropped because it disclosed that somebody asked a
verification question at a timestamp, which correlates against everything else
in the group at that moment and identifies the person the redaction existed to
protect, while telling a bystander nothing they could act on.

### Why Discord skips KYC too

`SupportSink.Handles(category)` returns `false` for `kyc` on the Discord sink.

The Discord embed carries the message, the page, any screenshot **and the
reporter's GitHub login**, so routing KYC away from a public Telegram topic
while still posting it to Discord would have achieved nothing.

The alternative was keeping the Discord channel private and checking that it
was. That makes the privacy of every verification request a property of a
channel permission — configuration that anyone with Manage Channels can change
at any time, with nothing in the system that would notice. It is held in code
instead.

`Deliver` refuses the category independently of `Handles`, because a sink that
would post it if called anyway is one refactor from doing so.

## `supportDelivered` — one definition of "delivered"

"Delivered" is category-dependent, and each category permanently leaves some
columns `NULL` by design:

| Category | Uses | Permanently NULL |
| --- | --- | --- |
| `kyc` | `telegram_admin_dm_delivered_at` | `discord_delivered_at`, `telegram_delivered_at` |
| everything else | `discord_delivered_at` **and** `telegram_delivered_at` | `telegram_admin_dm_delivered_at` |

`internal/handlers/support_delivery.go` holds this once. The rule exists in
three copies — a Go function, a Go SQL-predicate constant, and the partial
index in migration `000065` — and each is pinned to the others by a test:

- `TestSupportDelivered_SQLAndGoAgree` evaluates the predicate in Postgres
  against the Go function for every combination of column states.
- `TestUndeliveredIndexMatchesTheGoPredicate` reads the migration file and
  fails on drift.

The second test exists because the first one evaluates the **Go constant**, so
it never reads the migration: breaking the migration's predicate on purpose
passed until it was added.

:::note The predicate that could never be false
Migration `000063`'s index read
`discord IS NULL OR telegram IS NULL OR admin_dm IS NULL`, under which **every
row matched forever**, because each category permanently leaves one of them
NULL. Harmless as an index, fatal for the replay job it exists to serve.
:::

## Other properties worth knowing

- **A dead topic falls back to General** and sets
  `telegram_routed_to_fallback`. Reports quietly piling into General while a
  topic sits empty is otherwise invisible.
- **A failed admin DM is loud.** For KYC there is no public post, so a failed
  DM means the details reached nobody. It logs at error level saying exactly
  that, and stamps its own column.
- **Identity is resolved server-side** from the JWT. An earlier version took a
  `reporter_login` field from the request body and relayed it as the
  reporter's identity, so anyone could file a report as anyone.
- **The reporter's IP is on the row and reaches no sink.**
- **`migrate_to_chat_id` is logged, never auto-applied.** Silently following a
  chat id from an error response would let the destination change without
  anybody deciding it had.

## Configuration

Every variable is documented in `.env.example` in the backend repository,
grouped by subsystem — deliberately one list rather than a second copy here
that would drift from it.

An unconfigured sink is skipped quietly rather than counted as a failure:
Telegram not being set up is not a Discord outage.
