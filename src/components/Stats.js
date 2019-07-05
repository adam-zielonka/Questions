import React from 'react'
import { observer } from 'mobx-react-lite'
import { Card } from '@blueprintjs/core'

function Stats({ index, questions }) {

  function getAnswered() {
    let counter = 0
    questions.forEach(q => { if(q.answered) counter++ })
    return counter
  }

  function isCorrect(value) {
    for (const answer of value.answers) {
      if(answer.correct !== answer.checked) return false
    }
    return true
  }

  function getCorrectCount() {
    let counter = 0
    questions.forEach(q => { if(q.answered && isCorrect(q)) counter++ })
    return counter
  }

  function getIncorrectCount() {
    let counter = 0
    questions.forEach(q => { if(q.answered && !isCorrect(q)) counter++ })
    return counter
  }

  const answered = getAnswered()
  const correct = getCorrectCount()
  return <Card>
    <b>{index+1}/{questions.length}</b>
    , Empty: {questions.length-answered}
    , Answered: {answered} (Correct: {correct}, Incorrect: {getIncorrectCount()}),
    Correct/Answered: {answered ? Math.floor((correct/answered)*10000)/100 : 100}%
  </Card>
}

export default observer(Stats)
