import { SFCDescriptor } from '@vue/compiler-sfc'
import { BG_RESET, TEXT_WARN, TEXT_RESET, BG_ERR, BG_WARN, TEXT_INFO } from '../asceeCodes'
import { charNotIn, createRegExp, letter, linefeed, maybe, oneOrMore, tab, wordChar } from 'magic-regexp'
import getLineNumber from '../getLineNumber'

const selfClosingComponentsFiles: { message: string }[] = []

const checkSelfClosingComponents = (descriptor: SFCDescriptor | null, filePath: string) => {
  if (!descriptor) {
    return
  }
  const template = descriptor.template! // it is exists otherwise the function is not called at all

  const regexSelfClosingComponent = createRegExp(
    '<',
    oneOrMore(letter.uppercase, wordChar),
    maybe(linefeed, tab),
    maybe(oneOrMore(charNotIn('>'))),
    '></',
    oneOrMore(wordChar),
    '>',
    ['g']
  )
  const matches = template.content.match(regexSelfClosingComponent)

  if (matches === null) return

  matches.forEach(componentTag => {
    const lineNumber = getLineNumber(descriptor.source, componentTag)
    const lastPart = componentTag.split('\n').at(-1)?.trim() || ''
    selfClosingComponentsFiles.push({ message: `${filePath}#${lineNumber} ${BG_WARN}${lastPart}${BG_RESET}` })
  })
}

const reportSelfClosingComponents = () => {
  if (selfClosingComponentsFiles.length > 0) {
    console.log(
      `\n${TEXT_INFO}vue-strong${TEXT_RESET} - ${BG_ERR}Component is not self closing${BG_RESET} in ${selfClosingComponentsFiles.length} files.`
    )
    console.log(
      `👉 ${TEXT_WARN}Components with no content should be self-closing.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#self-closing-components`
    )
    selfClosingComponentsFiles.forEach(file => {
      console.log(`- ${file.message} 🚨`)
    })
  }
  return selfClosingComponentsFiles.length
}

const resetSelfClosingComponents = () => (selfClosingComponentsFiles.length = 0)

export { checkSelfClosingComponents, reportSelfClosingComponents, resetSelfClosingComponents }
