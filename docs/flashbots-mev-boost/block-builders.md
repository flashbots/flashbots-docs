## Block Builders

### Builder Fundamentals

**What is a Builder?**

Block builders are highly specialized actors who aggregate and construct blocks from transaction orderflow (bundles, private transactions, etc). 

**The Role of Builders**

Builders run algorithms and simulations (e.g. First Come First Serve, First Price Auctions, etc.) to order bundles and TXs in a block template (technically: *execution payload*) that maximizes profit. They then bid for and buy the validators’ blockspace, with the help of one or more relays, so their execution payloads are proposed to the blockchain. 


# Builder Quickstart

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

- [Relay API documentation - Block Builder API](https://bit.ly/3BmGZ3T)
- Block Builder Self-Help Group: [https://collective.flashbots.net/c/builders/14](https://collective.flashbots.net/c/builders/14)
- Github issue about becoming block builder: [https://github.com/flashbots/mev-boost/issues/145](https://github.com/flashbots/mev-boost/issues/145)
- [https://github.com/flashbots/boost-geth-builder](https://github.com/flashbots/boost-geth-builder) - an example builder implementation
- [MEV-Boost Geth Builder](https://github.com/flashbots/boost-geth-builder) is a testnet-ready open-source builder reference implementation (not meant for production). 
- Details about builder payments to block proposers [can be found here.](https://flashbots.notion.site/WIP-Builder-Payments-to-Block-Proposers-530eb36c60ad417a8702dd26da810b72)