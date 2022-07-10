import { useContext } from 'react'
import { GameContext } from '../context/GameProvider'

export const useGame = () => {
  return useContext(GameContext)
}
