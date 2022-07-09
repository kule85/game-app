import React, { FC, useEffect, useState, useCallback } from 'react'

import CustomSelect from '../../atoms/CustomSelect'
import CustomButton from '../../atoms/CustomButton'
import Notification from '../../atoms/Notification'
import PlayerDeck from '../../organisms/PlayerDeck'

import { useAuth, useRequest } from '../../../hooks/'
import { getRandomPlayers } from '../../../helper'
import {
  COMPUTER_PLAYERS,
  HUMAN_PLAYER,
  SELECT_PLAYER_OPTIONS,
} from '../../../utils'

import './style.scss'

type DeckProps = {
  data: any
  loading: boolean
  error: any
}

const initPlayersState: any[] = []
const initDeckState: DeckProps = { data: {}, loading: false, error: null }

const Game: FC = () => {
  const { numberOfPlayers, setNumberOfPlayers } = useAuth()
  const [players, setPlayers] = useState(initPlayersState)
  const [deckData, setDeckData] = useState(initDeckState)

  const { doRequest: getPlayerDeck } = useRequest({
    url: 'deck/new/shuffledsad/?deck_count=1',
    method: 'get',
    callback: (response: any) => setDeckData(response),
  })

  // const { doRequest: getPlayerCards } = useRequest({
  //   url: `deck/${deckId}/draw/?count=10`,
  //   method: 'get',
  //   callback: (response: any) => console.log(response),
  // })

  const handleDraw = useCallback(
    async () => await getPlayerDeck(),
    [getPlayerDeck]
  )
  // const handleCards = useCallback(
  //   async () => await getPlayerCards(),
  //   [getPlayerCards]
  // )

  useEffect(() => {
    const compPlayers = getRandomPlayers(COMPUTER_PLAYERS, numberOfPlayers - 1)

    setPlayers([...compPlayers, ...HUMAN_PLAYER])
  }, [numberOfPlayers])

  // useEffect(() => {
  //   if (deckId) {
  //     handleCards()
  //   }
  // }, [deckId])

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
      {deckData?.error && (
        <Notification
          type="error"
          message={deckData?.error?.statusText}
        />
      )}
      <CustomSelect
        name="players"
        label="Number of players"
        className="select-players"
        options={SELECT_PLAYER_OPTIONS}
        value={numberOfPlayers}
        onChange={(name, value) => setNumberOfPlayers(value)}
      />
      <div className={`wrapper ${getCustomWrapperClass()}`}>
        <CustomButton
          label="Draw"
          variant="contained"
          onClick={() => handleDraw()}
        />
        {players.map((player, key) => {
          return (
            <PlayerDeck
              key={key}
              player={player}
              className={player.isHumanPlayer ? 'human' : `comp-${key + 1}`}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Game
