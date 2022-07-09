import React, { FC, useEffect, useState, useCallback } from 'react'

import CustomSelect from '../../atoms/CustomSelect'
import CustomButton from '../../atoms/CustomButton'
import Notification from '../../atoms/Notification'
import Loader from '../../atoms/Loader'
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
const initDeckState: DeckProps = { data: null, loading: false, error: null }

const Game: FC = () => {
  const { numberOfPlayers, setNumberOfPlayers } = useAuth()
  const [players, setPlayers] = useState(initPlayersState)
  const [deckData, setDeckData] = useState(initDeckState)

  const { doRequest: getPlayerDeck } = useRequest({
    url: 'deck/new/shuffle/?deck_count=1',
    method: 'get',
    callback: (response: any) => setDeckData(response),
  })

  const { doRequest: getPlayerCards } = useRequest({
    url: `deck/${deckData.data?.deck_id}/draw/?count=${numberOfPlayers * 10}`,
    method: 'get',
    callback: (response: any) => {
      const cardsRes = response?.data?.cards

      if (cardsRes) {
        setPlayers(
          players.map((item, key) => {
            return {
              ...item,
              cards: cardsRes.slice(key * 10, (key + 1) * 10),
            }
          })
        )
      }
    },
  })

  const handleDraw = useCallback(
    async () => await getPlayerDeck(),
    [getPlayerDeck]
  )

  const handleCards = useCallback(async () => {
    await getPlayerCards()
  }, [getPlayerCards])

  const handleChangeNumberOfPlayers = useCallback(
    (value: number) => {
      setPlayers(initPlayersState)
      setDeckData(initDeckState)

      return setNumberOfPlayers(value)
    },
    [setNumberOfPlayers]
  )

  useEffect(() => {
    const compPlayers = getRandomPlayers(COMPUTER_PLAYERS, numberOfPlayers - 1)

    setPlayers([...compPlayers, ...HUMAN_PLAYER])
  }, [numberOfPlayers])

  useEffect(() => {
    if (deckData.data?.deck_id) {
      handleCards()
    }
  }, [deckData])

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

  if (deckData?.loading) {
    return <Loader />
  }

  return (
    <div id="game">
      {deckData?.error && (
        <Notification type="error" message={deckData?.error?.statusText} />
      )}
      <CustomSelect
        name="players"
        label="Number of players"
        className="select-players"
        options={SELECT_PLAYER_OPTIONS}
        value={numberOfPlayers}
        onChange={(name, value) => handleChangeNumberOfPlayers(value)}
      />
      <div className={`wrapper ${getCustomWrapperClass()}`}>
        {!deckData.data && (
          <CustomButton
            label="Draw"
            variant="contained"
            onClick={() => handleDraw()}
          />
        )}
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
