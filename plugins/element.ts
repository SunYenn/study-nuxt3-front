import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default defineNuxtPlugin((nuxtApp) => {
  // ElementPlus Icons
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    nuxtApp.vueApp.component(key, component)
  }
})
