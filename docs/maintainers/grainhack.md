---
sidebar_position: 7
---

# Running Issues in a GrainHack

*Last updated: 16 August 2026*

A GrainHack is a time-boxed event with a prize pool. Your project puts issues
into it, contributors work on them, and there's a **second, separate pool for
maintainers** — paid on how well your repository hosted the work, not on how
much of it you merged.

Two things work differently from normal Grainlify, and both matter before you
opt in:

:::info
**You don't choose who gets your issue.** A draw does. And **the maintainer
pool is scored on things you can't set yourself**, on purpose — the section
below explains exactly what's measured, because that's the part most likely to
be argued about afterwards.
:::

The numbers here are the standard settings. An event can change them, and
whatever it's running is published on that event's rules page before it starts.

## Getting an issue into an event

Once your project has been accepted into an event, an issue enters it by
**adding the event's label on GitHub** — normally `grainhack`. There's no
separate submission step; the label is the mechanism.

Before an issue can go live to contributors it needs:

- **Acceptance criteria.** These are what the work is graded against at the
  end, so an issue without them can't be judged fairly.
- **A difficulty tier.** This decides which contributors are a match for it,
  and whether it's one of the issues held back for newcomers.

Other limits worth knowing:

- **50 issues per organisation per event.** Go over and the label stops pulling
  issues in — you'll be notified rather than left guessing why nothing
  happened.
- **Late entry closes 48 hours before the event ends.** Adding the label after
  that won't bring an issue in; there wouldn't be time for anyone to do the
  work.

## You don't pick the winner

On a normal Grainlify issue you review applications and assign someone. On a
GrainHack issue, that decision isn't yours.

Applications run for a fixed window — normally 24 hours — and then one
applicant is drawn, weighted by how well they fit the issue and by their
history in the event. Contributors can read the whole thing on their
**[GrainHack page](../contributors/grainhack.md)**.

**Assigning someone directly on GitHub does not work during an event.** The
assignment is removed automatically and a comment explains why. Repeated
attempts get flagged for review, and can reduce or void your maintainer pool
eligibility — see below. This isn't there to catch anyone out; it exists
because the draw's fairness only holds if it's the only way in.

**What you still control:** which issues go in, what they ask for, how clearly
they're written, and how fast you review the pull requests that come back.
Those are also, not coincidentally, most of what you're scored on.

## How the maintainer pool is scored

This is the part to read closely. Your repository's share is worked out from
**four things, weighted equally** at a quarter each:

| What's measured | Why this one |
|---|---|
| **Distinct first-time contributors** to your repo during the event | Counts people who had never contributed to your repo before, so it measures genuine growth rather than existing traffic |
| **How quickly pull requests get a first review** | The best available signal that you actually wanted contributors, rather than listing issues and going quiet |
| **Whether your repo existed and had commits before the event was announced** | Rules out repos created to farm an event |
| **Contributors' rating of how clear your issues were**, collected when they submit their work | Collected *before* anyone knows what they'll be paid, so it can't be traded for a better score |

**What is deliberately not measured, and never will be:**

| Not counted | Why |
|---|---|
| Issues you created | You could create fifty tonight |
| Pull requests merged | You can merge your own |
| Repository stars | Purchasable |

The rule behind that table is simple: **a maintainer is never paid on a number
they can move by themselves.** If you could, the pool would reward whoever
gamed it hardest.

### When something can't be measured, it's dropped — not scored as zero

Issue clarity needs **at least 3 ratings** before it counts. Below that, the
criterion is removed and its weight is spread across the other three.

This matters and it's easy to get wrong: "we couldn't measure this" and "this
repo did badly" are different claims, and only one of them is true. A small
repo with two ratings isn't penalised for being small.

:::note One pool per event, for now
An event has a single maintainer pool, scored once across every participating
repository. Splitting a pool across several blockchains — which would score a
repo separately in each — is being built and isn't documented here yet, because
no event can currently run that way. This page will cover it when it's real.
:::

## The holdback, and what releases it

**30% of your maintainer payout is held back for 90 days.**

This is the single strongest anti-farming mechanism in the event, and it's
worth being direct about why it exists: someone farming an event is gone the
next day. Someone genuinely growing a project is still there in three months.
A holdback on a timer alone would pay the farmer anyway, just later — so the
release is conditional on what happens next, not on the clock running out.

**Activity is measured over the 60 days after the event closes:**

| What happened in your repo | What's released |
|---|---|
| **5 or more commits, or 2 or more merged pull requests** | The full holdback |
| **Some activity, but under that bar** — any commits, merged pull requests, or issue activity | **Half** the holdback; the rest is withheld |
| **Nothing at all** | Nothing is released |

Anything withheld goes to the next event's pool, and that destination is
published in advance so it's a decision rather than something that quietly
happens.

:::note If we can't measure it, we don't withhold it
If your repository's activity can't be read for some reason, the holdback stays
pending and is retried. It is never withheld on missing evidence — a failed
lookup shouldn't read as a judgement about your project.
:::

:::warning Payment is not running yet
Scores, payouts and holdback decisions are calculated and recorded today. The
step that actually sends money does not exist yet — there's no payout release
path built. Everything above describes what's worked out, not funds arriving.
:::

## What reduces or voids eligibility

Two things put your maintainer pool eligibility under review:

- **Repeated out-of-band assignments** — assigning contributors directly on
  GitHub instead of letting the draw run. Flagged after 3.
- **A pattern of flagged associations** between your repo and the contributors
  winning its issues.

Neither is automatic. Both are reviewed by a person before anything is reduced,
because both have innocent explanations and an automatic penalty would land on
those too.

## What's next

- **[GrainHack for contributors](../contributors/grainhack.md)** — the draw,
  the grading, and appeals, from the other side. Worth reading before your
  first event, since it's what your applicants are going by.
- **[Ecosystems & Events](./ecosystems-and-events.md)** — the other events that
  run on Grainlify.
