const quizContainer = document.querySelector('.quiz-container')
const questionsContainer = quizContainer.querySelector('.questions-container')
const submitBtn = quizContainer.querySelector('.submit-btn')
const resultContainer = quizContainer.querySelector('.result-container')
const questionTemplate = document.querySelector('#question-template')

let numCorrect = 0
let answeredQuestions = 0

const quizData = [
  {
    question: 'Where is Boston located?',
    options: ['West Coast', 'East Coast', 'North Pole'],
    answer: 'East Coast'
  },
  {
    question: 'What is the capital city of Japan?',
    options: ['Seoul', 'Tokyo', 'Bangkok', 'Taipei'],
    answer: 'Tokyo'
  },
  {
    question: 'What is the capital city of Vietnam?',
    options: ['Sydney', 'Melbourne', 'Ho Chi Minh (Saigon)', 'Brisbane'],
    answer: 'Ho Chi Minh (Saigon)'
  },
  {
    question: 'What is the capital city of Canada?',
    options: ['Toronto', 'Ottawa', 'Montreal', 'Vancouver'],
    answer: 'Ottawa'
  },
  {
    question: 'What Pet does Zion have?',
    options: ['Cat', 'Ladybug', 'CatDog', 'Hamster'],
    answer: 'Cat'
  },
  {
    question: 'Does Connor like baking bread?',
    options: ['Yes', 'No', 'Maybe', 'No Idea'],
    answer: 'Yes'
  },
  {
    question: 'Will Everyone finish this bootcamp?',
    options: ['yes', 'yes', 'yes', 'yes'],
    answer: 'yes'
  },
  {
    question: 'What Physical Activity Has Dylan mentioned he enjoys?',
    options: ['Chopping Firewood', 'Ballroom Dancing', 'Brazilian jiu-jitsu', 'Golfing with Lucas'],
    answer: 'Brazilian jiu-jitsu'
  },
  {
    question: 'Is Lucas a Vampire that does not age or?',
    options: ['Yes', 'No', 'Immortal', 'From The Future'],
    answer: ['Yes', 'From The Future', 'Immortal']
  },
  {
    question: 'The First Group Project for Chad was with Connor, Askmika, and Joseph.',
    options: ['True', 'False'],
    answer: 'True'
  }
]

quizData.forEach((question, index) => {
  const questionBox = questionTemplate.content.cloneNode(true).querySelector('.question-box')
  const questionNumber = questionBox.querySelector('.question-number')
  const questionText = questionBox.querySelector('.question-text')
  const answerOptions = questionBox.querySelector('.answer-options')
  const answerInput = questionBox.querySelector('.answer-input')
  const submitAnswerBtn = questionBox.querySelector('.submit-answer-btn')

  questionNumber.textContent = `Question ${index + 1}:`
  questionText.textContent = question.question

  question.options.forEach(option => {
    const label = document.createElement('label')
    const input = document.createElement('input')
    input.type = 'radio'
    input.name = `q${index + 1}`
    input.value = option
    label.appendChild(input)
    label.appendChild(document.createTextNode(option))
    answerOptions.appendChild(label)
  })

  submitAnswerBtn.addEventListener('click', () => {
    const selectedAnswer = questionBox.querySelector(`input[name="q${index + 1}"]:checked`)
    if (selectedAnswer) {
      if (typeof question.answer === 'string') {
        if (selectedAnswer.value.toLowerCase() === question.answer.toLowerCase()) {
          questionBox.classList.remove('incorrect')
          questionBox.classList.add('correct')
          numCorrect++
        } else {
          questionBox.classList.remove('correct')
          questionBox.classList.add('incorrect')
        }
      } else if (Array.isArray(question.answer)) {
        if (question.answer.some(ans => ans.toLowerCase() === selectedAnswer.value.toLowerCase())) {
          questionBox.classList.remove('incorrect')
          questionBox.classList.add('correct')
          numCorrect++
        } else {
          questionBox.classList.remove('correct')
          questionBox.classList.add('incorrect')
        }
      }
      answerInput.disabled = true
      submitAnswerBtn.disabled = true
      answeredQuestions++
    }
  })
  questionsContainer.appendChild(questionBox)
})

submitBtn.addEventListener('click', () => {
  resultContainer.textContent = `You got ${numCorrect} out of ${quizData.length} questions correct!`
})