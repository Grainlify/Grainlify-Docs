// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Grainlify Docs',
  tagline: 'How to use Grainlify, and how it\'s built',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://docs.grainlify.0xo.in',
  baseUrl: '/',

  organizationName: 'Grainlify',
  projectName: 'Grainlify-Docs',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // This site's content is plain technical Markdown (Rust generics like
  // Vec<u64>, placeholder notation like <Address> in prose), not MDX - MDX's
  // JSX-aware parser misreads that angle-bracket text as unclosed tags.
  // Forcing every .md file to the plain CommonMark parser avoids rewriting
  // dozens of pre-existing docs to escape syntax they were never authored
  // with MDX in mind for.
  markdown: {
    format: 'md',
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: 'docs',
          editUrl: 'https://github.com/Grainlify/Grainlify-Docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Grainlify Docs',
        logo: {
          alt: 'Grainlify',
          src: 'img/favicon.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://grainlify.0xo.in',
            label: 'Grainlify',
            position: 'right',
          },
          {
            href: 'https://github.com/Grainlify',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {label: 'Getting Started', to: '/docs/intro'},
              {label: 'Platform Features', to: '/docs/features/referrals'},
            ],
          },
          {
            title: 'Grainlify',
            items: [
              {label: 'Platform', href: 'https://grainlify.0xo.in'},
              {label: 'API', href: 'https://api.grainlify.0xo.in'},
            ],
          },
          {
            title: 'Source',
            items: [
              {label: 'GitHub Org', href: 'https://github.com/Grainlify'},
              {label: 'Backend', href: 'https://github.com/Grainlify/Grainlify-Backend'},
              {label: 'Frontend', href: 'https://github.com/Grainlify/Grainlify-Frontend'},
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Grainlify.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
