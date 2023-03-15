---
title: Block Builders
---

**What is a Builder?**

Block builders are highly specialized actors who construct blocks from transaction orderflow (public transactions, bundles, private transactions, etc).

**The Role of Builders**

Builders run algorithms and simulations (e.g. First Come First Serve, First Price Auctions, etc.) to order bundles and TXs in a block template (technically: `execution payload`) that maximizes profit. Builders then bid for and buy the validators’ blockspace, facilitated by one or more relays, so their execution payloads are proposed to the blockchain.

### How do builders pay block proposers?

Flashbots proposed a standardized specification for how payments are made from builders to block proposers through the following process:

1. The builder sets their own address as the `feeRecipient` of the payload block header they are constructing. 
2. The builder includes a transaction which pays ETH to the proposer’s `feeRecipient` address at the end of their proposed block.



### Determining the value of blocks

A standard method for determining block value is crucial for multiple components of the MEV-Boost ecosystem; including relay monitoring, validator accounting, builder payments, block explorers, payment proofs, and MEV hiding. 

Various methods for defining block value were [considered](https://collective.flashbots.net/t/block-scoring-for-mev-boost-relays/202) by members of the community. It was determined that block level scoring was the most simple and intuitive method for scoring block value.


### Block level scoring

Block level scoring looks at the difference in the balance of the fee recipient account before and after the block execution.  

Note that a “block score” is not meant to be a formal definition of realized extractable value, since this is a difficult metric to quantify. For example, a Layer 2 transfer to a validator’ fee recipient address could be considered extractable value, but falls outside the scope of a block score calculation. 

Constructing a payment proof for this scoring method requires a Merkle Proof of the fee recipient balance in block *(n - 1)*, and a Merkle Proof of the fee recipient balance in block *n*. **Payment proofs have not yet been put into production.** Active discussion about payment proof implementation is still on-going. For more details or to participate in the discussion around payment proofs and block-level scoring, please check out to the [block scoring](https://collective.flashbots.net/t/block-scoring-for-mev-boost-relays/202) forum thread.

## External Builders

External builders can submit blocks to Mainnet, Goerli and Sepolia Flashbots relays. The table below outlines Builder API methods available on each network.

### Relay Block Submission Endpoints by Network

|  |  | Mainnet | Goerli | Sepolia |
| --- | --- | --- | --- | --- |
| `getValidators` | GET Request - Returns an array of validator registrations with assigned duties in the current and next epoch | https://boost-relay.flashbots.net/relay/v1/builder/validators  | https://builder-relay-goerli.flashbots.net/relay/v1/builder/validators  | https://builder-relay-sepolia.flashbots.net/relay/v1/builder/validators |
| `submitBlock` | POST Request - submits a block to the builder | https://boost-relay.flashbots.net/relay/v1/builder/blocks  | https://builder-relay-goerli.flashbots.net/relay/v1/builder/blocks | https://builder-relay-sepolia.flashbots.net/relay/v1/builder/blocks |

- See also the [Relay API documentation - Block Builder API](https://bit.ly/3BmGZ3T) for more details on the API and payloads.
- The example [Flashbots builder implementation](https://github.com/flashbots/boost-geth-builder) is a good external builder reference, and is currently used in production by several builders.

### **Rate-limits:**

Submissions to all relays are currently rate-limited to 60 blocks / minute.


## Flashbots Builders

All Flashbots builders pay block proposers from the [`flashbots-builder.eth` ENS address](https://etherscan.io/address/0xdafea492d9c6733ae3d56b7ed1adb60692c98bc5). Each Flashbots builder uses a different public key (`builder_pubkey`) for relay identification and analytics purposes. 

The various `builder_pubkeys` used to identify Flashbots builders to relays are listed below:

| **Builder 'Name'** | **Builder Public Key** |
| --- | --- |
| **babe**| 0x81**babe**ec8c9f2bb9c329fd8a3b176032fe0ab5f3b92a3f44d4575a231c7bd9c31d10b6328ef68ed1e8c02a3dbc8e80f9 |
| **beef**| 0x81**beef**03aafd3dd33ffd7deb337407142c80fea2690e5b3190cfc01bde5753f28982a7857c96172a75a234cb7bcb994f |
| **dead**| 0xa1**dead**1e65f0a0eee7b5170223f20c8f0cbf122eac3324d61afbdb33a8885ff8cab2ef514ac2c7698ae0d6289ef27fc |
| **defa** *(mempool builder)* | 0xa1**defa**73d675983a6972e8686360022c1ebc73395067dd1908f7ac76a526a19ac75e4f03ccab6788c54fdb81ff84fc1b |

## Additional Links & References

- [MEV-Boost Geth Builder](https://github.com/flashbots/boost-geth-builder) - an example builder implementation
- [Relay API documentation - Block Builder API](https://bit.ly/3BmGZ3T)
- Block Builder Self-Help Group: [https://collective.flashbots.net/c/builders/14](https://collective.flashbots.net/c/builders/14)
- Github issue about becoming block builder: [https://github.com/flashbots/mev-boost/issues/145](https://github.com/flashbots/mev-boost/issues/145).
- [Mevboost.org*](https://www.mevboost.org/) - Tracking MEV-Boost relays and block builders. A quick hack by [Anish](https://anishagnihotri.com/). Design inspired by file.app.

*Note: Flashbots does not control and cannot verify the data coming from external people and organizations. Please direct questions or issues directly to the creators of external data sources.* 