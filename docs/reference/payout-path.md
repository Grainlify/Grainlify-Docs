# Payout path — what exists today

*Last updated: 18 August 2026*

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
| `founding.DryRun` / `founding.Persist` | Implemented, tested, **no production caller — has never run in production** |
| Merkle leaf construction | Implemented and cross-pinned to the contract |
| Merkle **tree** construction | Implemented and cross-pinned, at seven leaf counts |
| Soroban escrow contract | Written, 21 tests passing, **never deployed** |
| `internal/chain` adapter interface | Defined; **only a MockAdapter implements it** |
| Aptos / Move contract | **Does not exist** — no Move source in any repository |
| Signer service | **Does not exist** |
| Chain configuration | **No environment sets it** |
| `chain_operations` table | Exists since migration `000055`; **no code reads or writes it** |
| Contributor payout address | **No such column or table** |
| Per-event identity salt | **Does not exist anywhere** |

## What genuinely works

**`GuardPayoutRelease`** is the chokepoint every release must pass: an explicit
admin confirmation, a named actor, a computed payout run, not in shadow mode,
the hackathon in phase 6, and the appeal window closed out. It fails closed on
a query error. It is well tested. **Nothing calls it.**

Note its scope: it lives in `internal/hackathon` and every precondition it
checks is a hackathon concept. None of them exist for the founding pool, so it
is a template for the guard a founding payout needs, not a guard the founding
payout can call.

**`founding.DryRun`** works out every member's payout and returns it, **writing
nothing**. `founding.Persist` records an approved result and is a separate call.
The split exists because the dry-run output is what a human reads before a chain
step, and a function that recorded a settlement on every invocation made
exercising that judgement cost a row — which in practice pressures whoever is
reading it into running it once and trusting the result.

Ineligible members compute to zero and are excluded from the divisor. **Nothing
calls either function**, so no `founding_settlements` row has ever been written.

**Money is exact integer minor units.** Shares and multipliers are exact
rationals (`big.Rat`); the payout is an exact `big.Int` count of minor units.
The pool is divided by the largest-remainder method, and the leftover units are
handed out by a stated rule — largest fractional remainder first, ties broken by
lowest user id — so a settlement is recomputable months later rather than
depending on query order. `DryRun` and `Persist` both assert that the lines sum
to the pool exactly.

This replaced `float64` arithmetic. A float cannot represent most USDC cents, so
a rounded set of float lines was not guaranteed to sum to the pool, and neither
direction of drift is recoverable: the contract refuses a root larger than the
escrow, so drift upward will not publish, while drift downward strands the
difference behind the sweep timelock.

**The Merkle leaf** is cross-pinned between off-chain and on-chain:

```
leaf = H( 0x00 || pool || len(address) || address || identity_hash || amount_be32 )
node = H( 0x01 || min(a,b) || max(a,b) )
```

`sha256` on Soroban and on Aptos; `keccak256` on EVM — the construction rule is
what is shared across chains, not the digest. Both implementations are pinned to
a shared vector in `internal/chain/testdata/leaf_vector.json`, asserted from the
Go side and from the contract's own test suite. They drifted once; the vector
exists because of that.

**The Merkle tree is now pinned too, and previously was not.** The leaf vector
covered the leaf digest and stopped there, so every internal-node rule — the
`0x01` prefix, the ascending leaf sort, promoting an odd node rather than
duplicating it — was free to differ between the backend and a verifier while
both test suites stayed green. This was measured, not suspected: with the whole
Go suite passing, deleting the node prefix, changing it, and reversing the leaf
sort all survived as mutations.

The vector now pins roots at leaf counts 1, 2, 3, 5, 6, 7 and 38. The odd counts
are the ones that can catch a reversed sort: because sibling pairs are sorted
inside the node hash, reversing the leaf order is invisible at power-of-two
counts and changes the root everywhere else. 38 is the real founding contributor
pool size. A pinned proof path is included as well, so the sibling ordering a
claimant actually submits is cross-checked and not only the final root.

**The Soroban escrow contract** implements a Merkle-root claim model —
`initialise`, `fund`, `publish_root`, `claim`, `is_claimed`, `sweep` — with 21
passing tests including claim-once, a timelocked sweep, the shared tree vectors,
and a claim through a promoted node in an odd tree. It has never been deployed
to any network.

## What does not work, and why it looks like it does

