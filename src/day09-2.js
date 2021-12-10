import {readFileSync} from 'fs'

const {pathname} = new URL('../inputs/day09.txt', import.meta.url)
const lines = readFileSync(pathname).toString().split('\n')

const iLast = lines.length - 1
const jLast = lines[0].length - 1

const getLowPoints = function () {
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
        points.push([i, j])
      }
    }
  }

  return points
}

const isValidPoint = function ([i, j]) {
  return lines[i]?.[j] !== undefined && lines[i][j] !== '9'
}

const isPointInList = function ([i, j], points) {
  return points.some(point => i === point[0] && j === point[1])
}

const getNeighborsPoints = function ([i, j]) {
  return [
    [i - 1, j],
    [i + 1, j],
    [i, j - 1],
    [i, j + 1],
  ].filter(isValidPoint)
}

const getBasinSizeByPoint = function (point, excluded = []) {
  const neighbors = getNeighborsPoints(point)
  excluded.push(point)

  let size = 1
  neighbors.forEach(neighbour => {
    if (isPointInList(neighbour, excluded)) return
    size += getBasinSizeByPoint(neighbour, excluded)
  })

  return size
}

const lowPoints = getLowPoints()
console.log('Low points', lowPoints)

const basinSizes = lowPoints.map(point => getBasinSizeByPoint(point))
console.log('Basin sizes', basinSizes)

const result = basinSizes
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((a, b) => a * b)
console.log('Day 9 (part 2)', result)
