import { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_WARN, TEXT_RESET, TEXT_INFO } from '../asceeCodes'

const plainScriptFiles: string[] = []

const checkPlainScript = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script || !script.setup) {
    return
  }
  plainScriptFiles.push(filePath)
}

const reportPlainScript = () => {
  if (plainScriptFiles.length > 0) {
    console.log(
      `\n${TEXT_INFO}rrd${TEXT_RESET} ${BG_WARN}Plain <script> blocks${BG_RESET} in ${plainScriptFiles.length} files.`
    )
    console.log(`👉 ${TEXT_WARN} Consider using <script setup> to leverage the new SFC <script> syntax.${TEXT_RESET}`)
    plainScriptFiles.forEach(file => {
      console.log(`- ${file}`)
    })
  }
  return plainScriptFiles.length
}

export { checkPlainScript, reportPlainScript }
