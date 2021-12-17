import {readFileSync} from 'fs'
import Graph from './dijkstra-graph.js'

const {pathname} = new URL('../../inputs/day15.txt', import.meta.url)
const lines = readFileSync(pathname).toString().split('\n')

const board = lines.map(line => line.split('').map(value => parseInt(value)))

const createBigBoard = function () {
  const size = board.length
  for (let i = 0; i < size; i++) {
    board[i + size] = []
    board[i + 2 * size] = []
    board[i + 3 * size] = []
    board[i + 4 * size] = []

    for (let j = 0; j < size; j++) {
      let value = board[i][j]

      value = ++value > 9 ? 1 : value
      board[i + size][j] = value
      board[i][j + size] = value

      value = ++value > 9 ? 1 : value
      board[i + 2 * size][j] = value
      board[i][j + 2 * size] = value
      board[i + size][j + size] = value

      value = ++value > 9 ? 1 : value
      board[i + 3 * size][j] = value
      board[i][j + 3 * size] = value
      board[i + 2 * size][j + size] = value
      board[i + size][j + 2 * size] = value

      value = ++value > 9 ? 1 : value
      board[i + 4 * size][j] = value
      board[i][j + 4 * size] = value
      board[i + 3 * size][j + size] = value
      board[i + size][j + 3 * size] = value
      board[i + 2 * size][j + 2 * size] = value

      value = ++value > 9 ? 1 : value
      board[i + 4 * size][j + size] = value
      board[i + size][j + 4 * size] = value
      board[i + 3 * size][j + 2 * size] = value
      board[i + 2 * size][j + 3 * size] = value

      value = ++value > 9 ? 1 : value
      board[i + 4 * size][j + 2 * size] = value
      board[i + 2 * size][j + 4 * size] = value
      board[i + 3 * size][j + 3 * size] = value

      value = ++value > 9 ? 1 : value
      board[i + 4 * size][j + 3 * size] = value
      board[i + 3 * size][j + 4 * size] = value

      value = ++value > 9 ? 1 : value
      board[i + 4 * size][j + 4 * size] = value
    }
  }
}

createBigBoard()

const jMax = board[0].length - 1
const iMax = board.length - 1

const graph = new Graph()
for (let i = 0; i <= iMax; i++) {
  for (let j = 0; j <= jMax; j++) {
    const node = `${i}-${j}`
    graph.addNode(node)

    // Weights are different in each direction so edges are inserted in both directions
    if (i > 0) graph.addEdge(node, `${i - 1}-${j}`, board[i - 1][j])
    if (i < iMax) graph.addEdge(node, `${i + 1}-${j}`, board[i + 1][j])
    if (j > 0) graph.addEdge(node, `${i}-${j - 1}`, board[i][j - 1])
    if (j < iMax) graph.addEdge(node, `${i}-${j + 1}`, board[i][j + 1])
  }
}

const result = graph.findPathWithDijkstra('0-0', `${iMax}-${jMax}`)

console.log('Day 15 (part 1)', result.time)
