import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { createRegExp, letter, oneOrMore } from 'magic-regexp'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

const camelCasePattern = createRegExp(
  oneOrMore(letter.lowercase).at.lineStart(),
  oneOrMore(letter.uppercase, letter.lowercase.times.any().grouped()).at.lineEnd(),
)

const checkPropNameCasing = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }
  // eslint-disable-next-line regexp/strict
  const regex = /defineProps\({([^}]+)/g
  let match
  // eslint-disable-next-line no-cond-assign
  while ((match = regex.exec(script.content)) !== null) {
    const propNames = match[1]
      .replace(/\s+/g, '')
      .replace(/["']/g, '')
      .split(',')
      .map(prop => prop.split(':')[0])
      .filter(prop => prop.length)
      .filter(prop => !camelCasePattern.test(prop))

    if (propNames.length) {
      results.push({ filePath, message: `prop names are ${BG_WARN}not camelCased${BG_RESET}` })
    }
  }
}

const reportPropNameCasing = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `${TEXT_INFO}vue-strong ~ prop names are not camelCased${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Rename the props to camelCase.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#prop-name-casing`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetPropNameCasing = () => (results.length = 0)

export { checkPropNameCasing, reportPropNameCasing, resetPropNameCasing }
