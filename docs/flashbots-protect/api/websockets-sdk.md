---
title: Websockets SDK
---

The javascript websockets SDK is a package that makes sending transactions to the Flashbots Protect API simple. Simply include the package in your Web3 frontend, initialize the socket connection, and emit transactions. See details below.

## Installation

```json
npm i --save @alchemist-coin/mistx-connect
```

## Usage

```typescript
import { MistxSocket } from '@alchemist-coin/mistx-connect'

const socket = new MistxSocket()

// init the socket connection with callbacks
const disconnect = socket.init({
  onConnect: () => {},
  onConnectError: err => {},
  onDisconnect: err => {},
  onError: err => {},
  onFeesChange: (fees: Fees) => {},
  onTransactionResponse: (response: BundleResApi) => {}
})

// emit a transaction
const bundle = {
  transactions: ['serializedRawTx']
}
socket.emitBundleRequest(bundle)

// emit a transaction cancellation
const id = 'someBundleId`
socket.emitTransactionCancellation(id)

// disconnect the socket connection
disconnect()
```

## Initialization & Callbacks

```typescript
// init the socket connection with callbacks
const disconnect = socket.init({
  onConnect: () => {},
  onConnectError: err => {},
  onDisconnect: err => {},
  onError: err => {},
  onFeesChange: (fees: Fees) => {},
  onTransactionResponse: (response: BundleResApi) => {}
})
```

### onConnect: () => {}

Called on socket connection.

### onConnectError: err => {}

Called on socket connection error.

### onDisconnect: err => {}

Called on socket disconnect.

### onError: err => {}

Called when there is a socket error with `socket.emitBundleRequest()` or `socket.emitTransactionCancellation`

### onFeesChange: (fees: Fees) => {}

Called when the recommended network fees change

### onTransactionResponse: (response: BundleResApi) => {}

Called when a transaction is successful, failed, or cancelled

## Methods

### emitBundleRequest(bundle: BundleReq)

Method used to emit a transaction

``` typescript
const bundle: BundleReq = { transactions: ['serializedRawTx'] }
socket.emitBundleRequest(bundle)
```

### emitTransactionCancellation(id)

Method used to cancel an transaction

``` typescript
// the id is derived from the BundleResApi.bundle.id received 
// from the onTransactionResponse callback

const id = 'someBundleId`
socket.emitTransactionCancellation(id)
```

## Interfaces

### Fees {}

```typescript
export interface Fee {
  maxFeePerGas: BigNumberish
  maxPriorityFeePerGas: BigNumberish
}
export interface Fees {
  block: number
  baseFeePerGas: BigNumberish
  default: Fee
  low: Fee
  med: Fee
  high: Fee
}
```

### BundleReq {}

```typescript
export interface BundleReq {
  transactions: string[]
}
```

### BundleResApi {}

```typescript
export interface BundleResApi {
  bundle: {
    id: string;
    transactions: string[];
  };
  status: string;
  message: string;
  error: string;
}
```

### Err {}

```typescript
export interface err {
  event: Event
}
```

## Enums

### Event

``` typescript
enum Event {
    FEES_CHANGE = "FEES_CHANGE",
    SOCKET_ERR = "SOCKET_ERR",
    BUNDLE_REQUEST = "BUNDLE_REQUEST",
    BUNDLE_STATUS_REQUEST = "BUNDLE_STATUS_REQUEST",
    BUNDLE_RESPONSE = "BUNDLE_RESPONSE",
    BUNDLE_CANCEL_REQUEST = "BUNDLE_CANCEL_REQUEST"
}
```

### Status

``` typescript
enum Status {
    PENDING_BUNDLE = "PENDING_BUNDLE",
    FAILED_BUNDLE = "FAILED_BUNDLE",
    SUCCESSFUL_BUNDLE = "SUCCESSFUL_BUNDLE",
    CANCEL_BUNDLE_SUCCESSFUL = "CANCEL_BUNDLE_SUCCESSFUL",
    BUNDLE_NOT_FOUND = "BUNDLE_NOT_FOUND"
}
```