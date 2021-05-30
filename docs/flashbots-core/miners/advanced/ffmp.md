---
title: Flashbots Fair Market Principles
---

This document aims to define a set of key principles and best practices upon which stakeholders of the Flashbots network can hold block producers (miners in ETH 1.0) accountable for their continued participation in the Flashbots Alpha. 

Fair Market Principles for MEV is required in the Flashbots Alpha due to the technical limitations in the early stage of the project which are mitigated on the basis of trust. Flashbots aims to eliminate these trust requirements in [future releases of the system](https://ethresear.ch/t/flashbots-frontrunning-the-mev-crisis/8251).

Block producers connected to the Flashbots Alpha are expected to act in the [best interest](https://www.investopedia.com/what-is-the-sec-s-regulation-bi-best-interest-rule-4689542) of the Flashbots network, the Ethereum network, and its various stakeholders. Namely, the Flashbots network aims to uphold the properties of fairness, efficiency, transparency, and permissionlessness. Block producers participating in the Flashbots Alpha are expected to collaborate in the development of an ecosystem for MEV extraction which reinforces the security and stability of the Ethereum network.

In the event of a breach of these principles by one of the block producers, the Flashbots core devs may act on behalf of stakeholders in disabling the access to the Flashbots network until the breach is rectified. The Flashbots core devs aim to provide technical support to block producers on a best effort basis to help resolve any technical issues.


## Principles

### Correctness

Block producers are expected to operate an Ethereum node which complies with the latest version of the Ethereum specification and the latest version of the Flashbots core specification. Block producers are expected to follow the Flashbots core upgrade process and swiftly upgrade their nodes to meet latest requirements.

Bad behavior includes any deviation from the specified node behavior. This includes, but is not limited to, implementation errors, intended omissions, and new "features" which change how the system operates.

[Flashbots core specification](../mev-geth-spec/v02.md)

### Fairness

Block producers are expected never to act or enable third parties to act on sensitive information received through the Flashbots relay. 

Sensitive information includes the state of the MEV bundle queue, sealed bid, pending block, bundle simulation, bundle content, or bundle merging. Sensitive information excludes MEV bundles correctly included in a block and distributed over the public network with the intention of such block being included as a canonical block or as an uncle block.

Bad behavior includes, but is not limited to, operating a trading bot which benefits from knowing the winning bid value of the bundle auction, operating a trading bot which steals or frontruns strategies from bundles, operating a bundle selection algorithm which prioritizes some searchers over others.

### Finality

Block producers are expected to contribute to the consensus stability of Ethereum. This means minimizing the uncle rate and re-organization rate in an effort to provide finality as quickly as possible.

Bad behavior includes, but is not limited to, re-ordering chain history in an attempt to extract MEV in what is called a "time-bandit attack", and prioritizing transmission of sealed blocks to subsets of the network in what is called "selfish mining".

In the future, we may additionally require participants in the Flashbots network to defend against such attacks actively, ensuring the long-term health of any networks supported by Flashbots and therefore the MEV ecosystem.

### Privacy

Block producers are expected to protect the confidentiality of the MEV bundles they receive from the Flashbots relay.

Confidentiality includes both pre-trade privacy and failed-trade privacy:
- Pre-trade privacy: No MEV bundle received by the miner is ever disclosed to any third party before the bundle is included in a block.
- Failed-trade privacy: No MEV bundle received by the miner is ever disclosed to any third party after it has not been selected for a block.

Bad behavior includes, but is not limited to, sending bundle information to third parties, and storing bundle information to persistent storage past their intended use.

## Best Practices

### Disclosure

Block producers disclose if they are connected to the Flashbots network.

Block producers disclose the coinbase address they are using.

Block producers disclose how their MEV revenues are distributed to their stakeholders.

### Reporting

Block producers report the amount of hashrate they point to their Flashbots node.

Block producers report the amount of revenue they received from the Flashbots network.

### Professionalism

Block producers are diligent in swiftly and correctly implementing the latest versions of Flashbots core and Ethereum without unjustified delay.

Block producers properly secure their node infrastructure to protect the integrity of their system. This includes, but is not limited to, making use of reverse proxies, firewalls, and strict access control to prevent information leaks.

### Incident Response

Block producers quickly respond, mitigate, and remediate incidents causing unexpected behavior of their system.

### Communication

Block producers actively monitor the Flashbots Discord and mev-geth Github repository to remain up to date with latest Flashbots core releases and core dev communication.

## Penalty & Remediation

Penalties for violating the Flashbots Fair Market Principles and Best Practices can range from a simple warning to being removed from the Flashbots relay until the violations are resolved.
Warnings will be communicated to the offending block producer through the dedicated Flashbots Discord channel and are expected to be acknowledged within 24h.

Block producers are expected to collaborate with Flashbots core devs to promptly resolve any issue as they arise.

Flashbots core devs will provide technical support on a "best effort" basis in order to help bring the offending block producer back into compliance with the FFMP.

## Feedback & Discussion

Please provide feedback on the FFMPs and engage in discussion in the [Flashbots forum](https://github.com/flashbots/pm/discussions/65).

## Disclaimer

Flashbots core and Flashbots alpha is an open-source software stack, while we will attempt to provide support for any issues or test infrastructure we run, we cannot provide any guarantees associated with the use of Flashbots tools and encourage a miner-side diligence process for all network participants.
