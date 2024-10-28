import React from 'react'

import type { IProduct } from '@/types/product'
import { Rating } from '@mui/material'

import './style.scss'

const CardItem: React.FC<IProduct> = ({ id, image, title, price, category, rating }) => {
  return (
    <div className='card-item'>
      <figure className='card-item__header'>
        <img src={image} alt={title} />
      </figure>
      <div className='card-item__content'>
        <span className='card-item__content__title'>
          <p>{title}</p>
          <p>₹ {price}</p>
        </span>
        <span className='card-item__content__rating'>
          <Rating value={rating.rate} readOnly precision={0.5} size='small' />
          <p>({rating.count})</p>
        </span>
        <span className='card-item__content__button'>
          <button>Add To Cart</button>
          <button>Buy Now</button>
        </span>
      </div>
    </div>
  )
}

export default CardItem
