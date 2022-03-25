---
title: Flashbots Protect Fast
---

Flashbots Protect offers two ways to send your transaction: Flashbots Protect and Flashbots Protect Fast. Standard Flashbots Protect uses Flashbots bundles, whereas Flashbots Protect Fast uses a new transaction type called "private transactions." Flashbots Protect Fast transactions are more likely to be included fast, but they don't have protection against reverts and don't get priority at the top of the block.

Here is a table that summarizes the differences between Flashbots Protect and Flashbots Protect Fast:

|                        | Frontrunning protection | Priority at top of the block | No reverts | More blockspace |
|------------------------|-------------------------|------------------------------|------------|-----------------|
| Flashbots Protect      | ✔                       | ✔                            | ✔          |                 |
| Flashbots Protect Fast | ✔                       |                              |            | ✔               |

- *Frontrunning protection*: both bundles and private transactions are sent direct to miners and do not propogate in the public mempool
- *Priority at the top of the block*: transactions sent as bundles are included at the top of blocks and prioritized over other transactions.
- *No reverts*: transactions sent as bundles which revert are not included on-chain
- *More blockspace*: private transactions have more blockspace available to them, which means they will be included faster if there are a lot of bundles.

To use Flashbots Protect Fast add `https://rpc.flashbots.net/fast` with a chainID of `1` and currency of `ETH` as a new network in your MetaMask.