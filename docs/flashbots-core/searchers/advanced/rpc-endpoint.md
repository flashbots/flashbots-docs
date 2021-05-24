---
title: RPC endpoint
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## How to interact directly with the Flashbots RPC endpoint
For advanced users you can send bundles to the `eth_sendBundle` RPC endpoint at `relay.flashbots.net`. 

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
<TabItem value="rust">

```rust
use secp256k1::SecretKey;
use std::convert::TryInto;
use tiny_keccak;
use tiny_keccak::Hasher;
use web3::signing::{Key, SecretKeyRef};

fn keccak256(to_hash: &[u8]) -> [u8; 32] {
    let mut hasher = tiny_keccak::Keccak::v256();
    let mut output = [0u8; 32];
    hasher.update(to_hash);
    hasher.finalize(&mut output);
    output
}

fn sign_flashbots(body: &str, private_key: &str) -> String {
    // Create a secp256k1 secret key
    let fb_sk = SecretKey::from_slice(&hex::decode(private_key).unwrap()).unwrap();
    // Create a web3 reference wrapper for the secp256k1 secret key
    let flashbots_key_rf = SecretKeyRef::new(&fb_sk);
    // EIP-191 Salt
    let eth_salt = "\x19Ethereum Signed Message:\n66".to_string();
    // Take Kekkak injecting a 0x prefix
    let digest = format!("0x{}", hex::encode(keccak256(body.as_bytes()).to_owned()));
    let digest = keccak256(&[eth_salt.as_bytes(), &digest.as_bytes()].concat()).to_owned();
    // Sign with key
    let signature = flashbots_key_rf.sign(&digest, None).unwrap();
    // Get recovery bits
    let v = signature
        .v
        .try_into()
        .expect("signature recovery in electrum notation always fits in a u8");
    // Build signature utf8 vector
    let signature_bytes = {
        let mut bytes = Vec::with_capacity(65);
        bytes.extend_from_slice(signature.r.as_bytes());
        bytes.extend_from_slice(signature.s.as_bytes());
        bytes.push(v);
        bytes
    };
    // Return hex encoded string from utf8 signature_bytes vector with 0x prefix
    format!("0x{}", hex::encode(signature_bytes))
}
```

</TabItem>

</Tabs>
