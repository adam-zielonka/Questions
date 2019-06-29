import React, { useState } from 'react'
import { observer, useObservable } from 'mobx-react-lite'
import FileLoader from './componets/FileLoader'
import { parseQuestion } from './utils/Utils'
import Question from './componets/Question'
import Stats from './componets/Stats'

function App() {
  const questiones = useObservable([])
  const [index, setIndex] = useState(0)
  
  function onLoadHandler(text){
    questiones.clear()
    questiones.push(...parseQuestion(text))
    setIndex(0)
  }

  function onNext() {
    setIndex(index + 1 === questiones.length ? 0 : index + 1)
  }

  return (
    <div className="App">
      <FileLoader text='Load questiones' onLoad={onLoadHandler} />
      {questiones.length ? <>
        <Stats index={index} questiones={questiones} />
        <Question 
          key={questiones[index].code + questiones[index].question} 
          value={questiones[index]}
          onNext={onNext} 
        />
      </> : ''}
      {/* {questiones.map(q => <Question key={q.code + q.question} value={q} />)} */}
    </div>
  )
}

export default observer(App)
