<template>
  <div class="container-system authority-wrap">
    <div class="card">
      <div class="card-header">
        <h3>
          권한수정
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
          <el-button type="info" @click="delRloe">
            삭제
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
  name: 'RoleGrpMngUdt',
  layout: 'main'
})

const roleGrpSeq = useRoute().params.seq
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
  // roleGrpDetail
  useApi.post('roleGrpDetail', '/api/v1/roleGrp/' + roleGrpSeq
  ).then((res: any) => {
    const result = res.data.value as apiResponse
    if (result.success) {
      form.value = result.data as roleGrpVO
      menuTree.value.setCheckedKeys(result.data.menuSeqList) // 기존에 권한 부여 된 목록 체크 활성화
    } else {
      ElMessage.error('권한 데이터를 얻어오는 데 실패했습니다.')
    }
  })
}

function delRloe () {
  comfn.confirm('"' + form.value.roleGrpName + '" 권한을 삭제하시겠습니까?', () => {
    const selectMenuObjs = menuTree.value.getCheckedNodes()
    const selectMenuSeqs = selectMenuObjs.map((obj: MenuVO) => obj.menuSeq)
    form.value.menuSeqList = selectMenuSeqs

    useApi.post('delRole', '/api/v1/roleGrp/delRole', form.value
    ).then((res: any) => {
      const result = res.data.value as apiResponse
      if (result.success) {
        ElMessage.success('"' + form.value.roleGrpName + '" 권한을 삭제하였습니다.')
        useRouter().push('/system/roleGrpMng')
      } else {
        ElMessage.error(result.message ? result.message : '권한 삭제에 실패했습니다.')
      }
    })
  })
}

function submit () {
  comfn.confirm('"' + form.value.roleGrpName + '" 권한을 수정하시겠습니까?', () => {
    const selectMenuObjs = menuTree.value.getCheckedNodes()
    const selectMenuSeqs = selectMenuObjs.map((obj: MenuVO) => obj.menuSeq)
    form.value.menuSeqList = selectMenuSeqs

    useApi.post('uptRole', '/api/v1/roleGrp/uptRole', form.value
    ).then((res: any) => {
      const result = res.data.value as apiResponse
      if (result.success) {
        ElMessage.success('"' + form.value.roleGrpName + '" 권한을 수정하였습니다.')
        init()
      } else {
        ElMessage.error(result.message ? result.message : '권한 수정에 실패했습니다.')
      }
    })
  })
}

</script>
