import { combineReducers } from 'redux'
import products from './products'
import loggingInformation from './login'

const rootReducer = combineReducers({
  products,
  loggingInformation
})

export default rootReducer;