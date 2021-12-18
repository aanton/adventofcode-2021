import {readFileSync} from 'fs'

const {pathname} = new URL('../../inputs/day17.txt', import.meta.url)
const lines = readFileSync(pathname).toString().split('\n')

const re = /target area: x=(\d+)\.\.(\d+), y=(-\d+)\.\.(-\d+)/
let [, x1, x2, y1, y2] = lines[0].match(re)
;[x1, x2, y1, y2] = [x1, x2, y1, y2].map(value => parseInt(value))
console.log({x1, x2, y1, y2})

// y-velocity is y1 - 1, but we use y1 because of z-index arrays
const yHeight = [...Array(Math.abs(y1))].reduce(
  (acc, _, index) => acc + index,
  0
)

console.log('Day 17 (part 1)', yHeight)
