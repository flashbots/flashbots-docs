module.exports = {
  docs: [
    'welcome',
    {
      'Flashbots Core': [
        'flashbots-core/overview',
        {
          "For searchers": [
            'flashbots-core/searchers/quick-start',
            'flashbots-core/searchers/faq',
            {
              "Example searchers": [
                'flashbots-core/searchers/example-searchers/simple-arbitrage-bot',
                'flashbots-core/searchers/example-searchers/searcher-sponsored-tx',
              ],
              "Searcher libraries": [
                'flashbots-core/searchers/searcher-libraries/ethers-js-provider',
                'flashbots-core/searchers/searcher-libraries/web3py-provider'
              ]
            },
            'flashbots-core/searchers/coinbase-payments',
            'flashbots-core/searchers/understanding-bundles',
            'flashbots-core/searchers/bundle-pricing',
            'flashbots-core/searchers/goerli-testnet',
            'flashbots-core/searchers/rpc-endpoint'
          ],
          'For miners & mining pools': [
            'flashbots-core/miners/quick-start',
            'flashbots-core/miners/mev-geth-introduction',
            'flashbots-core/miners/mev-geth-usage',
            'flashbots-core/miners/mev-geth-demo',
            'flashbots-core/miners/interacting-with-mev-relay',
            'flashbots-core/miners/faq',
          ],
          'Releases': [
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
