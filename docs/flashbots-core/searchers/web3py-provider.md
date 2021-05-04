---
title: web3.py provider
---
web3-flashbots is a repository containing a library that works by injecting a new module in the web3.py instance, which allows
submitting "bundles" of transactions directly to miners. This is done by also creating
a middleware which captures calls to `eth_sendBundle` and `eth_callBundle`, and sends
them to an RPC endpoint which you have specified, which corresponds to `mev-geth`.

To apply correct headers we use FlashbotProvider which injects the correct header on post

Access the web3-flashbots repository [here](https://github.com/flashbots/web3-flashbots).
