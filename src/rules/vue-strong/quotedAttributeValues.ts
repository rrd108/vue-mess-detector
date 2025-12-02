import type { SFCDescriptor } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'

import { charIn, charNotIn, createRegExp, maybe, oneOrMore, wordChar } from 'magic-regexp'
import getLineNumber from '../getLineNumber'

const results: FileCheckResult[] = []

const resetResults = () => (results.length = 0)

const checkQuotedAttributeValues = (descriptor: SFCDescriptor | null, filePath: string) => {
  if (!descriptor) {
    return
  }

  const template = descriptor.template

  const regexTemplateTag = createRegExp(
    '<',
    oneOrMore(wordChar),
    maybe(oneOrMore(charIn(' \t\n\r'))),
    oneOrMore(charNotIn('/>')),
    maybe(oneOrMore(charIn(' \t\n\r'))),
    maybe('/'),
    '>',
    ['g'],
  )
  const matches = template?.content.match(regexTemplateTag)

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
      results.push({ filePath, message: `line #${lineNumber} <bg_warn>${match}</bg_warn>` })
    }
  })
}

const reportQuotedAttributeValues = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>vue-strong ~ quoted attribute values</text_info>`,
        description: `👉 <text_warn>Always use quotes for attribute values.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/quoted-attribute-values.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  resetResults()

  return offenses
}

export { checkQuotedAttributeValues, reportQuotedAttributeValues }
