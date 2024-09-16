import type { SFCScriptBlock } from '@vue/compiler-sfc'

import type { FileCheckResult, Offense } from '../../types'
import { skipComments } from '../../helpers/skipComments'
import getLineNumber from '../getLineNumber'

const results: FileCheckResult[] = []

const checkNoVarDeclaration = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }

  const regex = /\bvar\s+(\w+(\s*=[^;]*)?|\{[^}]*\}(\s*=[^;]*)?)\s*;?/g
  const content = skipComments(script.content)
  const matches = content.match(regex)

  matches?.forEach((match) => {
    const lineNumber = getLineNumber(script.content, match)
    results.push({
      filePath,
      message: `line #${lineNumber} <bg_warn>Avoid using 'var' for variable declarations: ${match}</bg_warn>`,
    })
  })
}

const reportNoVarDeclaration = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>rrd ~ No Var Declaration</text_info>`,
        description: `👉 <text_warn>Avoid var declaration, use const or let instead of that.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-var-declaration.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetNoVarDeclaration = () => (results.length = 0)

export { checkNoVarDeclaration, reportNoVarDeclaration, resetNoVarDeclaration }
