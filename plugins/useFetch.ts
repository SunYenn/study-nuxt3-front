// import { ofetch } from 'ofetch'

export default defineNuxtPlugin((_nuxtApp) => {
  // globalThis.$fetch = ofetch.create({
  //   onRequest ({ request, options }) {
  //     console.log('$fetch onRequest')

  //     const router = useRouter()

  //     const headers = new Headers()
  //     console.log(comfn.getCookie('access_token') || comfn.getCookie('refresh_token') || '')
  //     console.log(router.currentRoute.value.fullPath)
  //     headers.set('Authorization', comfn.getCookie('access_token') || comfn.getCookie('refresh_token') || '')
  //     headers.set('Pagepath', router.currentRoute.value.fullPath)

  //     console.log(headers)
  //     options.headers = headers

  //   },
  //   onResponse ({ response, options }) {
  //     console.log('$fetch onResponse')
  //   }
  // })
})
