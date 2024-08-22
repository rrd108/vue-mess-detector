import type { SFCDescriptor } from '@vue/compiler-sfc'
import { charIn, charNotIn, createRegExp, maybe, oneOrMore, wordChar } from 'magic-regexp'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import getLineNumber from '../getLineNumber'
import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

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

  if (matches === null) {
    return
  }

  const regexUnquotedAttributeValue = createRegExp(':', oneOrMore(wordChar), maybe(' '), '=', maybe(' '), charNotIn('\'"'), [
    'g',
  ])

  matches?.forEach((templateTag) => {
    if (!templateTag.includes(':')) {
      return // check if it contains a colon
    }

    const match = templateTag.match(regexUnquotedAttributeValue)
    if (match?.length) {
      const lineNumber = getLineNumber(descriptor.source, templateTag)
      results.push({ filePath, message: `line #${lineNumber} ${BG_WARN}${match}${BG_RESET}` })
    }
  })
}

const reportQuotedAttributeValues = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `${TEXT_INFO}vue-strong ~ attribute value is not quoted${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Use quotes for attribute values.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/quoted-attribute-values.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetQuotedAttributeValues = () => (results.length = 0)

export { checkQuotedAttributeValues, reportQuotedAttributeValues, resetQuotedAttributeValues }
