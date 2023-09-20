---
title: Searcher Sponsored TX
---
searcher-sponsored-tx contains a simple Flashbots "searcher" for submitting a transaction from an executor account, but paying for the transaction from a sponsor account. This is accomplished by submitting a Flashbots transaction bundle, with the first "sponsor" transaction paying the "executor" wallet in ETH, followed by a series of executor transactions that spend this newly received ETH on gas fees.

We hope you will use this repository as an example of how to integrate Flashbots into your own searcher bot. Access the searcher-sponsored-tx repo [here](https://github.com/flashbots/searcher-sponsored-tx).
