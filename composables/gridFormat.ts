import _ from 'lodash'
import { DateTime } from 'luxon'

const gridfm = {
  formatUseYn (row: object, column: string, value: string, index: number) {
    return value === 'Y' ? '사용중' : '미사용'
  },
  formatLocaleToDT (row: object, column: string, value: string, index: number) {
    if (value && typeof value === 'string' && DateTime.fromISO(value).isValid) {
      const temp = DateTime.fromISO(value).toFormat('yyyy-MM-dd HH:mm:ss')
      return temp
    }

    return value
  }
}

export {
  gridfm
}
