import React, { FC } from 'react'
import { CircularProgress, Box } from '@mui/material'

import './style.scss'

const Loader: FC = () => {
  return (
    <Box className="loader-wrapper">
      <CircularProgress />
    </Box>
  )
}

export default Loader
