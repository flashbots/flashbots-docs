## Block Builders

### Builder Fundamentals

**What is a Builder?**

Block builders are highly specialized actors who aggregate and construct blocks from transaction orderflow (bundles, private transactions, etc). 

**The Role of Builders**

Builders run algorithms and simulations (e.g. First Come First Serve, First Price Auctions, etc.) to order bundles and TXs in a block template (technically: *execution payload*) that maximizes profit. They then bid for and buy the validators’ blockspace, with the help of one or more relays, so their execution payloads are proposed to the blockchain. 

### Boost-Geth-Builder

[MEV-Boost Geth Builder](https://github.com/flashbots/boost-geth-builder) is a testnet-ready open-source builder reference implementation (not meant for production). 

### Builder Proposer Payment

Details about builder payments to block proposers [can be found here.](https://flashbots.notion.site/WIP-Builder-Payments-to-Block-Proposers-530eb36c60ad417a8702dd26da810b72)