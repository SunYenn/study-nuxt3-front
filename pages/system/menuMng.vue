<template>
  <div class="container-system">
    <div class="row">
      <!-- 메뉴관리 -->
      <div class="col-xl-3 col-lg-4 menu-col-4">
        <div class="card">
          <div class="card-header">
            <h3>
              메뉴 관리
            </h3>
          </div>
          <div class="card-body">
            <el-tree
              :data="tabs"
              :props="defaultProps"
              node-key="menuSeq"
              accordion
              @node-click="handleNodeClick"
            />
          </div>
          <div class="card-footer">
            <div class="d-flex justify-content-center">
              <el-button v-if="!isRegist" @click="isRegist = true">
                등록
              </el-button>
              <el-button v-if="isRegist" plain @click="isRegist = false">
                취소
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <!-- 메뉴상세 -->
      <div class="col-xl-9 col-lg-8 menu-col-8">
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
                  </td>
                  <th scope="row">
                    노출 순서
                  </th>
                  <td>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    메뉴 ID
                  </th>
                  <td>
                  </td>
                  <th scope="row">
                    메뉴 URI
                  </th>
                  <td>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    사용 여부
                  </th>
                  <td class="cell" colspan="3">
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    메뉴명
                  </th>
                  <td colspan="3">
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    메뉴 설명
                  </th>
                  <td rowspan="2" colspan="3">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="card-footer">
            <div class="d-flex justify-content-center">
              <el-button v-if="!isRegist" @click="deleteMenu">
                삭제
              </el-button>
              <el-button v-if="isRegist" @click="reset">
                초기화
              </el-button>
              <el-button @click="submit">
                저장
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

const defaultProps = {
  children: 'children',
  label: 'menuNm'
}

const isRegist = ref(false)
const tabs = ref<Tab[]>([])

definePageMeta({
  name: 'MenuMng',
  layout: 'main'
})

onMounted(async () => {
  await nextTick()
  await init()
})

function init () {
  useApi.post('menu', '/api/v1/menu', {
    isMainCallForMenu: false
  }).then((res) => {
    tabs.value = res.data.value as Tab[]
  })
}

function handleNodeClick () {

}

function submit () {

}

function deleteMenu () {

}

function reset () {

}

</script>
