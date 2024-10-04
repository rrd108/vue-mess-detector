export function extractComments(code: string): string[] {
  const comments: string[] = []
  // eslint-disable-next-line regexp/no-useless-lazy
  const regex = /\/\/.*?$|\/\*[\s\S]*?\*\//gm
  let match

  // eslint-disable-next-line no-cond-assign
  while ((match = regex.exec(code)) !== null) {
    comments.push(match[0])
  }

  return comments
}
