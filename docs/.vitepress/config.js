module.exports = {
  title: 'vue-tiny-validate',
  description: 'Tiny (1KB gzipped) Vue 3 Validate Composition',
  head: [
    ['meta', { property: 'og:title', content: 'vue-tiny-validate' }],
    [
      'meta',
      {
        property: 'og:description',
        content: 'Tiny (1KB gzipped) Vue 3 Validate Composition',
      },
    ],
  ],
  themeConfig: {
    repo: 'FrontLabsOfficial/vue-tiny-validate',
    docsDir: 'docs',
    docsBranch: 'main',
    prevLinks: true,
    nextLinks: true,
    sidebar: [
      { text: 'Introduction', link: '/' },
      { text: 'Getting Started', link: '/getting-started' },
      { text: 'Usage', link: '/usage' },
      { text: 'Examples', link: '/examples' },
      { text: 'API', link: '/api' },
      { text: 'Changelog', link: '/change-log' },
    ],
  },
};
