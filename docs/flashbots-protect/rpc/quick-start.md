---
title: quick start
---
**Please note that the Flashbots Protect RPC is currently in public beta. Your transactions may occasionally time out and not be mined!**

The Flashbots Protect RPC allows regular users to easily submit their transactions to the Flashbots Auction by using a custom RPC endpoint in their wallet. Everything should be the same for users, except transactions are sent to Flashbots, and then directly to miners, instead of the public mempool.

There are a few key benefits to using the Flashbots RPC endpoint:
- **Frontrunning protection:** your transaction will not be seen by hungry sandwich bots in the public mempool.
- **No failed transactions:** your transaction will only be mined if it doesn't include any reverts, so you don't pay for failed transactions. Note: your transaction could be uncled, emitted to the mempool, and then included on-chain.
- **Priority in blocks:** transactions sent via Flashbots are mined at the top of blocks, giving them priority.

## Key considerations
Before you get started here are a few things to be mindful of
- **Use a high gas price!** Getting included in a block through Flashbots is harder than getting included in a block normally because you’re competing with MEV bots for priority blockspace in an auction. To maximize your chance of getting included use a high gas price.
- **Your transactions will not display on Etherscan unless and until they are mined.** This is because Etherscan will not be able to see your transaction in the public mempool, and as such doesn't know that it exists. We are working on ways for users to query the status of their transactions.
- We will try to resubmit your transaction for 25 blocks after which point it is considered “expired” and will be dropped.
- Transactions under 42,000 gas, such as simple ether transfers, are rejected by the Flashbots relay. As a result, we will forward these to the public mempool instead.
- Transactions that perform simple actions - such as token approvals or transfers - will be sent to the public mempool as these do not need frontrunning protection.
- There is a risk that your transactions are included in uncled blocks and then emitted to the public mempool. Please read [here](/docs/flashbots-protect/api/uncle-bandits) to learn more about uncle bandits and how to mitigate this risk.
- Your transactions can be emitted to the public mempool if you switch RPC endpoints from the Flashbots Protect RPC to another RPC while your transactions are pending.

## How to use the Flashbots Protect RPC Endpoint in MetaMask
To add the Flashbots endpoint follow these steps:

1. Enter your MetaMask and click on your RPC endpoint at the top of your MetaMask. By default it says “Ethereum mainnet.”
2. Click “Custom RPC”
3. Add `https://rpc.flashbots.net` with a chainID of `1` and currency of `ETH`.
4. Scroll to the bottom and click “Save”

![first metamask onboarding image](/img/flashbotsRPC-metamask1.png)
![second metamask onboarding image](/img/flashbotsRPC-metamask2.png)

## Acknowledgements
Thank you to the [mistX](https://mistx.io/), [Nethermind](https://nethermind.io/), and [MiningDAO](https://miningdao.io/) teams for their contributions to Flashbots Protect RPC.
