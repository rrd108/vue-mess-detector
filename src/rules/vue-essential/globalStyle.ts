import type { SFCStyleBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

const checkGlobalStyle = (styles: SFCStyleBlock[] | null, filePath: string) => {
  if (!styles) {
    return
  }
  styles.forEach((style) => {
    if (!style.scoped) {
      results.push({ filePath, message: `${BG_WARN}global style${BG_RESET} used`,
      })
    }
  })
}

const reportGlobalStyle = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `${TEXT_INFO}vue-essential ~ global style${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Use <style scoped>.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/global-style.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  return offenses
}

const resetGlobalStyle = () => (results.length = 0)

export { checkGlobalStyle, reportGlobalStyle, resetGlobalStyle }
