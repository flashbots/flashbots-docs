---
title: Block Builders
---

## Builder Fundamentals

### What is a Builder?

Block builders are highly specialized actors who construct blocks from transaction orderflow (public transactions, bundles, private transactions, etc).

### The Role of Builders

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

Constructing a payment proof for this scoring method requires a Merkle Proof of the fee recipient balance in block _(n - 1)_, and a Merkle Proof of the fee recipient balance in block _n_. **Payment proofs have not yet been put into production.** Active discussion about payment proof implementation is still on-going. For more details or to participate in the discussion around payment proofs and block-level scoring, please check out to the [block scoring](https://collective.flashbots.net/t/block-scoring-for-mev-boost-relays/202) forum thread.

## External Builders

External builders can submit blocks to Mainnet and Sepolia Flashbots relays. The table below outlines Builder API methods available on each network.

### Relay Block Submission Endpoints by Network

|  |  | Mainnet | Sepolia |
| --- | --- | --- | --- |
| `getValidators` | GET Request - Returns an array of validator registrations with assigned duties in the current and next epoch | [Mainnet](https://boost-relay.flashbots.net/relay/v1/builder/validators)  | [Sepolia](https://boost-relay-sepolia.flashbots.net/relay/v1/builder/validators) |
| `submitBlock` | POST Request - submits a block to the relay | [Mainnet](https://boost-relay.flashbots.net/relay/v1/builder/blocks) | [Sepolia](https://boost-relay-sepolia.flashbots.net/relay/v1/builder/blocks)  |

- See also the [Relay API documentation - Block Builder API](https://bit.ly/3BmGZ3T) for more details on the API and payloads.
- The example [Flashbots builder implementation](https://github.com/flashbots/boost-geth-builder) is a good external builder reference, and is currently used in production by several builders.

### Rate-limits

Submissions to all relays are currently rate-limited to 600 submissions / 5m / IP, which translates to in average 2 submissions / sec /IP.

## BuilderNet Block Builders

The keys used in BuilderNet are listed here: https://buildernet.org/docs/public-identity#bls-keys-for-submitting-blocks-to-mev-boost-relays

## Additional Links & References

- [rbuilder](https://github.com/flashbots/rbuilder) - Blazingly fast, cutting edge block builder written in Rust.
- [Relay API documentation - Block Builder API](https://bit.ly/3BmGZ3T)
- Block Builder Self-Help Group: [https://collective.flashbots.net/c/builders/14](https://collective.flashbots.net/c/builders/14)
- Github issue about becoming block builder: [https://github.com/flashbots/mev-boost/issues/145](https://github.com/flashbots/mev-boost/issues/145).
- [Mevboost.pics](https://www.mevboost.pics/) - Tracking MEV-Boost relays and block builders, by [Toni Wahrstätter](https://twitter.com/nero_eth).
- [Relayscan.io](https://www.relayscan.io/) - Up-to-date stats on the MEV-Boost ecosystem, by [Chris Hager](https://twitter.com/metachris).

_Note: Flashbots does not control and cannot verify the data coming from external people and organizations. Please direct questions or issues directly to the creators of external data sources._
