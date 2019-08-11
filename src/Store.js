import { createContext, useContext } from 'react'
import { observable, action, computed } from 'mobx'
import autoSave from './autoSave'
import { getStats, parseQuestion, shuffle, hashCode, download } from './utils/Utils'

export class Store {

  @observable questions = []
  @observable settings = {
    showAll: false
  }
  @observable filters = {
    buttons: false,
    hidden: true,
    danger: true,
    others: true
  }

  constructor() {
    autoSave(this)
  }

  @computed get length() {
    return this.questions.length
  }

  @computed get stats() {
    return getStats(this.questions)
  }

  @computed get index() {
    for (let i = 0; i < this.questions.length; i++) {
      if(this.questions[i].active) return i
    }
    return 0
  }

  @action.bound checkVisibility(question) {
    const flagged = question.hidden || question.danger
    return ((this.filters.hidden && question.hidden) || (this.filters.danger && question.danger) || (this.filters.others && !flagged))
  }

  @computed get filteredQuestions() {
    return this.questions.slice().filter(q => this.checkVisibility(q))
  }

  @action.bound setNextIndex() {
    const index = this.index
    let newIndex = index
    do {
      newIndex = newIndex + 1 === this.questions.length ? 0 : newIndex + 1
      if(this.checkVisibility(this.questions[newIndex])) break
    } while(index !== newIndex)
    this.setIndex(newIndex)
  }

  @action.bound setBackIndex() {
    const index = this.index
    let newIndex = index
    do {
      newIndex = newIndex === 0 ? this.questions.length - 1 : newIndex - 1
      if(this.checkVisibility(this.questions[newIndex])) break
    } while(index !== newIndex)
    this.setIndex(newIndex)
  }

  @action.bound setHidden(question) {
    const found = this.questions.find(q => q.hash === question.hash)
    if(found) {
      found.hidden = !found.hidden
      if(found.hidden)
        found.danger = false
    }
  }

  @action.bound setDanger(question) {
    const found = this.questions.find(q => q.hash === question.hash)
    if(found) {
      found.danger = !found.danger
      if(found.danger)
        found.hidden = false
    }
  }

  @action.bound setFilters() {
    this.filters.buttons = !this.filters.buttons
  }

  @action.bound loadQuestion(text) {
    this.questions.clear()
    const newQuestions = parseQuestion(text)
    this.questions.push(...newQuestions)
  }

  @action.bound setIndex(index) {
    for (let i = 0; i < this.questions.length; i++) {
      const temp = i === index
      if(this.questions[i].active !== temp) {
        this.questions[i].active = temp
      }
    }
  }

  @action.bound resetQuestions() {
    this.questions.forEach(q => {
      q.answered = false
      q.answers.forEach(a => {
        a.checked = false
      })
      shuffle(q.answers)
    })
  }

  @action.bound loadQuestions(text) {
    this.questions.clear()
    this.questions.push(...parseQuestion(text).map(q => {
      if(!q.hash) q.hash = hashCode(JSON.stringify({q: q.question, a: q.answers}))
      return q
    }))
    this.setIndex(0)
  }

  @action.bound shuffleQuestion() {
    this.questions = shuffle(this.questions)
  }

  @action.bound downloadDanger() {
    const str = JSON.stringify(this.questions.filter(q => q.danger))
    download('danger.json', str)
  }

}

const store = createContext(new Store())

export function useStore() {
  return useContext(store)
}
