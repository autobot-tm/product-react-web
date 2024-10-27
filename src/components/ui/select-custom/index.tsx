'use client'

import React, { useCallback, useEffect, useState } from 'react'

import type { ProductCategory } from '@/types'

import { getAllCategory } from '@/services/apis/product.service'

import './style.scss'

// tham khảo
const SelectCustom: React.FC<{ onChange: (category: string) => void }> = ({ onChange }) => {
  const [category, setCategory] = useState<ProductCategory[]>()

  const renderCatergory = async () => {
    try {
      const response = await getAllCategory()
      console.log(response)

      setCategory(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    renderCatergory()
  }, [])

  const handleCategoryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.id)
    },
    [onChange]
  )

  if (!category) return ''

  return (
    <div className='select-custom'>
      <details className='custom-select'>
        <summary className='radios'>
          <input type='radio' name='item' id='all' title='All' defaultChecked onChange={handleCategoryChange} />
          {category.map((cat, index) => (
            <input
              key={index}
              type='radio'
              name='item'
              id={`item${index}`}
              title={cat}
              onChange={handleCategoryChange}
            />
          ))}
        </summary>
        <ul className='list'>
          {category.map((cat, index) => (
            <li key={cat}>
              <label htmlFor={`item${index}`}>
                {cat}
                <span></span>
              </label>
            </li>
          ))}
        </ul>
      </details>
    </div>
  )
}

export default SelectCustom
