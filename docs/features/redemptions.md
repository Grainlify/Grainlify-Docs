---
sidebar_position: 4
---

# Points → USDC Redemption

Users spend points from their balance to request a USDC payout to a Stellar
wallet address. **The actual on-chain transfer is not automated** — an admin
sends the USDC manually and then marks the request as paid.

## Why payout isn't automated

Two things would need to exist first, and neither does yet:

1. **A funded treasury Stellar wallet.** Checked both local config and
   production Railway variables — no `SOROBAN_SOURCE_SECRET` or related
   config exists anywhere. There is no account to send USDC *from*.
2. **The right on-chain primitive.** The existing Soroban contract
   (`internal/soroban`) is a bounty-escrow client
   (`Init`/`LockFunds`/`ReleaseFunds`/`Refund`) — built for a two-party
   lock-then-release flow tied to a specific bounty, not a "redeem points on
   demand" direct payment. Wiring real payout means building a simpler direct
   Stellar payment path, not reusing the escrow contract.

This is intentionally deferred (matches the project's broader "contracts come
later" sequencing). What's built now is the full request/review/points
lifecycle around redemption, so the moment a treasury wallet and payout path
exist, only the actual transfer step needs to be added.

## How it works

1. `POST /redemptions` with `{ points, stellar_wallet_address }`. Validates:
   `points >= minRedemptionPoints` (100), the wallet address is a real,
   checksum-valid Stellar account ID (`strkey.IsValidEd25519PublicKey` from
   the Stellar Go SDK — not just a regex), and the user's ledger balance
   covers the request.
2. Deducts the points **immediately**, at request time — not at payout time.
   This is a single DB transaction: insert the `redemptions` row
   (`status = 'pending'`) and a negative `point_ledger` entry together, so
   the same points can never fund two simultaneous pending requests.
3. An admin reviews via `GET /admin/redemptions?status=pending`, then:
   - **Mark paid** — after sending the USDC manually. Sets `status = 'paid'`,
     fires `redemption_paid`.
   - **Reject** — sets `status = 'rejected'` and inserts a *positive*
     reversing `point_ledger` entry (`reason = 'redemption_reversal'`) in the
     same transaction, refunding the points. Fires `redemption_rejected`.

## Conversion rate

`usdcPerPoint = 0.01` and `minRedemptionPoints = 100`
(`internal/handlers/redemptions.go`) — a starting product default, not
derived from anything else. At this rate a completed referral (100 points)
is worth $1, and the social-follow program (500 points) is worth $5. Flagged
as a value the operator should revisit; it's a single named constant to
change.

## Points balance

`point_ledger` is the single source of truth for every point-earning or
point-spending event across every reward program (referrals, social-follow,
redemptions, redemption reversals). A user's balance is `SUM(amount)` at read
time — there's no separate mutable balance column to drift out of sync with
its own history.

## Data model

- `point_ledger` — `user_id`, `amount` (positive = earned, negative =
  spent/reversed), `reason`, `reference_id`.
- `redemptions` — `user_id`, `points_spent`, `usdc_amount`,
  `stellar_wallet_address`, `status` (`pending`/`paid`/`rejected`),
  `admin_note`, `reviewed_by`, `reviewed_at`.

See `migrations/000031_points_and_rewards.up.sql`.

## API

| Route | Auth | Description |
|---|---|---|
| `GET /points/me` | required | Current balance + `usdc_per_point` + `min_redemption_points`. |
| `POST /redemptions` | required | Create a request; deducts points immediately. |
| `GET /redemptions/me` | required | Caller's own request history. |
| `GET /admin/redemptions` | admin | Review queue, `?status=`. |
| `POST /admin/redemptions/:id/mark-paid` | admin | Record a manual payout. |
| `POST /admin/redemptions/:id/reject` | admin | Reject and refund. |

## Frontend

- Settings → Rewards tab — balance with USDC equivalent, redeem form (live
  USDC preview), request history with status.
- Admin panel → Points Redemptions — wallet address (click to copy), mark
  paid / reject with an optional reason.
