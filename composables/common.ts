import _ from 'lodash'
import { ElMessageBox } from 'element-plus'

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
  /**
   * 계층형 배열 평탄화
   * @param arr 계층형 배열
   * @param subDepthKey 하위 배열을 담고 있는 key
   * @returns 수평형 배열
   */
  getFlatArr (arr: any[], subDepthKey: string): any[] {
    const arrTemp = _.cloneDeep(arr)
    const flatArr = arrTemp.flatMap((obj: any) =>
      obj[subDepthKey] && obj[subDepthKey].length > 0
        ? [obj, ...comfn.getFlatArr(obj[subDepthKey], subDepthKey)]
        : [obj]
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
  },
  // ========================================================================
  // 알람 관련
  // ========================================================================
  /**
   * JavaScript confirm() 기능과 유사
   * @param {String} message 알림창에 출력할 메시지
   * @param {Function} done 확인 버튼 클릭시 호출 함수
  */
  async confirm (message: string, done: Function) {
    await ElMessageBox.confirm(message)
      .then(() => {
        done()
      }).catch((error) => { // 알림창 밖 클릭시
        console.log(error)
      })
  }
}

export {
  comfn
}
