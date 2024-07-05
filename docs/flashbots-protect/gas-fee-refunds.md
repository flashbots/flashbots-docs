---
title: Gas Fee Refunds
---

## Introduction

Flashbots Protect users are automatically eligible to receive gas fee refunds. If Flashbots can include your transaction on chain for a lower price, you are eligible to receive a refund. This applies to both the RPC and the private transaction API.

Gas fee refunds do not change how transactions are executed and users do not need to make any changes to be eligible for them.

Gas fee refunds are calculated separately, and applied in addition to, refunds from [MEV-Share](/docs/flashbots-protect/mev-share).

## Where do refunds come from

Users and orderflow providers (like wallets) often pay high priority fees to land transactions on chain. Many of these transactions could be executed just as quickly for a fraction of the gas cost.

It can be difficult to estimate gas correctly when sending a transaction. The Flashbots block builder calculates this on behalf of users and automatically refunds transactions that overpay.

Gas fee refunds include both priority fees (more common in user transactions) and coinbase transfers (less common).

## Which transactions receive refunds

Flashbots provides refunds for transactions in blocks landed by the Flashbots block builder. Whether a transaction receives a refund depends on a few factors that vary from block to block:
* How much network congestion and competition there was
* Whether the Flashbots builder made a profit and how much
* How much the specific transaction contributed to the value of the block
* If the transaction was sent directly to Flashbots, or shared with other RPCs and block builders

## How to maximize both refunds and speed

Transactions which are sent directly to the Flashbots RPC or API, and not multiplexed _by the user_ to other RPCs or block builders, are likely to receive higher refunds. This is because they increase the profit of the Flashbots builder which is used to provide refunds.

The Flashbots block builder does not land 100% of blocks. In order to improve inclusion speed, users can ask Flashbots to share their transactions with other block builders in cases where the Flashbots builder does not win a block. Flashbots will automatically share with all specified builders on the user's behalf.

There are two ways to share with other builders:
* Use [fast mode](/docs/flashbots-protect/quick-start#faster-transactions) to share with all registered builders
* Choose [specific builders](/docs/flashbots-protect/mev-share#builders) to share transactions with

## Who receives refunds

For the RPC: The refund recipient is the address specified in the first [refund parameter](/docs/flashbots-protect/mev-share#refunds) on an RPC request, if one is provided. Otherwise, refunds are sent to the transaction originator (`tx.origin`) by default.

For the private transaction API: The refund recipient is the signer used on the `eth_sendPrivateTransaction` request.

## How to track refunds

Refunds are tracked from a start date of July 8, 2024.

Users will be able to view the unclaimed refund amount for an address in a public API in early July 2024.
