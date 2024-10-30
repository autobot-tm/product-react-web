import React, { useCallback, useEffect, useState } from 'react'

import CategorySelect from './CategorySelect'

import { getAllCategory } from '@/services/apis/product.service'

import type { FilterType } from '@/views/app/product'

import './style.scss'
import SelectCustom from '@/components/ui/select-custom'
import useSWR from 'swr'
import { ENDPOINTS } from '@/services/apis/end-point.service'

const sortOptions = [
  { value: 'lth', label: 'Price-low to high' },
  { value: 'htl', label: 'Price-high to low' },
  { value: 'rth', label: 'Rating-high to low' },
  { value: 'az', label: 'Name-A to Z' },
  { value: 'za', label: 'Name-Z to A' }
]

interface ICategoryTopbar {
  onSelect: (onSelect: string) => void
  onFilterChange: (filter: FilterType) => void
  filters: FilterType
  selectedCategory: string
  totalProduct: number
}

const CategoryTopbar: React.FC<ICategoryTopbar> = ({
  onSelect,
  onFilterChange,
  filters,
  selectedCategory,
  totalProduct
}) => {
  const renderCategory = async () => {
    try {
      const response = await getAllCategory()
      console.log(response)

      return response
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const { data: categories = [], isLoading } = useSWR(ENDPOINTS.product.categories, renderCategory, {
    revalidateOnFocus: false
  })

  const handleSortChange = useCallback((event: string) => {
    onFilterChange({ ...filters, sortOrder: event })
  }, [])

  const getResultText = (count: number) => {
    return count === 1 ? 'result' : 'results'
  }

  if (isLoading) return 'Nothing'

  return (
    <div className='category-topbar'>
      <p>
        Showing {totalProduct} {getResultText(totalProduct)}
      </p>
      <div className='category-topbar__select'>
        <CategorySelect onChange={onSelect} categories={categories} selectedCategory={selectedCategory || ''} />
        <SelectCustom onChange={handleSortChange} options={sortOptions} selectedValue={filters.sortOrder} />
      </div>
    </div>
  )
}

export default CategoryTopbar
