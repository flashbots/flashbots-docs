---
title: MEV Geth Demo
---

Launches an MEV GETH node, and shows how a miner may profit from it by accepting MEV
bundles either via direct `block.coinbase` smart contract "bribes", or with extra transactions that pay
the block's coinbase if it's known ahead of time.

## Quickstart

```
git clone https://github.com/flashbots/mev-geth
cd mev-geth && make geth && cd ..
git clone https://github.com/flashbots/mev-geth-demo
cd mev-geth-demo
yarn
GETH=../mev-geth/build/bin/geth ./run.sh
yarn run demo-simple
yarn run demo-contract
```

## Bundle Submission

### Direct miner transfer

```javascript
import { ethers } from 'ethers'
import { FlashbotsBundleProvider } from "ethers-flashbots";

// create the base provider
let base = new ethers.providers.JsonRpcProvider("http://localhost:8545")
// wrap it with the mev-geth provider, the Flashbots MEV-GETH node can be on a different host/port
let provider = new FlashbotsBundleProvider(base, "http://mev-geth-api.com")

const user = ethers.Wallet.createRandom().connect(provider)
const nonce = await user.getTransactionCount()

const COINBASE_ADDRESS = "0x2222222222222222222222222222222222222222"
const bribe = ethers.utils.parseEther('0.042')
const txs = [
    {
        signer: user,
        transaction: {
            to: "0x1111111111111111111111111111111111111111",
            value: ethers.utils.parseEther('0.1'),
            nonce: nonce,
        },
    },
    {
        signer: user,
        transaction: {
            // The coinbase address of the mining pool of your choice
            to: COINBASE_ADDRESS,
            value: bribe,
            nonce: nonce + 1,
        }
    },
]

const blk = await provider.getBlockNumber()
// `result` contains the tx hashes for all txs in the bundle
const result = await provider.sendBundle(txs, blk + 1);
await result.wait()
```

### Contract Transfer

```javascript
import { ethers } from 'ethers'
import { FlashbotsBundleProvider } from "ethers-flashbots";

// create the base provider
let base = new ethers.providers.JsonRpcProvider("http://localhost:8545")
// wrap it with the mev-geth provider, the Flashbots MEV-GETH node can be on a different host/port
let provider = new FlashbotsBundleProvider(base, "http://mev-geth-api.com")
const user = ethers.Wallet.createRandom().connect(provider)

// We assume the following contract is deployed:
// 
// contract Bribe {
//     function bribe() payable public {
//         // do whatever else you want here.
//         block.coinbase.transfer(msg.value);
//   }
// }
const ADDRESS = "0x1111111111111111111111111111111111111111"
const ABI = ["function bribe() payable"]
const contract = new ethers.Contract(ADDRESS, ABI, user)

const txs = [
  {
      signer: user,
      transaction: await contract.populateTransaction.bribe({
        value: ethers.utils.parseEther("0.216321768999"),
      })
  },
];

const blk = await provider.getBlockNumber()
// `result` contains the tx hashes for all txs in the bundle
const result = await provider.sendBundle(txs, blk + 1);
await result.wait()
```

## Expected Outputs

The scripts should give you the following outputs (re-run if they fail, the test may be flaky due to timing):

### Simple

```
yarn run demo-simple
yarn run v1.22.4
$ ts-node scripts/demo.ts
Faucet 0xd912AeCb07E9F4e1eA8E6b4779e7Fb6Aa1c3e4D8
Funding account...this may take a while due to DAG generation in the PoW testnet
OK
Balance: 1000000000000000000
Submitting bundle
null
{
  minimumNonceByAccount: { '0x203f54b5F444552447aC71e26EB5AC3f5e3dfaC9': 1 }
}
blockNumber: 16
blockNumber: 17
blockNumber: 18
blockNumber: 19
blockNumber: 20
blockNumber: 21
Bundle mined
Transaction mined {
  to: '0xd912AeCb07E9F4e1eA8E6b4779e7Fb6Aa1c3e4D8',
  from: '0x203f54b5F444552447aC71e26EB5AC3f5e3dfaC9',
  contractAddress: null,
  transactionIndex: 1,
  gasUsed: BigNumber { _hex: '0x5208', _isBigNumber: true },
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  blockHash: '0x746e55600e4c8e99d086c9437a2029ddb5977c386cc9638de1e7734fe932108c',
  transactionHash: '0x2d78109fb01f205685049c5870d5ff5ccc3e7059757cc31a113ae23d5a0e692a',
  logs: [],
  blockNumber: 17,
  confirmations: 10,
  cumulativeGasUsed: BigNumber { _hex: '0xa410', _isBigNumber: true },
  status: 1,
  byzantium: true
}
Miner before 1031000000000000000000
Miner after 1033066666666660000000
Profit (ETH) 0.06666666666
Profit equals bribe? true
✨  Done in 15.48s.
```

### Contract

```
yarn run demo-contract                                                    <<<
yarn run v1.22.4
$ ts-node scripts/contract-bribe-demo.ts
Funding account...this may take a while due to DAG generation in the PoW testnet
Deploying bribe contract...
Deployed at: 0x8A7946D23E5096E8d7C81327d4608454B9c5CF8b
Submitting bundle
null
{
  minimumNonceByAccount: { '0x23C9f032F8763a884e6ce6df838ebf5aEdc4B236': 1 }
}
blockNumber: 90
blockNumber: 91
blockNumber: 92
blockNumber: 93
blockNumber: 94
Bundle mined
Transaction mined {
  to: '0x8A7946D23E5096E8d7C81327d4608454B9c5CF8b',
  from: '0x23C9f032F8763a884e6ce6df838ebf5aEdc4B236',
  contractAddress: null,
  transactionIndex: 0,
  gasUsed: BigNumber { _hex: '0x70c8', _isBigNumber: true },
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  blockHash: '0x4e9a4c65b650dafaf4fb11856bbc6b74eb1050cba719d7a6d50518429035feb8',
  transactionHash: '0x7f9f615ec4dd49131d9d7722b036c7d7bf506983138e063a762a656b7e4c4346',
  logs: [],
  blockNumber: 91,
  confirmations: 9,
  cumulativeGasUsed: BigNumber { _hex: '0x70c8', _isBigNumber: true },
  status: 1,
  byzantium: true
}
Miner before 1177066666666660000000
Miner after 1179282988435659000000
Profit (ETH) 0.216321768999
Profit equals bribe? true
✨  Done in 24.23s.
```
