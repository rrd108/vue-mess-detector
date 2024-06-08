const getLineNumber = (source: string, pattern: string) => {
  // if pattern does not contain new lines
  if (!pattern.includes('\n')) {
    const lines = source.split('\n')
    return lines.findIndex(line => line.includes(pattern)) + 1
  }

  // if pattern contains new lines (multi line)
  const position = source.indexOf(pattern)
  const newLinesCount = source.slice(0, position).split('\n').length
  const patternLinesCount = pattern.split('\n').length
  return newLinesCount + patternLinesCount - 1
}

export default getLineNumber
