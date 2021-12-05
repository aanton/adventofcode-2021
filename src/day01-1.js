import {readFileSync} from 'fs'

const {pathname} = new URL('../inputs/day01.txt', import.meta.url)
const array = readFileSync(pathname).toString().split('\n')

console.log(`Number of lines: ${array.length}`)

const result = array
  .map(value => parseInt(value))
  .filter((value, index, array) => {
    if (index === 0) return false
    return value > array[index - 1]
  }).length

console.log(result)
