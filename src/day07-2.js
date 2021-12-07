import {readFileSync} from 'fs'

const {pathname} = new URL('../inputs/day07.txt', import.meta.url)
const array = readFileSync(pathname).toString().split('\n')
console.log(`Number of lines: ${array.length}`)

const positions = array[0].split(',').map(position => parseInt(position))
console.log(`Number of positions: ${positions.length}`)

const countByPosition = positions.reduce((acc, position) => {
  acc[position] = acc[position] ? acc[position] + 1 : 1

  return acc
}, [])

const distanceByPosition = new Array(countByPosition.length)
  .fill(0)
  .map((_, index) => {
    return countByPosition.reduce((acc, count, position) => {
      const distance = Math.abs(position - index)

      // 1, 3, 6, 10, 15, 21, ... = (n² + n)/2
      const algorithm = (distance * distance + distance) / 2

      acc = acc + algorithm * count
      return acc
    }, 0)
  })

console.log(Math.min(...distanceByPosition))
