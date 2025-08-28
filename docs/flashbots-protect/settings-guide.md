---
title: Settings Guide
---

import HintsTable from '../specs/mev-share/HintsTable';
import Builders from '../specs/mev-share/_builders.mdx';

The Protect RPC uses query parameters and URL paths to convey your preferences. These parameters indicate which builders to share your transaction with, how potential refunds should be distributed, when to send transactions to the mempool, and other features.

### Default

```url
https://rpc.flashbots.net
```

By default, Flashbots Protect uses the following settings:
- Transactions are only forwarded to the Flashbots block builder
- Transactions are retried for 25 blocks and dropped if they do not land on chain within this time
- The `hash` and `default_logs` [hints](/flashbots-protect/settings-guide#hints) are shared with MEV-Share searchers
- 90% of MEV refunds are sent to `tx.origin` (the remaining 10% is sent to the validator)
- 100% of gas fee refunds are sent to `tx.origin`
- 0 priority fee transactions are not included on chain
- Reverted transactions are not included on chain

This may change as the configuration is tuned to maximize benefits.

### Fast

Speed up your transactions by using fast mode.

```url
https://rpc.flashbots.net/fast
```

Compared with the default configuration:
- Transactions are shared with all [registered builders](https://github.com/flashbots/dowg/blob/main/builder-registrations.json)
- Validators receive a higher percentage of the MEV-Share refund increasing the probability that the transaction will be included in the winning block.
- Full transaction information (without signatures) is shared with searchers inside TEEs to increase MEV refunds while preserving frontrunning protection. Searchers not in TEEs will receive only the hints specified. TEE searchers will be able to see full transaction information (even for failed or reverted transactions) after a 5-minute delay for troubleshooting and debugging purposes.
  
### Hints

Change what transaction data is visible to MEV-Share searchers with the `hint` query parameter. The [default](/flashbots-protect/settings-guide#default) hint configuration will be used if no hints are provided. If you specify one or more hints, any hint that is _not_ included will be disabled. If fast mode is used, searchers not in TEEs will only receive the hints specified while TEE searchers will receive all hints regardless of specification. 

<HintsTable />

Here is an example:

```url
https://rpc.flashbots.net?hint=contract_address&hint=logs
```

This configuration shares the contract address and logs with searchers. It does not share the calldata or function selector.

### Builders

Designate which builders will receive your transaction with the `builder` query parameter. This parameter can be repeated multiple times to include different builders. The builders listed below are currently supported.

Note that all transactions are shared with the Flashbots block builder, even if it is not explicitly specified.

<Builders />

It's important to understand that while adding more builders can increase your transaction inclusion rate, it also requires you to place trust in those builders. Here's an example of how to utilize the `builder` parameter:

```url
https://rpc.flashbots.net?builder=ABC&builder=XYZ
```

This configuration sends your transaction to ABC block builder, XYZ block builder, and the Flashbots block builder.

### Refunds

Tailor your refund settings using the `refund` query parameter. This determines how MEV and gas fee refunds will be distributed across different addresses. If not specified, the transaction originator (tx.origin) will receive all refunds.

The refund parameter contains two colon-separated values: an address for the refund and the percentage of the payment that should be refunded to that address.

Here is an example of a refund parameter that sends 10% of refunds to the address `recipientAddress`:

```URL
https://rpc.flashbots.net?refund=recipientAddress:10
```

#### MEV Refund Recipients

MEV refunds can be split across multiple recipients. To distribute the payment across multiple addresses, append a new refund parameter for each address.

The sum of all refund percentages must be less than 100. The remaining percentage, inferred from 100 - total refund percentages, is the payment to the validator.

**Note**: Keeping a larger percentage of the refund may result in longer block inclusion times as it reduces the payment to the validator.

#### Gas Fee Refund Recipients

Gas fee refunds can only be sent to a single recipient. If multiple addresses are specified, the first refund address listed will receive 100% of the gas fee refund. There is no additional payment split with the validator.

### Mempool Configuration

Send certain transactions to the public mempool to improve the likelihood of inclusion by including the `useMempool` query parameter. If either of the following conditions are true, Flashbots will send all pending transactions with this parameter to the public mempool:
1. The Ethereum validator responsible for proposing the next block does not run [MEV-Boost](/flashbots-mev-boost/introduction). Approximately 10% of Ethereum blocks do not include any private transactions. Sending your transaction to the public mempool will give you access to those blocks at the expense of privacy and MEV refunds.
2. The transaction has not been included for 25 blocks: Some transactions pay very low priority fees are unlikely to land within 25 blocks. Send them to the public mempool to allow them to wait for lower gas prices.

To enable this feature, add the `useMempool` parameter to your Protect RPC URL:

```url
https://rpc.flashbots.net?useMempool=true
```

For analytics or other purposes, you can also specify a custom mempool URL by adding the `mempoolRpc` parameter:

```url
https://rpc.flashbots.net?useMempool=true&mempoolRpc=https://your-custom-node-url
```

Note: If this setting is enabled, all cancellations will be immediately forwarded to the public mempool, regardless of if the transaction itself has been made public.

### Reverted Transactions

Allow reverted transactions by including the `canRevert` query parameter in your request. By default, Flashbots Protect does not land reverted transactions on chain to save users gas fees. You can override this feature to receive faster feedback about failing transactions.

```url
https://rpc.flashbots.net?canRevert=true
```

### Block range

By default we try to land transactions in the next 25 blocks. You can change this range by including the `blockRange` query parameter in your request.

```url
https://rpc.flashbots.net?blockRange=10
```

### Bundle Mode

Use the Protect PRC in bundle mode to interactively construct a bundle of transactions that you want to be land together. This setting is typically used for whitehat rescues and you can find the complete documentation in the [Flashbots API docs](https://docs.flashbots.net/flashbots-protect/additional-documentation/bundle-cache).

Bundle mode has a few differences from the regular Protect experience:
- Protect will not immediately attempt to land transactions sent in bundle mode. Instead, new transactions will be queued and kept in a pending state.
- To send all pending transactions as a bundle, you must make a separate API request to Flashbots.
- Querying the balance of an address in bundle mode will return a fake balance of 100 ETH.

### Custom Read RPC

Use a custom RPC endpoint for **read** requests by including the `url` query parameter in your request. **Write** requests (eg. `eth_sendRawTransaction`) will still be sent to the Protect RPC. This feature is recommended for wallets and applications with large volumes of read requests.

```url
https://rpc.flashbots.net?url=http://RPC-ENDPOINT.COM
```

### Auction timeout

If `auctionTimeout=T`, where `T` is the time in milliseconds, is specified, and a transaction arrives within `T` milliseconds of the end of the current slot, it will be scheduled for the next slot.
This ensures the transaction is processed at the beginning of the next slot, giving searchers the full slot duration to submit their bundles and backruns.

```
https://rpc.flashbots.net?auctionTimeout=3000
```
