---
title: codebase
---

### design:
mev-inspect aims to quantify a lower bound of MEV extracted on Ethereum from txs such as arbitrage and liquidations. The profits are denominated in Ether and for cases where the reward is extracted in a non-ETH token, we query the historical price (via uniswap) and convert it accordingly. Additionally, we also count as MEV txs transactions with failed arb attempts and liquidation checks (where they might decide to check if the position is still liquidatable and halt accordingly) as they still end up paying the miner a gas fee.

Components:
* Inspectors
    * Examines transactions to see if they belong to a relevant protocol we're interested in
    are "parsers" that know how a given contract is set up, and are able to extract necessary fields
* Reducers and Processor
    * Goes through the relavent fields to check for MEV, quantify/identify them, and store it into the `mev-inspections` table of the database

Protocols supported (as defined in `src/inspectors`):
* Uniswap (+ forks with shared ABI)
* Balancer
* Curve
* 0x
* Aave
* Compound
* DyDx

Action types stored (as defined in `src/reducers`):
* Arbitrage
* Liquidations
    * Including LiquidationCheck
* Trades
    * We store trades even if they're not a complete arb in order to identify arb captured across multiple transactions in subsequent blocks
* AddLiquidity
* WETH deposits/withdrawals
* Token Transfers

### tracing:

Direct ETH/token transfers, trades routed through an aggregator or a router are trivial to parse/filter (by looking at the tx input data + receipts) but contract interactions (which bots often employ) can be complex to identify. Transaction tracing allows us to dig deeper into the tx execution cycle to look through the state changes, internal calls and additional proxy contracts the tx interacts with. mev-inspect uses OpenEthereum archive node traces with the following types (by action_type):

* `Call`, which happens when a method on the same contract or a different one is executed. We can identify the input parameters in each instance by looking at this trace.
* `Self-destruct`, when a arbitrage contract destroys the code at its address and transfers the ETH held in the contract to an EOA. Common pattern among searchers given gas refunds.
* `Create`, when a contract deploys another contract (and potentially transfers assets to it).
* `Reward`, pertaining to the block reward and uncle reward.

On proxy implementation:

Aside from the eoa that initiates the transaction and the recepient (which can be another eoa or a contract), we are also interested in identifying any proxy implementations used during MEV extraction. We do that by iterating over the traces to find delegate calls originating from the contract to any other proxy implementations.

![delegate_call_illustration](https://camo.githubusercontent.com/7cde2d066ebfa7c38adc324dc955e42278fa114d253d3804f3f85d20f7ace39a/68747470733a2f2f692e696d6775722e636f6d2f30564a694562762e706e67)


More on delegate calls [here](https://medium.com/coinmonks/delegatecall-calling-another-contract-function-in-solidity-b579f804178c)

Deeper dive into the rust implementation specifics [here](https://github.com/worldveil/mev-inspect-rs/blob/master/NOTES.md)
