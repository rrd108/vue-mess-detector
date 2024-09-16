import type { SFCScriptBlock } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'

import { char, createRegExp, maybe, oneOrMore } from 'magic-regexp'

const results: FileCheckResult[] = []

const TOO_MANY_PROPS = 5

const checkTooManyProps = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }
  const regex = createRegExp('defineProps', maybe('<'), maybe('('), '{', oneOrMore(char), '}', ['g', 's'])
  const matches = script.content.match(regex)
  if (matches?.length) {
    const propsCount = matches[0].split(',').length
    if (propsCount > TOO_MANY_PROPS) {
      results.push({ filePath, message: `props found <bg_err>(${propsCount})</bg_err>` })
    }
  }
}

const reportTooManyProps = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>rrd ~ too many props</text_info>`,
        description: `👉 <text_warn>Try to refactor your code to use less properties.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/too-many-props.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetTooManyProps = () => (results.length = 0)

export { checkTooManyProps, reportTooManyProps, resetTooManyProps }
