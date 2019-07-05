import React from 'react'
import { observer } from 'mobx-react-lite'
import Question from './Question'
import { useStore } from '../Store'

function QuestionAll() {
  const { questions, settings } = useStore()
  const { showAll } = settings

  if(!showAll) return ''

  return questions.map(q => <Question 
    key={q.hash} 
    value={q}
    navigate={false}
  />)
}

export default observer(QuestionAll)
