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
  return (i >= 0) & (i <= iLast) && j >= 0 && j <= jLast && lines[i][j] !== '9'
}

const isIncluded = function (point, points) {
  return points.some(_point => point[0] === _point[0] && point[1] === _point[1])
}

const getBasinSizeByPoint = function (point, excluded = []) {
  const [i, j] = point
  const top = [i - 1, j]
  const bottom = [i + 1, j]
  const left = [i, j - 1]
  const right = [i, j + 1]

  excluded.push(point)

  let size = 1
  if (isValidPoint(top) && !isIncluded(top, excluded))
    size += getBasinSizeByPoint(top, excluded)
  if (isValidPoint(bottom) && !isIncluded(bottom, excluded))
    size += getBasinSizeByPoint(bottom, excluded)
  if (isValidPoint(left) && !isIncluded(left, excluded))
    size += getBasinSizeByPoint(left, excluded)
  if (isValidPoint(right) && !isIncluded(right, excluded))
    size += getBasinSizeByPoint(right, excluded)

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
