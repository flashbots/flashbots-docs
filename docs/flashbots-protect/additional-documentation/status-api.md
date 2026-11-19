---
title: Transaction Status API
---

Transactions that you submit to Flashbots Protect won't be observable in the public mempool. However, you can use our status API to check the status of your transactions. The URL for doing so is: `https://protect.flashbots.net/tx/YOUR_TX_HASH_HERE`, and you can also use Etherscan as you normally would for transactions. They will show the status of your transaction from the status API as well.

The status API covers transactions sent through the Protect RPC, and keeps each transaction for 45 minutes after it was received. After that it returns `UNKNOWN`.

In turn you will receive a JSON response that looks like the following:

```json
{
  "status": "PENDING",
  "hash": "YOUR_TX_HASH",
  "maxBlockNumber": 13543898,
  "transaction": {
    "from": "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
    "to": "0xac03bb73b6a9e108530aff4df5077c2b3d481e5a",
    "gasLimit": "21000",
    "maxFeePerGas": "300",
    "maxPriorityFeePerGas": "10",
    "nonce": "41",
    "value": "10000000000"
  },
  "fastMode": true, // for backwards compatibility; may be removed in a future version
  "seenInMempool": false,
  "simError": "",
  "revertReason": "",
  "isRevert": false
}
```

Below is a table of status codes that can be returned:

| Status Code | Description                                                                        |
| ----------- | ---------------------------------------------------------------------------------- |
| `PENDING`   | The transaction was received and is currently being processed by the block builder |
| `INCLUDED`  | The transaction was included on-chain                                              |
| `FAILED`    | The transaction was submitted for 25 blocks and failed to be included on-chain     |
| `CANCELLED` | The transaction was cancelled by the user and not included on-chain                |
| `UNKNOWN`   | The transaction was not received, or was received more than 45 minutes ago         |

## Privacy

For Protect fast mode transactions, TEE searchers will receive all fields (without signature) for all transactions, including reverted or failed transactions, with a 5 minute delay for troubleshooting and debugging purposes. The TEE environment serves as a frontrunning countermeasure. You can learn more at [flashbots-images](https://github.com/flashbots/flashbots-images).

Once a transaction is included, the JSON response looks like the following:

```json
{
  "status": "INCLUDED",
  "hash": "YOUR_TX_HASH",
  "maxBlockNumber": 13543898,
  "transaction": {
    "from": "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
    "to": "0xac03bb73b6a9e108530aff4df5077c2b3d481e5a",
    "gasLimit": "21000",
    "maxFeePerGas": "300",
    "maxPriorityFeePerGas": "10",
    "nonce": "41",
    "value": "10000000000"
  },
  "fastMode": true, // for backwards compatibility; may be removed in a future version
  "seenInMempool": false,
  "isRevert": false
}
```

While your transaction is `PENDING` or `FAILED` we will try to respond with the latest seen simulation error and revert reason if exists.

Below is the table of currently supported `simError` values.

| Sim error                    | Description                                                                                 |
|------------------------------|---------------------------------------------------------------------------------------------|
| `MaxFeePerGasTooLow`         | Consensus incompatible tx that wasn't caught on rpc                                         |
| `InsufficientFunds`          | Insufficient ETH balance to pay for gas                                                     |
| `NonceTooLow`                | Nonce too low                                                                               |
| `NonceTooHigh`               | Nonce too high                                                                              |
| `InvalidChainIdForSigner`    | Consensus incompatible tx that wasn't caught on rpc                                         |
| `ExecutionReverted`          | Execution reverted (slippage tolerance exceeded). Check revertReason field for more details |
| `OutOfGas`                   | Ran out of gas during execution (gas limit too low)                                         |
| `Other`                      | Any other simulation error                                                                  |

`revertReason` field is a valid utf-8 part of the simulation result. Example: `TRANSFER_FROM_FAILED`, `UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT` 
