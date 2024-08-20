import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import getLineNumber from '../getLineNumber'
import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

const checkZeroLengthComparison = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }

  const regex = /(\w+(?:\.\w+)*)\.length\s*>\s*0/g

  let match
  // eslint-disable-next-line no-cond-assign
  while ((match = regex.exec(script.content)) !== null) {
    const fullMatch = match[0]
    const arrayName = match[1]

    const lineNumber = getLineNumber(script.content.trim(), fullMatch)
    results.push({
      filePath,
      message: `line #${lineNumber} zero length comparison found ${BG_WARN}(${arrayName})${BG_RESET}`,
    })
  }
}

const reportZeroLengthComparison = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `${TEXT_INFO}rrd ~ Zero Length Comparison${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}In JavaScript, any number greater than 0 is truthy, so you can directly use the length property.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/zero-length-comparison.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetZeroLengthComparison = () => (results.length = 0)

export { checkZeroLengthComparison, reportZeroLengthComparison, resetZeroLengthComparison }
