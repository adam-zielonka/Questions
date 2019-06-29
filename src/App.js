import React, { useState, useEffect } from 'react'
import { observer, useObservable } from 'mobx-react-lite'
import FileLoader from './componets/FileLoader'
import { parseQuestion, shuffle } from './utils/Utils'
import Question from './componets/Question'
import Stats from './componets/Stats'
import { Button, Alert, Intent } from '@blueprintjs/core'

const STORAGE_QUESTIONS = 'questions'
const STORAGE_INDEX = 'index'

const useIndex = (localStorageKey) => {
  const [value, setValue] = useState(Number(localStorage.getItem(localStorageKey)) || 0)

  useEffect(() => {
    localStorage.setItem(localStorageKey, value)
  }, [localStorageKey, value])

  return [value, setValue]
}

function App() {
  const questions = useObservable(JSON.parse(localStorage.getItem(STORAGE_QUESTIONS)) || [])
  const [index, setIndex] = useIndex(STORAGE_INDEX)
  const [alert, setAlert] = useState(false)
  
  function onLoadHandler(text){
    questions.clear()
    const newQuestions = parseQuestion(text)
    questions.push(...newQuestions)
    localStorage.setItem(STORAGE_QUESTIONS, JSON.stringify(newQuestions))
    setIndex(0)
  }

  function onNext() {
    setIndex(index + 1 === questions.length ? 0 : index + 1)
  }

  function onReset() {
    setIndex(0)
    questions.forEach(q => {
      q.answered = false
      q.answers.forEach(a => {
        a.checked = false
      })
      shuffle(q.answers)
    })
    setAlert(false)
  }

  localStorage.setItem(STORAGE_QUESTIONS, JSON.stringify(questions))

  return (
    <div className="App">
      <FileLoader text='Load questiones' onLoad={onLoadHandler} />
      <Button text='Reset Questions' onClick={() => setAlert(true)} />
      <Alert
        cancelButtonText="Cancel"
        confirmButtonText="Clear"
        icon="trash"
        intent={Intent.DANGER}
        isOpen={alert}
        onCancel={() => setAlert(false)}
        onConfirm={onReset}
        canEscapeKeyCancel
        canOutsideClickCancel
      >Are you sure to clear your progress?</Alert>
      {questions.length ? <>
        <Stats index={index} questiones={questions} />
        <Question 
          key={questions[index].code + questions[index].question} 
          value={questions[index]}
          onNext={onNext} 
        />
      </> : ''}
    </div>
  )
}

export default observer(App)
