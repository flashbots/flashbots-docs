module.exports = {
  docs: [
    'welcome',
    {
      'Flashbots Core': [
        {
          "For searchers": [
            'flashbots-core/searchers/searchers-introduction',
            'flashbots-core/searchers/searcher-quick-start',
            'flashbots-core/searchers/searcher-implementation-faq',
            'flashbots-core/searchers/searchers-interacting-with-relay',
            'flashbots-core/searchers/ethers-provider-flashbots-bundle',
            'flashbots-core/searchers/web3-flashbots',
          ],
          'For miners & mining pools': [
            'flashbots-core/miners/miners-introduction',
            'flashbots-core/miners/miners-quick-start',
            'flashbots-core/miners/miners-implementation-faq',
            'flashbots-core/miners/mev-geth',
            'flashbots-core/miners/mev-geth-demo',
            'flashbots-core/miners/mev-proxy'
          ],
          'For whitehats': [
            'flashbots-core/whitehats/whitehat-introduction',
            'flashbots-core/whitehats/searcher-sponsored-tx',
          ]
        },
      ]
    },
    {
      "Flashbots Data": [
        'flashbots-data/blockapi',
        {
          'MEV-Explore': [
            'flashbots-data/mev-explore/explore-data-metrics',
            'flashbots-data/mev-explore/explore-introduction',
            {
              'mev-inspect-rs': [
                'flashbots-data/mev-explore/mev-inspect-rs/inspect-quick-start',
                'flashbots-data/mev-explore/mev-inspect-rs/inspect-codebase',
                'flashbots-data/mev-explore/mev-inspect-rs/inspect-inspector-example',
              ]
            }
          ]
        }
      ],
    },
    {
      'How to contribute': [
        'contribution/docs-contribution-guide',
        'contribution/become-a-contributor',

      ],
    },
  ],
};
