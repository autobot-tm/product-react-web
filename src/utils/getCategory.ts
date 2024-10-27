import { CATEGORY_PRODUCT } from '@/constants/product.constanst'

export const getCategory = (category: string) => {
  return category === 'item0'
    ? CATEGORY_PRODUCT.ELECTRONICS
    : category === 'item1'
    ? CATEGORY_PRODUCT.JEWELERY
    : category === 'item2'
    ? CATEGORY_PRODUCT.MEN
    : category === 'item3'
    ? CATEGORY_PRODUCT.WOMEN
    : 'all'
}
