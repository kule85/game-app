import React, {
  createContext,
  useEffect,
  useState,
  useMemo,
  FC,
  useCallback,
} from 'react'
import { useNavigate } from 'react-router-dom'

import { useRequest } from '../hooks'
import { getRandomPlayers } from '../helper'
import { COMPUTER_PLAYERS, HUMAN_PLAYER } from '../utils'

interface PlayerItem {
  id: number
  name: string
  cards: any
  collectedCards: any
  isHumanPlayer: boolean
}

type Props = {
  children: JSX.Element
}

type DeckProps = {
  data: any
  loading: boolean
  error: any
}

const initPlayersState: any[] = []
const initDeckState: DeckProps = { data: null, loading: false, error: null }

interface GameContextInterface {
  players: Array<PlayerItem>
  numberOfPlayers: number
  deckData: typeof initDeckState
  setNumberOfPlayers: any
  onChangeNumberOfPlayers: any
  onDraw: any
}

const initState = {
  deckData: initDeckState,
  players: [],
  numberOfPlayers: 0,
  setNumberOfPlayers: () => {},
  onChangeNumberOfPlayers: () => {},
  onDraw: () => {},
}

export const GameContext = createContext<GameContextInterface>(initState)

const GameProvider: FC<Props> = ({ children }) => {
  const navigate = useNavigate()
  const [numberOfPlayers, setNumberOfPlayers] = useState(0)
  const [players, setPlayers] = useState(initPlayersState)
  const [deckData, setDeckData] = useState(initDeckState)

  const { doRequest: getPlayerDeck } = useRequest({
    url: 'deck/new/shuffle/?deck_count=1',
    method: 'get',
    callback: (response: any) => setDeckData(response),
  })

  const { doRequest: getPlayerCards } = useRequest({
    url: `deck/${deckData.data?.deck_id}/draw/?count=${numberOfPlayers * 10}`,
    method: 'get',
    callback: (response: any) => {
      const cardsRes = response?.data?.cards

      if (cardsRes) {
        setPlayers(
          players.map((item, key) => {
            return {
              ...item,
              cards: cardsRes.slice(key * 10, (key + 1) * 10),
            }
          })
        )
      }
    },
  })

  const onDraw = useCallback(async () => await getPlayerDeck(), [getPlayerDeck])

  const handleCards = useCallback(async () => {
    await getPlayerCards()
  }, [getPlayerCards])

  const onChangeNumberOfPlayers = useCallback(
    (value: number) => {
      setPlayers(initPlayersState)
      setDeckData(initDeckState)

      return setNumberOfPlayers(value)
    },
    [setNumberOfPlayers]
  )

  useEffect(() => {
    if (deckData.data?.deck_id) {
      handleCards()
    }
  }, [deckData])

  useEffect(() => {
    const compPlayers = getRandomPlayers(COMPUTER_PLAYERS, numberOfPlayers - 1)

    setPlayers([...compPlayers, ...HUMAN_PLAYER])

    if (numberOfPlayers) {
      navigate('/game')
    }
  }, [numberOfPlayers, navigate])

  const value = useMemo(
    () => ({
      deckData,
      players,
      numberOfPlayers,
      setNumberOfPlayers,
      onChangeNumberOfPlayers,
      onDraw,
    }),
    [numberOfPlayers, players, deckData]
  )

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export default GameProvider
