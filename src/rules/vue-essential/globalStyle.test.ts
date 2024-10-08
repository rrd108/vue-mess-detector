import type { SFCStyleBlock } from '@vue/compiler-sfc'
import { describe, expect, it } from 'vitest'
import { checkGlobalStyle, reportGlobalStyle } from './globalStyle'

describe('checkGlobalStyle', () => {
  it('should not report scoped styles', () => {
    const styles = [{ content: '<style scoped>h3{background:pink}</style>', scoped: true }] as SFCStyleBlock[]
    const filePath = 'scoped-style.vue'
    checkGlobalStyle(styles, filePath)
    const result = reportGlobalStyle()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should report global styles', () => {
    const styles = [{ content: '<style>h3{background:pink}</style>' }] as SFCStyleBlock[]
    const filePath = 'global-style.vue'
    checkGlobalStyle(styles, filePath)
    const result = reportGlobalStyle()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: filePath,
      rule: `<text_info>vue-essential ~ global style</text_info>`,
      description: `👉 <text_warn>Use <style scoped>.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/global-style.html`,
      message: `<bg_err>global style</bg_err> used 🚨`,
    }])
  })
})
