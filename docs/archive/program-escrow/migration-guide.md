# Draft-to-Active Migration Guide

*Last updated: 16 August 2026*

:::danger Documents a contract that does not exist
The only Soroban contract in this project is `grainhack-escrow`
(`initialise`, `fund`, `publish_root`, `claim`, `is_claimed`, `sweep`), and it
has never been deployed. The program-escrow and bounty-escrow surfaces this
page describes — `publish_program`, `lock_program_funds`, `single_payout`,
`batch_payout`, `create_bounty` and the rest — have **no implementation in any
repository**, verified 16 August 2026.

This page is kept as a design record. Do not read it as a description of
working software, and do not implement against it without checking what the
contract actually exposes. See [Payout path — what exists
today](../../reference/payout-path.md).
:::


## Lifecycle
Draft -> publish_program() -> Active -> complete_program() -> Completed

## Storage Changes
- ProgramStatus::Draft added as tag 0
- Active shifts tag 0 to 1
- Completed shifts tag 1 to 2
- Cancelled shifts tag 2 to 3
- New field: published_at Option<u64>

## Migration Steps
1. Backup: near view <CONTRACT> list_programs
2. Deploy v2 WASM
3. Call migrate_v1_to_v2
4. Verify: near view <CONTRACT> list_programs_by_status Draft
5. Remove migration method and redeploy

## Security
- Deposits blocked on Draft
- Only owner can publish
- Migration is idempotent
