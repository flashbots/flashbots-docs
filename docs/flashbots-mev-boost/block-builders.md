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

External builders can submit blocks to Mainnet, Goerli and Sepolia Flashbots relays. The table below outlines Builder API methods available on each network.

### Relay Block Submission Endpoints by Network

|  |  | Mainnet | Goerli | Sepolia |
| --- | --- | --- | --- | --- |
| `getValidators` | GET Request - Returns an array of validator registrations with assigned duties in the current and next epoch | [Mainnet](https://boost-relay.flashbots.net/relay/v1/builder/validators)  | [Goerli](https://boost-relay-goerli.flashbots.net/relay/v1/builder/validators)  | [Sepolia](https://boost-relay-sepolia.flashbots.net/relay/v1/builder/validators) |
| `submitBlock` | POST Request - submits a block to the relay | [Mainnet](https://boost-relay.flashbots.net/relay/v1/builder/blocks)  | [Goerli](https://boost-relay-goerli.flashbots.net/relay/v1/builder/blocks) | [Sepolia](https://boost-relay-sepolia.flashbots.net/relay/v1/builder/blocks)  |

- See also the [Relay API documentation - Block Builder API](https://bit.ly/3BmGZ3T) for more details on the API and payloads.
- The example [Flashbots builder implementation](https://github.com/flashbots/boost-geth-builder) is a good external builder reference, and is currently used in production by several builders.

### Rate-limits

Submissions to all relays are currently rate-limited to 600 submissions / 5m / IP, which translates to in average 2 submissions / sec /IP.

## Flashbots Builders

All Flashbots builders pay block proposers from the [`flashbots-builder.eth` ENS address](https://etherscan.io/address/0xdafea492d9c6733ae3d56b7ed1adb60692c98bc5). Each Flashbots builder uses a different public key (`builder_pubkey`) for relay identification and analytics purposes.

The various `builder_pubkeys` used to identify Flashbots builders to relays are listed below:

| **Builder Public Key** |
| --- |
| 0xa01a00479f1fa442a8ebadb352be69091d07b0c0a733fae9166dae1b83179e326a968717da175c7363cd5a13e8580e8d |
| 0xa01b00a4ab433cbb0a0801cff3815722d56e1980caad7ed156900563e6670cdf6280535dae331f358c647c4bf4558a85 |
| 0xa02a0054ea4ba422c88baccfdb1f43b2c805f01d1475335ea6647f69032da847a41c0e23796c6bed39b0ee11ab9772c6 |
| 0xa02b009596e741d5f61d18b900cbd03bbcdb9c0f16b1981928d13b57fcb48d4ddce21a96c523bf84425b3a4e6e6b3f14 |
| 0xa03a000b0e3d1dc008f6075a1b1af24e6890bd674c26235ce95ac06e86f2bd3ccf4391df461b9e5d3ca654ef6b9e1ceb |
| 0xa03b00ddb78b2c111450a5417a8c368c40f1f140cdf97d95b7fa9565467e0bbbe27877d08e01c69b4e5b02b144e6a265 |
| 0xa08a00b8d1521ddc7e51717f9e1ed77266108008acec8cb58aa492ed0a17cc4c55330cfb1871d4471a7451d3f7c89192 |
| 0xa08b00cedceeb18c97d723f9338ead7d660fffc9050e487a5219e334e08e3d15faf4d8b51b0daf0e792f5f27a8c54da0 |
| 0x800a002dd9e1afc77af8ae909cf7f8169b413a92cfd43caa56ac749024774d9817a806dae49f4bd5af0661b054595ea4 |
| 0x800b00c6e03a92b910cfe928fe6d5bff63eb326af308a6224c512a82c6fdeae92e4d3a39e7b8dbfc572af5d2411cb26c |
| 0x801a00923e9949a7c510f565d92d282bcc79d79da6d57c98972891553443877ba5905b8bdf8145e23a06dac45b9a4d69 |
| 0x801b00e0e3a828ef58174652bc74cc6695fee2c7035a935b739c59cdd958c69564668ca5334dc51a85421eba77f9acc2 |

## Additional Links & References

- [MEV-Boost Geth Builder](https://github.com/flashbots/boost-geth-builder) - an example builder implementation
- [Relay API documentation - Block Builder API](https://bit.ly/3BmGZ3T)
- Block Builder Self-Help Group: [https://collective.flashbots.net/c/builders/14](https://collective.flashbots.net/c/builders/14)
- Github issue about becoming block builder: [https://github.com/flashbots/mev-boost/issues/145](https://github.com/flashbots/mev-boost/issues/145).
- [Mevboost.pics](https://www.mevboost.pics/) - Tracking MEV-Boost relays and block builders, by [Toni Wahrstätter](https://twitter.com/nero_eth).
- [Relayscan.io](https://www.relayscan.io/) - Up-to-date stats on the MEV-Boost ecosystem, by [Chris Hager](https://twitter.com/metachris).

_Note: Flashbots does not control and cannot verify the data coming from external people and organizations. Please direct questions or issues directly to the creators of external data sources._
