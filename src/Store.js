import { createContext, useContext } from 'react'
import { decorate, observable, action, computed } from 'mobx'
import autoSave from './autoSave'
import { getStats, parseQuestion, shuffle } from './utils/Utils'

export class Store {
  constructor() {
    this.questions = []
    this.settings = {
      showAll: false
    }
    autoSave(this)
  }

  get length() {
    return this.questions.length
  }

  get stats() {
    return getStats(this.questions)
  }

  get index() {
    for (let i = 0; i < this.questions.length; i++) {
      if(this.questions[i].active) return i
    }
    return 0
  }

  setNextIndex() {
    const index = this.index
    this.setIndex(index + 1 === this.questions.length ? 0 : index + 1)
  }

  setBackIndex() {
    const index = this.index
    this.setIndex(index === 0 ? this.questions.length - 1 : index - 1)
  }

  loadQuestion(text) {
    this.questions.clear()
    const newQuestions = parseQuestion(text)
    this.questions.push(...newQuestions)
  }

  setIndex(index) {
    for (let i = 0; i < this.questions.length; i++) {
      const temp = i === index
      if(this.questions[i].active !== temp) {
        this.questions[i].active = temp
      }
    }
  }

  resetQuestions() {
    this.questions.forEach(q => {
      q.answered = false
      q.answers.forEach(a => {
        a.checked = false
      })
      shuffle(q.answers)
    })
  }
}

decorate(Store, {
  questions: observable,
  settings: observable,
  stats: computed,
  length: computed,
  setNextIndex: action.bound,
  setBackIndex: action.bound,
  loadQuestion: action.bound,
  setIndex: action.bound,
  index: computed,
  resetQuestions: action.bound,
})

const store = createContext(new Store())

export function useStore() {
  return useContext(store)
}
