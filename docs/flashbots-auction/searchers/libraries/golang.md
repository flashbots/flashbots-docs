---
title: Golang Provider
---
_These libraries are provided and maintained by third-parties rather than Flashbots. Please exercise caution._

The Golang libraries provide high-level access to the `eth_sendBundle` and `eth_callBundle` RPC endpoints on the Flashbots builder.

Flashbots exposes several specialized JSON-RPC endpoints, such as [`eth_sendBundle`](https://docs.flashbots.net/flashbots-auction/searchers/advanced/rpc-endpoint/#eth_sendbundle) and [`eth_callBundle`](https://docs.flashbots.net/flashbots-auction/searchers/advanced/rpc-endpoint/#eth_callbundle). Since these are non-standard endpoints, ethers.js and other libraries do not natively support these requests (like `getTransactionCount`).

Golang libraries:

* [github.com/metachris/flashbotsrpc](https://github.com/metachris/flashbotsrpc)
* [github.com/cryptoriums/flashbot](https://github.com/cryptoriums/flashbot)
