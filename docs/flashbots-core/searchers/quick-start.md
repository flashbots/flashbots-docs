---
title: quick start
---

### Onboard Flashbots Alpha as a Searcher

You can start using Flashbots Alpha today by submitting transaction bundles to `relay.flashbots.net`.

You'll need to:
- replace `eth_sendRawTransaction` by `eth_sendBundle`, either manually or using one of our providers (web3.py and [ethers.js](https://github.com/flashbots/ethers-provider-flashbots-bundle))
- change the gas calculation logic of your bot
- change your smart contract logic to pay a tip to the miner in the case of success by using `block.coinbase.transfer()`


We go over this in further detail in the FAQs section.

See you on-chain! :zap:🤖
