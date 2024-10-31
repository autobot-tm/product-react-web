import { CATEGORY_PRODUCT } from '@/constants/product.constanst'

export const getCategory = (category: string) => {
  return category === CATEGORY_PRODUCT.ELECTRONICS
    ? CATEGORY_PRODUCT.ELECTRONICS
    : category === CATEGORY_PRODUCT.JEWELERY
    ? CATEGORY_PRODUCT.JEWELERY
    : category === CATEGORY_PRODUCT.MEN
    ? CATEGORY_PRODUCT.MEN
    : category === CATEGORY_PRODUCT.WOMEN
    ? CATEGORY_PRODUCT.WOMEN
    : 'popularity'
}
