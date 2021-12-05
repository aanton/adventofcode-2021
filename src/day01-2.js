import {readFileSync} from 'fs'

const {pathname} = new URL('../inputs/day01.txt', import.meta.url)
const array = readFileSync(pathname).toString().split('\n')

console.log(`Number of lines: ${array.length}`)

const result = array
  .map(value => parseInt(value))
  .filter((value, index, array) => {
    if (index < 3) return false

    const current = array[index] + array[index - 1] + array[index - 2]
    const previous = array[index - 1] + array[index - 2] + array[index - 3]

    return current > previous
  }).length

console.log(result)
