<template>
  <el-card>
    <h1>Профиль</h1>
    <p>ФИО: {{ me.first_name + ' ' + me.last_name }}</p>
    <p>Должность: {{ defineRole(me.role) }}</p>

    <div v-if="me.role === 'STUDENT'">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="exercise_title"
          label="Название"
        >
        </el-table-column>
        <el-table-column
          prop="total_questions"
          label="Количество вопросов"
        />
        <el-table-column label="Правильность выполнения">
          <template #default="{ row }">
            {{ row.percentage_correct }}%
          </template>
        </el-table-column>
        <el-table-column label="Просмотр результатов">
          <template #default="{ row }">
            <el-button
              @click="
                {
                  getResult(row.exercise);
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
              <p>{{ currentResult?.title }}</p>
              <p>{{ currentResult?.description }}</p>
              <p style="margin-bottom: 10px">
                Правильность выполнения:
                {{ currentResult?.percentage_correct }} %
              </p>
              <div
                v-for="q in currentResult?.questions"
                :key="q.id"
                style="
                  margin-bottom: 10px;
                  border-radius: 16px;
                  border: 1px solid grey;
                  padding: 8px;
                "
              >
                <p>Вопрос: {{ q.question_text }}</p>
                <p>
                  Ответ:
                  {{
                    q.selected_answers_text.length > 0
                      ? q.selected_answers_text.join(', ')
                      : q.selected_answers_text[0]
                  }}
                </p>
                <p class="flex flex-row items-center gap-[6px]">
                  Верный ответ: {{ q.is_correct ? 'Да' : 'Нет' }}
                  <el-icon v-if="q.is_correct"
                    ><Check color="#59EA3A"
                  /></el-icon>
                  <el-icon v-if="!q.is_correct"
                    ><Close color="#FF0000"
                  /></el-icon>
                </p>
              </div>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
import { useApiStore } from '@/store';
import { storeToRefs } from 'pinia';
import api from '@/axios';
const dialogVisible = ref(false);
const currentResult = ref();

const store = useApiStore();
const { me } = storeToRefs(store);
const tableData = ref();
onMounted(async () => {
  const { data } = await api.get(
    '/backend/user-exercises/completed-exercises/'
  );
  tableData.value = data;
});

const getResult = async (id) => {
  console.log(id);
  const { data } = await api.get(`backend/user-exercise-results/${id}/`);
  currentResult.value = data;
};

const defineRole = (role) => {
  switch (role) {
    case 'TEACHER':
      return 'Учитель';
    case 'STUDENT':
      return 'Ученик';
  }
};
</script>

<style>
.el-table--border .el-table__inner-wrapper:after,
.el-table--border:after,
.el-table--border:before,
.el-table__inner-wrapper:before {
  display: none;
}
</style>
