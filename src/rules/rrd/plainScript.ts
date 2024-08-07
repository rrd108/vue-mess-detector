import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
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
        rule: `${BG_WARN}rrd ~ Plain <script> blocks${BG_RESET}`,
        title: '',
        description: `👉 ${TEXT_WARN} Consider using <script setup> to leverage the new SFC <script> syntax.${TEXT_RESET}`,
        message: `N/A`,
      })
    })
  }
  return offenses
}

export { checkPlainScript, reportPlainScript }
