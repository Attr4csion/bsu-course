<template>
  <el-scrollbar>
    <div
      class="w-full grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 gap-4"
    >
      <el-card
        v-for="question in questions"
        :key="question.id"
        class="w-[300px]"
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
            @click="router.push(`/survey/${question.id}`)"
            >Начать</el-button
          >
        </div>
      </el-card>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import router from '@/router';
import questions from '@/assets/questions/questions.json';
</script>
