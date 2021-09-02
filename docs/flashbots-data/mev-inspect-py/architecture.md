---
title: architecture overview
---

### Overview
MEV-inspect-py is made up of three major components: 
- trace classifiers: tries to classify the traces of a transaction by looking at the ABI, functions being called, and the address a trace is interacting with. For example, we might classify something as a "Swap" if it called `swap` on an address that had the same ABI as a Uniswap v2 pair. *Trace classifiers are designed to be as simple as possible to add support for a new protocol.* 
- strategy inspectors: uses classified traces to infer the MEV strategy, if any, of a transaction. Also will get relevant information about that MEV strategy if possible. For example, a strategy inspector might classify a transaction as an arbitrage.
- summarizers: a group of utilities that are useful across inspectors. For example, token flow is a protocol agnostic profit estimator.

The easiest way to contribute to MEV-inspect-py is by helping to support more protocols in our trace classifiers.


#### Trace classifiers
For each block we intend to inspect, we first fetch all of its traces. The raw traces are then processed by the trace classifier into classified traces. This is done by looking at the:
1. ABI at the address being interacted with
2. OPTIONAL: The address being interacted with
3. OPTIONAL: The function being called 

For example, here is the Uniswap v2 pair classifier:
```UNISWAPPY_V2_PAIR_SPEC = ClassifierSpec(
    abi_name="UniswapV2Pair",
    classifications={
        "swap(uint256,uint256,address,bytes)": Classification.swap,
    },
)```

The above will identify all 
#### Classified Traces


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