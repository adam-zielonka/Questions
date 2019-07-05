import React from 'react'
import { observer } from 'mobx-react-lite'
import { Button } from '@blueprintjs/core'
import { useStore } from '../Store'
import { parseQuestion, hashCode } from '../utils/Utils'

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

function FileLoader() {
  const { questions, settings } = useStore()

  function onLoadHandler(text){
    questions.clear()
    questions.push(...parseQuestion(text).map(q => {
      if(!q.hash) q.hash = hashCode(JSON.stringify({q: q.question, a: q.answers}))
      return q
    }))
    settings.index = 0
  }

  return <Button text='Load' icon='folder-open' onClick={() => loadFile(onLoadHandler)} />
}

export default observer(FileLoader)
