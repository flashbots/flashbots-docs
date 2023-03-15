---
title: bundle cache API
---

To create a bundle iteratively (e.g. by signing & sending transactions one at a time with Metamask), you can use the bundle cache API to cache signed transactions and retrieve them with a bundle ID.

This will be used for whitehat recoveries. By enabling users to sign transactions on their own machines and send them privately to Flashbots, we remove the need to ask for the compromised private key.

## Create a Bundle ID

To start addding transactions to a bundle, first create a bundle ID. We recommend using a UUID (v4). You can generate a UUID at [uuidgenerator.net](https://www.uuidgenerator.net/version4) or with any uuid library.

## Connect to Flashbots Protect with Bundle ID

Connecting to the Flashbots Protect RPC Endpoint with a bundle ID parameter will automatically add incoming transactions to a queue without sending them.

```txt
https://rpc.flashbots.net?bundle=<YOUR_BUNDLE_ID>
```

Chain ID should be set to `1`.

## Add Transaction to Bundle

To add a transaction to the bundle, sign and send the transaction as you normally would (e.g. via Metamask). The transaction will stay pending until it's included on-chain (after the bundle is sent).

## Get Bundle Transactions

You can get the array of transactions included in your bundle using the `GET /bundle?id=<YOUR_BUNDLE_ID>` endpoint:

```sh
curl https://rpc.flashbots.net/bundle?id=<YOUR_BUNDLE_ID>
```

This will return a JSON object with your signed transactions:

```json
{
    "bundleId":"cbd900bf-44c5-4f6b-bf14-9b8d2ae27510",
    "rawTxs": [
        "0x02f879827a6901849502...",
        "0x02f875827a6960849502..."
    ]
}
```

Note: The transaction sent last is the first in the `rawTxs` array.

## Send Bundle

Once all the transactions you want to include in your bundle are added to the queue, query the bundle with `GET /bundle?id=<YOUR_BUNDLE_ID>` and send the returned signed transactions to Flashbots as a bundle.

If you're being helped with a whitehat recovery, we may provide a web interface for you to do this.

If you want to send a bundle directly, check out the [Flashbots Auction Docs](https://docs.flashbots.net/flashbots-auction/searchers/quick-start#how-to-send-your-first-flashbots-bundle) for instructions on how to do this.

## Fake Funds

Querying the balance of an address when using the `?bundle=` argument will return a fake balance of 100 ETH, to allow crafting transactions without the account having actual funds.
