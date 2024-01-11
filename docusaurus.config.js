/**
 * Copyright (c) Flashbots Ltd. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
require('dotenv').config()
const { themes: { github: lightCodeTheme } } = require('prism-react-renderer');
const { themes: { dracula: darkCodeTheme } } = require('prism-react-renderer');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

/** @returns {Promise<import('@docusaurus/types').Config>} */
module.exports = async function createConfigAsync() {
  return {
    title: 'Flashbots Docs',
    tagline: 'Flashbots repository of knowledge',
    baseUrl: process.env.BASE_URL,
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'flashbots',
    projectName: 'docs',
    trailingSlash: false,
    url: process.env.TARGET_URL,
    stylesheets: [
      {
        href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
        type: 'text/css',
        integrity:
          'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
        crossorigin: 'anonymous',
      },
    ],
    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        algolia: {
          apiKey: process.env.ALGOLIA_SEARCH_API_KEY,
          indexName: process.env.ALGOLIA_INDEX_NAME,
          appId: process.env.ALGOLIA_APP_ID,
        },
        prism: {
          theme: lightCodeTheme,
          darkTheme: darkCodeTheme,
          additionalLanguages: ['solidity', 'uri', 'ini', 'rust']
        },
        docs: {
          sidebar: {
            hideable: true
          }
        },
        navbar: {
          title: 'Flashbots',
          logo: {
            alt: 'Flashbots Logo',
            src: 'img/logo.png',
          },
          items: [
            {
              type: 'docSidebar',
              label: 'Docs',
              sidebarId: 'docs',
              position: 'left',
            },
            {
              type: 'docSidebar',
              label: 'API',
              sidebarId: 'api',
              position: 'left',
            },
            {
              href: 'https://github.com/flashbots/docs',
              label: 'GitHub',
              position: 'right',
            },
          ],
        }

      }),
    presets: [
      [
        '@docusaurus/preset-classic',
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          debug: true, // force debug plugin usage
          docs: {
            sidebarPath: require.resolve('./docs/sidebars.js'),
            // Please change this to your repo.
            routeBasePath: '/',
            editUrl:
              'https://github.com/flashbots/flashbots-docs/edit/main/',
            showLastUpdateTime: true,
            remarkPlugins: [(await import('remark-math')).default],
            rehypePlugins: [(await import('rehype-katex')).default],
          },
          theme: {
            customCss: require.resolve('./src/css/custom.css'),
          },
        }),
      ],
    ],
    plugins:    [
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async function tailwindcssSupport(context, options) {
        return {
          name: "docusaurus-tailwindcss",
          configurePostCss(postcssOptions) {
            // Appends TailwindCSS and AutoPrefixer.
            postcssOptions.plugins.push('tailwindcss/nesting')
            postcssOptions.plugins.push(tailwindcss);
            postcssOptions.plugins.push(autoprefixer);
            return postcssOptions;
          },
        };
      },
      'docusaurus-plugin-sass'
    ],
  }
}
