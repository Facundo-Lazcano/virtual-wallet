import {
  GET_MOVEMENT,
  GET_MOVEMENTS,
  ADD_MOVEMENT,
  UPDATE_MOVEMENT,
  DELETE_MOVEMENT,
  SORT_BY_CATEGORY
} from '../actions/types'
import _ from 'lodash'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = [], action) => {
  switch (action.type) {
    case GET_MOVEMENT:
      return { ...state, movements: action.payload }
    case GET_MOVEMENTS:
      return { ...state, movements: action.payload }
    case ADD_MOVEMENT:
      return { ...state, movements: action.payload }
    case UPDATE_MOVEMENT:
      return { ...state, movements: action.payload }
    case SORT_BY_CATEGORY:
      return {
        ...state,
        movements: _.sortBy(state.movements, 'category')
      }
    case DELETE_MOVEMENT:
      return {
        ...state,
        movements: state.movements.filter(e => e.id !== action.payload)
      }
    default:
      return state
  }
}
