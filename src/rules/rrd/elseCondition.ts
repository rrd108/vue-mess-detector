import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { caseInsensitive, createRegExp, global, wordBoundary } from 'magic-regexp'
import { BG_ERR, BG_RESET, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

const checkElseCondition = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }
  const regex = createRegExp(wordBoundary, 'else', wordBoundary, [global, caseInsensitive])
  const matches = script.content.match(regex)

  if (matches?.length) {
    results.push({ filePath, message: `else clauses found ${BG_ERR}(${matches.length})${BG_RESET}`, })
  }
}

const reportElseCondition = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `${TEXT_INFO}rrd ~ else conditions${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Try to rewrite the conditions in a way that the else clause is not necessary.${TEXT_RESET}`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetElseCondition = () => (results.length = 0)

export { checkElseCondition, reportElseCondition, resetElseCondition }
