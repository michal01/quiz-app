import axios from 'axios'

interface QuizQuestion {
  id: number
  question: string
  options: Array<{
    id: number
    text: string
  }>
  correctOptionId: number
}

interface Quiz {
  id: number
  title: string
  questions: QuizQuestion[]
}

export const useQuizStore = defineStore('quiz', () => {
  const quiz = ref<Quiz | null>(null)
  const shuffledQuestions = ref<QuizQuestion[]>([])

  const quizTitle = computed(() => quiz.value?.title || '')

  const shuffleQuestions = () => {
    if (!quiz.value) return
    shuffledQuestions.value = [...quiz.value.questions]
      .map(question => ({
        ...question,
        options: [...question.options].sort(() => Math.random() - 0.5),
      }))
      .sort(() => Math.random() - 0.5)
  }

  const fetchQuiz = async () => {
    try {
      const response = await axios.get('http://localhost:3000/quiz')
      quiz.value = response.data
      shuffleQuestions()
    } catch (error) {
      console.error('Quiz error:', error)
    }
  }

  return {
    quizTitle,
    shuffledQuestions,
    fetchQuiz,
  }
})
