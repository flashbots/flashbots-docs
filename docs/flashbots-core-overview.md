---
title: overview
---
### What is Flashbots Alpha?

Flashbots Alpha is a proof-of-concept implementation of a direct communication channel between miners and Ethereum users that would like to communicate their preferred transaction order within a block. This proof-of-concept is made of two components: MEV-Geth, a slightly modified fork of the Ethereum Geth client, and MEV-Relay, a transaction bundle relayer.

### How does it work?

* Searchers send Flashbots "bundles" to MEV-Relay. A bundle contains:
  * one or several transactions that can be the trader's and/or other users' pending transactions from the mempool
  * a sealed tip that is paid by the searcher to the miner via a smart contract call to `block.coinbase.transfer()`
* Moreover, bundles have these properties:
  * There can only be a single bundle per block (we are working on bundle merging to enable multiple)
  * Flashbots bundles will always be at the top slot of the block
* MEV-Relay receives bundles and sends them to all whitelisted MEV-Geth miners
* Miners receive Flashbots bundles from MEV-Relay and process them in MEV-Geth
* MEV-Geth picks the most profitable bundle out of all bundles it is sent.
* MEV-Geth then compares the block that includes this bundle with a vanilla block that does not include any bundles. If it is more profitable to include a bundle MEV-Geth will do so, but otherwise it will default back to a vanilla Geth block.
* Only when the a searcher's bundle is included in a block is the tip associated with their bundle paid.
  * If a bundle is not included it does not cost the searcher anything (i.e. no gas fees are paid for failed transactions)

### Why use Flashbots Alpha?
* It allows searchers to bypass the Ethereum mempool and avoid their strategy leaking before it is mined on-chain (e.g. being frontrun by generalized frontrunners)
* It allows searchers to save money from avoiding to pay gas fees for failed transactions.
* It allows miners to receive additional revenue in the form of the bundle tip, in exchange for including the most profitable bundle in the block they mined.
* It reduces Ethereum network congestion and lowers Ethereum network transaction fees.
