import type { SFCScriptBlock } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'

import { anyOf, createRegExp, digit, global, linefeed, oneOrMore } from 'magic-regexp'
import getLineNumber from '../getLineNumber'

const results: FileCheckResult[] = []

const checkMagicNumbers = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }
  const regex = createRegExp(oneOrMore(digit).as('magicNumber'), anyOf(')', linefeed), [global])

  let match
  let lastLine = 0
  // eslint-disable-next-line no-cond-assign
  while ((match = regex.exec(script.content)) !== null) {
    const _magicNumber = match.groups?.magicNumber
    const magicNumber = Number.parseInt(_magicNumber ?? '0')
    if (magicNumber > 1) {
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
  return offenses
}

const resetMagicNumbers = () => (results.length = 0)

export { checkMagicNumbers, reportMagicNumbers, resetMagicNumbers }
