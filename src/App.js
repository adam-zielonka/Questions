import React from 'react'
import './App.css'
import FileLoader from './componets/FileLoader'
import { parseQuestion } from './utils/Utils'

function App() {
  
  function onLoadHandler(text){
    const questiones = parseQuestion(text)
    console.log(questiones)
  }

  return (
    <div className="App">
      <FileLoader text='Load questiones' onLoad={onLoadHandler} />
    </div>
  )
}

export default App
