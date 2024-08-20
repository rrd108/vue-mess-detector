import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { createRegExp, maybe, whitespace, word } from 'magic-regexp'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import getLineNumber from '../getLineNumber'
import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

const checkNoPropDestructure = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }

  const regex = /(?:const|let|var)\s*\{\s*([^\}]+)\s*\}\s*=\s*defineProps\s*\(\s*\)/g

  const matches = script.content.match(regex)

  matches?.forEach((match) => {
    const lineNumber = getLineNumber(script.content, match)
    results.push({
      filePath,
      message: `line #${lineNumber} ${BG_WARN}props destructuring found: ${match}${BG_RESET}`,
    })
  })
}

const reportNoPropDestructure = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `${TEXT_INFO}rrd ~ no Prop Destructure${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Avoid destructuring props. Use \`props.propName\` instead of \`const { propName } = props\`.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/no-props-destructure.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetNoPropDestructure = () => (results.length = 0)

export { checkNoPropDestructure, reportNoPropDestructure, resetNoPropDestructure }
