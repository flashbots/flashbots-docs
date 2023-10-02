---
title: Synthetix Searcher
---
This repo by [Bert Miller](https://twitter.com/bertcmiller) contains a searcher developed to take advantage of a 1 off MEV opportunity created by the Synthetix team deprecating their ETH collateral trial program. As a result of this there were many loans that would be liquidatable after the governance proposal was executed. Taking advantage of this required a bot that could backrun the governance proposal execution transaction from the mempool as well as monitoring and execution infrastructure - all of which is contained here.

An accompanying blog post talking through the process of writing this bot and its strategy can be found [on Bert Miller's website](https://bertcmiller.com/2021/09/05/mev-synthetix.html). This is highly recommended to understand the thought process and design decisions behind this repo.

Access the [synthetix searcher repository here](https://github.com/bertmiller/sMEV).
