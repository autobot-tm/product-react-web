'use client'

import React, { useCallback, useState } from 'react'

import Image from 'next/image'

import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

import type { ICartItem } from '@/types'

import QuantityInput from '@/components/ui/quantity-input'
import { useAppDispatch } from '@/redux-store/hooks'
import { cartActions } from '@/redux-store/cart'

const CartItem: React.FC<ICartItem> = ({ product, quantity }) => {
  const dispatch = useAppDispatch()
  const [qty, setQty] = useState(quantity)
  const { removeFromCart, updateQuantity } = cartActions

  const total = product.price * qty

  const handleUpdateQuantity = useCallback(
    (value: number) => {
      setQty(value)
      dispatch(updateQuantity({ productId: product.id, quantity: value }))
    },
    [dispatch, product.id]
  )

  return (
    <div className='cart-page__main__table__body__item__row'>
      <div className='product-info'>
        <Image
          src={product.image}
          alt='product'
          width={50}
          height={50}
          style={{ width: 'auto', height: 'auto' }}
          blurDataURL={product.image}
        />
        <p className='title'>{product.title}</p>
      </div>
      <p>${product.price.toFixed(2)}</p>
      <QuantityInput value={qty} min={1} max={100} onChange={handleUpdateQuantity} />
      <div className='total'>
        <p className='price'>${total.toFixed(2)}</p>
        <IconButton aria-label='delete' onClick={() => dispatch(removeFromCart(product.id))}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default CartItem
