import {readFileSync} from 'fs'
import {calculateMagnitude, sum} from './common.js'

const {pathname} = new URL('../../inputs/day18.txt', import.meta.url)
const lines = readFileSync(pathname).toString().split('\n')

let number = lines[0]
lines.slice(1).forEach(line => {
  number = sum(number, line)
})

console.log('Day 18 (part 1)', calculateMagnitude(number))
