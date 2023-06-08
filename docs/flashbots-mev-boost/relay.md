---
title: Relay Fundamentals
---

**What is a Relay?**

Relays are a doubly-trusted data-availability layer and communication interface between builders and validators. Relays are trusted by builders for fair payload routing, and trusted by proposers for block validity, accuracy, and data availability. They are often specialized in Denial of Service (DoS) protection and networking.

Relays can connect to one or many builders, and we expect that there will be both variants. A relay connecting to many builders will aggregate their bids (fun fact: in a previous iteration, we called them builder aggregators or builder pools). The relay can see all the blocks submitted by the builders to confirm their validity and how much they pay to the validator. The relay then only submits the highest valid bid to the validator to sign.

Before validators can receive any bids from relays, they need to [set up mev-boost](https://boost.flashbots.net/) and add relays to their mev-boost config. mev-boost is effectively just a relay aggregator or a local relay of relays. It will serve the validator the winning bid from all relays. A validator can connect to a small number of relays that aggregate all the builders, and many will probably do that. Other validators might connect to many relays.

**The Role of Relays**

A relay has several responsibilities:

- They execute [builder-spec](https://ethereum.github.io/builder-specs/#/Builder) and data transparency API functionality.
- Handle validator registrations and block proposals in a scalable manner.
- Provide block escrow and data availability.
- Simulate and verify blocks sent by block-builders, and rate-limit as necessary. Relays simulate whether:
    - the correct amount of fees are paid to recent validator feeRecipient.
    - the correct block attributes and transactions exist.
    - the block gas is within the gasLimit requested by validator.

## [Relay API Specification](https://flashbots.notion.site/Relay-API-Spec-5fb0819366954962bc02e81cb33840f5)

The current specification for the [open-source Flashbots relay](https://github.com/flashbots/mev-boost-relay). Diagram below displays the current architecture:

![Relay Architecture](https://i.imgur.com/Z1AtQpw.png)

### [Proposer API](https://flashbots.notion.site/Relay-API-Spec-5fb0819366954962bc02e81cb33840f5)

Standard [builder spec](https://ethereum.github.io/builder-specs/#/Builder) APIs

- [registerValidator](https://ethereum.github.io/builder-specs/#/Builder/registerValidator): `POST /eth/v1/builder/validators`
- [getHeader](https://ethereum.github.io/builder-specs/#/Builder/getHeader): `GET  /eth/v1/builder/header/{slot}/{parent_hash}/{pubkey}` - Get an execution payload header.
- [submitBlindedBlock](https://ethereum.github.io/builder-specs/#/Builder/submitBlindedBlock): `POST /eth/v1/builder/blinded_blocks` - Submit a signed blinded block and get unblinded execution payload.
- [status](https://ethereum.github.io/builder-specs/#/): `GET /eth/v1/builder/status`

### [Block Builder API](https://flashbots.notion.site/Relay-API-Spec-5fb0819366954962bc02e81cb33840f5)

Get a list of validator registrations for the current and next epoch, submit a new block to the relay.

### [Data API](https://flashbots.notion.site/Relay-API-Spec-5fb0819366954962bc02e81cb33840f5)

Provides data about received blocks from builders, payloads delivered to proposers as well as insights into validator registrations.

## [Relay Monitor](https://hackmd.io/@ralexstokes/SynPJN_pq)

While relays are trusted actors, the ability to run a relay is permissionless. To mitigate potential abuses of this role, Flashbots [has suggested](https://github.com/flashbots/mev-boost/issues/142) a “relay monitor,” which uses publicly available data to form a view on the behavior and performance of the set of relays it is monitoring. More details can be found in the [relay monitor design documentation](https://hackmd.io/@ralexstokes/SynPJN_pq), [keeping MEV-Boost relays honest](https://notes.ethereum.org/@yoav/BJeOQ8rI5), and [understanding liveness risks](https://writings.flashbots.net/understanding-mev-boost-liveness-risks).

## [Circuit Breaker](https://hackmd.io/@ralexstokes/BJn9N6Thc)

The circuit breaker is implemented by client software teams to define “circuit breaking” conditions using globally available inputs (simply, the chain) which determine whether clients should make a decision to terminate an external builder network in favor of local block production. Once the circuit breaker condition is met, the only way to reset the state is to restart the beacon node where the missing slots tally will be 0.

Each consensus client implements different circuit breaker conditions, as an example:

| Name | Value | Units |
| --- | --- | --- |
| MAX_ALLOWED_MISSING_SLOTS | 5 | slot(s) |