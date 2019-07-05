import React from 'react'
import { Button } from '@blueprintjs/core'

function loadFile(onLoad) {
  const input = document.createElement('input')
  input.setAttribute('type','file')
  input.onchange = (event) => {
    const fileReader = new FileReader()
    fileReader.onloadend = () => onLoad(fileReader.result)
    fileReader.readAsText(event.target.files[0])
  }
  input.click()
}

function FileLoader({ onLoad, text }) {
  return <Button text={text} icon='folder-open' onClick={() => loadFile(onLoad)} />
}

export default FileLoader
