import React, { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { useGame } from '../hooks'

type Props = {
  children: JSX.Element
}

const ProtectedRoute: FC<Props> = ({ children }) => {
  const { numberOfPlayers } = useGame()

  if (numberOfPlayers === 0) {
    return <Navigate to="/" />
  }

  return children
}

export default ProtectedRoute
