---
title: canceling transactions
---

Transactions that are submitted to Flashbots Protect RPC are sent to the Flashbots block builder, where they may stay pending for up to 6 minutes. Once a transaction is included in a block and submitted to validators we cannot "recall" it. However, we can prevent a transaction from being included in future blocks.

Flashbots Protect RPC allows you to cancel pending transactions by submitting a cancellation transaction to Flashbots Protect RPC. By this we mean a transaction which:

- Is submitted by the same address as the transaction that is being cancelled
- Has the same nonce as the transaction which is being cancelled
- Has the same from and to address
- Has an empty data field

## No cost to cancel

This transaction is only used for authentication to ensure that you control the account that sent the transaction you want to cancel. This method allows for easy cancellation of transactions from retail wallets like MetaMask. The cancellation transaction will *not* be included on-chain.
