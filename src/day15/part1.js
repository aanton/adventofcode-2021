import {readFileSync} from 'fs'
import Graph from './dijkstra-graph.js'

const {pathname} = new URL('../../inputs/day15.txt', import.meta.url)
const lines = readFileSync(pathname).toString().split('\n')

const board = lines.map(line => line.split('').map(value => parseInt(value)))
const iMax = board.length - 1
const jMax = board[0].length - 1

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
