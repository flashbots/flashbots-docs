---
title: Quick start
---

## Flashbots Protect API

The Flashbots Protect API provides a simple way for developers to integrate Flashbots into their dApps.

Currently the API supports two ways to connect and send transactions:

- **JSON RPC**: HTTP requests sent to the Protect API JSON RPC endpoint at `https://protection.flashbots.net/v1/rpc`
- **Websockets**: use socket.io to send transactions to the Protect API websocket endpoints at `wss://protection.flashbots.net/v1/ws`

In either case the Flashbots Protect API will take your transactions and handle their submission to Flashbots, repeatedly submitting each block and monitoring for their inclusion.

The major difference between the two integrations is that if you use the JSON RPC endpoint you will need to query to derive the status of a transaction (pull), whereas the websocket SDK will push you updates as they occur (push).

You will find here guides on how to use each method. We've also added a guide on how to build and sign a transaction before sending it to the Flashbots Protect API if you are building a web application.