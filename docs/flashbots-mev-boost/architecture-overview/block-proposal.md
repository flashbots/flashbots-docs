---
title: MEV-Boost Block Proposal
---

![MEV-Boost Block Proposal](https://raw.githubusercontent.com/flashbots/mev-boost/develop/docs/block-proposal.png)


As depicted above and described in the [Builder — Honest Validator](https://github.com/ethereum/builder-specs) repository, the MEV-Boost block proposal process begins with a [registration step](https://github.com/ethereum/builder-specs) that validators must perform ahead of  proposal duties. Registration ensures builders can craft blocks for a given validator’ block proposal. Once registered, validators wait until selected to propose a block. Once selected, a block proposer building a block on top of a beacon `state` in a given `slot` must take the following actions to obtain an [execution payload](https://github.com/ethereum/consensus-specs/blob/a45ee9bf5b1fde766d69e551a6b1a21fe2531734/specs/merge/beacon-chain.md#executionpayload):

1. Users/searchers send transactions to block builders through public or private peer-to-peer transaction pools.
2. Builders construct execution payloads using received transactions, and parameters the block proposer provided during registration. To process MEV payment, builders set their own address as the payload’s coinbase address and append a transaction to the [block proposers’ feeRecipient address ](https://flashbots.notion.site/WIP-Builder-Payments-to-Block-Proposers-530eb36c60ad417a8702dd26da810b72)at the end of their proposed block. The block is then forwarded to relays.
3. Relays verify the validity of payloads (including amount of ETH paid to the block proposers’ feeRecipient), and send an [`ExecutionPayloadHeader`](https://github.com/ethereum/consensus-specs/blob/a45ee9bf5b1fde766d69e551a6b1a21fe2531734/specs/merge/beacon-chain.md#executionpayloadheader) (execution payloads stripped of transaction content) to MEV-Boost. MEV-boost selects the most valuable payload and forwards it to the block proposer.
4. The block proposer signs the payload and passes it back to MEV-Boost via a [`submitBlindedBlock`](https://ethereum.github.io/builder-specs/#/Builder/submitBlindedBlock) call, which is forwarded to the relay. Once the relay verifies the proposers’ signature, it responds with the full execution payload body for the validator to use when proposing a `SignedBeaconBlock` to the network.
