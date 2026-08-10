---
sidebar_position: 2
slug: /rewards
---

# How Rewards Work

Grainlify runs on two entirely separate reward systems, and mixing them up is
the single most common source of confusion — so before anything else, here's
the one rule to remember:

:::info Two systems, not one
**Your rank** is earned by *contributing* (issues and pull requests) and is
purely reputational — a badge, nothing more.
**Your points balance** is earned by *growing the community* (referrals and
social follows) and is the only thing you can redeem for real USDC.
Merging a pull request raises your rank. It does **not** add a single point
to your redeemable balance.
:::

:::note The one exception: GrainHack events
During a **[GrainHack](./contributors/grainhack.md)**, merged work *is* paid —
from that event's prize pool, not from points. It's a separate track again: a
share of a fixed pool, worked out only once the event ends, with nothing to do
with your points balance or your rank. See
**[GrainHack Events](./contributors/grainhack.md)** for how the amount is
decided.
:::

This page ties both systems together in one place. For the step-by-step
mechanics of any one piece, follow the links into the dedicated guides.

## System 1: Rank — earned by contributing

Every issue and pull request you complete on a project listed on Grainlify
counts toward your **[leaderboard position](./contributors/ranks-and-leaderboard.md)**,
which places you into a tier:

| Tier | Leaderboard position |
|---|---|
| 🏆 Conqueror | 1–5 |
| ⚔️ Ace | 6–10 |
| 👑 Crown | 11–20 |
| 💎 Diamond | 21–50 |
| 🥇 Gold | 51–100 |
| 🥈 Silver | 101–500 |
| 🥉 Bronze | 500+ |

Your tier badge shows on your public profile and the leaderboard. It's a
trust signal — maintainers weigh it when deciding who to assign an issue to,
and other contributors see it as a track record. It is **not** convertible to
USDC and doesn't unlock a cash payout on its own.

## System 2: Points — earned by growing the community

Points are earned exactly two ways, and both are opt-in extras on top of
contributing — you don't need to write a single line of code to earn them.

| Way to earn | Points | How |
|---|---|---|
| **[Refer a friend](./contributors/referrals.md)** | 100 per completed referral | Share your link; points land once they sign in with GitHub *and* complete identity verification — not just at signup |
| **[Follow us on social](./contributors/social-follow.md)** | 500, once | Follow GitHub, Telegram, and LinkedIn, upload proof of each; points land once all three are approved |

There's no cap on referrals — refer 50 people, earn 5,000 points. The
social-follow bonus is a one-time 500-point unlock.

:::tip Where points come from is server-configured
The 100-per-referral and 500-for-social-follow figures (and the redemption
rate below) are read live from Grainlify's backend, not hardcoded into the
app — so this page always reflects what you'll actually see in your account.
:::

## Turning points into USDC

Once you have a points balance, **[redeem it for USDC](./contributors/rewards-and-redemptions.md)**
from the **Redeem** page — built like a currency swap, points on one side,
USDC on the other.

- **Conversion rate: 100 points = $1 USDC.**
- **Minimum redemption: 100 points** (i.e. $1).
- Payouts go to a **Stellar wallet address** you provide — USDC on Stellar,
  not any other chain.
- Every redemption is **reviewed by the Grainlify team before payout** —
  it's not instant. Your points are set aside the moment you submit the
  request, so your balance always reflects reality even mid-review.
- A request resolves to either **Paid** (USDC sent, you're notified) or
  **Rejected** (points refunded automatically, with a reason so you can fix
  it and resubmit).

:::warning Verify your identity first
Redemptions are expected to have a completed **[KYC identity check](./contributors/verifying-your-identity.md)**
on file before payout — it's what lets Grainlify confirm a real person is
receiving the USDC. Verify early so it's not the thing holding up your first
redemption.
:::

## Putting it together: a typical path

1. You contribute — apply to issues, get assigned, get pull requests merged.
   Your **rank climbs**, but your **points balance doesn't move**.
2. Separately, you refer a couple of friends and follow Grainlify's socials.
   Your **points balance grows** — this is money, sitting in USDC waiting to
   be claimed.
3. You verify your identity once.
4. You redeem points for USDC whenever you want, in $1 increments, straight
   to your Stellar wallet.

Both tracks run at the same time and don't depend on each other — a
brand-new account can earn its first $5 from social-follow alone, before
ever opening a pull request.

## FAQ

**Does merging a pull request pay me directly?**
Outside a GrainHack, no. It raises your rank (reputational) but doesn't add to
your redeemable points balance — points come only from referrals and social
follows. Inside a **[GrainHack event](./contributors/grainhack.md)**, merged
work does earn a share of that event's prize pool, which is a third track
separate from both rank and points.

**Can my rank tier go down?**
Yes — it's a live leaderboard position, so if other contributors pass you,
your tier can change. Points, once earned, don't expire or decrease on
their own.

**Is there a limit to how much I can earn?**
No cap on referrals or on how much you redeem over time — the only limits
are the one-time 500-point social-follow bonus and the 100-point minimum
per redemption.
