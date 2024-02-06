<template>
  <el-container class="wrap">
    <!-- 사이드 메뉴 바 -->
    <!-- <SideMenu v-show="sideMenuFg" ref="sideMenu" /> -->

    <el-container>
      <el-header>
        <div class="navbar-top">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            background-color="#333"
            text-color="#fff"
            active-text-color="#79bbff"
            @select="handleSelect"
          >
            <el-menu-item index="1">
              Processing Center
            </el-menu-item>
            <el-sub-menu index="2">
              <template #title>
                Workspace
              </template>
              <el-menu-item index="2-1">
                item one
              </el-menu-item>
              <el-menu-item index="2-2">
                item two
              </el-menu-item>
              <el-sub-menu index="2-3">
                <template #title>
                  item three
                </template>
                <el-menu-item index="2-3-1">
                  item one
                </el-menu-item>
                <el-menu-item index="2-3-2">
                  item two
                </el-menu-item>
              </el-sub-menu>
            </el-sub-menu>
            <div class="txt-login">
              <p>{{ comfn.getCookie('user_name') }}님이 로그인 중입니다.</p>
              <el-button @click="router.push('/auth/logout')">
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
  </el-container>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { comfn } from '@/composables/common'
import { useApi } from '@/composables/useApi'

const router = useRouter()

onMounted(() => {
  init()
})

const activeIndex = ref('')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

function init () {
  useApi.post('/api/v1/menu')
    .then((res) => {
      console.log(res)
    })
}
</script>
