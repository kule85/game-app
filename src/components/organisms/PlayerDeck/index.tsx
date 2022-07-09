import React, { FC } from 'react'

import PlayerInfo from '../../molecules/PlayerInfo'
import PlayerCards from '../../molecules/PlayerCards'

import './style.scss'

type Props = {
  className?: string
  player: {
    name: string
    isHumanPlayer: boolean
    cards: []
  }
}

const PlayerDeck: FC<Props> = ({ className, player }) => {
  return (
    <div className={`player ${className}`}>
      <PlayerInfo playerName={player.name} playerScore={0} />
      {player.cards.length > 0 && (
        <PlayerCards cards={player.cards} isHuman={player.isHumanPlayer} />
      )}
    </div>
  )
}

export default PlayerDeck
