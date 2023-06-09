---
title: Key Considerations
---

Before you get started with Flashbots Protect here are a few things to be mindful of:

- You can find the status of your transaction on Etherscan. Etherscan has a great interface for viewing the status of your transaction from our status API.

- We will try to include your transaction for 6 minutes, after which point it is considered “expired” and will be dropped.

- Transactions under 42,000 gas, such as simple ETH transfers, do not need front-running protection, so they are sent to the public mempool to provide the fastest execution possible.

- Transactions that perform simple actions - such as token approvals or transfers - will also be sent to the public mempool as these do not need frontrunning protection.

- Your transactions can be emitted to the public mempool if you switch RPC endpoints from Flashbots Protect RPC to another RPC while your transactions are pending.

## Setting the Right Gas Price 
In most cases sending a transaction through Flashbots Protect should not require a higher gas price than normal. However, in periods of high load, you may want to increase gas prices to ensure your transaction is included in a block quickly. If the network is congested and you need your transaction to execute quickly you can increase your max fee to adjust for fluctuations in base fee and set your priority fee to be 3 - 5gwei.
Note also that the money saved from keeping reverts from landing on-chain means you will most likely save money even if you occasionally need to pay higher fees during periods of congestion.
