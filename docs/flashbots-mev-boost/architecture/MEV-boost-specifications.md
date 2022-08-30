## MEV-Boost Specifications

`mev-boost` implements the latest versions of the following specifications:

[Ethereum Builder Specification](https://github.com/ethereum/builder-specs/blob/main/specs/builder.md)

- The Builder API is a temporary solution for [Proposer-builder separation](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725)
 (PBS), and aims to separate the roles of a validator into block proposing and block building. [You can interact with a rendered version of the Builder API here.](https://ethereum.github.io/builder-specs/#/Builder/status)

## Fundamental Specifications

[Ethereum Beacon APIs](https://www.notion.so/WIP-MEV-Boost-Docs-Revision-DRAFT-73ad491a1e5a492a9977b1070e37af39)

- Collection of RESTful APIs exposed by a beacon node aiming to facilitate [Phase 0](https://www.notion.so/WIP-MEV-Boost-Docs-Revision-DRAFT-73ad491a1e5a492a9977b1070e37af39) of Ethereum consensus.****

[Consensus Specs](https://github.com/ethereum/consensus-specs)

- Current Ethereum PoS consensus specifications.

## Tooling and Dependent Repositories

- MEV-Boost Builder [https://github.com/flashbots/boost-geth-builder](https://github.com/flashbots/boost-geth-builder)
- MEV-Boost Relay [https://github.com/flashbots/mev-boost-relay](https://github.com/flashbots/mev-boost-relay)
- Go Utils [https://github.com/flashbots/go-boost-utils](https://github.com/flashbots/go-boost-utils)
- MergeMock [https://github.com/protolambda/mergemock](https://github.com/protolambda/mergemock)
- mev-rs [https://github.com/ralexstokes/mev-rs](https://github.com/ralexstokes/mev-rs)
- Relay status page: [https://0xpanoramix.github.io/flashbots-boost-status/](https://0xpanoramix.github.io/flashbots-boost-status/)