<template>
  <el-card class="flex flex-col w-[80%] h-[80%] m-auto">
    <h1>{{ currentQ?.name }}</h1>
    <h2>{{ currentQ?.description }}</h2>
    <div class="flex gap-4">
      <div class="flex flex-col w-[400px]">
        <p
          v-for="answer in currentQ?.value.answers"
          :key="answer.id"
        >
          {{ answer.id }} : {{ answer.value }}
        </p>
      </div>
      <div class="flex flex-col w-[700px]">
        <p
          v-for="question in currentQ?.value.questions"
          :key="question.id"
        >
          {{ question.id }} : {{ question.value }}
        </p>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import questions from '@/assets/questions/questions.json';

const currentQ = ref();

onMounted(() => {
  const { params } = useRoute();
  currentQ.value = questions.find((el) => el.id === params.id);
});
</script>
