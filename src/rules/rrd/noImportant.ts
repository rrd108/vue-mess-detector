import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'
import getLineNumber from '../getLineNumber'

const results: FileCheckResult[] = []

const resetResults = () => (results.length = 0)

const checkNoImportant = (template: SFCTemplateBlock | null, filePath: string) => {
  if (!template) {
    return
  }

  const regex = /!important/g

  const matches = [...template.content.matchAll(regex)]
  let from = 0
  matches.forEach((match) => {
    const lineNumber = getLineNumber(template.content.trim(), match[0], from)
    results.push({ filePath, message: `line #${lineNumber} <bg_warn>Found !important</bg_warn>` })
    from = lineNumber
  })
}

const reportNoImportant = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>rdd ~ no !important</text_info>`,
        description: `👉 <text_warn>Avoid !important as it complicates CSS management and disrupts natural cascading.</text_warn>`,
        message: `${result.message} 🚨`,
      })
    })
  }

  resetResults()

  return offenses
}

export { checkNoImportant, reportNoImportant }
