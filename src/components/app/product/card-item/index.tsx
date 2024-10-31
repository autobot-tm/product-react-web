'use client'

import React from 'react'

import Image from 'next/image'

import { Rating } from '@mui/material'

import type { IProduct } from '@/types/product'

import { useAppDispatch } from '@/redux-store/hooks'
import { cartActions } from '@/redux-store/cart'
import { useSnackbar } from 'notistack'

import './style.scss'

const ProductItem: React.FC<IProduct> = ({ id, image, title, price, rating }) => {
  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { addToCart } = cartActions

  const handleAddToCart = () => {
    dispatch(addToCart({ id, title, price, image }))
    enqueueSnackbar(`You have added ${title} to the cart`, {
      variant: 'success'
    })
  }

  return (
    <div className='card-item'>
      <figure className='card-item__header'>
        <Image src={image} alt={title} width={200} height={200} priority blurDataURL={image} />
      </figure>
      <div className='card-item__content'>
        <span className='card-item__content__title'>
          <p>{title}</p>
          <p>$ {price}</p>
        </span>
        <span className='card-item__content__rating'>
          <Rating value={rating?.rate} readOnly precision={0.5} size='small' />
          <p>({rating?.count})</p>
        </span>
        <span className='card-item__content__button'>
          <button onClick={handleAddToCart}>Add To Cart</button>
          <button onClick={() => alert('coming soon')}>Buy Now</button>
        </span>
      </div>
    </div>
  )
}

export default ProductItem
