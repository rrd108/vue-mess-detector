import type { SFCScriptBlock } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

const checkScriptLength = (script: SFCScriptBlock | null, filePath: string, maxLength: number) => {
  if (!script) {
    return
  }
  const lines = script.content.split('\n')
  if (lines.length > maxLength) {
    results.push({ filePath, message: `${lines.length > maxLength * 2 ? '<bg_err>' : '<bg_warn>'}(${
      lines.length
    } lines)${lines.length > maxLength * 2 ? '</bg_err>' : '</bg_warn>'}` })
  }
}

const reportScriptLength = (maxLength: number) => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>rrd ~ Long <script> blocks</text_info>`,
        description: `👉 <text_warn>Try to refactor out the logic into composable functions or other files and keep the script block's length under ${maxLength} lines.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/script-length.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetScriptLength = () => (results.length = 0)

export { checkScriptLength, reportScriptLength, resetScriptLength }
