---
title: interacting with MEV-Relay
---

mev-relay-js is a repository that contains a public relay for accepting transactions from searchers. It also contains an example reverse proxy for miners to run in front of their mev-geth nodes. This relay is meant only to protect participating miners from abuse via DoS attacks, but does otherwise no bundle filtering or censoring.

This is the relay entrypoint(server/main.js). The public flashbots relay is available at https://relay.flashbots.net. See https://github.com/flashbots/ethers-provider-flashbots-bundle for a library to help you call this.

The relay provides new JSON-RPC methods for interfacing with Flashbots which are documented in the repository. In addition, the repository also documents how authentication works within the relay and how searchers can sign their payloads with an ethereum wallet.

Access the mev-relay-js repository [here](https://github.com/flashbots/mev-relay-js).
