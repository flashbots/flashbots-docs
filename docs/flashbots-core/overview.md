---
title: overview
---

Flashbots Core is a permissionless, transparent, and fair ecosystem for frontrunning protection and efficient MEV extraction which preserves the ideals of Ethereum. Flashbots Core provides a private communication channel between Ethereum users and miners for efficiently communicating preferred transaction order within a block.

Flashbots Core consists of [mev-geth](https://github.com/flashbots/mev-geth), a patch on top of the go-ethereum client, along with the [mev-relay](https://github.com/flashbots/mev-relay-js), a transaction bundle relayer. 

Flashbots Core is currently on version [v0.2](/flashbots-core/releases/v0.2-release).

## Why Flashbots Core?
Throughout the second half of 2020 and begining of 2021, a spike in Ethereum usage has revealed a set of negative externalities brought by MEV. These include network congestion (i.e. p2p network load) and chain congestion (i.e. block space usage) caused by inefficient communication between PGA bot operators and miners for transaction order preference. These negative externalities create a deadweight loss which is shouldered by regular Ethereum users though high gas price volatility and artificially scarce blockspace.

The incentives around MEV extraction pose an existential risk to Ethereum consensus security due to the incentivization of chain history re-orgs for extraction of past MEV (e.g. through [time-bandit attacks](https://arxiv.org/pdf/1904.05234.pdf)) and incentivization of transaction routing centralization for privacy, low latency, and ordering control. These risks are considered to be existential for Ethereum as they undermine the principles of finality and permissionlessness.

We have observed and are concerned about the active development of permissioned and exclusive transaction routing infrastructure as it holds the potential to erode the neutrality, transparency, decentralization, and fairness of Ethereum today. Flashbots Core is an open-sourced, democratic, and credibly neutral alternative which aims to mitigate the foretold negative externalities and existential risks.

## Timeline
- July 2020: Formation of MEV-Ship Research Collective.  
- November 2020: Formation of Flashbots Research Organization and proposal of [Flashbots Core architecture](https://ethresear.ch/t/flashbots-frontrunning-the-mev-crisis/8251).  
- January 2021: Flashbots Core Alpha (v0.1) made available for miners and searchers to adopt.  
- May 2021: [Flashbots Core Alpha (v0.2)](/flashbots-core/releases/v0.2-release) made available for miners and searchers to adopt.

You can find our monthly-ish transparency reports on the [Flashbots medium publication](https://medium.com/flashbots/tagged/transparency-report).

## How does it work?
Flashbots Core provides a private transaction pool + a sealed bid blockspace auction mechanism which allows block producers to trustlessly outsource the work of finding optimal block construction.

In the regular Ethereum transaction pool, users broadcast transactions to the public peer-to-peer network and specify a gasPrice which indicates how much they are willing to pay for each unit of computation on the ethereum chain. Miners receive these transactions, order them by gasPrice, and use a greedy algorithm to produce a block which attempts to maximise the value received through transaction fees. This mechanism is a mix between an [English auction](https://en.wikipedia.org/wiki/English_auction) and an [all-pay auction](https://en.wikipedia.org/wiki/All-pay_auction) where bidding for blockspace is perfomed in the open, the top bidder captures the opprotunity, and all participants incur a cost.

Here are the key issues with this mechanism: 
1. the open nature of the regular transaction pool causes bidding wars for blockspace which create unnecessary p2p network load and volatility in gas prices, as well as dissadvantages less sophisticated network participants without advanced bidding infrastructure
2. the all-pay nature of the auction causes failed bids to revert on chain, thus unnecessarily consuming blockspace and causing bidders to underprice their bids due to execution risk, ultimately leading to artificial blockspace scarcity and lower miner revenues
3. the reliance on gasPrice makes it impossible for bidders to express granular ordering preferences as they are restricted to bidding for the top position in the block, this leads to alternative strategies like spam to increase likelyhood of winning thus further increasing deadweight loss

Instead, the Flashbots Core infrastructure uses a [first-price sealed-bid auction](https://en.wikipedia.org/wiki/First-price_sealed-bid_auction) which allows users to privately communicate their bid and granular transaction order preference without paying for failed bids. This mechanism maximizes miner payoffs, while providing an efficient venue for price discovery on the value of a given MEV opportunity. Crucially, this mechanism eliminates frontrunning vulnerabilities.

For more information on efficient MEV auctions, see the Flashbots auction mechanism [research](https://github.com/flashbots/mev-research/blob/main/FRPs/FRP-7.md) and [presentation](https://docs.google.com/presentation/d/1tlyuom4tSU8ROb6NsbyTRZiilwygky94eFjfMC7vQvE/edit?usp=sharing).

## Roadmap
The Flashbots teams is taking an iterative approach to decentralizing the Flashbots Core architecture. As mentioned in our initial [ethresearch post](https://ethresear.ch/t/flashbots-frontrunning-the-mev-crisis/8251), there remain some key research questions to be answered.

Ultimately, the design goals are the following:

- **Pre-trade privacy**: implies transactions only become publicly known after they have been included in a block. This excludes intermediaries such as relayers / miners.
- **Failed trade privacy**: implies losing bids are never included in a block, thus never exposed to the public.
- **Efficiency**: implies MEV extraction is performed without causing unnecessary network or chain congestion.
- **Bundle Merging**: implies it possible to merge multiple incoming bundle without conflict.
- **Finality Protection**: implies it is impractical for Flashbots blocks containing Flashbots blocks to be modified once propagated to the network. This would protect against time-bandit chain re-org attacks.
- **Complete privacy**: implies intermediaries like relayers and miners canno observe the content of transactions until mined on chain.
- **Permissionless**: implies there are no trusted intermediary which can censor transactions.

| Stage                | PGA | DarkPool | ⚡🤖 v0.1 | ⚡🤖 v0.2 | ⚡🤖 v0.x | ⚡🤖 v1.0 |
| -------------------- |:---:|:--------:|:---------:|:---------:|:---------:|:---------:|
| Pre-trade privacy    | ❌  |    ✅    |    ✅     |    ✅     |    ✅     |    ✅     |
| Failed trade privacy | ❌  |    ❌    |    ✅     |    ✅     |    ✅     |    ✅     |
| Efficiency           | ❌  |    ❌    |    ✅     |    ✅     |    ✅     |    ✅     |
| Bundle merging       | ❌  |    ❌    |    ❌     |    ✅     |    ✅     |    ✅     |
| Finality protection  | ❌  |    ❌    |    ❌     |    ❌     |    ✅     |    ✅     |
| Complete privacy     | ❌  |    ❌    |    ❌     |    ❌     |    ❌     |    ✅     |
| Permissionless       | ✅  |    ❌    |    ❌     |    ❌     |    ❌     |    ✅     |

## Technical Architecture

The Flashbots Core architecture proposes a network with three distinct parties who specialize in performing a subset of the work required for sustaining this communication channel.

<div style={{textAlign: 'center'}}>

![Core Architecture](/img/core-architecture.png)

</div>

Flashbots Core introduces a new `eth_sendBundle` RPC which standardizes the message format in the communication channel. This is called a "Flashbots Bundle".

The bundle specifies an array of arbitrary signed ethereum transactions with some metadata specifying under which conditions these transactions should be included.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "eth_sendBundle",
  "params": [
    {
      signedTxs,         // Array[String], A list of signed transactions to execute in an atomic bundle
      blockNumber,       // String, a hex encoded block number for which this bundle is valid on
      minTimestamp,      // (Optional) Number, the minimum timestamp for which this bundle is valid, in seconds since the unix epoch
      maxTimestamp,      // (Optional) Number, the maximum timestamp for which this bundle is valid, in seconds since the unix epoch
      revertingTxHashes, // (Optional) Array[String], A list of tx hashes that are allowed to revert 
    }
  ]
}
```

### Searchers
Searchers are Ethereum users who, for whatever reason, prefer to use the Flashbots private transaction pool over the regular p2p transaction pool. These users monitor the state of the chain and send bundles to relayers.

Typically, these users will be one of the following types:
1. Ethereum users (for example, Uniswap traders) looking for frontrunning protection on their transactions
2. Ethereum bot operators (for example, arbitrage and liquidation bots) looking for fast, and risk free access to blockspace
3. Ethereum Dapps (for example, tornado.cash and mistX) with advanced use cases looking for account abstraction

See the [searcher quick-start guide](/flashbots-core/searchers/quick-start) to learn how to get started.

<div style={{textAlign: 'center'}}>

![Searcher Architecture](/img/searcher-architecture.png)

</div>

### Relayers
A relayer is a bundle propagation service which receives bundles from searchers and forwards them to miners.

The Flashbots organization operates an [open-source relayer called mev-relay](https://github.com/flashbots/mev-relay-js) which operates according to the [Flashbots Fair Market Principles](https://hackmd.io/@flashbots/fair-market-principles).

<div style={{textAlign: 'center'}}>

![Relay Architecture](/img/relay-architecture.png)

</div>

⚠️ Not all relayers can be trusted ⚠️

Relayers have full access to bundle content and can arbitrarily reorder / steal / censor bundles sent to them by searchers and can easily DOS miners by sending invalid bundles. For the duration of the Alpha, it is discouraged for searchers and miners to integrate with relayers other than Flashbots as it introduces systemic risk and prevents Flashbots from being able to monitor network health.

Learn more about the [trust assumptions of the Flashbots Alpha](#trust-assumptions).

### Miners
A miner is the party who ultimately collects all the bundles and produces a block. Miners traditionally run the go-ethereum client and order transactions by gas price. However, miners connected to the Flashbots network run a version of the [mev-geth client](https://github.com/flashbots/mev-geth) maintained by Flashbots.

The mev-geth nodes evaluate incoming bundles using the first-price sealed-bid auction and pick the most profitable ones to place at the top of the block. The node then compares the Flashbots block with a vanilla block and begins mining on the most profitable.

<div style={{textAlign: 'center'}}>

![Miner Architecture](/img/miner-architecture.png)

</div>

⚠️ Not all miners can be trusted ⚠️

Miners have full access to bundle content and can arbitrarily reorder / steal / censor bundles sent to them by searchers and relayers. For the duration of the Alpha, it is discouraged for searchers to integrate directly with miners as Flashbots is unable to monitor their behavior.

Learn more about the [trust assumptions of the Flashbots Alpha](#trust-assumptions).

## Trust Assumptions
The current version of Flashbots Core contains technical limitations which prevent the network from operating in a fully trustless manner. Specifically, the properties of complete privacy and permissionlessness are required for Flashbots to be fully decentralized.

In the long term, the [Flashbots roadmap](#roadmap) aims to replace these trust guarantees with cryptographic guarantees of full privacy. We invite privacy researchers and interested community members to review our proposed architecture and contribute to building a more robust and decentralized system.