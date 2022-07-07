import React, { FC, useEffect, useState } from 'react'

import { useAuth } from '../../../hooks/'
import { getRandomPlayers } from '../../../helper'
import { COMPUTER_PLAYERS, HUMAN_PLAYER } from '../../../utils'

const Game: FC = () => {
  const { numberOfPlayers } = useAuth()
  const compPlayers = getRandomPlayers(COMPUTER_PLAYERS, numberOfPlayers - 1)
  const [players, setPlayers] = useState([...compPlayers, ...HUMAN_PLAYER])

  console.log(players)

  return <div id="game"></div>
}

export default Game
