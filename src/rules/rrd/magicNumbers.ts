import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { anyOf, createRegExp, digit, global, linefeed,  } from 'magic-regexp'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import type { Offense } from '../../types'
import getLineNumber from '../getLineNumber'

const magicNumberFiles: { filePath: string, message: string }[] = []

const checkMagicNumbers = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }
  const regex = createRegExp(digit, anyOf(')', linefeed), [global,])
  const matches = script.content.match(regex)

  matches?.forEach((match) => {
    const lineNumber = getLineNumber(script.content, match)
    magicNumberFiles.push({
      filePath,
      message: `line #${lineNumber} ${BG_WARN}magic number: ${match.length}${BG_RESET}`,
    })
  })
  
}

const reportMagicNumbers = () => {
  const offenses: Offense[] = []

  if (magicNumberFiles.length > 0) {
    magicNumberFiles.forEach((file) => {
      offenses.push({
        file: file.filePath,
        rule: `${TEXT_INFO}rrd ~ magic numbers${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Extract magic numbers to a constant.${TEXT_RESET}`,
        message: `magic numbers found (${file.message}) 🚨`,
      })
    })
  }
  return offenses
}

const resetMagicNumbers = () => (magicNumberFiles.length = 0)

export { checkMagicNumbers, reportMagicNumbers, resetMagicNumbers }
