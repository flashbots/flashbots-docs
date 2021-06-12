---
title: upgrade process
---

Flashbots Core project encompasses the suite of user facing products used for democratizing MEV extraction outlined in the overview section.

Breaking changes to these products requires coordination with searchers and miners to update their bot / node implementations. As such, we've devised the following high level upgrade process to set expectations, standardize communications, and provide sufficient time for 3rd parties to update their software.

1. Feature selection process
2. Formal specification and reference implementation
3. Versioned deployment and testing
4. Monitoring continuing performance

We do not make any commitments around how frequently / quickly these upgrades will happen as we wish to maintain flexibility during the Flashbots Alpha (v0.x.x). That being said, we will do our best to provide adequate information and time to adapt to critical changes.

![Flashbots Core Upgrades](/img/gant-chart-upgrade.png)

## Feature selection process
The goal of the feature selection process is to surface feature requests from the community and collaborate on implementation.

Product Manager (PM): @thegostep

1. Feature requests are submitted by anyone to the [flashbots forum](https://github.com/flashbots/pm/discussions) and titled 'Feature request:'
2. The PM is responsible for engaging and moderating the forums
3. The PM updates the ['core releases' project board](https://github.com/orgs/flashbots/projects/6) to keep track of feature requests and assigns them to target releases
4. The PM produces a proposal that outlines the details of modifications to the flashbots core infrastructure
5. The proposal is posted to ['General' forum](https://github.com/flashbots/pm/discussions/categories/general) and shared with the community for feedback
6. Feedback is incorporated into the formal specification

## Formal specification and reference implementation
We've learned that despite maintaining a reference implementation of mev-geth, miners tend to re-implement our feature set on their own custom nodes. This has lead to some confusion around what are "required" vs "nice to have" features as well as bugs which have lead to unexpected behaviors like mining unprofitable / reverting bundles.

By producing a formal specification and updating it on each release, we aim to provide a document that clearly outlines the expected behavior of the node implementation and use it to grant / withhold access to the relay.

## Versioned deployment and testing
To provide the best possible availability and correctness guarantees to the Flashbots Network, we aim to perform upgrades in a way that minimizes disruptions. This involves a 'rolling' upgrade process where searchers can define which version of Flashbots Core they are targeting.

At a selected block height, the relay will route all searcher bundles exclusively to the nodes that have implemented the new specification. A searcher desiring to remain on a previous version may do so by [specifying the target version](https://github.com/flashbots/mev-relay-js/issues/37) until a predetermined deprecation block height where the old version will no longer be supported by the relay.

Miners will want to begin implementing the changes required as soon as the updated specification is released in order to be ready for the upgrade block height. Once the miner's implementation is ready, they can request to undergo our suite of correctness tests which once successfully passed, will allow them to begin receiving bundles on the new system version.

These tests involve receiving and mining a series of bundles on a test environment which can be analyzed by the flashbots team. The tests will cover a range of known edge cases including but not limited to:

- logic testing
    - block formation / ordering
    - bundle prioritization
    - bundle atomicity
- probabilistic testing
    - custom profit switcher
    - latency and delays
    - mempool volume

## Monitoring continuing performance

While passing the test suite helps identify and correct some logical errors, it will not be able to catch everything which can go wrong on the mining side. As such, the Flashbots core team has built a series of monitoring tools which analyses mined flashbots blocks for correctness and profitability in order to help miners insure their infrastructure is behaving as expected. If unexpected behavior is identified, like mining bundles which did not go through the relay or producing incorrect blocks, Flashbots will temporarily disable sending the bundles to the miner and provide the technical support required to resolve the issues at hand.
