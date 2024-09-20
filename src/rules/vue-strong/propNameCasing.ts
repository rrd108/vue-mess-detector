import type { SFCScriptBlock } from '@vue/compiler-sfc'

import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

// eslint-disable-next-line regexp/no-unused-capturing-group
const camelCasePattern = /^[a-z]+([A-Z][a-z]*)*$/

const resetResults = () => (results.length = 0)

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
      results.push({ filePath, message: `prop names are <bg_warn>not camelCased</bg_warn>` })
    }
  }
}

const reportPropNameCasing = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>vue-strong ~ prop names are not camelCased</text_info>`,
        description: `👉 <text_warn>Rename the props to camelCase.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/prop-name-casing.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  resetResults()

  return offenses
}

export { checkPropNameCasing, reportPropNameCasing, resetResults }
