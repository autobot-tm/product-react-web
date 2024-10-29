import React, { useEffect, useState } from 'react'

import SelectLabels from '@/components/ui/select-custom'

import { getAllCategory } from '@/services/apis/product.service'
import type { ProductCategory } from '@/types'

import './style.scss'

interface ICategoryTopbar {
  onSelect: (onSelect: string) => void
  selectedCategory: string
  totalProduct: number
}

const CategoryTopbar: React.FC<ICategoryTopbar> = ({ onSelect, selectedCategory, totalProduct }) => {
  const [categories, setCategories] = useState<ProductCategory[]>([])

  const renderCategory = async () => {
    try {
      const response = await getAllCategory()
      console.log(response)
      setCategories(response)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  useEffect(() => {
    renderCategory()
  }, [])

  const getResultText = (count: number) => {
    return count === 1 ? 'result' : 'results'
  }

  return (
    <div className='category-topbar'>
      <p>
        Showing {totalProduct} {getResultText(totalProduct)}
      </p>
      <SelectLabels onChange={onSelect} categories={categories} selectedCategory={selectedCategory || ''} />
    </div>
  )
}

export default CategoryTopbar
