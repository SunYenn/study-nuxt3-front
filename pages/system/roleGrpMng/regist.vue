<template>
  <div class="container-system authority-wrap">
    <div class="card">
      <div class="card-header">
        <h3>
          권한등록
        </h3>
      </div>
      <div class="card-body d-flex">
        <div class="menu-area">
          <h3 class="title-bar">
            권한 목록
          </h3>
          <el-tree
            ref="menuTree"
            :data="menuList"
            :props="defaultProps"
            show-checkbox
            :default-expand-all="true"
            node-key="menuSeq"
          />
        </div>
        <div>
          <table class="table-horizontal">
            <colgroup>
              <col width="15%">
              <col width="35%">
              <col width="15%">
              <col width="*">
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">
                  권한명
                </th>
                <td>
                  <el-input v-model="form.roleGrpName" />
                </td>
                <th scope="row">
                  상태
                </th>
                <td>
                  <el-radio-group v-model="form.useYn">
                    <el-radio-button label="Y">
                      사용
                    </el-radio-button>
                    <el-radio-button label="N">
                      미사용
                    </el-radio-button>
                  </el-radio-group>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  설명
                </th>
                <td colspan="3">
                  <el-input v-model="form.roleGrpDesc" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card-footer">
        <div class="d-flex justify-content-center">
          <el-button type="info" @click="$router.push('/system/roleGrpMng')">
            목록
          </el-button>
          <el-button type="info" @click="reset">
            초기화
          </el-button>
          <el-button type="info" @click="submit">
            저장
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

definePageMeta({
  name: 'RoleGrpMngCre',
  layout: 'main'
})

const menuTree = ref()
const menuList = ref<MenuVO[]>([])
const defaultProps = {
  children: 'children',
  label: 'menuNm'
}
const form = ref<roleGrpVO>({
  roleGrpName: '',
  roleGrpDesc: '',
  useYn: 'Y'
})

onMounted(async () => {
  await nextTick()
  init()
})

function init () {
  // menu
  useApi.post('menu', '/api/v1/menu', {
    isMainCallForMenu: false
  }).then((res: any) => {
    const result = res.data.value as apiResponse
    if (result.success) {
      menuList.value = result.data as MenuVO[]
    } else {
      ElMessage.error('메뉴 데이터를 얻어오는 데 실패했습니다.')
    }
  })
}

function reset () {
  form.value.roleGrpName = ''
  form.value.roleGrpDesc = ''
  form.value.useYn = 'Y'
  menuTree.value.setCheckedNodes([])
}

function submit () {
  comfn.confirm('권한을 등록하시겠습니까?', () => {
    const selectMenuObjs = menuTree.value.getCheckedNodes()
    const selectMenuSeqs = selectMenuObjs.map((obj: MenuVO) => obj.menuSeq)
    form.value.menuSeqList = selectMenuSeqs

    useApi.post('creRole', '/api/v1/roleGrp/creRole', form.value
    ).then((res: any) => {
      const result = res.data.value as apiResponse
      if (result.success) {
        ElMessage.success(form.value.roleGrpName + ' 권한을 등록하였습니다.')
        useRouter().push('/system/roleGrpMng')
      } else {
        ElMessage.error(result.message ? result.message : '권한 등록에 실패했습니다.')
      }
    })
  })
}

</script>
