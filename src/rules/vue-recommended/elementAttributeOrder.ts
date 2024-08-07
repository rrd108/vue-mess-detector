/* eslint-disable no-cond-assign */
import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import { BG_ERR, BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import { getUniqueFilenameCount } from '../../helpers'
import type { Offense } from '../../types'

interface ElementAttributeOrder { filename: string, message: string }

const elementAttributeOrderFiles: ElementAttributeOrder[] = []

const ATTRIBUTE_ORDER = [
  'is',
  'v-for',
  'v-if',
  'v-else-if',
  'v-else',
  'v-show',
  'v-cloak',
  'v-pre',
  'v-once',
  'id',
  'ref',
  'key',
  'v-model',
  'v-on',
  'v-html',
  'v-text',
]

const checkElementAttributeOrder = (template: SFCTemplateBlock | null, filePath: string) => {
  if (!template)
    return

  // Remove the <template> tags to avoid checking them
  const innerTemplate = template.content.replace(/<\/?template>/g, '')

  const tagRegex = /<(\w+)(\s[^>]+)?>/g
  const attributeRegex = /(\w+(?:-\w+)*)(?:="[^"]*")?/g

  let match
  while ((match = tagRegex.exec(innerTemplate)) !== null) {
    const tagName = match[1]
    const attributeString = match[2]

    if (attributeString) {
      // Extract attribute names from the attribute string
      const attributes = Array.from(attributeString.matchAll(attributeRegex), attr => attr[1])

      // Filter attributes to only includes those that are in the ATTRIBUTE_ORDER constant array
      const filteredAttrs = attributes.filter(item => ATTRIBUTE_ORDER.includes((item)))

      let lastIdx = -1
      for (const attr of filteredAttrs) {
        const currIdx = ATTRIBUTE_ORDER.indexOf(attr)
        if (currIdx !== -1 && currIdx < lastIdx) {
          elementAttributeOrderFiles.push({
            filename: filePath,
            message: `${filePath} tag has attributes out of order ${BG_WARN}(${tagName})${BG_RESET}`,
          })
          break
        }
        lastIdx = currIdx
      }
    }
  }
}

const reportElementAttributeOrder = () => {
  const offenses: Offense[] = []

  if (elementAttributeOrderFiles.length > 0) {
    elementAttributeOrderFiles.forEach((file) => {
      offenses.push({
        file: file.filename,
        rule: `${BG_WARN}vue-recommended ~ element attribute order${BG_RESET}`,
        title: '',
        description: `👉 ${TEXT_WARN}The attributes of elements (including components) should be ordered consistently.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-recommended.html#element-attribute-order`,
        message: `${file.message} 🚨`,
      })
    })
  }
  return offenses
}

export { checkElementAttributeOrder, reportElementAttributeOrder }
