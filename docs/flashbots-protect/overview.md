---
title: overview
---

Flashbots Protect makes it easy for everyday users and developers to use Flashbots for frontrunning protection. We abstract away the complexity of submitting bundles to the Flashbots Auction and make integrating as simple as posting a transaction to a websocket or json-rpc endpoint. There are two Protect products at this time:

- **Flashbots Protect API**: a simple way for developers to integrate Flashbots into their applications. Learn more [here](/docs/flashbots-protect/api/quick-start).
- **Flashbots Protect RPC**: an RPC endpoint that users can add to their wallets which sends their transactions to Flashbots. Learn more [here](/docs/flashbots-protect/rpc/quick-start).

At a high level these are some of the major benefits of integrating Flashbots Protect:
- **Frontrunning protection:** transactions will not be seen by hungry sandwich bots in the public mempool.
- **No failed transactions:** transactions will only be mined if it doesn't include any reverts, so users don't pay for failed transactions. Note:  transactions could be included in uncled blocks, emitted to the mempool, and then included on-chain.
- **Priority in blocks:** transactions sent via Flashbots are mined at the top of blocks, giving them priority.

We intend to release more features on top of Flashbots Protect in the future, offering even more powerful functionality.
