import React, { FC, memo } from 'react'
import { Button } from '@mui/material'

import './style.scss'

type Props = {
  label: string
  variant: 'contained' | 'outlined' | 'text'
  className?: string
  onClick: () => {}
}

const CustomButton: FC<Props> = ({ label, className, variant, onClick }) => {
  return (
    <Button
      variant={variant}
      className={`btn-custom ${className}`}
      onClick={() => onClick()}
    >
      {label}
    </Button>
  )
}

export default memo(CustomButton)
