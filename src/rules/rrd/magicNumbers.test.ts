import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { describe, expect, it } from 'vitest'
import { checkMagicNumbers, reportMagicNumbers } from './magicNumbers'

describe('checkMagicNumbers', () => {
  it('should not report files without magic numbers', () => {
    const script = { content: '<script setup>\n\t\tconst vat = 27 \n</script>' } as SFCScriptBlock
    const fileName = 'no-magic-number.vue'
    checkMagicNumbers(script, fileName)
    const result = reportMagicNumbers()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should report files with magic number before a closing bracet', () => {
    const script = { content: 'if (ms < 100) { ... } else { ... }' } as SFCScriptBlock
    const fileName = 'with-magic-number-before-bracket.vue'
    checkMagicNumbers(script, fileName)
    const result = reportMagicNumbers()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>rrd ~ magic numbers</text_info>`,
      description: `👉 <text_warn>Extract magic numbers to a constant.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/magic-numbers.html`,
      message: `magic numbers found (line #1 <bg_warn>magic number: 100</bg_warn>) 🚨`,
    }])
  })

  it('should report files with magic number before a new line', () => {
    const script = {
      content: `function isAdult(age) {
        return age >= 18
        }`,
    } as SFCScriptBlock
    const fileName = 'with-magic-number-before-new-line.vue'
    checkMagicNumbers(script, fileName)
    const result = reportMagicNumbers()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>rrd ~ magic numbers</text_info>`,
      description: `👉 <text_warn>Extract magic numbers to a constant.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/magic-numbers.html`,
      message: `magic numbers found (line #2 <bg_warn>magic number: 18</bg_warn>) 🚨`,
    }])
  })

  it('should report files with multiple magic numbers', () => {
    const script = {
      content: `function isAdult(age) {
        if (age >= 18) {
          return age >= 18
        }
      }`,
    } as SFCScriptBlock
    const fileName = 'with-multiple-magic-numbers.vue'
    checkMagicNumbers(script, fileName)
    const result = reportMagicNumbers()
    expect(result.length).toBe(2)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>rrd ~ magic numbers</text_info>`,
      description: `👉 <text_warn>Extract magic numbers to a constant.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/magic-numbers.html`,
      message: `magic numbers found (line #2 <bg_warn>magic number: 18</bg_warn>) 🚨`,
    }, {
      file: fileName,
      rule: `<text_info>rrd ~ magic numbers</text_info>`,
      description: `👉 <text_warn>Extract magic numbers to a constant.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/magic-numbers.html`,
      message: `magic numbers found (line #3 <bg_warn>magic number: 18</bg_warn>) 🚨`,
    }])
  })

  it('should not report when there is a character before a number', () => {
    const script = {
      content: `window.atob(base64).split('')`,
    } as SFCScriptBlock
    const fileName = 'number-inside-string.vue'
    checkMagicNumbers(script, fileName)
    const result = reportMagicNumbers()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })
})
