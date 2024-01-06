<template>
  <el-container style="height: 100vh">
    <TheMenu />
    <el-container>
      <el-header>
        <TheHeader></TheHeader>
      </el-header>
      <el-main style="--el-main-padding: 32px 160px; overflow: hidden">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts"></script>

<style scoped></style>
