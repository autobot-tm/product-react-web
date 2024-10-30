import React, { useCallback } from 'react'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import './style.scss'

interface ISelectOption {
  value: string
  label: string
}

interface ISelectCustom {
  onChange: (onChange: string) => void
  options: ISelectOption[]
  selectedValue: string
}

export default function SelectCustom({ onChange, options = [], selectedValue }: ISelectCustom) {
  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      const selectedOption = event.target.value
      onChange(selectedOption)
    },
    [onChange]
  )

  return (
    <FormControl className='select-custom'>
      <Select
        value={selectedValue}
        onChange={handleChange}
        sx={{ textTransform: 'capitalize', borderRadius: 28 }}
        size='small'
      >
        {options.map(option => (
          <MenuItem key={option.value} value={option.value} sx={{ textTransform: 'capitalize' }}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
