---
title: json rpc
---
The Flashbots Protect API exposes a [JSON-RPC](https://www.jsonrpc.org/specification) protocol to send transactions or bundles, get status updates, cancel transactions or bundles, and optionally retrieve recommended ETH network gas fees.

Note that bundle ID here refers to a unique identifier of bundles for the Flashbots Protect API, not the bundle hash. In a future release we intend to move to use the bundle hash as the unique identifier.

## Endpoints

**Staging**:

- Current version: v1.8.0
- `https://protection-staging.flashbots.net/v1/rpc`

**Production**:

- Current version: v1.8.0
- `https://protection.flashbots.net/v1/rpc`

## How it works

### Sending a single transaction

1. send a transaction using **eth_sendRawTransaction**, the response will include the transaction hash
2. use the transaction hash to regularly query it's status using **eth_getTransactionStatusByHash**
3. the status can be either
    - **PENDING_BUNDLE**: the bundle is in progess, being sent to miners via flashbots for inclusion
    - **FAILED_BUNDLE**: the bundle has not been included. The reason will be shown in the response error message
    - **SUCCESSFUL_BUNDLE**: the bundle has been included by a miner

### Sending many transactions

1. send a bundle of transactions using **eth_sendRawTransactions**, the response will include a bundle ID
2. use the bundle ID to regularly query the status of the bundle using **eth_getBundleStatusById**
3. the status can be either
    - **PENDING_BUNDLE**: the bundle is in progess, being sent to miners via flashbots for inclusion
    - **FAILED_BUNDLE**: the bundle has not been included. The reason will be shown in the response error message
    - **SUCCESSFUL_BUNDLE**: the bundle has been included by a miner

### Sending and canceling a bundle in progress

1. send a transaction using **eth_sendRawTransaction** or **eth_sendRawTransactions**, the response will include a bundle ID or transaction hash.
2. use the bundle ID to cancel the bundle using **eth_cancelBundleById** or use the transaction hash to cancel the bundle containing the transaction using **eth_cancelBundleByTransactionHash**
3. use the bundle ID or transaction hash to regularly query the status using **eth_getBundleStatusById** or **eth_getTransactionStatusByHash**
4. the status can be either
    - any of the above statuses
    - **CANCEL_BUNDLE_SUCCESSFUL**: the bundle was canceled successfully

### Recommended fees (optional)

To build a successful transaction, it is important to include enough fees to cover both the Ethereum **baseFee** as well as the **miner tip** (incentive for a miner to include your transaction in a block). It may be complex to estimate what the fees should be, especially when the network is heavily used and more transactions are competing with each other.

To help on that matter, the API provides a method that will send back **recommended fees**. Those have been adjusted to ensure a good chance of inclusion while avoiding overpayment. The method **eth_gasFees** will send back fees organized in three tiers, so you can choose which one fits best your use case

- **low**: lowest chance of inclusion, it will take more time to get included. Higher risk of not covering the baseFee in times of heavy traffic
- **medium**: good chance of inclusion, it will be faster to get included. Medium risk of not covering the baseFee in times of heavy traffic
- **high**: highest chance and fastest inclusion. Lowest risk of not covering the baseFee in times of heavy traffic

## Methods

### eth_sendRawTransaction

Sends a raw transaction.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "eth_sendRawTransaction",
  "params": [] // Array[String], A list containing a single signed transaction
}
```

example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "eth_sendRawTransaction",
  "params": ["0x123abc..."]
}
```

example response:

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": "0x2228f5d8954ce31dc1601a8ba264dbd401bf1428388ce88238932815c5d6f23f" // NOTE: this is the transaction hash
}
```

### eth_sendRawTransactions

Sends one or many raw transactions.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "eth_sendRawTransactions",
  "params": [] // Array[String], A list of signed transactions
}
```

example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "eth_sendRawTransactions",
  "params": ["0x123abc..."]
}
```

example response:

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": "0x2228f5d8954ce31dc1601a8ba264dbd401bf1428388ce88238932815c5d6f23f" // NOTE: this is the Flashbots Protect bundle id
}
```

### eth_getBundleStatusById

Get the status of a bundle

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "eth_getBundleStatusById",
  "params": [] // Array[String], An array containing a single bundle id returned from eth_sendRawTransaction
}
```

example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "eth_getBundleStatusById",
  "params": ["0x2228f5d8954ce31dc1601a8ba264dbd401bf1428388ce88238932815c5d6f23f"]
}
```

example response:

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": {
    status,  // String, status of the bundle
    error,   // String, error message
    message, // String, details about the status or error
    id       // String, id of the bundle
  }
}
```

### eth_getTransactionStatusByHash

Get the status of a transaction

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "eth_getTransactionStatusByHash",
  "params": [] // Array[String], An array containing a single bundle id returned from eth_sendRawTransaction
}
```

example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "eth_getTransactionStatusByHash",
  "params": ["0x2228f5d8954ce31dc1601a8ba264dbd401bf1428388ce88238932815c5d6f23f"]
}
```

example response:

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": {
    status,  // String, status of the bundle
    error,   // String, error message
    message, // String, details about the status or error
    id       // String, id of the bundle
  }
}
```

### eth_cancelBundleById

Cancel a bundle by bundle ID. Requests a cancellation of a bundle if it is still processing. This does not guarantee that the bundle will be cancelled.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "eth_cancelBundleById",
  "params": [] // Array[String], An array containing a single bundle id returned from eth_sendRawTransaction
}
```

example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "eth_cancelBundleById",
  "params": ["0x2228f5d8954ce31dc1601a8ba264dbd401bf1428388ce88238932815c5d6f23f"]
}
```

example response:

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": true // Boolean, whether the request was sent successfully
}
```

### eth_cancelBundleByTransactionHash

Cancel a bundle by transaction hash. Requests a cancellation of a bundle if it is still processing. This does not guarantee that the bundle will be cancelled.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "eth_cancelBundleByTransactionHash",
  "params": [] // Array[String], An array containing a single transaction hash
}
```

example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "eth_cancelBundleByTransactionHash",
  "params": ["0x2228f5d8954ce31dc1601a8ba264dbd401bf1428388ce88238932815c5d6f23f"]
}
```

example response:

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": true // Boolean, whether the request was sent successfully
}
```

### eth_gasFees

Get current gas fees

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "eth_gasFees",
  "params": [] // Array[], An empty array
}
```

example:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "eth_gasFees",
  "params: []
}
```

example response:

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": {
    block,                     // Number, current block number
    baseFeePerGas,             // String, a hex number for the baseFee at the current block
    default: {
      maxFeePerGas,            // String, a hex number for the recommended default maxFeePerGas
      maxPriorityFeePerGas,    // String, a hex number for the recommended default maxPriorityFeePerGas
    },
    low: {
      maxFeePerGas,            // String, a hex number for the recommended low maxFeePerGas
      maxPriorityFeePerGas,    // String, a hex number for the recommended low maxPriorityFeePerGas
    },
    med: {
      maxFeePerGas,            // String, a hex number for the recommended med maxFeePerGas
      maxPriorityFeePerGas,    // String, a hex number for the recommended med maxPriorityFeePerGas
    },
    high: {
      maxFeePerGas,            // String, a hex number for the recommended high maxFeePerGas
      maxPriorityFeePerGas,    // String, a hex number for the recommended high maxPriorityFeePerGas
    },
  }
}
```
