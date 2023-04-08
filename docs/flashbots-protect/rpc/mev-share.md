---
title: MEV-Share
---

Protect users can opt in to MEV-Share, which returns them up to 80% of the MEV that their transactions create. MEV-Share users can control which parts of their transaction they want to share with searchers. Sharing less data will guarantee privacy, while sharing more will improve chances of speedy inclusion, as well as receiving MEV kickbacks.

To opt in, users can specify the URL query `?auction=enabled` when connecting to Protect RPC. To make this painless, we've built a button to do this for you.

(// TODO: INSERT BUTTON)

## RPC Reference

Auction preferences are passed as query params in the Protect RPC URL.

To explicitly enable or disable the auction, specify the query param `auction` ("enabled" or "disabled") in the Protect RPC url. If the auction is disabled and hints are passed, they will be ignored.

`hint` can be specified multiple times to specify which data from the user's transactions is shared with searchers. If no hints are passed and the auction is enabled, the default hints are used. If one or more hint is passed, any hint not passed is disabled.

```js
auction?: "enabled" | "disabled"
hint?: "calldata" |
"contract_address" |
"function_selector" |
"logs"
```

## Examples

| | |
|-|-|
| Auction Enabled (Default Hints) | `https://rpc.flashbots.net?auction=enabled` |
| Auction Disabled (Max Privacy) | `https://rpc.flashbots.net?auction=disabled` |
|Max Speed & MEV Kickbacks | `https://rpc.flashbots.net?auction=enabled&hint=calldata&hint=logs&hint=function_selector&hint=contract_address` |
| Stable (Default Hints) | `https://rpc.flashbots.net?auction=enabled&hint=logs&hint=function_selector&hint=contract_address` |
