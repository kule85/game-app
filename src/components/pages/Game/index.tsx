import React, { FC, useEffect, useState } from 'react'
import { Select, FormControl, MenuItem, InputLabel } from '@mui/material'

import { useAuth } from '../../../hooks/'
import { getRandomPlayers } from '../../../helper'
import { COMPUTER_PLAYERS, HUMAN_PLAYER } from '../../../utils'

import './style.scss'

const initPlayersState: any[] = []

const Game: FC = () => {
  const { numberOfPlayers, setNumberOfPlayers } = useAuth()
  const [players, setPlayers] = useState(initPlayersState)

  useEffect(() => {
    const compPlayers = getRandomPlayers(COMPUTER_PLAYERS, numberOfPlayers - 1)

    setPlayers([...compPlayers, ...HUMAN_PLAYER])
  }, [numberOfPlayers])

  const getCustomWrapperClass = () => {
    switch (numberOfPlayers) {
      case 2:
        return 'players-2'
      case 3:
        return 'players-3'
      default:
        return 'players-4'
    }
  }

  return (
    <div id="game">
      <FormControl className="select-players">
        <InputLabel id="select_players">Number of players</InputLabel>
        <Select
          labelId="select_players"
          value={numberOfPlayers}
          label="Number of players"
          onChange={(e) => setNumberOfPlayers(e.target.value)}
        >
          <MenuItem value={2}>2 Players</MenuItem>
          <MenuItem value={3}>3 Players</MenuItem>
          <MenuItem value={4}>4 Players</MenuItem>
        </Select>
      </FormControl>
      <div className={`wrapper ${getCustomWrapperClass()}`}>
        {players.map((player, key) => {
          return (
            <div
              key={key}
              className={player.isHumanPlayer ? 'human' : `comp-${key + 1}`}
            >
              <h4>{player.name}</h4>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Game
