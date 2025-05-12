<script lang="ts" setup>
  const quizStarted = ref(false)
  const loading = ref(false)

  const startQuiz = () => {
    quizStarted.value = true
  }
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="text-center">
          <v-card-title class="text-h4">
            Test wiedzy
          </v-card-title>
          <v-card-text>
            <p class="mb-4">
              Test składa się z /quiz.length/ pytań.
              Na każde pytanie jest jedna poprawna odpowiedź.
            </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              :loading="loading"
              @click="startQuiz"
            >
              Rozpocznij test
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>

        <!-- Quiz Question -->
        <QuizQuestion />

        <!-- Quiz Results -->
        <QuizResults />
      </v-col>
    </v-row>
  </v-container>
</template>
