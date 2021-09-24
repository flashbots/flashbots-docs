---
title: architecture
---

#### Classified Traces

For each block we intend to inspect, we first fetch all of its traces, transaction receipts, and other additional information. The raw traces are then processed into classified traces (with protocol name, relevant function signature, relevant call inputs, strategy classification and other information) before being passed onto individual inspectors. 

If we notice these classified traces to only contain liquidation related functions, we can only pass them off to aave/comp inspectors. Similarly, arbitrage profits are reduced by running them through protocol inspectors tagged in this stage (swap/liquidate/buy tx followed by addLiquidity etc). 

#### Strategy Inspectors

Each strategy has its own inspector and we define the types based on what output we expect it to return. This could include net profits, but also other information such as whether it was a pre-flight check (querying the reserves to see if the arb is still available) or a successful mev opportunity. 

TODO: generic types we've narrowed them down to
TODO: table of inspectors pending/wip/ready

#### Tokenflow

This module is built to help us identify misclassifications and eventually be used as a protocol agnostic profit estimator (that can be imported by other inspectors after they identify target function signature in the traces) but for now, we'll be using it in addition to our inspectors and store the `diff` for reference purposes. 

The method revolves around iterating over all the traces and makes a note of all the ETH inflows/outflows as well as stablecoins (USDT/USDC/DAI) for the main `eoa`, `contract` (to field, if it's not a known router/aggregator), `proxy` (helpers used by searcher, if any). Once it is done, it finds out net profit by subtracting the gas spent from the MEV revenue. All profits will be converted to ETH, based on the exchange rate at that block height. 

Example: https://etherscan.io/tx/0x4121ce805d33e952b2e6103a5024f70c118432fd0370128d6d7845f9b2987922

ETH=>ENG=>ETH across DEXs

Script output: 
EOA: 0x00000098163d8908dfbd126c873c9c4732a2c2e6
Contract: 0x000000000000006f6502b7f2bbac8c30a3f67e9a
Tx proxy: 0x0000000000000000000000000000000000000000
Stablecoins inflow/outflow: [0, 0]
Net ETH profit, Wei 22357881284770142 

More examples can be found under `./tests/tokenflow_test.py`

