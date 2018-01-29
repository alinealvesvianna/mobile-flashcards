import * as types from './actions-types'

export function getDecks(decks) {
  return {
    type: types.GET_DECKS,
    decks
  }
}

export function addCardToDeck(title, card) {
  return {
    type: types.ADD_CARD_TO_DECK,
    title,
    card
  }
}

export function newDeck(deck) {
  return {
    type: types.NEW_DECK,
    deck
  }
}