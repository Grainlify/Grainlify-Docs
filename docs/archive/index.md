---
sidebar_position: 0
---

# Archive — designs that were never built

*Last updated: 16 August 2026*

:::danger Nothing in this section describes working software
These pages document Soroban contracts that **do not exist in any Grainlify
repository**. They were written as design records for a program-escrow and
bounty-escrow model that was replaced before it was implemented.

Verified 16 August 2026 against `Stellar-Contracts/` and `Flare-Contracts/`.
:::

## What actually exists

One Soroban contract: **`grainhack-escrow`**, in
`Stellar-Contracts/contracts/`. It exposes `initialise`, `fund`, `commit`,
`get_commitment`, `publish_root`, `claim`, `is_claimed`, `cancel`, `sweep`,
`balance`, `get_state`, `get_root` and `leaf`. It has 19 passing tests and
**has never been deployed to any network**.

Nothing on the platform disburses funds on any chain. See
[Payout path — what exists today](../reference/payout-path.md) for the honest
state of that work.

## What these pages describe

A different model entirely — `publish_program`, `complete_program`,
`lock_program_funds`, `single_payout`, `batch_payout`, `create_bounty`,
`ProgramStatus`, `BountyStatus` and the machinery around them. None of those
functions has an implementation. `abi-stability-matrix.md` opens by describing
itself as the canonical reference for "all five Grainlify Soroban contracts";
there is one.

## Why they are kept

They record decisions that were genuinely made — fee rounding, delegate
permission boundaries, event ordering, storage tiering — and some of that
thinking will apply again when the payout path is built for real. Deleting
them would lose the reasoning; leaving them in the reference tree implied they
described something running.

Links between these pages, and links from them into contract source files,
are broken. That is expected: the source they point at does not exist either.

**Do not implement against anything in this section.** Check what the contract
actually exposes first.
