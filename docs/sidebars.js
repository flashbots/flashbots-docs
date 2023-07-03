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
                'flashbots-auction/searchers/advanced/testnets',
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
                'flashbots-auction/searchers/libraries/mev-share-clients',
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
        'flashbots-protect/quick-start',
        'flashbots-protect/mev-share',
        'flashbots-protect/key_considerations',
        'flashbots-protect/cancellations',
        'flashbots-protect/stuck_transactions',
        {
          'Additional Documentation': [
            'flashbots-protect/additional-documentation/status-api',
            'flashbots-protect/additional-documentation/ratelimiting',
            'flashbots-protect/additional-documentation/bundle-cache',
          ],
        }
      ],
    },
    {
      "Flashbots MEV-Boost": [
        'flashbots-mev-boost/introduction',
        {
          'Architecture Overview': [
            'flashbots-mev-boost/architecture-overview/specifications',
            'flashbots-mev-boost/architecture-overview/block-proposal',
            'flashbots-mev-boost/architecture-overview/risks'
          ]
        },

          'flashbots-mev-boost/block-builders',
          'flashbots-mev-boost/block-proposers',
          'flashbots-mev-boost/relay',
        {
          'Getting Started':[
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
      "Flashbots MEV-Share": [
        'flashbots-mev-share/overview',
        'flashbots-mev-share/for-users',
        {
          'For Searchers': [
            'flashbots-mev-share/searchers/getting-started',
            'flashbots-mev-share/searchers/event-stream',
            'flashbots-mev-share/searchers/understanding-bundles',
            'flashbots-mev-share/searchers/sending-bundles',
            'flashbots-mev-share/searchers/debugging',
            {
              'Tutorials': [
                {
                  'Limit Order Bot': [
                    'flashbots-mev-share/searchers/tutorials/limit-order/introduction',
                    'flashbots-mev-share/searchers/tutorials/limit-order/setup',
                    'flashbots-mev-share/searchers/tutorials/limit-order/using-events',
                    'flashbots-mev-share/searchers/tutorials/limit-order/sending-bundles',
                    'flashbots-mev-share/searchers/tutorials/limit-order/debugging',
                    'flashbots-mev-share/searchers/tutorials/limit-order/more-resources'
                  ]
                }
              ]
            }
          ],
          'For Wallet/Dapp Developers': [
            {
              type: 'doc',
              id: 'flashbots-mev-share/orderflow-providers/integration-guide',
              label: 'Integration Guide'
            },
          ],
          'Release Notes': [
            'flashbots-mev-share/release-notes/2023-03',
            'flashbots-mev-share/release-notes/2023-06',
            'flashbots-mev-share/release-notes/2023-07'
          ]
        }
      ]
    },
    {
      "Community": [
        'community-tools', 'whitehat',
      ],
    },
    {
      "Contribute": [
        'joining-flashbots', 'contribution-guide', 'cheatsheet',
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
        'policies/privacy','policies/terms-of-service', 'policies/prohibited-use-policy',
  ],
};
