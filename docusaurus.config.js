/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Flashbots Docs',
  tagline: 'Flashbots repository of knowledge',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'flashbots', 
  projectName: 'docs', 
  themeConfig: {
    navbar: {
      title: 'Flashbots Docs',
      // logo: {
      //   alt: 'My Site Logo',
      //   src: 'img/logo.svg',
      // },
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
          title: 'Welcome',
          items: [
            {
              label: 'Welcome',
              to: 'docs/welcome.md',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
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
