import React from 'react'
import { observer } from 'mobx-react-lite'
import { Card, Button } from '@blueprintjs/core'

function QuestionsBar({ questions, setIndex }) {

  function isCorrect(q) {
    for (const answer of q.answers) {
      if(answer.correct !== answer.checked) return false
    }
    return true
  }

  let count = 0
  return <Card>
    {questions.map(q => <Button
      intent={q.answered ? (isCorrect(q) ? 'success' : 'danger') : 'none'}
      key={++count} 
      text={count}
      onClick={() => setIndex(questions.findIndex(i => q === i))} 
    />)}
  </Card>
}

export default observer(QuestionsBar)
