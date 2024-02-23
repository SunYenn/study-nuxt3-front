<template>
  <div class="container-system">
    <div class="card">
      <div class="card-header">
        <h3>
          권한관리
        </h3>
        <div class="btn-area">
          <el-button type="info" size="large" @click="$router.push('/system/roleGrpMng/regist')">
            권한 등록
          </el-button>
        </div>
      </div>
      <div class="card-body">
        <ElementGrid
          :grid-header="gridHeader"
          :grid-data="gridData"
          :option="gridOption"
          :row-click-func="rowClickFunc"
        />
      </div>
      <div class="card-footer">
        <div class="d-flex justify-content-center">
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

definePageMeta({
  name: 'RoleGrpMng',
  layout: 'main'
})

const gridOption = {}
const gridHeader = [
  { prop: 'rnum', label: 'No', minWidth: 60, align: 'center' },
  { prop: 'roleGrpName', label: '권한명', minWidth: 150, align: 'left' },
  { prop: 'roleGrpDesc', label: '설명', minWidth: 150, align: 'left' },
  { prop: 'useYn', label: '상태', minWidth: 90, align: 'center', formatter: gridfm.formatUseYn },
  { prop: 'creUserId', label: '등록자', minWidth: 150, align: 'center' },
  { prop: 'creDt', label: '등록일', minWidth: 150, align: 'center', formatter: gridfm.formatLocaleToDT },
  { prop: 'chgUserId', label: '수정자', minWidth: 90, align: 'center' },
  { prop: 'chgDt', label: '수정일', minWidth: 135, align: 'center', formatter: gridfm.formatLocaleToDT }
]
const gridData = ref<roleGrpVO[]>([])
const paging = {
  option1: '',
  option2: ''
}

onMounted(async () => {
  await nextTick()
  init()
})

function init () {
  useApi.post('roleGrp', 'api/v1/roleGrp', paging
  ).then((res: any) => {
    const result = res.data.value
    if (result.success) {
      gridData.value = result.data as roleGrpVO[]
    } else {
      ElMessage.error('데이터를 가져오는 데 실패했습니다.')
    }
  })
}

function rowClickFunc (e: roleGrpVO) {
  useRouter().push('/system/roleGrpMng/' + e.roleGrpSeq)
}

</script>
