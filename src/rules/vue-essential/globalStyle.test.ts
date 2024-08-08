import { beforeEach, describe, expect, it } from 'vitest'
import type { SFCStyleBlock } from '@vue/compiler-sfc'
import { TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import { checkGlobalStyle, reportGlobalStyle, resetGlobalStyle } from './globalStyle'

describe('checkGlobalStyle', () => {
  beforeEach(() => {
    resetGlobalStyle()
  })

  it('should not report scoped styles', () => {
    const styles = [{ content: '<style scoped>h3{background:pink}</style>', scoped: true }] as SFCStyleBlock[]
    const filePath = 'scoped-style.vue'
    checkGlobalStyle(styles, filePath)
    expect(reportGlobalStyle().length).toBe(0)
    expect(reportGlobalStyle()).toStrictEqual([])
  })

  it('should report global styles', () => {
    const styles = [{ content: '<style>h3{background:pink}</style>' }] as SFCStyleBlock[]
    const filePath = 'global-style.vue'
    checkGlobalStyle(styles, filePath)
    expect(reportGlobalStyle().length).toBe(1)
    expect(reportGlobalStyle()).toStrictEqual([{
      file: filePath,
      rule: `${TEXT_INFO}vue-essential ~ global style${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Use <style scoped>.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-essential.html#use-component-scoped-styling`,
      message: `🚨`,
    }])
  })
})
