import React from 'react'

import './style.scss'

const FilterSidebar: React.FC = () => {
  return (
    <div className='filter-sidebar'>
      <div className='filter-sidebar__title'>
        <p>Filters</p>
        <button>Clear All</button>
      </div>
      <div className='filter-sidebar__wrapper'></div>
    </div>
  )
}

export default FilterSidebar
