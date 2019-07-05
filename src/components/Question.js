import React from 'react'
import { observer } from 'mobx-react-lite'
import { Card, Checkbox, Button } from '@blueprintjs/core'
import { isCorrect, getStyle } from '../utils/Utils'
import { useStore } from '../Store'

function getLabel(value) { 
  const array = value.split('\n')
  let count = 0
  return <>
    {array.map(a => <span key={a}>
      {a}{++count === array.length - 1 ? '' :<br />}
    </span>)}
  </>
}

const Answer = observer(({answer, answered}) => {
  return <Checkbox 
    label={getLabel(answer.value)}
    checked={answer.checked}
    onChange={(e) => answer.checked = e.target.checked}
    disabled={answered}
    style={answered ? getStyle(answer) : {}}
  />
})

const CheckButton = observer(({answers, answered, onClick}) => {
  return <Button
    text={answered ? (isCorrect({answers}) ? 'Correct': 'Wrong') :'Check'}
    onClick={onClick}
    intent={answered ? (isCorrect({answers}) ? 'success' : 'danger') : 'none'}
  />
})

const NavigateButton = observer(({onNavigate, navigate, text}) => {
  if(!navigate) return ''
  return <Button text={text} onClick={onNavigate} />
})

function Question({ value, navigate = true }) {
  const { setNextIndex, setBackIndex } = useStore()

  if(!value) return ''

  return <Card>
    <p dangerouslySetInnerHTML={{ __html: value.question }} />
    {value.answers.map(answer => <Answer key={answer.value} answer={answer} answered={value.answered} />)}
    <NavigateButton navigate={navigate} text={'Back'} onNavigate={setBackIndex}/>
    <CheckButton answers={value.answers} answered={value.answered} onClick={() => value.answered = true} />
    <NavigateButton navigate={navigate} text={'Next'} onNavigate={setNextIndex}/>
  </Card>
}

export default observer(Question)
