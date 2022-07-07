import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Router from './routes/router'
import AuthProvider from './context/AuthProvider'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
