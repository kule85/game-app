import React, { FC, memo } from 'react'

import './style.scss'

type Props = {
  card: {
    image: string
  }
  isHuman: boolean
}

const Card: FC<Props> = ({ card, isHuman }) => {
  return (
    <div className={`card ${isHuman ? 'human-card' : ''}`}>
      <img src={card.image} alt="Card" />
    </div>
  )
}

export default memo(Card, () => {
  return true
})
