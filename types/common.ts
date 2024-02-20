interface MenuVO {
  menuSeq: number,
  pmenuSeq?: number,
  menuPropId?: string,
  menuUri: string,
  menuNm?: string,
  menuDesc?: string,
  menuLvl?: number,
  dspOrd?: number,
  useYn?: string,
  children?: MenuVO []
}

interface Tree {
  children?: Array<any> []
}

export type {
  MenuVO,
  Tree
}
