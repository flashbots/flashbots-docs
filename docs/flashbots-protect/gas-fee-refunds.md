---
title: Gas Fee Refunds
---

## Introduction

Flashbots Protect users are automatically eligible to receive gas fee refunds, if a transaction can be landed onchain for a lower price. This applies to both the RPC and the private transaction API.

Gas fee refunds do not change how transactions are executed and users do not need to make any changes to be eligible for them. Gas fee refunds are calculated separately, and applied in addition to, MEV refunds from [MEV-Share](/flashbots-protect/mev-refunds).

## Where do refunds come from

Users and orderflow providers (like wallets) often pay high priority fees to land transactions on chain. Many of these transactions could be executed just as quickly for a fraction of the gas cost.

It can be difficult to estimate gas correctly when sending a transaction. Flashbots Protect sends all transactions to [BuilderNet](https://buildernet.org/), which calculates the optimal fee on your behalf and refunds transactions that overpay.

Gas fee refunds include both priority fees (more common in user transactions) and coinbase transfers (less common).

## Which transactions receive refunds

Flashbots Protect provides refunds for transactions in blocks landed by BuilderNet. Whether a transaction receives a refund depends on a few factors that vary from block to block:
* How much network congestion and competition there was
* Whether BuilderNet made a profit and how much
* How much the specific transaction contributed to the value of the block
* If the transaction was sent directly to Flashbots Protect, or shared with other RPCs and block builders

Note that transactions seen in the public mempool are excluded and do not receive refunds.

## How to maximize both refunds and speed

Transactions which are sent directly to the Flashbots RPC or API, and not multiplexed _by the user_ to other RPCs or block builders, are likely to receive higher refunds. This is because they increase the profit of BuilderNet which is used to provide refunds.

BuilderNet does not land 100% of blocks. In order to improve inclusion speed, users can ask Flashbots to share their transactions with other block builders in cases where BuilderNet does not win a block. Flashbots will automatically share with all specified builders on the user's behalf.

There are two ways to share with other builders:
* Use [fast mode](/flashbots-protect/quick-start#faster-transactions) to share with all registered builders
* Choose [specific builders](/flashbots-protect/settings-guide#builders) to share transactions with

## Who receives refunds

For the RPC: The refund recipient is the address specified in the first [refund parameter](/flashbots-protect/settings-guide#refunds) on an RPC request, if one is provided. Otherwise, refunds are sent to the transaction originator (`tx.origin`) by default.

For the private transaction API: The refund recipient is the signer used on the `eth_sendPrivateTransaction` request.

## How to track refunds

Refunds are tracked from a start date of July 8, 2024. Refunds are sent to recipients in batches, the first batch originated from the Flashbots builder address `0xdf99A0839818B3f120EBAC9B73f82B617Dc6A555` while newer batches originate from [`refunds.buildernet.eth`](https://etherscan.io/address/0x62a29205f7ff00f4233d9779c210150787638e7f). The recipient can track the status of their refunds using the [`flashbots_getFeeRefundTotalsByRecipient`](/flashbots-auction/advanced/rpc-endpoint#flashbots_getfeerefundtotalsbyrecipient) RPC method.

## Distributed refunds

The on-chain transactions corresponding to distributed refunds can be viewed with this Dune query: [https://dune.com/queries/4398421](https://dune.com/queries/4398421)
