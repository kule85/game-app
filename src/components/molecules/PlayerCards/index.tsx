import React, { FC } from 'react'

import Card from '../../atoms/Card'

import './style.scss'

type Props = {
  cards: []
  isHuman: boolean
}

const PlayerCards: FC<Props> = ({ cards, isHuman }) => {
  return (
    <div className="card-holder">
      {cards.map((card, key) => {
        return <Card key={key} card={card} isHuman={isHuman} />
      })}
    </div>
  )
}

export default PlayerCards
