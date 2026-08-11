---
sidebar_position: 2
slug: /rewards
---

# How Rewards Work

Grainlify has two reward tracks, and they do different jobs:

:::info Two tracks
**Your rank** is earned by contributing and is purely reputational — a badge
and a leaderboard position, nothing more.
**Shares in the Founding Contributor Pool** are the money track. Shares are
earned overwhelmingly by getting pull requests merged, and the pool is shared
out once, at the end of the first GrainHack.
:::

:::warning The points system is retired
Grainlify used to pay a fixed rate — 100 points per verified referral, 500 for
following our social accounts, redeemable at 100 points = $1 USDC. **That
system no longer pays anything.**

No points were ever awarded to any account and no redemption was ever paid, so
nothing was taken from anyone. See
**[Point Redemption (Retired)](./contributors/rewards-and-redemptions.md)** for
the detail.
:::

## Track 1: Rank — earned by contributing

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

Your tier badge shows on your public profile and the leaderboard. It's a trust
signal, not currency — it doesn't convert to USDC on its own.

## Track 2: The Founding Contributor Pool

One fixed amount of USDC, set aside and announced up front, divided once at
the end of the first GrainHack.

### How the maths works

```
share value = the pool ÷ every share everyone earned
your payout = your shares × share value
```

That's the same arithmetic a GrainHack prize pool uses, and it has the same
three consequences — all of which are worth understanding before you start:

- **The total can never grow.** However many people join, the pool is what was
  announced. It cannot run up an open-ended bill.
- **Nobody can know what a share is worth in advance — including us.** It
  depends on everyone else's shares, and those don't exist yet.
- **More participants means a smaller share each.** This is stated plainly
  because it's the fact people would most reasonably feel misled by if they
  learned it on payout day. It isn't a catch; it's what dividing a fixed pool
  means.

### How shares are earned

| What you do | Shares |
|---|---|
| Get a pull request merged during the first GrainHack | **5** each, uncapped |
| Someone you referred gets a pull request merged | **5** each, uncapped |
| Verify your account before the first GrainHack opens | **0.1** |
| Someone you referred verifies their account | **0.5**, lifetime cap of 10 |

**Notice how lopsided that is — deliberately.** Verifying is worth a fortieth
of a merged pull request. If signing up paid meaningfully, most of the pool
would go to people who did nothing but create an account, and there'd be
little left for the people the programme exists to attract. Signing up gets
you registered and gets you your wave multiplier. Merged code gets you paid.

### Waves — join early, earn more

Everyone who verifies is placed in a wave, permanently, in the order they
verify:

| Wave | Slots | Multiplier | Badge |
|---|---|---|---|
| **Founding** | first 100 | **×1.5** on all your shares | Permanent "Founding Member" |
| **Wave 2** | next 400 | **×1.25** | Permanent "Early Member" |
| **Open** | everyone after | ×1.0 | — |

Two things to be clear about:

- **Nobody is turned away.** Once the first 500 slots are gone you join the
  open wave and can still earn fully from merged pull requests. Since verifying
  is worth almost nothing, extra people barely dilute anyone.
- **Each wave closes for good.** When the Founding wave fills, it's finished —
  it won't be widened later. All three waves are announced up front so what
  you're missing is clear before you miss it, and a wave that closes stays
  closed.

Your multiplier applies to your whole share total. It's also worth nothing on
its own: 1.5 × nothing is nothing. It rewards joining early *and* showing up.

### You must follow our social accounts

Following Grainlify on GitHub, Telegram and LinkedIn is an **eligibility
requirement** worth zero shares — see
**[Social Follow](./contributors/social-follow.md)**. It's checked when the
pool is shared out, not when you were approved.

## Putting it together

1. Verify your account. You get your wave and its permanent multiplier.
2. Follow the social accounts, so you're eligible.
3. **[Get pull requests merged](./contributors/grainhack.md)** during the
   first GrainHack. This is where nearly all shares come from.
4. Invite people who'll do the same — you earn from what they ship.

## FAQ

**Does merging a pull request pay me directly?**
During a GrainHack, yes — merged work earns shares in the Founding Contributor
Pool, and separately earns a share of that event's own prize pool. Outside a
GrainHack it builds your rank only.

**When do I find out what my shares are worth?**
At the end of the first GrainHack, when the pool is divided. Before then the
number doesn't exist — which is why you won't see a dollar figure anywhere in
the product, only your share count.

**Can my rank tier go down?**
Yes — it's a live leaderboard position. Shares, once earned, don't decrease.

**Is there a cap on what I can earn?**
Merged-PR shares are uncapped, for you and for people you refer. Only the
verify-only referral shares are capped, at 10.

**What if I miss the Founding wave?**
You join the next one. The multiplier is lower, but merged pull requests are
where the money is, and those are worth the same to everybody.
