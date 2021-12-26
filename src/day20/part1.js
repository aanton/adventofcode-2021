import {readFileSync} from 'fs'
import {convertImage, displayImage} from './common.js'

const {pathname} = new URL('../../inputs/day20.txt', import.meta.url)
const lines = readFileSync(pathname).toString().split('\n')

const algorithm = lines[0]
let image = lines.slice(2)

image = convertImage(image, algorithm)
image = convertImage(image, algorithm, algorithm[0])
displayImage(image)

const result = image.reduce((acc, row) => {
  return acc + row.split('').filter(char => char === '#').length
}, 0)

console.log('Day 20 (part 1)', result)
