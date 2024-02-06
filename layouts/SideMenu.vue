<template>
  <el-aside>
    <div class="sidenav-header">
      <nuxt-link class="navbar-brand" to="/dashboard">
        <img src="../static/img/logo.png" alt="vopak">
      </nuxt-link>
      <div class="ml-auto" />
    </div>
    <div class="menu-wrap">
      <el-menu
        ref="menu"
        mode="vertical"
        background-color=""
        unique-opened
        router
        @select="handleSelect"
      >
        <!--active-text-color="#006ecd"-->
        <template v-for="(item, index) in menu">
          <el-submenu
            v-if="item.children && item.children.length > 0"
            ref="submenu"
            :key="index"
            :index="`subMenu-${index}`"
          >
            <template #title>
              <a data-toggle="collapse" class="sidebar-menu-item nav-link">
                <i :class="item.iconClsName" />
                <span>{{ item.menuNm }}</span>
              </a>
            </template>
            <template v-for="(subItem, subIndex) in item.children">
              <el-menu-item
                v-if="!subItem.children || subItem.children.length === 0"
                :key="subIndex"
                :index="subItem.menuUri"
              >
                <i :class="subItem.iconClsName" />
                <span>{{ subItem.menuNm }}</span>
              </el-menu-item>
              <el-submenu
                v-else
                :key="subIndex"
                :index="`subMenu-${index}-subSubmenu-${subIndex}`"
              >
                <template #title>
                  <i :class="subItem.iconClsName" />
                  <span>{{ subItem.menuNm }}</span>
                </template>
                <el-menu-item
                  v-for="(childItem, childIndex) in subItem.children"
                  :key="childIndex"
                  :index="childItem.menuUri"
                >
                  <i :class="childItem.iconClsName" />
                  <span>{{ childItem.menuNm }}</span>
                </el-menu-item>
              </el-submenu>
            </template>
          </el-submenu>
          <el-menu-item
            v-else
            :key="index"
            :index="item.menuUri"
          >
            <a class="nav-link">
              <i :class="item.iconClsName" />
              <span>{{ item.menuNm }}</span>
            </a>
          </el-menu-item>
        </template>
      </el-menu>
      <div class="navbar-inner">
        <div class="account">
          <div class="inner">
            <button type="button" class="btn-logout" @click="logout">
              <span>Logout</span>
            </button>
            <button type="button" @click="openChgPwModal">
              <span>비밀번호 변경</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </el-aside>
</template>
<script>
export default {
  name: 'SideMenu',
  data () {
    return {
      menu: []
    }
  },
  mounted () {
    this.getMenu()
  },
  created () {
    this.$nuxt.$on('roadMenu', () => {
      this.getMenu()
    })
  },
  methods: {
    async getMenu () {
      await this.$axios
        .post('/api/v1/menu', {
          isMainCallForMenu: 'true'
        })
        .then((res) => {
          this.menu = res.data
        })
        .catch((error) => {
          if (error.response.data.code === 'NO_RESULTS') {
            this.alert(this.$t(error.response.data.message))
          }
        })
    },
    handleSelect (selectedPath) {
      this.$router.push(selectedPath)
    },
    logout () {
      this.$router.push('/auth/logout')
    },
    openChgPwModal () {
      this.$store.commit('modal/setChangePwFg', true)
    },
    reset () {
      this.$refs.menu.openedMenus = []
      this.$refs.menu.activeIndex = null
    }
  }
}
</script>
<style scoped>
.sidenav-header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100% !important;
  height: 120px;
}
.navbar-brand {
  width: 100% !important;
  margin:0 auto;
}
.navbar-brand img {
  display: block;
  width: 87px;
  height: 55px;
  margin: 0 auto;
}
.sidebar-menu-item {
  cursor: pointer;
}
.el-menu {
  border-right: 0;
}
.menu-wrap {
  overflow-x: hidden;
  overflow-y: auto;
  height: calc(100% - 165px);
}
.navbar-inner{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 249px;
  background: var(--white);
}
.el-container {
  display: flex;
}
.el-aside {
  position: relative;
  overflow-y: auto;
  width: 250px !important;
  height: 100%;
  border-right: 1px solid var(--grey-ebe);
  background-color: var(--white);
}
.el-main {
  height: 100%;
  overflow-y: auto;
}
.inner{
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-top: 1px solid var(--grey-ebe);
}
.inner button {
  position: relative;
  padding: 10px 15px;
  border: 0;
  font-size: var(--fs16);
  color: var(--grey-8b8);
  background: none;
}
.inner button:hover {
  color: var(--green-027);
}
.inner button:nth-child(2)::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  display: block;
  width: 1px;
  height: 15px;
  background-color: var(--grey-d0d);
  transform: translateY(-50%);
}
</style>
