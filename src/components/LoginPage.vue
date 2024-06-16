<template>
  <el-container style="height: 100vh">
    <div class="w-[300px] h-[250px] m-auto flex flex-col gap-[10px]">
      <h1 class="flex justify-center">Авторизация</h1>
      <el-input
        v-model="authForm.username"
        placeholder="Логин"
      ></el-input>
      <el-input
        v-model="authForm.password"
        placeholder="Пароль"
        show-password
      ></el-input>
      <el-button @click="handleAuth">Войти</el-button>
    </div>
  </el-container>
</template>

<script setup lang="ts">
import api from '@/axios.ts';
const authForm = ref({ username: '', password: '' });
import { useApiStore } from '@/store';

const store = useApiStore();
const handleAuth = async () => {
  const { data } = await api.post('/backend/login/', authForm.value);
  localStorage.setItem('token', data.token);
  store.setToken(data.token);
};
</script>
