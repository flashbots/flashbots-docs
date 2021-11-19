---
title: quick start
---
**Please note that Flashbots Protect RPC is currently in public beta. Your transactions may occasionally time out and not be mined!**

Flashbots Protect RPC allows regular users to easily submit their transactions to the Flashbots Auction by using a custom RPC endpoint in their wallet. Everything should be the same for users, except transactions are sent to Flashbots, and then directly to miners, instead of the public mempool.

There are a few key benefits to using the Flashbots RPC endpoint:
- **Frontrunning protection:** your transaction will not be seen by hungry sandwich bots in the public mempool.
- **No failed transactions:** your transaction will only be mined if it doesn't include any reverts, so you don't pay for failed transactions. Note: your transaction could be uncled, emitted to the mempool, and then included on-chain.
- **Priority in blocks:** transactions sent via Flashbots are mined at the top of blocks, giving them priority.

## Key considerations
Before you get started here are a few things to be mindful of
- **You can find the status of your transaction on Etherscan.** Etherscan has a nice interface for viewing the status of your transaction from our [status API](/flashbots-protect/rpc/status-api).
- We will try to resubmit your transaction for 25 blocks after which point it is considered “expired” and will be dropped.
- Transactions under 42,000 gas, such as simple ether transfers, are rejected by the Flashbots relay. As a result, we will forward these to the public mempool instead.
- Transactions that perform simple actions - such as token approvals or transfers - will be sent to the public mempool as these do not need frontrunning protection.
- **There is a risk that your transactions are included in uncled blocks** and then emitted to the public mempool. Please read [the uncle bandits article](/flashbots-protect/rpc/uncle-bandits) to learn more about uncle bandits and how to mitigate this risk.
- Your transactions can be emitted to the public mempool if you switch RPC endpoints from Flashbots Protect RPC to another RPC while your transactions are pending.

## Choosing the right gas price
In most cases sending a transaction through Flashbots Protect RPC should not require a higher gas price than normal. However, in periods of high load, you may want to increase gas prices to ensure your transaction is mined quickly. If the network is congested and you need your transaction quickly you could up your max fee to adjust for fluctations in base fee and set your priority fee to be 3 - 5 gwei.

Note also that the money saved from keeping reverts from landing on-chain means you will save money *even if you occasionally need to pay higher fees during periods of congestion*.

## How to use Flashbots Protect RPC in MetaMask

To add Flashbots Protect RPC endpoint follow these steps:

1. Enter your MetaMask and click on your RPC endpoint at the top of your MetaMask. By default it says “Ethereum mainnet.”
2. Click “Custom RPC”
3. Add `https://rpc.flashbots.net` with a chainID of `1` and currency of `ETH`.
4. Scroll to the bottom and click “Save”

![first metamask onboarding image](/img/flashbotsRPC-metamask1.png)
![second metamask onboarding image](/img/flashbotsRPC-metamask2.png)

## Fixing stuck transactions or fixing nonce errors
In the case that your transaction is stuck in a "pending" state or you have an extremely high nonce, you will need to 'reset' your MetaMask account. This will cause it to update the nonce and transaction history from the network. Don't worry, your funds and keys are safe during this process.

Follow these steps:
1. Click the account icon on the top-right corner of MetaMask.
2. Click "Settings".
3. Click "Advanced".
4. Scroll down and click Reset Account.

In the future we will offer more tooling to cancel transactions.

## Acknowledgements
Thank you to the [mistX](https://mistx.io/), [Nethermind](https://nethermind.io/), and [MiningDAO](https://miningdao.io/) teams for their contributions to Flashbots Protect RPC.
