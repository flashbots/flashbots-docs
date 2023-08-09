---
title: Cancellations 
---
Transactions that are submitted to Flashbots Protect are sent to the Flashbots MEV-Share Node, where they may stay pending for up to 6 minutes.

Flashbots Protect allows you to cancel pending transactions by submitting a cancellation transaction to Flashbots Protect. You can cancel a transaction by sending a new transaction which:

- Is submitted by the **same address** as the transaction that is being cancelled
- Has the **same nonce** as the transaction which is being cancelled
- Has the **same from and to address**
- Has an **empty data field**

## No cost to cancel

The cancellation transaction is only used for authentication to ensure that you control the account that sent the transaction you want to cancel. This transaction will not be included on-chain and does therefore not have any cost.
