import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import getLineNumber from '../getLineNumber'
import type { Offense } from '../../types'

interface TemplateSimpleExpressionFile { filename: string, message: string }

const templateSimpleExpressionFiles: TemplateSimpleExpressionFile[] = []

const MAX_EXPRESSION_LENGTH = 40 // completely rrd made-up number

const checkTemplateSimpleExpression = (template: SFCTemplateBlock | null, filePath: string) => {
  if (!template) {
    return
  }
  // eslint-disable-next-line regexp/strict, regexp/no-super-linear-backtracking
  const regex = /{{\s*([\s\S]*?)\s*}}/g
  const matches = [...template.content.matchAll(regex)].map(match => match[1].trim())

  matches.forEach((expression) => {
    if (expression.length > MAX_EXPRESSION_LENGTH) {
      const lineNumber = getLineNumber(template.content, expression)
      const firstPart = expression.split('\n').at(0)?.trim() || ''
      templateSimpleExpressionFiles.push({
        filename: filePath,
        message: `line #${lineNumber} ${BG_WARN}${firstPart}${BG_RESET}`,
      })
    }
  })
}

const reportTemplateSimpleExpression = () => {
  const offenses: Offense[] = []

  if (templateSimpleExpressionFiles.length > 0) {
    templateSimpleExpressionFiles.forEach((file) => {
      offenses.push({
        file: file.filename,
        rule: `${TEXT_INFO}vue-strong ~ lengthy template expression${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Refactor the expression into a computed property.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#simple-expressions-in-templates`,
        message: `${file.message} 🚨`,
      })
    })
  }
  return offenses
}

export { checkTemplateSimpleExpression, reportTemplateSimpleExpression }
