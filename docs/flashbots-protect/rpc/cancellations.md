---
title: canceling transactions from being submitted further
---

Transactions that are submitted to Flashbots Protect RPC (*not* using fast mode) are submitted to the Flashbots Relay for the next 25 blocks. Once a transaction is submitted from the relay to a miner we cannot "recall" it. However, we can cancel submitting transactions for future blocks.

Flashbots Protect RPC allows you to cancel pending transactions by submitting a cancellation transaction to Flashbots Protect RPC. By this we mean a transaction which

- Is submitted by the same address as the transaction that is being cancelled
- Has the same nonce as the transaction which is being cancelled
- Has the same from and to address
- Has an empty data field

**Note**: If you want to cancel a transaction that was submitted using fast mode, you must use fast mode to send the cancellation transaction.

## Cancellation costs

For transactions sent using Flashbots Protect **without fast mode**, this transaction is only used for authentication to ensure that you control the account that sent the transaction you want to cancel. This method allows for easy cancellation of transactions from retail wallets like MetaMask. The cancellation transaction will *not* be sent to the relay nor the miners.

For transactions that are sent using Flashbots Protect **with fast mode**, you will have to pay the gas fee for the cancellation transaction and the transaction *will* be sent to miners.
