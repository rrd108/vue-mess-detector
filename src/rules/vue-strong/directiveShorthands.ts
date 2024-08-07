import type { SFCDescriptor } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import getLineNumber from '../getLineNumber'
import type { Offense } from '../../types'

const directiveShorthandsTargets: { filename: string, message: string }[] = []
const directiveShorthandsFiles: { filePath: string }[] = []

const directivesToCheck = ['v-slot', 'v-bind', 'v-on']

const checkDirectiveShorthands = (descriptor: SFCDescriptor | null, filePath: string) => {
  if (!descriptor) {
    return
  }
  const template = descriptor.template! // it is exists otherwise the function is not called at all

  directivesToCheck.forEach((directive) => {
    if (template.content.includes(`${directive}:`)) {
      const lineNumber = getLineNumber(descriptor.source, directive)
      directiveShorthandsTargets.push({ filename: filePath, message: `line ${lineNumber} ${BG_WARN}${directive}${BG_RESET}` })

      if (!directiveShorthandsFiles.some(file => file.filePath === filePath)) {
        directiveShorthandsFiles.push({ filePath })
      }
    }
  })
}

const reportDirectiveShorthands = () => {
  const offenses: Offense[] = []

  if (directiveShorthandsTargets.length > 0) {
    directiveShorthandsTargets.forEach((file) => {
      offenses.push({
        file: file.filename,
        rule: `${TEXT_INFO}vue-strong ~ directive shorthands not used${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#directive-shorthands`,
        message: `${file.message} 🚨`,
      })
    })
  }
  return offenses
}

export { checkDirectiveShorthands, reportDirectiveShorthands }
