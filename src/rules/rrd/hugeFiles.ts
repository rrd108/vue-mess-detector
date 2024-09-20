import type { SFCDescriptor } from '@vue/compiler-sfc'
import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

const WARNING_THRESHOLD = 300
const ERROR_THRESHOLD = 2 * WARNING_THRESHOLD

const resetResults = () => (results.length = 0)

const checkHugeFiles = (descriptor: SFCDescriptor, filePath: string, isVueFile: boolean) => {
  let totalLines = 0

  resetResults()

  if (isVueFile) {
    totalLines = descriptor.scriptSetup?.content.trim().split('\n').length ?? 0
    totalLines += descriptor.template?.content.trim().split('\n').length ?? 0
    totalLines += descriptor.styles?.reduce((acc, style) => acc + style.content.trim().split('\n').length, 0) ?? 0
  }
  else {
    totalLines = descriptor.scriptSetup?.content.trim().split('\n').length ?? 0
  }

  if (totalLines > ERROR_THRESHOLD) {
    results.push({
      filePath,
      message: `<bg_err>huge file (${totalLines} lines)</bg_err>`,
    })
  }
  else if (totalLines > WARNING_THRESHOLD) {
    results.push({
      filePath,
      message: `<bg_warn>large file (${totalLines} lines)</bg_warn>`,
    })
  }
}

const reportHugeFiles = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>rrd ~ huge files</text_info>`,
        description: `👉 <text_warn>Try to split this component into smaller components or extract logic into composables.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/huge-files.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

export { checkHugeFiles, reportHugeFiles }
