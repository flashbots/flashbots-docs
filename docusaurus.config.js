/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Flashbots Docs',
  tagline: 'Flashbots repository of knowledge',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/docs',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'flashbots', 
  projectName: 'docs', 
  url: "https://flashbots.github.io",
  themeConfig: {
    navbar: {
      title: 'Flashbots Docs',
      logo: {
        alt: 'Flashbots Logo',
        src: 'img/logo.svg',
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
};
