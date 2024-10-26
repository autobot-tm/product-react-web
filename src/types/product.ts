export interface IProduct {
  id: number
  image: string
  title: string
  price: number
  category: string
  rating: number
}

export type ProductCategory = "men's clothing" | "women's clothing" | 'jewelery' | 'electronics'
