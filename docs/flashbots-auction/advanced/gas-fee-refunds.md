---
title: Gas Fee Refunds
---

## Introduction

Searchers and private transaction API users are automatically eligible to receive gas fee refunds. If a bundle can be included on chain for a lower price, you are eligible to receive a refund.

Gas fee refunds do not change how bundles are executed and searchers do not need to make any changes to be eligible for them.

## Where do refunds come from

Gas fee refunds include both priority fees and coinbase transfers.

In an optimal case, searchers are refunded the difference between their bid and the bid of the next-best bundle or transaction targeting the same state. Ie. the refund effectively results in the searcher paying the second price. In practice, searchers will receive some fraction of this amount depending on how much profit BuilderNet makes.

## Which bundles receive refunds

Flashbots provides refunds for bundles in blocks landed by BuilderNet. Whether a bundle receives a refund depends on a few factors that vary from block to block:
* How much network congestion and competition there was
* Whether BuilderNet made a profit and how much
* How much the specific bundle contributed to the value of the block
* If the bundle was sent directly to Flashbots or BuilderNet, or shared with other block builders by the searcher

Note that transactions seen in the public mempool are excluded and bundles containing only public mempool transactions do not receive refunds.

## How to maximize both refunds and speed

Transactions which are sent directly to the Flashbots Bundle Relay or BuilderNet, and not multiplexed _by the searcher_ to other block builders, are likely to receive higher refunds. This is because they increase the profit of BuilderNet which is used to provide refunds.

BuilderNet does not land 100% of blocks. In order to land bundles in all blocks, searchers can ask Flashbots to share their bundles with other block builders in cases where BuilderNet does not win a block. Flashbots will automatically share with all specified builders on the searcher's behalf.

### Smart multiplexing

To share bundles with other builders, add the `builders` field to your `eth_sendBundle` request. The `builders` field accepts a list of strings which correspond to the "name" tags of [registered builders](https://github.com/flashbots/dowg/blob/main/builder-registrations.json).

All `eth_sendBundle` requests are shared with BuilderNet. They are multiplexed to other block builders at the end of the slot if BuilderNet determines it will not win that block.

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

Searchers can also use `mev_sendBundle` to multiplex bundles if they prefer. This method is more complex and not necessary for gas fee refunds.

_Note: Smart multiplexing has a 1% rate of false positives, meaning that in 1% of MEV-Boost blocks there is a risk that searcher bundles will not be landed._

### Bundle stats for multiplexed bundles

To view bundle stats on multiplexed `eth_sendBundle` requests, use the `flashbots_getSbundleStats` API. You will see a new "smart" field in the response to multiplexed `eth_sendBundle` which indicates that the sbundle stats endpoint should be used.

## How are refunds calculated

BuilderNet uses a refund rule to retroactively calculate refunds for all bundles landed in its blocks. For more information, see the [BuilderNet docs](https://buildernet.org/docs/refunds).

## Who receives refunds

By default, the refund recipient is the signer used on the `eth_sendBundle`, `mev_sendBundle`, or `eth_sendPrivateTransaction` request. You can delegate your recipient to a different address using the `flashbots_setFeeRefundRecipient` API.

## How to track refunds

Refunds are tracked from a start date of July 8, 2024. Refunds are sent to recipients in batches, the first batch originated from the Flashbots builder address `0xdf99A0839818B3f120EBAC9B73f82B617Dc6A555` while newer batches originate from [`refunds.buildernet.eth`](https://etherscan.io/address/0x62a29205f7ff00f4233d9779c210150787638e7f). 

Track your refunds using the [`flashbots_getFeeRefundTotalsByRecipient`](/flashbots-auction/advanced/rpc-endpoint#flashbots_getfeerefundtotalsbyrecipient) RPC method or the [refund dashboard](https://app.hex.tech/9eb1e790-53f7-4c16-be76-4a22c1aa7d17/app/0c2d34ef-1304-481a-b3d6-b773ce9e0e19/latest) on Dune.

## Distributed refunds

The on-chain transactions corresponding to distributed refunds can be viewed with this Dune query: [https://dune.com/queries/4398421](https://dune.com/queries/4398421)
