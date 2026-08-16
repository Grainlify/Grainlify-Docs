# Program Escrow Status Guards

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


`single_payout` and `batch_payout` call `require_active_program` immediately after loading `ProgramData`. Draft programs fail with `ERR_PROGRAM_NOT_ACTIVE` (`107`) before authorization, balance checks, fee math, or token transfers can process.

Security notes:

- Draft programs must call `publish_program()` before payouts.
- Legacy programs already stored as `Active` continue through the same payout path.
- The guard is read-only and does not change storage layout.
