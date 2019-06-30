import React, { useState, useEffect } from 'react'
import { observer, useObservable } from 'mobx-react-lite'
import FileLoader from './componets/FileLoader'
import { parseQuestion, shuffle } from './utils/Utils'
import Question from './componets/Question'
import Stats from './componets/Stats'
import { Button, Alert, Intent, Card } from '@blueprintjs/core'
import QuestionsBar from './componets/QuestionsBar'

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
  const [showAll, setShowAll] = useState(false)
  
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

  function onBack() {
    setIndex(index === 0 ? questions.length - 1 : index - 1)
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
    shuffle(questions)
    setAlert(false)
  }

  localStorage.setItem(STORAGE_QUESTIONS, JSON.stringify(questions))

  return (
    <div className="App">
      <Card>
        <FileLoader text='Load' onLoad={onLoadHandler} />
        <Button text='Reset' icon='reset' onClick={() => setAlert(true)} />
        <Button text='Show all' icon='list' onClick={() => setShowAll(!showAll)} active={showAll} />
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
      </Card>
      {questions.length ? <>
        <Stats index={index} questiones={questions} />
        <Question 
          key={questions[index].code + questions[index].question} 
          value={questions[index]}
          onNext={onNext}
          onBack={onBack}
        />
        <QuestionsBar questions={questions} setIndex={setIndex} />
      </> : ''}
      {showAll && questions.map(q => <Question 
        key={q.code + q.question} 
        value={q}
      />)}
    </div>
  )
}

export default observer(App)
