import {readFileSync} from 'fs'
import {calculateMagnitude, sum} from './common.js'

const {pathname} = new URL('../../inputs/day18.txt', import.meta.url)
const lines = readFileSync(pathname).toString().split('\n')

let maxMagnitude = 0
for (let i = 0; i < lines.length - 1; i++) {
  for (let j = i + 1; j < lines.length; j++) {
    const number1 = lines[i]
    const number2 = lines[j]

    const magnitude = calculateMagnitude(sum(number1, number2))
    if (magnitude > maxMagnitude) maxMagnitude = magnitude

    const magnitudeReverse = calculateMagnitude(sum(number2, number1))
    if (magnitudeReverse > maxMagnitude) maxMagnitude = magnitudeReverse
  }
}

console.log('Day 18 (part 2)', maxMagnitude)
