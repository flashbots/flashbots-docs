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
| 0xa04a00ea847205dc7d684de0424544faf2dbc7e85d4ea72e5cde59c26e179f4caca52645169ee9c3685ae7d0ebaf26ed |
| 0xa04b0070ffa9e233d9c183fbb8cff4a6b3130fb90b765932295eafbc76c6e02b5b0c4ecb579a769a72c6d0e6c7f0e844 |
| 0xa08a00b8d1521ddc7e51717f9e1ed77266108008acec8cb58aa492ed0a17cc4c55330cfb1871d4471a7451d3f7c89192 |
| 0xa08b00cedceeb18c97d723f9338ead7d660fffc9050e487a5219e334e08e3d15faf4d8b51b0daf0e792f5f27a8c54da0 |
| 0x800a002dd9e1afc77af8ae909cf7f8169b413a92cfd43caa56ac749024774d9817a806dae49f4bd5af0661b054595ea4 |
| 0x800b00c6e03a92b910cfe928fe6d5bff63eb326af308a6224c512a82c6fdeae92e4d3a39e7b8dbfc572af5d2411cb26c |
| 0x801a00923e9949a7c510f565d92d282bcc79d79da6d57c98972891553443877ba5905b8bdf8145e23a06dac45b9a4d69 |
| 0x801b00e0e3a828ef58174652bc74cc6695fee2c7035a935b739c59cdd958c69564668ca5334dc51a85421eba77f9acc2 |
| 0x802a0012e4878385fbb8fb1f4b7d2ddaf332d2c409d340e2328a75e2387edafd16d543ca07ec2cc8d6134415e5a5b0ad |
| 0x802b00ecf62b2968050b7f557f8edbcbc080c9ee0cecc0982736d85997d3a1fb586587de7fb360fa31bade77254ce2e4 |
| 0x803a00a9dd54076d272a332f9e9d6815e4f9f449cc1ea2dbdc48ad90756206941c1f050ee97d66e314d7f773b5c71365 |
| 0x803b0018bd6776c5be2012e7ea053352fdf17df87921af9a9321e89d1f5da254de4e51e1e011fd25cf66e76eef551d5d |
| 0x804a0032e48f725bb41305041439578a89f4da71bd7662096d5bb55e2d14ac7135eb01d29fe0914f8efc57c85eb6e0f2 |
| 0x804b0038e40af99372530e57f351694643a667b0f3a197e1116d0496b1fefcd04df23c64037af1c807e30ac2746aba3f |
| 0x805a003c2b3c51302132864ac6897cf2623ce4ad0b35f5afe43f70e4e4d9c87f9e9fe5252836faedae57c0f922cb14a0 |
| 0x805b008679ccda28ae22ded00a91a24c15951a078032ceee051d72d60240b6e199873c8a9f2042b982be6588e67aba70 |
| 0x806a008bd4beb89f79d3df63b64c94dfab54857465fd0a5d1041b02c498bb5aa47ddb18e3829eebd0ca6b46db4969b2d |
| 0x806b00a40b92e88bcd83e31f15d75106bccb0dd6dff5d69daa644fbb71e736cc6fde918db241b8e5649e8abe3461fad0 |
| 0x807a00919db875280147cc98ef29d49a4ff3ab533b4c33df21d6c189ce4df0fd9446114835d7d2d44fbe4e7aa0a1df4c |
| 0x807b00cc542a2f24202638bef5ec2e0e729ed1759d3f87158350e75ce010d9ccb746bcde4205c505bff6b3deeda59982 |
| 0x808a0004c6802692bee5217ae930d29ccd9f6c9983acde9acf873d93f16b7d2d6064cb72cae1c89c0a59eb83c0bed40d |
| 0x808b0035e892b3e47eb8b4b3e6f7116313c6d1378abfde48c6311f687f93f6fe241f270f2acf32e3927adc21c46b3a1e |

The keys used in BuilderNet are listed here: https://buildernet.org/docs/public-identity#bls-keys-for-submitting-blocks-to-mev-boost-relays

## Additional Links & References

- [rbuilder](https://github.com/flashbots/rbuilder) - Blazingly fast, cutting edge block builder written in Rust.
- [Relay API documentation - Block Builder API](https://bit.ly/3BmGZ3T)
- Block Builder Self-Help Group: [https://collective.flashbots.net/c/builders/14](https://collective.flashbots.net/c/builders/14)
- Github issue about becoming block builder: [https://github.com/flashbots/mev-boost/issues/145](https://github.com/flashbots/mev-boost/issues/145).
- [Mevboost.pics](https://www.mevboost.pics/) - Tracking MEV-Boost relays and block builders, by [Toni Wahrstätter](https://twitter.com/nero_eth).
- [Relayscan.io](https://www.relayscan.io/) - Up-to-date stats on the MEV-Boost ecosystem, by [Chris Hager](https://twitter.com/metachris).

_Note: Flashbots does not control and cannot verify the data coming from external people and organizations. Please direct questions or issues directly to the creators of external data sources._
