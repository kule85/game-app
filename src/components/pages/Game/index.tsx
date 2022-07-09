import React, { FC, useEffect, useState, useCallback } from 'react'
import { Button } from '@mui/material'

import PlayerCards from '../../molecules/PlayerCards'
import CustomSelect from '../../atoms/CustomSelect'

import { useAuth, useRequest } from '../../../hooks/'
import { getRandomPlayers } from '../../../helper'
import { COMPUTER_PLAYERS, HUMAN_PLAYER, SELECT_PLAYER_OPTIONS } from '../../../utils'

import './style.scss'

const initPlayersState: any[] = []

const Game: FC = () => {
  const { numberOfPlayers, setNumberOfPlayers } = useAuth()
  const [players, setPlayers] = useState(initPlayersState)
  const [deckId, setDeckId] = useState(null)

  const { doRequest } = useRequest({
    url: 'deck/new/shuffle/?deck_count=1',
    method: 'get',
    callback: (response: any) => setDeckId(response?.data?.deck_id || null),
  })

  const handleDraw = useCallback(async () => await doRequest(), [doRequest])

  useEffect(() => {
    const compPlayers = getRandomPlayers(COMPUTER_PLAYERS, numberOfPlayers - 1)

    setPlayers([...compPlayers, ...HUMAN_PLAYER])
  }, [numberOfPlayers])

  console.log(deckId)

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
      <CustomSelect
        name="players"
        label="Number of players"
        className="select-players"
        options={SELECT_PLAYER_OPTIONS}
        value={numberOfPlayers}
        onChange={(name, value) => setNumberOfPlayers(value)}
      />
      <div className={`wrapper ${getCustomWrapperClass()}`}>
        <Button
          variant="contained"
          className="btn-custom"
          onClick={() => handleDraw()}
        >
          Draw
        </Button>
        {players.map((player, key) => {
          return (
            <div
              key={key}
              className={`player ${
                player.isHumanPlayer ? 'human' : `comp-${key + 1}`
              }`}
            >
              <h4>{player.name}</h4>
              <p>Score: 0</p>
              {player.cards.length && (
                <PlayerCards
                  cards={player.cards}
                  isHuman={player.isHumanPlayer}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Game
