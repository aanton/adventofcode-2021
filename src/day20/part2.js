import {readFileSync} from 'fs'
import {convertImage} from './common.js'

const {pathname} = new URL('../../inputs/day20.txt', import.meta.url)
const lines = readFileSync(pathname).toString().split('\n')

const algorithm = lines[0]
let image = lines.slice(2)

const oddChar = algorithm[0]
const evenChar = algorithm[0] === '.' ? '.' : algorithm[511]

Array.from({length: 50}).forEach((_, index) => {
  const defaultChar = index === 0 ? '.' : index % 2 === 1 ? oddChar : evenChar
  image = convertImage(image, algorithm, defaultChar)
})

const result = image.reduce((acc, row) => {
  return acc + row.split('').filter(char => char === '#').length
}, 0)

console.log('Day 20 (part 2)', result)
