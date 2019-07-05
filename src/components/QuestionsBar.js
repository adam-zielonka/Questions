import React from 'react'
import { observer } from 'mobx-react-lite'
import { Card, Button } from '@blueprintjs/core'
import { isCorrect } from '../utils/Utils'

function QuestionsBar({ questions, setIndex, index }) {

  const result = []

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i]
    result.push(<Button
      intent={question.answered ? (isCorrect(question) ? 'success' : 'danger') : 'none'}
      key={i} 
      text={i+1}
      active={index === i}
      onClick={() => setIndex(i)} 
    />)
  }

  return <Card>{result}</Card>
}

export default observer(QuestionsBar)
