module.exports = {
  docs: [
    'welcome',
    {
      'Flashbots Core': [
        'flashbots-core-overview',
        {
          "for searchers": [
            'flashbots-core/searchers/quick-start',
            'flashbots-core/searchers/interacting-with-mev-relay',
            'flashbots-core/searchers/interacting-with-mev-geth',
            'flashbots-core/searchers/simple-arbitrage-bot',
            'flashbots-core/searchers/ethers-js-provider',
            'flashbots-core/searchers/web3py-provider',
            'flashbots-core/searchers/go-provider',
            'flashbots-core/searchers/searcher-sponsored-tx',
            'flashbots-core/searchers/faq',
          ],
          'for miners & mining pools': [
            'flashbots-core/miners/quick-start',
            'flashbots-core/miners/mev-geth-introduction',
            'flashbots-core/miners/mev-geth-usage',
            'flashbots-core/miners/mev-geth-demo',
            'flashbots-core/miners/interacting-with-mev-relay',
            'flashbots-core/miners/faq',
          ],
          'releases': [
            'flashbots-core/releases/alpha-v0.2',
          ],
        },
      ]
    },
    {
      "Flashbots Data": [
        'flashbots-data/blockapi','flashbots-data/mev-explore','flashbots-data/dashboard',
        {
          'mev-inspect': [
            'flashbots-data/mev-inspect-rs/inspect-quick-start',
            'flashbots-data/mev-inspect-rs/inspect-codebase',
            'flashbots-data/mev-inspect-rs/inspect-inspector-example',
          ]
        }
      ],
    },
   'contribution-guide',
  ],
};
