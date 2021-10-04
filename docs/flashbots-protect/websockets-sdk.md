---
title: Websockets SDK
---
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

```Parameters json_schema
{
  "type": "object",
  "properties": {
    "block": {
      "type": "number",
      "description": "The block number in which the fees were calculated"
    },
    "baseFeePerGas": {
      "type": "string",
      "description": "BigNumberish: hex string. The baseFeePerGas for the block"
    },
    "default": {
      "type": "object",
      "properties": {
        "maxFeePerGas": {
          "type": "string"
        },
        "maxPriorityFeePerGas": {
          "type": "string"
        }
      },
      "description": "The default recommended fee"
    },
    "low": {
      "type": "object",
      "properties": {
        "maxFeePerGas": {
          "type": "string"
        },
        "maxPriorityFeePerGas": {
          "type": "string"
        }
      },
      "description": "The low recommended fee"
    },
    "med": {
      "type": "object",
      "properties": {
        "maxFeePerGas": {
          "type": "string"
        },
        "maxPriorityFeePerGas": {
          "type": "string"
        }
      },
      "description": "The medium recommended fee"
    },
    "high": {
      "type": "object",
      "properties": {
        "maxFeePerGas": {
          "type": "string"
        },
        "maxPriorityFeePerGas": {
          "type": "string"
        }
      },
      "description": "The high recommended fee"
    }
  }
}
```

### BundleReq {}

```Parameters json_schema
{
  "type": "object",
  "properties": {
    "transactions": {
      "type": "array",
      "description": "Array of signed serialized raw transactions. See docs for signing transactions."
    }
  }
}
```

### BundleResApi {}

```Parameters json_schema
{
  "type": "object",
  "properties": {
    "bundle": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "transactions": {
          "type": "array"
        }
      },
      "description": "Bundle object with an identifier and an array of transactions"
    },
    "status": {
      "type": "string",
      "description": "Status enum"
    },
    "message": {
      "type": "string",
    },
    "error": {
      "type": "string",
    }
  }
}
```

### Err {}

```Parameters json_schema
{
  "type": "object",
  "properties": {
    "event": {
      "type": "object",
      "description": "Event enum"
    }
  }
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
