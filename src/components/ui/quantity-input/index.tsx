'use client'

import React, { useCallback } from 'react'
import './style.scss'

interface IQuantityInput {
  value: number
  min: number
  max: number
  onChange: (value: number) => void
}

const QuantityInput = ({ value = 1, min = 1, max = 100, onChange }: IQuantityInput) => {
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = parseInt(e.target.value)
      if (isNaN(value) || value < min) {
        value = min
      } else if (value > max) {
        value = max
      }
      onChange(value)
    },
    [min, max, onChange]
  )

  const handleQtyChange = useCallback(
    (action: string) => {
      const prevQty = value
      if (action === 'add') {
        onChange(Math.min(prevQty + 1, max))
      } else if (action === 'subtract') {
        onChange(Math.max(prevQty - 1, min))
      }
    },
    [value, min, max, onChange]
  )

  return (
    <div className='qty-input'>
      <button
        className='qty-count qty-count--minus'
        data-action='minus'
        type='button'
        onClick={() => handleQtyChange('subtract')}
      >
        -
      </button>
      <input
        className='product-qty'
        type='number'
        name='product-qty'
        min='0'
        max='10'
        value={value}
        onChange={handleInputChange}
      />
      <button
        className='qty-count qty-count--add'
        data-action='add'
        type='button'
        onClick={() => handleQtyChange('add')}
      >
        +
      </button>
    </div>
  )
}

export default QuantityInput
