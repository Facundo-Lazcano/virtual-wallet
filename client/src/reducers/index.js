import { combineReducers } from 'redux'
import authReducer from './authReducer'
import movementsReducer from './movementsReducer'

export default combineReducers({
  auth: authReducer,
  movements: movementsReducer
})
