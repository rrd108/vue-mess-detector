import type { FileCheckResult, Offense } from '../../types'
import path from 'node:path'
import { IGNORE_NAME_RULES } from '../../helpers/constants'

const results: FileCheckResult[] = []

const resetResults = () => (results.length = 0)

const checkComponentFilenameCasing = (filePath: string) => {
  if (filePath.includes('pages') || filePath.includes('layouts')) {
    return
  }

  const fileName = path.basename(filePath)

  if (IGNORE_NAME_RULES.includes(fileName.toLowerCase())) {
    return
  }

  // Check for filenames inside square brackets (e.g. [id].vue)
  if (fileName.startsWith('[') && fileName.endsWith('].vue')) {
    return
  }

  // eslint-disable-next-line regexp/optimal-quantifier-concatenation, regexp/no-useless-assertions, regexp/no-optional-assertion
  const regexPascalCase = /^[A-Z][a-zA-Z0-9]+(?:(?<!^)(?=[A-Z]))*.vue$/
  const matchesPascalCase = fileName.match(regexPascalCase)

  const regexKebabCase = /^([a-z0-9]+-)+[a-z0-9]+\.vue$/
  const matchesKebabCase = fileName.match(regexKebabCase)

  if (!matchesPascalCase?.length && !matchesKebabCase?.length) {
    results.push({ filePath, message: `component name is <bg_warn>not PascalCase, nor kebab-case.</bg_warn>` })
  }
}

const reportComponentFilenameCasing = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>vue-strong ~ component name is not PascalCase and not kebab-case</text_info>`,
        description: `👉 <text_warn>Rename the component to use PascalCase or kebab-case file name.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-filename-casing.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  resetResults()

  return offenses
}

export { checkComponentFilenameCasing, reportComponentFilenameCasing }
