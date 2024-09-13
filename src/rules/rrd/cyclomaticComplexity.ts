import type { SFCScriptBlock } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'
import { caseInsensitive, createRegExp, global, wordBoundary } from 'magic-regexp'

const results: FileCheckResult[] = []

const COMPLEXITY_MODERATE = 5
const COMPLEXITY_HIGH = 2 * COMPLEXITY_MODERATE

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
    results.push({ filePath, message: `Cyclomatic complexity is ${cyclomaticComplexity > COMPLEXITY_HIGH ? `<bg_err>very high` : `<bg_warn>high`} (${cyclomaticComplexity})${cyclomaticComplexity > COMPLEXITY_HIGH ? `</bg_err>` : `</bg_warn>`}` })
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
        rule: `<text_info>rrd ~ cyclomatic complexity</text_info>`,
        description: `👉 <text_warn>Try to reduce complexity.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/cyclomatic-complexity.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetCyclomaticComplexity = () => (results.length = 0)

export { checkCyclomaticComplexity, reportCyclomaticComplexity, resetCyclomaticComplexity }
