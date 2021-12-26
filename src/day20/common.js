export const displayImage = function (image) {
  image.forEach(row => console.log(row))
}

export const convertImage = function (image, algorithm, defaultChar = '.') {
  const newImage = []

  image = image.map(row => `${defaultChar}${row}${defaultChar}`)
  image.unshift(Array(image[0].length).fill(defaultChar).join(''))
  image.push(Array(image[0].length).fill(defaultChar).join(''))

  for (let i = 0; i < image.length; i++) {
    newImage[i] = []
    for (let j = 0; j < image[0].length; j++) {
      newImage[i][j] = convertPoint(image, algorithm, i, j, defaultChar)
    }
    newImage[i] = newImage[i].join('')
  }

  return newImage
}

const convertPoint = function (image, algorithm, i, j, defaultChar) {
  const code =
    getImagePoint(image, i - 1, j - 1, defaultChar) +
    getImagePoint(image, i - 1, j, defaultChar) +
    getImagePoint(image, i - 1, j + 1, defaultChar) +
    getImagePoint(image, i, j - 1, defaultChar) +
    getImagePoint(image, i, j, defaultChar) +
    getImagePoint(image, i, j + 1, defaultChar) +
    getImagePoint(image, i + 1, j - 1, defaultChar) +
    getImagePoint(image, i + 1, j, defaultChar) +
    getImagePoint(image, i + 1, j + 1, defaultChar)

  const binary = code
    .split('')
    .map(char => (char === '.' ? 0 : 1))
    .join('')

  // console.log(code, binary, parseInt(binary, 2), algorithm[parseInt(binary, 2)])

  return algorithm[parseInt(binary, 2)]
}

const getImagePoint = function (image, i, j, defaultChar) {
  return image[i]?.[j] || defaultChar
}
