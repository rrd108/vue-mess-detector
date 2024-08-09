import type { SFCDescriptor } from '@vue/compiler-sfc'
import { charIn, charNotIn, createRegExp, maybe, oneOrMore, wordChar } from 'magic-regexp'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import getLineNumber from '../getLineNumber'
import type { Offense } from '../../types'

const unquotedAttributeValuesFiles: { filename: string, message: string }[] = []

const checkQuotedAttributeValues = (descriptor: SFCDescriptor | null, filePath: string) => {
  if (!descriptor) {
    return
  }
  const template = descriptor.template

  const regexTempltaTag = createRegExp(
    '<',
    oneOrMore(wordChar),
    maybe(oneOrMore(charIn(' \t\n\r'))),
    oneOrMore(charNotIn('/>')),
    maybe(oneOrMore(charIn(' \t\n\r'))),
    maybe('/'),
    '>',
    ['g'],
  )
  const matches = template?.content.match(regexTempltaTag)

  if (matches === null)
    return

  const regexUnquotedAttributeValue = createRegExp(':', oneOrMore(wordChar), maybe(' '), '=', maybe(' '), charNotIn('\'"'), [
    'g',
  ])

  matches?.forEach((templateTag) => {
    if (!templateTag.includes(':'))
      return // check if it contains a colon

    const match = templateTag.match(regexUnquotedAttributeValue)
    if (match?.length) {
      const lineNumber = getLineNumber(descriptor.source, templateTag)
      unquotedAttributeValuesFiles.push({ filename: filePath, message: `line #${lineNumber} ${BG_WARN}${match}${BG_RESET}` })
    }
  })
}

const reportQuotedAttributeValues = () => {
  const offenses: Offense[] = []

  if (unquotedAttributeValuesFiles.length > 0) {
    unquotedAttributeValuesFiles.forEach((file) => {
      offenses.push({
        file: file.filename,
        rule: `${TEXT_INFO}vue-strong ~ attribute value is not quoted${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Use quotes for attribute values.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#quoted-attribute-values`,
        message: `${file.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetQuotedAttributeValues = () => (unquotedAttributeValuesFiles.length = 0)

export { checkQuotedAttributeValues, reportQuotedAttributeValues, resetQuotedAttributeValues }
