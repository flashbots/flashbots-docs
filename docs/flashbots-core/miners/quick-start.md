---
title: quick start
---

### Onboard Flashbots Alpha as a Miner

We invite you to try Flashbots during this Alpha phase and start receiving MEV revenue by following these 4 steps:

1. Fill out this [form](https://forms.gle/78JS52d22dwrgabi6) to indicate your interest in participating in the Alpha and be added to the MEV-relay miner whitelist.
2. You will receive an onboarding email from Flashbots to help [set up](https://github.com/flashbots/mev-geth/blob/master/README.md#quick-start) your MEV-geth node and protect it with a [reverse proxy](https://github.com/flashbots/mev-proxy).
3. To start receiving flashbots bundles from users, the miner needs to set a [reverse proxy](https://github.com/flashbots/mev-proxy) to open their `eth_sendBundle` rpc and request to be whitelisted on the Flashbots hosted gateway called [MEV-relay](https://github.com/flashbots/mev-relay-js). MEV-relay is needed during the alpha to aggregate bundle requests from all users, prevent spam and DOS attacks on participating miner(s)/mining pool(s), and collect necessary system health metrics.
4. Respond to Flashbots' email with your MEV-geth node endpoint to be added to the MEV-relay gateway.
5. After receiving a confirmation email that your MEV-geth node's endpoint has been added to the relay, you will immediately start receiving Flashbots transaction bundles with associated MEV revenue paid to you.


See you on chain! :zap:🤖
