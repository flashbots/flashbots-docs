---
title: golang provider
---
_This library is provided and maintained by a third-party rather than Flashbots. Please exercise caution._
Golang library is a repository that provides a high-level access to the `eth_sendBundle` and `eth_callBundle` rpc endpoint on [mev-relay](https://github.com/flashbots/mev-relay-js).

Flashbots-enabled relays and miners expose two new jsonrpc endpoint: `eth_sendBundle` and `eth_callBundle`. Since these are brand-new, non-standard endpoints, ethers.js and other libraries do not natively support these requests (like `getTransactionCount`). In order to interact with these endpoints, you will also need access to another full-featured (non-Flashbots) endpoint for nonce-calculation, gas estimation, and transaction status.

Access the Golang library repository [here](https://github.com/cryptoriums/flashbot).
