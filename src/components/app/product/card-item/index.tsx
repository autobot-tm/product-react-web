import React from 'react'

import type { IProduct } from '@/types/product'

import './style.scss'

const CardItem: React.FC<IProduct> = ({ id, image, title, price, category, rating }) => {
  return <div className='card-item'>{title}</div>
}

export default CardItem
