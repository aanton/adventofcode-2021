import {readFileSync} from 'fs'
import {convertHexToBinary, extractPackets} from './common.js'

const {pathname} = new URL('../../inputs/day16.txt', import.meta.url)
const lines = readFileSync(pathname).toString().split('\n')

const binary = convertHexToBinary(lines[0])
const packets = extractPackets(binary)

const sumVersions = packets.reduce((acc, packet) => acc + packet.version, 0)
console.log('Day 16 (part 1)', sumVersions)
