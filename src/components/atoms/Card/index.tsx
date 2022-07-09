import React, { FC, memo } from 'react'

import './style.scss'

type Props = {
  value: number
  isHuman: boolean
}

const Card: FC<Props> = ({ value, isHuman }) => {
  return (
    <div className={`card ${isHuman ? 'human-card' : ''}`}>
      {isHuman ? value : null}
    </div>
  )
}

export default memo(Card, () => { return true })
