/* eslint-disable no-cond-assign */
import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import { BG_ERR, BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import { getUniqueFilenameCount } from '../../helpers'

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

  const tagRegex = /<(\w+)(\s[^>]+)?>/g
  const attributeRegex = /(\w+(-\w+)*="[^"]*")/g

  let match
  while ((match = tagRegex.exec(template.content)) !== null) {
    const tagName = match[1]
    const attributeString = match[2]

    if (attributeString) {
      const attributes = Array.from(
        attributeString.matchAll(attributeRegex),
        attr => attr[0].split('=')[0],
      )

      let lastIdx = -1
      for (const attr of attributes) {
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
  if (elementAttributeOrderFiles.length > 0) {
    // count only non duplicated objects (by its `filename` property)
    const fileCount = getUniqueFilenameCount<ElementAttributeOrder>(elementAttributeOrderFiles, 'filename')

    console.log(`\n${TEXT_INFO}vue-recommended${TEXT_RESET} ${BG_ERR}element attribute order ${BG_RESET} detected in ${fileCount} files.`)
    console.log(
            `👉 ${TEXT_WARN}Whenever a build system is available to concatenate files, each component should be in its own file.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#component-files`,
    )
    elementAttributeOrderFiles.forEach((file) => {
      console.log(`- ${file.message} 🚨`)
    })
  }
  return elementAttributeOrderFiles.length
}

export { checkElementAttributeOrder, reportElementAttributeOrder }
