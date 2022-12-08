module.exports = {
  docs: [
    {
      "Welcome": [
        'welcome', 'new-to-mev', 'code-of-conduct'
      ],
    },
    {
      'Flashbots Auction': [
        'flashbots-auction/overview',
        {
          "For Searchers": [
            'flashbots-auction/searchers/quick-start',
            'flashbots-auction/searchers/faq',
            {
              "Advanced Concepts": [
                'flashbots-auction/searchers/advanced/understanding-bundles',
                'flashbots-auction/searchers/advanced/coinbase-payment',
                'flashbots-auction/searchers/advanced/bundle-pricing',
                'flashbots-auction/searchers/advanced/rpc-endpoint',
                'flashbots-auction/searchers/advanced/reputation',
                'flashbots-auction/searchers/advanced/goerli-testnet',
                'flashbots-auction/searchers/advanced/eip1559',
                'flashbots-auction/searchers/advanced/troubleshooting',
                'flashbots-auction/searchers/advanced/private-transaction',
                'flashbots-auction/searchers/advanced/bundle-cancellations',
              ],
              "Example Searchers": [
                'flashbots-auction/searchers/example-searchers/simple-arbitrage-bot',
                'flashbots-auction/searchers/example-searchers/searcher-sponsored-tx',
                'flashbots-auction/searchers/example-searchers/searcher-minter',
                'flashbots-auction/searchers/example-searchers/synthetix-searcher',


              ],
              "Libraries": [
                'flashbots-auction/searchers/libraries/golang',
                'flashbots-auction/searchers/libraries/ethers-js-provider',
                'flashbots-auction/searchers/libraries/web3py-provider',
                'flashbots-auction/searchers/libraries/alchemyprovider',
              ]
            },
            'flashbots-auction/other-resources'
          ],
          'MEV-Geth Releases': [
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
      "Flashbots Data": [
        {
          'MEV-Inspect': [
            'flashbots-data/mev-inspect-py/overview',
            'flashbots-data/mev-inspect-py/install',
            'flashbots-data/mev-inspect-py/quick-start',
            'flashbots-data/mev-inspect-py/inspecting',
            'flashbots-data/mev-inspect-py/exploring',
            {
              "Data": [
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
          'RPC': [
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
      "Flashbots MEV-Boost": [
        'flashbots-mev-boost/introduction',
        {
          'Architecture Overview': [
            'flashbots-mev-boost/architecture-overview/MEV-Boost Specifications',
            'flashbots-mev-boost/architecture-overview/MEV-Boost Block Proposal',
            'flashbots-mev-boost/architecture-overview/Risks'
          ]
        },

          'flashbots-mev-boost/Block Builders',
          'flashbots-mev-boost/Block Proposers',
          'flashbots-mev-boost/Relays',
        {
          'Getting Started':[
            'flashbots-mev-boost/getting-started/System Requirements',
            'flashbots-mev-boost/getting-started/Installation',
            'flashbots-mev-boost/getting-started/Usage',
          ]
        },
          'flashbots-mev-boost/Troubleshooting',
          'flashbots-mev-boost/Contributing',
          'flashbots-mev-boost/Security',
          'flashbots-mev-boost/FAQ',
          'flashbots-mev-boost/Glossary',
          'flashbots-mev-boost/Resources',
          'flashbots-mev-boost/Community Tools',          
      ],
    },
    {
      "Community": [
        'community-tools', 'whitehat',
      ],
    },
    {
      "Contribute": [
        'Joining Flashbots', 'Contribution Guide', 'Cheatsheet',
      ],
    },
    {
      type: 'link',
      label: 'Forum',
      href: 'https://collective.flashbots.net/',
    },
    {
      type: 'link',
      label: 'Discord',
      href: 'https://discord.gg/flashbots',
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
