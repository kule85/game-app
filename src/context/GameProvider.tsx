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
import { COMPUTER_PLAYERS, HUMAN_PLAYER, CARD_VALUE } from '../utils'

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

const initArrayState: any[] = []
const initDeckState: DeckProps = { data: null, loading: false, error: null }

interface GameContextInterface {
  players: Array<PlayerItem>
  numberOfPlayers: number
  isHumanPlay: boolean
  deckData: typeof initDeckState
  setNumberOfPlayers: any
  onChangeNumberOfPlayers: any
  onDraw: any
  onPlay: any
  onCalculateCardsValues: any
}

const initState = {
  deckData: initDeckState,
  players: [],
  numberOfPlayers: 0,
  isHumanPlay: true,
  setNumberOfPlayers: () => {},
  onChangeNumberOfPlayers: () => {},
  onDraw: () => {},
  onPlay: () => {},
  onCalculateCardsValues: () => {},
}

export const GameContext = createContext<GameContextInterface>(initState)

const GameProvider: FC<Props> = ({ children }) => {
  const navigate = useNavigate()
  const [numberOfPlayers, setNumberOfPlayers] = useState(0)
  const [players, setPlayers] = useState(initArrayState)
  const [throwCards, setThrowCards] = useState(initArrayState)
  const [deckData, setDeckData] = useState(initDeckState)
  const [isHumanPlay, setIsHumanPlay] = useState(true)

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
      setPlayers(initArrayState)
      setDeckData(initDeckState)

      return setNumberOfPlayers(value)
    },
    [setNumberOfPlayers]
  )

  const onPlay = useCallback((card: any, player: any) => {
    setIsHumanPlay(false)
    setThrowCards((prev) => {
      return [...prev, Object.assign(card, { playerId: player.id })]
    })
  }, [])

  const collectCardPerPlayer = useCallback(() => {
    const maxValueByPlayer = throwCards.reduce((prev: any, current: any) => {
      return CARD_VALUE[prev.value] > CARD_VALUE[current.value] ? prev : current
    })

    setPlayers((prev) => {
      return prev.map((item) => {
        const code = throwCards.find((el) => el.playerId === item.id)?.code

        if (item.id === maxValueByPlayer.playerId) {
          return {
            ...item,
            collectedCards: [...item.collectedCards, ...throwCards],
            cards: item.cards.filter((el: any) => el.code !== code),
          }
        }

        return {
          ...item,
          cards: item.cards.filter((el: any) => el.code !== code),
        }
      })
    })
    setIsHumanPlay(true)
    setThrowCards([])
  }, [throwCards])

  const onCalculateCardsValues = (cards: any) => {
    return cards.reduce((prev: any, current: any) => {
      return prev + CARD_VALUE[current.value]
    }, 0)
  }

  const getWinner = useCallback(() => {
    const isGameStarted =
      [].concat.apply(
        [],
        players.map((item) => item.collectedCards)
      ).length !== 0

    const isGameDone =
      [].concat.apply(
        [],
        players.map((item) => item.cards)
      ).length === 0

    if (isGameStarted && isGameDone) {
      const score = players.map((item) => {
        return {
          ...item,
          score: item.collectedCards.reduce((prev: any, current: any) => {
            return prev + CARD_VALUE[current.value]
          }, 0),
        }
      })

      const winner = score.reduce((prev, current) => {
        return prev.score > current.score ? prev : current
      })

      if (
        window.confirm(`Winner is ${winner.name}. Score is ${winner.score}`)
      ) {
        setPlayers(initArrayState)
        setDeckData(initDeckState)
        setNumberOfPlayers(0)
      }
    }
  }, [players])

  useEffect(() => {
    if (!isHumanPlay) {
      const computerPlayers = players.filter((item) => !item.isHumanPlayer)

      computerPlayers.forEach((player) => {
        const randomCard =
          player.cards[Math.floor(Math.random() * player.cards.length)]

        if (randomCard) {
          onPlay(randomCard, player)
        }
      })
    }

    getWinner()
  }, [isHumanPlay, players, onPlay, getWinner])

  useEffect(() => {
    if (numberOfPlayers > 0 && throwCards.length === numberOfPlayers) {
      collectCardPerPlayer()
    }
  }, [throwCards, numberOfPlayers, collectCardPerPlayer])

  useEffect(() => {
    if (deckData.data?.deck_id) {
      handleCards()
    }
  }, [deckData])

  useEffect(() => {
    if (numberOfPlayers) {
      const compPlayers = getRandomPlayers(
        COMPUTER_PLAYERS,
        numberOfPlayers - 1
      )

      setPlayers([...compPlayers, ...HUMAN_PLAYER])
      navigate('/game')
    }
  }, [numberOfPlayers, navigate])

  const value = useMemo(
    () => ({
      deckData,
      players,
      isHumanPlay,
      numberOfPlayers,
      setNumberOfPlayers,
      onChangeNumberOfPlayers,
      onDraw,
      onPlay,
      onCalculateCardsValues,
    }),
    [
      numberOfPlayers,
      players,
      deckData,
      isHumanPlay,
      onChangeNumberOfPlayers,
      onDraw,
      onPlay,
    ]
  )

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export default GameProvider
