---
title: release notes
---

## Initial Release
- Initial release on 10/6/2021

## 0.2.0
- Upstreamed Protect API into a service that is more tightly coupled to the Flashbots Relay. As part of this migration cancellations are temporarily not supported.
- Released [status API](/flashbots-protect/rpc/status-api) that can be used to check the status of transactions.
- Spun off Protect API, webSDK, and gas fees calculator into standalone services.

## 0.4.0
- Refactored RPC and introduced persisent state, which is now stored in a database. This will improve UX when upgrading the RPC or during any potential downtime.
- Introduced the ability to [cancel the further submission of transactions](/flashbots-protect/rpc/cancellations) sent via Flashbots Protect RPC.
