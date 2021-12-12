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

const getRoutes = function (connections) {
  const routes = connections['start'].map(destination => ['start', destination])

  let routeIndex = 0
  while (routeIndex !== -1) {
    const route = routes.splice(routeIndex, 1)[0]

    const lastCave = route[route.length - 1]
    connections[lastCave].forEach(destination => {
      if (!isValidDestination(route, destination)) return

      routes.push([...route, destination])
    })

    routeIndex = routes.findIndex(route => route[route.length - 1] !== 'end')
  }

  return routes
}

const connections = getCaveConnections()
const routes = getRoutes(connections)

console.log('Day 12 (part 1)', routes.length)
