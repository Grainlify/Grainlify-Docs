---
sidebar_position: 4
---

# GrainHack Events

*Last updated: 16 August 2026*

A GrainHack is a time-boxed event that runs on top of Grainlify. Projects put
issues into it, contributors work on those issues, and a prize pool is shared
out at the end based on what was submitted.

Almost everything about a GrainHack issue works differently from a normal
Grainlify issue, and the differences decide whether you get the work and how
much you're paid. This page covers all of them.

:::info The two that surprise people
**You don't get an issue by being first — a draw decides.** And **nobody knows
what a contribution pays until the event is over**, including us. Both are
deliberate, and both are explained below.
:::

Every number on this page is the standard setting. An event can change any of
them, and whatever it's actually running is published on that event's rules
page before it starts. Read that page — it's the one that governs.

## How much you get paid

### The pool is shared, so the amount depends on everyone else

There's a single prize pool for contributors. When the event ends, every
accepted contribution is graded, each grade is worth a number of shares, and
the pool is divided by the total number of shares everyone earned.

| Grade | Shares |
|---|---|
| Exceptional | 5 |
| Substantial | 3 |
| Accepted | 1 |
| Rejected | 0 |

So a share is worth the whole pool divided by every share earned by everyone.
If lots of people submit good work, each share is worth less. If few do, each
is worth more.

This is why the amount can't be known in advance — not by you, and not by us.
It isn't a policy of withholding it. The number literally does not exist until
the last contribution has been graded, because it depends on work other people
hadn't submitted yet.

:::tip This is the anti-farming design, not an accident
Someone trying to game the event would need to know what a contribution pays
before deciding how much effort to spend. Here the grade is unknown, the number
of competing submissions is unknown, and the value of a share is unknown until
the event closes. There's nothing to calculate, so there's nothing to farm.
:::

### Your second contribution is worth less than your first

Each additional accepted contribution from the same person counts for less, in
this order: your first counts fully, your second at 80%, your third at 60%,
your fourth at 50%, and every one after that at 40%. Positions are counted by
merge time, and **only contributions that actually earned something take up a
place** — a rejected one doesn't use one up.

The reduction isn't a saving. It raises the value of a share for everybody, so
it's a redistribution toward spreading the pool across more people.

### If the pool would pay too little, it isn't spread thin

If dividing the pool would put a share below the minimum payment (normally
$50), the pool isn't stretched to cover everyone at a token amount. The highest
grades are funded first, at the minimum, until the pool runs out. This rule is
published before the event so it can't be decided after the numbers are in.

:::warning Payment is not running yet
Everything above is what the platform calculates, and it calculates it today.
What does **not** exist yet is the step that actually sends the money — there
is no payout release path built. Grades and amounts are worked out and
recorded; nothing pays them out.

Until that's built, treat a GrainHack as an event whose results are computed
and published, not one that transfers funds. We'd rather say that plainly here
than have you find out after the work.
:::

## How an issue is assigned

### A weighted draw, not a queue

Applying doesn't reserve anything, and applying first doesn't help. Each issue
takes applications for a fixed window — normally 24 hours — and when the window
closes, one applicant is drawn.

The draw is weighted, so it isn't a coin flip either. Think of it as everyone
getting a number of tickets, and one ticket being pulled.

**What gives you more tickets:**

- **The issue suits you.** Every application is assessed for fit against that
  specific issue. A strong fit doubles your tickets; a weak one cuts them to a
  quarter.
- **You've never been assigned a GrainHack issue.** A 1.5× newcomer bonus. You
  keep it on every application you hold until you actually win something.
- **You've completed GrainHack issues before.** 1.5× per completed issue, but
  it stops compounding after two. That ceiling is deliberate: having won before
  should never outrank being right for the issue in front of you.

**What gives you fewer:**

- **The issue is above your demonstrated level.** Halves your tickets. Note
  that taking an issue *below* your level is not penalised at all.
- **You've abandoned issues in this event.** Halves your tickets each time.

**What is deliberately not counted:** your total pull request count, your merge
rate, your follower count, your stars, your overall contribution history, and
how well-written your application is. All of them are farmable, and all of them
push newcomers down. There's no way to feed them into the draw because nothing
in the system reads them.

