import React from 'react'
import Question from './components/Question'
import Stats from './components/Stats'
import QuestionsBar from './components/QuestionsBar'
import ButtonsCard from './components/ButtonsCard'
import QuestionsAll from './components/QuestionsAll'
import { useStore } from './Store'
import { observer } from 'mobx-react-lite'

function App() {
  const { questions, index } = useStore()

  return (
    <div className="App">
      <ButtonsCard/>
      <Stats/>
      <Question value={questions.length && questions[index]}/>
      <QuestionsBar/>
      <QuestionsAll/>
    </div>
  )
}

export default observer(App)
