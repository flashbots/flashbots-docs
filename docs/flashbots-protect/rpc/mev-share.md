---
title: MEV-Share
---

Protect users can opt in to MEV-Share, which returns them up to 80% of the MEV that their transactions create. MEV-Share users can control which parts of their transaction they want to share with searchers. Sharing less data will guarantee privacy, while sharing more will improve chances of speedy inclusion, as well as receiving MEV kickbacks.

To opt in, users can specify the URL query `?auction=enabled` when connecting to Protect RPC. To make this painless, we've built a button to do this for you.

(// TODO: INSERT BUTTON)

## RPC Reference

Auction preferences are passed as query params in the Protect RPC URL.

To explicitly enable or disable the auction, set the `auction` param ("enabled" or "disabled"). If the auction is disabled and hints are passed, they will be ignored.

`hint` can be specified multiple times to specify exactly which data from the user's transactions is shared with searchers. If no hints are specified and the auction is enabled, the default hints are used. If one or more hint is specified, any hint _not_ specified is disabled.

_Note: the default setting enables all hints except `calldata`._

```js
auction?: "enabled" | "disabled"
hint?: "calldata" |
       "contract_address" |
       "function_selector" |
       "logs" |
       "transaction_hash"
```

> :information_source: _The `auction` parameter may be deprecated in favor of using the `transaction_hash` hint. If the transaction hash is not shared, searchers cannot include the transaction in their bundle._

### Hints

| Hint | Description |
| - | - |
| `calldata` | Share data sent to the smart contract (if applicable) by the transaction. |
| `logs` | Share logs emitted by executing the transaction. |
| `function_selector` | Share the 4-byte identifier of the function being called on the smart contract by the transaction. |
| `contract_address` | Share the address of the recipient of the transaction; typically a smart contract. |
| `transaction_hash` | Share the transaction hash; disabling this will disable the auction entirely, as searchers rely on the tx hash to include these transactions in their bundles. |

## Examples

| | |
|-|-|
| Auction Enabled (Default Hints) | `https://rpc.flashbots.net?auction=enabled` |
| Auction Disabled (Max Privacy) | `https://rpc.flashbots.net?auction=disabled` |
|Max Speed & MEV Kickbacks | `https://rpc.flashbots.net?auction=enabled&hint=calldata&hint=logs&hint=function_selector&hint=contract_address&hint=transaction_hash` |
| Stable (Default Hints) | `https://rpc.flashbots.net?auction=enabled&hint=logs&hint=function_selector&hint=contract_address&hint=transaction_hash` |
