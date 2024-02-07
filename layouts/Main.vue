<template>
  <el-container class="wrap">
    <el-header height="70px">
      <div class="navbar-top">
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#333"
          text-color="#fff"
          active-text-color="#79bbff"
          :ellipsis="false"
          @select="handleSelect"
        >
          <div class="go-home">
            <el-icon size="25" @click="home">
              <HomeFilled />
            </el-icon>
          </div>
          <template v-for="(tab) in tabs">
            <!-- 하위 메뉴 없을 때-->
            <el-menu-item
              v-if="!tab.children || tab.children.length === 0"
              :key="'A' + tab.menuSeq"
              :index="tab.menuSeq.toString()"
            >
              {{ tab.menuNm }}
            </el-menu-item>
            <!-- 하위 메뉴 있을 때-->
            <el-sub-menu
              v-else
              :key="'B' + tab.menuSeq"
              :index="tab.menuSeq.toString()"
            >
              <template #title>
                {{ tab.menuNm }}
              </template>
              <template v-for="(subtab) in tab.children" :key="subtab.menuSeq">
                <el-menu-item
                  :index="subtab.menuSeq.toString()"
                >
                  {{ subtab.menuNm }}
                </el-menu-item>
              </template>
            </el-sub-menu>
          </template>
          <div class="txt-login">
            <p>{{ comfn.getCookie('user_name') }}님이 로그인 중입니다.</p>
            <el-button @click="$router.push('/auth/logout')">
              로그아웃
            </el-button>
          </div>
        </el-menu>
      </div>
    </el-header>

    <el-main>
      <div>
        <slot />
      </div>
    </el-main>
  </el-container>
</template>
<script setup lang="ts">
import { ref, nextTick, onBeforeMount } from 'vue'
import { comfn } from '@/composables/common'
import { useApi } from '@/composables/useApi'

interface Tab {
  menuNm: string,
  menuSeq: number
  children?: {
    menuNm: string,
    menuSeq: number
  }[]
}

const router = useRouter()
const tabs = ref<Tab[]>([])

onBeforeMount(async () => {
  await nextTick()
  await init()
})

const handleSelect = (value: string) => {
  const tabArr = comfn.cloneDeep(tabs.value)
  const flatTabArr = tabArr.flatMap((tabObj: Tab) =>
    tabObj.children && tabObj.children.length > 0 ? tabObj.children : [tabObj]
  )
  const selectObj = comfn.getObjByKeyNValue(flatTabArr, 'menuSeq', value)
  const menuUri = selectObj ? selectObj.menuUri : ''
  router.push(menuUri)
}

function init () {
  useApi.post('/api/v1/menu', {
    isMainCallForMenu: true
  }).then((res) => {
    tabs.value = res.data.value as Tab[]
  })
}

function home () {
  const isActive = document.querySelectorAll('li.is-active')
  isActive.forEach((ele) => {
    ele.classList.remove('is-active')
  })
  nextTick(() => {
    router.push('/dashboard')
  })
}
</script>
