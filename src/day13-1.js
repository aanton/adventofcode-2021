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
  let [direction, value] = rule.split('=')
  value = parseInt(value)

  return direction === 'y'
    ? foldVertical(points, value)
    : foldHorizontal(points, value)
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

const getUniquePointsCount = function (points) {
  return new Set(points.map(([x, y]) => `${x},${y}`)).size
}

const foldedPoints = foldByRule(points, rules[0])
const result = getUniquePointsCount(foldedPoints)

console.log('Day 13 (part 1)', result)
