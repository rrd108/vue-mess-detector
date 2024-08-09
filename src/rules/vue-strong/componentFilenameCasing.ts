import path from 'node:path'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

const checkComponentFilenameCasing = (filePath: string) => {
  if (filePath.includes('pages') || filePath.includes('layouts'))
    return

  const fileName = path.basename(filePath)

  // eslint-disable-next-line regexp/optimal-quantifier-concatenation, regexp/no-useless-assertions, regexp/no-optional-assertion
  const regexPascalCase = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/
  const matchesPascalCase = fileName.match(regexPascalCase)

  const regexKebabCase = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/
  const matchesKebabCase = fileName.match(regexKebabCase)

  if (!matchesPascalCase?.length && !matchesKebabCase?.length) {
    results.push({ filePath, message: `component name is ${BG_WARN}not PascalCase, nor kebab-case.${BG_RESET}` })
  }
}

const reportComponentFilenameCasing = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `${TEXT_INFO}vue-strong ~ component name is not PascalCase and not kebab-case${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Rename the component to use PascalCase or kebab-case file name.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#single-file-component-filename-casing`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetComponentFilenameCasing = () => (results.length = 0)

export { checkComponentFilenameCasing, reportComponentFilenameCasing, resetComponentFilenameCasing }
