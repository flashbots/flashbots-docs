---
title: MEV Proxy
---
TODO: Add proper link
[A simple example](#) of a reverse proxy that a miner can run to expose just the eth_sendBundle JSON-RPC method. You can install/run it like so:

```bash
# install nodejs on your system, e.g. `sudo apt install nodejs npm` on debian/ubuntu
sudo npm install -g yarn

git clone https://github.com/flashbots/mev-proxy
cd mev-proxy

yarn install
yarn run start
```
