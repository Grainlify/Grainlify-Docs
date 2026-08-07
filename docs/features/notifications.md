---
sidebar_position: 2
---

# Notifications

In-app notifications plus optional email, with independent per-type
preferences that default to **on** for both channels.

## Types

Defined in `internal/notifications/types.go`:

| Type | Fires when |
|---|---|
| `issue_assigned` | A maintainer assigns a contributor to an issue. |
| `issue_application_submitted` | A contributor applies to an issue (notifies the project owner). |
| `issue_application_rejected` | A maintainer rejects an application. |
| `pr_merged` | A pull request authored by a linked user is merged. |
| `reward_received` | Reserved for the on-chain payout system — not published anywhere yet, since that system isn't wired to a request flow. The preference toggle exists so it's ready once payouts ship. |
| `referral_completed` | See [Referral Program](./referrals.md). |
| `social_follow_completed` | See [Social Follow Program](./social-follow.md). |
| `redemption_paid` / `redemption_rejected` | See [Points → USDC Redemption](./redemptions.md). |

## How delivery works

`internal/notifications/service.go`'s `Service.Notify(ctx, userID, type, title,
body, linkPath)` is the single entry point every feature calls:

1. Looks up `notification_preferences` for `(user_id, type)`. No row means
   both channels default to `true` — new notification types are opt-out by
   default without needing a backfill migration.
2. If `in_app` is enabled, inserts a `notifications` row.
3. If `email` is enabled and a mailer is configured, sends an email (via
   Mailercloud) to `users.email` — skipped silently if the user has no
   persisted email on file.

`Notify` is called as a best-effort side effect *after* the primary action
already succeeded. Failures are logged, never returned — a broken mail
provider must never fail the request that triggered the notification.

## Data model

- `notifications` — `user_id`, `type`, `title`, `body`, `link_path`, `read_at`.
- `notification_preferences` — one row per `(user_id, type)` a user has
  explicitly changed from the default; primary key `(user_id, type)`.

See `migrations/000029_notifications.up.sql`.

## API

| Route | Auth | Description |
|---|---|---|
| `GET /notifications/` | required | List, `?limit=&offset=&unread_only=`. |
| `GET /notifications/unread-count` | required | Badge count. |
| `POST /notifications/:id/read` | required | Mark one read (idempotent). |
| `POST /notifications/read-all` | required | Mark all read. |
| `GET /notifications/preferences` | required | All types with current in-app/email settings. |
| `PUT /notifications/preferences` | required | Upsert preferences. |

## Frontend

- Bell dropdown (`shared/components/NotificationsDropdown.tsx`) — polls unread
  count every 60s, lazy-loads the list on open.
- Settings → Notifications tab — one row per type, "Enable all"/"Disable all".

## Adding a new notification type

1. Add the `Type` constant and append it to `AllTypes` in
   `internal/notifications/types.go`.
2. Call `notifSvc.Notify(...)` from wherever the triggering event happens.
3. Add an entry to `NOTIFICATION_TYPE_INFO` in
   `features/settings/components/notifications/NotificationsTab.tsx` so it
   shows up with a real title/description instead of falling back to the raw
   type string.
