### Builder Fundamentals

**What is a Builder?**

Block builders are highly specialized actors who construct blocks from transaction orderflow (public transactions, bundles, private transactions, etc).

**The Role of Builders**

Builders run algorithms and simulations (e.g. First Come First Serve, First Price Auctions, etc.) to order bundles and TXs in a block template (technically: `execution payload`) that maximizes profit. They then bid for and buy the validators’ blockspace, with the help of one or more relays, so their execution payloads are proposed to the blockchain.

### How do builders pay block proposers?

Flashbots proposed a standardized specification for how payments are made from builders to block proposers through the following process:

1. The builder sets their own address as the `feeRecipient` of the payload block header they are constructing. 
2. The builder includes a transaction which pays ETH to the proposer’s `feeRecipient` address at the end of their proposed block. 

### Determining the value of blocks

A standard method for determining block value is crucial for multiple components of the MEV-Boost ecosystem; including relay monitoring, validator accounting, builder payments, block explorers, payment proofs, and MEV hiding. 

Various methods for defining block value were [considered](https://collective.flashbots.net/t/block-scoring-for-mev-boost-relays/202) by members of the community. It was determined that block level scoring was the most simple and intuitive method for scoring block value.

Note that a “block score” is not meant to be a formal definition of realized extractable value since this is a difficult metric to quantify. For example, a validator payment that would fall outside the scope of a block score calculation would be a Layer 2 transfer to a validator’ fee recipient account.

### Block level scoring

Block level scoring looks at the difference in the balance of the fee recipient account before and after the block execution.  

Constructing a payment proof for this scoring method requires a Merkle Proof of the fee recipient balance in block *(n - 1)*, and a Merkle Proof of the fee recipient balance in block *n*. **Payment proofs have not yet been put into production.** Active discussion about payment proof implementation is still on-going. For more details or to participate in the discussion around payment proofs and block-level scoring, please check out to the following **forum thread: [https://collective.flashbots.net/t/block-scoring-for-mev-boost-relays/202](https://collective.flashbots.net/t/block-scoring-for-mev-boost-relays/202)**

## External Builders

External builders can submit blocks to Mainnet, Goerli and Sepolia Flashbots relays. The table below outlines Builder API methods available on each network.

### **Relay Block Submission Endpoints by Network**

- See also the [Relay API documentation - Block Builder API](https://bit.ly/3BmGZ3T) for more details on the API and payloads.
- The example [Flashbots builder implementation](https://github.com/flashbots/boost-geth-builder) is a good external builder reference, and is currently used in production by several builders.

### **Rate-limits:**

Submissions to all relays are currently rate-limited to 60 blocks / minute.

## Links & References

- [MEV-Boost Geth Builder](https://github.com/flashbots/boost-geth-builder) - an example builder implementation
- [Relay API documentation - Block Builder API](https://bit.ly/3BmGZ3T)
- Block Builder Self-Help Group: [https://collective.flashbots.net/c/builders/14](https://collective.flashbots.net/c/builders/14)
- Github issue about becoming block builder: [https://github.com/flashbots/mev-boost/issues/145](https://github.com/flashbots/mev-boost/issues/145).

## Flashbots Builders

All Flashbots builders pay block proposers from the `[flashbots-builder.eth` ENS address](https://etherscan.io/address/0xdafea492d9c6733ae3d56b7ed1adb60692c98bc5). Each Flashbots builder uses a different public key (`builder_pubkey`) for relay identification and analytics purposes. 

The various `builder_pubkeys`used to identify Flashbots builders to relays are listed below: