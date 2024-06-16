<template>
  <div class="flex justify-between items-center">
    <h1 class="p-5 font-bold">Подготовка к ВПР по английскому языку</h1>
    <div>
      {{ store.me.first_name }} {{ store.me.last_name }}
      <el-button @click="logout">Выйти</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import api from '@/axios';
import { useApiStore } from '@/store';

const store = useApiStore();
onMounted(() => store.getMe());
const logout = async () => {
  await api.post('/backend/logout/');
  localStorage.removeItem('token');
  store.setToken('');
};
</script>
