import type { SFCStyleBlock } from '@vue/compiler-sfc'
import { beforeEach, describe, expect, it } from 'vitest'
import { checkElementSelectorsWithScoped, reportElementSelectorsWithScoped, resetResults } from './elementSelectorsWithScoped'

describe('checkElementSelectorsWithScoped', () => {
  beforeEach(() => {
    resetResults()
  })

  it('should not report non-element selectors', () => {
    const styles = [{ content: '.my-class { font-size: 14px; }', scoped: true }] as SFCStyleBlock[]
    const filePath = 'non-element-selectors.vue'
    checkElementSelectorsWithScoped(styles, filePath)
    const result = reportElementSelectorsWithScoped()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should report element selectors in the valid HTML tags list', () => {
    const styles = [{ content: 'button { background: blue; }', scoped: true }] as SFCStyleBlock[]
    const filename = 'element-selectors.vue'
    checkElementSelectorsWithScoped(styles, filename)
    const result = reportElementSelectorsWithScoped()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: filename,
      rule: `<text_info>vue-caution ~ element selectors with scoped</text_info>`,
      description: `👉 <text_warn>Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-caution/element-selectors-with-scoped.html`,
      message: `<bg_warn>(button)</bg_warn> 🚨`,
    }])
  })

  it('should handle multiple element selectors', () => {
    const styles = [{ content: 'button { background: blue; } div { color: red; }', scoped: true }] as SFCStyleBlock[]
    const filename = 'multiple-element-selectors.vue'
    checkElementSelectorsWithScoped(styles, filename)
    const result = reportElementSelectorsWithScoped()
    expect(result.length).toBe(2)
    expect(result).toStrictEqual([{
      file: filename,
      rule: `<text_info>vue-caution ~ element selectors with scoped</text_info>`,
      description: `👉 <text_warn>Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-caution/element-selectors-with-scoped.html`,
      message: `<bg_warn>(button)</bg_warn> 🚨`,
    }, {
      file: filename,
      rule: `<text_info>vue-caution ~ element selectors with scoped</text_info>`,
      description: `👉 <text_warn>Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-caution/element-selectors-with-scoped.html`,
      message: `<bg_warn>(div)</bg_warn> 🚨`,
    }])
  })
})
