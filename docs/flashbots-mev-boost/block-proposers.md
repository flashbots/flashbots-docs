---
title: Block Proposers
---

**What is a Block Proposer?**

A block proposer is a validator that has been pseudorandomly selected to build a block for a given slot in an epoch (there are 32 slots per epoch). Proposers are selected from the validator set using the standard RANDAO mechanism. 

Validators not pseudo-randomly assigned to propose blocks are assigned to attest, or vote on block proposals. These assignments are known 2 epochs in advance for attesters and 1 for proposers. The block in each slot will have a single validator serving as the proposer and many validators serving as the attesters to all information in that block. Attesters get rewarded for accurately voting on current values of 3 aspects of the beacon chain: the head of the chain (LMD Ghost), the justified checkpoint and the finalized checkpoint (Casper FFG). 

**The Role of Block Proposers**

Without MEV-Boost, the original role of block proposers consisted of two jobs: 

(1) **building** the best block from all available transactions, and 

(2) **proposing** this block to the PoS network.

With MEV-Boost, the role of validator is simplified to **proposal** duties only, and consists of the following:

- Receive a block from their local execution client, i.e. their local block builder, and sign / ‘propose’ it, or
- Receive an execution payload header from one or more relays and blindly sign a block without seeing the underlying execution payload (i.e. the blinded TXs escrowed by the relay).

The Ethereum [consensus-specs](https://github.com/ethereum/consensus-specs) have well defined expectations of honest validators, the most recent standard is the [Bellatrix -- Honest Validator](https://github.com/ethereum/consensus-specs/blob/dev/specs/bellatrix/validator.md#bellatrix----honest-validator) specification.