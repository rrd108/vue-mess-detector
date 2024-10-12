import type { SFCDescriptor } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'
import { charNotIn, createRegExp, letter, linefeed, maybe, oneOrMore, tab, wordChar } from 'magic-regexp'
import getLineNumber from '../getLineNumber'

const results: FileCheckResult[] = []

const resetResults = () => (results.length = 0)

const checkSelfClosingComponents = (descriptor: SFCDescriptor | null, filePath: string) => {
  if (!descriptor) {
    return
  }

  const template = descriptor.template

  const regexSelfClosingComponent = createRegExp(
    '<',
    oneOrMore(letter.uppercase, wordChar),
    maybe(linefeed, tab),
    maybe(oneOrMore(charNotIn('>'))),
    '></',
    oneOrMore(wordChar),
    '>',
    ['g'],
  )

  // New regex to match self-closing components
  const regexValidSelfClosingComponent = createRegExp(
    '<',
    oneOrMore(letter.uppercase, wordChar),
    maybe(linefeed, tab),
    maybe(oneOrMore(charNotIn('>'))),
    '/>',
    ['g'],
  )

  const matches = template?.content?.match(regexSelfClosingComponent)

  if (matches === null) {
    return
  }

  matches?.forEach((componentTag) => {
    // Check if the component tag contains a valid self-closing component
    const validSelfClosingMatches = componentTag.match(regexValidSelfClosingComponent)
    if (validSelfClosingMatches) {
      return // Skip this match as it contains a valid self-closing component
    }

    const lineNumber = getLineNumber(descriptor.source, componentTag)
    const lastPart = componentTag.split('\n').at(-1)?.trim() || ''
    results.push({ filePath, message: `line #${lineNumber} <bg_warn>${lastPart}</bg_warn>` })
  })
}

const reportSelfClosingComponents = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>vue-strong ~ component is not self closing</text_info>`,
        description: `👉 <text_warn>Components with no content should be self-closing.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/self-closing-components.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  resetResults()

  return offenses
}

export { checkSelfClosingComponents, reportSelfClosingComponents }
