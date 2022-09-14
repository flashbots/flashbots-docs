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

## How do builders pay block proposers? 

As outlined in the original [MEV-boost architecture proposal,](https://ethresear.ch/t/mev-boost-merge-ready-flashbots-architecture/11177/4) builders construct execution payloads that contain transactions and header parameters provided by validators. Builders may directly set the validator’s `feeRecipient` address as the coinbase address of the payload, which transfers all gas fees and reward payments directly to the block proposer, ***or*** builders may set their own address and include a transaction to the block proposer’s `feeRecipient` address at the end of the block. While this design has not changed since the initial spec of MEV-boost, builders had not implemented this feature and an industry standard has yet to be defined.

In this article, we outline our preferred solution for builders to make payments to proposers, and provide a release update for payments in the Flashbots reference [boost-geth-builder](https://github.com/flashbots/boost-geth-builder) for further testing.

### Framing the problem

In the [Identifier for builder to proposer transaction #220 issue](https://github.com/flashbots/mev-boost/issues/220), staking providers and node operators outlined a need for an accounting mechanism for MEV payments. This mechanism unlocks a number of necessary operations, such as proving receipt of MEV rewards, fair distribution of rewards to staking customers, and preventing malicious activities, such as [MEV hiding](https://dao.rocketpool.net/t/mev-and-penalty-system/772), among others.

To enable these operations, Flashbots proposes a standardized specification for how payments are made from builders to block proposers through the following process:

1. The builder sets their own address as `feeRecipient` of the payload header they are constructing.
2. The builder includes a transaction which pays ETH to the proposer’s `feeRecipient` address at the end of their proposed block. 

### Further considerations

**Withdrawals**

Validators need to be able to withdraw from the account which receives payment. If payments are made directly to a validator’s recipient account, then the validator would be unable to withdraw anything from that account without adversely affecting the simulated value of that block. The reason is that if the profit of a block is measured by the difference in a validator’s recipient account before and after that block, then a withdraw makes the block look less profitable because it removes assets. To prevent this, validators would need to create a new recipient account for each block they produce.

**Out of band bribes**

Additional payment methods using transfers to the validator account, or transfers to the validator on L2s, for example, would allow for validator bribery. Further research and input is needed to address this externality.

**Gas usage**

Adding a transaction that calls a smart contract costs additional gas, and becomes an overhead expense on every block.

### Seeking Feedback

We are actively seeking input from node operators and the broader community on implications of this proposed design. We are prepared to move forward with this implementation and continue to iterate as community input is received. 

**Please provide comments, feedback, or suggest alternatives directly on this forum thread: [https://collective.flashbots.net/t/block-scoring-for-mev-boost-relays/202/5](https://collective.flashbots.net/t/block-scoring-for-mev-boost-relays/202/5)**
