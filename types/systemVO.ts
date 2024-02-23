export interface roleGrpVO {
  rnum?: number,
  roleGrpSeq?: number,
  roleGrpName?: String | undefined,
  roleGrpDesc?: String | undefined,
  useYn?: String | 'Y',
  creUserId?: String,
  creDt?: Date,
  chgUserId?: String,
  chgDt?: Date,
  menuSeqList?: number[] | undefined
}