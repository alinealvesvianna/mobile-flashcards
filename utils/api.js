import { AsyncStorage } from 'react-native'

export const APP_STORAGE_KEY = 'FlashCards:application'

const defaultData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer:
          'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

export function getDecksInfo() {
  return AsyncStorage.getItem(APP_STORAGE_KEY).then(data => {
    if (data === null) {
      AsyncStorage.setItem(APP_STORAGE_KEY, JSON.stringify(defaultData))
      return defaultData
    } else {
      return JSON.parse(data)
    }
  })
}

export function postTitleDeck(title) {
  return AsyncStorage.mergeItem(
    APP_STORAGE_KEY,
    JSON.stringify({
      [title]: { title: title, questions: [] }
    })
  )
}

export function addQuestion(key, card) {
  return AsyncStorage.getItem(APP_STORAGE_KEY)
    .then(data => JSON.parse(data))
    .then(data => {
      if (typeof data[key] !== 'undefined') {
        data[key].questions.push(card)
        AsyncStorage.setItem(APP_STORAGE_KEY, JSON.stringify(data))
      }
    })
    .catch(error => console.log(`An error occurred 😞 ${error}`))
}
