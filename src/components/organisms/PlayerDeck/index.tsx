import React, { FC } from 'react'

import PlayerInfo from '../../molecules/PlayerInfo'
import PlayerCards from '../../molecules/PlayerCards'

import './style.scss'

interface PlayerItem {
  id: number
  name: string
  cards: any
  collectedCards: any
  isHumanPlayer: boolean
}

type Props = {
  className?: string
  player: PlayerItem
}

const PlayerDeck: FC<Props> = ({ className, player }) => {
  return (
    <div className={`player ${className}`}>
      <PlayerInfo player={player} />
      {player.isHumanPlayer && player.collectedCards.length > 0 && (
        <PlayerCards player={player} isCollectedCards />
      )}
      {player.cards.length > 0 && <PlayerCards player={player} />}
      {!player.isHumanPlayer && player.collectedCards.length > 0 && (
        <PlayerCards player={player} isCollectedCards />
      )}
    </div>
  )
}

export default PlayerDeck
