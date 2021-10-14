---
title: ethers.js provider
---

ethers-provider-flashbots-bundle is a repository that contains the `FlashbotsBundleProvider` ethers.js provider to provide high-level access to the `eth_sendBundle` rpc endpoint on mev-relay.

Flashbots-enabled relays and miners expose two new jsonrpc endpoint: `eth_sendBundle` and `eth_callBundle`. Since these are brand-new, non-standard endpoints, ethers.js and other libraries do not natively support these requests (like `getTransactionCount`). In order to interact with these endpoints, you will also need access to another full-featured (non-Flashbots) endpoint for nonce-calculation, gas estimation, and transaction status.

This library is not a fully functional ethers.js implementation, just a simple provider class, designed to interact with your existing ethers.js v5 module.

Access the ethers-provider-flashbots-bundle repository [here](https://github.com/flashbots/ethers-provider-flashbots-bundle).
