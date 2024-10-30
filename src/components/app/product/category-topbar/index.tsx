import React, { useCallback, useEffect, useState } from 'react'

import CategorySelect from './CategorySelect'

import { getAllCategory } from '@/services/apis/product.service'

import type { FilterType } from '@/views/app/product'
import type { ProductCategory } from '@/types'

import './style.scss'
import SelectCustom from '@/components/ui/select-custom'

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
  const [categories, setCategories] = useState<ProductCategory[]>([])

  const renderCategory = async () => {
    try {
      const response = await getAllCategory()
      setCategories(response)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  useEffect(() => {
    renderCategory()
  }, [])

  const handleSortChange = useCallback((event: string) => {
    onFilterChange({ ...filters, sortOrder: event })
  }, [])

  const getResultText = (count: number) => {
    return count === 1 ? 'result' : 'results'
  }

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
