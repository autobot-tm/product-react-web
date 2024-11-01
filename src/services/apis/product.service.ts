import axios from 'axios'
import { ENDPOINTS } from './end-point.service'

export const getProducts = async () => {
  const response = await axios.get(ENDPOINTS.product.base)
  return response.data
}

export const getAllCategory = async () => {
  const response = await axios.get(ENDPOINTS.product.categories)
  return response.data
}
