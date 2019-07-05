import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import FileLoader from './FileLoader'
import { Button, Alert, Intent, Card } from '@blueprintjs/core'
import { useStore } from '../Store'

function ButtonsCard() {
  const { settings, resetQuestions } = useStore()

  const [alert, setAlert] = useState(false)

  return <Card>
    <FileLoader/>
    <Button text='Reset' icon='reset' onClick={() => setAlert(true)} />
    <Button text='Show all' icon='list' onClick={() => settings.showAll = !settings.showAll} active={settings.showAll} />
    <Alert
      cancelButtonText="Cancel"
      confirmButtonText="Clear"
      icon="trash"
      intent={Intent.DANGER}
      isOpen={alert}
      onCancel={() => setAlert(false)}
      onConfirm={() => {resetQuestions(); setAlert(false)}}
      canEscapeKeyCancel
      canOutsideClickCancel
    >Are you sure to clear your progress?</Alert>
  </Card>
}

export default observer(ButtonsCard)
