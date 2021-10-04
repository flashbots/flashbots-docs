---
title: Signing Transactions
---

To use the Flashbots Protect API you must submit signed transactions. The Protect API then submits those transactions as bundles to Flashbots for inclusion on-chain. If you are building a user facing application the flow for generating signed transactions is different from how you usually prompt users to execute transations. In particular, we use `eth_sign` or `eth_signTransaction`, depending on the wallet (more on that below) to build signed transactions that are then submitted in a `BundleReq` object to the Flashbots Protect API websocket.

As a part of this guide we assume you know what digital signatures are and why they are a key part of blockchains. To learn more about digital signatures, check out this article by MyCrypto, [The Magic of Digital Signatures on Ethereum](https://medium.com/mycrypto/the-magic-of-digital-signatures-on-ethereum-98fe184dc9c7).

> All examples use ethers.js and/or web3-react

---

## Signing Methods

### eth_sign

eth_sign is an arbitrary signing method and can be used when signing transactions for metamask. After a signature is returned from eth_sign, the signed transaction can be created with the user's signature and populate transaction object.

***Parameters:***

address - The address to be signed with.

message - hashed serialized transaction

***Returns:***

result - The signature

Example:

```javascript
const signature = await library.jsonRpcFetchFunc('eth_sign', [account, hash])
const signedTx = ethers.utils.serializeTransaction(populatedTx, signature)
```

***Supported Wallets:***

- MetaMask
  
> **If you are using web3-react**: You must set `library.provider.isMetamask = false` before signing

---

### eth_signTransaction

eth_signTransaction signs a transaction that can be submitted to the network later. If the user is connected with Metamask, eth_sign must be used as Metamask does not currently support eth_signTransaction.

***Parameters:***

object - The transaction object.

- from - The address the transaction is sent from.

- to - The address the transaction is directed to.

- gas - HexString of the gas provided for the transaction execution.

- gasLimit - HexString of the gas provided for the transaction execution.

- gasPrice - HexString of the gasPrice used for each paid gas, in Wei.

- value - HexStirng of the value sent with this transaction, in Wei.

- data - the hash of the invoked method signature and encoded parameters.

- nonce - Integer of a nonce.

***Returns:***

result - The signed transaction object.

Example:

```typescript
const signedTxRes: SignedTransactionResponse = await library.jsonRpcFetchFunc(
  'eth_signTransaction',
  [
    {
      from,
      to,
      gas, // same as gasLimit
      gasLimit, // same as gas
      maxFeePerGas, // max base fee per gas,
      maxPriorityFeePerGas: '0x0',
      nonce,
      value, // can be '0x0'
    }
  ]
)

const signedTx = signedTxRes.raw
```

***Supported Wallets:***

- Ledger

---

## Examples

### Prepare a Signed Transaction & Submit Bundle with mistx-connect

```typescript
import { Contract } from '@ethersproject/contracts'
import { Router } from '@alchemist-coin/mistx-core';
import { TransactionReq, SwapReq, emitTransactionRequest, BundleReq } from '@alchemist-coin/mistx-connect'
import { formatUnits } from 'ethers/lib/utils'
import { abi as MISTX_ROUTER_ABI } from './mistx-router-abi.json'

const { account, chainId, library } = useActiveWeb3React()
const MISTX_DEFAULT_GAS_LIMIT = 375000 // enough gas to cover most (>90%) swaps
const CURRENT_BASE_FEE = 
const mistXRouterAddress = '0xA58f22e0766B3764376c92915BA545d583c19DBc' // Uni v2 - Mainnet
const contract = new Contract(
  address,
  MISTX_ROUTER_ABI,
  account ? getSigner(library, account) : library
)

const { methodName, args, value } = Router.swapCallParameters(trade, {
  feeOnTransfer: false,
  allowedSlippage: new Percent(JSBI.BigInt(100), BIPS_BASE), // 1%
  recipient: account, // account or recipient address
  ttl: 5 * 60, // 5 minutes (seconds)
})
const maxBaseFeePerGas = BigNumber.from(CURRENT_BASE_FEE * (1.125**4)) // 

if (!(contract.signer instanceof JsonRpcSigner)) {
  throw new Error(`Cannot sign transactions with this wallet type`)
}

let web3Provider: Web3Provider | undefined
let isMetamask: boolean | undefined

try {
  const signedApproval = await approve() // only required for token->token and token->eth

  // ethers will change eth_sign to personal_sign if it detects metamask
  if (library instanceof Web3Provider) {
    web3Provider = library as Web3Provider
    isMetamask = web3Provider.provider.isMetaMask
    web3Provider.provider.isMetaMask = false
  }

  try {
    const nonce =
      signedApproval === undefined
        ? await contract.signer.getTransactionCount()
        : await contract.signer.getTransactionCount().then(nonce => {
            return nonce + 1
          })
    const populatedTx: PopulatedTransaction = await contract.populateTransaction[methodName](...args, {
      //modify nonce if we also have an approval
      nonce: nonce,
      gasLimit: BigNumber.from(MISTX_DEFAULT_GAS_LIMIT),
      type: 2, // eip-1559
      maxFeePerGas: maxBaseFeePerGas, // max base fee in wei. recommend current base fee * (1.25^4)
      maxPriorityFeePerGas: '0x0',
      ...(value && !isZero(value) ? { value } : { value: '0x0' })
    })

    // delete for serialize necessary
    populatedTx.chainId = chainId
    // HANDLE METAMASK
    // MetaMask does not support eth_signTransaction so we must use eth_sign as a workaround.
    // For other wallets, use eth_signTransaction
    let signedTx
    if (isMetamask) {
      delete populatedTx.from
      const serialized = ethers.utils.serializeTransaction(populatedTx)
      const hash = keccak256(serialized)
      const signature: SignatureLike = await library.jsonRpcFetchFunc('eth_sign', [account, hash])
      // this returns the transaction & signature serialized and ready to broadcast
      signedTx = ethers.utils.serializeTransaction(populatedTx, signature)
    } else {
      const payload = [
        {
          ...populatedTx,
          chainId: undefined,
          gas: `0x${populatedTx.gasLimit?.toNumber().toString(16)}`,
          gasLimit: `0x${populatedTx.gasLimit?.toNumber().toString(16)}`,
          maxFeePerGas: `0x${populatedTx.maxFeePerGas?.toNumber().toString(18)}`,
          maxPriorityFeePerGas: '0x0',
          nonce: `0x${populatedTx.nonce?.toString(16)}`,
          ...(value && !isZero(value) ? { value } : { value: '0x0' })
        }
      ]
      const signedTxRes: SignedTransactionResponse = await library.jsonRpcFetchFunc(
        'eth_signTransaction',
        payload
      )
      signedTx = signedTxRes.raw
    }

    // Set isMetaMask again after signing. (workaround for an issue with isMetaMask set on the provider during signing)
    if (web3Provider) {
      web3Provider.provider.isMetaMask = isMetamask
    }

    const minerBribeBN = BigNumber.from(args[1])
    const totalFees = minerBribeBN
    const estimatedEffectiveGasPriceBn = totalFees.div(BigNumber.from(YOUR_TRADE_ESTIMATED_GAS_PRICE))
    const estimatedEffectiveGasPrice = Number(formatUnits(estimatedEffectiveGasPriceBn, 'gwei'))
    const swapReq: SwapReq = {
      amount0: args[0][0] as string,
      amount1: args[0][1] as string,
      path: args[0][2] as string[],
      to: args[0][3] as string
    }

    // Create the transaction body with the serialized tx
    const transactionReq: TransactionReq = {
      estimatedGas: Number(trade.estimatedGas),
      estimatedEffectiveGasPrice,
      serialized: signedTx,
      raw: swapReq
    }

    // Create the transactions array with the serialized tx object
    const transactions: TransactionReq[] = [transactionReq]

    // Check if there is a signed approval with this tx
    // (token -> eth & token -> token transactions require signed approval)
    if (signedApproval) {
      // if there is an approval, create the Approval tx object
      const signedTransactionApproval: TransactionReq = {
        estimatedGas: 25000,
        estimatedEffectiveGasPrice: 0,
        serialized: signedApproval,
        raw: undefined
      }
      // Add the approval to the transactions array
      transactions.unshift(signedTransactionApproval) // signed approval first
    }

    // Create the bundle request object
    const bundleReq: BundleReq = {
      transactions,
      chainId,
      bribe: args[1],
      from: account,
      deadline: BigNumber.from(Math.floor(Date.now() / 1000))
        .add(deadline)
        .toHexString(),
      simulateOnly: false
    }

    // emit transaction request socket event
    emitBundleRequest(bundleReq)
  } catch (error) {
    // if the user rejected the tx, pass this along
    if (error?.code === 4001) {
      throw new Error('Transaction rejected.')
    } else {
      // otherwise, the error was unexpected and we need to convey that
      throw new Error(`Swap failed: ${error.message}`)
    }
  }
} catch (error) {
  // Set isMetaMask again after signing. (workaround for an issue with isMetaMask set on the provider during signing)
  if (web3Provider && isMetamask) {
    web3Provider.provider.isMetaMask = isMetamask
  }
  throw new Error(`Approval Failed: ${error.message}`)
}
```

---

## Signed Approvals

`Token -> Token` and `Token -> ETH` swaps require an additional signed approval by the user. When creating the bundle in this case, two transactions are sent, with the signed approval first.

```typescript
// BundleReq
{
  transactions: [approvalTxReq, txReq], // [txReq] for ETH -> Token transactions
  ...
}
```