# Grainlify Docs

Technical documentation for the Grainlify platform — platform features
(referrals, notifications, rewards) and the Soroban smart contract suite.
Built with [Docusaurus](https://docusaurus.io/).

Live at [docs.grainlify.com](https://docs.grainlify.com).

## Local development

```bash
pnpm install
pnpm start
```

Starts a local dev server with live reload at `http://localhost:3000`.

## Build

```bash
pnpm build
```

Generates static content into `build/`.

## Adding a doc

Drop a `.md` file into `docs/` (or a subfolder for a new category — add a
`_category_.json` alongside it to control the sidebar label). The sidebar is
auto-generated from the folder structure and each file's first `# Heading`.

Content here is plain Markdown, not MDX (`docusaurus.config.js` sets
`markdown.format: 'md'`) — angle brackets in prose (`<Address>`, `Vec<u64>`)
and the like don't need escaping.
