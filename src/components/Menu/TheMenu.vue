<template>
  <el-menu
    class="el-menu-vertical-demo"
    :collapse="true"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu-item @click="$router.push('/')">
      <el-icon><House /></el-icon>
      <template #title>Главная</template>
    </el-menu-item>
    <el-menu-item @click="$router.push('/me')">
      <el-icon><UserFilled /></el-icon>
      <template #title>Личный кабинет</template>
    </el-menu-item>
    <el-menu-item
      v-if="store.me?.role === 'TEACHER'"
      @click="$router.push('/creating')"
    >
      <el-icon><Histogram /></el-icon>
      <template #title>Создание тестов</template>
    </el-menu-item>
    <el-menu-item disabled>
      <el-icon><setting /></el-icon>
      <template #title>Настройки</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import { useApiStore } from '@/store';

const store = useApiStore();
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style scoped></style>
