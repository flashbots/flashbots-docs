---
title: source code
---

The entire changeset can be viewed inspecting the [diff](https://github.com/ethereum/go-ethereum/compare/master...flashbots:master).

The entire patch can be broken down into 3 major releases with a few commits in each:

#### v0.1.0

- commits [d86f1a64416c3e6b50c333c6fd2c5f7ec58bdf5e](https://github.com/flashbots/mev-geth/commit/d86f1a64416c3e6b50c333c6fd2c5f7ec58bdf5e) and [fcc3b6d2973e5905651f66dbab99b9f790059f6f](https://github.com/flashbots/mev-geth/commit/fcc3b6d2973e5905651f66dbab99b9f790059f6f) bundle worker and `eth_sendBundle` rpc
- commit [34d4b559a24f8c43e1d4354a73bbba91b6b6b9e7](https://github.com/flashbots/mev-geth/commit/34d4b559a24f8c43e1d4354a73bbba91b6b6b9e7) profit switcher
- commit [959394df8b6b0ce868c2231e74f47bfdf89e0f72](https://github.com/flashbots/mev-geth/commit/959394df8b6b0ce868c2231e74f47bfdf89e0f72) Documentation (this file) and CI/infrastructure configuration

#### v0.1.1

- commit [88247f37b97efff7da0ff722c00a8370f2b1ba95](https://github.com/flashbots/mev-geth/commit/88247f37b97efff7da0ff722c00a8370f2b1ba95) correct handling or reorgs

#### v0.2.0-pre

- commit [b94943ecb2e85f720a5675a6d2f95a6b96870ec0](https://github.com/flashbots/mev-geth/commit/b94943ecb2e85f720a5675a6d2f95a6b96870ec0) Change flashbots bundle pricing formula to ignore gas fees
- commit [4b7668d4d7579eecc15be65c9c7902ff7e3ad341](https://github.com/flashbots/mev-geth/commit/4b7668d4d7579eecc15be65c9c7902ff7e3ad341) Discard bundles with reverting txs

#### v0.2.0

- commit [d823ec7133a0f0d21932b1d893d37ad80949819e](https://github.com/flashbots/mev-geth/commit/d823ec7133a0f0d21932b1d893d37ad80949819e) Change pricing formula to ignore gas from txs in the txpool
- commit [92463dc9c3b95a58991c36be9fddd1340b32eeb5](https://github.com/flashbots/mev-geth/commit/92463dc9c3b95a58991c36be9fddd1340b32eeb5) Use object in eth_sendBundle params and add revertingTxHashes param
- commit [5a30f876ba9725554eb8609e8f60cada5b961e57](https://github.com/flashbots/mev-geth/commit/5a30f876ba9725554eb8609e8f60cada5b961e57) Add bundle merging with multiple workers

#### v0.2.1

- commit [a172ca123a3c2534573779008fbf8b3c853b4e57](https://github.com/flashbots/mev-geth/commit/a172ca123a3c2534573779008fbf8b3c853b4e57) Add floor gas price for bundle inclusion

#### v0.2.2

- commit [2d05e741d42f795eecfa2f8185f1575e8e5cc1dc](https://github.com/flashbots/mev-geth/commit/2d05e741d42f795eecfa2f8185f1575e8e5cc1dc) count eth payments for txs whose nonce is in the mempool

#### v0.3

- commit [68f7addad7ba100a59a280bfbdef2f556bcf8401](https://github.com/flashbots/mev-geth/commit/68f7addad7ba100a59a280bfbdef2f556bcf8401) Add flashbots support for eip-1559

#### v0.4

- commit [00e687cca6c3db5dc85cc88b0dc13985b6a5c577](https://github.com/flashbots/mev-geth/commit/00e687cca6c3db5dc85cc88b0dc13985b6a5c577) Add megabundles