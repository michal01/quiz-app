<script setup lang="ts">
  import { useQuizStore } from '@/stores/quiz';

  const quizStore = useQuizStore();
  const { results, shuffledQuestions } = storeToRefs(quizStore);
  const { resetQuiz } = quizStore;
</script>

<template>
  <v-card class="mx-auto my-4" max-width="800">
    <v-card-title class="text-h4 text-center">
      Wyniki testu
    </v-card-title>

    <v-card-text>
      <div class="text-h5 text-center mb-6">
        Poprawne odpowiedzi: {{ results.correct }} z {{ shuffledQuestions.length }}
        ({{ Math.round((results.correct / shuffledQuestions.length) * 100) }}%)
      </div>

      <v-expansion-panels>
        <v-expansion-panel
          v-for="(answer, index) in results.answers"
          :key="index"
        >
          <v-expansion-panel-title>
            <v-row no-gutters>
              <v-col cols="11">
                Pytanie {{ index + 1 }}
              </v-col>
              <v-col cols="1">
                <v-icon
                  :color="answer.isCorrect ? 'success' : 'error'"
                >
                  {{ answer.isCorrect ? 'mdi-check-circle' : 'mdi-close-circle' }}
                </v-icon>
              </v-col>
            </v-row>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <p class="font-weight-bold">{{ answer.question }}</p>
            <p>
              Twoja odpowiedź:
              <span :class="{ 'text-success': answer.isCorrect, 'text-error': !answer.isCorrect }">
                {{ answer.userAnswer }}
              </span>
            </p>
            <p v-if="!answer.isCorrect" class="text-success">
              Poprawna odpowiedź: {{ answer.correctAnswer }}
            </p>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn
        color="primary"
        @click="resetQuiz"
      >
        Rozpocznij ponownie
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
