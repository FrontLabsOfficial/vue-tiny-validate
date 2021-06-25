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
    nav: [
      {
        text: 'Releases',
        link: 'https://github.com/FrontLabsOfficial/vue-tiny-validate/releases',
      },
    ],
    sidebar: {
      '/': [
        {
          text: 'Quick Start',
          children: [{ text: 'Getting Started', link: '/' }],
        },
      ],
    },
  },
};
