import {readFileSync} from 'fs'

const {pathname} = new URL('../../inputs/day05.txt', import.meta.url)
const array = readFileSync(pathname).toString().split('\n')

const getTotalPoints = function (array, excludeDiagonalLines) {
  const points = new Map()

  array.forEach(line => {
    const matches = line.match(/^(\d+),(\d+) -> (\d+),(\d+)$/)
    const [x1, y1, x2, y2] = matches.slice(1).map(value => parseInt(value))

    if (excludeDiagonalLines && x1 !== x2 && y1 !== y2) return

    const xIncrement = x1 === x2 ? 0 : x1 > x2 ? -1 : 1
    const yIncrement = y1 === y2 ? 0 : y1 > y2 ? -1 : 1
    const count = Math.abs(x1 !== x2 ? x1 - x2 : y1 - y2)
    for (let i = 0, x = x1, y = y1; i <= count; i++) {
      const value = `${x}-${y}`
      points.set(value, points.has(value) ? points.get(value) + 1 : 1)

      x += xIncrement
      y += yIncrement
    }
  })

  return [...points.values()].filter(value => value >= 2).length
}

console.log('Day 5 (part 1: wout diagonal lines)', getTotalPoints(array, true))
