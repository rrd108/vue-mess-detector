import type { SFCDescriptor } from '@vue/compiler-sfc'

import type { FileCheckResult, Offense } from '../../types'
import getLineNumber from '../getLineNumber'

const results: FileCheckResult[] = []

const directiveShorthandsFiles: { filePath: string }[] = []

const directivesToCheck = ['v-slot', 'v-bind', 'v-on']

const resetResults = () => (results.length = 0)

const checkDirectiveShorthands = (descriptor: SFCDescriptor | null, filePath: string) => {
  if (!descriptor) {
    return
  }

  const template = descriptor.template

  directivesToCheck.forEach((directive) => {
    if (template?.content.includes(`${directive}:`)) {
      const lineNumber = getLineNumber(descriptor.source, directive)
      results.push({ filePath, message: `line #${lineNumber} <bg_warn>${directive}</bg_warn>` })

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
        rule: `<text_info>vue-strong ~ directive shorthands not used</text_info>`,
        description: `👉 <text_warn>Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/directive-shorthands.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  resetResults()

  return offenses
}

export { checkDirectiveShorthands, reportDirectiveShorthands }
