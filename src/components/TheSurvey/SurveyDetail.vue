<template>
  <el-card class="flex flex-col w-[80%] h-[80%] m-auto">
    <div class="flex justify-between">
      <h1>{{ currentQ?.name }}</h1>
      <el-button
        type="success"
        plain
        @click="$router.push('/')"
      >
        Сохранить
      </el-button>
    </div>
    <h2>{{ currentQ?.description }}</h2>
    <div
      v-if="currentQ?.type === 'grammar' || currentQ?.type === 'reading'"
      class="flex gap-4"
    >
      <div class="flex flex-col w-[400px]">
        <p
          v-for="answer in currentQ?.value.answers"
          :key="answer.id"
        >
          {{ answer.id }} : {{ answer.value }}
        </p>
      </div>
      <el-scrollbar
        :height="500"
        always
        style="padding-right: 20px"
      >
        <div
          v-for="question in currentQ?.value.questions"
          :key="question.id"
          class="flex gap-5"
        >
          <p class="max-w-[800px]">{{ question.id }} : {{ question.value }}</p>
          <el-input
            v-if="currentQ?.type === 'reading'"
            style="width: 100px; height: 40px"
            type="text"
            placeholder="Ответ"
          />
        </div>
      </el-scrollbar>
    </div>

    <el-input
      v-if="currentQ?.type === 'grammar'"
      v-model="answerInput"
      type="text"
      placeholder="Введите ответы"
      style="width: 300px; height: 50px"
    />

    <div
      v-if="currentQ?.type === 'listening'"
      class="flex w-[70%] gap-[40px]"
    >
      <audio
        src="/audio.mp3"
        controls
        type="audio/mp3"
      ></audio>
      <div class="flex flex-col gap-4">
        <div
          v-for="question in currentQ?.value.questions"
          :key="question.id"
          class="flex flex-col gap-2"
        >
          <div>{{ question.id }} : {{ question.value }}</div>
          <div class="flex justify-between">
            <div
              v-for="answer in question.answers"
              :key="answer.id"
            >
              <p v-if="answer.name === question.id">
                <span class="font-semibold"> {{ answer.id }}. </span>
                <span>
                  {{ answer.value }}
                </span>
              </p>
            </div>
          </div>
          <el-input
            type="text"
            style="width: 200px; height: 30px"
            placeholder="Введите ответ"
          ></el-input>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import questions from '@/assets/questions/questions.json';

const currentQ = ref();
const answerInput = ref();
onMounted(() => {
  const { params } = useRoute();
  currentQ.value = questions.find((el) => el.id === params.id);
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
