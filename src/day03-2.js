import {readFileSync} from 'fs'

const {pathname} = new URL('../inputs/day03.txt', import.meta.url)
const array = readFileSync(pathname).toString().split('\n')

const getMostCommonDigit = function (array, index) {
  const total = array.length
  const zeroes = array
    .map(value => value[index])
    .filter(digit => digit === '0').length
  const ones = total - zeroes
  return ones >= zeroes ? '1' : '0'
}

const getLeastCommonDigit = function (array, index) {
  const mostCommonDigit = getMostCommonDigit(array, index)
  return mostCommonDigit === '1' ? '0' : '1'
}

const getOxygenRating = function (array, index) {
  const digit = getMostCommonDigit(array, index)
  const filteredArray = array.filter(value => value[index] === digit)

  return filteredArray.length === 1
    ? filteredArray[0]
    : getOxygenRating(filteredArray, index + 1)
}

const getCO2Rating = function (array, index) {
  const digit = getLeastCommonDigit(array, index)
  const filteredArray = array.filter(value => value[index] === digit)

  return filteredArray.length === 1
    ? filteredArray[0]
    : getCO2Rating(filteredArray, index + 1)
}

const oxygenRating = parseInt(getOxygenRating(array, 0), 2)
const CO2Rating = parseInt(getCO2Rating(array, 0), 2)

console.log('Day 3 (part 2)', oxygenRating * CO2Rating)
