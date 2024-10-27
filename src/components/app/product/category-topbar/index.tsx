import React from 'react'

import SelectCustom from '@/components/ui/select-custom'

import './style.scss'

const CategoryTopbar: React.FC<{ category: (category: string) => void }> = ({ category }) => {
  return (
    <div className='category-topbar'>
      <p>Showing 12 Result from total 230</p>
      <SelectCustom onChange={category} />
    </div>
  )
}

export default CategoryTopbar
