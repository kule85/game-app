export const getRandomPlayers = (players: object[], num: number) => {
  const shuffled = [...players].sort(() => 0.5 - Math.random())

  return shuffled.slice(0, num)
}
