---
title: contributing
---

### Tracing

While simple ETH and token transfers are trivial to parse/filter (by processing their transaction input data, events and/or receipts), contract interactions can be complex to identify. EVM tracing allows us to dig deeper into the transaction execution cycle to look through the internal calls and any other additional proxy contracts the tx interacts with, this is useful for the comprehensive analysis we're interested in.

Trace types (by `action_type`):

* `Call`, which is returned when a method on a contract (same as the tx `to` field or a different one within) is executed. We can identify the input parameters in each instance by looking at this sub trace. 
* `Self-destruct`, when a contract destroys the code at its address and transfers the ETH held in the contract to an EOA. Common pattern among arbitrage bots given the gas refund savings. 
* `Create`, when a contract deploys another contract and transfers assets to it. 
* `Reward`, pertaining to the block reward and uncle reward, not relevant here. 

Note that this is for Erigon/OpenEthereum `trace` module and Geth has a different tracing mechanism that is more low-level/irrelevant for inspect.

### Creating an inspector from scratch

If you intend to create your own inspector and submit it as a PR, this should serve as a useful walkthrough to understand the code structure and types. 

Compound V2 has [two](https://compound.finance/docs/ctokens#liquidate-borrow) primary kinds of protocol liquidations on-chain. `liquidateBorrow()` on the cEther contract and on individual cToken contracts. The former is when a liquidation bot repays ETH debt (via `msg.value`) to seize an account's collateral. The latter is when a liquidation bot repays cTokens (by pre-approving the contract) to liquidate an account.

**Inspector to capture MEV from the first cEther scenario** 

Target function breakdown, from the compound docs: 

<pre>
<i>function liquidateBorrow(address borrower, address cTokenCollateral) payable</i>

msg.value payable: The amount of ether to be repaid and converted into collateral, in wei.
msg.sender: The account which shall liquidate the borrower by repaying their debt and seizing their collateral.
borrower: The account with negative account liquidity that shall be liquidated.
cTokenCollateral: The address of the cToken currently held as collateral by a borrower, that the liquidator shall seize.

RETURN: No return, reverts on error.</pre>


Example [transaction](https://etherscan.io/tx/0xd09e499f2c2d6a900a974489215f25006a5a3fa401a10b8d67fa99480cbb62fb), found using function signature on [bloxy](https://bloxy.info/functions/aae40a2a), which also has [full execution trace](https://bloxy.info/tx/0xd09e499f2c2d6a900a974489215f25006a5a3fa401a10b8d67fa99480cbb62fb) that can be helpful for debugging.

Flow: Classify traces => Parse traces with strategy inspector => Summarize before database insert

#### Classify traces
1. Add the contract ABI of the target function to `abis/protocol_version/`
    a. In this instance, we create `CEther.json` under `abis/compound_v2/`
    b. This is to ensure the `TraceClassifier` can utilize the ABI decoder (via `get_abi()`) when initialized in `scripts/inspect_block.py` 
2. Add matching specs in `mev_inspect/schemas/classified_traces.py` (to identify above function/abi when turning raw traces into classified traces)
    a. Add the following lines for each strategy/protocol
    ```
        class Classification(Enum):
            unknown = "unknown"
            swap = "swap"
            burn = "burn"
            transfer = "transfer"
    +       liquidate_borrow_ceth = "liquidate_borrow_ceth" #strategy classification/identification name
        

        class Protocol(Enum):
            uniswap_v2 = "uniswap_v2"
            uniswap_v3 = "uniswap_v3"
            sushiswap = "sushiswap"
   +       compound_v2 = "compound_v2" #should match folder name of `abis`
    ```
    b. Under `mev_inspect/schemas/classified_specs.py`, mention the actual function signature you're tragetting and export it in `CLASSIFIER_SPECS`
    ```
        COMPOUND_V2_CETH_SPEC = ClassifierSpec(
            abi_name="CEther", #should match abi json file name
            protocol = Protocol.compound_v2,
            classifications = {
                "liquidateBorrow(address,address)": Classification.liquidate_borrow_ceth,
            }
        )
    ```
3. Setup a unit test (`test/liquidation_test.py` in this case) to verify the above example tx is being classified properly
    a. `get_filtered_traces(tx_hash)` on `Block` class allows you to filter traces of a specific transaction (for the purpose of this inspector/test)
```

class TestCompoundV2Liquidation(unittest.TestCase):
    def test_compound_v2_ceth_liquidation(self):
        tx_hash = "0xd09e499f2c2d6a900a974489215f25006a5a3fa401a10b8d67fa99480cbb62fb"
        block_no = 12900060
        cache_path = _get_cache_path(block_no)
        block_data = Block.parse_file(cache_path)
        
        tx_traces = block_data.get_filtered_traces(tx_hash)
        trace_clasifier = TraceClassifier(CLASSIFIER_SPECS)
        classified_traces = trace_clasifier.classify(tx_traces)
        res = inspect_compound_v2_ceth(classified_traces)
        ## res type => Liquidation class with the types defined later below
        self.assertEqual(res.tx_hash, "0x0")
        self.assertEqual(res.borrower, "0x0")
        self.assertEqual(res.collateral_provided, "0x0")
        self.assertEqual(res.collateral_provided_amount, 0)
        self.assertEqual(res.asset_seized, "0x0")
        self.assertEqual(res.asset_seized_amount, 0)
        self.assertEqual(res.profit_in_eth, 0)
        self.assertEqual(res.tokenflow_estimate_in_eth, 0)        
        self.assertEqual(res.tokenflow_diff, 0)
        self.assertEqual(res.status, LiquidationStatus.seized)        
        self.assertEqual(res.type, LiquidationType.compound_v2_ceth_liquidation)
        self.assertEqual(res.collateral_source, LiquidationCollateralSource.other)     
```

#### Parse traces with strategy inspector

The custom logic for this scenario is handled here: `./mev_inspect/strategy_inspectors/compound_v2_ceth.py`, where we process the classified traces for profit data and additional information using `inspect_compound_v2_ceth(classified_traces: list[ClassifiedTrace]) -> Liquidation`. 

Before writing the inspector we define the output type to be returned by this function in `./mev_inspect/schema/liquidations.py`, this is unique to each class of strategies (aribitrage/liquidation/sandwich/token sniping etc) to contain all the relevant MEV fields. 

```
from .utils import CamelModel
from typing import Dict, List, Optional
from enum import Enum

class LiquidationType(Enum):
    compound_v2_ceth_liquidation = "compound_v2_ceth_liquidation"
    compound_v2_ctoken_liquidation = "compound_v2_ctoken_liquidation" # TODO: add logic to handle ctoken liquidations

class LiquidationStatus(Enum):
    seized = "seized" # succesfully completed
    check = "check" # just a liquidation check. i.e searcher only checks if opportunity is still available and reverts accordingly
    out_of_gas = "out_of_gas" # tx ran out of gas

class LiquidationCollateralSource(Enum):
    aave_flashloan = "aave_flashloan"
    dydx_flashloan = "dydx_flashloan"
    uniswap_flashloan = "uniswap_flashloan"
    searcher_eoa = "searcher_eoa" # searchers own funds
    other = "other"

class Liquidation(CamelModel):
    tx_hash: str
    borrower: str # account that got liquidated
    collateral_provided: str # collateral provided by searcher, 'ether' or token contract address
    collateral_provided_amount: int # amount of collateral provided
    asset_seized: str # asset that was given to searcher at a discount upon liquidation
    asset_seized_amount: int # amount of asset that was given to searcher upon liquidation
    profit_in_eth: int # profit estimated by strategy inspector
    tokenflow_estimate_in_eth: int # profit estimated by tokenflow
    tokenflow_diff: int # diff between tokenflow and strategy inspector
    status: LiquidationStatus
    type: LiquidationType
    collateral_source: LiquidationCollateralSource
```

Finally, we get into the core logic ( `inspect_compound_v2_ceth()` in `./mev_inspect/strategy_inspectors/compound_v2_ceth.py`).

```
flow: 
    1. decide if it's a pre-flight check tx or an actual liquidation
    2. parse `liquidateBorrow` and `seize` sub traces to determine actual amounts sent to the protocol and send back to the searcher
    3. calculate net profit by finding out the worth of seized tokens
    4. use tokenflow module to find out profit independent of the inspector, calculate diff
    5. determine source of funds 
    6. prepare return object to get it ready for db processing
```

For every inspector, try to verify the profit amount by adding unit tests of sample txs that cover a wide variety of edge cases. Comparing the inspector outputs to that of tokenflow (`tokenflow_diff` in `Liquidation` class in this case) should also help catch misclassifications. 

#### Summarize before database insert

TODO: section about what ends up in the database from all the extracted information, after we finalize tables/schema
