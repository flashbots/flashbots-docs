module.exports = {
  docs: [
    {
      "Welcome": [
        'welcome', 'new-to-mev', 'code-of-conduct'
      ],
    },
    {
      'Flashbots Builders': [
        'flashbots-auction/overview',
        'flashbots-auction/quick-start',
        {
          "Example Searchers": [
            'flashbots-auction/example-searchers/simple-arbitrage-bot',
            'flashbots-auction/example-searchers/searcher-sponsored-tx',
            'flashbots-auction/example-searchers/searcher-minter',
            'flashbots-auction/example-searchers/synthetix-searcher',
          ],
          "Libraries": [
            'flashbots-auction/libraries/golang',
            'flashbots-auction/libraries/ethers-js-provider',
            'flashbots-auction/libraries/web3py-provider',
            'flashbots-auction/libraries/alchemyprovider',
            'flashbots-auction/libraries/mev-share-clients',
          ],
          "Advanced Concepts": [
            'flashbots-auction/advanced/understanding-bundles',
            'flashbots-auction/advanced/coinbase-payment',
            'flashbots-auction/advanced/bundle-pricing',
            'flashbots-auction/advanced/rpc-endpoint',
            'flashbots-auction/advanced/reputation',
            'flashbots-auction/advanced/testnets',
            'flashbots-auction/advanced/eip1559',
            'flashbots-auction/advanced/troubleshooting',
            'flashbots-auction/advanced/bundle-cancellations',
          ],
        },
        'flashbots-auction/faq',
        'flashbots-auction/other-resources',
      ]
    },
    {
      "Flashbots Protect": [
        'flashbots-protect/overview',
        'flashbots-protect/quick-start',
        'flashbots-protect/mev-share',
        'flashbots-protect/cancellations',
        'flashbots-protect/stuck_transactions',
        {
          'Additional Documentation': [
            'flashbots-protect/additional-documentation/eth-sendPrivateTransaction',
            'flashbots-protect/additional-documentation/status-api',
            'flashbots-protect/additional-documentation/ratelimiting',
            'flashbots-protect/additional-documentation/bundle-cache',
          ],
        }
      ],
    },
    {
      "Flashbots Data": [
        {
          'MEV-Inspect': [
            'flashbots-data/mev-inspect-py/overview',
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
      "MEV-Boost": [
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
      "MEV-Share": [
        'flashbots-mev-share/introduction',
        'flashbots-mev-share/for-users',
        'flashbots-mev-share/orderflow-providers',
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
