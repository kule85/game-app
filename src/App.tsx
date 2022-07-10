import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Router from './routes/router'
import GameProvider from './context/GameProvider'

function App() {
  return (
    <BrowserRouter>
      <GameProvider>
        <Router />
      </GameProvider>
    </BrowserRouter>
  )
}

export default App
