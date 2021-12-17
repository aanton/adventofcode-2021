import {readFileSync} from 'fs'

const {pathname} = new URL('../../inputs/day14.txt', import.meta.url)
const lines = readFileSync(pathname).toString().split('\n')

const template = lines[0]
// Each rule match a pair with the two new pairs created using the insertion character
const rules = Object.fromEntries(
  lines
    .slice(2)
    .map(line => line.split(' -> '))
    .map(([pair, insertion]) => {
      const startChar = pair[0]
      const endChar = pair[1]
      return [pair, [`${startChar}${insertion}`, `${insertion}${endChar}`]]
    })
)

const getLiveMapFromTemplate = function (template) {
  return template.split('').reduce((acc, char, index, array) => {
    const nextChar = array[index + 1] || false
    if (!nextChar) return acc

    const pair = `${char}${nextChar}`
    acc[pair] = (acc[pair] || 0) + 1

    return acc
  }, {})
}

const updateLiveMap = function (map) {
  return Object.entries(map).reduce((acc, [pair, count]) => {
    rules[pair].forEach(newPair => {
      acc[newPair] = (acc[newPair] || 0) + count
    })

    return acc
  }, {})
}

const getCharsMap = function (map) {
  // Use only the first character of each pair
  const charsMap = Object.entries(map).reduce((acc, [pair, count]) => {
    const startChar = pair[0]
    acc[startChar] = (acc[startChar] || 0) + count

    return acc
  }, {})

  // And include the last character in the template (because it never can be the first character in a pair)
  const lastTemplateChar = template.slice(-1)
  charsMap[lastTemplateChar] = (charsMap[lastTemplateChar] || 0) + 1

  return charsMap
}

let liveMap = getLiveMapFromTemplate(template)
for (let step = 1; step <= 40; step++) {
  liveMap = updateLiveMap(liveMap)
}

const sortedChars = Object.entries(getCharsMap(liveMap)).sort(
  (a, b) => a[1] - b[1]
)
console.log(sortedChars)

const result = sortedChars[sortedChars.length - 1][1] - sortedChars[0][1]
console.log('Day 14 (part 2)', result)
