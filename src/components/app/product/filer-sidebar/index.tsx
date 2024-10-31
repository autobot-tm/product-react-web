import React, { useCallback } from 'react'

import { FormControlLabel, Radio, RadioGroup, Rating, Slider } from '@mui/material'

import type { FilterType } from '@/views/app/product'

import './style.scss'

interface FilterSidebarProps {
  filters: FilterType
  onFilterChange: (filter: FilterType) => void
  setSelectedCategory: (category: string) => void
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFilterChange, setSelectedCategory }) => {
  //rating change by radio
  const handleRatingChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const ratingChange = (event.target as HTMLInputElement).value
      onFilterChange({ ...filters, rating: ratingChange })
    },
    [onFilterChange]
  )

  //price change by slider
  const handlePriceChange = useCallback(
    (event: Event, newValue: number | number[]) => {
      event.preventDefault()
      const priceChange = newValue as number
      onFilterChange({ ...filters, price: priceChange })
    },
    [onFilterChange]
  )

  //reset all filter
  const handleClearAll = useCallback(() => {
    setSelectedCategory('popularity')
    onFilterChange({ rating: '0.5', price: 1000, sortOrder: 'lth' })
  }, [onFilterChange])

  return (
    <div className='filter-sidebar'>
      <div className='filter-sidebar__title'>
        <p>Filters</p>
        <button type='button' onClick={handleClearAll}>
          Clear All
        </button>
      </div>
      <div className='filter-sidebar__wrapper'>
        <div className='filter-sidebar__wrapper__rating'>
          <h4>Rating</h4>
          <div className='filter-sidebar__wrapper__rating__list'>
            <RadioGroup
              aria-labelledby='demo-controlled-radio-buttons-group'
              name='controlled-radio-buttons-group'
              value={filters.rating}
              onChange={handleRatingChange}
            >
              <FormControlLabel
                value='5'
                control={<Radio />}
                label={
                  <div className='filter-sidebar__wrapper__rating__list__item'>
                    <Rating value={5} readOnly size='small' precision={0.5} /> 5 & up
                  </div>
                }
              />
              <FormControlLabel
                value='4.5'
                control={<Radio />}
                label={
                  <div className='filter-sidebar__wrapper__rating__list__item'>
                    <Rating value={4.5} readOnly size='small' precision={0.5} /> 4.5 & up
                  </div>
                }
              />
              <FormControlLabel
                value='4'
                control={<Radio />}
                label={
                  <div className='filter-sidebar__wrapper__rating__list__item'>
                    <Rating value={4} readOnly size='small' precision={0.5} /> 4 & up
                  </div>
                }
              />
              <FormControlLabel
                value='3.5'
                control={<Radio />}
                label={
                  <div className='filter-sidebar__wrapper__rating__list__item'>
                    <Rating value={3.5} readOnly size='small' precision={0.5} /> 3.5 & up
                  </div>
                }
              />
              <FormControlLabel
                value='3'
                control={<Radio />}
                label={
                  <div className='filter-sidebar__wrapper__rating__list__item'>
                    <Rating value={3} readOnly size='small' precision={0.5} /> 3 & up
                  </div>
                }
              />
              <FormControlLabel
                value='2.5'
                control={<Radio />}
                label={
                  <div className='filter-sidebar__wrapper__rating__list__item'>
                    <Rating value={2.5} readOnly size='small' precision={0.5} /> 2.5 & up
                  </div>
                }
              />
              <FormControlLabel
                value='2'
                control={<Radio />}
                label={
                  <div className='filter-sidebar__wrapper__rating__list__item'>
                    <Rating value={2} readOnly size='small' precision={0.5} /> 2 & up
                  </div>
                }
              />
              <FormControlLabel
                value='1.5'
                control={<Radio />}
                label={
                  <div className='filter-sidebar__wrapper__rating__list__item'>
                    <Rating value={1.5} readOnly size='small' precision={0.5} /> 1.5 & up
                  </div>
                }
              />
              <FormControlLabel
                value='1'
                control={<Radio />}
                label={
                  <div className='filter-sidebar__wrapper__rating__list__item'>
                    <Rating value={1} readOnly size='small' precision={0.5} /> 1 & up
                  </div>
                }
              />
              <FormControlLabel
                value='0.5'
                control={<Radio />}
                label={
                  <div className='filter-sidebar__wrapper__rating__list__item'>
                    <Rating value={0.5} readOnly size='small' precision={0.5} /> 0.5 & up
                  </div>
                }
              />
            </RadioGroup>
          </div>
        </div>
        <div className='filter-sidebar__wrapper__price'>
          <span className='filter-sidebar__wrapper__price__title'>
            <h4>Price</h4> <span>0 - ${filters.price}</span>
          </span>
          <div className='filter-sidebar__wrapper__price__slider'>
            <Slider
              aria-label='Price'
              value={filters.price}
              min={10}
              max={1000}
              onChange={handlePriceChange}
              sx={{ color: '#0d3356' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterSidebar
