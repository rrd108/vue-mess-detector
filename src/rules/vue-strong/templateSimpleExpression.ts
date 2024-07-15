import { SFCTemplateBlock } from '@vue/compiler-sfc'
import { BG_RESET, TEXT_WARN, TEXT_RESET, BG_ERR, TEXT_INFO, BG_WARN } from '../asceeCodes'
import getLineNumber from '../getLineNumber'

const templateSimpleExpressionFiles: { message: string }[] = []

const MAX_EXPRESSION_LENGTH = 40 // completely rrd made-up number

const checkTemplateSimpleExpression = (template: SFCTemplateBlock, filePath: string) => {
  const regex = /{{\s*([\s\S]*?)\s*}}/g
  const matches = [...template.content.matchAll(regex)].map(match => match[1].trim())

  matches.forEach(expression => {
    if (expression.length > MAX_EXPRESSION_LENGTH) {
      const lineNumber = getLineNumber(template.content, expression)
      const firstPart = expression.split('\n').at(0)?.trim() || ''
      templateSimpleExpressionFiles.push({ message: `${filePath}#${lineNumber} ${BG_WARN}${firstPart}${BG_RESET}` })
    }
  })
}

const reportTemplateSimpleExpression = () => {
  if (templateSimpleExpressionFiles.length > 0) {
    console.log(
      `\n${TEXT_INFO}vue-strong${TEXT_RESET} ${BG_ERR}Lengthy template expression${BG_RESET} found in ${templateSimpleExpressionFiles.length} files.`
    )
    console.log(
      `👉 ${TEXT_WARN}Refactor the expression into a computed property.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#simple-expressions-in-templates`
    )
    templateSimpleExpressionFiles.forEach(file => {
      console.log(`- ${file.message} 🚨`)
    })
  }
  return templateSimpleExpressionFiles.length
}

export { checkTemplateSimpleExpression, reportTemplateSimpleExpression }
