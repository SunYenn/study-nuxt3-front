const baseUrl = 'http://localhost:8080'

export const useApi = {
  get: (url: string, data?: object) =>
    useFetch(url, {
      baseURL: baseUrl,
      method: 'GET',
      params: data
    }),
  post: (url: string, data?: object) =>
    useFetch(url, {
      baseURL: baseUrl,
      method: 'POST',
      body: { ...data },
      onRequest: (context: any) => {
        const route = useRoute()

        context.options.headers = new Headers(context.options.headers)
        context.options.headers.append('Authrization', comfn.getCookie('access_token') || comfn.getCookie('refresh_token'))
        context.options.headers.append('Pagepath', route.fullPath)
      },
      onResponse ({ response }) {
        // Process the response data
        console.log('Set-Cookie >>> ', response.headers.get('Set-Cookie'))
        const res = response._data
        console.log('response._data >>> ', res)
        // localStorage.setItem('token', response._data.token)
      }
    }),
  patch: (url: string, data?: object) =>
    useFetch(url, {
      baseURL: baseUrl,
      method: 'PATCH',
      params: data
    }),
  delete: (url: string, data?: object) =>
    useFetch(url, {
      baseURL: baseUrl,
      method: 'DELETE',
      params: data
    })
}
