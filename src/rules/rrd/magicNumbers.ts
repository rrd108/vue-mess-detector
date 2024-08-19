import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { anyOf, createRegExp, digit, global, linefeed, oneOrMore } from 'magic-regexp'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import type { FileCheckResult, Offense } from '../../types'
import getLineNumber from '../getLineNumber'

const results: FileCheckResult[] = []

const checkMagicNumbers = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }
  const regex = createRegExp(oneOrMore(digit).as('magicNumber'), anyOf(')', linefeed), [global])

  let match
  let lastLine = 0
  while ((match = regex.exec(script.content)) !== null) {
    const magicNumber = match.groups?.magicNumber || ''
    console.info(`getLineNumber(script.content, ${magicNumber}, ${lastLine})`)
    const lineNumber = getLineNumber(script.content, magicNumber, lastLine)
    results.push({
      filePath,
      message: `line #${lineNumber} ${BG_WARN}magic number: ${magicNumber}${BG_RESET}`,
    })
    lastLine = lineNumber
  }

}

const reportMagicNumbers = () => {
  const offenses: Offense[] = []

  if (results.length) {
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
