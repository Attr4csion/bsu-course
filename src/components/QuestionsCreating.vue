<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      border
    >
      <el-table-column
        prop="text"
        label="Вопрос"
      />
      <el-table-column label="Категория">
        <template #default="{ row }">
          {{ defineRole(row.category) }}
        </template>
      </el-table-column>
      <el-table-column label="Проверка учетелем">
        <template #default="{ row }">
          {{ row.teacher_check ? 'Да' : 'Нет' }}
        </template>
      </el-table-column>
      <el-table-column label="Удалить">
        <template #default="{ row }">
          <el-button
            type="danger"
            plain
            @click="handleDeleteQuestion(row.id)"
            >Удалить</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div class="flex flex-col gap-[10px] w-[50vw] mt-[10px]">
      <p>Создание нового вопроса</p>
      <el-input
        v-model="question.text"
        placeholder="Текст вопроса"
      ></el-input>
      <div class="flex gap-[10px] flex-nowrap">
        <el-select
          v-model="question.category"
          placeholder="Выберите категорию"
        >
          <el-option
            label="Одиночный"
            value="SINGLE_CHOICE"
          />
          <el-option
            label="Мультвыбор"
            value="MULTIPLE_CHOICE"
          />
          <el-option
            label="Ручной ввод"
            value="TEXT"
          />
        </el-select>
        <el-checkbox
          v-model="question.teacher_check"
          label="Проверка учителем"
        ></el-checkbox>
      </div>

      <p>Ответы</p>
      <div
        v-for="a in answers"
        :key="a.id"
      >
        <el-input
          v-model="a.text"
          placeholder="Ответ"
          :disabled="!isQuestionReady"
        />
        <el-checkbox
          v-model="a.is_correct"
          label="Правильный ответ"
          :disabled="isSingleChoice(a.id) || !isQuestionReady"
        ></el-checkbox>
      </div>
      <el-button
        type="info"
        plain
        style="width: fit-content"
        @click="handleAddAnswer"
        >Добавить ответ</el-button
      >
      <el-button
        plain
        type="success"
        class="self-end"
        @click="handleCreateQuestion"
        >Сохранить</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import api from '@/axios.ts';

const tableData = ref();
const question = ref({
  text: '',
  teacher_check: false,
  category: '',
});

const answers = ref([{ id: 1, question: null, text: '', is_correct: false }]);

const defineRole = (role) => {
  switch (role) {
    case 'SINGLE_CHOICE':
      return 'Одиночный выбор';
    case 'MULTIPLE_CHOICE':
      return 'Мультивыбор';
    case 'TEXT':
      return 'Ручной ввод';
  }
};

const getQuestions = async () => {
  const { data } = await api.get('backend/questions/');
  tableData.value = data;
};

onMounted(async () => {
  getQuestions();
});

const handleAddAnswer = () =>
  answers.value.push({
    id: answers.value[answers.value.length - 1].id + 1,
    question: null,
    text: '',
    is_correct: false,
  });

const handleDeleteQuestion = async (id: string) => {
  await api.delete(`backend/questions/${id}/`);
  await getQuestions();
};

const isSingleChoice = (id: number) => {
  if (!id) return true;
  let flag = answers.value.find((el) => el.is_correct === true && el.id !== id);
  if (flag && question.value.category === 'SINGLE_CHOICE') return true;

  return false;
};

const isQuestionReady = computed(
  () => question.value.category && question.value.text
);

api.get('backend/me/');
const handleCreateQuestion = async () => {
  const { data } = await api.post('backend/questions/', question.value);
  answers.value.forEach(
    async (ans: any) =>
      await api.post(
        'backend/answers/',
        Object.assign(ans, { question: data.id })
      )
  );
  getQuestions();
};
</script>
