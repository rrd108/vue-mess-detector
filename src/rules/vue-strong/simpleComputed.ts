import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import getLineNumber from '../getLineNumber'
import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

const complicatedComputedFiles: { filePath: string }[] = []

const MAX_COMPUTED_LENGTH = 5 // completely rrd made-up number

const checkSimpleComputed = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }

  // eslint-disable-next-line regexp/prefer-w, regexp/strict, regexp/no-useless-flag
  const regex = /const\s+([a-zA-Z0-9_$]+)\s*=\s*computed\(\s*\(\)\s*=>\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}\s*\)/gs

  const matches = script.content.match(regex)
  if (matches?.length) {
    matches.forEach((match) => {
      if (match.split('\n').length > MAX_COMPUTED_LENGTH) {
        const firstLine = match.split('\n')[0]
        const lineNumber = getLineNumber(script.content, firstLine)
        results.push({ filePath, message: `line #${lineNumber} ${BG_WARN}computed${BG_RESET}` })
        complicatedComputedFiles.push({ filePath })
        if (!complicatedComputedFiles.some(file => file.filePath === filePath)) {
          complicatedComputedFiles.push({ filePath })
        }
      }
    })
  }
}

const reportSimpleComputed = () => {
  const offenses: Offense[] = []

  if (complicatedComputedFiles.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `${TEXT_INFO}vue-strong ~ complicated computed property${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Refactor the computed properties to smaller ones.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/simple-computed.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetSimpleComputed = () => {
  results.length = 0
  complicatedComputedFiles.length = 0
}

export { checkSimpleComputed, reportSimpleComputed, resetSimpleComputed }
