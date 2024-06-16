<template>
  <el-card class="flex flex-col w-[80%] h-[80%] m-auto">
    <div class="flex justify-between">
      <h1>{{ exercise?.title }}</h1>
      <el-button
        type="success"
        plain
        @click="
          () => {
            handleSaveExercises();
            $router.push('/');
          }
        "
      >
        Сохранить
      </el-button>
    </div>
    <h2>{{ exercise?.description }}</h2>
    <div class="flex flex-col">
      <div
        v-for="(q, index) in exercise?.questions"
        :key="q.id"
      >
        <!-- SINGLE CHOICE -->

        <div v-if="q.category === 'SINGLE_CHOICE'">
          <p>{{ q?.text }}</p>
          <el-radio-group v-model="answers[index].selected_answer_ids[0]">
            <el-radio
              v-for="a in q.answers"
              :key="a.id"
              :value="a.id"
              >{{ a.text }}</el-radio
            >
          </el-radio-group>
        </div>
        <!-- MULTIPLE CHOICE -->
        <div v-if="q.category === 'MULTIPLE_CHOICE'">
          <p>{{ q?.text }}</p>
          <el-checkbox-group v-model="answers[index].selected_answer_ids">
            <el-checkbox
              v-for="a in q.answers"
              :key="a.id"
              :value="a.id"
              >{{ a.text }}</el-checkbox
            >
          </el-checkbox-group>
        </div>
        <!-- WRITE CHOICE -->
        <div v-if="q.category === 'TEXT'">
          <p>{{ q?.text }}</p>
          <el-input
            v-model="answers[index].written_answer"
            placeholder="Введите ответ"
          ></el-input>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import api from '@/axios.ts';
import { useRoute } from 'vue-router';
const exercise = ref();
const router = useRoute();

const answers = ref([] as any[]);

const getExercises = async (id: string) => {
  const { data } = await api.get(`backend/exercises/${id}/`);
  exercise.value = data;
  data?.questions.forEach((q) => {
    answers.value.push({
      question_id: q.id,
      selected_answer_ids: [],
      written_answer: '',
    });
  });
};

const handleSaveExercises = async () => {
  await api.post(
    `backend/user-exercises/${router.params.id as string}/submit/`,
    {
      answers: answers.value,
    }
  );
};

onMounted(() => {
  getExercises(router.params.id as string);
});
</script>

<style>
audio {
  /*border-radius: 90px;*/
  width: 250px;
  height: 45px;
  margin-top: 5px;
  margin-bottom: 5px;
}

audio::-webkit-media-controls-mute-button {
  display: none !important;
}

audio::-webkit-media-controls-volume-slider {
  display: none !important;
}

audio::-webkit-media-controls-volume-control-container.closed {
  display: none !important;
}
audio::-webkit-media-controls-volume-control-container {
  display: none !important;
}
</style>
