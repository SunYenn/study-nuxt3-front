<template>
  <div />
</template>
<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  useRouter().push('/auth')
})

</script>
