import {readFileSync} from 'fs'

const {pathname} = new URL('../inputs/day02.txt', import.meta.url)
const array = readFileSync(pathname).toString().split('\n')

console.log(`Number of lines: ${array.length}`)

const result = array.reduce(
  (acc, line) => {
    let [direction, value] = line.split(/\s/)
    value = parseInt(value)

    if (direction === 'forward') {
      acc.x += value
      acc.depth += acc.aim * value
    }
    if (direction === 'down') acc.aim += value
    if (direction === 'up') acc.aim -= value

    return acc
  },
  {x: 0, depth: 0, aim: 0}
)

console.log(result)
console.log(result.x * result.depth)
