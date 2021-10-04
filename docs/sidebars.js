module.exports = {
  docs: [
    'welcome',
    {
      'flashbots auction': [
        'flashbots-auction/overview',
        'flashbots-auction/upgrade-process',
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
              ],
              "example searchers": [
                'flashbots-auction/searchers/example-searchers/simple-arbitrage-bot',
                'flashbots-auction/searchers/example-searchers/searcher-sponsored-tx',
              ],
              "libraries": [
                'flashbots-auction/searchers/libraries/golang',
                'flashbots-auction/searchers/libraries/ethers-js-provider',
                'flashbots-auction/searchers/libraries/web3py-provider',
              ]
            },
            'flashbots-auction/other-resources'
          ],
          'for miners & mining pools': [
            'flashbots-auction/miners/quick-start',
            'flashbots-auction/miners/how-it-works',
            'flashbots-auction/miners/discord-setup',
            'flashbots-auction/miners/faq',
            {
              "advanced concepts": [
                'flashbots-auction/miners/advanced/source-code',
                'flashbots-auction/miners/advanced/interacting-with-relay',
                {
                  'mev-geth spec': [
                    'flashbots-auction/miners/mev-geth-spec/v04',
                    'flashbots-auction/miners/mev-geth-spec/v04-rpc',
                    'flashbots-auction/miners/mev-geth-spec/v03',
                    'flashbots-auction/miners/mev-geth-spec/v03-rpc',
                    'flashbots-auction/miners/mev-geth-spec/v02',
                    'flashbots-auction/miners/mev-geth-spec/v02-rpc',
                    'flashbots-auction/miners/mev-geth-spec/v01',
                    'flashbots-auction/miners/mev-geth-spec/v01-rpc',
                  ]
                },
              ],
            },
          ],
          'releases': [
            'flashbots-auction/releases/alpha-v0.4',
            'flashbots-auction/releases/alpha-v0.3',
            'flashbots-auction/releases/alpha-v0.2',
          ],
        },
      ]
    },
    {
      "flashbots data": [
        'flashbots-data/blockapi',
        'flashbots-data/mev-explore',
        'flashbots-data/dashboard',
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
        }
      ],
    },
    {
      "flashbots protect": [
        'flashbots-protect/overview',
        'flashbots-protect/json-rpc',
        'flashbots-protect/websockets-sdk',
      ],
    },
    'community-tools',
    {
      "contribute": [
        'contribution-guide', 'cheatsheet',
      ],
    },
    {
      type: 'link',
      label: 'Discord',
      href: 'https://discord.gg/7hvTycdNcK',
    },
    {
      type: 'link',
      href: 'https://github.com/flashbots/docs',
      label: 'GitHub',
    }
  ],
};
