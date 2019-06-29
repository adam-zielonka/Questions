import React from 'react'
import { observer, useObservable } from 'mobx-react-lite'
import FileLoader from './componets/FileLoader'
import { parseQuestion } from './utils/Utils'
import Question from './componets/Question'

function App() {
  const questiones = useObservable([])
  
  function onLoadHandler(text){
    questiones.clear()
    questiones.push(...parseQuestion(text))
  }

  return (
    <div className="App">
      <FileLoader text='Load questiones' onLoad={onLoadHandler} />
      {questiones.map(q => <Question key={q.code + q.question} value={q} />)}
    </div>
  )
}

export default observer(App)
