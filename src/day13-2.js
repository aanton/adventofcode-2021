import {readFileSync} from 'fs'

const {pathname} = new URL('../inputs/day13.txt', import.meta.url)
const lines = readFileSync(pathname).toString().split('\n')

const points = lines
  .filter(line => /\d+,\d+/.test(line))
  .map(line => line.split(',').map(value => parseInt(value)))
const rules = lines
  .filter(line => line.includes('fold'))
  .map(line => line.replace('fold along ', ''))

const foldByRule = function (points, rule) {
  const [direction, value] = rule.split('=')

  return direction === 'y'
    ? foldVertical(points, parseInt(value))
    : foldHorizontal(points, parseInt(value))
}

const foldVertical = function (points, value) {
  return points.map(([x, y]) => {
    return [x, y <= value ? y : value - (y - value)]
  })
}

const foldHorizontal = function (points, value) {
  return points.map(([x, y]) => {
    return [x <= value ? x : value - (x - value), y]
  })
}

const displayPoints = function (points) {
  const set = new Set(points.map(([x, y]) => `${x},${y}`))
  const uniquePoints = [...set].map(value =>
    value.split(',').map(value => parseInt(value))
  )

  const maxX = uniquePoints.reduce((max, [x, _]) => (x > max ? x : max), 0) + 1
  const maxY = uniquePoints.reduce((max, [_, y]) => (y > max ? y : max), 0) + 1

  const board = Array.from({length: maxY}).map(() => Array(maxX).fill('.'))
  uniquePoints.forEach(([x, y]) => (board[y][x] = 'X'))

  board.forEach(row => console.log(row.join('')))
}

let foldedPoints = points
rules.forEach(rule => (foldedPoints = foldByRule(foldedPoints, rule)))

console.log('Day 13 (part 2) ...')
displayPoints(foldedPoints)
