'use client'

import React, { useMemo } from 'react'
import Image from 'next/image'

import './style.scss'
import Link from 'next/link'

import CartItem from './CartItem'
import { Button } from '@mui/material'
import { useAppDispatch, useAppSelector } from '@/redux-store/hooks'
import { emptyArchive } from '@/assets/png'
import { cartActions } from '@/redux-store/cart'
import { enqueueSnackbar } from 'notistack'

const Cart = () => {
  const dispatch = useAppDispatch()
  const { items } = useAppSelector(state => state.cart)
  const { clearCart } = cartActions

  const totalPrice = useMemo(() => {
    return items.reduce((total, item) => {
      return total + item.product.price * item.quantity
    }, 0)
  }, [items])

  const renderedCartItems = useMemo(() => {
    return items?.map(item => (
      <CartItem
        key={item.product.id}
        product={{
          id: item.product.id,
          title: item.product.title,
          price: item.product.price,
          image: item.product.image
        }}
        quantity={item.quantity}
      />
    ))
  }, [items])

  const handleCheckout = () => {
    dispatch(clearCart())
    enqueueSnackbar('Payment successful', {
      variant: 'success',
      anchorOrigin: { vertical: 'top', horizontal: 'right' }
    })
  }

  return (
    <div className='cart-page'>
      <div className='cart-page__header'>
        <h1>Your cart</h1>
        <Link href='/product-management' className='underline'>
          Continue Shopping
        </Link>
      </div>

      {items.length ? (
        <div className='cart-page__main__table'>
          <div className='cart-page__main__table__header'>
            <div className='title'>
              <h2>Product</h2>
              <h2>Price</h2>
              <h2>Quantity</h2>
              <h2>Total</h2>
            </div>
          </div>
          <div className='cart-page__main__table__body'>
            <div className='cart-page__main__table__body__item'>{renderedCartItems}</div>
          </div>
          <div className='cart-page__main__table__footer'>
            <div className='cart-page__main__table__footer__total'>
              <p>Subtotal</p>
              <p className='total-price'>${totalPrice.toFixed(2)} CAD</p>
            </div>
            <div className='cart-page__main__table__footer__description'>Taxes and shipping calculated at checkout</div>
            <div className='cart-page__main__table__footer__checkout'>
              <Button
                variant='contained'
                size='large'
                style={{ width: '30%', backgroundColor: '#445858', textTransform: 'capitalize' }}
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <figure className='empty'>
          <Image
            src={emptyArchive.src}
            alt='empty-archive'
            width={50}
            height={50}
            priority
            blurDataURL={emptyArchive.src}
          />
        </figure>
      )}
    </div>
  )
}

export default Cart
