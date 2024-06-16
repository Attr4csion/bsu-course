<template>
  <el-container style="height: 100vh">
    <TheMenu />
    <el-container>
      <el-header>
        <TheHeader></TheHeader>
      </el-header>
      <router-view></router-view>
    </el-container>
  </el-container>
</template>