### Applying to more issues does not change your odds on any one issue

Each issue runs its own separate draw. How many other issues you've applied to
has no effect on your tickets in any of them — including the newcomer bonus,
which you keep until you win.

You can hold **5 open applications** at once. Applications are free and cost
you nothing; only winning uses up a slot.

### Some issues are held for newcomers

A share of issues is reserved for people who've never completed a GrainHack
issue: normally half of the easy ones and a third of the standard ones.
Advanced issues aren't reserved. If no newcomer applies to a reserved issue, it
opens back up to everyone rather than going unassigned.

### If nobody qualifies

If no eligible applicant is left after the checks below, the issue falls back
to the earliest applicant who passed them, rather than going to waste. This is
the only situation in which applying early makes any difference at all.

## What can rule you out before the draw

These are checked before tickets are counted. Failing any one of them removes
you from that issue's draw entirely.

- Your GitHub account is at least **90 days old**, measured as of when the
  event was announced.
- You have **at least one commit** from before the event was announced. It's a
  yes/no check on whether the account existed and was used — not a measure of
  how much you've done.
- You're not a bot account.
- You're not the person who opened the issue.
- You're not a member of the organisation that owns it.
- You haven't already won **4 issues from the same organisation** in this
  event.
- You haven't hit the abandon limit — see below.

## After you win an issue

**You can hold 2 issues at a time.** A slot frees up when you submit a
qualifying pull request, not when it gets merged, so you're not blocked waiting
on a review.

A pull request counts as qualifying when it isn't a draft, its checks pass, it
links the issue you were assigned, and it contains a meaningful change —
roughly ten lines or more, ignoring generated files, lock files and
reformatting.

**If you go quiet for 5 days without a qualifying pull request, the issue is
released** and goes back into the pool for someone else. You'll be notified
when this happens.

**Changed your mind?** Give the issue up within **48 hours** of winning it and
it doesn't count against you. After that it's an abandon, and **2 abandons in
one event lock you out** of winning anything else in it. Each abandon also
halves your tickets in the meantime.

**If the event ends while you're still working,** a merge still counts for
**48 hours** after the end, so you're not punished for a maintainer's review
running late.

## How your work is graded

Every qualifying pull request is assessed against the issue's acceptance
criteria and sorted into one of four grades — exceptional, substantial,
accepted, or rejected.

You get to see the whole record behind your grade: the criteria used, the
specific parts of your work each judgement points at, the grade itself, and the
reasoning. A grade you can't inspect is a grade you can't meaningfully argue
with, so the full record is yours to read.

## Appeals

**You have 7 days from the moment results are published.** The clock starts
when results actually go out, not on a date planned in advance, so it can't
quietly start before you could have seen anything.

- You can appeal **your own** results only, and each result once.
- An appeal needs a written reason. A reviewer has nothing to act on otherwise.
- **A person reads it** — not a model — with your work and the full grading
  record in front of them.
- **Their decision is final and is recorded.**

Nothing is paid out until every appeal has an answer. That's not a courtesy:
when an appeal succeeds it changes the total number of shares, which changes
what a share is worth for *everyone* in the event. So the whole calculation is
redone after appeals close, and only then is anything settled.

:::warning You are not notified about results or appeals
Today the platform notifies you when you **win a draw**, when an assignment is
**released** for going quiet, and when an **event is ending** while you still
hold an issue.

It does not notify you when you lose a draw, when results are published, or
when an appeal is decided. Until it does, the appeal window can open without
anything telling you — so if you've submitted work to an event, check back
rather than waiting to hear.
:::

## Good to know

- Getting an issue assigned to you outside Grainlify — directly on GitHub —
  doesn't work during an event. The assignment is removed automatically and a
  comment explains why. The draw is the only route in.
- While an application window is open, you can see roughly how many people have
  applied, but never the exact number. Nobody gets to time an application
  against a precise count.
- Your GrainHack work counts toward your normal
  **[rank and leaderboard position](./ranks-and-leaderboard.md)** like any other
  contribution.
- A GrainHack prize pool is separate from the
  **[Founding Contributor Pool](../rewards.md)**, and a merged pull request
  here earns from both: a share of this event's prize pool, and shares in the
  founding pool. They're divided separately and settle separately.
