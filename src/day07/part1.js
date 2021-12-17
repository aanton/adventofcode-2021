import {readFileSync} from 'fs'

const {pathname} = new URL('../../inputs/day07.txt', import.meta.url)
const array = readFileSync(pathname).toString().split('\n')

const positions = array[0].split(',').map(position => parseInt(position))

const countByPosition = positions.reduce((acc, position) => {
  acc[position] = acc[position] ? acc[position] + 1 : 1

  return acc
}, [])

const distanceByPosition = new Array(countByPosition.length)
  .fill(0)
  .map((_, index) => {
    return countByPosition.reduce((acc, count, position) => {
      const distance = Math.abs(position - index)
      acc = acc + distance * count
      return acc
    }, 0)
  })

console.log('Day 7 (part 1)', Math.min(...distanceByPosition))
