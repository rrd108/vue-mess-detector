import { SFCDescriptor, SFCTemplateBlock } from '@vue/compiler-sfc'
import { BG_RESET, TEXT_WARN, TEXT_RESET, BG_ERR, BG_WARN } from '../asceeCodes'
import { createRegExp, charIn, charNotIn, oneOrMore, maybe, wordChar } from 'magic-regexp'

const unquotedAttributeValuesFiles: { message: string }[] = []

const checkQuotedAttributeValues = (descriptor: SFCDescriptor, filePath: string) => {
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

  const script = descriptor.scriptSetup || descriptor.script
  matches.forEach(templateTag => {
    if (!templateTag.includes(':')) return // check if it contains a colon

    const match = templateTag.match(regexUnquotedAttributeValue)
    if (match?.length) {
      const lines = descriptor.source.split('\n')
      const lineNumber = lines.findIndex(line => line.includes(match[0])) + 1
      unquotedAttributeValuesFiles.push({ message: `${filePath}#${lineNumber} ${BG_WARN}${match}${BG_RESET}` })
    }
  })
}

const reportQuotedAttributeValues = () => {
  if (unquotedAttributeValuesFiles.length > 0) {
    console.log(`\n${BG_ERR}Attribute value is not quoted${BG_RESET} in ${unquotedAttributeValuesFiles.length} files.`)
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
