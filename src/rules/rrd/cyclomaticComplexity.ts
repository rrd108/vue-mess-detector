import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { caseInsensitive, createRegExp, global, wordBoundary } from 'magic-regexp'
import { BG_ERR, BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

const COMPLEXITY_MODERATE = 5
const COMPLEXITY_HIGH = 10

/**
 * Function to check cyclomatic complexity of a SFC script block.
 *
 * @param {SFCScriptBlock} script - The SFC script block to analyze.
 * @param {string} file - The filename of the SFC.
 */
const checkCyclomaticComplexity = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }
  const _if = createRegExp(wordBoundary, 'if', wordBoundary, [global, caseInsensitive])
  const _else = createRegExp(wordBoundary, 'else', wordBoundary, [global, caseInsensitive])
  const _for = createRegExp(wordBoundary, 'for', wordBoundary, [global, caseInsensitive])
  const _while = createRegExp(wordBoundary, 'while', wordBoundary, [global, caseInsensitive])
  const _case = createRegExp(wordBoundary, 'case', wordBoundary, [global, caseInsensitive])

  const _ifCount = script.content.match(_if)
  const _elseCount = script.content.match(_else)
  const _forCount = script.content.match(_for)
  const _whileCount = script.content.match(_while)
  const _caseCount = script.content.match(_case)

  const cyclomaticComplexity
    = (_ifCount?.length || 0)
    + (_elseCount?.length || 0)
    + (_forCount?.length || 0)
    + (_whileCount?.length || 0)
    + (_caseCount?.length || 0)

  if (cyclomaticComplexity > COMPLEXITY_MODERATE) {
    results.push({ filePath, message: `${cyclomaticComplexity > COMPLEXITY_HIGH ? BG_ERR : BG_WARN}(${
      cyclomaticComplexity
    })${BG_RESET}`, })
  }
}

/**
 * Function to report files with medium or high cyclomatic complexity.
 *
 * @returns {number} The number of files with high cyclomatic complexity.
 */
const reportCyclomaticComplexity = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `${TEXT_INFO}rrd ~ cyclomatic complexity${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Try to reduce complexity.${TEXT_RESET}`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetCyclomaticComplexity = () => (results.length = 0)

export { checkCyclomaticComplexity, reportCyclomaticComplexity, resetCyclomaticComplexity }
