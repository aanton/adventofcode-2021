import {readFileSync} from 'fs'

const {pathname} = new URL('../inputs/day14.txt', import.meta.url)
const lines = readFileSync(pathname).toString().split('\n')

const template = lines[0]
const rules = Object.fromEntries(lines.slice(2).map(line => line.split(' -> ')))

const updateTemplate = function (template) {
  return template
    .split('')
    .map((char, index, array) => {
      const nextChar = array[index + 1] || false
      return char + (nextChar ? rules[`${char}${nextChar}`] : '')
    })
    .join('')
}

const getCharsMap = function (template) {
  return template.split('').reduce((acc, char) => {
    acc[char] = (acc[char] || 0) + 1

    return acc
  }, {})
}

let liveTemplate = template
for (let step = 1; step <= 10; step++) {
  liveTemplate = updateTemplate(liveTemplate)
}

const sortedChars = Object.entries(getCharsMap(liveTemplate)).sort(
  (a, b) => a[1] - b[1]
)
console.log(sortedChars)

const result = sortedChars[sortedChars.length - 1][1] - sortedChars[0][1]
console.log('Day 14 (part 1)', result)
