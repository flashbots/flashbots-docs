---
title: quick start
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


This quickstart guide contains all the information necessary to get up and running as a searcher on Flashbots Core. If you have any questions, do not hesitate to ask in the [#searchers discord channel](https://discord.gg/GezzK33W).

See you on-chain! ⚡🤖

### Who should use Flashbots Core?
1. Ethereum bot operators looking for fast, and risk free access to blockspace (for example, arbitrage and liquidation bots)
2. Ethereum users looking for frontrunning protection on their transactions (for example, Uniswap traders)
3. Ethereum Dapps with advanced use cases like account abstraction or gasless transactions (for example, tornado.cash and mistX)

### How to send your first private transaction

// todo //

### How to send your first Flashbots bundle
To access the Flashbots network, you must craft a valid Flashbots bundle and send it to the `eth_sendBundle` RPC endpoint at `relay.flashbots.net`.

The `eth_sendBundle` RPC has the following payload format:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "eth_sendBundle",
  "params": [
    {
      txs,               // Array[String], A list of signed transactions to execute in an atomic bundle
      blockNumber,       // String, a hex encoded block number for which this bundle is valid on
      minTimestamp,      // (Optional) Number, the minimum timestamp for which this bundle is valid, in seconds since the unix epoch
      maxTimestamp,      // (Optional) Number, the maximum timestamp for which this bundle is valid, in seconds since the unix epoch
      revertingTxHashes, // (Optional) Array[String], A list of tx hashes that are allowed to revert 
    }
  ]
}
```

To authenticate your request, the relay requires you sign the payload and include the signed payload in the `X-Flashbots-Signature` header of your request.

```curl
curl -X POST -H "X-Flashbots-Signature: 0x1234:0xabcd" --data '{"jsonrpc":"2.0","method":"eth_sendBundle","params":[{see above}],"id":1}' https://relay.flashbots.net
```

Any valid Ethereum key can be used to sign the payload. The Ethereum address associated with this key will be used by the relay to keep track of your requests over time and provide user statistics. You can change the key you use at any time.

The signature is calculated by taking the [EIP-191](https://eips.ethereum.org/EIPS/eip-191) hash of the json body encoded as UTF-8 bytes. Here's an example using ethers.js:

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
import { Wallet, utils } from 'ethers'

const privateKey = '0x1234'
const wallet = new Wallet(privateKey)
const body = '{"jsonrpc":"2.0","method":"eth_sendBundle","params":[{see above}],"id":1}'
const signature = wallet.address + ':' + wallet.signMessage(utils.id(body))
```

</TabItem>
<TabItem value="web3.py">

```py
from web3 import Web3
from eth_account import Account, messages

body = '{"jsonrpc":"2.0","method":"eth_sendBundle","params":[{see above}],"id":1}'
message = messages.encode_defunct(text=Web3.keccak(text=body).hex())
signature = Account.from_key(private_key).address + ':' + Account.sign_message(message, private_key)
```

</TabItem>
<TabItem value="go">

```go
body := `{"jsonrpc":"2.0","method":"eth_sendBundle","params":[{see above}],"id":1}`
hashedBody := crypto.Keccak256Hash([]byte(body)).Hex()
sig, err := crypto.Sign(crypto.Keccak256([]byte("\x19Ethereum Signed Message:\n"+strconv.Itoa(len(hashedBody))+hashedBody)), pk)
signature := addr.Hex() + ":" + hexutil.Encode(sig)
```

</TabItem>
</Tabs>

### How to send your first zero gas transaction

// todo //

### Next steps

Congrats! You should now have everything you need to start sending transactions to the Flashbots network.

For examples of advanced usage of Flashbots, check out the [example searchers](/flashbots-core/searchers/example-searchers/simple-arbitrage-bot)

For additional tools, check out the [searcher libraries](/flashbots-core/searchers/searcher-libraries/ethers-js-provider)