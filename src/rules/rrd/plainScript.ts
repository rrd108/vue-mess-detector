import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

const checkPlainScript = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script || !script.setup) {
    return
  }
  results.push({ filePath, message: `${BG_WARN}Plain <script> block${BG_RESET} found` })
}

const reportPlainScript = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `${TEXT_INFO}rrd ~ Plain <script> blocks${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN} Consider using <script setup> to leverage the new SFC <script> syntax.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/plain-script.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

export { checkPlainScript, reportPlainScript }
