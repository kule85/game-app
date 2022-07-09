import React, { FC, memo } from 'react'

import Card from '../../atoms/Card'

import './style.scss'

type Props = {
  cards: []
  isHuman: boolean
}

const PlayerCards: FC<Props> = ({ cards, isHuman }) => {
  return (
    <div className="card-holder">
      {cards.map((card: number, key: number) => {
        return <Card key={key} value={card} isHuman={isHuman} />
      })}
    </div>
  )
}

export default memo(PlayerCards)
