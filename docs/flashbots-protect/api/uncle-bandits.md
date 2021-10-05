---
title: uncle bandit risk
---

Transactions using Flashbots for frontrunning protection in theory never reach the public mempool and therefore should not be visible to bot operators until successfully mined in the chain. However, if the block in which the transaction is included is uncled (honestly or maliciously), the transactions are revealed and can be targeted. This type of exploit is dubbed an “[uncle bandit](https://twitter.com/bertcmiller/status/1382673587715342339?s=20)”. On average, [1 in 20 blocks](https://ycharts.com/indicators/ethereum_uncle_rate) are uncled.

In order to protect against uncle bandits, users looking for frontrunning protection should include a check on the parent hash in their transaction:

```
require(blockhash(block.number - 1) == expectedParentHash, "block was uncled");
```

Note that this check needs to be done in the smart contract that you are interacting with, and is not widely supported at this time.
