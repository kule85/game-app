import React, { FC } from 'react'
import Button from '@mui/material/Button'

import { useAuth } from '../../../hooks'
import { SELECT_PLAYER_OPTIONS } from '../../../utils'

import './style.scss'

const Home: FC = () => {
  const { setNumberOfPlayers } = useAuth()

  return (
    <div id="home">
      <div className="wrapper">
        <h2>Select number of players</h2>
        {SELECT_PLAYER_OPTIONS.map((item, key) => {
          return (
            <Button
              key={key}
              variant="contained"
              className="btn-custom"
              onClick={() => setNumberOfPlayers(item.value)}
            >
              {item.label}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

export default Home
