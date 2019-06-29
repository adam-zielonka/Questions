import React from 'react'
import { observer } from 'mobx-react-lite'
import { Card } from '@blueprintjs/core'

function Stats({ index, questiones }) {

  function getAnswered() {
    let counter = 0
    questiones.forEach(q => { if(q.answered) counter++ })
    return counter
  }

  function isCorrect(value) {
    for (const answer of value.answers) {
      if(answer.correct !== answer.checked) return false
    }
    return true
  }

  function getCorrected() {
    let counter = 0
    questiones.forEach(q => { if(q.answered && isCorrect(q)) counter++ })
    return counter
  }

  function getIncorrected() {
    let counter = 0
    questiones.forEach(q => { if(q.answered && !isCorrect(q)) counter++ })
    return counter
  }

  const answered = getAnswered()
  return <Card>
    Questions: {questiones.length}
    , Index: {index+1}
    , Answered: {answered}
    , Empty: {questiones.length-answered}
    , Corrected: {getCorrected()}
    , Incorrected: {getIncorrected()}
  </Card>
}

export default observer(Stats)
