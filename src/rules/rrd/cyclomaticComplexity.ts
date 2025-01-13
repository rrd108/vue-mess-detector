import type { SFCScriptBlock } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'
import { caseInsensitive, createRegExp, global, wordBoundary } from 'magic-regexp'
import { skipComments } from '../../helpers/skipComments'

const results: FileCheckResult[] = []

const resetResults = () => (results.length = 0)

const checkCyclomaticComplexity = (script: SFCScriptBlock | null, filePath: string, complexityModerate: number) => {
  if (!script) {
    return
  }
  const COMPLEXITY_HIGH = 2 * complexityModerate

  const _if = createRegExp(wordBoundary, 'if', wordBoundary, [global, caseInsensitive])
  const _else = createRegExp(wordBoundary, 'else', wordBoundary, [global, caseInsensitive])
  const _for = createRegExp(wordBoundary, 'for', wordBoundary, [global, caseInsensitive])
  const _while = createRegExp(wordBoundary, 'while', wordBoundary, [global, caseInsensitive])
  const _case = createRegExp(wordBoundary, 'case', wordBoundary, [global, caseInsensitive])

  const content = skipComments(script.content)

  const _ifCount = content.match(_if)
  const _elseCount = content.match(_else)
  const _forCount = content.match(_for)
  const _whileCount = content.match(_while)
  const _caseCount = content.match(_case)

  const cyclomaticComplexity
    = (_ifCount?.length || 0)
      + (_elseCount?.length || 0)
      + (_forCount?.length || 0)
      + (_whileCount?.length || 0)
      + (_caseCount?.length || 0)

  if (cyclomaticComplexity > complexityModerate) {
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
  resetResults()

  return offenses
}

export { checkCyclomaticComplexity, reportCyclomaticComplexity }
