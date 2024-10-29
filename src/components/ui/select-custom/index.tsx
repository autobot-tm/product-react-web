import * as React from 'react'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import type { ProductCategory } from '@/types'
import { getCategory } from '@/utils/getCategory'

interface ISelectCustom {
  onChange: (onChange: string) => void
  categories: ProductCategory[]
  selectedCategory: string
}

export default function SelectLabels({ onChange, categories, selectedCategory }: ISelectCustom) {
  const handleChange = (event: SelectChangeEvent) => {
    const category = getCategory(event.target.value)
    onChange(category)
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 140 }}>
      <Select value={selectedCategory} onChange={handleChange} sx={{ textTransform: 'capitalize' }}>
        <MenuItem value='popularity'>
          <em>Popularity</em>
        </MenuItem>
        {categories.map((category, index) => (
          <MenuItem key={index} value={category} sx={{ textTransform: 'capitalize' }}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
