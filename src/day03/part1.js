import {readFileSync} from 'fs'

const {pathname} = new URL('../../inputs/day03.txt', import.meta.url)
const array = readFileSync(pathname).toString().split('\n')

const total = array.length
const gamma = Array.from({length: array[0].length})
  .map((_, index) => {
    const column = array.map(line => line[index])
    const zeroes = column.filter(digit => digit === '0').length
    const ones = total - zeroes
    return zeroes > ones ? '0' : '1'
  })
  .join('')
const epsilon = gamma
  .split('')
  .map(digit => (digit === '0' ? '1' : '0'))
  .join('')

console.log('Day 3 (part 1)', parseInt(gamma, 2) * parseInt(epsilon, 2))
