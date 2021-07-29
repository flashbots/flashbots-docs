---
title: alpha-v0.2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Changelog

#### `eth_sendBundle` RPC parameters change
The specification of the `eth_sendBundle` RPC is changing to support new features of v0.2. This change must be adopted by all searchers in order to be compatible with the v0.2 relay.

Here is the change in the specification:

<Tabs
  defaultValue="v0.1"
  values={[
    { label: 'v0.1', value: 'v0.1', },
    { label: 'v0.2', value: 'v0.2' },
  ]}
>
<TabItem value="v0.1">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "eth_sendBundle",
  "params": [
    txs,          // Array[String], A list of signed transactions to execute in an atomic bundle
    blockNumber,  // String, a hex encoded block number for which this bundle is valid on
    minTimestamp, // (Optional) Number, the minimum timestamp for which this bundle is valid, in seconds since the unix epoch
    maxTimestamp  // (Optional) Number, the maximum timestamp for which this bundle is valid, in seconds since the unix epoch
  ]
}
```

</TabItem>
<TabItem value="v0.2">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "eth_sendBundle",
  "params": [
    {
      txs,               // Array[String], A list of signed transactions to execute in an atomic bundle
      blockNumber,       // String, a hex encoded block number for which this bundle is valid on
      minTimestamp,      // (Optional) Number, the minimum timestamp for which this bundle is valid, in seconds since the unix epoch
      maxTimestamp,      // (Optional) Number, the maximum timestamp for which this bundle is valid, in seconds since the unix epoch
      revertingTxHashes  // (Optional) Array[String], A list of tx hashes that are allowed to revert 
    }
  ]
}
```

</TabItem>
</Tabs>

A new parameter `revertingTxHashes` is added to the bundles which allows the searcher to list the transactions in their bundle which are allowed to revert. By default, all transactions included in a bundle should never revert on chain.

#### Bundle scoring
Bundles received by mev-geth will use a new scoring function to [mitigate some of the issues](https://hackmd.io/@flashbots/core-v2-proposal#Revamped-auction-pricing) with the scoring function used in v0.1.

While the v0.2 pre-release removed the ability to pay the miner using gas price of a transaction, the scoring function selected for v0.2 allows the use of gas price based payments but excludes payments from transactions which are present in the regular transaction pool.

Here is the formal definition of these scoring functions:

<Tabs
  defaultValue="v0.1"
  values={[
    { label: 'v0.1', value: 'v0.1', },
    { label: 'v0.2-pre', value: 'v0.2-pre' },
    { label: 'v0.2', value: 'v0.2' }
  ]}
>
<TabItem value="v0.1">

$$
s_{v0.1} = \frac{\Delta_{coinbase} + \sum_{T\in U}g_Tp_T}{\sum_{T\in U}g_T}
$$
</TabItem>
<TabItem value="v0.2-pre">

$$
s_{v0.2-pre} = \frac{\Delta_{coinbase}}{\sum_{T\in U}g_T}
$$
</TabItem>
<TabItem value="v0.2">

$$
s_{v0.2} = \frac{\Delta_{coinbase} + \sum_{T\in U}g_Tp_T - \sum_{T\in M \cap U}g_Tp_T}{\sum_{T\in U}g_T}
$$
</TabItem>
</Tabs>

$s$: bundle $U$ _score_ used to sort bundles.  
$U$: ordered list of transactions $T$ in a bundle.  
$M$: set of transactions $T$ in the mempool.  
$g_{T}$: _gas used_ by transaction $T$.  
$p_{T}$: _gas price_ of transaction $T$.  
$\Delta_{coinbase}$: coinbase difference from direct payment.  
  
#### Bundle validation
The relay removes the temporary limitation of two 'from' addresses per bundle. The bundle can once again contain transactions from an arbitrary number of EOAs.

#### Bundle delivery
The `eth_sendBundle` RPC method on mev-geth is put into maintenance mode in the v0.2 release. Instead, mev-geth establishes an outgoing websockets connection with the relay, which streams bundles as they become available. This improves the security of the miner infrastructure as it no longer requires exposing an incoming RPC port.

To connect to the relay over websockets, each miner will receive an access key which they must add to their mev-geth node to perform the authentication.

#### Block construction
A [simple bundle merging algorithm](https://hackmd.io/@flashbots/core-v2-proposal#Bundle-merging) is introduced to mev-geth which allows multiple bundles to be merged together in a block so long as they do not cause an unexpected revert, or pass a certain amount of gas. The number of bundles mev-geth will attempt to merge together is controlled by the CLI flag`miner.maxmergedbundles`. This can be configured by the miner according to the performance of their hardware and their risk tolerance.

## Timeline

**May 10th**: launch v0.2 relay
- v0.2 relay starts accepting new bundle format
- searchers are asked to update their bots to send bundles to v0.2 relay endpoint
- v0.2 bundles are converted to v0.1 bundles in the relay and submitted to v0.1 miners along with v0.1 bundles
- miners receive access key and are asked to deploy a parallel v0.2 mev-geth node and provide relevant IPs

Rollback plan:
- Since v0.2 bundles can be made backwards compatible with v0.1 bundles by dropping the `revertingTxHashes` field, if v0.2 to v0.1 bundle conversion on the relay is having issues, searchers can fallback to using v0.1 bundle format

**May 24th**: v0.1 relay deprecation
- relay only accepts v0.2 bundles, v0.1 bundle submission is deprecated
- v0.2 bundles are converted to v0.1 bundles by the relay and sent to the v0.1 miners over RPC
- relay starts sending v0.2 bundles to the v0.2 mev-geth miners over RPC

Rollback plan:
- If the v0.2 mev-geth nodes are having issues, notify miners to continue pointing hashpower to v0.1 nodes

**May 31st**: v0.1 mev-geth deprecation
- relay stops converting v0.1 bundles and stops sending bundles to miners v0.1 mev-geth miners

## Upgrade Steps

### Searchers
- **May 10th**: Searchers able to send v0.2 bundles using new bundle format.
- **May 10th to May 24th**: Searchers upgrade their bots to send v0.2 bundles.
- **May 24th**: Deadline for searchers to upgrade to v0.2 bundles.

### Miners
- **Before May 17th**: Miner complete new [authentication process](https://hackmd.io/@flashbots/miner-authentication).
- **May 17th**: Miners receive mev-geth v0.2 spec, mev-geth v0.2 reference implementation, and bundle delivery access key over discord.
- **May 17th to May 24th**: Miners review, integrate, and deploy their mev-geth v0.2 nodes in parallel to their v0.1 deployment and provide a new IP address to receive v0.2 bundles.
- **May 24th**: Miners who have provided the new IP addresses will begin receiving bundles and can begin migrating their hashrate to these nodes.
- **May 24th to May 31st**: Miners monitor the performance of the v0.2 nodes and communicate back any issues.
- **May 31st**: v0.1 nodes can safely be shut down.
