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

interface QuizAnswer {
  question: string
  userAnswer: string
  correctAnswer: string
  isCorrect: boolean
}

interface Quiz {
  id: number
  title: string
  questions: QuizQuestion[]
}

export const useQuizStore = defineStore('quiz', () => {
  const quiz = ref<Quiz | null>(null)
  const currentQuestionIndex = ref(0)
  const userAnswers = ref(new Map<number, number>())
  const quizFinished = ref(false)
  const shuffledQuestions = ref<QuizQuestion[]>([])
  const questionLimit = ref<number | null>(9)

  const quizTitle = computed(() => quiz.value?.title || '')

  const results = computed(() => {
    const results = {
      correct: 0,
      answers: [] as QuizAnswer[],
    }
    results.answers = shuffledQuestions.value.map(question => {
      const userAnswerId = userAnswers.value.get(question.id)
      const userAnswer = question.options.find(opt => opt.id === userAnswerId)?.text || 'Brak odpowiedzi'
      const correctAnswer = question.options.find(opt => opt.id === question.correctOptionId)?.text || ''
      const isCorrect = userAnswerId === question.correctOptionId
      if (isCorrect) results.correct++
      return {
        question: question.question,
        userAnswer,
        correctAnswer,
        isCorrect,
      }
    })
    return results
  })

  const shuffleQuestions = () => {
    if (!quiz.value) return
    let questions = quiz.value.questions
      .map(question => ({
        ...question,
        options: [...question.options].sort(() => Math.random() - 0.5),
      }))
      .sort(() => Math.random() - 0.5)

    if (questionLimit.value !== null && questionLimit.value > 0) {
      questions = questions.slice(0, questionLimit.value)
    }

    shuffledQuestions.value = questions
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

  const resetQuiz = () => {
    currentQuestionIndex.value = 0
    userAnswers.value.clear()
    quizFinished.value = false
    shuffleQuestions()
  }

  return {
    quizTitle,
    shuffledQuestions,
    quizFinished,
    currentQuestionIndex,
    userAnswers,
    results,
    fetchQuiz,
    resetQuiz,
  }
})
