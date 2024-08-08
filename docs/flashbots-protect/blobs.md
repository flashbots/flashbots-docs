---
title: Blobs
---

The Flashbots Protect RPC accepts blobs. You can send multiple blob transactions in a slot.

### Why use Protect

The public mempool only accepts one blob transaction per user per slot. This means rollups must guess how many blobs to include. It is also expensive to replace blob transactions.

The Flashbots private mempool accepts many blobs per user per slot. Rollups can send many blob transactions and continuously submit new blob transactions throughout the slot. There is no cost to replace blob transactions.

### How to send blobs

Send regular `eth_sendRawTransaction` requests to `rpc.flashbots.net/fast`.

The "fast" option will share your blobs with all block builders for fast inclusion. You can remove it if you only want the Flashbots builder to include your blobs. To receive customer support, include an optional query parameter "originId=your-rollup-name".

### How are blobs merged

Blobs are merged into a block based on their priority fee, the same way that regular transactions and bundles are merged. Builders will ensure no more than 6 blobs are included in a block. If different senders submit more than 6 blobs in total, the combination of blob transactions that pays the most overall will be included.

### Example

Rollup A has four blobs and submits four transactions:
* Tx1a: 1 blob, pays 1 ETH
* Tx2a: 2 blobs, pays 2 ETH
* Tx3a: 3 blobs, pays 3 ETH
* Tx4a: 4 blobs, pays 4 ETH

Rollup B has three blobs and submits three transactions:
* Tx1b: 1 blob, pays 2 ETH
* Tx2b: 2 blobs, pays 4 ETH
* Tx3b: 3 blobs, pays 6 ETH

Builders would include Tx3a and Tx3b in their block because the sum of their fees is highest (9 ETH).
