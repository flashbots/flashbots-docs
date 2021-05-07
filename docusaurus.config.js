/** @type {import('@docusaurus/types').DocusaurusConfig} */
require('dotenv').config()
const math = require('remark-math');
const katex = require('rehype-katex');

module.exports = {
  title: 'Flashbots Docs',
  tagline: 'Flashbots repository of knowledge',
  baseUrl: process.env.BASE_URL,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'flashbots', 
  projectName: 'docs', 
  url: process.env.TARGET_URL,
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X',
      crossorigin: 'anonymous',
    },
  ],
  themeConfig: {
    algolia: {
      apiKey: 'YOUR_API_KEY',
      indexName: 'YOUR_INDEX_NAME',

      // Optional: see doc section below
      contextualSearch: true,

      // Optional: see doc section below
      appId: 'YOUR_APP_ID',

      // Optional: Algolia search parameters
      searchParameters: {},

      //... other Algolia params
    },
    navbar: {
      title: 'Flashbots Docs',
      logo: {
        alt: 'Flashbots Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          href: 'https://github.com/flashbots/docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
     
    },
  //   footer: {
  //     style: 'dark',
  //     links: [
  //       {
  //         title: 'Community',
  //         items: [
  //           {
  //             label: 'Discord',
  //             href: 'https://discord.gg/7hvTycdNcK',
  //           },
  //           // {
  //           //   label: 'Twitter',
  //           //   href: 'https://twitter.com/docusaurus',
  //           // },
  //         ],
  //       },
  //     ],
  //     copyright: `Copyright © ${new Date().getFullYear()} Flashbots. Built with Docusaurus.`,
  //   },
  },
  presets: [
   
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./docs/sidebars.js'),
          // Please change this to your repo.
          routeBasePath: '/',
          // editUrl:
          //   'https://github.com/flashbots/docs/edit/main/',
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
    plugins: [
    [
      "docusaurus2-dotenv",
      {
        systemvars: true,
      },
    ],
  ],
}
