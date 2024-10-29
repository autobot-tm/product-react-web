'use client'

import React, { useState } from 'react'
import useSWR from 'swr'

import type { IProduct } from '@/types'

import CategoryTopbar from '@/components/app/product/category-topbar'
import LazyLoading from '@/components/LazyLoading'
import FilterSidebar from '@/components/app/product/filer-sidebar'
import CardItem from '@/components/app/product/card-item'

import { getProducts as fetchProducts } from '@/services/apis/product.service'
import { getCategory } from '@/utils/getCategory'
import { ENDPOINTS } from '@/services/apis/end-point.service'

import { heroImg } from '@/assets/png'
import './style.scss'

const ProductManagement: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('popularity')
  const {
    data: products = [],
    error,
    isLoading
  } = useSWR(ENDPOINTS.product.categories, fetchProducts, { revalidateOnFocus: false })

  const filteredProducts = products?.filter((product: IProduct) => {
    const category = getCategory(product.category)
    return category === selectedCategory || selectedCategory === 'popularity'
  })

  if (error) return <p className='text-center font-bold text-2xl'>404</p>

  return (
    <>
      {isLoading && <LazyLoading />}
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
            <CategoryTopbar
              totalProduct={filteredProducts?.length}
              onSelect={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
          </div>

          <div className='product-management-wrapper__result-list'>
            {filteredProducts &&
              filteredProducts?.map((product: IProduct) => <CardItem key={product.id} {...product} />)}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductManagement
