'use client'

import React, { useState } from 'react'
import useSWR from 'swr'

import Image from 'next/image'

import type { IProduct } from '@/types'

import CategoryTopbar from '@/components/app/product/category-topbar'
import LazyLoading from '@/components/LazyLoading'
import FilterSidebar from '@/components/app/product/filer-sidebar'
import CardItem from '@/components/app/product/card-item'

import { getProducts } from '@/services/apis/product.service'
import { getCategory } from '@/utils/getCategory'
import { ENDPOINTS } from '@/services/apis/end-point.service'

import { emptyArchive, heroImg } from '@/assets/png'

import './style.scss'
import { IconButton, TextField } from '@mui/material'
import { SearchOutlined } from '@mui/icons-material'

export type FilterType = {
  rating: string | null
  price: number
  sortOrder: string
}

const ProductManagement: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('popularity')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [filters, setFilters] = useState<FilterType>({
    rating: '0.5',
    price: 1000,
    sortOrder: 'lth'
  })

  const fetchProducts = async () => {
    try {
      const response = await getProducts()
      return response
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const {
    data: products = [],
    error,
    isLoading
  } = useSWR(ENDPOINTS.product.base, fetchProducts, { revalidateOnFocus: false })

  const filteredProducts = products?.filter((product: IProduct) => {
    const category = getCategory(product.category)
    const matchesCategory = category === selectedCategory || selectedCategory === 'popularity'
    const matchesRating = filters.rating ? product.rating.rate >= Number(filters.rating) : true
    const matchesPrice = product.price <= filters.price
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesRating && matchesPrice && matchesSearch
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (filters.sortOrder === 'rth') {
      return b.rating.rate - a.rating.rate
    }

    if (filters.sortOrder === 'az') {
      return (a.title || '').localeCompare(b.title || '') //a-z
    } else if (filters.sortOrder === 'za') {
      return (b.title || '').localeCompare(a.title || '') //z-a
    }

    if (filters.sortOrder === 'lth') {
      return a.price - b.price
    } else if (filters.sortOrder === 'htl') {
      return b.price - a.price
    }

    return 0
  })

  const handleFilterChange = (filter: FilterType) => {
    setFilters(filter)
    console.log(filter)
  }

  if (isLoading) return <LazyLoading />

  if (error) return <p className='text-center font-bold'>404</p>

  return (
    <>
      <div className='hero-section'>
        <div className='hero-section__wrapper'>
          <span className='content-section-wrapper'>
            <p className='content-section-wrapper__title'>Grab Upto 50% Off On Selected Headphone</p>
            <button className='content-section-wrapper__button'>Buy Now</button>
          </span>
          <figure style={{ width: 'auto' }}>
            <Image src={heroImg.src} alt='hero-img' width={274} height={300} priority blurDataURL={heroImg.src} />
          </figure>
        </div>
      </div>

      <div className='product-management'>
        <div className='product-management__search-bar'>
          <TextField
            onChange={e => {
              setSearchQuery(e.target.value)
            }}
            variant='outlined'
            placeholder='Search...'
            size='small'
            className='search-input'
          />
          <IconButton type='submit' aria-label='search'>
            <SearchOutlined style={{ fill: '#0d3356' }} />
          </IconButton>
        </div>

        <div className='product-management-wrapper'>
          <div className='product-management-wrapper__filter'>
            <FilterSidebar
              filters={filters}
              setSelectedCategory={setSelectedCategory}
              onFilterChange={handleFilterChange}
            />
          </div>
          <div className='product-management-wrapper__result'>
            <div className='product-management-wrapper__result-category'>
              <CategoryTopbar
                filters={filters}
                onFilterChange={handleFilterChange}
                totalProduct={sortedProducts?.length}
                onSelect={setSelectedCategory}
                selectedCategory={selectedCategory}
              />
            </div>
            {filteredProducts?.length ? (
              <div className='product-management-wrapper__result-list'>
                {sortedProducts?.map((product: IProduct) => (
                  <CardItem key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <figure className='flex justify-center items-center'>
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
        </div>
      </div>
    </>
  )
}

export default ProductManagement
