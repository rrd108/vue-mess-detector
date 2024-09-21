import type { SFCStyleBlock } from '@vue/compiler-sfc'

import type { FileCheckResult, Offense } from '../../types'

const results: FileCheckResult[] = []

const resetResults = () => (results.length = 0)

const checkGlobalStyle = (styles: SFCStyleBlock[] | null, filePath: string) => {
  if (!styles) {
    return
  }

  styles.forEach((style) => {
    if (!style.scoped) {
      results.push({ filePath, message: `<bg_err>global style</bg_err> used` })
    }
  })
}

const reportGlobalStyle = () => {
  const offenses: Offense[] = []

  if (results.length > 0) {
    results.forEach((result) => {
      offenses.push({
        file: result.filePath,
        rule: `<text_info>vue-essential ~ global style</text_info>`,
        description: `👉 <text_warn>Use <style scoped>.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/global-style.html`,
        message: `${result.message} 🚨`,
      })
    })
  }
  resetResults()

  return offenses
}

export { checkGlobalStyle, reportGlobalStyle }
