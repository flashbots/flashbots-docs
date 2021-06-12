module.exports = {
  docs: [
    'welcome',
    {
      'flashbots core': [
        'flashbots-core/overview',
        'flashbots-core/upgrade-process',
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
            'flashbots-core/other-resources'
          ],
          'for miners & mining pools': [
            'flashbots-core/miners/quick-start',
            'flashbots-core/miners/how-it-works',
            'flashbots-core/miners/discord-setup',
            'flashbots-core/miners/faq',
            {
              "advanced concepts": [
                'flashbots-core/miners/advanced/source-code',
                'flashbots-core/miners/advanced/interacting-with-relay',
                {'mev-geth spec': [
                  'flashbots-core/miners/mev-geth-spec/v02',
                  'flashbots-core/miners/mev-geth-spec/v02-rpc',
                  'flashbots-core/miners/mev-geth-spec/v01',
                  'flashbots-core/miners/mev-geth-spec/v01-rpc',
                ]},
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
            'flashbots-data/mev-inspect-rs/inspect-codebase-design',
            'flashbots-data/mev-inspect-rs/inspect-codebase-deep-dive',
            'flashbots-data/mev-inspect-rs/inspect-inspector-example',
          ]
        }
      ],
    },
    'community-tools',
    {
      "contribute": [
        'contribution-guide','cheatsheet',
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
