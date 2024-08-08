import type { SFCStyleBlock } from '@vue/compiler-sfc'
import { TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import type { Offense } from '../../types'

const globalStyleFiles: { filePath: string }[] = []

const checkGlobalStyle = (styles: SFCStyleBlock[] | null, filePath: string) => {
  if (!styles) {
    return
  }
  styles.forEach((style) => {
    if (!style.scoped) {
      globalStyleFiles.push({ filePath })
    }
  })
}

const reportGlobalStyle = () => {
  const offenses: Offense[] = []

  if (globalStyleFiles.length > 0) {
    globalStyleFiles.forEach((file) => {
      offenses.push({
        file: file.filePath,
        rule: `${TEXT_INFO}vue-essential ~ global style${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Use <style scoped>.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-essential.html#use-component-scoped-styling`,
        message: `🚨`,
      })
    })
  }
  return offenses
}

const resetGlobalStyle = () => (globalStyleFiles.length = 0)

export { checkGlobalStyle, reportGlobalStyle, resetGlobalStyle }
