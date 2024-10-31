import React from 'react'
import dynamic from 'next/dynamic'
import LazyLoading from '@/components/LazyLoading'

const Cart = dynamic(() => import('@/views/app/cart'), {
  loading: () => <LazyLoading />
})

const CartPage: React.FC = () => {
  return <Cart />
}

export default CartPage
