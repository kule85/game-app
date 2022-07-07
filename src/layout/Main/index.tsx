import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

import './style.scss'

const MainLayout: FC = () => {
  return (
    <div id="main_layout">
      <Outlet />
    </div>
  )
}

export default MainLayout
