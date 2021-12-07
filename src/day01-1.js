import {readFileSync} from 'fs'

const {pathname} = new URL('../inputs/day01.txt', import.meta.url)
const array = readFileSync(pathname).toString().split('\n')

const result = array
  .map(value => parseInt(value))
  .filter((value, index, array) => {
    if (index === 0) return false
    return value > array[index - 1]
  }).length

console.log('Day 1 (part 1)', result)
