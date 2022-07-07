import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  FC,
} from 'react'
import { useNavigate } from 'react-router-dom'

interface AuthContextInterface {
  numberOfPlayers: number
  setNumberOfPlayers: any
}

const initState = {
  numberOfPlayers: 0,
  setNumberOfPlayers: () => {},
}

export const AuthContext = createContext<AuthContextInterface>(initState)

type Props = {
  children: JSX.Element
}

const AuthProvider: FC<Props> = ({ children }) => {
  const navigate = useNavigate()
  const [numberOfPlayers, setNumberOfPlayers] = useState(0)

  useEffect(() => {
    if (numberOfPlayers) {
      navigate('/game')
    }
  }, [numberOfPlayers])

  const value = useMemo(
    () => ({
      numberOfPlayers,
      setNumberOfPlayers,
    }),
    [numberOfPlayers]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
