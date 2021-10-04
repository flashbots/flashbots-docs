---
title: JSON RPC
---
mistX exposes a [JSON-RPC](https://www.jsonrpc.org/specification) protocol to send transactions/bundles, get transaction status updates, cancel transactions, and retrieve ETH network gas fees.

## Endpoints

### Staging

- Current version: v1.8.0
- `https://protection-staging.flashbots.net/v1/rpc`

**Production**:

- Current version: v1.8.0
- `https://protection.flashbots.net/v1/rpc`

## How it works

### Sending a bundle

1. send a bundle using **eth_sendRawTransaction**, the response will include a bundle ID
2. use the bundle ID to regularly query the status of the bundle using **eth_getBundleStatusById**
3. the status can be either
    - **PENDING_BUNDLE**: the bundle is in progess, being sent to miners via flashbots for inclusion
    - **FAILED_BUNDLE**: the bundle has not been included. The reason will be shown in the response error message
    - **SUCCESSFUL_BUNDLE**: the bundle has been included by a miner

### Sending and canceling a bundle in progress

1. send a bundle using eth_sendRawTransaction, the response will include a bundle ID
2. use the bundle ID to regularly cancel the bundle using **eth_cancelBundleById**
3. use the bundle ID to regularly query the status of the bundle using **eth_getBundleStatusById**
4. the status can be either
    - any of the above statuses
    - **CANCEL_BUNDLE_SUCCESSFUL**: the bundle was canceled successfully

### Recommended fees (optional)

To build a successful transaction, it is important to include enough fees to cover both the Ethereum **baseFee** as well as the **miner tip** (incentive for a miner to include your transaction in a block). It may be complex to estimate what the fees should be, especially when the network is heavily used and more transactions are competing with each other.

To help on that matter, the API provides a method that will send back **mistX recommended fees**. Those have been adjusted to ensure a good chance of inclusion while minimizing the miner payment to avoid overpayment. The method **eth_gasFees** will send back fees organized in three tiers, so you can choose which one fits best your use case

- **low**: lowest chance of inclusion, it will take more time to get included. Higher risk of not covering the baseFee in times of heavy traffic
- **medium**: good chance of inclusion, it will be faster to get included. Medium risk of not covering the baseFee in times of heavy traffic
- **high**: highest chance and fastest inclusion. Lowest risk of not covering the baseFee in times of heavy traffic

## Methods

### eth_sendRawTransaction

Creates new message call transaction or a contract creation for signed transactions.

```Parameters json_schema
{
  "type": "object",
  "properties": {
    "method": {
      "type": "string",
      "default": "eth_sendRawTransaction",
      "description": "Method name"
    },
    "id": {
      "type": "integer",
      "default": 1,
      "format": "int32",
      "description": "Request ID"
    },
    "jsonrpc": {
      "type": "string",
      "default": "2.0",
      "description": "JSON-RPC Version (2.0)"
    },
    "params": {
      "title": "Parameters",
      "description": "Array of serialized raw transaction",
      "type": "array",
      "items": {
        "type": "string",
        "pattern": "^0x([a-fA-F0-9]?)+$",
      }
    }
  }
}
```

```Response json_schema
{
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "default": 1,
      "format": "int32",
      "description": "Request ID"
    },
    "jsonrpc": {
      "type": "string",
      "default": "2.0",
      "description": "JSON-RPC Version (2.0)"
    },
    "result": {
      "title": "Parameters",
      "description": "Reference id for bundle containing the transaction",
      "type": "string",
      "pattern": "^0x[a-fA-F\\d]{64}(-[\\d])?$",
    }
  }
}
```

```Example http
{
  "method": "post",
  "body": {
    "method": "eth_sendRawTransaction",
    "id": 1,
    "jsonrpc": "2.0",
    "params": ["0x02f901b60181a88085142678bbe48305b8d894a58f22e0766b3764376c92915ba545d583c19dbc870e35fa931a0000b90144982ea02000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000001916ad623cbd9000000000000000000000000000000000000000000000000000e35fa931a0000000000000000000000000000000000000000000000000000017160b5b1a44cac00000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000d849ebe3855fd7db8d45873cae010233f50e290400000000000000000000000000000000000000000000000000000000613ca39b0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc200000000000000000000000088acdd2a6425c3faae4bc9650fd7e27e0bebb7abc080a0d5b572525def045409d488f2ab0023a06971c499720dce413ce07f581129f620a07d671e3e51441831db4a350c47a62bea0ec8d53c418c8ebab7e0e244add4a42a"]
  },
  "url": "https://protection-staging.flashbots.net/v1/rpc"
}
```

### eth_getBundleStatusById

Get the status of a bundle

```Parameters json_schema
{
  "type": "object",
  "properties": {
    "method": {
      "type": "string",
      "default": "eth_getBundleStatusById",
      "description": "Method name"
    },
    "id": {
      "type": "integer",
      "default": 1,
      "format": "int32",
      "description": "Request ID"
    },
    "jsonrpc": {
      "type": "string",
      "default": "2.0",
      "description": "JSON-RPC Version (2.0)"
    },
    "params": {
      "title": "Parameters",
      "description": "Array containing one bundle id",
      "type": "array",
      "items": {
        "type": "string",
        "pattern": "^0x[a-fA-F\\d]{64}(-[\\d])?$",
      }
    }
  }
}
```

```Response json_schema
{
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "default": 1,
      "format": "int32",
      "description": "Request ID"
    },
    "jsonrpc": {
      "type": "string",
      "default": "2.0",
      "description": "JSON-RPC Version (2.0)"
    },
    "result": {
      "title": "Parameters",
      "type": "object",
      "properties": {
        "status": {
          "type": "string"
        },
        "error": {
          "type": "string"
        },
        "message": {
          "type": "string"
        },
        "id": {
          "type": "string"
        }
      }
    }
  }
}
```

```Example http
{
  "method": "post",
  "body": {
    "method": "eth_getBundleStatusById",
    "id": 1,
    "jsonrpc": "2.0",
    "params": ["0xe88b39741cb18885c3365ad908077740d3b85644c60daec6123becf47617a761"]
  },
  "url": "https://protection-staging.flashbots.net/v1/rpc"
}
```

### eth_cancelBundleById

Cancel a bundle

```Parameters json_schema
{
  "type": "object",
  "properties": {
    "method": {
      "type": "string",
      "default": "eth_cancelBundleById",
      "description": "Method name"
    },
    "id": {
      "type": "integer",
      "default": 1,
      "format": "int32",
      "description": "Request ID"
    },
    "jsonrpc": {
      "type": "string",
      "default": "2.0",
      "description": "JSON-RPC Version (2.0)"
    },
    "params": {
      "title": "Parameters",
      "description": "Array containing one bundle id",
      "type": "array",
      "items": {
        "type": "string",
        "pattern": "^0x[a-fA-F\\d]{64}(-[\\d])?$",
      }
    }
  }
}
```

```Response json_schema
{
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "default": 1,
      "format": "int32",
      "description": "Request ID"
    },
    "jsonrpc": {
      "type": "string",
      "default": "2.0",
      "description": "JSON-RPC Version (2.0)"
    },
    "result": {
      "title": "Parameters",
      "type": "boolean",
    }
  }
}
```

```Example http
{
  "method": "post",
  "body": {
    "method": "eth_cancelBundleById",
    "id": 1,
    "jsonrpc": "2.0",
    "params": ["0xe88b39741cb18885c3365ad908077740d3b85644c60daec6123becf47617a761"]
  },
  "url": "https://protection-staging.flashbots.net/v1/rpc"
}
```

### eth_gasFees

Get current gas fees

```Parameters json_schema
{
  "type": "object",
  "properties": {
    "method": {
      "type": "string",
      "default": "eth_gasFees",
      "description": "Method name"
    },
    "id": {
      "type": "integer",
      "default": 1,
      "format": "int32",
      "description": "Request ID"
    },
    "jsonrpc": {
      "type": "string",
      "default": "2.0",
      "description": "JSON-RPC Version (2.0)"
    },
    "params": {
      "title": "Parameters",
      "description": "Empty array",
      "type": "array",
      "minItems": 0,
      "maxItems": 0
    }
  }
}
```

```Response json_schema
{
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "default": 1,
      "format": "int32",
      "description": "Request ID"
    },
    "jsonrpc": {
      "type": "string",
      "default": "2.0",
      "description": "JSON-RPC Version (2.0)"
    },
    "result": {
      "title": "Parameters",
      "type": "object",
      "properties": {
        "block": {
          "type": "number"
        },
        "baseFeePerGas": {
          "type": "string"
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
          }
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
          }
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
          }
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
          }
        }
      }
    }
  }
}
```

```Example http
{
  "method": "post",
  "body": {
    "method": "eth_gasFees",
    "id": 1,
    "jsonrpc": "2.0",
    "params": []
  },
  "url": "https://protection-staging.flashbots.net/v1/rpc"
}
```
