import {readFileSync} from 'fs'

const {pathname} = new URL('../../inputs/day06.txt', import.meta.url)
const array = readFileSync(pathname).toString().split('\n')

const fishes = array[0].split(',').map(fish => parseInt(fish))

const countFishes = function (fishes, days) {
  let fishesByAge = new Array(9).fill(0)

  fishes.forEach(age => (fishesByAge[age] += 1))

  for (let i = 0; i < days; i++) {
    const [age0, age1, age2, ag3, age4, age5, age6, age7, age8] = fishesByAge
    fishesByAge = [age1, age2, ag3, age4, age5, age6, age7 + age0, age8, age0]
  }

  return fishesByAge.reduce((acc, value) => acc + value, 0)
}

console.log('Day 6 (part 1: 80 days)', countFishes(fishes, 80))
