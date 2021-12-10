import {readFileSync} from 'fs'

const {pathname} = new URL('../inputs/day09.txt', import.meta.url)
const lines = readFileSync(pathname).toString().split('\n')

const iLast = lines.length - 1
const jLast = lines[0].length - 1

const getLowPointsHeight = function () {
  const points = []

  for (let i = 0; i <= iLast; i++) {
    for (let j = 0; j <= jLast; j++) {
      const height = lines[i][j]

      if (
        (i === 0 || height < lines[i - 1][j]) &&
        (i === iLast || height < lines[i + 1][j]) &&
        (j === 0 || height < lines[i][j - 1]) &&
        (j === jLast || height < lines[i][j + 1])
      ) {
        points.push(height)
      }
    }
  }

  return points
}

const lowPointsHeight = getLowPointsHeight()
console.log('Low points', lowPointsHeight.length)

const riskLevel = lowPointsHeight
  .map(height => parseInt(height) + 1)
  .reduce((a, b) => a + b)

console.log('Day 9 (part 1)', riskLevel)
