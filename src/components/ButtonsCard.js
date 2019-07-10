import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import FileLoader from './FileLoader'
import { Button, Alert, Intent, Card } from '@blueprintjs/core'
import { useStore } from '../Store'

export const FiltersCard = observer(() => {
  const { filters } = useStore()

  if(!filters.buttons) return ''

  return <Card>
    <Button text={'Others'} active={filters.others} onClick={() => filters.others = !filters.others} />
    <Button text={'Hidden'} active={filters.hidden} onClick={() => filters.hidden = !filters.hidden} />
    <Button text={'Danger'} active={filters.danger} onClick={() => filters.danger = !filters.danger} />
  </Card>
})

function ButtonsCard() {
  const { settings, resetQuestions, setFilters, filters } = useStore()

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
    <Button icon='filter' onClick={setFilters} active={filters.buttons} intent={(filters.others && filters.hidden && filters.danger) ? 'none' : 'success'} />
  </Card>
}

export default observer(ButtonsCard)
