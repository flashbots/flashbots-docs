## Block Builders

### Builder Fundamentals

**What is a Builder?**

Block builders are highly specialized actors who aggregate and construct blocks from transaction orderflow (bundles, private transactions, etc). 

**The Role of Builders**

Builders run algorithms and simulations (e.g. First Come First Serve, First Price Auctions, etc.) to order bundles and TXs in a block template (technically: *execution payload*) that maximizes profit. They then bid for and buy the validators’ blockspace, with the help of one or more relays, so their execution payloads are proposed to the blockchain. 


# Builder Quickstart

Take a look at our [example builder implementation](https://github.com/flashbots/boost-geth-builder), which is a good reference and in production use by some builders.

External builders can submit blocks to Goerli, Sepolia, and Mainnet Flashbots relays.

**Mainnet relay block submission endpoints:**

- `getValidators`: [https://boost-relay.flashbots.net/relay/v1/builder/validators](https://boost-relay.flashbots.net/relay/v1/builder/validators) (GET) - array of proposer preferences for registered validators with assigned duties in the current and next epoch
- `submitBlock`: [https://boost-relay.flashbots.net/relay/v1/builder/blocks](https://boost-relay.flashbots.net/relay/v1/builder/blocks) (POST)

**Goerli relay block submission endpoints:**

- `getValidators`: [https://builder-relay-goerli.flashbots.net/relay/v1/builder/validators](https://builder-relay-goerli.flashbots.net/relay/v1/builder/validators) (GET) - array of proposer preferences for registered validators with assigned duties in the current and next epoch
- `submitBlock`: [https://builder-relay-goerli.flashbots.net/relay/v1/builder/blocks](https://builder-relay-goerli.flashbots.net/relay/v1/builder/blocks) (POST)

**Sepolia relay block submission endpoints:**

- `getValidators`: [https://builder-relay-sepolia.flashbots.net/relay/v1/builder/validators](https://builder-relay-sepolia.flashbots.net/relay/v1/builder/validators) (GET) - array of proposer preferences for registered validators with assigned duties in the current and next epoch
- `submitBlock`: [https://builder-relay-sepolia.flashbots.net/relay/v1/builder/blocks](https://builder-relay-sepolia.flashbots.net/relay/v1/builder/blocks) (POST)

**Rate-limits:** 

Submissions to all relays are currently rate-limited to 60 / minute.

**See also:**

- [MEV-Boost Geth Builder](https://github.com/flashbots/boost-geth-builder) - an example builder implementation
- [Relay API documentation - Block Builder API](https://bit.ly/3BmGZ3T)
- Block Builder Self-Help Group: [https://collective.flashbots.net/c/builders/14](https://collective.flashbots.net/c/builders/14)
- Github issue about becoming block builder: [https://github.com/flashbots/mev-boost/issues/145](https://github.com/flashbots/mev-boost/issues/145)


## How do builders pay block proposers? 

As outlined in the original [MEV-boost architecture proposal,](https://ethresear.ch/t/mev-boost-merge-ready-flashbots-architecture/11177/4) builders construct execution payloads that contain transactions and header parameters provided by validators. Builders may directly set the validator’s `feeRecipient` address as the coinbase address of the payload, which transfers all gas fees and reward payments directly to the block proposer, ***or*** builders may set their own address and include a transaction to the block proposer’s `feeRecipient` address at the end of the block. While this design has not changed since the initial spec of MEV-boost, builders had not implemented this feature and an industry standard has yet to be defined.

See this forum thread for a comprehensive discussion: [https://collective.flashbots.net/t/block-scoring-for-mev-boost-relays/202](https://collective.flashbots.net/t/block-scoring-for-mev-boost-relays/202)
