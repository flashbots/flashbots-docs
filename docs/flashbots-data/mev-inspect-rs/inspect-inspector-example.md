---
title: sample flow - liquidation tx
---

### Sample flow of Aave inspector on liquidation tx [0xc8d2501d28800b1557eb64c5d0e08fd6070c15b6c04c39ca05631f641d19ffb2](https://etherscan.io/tx/0xc8d2501d28800b1557eb64c5d0e08fd6070c15b6c04c39ca05631f641d19ffb2)

![tx_image](https://i.imgur.com/pwHNF2I.png)

Command: `./target/release/mev-inspect --db-cfg postgresql://postgres:postgres@localhost -u <link_to_archive_node> tx 0xc8d2501d28800b1557eb64c5d0e08fd6070c15b6c04c39ca05631f641d19ffb2`

Output:

    Found: 0xc8d2501d28800b1557eb64c5d0e08fd6070c15b6c04c39ca05631f641d19ffb2
    Revenue: 140406510074700360 WEI
    Cost: 88544390000000000 WEI
    Actions: {Liquidation}
    Protocols: {Aave}
    Status: Success

mev-inspect parses the tx and identifies the tx to be a aave liquidation with a revenue of ~0.14 ETH and a cost of ~0.08 ETH (gas fees)

Money markets like AAVE allow people to borrow assets using over-collateralization mechanism that includes liquidation incentives for bots that repay the debt, as defined [here](https://docs.aave.com/risk/asset-risk/risk-parameters). In this instance, 0x1acA borrowed USDT using ETH as collateral. When a liquidation bot (0x3abc here) repays the debt to the protocol, it receives the collateral at a discount.

First, mev-inspect takes the transaction hash and fetches the traces using the provider here in [main.rs](https://github.com/flashbots/mev-inspect-rs/blob/2a5c015752f71ef27429d1e8b98a2380864f834f/src/main.rs#L131).

Then, we pass each trace through our processor to attempt matching it with an existing protocol, using `inspect_one` here in [src/inspectors/batch.rs](https://github.com/flashbots/mev-inspect-rs/blob/2a5c015752f71ef27429d1e8b98a2380864f834f/src/inspectors/batch.rs#L56). If the actions identified by the inspector are not empty, we attempt inspection and finally reduce the revenue.

In this particular instance, we identify a trace to the aave protocol that has the signature `liquidationCall` assosiated with liquidations, here in [inspectors/aave.rs](https://github.com/flashbots/mev-inspect-rs/blob/2a5c015752f71ef27429d1e8b98a2380864f834f/src/inspectors/aave.rs#L42). We then proceed to extract the token amounts (of asset paid back + collateral) alongside other relevant information.

Finally, we evaluate all the inspection actions returned to categorize the MEV in a protocol agnostic way (either arbitrage, liquidation, or simply trades) to store it in the database, here in [evaluation.rs](https://github.com/flashbots/mev-inspect-rs/blob/2a5c015752f71ef27429d1e8b98a2380864f834f/src/types/evaluation.rs#L69)

The net profit (if the liquidation is successful) is calculated here in [reducers/liquidation.rs](https://github.com/flashbots/mev-inspect-rs/blob/2a5c015752f71ef27429d1e8b98a2380864f834f/src/reducers/liquidation.rs#L80)
