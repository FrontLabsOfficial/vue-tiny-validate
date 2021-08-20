module.exports = {
  title: 'vue-tiny-validate',
  description: 'iny Vue Validate Composition',
  head: [
    ['meta', { property: 'og:title', content: 'vue-tiny-validate' }],
    [
      'meta',
      {
        property: 'og:description',
        content: 'Tiny Vue Validate Composition',
      },
    ],
  ],
  themeConfig: {
    repo: 'FrontLabsOfficial/vue-tiny-validate',
    docsDir: 'docs',
    docsBranch: 'main',
    prevLinks: true,
    nextLinks: true,
    nav: [
      {
        text: 'Example',
        link: 'https://github.com/FrontLabsOfficial/vue-tiny-validate/tree/master/example',
      },
    ],
    sidebar: [
      { text: 'Introduction', link: '/' },
      { text: 'Getting Started', link: '/getting-started' },
      { text: 'Usage', link: '/usage' },
      { text: 'API', link: '/api' },
      { text: 'FAQ', link: '/faq' },
      { text: 'Changelog', link: '/change-log' },
    ],
  },
};
