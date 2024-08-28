import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'

const results: FileCheckResult[] = []

const checkMultiAttributeElements = (template: SFCTemplateBlock | null, filePath: string) => {
  if (!template) {
    return
  }

  // Regex to match elements with attributes
  // eslint-disable-next-line regexp/no-super-linear-backtracking
  const elementRegex = /<(\w+)([^>]*)>/g
  let match: RegExpExecArray | null

  // eslint-disable-next-line no-cond-assign
  while ((match = elementRegex.exec(template.content)) !== null) {
    const elementTag = match[1]
    const attributesString = match[2]

    // Check if there are multiple attributes
    const attributes = attributesString.split(/\s+/).filter(attr => attr.trim() !== '')

    if (attributes.length > 1) {
      // Check if attributes are on separate lines
      const attributeLines = attributesString.split('\n').length
      if (attributeLines === 1) {
        results.push({ filePath, message: `Element ${BG_WARN}<${elementTag}>${BG_RESET} should have its attributes on separate lines` })
      }
    }
  }
}

const reportMultiAttributeElements = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `${TEXT_INFO}vue-strong ~ multi-attribute elements${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Elements with multiple attributes should span multiple lines, with one attribute per line.${TEXT_RESET}`,
        message: `${result.message} 🚨`,
      })
    })
  }

  return offenses
}

const resetMultiAttributeElements = () => (results.length = 0)

export { checkMultiAttributeElements, reportMultiAttributeElements, resetMultiAttributeElements }
