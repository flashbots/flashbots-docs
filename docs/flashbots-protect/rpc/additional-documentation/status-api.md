---
title: Transaction Status API
---

Transactions that you submit to Flashbots Protect won't be observable in the public mempool. However, you can use our status API to check the status of your transactions. The URL for doing so is: `https://protect.flashbots.net/tx/YOUR_TX_HASH_HERE`, and you can also use Etherscan as you normally would for transactions. They will show the status of your transaction from the status API as well.

In turn you will receive a JSON response that looks like the following:

```json
{
    "status": "PENDING",
    "hash": "YOUR_TX_HASH",
    "maxBlockNumber": 13543898,
    "transaction": {
        "from": "",
        "to": "",
        "gasLimit": "",
        "maxFeePerGas": "",
        "maxPriorityFeePerGas": "",
        "nonce": "",
        "value": ""
    },
  "fastMode": true, // for backwards compatibility; may be removed in a future version
  "seenInMempool": false,
}
```

## Potential statuses

* `PENDING` - The transaction was received and is currently being processed by the block builder
* `INCLUDED` - The transaction was included on-chain
* `FAILED` - The transaction was submitted for 25 blocks and failed to be included on-chain
* `CANCELLED` - The transaction was cancelled by the user and not included on-chain
* `UNKNOWN` - The transaction was not received

## Privacy

The `transaction` fields are only shared for INCLUDED transactions to respect pre- and failed- trade privacy. These fields will be empty for PENDING, FAILED, UNKNOWN, or CANCELLED transactions.

For example, once the earlier transaction was included, you would receive a JSON response that contains data for all fields:

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
}
```
