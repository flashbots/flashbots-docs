---
title: Key Considerations
---

Before you get started with Flashbots Protect here are a few things to be mindful of:

- You can find the status of your transaction on Etherscan. Etherscan has a great interface for viewing the status of your transaction from our status API.

- We will try to include your transaction for 6 minutes, after which point it is considered “expired” and will be dropped.

- Transactions under 42,000 gas, such as simple ETH transfers, do not need front-running protection, so they are sent to the public mempool to provide the fastest execution possible.

- Transactions that perform simple actions - such as token approvals or transfers - will also be sent to the public mempool as these do not need frontrunning protection.

- Your transactions can be emitted to the public mempool if you switch RPC endpoints from Flashbots Protect RPC to another RPC while your transactions are pending.

## Speeding up your transaction's inclusion
By default transactions sent through Flashbots Protect are only shared with Flashbots, which builds only a subset of all blocks on Ethereum. If you want to increase the chance of your transaction being included, you can opt-in to sharing your transaction with more builders. You can easily do so by selecting other builders in the options accompanying the "Connect Wallet to Protect" button. **Note**: by sending your transaction to a builder you are trusting them to not frontrun your transaction or reveal it to third parties who might.