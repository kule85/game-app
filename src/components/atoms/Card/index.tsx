import React, { FC, memo } from 'react'

import { useGame } from '../../../hooks'

import './style.scss'

type Props = {
  card: {
    image: string
  }
  player: {
    isHumanPlayer: boolean
  }
}

const Card: FC<Props> = ({ card, player }) => {
  const { isHumanPlay, onPlay } = useGame()

  return (
    <div
      className={`card ${player.isHumanPlayer ? 'human-card' : ''}`}
      onClick={() => (isHumanPlay ? onPlay(card, player) : {})}
    >
      <img src={card.image} alt="Card" />
    </div>
  )
}

export default memo(Card, () => {
  return true
})
