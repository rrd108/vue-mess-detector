import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_ERR, BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import type { Offense } from '../../types'

const MAX_SCRIPT_LENGTH = 100

const longScriptFiles: { fileName: string, scriptLength: number }[] = []

const checkScriptLength = (script: SFCScriptBlock | null, file: string) => {
  if (!script) {
    return
  }
  const lines = script.content.split('\n')
  if (lines.length > MAX_SCRIPT_LENGTH) {
    longScriptFiles.push({ fileName: file, scriptLength: lines.length })
  }
}

const reportScriptLength = () => {
  const offenses: Offense[] = []

  if (longScriptFiles.length > 0) {
    longScriptFiles.forEach((file) => {
      offenses.push({
        file: file.fileName,
        rule: `${BG_WARN}rrd ~ Long <script> blocks${BG_RESET}`,
        title: '',
        description: `👉 ${TEXT_WARN}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${MAX_SCRIPT_LENGTH} lines.${TEXT_RESET}`,
        message: `${file.scriptLength > MAX_SCRIPT_LENGTH * 2 ? BG_ERR : BG_WARN}(${
          file.scriptLength
        } lines)${BG_RESET}`,
      })
    })
  }
  return offenses
}

export { checkScriptLength, reportScriptLength }
