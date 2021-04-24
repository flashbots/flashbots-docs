/** @type {import('@docusaurus/types').DocusaurusConfig} */
require('dotenv').config()

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
  themeConfig: {
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
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/7hvTycdNcK',
            },
            // {
            //   label: 'Twitter',
            //   href: 'https://twitter.com/docusaurus',
            // },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Flashbots. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./docs/sidebars.js'),
          // Please change this to your repo.
          routeBasePath: '/',
          editUrl:
            'https://github.com/flashbots/docs/edit/main/',
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
};
