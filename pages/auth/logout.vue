<template>
  <div />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
const router = useRouter()

onMounted(() => {
  useApi
    .get('/api/v1/auth/logout')
    .finally(() => {
      router.push('/auth')
    })

  comfn.delCookie('user_name')
  comfn.delCookie('user_id')
  comfn.delCookie('access_token')
  comfn.delCookie('refresh_token')
})
</script>
