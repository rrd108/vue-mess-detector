import { SFCDescriptor } from '@vue/compiler-sfc'
import { BG_RESET, TEXT_WARN, TEXT_RESET, BG_ERR, BG_WARN, TEXT_INFO } from '../asceeCodes'
import { createRegExp, charIn, charNotIn, oneOrMore, maybe, wordChar } from 'magic-regexp'
import getLineNumber from '../getLineNumber'

const unquotedAttributeValuesFiles: { message: string }[] = []

const checkQuotedAttributeValues = (descriptor: SFCDescriptor | null, filePath: string) => {
  if (!descriptor) {
    return
  }
  const template = descriptor.template! // it is exists otherwise the function is not called at all

  const regexTempltaTag = createRegExp(
    '<',
    oneOrMore(wordChar),
    maybe(oneOrMore(charIn(' \t\n\r'))),
    oneOrMore(charNotIn('/>')),
    maybe(oneOrMore(charIn(' \t\n\r'))),
    maybe('/'),
    '>',
    ['g']
  )
  const matches = template.content.match(regexTempltaTag)

  if (matches === null) return

  const regexUnquotedAttributeValue = createRegExp(':', oneOrMore(wordChar), maybe(' '), '=', maybe(' '), charNotIn('\'"'), [
    'g',
  ])

  matches.forEach(templateTag => {
    if (!templateTag.includes(':')) return // check if it contains a colon

    const match = templateTag.match(regexUnquotedAttributeValue)
    if (match?.length) {
      const lineNumber = getLineNumber(descriptor.source, templateTag)
      unquotedAttributeValuesFiles.push({ message: `${filePath}#${lineNumber} ${BG_WARN}${match}${BG_RESET}` })
    }
  })
}

const reportQuotedAttributeValues = () => {
  if (unquotedAttributeValuesFiles.length > 0) {
    console.log(
      `\n${TEXT_INFO}vue-strong${TEXT_RESET} ${BG_ERR}Attribute value is not quoted${BG_RESET} in ${unquotedAttributeValuesFiles.length} files.`
    )
    console.log(
      `👉 ${TEXT_WARN}Use quotes for attribute values.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#quoted-attribute-values`
    )
    unquotedAttributeValuesFiles.forEach(file => {
      console.log(`- ${file.message} 🚨`)
    })
  }
  return unquotedAttributeValuesFiles.length
}

export { checkQuotedAttributeValues, reportQuotedAttributeValues }
