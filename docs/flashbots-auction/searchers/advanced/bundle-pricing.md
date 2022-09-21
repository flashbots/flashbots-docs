---
title: bundle pricing
---

### Understanding bundle pricing

Searchers submit a huge amount of bundles every block, but the amount of blockspace is limited. So what decides what can be included in a block or not? To understand the answer we will first review some context.

At a high level _the Flashbots block builder is designed to include the most profitable transactions possible in the blocks it builds_.

In **PoW Ethereum**, this was achieved by inserting searcher's bundles at the _top of block_ and removing transactions at the _tail of the block_. Measured by gas price, these transactions at the tail of a block were the _least profitable_ for a miner to mine. That meant that for a Flashbots bundle to be considered profitable it must have a higher effective gas price than the transactions it displaces at the tail of the block.

In **PoS Ethereum**, the rule of thumb for bundle pricing on Flashbots is practically the same; more profitable transactions will generally be favored by the block-building algorithm. Bundle/transaction profitability is determined by fee per gas used, priority fee, and direct validator payments.

The most notable difference in PoS is that instead of all bundles being placed at the top of the block, bundles may be placed anywhere in a block. This might mean that other transactions (e.g. from the mempool) are placed between bundles. Bundles are still atomic, though -- no transactions will be placed in-between bundle transactions, only in-between separate bundles.

### Bundle ordering formula

The Flashbots builder uses a new algorithm designed to produce the most profitable block possible. This design introduces some important changes for searchers to be aware of:

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

### Why aren't my bundles being included?

There are three reasons to examine. First, your bundles may not be paying a higher gas price than the tail end of a block. You should examine the gas price that your bundles are paying by first simulating the bundles and looking at the coinbase difference and gas consumed. If it is lower than the tail end of recent blocks you will need to up your gas price accordingly.

Second, you may be competing with other searchers to capture the same opportunities, and they may be paying a higher gas price than you. Again, check the gas price that your bundles are paying by simulating them first and logging how much you are paying for a particular opportunity in a particular block. Then if your bundle is not included you can use the [blocks API](https://blocks.flashbots.net/) to see what bundle was included in your target block and how much they paid.

Third, bundles below 42,000 gas used are rejected by the Flashbots builder. This is to mitigate spam bundles that do nothing meaningful on chain.
