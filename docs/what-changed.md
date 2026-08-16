---
slug: /what-changed
---

# What changed

*Last updated: 16 August 2026*

Features that were removed or replaced, newest first. If you joined earlier
and are looking for something you remember, it is probably here.

Nothing on this page is current. For how rewards work now, see
**[How Rewards Work](./rewards.md)**.

---

## The points system was retired

**Points can no longer be earned or redeemed, and the Redeem page has been
removed** — its old link now takes you to your rewards settings.

It is replaced by the **Founding Contributor Pool**: a single fixed amount of
USDC, announced up front, shared out once at the end of the first GrainHack.

### What happened to my points?

Nothing was taken from anyone. When the change was made, **no points had ever
been awarded to any account and no redemption had ever been paid**. There were
no balances to migrate, which is why the system was retired outright rather
than converted into something else.

If you were expecting a balance and don't see one, that's why — not an error.

### Why it changed

The old system paid a fixed, known amount for actions that cost nothing and
produced nothing: $1 per verified referral, $5 for following three social
accounts, with no cap.

Two problems with that, and the second is the one that mattered:

- **It could be farmed.** A reward you can calculate in advance is a reward
  someone can work out the return on. Getting money out of it needed no code,
  no merged pull request, and no skill — just signups.
- **The bill had no ceiling.** At roughly $6 per user, ten thousand users
  meant $60,000 owed against no revenue and no cap. That money would have come
  out of the same budget that now pays people who ship code.

The replacement fixes both by design. The pool is a fixed amount, so the total
can never grow past what was set aside. And nobody — including us — can work
out what a share is worth until the event ends, because it depends on how much
everyone else earned.

---

## Referrals stopped paying points

Referrals used to pay **100 points per verified signup**, redeemable for USDC
at a fixed rate. They now earn **shares** in the Founding Contributor Pool
instead: 0.5 when someone you referred verifies, up to a lifetime cap of 10,
and 5 uncapped when they get a pull request merged during a GrainHack.

No points were ever awarded and no redemption was ever paid before the change.

Current page: **[Referral Program](./contributors/referrals.md)**.

---

## Social follow changed twice

**It stopped paying.** Following used to pay a one-off **500 points**. It now
earns nothing at all and is an **eligibility requirement** for the Founding
Contributor Pool instead.

Paying real money for a free, reversible action a bot can perform was never
sustainable, and the cost came out of the same budget that now pays
contributors. As a requirement it costs nothing, gets more follows rather than
fewer — everyone who wants a share has to follow — and there is nothing left
to farm, because there is nothing to collect.

**The platforms changed.** It was **GitHub, Telegram and LinkedIn**. It is now
**LinkedIn and X**. Nobody had submitted proof for any platform when this
changed, so nothing was lost.

Current page: **[Social Follow](./contributors/social-follow.md)**.

---

## Where rewards live now

| | |
|---|---|
| **[How Rewards Work](./rewards.md)** | What a share is and how the pool is divided |
| **[Referrals](./contributors/referrals.md)** | Shares for people you bring who verify and who ship |
| **[Social Follow](./contributors/social-follow.md)** | An eligibility requirement on LinkedIn and X, not a payment |
| **[GrainHack Events](./contributors/grainhack.md)** | Merged pull requests — where most shares come from |
