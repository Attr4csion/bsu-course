<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      border
    >
      <el-table-column
        prop="title"
        label="Название"
      />
      <el-table-column
        prop="description"
        label="Описание"
      />
      <el-table-column
        prop="questions_count"
        label="Кол-во вопросов"
      />

      <el-table-column label="Удалить">
        <template #default="{ row }">
          <el-button
            type="danger"
            plain
            @click="handleDeleteExercises(row.id)"
            >Удалить</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="flex flex-col gap-[10px] w-[50vw] mt-[10px]">
      <p>Создание нового упражениня</p>
      <el-input
        v-model="exercise.title"
        placeholder="Название"
      ></el-input>
      <el-input
        v-model="exercise.description"
        placeholder="Описание"
        type="textarea"
      ></el-input>
      <el-select
        v-model="exercise.questions"
        multiple
        placeholder="Выберите вопросы"
      >
        <el-option
          v-for="q in questions"
          :key="q.id"
          :label="q.text"
          :value="q.id"
        ></el-option>
      </el-select>
      <el-button
        type="success"
        plain
        class="w-[150px] self-end"
        @click="handleCreateExercise"
        >Создать</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import api from '@/axios.ts';

const tableData = ref();
const exercise = ref({
  title: '',
  description: '',
  questions: [],
  status: 'ACTIVE',
});

const questions = ref();
const getExercises = async () => {
  const { data } = await api.get('backend/exercises/');
  tableData.value = data;
};

const getQuestions = async () => {
  const { data } = await api.get('backend/questions/');

  questions.value = data;
};

onMounted(async () => {
  getExercises();
  getQuestions();
});

const handleCreateExercise = async () => {
  await api.post(`backend/exercises/`, exercise.value );
};

const handleDeleteExercises = async (id: string) => {
  await api.delete(`backend/exercises/${id}/`);
  await getExercises();
};
</script>
