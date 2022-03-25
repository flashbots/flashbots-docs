---
title: Flashbots Protect with fast mode
---

Flashbots Protect offers a fast mode which may be better for some use cases. Without fast mode Protect uses Flashbots bundles, but by enabling fast mode Protect uses a new transaction type called "private transactions." By sending transactions using Flashbots Protect with fast mode your transactions are more likely to be included as soon as possible. But, transactions sent with fast mode won't have all the benefits of bundles such as protection against reverts and don't get priority at the top of the block.

## Comparing Flashbots Protect with and without fast mode
Here is a table that summarizes the differences between Flashbots Protect and Flashbots Protect with fast mode:

|                                  | Frontrunning protection | Priority at top of the block | No reverts | More blockspace |
|----------------------------------|-------------------------|------------------------------|------------|-----------------|
| Flashbots Protect                | ✔                       | ✔                            | ✔          |                 |
| Flashbots Protect with fast mode | ✔                       |                              |            | ✔               |

- *Frontrunning protection*: both bundles and private transactions are sent direct to miners and do not propogate in the public mempool
- *Priority at the top of the block*: transactions sent as bundles are included at the top of blocks and prioritized over other transactions.
- *No reverts*: transactions sent as bundles which revert are not included on-chain
- *More blockspace*: private transactions have more blockspace available to them, which means they will be included faster if there are a lot of bundles.

## Using fast mode
To use Flashbots Protect Fast add `https://rpc.flashbots.net/fast` with a chainID of `1` and currency of `ETH` as a new network in your MetaMask.

## When should I use fast mode?
You should use fast mode if you want to be included in blocks as soon as possible and if your transactions are unlikely to revert. For example, if you are trading on a DEX that doesn't see much volume.

If you think your transaction might revert, or if being at the top of the block matters a lot to you, you should use Flashbots Protect without fast mode.