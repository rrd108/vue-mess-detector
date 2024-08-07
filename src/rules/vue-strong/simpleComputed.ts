import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_ERR, BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import getLineNumber from '../getLineNumber'
import type { Offense } from '../../types'

const complicatedComputedTargets: { filename: string, message: string }[] = []
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
        complicatedComputedTargets.push({ filename: filePath, message: `${filePath}:${lineNumber} ${BG_WARN}computed${BG_RESET}` })
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
    complicatedComputedTargets.forEach((file) => {
      offenses.push({
        file: file.filename,
        rule: `${BG_WARN}vue-strong ~ complicated computed property${BG_RESET}`,
        title: '',
        description: `👉 ${TEXT_WARN}Refactor the computed properties to smaller ones.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#simple-computed-properties`,
        message: `${file.message} 🚨`,
      })
    })
  }
  return offenses
}

export { checkSimpleComputed, reportSimpleComputed }
