---
title: WebSockets
---

The WebSockets integration of the Flashbots Protect API is built for Web3 Javascript/Typescript frontends. Frontend clients can use the `socket.io-client` library to send transactions, cancel transactions, retrieve transaction status updates, and retrieve recommeneded fees (optional).

As a part of this guide we assume you are familiar with WebSockets and the Socket.io client API. To learn more about implementing a WebSockets client with Socket.io, checkout this link [Socket.io Client API Docs](https://socket.io/docs/v4/client-api/)

Alternatively, the mistX team at Alchemist has provided an easy to use WebSockets SDK that interfaces with the Flashbots Protect API. [Learn more about the WebSockets SDK by mistX](https://docs.mistx.io/docs/mistx/ZG9jOjIyNDQ2MDk-websockets-sdk)

## Endpoints

**Staging**:

- Current version: v1.8.0
- `wss://protection-staging.flashbots.net/v1/ws`
- `https://protection-staging.flashbots.net`

**Production**:

- Current version: v1.8.0
- `wss://protection.flashbots.net/v1/ws`
- `https://protection.flashbots.net`

## Installation

```json
npm i --save socket.io-client
```

## Interfaces & Enums

The Interfaces and Enums used throughout this documentation.

```typescript

// Event names sent and received by the client
export enum Event {

  // Sent by the WebSocket client.
  BUNDLE_REQUEST = 'BUNDLE_REQUEST',
  BUNDLE_STATUS_REQUEST = 'BUNDLE_STATUS_REQUEST',
  BUNDLE_CANCEL_REQUEST = 'BUNDLE_CANCEL_REQUEST',

  // Received by the WebSocket client.
  FEES_CHANGE = 'FEES_CHANGE',
  SOCKET_SESSION = 'SOCKET_SESSION',
  SOCKET_ERR = 'SOCKET_ERR',
  BUNDLE_RESPONSE = 'BUNDLE_RESPONSE'

}

// Used to derive the Status of a Transaction
export enum Status {
  PENDING_BUNDLE = 'PENDING_BUNDLE',
  FAILED_BUNDLE = 'FAILED_BUNDLE',
  SUCCESSFUL_BUNDLE = 'SUCCESSFUL_BUNDLE',
  CANCEL_BUNDLE_SUCCESSFUL = 'CANCEL_BUNDLE_SUCCESSFUL',
  BUNDLE_NOT_FOUND = 'BUNDLE_NOT_FOUND'
}

// Maps events to callbacks with argument types
export interface QuoteEventsMap {
  [Event.FEES_CHANGE]: (response: Fees) => void
  [Event.SOCKET_SESSION]: (response: SocketSession) => void
  [Event.SOCKET_ERR]: (err: any) => void
  [Event.BUNDLE_RESPONSE]: (response: BundleRes) => void
  [Event.BUNDLE_REQUEST]: (response: any) => void
  [Event.BUNDLE_CANCEL_REQUEST]: (serialized: any) => void
  [Event.BUNDLE_STATUS_REQUEST]: (serialized: any) => void
}

// Session payload, used to provide a token for session affinity.
export interface SocketSession {
  token: string
}

// Transaction bundle request payload.
export interface BundleReq {
  transactions: string[]  // Array[String], A list of signed transactions
}

// Transaction bundle response payload.
export interface BundleRes {
  bundle: {
    id: string;             // NOTE: this is the Flashbots Protect bundle id
    transactions: string[]; // Array[String], A list of signed transactions
  };
  status: Status;
  message: string;
  error: string;
}

// Fees payload received by the client
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

// Error payload
export interface SocketErr {
  event: Event;
  message: string;
  data?: any;
}

```

## Initializing The Client

```typescript

import { io, Socket } from 'socket.io-client'

const defaultServerUrl = 'https://protection.flashbots.net'
const tokenKey = `SESSION_TOKEN`

// Auth token for maintaining session affinity
// On the first session this will be undefined
//
// the session token will be passed back in the SOCKET_SESSION
// and should be saved in localStorage for use in subsequent sessions
const token = localStorage.getItem(tokenKey)

const socket = Socket<QuoteEventsMap, QuoteEventsMap> = io(defaultServerUrl, {
  transports: ['websocket'], // important to only use ['websocket'] as the transports
  auth: { token },
  reconnection: true,
  reconnectionDelay: 5000,
  autoConnect: true
})

```

## Socket Session

After initializing the client, the first event received will be `Event.SOCKET_SESSION` which returns a token. Store the token in local storage and use as the `auth.token` in subseqent client initializations.

```typescript
socket.on(Event.SOCKET_SESSION, (session: SocketSession) => {
  localStorage.setItem(tokenKey, session.token)
})

```

## Sending & Receiving Bundle Events

There are three types of bundle events sent by the client, `Event.BUNDLE_REQUEST`, `Event.BUNDLE_STATUS_REQUEST`, and `Event.BUNDLE_CANCEL_REQUEST`. Only one type of bundle event is received by the client, `Event.BUNDLE_RESPONSE`. These events allow the client and Flashbots Protect API to communicate over the lifecycle of a bundle.

### Sending a bundle

`Event.BUNDLE_REQUEST` is used to send a bundle of transactions to the Flashbots Protect API. The transactions array contained in the `BundleReq` is a list of raw signed transactions. [Learn more about signing transactions](/docs/flashbots-protect/api/signing-transactions)

```typescript

const bundle: BundleReq = {
  transactions: ["0x123abc..."]
}
function emitBundleRequest(bundle: BundleReq) {
  socket.emit(Event.BUNDLE_REQUEST, bundle)
}
```

### Receiving a bundle response

Once a bundle has been sent by the client, the socket should listen for `Event.BUNDLE_RESPONSE` to receive the id of the bundle and updates when the bundle status changes.

```typescript

socket.on(Event.BUNDLE_RESPONSE, (response: BundleRes) => {
  console.log('Bundle Response')
  // The response contains a bundle id that can be used to cancel a bundle or request a status update
  console.log('Bundle ID: ', response.bundle.id)
  console.log('Bundle Status: ', response.status)
})
```

### Cancelling a bundle

The bundle id can be used to cancel a bundle using `Event.BUNDLE_CANCEL_REQUEST`. The Flashbots Protect API will attempt to cancel the bundle before it is included on-chain by a miner. Cancellation is not guaranteed as the cancellation event may be received after a miner has already included the bundle.

```typescript
const id = '0x222...f23f' // id retrieved from Event.BUNDLE_RESPONSE
function emitBundleCancellation(id: string) {
  socket.emit(Event.BUNDLE_CANCEL_REQUEST, { id })
}
```

### Manually request a bundle status

While a bundle response is provided when the status of a bundle changes, the `Event.BUNDLE_STATUS_REQUEST` can be used to manually trigger a `Event.BUNDLE_RESPONSE` to retrieve the last status of a bundle. The main usecase of this event is to provide a way of retrieving the status of a bundle which may have changed while the client was disconnected.

```typescript
const id = '0x222...f23f' // id retrieved from Event.BUNDLE_RESPONSE
function emitStatusRequest(id: string) {
  socket.emit(Event.BUNDLE_STATUS_REQUEST, { id })
}
```

## Recommended fees (optional)

To build a successful transaction, it is important to include enough fees to cover both the Ethereum **baseFee** as well as the **miner tip** (incentive for a miner to include your transaction in a block). It may be complex to estimate what the fees should be, especially when the network is heavily used and more transactions are competing with each other.

To help on that matter, the WebSockets provides an event that will send back **recommended fees**. Those have been adjusted to ensure a good chance of inclusion while avoiding overpayment. The method **eth_gasFees** will send back fees organized in three tiers, so you can choose which one fits best your use case

- **low**: lowest chance of inclusion, it will take more time to get included. Higher risk of not covering the baseFee in times of heavy traffic
- **medium**: good chance of inclusion, it will be faster to get included. Medium risk of not covering the baseFee in times of heavy traffic
- **high**: highest chance and fastest inclusion. Lowest risk of not covering the baseFee in times of heavy traffic

### Receiving fees

```typescript
socket.on(Event.FEES_CHANGE, (response: Fees) => {
  console.log('Recommended Fees: ', response)
})
```

## Errors

`Event.SOCKET_ERR` is used to listen to error events on the client. The `SocketErr` contains an event name for which the error occured as well as a message describing the error. The `SocketErr` may also contain `SocketErr.data` which included additional data pertaining to the event such as a bundle id.

```typescript
socket.on(Event.SOCKET_ERR, (err: SocketErr) => {
  console.log('Error with socket event:', err.event)
  console.log('Error message: ', err.message)
  console.log('Error data: ', err.data)
})
```
