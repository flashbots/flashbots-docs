require('dotenv').config()
const math = require('remark-math');
const katex = require('rehype-katex');
const lightCodeTheme = require("prism-react-renderer/themes/github")
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
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
  themeConfig: 
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        apiKey: '693df7609c6aeaac03b78418095b79c4',
        indexName: 'flashbots',
        // Optional: see doc section below
        appId: 'BH4D9OD16A',
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['solidity']
      },
      docs: {
        sidebar: {
          hideable: true
        }
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
      }
      
    }),
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
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
          customCss: require.resolve("./src/scss/custom.scss")
        },
      }),
    ],
  ],
  plugins: [
    'docusaurus-plugin-sass',
    [
      "docusaurus2-dotenv",
      {
        path: "./.env", // The path to your environment variables.
        safe: false, // If false ignore safe-mode, if true load './.env.example', if a string load that file as the sample
        systemvars: false, // Set to true if you would rather load all system variables as well (useful for CI purposes)
        silent: false, //  If true, all warnings will be suppressed
        expand: false, // Allows your variables to be "expanded" for reusability within your .env file
        defaults: false, //  Adds support for dotenv-defaults. If set to true, uses ./.env.defaults
      },
    ],
  ],
})
