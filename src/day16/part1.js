import {readFileSync} from 'fs'

const {pathname} = new URL('../../inputs/day16.txt', import.meta.url)
const lines = readFileSync(pathname).toString().split('\n')

const convertHexToBinary = function (hex) {
  return hex
    .split('')
    .map(byte => parseInt(byte, 16).toString(2).padStart(4, '0'))
    .join('')
}

const extractPackets = function (binary) {
  const packets = []

  do {
    const packet = extractNextPacket(binary)
    packets.push(packet)

    binary = binary.slice(packet.size)
  } while (binary.length > 7)

  return packets
}

const extractNextPacket = function (binary) {
  let packet = {
    version: parseInt(binary.slice(0, 3), 2),
    type: parseInt(binary.slice(3, 6), 2),
  }

  if (packet.type === 4) {
    packet = completeLiteralPacket(binary, packet)
  } else {
    packet = completeOperationPacket(binary, packet)
  }

  return packet
}

const completeLiteralPacket = function (binary, packet) {
  let [index, value] = [0, 0]

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const group = binary.slice(6 + index * 5, 6 + index * 5 + 5)
    value += group.slice(1)
    index++

    if (group[0] === '0') break
  }

  packet.value = parseInt(value, 2)
  packet.size = 6 + 5 * index

  return packet
}

const completeOperationPacket = function (binary, packet) {
  if (binary.slice(6, 7) === '1') {
    packet.childrenCount = parseInt(binary.slice(7, 18), 2)
    packet.size = 6 + 1 + 11
  } else {
    packet.childrenSize = parseInt(binary.slice(7, 22), 2)
    packet.size = 6 + 1 + 15
  }

  return packet
}

const binary = convertHexToBinary(lines[0])
const packets = extractPackets(binary)
const sumVersions = packets.reduce((acc, packet) => acc + packet.version, 0)

console.log('Day 16 (part 1)', sumVersions)
