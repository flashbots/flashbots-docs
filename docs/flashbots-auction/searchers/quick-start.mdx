---
title: quick start
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


This quickstart guide contains all the information necessary to get up and running as a searcher on Flashbots Auction. If you have any questions, do not hesitate to ask in the [#searchers discord channel](https://discord.gg/GezzK33W).

See you on-chain! ⚡🤖

### Who should use Flashbots Auction?
1. Ethereum bot operators (we call them "searchers") looking for fast, and risk free access to blockspace (for example, arbitrage and liquidation bots)
2. Ethereum users looking for frontrunning protection on their transactions (for example, Uniswap traders)
3. Ethereum Dapps with advanced use cases like account abstraction or gasless transactions (for example, tornado.cash and mistX)

### How does Flashbots work for searchers?
Flashbots connects searchers directly to miners and allows them to avoid the public tx pool. Searchers with transactions they would like to send miners first craft what we call "bundles" and send these to Flashbots' MEV-Relay. MEV-Relay is a gateway that Flashbots runs today which simulates searchers' bundles, and if there are no errors then forwards them on to miners. Miners then receive bundles and include them in blocks if it is profitable for them to do so.

Getting onboarded to Flashbots is easy for searchers; you simply need to update how you send transactions.

### How to send your first Flashbots bundle
To access the Flashbots network you will need three things:
1. A private key that Flashbots can use to identify you
2. A way to interact with the Flashbots network
3. A "bundle" for your transactions

Let's begin with the private key Flashbots uses for identity. When you send bundles to Flashbots you will sign them with a private key so that we can establish identity for searchers and establish reputation for them over time. This private key **does not** store funds and is **not** the primary private key you use for executing transactions. Again, it is only used for identity, and it can be any private key.

Second, you'll need a way to interact with Flashbots. Flashbots runs a relay you will send bundles to at `relay.flashbots.net`, and we have specific RPC endpoints you'll need to use to send us transactions. We've integrated with a few popular developer tools like Ethers.js or web3.py to make interacting with MEV-Relay as easy as possible. Here are a few examples of how to set up a Flashbots provider:

<Tabs
  defaultValue="ethers.js"
  values={[
    { label: 'ethers.js', value: 'ethers.js', },
    { label: 'web3.py', value: 'web3.py' },
    { label: 'go', value: 'go' },
  ]}
>
<TabItem value="ethers.js">

```ts
const ethers = require('ethers.js')
const { FlashbotsBundleProvider} = require('@flashbots/ethers-provider-bundle')
const provider = new ethers.providers.JsonRpcProvider({ url: ETHEREUM_RPC_URL })
// Standard json rpc provider directly from ethers.js. For example you can use Infura, Alchemy, or your own node.

const authSigner = new ethers.Wallet('0x0000000000000000000000000000000000000000000000000000000000000000')
// `authSigner` is an Ethereum private key that does NOT store funds and is NOT your bot's primary key.
// This is an identifying key for signing payloads to establish reputation and whitelisting

const flashbotsProvider = await FlashbotsBundleProvider.create(provider, authSigner)
// Flashbots provider requires passing in a standard provider and an auth signer
```

</TabItem>
<TabItem value="web3.py">

```python
from eth_account.signers.local import LocalAccount
from web3 import Web3, HTTPProvider
from flashbots import flashbot
from eth_account.account import Account
import os

w3 = Web3(HTTPProvider("http://localhost:8545"))
# Create a web3 object with a standard json rpc provider, such as Infura, Alchemy, or your own node.

ETH_ACCOUNT_SIGNATURE: LocalAccount = Account.from_key(os.environ.get("ETH_SIGNATURE_KEY"))
# ETH_ACCOUNT_SIGNATURE is an Ethereum private key that does NOT store funds and is NOT your bot's primary key.
# This is an identifying key for signing payloads to establish reputation and whitelisting

flashbot(w3, ETH_ACCOUNT_SIGNATURE)
# Flashbots providers require both a standard provider and ETH_ACCOUNT_SIGNATURE (to establish reputation)
```

</TabItem>
<TabItem value="go">
An example can be found here: https://hyegar.com/posts/flashbots-rpc/
</TabItem>
</Tabs>

Now that we have a private key to identify ourselves with and a Flashbots provider we can create and send a bundle. Here's an example in node.js

```js
const ethers = require('ethers.js')
const { FlashbotsBundleProvider} = require('@flashbots/ethers-provider-bundle')
const provider = new ethers.providers.JsonRpcProvider({ url: ETHEREUM_RPC_URL })

const authSigner = new ethers.Wallet('0x2000000000000000000000000000000000000000000000000000000000000000')
const flashbotsProvider = await FlashbotsBundleProvider.create(provider, authSigner)

const signedBundle = await flashbotsProvider.signBundle([
            {
                signer: SOME_SIGNER_TO_SEND_FROM,
                transaction: SOME_TRANSACTION_TO_SEND
            }
        ])

const bundleReceipt = await flashbotsProvider.sendRawBundle(signedBundle, TARGET_BLOCK_NUMBER)
```

That's it!

### Next steps

Congrats! You should now have everything you need to start sending transactions to the Flashbots network.

- If you are looking to interact with the Flashbots Relay without using one of the libraries, check out the [RPC endpoint documentation](/flashbots-auction/searchers/advanced/rpc-endpoint) and other advanced concepts.
- For examples of advanced usage of Flashbots, check out the [example searchers](/flashbots-auction/searchers/example-searchers/simple-arbitrage-bot)
- For additional tools, check out the [searcher libraries](/flashbots-auction/searchers/libraries/ethers-js-provider)
