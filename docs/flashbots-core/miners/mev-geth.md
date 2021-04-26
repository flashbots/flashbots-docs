---
title: MEV-Geth
---

MEV-Geth is a fork of go-ethereum. Miners can start mining MEV blocks by running MEV-Geth, or by implementing their own fork that matches the specification. We issue and maintain [releases](https://github.com/flashbots/mev-geth/releases) for the recommended configuration for the current and immediately prior versions of geth.

At this stage, we recommend only receiving bundles via a relay, to prevent abuse via denial-of-service attacks. We have [implemented](https://github.com/flashbots/mev-relay) and currently run such relay. This relay performs basic rate limiting and miner profitability checks, but does otherwise not interfere with submitted bundles in any way, and is open for everybody to participate.

Access the mev-geth repository [here](https://github.com/flashbots/mev-geth).


### Running MEV-Geth
We invite you to try the [Flashbots Alpha](https://github.com/flashbots/pm#flashbots-alpha) and start receiving MEV revenue by following these steps:

1. Fill out this [form](https://forms.gle/78JS52d22dwrgabi6) to indicate your interest in participating in the Alpha and be added to the MEV-Relay miner whitelist.
2. You will receive an onboarding email from Flashbots to help [set up](https://github.com/flashbots/mev-geth/blob/master/README.md#quick-start) your MEV-Geth node and protect it with a [reverse proxy](https://github.com/flashbots/mev-relay-js/blob/master/miner/proxy.js) to open the `eth_sendBundle` RPC.
3. Respond to Flashbots' email with your MEV-Geth node endpoint to be added to the Flashbots hosted [MEV-relay](https://github.com/flashbots/mev-relay-js) gateway. MEV-Relay is needed during the alpha to aggregate bundle requests from all users, prevent spam and DOS attacks on participating miner(s)/mining pool(s), and collect system health metrics.
4. After receiving a confirmation email that your MEV-Geth node's endpoint has been added to the relay, you will immediately start receiving Flashbots transaction bundles with associated MEV revenue paid to you.


### Feature requests and bug reports

If you are a user of MEV-Geth and have suggestions on how to make integration with your current setup easier, or would like to submit a bug report, we encourage you to open an issue in the mev-geth repository with the `enhancement` or `bug` labels respectively. If you need help getting started, please ask in the dedicated [#⛏️miners](https://discord.gg/rcgADN9qFX) channel in our Discord.
