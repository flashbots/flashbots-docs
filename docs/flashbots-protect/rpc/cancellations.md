---
title: canceling transactions from being submitted further
---

Transactions that are submitted to Flashbots Protect RPC are submitted to the Flashbots Relay for the next 25 blocks. Once a transaction is submitted from the relay to a miner we cannot "recall" it. However, we can cancel submitting transactions for future blocks. 

To do so please submit a cancellation transaction to Flashbots Protect RPC. By this we mean a transaction which
- Is submitted by the same address as the transaction that is being cancelled
- Has the same nonce as the transaction which is being cancelled
- Has the same from and to address
- Has an empty data field


This transaction is only used for authentication, to ensure that you control the account that sent the transaction you want to cancel. This method allows for easy cancellation of transactions from retail wallets like MetaMask. The cancellation transaction will *not* be sent to the relay nor the miners.
