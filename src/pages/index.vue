<script lang="ts" setup>
  import { useQuizStore } from '@/stores/quiz'

  const quizStarted = ref(false);
  const quizFinished = ref(false);
  const loading = ref(false);

  const quizStore = useQuizStore();
  const { quizTitle, shuffledQuestions } = storeToRefs(quizStore);
  const { fetchQuiz } = quizStore;

  const startQuiz = () => {
    quizStarted.value = true;
  }

  onBeforeMount(async () => {
    loading.value = true;
    await fetchQuiz();
    loading.value = false;
  })
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <QuizStart
          v-if="!quizStarted && !quizFinished"
          :loading="loading"
          :quiz-length="shuffledQuestions.length"
          :title="quizTitle"
          @start-quiz="startQuiz"
        />

        <QuizQuestion v-if="quizStarted && !quizFinished" />

        <QuizResults v-if="quizFinished" />
      </v-col>
    </v-row>
  </v-container>
</template>
