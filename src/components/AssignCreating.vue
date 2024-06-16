<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      border
    >
      <el-table-column
        prop="title"
        label="ФИО"
      >
        <template #default="{ row }">
          <span>
            {{ row.first_name + ' ' + row.last_name }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="username"
        label="Юзернейм"
      />
    </el-table>
    <div class="flex flex-col gap-[10px] w-[50vw] mt-[10px]">
      <p>Назначьте упражнение</p>
      <el-select
        v-model="assign"
        placeholder="Выберите тест"
      >
        <el-option
          v-for="q in exercises"
          :key="q.id"
          :label="q.title"
          :value="q.id"
        ></el-option>
      </el-select>
      <el-select
        v-model="assignUser"
        placeholder="Выберите ученика"
      >
        <el-option
          v-for="q in tableData"
          :key="q.id"
          :value="q.id"
          :label="q.first_name + ' ' + q.last_name"
          >{{ q.first_name + ' ' + q.last_name }}</el-option
        >
      </el-select>
      <el-button
        type="success"
        plain
        class="w-[150px] self-end"
        @click="handleAssignExercise"
        >Создать</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import api from '@/axios.ts';

const tableData = ref();
const exercises = ref();
const assignUser = ref();

const assign = ref();
const getExercises = async () => {
  const { data } = await api.get('backend/students/');
  tableData.value = data;
};

const getQuestions = async () => {
  const { data } = await api.get('backend/exercises/');

  exercises.value = data;
};

onMounted(async () => {
  getExercises();
  getQuestions();
});

const handleAssignExercise = async () => {
  await api.post(`backend/user-exercises/`, {
    user: assignUser.value,
    exercise: assign.value,
  });
};
</script>
