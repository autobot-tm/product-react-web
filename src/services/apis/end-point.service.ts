export const ENDPOINTS = {
  product: {
    base: 'https://fakestoreapi.com/products',
    categories: 'https://fakestoreapi.com/products/categories',
    category: (category: string) => `https://fakestoreapi.com/products/category/${category}`
  }
}
