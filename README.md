# 🎅 Advent of Code 2021 🎄

My JS solutions to [Advent of Code 2021](https://adventofcode.com/2021/) by [@ericwastl](https://twitter.com/ericwastl).

Project setup uses:

- [Prettier](https://prettier.io/) for code formatting
- [ESLint](https://eslint.org/) for code linting
- vscode settings to run Prettier & ESLint on save
- Pre-commit hook using [husky](https://typicode.github.io/husky/) & [lint-staged](https://github.com/okonet/lint-staged) to ckeck code formatting & linting (Prettier & EsLint)

## 💻️ Installation & usage

- Clone this project
- Install dependecies
- Copy the challenges input data from their rules pages
- Run the day X challenges

```bash
npm install

# Run day 1 challenges (each part is coded in its own file)
node src/day01-1.js
node src/day01-2.js

# Run day 5 challenges (both parts are coded in the same file)
node src/day05.js
```

## 🕹️ Challenges

| Day | Name                    | Rules                                         | Part 1                     | Part 2                     |
| --- | ----------------------- | --------------------------------------------- | -------------------------- | -------------------------- |
| 1   | Sonar Sweep             | [rules](https://adventofcode.com/2021/day/1)  | [part 1](./src/day01-1.js) | [part 2](./src/day01-2.js) |
| 2   | Dive!                   | [rules](https://adventofcode.com/2021/day/2)  | [part 1](./src/day02-1.js) | [part 2](./src/day02-2.js) |
| 3   | Binary Diagnostic       | [rules](https://adventofcode.com/2021/day/3)  | [part 1](./src/day03-1.js) | [part 2](./src/day03-2.js) |
| 4   | Giant Squid             | [rules](https://adventofcode.com/2021/day/4)  | [part 1](./src/day04-1.js) | [part 2](./src/day04-2.js) |
| 5   | Hydrothermal Venture    | [rules](https://adventofcode.com/2021/day/5)  | [part 1](./src/day05.js)   | [part 2](./src/day05.js)   |
| 6   | Lanternfish             | [rules](https://adventofcode.com/2021/day/6)  | [part 1](./src/day06.js)   | [part 2](./src/day06.js)   |
| 7   | The Treachery of Whales | [rules](https://adventofcode.com/2021/day/7)  | [part 1](./src/day07-1.js) | [part 2](./src/day07-2.js) |
| 8   | Seven Segment Search    | [rules](https://adventofcode.com/2021/day/8)  | [part 1](./src/day08-1.js) | [part 2](./src/day08-2.js) |
| 9   | Smoke Basin             | [rules](https://adventofcode.com/2021/day/9)  | [part 1](./src/day09-1.js) | [part 2](./src/day09-2.js) |
| 10  | Syntax Scoring          | [rules](https://adventofcode.com/2021/day/10) | [part 1](./src/day10-1.js) | [part 2](./src/day10-2.js) |
| 11  | Dumbo Octopus           | [rules](https://adventofcode.com/2021/day/11) | [part 1](./src/day11-1.js) | [part 2](./src/day11-2.js) |
| 12  | Passage Pathing         | [rules](https://adventofcode.com/2021/day/12) | [part 1](./src/day12-1.js) | [part 2](./src/day12-2.js) |
| 13  | Transparent Origami     | [rules](https://adventofcode.com/2021/day/13) | [part 1](./src/day13-1.js) | [part 2](./src/day13-2.js) |
| 14  | Extended Polymerization | [rules](https://adventofcode.com/2021/day/14) | [part 1](./src/day14-1.js) | [part 2](./src/day14-2.js) |
| 15  | Chiton                  | [rules](https://adventofcode.com/2021/day/15) | [part 1](./src/day15-1.js) |                            |
