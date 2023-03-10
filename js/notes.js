quizData.forEach((question, index) => {
    const questionBox = questionTemplate.content.cloneNode(true).querySelector('.question-box')
    const questionNumber = questionBox.querySelector('.question-number')
    const questionText = questionBox.querySelector('.question-text')
    const answerOptions = questionBox.querySelector('.answer-options')
    const submitAnswerBtn = questionBox.querySelector('.submit-answer-btn')
  
    questionNumber.textContent = `Question ${index + 1}:`
    questionText.textContent = question.question
  
    question.options.forEach(option => {
      const label = document.createElement('label')
      const input = document.createElement('input')
      input.type = 'radio'
      input.name = `q${index + 1}`
      input.value = option
      label.append(input, option)
      answerOptions.appendChild(label)
    })
  
    submitAnswerBtn.addEventListener('click', () => {
        const selectedAnswer = answerOptions.querySelector('input:checked')
        if (!selectedAnswer) return
      
        const isCorrect = question.answer
          .map(ans => ans.toLowerCase())
          .includes(selectedAnswer.value.toLowerCase())
      
        questionBox.classList.toggle('correct', isCorrect)
        questionBox.classList.toggle('incorrect', !isCorrect)
        selectedAnswer.disabled = true
        submitAnswerBtn.disabled = true
        numCorrect += isCorrect ? 1 : 0
        answeredQuestions++
      })
      
  
    questionsContainer.appendChild(questionBox)
  })
  
  submitBtn.addEventListener('click', () => {
    resultContainer.textContent = `You got ${numCorrect} out of ${quizData.length} questions correct!`
  })