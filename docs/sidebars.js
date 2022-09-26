module.exports = {
  docs: [
    {
      "welcome": [
        'welcome', 'new-to-mev', 'code-of-conduct'
      ],
    },
    {
      'Flashbots auction': [
        'flashbots-auction/overview',
        {
          "for searchers": [
            'flashbots-auction/searchers/quick-start',
            'flashbots-auction/searchers/faq',
            {
              "advanced concepts": [
                'flashbots-auction/searchers/advanced/understanding-bundles',
                'flashbots-auction/searchers/advanced/coinbase-payment',
                'flashbots-auction/searchers/advanced/bundle-pricing',
                'flashbots-auction/searchers/advanced/rpc-endpoint',
                'flashbots-auction/searchers/advanced/reputation',
                'flashbots-auction/searchers/advanced/goerli-testnet',
                'flashbots-auction/searchers/advanced/eip1559',
                'flashbots-auction/searchers/advanced/troubleshooting',
                'flashbots-auction/searchers/advanced/private-transaction'
              ],
              "example searchers": [
                'flashbots-auction/searchers/example-searchers/simple-arbitrage-bot',
                'flashbots-auction/searchers/example-searchers/searcher-sponsored-tx',
                'flashbots-auction/searchers/example-searchers/searcher-minter',
                'flashbots-auction/searchers/example-searchers/synthetix-searcher',


              ],
              "libraries": [
                'flashbots-auction/searchers/libraries/golang',
                'flashbots-auction/searchers/libraries/ethers-js-provider',
                'flashbots-auction/searchers/libraries/web3py-provider',
                'flashbots-auction/searchers/libraries/alchemyprovider',
              ]
            },
            'flashbots-auction/other-resources'
          ],
          'mev-geth releases': [
            'flashbots-auction/releases/alpha-v0.6',
            'flashbots-auction/releases/alpha-v0.5',
            'flashbots-auction/releases/alpha-v0.4',
            'flashbots-auction/releases/alpha-v0.3',
            'flashbots-auction/releases/alpha-v0.2',
            'flashbots-auction/releases/upgrade-process',

          ],
        },
      ]
    },
    {
      "Flashbots data": [
        {
          'mev-inspect': [
            'flashbots-data/mev-inspect-py/overview',
            'flashbots-data/mev-inspect-py/install',
            'flashbots-data/mev-inspect-py/quick-start',
            'flashbots-data/mev-inspect-py/inspecting',
            'flashbots-data/mev-inspect-py/exploring',
            {
              "data": [
                'flashbots-data/mev-inspect-py/data/classified_traces',
                'flashbots-data/mev-inspect-py/data/transfers',
                'flashbots-data/mev-inspect-py/data/swaps',
                'flashbots-data/mev-inspect-py/data/arbitrages',
                'flashbots-data/mev-inspect-py/data/miner_payments',
              ],
            },
          ]
        },
        'flashbots-data/blockapi',
        'flashbots-data/mev-explore',
        'flashbots-data/dashboard',
      ],
    },
    {
      "Flashbots Protect": [
        'flashbots-protect/overview',
        {
          'rpc': [
            'flashbots-protect/rpc/quick-start',
            'flashbots-protect/rpc/uncle-bandits',
            'flashbots-protect/rpc/status-api',
            'flashbots-protect/rpc/bundle-cache',
            'flashbots-protect/rpc/ratelimiting',
            'flashbots-protect/rpc/cancellations',
            'flashbots-protect/rpc/releases',
          ]
        }
      ],
    },
    {
      "flashbots MEV-boost": [
        'flashbots-mev-boost/introduction',
        {
          'architecture overview': [
            'flashbots-mev-boost/architecture-overview/MEV-boost-specifications',
            'flashbots-mev-boost/architecture-overview/MEV-boost-block-proposal',
            'flashbots-mev-boost/architecture-overview/risks'
          ]
        },

          'flashbots-mev-boost/block builders',
          'flashbots-mev-boost/block proposers',
          'flashbots-mev-boost/relays',
        {
          'getting started':[
            'flashbots-mev-boost/getting-started/system-requirements',
            'flashbots-mev-boost/getting-started/installation',
            'flashbots-mev-boost/getting-started/usage',
          ]
        },
          'flashbots-mev-boost/troubleshooting',
          'flashbots-mev-boost/contributing',
          'flashbots-mev-boost/security',
          'flashbots-mev-boost/FAQ',
          'flashbots-mev-boost/glossary',
          'flashbots-mev-boost/resources',
          'flashbots-mev-boost/community-tools',          
      ],
    },
    {
      "community": [
        'community-tools', 'whitehat',
      ],
    },
    {
      "contribute": [
        'joining-flashbots', 'contribution-guide', 'cheatsheet',
      ],
    },
    {
      type: 'link',
      label: 'Discord',
      href: 'https://discord.gg/7hvTycdNcK',
    },
    {
      type: 'link',
      href: 'https://github.com/flashbots/pm',
      label: 'GitHub',
    },
    {
      type: 'link',
      href: 'https://status.flashbots.net/',
      label: 'Status',
    },
        'policies/privacy','policies/terms-of-service',
  ],
};
