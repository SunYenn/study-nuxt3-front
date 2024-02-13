<template>
  <div class="content-wrap">
    dashboard
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'

definePageMeta({
  name: 'Dashboard',
  layout: 'main'
})

// const paging = {
//   boardGrp: 'PUBB_0001',
//   pageSize: 100,
//   currentPage: 1,
//   totalPage: 0
// }

function init () {
  // const res = useApi.post('api/v1/board/getBoardList', paging)
  // if (res.data.success) {
  //   this.tableData = res.data.board
  //   this.paging.totalPage = res.data.paging.totalPage
  // }
}

onMounted(() => {
  init()
})
</script>
