---
title: FAQ
---
*Check Flashbots Discord [#release](https://discord.gg/Z26a7e2x) channel for the latest releases.*

Don't see your question answered? Join our dedicated [#🤖searchers](https://discord.gg/KNFBvZzJyT) channel on Discord!

### What is Flashbots Core?

Flashbots Core is a permissionless, transparent, and fair ecosystem for efficient MEV extraction and frontrunning protection which preserves the ideals of Ethereum. Flashbots Core provides a private communication channel between Ethereum users and miners for efficiently communicating preferred transaction order within a block. See the full [Flashbots Core overview](/flashbots-core/overview).

### Who is behind Flashbots Core?

Flashbots Core is built by the Flashbots crew. We are a research and development organization working on solving the problems MEV causes to state-rich blockchains. You can find out more about the organization on our [pm repo](https://github.com/flashbots/pm) and in this introductory [Medium post](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752) that details our values and motives.

### How is Flashbots funded?

The Flashbots organization is funded by long term capital partners with a track record of alignment with the ecosystem. Our current capital partner is [Paradigm](https://www.paradigm.xyz).

### What is the Flashbots Core roadmap?

As laid out in our [ETHResearch post](https://ethresear.ch/t/flashbots-frontrunning-the-mev-crisis/8251), we look at the development of Flashbots in phases. See the latest progress on our [roadmap](/flashbots-core/overview#roadmap).

### Where can I submit a feature request?

In the Flashbots Forums [Discussions section](https://flashbots.com/pm/discussions).

### Can you give a step by step description of how Flashbots works for a searcher today?

* Searchers send Flashbots "bundles" to MEV-Relay. A bundle contains one or several transactions that can be the trader's and/or other users' pending transactions from the mempool, and fees for a bundle can be paid by the searcher via a smart contract call to `block.coinbase.transfer()`
* Moreover, bundles have these properties:
  * Flashbots bundles will always be at the top slot of the block
  * Bundles cannot be 'broken up' into multiple transactions. All transactions in a bundle must be included together. (Note: we cannot prevent your bundle from being included in an uncle or a chain reorg)
* MEV-Relay receives bundles and sends them to all whitelisted miners running MEV-Geth
* Miners receive Flashbots bundles from MEV-Relay and process them in MEV-Geth
* MEV-Geth picks the most profitable combination of bundles out of all bundles it is sent.
* MEV-Geth then compares the block that includes these bundles with a vanilla block that does not include any bundles. If it is more profitable to include a bundle, or multiple ones, MEV-Geth will do so, but otherwise it will default back to a vanilla Geth block.
* Only when the a searcher's bundle is included in a block is the tip associated with their bundle paid.
  * If a bundle is not included it does not cost the searcher anything (i.e. no gas fees are paid for failed transactions)

### Why use Flashbots Core?

* It allows searchers to bypass the Ethereum mempool and avoid their strategy leaking before it is mined on-chain (e.g. being frontrun by generalized frontrunners).
* It allows searchers to save money from avoiding paying gas fees for failed transactions.
* It allows miners to receive additional revenue in the form of the bundle tip in exchange for including the most profitable bundle in the block they mined.
* It reduces Ethereum network congestion and lowers Ethereum network transaction fees.

### How much hashrate is currently on Flashbots Core?

The mining pools running MEV-geth collectively account for over 85.5% of total Ethereum hashrate.

### Can I send bundles directly to miners without going through the Relay?

Using the Flashbots Relay is required during the alpha to aggregate bundle requests from all users, prevent spam and DOS attacks on participating miner(s)/mining pool(s), and collect necessary system health metrics. We are working to remove this requirement in future releases of Flashbots Core. See the trust assumptions of the [Flashbots Alpha](/flashbots-core/overview#trust-assumptions).

### Where are the Relay servers located?

They are currently in US-East-2 (Ohio) but we are thinking of turning them into a lambda that runs globally.

### What are examples of Flashbots transactions?

- Here is an example of a Flashbots bundle with a single transaction:
https://etherscan.io/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4


- Here is an example of a Flashbots bundle with 3 transactions:
    - tx #1: https://etherscan.io/tx/0xab16c4a7dbb403f45b8cd76945d25138d3c9728ece18959eb0c551d6653018d7
    - tx #2: https://etherscan.io/tx/0x89e47b1d61dbbaaee5669fe1dd783fa0564f380eda47df39e4053bccaa057714
    - tx #3: https://etherscan.io/tx/0x9683e160bdf8628c294bf999c874cddff37254eccc0e486dbe2271531b064178

![](https://hackmd.io/_uploads/Sy1Lj2pX_.png)
*Red line indicates where the bundle is*

### What level of transparency do you provide into how this infrastructure works?
MEV-Geth, MEV-Relay and all the code searchers interact with is open-source and documented on our [Github repo](https://flashbots.com). In addition, we publish monthly [transparency reports](https://medium.com/flashbots/tagged/transparency-report).

We've also released a publicly accessible API [blocks.flashbots.net](https://blocks.flashbots.net) for displaying Flashbots blocks and txs, and will be releasing live data visualizations useful in the coming weeks.

### Can Flashbots Core be used concurrently with the regular Ethereum tx pool?

Yes! As a searcher you want to maximize the hashrate you're exposed to and there is no reason you can't submit your trades to Flashbots and another system in parallel. One could also imagine a dual system that submits txs to both the traditional Ethereum mempool and Flashbots, with bot logic conditional on one or the other landing.

### Is Flashbots Core a race to maximize miners profits and minimize searcher profits?

Flashbots Core uses a first-price sealed-bid auction mechanism for allocating blockspace. This mechanism is designed to perform price discovery for an oportunity with minimal negative externalities.

We expect searcher who focus on finding "new alpha" to be able to keep the majority of the profits, while searchers who target competitive opportunities will need to give the majority of profits to miners in order to win the auction.

See the overview for more information on the [auction mechanism](/flashbots-core/overview#how-does-it-work).

### What will happen when EIP1559 is released?

The only change expected is for 0 gas transactions to be forced to pay the `base_fee`.

We may build a BASEFEE provider to still allow empty EOA use of Flashbots vs having to pre-fill it with ETH to pay it.

### Do I need authentication to access the Flashbots Relay?

The Flashbots Relay expects payloads to be signed using a standard Ethereum private key. This relay signing address does not need to be given to Flashbots in advance, and it does not need to store any ETH or other assets (and we recommend it does not and it should be a different key from your bot's EOA key).

The signature needs to be provided via the 'X-Flashbots-Signature' Header. Reference implementation can be found in the [Flashbots Ethers Provider](https://github.com/flashbots/ethers-provider-flashbots-bundle/blob/9e039cc92fcaa3d15e71f11faa7acf4f4f0674fa/src/index.ts#L307-L310)

### Why am I getting rate limitted by the relay?

Rate limiting is currently in place to protect the relay infrastructure from DOS attacks. Similar to how Infura has a gas limit on eth_call. Rate limiting may be removed in the future for searchers who have accumulated good reputation.

### How does searcher reputation work?

By signing payloads with your own relay signing key, this will enable building a reputation for high-priority delivery of your bundles to miners. The Flashbots Relay simulates bundles before sending to miners which can take a small amount of time. The relay cannot determine which bundles are profitable without performing a full simulation. This signing key allows the relay to infer which bundles are likely profitable, based on historical performance. Using a reputation system allows reliable searchers to be rewarded for good performance while still allowing new searchers to participate.

You can query the relay to obtain an understanding of your [reputation score](https://github.com/flashbots/mev-relay-js#flashbots_getuserstats).

### Are you on any testnets?

Yes, we are on Goerli. See this [guide](/flashbots-core/searchers/advanced/goerli-testnet) for more information.

### How do I target a timestamp range instead of a block number when submitting a bundle?

The best way to do this is to submit one bundle for each block in a range of blocks that is likely to contain the first block with a block.timestamp greater than the target timestamp.

You **do** need to submit a bundle per target block. You can re-submit the exact same signed transaction bundle; you don't need to re-sign. A more flexible API will be released soon to make this more efficient.

You can ALSO provide a minimum/maximum timestamp in the bundle, but this only provides a hint to discard the block if it falls outside this time range. It does not expand the target outside the single indicated block number, and it does not change the timestamp selected by the miner.

- 0,0 timestamp means no restriction

### Can I submit directly to the sendBundle method without using the library?

Please see the [reference implementation](https://github.com/flashbots/ethers-provider-flashbots-bundle), in particular how signing is done in order to be processed by the Relay.

### What is block.coinbase?

Block.coinbase is a standard Solidity function that gives the current block miner’s address. Read more about it [here](https://docs.soliditylang.org/en/v0.8.4/units-and-global-variables.html#block-and-transaction-properties).

### Do I need ETH in my account to pay block.coinbase to the Flashbots miner?

No, you can pay the miner with the profit of your bundle if it lands on-chain. This allows for account abstraction - something explained [here](https://github.com/flashbots/pm/issues/24) in further details.

### Can I pay my coinbase bribe in something else than ETH?

Unfortunately not at the current moment.

### Since this is a first-price sealed-bid auction, how do I know how much to bid for my bundle to win?

The lower bound on a successfully mined Flashbots bundle is the block tail gas price since the 'tail' of the block, and its transactions, will be pushed out to make room for a Flashbots bundle of transactions. This is what the miner's software will compare against when deciding whether to mine a Flashbots block or the vanilla Geth block.

If you have no competition for that block, then any tip above the lower bound will get you included (modulo hashrate). If other searchers are going for the same block, you have to pay the highest tip of conflicting bundles for your bundle to be selected. We suggest you look at past data for other bids to get an idea of the average bid sizes and encourage you to check the [bundle pricing section](/flashbots-core/searchers/advanced/bundle-pricing) in advanced concepts.

### Will you implement a way for several non-overlapping bundles to be accepted within the same block?

Yes, bundle merging is introduced in the [alpha-v0.2 release](/flashbots-core/releases/alpha-v0.2).

### Where can I get data on past auctions and past blocks?

[blocks.flashbots.net](https://blocks.flashbots.net)

### When miners select bundles, are they differentiating between transfers to the coinbase and the gas fees to select which bundle is valid for inclusion?

Nope!

### Can I simulate my bundle against historical blocks to backtest them?

Yes, but only for dates after March 12th since the Relay is running with partial archive nodes. This means you can simulate blocks >= 12030000. This range will be extended shortly.

### Can bundle simulations take into account state changes from an earlier transaction in the bundle? Eg. say first TX is buying the tokens, second is selling.

Yep!

### Can I estimate gas used of the bundle beforehand?

Yes. You'll want to simulate with a 'fake' tip, like 1 wei, then see how much gas it uses, then change the tip.

### How does MEV-Geth work when it receives bundles?

Currently, MEV-Geth compares:
1. A normally constructed block.
2. Your bundle at the head of the block followed by a normally constructed everything else.
3. Alice's bundle at the head of the block, followed by a normally constructed block.
4. Bob's bundle at the head of the block, followed by a normally constructed block.
6. Carol's bundle at the head of the block, followed by a normally constructed block.
...

It then picks the block that results in the miner's balance increasing the most.

### Can I use a contract to tip ETH to the miner?

You can pay miners either via gas or by sending ETH to their coinbase.
It's best to pay via block.coinbase transfer to prevent the inclusion of your bundle when you miss (i.e. you remove the miner incentive of inclusion on a miss) and to protect yourself from re-orgs.

### Can I deploy contracts using MEV?

Yes, you can pay the block.coinbase fee in the constructor or you can pay the block.coinbase fee in a separate tx after your contract creation.
Crucially, you don't need to deploy a new contract to include block.coinbase.transfer in the contract function, one already exists [FLashbotsCheckAndSend](https://etherscan.io/address/0xc4595e3966e0ce6e3c46854647611940a09448d3).

### Why didn't my transaction get included?

Unlike broadcasting a transaction and landing on-chain, even if the transaction fails, troubleshooting Flashbot bundles can be challenging, since transaction failure, incentives not being high enough, and a non-flashbot-miner all look the same: your transactions do not show up.

If using the library linked above, sending a bundle returns a promise that resolves to one of three outcomes:

1. Your bundle was included successfully on the target block
2. Your bundle became invalid due to one of the nonces inside the transaction becoming too low, either before or on the target block
3. Your bundle was not included, either because your coinbase payment was too low OR because the miner at the target block height was not a Flashbot miner

We recommend checking out this [great guide](https://fifikobayashi.medium.com/beginners-guide-to-troubleshooting-mev-on-flashbots-aee175048858) by Flashbots community member [Fiona Kobayashi](https://twitter.com/fifikobayashi) on issues searchers would have as they start sending Flashbots bundles. Fiona goes over a few reasons why your bundle might not be picked by miners:
* Noncompetitive gwei price
* Incorrect gas estimates
* Miner luck
* Outcompeted by another searcher
* Failing transaction
* Rate limiting
* Transaction nonce is too low

### What do I need to change in my bot aside from using the sendBundle to submit transactions?

To get the full benefit of using flashbots, it is beneficial to transition from transaction fee payment (e.g. `gasPrice * gasUsed`) to coinbase payments. Since you can now submit 0-gas-price transactions, you will need to add functionality to your on-chain code to pay `block.coinbase.transfer()` based on the reward intended for the miner.

This can come from a calldata argument or some fixed percentage of the overall opportunity calculated on-chain. We recommend using calldata for specifying the reward in order to quickly react to fluctuations in flashbot bundle prices.

### Can I have a running bundle which I constantly update whenever I find a new trade? Essentially I want to continuously update my bunle until the next block arrives.

Your previous bundle is dropped if the new bundle is more valuable.
