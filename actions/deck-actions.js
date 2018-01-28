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

// export function createDeck(deck) {
//     return {type: actionTypes.CREATE_DECK, deck}
// }

// export function addCard(deck) {
//     return { type: actionTypes.ADD_CARD_TO_DECK, deck}
// }

// export function deleteDeck(deck_id) {
//     return {type: actionTypes.DELETE_DECK, deck_id}
// }


