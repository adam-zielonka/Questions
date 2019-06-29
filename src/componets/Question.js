import React from 'react'
import { observer } from 'mobx-react-lite'
import { Card, Checkbox, Button, Colors } from '@blueprintjs/core'

function Question({ value, onNext }) {

  function getStyle(answer) {
    if(value.answered) {
      switch (true) {
      case answer.correct === true: return {
        color: Colors.BLACK,
        background: Colors.GREEN5,
      }
      case answer.correct === false && answer.checked === true: return {
        color: Colors.BLACK,
        background: Colors.RED5,
      }
      default: return {
        color: Colors.BLACK,
      }
      }
    } return {}
  }

  function isCorrect() {
    for (const answer of value.answers) {
      if(answer.correct !== answer.checked) return false
    }
    return true
  }

  return <Card>
    <p>{value.question}</p>
    {value.answers.map(answer => <Checkbox 
      key={answer.value}
      label={answer.value}
      checked={answer.checked}
      onChange={(e) => answer.checked = e.target.checked}
      disabled={value.answered}
      style={getStyle(answer)}
    />)}
    <Button
      text={value.answered ? (isCorrect() ? 'Correct': 'Wrong') :'Check'}
      onClick={() => value.answered = true}
      intent={value.answered ? (isCorrect() ? 'success' : 'danger') : 'none'}
    />
    <Button
      text={'Next'}
      onClick={onNext}
    />
  </Card>
}

export default observer(Question)
