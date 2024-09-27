import type { SFCScriptBlock } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'
import { extractPropNames } from '../../helpers/extractPropNames'

const results: FileCheckResult[] = []

// eslint-disable-next-line regexp/no-unused-capturing-group
const camelCasePattern = /^[a-z]+([A-Z][a-z]*)*$/

const resetResults = () => (results.length = 0)

const checkPropNameCasing = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }

  const regex = /defineProps\s*\(\s*(\{[\s\S]*?\})\s*\)/g
  let match

  // eslint-disable-next-line no-cond-assign
  while ((match = regex.exec(script.content)) !== null) {
    const propsObject = match[1]
    const propNames = extractPropNames(propsObject)
    const invalidProps = propNames.filter(prop => !camelCasePattern.test(prop))

    if (invalidProps.length) {
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

export { checkPropNameCasing, reportPropNameCasing }
