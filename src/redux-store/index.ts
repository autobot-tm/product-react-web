import { configureStore } from '@reduxjs/toolkit'

import cartMiddleware from './cart/cartMiddleware'

import rootReducer from './rootReducer'

export const store = () => {
  return configureStore({
    reducer: rootReducer,

    // TODO: Remove this when we have a proper API error handling
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(cartMiddleware)
  })
}

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
