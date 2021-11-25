---
title: Canceling transactions from being submitted further
---

Transactions that are submitted to Flashbots Protect RPC are submitted to the Flashbots Relay for the next 25 blocks. Once a transaction is submitted from the relay to a miner we cannot "recall" it. However, we can cancel submitting transactions for future blocks. 

To do so please submit a cancellation transaction to the Flashbots Protect RPC. By this we mean a transaction which
- Is submitted by the same address as the transaction that is being cancelled
- Has the same nonce as the transaction which is being cancelled
- Has the same from and to address
- Has an empty data field


The RPC uses this transaction to authenticate that you control the account of a transaction previously submitted to us which we are cancelling submission of. This method allows for easy cancellation of transactions from retail wallets like MetaMask.

**Note** the cancellation transaction we require will *not* be sent on to miners or the relay. It is only used for authentication.