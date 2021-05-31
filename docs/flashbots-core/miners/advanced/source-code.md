---
title: source code
---

The entire patch can be broken down into 3 releases with a few commits in each:

#### v0.1.0

- commits [535a7834902f184813a6588c6d66175f9f633118](https://github.com/flashbots/mev-geth/commit/535a7834902f184813a6588c6d66175f9f633118) and [b48f1023eea934a14ca58052421036219f1ea3e3](https://github.com/flashbots/mev-geth/commit/b48f1023eea934a14ca58052421036219f1ea3e3) bundle worker and `eth_sendBundle` rpc
- commit [920af5c609b14c28283b9b7ce1e14dab0d7ebf3b](https://github.com/flashbots/mev-geth/commit/920af5c609b14c28283b9b7ce1e14dab0d7ebf3b) profit switcher
- commit [26e12228bfcd046e0112fecd7f0a57e93b515bab](https://github.com/flashbots/mev-geth/commit/26e12228bfcd046e0112fecd7f0a57e93b515bab) Documentation (this file) and CI/infrastructure configuration

#### v0.2.0-pre

- commit [fabb91ede326d352f4f211d4d2a4f0dfb46ad2b2](https://github.com/flashbots/mev-geth/commit/fabb91ede326d352f4f211d4d2a4f0dfb46ad2b2) Change flashbots bundle pricing formula to ignore gas fees
- commit [f933b038a5915c07d65d5c97ca92acf499e7e475](https://github.com/flashbots/mev-geth/commit/f933b038a5915c07d65d5c97ca92acf499e7e475) Discard bundles with reverting txs

#### v0.2.0

- commit [688206c400de253e293a6fdc1e9dc14fbbbfa903](https://github.com/flashbots/mev-geth/commit/688206c400de253e293a6fdc1e9dc14fbbbfa903) Change pricing formula to ignore gas from txs in the txpool
- commit [044469b6577478b6b2f028dd5ec0a9cebc4f00d9](https://github.com/flashbots/mev-geth/commit/044469b6577478b6b2f028dd5ec0a9cebc4f00d9) Use object in eth_sendBundle params and add revertingTxHashes param
- commit [b36e0f0d58ee5222244450ab50345c91194fc065](https://github.com/flashbots/mev-geth/commit/b36e0f0d58ee5222244450ab50345c91194fc065) Add bundle merging with multiple workers

The entire changeset can be viewed inspecting the [diff](https://github.com/ethereum/go-ethereum/compare/master...flashbots:master).