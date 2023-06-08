---
title: Glossary
---


- **attestation:** votes (embedded in messages) describing which blocks “should” be the head of the chain. We can think of each such attestation as a “vote” to move from block A to B. Each attestation has a weight, which is the stake of the validator writing the attestation.
- **beacon node (BN):** maintains the state of the beacon chain by communicating with other beacon nodes in the Ethereum network. Conceptually, a BN does not maintain keypairs that directly participate with the beacon chain.
- **block builder (builder)**: party specialized in MEV extraction and the construction of execution payloads. Builders are trusted by searchers and users for fair transaction inclusion.
- **block proposer (proposer)**: a validator selected to sign and submit a beacon block to the network.
- **builder API specification**: an [interface](https://github.com/ethereum/builder-specs) for consensus layer clients to source blocks built by external entities. 
- **committee:** a group of validators. For security, each slot has committees of at least 128 validators. An attacker has less than a one in a trillion probability of controlling 2⁄3 of a committee.
- **execution payload**: a [message](https://github.com/ethereum/consensus-specs/blob/a45ee9bf5b1fde766d69e551a6b1a21fe2531734/specs/merge/beacon-chain.md#executionpayload) containing the complete content of an unsigned execution payload (an object containing block properties in addition to transactions) that is provided by the execution layer (previous PoW nodes).
- **fork choice rule:** A function evaluated by the client that takes, as input, the set of blocks and other messages that have been produced, and outputs to the client what the 'canonical chain' is.
- **liveness:** state of ethereum which is valid ****if the set of finalized blocks can grow.
- **MEV-boost “middleware”**: a piece of software that sits between the consensus client and the execution client to outsource block construction to a market of builders.
- **plausible liveness:** if, regardless of any previous events (attacks, latency, etc.), it is possible for new blocks to be finalized (the alternative is to become “deadlocked”). This is to prevent situations where honest validators cannot continue unless someone forfeits their own stake.
- **probabilistic liveness:** if, regardless of any previous events, it is probable for new
blocks to be finalized (after probabilistic assumptions about the network latency, capabilities of attackers, etc. are made).
- **Proposer/block-builder separation (PBS)**: Proposer/block-builder separation (**PBS**
) was proposed by Ethereum researchers as a response to the risk that MEV poses to decentralization of consensus networks. PBS is a change to the base Ethereum protocol that aims to separate block building from block proposing. Instead of the block proposer (currently the miner, after PoS the validator) also trying to produce a maximally profitable block by itself, it can outsource this to a block building *marketplace.* With this model, block builders would produce bundles consisting of a complete block and a fee for the proposer.
- **relay**: party that validates and routes execution payloads from builders to proposers. Relays are trusted by builders for fair routing and block inclusion. Relays are trusted by block proposers for block validity, accuracy, and data availability. Relay actors are often specialized in Denial of Service (DoS) protection and networking.
- **searcher**: advanced Ethereum user specialized in detecting and extracting MEV by submitting advanced transactions in batches called bundles.
- **staker:** actor that submit any amount of Ethereum to be staked.
- **user**: a normal Ethereum user who sends transactions for block inclusion.
- **validator:** Most often refers to a validator client instance, but can also refer to an individual that is physically managing a validator client. Validators**** participate in the consensus of Ethereum through validator duties. These duties include the production of beacon blocks and signing of attestations, as executed by the validator client.
- **validator client (VC):** Validator clients are specialized software that let people stake 32 ETH as collateral within Ethereum's **consensus layer**. Validators are responsible for proposing blocks within Ethereum's proof-of-stake consensus mechanism which replaced proof-of-work miners at [The Merge](https://ethereum.org/en/upgrades/merge/).
- **validator pubkey**: The validator's BLS public key, uniquely identifying them. *48-bytes, hex encoded with 0x prefix, case insensitive.*
