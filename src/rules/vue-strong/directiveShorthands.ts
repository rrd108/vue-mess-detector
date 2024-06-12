import { SFCDescriptor } from '@vue/compiler-sfc'
import { BG_RESET, TEXT_WARN, TEXT_RESET, BG_ERR, TEXT_INFO, BG_WARN } from '../asceeCodes'
import getLineNumber from '../getLineNumber'

const directiveShorthandsTargets: { message: string }[] = []
const directiveShorthandsFiles: { filrPath: string }[] = []

const directivesToCheck = ['v-slot', 'v-bind', 'v-on']

const checkDirectiveShorthands = (descriptor: SFCDescriptor, filePath: string) => {
  const template = descriptor.template! // it is exists otherwise the function is not called at all

  directivesToCheck.forEach(directive => {
    if (template.content.includes(`${directive}:`)) {
      const lineNumber = getLineNumber(descriptor.source, directive)
      directiveShorthandsTargets.push({ message: `${filePath}:${lineNumber} ${BG_WARN}${directive}${BG_RESET}` })

      if (!directiveShorthandsFiles.some(file => file.filrPath === filePath)) {
        directiveShorthandsFiles.push({ filrPath: filePath })
      }
    }
  })
}

const reportDirectiveShorthands = () => {
  if (directiveShorthandsTargets.length > 0) {
    console.log(
      `\n${TEXT_INFO}vue-strong${TEXT_RESET} ${BG_ERR}Directive shorthands not used${BG_RESET} in ${directiveShorthandsFiles.length} files.`
    )
    console.log(
      `👉 ${TEXT_WARN}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#directive-shorthands`
    )
    directiveShorthandsTargets.forEach(file => {
      console.log(`- ${file.message} 🚨`)
    })
  }
  return directiveShorthandsTargets.length
}

export { checkDirectiveShorthands, reportDirectiveShorthands }
