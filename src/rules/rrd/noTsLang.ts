import type { SFCScriptBlock } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

const resetResults = () => (results.length = 0)

const checkNoTsLang = (script: SFCScriptBlock | null, filePath: string) => {
  if (!script) {
    return
  }

  if (script.lang !== 'ts') {
    results.push({
      filePath,
      message: `<bg_warn>component uses js instead of ts</bg_warn>`,
    })
  }
}

const reportNoTsLang = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>rrd ~ no ts lang</text_info>`,
        description: `👉 <text_warn>Use typescript instead of javascript.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-ts-lang.html`,
        message: `${result.message} 🚨`,

      })
    })
  }

  resetResults()

  return offenses
}

export { checkNoTsLang, reportNoTsLang }
