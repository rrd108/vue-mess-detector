import { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_RESET, TEXT_WARN, TEXT_RESET, BG_ERR, TEXT_INFO } from '../asceeCodes'
import { char, charNotIn, createRegExp, maybe, not, oneOrMore, whitespace } from 'magic-regexp'
import getLineNumber from '../getLineNumber'
import { group } from 'console'

const complicatedComputedTargets: { message: string }[] = []
const complicatedComputedFiles: { filePath: string }[] = []

const checkSimpleComputed = (script: SFCScriptBlock, filePath: string) => {
  //   const regex = createRegExp(
  //     'computed(',
  //     maybe(whitespace),
  //     '()',
  //     maybe(whitespace),
  //     '=>',
  //     maybe(whitespace),
  //     oneOrMore(char),
  //     ')',
  //     ['g', 's']
  //   )
  const regex = createRegExp(
    'computed(',
    maybe(whitespace),
    '()',
    maybe(whitespace),
    '=>',
    maybe(whitespace),
    maybe('{'),
    maybe(whitespace),
    //oneOrMore(charNotIn('{'), '{', charNotIn('}'), '}'),
    oneOrMore(char),
    maybe('}'),
    ')',
    ['g', 's']
  )
  const matches = script.content.match(regex)
  console.info(matches)
  if (matches?.length) {
    const lineNumber = getLineNumber(script.content, 'computed')
    complicatedComputedTargets.push({ message: `${filePath}:${lineNumber} ${BG_ERR}computed${BG_RESET}` })
    complicatedComputedFiles.push({ filePath })
  }
}

const reportSimpleComputed = () => {
  if (complicatedComputedFiles.length > 0) {
    console.log(
      `\n${TEXT_INFO}vue-strong${TEXT_RESET} ${BG_ERR}complicated computed property ${BG_RESET} in ${complicatedComputedFiles.length} files.`
    )
    console.log(
      `👉 ${TEXT_WARN}Rename the props to camelCase.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#prop-name-casing`
    )
    complicatedComputedFiles.forEach(file => {
      console.log(`- ${file.filePath} 🚨`)
    })
  }
  return complicatedComputedFiles.length
}

export { checkSimpleComputed, reportSimpleComputed }
