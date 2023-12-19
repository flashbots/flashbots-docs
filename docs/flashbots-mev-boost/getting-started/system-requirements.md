---
title: System Requirements
---

This guide assumes a pre-installed and hardened Ubuntu installation [as well as Docker](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04). Excellent introductory resources to start with are: [Coincashew](https://www.coincashew.com/coins/overview-eth/archived-guides/guide-or-how-to-setup-a-validator-on-eth2-mainnet/part-i-installation/guide-or-security-best-practices-for-a-eth2-validator-beaconchain-node), and [Rocketpool's Securing your Node](https://docs.rocketpool.net/guides/node/securing-your-node.html#securing-your-node)

## Requirements for different systems

### Execution + Beacon Requirements

- **Software**: Execution client, beacon node client (instructions for clients below), [curl](https://curl.se/download.html)
- **OS**: 64-bit Linux, Mac OS X 10.14+, Windows 10+ 64-bit
- **CPU**: 4+ cores @ 2.8+ GHz
- **Memory**: 16GB+ RAM
- **Storage**: SSD with at least 2TB free space
- **Network:** 8 MBit/sec broadband

:::tip
There are variations in client resource usage. Please review [CoinCashew’s Client Usage Guide](https://eth-docker.net/Usage/ResourceUsage) for more details!
:::

### Validator Requirements

- Everything above, plus...
- **Software:** Validator client, browser-based crypto wallet (instructions below)
- **Hardware** (Recommended): A new machine that has never been connected to the internet that you can use to securely generate your mnemonic phrase and keypair
- **32 ETH** (Mainnet)
- **32 testnet ETH** (Testnets)

### MEV-Boost Requirements

- Can run on any beacon-node system, and requires almost no resources.

## Consensus client configuration guides

|            | MEV-Boost Client Guides                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------------------- |
| Teku       | [Guide](hthttps://docs.teku.consensys.net/Concepts/Builder-Network/tps://hackmd.io/@StefanBratanov/BkMlo1RO9) |
| Prysm      | [Guide](https://hackmd.io/@prysmaticlabs/BJeinxFsq)                                                           |
| Lighthouse | [Guide](https://lighthouse-book.sigmaprime.io/builders.html#mev-and-lighthouse)                               |
| Lodestar   | [Guide](https://github.com/ChainSafe/lodestar/blob/unstable/docs/pages/beacon-management/mev-and-builder-integration.md)                    |
| Nimbus     | [Guide](https://nimbus.guide/external-block-builder.html)                                                     |
