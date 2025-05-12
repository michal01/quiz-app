<script setup lang="ts">
  const selectedAnswer = ref<number | null>(null)
  const currentQuestion = ref({
    options: [
      { id: 1, text: 'Odpowiedź 1' },
      { id: 2, text: 'Odpowiedź 2' },
      { id: 3, text: 'Odpowiedź 3' },
      { id: 4, text: 'Odpowiedź 4' },
    ],
  })

  const nextQuestion = () => {
    console.log('Następne pytanie')
  }
</script>

<template>
  <v-card class="mx-auto my-4" max-width="800">
    <v-card-title class="text-h5">
      Pytanie / currentQuestion / z / totalQuestions /
    </v-card-title>

    <v-card-text>
      <p class="text-h6 mb-4">Pytanie</p>

      <v-radio-group
        v-model="selectedAnswer"
      >
        <v-radio
          v-for="option in currentQuestion.options"
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
        Następne pytanie
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
