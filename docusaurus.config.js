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

  url: 'https://docs.grainlify.com',
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

  // Client-side search index built at compile time - no external service or
  // API keys needed, so search works fully offline and on any host.
  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      /** @type {import('@easyops-cn/docusaurus-search-local').PluginOptions} */
      ({
        hashed: true,
        indexDocs: true,
        indexPages: false,
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
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
            href: 'https://grainlify.com',
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
        links: [
          {
            title: 'Docs',
            items: [
              {label: 'Introduction', to: '/docs/intro'},
              {label: 'For Contributors', to: '/docs/contributors'},
              {label: 'For Maintainers', to: '/docs/maintainers'},
            ],
          },
          {
            title: 'Grainlify',
            items: [
              {label: 'Platform', href: 'https://grainlify.com'},
              {label: 'API', href: 'https://api.grainlify.com'},
            ],
          },
          {
            title: 'Community',
            items: [
              {label: 'GitHub', href: 'https://github.com/Grainlify'},
              {label: 'Discord', href: 'https://discord.gg/TCDgKAdaj'},
              {label: 'Telegram', href: 'https://t.me/+DQ_WdQSwynFiYjZl'},
              {label: 'Twitter / X', href: 'https://x.com/Grainlify'},
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
