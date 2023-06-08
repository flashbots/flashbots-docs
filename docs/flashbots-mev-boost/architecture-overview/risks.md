---
title: MEV-Boost Risks and Considerations
---


**Liveness and Local Fallback**

To prevent any risk to Ethereum **liveness,** mev-boost is implemented as a sidecar for consensus client software. Using the standard [builder specs](https://github.com/ethereum/builder-specs) ensures client diversity is maintained and validators benefit from operating in the same security model, regardless of which client is selected. Should a fault occur in the mev-boost software, the consensus nodes fall back to local block production. Check-out [understanding liveness risk](https://writings.flashbots.net/understanding-mev-boost-liveness-risks), the [circuit breaker proposal](https://hackmd.io/@ralexstokes/BJn9N6Thc), and the [relay monitor specification](https://hackmd.io/@ralexstokes/SynPJN_pq) for more information.

**Builder Centralization**

A builder that dominates the market because of its outsized profitability gains the ability (although not the incentive) for censorship and access to exclusive transaction orderflow. It should be noted that MEV-boost doesn’t *create* the risk of builder centralization - MEV does. Encouraging competition between many builders is the primary mitigation to builder centralization, but it should be supported by techniques like [censorship resistance lists (crLists)](https://github.com/flashbots/mev-boost/issues/215) and others still in early research.

**Builder/Relay Collusion**

Anyone can be a relay, and they will compete on reputation and service to both builders and validators. While this is a strict improvement to the trust model compared MEV extraction in PoW Ethereum, relays can still be a risk to both builders and validators. This risk will be addressed in Stage 3 PBS (enshrined), which is getting rid of the trusted relay altogether.

**Malicious Relays**

Nothing prevents malicious relays from submitting fraudulent bids, which affects MEV-Boost’ profit switching logic. MEV-boost provides the bid with the highest value to the Beacon Node, but has no way of verifying that the value is indeed what is claimed in the bid. A Beacon Node will always be presented with a single bid. However, the [relay monitor specification](https://hackmd.io/@ralexstokes/SynPJN_pq)  aims to detect and disqualify a malicious relay pretty quickly.

**MEV Hiding**

A risk that occurs when node operators (often managing the stake of third party customers) are incentivized to hide MEV-rewards earned in a given block.
