interface PlayerItem {
  name: string
  cards: any
  collectedCards: any
  isHumanPlayer: boolean
}

export const getRandomPlayers = (players: PlayerItem[], num: number) => {
  const shuffled = [...players].sort(() => 0.5 - Math.random())

  return shuffled.slice(0, num)
}
