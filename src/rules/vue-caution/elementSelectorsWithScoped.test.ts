import type { SFCStyleBlock } from '@vue/compiler-sfc'
import { describe, expect, it } from 'vitest'
import { checkElementSelectorsWithScoped, reportElementSelectorsWithScoped } from './elementSelectorsWithScoped'

describe('checkElementSelectorsWithScoped', () => {
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

  const flagged = (content: string, scoped = true) => {
    checkElementSelectorsWithScoped([{ content, scoped }] as SFCStyleBlock[], 'file.vue')
    return reportElementSelectorsWithScoped().map(o => o.message)
  }

  it('should not report class selectors whose name is an html tag (#620)', () => {
    expect(flagged('.header { color: red; } .custom-button { color: blue; } .card .title { margin: 0; }')).toStrictEqual([])
  })

  it('should not report id, attribute or element-qualified selectors', () => {
    expect(flagged('#main { color: red; } [data-x] { color: red; } div.box { color: red; } button#go { color: red; }')).toStrictEqual([])
  })

  it('should not report element selectors in non-scoped styles', () => {
    expect(flagged('div { color: red; }', false)).toStrictEqual([])
  })

  it('should report element selectors as the last compound, with pseudo-classes, in lists and inside at-rules', () => {
    expect(flagged('.card > span { color: red; }')).toStrictEqual(['<bg_warn>(span)</bg_warn> 🚨'])
    expect(flagged('a:hover { color: red; }')).toStrictEqual(['<bg_warn>(a)</bg_warn> 🚨'])
    expect(flagged('.foo, p { color: red; }')).toStrictEqual(['<bg_warn>(p)</bg_warn> 🚨'])
    expect(flagged('@media (max-width: 600px) { li { color: red; } }')).toStrictEqual(['<bg_warn>(li)</bg_warn> 🚨'])
  })

  it('should ignore comments, keyframe steps and :deep() targets', () => {
    expect(flagged('/* div { } */ .a { color: red; }')).toStrictEqual([])
    expect(flagged('@keyframes fade { from { opacity: 0; } to { opacity: 1; } }')).toStrictEqual([])
    expect(flagged('.wrap :deep(button) { color: red; }')).toStrictEqual([])
  })
})
