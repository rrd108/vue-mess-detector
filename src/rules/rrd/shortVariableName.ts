import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import type { Offense } from '../../types'

interface ShortVariableNameFile {
  filename: string
  variable: string
}

const MIN_VARIABLE_NAME = 4 // completely rrd made-up number

const shortVariableNameFile: ShortVariableNameFile[] = []

const checkShortVariableName = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }
  // Regular expression to match variable names
  const regex = /\b(?:const|var|let)\s+([a-zA-Z_$][\w$]*)/g

  let match
  // eslint-disable-next-line no-cond-assign
  while ((match = regex.exec(script.content)) !== null) {
    const variable = match[1]

    if (variable.length < MIN_VARIABLE_NAME) {
      shortVariableNameFile.push({ filename: filePath, variable })
    }
  }
}

const reportShortVariableName = () => {
  const offenses: Offense[] = []

  if (shortVariableNameFile.length > 0) {
    shortVariableNameFile.forEach((file) => {
      offenses.push({
        file: file.filename,
        rule: `${BG_WARN}rrd ~ short variable names${BG_RESET}`,
        title: '',
        description: `👉 ${TEXT_WARN}Variable names must have a minimum length of ${MIN_VARIABLE_NAME}${TEXT_RESET}`,
        message: `${BG_WARN}(${file.variable})${BG_RESET} 🚨`,
      })
    })
  }
  return offenses
}

export { checkShortVariableName, reportShortVariableName }
