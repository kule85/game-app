import React, { FC } from 'react'
import Button from '@mui/material/Button'

import { useAuth } from '../../../hooks'

import './style.scss'

const Home: FC = () => {
  const { setNumberOfPlayers } = useAuth()

  return (
    <div id="home">
      <div className="wrapper">
        <h2>Select number of players</h2>
        <Button
          variant="contained"
          className="btn-custom"
          onClick={() => setNumberOfPlayers(2)}
        >
          2 Players
        </Button>
        <Button
          variant="contained"
          className="btn-custom"
          onClick={() => setNumberOfPlayers(3)}
        >
          3 Players
        </Button>
        <Button
          variant="contained"
          className="btn-custom"
          onClick={() => setNumberOfPlayers(4)}
        >
          4 Players
        </Button>
      </div>
    </div>
  )
}

export default Home
