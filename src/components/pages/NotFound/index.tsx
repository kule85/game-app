import React, { FC } from 'react'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'

import './style.scss'

const NotFound: FC = () => {
  return (
    <div className="error-wrapper">
      <div className="error-holder">
        <WarningAmberIcon className="error-icon" />
        <h2>Page not found!</h2>
      </div>
    </div>
  )
}

export default NotFound
