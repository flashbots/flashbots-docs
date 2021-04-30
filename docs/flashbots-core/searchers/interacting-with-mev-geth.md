---
title: interacting with mev-geth
---

MEV-Geth is a fork of the go-ethereum client that miners run to accept searchers' bundles. You do _not_ need to run MEV-Geth as a searcher, but, instead, to monitor the Ethereum state and transaction pool for MEV opportunities and produce transaction bundles that extract that MEV. Anyone can become a searcher. In fact, the bundles produced by searchers don't need to extract MEV at all, but we expect the most valuable bundles will.

An MEV-Geth bundle is a standard message template composed of an array of valid ethereum transactions, a blockheight, and an optional timestamp range over which the bundle is valid.

You can access the mev-geth repository [here](https://github.com/flashbots/mev-geth).

### MEV-Geth bundle selection logic

MEV-Geth miners select the most profitable bundle per unit of gas used and place it at the beginning of the list of transactions of the block template at a given blockheight. Miners determine the value of a bundle based on the following equation.
_Note, the change in block.coinbase balance represents a direct transfer of ETH through a smart contract._


![Docusaurus](https://hackmd.io/_uploads/Bk6iQmr5P.png)

To submit a bundle, the searcher sends the bundle directly to the miner using the rpc method `eth_sendBundle`. Since MEV-Geth requires direct communication between searchers and miners, a searcher can configure the list of miners where they want to send their bundle.
