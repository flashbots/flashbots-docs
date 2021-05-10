---
title: bundle pricing
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

### Understanding bundle pricing
Searcher submit a huge amount of bundles every block but only a small nunmber can be included in a block. So what decides what can be included in a block or not? To understand the answer we will first review some context.

At a high level Flashbots is designed such that miners include the most profitable transactions possible in their blocks, and it achieves that by inserting searcher's bundles at the *top of blocks* and removing transactions at the *tail end of the blocks*. Measured by gas price these transactions at the tail end of a block are the the *least profitable* for a miner to mine. That means that for any bundle to be included in a block it must have a higher gas price than the transactions at the tail end of a block.

It is important to remember that searchers can pay miners through normal gas fees or directly to the block's coinbase address (e.g. the miner). When calculating the *effective* gas price of a bundle Flashbots takes into account both payments directly to coinbase as well as gas fees.

### Bundle pricing formula

Here is the formula for how bundle gas pricing is calculated:

$$s_{v0.2} = \frac{\Delta_{coinbase} + \sum_{T\in U}g_Tp_T - \sum_{T\in M \cap U}g_Tp_T}{\sum_{T\in U}g_T}$$

Definitions: 
$s$: bundle $U$ _score_ used to sort bundles

$U$: ordered list of transactions $T$ in a bundle.

$M$: set of transactions $T$ in the mempool.

$O$: ordered list of transactions $T$ included in the remaining block space after $U$.

$g_{T}$: _gas used_ by transaction $T$.

$p_{T}$: _gas price_ of transaction $T$.

$\Delta_{coinbase}$: difference in the payment to the miner's coinbase address from direct payment.

### Explaination
In summary this formula derives the effective gas price of the bundle by summing up all payments to coinbase as well as gas fees *except* for the gas fees of transactions that have been seen in the mempool.

The reason that gas fees from transactions seen in the mempool are deducted is that otherwise searchers could game the pricing algorithm by "stuffing" their bundles with high gas price transactions from the mempool.

### Why aren't my bundles being included?
There are two reasons to examine. First, your bundles may not be paying a higher gas price than the tail end of a block. You should examine the gas price that your bundles are paying by first simulating the bundles and looking at the coinbase difference and gas consumed. If it is lower than the tail end of recent blocks you will need to up your gas price accordingly.

Second, you may be competing with other searchers to capture the same opportunities, and they may be paying a higher gas price than you. Again, check the gas price that your bundles are paying by simulating them first and logging how much you are paying for a particular opportunity in a particular block. Then if your bundle is not included you can use the [blocks API](https://blocks.flashbots.net/) to check to see what bundle was included and how much they outbid you by.