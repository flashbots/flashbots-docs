---
title: searcher sponsored tx
---
searcher-sponsored-tx is a repository that contains a simple Flashbots "searcher" for submitting a transaction from account X, but paying for the transaction from account Y. This is accomplished by submitting a Flashbots transaction bundle, with the first transaction(s) executing from account X, and the last, single transaction calling a contract which verifies the early transactions ran successfully, then pays the validator.

We hope you will use this repository as an example of how to integrate Flashbots into your own searcher bot. Access the searcher-sponsored-tx repo [here](https://github.com/flashbots/searcher-sponsored-tx).
