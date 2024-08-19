const getLineNumber = (source: string, pattern: string, from: number = 0) => {
  // if pattern does not contain new lines
  if (!pattern.includes('\n')) {
    const lines = source.split('\n')
    return lines.findIndex((line, index) => index >= from && line.includes(pattern)) + 1
  }

  // if pattern contains new lines (multi line)
  const fromPosition = source.split('\n').slice(0, from).reduce((count, line) => count + line.length, 0)
  const position = source.indexOf(pattern, fromPosition)
  const countLines = source.slice(0, position).split('\n').length
  return countLines
}

export default getLineNumber
