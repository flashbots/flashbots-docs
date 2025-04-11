---
title: Bundle Pricing
---

## Understanding bundle pricing

Searchers submit a huge amount of bundles every block, but the amount of blockspace is limited. So what decides what can be included in a block or not? To understand the answer we will first review some context.

At a high level _the Flashbots block builder is designed to include the most profitable transactions possible in the blocks it builds_.

In **PoW Ethereum**, this was achieved by inserting searcher's bundles at the _top of block_ and removing transactions at the _tail of the block_. Measured by gas price, these transactions at the tail of a block were the _least profitable_ for a miner to mine. That meant that for a Flashbots bundle to be considered profitable it must have a higher effective gas price than the transactions it displaces at the tail of the block.

In **PoS Ethereum**, the rule of thumb for bundle pricing on Flashbots is practically the same; more profitable transactions will generally be favored by the block-building algorithm. Bundle/transaction profitability is determined by fee per gas used, priority fee, and direct validator payments.

The most notable difference in PoS is that instead of all bundles being placed at the top of the block, bundles may be placed anywhere in a block. This might mean that other transactions (e.g. from the mempool) are placed between bundles. Bundles are still atomic, though -- no transactions will be placed in-between bundle transactions, only in-between separate bundles.

## Bundle ordering formula

The Flashbots builder employs a new algorithm aimed at maximizing block profitability. This new approach brings about several significant changes that searchers need to understand:

* Instead of ranking and including bundles based off of effective gas price the algorithm now optimizes for overall block profit.
* Top-of-block execution is no longer a guarantee.
* Bundle ordering by effective gas price is no longer a guarantee.
* Other transactions (e.g. from the mempool) may land between bundles (not between transactions in bundles, but between two different bundles).
  * For example:
  * If you have a bundle comprised of transactions `[B1, B2]`
  * and someone else has a bundle comprised of transactions `[C1, C2]`
  * and there are transactions in the mempool `[t1, t2, ...]`,
  * then the block may be built such that:
  * `BLOCK_TXS = [..., B1, B2, t1, t2, C1, C2, ...]`.

## Why aren't my bundles being included?

There could be two potential reasons why your bundles are not being included. The first reason to consider is that the gas price of your bundles might not be higher than that at the tail end of a block. It's recommended to analyze the gas price your bundles are offering by initially simulating the bundles and observing the difference in the coinbase and the gas consumed. If this value is found to be lower than the tail end of recent blocks, it would be necessary to increase your gas price accordingly.

Alternatively, your bundles may not be included due to competition with other searchers targeting the same opportunities. These competitors might be offering a higher gas price than you. To address this, first simulate your bundles to check the gas price they are offering. Log the amount you are paying for a specific opportunity in a specific block.
