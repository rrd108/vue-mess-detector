import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import type { Offense } from '../../types'

const plainScriptFiles: string[] = []

const checkPlainScript = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script || !script.setup) {
    return
  }
  plainScriptFiles.push(filePath)
}

const reportPlainScript = () => {
  const offenses: Offense[] = []

  if (plainScriptFiles.length > 0) {
    plainScriptFiles.forEach((file) => {
      offenses.push({
        file,
        rule: `${TEXT_INFO}rrd ~ Plain <script> blocks${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN} Consider using <script setup> to leverage the new SFC <script> syntax.${TEXT_RESET}`,
        message: `🚨`,
      })
    })
  }
  return offenses
}

export { checkPlainScript, reportPlainScript }
