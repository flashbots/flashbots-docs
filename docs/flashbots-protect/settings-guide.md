---
title: Settings guide
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

### Hints

Change what transaction data is visible to MEV-Share searchers with the `hint` query parameter. The [default](/flashbots-protect/settings-guide#default) hint configuration will be used if no hints are provided. If you specify one or more hints, any hint that is _not_ included will be disabled.

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
1. The Ethereum validator responsible for proposing the next block does not run [MEV-Boost](/flashbots-mev-boost). Approximately 10% of Ethereum blocks do not include any private transactions. Sending your transaction to the public mempool will give you access to those blocks at the expense of privacy and MEV refunds.
2. The transaction has not been included for 25 blocks: Some transactions pay very low priority fees are unlikely to land within 25 blocks. Send them to the public mempool to allow them to wait for lower gas prices.

To enable this feature, add the `useMempool` parameter to your Protect RPC URL:

```url
https://rpc.flashbots.net?useMempool=true
```

For analytics or other purposes, you can also specify a custom mempool URL by adding the `mempoolRpc` parameter:

```url
https://rpc.flashbots.net?useMempool=true&mempoolRpc=https://your-custom-node-url
```

### Reverted Transactions

Allow reverted transactions by including the `canRevert` query parameter in your request. By default, Flashbots Protect does not land reverted transactions on chain to save users gas fees. You can override this feature to receive faster feedback about failing transactions.

```url
https://rpc.flashbots.net?canRevert=true
```

## Examples

Here are some examples of configurations that you might choose for different goals.

| <div style={{width:"180px"}}>Goal</div> | Flashbots Protect RPC URL |
| --- | --- |
| All Builders | `https://rpc.flashbots.net/fast` |
| Custom Builders | `https://rpc.flashbots.net?builder=flashbots&builder=XYZ` |
| Max Privacy | `https://rpc.flashbots.net/fast?hint=hash` |
| Max Kickback | `https://rpc.flashbots.net/fast?hint=calldata&hint=logs` |
| Custom Refund (send more to validator for faster inclusion) | `https://rpc.flashbots.net/fast?refund=recipientAddress:10` |