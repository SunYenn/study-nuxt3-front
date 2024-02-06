import _ from 'lodash'

const comfn = {
  // ========================================================================
  // Validate 관련
  // ========================================================================
  isNotNull (obj: any) {
    return (obj !== null && typeof obj !== 'undefined')
  },
  isNotEmpty (obj: any) {
    return (obj !== null && typeof obj !== 'undefined' && obj !== '')
  },
  isEmpty (obj: any) {
    return isNaN(obj) ? _.isEmpty(obj) : false
  },
  isBlank (obj: any) {
    if (this.isEmpty(obj)) {
      return true
    } else if (typeof obj === 'string' && obj.trim() === '') {
      return true
    }

    return false
  },
  isFunction (value: any) {
    return _.isFunction(value)
  },

  // ========================================================================
  // 쿠키
  // ========================================================================
  setCookie (cookieName: string, cookieValue: any, options: any) {
    const cookie = useCookie(cookieName, options)
    cookie.value = cookieValue
  },
  getCookie (cookieName: string) {
    const cookie = useCookie(cookieName)
    return cookie.value || null
  },
  delCookie (cookieName: string) {
    const cookie = useCookie(cookieName)
    cookie.value = null
  }
}

export {
  comfn
}
