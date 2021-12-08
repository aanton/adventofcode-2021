import {readFileSync} from 'fs'

const {pathname} = new URL('../inputs/day08.txt', import.meta.url)
const lines = readFileSync(pathname).toString().split('\n')

const containAllChars = function (number1, number2) {
  return number2.split('').every(char => number1.includes(char))
}

const getNumbersMap = function (words) {
  const uniqueWords = [...new Set(words).values()]

  const one = uniqueWords.find(word => word.length === 2)
  const seven = uniqueWords.find(word => word.length === 3)
  const four = uniqueWords.find(word => word.length === 4)
  const eight = uniqueWords.find(word => word.length === 7)

  const sixLengthWords = uniqueWords.filter(word => word.length === 6)
  const six = sixLengthWords.find(word => !containAllChars(word, one))
  const nine = sixLengthWords.find(word => containAllChars(word, four))
  const zero = sixLengthWords.find(word => word !== six && word !== nine)

  const fiveLengthWords = uniqueWords.filter(word => word.length === 5)
  const three = fiveLengthWords.find(word => containAllChars(word, one))
  const five = fiveLengthWords.find(word => containAllChars(six, word))
  const two = fiveLengthWords.find(word => word !== three && word !== five)

  return [zero, one, two, three, four, five, six, seven, eight, nine]
}

const getNumberByLine = function (line) {
  const words = line
    .split(' ')
    .filter(word => word !== '|')
    .map(word => {
      return word.split('').sort().join('')
    })

  const numbersMap = getNumbersMap(words)

  const number = words
    .slice(10)
    .map(word => numbersMap.indexOf(word))
    .join('')

  return parseInt(number)
}

const numbers = lines.map(getNumberByLine)

console.log(
  'Day 8 (part 2)',
  numbers.reduce((acc, value) => acc + value)
)
