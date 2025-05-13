<script setup lang="ts">
  import { useQuizStore } from '@/stores/quiz'

  const selectedAnswer = ref<number | null>(null)

  const quizStore = useQuizStore()
  const {
    currentQuestionIndex,
    shuffledQuestions,
    quizFinished,
    userAnswers,
  } = storeToRefs(quizStore)

  const currentQuestion = computed(() => {
    return shuffledQuestions.value[currentQuestionIndex.value] || null
  })
  const isLastQuestion = computed(() => {
    return currentQuestionIndex.value === shuffledQuestions.value.length - 1
  })

  const handleAnswer = (answerId: number | null) => {
    if (currentQuestion.value && answerId !== null) {
      userAnswers.value.set(currentQuestion.value.id, answerId)
    }
  }

  const nextQuestion = () => {
    if (currentQuestionIndex.value < shuffledQuestions.value.length - 1) {
      currentQuestionIndex.value++
    } else {
      quizFinished.value = true
    }
    selectedAnswer.value = null
  }
</script>

<template>
  <v-card class="mx-auto my-4" max-width="800">
    <v-card-title class="text-h5">
      Pytanie {{ currentQuestionIndex + 1 }} z {{ shuffledQuestions.length }}
    </v-card-title>

    <v-card-text>
      <p class="text-h6 mb-4">{{ currentQuestion?.question }}</p>

      <v-radio-group
        v-model="selectedAnswer"
        @update:model-value="handleAnswer"
      >
        <v-radio
          v-for="option in currentQuestion?.options"
          :key="option.id"
          color="primary"
          :label="option.text"
          :value="option.id"
        />
      </v-radio-group>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn
        color="primary"
        :disabled="!selectedAnswer"
        @click="nextQuestion"
      >
        {{ isLastQuestion ? 'Zakończ test' : 'Następne pytanie' }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
