import {readFileSync} from 'fs'

const {pathname} = new URL('../inputs/day11.txt', import.meta.url)
const lines = readFileSync(pathname).toString().split('\n')

const board = lines.map(line => line.split('').map(value => parseInt(value)))

const getFlashPoints = function () {
  const points = []

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (board[i][j] >= 10) points.push([i, j])
    }
  }

  return points
}

const getValidNeighbors = function ([i, j]) {
  return [
    [i - 1, j - 1],
    [i - 1, j],
    [i - 1, j + 1],
    [i, j - 1],
    [i, j + 1],
    [i + 1, j - 1],
    [i + 1, j],
    [i + 1, j + 1],
  ].filter(([i, j]) => board[i]?.[j] !== undefined && board[i]?.[j] !== 0)
}

const updateFlashPointAndNeighbors = function ([i, j]) {
  board[i][j] = 0
  getValidNeighbors([i, j]).forEach(([i, j]) => (board[i][j] += 1))
}

const updateBoard = function () {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      board[i][j] += 1
    }
  }

  let flashPoints = getFlashPoints()
  while (flashPoints.length > 0) {
    flashPoints.forEach(updateFlashPointAndNeighbors)

    flashPoints = getFlashPoints()
  }
}

const areAllPointsFlashing = function () {
  return board.reduce((a, b) => a + b.reduce((a, b) => a + b, 0), 0) === 0
}

const getStepWhenAllPointsFlashing = function () {
  for (let step = 1; ; step++) {
    updateBoard()

    if (areAllPointsFlashing()) {
      return step
    }
  }
}

console.log('Day 11 (part 2)', getStepWhenAllPointsFlashing())
