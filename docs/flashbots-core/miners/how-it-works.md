---
title: how it works
---

### MEV-Geth: a proof of concept

We have designed and implemented a proof of concept for permissionless MEV extraction called MEV-Geth. It is a sealed-bid block space auction mechanism for communicating transaction order preference. While our proof of concept has incomplete trust guarantees, we believe it's a significant improvement over the status quo. The adoption of MEV-Geth should relieve a lot of the network and chain congestion caused by frontrunning and backrunning bots.

| Guarantee            | PGA | Dark-txPool | MEV-Geth |
| -------------------- | :-: | :---------: | :------: |
| Permissionless       | ✅  |     ❌      |    ✅    |
| Efficient            | ❌  |     ❌      |    ✅    |
| Pre-trade privacy    | ❌  |     ✅      |    ✅    |
| Failed trade privacy | ❌  |     ❌      |    ✅    |
| Complete privacy     | ❌  |     ❌      |    ❌    |
| Finality             | ❌  |     ❌      |    ❌    |

### Why MEV-Geth?

We believe that without the adoption of neutral, public, open-source infrastructure for permissionless MEV extraction, MEV risks becoming an insiders' game. We commit as an organization to releasing reference implementations for participation in fair, ethical, and politically neutral MEV extraction. By doing so, we hope to prevent the properties of Ethereum from being eroded by trust-based dark pools or proprietary channels which are key points of security weakness. We thus release MEV-Geth with the dual goal of creating an ecosystem for MEV extraction that preserves Ethereum properties, as well as starting conversations with the community around our research and development roadmap.

### Design goals

- **Permissionless**
  A permissionless design implies there are no trusted intermediary which can censor transactions.
- **Efficient**
  An efficient design implies MEV extraction is performed without causing unnecessary network or chain congestion.
- **Pre-trade privacy**
  Pre-trade privacy implies transactions only become publicly known after they have been included in a block. Note, this type of privacy does not exclude privileged actors such as transaction aggregators / gateways / miners.
- **Failed trade privacy**
  Failed trade privacy implies loosing bids are never included in a block, thus never exposed to the public. Failed trade privacy is tightly coupled to extraction efficiency.
- **Complete privacy**
  Complete privacy implies there are no privileged actors such as transaction aggregators / gateways / miners who can observe incoming transactions.
- **Finality**
  Finality implies it is infeasible for MEV extraction to be reversed once included in a block. This would protect against time-bandit chain re-org attacks.

The MEV-Geth proof of concept relies on the fact that searchers can withhold bids from certain miners in order to disincentivize bad behavior like stealing a profitable strategy. We expect a complete privacy design to necessitate some sort of private computation solution like SGX, ZKP, or MPC to withhold the transaction content from miners until it is mined in a block. One of the core objective of the Flashbots organization is to incentivize and produce research in this direction.

The MEV-Geth proof of concept does not provide any finality guarantees. We expect the solution to this problem to require post-trade execution privacy through private chain state or strong economic infeasibility. The design of a system with strong finality is the second core objective of the MEV-Geth research effort.

### MEV-Geth ###

MEV-Geth is a fork of go-ethereum. Miners can start mining MEV blocks by running MEV-Geth, or by implementing their own fork that matches the specification. We issue and maintain [releases](https://github.com/flashbots/mev-geth/releases) for the recommended configuration for the current and immediately prior versions of geth.

At this stage, we recommend only receiving bundles via a relay, to prevent abuse via denial-of-service attacks. We have [implemented](https://github.com/flashbots/mev-relay) and currently run such relay. This relay performs basic rate limiting and miner profitability checks, but does otherwise not interfere with submitted bundles in any way, and is open for everybody to participate.

Access the mev-geth repository [here](https://github.com/flashbots/mev-geth).


### How it works

MEV-Geth introduces the concepts of "searchers", "transaction bundles", and "block template" to Ethereum. Effectively, MEV-Geth provides a way for miners to delegate the task of finding and ordering transactions to third parties called "searchers". These searchers compete with each other to find the most profitable ordering and bid for its inclusion in the next block using a standardized template called a "transaction bundle". These bundles are evaluated in a sealed-bid auction hosted by miners to produce a "block template" which holds the [information about transaction order required to begin mining](https://ethereum.stackexchange.com/questions/268/ethereum-block-architecture).

![](https://hackmd.io/_uploads/B1fWz7rcD.png)

The MEV-Geth proof of concept is compatible with any regular Ethereum client. The Flashbots core devs are maintaining [a reference implementation](https://github.com/flashbots/mev-geth) for the go-ethereum client.

### Differences between MEV-Geth and [_vanilla_ geth](https://github.com/ethereum/go-ethereum)

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
- commit [cb4764f0fe239bcb10f9565e6309fd40773a9787](https://github.com/flashbots/mev-geth/commit/cb4764f0fe239bcb10f9565e6309fd40773a9787) Add relay websocket support

The entire changeset can be viewed inspecting the [diff](https://github.com/ethereum/go-ethereum/compare/master...flashbots:master).

### Moving towards version 1.0

We believe a sustainable solution to MEV existential risks requires complete privacy and finality, which the proof of concept does not address. We hope to engage community feedback throughout the development of this complete version of MEV-Geth.

### Feature requests and bug reports

If you are a user of MEV-Geth and have suggestions on how to make integration with your current setup easier, or would like to submit a bug report, we encourage you to open an issue in the mev-geth repository with the `enhancement` or `bug` labels respectively. If you need help getting started, please ask in the dedicated [#⛏️miners](https://discord.gg/rcgADN9qFX) channel in our Discord.
