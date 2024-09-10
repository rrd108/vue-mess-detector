import type { SFCScriptBlock } from '@vue/compiler-sfc'

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
      message: `line #${lineNumber} zero length comparison found <bg_warn>(${arrayName})</bg_warn>`,
    })
  }
}

const reportZeroLengthComparison = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>rrd ~ Zero Length Comparison</text_info>`,
        description: `👉 <text_warn>In JavaScript, any number greater than 0 is truthy, so you can directly use the length property.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/zero-length-comparison.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetZeroLengthComparison = () => (results.length = 0)

export { checkZeroLengthComparison, reportZeroLengthComparison, resetZeroLengthComparison }
