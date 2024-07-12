import { SFCTemplateBlock } from '@vue/compiler-sfc'
import { BG_RESET, TEXT_WARN, TEXT_RESET, BG_ERR, TEXT_INFO } from '../asceeCodes'

const templateSimpleExpressionFiles: { filePath: string, lineNumber: number }[] = []

const MAX_EXPRESSION_LENGTH = 40 // completely made-up number

const checkTemplateSimpleExpression = (template: SFCTemplateBlock, filePath: string) => {
  const regex = /{{\s*([\s\S]*?)\s*}}/g
  const matches = [...template.content.matchAll(regex)].map(match => match[1].trim())

  let accumulativeLength = 0;
  const lines = template.content.split('\n');

  matches.forEach(expression => {
    if (expression.length > MAX_EXPRESSION_LENGTH) {
      // Calculate the starting index of the expression
      const expressionStartIdx = template.content.indexOf(expression);
      let expressionStartLine = 1;

      for (let i = 0; i < lines.length; i++) {
        accumulativeLength += lines[i].length + 1; // +1 for the newline character
        if (accumulativeLength > expressionStartIdx) {
          expressionStartLine = i + 1;
          break;
        }
      }
      
      //if this file is not in the array yet, push it
      if (!templateSimpleExpressionFiles.some(file => file.filePath === filePath && file.lineNumber === expressionStartLine)) {
        templateSimpleExpressionFiles.push({ filePath, lineNumber: expressionStartLine })
      }
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
      console.log(`- ${file.filePath} (Line ${file.lineNumber}) 🚨`)
    })
  }
  return templateSimpleExpressionFiles.length
}

export { checkTemplateSimpleExpression, reportTemplateSimpleExpression }
