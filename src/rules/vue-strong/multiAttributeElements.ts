import type { SFCTemplateBlock } from '@vue/compiler-sfc'

import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

const resetResults = () => (results.length = 0)

const checkMultiAttributeElements = (template: SFCTemplateBlock | null, filePath: string) => {
  if (!template) {
    return
  }

  // Regex to match elements with attributes
  // eslint-disable-next-line regexp/no-super-linear-backtracking
  const elementRegex = /<(\w+)([^>]*)>/g

  // Regex to match attributes
  const attributeRegex = /\w+=["'][^"']*["']/g

  let match: RegExpExecArray | null

  // eslint-disable-next-line no-cond-assign
  while ((match = elementRegex.exec(template.content)) !== null) {
    const elementTag = match[1]
    const attributesString = match[2]

    const attributes = []
    let attrMatch

    // Check if there are multiple attributes
    // eslint-disable-next-line no-cond-assign
    while ((attrMatch = attributeRegex.exec(attributesString)) !== null) {
      attributes.push(attrMatch[0])
    }

    if (attributes.length > 1) {
      // Check if attributes are on separate lines
      const attributeLines = attributesString.split('\n').length
      if (attributeLines === 1) {
        results.push({ filePath, message: `Element <bg_warn><${elementTag}></bg_warn> should have its attributes on separate lines` })
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
        rule: `<text_info>vue-strong ~ multi-attribute elements</text_info>`,
        description: `👉 <text_warn>Elements with multiple attributes should span multiple lines, with one attribute per line.</text_warn>`,
        message: `${result.message} 🚨`,
      })
    })
  }

  resetResults()

  return offenses
}

export { checkMultiAttributeElements, reportMultiAttributeElements }
