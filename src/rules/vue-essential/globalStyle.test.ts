import type { SFCStyleBlock } from '@vue/compiler-sfc'
import { beforeEach, describe, expect, it } from 'vitest'

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
      rule: `<text_info>vue-essential ~ global style</text_info>`,
      description: `👉 <text_warn>Use <style scoped>.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/global-style.html`,
      message: `<bg_err>global style</bg_err> used 🚨`,
    }])
  })
})
