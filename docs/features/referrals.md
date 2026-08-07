---
sidebar_position: 1
---

# Referral Program

Every user has a stable referral code. Sharing it and getting someone to sign up
earns points once that person actually verifies their identity — not just for
creating an account.

## How it works

1. A user's referral code is generated lazily, the first time they load
   `GET /referrals/me` (`internal/handlers/referrals.go`, `ensureReferralCode`).
   It's an 8-character code drawn from an alphabet that excludes visually
   ambiguous characters (`0`/`O`, `1`/`I`/`L`).
2. The frontend captures a `?ref=CODE` query param into `localStorage` the
   moment a user lands on *any* page (`App.tsx`, `captureReferralCodeFromURL`),
   so it survives navigation to wherever they actually click "Sign in."
3. `getGitHubLoginUrl()` (`shared/api/client.ts`) appends the stored code to
   the GitHub OAuth login URL as `?ref=CODE`.
4. The backend carries the code through the existing OAuth `state` round-trip:
   `LoginStart` stores it on the `oauth_states` row (`ref_code` column),
   `CallbackUnified` reads it back and — **only if this is a brand-new
   user** — calls `attachReferral`, inserting a `referrals` row with
   `status = 'pending'`. An existing user logging back in can never pick up a
   referral this way.
5. **Qualifying event:** the referral completes only once the referred user
   finishes GitHub sign-in *and* KYC verification — not on signup alone. This
   is checked from both places KYC status can transition to `verified`: the
   Didit webhook (`internal/handlers/didit_webhook.go`) and the status-poll
   endpoint (`internal/handlers/kyc.go`), via `maybeCompleteReferral`. Both
   paths are guarded against double-completion (an `UPDATE ... WHERE status =
   'pending'` with a `RowsAffected() == 0` check), since Didit can redeliver
   webhooks and the poll path can race with it.
6. On completion, the referrer earns **100 points** (`referralPointsPerCompletion`),
   recorded as both a `referrals.points_awarded` value and a `point_ledger`
   entry (`reason = 'referral'`), and gets a `referral_completed` notification.

## Data model

- `users.referral_code TEXT UNIQUE` — generated on first read, not at signup.
- `oauth_states.ref_code TEXT` — carries the code through the OAuth round-trip.
- `referrals` — one row per referral: `referrer_user_id`, `referred_user_id`
  (`UNIQUE`, so a person can only ever be referred once), `status`
  (`pending`/`completed`), `points_awarded`, `completed_at`.

See `migrations/000030_referrals.up.sql`.

## API

| Route | Auth | Description |
|---|---|---|
| `GET /referrals/me` | required | Caller's code, share stats (`total_referred`, `pending`, `completed`, `points_earned`). |

## Frontend

Settings → Referrals tab (`features/settings/components/referrals/ReferralsTab.tsx`):
code + copyable share link, stats grid.
