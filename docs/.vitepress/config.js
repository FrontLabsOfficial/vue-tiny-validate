export default {
  title: 'vue-tiny-validate',
  description: 'Tiny Vue Validate Composition',
  lastUpdated: true,
  head: [
    ['meta', { property: 'og:title', content: 'vue-tiny-validate' }],
    ['meta', { property: 'twitter:title', content: 'vue-tiny-validate' }],
    [
      'meta',
      {
        property: 'og:description',
        content: 'Tiny Vue Validate Composition',
      },
    ],
    [
      'meta',
      {
        property: 'twitter:description',
        content: 'Tiny Vue validate Composition',
      },
    ],
    [
      'meta',
      {
        property: 'og:image',
        content: 'https://vue-tiny-validate.js.org/og_.jpeg',
      },
    ],
    [
      'meta',
      {
        property: 'twitter:image',
        content: 'https://vue-tiny-validate.js.org/og_.jpeg',
      },
    ],
  ],
  themeConfig: {
    prevLinks: true,
    nextLinks: true,
    siteTitle: 'vue-tiny-validate',
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/FrontLabsOfficial/vue-tiny-validate',
      },
    ],
    nav: [
      {
        text: 'Example',
        link: 'https://vue-tiny-validate-example.netlify.app/',
      },
    ],
    sidebar: [
      {
        text: 'Guide',
        collapsible: true,
        items: [
          { text: 'Introduction', link: '/' },
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Usage', link: '/usage' },
        ],
      },
      {
        text: 'Others',
        collapsible: true,
        items: [
          { text: 'API', link: '/api' },
          { text: 'FAQ', link: '/faq' },
          { text: 'Changelog', link: '/change-log' },
        ],
      },
    ],
    algolia: {
      appId: 'IPJD2UD9OR',
      apiKey: '9dd8e988e93000e13b11a56c9acc649c',
      indexName: 'vue-tiny-validate-js',
    },
  },
};
