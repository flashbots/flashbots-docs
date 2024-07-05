---
title: Gas Fee Refunds
---

## Introduction

Searchers and API users are automatically eligible to receive gas fee refunds. If Flashbots can include a bundle on chain for a lower price, you are eligible to receive a refund.

Gas fee refunds do not change how bundles are executed and searchers do not need to make any changes to be eligible for them.

## Where do refunds come from

Gas fee refunds include both priority fees and coinbase transfers.

In an optimal case, searchers are refunded the difference between their bid and the bid of the next-best bundle or transaction targeting the same state. Ie. the refund effectively results in the searcher paying the second price.

In practice, searchers will receive some fraction of this amount depending on how much profit the Flashbots builder makes.

## Which bundles receive refunds

Flashbots provides refunds for bundles in blocks landed by the Flashbots block builder.

Whether a bundle receives a refund depends on a few factors that vary from block to block:
* How much network congestion and competition there was
* Whether the Flashbots builder made a profit and how much
* How much the specific bundle contributed to the value of the block
* If the bundle was sent directly to Flashbots, or shared with other block builders by the searcher

## How to maximize both refunds and speed

Transactions which are sent directly to the Flashbots Builder via the Bundle Relay, and not multiplexed _by the searcher_ to other block builders, are likely to receive higher refunds. This is because they increase the profit of the Flashbots builder which is used to provide refunds.

The Flashbots block builder does not land 100% of blocks. In order to land bundles in all blocks, searchers can ask Flashbots to share their bundles with other block builders in cases where the Flashbots builder does not win a block. Flashbots will automatically share with all specified builders on the searcher's behalf.

### Smart multiplexing

To share bundles with other builders, add the `builders` field to your `eth_sendBundle` request. The `builders` field accepts a list of strings which correspond to the `name` tags of [registered builders](https://github.com/flashbots/dowg/blob/main/builder-registrations.json).

All `eth_sendBundle` requests are shared with the Flashbots builder. They are multiplexed to other block builders at the end of the slot if the Flashbots builder determines it will not win that block.

For example:

```
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "eth_sendBundle",
  "params": [
    {
      "txs": ["0x123abc...", "0x456def..."],
      "blockNumber": "0xb63dcd",
      "minTimestamp": 0,
      "maxTimestamp": 1615920932
      "builders": ["builder0x69", "beaverbuild.org"]
    }
  ]
}
```

Searchers can also use `mev_sendBundle` to multiplex bundles if they prefer. Though this method is more complex and not necessary for gas fee refunds.

_Note: Flashbots does track where bundles are sent. All bundles included in Flashbots blocks, regardless of if they are sent directly, are eligible for refunds. The impact on refunds is entirely due to the fact that multiplexing reduces builder profits._

_Note: Smart multiplexing has a 1% rate of false positives, meaning that in 1% of MEV-Boost blocks there is a risk that searcher bundles will not be landed._

### Bundle stats for multiplexed bundles

To view bundle stats on multiplexed `eth_sendBundle` requests, you will need to use the `flashbots_getSbundleStats` api instead of `flashbots_getBundleStatsV2`. You will see a new `smart` field in the response to multiplexed`eth_sendBundle` which indicates that the "sbundle" stats endpoint should be used instead.

## How are refunds calculated

The Flashbots builder retroactively calculates refunds for all bundles landed in its blocks. The refund for a given bundle is calculated as follows:

TODO

## Who receives refunds

The refund recipient is the signer used on the `eth_sendBundle`, `mev_sendBundle`, or `eth_sendPrivateTransaction` request.

## How to track refunds

Refunds are tracked from a start date of July 8, 2024.

Searchers will be able to view the unclaimed refund amount for an address in a public API in early July 2024.
