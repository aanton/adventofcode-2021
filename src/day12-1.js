import {readFileSync} from 'fs'

const {pathname} = new URL('../inputs/day12.txt', import.meta.url)
const lines = readFileSync(pathname).toString().split('\n')

const getCaveConnections = function () {
  const connections = {}

  lines.forEach(line => {
    const [a, b] = line.split('-')
    if (!connections[a]) connections[a] = []
    if (!connections[b]) connections[b] = []

    connections[a].push(b)
    connections[b].push(a)
  })

  return connections
}

const isSmallCave = function (name) {
  return /[a-z]/.test(name)
}

const isValidDestination = function (route, destination) {
  if (!isSmallCave(destination)) return true
  if (!route.includes(destination)) return true

  return false
}

const getCompletedRoutesCount = function (connections) {
  let count = 0

  const routes = connections['start'].map(destination => ['start', destination])

  let route = routes.shift()
  while (route) {
    const lastCave = route[route.length - 1]
    connections[lastCave].forEach(destination => {
      if (destination === 'end') {
        count++
        return
      }

      if (!isValidDestination(route, destination)) return

      routes.push([...route, destination])
    })

    route = routes.shift()
  }

  return count
}

const connections = getCaveConnections()
const result = getCompletedRoutesCount(connections)

console.log('Day 12 (part 1)', result)
