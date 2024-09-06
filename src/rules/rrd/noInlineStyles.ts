import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import getLineNumber from '../getLineNumber'
import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

const checkNoInlineStyles = (template: SFCTemplateBlock | null, filePath: string) => {
  if (!template) {
    return
  }

  const regex = /style\s*=\s*['"][^'"]*['"]/g

  const matches = [...template.content.matchAll(regex)]
  let from = 0
  matches?.forEach((match) => {
    const lineNumber = getLineNumber(template.content.trim(), match[0], from)
    results.push({
      filePath,
      message: `line #${lineNumber} ${BG_WARN}Found inline style: ${match[0]}${BG_RESET}`,
    })
    from = lineNumber
  })
}

const reportNoInlineStyles = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `${TEXT_INFO}rrd ~ no Inline Styles${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Avoid using inline styles. Consider moving the styles to a CSS or SCSS file, or use a Vue scoped style.${TEXT_RESET}`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetNoInlineStyles = () => (results.length = 0)

export { checkNoInlineStyles, reportNoInlineStyles, resetNoInlineStyles }
