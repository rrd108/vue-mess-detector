import type { SFCTemplateBlock } from '@vue/compiler-sfc'

import type { FileCheckResult, Offense } from '../../types'
import getLineNumber from '../getLineNumber'

const results: FileCheckResult[] = []

const checkTemplateSimpleExpression = (template: SFCTemplateBlock | null, filePath: string, maxExpressionLength: number) => {
  if (!template) {
    return
  }
  // eslint-disable-next-line regexp/strict, regexp/no-super-linear-backtracking
  const regex = /{{\s*([\s\S]*?)\s*}}/g
  const matches = [...template.content.matchAll(regex)].map(match => match[1].trim())

  matches.forEach((expression) => {
    if (expression.length > maxExpressionLength) {
      const lineNumber = getLineNumber(template.content, expression)
      const firstPart = expression.split('\n').at(0)?.trim() || ''
      results.push({
        filePath,
        message: `line #${lineNumber} <bg_warn>${firstPart}</bg_warn>`,
      })
    }
  })
}

const reportTemplateSimpleExpression = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>vue-strong ~ lengthy template expression</text_info>`,
        description: `👉 <text_warn>Refactor the expression into a computed property.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/template-simple-expression.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetTemplateSimpleExpression = () => (results.length = 0)

export { checkTemplateSimpleExpression, reportTemplateSimpleExpression, resetTemplateSimpleExpression }
