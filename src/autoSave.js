import { autorun } from 'mobx'
import { hashCode } from './utils/Utils.js'

const STORAGE_QUESTIONS = 'questions'
// const STORAGE_SETTINGS = 'settings'

export default function(_this) {
  let firstRun = true

  autorun(() => {
    if (firstRun) {
      const questions = JSON.parse(localStorage.getItem(STORAGE_QUESTIONS))
      // const settings = JSON.parse(localStorage.getItem(STORAGE_SETTINGS))
      
      if (questions) _this.questions = questions.map(q => {
        if(!q.hash) q.hash = hashCode(JSON.stringify({q: q.question, a: q.answers}))
        return q
      })
      // if (settings) _this.settings = settings
    }

    localStorage.setItem(STORAGE_QUESTIONS, JSON.stringify(_this.questions))
    // localStorage.setItem(STORAGE_SETTINGS, JSON.stringify(_this.settings))
  })

  firstRun = false
}
