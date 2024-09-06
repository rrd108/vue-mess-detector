import { char, createRegExp, maybe, oneOrMore } from 'magic-regexp'
import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_ERR, BG_RESET, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import type { FileCheckResult, Offense } from '../../types'

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
      results.push({ filePath, message: `props found ${BG_ERR}(${propsCount})${BG_RESET}` })
    }
  }
}

const reportTooManyProps = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `${TEXT_INFO}rrd ~ too many props${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Try to refactor your code to use less properties.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/too-many-props.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetTooManyProps = () => (results.length = 0)

export { checkTooManyProps, reportTooManyProps, resetTooManyProps }
