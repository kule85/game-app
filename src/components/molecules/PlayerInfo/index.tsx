import React, { FC, memo } from 'react'

import './style.scss'

type Props = {
  playerName: string
  playerScore: string | number
}

const PlayerInfo: FC<Props> = ({ playerName, playerScore }) => {
  return (
    <>
      <h4>{playerName}</h4>
      <p>Score: {playerScore}</p>
    </>
  )
}

export default memo(PlayerInfo, (prevProps, nextProps) => {
  return prevProps.playerScore === nextProps.playerScore
})
