---
title: Cancellations
---

Transactions submitted to Flashbots Protect are directed to the Flashbots MEV-Share Node. Here, they may remain in a pending state for a duration of up to 6 minutes.

Flashbots Protect provides the functionality to cancel pending transactions. To do so, a cancellation transaction must be submitted to Flashbots Protect. This cancellation transaction should adhere to the following criteria:

- It must be submitted from the **same address** as the original transaction that is intended to be cancelled.
- It should have the **same nonce** as the original transaction.
- The **from and to addresses** should match those of the original transaction.
- The **data field** of the cancellation transaction should be left empty.

## No cost to cancel

The cancellation transaction serves solely for authentication purposes, verifying that you have control over the account that initiated the transaction you wish to cancel. Since this transaction is not included on-chain, it incurs no cost.
