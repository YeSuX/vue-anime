import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Vue Anime',
  description: '高性能Vue 3动画库',
  lang: 'zh-CN',
  lastUpdated: true,

  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '示例', link: '/examples/' },
      { text: 'API', link: '/api/' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '介绍',
          items: [
            { text: '什么是Vue Anime', link: '/guide/' },
            { text: '快速开始', link: '/guide/getting-started' },
          ],
        },
        {
          text: '基础',
          items: [
            { text: '基本动画', link: '/guide/basic-animation' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API参考',
          items: [
            { text: '核心API', link: '/api/' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yourusername/vue-anime' },
    ],
  },
})
