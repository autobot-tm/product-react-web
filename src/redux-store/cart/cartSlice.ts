import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'
import type { ICartState } from './cartTypes'
import type { IProduct } from '@/types'

const initialState: ICartState = {
  items: []
}

const initialCartState = (): ICartState => {
  const storedCart = localStorage.getItem('cart')
  return storedCart ? JSON.parse(storedCart) : initialState
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState(),
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const product = action.payload
      const existingItem = state.items.find(item => item.product.id === product.id)

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ product, quantity: 1 })
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload
      state.items = state.items.filter(item => item.product.id !== productId)
    },

    updateQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
      const { productId, quantity } = action.payload
      const existingItem = state.items.find(item => item.product.id === productId)

      if (existingItem && quantity > 0) {
        existingItem.quantity = quantity
      } else if (existingItem && quantity <= 0) {
        state.items = state.items.filter(item => item.product.id !== productId)
      }
    }
  }
})

const { actions, reducer } = cartSlice
export const cartReducer = reducer
export const cartActions = actions

export default cartSlice.reducer
