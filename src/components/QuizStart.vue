<script setup lang="ts">
  withDefaults(
    defineProps<{
      title?: string
      loading?: boolean
      quizLength?: number
    }>(),
    {
      title: 'Test wiedzy',
      loading: false,
      quizLength: 0,
    }
  )

  defineEmits<{
    (e: 'start-quiz'): void,
  }>()
</script>

<template>
  <v-card class="text-center">
    <v-card-title class="text-h4">
      {{ title }}
    </v-card-title>
    <v-card-text>
      <p class="mb-4">
        Test składa się z {{ quizLength }} pytań.
        Na każde pytanie jest jedna poprawna odpowiedź.
      </p>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="primary"
        :loading="loading"
        @click="$emit('start-quiz')"
      >
        Rozpocznij test
      </v-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>
