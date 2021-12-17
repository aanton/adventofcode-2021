import {readFileSync} from 'fs'

const {pathname} = new URL('../../inputs/day04.txt', import.meta.url)
const array = readFileSync(pathname).toString().split('\n')

const arePositionsChecked = function (board, positions) {
  return positions.every(position => board[position] === false)
}

const isWinnerBoard = function (board) {
  // Check rows
  if (arePositionsChecked(board, [0, 1, 2, 3, 4])) return true
  if (arePositionsChecked(board, [5, 6, 7, 8, 9])) return true
  if (arePositionsChecked(board, [10, 11, 12, 13, 14])) return true
  if (arePositionsChecked(board, [15, 16, 17, 18, 19])) return true
  if (arePositionsChecked(board, [20, 21, 22, 23, 24])) return true

  // Check columns
  if (arePositionsChecked(board, [0, 5, 10, 15, 20])) return true
  if (arePositionsChecked(board, [1, 6, 11, 16, 21])) return true
  if (arePositionsChecked(board, [2, 7, 12, 17, 22])) return true
  if (arePositionsChecked(board, [3, 8, 13, 18, 23])) return true
  if (arePositionsChecked(board, [4, 9, 14, 19, 24])) return true

  return false
}

const numbers = array[0].split(/,/)
let boards = array
  .slice(1)
  .filter(Boolean)
  .reduce((acc, line, index) => {
    if (index % 5 === 0) {
      acc.push([])
    }

    acc[acc.length - 1] = acc[acc.length - 1].concat(
      ...line.trim().split(/\s+/)
    )

    return acc
  }, [])

for (const number of numbers) {
  boards.forEach(board => {
    const index = board.indexOf(number)
    if (index !== -1) board[index] = false
  })

  const pendiengBoards = boards.filter(board => !isWinnerBoard(board))

  const winner =
    boards.length === 1 && pendiengBoards.length === 0 ? boards[0] : false

  if (winner) {
    console.log('Number', number)
    console.log('Winner board', winner)

    const sumPendingNumber = winner
      .filter(Boolean)
      .reduce(function (acc, value) {
        return acc + parseInt(value)
      }, 0)

    console.log('Day 4 (part 2)', number * sumPendingNumber)

    break
  }

  boards = pendiengBoards
}
