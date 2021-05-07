---
title: Using coinbase.transfer()
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Flashbots allows you to pay miners for your transactions through a smart contract by using `block.coinbase.transfer(AMOUNT_TO_TRANSFER)`. This smart contract function transfers Ethereum from the contract to the coinbase address of the miner who mines that block. Miners running MEV-Geth will treat fees through coinbase transfers in the same way they do normal transaction fees, which is to say that 1 wei of coinbase payments is equivalent to 1 wei paid through transaction fees. This provides significant benefits to Flashbots users:
* You can condition payment to the miner on some criteria being met
* Relatedly, you can only pay for successful transactions, not failures
* You can pay for a transaction from account X with ETH from account Y (see: searcher sponsored transaction repo [here](https://github.com/flashbots/searcher-sponsored-tx))

Here's an example from our open source simple arbitrage bot of how paying through coinbase transfers work:

```s
function uniswapWeth(uint256 _wethAmountToFirstMarket, uint256 _ethAmountToCoinbase, address[] memory _targets, bytes[] memory _payloads) external onlyExecutor payable {
        require (_targets.length == _payloads.length);
        uint256 _wethBalanceBefore = WETH.balanceOf(address(this));
        WETH.transfer(_targets[0], _wethAmountToFirstMarket);
        for (uint256 i = 0; i < _targets.length; i++) {
            (bool _success, bytes memory _response) = _targets[i].call(_payloads[i]);
            require(_success); _response;
        }

        uint256 _wethBalanceAfter = WETH.balanceOf(address(this));
        require(_wethBalanceAfter > _wethBalanceBefore + _ethAmountToCoinbase);
        if (_ethAmountToCoinbase == 0) return;

        uint256 _ethBalance = address(this).balance;
        if (_ethBalance < _ethAmountToCoinbase) {
            WETH.withdraw(_ethAmountToCoinbase - _ethBalance);
        }
        block.coinbase.transfer(_ethAmountToCoinbase);
    }
```

The above smart contract code will attempt to capitalize on arbitrage opportunities. If it does not make money doing so then the transaction will fail. Moreover, since the searcher is paying the miner via `block.coinbase.transfer()` on the last line then the searcher won't pay any transaction fees.

For more information on how coinbase transfers are priced see the bundle pricing page.