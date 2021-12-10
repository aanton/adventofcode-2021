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
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

const getInvalidCharacter = function (line) {
  const sequence = []

  for (const char of line.split('')) {
    if (DELIMITERS[char]) {
      sequence.push(char)
      continue
    }

    const lastOpen = sequence.pop()
    if (DELIMITERS[lastOpen] === char) {
      continue
    }

    return char
  }

  return false
}

const result = lines
  .map(getInvalidCharacter)
  .filter(Boolean)
  .reduce((acc, char) => acc + POINTS_BY_DELIMITER[char], 0)

console.log('Day 10 (part 1)', result)
