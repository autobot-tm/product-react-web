import React, { useCallback } from 'react'

import useSWR from 'swr'

import SelectCustom from '@/components/ui/select-custom'
import CategorySelect from './CategorySelect'

import { ENDPOINTS } from '@/services/apis/end-point.service'
import { getAllCategory } from '@/services/apis/product.service'

import type { FilterType } from '@/views/app/product'
import { SORT_OPTIONS } from '@/constants/sortOptions.constant'

import './style.scss'

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
      return response
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const { data: categories = [], isLoading } = useSWR(ENDPOINTS.product.categories, renderCategory, {
    revalidateOnFocus: false
  })

  const handleSortChange = useCallback(
    (event: string) => {
      onFilterChange({ ...filters, sortOrder: event })
    },
    [onFilterChange]
  )

  const getResultText = (count: number) => {
    return count === 1 ? 'result' : 'results'
  }

  if (isLoading) return 'Loading...'

  if (categories.length === 0) return 'No category found'

  return (
    <div className='category-topbar'>
      <p>
        Showing {totalProduct} {getResultText(totalProduct)}
      </p>
      <div className='category-topbar__select'>
        <CategorySelect onChange={onSelect} categories={categories} selectedCategory={selectedCategory || ''} />
        <SelectCustom onChange={handleSortChange} options={SORT_OPTIONS} selectedValue={filters.sortOrder} />
      </div>
    </div>
  )
}

export default CategoryTopbar
