import { beforeEach, describe, expect, it } from 'vitest'
import type { SFCStyleBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import { checkElementSelectorsWithScoped, reportElementSelectorsWithScoped, resetElementSelectorWithScoped } from './elementSelectorsWithScoped'

describe('checkElementSelectorsWithScoped', () => {
  beforeEach(() => {
    resetElementSelectorWithScoped()
  })

  it('should not report non-element selectors', () => {
    const styles = [{ content: '.my-class { font-size: 14px; }', scoped: true }] as SFCStyleBlock[]
    const filePath = 'non-element-selectors.vue'
    checkElementSelectorsWithScoped(styles, filePath)
    expect(reportElementSelectorsWithScoped().length).toBe(0)
    expect(reportElementSelectorsWithScoped()).toStrictEqual([])
  })

  it('should report element selectors in the valid HTML tags list', () => {
    const styles = [{ content: 'button { background: blue; }', scoped: true }] as SFCStyleBlock[]
    const filename = 'element-selectors.vue'
    checkElementSelectorsWithScoped(styles, filename)
    expect(reportElementSelectorsWithScoped().length).toBe(1)
    expect(reportElementSelectorsWithScoped()).toStrictEqual([{
      file: filename,
      rule: `${TEXT_INFO}vue-caution ~ element selectors with scoped${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/element-selectors-with-scoped.html`,
      message: `${BG_WARN}(button)${BG_RESET} 🚨`,
    }])
  })

  it('should handle multiple element selectors', () => {
    const styles = [{ content: 'button { background: blue; } div { color: red; }', scoped: true }] as SFCStyleBlock[]
    const filename = 'multiple-element-selectors.vue'
    checkElementSelectorsWithScoped(styles, filename)
    expect(reportElementSelectorsWithScoped().length).toBe(2)
    expect(reportElementSelectorsWithScoped()).toStrictEqual([{
      file: filename,
      rule: `${TEXT_INFO}vue-caution ~ element selectors with scoped${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/element-selectors-with-scoped.html`,
      message: `${BG_WARN}(button)${BG_RESET} 🚨`,
    }, {
      file: filename,
      rule: `${TEXT_INFO}vue-caution ~ element selectors with scoped${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Prefer class selectors over element selectors in scoped styles, because large numbers of element selectors are slow.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/vue-caution/element-selectors-with-scoped.html`,
      message: `${BG_WARN}(div)${BG_RESET} 🚨`,
    }])
  })
})
