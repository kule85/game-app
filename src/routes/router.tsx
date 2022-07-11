import { FC, default as React } from 'react'
import { useRoutes } from 'react-router-dom'

import Home from '../components/pages/Home'
import Game from '../components/pages/Game'
import NotFound from '../components/pages/NotFound'
import MainLayout from '../layout/Main'
import ProtectedRoute from '../routes/protectedRoute'

const Router: FC = () => {
  return useRoutes([
    {
      element: <MainLayout />,
      children: [
        { path: '*', element: <NotFound /> },
        { path: '/', element: <Home /> },
        {
          path: 'game',
          element: (
            <ProtectedRoute>
              <Game />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ])
}

export default Router
