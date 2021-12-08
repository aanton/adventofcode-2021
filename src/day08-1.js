import {readFileSync} from 'fs'

const {pathname} = new URL('../inputs/day08.txt', import.meta.url)
const lines = readFileSync(pathname).toString().split('\n')

const result = lines.reduce((acc, value) => {
  const count = value
    .split(' ')
    .slice(11)
    .filter(word => [2, 3, 4, 7].includes(word.length)).length

  return acc + count
}, 0)

console.log('Day 8 (part 1)', result)
