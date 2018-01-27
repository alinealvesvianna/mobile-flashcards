import * as types from '../actions/actions-types'

const initialState = {
    loading: false,
    error: null
  }
  
  export default (state = initialState, action) => {
    switch (action.type) {

      case types.IS_LOADING_COMMENTS: {
        return {
          ...state,
          loading: true,
        }
      }
  
      default:
        return state
    }
  }
