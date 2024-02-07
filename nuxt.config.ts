// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  devServer: {
    host: 'localhost',
    port: 3000
  },
  app: {
    head: {
      title: 'nuxt3-study',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  },
  css: [
    'assets/font.css',
    'assets/default.css',
    'assets/main.css'
  ],
  modules: [
    '@nuxtjs/eslint-module',
    '@element-plus/nuxt'
  ],
  build: {
  }
})
