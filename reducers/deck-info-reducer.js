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
  
      default:
        return state
    }
  }
