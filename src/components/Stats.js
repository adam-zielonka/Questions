import React from 'react'
import { Card } from '@blueprintjs/core'

function Stats({ index, all, answered, correct, incorrect }) {

  return <Card>
    <b>{index+1}/{all}</b>,
    Empty: {all-answered},
    Answered: {answered} (Correct: {correct}, Incorrect: {incorrect}),
    Correct/Answered: {answered ? Math.floor((correct/answered)*10000)/100 : 100}%
  </Card>
}

export default Stats
