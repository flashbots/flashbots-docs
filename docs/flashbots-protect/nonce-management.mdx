---
title: Nonce Management
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Normally, a wallet can call `eth_getTransactionCount` to get the next nonce to use for a transaction.
However, since transactions sent to Flashbots Protect are potentially sensitive, even exposing the incremented nonce can leak information about the user's activity.

As such, transactions sent to Flashbots Protect are only included in the `eth_getTransactionCount` results when querying the `"pending"` nonce, and only if the request is signed by the user's private key.

This is done by sending a JSON-RPC request to the Flashbots Protect RPC endpoint with the following parameters:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_getTransactionCount",
  "params": [
    "0xYOUR_ADDRESS",
    "pending"
  ],
  "id": 1
}
```

The request is then signed and the signature is included in the `X-Flashbots-Signature` header. Without such a signature, the returned nonce will only include transactions sent to the public mempool.

### Authentication

To authenticate your request, sign the payload and include the signed payload in the `X-Flashbots-Signature` header of your request.

```curl
curl -X POST -H "Content-Type: application/json" -H "X-Flashbots-Signature: <public key address>:<signature>" --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0xYOUR_ADDRESS","pending"],"id":1}' https://rpc.flashbots.net
```

The private key of the address your want to query must be used to sign the payload.

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
import {Wallet, utils} from 'ethers';

const privateKey = '0x1234';
const wallet = new Wallet(privateKey);
const body =
  '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0xYOUR_ADDRESS","pending"],"id":1}';
const signature = wallet.address + ':' + wallet.signMessage(utils.id(body));
```

</TabItem>
<TabItem value="web3.py">

```py
from web3 import Web3
from eth_account import Account, messages

body = '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0xYOUR_ADDRESS","pending"],"id":1}'
message = messages.encode_defunct(text=Web3.keccak(text=body).hex())
signature = Account.from_key(private_key).address + ':' + Account.sign_message(message, private_key).signature.hex()
```

</TabItem>
<TabItem value="go">

```go
body := `{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0xYOUR_ADDRESS","pending"],"id":1}`
hashedBody := crypto.Keccak256Hash([]byte(body)).Hex()
sig, err := crypto.Sign(accounts.TextHash([]byte(hashedBody)), privKey)
signature := crypto.PubkeyToAddress(privKey.PublicKey).Hex() + ":" + hexutil.Encode(sig)
```

</TabItem>
</Tabs>

