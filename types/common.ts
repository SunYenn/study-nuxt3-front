interface Tab {
  menuNm: string,
  menuSeq: number
  children?: {
    menuNm: string,
    menuSeq: number
  }[]
}

export type {
  Tab
}
