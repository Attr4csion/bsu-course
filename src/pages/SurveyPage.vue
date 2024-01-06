<template>
  <div>
    <el-card
      v-for="question in questions"
      :key="question.id"
      class="w-[350px]"
    >
      <img
        :src="question.image"
        alt="reading"
      />
      <p>{{ question.name }}</p>
      <p>Количество вопросов: {{ question.value.questions.length }}</p>
      <div class="flex justify-between">
        <el-button>Подробнее</el-button>
        <el-button
          type="success"
          plain
          >Начать</el-button
        >
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import questions from '@/assets/questions/questions.json';
</script>
