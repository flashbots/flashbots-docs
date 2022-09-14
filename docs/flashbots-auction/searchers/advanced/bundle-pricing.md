---
title: bundle pricing
---

### Understanding bundle pricing

Searchers submit a huge amount of bundles every block, but the amount of blockspace is limited. So what decides what can be included in a block or not? To understand the answer we will first review some context.

At a high level the Flashbots block builder is designed to include the most profitable transactions possible in their blocks.

In PoW Ethereum, this was achieved by inserting searcher's bundles at the *top of block* and removing transactions at the *tail of the block*. Measured by gas price, these transactions at the tail of a block were the *least profitable* for a miner to mine. That meant that for a Flashbots bundle to be considered profitable it must have a higher effective gas price than the transactions it displaces at the tail of the block.

In PoS Ethereum, the rule of thumb for bundle pricing on Flashbots is practically the same; more profitable transactions (higher gas cost + validator payments) will be favored by the block-building algorithm. The main difference in PoS is that instead of all bundles being placed at the top of the block, bundles may be placed anywhere in a block. This might mean that other transactions (e.g. from the mempool) are placed between bundles. Bundles are still atomic, though -- no transactions will be placed in-between bundle transactions, only in-between separate bundles.

It is important to remember that searchers can bid for inclusion through normal gas fees or directly to the block's coinbase address (the validator). When calculating the *effective* gas price of a bundle, Flashbots takes into account both payments directly to coinbase as well as gas fees.

### Bundle pricing formula

Here is the formula for how bundle gas pricing is calculated:

$$s_{v0.3-4} = \frac{\Delta_{coinbase} + \sum_{T\in U}g_Tm_T - \sum_{T\in M \cap U}g_Tm_T}{\sum_{T\in U}g_T}$$ 

$s$: bundle $U$ _score_ used to sort bundles.  
$U$: ordered list of transactions $T$ in a bundle.  
$M$: set of transactions $T$ in the mempool.  
$g_{T}$: _gas used_ by transaction $T$.  
$p_{T}$: _gas price_ of transaction $T$.  
$c_{T}$: _fee cap per gas_ of transaction $T$.  
$\delta_T$: _priority fee per gas_ of transaction $T$.  
$e_{T}$: _effective fee per gas_ of transaction $T$ equal $\min$($c_{T}$, BASEFEE + $\delta_T$).  
$m_{T}$: _miner fee per gas_ of transaction $T$ equal $e_{T}$ - BASEFEE.  
$\Delta_{coinbase}$: coinbase difference from direct payment.  

### Explanation

This formula derives the effective gas price of the bundle by summing up all payments to coinbase as well as gas fees *except* for the gas fees of transactions that have been seen in the mempool.

The gas fees of mempool transactions are deducted to prevent "stuffing" bundles with high gas price transactions from the mempool to inflate the effective gas price.

### Why aren't my bundles being included?

There are three reasons to examine. First, your bundles may not be paying a higher gas price than the tail end of a block. You should examine the gas price that your bundles are paying by first simulating the bundles and looking at the coinbase difference and gas consumed. If it is lower than the tail end of recent blocks you will need to up your gas price accordingly.

Second, you may be competing with other searchers to capture the same opportunities, and they may be paying a higher gas price than you. Again, check the gas price that your bundles are paying by simulating them first and logging how much you are paying for a particular opportunity in a particular block. Then if your bundle is not included you can use the [blocks API](https://blocks.flashbots.net/) to see what bundle was included in your target block and how much they paid.

Third, bundles below 42,000 gas used are rejected by the relay. This is to mitigate spam bundles that do nothing meaningful on chain.
