import {readFileSync} from 'fs'

const {pathname} = new URL('../../inputs/day18.txt', import.meta.url)
const lines = readFileSync(pathname).toString().split('\n')

const sum = function (number1, number2) {
  return reduce(`[${number1},${number2}]`)
}

const reduce = function (number) {
  let operation
  while ((operation = getNextOperation(number))) {
    if (operation.type === 'split') {
      number = split(number, operation)
    } else {
      number = explode(number, operation)
    }
  }

  return number
}

const getNextOperation = function (number) {
  let openBrackets = 0
  for (let i = 0; i < number.length - 1; i++) {
    if (number[i] === '[' && openBrackets === 4) {
      return {type: 'explode', index: i}
    }

    if (number[i] === '[') openBrackets++
    if (number[i] === ']') openBrackets--
  }

  for (let i = 0; i < number.length - 1; i++) {
    if (!isNaN(number[i]) && !isNaN(number[i + 1])) {
      return {type: 'split', index: i}
    }
  }

  return null
}

const split = function (number, operation) {
  const valueStr = getNextNumber(number, operation.index)
  const value = parseInt(valueStr)
  const pair = `[${Math.floor(value / 2)},${Math.ceil(value / 2)}]`

  return (
    number.substring(0, operation.index) +
    pair +
    number.substring(operation.index + valueStr.length)
  )
}

const explode = function (number, operation) {
  const nextCloseIndex = getNextCloseIndex(number, operation.index + 1)
  const pair = number.slice(operation.index + 1, nextCloseIndex)
  const [left, right] = pair.split(',').map(value => parseInt(value))

  const nextNumberIndex = getNextNumberIndex(number, nextCloseIndex + 1)
  if (nextNumberIndex !== -1) {
    const nextNumberStr = getNextNumber(number, nextNumberIndex)
    const nextNumber = parseInt(nextNumberStr)
    number =
      number.substring(0, nextNumberIndex) +
      (nextNumber + right) +
      number.substring(nextNumberIndex + nextNumberStr.length)
  }

  number =
    number.slice(0, operation.index) + '0' + number.slice(nextCloseIndex + 1)

  const prevNumberIndex = getPrevNumberIndex(number, operation.index - 1)
  if (prevNumberIndex !== -1) {
    const prevNumberStr = getPrevNumber(number, prevNumberIndex)
    const prevNumber = parseInt(prevNumberStr)
    number =
      number.substring(0, prevNumberIndex - prevNumberStr.length + 1) +
      (prevNumber + left) +
      number.substring(prevNumberIndex + 1)
  }

  return number
}

const getNextCloseIndex = function (number, startIndex) {
  for (let i = startIndex; i < number.length; i++) {
    if (number[i] === ']') return i
  }
}

const getPrevNumberIndex = function (number, startIndex) {
  for (let i = startIndex; i > 0; i--) {
    if (!isNaN(number[i])) return i
  }

  return -1
}

const getNextNumberIndex = function (number, startIndex) {
  for (let i = startIndex; i < number.length - 1; i++) {
    if (!isNaN(number[i])) return i
  }

  return -1
}

const getPrevNumber = function (number, startIndex) {
  let value = ''
  for (let i = startIndex; i > 0; i--) {
    if (isNaN(number[i])) return value

    value = number[i] + value
  }
}

const getNextNumber = function (number, startIndex) {
  let value = ''
  for (let i = startIndex; i < number.length - 1; i++) {
    if (isNaN(number[i])) return value

    value = value + number[i]
  }
}

const getNextPairIndex = function (number) {
  const match = /\[\d+,\d+]/.exec(number)
  return match ? match.index : null
}

const calculateMagnitude = function (number) {
  let startIndex
  while ((startIndex = getNextPairIndex(number)) !== null) {
    const closeIndex = getNextCloseIndex(number, startIndex + 1)
    const pair = number.slice(startIndex + 1, closeIndex)
    const [left, right] = pair.split(',').map(value => parseInt(value))

    const value = left * 3 + right * 2
    number = number.slice(0, startIndex) + value + number.slice(closeIndex + 1)
  }

  return number
}

let number = lines[0]
lines.slice(1).forEach(line => {
  number = sum(number, line)
})

console.log('Day 18 (part 1)', calculateMagnitude(number))
