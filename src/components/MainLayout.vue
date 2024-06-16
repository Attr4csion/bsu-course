<template>
  <IndexPage v-if="api.token"></IndexPage>
  <LoginPage v-else></LoginPage>
</template>

<script setup lang="ts">
import { useApiStore } from '@/store';
onMounted(() => {
  api.setToken(localStorage.getItem('token') as string);
});

const api = useApiStore();

watch(
  () => api.token,
  () => {
    api.setToken(localStorage.getItem('token') as string);
  },
  { deep: true }
);
</script>
