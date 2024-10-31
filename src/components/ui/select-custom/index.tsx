import React, { useCallback, useMemo } from 'react'
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

const SelectCustom: React.FC<ISelectCustom> = ({ onChange, options = [], selectedValue }) => {
  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      const selectedOption = event.target.value
      onChange(selectedOption)
    },
    [onChange]
  )

  const memoizedOptions = useMemo(() => {
    return options.map(option => (
      <MenuItem key={option.value} value={option.value} sx={{ textTransform: 'capitalize' }}>
        {option.label}
      </MenuItem>
    ))
  }, [options])

  return (
    <FormControl className='select-custom'>
      <Select
        value={selectedValue}
        onChange={handleChange}
        sx={{ textTransform: 'capitalize', borderRadius: 28 }}
        size='small'
      >
        {memoizedOptions}
      </Select>
    </FormControl>
  )
}

export default React.memo(SelectCustom)
