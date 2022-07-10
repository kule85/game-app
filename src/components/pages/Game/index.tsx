import React, { FC, useEffect, useState, useCallback } from 'react'

import CustomSelect from '../../atoms/CustomSelect'
import CustomButton from '../../atoms/CustomButton'
import Notification from '../../atoms/Notification'
import Loader from '../../atoms/Loader'
import PlayerDeck from '../../organisms/PlayerDeck'

import { useGame } from '../../../hooks/'
import { SELECT_PLAYER_OPTIONS } from '../../../utils'

import './style.scss'

const Game: FC = () => {
  const {
    players,
    deckData,
    numberOfPlayers,
    onChangeNumberOfPlayers,
    onDraw,
  } = useGame()

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
        onChange={(name, value) => onChangeNumberOfPlayers(value)}
      />
      <div className={`wrapper ${getCustomWrapperClass()}`}>
        {!deckData.data && (
          <CustomButton
            label="Draw"
            variant="contained"
            onClick={() => onDraw()}
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
