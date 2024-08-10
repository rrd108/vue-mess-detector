import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { anyOf, createRegExp, digit, global, linefeed } from 'magic-regexp'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import type { FileCheckResult, Offense } from '../../types'
import getLineNumber from '../getLineNumber'

const results: FileCheckResult[] = []

const checkMagicNumbers = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }
  const regex = createRegExp(digit, anyOf(')', linefeed), [global])
  const matches = script.content.match(regex)

  matches?.forEach((match) => {
    const lineNumber = getLineNumber(script.content, match)
    results.push({
      filePath,
      message: `line #${lineNumber} ${BG_WARN}magic number: ${match.length}${BG_RESET}`,
    })
  })
}

const reportMagicNumbers = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `${TEXT_INFO}rrd ~ magic numbers${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Extract magic numbers to a constant.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/magic-numbers.html`,
        message: `magic numbers found (${result.message}) 🚨`,
      })
    })
  }
  return offenses
}

const resetMagicNumbers = () => (results.length = 0)

export { checkMagicNumbers, reportMagicNumbers, resetMagicNumbers }