### There is no Aptos or Move code

The current workstream targets Aptos testnet in Move. No Move source, no
`Move.toml`, and no Aptos address handling exists in any repository yet. The
Soroban contract above is the reference design the Move port will follow.

### No chain adapter is implemented

`internal/chain.ChainAdapter` is a good interface with one implementation:
`MockAdapter`. There is no Stellar adapter, no Aptos adapter and no EVM adapter.
`Flare-Contracts` contains a constraints document and no contract.

Three defects in the interface are known and recorded in on-chain spec §13.2:
`BuildPublishClaimRoot` and `BuildSweepUnclaimed` take no pool although the
contract is per-pool for both; `BuildSweepUnclaimed` takes a destination the
contract ignores by design; and `ConfirmationsFor` assumes probabilistic
finality, which does not describe Aptos.

### No signer, and nothing configured

The spec requires a separate signer service holding keys, with the application
building unsigned transactions and never signing. It does not exist. No
`SOROBAN_*` variable is set in any environment, and no deployed contract address
exists anywhere.

`internal/config` still reads four `SOROBAN_*` variables, including
`SOROBAN_SOURCE_SECRET`, that **no code now consumes**. They are inert, and a
signing-key variable that nothing reads is worth removing rather than leaving as
an invitation.

### `chain_operations` has no writer

The table that would record every on-chain attempt was created by migration
`000055` and is never read or written by any Go file. As it stands it is also
the wrong shape for this workstream: its state CHECK has no `paid` value, it is
keyed on `hackathon_id` where the founding pool has no hackathon, and it has no
uniqueness constraint to make a retry safe.

### `internal/soroban` has been deleted

It contained clients for `init`, `lock_funds`, `release_funds`, `refund`,
`init_program`, `lock_program_funds`, `single_payout` and `batch_payout` — not
one of which the written contract has. Wiring one up would have built, signed
and submitted correctly, then failed at the contract with an unknown-function
error, having spent a fee.

`single_payout` and `batch_payout` were worse than merely dead: they are **push**
payments, and the system is pull-only by design, so they implemented an
architecture that had been explicitly repudiated.

An earlier version of this page said those files had been renamed to
`*_legacy_unused.go`. **That rename never happened** — the claim was written
from intent rather than from the tree. The package is now actually gone; its
ABI-independent Stellar plumbing (`tx.go`, `client.go`, `rpc.go`,
`xdr_helpers.go`) remains recoverable from git history if a real Soroban adapter
needs it.

## Known gaps beyond the code

- **Contributors have no payout address.** `stellar_wallet_address` exists only
  on `redemptions`, collected per redemption. There is no per-user address, no
  validation, no proof of control.
- **No per-event identity salt exists.** `IdentityHash` requires one and errors
  without it; no column, config field or environment variable holds one. Where
  it lives is a security decision, not an implementation detail — if it leaks,
  anyone with a list of GitHub logins can compute every leaf and read off each
  contributor's address, permanently.
- **Share *granting* still uses `float64`.** `internal/founding/events.go` and
  `shares.go` parse configured share values as floats before writing them to
  `NUMERIC` columns. No live precision is lost, because every configured value
  has at most four decimal places and the column rounds to exactly that — but
  the settlement arithmetic downstream is now exact, and this is the remaining
  float in the path that produces a leaf.
- **Money still has three representations**: exact rationals and minor units in
  `internal/founding` and `internal/chain`, `NUMERIC(18,6)` in redemptions and
  hackathon payouts, and floats in share granting.

## The rule for when this is built

**The chain is the system of record; the database is a cache of it.**

Never write `paid` from the code path that submits. Write the row *before*
submitting, and let a separate reconciler promote it after reading chain state.
The two failure directions are not symmetric: a database that says paid when the
chain did not is a contributor owed money by a system that believes it is
settled, and it is silent.

A corollary that only becomes obvious when you write the recovery paths: the
reconciler must query by **effect**, not by transaction hash. If the process
dies between submitting and recording the hash, the hash is unknown but the
question "is a root published for this pool?" is still answerable. The
contract's write-once semantics are what make a blind retry safe there, and that
is a guarantee the database cannot provide on its own.

## The only thing that pays anyone today

`POST /admin/redemptions/:id/mark-paid` sets `status = 'paid'`. A human sends
money out of band and tells the database afterwards.
