import type { SFCScriptBlock } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'

import { anyOf, char, createRegExp, digit, global, linefeed, maybe, oneOrMore, wordBoundary } from 'magic-regexp'
import { skipComments } from '../../helpers/skipComments'
import getLineNumber from '../getLineNumber'

const results: FileCheckResult[] = []

const resetResults = () => (results.length = 0)

const checkMagicNumbers = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }

  const content = skipComments(script.content)

  const regex = createRegExp(
    maybe(oneOrMore(char)),
    anyOf(wordBoundary),
    oneOrMore(digit).as('magicNumber'),
    anyOf(')', linefeed),
    [global],
  )

  let match
  let lastLine = 0
  // eslint-disable-next-line no-cond-assign
  while ((match = regex.exec(content)) !== null) {
    if (match[0].trim().startsWith('const') || match[0].trim().startsWith('let')) {
      return
    }

    const _magicNumber = match.groups?.magicNumber
    const magicNumber = Number.parseInt(_magicNumber ?? '0')
    if (magicNumber > 1) { // 0 and 1 are not considered as magic number
      const lineNumber = getLineNumber(script.content, String(magicNumber), lastLine)
      results.push({
        filePath,
        message: `line #${lineNumber} <bg_warn>magic number: ${magicNumber}</bg_warn>`,
      })
      lastLine = lineNumber
    }
  }
}

const reportMagicNumbers = () => {
  const offenses: Offense[] = []

  if (results.length) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>rrd ~ magic numbers</text_info>`,
        description: `👉 <text_warn>Extract magic numbers to a constant.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/magic-numbers.html`,
        message: `magic numbers found (${result.message}) 🚨`,
      })
    })
  }

  resetResults()

  return offenses
}

export { checkMagicNumbers, reportMagicNumbers }
