---
title: Gas Fee Refunds
---

## Introduction

Flashbots Protect users are automatically eligible to receive gas fee refunds. If Flashbots can include your transaction on chain for a lower price, you are eligible to receive a refund. This applies to both the RPC and the private transaction API.

Gas fee refunds do not change how transactions are executed and users do not need to make any changes to be eligible for them. Gas fee refunds are calculated separately, and applied in addition to, MEV refunds from [MEV-Share](/flashbots-protect/mev-refunds).

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

Note that transactions seen in the public mempool are excluded and do not receive refunds.

## How to maximize both refunds and speed

Transactions which are sent directly to the Flashbots RPC or API, and not multiplexed _by the user_ to other RPCs or block builders, are likely to receive higher refunds. This is because they increase the profit of the Flashbots builder which is used to provide refunds.

The Flashbots block builder does not land 100% of blocks. In order to improve inclusion speed, users can ask Flashbots to share their transactions with other block builders in cases where the Flashbots builder does not win a block. Flashbots will automatically share with all specified builders on the user's behalf.

There are two ways to share with other builders:
* Use [fast mode](/flashbots-protect/quick-start#faster-transactions) to share with all registered builders
* Choose [specific builders](/flashbots-protect/settings-guide#builders) to share transactions with

## Who receives refunds

For the RPC: The refund recipient is the address specified in the first [refund parameter](/flashbots-protect/settings-guide#refunds) on an RPC request, if one is provided. Otherwise, refunds are sent to the transaction originator (`tx.origin`) by default.

For the private transaction API: The refund recipient is the signer used on the `eth_sendPrivateTransaction` request.

## How to track refunds

Refunds are tracked from a start date of July 8, 2024. Refunds are sent to recipients in batches, and originate from our builder address `0xdf99A0839818B3f120EBAC9B73f82B617Dc6A555`. The recipient can track the status of their refunds using the [`flashbots_getFeeRefundTotalsByRecipient`](/flashbots-auction/advanced/rpc-endpoint#flashbots_getfeerefundtotalsbyrecipient) RPC method.

## Distributed refunds

Refunds have been sent as part of the following on-chain transactions:

| Block Number | Sender                                     | Transaction Hash                                                                                                                                                 | Refunded Amount            |
|--------------|--------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------|
| 20728671     | 0xdf99A0839818B3f120EBAC9B73f82B617Dc6A555 | [0xe4c242dbaf75b0c72bf061cb0b24dfb2ac9b889c8312f85502b819c522143475](https://etherscan.io/tx/0xe4c242dbaf75b0c72bf061cb0b24dfb2ac9b889c8312f85502b819c522143475) | `0.005350659617303609` ETH |
| 20730702     | 0xdf99A0839818B3f120EBAC9B73f82B617Dc6A555 | [0x7f4b2747bca62e7cb30595bc8fd597d00b111f6e30836f90420a5f596fe6fb20](https://etherscan.io/tx/0x7f4b2747bca62e7cb30595bc8fd597d00b111f6e30836f90420a5f596fe6fb20) | `2.178974530716050227` ETH |
| 20737357     | 0xdf99A0839818B3f120EBAC9B73f82B617Dc6A555 | [0xa975df43bd397f2a6776811c46d8208df5833b4800f152d5e7df2f96fc20d560](https://etherscan.io/tx/0xa975df43bd397f2a6776811c46d8208df5833b4800f152d5e7df2f96fc20d560) | `1.012930151524122284` ETH |
