module.exports = {
  docs: [
    'welcome',
    {
      'flashbots core': [
        'flashbots-core/overview',
        {
          "for searchers": [
            'flashbots-core/searchers/quick-start',
            'flashbots-core/searchers/faq',
            {
              "advanced concepts": [
                'flashbots-core/searchers/advanced/understanding-bundles',
                'flashbots-core/searchers/advanced/coinbase-payment',
                'flashbots-core/searchers/advanced/bundle-pricing',
                'flashbots-core/searchers/advanced/rpc-endpoint',
                'flashbots-core/searchers/advanced/goerli-testnet',
              ],
              "example searchers": [
                'flashbots-core/searchers/example-searchers/simple-arbitrage-bot',
                'flashbots-core/searchers/example-searchers/searcher-sponsored-tx',
              ],
              "libraries": [
                'flashbots-core/searchers/libraries/ethers-js-provider',
                'flashbots-core/searchers/libraries/web3py-provider',
              ]
            },
          ],
          'for miners & mining pools': [
            'flashbots-core/miners/quick-start',
            'flashbots-core/miners/faq',
            {
              "advanced concepts": [
                'flashbots-core/miners/advanced/mev-geth-introduction',
                'flashbots-core/miners/advanced/mev-geth-usage',
                'flashbots-core/miners/advanced/mev-geth-demo',
                'flashbots-core/miners/advanced/interacting-with-mev-relay',
              ],
            },
          ],
          'releases': [
            'flashbots-core/releases/alpha-v0.2',
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
            'flashbots-data/mev-inspect-rs/inspect-quick-start',
            'flashbots-data/mev-inspect-rs/inspect-codebase',
            'flashbots-data/mev-inspect-rs/inspect-inspector-example',
          ]
        }
      ],
    },
    'contribution-guide',
    {
      type: 'link',
      label: 'Discord',
      href: 'https://discord.gg/7hvTycdNcK',
    },
    {
      type: 'link',
      href: 'https://github.com/flashbots/docs',
      label: 'GitHub',
    },
  ],
};
