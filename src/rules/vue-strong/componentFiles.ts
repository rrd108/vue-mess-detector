import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import getLineNumber from '../getLineNumber'
import type { Offense } from '../../types'

interface ComponentFiles { filename: string, message: string }

const componentFiles: ComponentFiles[] = []

const checkComponentFiles = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }
  // regular expression to match `.component('anyString', { ... })` pattern
  const regex = /app\.component\('([^']+)',\s*\{[^}]*\}\)/g

  const matches = [...script.content.matchAll(regex)].map(match => match[1].trim())

  matches.forEach((match) => {
    const lineNumber = getLineNumber(script.content.trim(), match)
    const firstPart = match.split('\n').at(0)?.trim() || ''
    componentFiles.push({ filename: filePath, message: `line #${lineNumber} ${BG_WARN}(${firstPart})${BG_RESET}` })
  })
}

const reportComponentFiles = () => {
  const offenses: Offense[] = []

  if (componentFiles.length > 0) {
    componentFiles.forEach((file) => {
      offenses.push({
        file: file.filename,
        rule: `${TEXT_INFO}vue-strong ~ component files${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Whenever a build system is available to concatenate files, each component should be in its own file.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#component-files`,
        message: `${file.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetComponentFiles = () => (componentFiles.length = 0)

export { checkComponentFiles, reportComponentFiles, resetComponentFiles }
