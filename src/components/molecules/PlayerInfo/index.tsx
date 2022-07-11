import React, { FC, memo } from 'react'
import { useGame } from '../../../hooks'

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
}

const PlayerInfo: FC<Props> = ({ player }) => {
  const { onCalculateCardsValues } = useGame()

  return (
    <>
      <h4>{player.name}</h4>
      <p>Score: {onCalculateCardsValues(player.collectedCards)}</p>
    </>
  )
}

export default memo(PlayerInfo, (prevProps, nextProps) => {
  return (
    prevProps.player.collectedCards.length ===
    nextProps.player.collectedCards.length
  )
})
