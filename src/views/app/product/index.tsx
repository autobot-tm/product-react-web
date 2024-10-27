'use client'

import React, { useEffect, useState } from 'react'

import type { IProduct } from '@/types'

import FilterSidebar from '@/components/app/product/filer-sidebar'
import CategoryTopbar from '@/components/app/product/category-topbar'
import CardItem from '@/components/app/product/card-item'
import LazyLoading from '@/components/LazyLoading'

import { getProducts } from '@/services/apis/product.service'

import { heroImg } from '@/assets/png'
import './style.scss'
import { getCategory } from '@/utils/getCategory'

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const rs = await getProducts()
        console.log(rs)
        setProducts(rs)
      } catch (error) {
        console.log(error)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      console.log(getCategory(selectedCategory))
    }
  }, [selectedCategory])

  if (isError) return <div>ERROR</div>

  return (
    <>
      <div className='hero-section'>
        <div className='hero-section__wrapper'>
          <span className='content-section-wrapper'>
            <p className='content-section-wrapper__title'>Grab Upto 50% Off On Selected Headphone</p>
            <button className='content-section-wrapper__button'>Buy Now</button>
          </span>
          <figure style={{ width: 'auto' }}>
            <img src={heroImg.src} alt='hero-img' />
          </figure>
        </div>
      </div>

      <div className='product-management-wrapper'>
        <div className='product-management-wrapper__filter'>
          <FilterSidebar />
        </div>

        <div className='product-management-wrapper__result'>
          <div className='product-management-wrapper__result-category'>
            <CategoryTopbar category={setSelectedCategory} />
          </div>

          {isLoading && <LazyLoading />}
          <div className='product-management-wrapper__result-list'>
            {products.map(product => (
              <CardItem key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductManagement
