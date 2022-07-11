import React, { FC } from 'react'

import Card from '../../atoms/Card'

import './style.scss'

interface PlayerItem {
  id: number
  name: string
  cards: any
  collectedCards: any
  isHumanPlayer: boolean
}

type Props = {
  player: PlayerItem
  isCollectedCards?: boolean
}

const PlayerCards: FC<Props> = ({ player, isCollectedCards = false }) => {
  const cards = !isCollectedCards ? player?.cards : player?.collectedCards

  return (
    <div
      className={`card-holder ${isCollectedCards ? 'collect-card-holder' : ''}`}
    >
      {cards.map((card: any, key: number) => {
        return <Card key={key} card={card} player={player} />
      })}
    </div>
  )
}

export default PlayerCards
