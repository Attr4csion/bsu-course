<template>
  <el-tabs
    v-model="activeName"
    class="demo-tabs"
    @tab-click="handleClick"
  >
    <el-tab-pane
      label="Вопросы"
      name="first"
      ><QuestionsCreating
    /></el-tab-pane>
    <el-tab-pane
      label="Тесты"
      name="second"
      ><ExercisesCreating
    /></el-tab-pane>
    <el-tab-pane
      label="Назначения"
      name="third"
      ><AssignCreating
    /></el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { TabsPaneContext } from 'element-plus';

const activeName = ref('first');

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>

<style></style>
