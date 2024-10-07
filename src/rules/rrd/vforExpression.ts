import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'
import { char, charNotIn, createRegExp, exactly, global, oneOrMore } from 'magic-regexp'
import { skipComments } from '../../helpers/skipComments'
import getLineNumber from '../getLineNumber'

const results: FileCheckResult[] = []

const resetResults = () => (results.length = 0)

const checkVforExpression = (template: SFCTemplateBlock | null, filePath: string) => {
  if (!template) {
    return
  }

  const regex = createRegExp('v-for="', oneOrMore(charNotIn('"')), ' in ', exactly(oneOrMore(char), exactly('=>').or('function'), oneOrMore(charNotIn('"'))).groupedAs('expression'), '"', [global])

  const content = skipComments(template.content)

  let match
  let lastLine = 0
  // eslint-disable-next-line no-cond-assign
  while ((match = regex.exec(content)) !== null) {
    if (match.groups?.expression) {
      const lineNumber = getLineNumber(content, match.groups?.expression, lastLine)
      results.push({
        filePath,
        message: `line #${lineNumber} <bg_warn>expression: ${match.groups?.expression} in v-for</bg_warn>`,
      })
      lastLine = lineNumber
    }
  }
}

const reportVforExpression = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>rrd ~ vfor Expression</text_info>`,
        description: `👉 <text_warn>Move out the expression to a calculated property.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/vfor-expression.html`,
        message: `${result.message} 🚨`,
      })
    })
  }

  resetResults()

  return offenses
}

export { checkVforExpression, reportVforExpression }
