---
title: quick start
---

:::caution

Version v0.2 is currently being released in stages and will be fully operational after the 1st of June 2021

:::


**Stage I. Miner Authentication**
* Step 0: For new mining pools who would like to receive Flashbots bundles, please complete the [Miner Indication of Interest Form](https://docs.google.com/forms/d/e/1FAIpQLSdz29fKXJXJFWXkEu8hZNG-NJUeAbOz0Jvw9mnNLskJHlMUDA/viewform).
* Step 1: Generate a new ethereum address, save the private key for step 5
* Step 2: Send the new ethereum address to Flashbots through a pre-established Flashbots technical support private Discord channel
* Step 3: Wait for Flashbots to ask you for the same ethereum address via another independent channel (email/wechat/telegram) as a 2FA verification

:::caution

It is critical that miners only send their address to a trusted member of the Flashbots team, over a previously established communication channel.

:::

**Stage II. Setting up MEV-Geth**

* Step 4: Download the latest version of MEV-Geth from the [Flashbots repository](https://github.com/flashbots/mev-geth/releases) or implement required changes based on the [spec](mev-geth-spec/v02.md)
* Step 5: Add the private key to the cli command for the miner's mev-geth, eg. --relayWSSigningKey=0x.... You should start receiving some test bundles through the newly established websocket connection to test your set up.
* Step 6: You will start receiving MEV bundles from Flashbots relay.