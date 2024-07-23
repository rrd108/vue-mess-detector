import { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_RESET, TEXT_WARN, TEXT_RESET, BG_ERR, TEXT_INFO, BG_WARN } from '../asceeCodes'
import getLineNumber from '../getLineNumber'

const complicatedComputedTargets: { message: string }[] = []
const complicatedComputedFiles: { filePath: string }[] = []

const MAX_COMPUTED_LENGTH = 5 // completely rrd made-up number

const checkSimpleComputed = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }

  const regex = /const\s+([a-zA-Z0-9_$]+)\s*=\s*computed\(\s*\(\)\s*=>\s*{([^{}]*(?:{[^{}]*}[^{}]*)*)}\s*\)/gs

  const matches = script.content.match(regex)
  if (matches?.length) {
    matches.forEach(match => {
      if (match.split('\n').length > MAX_COMPUTED_LENGTH) {
        const firstLine = match.split('\n')[0]
        const lineNumber = getLineNumber(script.content, firstLine)
        complicatedComputedTargets.push({ message: `${filePath}:${lineNumber} ${BG_WARN}computed${BG_RESET}` })
        complicatedComputedFiles.push({ filePath })
        if (!complicatedComputedFiles.some(file => file.filePath === filePath)) {
          complicatedComputedFiles.push({ filePath: filePath })
        }
      }
    })
  }
}

const reportSimpleComputed = () => {
  if (complicatedComputedFiles.length > 0) {
    console.log(
      `\n${TEXT_INFO}vue-strong${TEXT_RESET} ${BG_ERR}complicated computed property ${BG_RESET} in ${complicatedComputedFiles.length} files.`
    )
    console.log(
      `👉 ${TEXT_WARN}Refactor the computed properties to smaller ones.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#simple-computed-properties`
    )
    complicatedComputedTargets.forEach(file => {
      console.log(`- ${file.message} 🚨`)
    })
  }
  return complicatedComputedTargets.length
}

export { checkSimpleComputed, reportSimpleComputed }
