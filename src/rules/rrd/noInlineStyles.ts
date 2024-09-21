import type { SFCTemplateBlock } from '@vue/compiler-sfc'

import type { FileCheckResult, Offense } from '../../types'
import getLineNumber from '../getLineNumber'

const results: FileCheckResult[] = []

const resetResults = () => (results.length = 0)

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
      message: `line #${lineNumber} <bg_warn>Found inline style: ${match[0]}</bg_warn>`,
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
        rule: `<text_info>rrd ~ no Inline Styles</text_info>`,
        description: `👉 <text_warn>Avoid using inline styles. Consider moving the styles to a CSS or SCSS file, or use a Vue scoped style.</text_warn>`,
        message: `${result.message} 🚨`,
      })
    })
  }
  resetResults()

  return offenses
}

export { checkNoInlineStyles, reportNoInlineStyles }
