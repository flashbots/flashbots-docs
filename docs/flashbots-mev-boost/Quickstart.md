1. [Install the latest version of MEV-Boost](https://github.com/flashbots/mev-boost/blob/main/README.md#installing)
2. Connect MEV-Boost to desired MEV-Boost relays:
    
    ```bash
    ./mev-boost -mainnet -relay-check -relays relay1,relay2
    ```
    
    - Remember to use the appropriate network flag for the specific network and relay URL, 
    e.g. `-mainnet`, `-sepolia` or  `-goerli`.
3. Configure a [supported consensus client](https://www.notion.so/MEV-Boost-in-a-Nutshell-8e704942bcf94f7a86abef8fb2ccdad6). Detailed instructions are available on the [MEV-boost testing wiki](https://github.com/flashbots/mev-boost/wiki/Testing), and guides for connecting the client to mev-boost can be found in the [consensus client compatibility table](https://www.notion.so/MEV-Boost-in-a-Nutshell-8e704942bcf94f7a86abef8fb2ccdad6) below.
4. Confirm that the setup works by calling the [data API to see your validator registration](https://bit.ly/3eqLQYC).

---

## Relay List

For a comprehensive list of relay URL endpoints by network and operator maintained by the community, please refer to:

- [Ethstaker URL](https://github.com/remyroy/ethstaker/blob/main/MEV-relay-list.md)
- [Lido URL](https://research.lido.fi/t/lido-on-ethereum-call-for-relay-providers/2844)


## Consensus Client Compatibility

MEV-Boost is designed to be compatible with the standard [Ethereum Builder API](https://github.com/ethereum/builder-specs). This means it is compatible with all consensus and execution clients. You can find guides for installing with your favorite consensus client below!

|  | [Teku](https://docs.teku.consensys.net/en/latest/HowTo/Builder-Network/) | [Prysm](https://github.com/prysmaticlabs/prysm/) | [Lighthouse](https://github.com/sigp/lighthouse) |[Nimbus](https://github.com/status-im/nimbus-eth2/) | [Lodestar](https://github.com/ChainSafe/lodestar) |
| --- | --- | --- | --- | --- | --- |
| Setup Guide: | [Guide](https://docs.teku.consensys.net/en/latest/HowTo/Builder-Network/) | [Guide](https://hackmd.io/@prysmaticlabs/BJeinxFsq) | [Guide](https://lighthouse-book.sigmaprime.io/builders.html) | [Guide](https://nimbus.guide/external-block-builder.html) | [Guide](https://github.com/ChainSafe/lodestar/blob/unstable/docs/usage/mev-integration.md) |

---

*Users of this informational material are responsible for determining any applicable legal restrictions on any direct or derivative use of this information, including complying with applicable economic sanctions laws within their home jurisdictions.  Please also see Github’s [Trade Controls](https://docs.github.com/en/site-policy/other-site-policies/github-and-trade-controls) page. Flashbots makes no representation or warranty as to any Relay Operator or other entity’s compliance with economic sanctions or other laws and regulations.*