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
  // Object 관련
  // ========================================================================
  cloneDeep (value: any) {
    return _.cloneDeep(value)
  },
  // array에서 특정 key의 value값을 통해 원하는 object 가져오는 함수
  getObjByKeyNValue (
    arr: any[],
    key: string,
    value: any
  ): any | null {
    const obj = arr.find(obj => obj[key].toString().trim() === value.toString().trim())
    return obj ?? null
  },
  // 계층형 object[]를 평탄화
  getFlatArr (arr: any[]) {
    const flatArr = arr.flatMap((obj: Tab) =>
      obj.children && obj.children.length > 0 ? obj.children : [obj]
    )

    return flatArr
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
