import { combineReducers } from 'redux'

import cartReducer from './slices/cart'

const rootReducer = combineReducers({
  cart: cartReducer
})

export default rootReducer
