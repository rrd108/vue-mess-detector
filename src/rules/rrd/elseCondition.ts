import type { SFCScriptBlock } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'
import { createRegExp, global, wordBoundary } from 'magic-regexp'
import { skipComments } from '../../helpers/skipComments'

const results: FileCheckResult[] = []

const resetResults = () => (results.length = 0)

const checkElseCondition = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }

  // Remove string literals
  const contentWithoutStrings = script.content.replace(/'[^']*'|"[^"]*"/g, '')

  // Remove comments
  const contentWithoutCommentsAndStrings = skipComments(contentWithoutStrings)

  // Check for 'else' keywords
  const elseRegex = createRegExp(wordBoundary, 'else', wordBoundary, [global])
  const matches = contentWithoutCommentsAndStrings.match(elseRegex)

  if (matches?.length) {
    results.push({ filePath, message: `else clauses found <bg_err>(${matches.length})</bg_err>` })
  }
}

const reportElseCondition = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>rrd ~ else conditions</text_info>`,
        description: `👉 <text_warn>Try to rewrite the conditions in a way that the else clause is not necessary.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/else-condition.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  resetResults()

  return offenses
}

export { checkElseCondition, reportElseCondition }
