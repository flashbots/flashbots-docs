---
title: mev-geth introduction
---
## MEV-Geth: a proof of concept

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

### How it works

MEV-Geth introduces the concepts of "searchers", "transaction bundles", and "block template" to Ethereum. Effectively, MEV-Geth provides a way for miners to delegate the task of finding and ordering transactions to third parties called "searchers". These searchers compete with each other to find the most profitable ordering and bid for its inclusion in the next block using a standardized template called a "transaction bundle". These bundles are evaluated in a sealed-bid auction hosted by miners to produce a "block template" which holds the [information about transaction order required to begin mining](https://ethereum.stackexchange.com/questions/268/ethereum-block-architecture).

![](https://hackmd.io/_uploads/B1fWz7rcD.png)

The MEV-Geth proof of concept is compatible with any regular Ethereum client. The Flashbots core devs are maintaining [a reference implementation](https://github.com/flashbots/mev-geth) for the go-ethereum client.

### Differences between MEV-Geth and [_vanilla_ geth](https://github.com/ethereum/go-ethereum)

The entire patch can be broken down into four modules:

1. bundle worker and `eth_sendBundle` rpc (commits [8104d5d7b0a54bd98b3a08479a1fde685eb53c29](https://github.com/flashbots/mev-geth/commit/8104d5d7b0a54bd98b3a08479a1fde685eb53c29) and [c2b5b4029b2b748a6f1a9d5668f12096f096563d](https://github.com/flashbots/mev-geth/commit/c2b5b4029b2b748a6f1a9d5668f12096f096563d))
2. profit switcher (commit [aa5840d22f4882f91ecba0eb20ef35a702b134d5](https://github.com/flashbots/mev-geth/commit/aa5840d22f4882f91ecba0eb20ef35a702b134d5))
3. `eth_callBundle` simulation rpc (commits [9199d2e13d484df7a634fad12343ed2b46d5d4c3](https://github.com/flashbots/mev-geth/commit/9199d2e13d484df7a634fad12343ed2b46d5d4c3) and [a99dfc198817dd171128cc22439c81896e876619](https://github.com/flashbots/mev-geth/commit/a99dfc198817dd171128cc22439c81896e876619))
4. Documentation (this file) and CI/infrastructure configuration (commit [035109807944f7a446467aa27ca8ec98d109a465](https://github.com/flashbots/mev-geth/commit/035109807944f7a446467aa27ca8ec98d109a465))

The entire changeset can be viewed inspecting the [diff](https://github.com/ethereum/go-ethereum/compare/master...flashbots:master).

In summary:

- Geth’s txpool is modified to also contain a `mevBundles` field, which stores a list of MEV bundles. Each MEV bundle is an array of transactions, along with a min/max timestamp for their inclusion.
- A new `eth_sendBundle` API is exposed which allows adding an MEV Bundle to the txpool. During the Flashbots Alpha, this is only called by MEV-relay.
  - The transactions submitted to the bundle are “eth_sendRawTransaction-style” RLP encoded signed transactions along with the min/max block of inclusion
  - This API is a no-op when run in light mode
- Geth’s miner is modified as follows:
  - While in the event loop, before adding all the pending txpool “normal” transactions to the block, it:
    - Finds the most profitable bundle
      - It picks the most profitable bundle by returning the one with the highest average gas price per unit of gas
        - computeBundleGas: Returns average gas price (\sum{gasprice_i\*gasused_i + (coinbase_after - coinbase_before)) / \sum{gasused_i})
    - Commits the bundle (remember: Bundle transactions are not ordered by nonce or gas price). For each transaction in the bundle, it:
      - `Prepare`’s it against the state
      - CommitsTransaction with trackProfit = true
        w.current.profit += coinbase_after_tx - coinbase_before_tx
        w.current.profit += gas \* gas_price
  - If a block is found where the w.current.profit is more than the previous profit, it switches mining to that block.
- A new `eth_callBundle` API is exposed that enables simulation of transaction bundles.
- Documentation and CI/infrastructure files are added.

### Moving beyond proof of concept

We provide the MEV-Geth proof of concept as a first milestone on the path to mitigating the negative externalities caused by MEV. We hope to discuss with the community the merits of adopting MEV-Geth in its current form. Our preliminary research indicates it could free at least 2.5% of the current chain congestion by eliminating the use of frontrunning and backrunning and provide uplift of up to 18% on miner rewards from Ethereum. That being said, we believe a sustainable solution to MEV existential risks requires complete privacy and finality, which the proof of concept does not address. We hope to engage community feedback throughout the development of this complete version of MEV-Geth.
