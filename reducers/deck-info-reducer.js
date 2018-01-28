import * as types from '../actions/actions-types'

const initialState = {}
  
  export default (state = initialState, action) => {
    switch (action.type) {

      case types.GET_DECKS: {

        let decks = Object.keys(action.decks).map(key => action.decks[key])

        return {
          ...state,
          allDecks : decks,
        }
      }

      case types.ADD_CARD_TO_DECK:

      let teste = state.allDecks.map(deck => {
          if(deck.title === action.title){
              deck.questions.concat(action.card)
          }
          return deck
      })

      return {
          ...state,
          allDecks: teste
      }
  
      default:
        return state
    }
  }
