import {readFileSync} from 'fs'
import {convertHexToBinary, extractPackets} from './common.js'

const {pathname} = new URL('../../inputs/day16.txt', import.meta.url)
const lines = readFileSync(pathname).toString().split('\n')

const binary = convertHexToBinary(lines[0])
const packets = extractPackets(binary)

const getSubpackets = function (packets, packet, index) {
  let subpackets

  if (packet.childrenCount) {
    subpackets = packets.splice(index + 1, packet.childrenCount)
  } else {
    let childrenCount = 0
    let childrenSize = packet.childrenSize

    while (childrenSize > 0) {
      childrenCount++
      childrenSize -= packets[index + childrenCount].size
    }

    subpackets = packets.splice(index + 1, childrenCount)
  }

  packet.size += subpackets.reduce((acc, subpacket) => acc + subpacket.size, 0)

  return subpackets
}

const getPacketsValue = function (packets) {
  for (let index = packets.length - 1; index >= 0; index--) {
    const packet = packets[index]

    if (packet.type === 4) continue

    const subpackets = getSubpackets(packets, packet, index)
    if (packet.type === 0) {
      packet.value = subpackets.reduce((acc, packet) => acc + packet.value, 0)
    } else if (packet.type === 1) {
      packet.value = subpackets.reduce((acc, packet) => acc * packet.value, 1)
    } else if (packet.type === 2) {
      packet.value = Math.min(...subpackets.map(packet => packet.value))
    } else if (packet.type === 3) {
      packet.value = Math.max(...subpackets.map(packet => packet.value))
    } else if (packet.type === 5) {
      packet.value = subpackets[0].value > subpackets[1].value ? 1 : 0
    } else if (packet.type === 6) {
      packet.value = subpackets[0].value < subpackets[1].value ? 1 : 0
    } else if (packet.type === 7) {
      packet.value = subpackets[0].value === subpackets[1].value ? 1 : 0
    } else {
      break
    }
  }

  return packets[0].value
}

console.log('Day 16 (part 2)', getPacketsValue(packets))
