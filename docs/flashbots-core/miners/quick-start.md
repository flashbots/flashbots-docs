---
title: onboarding
---

:::tip Join Flashbots

Over 80% of the Ethereum hashrate accepts Flashbots bundles which leads to fairer access to MEV and [0.3 ETH](https://dashboard.flashbots.net/) on average on top of every block reward for miners.

:::

For new mining pools who would like to receive Flashbots bundles, please complete the [Miner Indication of Interest Form](https://docs.google.com/forms/d/e/1FAIpQLSdz29fKXJXJFWXkEu8hZNG-NJUeAbOz0Jvw9mnNLskJHlMUDA/viewform).

-----

## Running MEV-Geth

You can choose one of the following approaches to start using MEV-Geth

### Build and launch MEV-Geth

You can find the MEV-Geth repository [here](https://github.com/flashbots/mev-geth).

```
git clone https://github.com/flashbots/mev-geth
cd mev-geth
make geth
```

### Implement specification

If the Geth version that you are using contains a lot of custom code, you may want to implement required MEV-Geth changes yourself.
You can find the latest specification [here](../miners/mev-geth-spec/v02.md) and the example implementation [here](https://github.com/ethereum/go-ethereum/compare/master...flashbots:master)

### Install the MEV-Geth Go Plugin

We are planning to deliver future versions of MEV-Geth in the form of Go plugins for Geth. Get in touch with [Flashbots](https://discord.com/invite/7hvTycdNcK) if you want to contribute!
