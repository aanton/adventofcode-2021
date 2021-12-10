import {readFileSync} from 'fs'

const {pathname} = new URL('../inputs/day10.txt', import.meta.url)
const lines = readFileSync(pathname).toString().split('\n')

const DELIMITERS = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
}

const POINTS_BY_DELIMITER = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
}

const getMissingCharacters = function (line) {
  const sequence = []

  for (const char of line.split('')) {
    if (DELIMITERS[char]) {
      sequence.push(char)
      continue
    }

    const lastOpenChar = sequence.pop()
    if (DELIMITERS[lastOpenChar] === char) {
      continue
    }

    return false
  }

  return sequence.reverse().map(char => DELIMITERS[char])
}

const points = lines
  .map(getMissingCharacters)
  .filter(Boolean)
  .map(characters =>
    characters.reduce((acc, char) => 5 * acc + POINTS_BY_DELIMITER[char], 0)
  )
  .sort((a, b) => a - b)

const result = points[Math.floor(points.length / 2)]

console.log('Day 10 (part 2)', result)
