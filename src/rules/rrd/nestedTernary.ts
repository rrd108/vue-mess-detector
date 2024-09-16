import type { SFCScriptBlock } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'

import { char, createRegExp, oneOrMore, whitespace } from 'magic-regexp'
import { skipComments } from '../../helpers/skipComments'
import getLineNumber from '../getLineNumber'

const results: FileCheckResult[] = []

/* TODO use the correct parameter from the following list:
  - "script: SFCScriptBlock" ~ this rule will apply to ts, js and vue files
  - "styles: SFCStyleBlock[]" ~ applied only for vue files
  - "template: SFCTemplateBlock" ~ applied only for vue files
  - "descriptor: SFCDescriptor" ~ applied only for vue files
*/
const checkNestedTernary = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }
  const regex = createRegExp(oneOrMore(char), whitespace, '?', whitespace, oneOrMore(char), whitespace, ':', whitespace, oneOrMore(char))

  const content = skipComments(script.content)
  const matches = content.match(regex)

  matches?.forEach((match) => {
    if (match.split('?').length - 1 > 1) {
      const lineNumber = getLineNumber(script.content, match)
      results.push({
        filePath,
        message: `line #${lineNumber} has <bg_warn>nested ternary</bg_warn>`,
      })
    }
  })
}

const reportNestedTernary = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>rrd ~ nested Ternary</text_info>`,
        description: `👉 <text_warn>Break the nested ternary into standalone ternaries, if statements, && operators, or a dedicated function.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/nested-ternary.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetNestedTernary = () => (results.length = 0)

export { checkNestedTernary, reportNestedTernary, resetNestedTernary }
