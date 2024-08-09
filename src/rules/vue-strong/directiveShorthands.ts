import type { SFCDescriptor } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import getLineNumber from '../getLineNumber'
import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

const directiveShorthandsFiles: { filePath: string }[] = []

const directivesToCheck = ['v-slot', 'v-bind', 'v-on']

const checkDirectiveShorthands = (descriptor: SFCDescriptor | null, filePath: string) => {
  if (!descriptor) {
    return
  }
  const template = descriptor.template

  directivesToCheck.forEach((directive) => {
    if (template?.content.includes(`${directive}:`)) {
      const lineNumber = getLineNumber(descriptor.source, directive)
      results.push({ filePath, message: `line #${lineNumber} ${BG_WARN}${directive}${BG_RESET}` })

      if (!directiveShorthandsFiles.some(file => file.filePath === filePath)) {
        directiveShorthandsFiles.push({ filePath })
      }
    }
  })
}

const reportDirectiveShorthands = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `${TEXT_INFO}vue-strong ~ directive shorthands not used${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#directive-shorthands`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetDirectiveShorthands = () => {
  directiveShorthandsFiles.length = 0
  results.length = 0
}

export { checkDirectiveShorthands, reportDirectiveShorthands, resetDirectiveShorthands }
