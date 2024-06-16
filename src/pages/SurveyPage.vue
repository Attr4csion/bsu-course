<template>
  <el-scrollbar>
    <div
      class="w-full grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 gap-4"
    >
      <el-card
        v-for="question in exercises"
        :key="question.id"
        style="max-width: 300px"
        class="flex flex-col justify-between"
      >
        <div>
          <div class="flex flex-nowrap justify-between">
            <h2>{{ question?.title }}</h2>
            <el-tag
              :type="`${question.user_exercise_status?.completed ? 'success' : 'info'}`"
              >{{
                question.user_exercise_status?.completed
                  ? 'Пройдено'
                  : 'Не пройдено'
              }}</el-tag
            >
          </div>
          <p>{{ question.description }}</p>
        </div>
        <template #footer>
          <el-button
            type="success"
            :disabled="question.user_exercise_status?.completed"
            plain
            @click="router.push(`/survey/${question.exercise.id}`)"
            >Начать</el-button
          >
          <el-button
            v-if="question.user_exercise_status?.completed"
            @click="
              {
                getResult(question.id);
                dialogVisible = true;
              }
            "
            >Результаты</el-button
          >
          <el-dialog
            v-model="dialogVisible"
            title="Результат теста"
            width="500"
          >
            <p>{{ exerciseResult?.title }}</p>
            <p>{{ exerciseResult?.description }}</p>
            <p>
              Правильность выполнения:
              {{ exerciseResult?.percentage_correct }} %
            </p>
          </el-dialog>
        </template>
        <div></div>
      </el-card>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import router from '@/router';
import api from '@/axios.ts';
import { useApiStore } from '@/store';

const store = useApiStore();
const exercises = ref();

const getExercises = async () => {
  const { data } = await api.get('backend/exercises/');
  exercises.value = data;
};

onMounted(() => getExercises());

const dialogVisible = ref(false);
const exerciseResult = ref();

const getResult = async (id) => {
  const { data } = await api.get(`backend/user-exercise-results/${id}/`);
  exerciseResult.value = data;
};

watch(
  () => store.token,
  () => getExercises(),
  { immediate: true }
);
</script>
