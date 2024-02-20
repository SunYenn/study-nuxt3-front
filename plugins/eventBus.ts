import mitt from 'mitt'
const emitter = mitt()
export default defineNuxtPlugin((_nuxtApp) => {
  const bus = {
    $on: emitter.on,
    $emit: emitter.emit
  }

  return {
    provide: {
      bus
    }
  }

  // _nuxtApp.provide('bus', {
  //   $on: emitter.on,
  //   $emit: emitter.emit
  // })
})
