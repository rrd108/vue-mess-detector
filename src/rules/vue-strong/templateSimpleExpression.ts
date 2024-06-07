import { SFCTemplateBlock } from '@vue/compiler-sfc'
import { BG_RESET, TEXT_WARN, TEXT_RESET, BG_ERR } from '../asceeCodes'

const templateSimpleExpressionFiles: { filePath: string }[] = []

const MAX_EXPRESSION_LENGTH = 40 // completely made-up number

const checkTemplateSimpleExpression = (template: SFCTemplateBlock, filePath: string) => {
  const regex = /{{\s*([\s\S]*?)\s*}}/g
  const matches = [...template.content.matchAll(regex)].map(match => match[1].trim())

  matches.forEach(expression => {
    if (expression.length > MAX_EXPRESSION_LENGTH) {
      //if this file is not in the array yet, push it
      if (!templateSimpleExpressionFiles.some(file => file.filePath === filePath)) {
        templateSimpleExpressionFiles.push({ filePath })
      }
    }
  })
}

const reportTemplateSimpleExpression = () => {
  if (templateSimpleExpressionFiles.length > 0) {
    console.log(`\n${BG_ERR}Lengthy template expression${BG_RESET} found in ${templateSimpleExpressionFiles.length} files.`)
    console.log(
      `👉 ${TEXT_WARN}Refactor the expression into a computed property.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#simple-expressions-in-templates`
    )
    templateSimpleExpressionFiles.forEach(file => {
      console.log(`- ${file.filePath} 🚨`)
    })
  }
  return templateSimpleExpressionFiles.length
}

export { checkTemplateSimpleExpression, reportTemplateSimpleExpression }
