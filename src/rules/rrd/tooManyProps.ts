import type { SFCScriptBlock } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'

import { char, charNotIn, createRegExp, maybe, oneOrMore } from 'magic-regexp'
import { skipComments } from '../../helpers/skipComments'

const results: FileCheckResult[] = []

const checkTooManyProps = (script: SFCScriptBlock | null, filePath: string, maxPropsCount: number) => {
  if (!script) {
    return
  }
  const regex = createRegExp('defineProps', maybe('<'), maybe('('), '{', oneOrMore(charNotIn('}')), '}', ['g', 's'])
  const content = skipComments(script.content)
  const matches = content.match(regex)
  if (matches?.length) {
    const propsCount = matches[0].split(',').length
    if (propsCount > maxPropsCount) {
      results.push({ filePath, message: `props found <bg_err>(${propsCount})</bg_err>` })
    }
  }
}

const resetTooManyProps = () => (results.length = 0)

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

export { checkTooManyProps, reportTooManyProps, resetTooManyProps }
