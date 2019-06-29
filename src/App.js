import React from 'react'
import './App.css'
import FileLoader from './componets/FileLoader'

function App() {
  
  function onLoadHandler(content){
    console.log(content)
  }

  return (
    <div className="App">
      <FileLoader text='Load questiones' onLoad={onLoadHandler} />
    </div>
  )
}

export default App
