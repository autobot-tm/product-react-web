'use client'

import React, { useEffect, useState } from 'react'

import type { IProduct } from '@/types'

import { getProducts } from '@/services/apis/product.service'
import { heroImg } from '@/assets/png'

import './style.scss'

const ProductManagement = () => {
  const [products, setProducts] = useState<IProduct[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const rs = await getProducts()
        console.log(rs)
        setProducts(rs)
      } catch (error) {
        console.log(error)
        alert('Error')
      }
    }
    fetchProducts()
  }, [])

  return (
    <>
      <div className='hero-section'>
        <span className='content-section-wrapper'>
          <p className='content-section-wrapper__title'>Grab Upto 50% Off On Selected Headphone</p>
          <button className='content-section-wrapper__button'>Buy Now</button>
        </span>
        <figure>
          <img src={heroImg.src} alt='hero-img' />
        </figure>
      </div>

      <ul>
        {products.map(product => (
          <li key={product.id}>{product.category}</li>
        ))}
      </ul>
    </>
  )
}

export default ProductManagement
