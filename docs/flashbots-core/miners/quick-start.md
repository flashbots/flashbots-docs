---
title: onboarding
---

For new mining pools who would like to receive Flashbots bundles, please complete the [Miner Indication of Interest Form](https://docs.google.com/forms/d/e/1FAIpQLSdz29fKXJXJFWXkEu8hZNG-NJUeAbOz0Jvw9mnNLskJHlMUDA/viewform).

The following steps are for mining pools already running Flashbots to receive v0.2 bundles:

**Stage I. Miner Authentication**
* Step 1: Generate a new ethereum address, save the private key for step 5
* Step 2: Send the new ethereum address to Flashbots through a pre-established Flashbots technical support private Discord channel
* Step 3: Wait for Flashbots to ask you for the same ethereum address via another independent channel (email/wechat/telegram) as a 2FA verification

:::caution

It is critical that miners only send their address to a trusted member of the Flashbots team, over a previously established communication channel.

:::


**Stage II. Integration and Testing (May 17 - 23)**
* Step 4: Update MEV-geth node to the lastest version according to the [MEV-geth v0.2 spec](https://github.com/flashbots/mev-geth/releases/tag/v1.10.3-mev0.2.0), MEV-geth v0.2 reference implementation released on May 17
* Step 5: Add the private key to the cli command for the miner's mev-geth, eg. `--relayWSSigningKey=0x....` You should start receiving some test fundles through the newly established websocket connection to test your set up.

:::tip reminder

Please continue to run your MEV-geth v0.2 pre-release node, while you set up a v0.2 full release node for testing.

:::



**Stage III. Receive Flashbots Bundles on v0.2 nodes (May 24 - 30)**
* Step 6: We will start sending Flashbots MEV bundles to the mining pools who have integrated with Flashbots Alpha v0.2.
* Step 7: Start migrating your hashrate to the Flashbots Alpha v0.2 nodes

:::tip reminder

Please continue to run your MEV-geth v0.2 pre-release node, while you set up a v0.2 full release node for testing.

:::


**Stage IV. Complete switch to v0.2 nodes (May 31)**
* Step 8: Flashbots relay stops delivering bundles over RPC, and your v0.1 and v0.2 pre-release nodes can safely be shut down, leaving only the Flashbots Alpha v0.2 nodes.
