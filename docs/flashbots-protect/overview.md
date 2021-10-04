---
title: Overview
---

The API offers two ways to connect and send transactions:

- **JSON RPC**: HTTP requests sent to mistX JSON RPC endpoints
- **Websockets SDK**: toolkit to send transactions to mistX websockets endpoints

In both cases the transactions are submitted to the Flashbots network. The only difference between the two is that you need to regularly query the status of the bundle when using JSON RPC (pull process) while you will automatically receive notifications when using the SDK (push mechanism).

You will find here guides on how to use each method. We've also added a guide on how to build and sign a transaction before sending it to the mistX API.
