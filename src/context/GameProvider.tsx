import React, {
  createContext,
  useEffect,
  useState,
  useMemo,
  FC,
} from 'react'
import { useNavigate } from 'react-router-dom'

interface GameContextInterface {
  numberOfPlayers: number
  setNumberOfPlayers: any
}

const initState = {
  numberOfPlayers: 0,
  setNumberOfPlayers: () => {},
}

export const GameContext = createContext<GameContextInterface>(initState)

type Props = {
  children: JSX.Element
}

const GameProvider: FC<Props> = ({ children }) => {
  const navigate = useNavigate()
  const [numberOfPlayers, setNumberOfPlayers] = useState(0)

  useEffect(() => {
    if (numberOfPlayers) {
      navigate('/game')
    }
  }, [numberOfPlayers, navigate])

  const value = useMemo(
    () => ({
      numberOfPlayers,
      setNumberOfPlayers,
    }),
    [numberOfPlayers]
  )

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export default GameProvider
