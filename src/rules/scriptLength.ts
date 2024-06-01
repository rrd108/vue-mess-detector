import { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_ERR, BG_RESET, BG_WARN, TEXT_WARN, TEXT_RESET } from '../asceeCodes'

const MAX_SCRIPT_LENGTH = 50

const longScriptFiles: { fileName: string; scriptLength: number }[] = []

const checkScriptLength = (script: SFCScriptBlock, file: string) => {
  const lines = script.content.split('\n')
  if (lines.length > MAX_SCRIPT_LENGTH) {
    longScriptFiles.push({ fileName: file, scriptLength: lines.length })
  }
}

const reportScriptLength = () => {
  if (longScriptFiles.length > 0) {
    console.log(`\n${BG_ERR}Long <script> blocks${BG_RESET} in ${longScriptFiles.length} files.`)
    console.log(
      `👉 ${TEXT_WARN}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${MAX_SCRIPT_LENGTH} lines.${TEXT_RESET}`
    )
    longScriptFiles.forEach(file => {
      console.log(
        `- ${file.fileName} ${file.scriptLength > MAX_SCRIPT_LENGTH * 2 ? BG_ERR : BG_WARN}(${
          file.scriptLength
        } lines)${BG_RESET}`
      )
    })
  }
  return longScriptFiles.length
}

export { checkScriptLength, reportScriptLength }
