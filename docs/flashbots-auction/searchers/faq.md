---
title: FAQ
---
*Check Flashbots Discord [#release](https://discord.com/invite/7hvTycdNcK) channel for the latest releases.*

Don't see your question answered? Join our dedicated [#🤖searchers](https://discord.com/invite/7hvTycdNcK) channel on Discord and be sure to check out our [Searchers Self Support Group](https://collective.flashbots.net/c/searchers/12)!

### What is Flashbots Auction?

Flashbots Auction is a permissionless, transparent, and fair ecosystem for efficient MEV extraction and frontrunning protection which preserves the ideals of Ethereum. Flashbots Auction provides a private communication channel between Ethereum users and miners for efficiently communicating preferred transaction order within a block. See the full [Flashbots Auction overview](/flashbots-auction/overview).

### Who is behind Flashbots Auction?

Flashbots Auction is built by the Flashbots crew. We are a research and development organization working on solving the problems MEV causes to state-rich blockchains. You can find out more about the organization on our [pm repo](https://github.com/flashbots/pm) and in this introductory [Medium post](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752) that details our values and motives.

### How is Flashbots funded?

The Flashbots organization is funded by long term capital partners with a track record of alignment with the ecosystem. Our current capital partner is [Paradigm](https://www.paradigm.xyz).

### What is the Flashbots Auction roadmap?

See the latest progress on our [roadmap](/flashbots-auction/overview#roadmap).

### Where can I submit a feature request?

In the Flashbots Forums [Discussions section](https://github.com/flashbots/pm/discussions).

### Can you give a step by step description of how Flashbots works for a searcher today?

* Searchers send Flashbots "bundles" to MEV-Relay. A bundle contains one or several transactions that can be the trader's and/or other users' pending transactions from the mempool, and fees for a bundle can be paid by the searcher via a smart contract call to `block.coinbase.transfer()`
* Moreover, bundles have these properties:
  * Flashbots bundles will always be at the top slot of the block
  * Bundles cannot be 'broken up' into multiple transactions. All transactions in a bundle must be included together. (Note: we cannot prevent your bundle from being included in an uncle or a chain reorg)
* MEV-Relay receives bundles and sends them to all whitelisted miners running MEV-Geth
* Miners receive Flashbots bundles from MEV-Relay and process them in MEV-Geth
* MEV-Geth picks the most profitable combination of bundles out of all bundles it is sent.
* MEV-Geth then compares the block that includes these bundles with a vanilla block that does not include any bundles. If it is more profitable to include a bundle, or multiple ones, MEV-Geth will do so, but otherwise it will default back to a vanilla Geth block.
* Only when the searcher's bundle is included in a block then the tip associated with their bundle is paid.
  * If a bundle is not included it does not cost the searcher anything (i.e. no gas fees are paid for failed transactions)

### Why use Flashbots Auction?

* It allows searchers to bypass the Ethereum mempool and avoid their strategy leaking before it is mined on-chain (e.g. being frontrun by generalized frontrunners).
* It allows searchers to save money from avoiding paying gas fees for failed transactions.
* It allows miners to receive additional revenue in the form of the bundle tip in exchange for including the most profitable bundle in the block they mined.
* It reduces Ethereum network congestion and lowers Ethereum network transaction fees.

### How much hashrate is currently on Flashbots Auction?

The mining pools running MEV-geth collectively account for over 85.5% of total Ethereum hashrate.

### Can I send bundles directly to miners without going through the Relay?

Using the Flashbots Relay is required during the alpha to aggregate bundle requests from all users, prevent spam and DOS attacks on participating miner(s)/mining pool(s), and collect necessary system health metrics. We are working to remove this requirement in future releases of Flashbots Auction. See the trust assumptions of the [Flashbots Alpha](/flashbots-auction/overview#trust-assumptions).

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
With the exception of MEV-Relay which is now closed source, MEV-Geth and all the code searchers interact with is open-source and documented on our [Github repos](https://github.com/flashbots). In addition, we publish monthly [transparency reports](https://medium.com/flashbots/tagged/transparency-report).

We've also released a publicly accessible API [blocks.flashbots.net](https://blocks.flashbots.net) for displaying Flashbots blocks and txs, and will be releasing live data visualizations useful in the coming weeks.

### Can Flashbots Auction be used concurrently with the regular Ethereum tx pool?

Yes! As a searcher you want to maximize the hashrate you're exposed to and there is no reason you can't submit your trades to Flashbots and another system in parallel. One could also imagine a dual system that submits txs to both the traditional Ethereum mempool and Flashbots, with bot logic conditional on one or the other landing.

### Is Flashbots Auction a race to maximize miners profits and minimize searcher profits?

Flashbots Auction uses a first-price sealed-bid auction mechanism for allocating blockspace. This mechanism is designed to perform price discovery for an oportunity with minimal negative externalities.

We expect searcher who focus on finding "new alpha" to be able to keep the majority of the profits, while searchers who target competitive opportunities will need to give the majority of profits to miners in order to win the auction.

See the overview for more information on the [auction mechanism](/flashbots-auction/overview#how-does-it-work).

### What will happen to Flashbots after The Merge?
[to update]


### Do I need authentication to access the Flashbots Relay?

The Flashbots Relay expects payloads to be signed using a standard Ethereum private key. This relay signing address does not need to be given to Flashbots in advance, and it does not need to store any ETH or other assets (and we recommend it does not and it should be a different key from your bot's EOA key).

The signature needs to be provided via the 'X-Flashbots-Signature' Header. Reference implementation can be found in the [Flashbots Ethers Provider](https://github.com/flashbots/ethers-provider-flashbots-bundle/blob/9e039cc92fcaa3d15e71f11faa7acf4f4f0674fa/src/index.ts#L307-L310)

### Why am I getting rate limited by the relay?

Rate limiting is currently in place to protect the relay infrastructure from DOS attacks. Similar to how Infura has a gas limit on eth_call. Rate limiting may be removed in the future for searchers who have accumulated good reputation.

### How does searcher reputation work?

By signing payloads with your own relay signing key, this will enable building a reputation for high-priority delivery of your bundles to miners. The Flashbots Relay simulates bundles before sending to miners which can take a small amount of time. The relay cannot determine which bundles are profitable without performing a full simulation. This signing key allows the relay to infer which bundles are likely profitable, based on historical performance. Using a reputation system allows reliable searchers to be rewarded for good performance while still allowing new searchers to participate.

You can query the relay to obtain an understanding of your [reputation score](https://docs.flashbots.net/flashbots-auction/miners/mev-relay#flashbots_getuserstats).

### Are you on any testnets?

Yes, we are on Goerli. See this [guide](/flashbots-auction/searchers/advanced/goerli-testnet) for more information.

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

If you have no competition for that block, then any tip above the lower bound will get you included (modulo hashrate). If other searchers are going for the same block, you have to pay the highest tip of conflicting bundles for your bundle to be selected. We suggest you look at past data for other bids to get an idea of the average bid sizes and encourage you to check the [bundle pricing section](/flashbots-auction/searchers/advanced/bundle-pricing) in advanced concepts.

### Will you implement a way for several non-overlapping bundles to be accepted within the same block?

Yes, bundle merging is introduced in the [alpha-v0.2 release](/flashbots-auction/releases/alpha-v0.2).

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

[to update]

### What are mega bundles?
[to update]

### Can I use a contract to tip ETH to the miner?

You can pay miners either via gas or by sending ETH to their coinbase.
It's best to pay via block.coinbase transfer to prevent the inclusion of your bundle when you miss (i.e. you remove the miner incentive of inclusion on a miss) and to protect yourself from re-orgs.

### Can I deploy contracts using MEV?

Yes, you can pay the block.coinbase fee in the constructor or you can pay the block.coinbase fee in a separate tx after your contract creation.
Crucially, you don't need to deploy a new contract to include block.coinbase.transfer in the contract function, one already exists [FLashbotsCheckAndSend](https://etherscan.io/address/0xc4595e3966e0ce6e3c46854647611940a09448d3).

### Why didn't my transaction get included?

See our [Searcher Troubleshooting Guide](/flashbots-auction/searchers/advanced/troubleshooting)


### What do I need to change in my bot aside from using the sendBundle to submit transactions?

To get the full benefit of using Flashbots, it is worth considering the benefits of transitioning from priority fee payment (e.g. `priorityFee * gasUsed`) to coinbase payments. As of EIP-1559, you can no longer use `0-gas-price` transactions, but you CAN use `0-priority-fee` transactions, combined with custom functionality to your on-chain code to pay `block.coinbase.transfer()` based on the reward intended for the miner.

Using `0-priority-fee` has several important benefits:
 - Allows you to keep less ETH in your bot's `EOA` account (less at risk on a hot address, smaller capital requirements)
 - Can pay miner out of proceeds of the opportunity, which could be more ETH than you have on hand!
 - Can dynamically adjust to size of opportunity on-chain
 - If your bot's transaction is leaked or `uncle`d, there is no incentive to a miner to include your transaction later unless it succeeds. `uncle`d transactions that use a priority fee will still land on chain and cost your `EOA` ETH, even when the opportunity was missed.

This coinbase transfer amount can be determined in the middle of your contract logic or could come from a calldata argument or some  percentage of the overall opportunity calculated on-chain. We recommend using calldata for specifying the reward in order to quickly react to fluctuations in competing Flashbots bundle prices.

### Can I have a running bundle which I constantly update whenever I find a new trade? Essentially I want to continuously update my bunle until the next block arrives.

Your previous bundle is dropped if the new bundle is more valuable.

### Where can I view the health status of Flashbots' infrastructure?

Status is reported at https://status.flashbots.net/. Please check this link for any network outages or downtime.

### How will sending bundles change in PoS Ethereum?

Sending bundles will feel very much the same as it does with Flashbots PoW Ethereum infrastructure. You’ll still be able to send & simulate atomic bundles, and use the same bidding strategies in the blockspace/MEV auction.

The real difference is in the backend architecture.

`relay.flashbots.net` (where bundles are sent in PoW Ethereum) will send bundles to the Flashbots builder after the merge. On the searcher side, the method for sending bundles to flashbots doesn’t change at all. All Flashbots relay endpoints from PoW Ethereum will be the same post-merge.

With PBS, you may want to send bundles to more builders than just Flashbots. Other builders will need to implement their own version of this bundle relay to accept bundles, but as long as other builders adhere to the same API specification as Flashbots, you can use existing Flashbots client libraries to interact with these builders.

### How do I choose a good block builder?

There are a few criteria to look for in a block builder:

* Are they committed to fair and unbiased execution?
  * A good builder will not front-run, sandwich or censor bundles, or otherwise engage in activities that abuse privileged data access.
* Do they connect to a trusted relay?
  * Keep in mind that the relay can also see raw transactions, which gives them the ability to front-run, censor, etc.
* Does their relay connect to enough validators?
  * The more validators a relay connects to, the more slots will generally be available for builders connected to that relay. When you’re targeting a specific block/slot, it’s imperative that you send your transactions to a builder which is connected to the validator responsible for proposing a block in that slot. More validators ⇒ better inclusion rates.
  * Note: Any validator can [use mev-boost to connect to the Flashbots relay and other relays](https://github.com/flashbots/mev-boost#usage).
  * It’s also worth considering how much collective stake the validators connected to a relay have. Generally speaking, if more than one block is proposed to the network (unusual but possible), the block with the most collective stake attesting to it will be included. This scenario is explained in greater detail in the [Ethereum docs](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/#fork-choice).

Also note that block builders have the freedom to specialize. You may find that one builder is more or less friendly to your strategy than others. Builders are competing with each other, so they are all incentivized to include your bundles in their blocks, but you may find that some builders will prioritize certain strategies over others regardless of potential profits. Builders might also censor certain bundles due to local regulations or corporate strategies and policies. There are a lot of variables in play here, so I recommend trying a few trusted builders and seeing how your mileage varies first-hand.

Flashbots will run a builder that follows the same principles we’ve adhered to in PoW Ethereum: democratized access to MEV, fair & reliable execution, and privacy.

### How are “relays” defined in PoS Ethereum?

Before the merge, mev-relay (commonly referred to as "the relay")  was responsible for accepting bundles from searchers and relaying them to miners.

After the merge, the term "relay" will mean something entirely different. *These* relays are a component of PBS -- they're responsible for escrowing blocks from builders for validators. With mev-boost, validators choose the most profitable block from a number of relays. Each relay keeps the contents of a block private until the validator commits to proposing it to the network for inclusion.

Specifically, relays do the following:

* accept new blocks from builders
* send header of most profitable block to a validator upon request
  * *the validator locks in their commitment to propose the full block by signing this header*
* send full block to validator after receiving block header signed by the validator
* perform all of this quickly and reliably, so that validators don’t miss proposal deadlines

For a deeper explanation of mev-boost and relays, Check out @thegostep’s *[ethresear.ch post](https://ethresear.ch/t/mev-boost-merge-ready-flashbots-architecture/11177)*.

For more information about how bundles are sent post-merge, see [this forum post](https://collective.flashbots.net/t/how-will-sending-bundles-change-in-pos-ethereum/147).

### Can I be a block builder? How?

mev-boost provides the foundation for a competitive market of block builders, each trying to provide the most profitable block to validators. Naturally, some searchers should want to become builders themselves. We expect there to be multiple relays in the future with varying requirements on who can submit blocks to them and how those blocks can be submitted. We are currently working on the rules for how the Flashbots Relay for mev-boost will accept blocks from builders.

If you are interested in becoming a builder or just want to learn more, check out [this issue on mev-boost](https://github.com/flashbots/mev-boost/issues/145).

### What trust assumptions exist in proposer-builder separation (PBS)?

In this initial implementation of PBS (mev-boost), to prevent things like front-running, censorship, and unauthorized data sharing, each party has to trust the parties to which they connect. When PBS is [built natively](https://ethresear.ch/t/two-slot-proposer-builder-separation/10980) into the Ethereum protocol, these trust assumptions will be reduced by eliminating the need for relays.

* Searchers have to trust the builder(s) to which they send bundles.
  
  Builders may be the most incentivized to ~~use~~ abuse your transactions to extract additional MEV. As a searcher, you must find a builder with reputation at stake, so you can trust that they won’t take short-term profits in favor of your continued bundle submissions.

* Builders have to trust the relay to which they send blocks.
  
  For background on relays, see [this post](https://collective.flashbots.net/t/how-are-relays-defined-in-pos-ethereum/148).

  Of course, block builders have to trust that relays won’t leak transaction data or use it to extract additional MEV (secretly building blocks themselves). But the other major consideration is that the relay has to respond to the validator’s requests quickly, so that the validator does not miss the chance to propose a builder’s block. If the validator misses the slot, the builder of the most profitable block which would have been proposed loses out on their profits as well.

* Validators have to trust the relay(s) from which they receive blocks.
  
  A strictly rational validator won’t care if a relay abuses their transaction view and extracts unfair MEV, as this is actually more profitable for the validator. That being said, if a relay abuses its power, it won’t last for long.
  
  For validators, the performance of the relay is paramount. Validators must trust that the relay(s) they connect to will respond to their requests quickly and reliably. If the relay does not respond in time, a validator may miss their window to include a block in the next slot, and will not earn any rewards for their participation.

Read more about the trust assumptions of mev-boost-enabled PBS in [Stephane’s research post](https://ethresear.ch/t/mev-boost-merge-ready-flashbots-architecture/11177).

### Will the mempool change in PoS Ethereum?

The public mempool works the same in PoS as in PoW — anyone running an execution client (e.g. geth) can read transactions from the mempool.

It should be noted, however, that the post-merge public mempool may not see as much activity as it does today. With PBS, users and wallets may choose to send all of their transactions to a specific builder (or builders) rather than to the public mempool.
