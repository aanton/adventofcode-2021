import {readFileSync} from 'fs'

const {pathname} = new URL('../../inputs/day17.txt', import.meta.url)
const lines = readFileSync(pathname).toString().split('\n')

const re = /target area: x=(\d+)\.\.(\d+), y=(-\d+)\.\.(-\d+)/
let [, x1, x2, y1, y2] = lines[0].match(re)
;[x1, x2, y1, y2] = [x1, x2, y1, y2].map(value => parseInt(value))
console.log({x1, x2, y1, y2})

const isVelocityHittingTarget = function (xSpeed, ySpeed, target) {
  const point = {x: xSpeed, y: ySpeed}

  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (isPointInTarget(point, target)) return true

    if (xSpeed === 0 && point.x < target.x1) return false
    if (point.x > target.x2 || point.y < target.y1) return false

    xSpeed = xSpeed > 1 ? xSpeed - 1 : 0
    ySpeed = ySpeed - 1

    point.x += xSpeed
    point.y += ySpeed
  }
}

const isPointInTarget = function (point, target) {
  return (
    point.x >= target.x1 &&
    point.x <= target.x2 &&
    point.y >= target.y1 &&
    point.y <= target.y2
  )
}

const getOneStepSpeeds = function ({x1, x2, y1, y2}) {
  return (x2 - x1 + 1) * (y2 - y1 + 1)
}

const getMultipleStepsSpeeds = function (target) {
  let count = 0

  const xMinSpeed = 1
  const xMaxSpeed = Math.ceil(target.x2 / 2)
  const yMinSpeed = target.y2 + 1
  const yMaxSpeed = Math.abs(target.y1) - 1

  for (let xSpeed = xMinSpeed; xSpeed <= xMaxSpeed; xSpeed++) {
    for (let ySpeed = yMinSpeed; ySpeed <= yMaxSpeed; ySpeed++) {
      count += isVelocityHittingTarget(xSpeed, ySpeed, target) ? 1 : 0
    }
  }

  return count
}

const target = {x1, x2, y1, y2}
const result = getOneStepSpeeds(target) + getMultipleStepsSpeeds(target)

console.log('Day 17 (part 2)', result)
