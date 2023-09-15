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
  trailingSlash: false,
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
        apiKey: process.env.ALGOLIA_SEARCH_API_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME,
        appId: process.env.ALGOLIA_APP_ID, 
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['solidity', 'uri', 'ini']
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
      },
      announcementBar: {
        id: "MevDay",
        content:
          '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="16" viewBox="0 0 13 16" fill="none"><g clipPath="url(#clip0_2195_90)"><path d="M6.50002 3.79166C5.00502 3.79166 3.79169 5.00499 3.79169 6.49999C3.79169 7.99499 5.00502 9.20832 6.50002 9.20832C7.99502 9.20832 9.20835 7.99499 9.20835 6.49999C9.20835 5.00499 7.99502 3.79166 6.50002 3.79166ZM1.08335 7.04166H2.16669C2.4646 7.04166 2.70835 6.79791 2.70835 6.49999C2.70835 6.20207 2.4646 5.95832 2.16669 5.95832H1.08335C0.785437 5.95832 0.541687 6.20207 0.541687 6.49999C0.541687 6.79791 0.785437 7.04166 1.08335 7.04166ZM10.8334 7.04166H11.9167C12.2146 7.04166 12.4584 6.79791 12.4584 6.49999C12.4584 6.20207 12.2146 5.95832 11.9167 5.95832H10.8334C10.5354 5.95832 10.2917 6.20207 10.2917 6.49999C10.2917 6.79791 10.5354 7.04166 10.8334 7.04166ZM5.95835 1.08332V2.16666C5.95835 2.46457 6.2021 2.70832 6.50002 2.70832C6.79794 2.70832 7.04169 2.46457 7.04169 2.16666V1.08332C7.04169 0.785406 6.79794 0.541656 6.50002 0.541656C6.2021 0.541656 5.95835 0.785406 5.95835 1.08332ZM5.95835 10.8333V11.9167C5.95835 12.2146 6.2021 12.4583 6.50002 12.4583C6.79794 12.4583 7.04169 12.2146 7.04169 11.9167V10.8333C7.04169 10.5354 6.79794 10.2917 6.50002 10.2917C6.2021 10.2917 5.95835 10.5354 5.95835 10.8333ZM3.2446 2.48082C3.03335 2.26957 2.68669 2.26957 2.48085 2.48082C2.2696 2.69207 2.2696 3.03874 2.48085 3.24457L3.05502 3.81874C3.26627 4.02999 3.61294 4.02999 3.81877 3.81874C4.0246 3.60749 4.03002 3.26082 3.81877 3.05499L3.2446 2.48082ZM9.94502 9.18124C9.73377 8.96999 9.3871 8.96999 9.18127 9.18124C8.97002 9.39249 8.97002 9.73915 9.18127 9.94499L9.75543 10.5192C9.96669 10.7304 10.3134 10.7304 10.5192 10.5192C10.7304 10.3079 10.7304 9.96124 10.5192 9.7554L9.94502 9.18124ZM10.5192 3.24457C10.7304 3.03332 10.7304 2.68666 10.5192 2.48082C10.3079 2.26957 9.96127 2.26957 9.75543 2.48082L9.18127 3.05499C8.97002 3.26624 8.97002 3.61291 9.18127 3.81874C9.39252 4.02457 9.73919 4.02999 9.94502 3.81874L10.5192 3.24457ZM3.81877 9.94499C4.03002 9.73374 4.03002 9.38707 3.81877 9.18124C3.60752 8.96999 3.26085 8.96999 3.05502 9.18124L2.48085 9.7554C2.2696 9.96665 2.2696 10.3133 2.48085 10.5192C2.6921 10.725 3.03877 10.7304 3.2446 10.5192L3.81877 9.94499Z" fill="currentColor"></path></g><defs><clipPath id="clip0_2195_90"><rect width="13" height="16" fill="white"></rect></clipPath></defs></svg><a href="https://mev.day" target="_blank" rel="noreferrer"> Mev.day Istanbul - 16 Nov </a><svg xmlns="http://www.w3.org/2000/svg" width="13" height="16" viewBox="0 0 13 16" fill="none"><g clipPath="url(#clip0_2195_95)"><path d="M6.5 1.625C3.80792 1.625 1.625 3.80792 1.625 6.5C1.625 9.19208 3.80792 11.375 6.5 11.375C9.19208 11.375 11.375 9.19208 11.375 6.5C11.375 6.25083 11.3533 6.00167 11.3208 5.76333C10.79 6.50542 9.92333 6.9875 8.9375 6.9875C7.32333 6.9875 6.0125 5.67667 6.0125 4.0625C6.0125 3.08208 6.49458 2.21 7.23667 1.67917C6.99833 1.64667 6.74917 1.625 6.5 1.625Z" fill="currentColor"></path></g><defs><clipPath id="clip0_2195_95"><rect width="13" height="16" fill="white"></rect></clipPath></defs></svg>',
        isCloseable: false,
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
