import type { SFCScriptBlock } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'
import { skipComments } from '../../helpers/skipComments'
import getLineNumber from '../getLineNumber'

const results: FileCheckResult[] = []
const complicatedComputedFiles: { filePath: string }[] = []

const resetResults = () => (results.length = 0)

const checkSimpleComputed = (script: SFCScriptBlock | null, filePath: string, maxComputedLength: number) => {
  if (!script) {
    return
  }

  // Match only the opening of a block-body computed; the body is captured by
  // balanced brace counting below so arbitrarily deep nesting is detected.
  // eslint-disable-next-line regexp/prefer-w
  const startRegex = /const\s+[a-zA-Z0-9_$]+\s*=\s*computed\(\s*\(\)\s*=>\s*\{/g

  const content = skipComments(script.content)

  let startMatch: RegExpExecArray | null = startRegex.exec(content)
  while (startMatch !== null) {
    // startRegex.lastIndex points at the character right after the opening '{'.
    let braceCount = 1
    let currentIndex = startRegex.lastIndex

    while (braceCount > 0 && currentIndex < content.length) {
      if (content[currentIndex] === '{') {
        braceCount++
      }
      else if (content[currentIndex] === '}') {
        braceCount--
      }
      currentIndex++
    }

    const block = content.slice(startMatch.index, currentIndex)

    if (block.split('\n').length > maxComputedLength) {
      const firstLine = block.split('\n')[0]
      const lineNumber = getLineNumber(script.content, firstLine)
      results.push({ filePath, message: `line #${lineNumber} <bg_warn>computed</bg_warn>` })
      complicatedComputedFiles.push({ filePath })
      if (!complicatedComputedFiles.some(file => file.filePath === filePath)) {
        complicatedComputedFiles.push({ filePath })
      }
    }

    // Resume scanning after the consumed computed block.
    startRegex.lastIndex = currentIndex
    startMatch = startRegex.exec(content)
  }
}

const reportSimpleComputed = () => {
  const offenses: Offense[] = []

  if (complicatedComputedFiles.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>vue-strong ~ complicated computed property</text_info>`,
        description: `👉 <text_warn>Refactor the computed properties to smaller ones.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/simple-computed.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  resetResults()

  return offenses
}

export { checkSimpleComputed, reportSimpleComputed }
