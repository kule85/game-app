import React, { FC, memo } from 'react'
import { Select, FormControl, MenuItem, InputLabel } from '@mui/material'

import './style.scss'

type Props = {
  value: any
  label: string
  name: string
  className?: string
  options: Array<{
    label: string
    value: number | string
  }>
  onChange: (name: string, value: any) => {}
}

const CustomSelect: FC<Props> = memo(
  ({ name, label, value, options, className, onChange }) => {
    return (
      <FormControl className={`custom-select ${className}`}>
        <InputLabel id="label">{label}</InputLabel>
        <Select
          labelId="label"
          value={value}
          name={name}
          label={label}
          onChange={(e: any) => onChange(e.currentTarget, e.target.value)}
        >
          {options.map((item, key) => {
            return (
              <MenuItem key={key} value={item.value}>
                {item.label}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    )
  },
  (prevProps, nextProps) => {
    return prevProps.value === nextProps.value;
  }
)

export default CustomSelect
