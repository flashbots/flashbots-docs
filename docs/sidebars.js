module.exports = {
  docs: [
    'welcome',
    {
      'Flashbots Core': [
        'flashbots-core-overview',
        {
          "for searchers": [
            'flashbots-core/searchers/searchers-introduction',
            'flashbots-core/searchers/searcher-implementation-faq',
            'flashbots-core/searchers/searchers-interacting-with-relay',
            'flashbots-core/searchers/mev-geth-for-searchers',
            'flashbots-core/searchers/searcher-quick-start',
            'flashbots-core/searchers/ethers-provider-flashbots-bundle',
            'flashbots-core/searchers/web3-flashbots',
            'flashbots-core/searchers/searcher-sponsored-tx',
          ],
          'for miners & mining pools': [
            'flashbots-core/miners/miners-introduction',
            'flashbots-core/miners/miners-implementation-faq',
            'flashbots-core/miners/mev-geth',
            'flashbots-core/miners/mev-geth-demo',
            'flashbots-core/miners/mev-proxy'
          ],
        },
      ]
    },
    {
      "Flashbots Data": [
        'flashbots-data/blockapi','flashbots-data/mev-explore','flashbots-data/transparency-dashboard',
        {
          'mev-inspect': [
            'flashbots-data/mev-inspect-rs/inspect-quick-start',
            'flashbots-data/mev-inspect-rs/inspect-codebase',
            'flashbots-data/mev-inspect-rs/inspect-inspector-example'
          ]
        }
      ],
    },
    {
      'Contribute': [
        'contribution/docs-contribution-guide',
        'contribution/become-a-contributor',

      ],
    },
  ],
};
