---
sidebar_position: 3
---

# Social Follow Program

Follow Grainlify on GitHub, Telegram, and LinkedIn; upload a screenshot as
proof for each; once all three are approved by an admin, earn a combined
**500 points** (5x a single referral).

## Why screenshots, not automated verification

Automated "does user X follow us" checks were evaluated per platform and
ruled out:

- **GitHub** has no API to check whether a user follows an *organization* —
  only user-to-user follow checks exist (`GET /users/{username}/following/{target_user}`).
- **LinkedIn**'s Community Management API only returns aggregate follower
  *counts* for pages you administer, never an individual "does member X
  follow page Y" lookup. Scraping to work around this would violate
  LinkedIn's ToS.
- **Telegram** *is* technically verifiable (`getChatMember` via a bot added
  as channel admin), but only for users who've gone through a "Connect
  Telegram" login flow to prove their numeric Telegram user ID — that
  identity-linking flow doesn't exist yet (the `telegram` profile field
  today is unverified free text).

Given that, verification is manual: users upload a screenshot, an admin
reviews and approves or rejects it. This is honest about being gameable in
principle — worth knowing given the reward is real points — but simple to
ship and consistent across all three platforms.

## How it works

1. `POST /social-follow/:platform/submit` with `{ "screenshot": "data:image/..." }`
   — a base64 data URL, same storage convention as `ecosystems.logo_url` (no
   object-storage/multipart infrastructure needed). Capped at ~5MB before
   base64 inflation, validated server-side to start with `data:image/`.
2. Resubmission (e.g. after a rejection) **upserts** the same row
   (`ON CONFLICT (user_id, platform)`), resetting it to `pending` — there's
   only ever one current proof per platform per user.
3. An admin reviews via `GET /admin/social-follow/submissions?status=pending`,
   then approves or rejects each one.
4. `maybeCompleteSocialFollow` (`internal/handlers/social_follow.go`) runs
   after every approval: counts this user's `approved` submissions, and once
   all three platforms are approved, inserts a `social_follow_completions`
   row (`user_id` as primary key — the natural guard against double-award),
   a `point_ledger` entry, and fires the `social_follow_completed`
   notification.

## Data model

- `social_follow_submissions` — one row per `(user_id, platform)`, `status`
  (`pending`/`approved`/`rejected`), `rejection_reason`, `reviewed_by`,
  `reviewed_at`.
- `social_follow_completions` — `user_id` (primary key), `points_awarded`,
  `completed_at`.

See `migrations/000031_points_and_rewards.up.sql`.

## API

| Route | Auth | Description |
|---|---|---|
| `POST /social-follow/:platform/submit` | required | Submit or resubmit proof. |
| `GET /social-follow/me` | required | Per-platform status + completion state. |
| `GET /admin/social-follow/submissions` | admin | Review queue, `?status=`. |
| `POST /admin/social-follow/submissions/:id/approve` | admin | Approve; may trigger completion. |
| `POST /admin/social-follow/submissions/:id/reject` | admin | Reject with an optional reason. |

## Frontend

- Settings → Rewards tab — upload control per platform, status badges,
  rejection reason shown inline.
- Admin panel → Social Follow Submissions — screenshot preview, approve/reject.
