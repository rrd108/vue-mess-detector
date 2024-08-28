import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { createRegExp } from 'magic-regexp'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import getLineNumber from '../getLineNumber'
import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

const checkNoVarDeclaration = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }

  const regex = /\bvar\s+(\w+(\s*=[^;]*)?|\{[^}]*\}(\s*=[^;]*)?)\s*;?/g
  const matches = script.content.match(regex)

  matches?.forEach((match) => {
    const lineNumber = getLineNumber(script.content, match)
    results.push({
      filePath,
      message: `line #${lineNumber} ${BG_WARN}Avoid using 'var' for variable declarations: ${match}${BG_RESET}`,
    })
  })
}

const reportNoVarDeclaration = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `${TEXT_INFO}rrd ~ No Var Declaration${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Avoid var declaration, use const or let instead of that.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/no-var-declaration.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetNoVarDeclaration = () => (results.length = 0)

export { checkNoVarDeclaration, reportNoVarDeclaration, resetNoVarDeclaration }
