<template>
  <div class="container-system">
    <el-row :gutter="20">
      <!-- 메뉴관리 -->
      <el-col :span="6">
        <div class="card">
          <div class="card-header">
            <h3>
              메뉴 관리
            </h3>
          </div>
          <div class="card-body p-3">
            <el-tree
              :data="menuList"
              :props="defaultProps"
              node-key="menuSeq"
              accordion
              @node-click="handleNodeClick"
            />
          </div>
          <div class="card-footer">
            <div class="d-flex justify-content-center">
              <el-button v-if="!isRegist" @click="regist">
                등록
              </el-button>
              <el-button v-if="isRegist" plain @click="isRegist = false">
                취소
              </el-button>
            </div>
          </div>
        </div>
      </el-col>

      <!-- 메뉴상세 -->
      <el-col :span="18">
        <div class="card">
          <div class="card-header">
            <h3>
              {{ isRegist ? '메뉴 등록' : '메뉴 상세' }}
            </h3>
          </div>
          <div class="card-body">
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
                    상위 메뉴
                  </th>
                  <td>
                    <el-select
                      v-model="form.pmenuSeq"
                      :disabled="!isRegist && form.menuSeq === 0"
                    >
                      <el-option
                        :key="0"
                        label="없음"
                        :value="0"
                      />
                      <el-option
                        v-for="menu in flatMenuList"
                        :key="menu.menuSeq"
                        :label="menu.menuNm"
                        :value="menu.menuSeq"
                      />
                    </el-select>
                  </td>
                  <th scope="row">
                    노출 순서
                  </th>
                  <td>
                    <el-input v-model="form.dspOrd" :disabled="!isRegist && form.menuSeq === 0" />
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    메뉴 ID
                  </th>
                  <td>
                    <el-input v-model="form.menuPropId" :disabled="!isRegist && form.menuSeq === 0" />
                  </td>
                  <th scope="row">
                    메뉴 URI
                  </th>
                  <td>
                    <el-input v-model="form.menuUri" :disabled="!isRegist && form.menuSeq === 0" />
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    사용 여부
                  </th>
                  <td class="cell" colspan="3">
                    <el-radio-group v-model="form.useYn" :disabled="!isRegist && form.menuSeq === 0">
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
                    메뉴명
                  </th>
                  <td colspan="3">
                    <el-input v-model="form.menuNm" :disabled="!isRegist && form.menuSeq === 0" />
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    메뉴 설명
                  </th>
                  <td rowspan="2" colspan="3">
                    <el-input
                      v-model="form.menuDesc"
                      type="textarea"
                      :disabled="!isRegist && form.menuSeq === 0"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="card-footer">
            <div class="d-flex justify-content-center">
              <el-button v-if="!isRegist" :disabled="!isRegist && form.menuSeq === 0" @click="delMenu">
                삭제
              </el-button>
              <el-button v-if="isRegist" @click="reset">
                초기화
              </el-button>
              <el-button :disabled="!isRegist && form.menuSeq === 0" @click="submit">
                저장
              </el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
const { $bus } = useNuxtApp()

const defaultProps = {
  children: 'children',
  label: 'menuNm'
}

const isRegist = ref(false)
const menuList = ref<MenuVO[]>([])
const flatMenuList = ref<MenuVO[]>([])
const form = ref<MenuVO>({
  menuSeq: 0,
  pmenuSeq: 0,
  menuPropId: '',
  menuUri: '',
  dspOrd: 1
})

definePageMeta({
  name: 'MenuMng',
  layout: 'main'
})

onMounted(async () => {
  await nextTick()
  init()
})

function init () {
  useApi.post('menu', '/api/v1/menu', {
    isMainCallForMenu: false
  }).then((res) => {
    const result = res.data.value as MenuVO[]
    menuList.value = result
    flatMenuList.value = comfn.getFlatArr(result, 'children')

    form.value = {
      menuSeq: 0,
      pmenuSeq: 0,
      menuPropId: '',
      menuUri: '',
      dspOrd: 1
    }
  })
}

function reset () {
}

function regist () {
  isRegist.value = true


}

const creMenu = () => {
}

const udtMenu = () => {
  comfn.confirm('정말 수정하시겠습니까?', () => {
    useApi.post('udtMenu', '/api/v1/menu/udtMenu', form.value)
      .then((res) => {
        const result = res.data.value as apiResponse
        if (result.success) {
          init()
          $bus.$emit('roadMenu')
        } else {
          ElMessage.error('메뉴 수정에 실패했습니다.')
        }
      })
  })
}

function submit () {
  isRegist.value ? creMenu() : udtMenu()
}

function delMenu () {
  comfn.confirm('정말 삭제하시겠습니까?', () => {
    useApi.post('delMenu', '/api/v1/menu/delMenu', form.value)
      .then((res) => {
        const result = res.data.value as apiResponse
        if (result.success) {
          init()
          $bus.$emit('roadMenu')
        } else {
          ElMessage.error('메뉴 삭제에 실패했습니다.')
        }
      })
  })
}

function handleNodeClick (data: MenuVO) {
  form.value = comfn.cloneDeep(data)
}

</script>
