# Fee Ceiling Division

*Last updated: 16 August 2026*

:::danger Archived — describes a contract that does not exist
This page is in the [archive](../index.md): it documents a Soroban contract
surface with **no implementation in any Grainlify repository**, verified
16 August 2026. Kept as a design record, not as a description of working
software.
:::


FeeConfig percentage fees use ceiling division:

```text
fee = ceil(amount * rate_bps / 10000)
net = amount - fee
```

This prevents fractional fee dust from being silently lost for odd amounts such as `1001` at `100` bps, where the fee is `11` and the net payout is `990`.

Security notes:

- `fee + net == amount` for every successful payout.
- Checked arithmetic rejects overflow instead of wrapping.
- Fees remain capped by the payout amount through `combined_fee_amount`.
