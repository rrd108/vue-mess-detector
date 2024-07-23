import { SFCTemplateBlock } from '@vue/compiler-sfc'
import { BG_RESET, TEXT_WARN, TEXT_RESET, BG_ERR, TEXT_INFO, BG_WARN } from '../asceeCodes'
import getLineNumber from '../getLineNumber'
import { getUniqueFilenameCount } from '../../helpers'

type TemplateSimpleExpressionFile = { filename: string; message: string }

const templateSimpleExpressionFiles: TemplateSimpleExpressionFile[] = []

const MAX_EXPRESSION_LENGTH = 40 // completely rrd made-up number

const checkTemplateSimpleExpression = (template: SFCTemplateBlock | null, filePath: string) => {
  if (!template) {
    return
  }
  const regex = /{{\s*([\s\S]*?)\s*}}/g
  const matches = [...template.content.matchAll(regex)].map(match => match[1].trim())

  matches.forEach(expression => {
    if (expression.length > MAX_EXPRESSION_LENGTH) {
      const lineNumber = getLineNumber(template.content, expression)
      const firstPart = expression.split('\n').at(0)?.trim() || ''
      templateSimpleExpressionFiles.push({
        filename: filePath,
        message: `${filePath}#${lineNumber} ${BG_WARN}${firstPart}${BG_RESET}`,
      })
    }
  })
}

const reportTemplateSimpleExpression = () => {
  if (templateSimpleExpressionFiles.length > 0) {
    // Count only non duplicated objects (by its `filename` property)
    const fileCount = getUniqueFilenameCount<TemplateSimpleExpressionFile>(templateSimpleExpressionFiles, 'filename')

    console.log(
      `\n${TEXT_INFO}vue-strong${TEXT_RESET} ${BG_ERR}Lengthy template expression${BG_RESET} found in ${fileCount} files.`
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
