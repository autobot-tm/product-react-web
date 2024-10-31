import { ICartState } from './cartTypes'

const saveCartToLocalStorage = (state: ICartState) => {
  localStorage.setItem('cart', JSON.stringify(state))
}

export default (storeAPI: any) => (next: any) => (action: any) => {
  const result = next(action)
  if (action.type.startsWith('cart/')) {
    saveCartToLocalStorage(storeAPI.getState().cart)
  }
  return result
}
