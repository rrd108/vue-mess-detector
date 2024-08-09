import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_ERR, BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

export const MAX_SCRIPT_LENGTH = 100

const checkScriptLength = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }
  const lines = script.content.split('\n')
  if (lines.length > MAX_SCRIPT_LENGTH) {
    results.push({ filePath, message: `${lines.length > MAX_SCRIPT_LENGTH * 2 ? BG_ERR : BG_WARN}(${
      lines.length
    } lines)${BG_RESET}` })
  }
}

const reportScriptLength = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `${TEXT_INFO}rrd ~ Long <script> blocks${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${MAX_SCRIPT_LENGTH} lines.${TEXT_RESET}`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetScriptLength = () => (results.length = 0)

export { checkScriptLength, reportScriptLength, resetScriptLength }
