# Relay API Specification

The Flashbots [mev-boost-relay](https://github.com/flashbots/mev-boost-relay) is open source technology. The following document details Version 1 of the MEV-Boost Relay API Specification.

## Data types

A reference implementation of the data types with correct SSZ encoding and signing routines can be found in the [go-boost-utils](https://github.com/flashbots/go-boost-utils) directory.

### [builder-specs](https://github.com/ethereum/builder-specs) and [beacon-APIs](https://github.com/ethereum/beacon-APIs)

- [ValidatorRegistration](https://github.com/ethereum/beacon-APIs/blob/master/types/registration.yaml)
- [SignedBuilderBid](https://github.com/ethereum/builder-specs/blob/main/types/bellatrix/bid.yaml)
- [SignedBlindedBeaconBlock](https://github.com/ethereum/beacon-APIs/blob/master/types/bellatrix/block.yaml#L83)
- [ExecutionPayload](https://github.com/ethereum/beacon-APIs/blob/master/types/bellatrix/execution_payload.yaml)

### BidTrace

Represents public information about a block sent by a builder to the relay, or from the relay to the proposer. Depending on the context, `value` might represent the claimed value by a builder (not necessarily a value confirmed by the relay).

```json
{
  "slot": "123",
  "parent_hash": "0xcf8e0d4e9587369b2301d0790347320302cc0943d5a1884560367e8208d920f2",
  "block_hash": "0xcf8e0d4e9587369b2301d0790347320302cc0943d5a1884560367e8208d920f2",
  "builder_pubkey": "0x7b2cb8dd64e0aafe7ea7b6c95065c9364cf99d38470c12ee807d55f7de1529ad29ce2c422e0b65e3d5a05c02caca249",
  "proposer_pubkey": "0x8a1d7b8dd64e0aafe7ea7b6c95065c9364cf99d38470c12ee807d55f7de1529ad29ce2c422e0b65e3d5a05c02caca249",
  "proposer_fee_recipient": "0x2b7a7b8dd64e0aafe7ea7b6c95065c9364cf99d38470c12ee807d55f7de1529ad29ce2c422e0b65e3d5a05c02caca249",
  "gas_used": "3371033",
  "gas_limit": "30000000",
  "value": "1234567"
}
```

See the [reference implementation of `BidTrace`](https://github.com/flashbots/go-boost-utils/blob/main/types/builder.go#L217) for more information.

### SignedBidTrace

```json
{
  "message": BidTrace
  "signature": "0x..."
  }
```

Note: BLS signature using the builder domain (relative to the genesis fork and with a zero genesis validators root).

See the [reference implementation of `SignedBidTrace`](https://github.com/flashbots/go-boost-utils/blob/main/types/builder.go#L230) for more information.

### ValidatorRegistration

```json
{
  "message": {
    "fee_recipient": "0xabcf8e0d4e9587369b2301d0790347320302cc09",
    "gas_limit": "1",
    "timestamp": "1",
    "pubkey": "0x93247f2209abcacf57b75a51dafae777f9dd38bc7053d1af526f220a7489a6d3a2753e5f3e8b1cfe39b56f43611df74a"
    },
  "signature": "0x1b66ac1fb663c9bc59509846d6ec05345bd908eda73e670af888da41af171505cc411d61252fb6cb3fa0017b679f8bb2305b26a285fa2737f175668d0dff91cc1b66ac1fb663c9bc59509846d6ec05345bd908eda73e670af888da41af171505"
}
```

See the [ValidatorRegistration](https://github.com/flashbots/go-boost-utils/blob/main/types/builder.go#L170) reference implementation.

### ErrorResponse

All API errors follow the following schema:

```json
{
  "code": 400,
  "message": "description about the error"
}
```
---

## Proposer API

Standard APIs as per [builder spec](https://ethereum.github.io/builder-specs/#/Builder):

- [registerValidator](https://ethereum.github.io/builder-specs/#/Builder/registerValidator): `POST /eth/v1/builder/validators`
- [getHeader](https://ethereum.github.io/builder-specs/#/Builder/getHeader): `GET  /eth/v1/builder/header/{slot}/{parent_hash}/{pubkey}` - Get an execution payload header.
- [submitBlindedBlock](https://ethereum.github.io/builder-specs/#/Builder/submitBlindedBlock): `POST /eth/v1/builder/blinded_blocks` - Submit a signed blinded block and get unblinded execution payload.
- [status](https://ethereum.github.io/builder-specs/#/): `GET /eth/v1/builder/status`

---

## Block Builder API

The block builder API allows block submissions to the MEV-Boost Relays. Currently, the Flashbots relays for Goerli, Sepolia and Mainnet allow submissions by external builders.

### getValidators

Get a list of validator registrations for validators scheduled to propose in the current and next epoch.

`GET /relay/v1/builder/validators`


**Success Response**

Array of validatorRegistrations for the current and next epoch. Each entry includes a slot and the validator with assigned duty (if he submitted a registration previously). Slots without a registered validator are omitted.

**Payload:**

```json
[{
  "slot": "123",
  "entry": ValidatorRegistration
}, 
...]
```

API Example on Goerli) [https://builder-relay-goerli.flashbots.net/relay/v1/builder/validators](https://builder-relay-goerli.flashbots.net/relay/v1/builder/validators)

## submitBlock

Submit a new block to the relay, for a given `slot` + `parentHash` + `proposerPubkey` combination. 

**Details:** 

- Rate-limit is 2 submissions / second / IP
- Blocks can be submitted as plain JSON, or gzip encoded
- The relay will simulate the block to verify properties and proposer payment in the payment transaction from builder to proposer feeRecipient at the end of block.
- Any new submission by a builder will overwrite a previous one by the same `builder_pubkey`, even if less profitable.
- The bid trace is published through the data API: [https://boost-relay.flashbots.net/relay/v1/data/bidtraces/builder_blocks_received](https://boost-relay.flashbots.net/relay/v1/data/bidtraces/builder_blocks_received)
- `execution_payload` is the [ExecutionPayload from the CL Bellatrix spec](https://github.com/ethereum/consensus-specs/blob/v1.1.9/specs/bellatrix/beacon-chain.md#executionpayload).
- Builder signature is over SSZ encoded `message` (for accountability). The message doesn’t include the transactions and can be made public with the (Data API), allowing anyone to verify the builder signature.
- For getting started with building, see the example builder implementation [https://github.com/flashbots/boost-geth-builder](https://github.com/flashbots/boost-geth-builder)

`POST /relay/v1/builder/blocks`

```json
// Type:
{
"signature": "0x8c795f751f812eabbabdee85100a06730a9904a4b53eedaa7f546fe0e23cd75125e293c6b0d007aa68a9da4441929d16072668abb4323bb04ac81862907357e09271fe414147b3669509d91d8ffae2ec9c789a5fcd4519629b8f2c7de8d0cce9"
"message": BidTrace
"execution_payload": ExecutionPayload
}

// Example:
{
"signature": "0x8c795f751f812eabbabdee85100a06730a9904a4b53eedaa7f546fe0e23cd75125e293c6b0d007aa68a9da4441929d16072668abb4323bb04ac81862907357e09271fe414147b3669509d91d8ffae2ec9c789a5fcd4519629b8f2c7de8d0cce9"
"message": {
  "slot": "123",
  "parent_hash": "0xcf8e0d4e9587369b2301d0790347320302cc0943d5a1884560367e8208d920f2",
  "block_hash": "0xcf8e0d4e9587369b2301d0790347320302cc0943d5a1884560367e8208d920f2",
  "builder_pubkey": "0x7b2acb8dd64e0aafe7ea7b6c95065c9364cf99d38470c12ee807d55f7de1529ad29ce2c422e0b65e3d5a05c02caca249",
  "proposer_pubkey": "0x8a1d7b8dd64e0aafe7ea7b6c95065c9364cf99d38470c12ee807d55f7de1529ad29ce2c422e0b65e3d5a05c02caca249",
  "proposer_fee_recipient": "0xf1469083b2cbab4d1f648176bf8e26e581ebabd4",
  "gas_used": "3371033",
  "gas_limit": "30000000",
  "value": "1234567",
},
"execution_payload": {
  "parent_hash": "0xcf8e0d4e9587369b2301d0790347320302cc0943d5a1884560367e8208d920f2",
  "fee_recipient": "0xabcf8e0d4e9587369b2301d0790347320302cc09",
  "state_root": "0xcf8e0d4e9587369b2301d0790347320302cc0943d5a1884560367e8208d920f2",
  "receipts_root": "0xcf8e0d4e9587369b2301d0790347320302cc0943d5a1884560367e8208d920f2",
  "logs_bloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "prev_randao": "0xcf8e0d4e9587369b2301d0790347320302cc0943d5a1884560367e8208d920f2",
  "block_number": "1",
  "gas_used": "3371033",
  "gas_limit": "30000000",
  "timestamp": "1",
  "extra_data": "0xcf8e0d4e9587369b2301d0790347320302cc0943d5a1884560367e8208d920f2",
  "base_fee_per_gas": "1",
  "block_hash": "0xcf8e0d4e9587369b2301d0790347320302cc0943d5a1884560367e8208d920f2",
  "transactions": [
    "0x02f878831469668303f51d843b9ac9f9843b9aca0082520894c93269b73096998db66be0441e836d873535cb9c8894a19041886f000080c001a031cc29234036afbf9a1fb9476b463367cb1f957ac0b919b69bbc798436e604aaa018c4e9c3914eb27aadd0b91e10b18655739fcf8c1fc398763a9f1beecb8ddc86"
    ]
  }
}
```

**Success response:**

Status code 200

Success response (in discussion, not yet implemented):

```json
{
"message": {
  "receive_timestamp": "1655906415",
  "bid_trace": BidTrace,

  },
  "signature": "0x..."
}
```

**Error response:**

Status code ≥ 300

```bash
{
  "code": 400,
  "message": "some human readable error message"
}
```

---

## Data API

Provides data about received blocks from builders and header/payload queries from proposers. 

**Rate-limits:** The data API is rate-limited to 300 requests / ip / 5 min.

**Bulk data access:**

- The Flashbots relay provides weekly and monthly bulk data exports at [https://flashbots-boost-relay-public.s3.us-east-2.amazonaws.com/index.html](https://flashbots-boost-relay-public.s3.us-east-2.amazonaws.com/index.html)
- We’ll add links to more bulk exports here once other relays start doing that

## ProposerPayloadsDelivered

This API provides BidTraces for payloads that were delivered to proposers.

`GET /relay/v1/data/bidtraces/proposer_payload_delivered`

Optional query arguments:

- `slot`: a specific slot
- `cursor`: a slot cursor, where the entries start at `cursor` and decreasing the slot until `limit` amount of entries is reached (note only one of `slot` or `cursor` can be used at a time)
- `limit`: maximum number of entries (200 max)
- `block_hash`: search for a specific blockhash
- `block_number`: search for a specific EL block number
- `proposer_pubkey`: filter results by a proposer public key
- `order_by`:
    - `-value` to sort result by descending value (highest value first)
    - `value` to sort result by ascending value (lowest value first)

The response payload is an array of [BidTrace](https://www.notion.so/Relay-API-Documentation-5fb0819366954962bc02e81cb33840f5) objects.

**Notes:** 
- In case of reorgs there could be multiple bids per slot.
- This API is live on all our relays: [https://boost-relay.flashbots.net/relay/v1/data/bidtraces/proposer_payload_delivered?limit=10](https://boost-relay.flashbots.net/relay/v1/data/bidtraces/proposer_payload_delivered?limit=10) 
- Rate limit is 60 Req/Min/IP

## BuilderBlocksReceived

This API provides BidTraces for the builder block submission for a given slot (that were verified successfully).

`GET /relay/v1/data/bidtraces/builder_blocks_received`

Optional query arguments:

- `slot`: a specific slot
- `limit`: maximum number of entries (200 max)
- `block_hash`: search for a specific blockhash
- `block_number`: search for a specific EL block number

**Response:**
The response payload is an array of [BidTraceWithTimestamp](https://bit.ly/3UgzlyT) objects. 

**Notes:**
- This API is live on all our relays: [https://boost-relay.flashbots.net/relay/v1/data/bidtraces/builder_blocks_received?slot=4739651](https://boost-relay.flashbots.net/relay/v1/data/bidtraces/builder_blocks_received?slot=4739651). 
- Rate limit is 60 Req/Min/IP
- There is currently no `cursor` argument, because with possibly *many* bids per slot, a cursor might omit some. Behavior here is up to discussion.
  
## ValidatorRegistration

Return the latest validator registration for a given pubkey. Useful to check whether your own registration was successful.

**⚠️** This API will be replaced soon with an API that requires pubkey + feeRecipient, to preserve proposer privacy. It will also allow bulk requests in the future.

`GET /relay/v1/data/validator_registration?pubkey=_pubkey_`

**Payload:**

```bash
ValidatorRegistration
```

[Example URL](https://boost-relay.flashbots.net/relay/v1/data/validator_registration?pubkey=0xb606e206c2bf3b78f53ebff8be8e8d4af2f0da68646b5642c4d511b15ab5ddb122ae57b48eab614f8ca5bafbe75a5999)

Note: this API call is more strictly rate-limited.

---

## Relay Infrastructure

This is a simplified infrastructure diagram:

![Flashbots Relay](https://flashbots.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fc4460f24-9643-470a-a956-d886bf92e354%2FScreenshot_2022-06-22_at_17.54.56.png?table=block&id=ed097235-1a1d-497f-b3a4-f2c4673ac26e&spaceId=df6156be-4a40-4dc3-9a41-d3def62df57a&width=2000&userId=&cache=v2)

**Details:**

- Validator registrations need to be handled in a scalable fashion, independently of the other proposer APIs (`getHeader`, `submitBlindedBlock`). The burst of up to 1M validator registrations each epoch requires a lot of resources to process, verify and save to a database.
- Block submissions need to be verified by simulating the full block, and the relay needs to be prepared to throttle any individual builder in case of spam or other issues (continuous invalid blocks or incorrect proposer payment).
- Operating a relay is infrastructure-intensive, and bugs can negatively impact Eth2 consensus. One of the solutions Flashbots is working on is a service called [Relay Monitor](https://github.com/flashbots/mev-boost/issues/142), which tracks relay performance and helps proposers interact only with healthy relays.

---

*Users of this informational material are responsible for determining any applicable legal restrictions on any direct or derivative use of this information, including complying with applicable economic sanctions laws within their home jurisdictions.  Please also see Github’s [Trade Controls](https://docs.github.com/en/site-policy/other-site-policies/github-and-trade-controls) page. Flashbots makes no representation or warranty as to any Relay Operator or other entity’s compliance with economic sanctions or other laws and regulations.*