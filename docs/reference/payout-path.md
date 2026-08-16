# Payout path — what exists today

*Last updated: 16 August 2026*

:::danger Nothing on the platform disburses funds
No payout has ever been made on any chain. Nothing in this codebase can
currently move money, and several things that look like they can, cannot.

This page describes **what is built**, not what is designed. The on-chain
specification describes an intended system; treating that document as a
description of working software is the specific mistake this page exists to
prevent.
:::

## Summary

| Component | State |
| --- | --- |
| `GuardPayoutRelease` | Implemented, tested, **no production caller** |
| `founding.Compute` | Implemented, tested, **no production caller — has never run in production** |
| Merkle leaf construction | Implemented and cross-pinned to the contract |
| Soroban escrow contract | Written, 19 tests passing, **never deployed** |
| `internal/chain` adapter interface | Defined; **only a MockAdapter implements it** |
| `internal/soroban` escrow clients | **Legacy — call a contract that does not exist** |
| Signer service | **Does not exist** |
| Chain configuration | **No environment sets it** |

## What genuinely works

**`GuardPayoutRelease`** is the chokepoint every release must pass: an explicit
admin confirmation, a named actor, a computed payout run, not in shadow mode,
the hackathon in phase 6, and the appeal window closed out. It fails closed on
a query error. It is well tested. **Nothing calls it.**

**`founding.Compute`** works out every member's payout and records it, moving
no money. Identical arithmetic to GrainHack's unit value; ineligible members
compute to zero and are excluded from the divisor. **Nothing calls it**, so no
`founding_settlements` row has ever been written.

**The Merkle leaf** is the one place off-chain and on-chain provably agree:

```
leaf = H( 0x00 || pool || len(address) || address || identity_hash || amount_be32 )
```

`sha256` on Soroban (`keccak256` on EVM — the construction is what is shared
across chains, not the digest). Both implementations are pinned to a shared
vector in `internal/chain/testdata/leaf_vector.json`, asserted from the Go side
and hardcoded on the Rust side. They drifted once; the vector exists because of
that.

**The Soroban escrow contract** implements a Merkle-root claim model —
`initialise`, `fund`, `publish_root`, `claim`, `is_claimed`, `sweep` — with 19
passing tests including claim-once and a timelocked sweep. It has never been
deployed to any network.

## What does not work, and why it looks like it does

### `internal/soroban` calls a contract that does not exist

The files are now named `escrow_legacy_unused.go` and
`program_legacy_unused.go`. They invoke `init`, `lock_funds`, `release_funds`,
`refund`, `init_program`, `lock_program_funds`, `single_payout`,
`batch_payout` — **not one of which the deployed-ready contract has**.

They predate the change from a bounty-per-escrow model to the Merkle-claim
model. Wiring one up would build, sign and submit correctly, then fail at the
contract with an unknown-function error, having spent a fee.

`program_legacy_unused.go` is wrong twice: `single_payout` and `batch_payout`
are **push** payments, and the system is pull-only by design.

The rest of that package — `tx.go`, `client.go`, `rpc.go`, `xdr_helpers.go` —
is ABI-independent and is what a real adapter will use.

### No chain adapter is implemented

`internal/chain.ChainAdapter` is a good interface with one implementation:
`MockAdapter`. There is no Stellar adapter and no EVM adapter. `Flare-Contracts`
contains a constraints document and no contract.

### No signer, and nothing configured

The spec requires a separate signer service holding keys, with the application
building unsigned transactions and never signing. It does not exist;
`internal/soroban` holds a secret directly. No `SOROBAN_*` variable is set in
any environment, and no deployed contract address exists anywhere.

### `chain_operations` has no writer

The table that would record every on-chain attempt is never inserted into.

## Known gaps beyond the code

- **Contributors have no payout address.** `stellar_wallet_address` exists only
  on `redemptions`, collected per redemption. There is no per-user wallet, no
  validation, no proof of control.
- **No per-event identity salt exists.** `IdentityHash` requires one and errors
  without it; no column, config field or environment variable holds one. Where
  it lives is a security decision, not an implementation detail — if it leaks,
  anyone with a list of GitHub logins can compute every leaf and read off each
  contributor's wallet address, permanently.
- **Money has three representations**: `float64` in `internal/founding`,
  `NUMERIC(18,6)` in redemptions and hackathon payouts, and `big.Int` minor
  units in `internal/chain`. Float for money is a defect independent of
  anything on-chain.

## The rule for when this is built

**The chain is the system of record; the database is a cache of it.**

Never write `paid` from the code path that submits. Write `submitted` with the
transaction hash *before* submitting, and let a separate reconciler promote it
after reading the chain. The two failure directions are not symmetric: a
database that says paid when the chain did not is a contributor owed money by a
system that believes it is settled, and it is silent.

## The only thing that pays anyone today

`POST /admin/redemptions/:id/mark-paid` sets `status = 'paid'`. A human sends
money out of band and tells the database afterwards.
