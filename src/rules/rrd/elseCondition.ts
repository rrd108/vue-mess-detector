import { caseInsensitive, createRegExp, global, wordBoundary } from 'magic-regexp'
import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { skipComments } from '../../helpers/skipComments'
import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

const checkElseCondition = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }
  const regex = createRegExp(wordBoundary, 'else', wordBoundary, [global, caseInsensitive])
  const content = skipComments(script.content)
  const matches = content.match(regex)

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
  return offenses
}

const resetElseCondition = () => (results.length = 0)

export { checkElseCondition, reportElseCondition, resetElseCondition }
