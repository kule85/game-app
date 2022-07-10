import React, { FC } from 'react'

import CustomButton from '../../atoms/CustomButton'

import { useGame } from '../../../hooks'
import { SELECT_PLAYER_OPTIONS } from '../../../utils'

import './style.scss'

const Home: FC = () => {
  const { setNumberOfPlayers } = useGame()

  return (
    <div id="home">
      <div className="wrapper">
        <h2>Select number of players</h2>
        {SELECT_PLAYER_OPTIONS.map((item, key) => {
          return (
            <CustomButton
              label={item.label}
              key={key}
              variant="contained"
              onClick={() => setNumberOfPlayers(item.value)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Home
