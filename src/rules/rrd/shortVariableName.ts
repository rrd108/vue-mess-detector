import type { SFCScriptBlock } from '@vue/compiler-sfc'

import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

const allowedVariableNames = ['i', 'key']

const checkShortVariableName = (script: SFCScriptBlock | null, filePath: string, minVariableName: number) => {
  if (!script) {
    return
  }
  // Regular expression to match variable names
  const regex = /\b(?:const|var|let)\s+([a-zA-Z_$][\w$]*)/g

  let match
  // eslint-disable-next-line no-cond-assign
  while ((match = regex.exec(script.content)) !== null) {
    const variable = match[1]

    if (variable.length < minVariableName && !allowedVariableNames.includes(variable)) {
      results.push({ filePath, message: `variable: <bg_warn>(${variable})</bg_warn>` })
    }
  }
}

const reportShortVariableName = (minVariableName: number) => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>rrd ~ short variable names</text_info>`,
        description: `👉 <text_warn>Variable names must have a minimum length of ${minVariableName}.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/short-variable-name.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetShortVariableName = () => (results.length = 0)

export { checkShortVariableName, reportShortVariableName, resetShortVariableName }
