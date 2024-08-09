import { beforeEach, describe, expect, it } from 'vitest'
import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import { checkMagicNumbers, reportMagicNumbers, resetMagicNumbers } from './magicNumbers'

describe('checkMagicNumbers', () => {
  beforeEach(() => {
    resetMagicNumbers()
  })

  it('should not report files without magic numbers', () => {
    const script = { content: '<script setup>\n\t\tconst vat = 27 \n</script>' } as SFCScriptBlock
    const fileName = 'no-magic-number.vue'
    checkMagicNumbers(script, fileName)
    expect(reportMagicNumbers().length).toBe(0)
    expect(reportMagicNumbers()).toStrictEqual([])
  })

  it('should report files with magic number before a closing bracet', () => {
    const script = { content: '\t\t\t\t\tif (ms < 100) { ... } else { ... }' } as SFCScriptBlock
    const fileName = 'with-magic-number-before-bracket.vue'
    checkMagicNumbers(script, fileName)
    expect(reportMagicNumbers().length).toBe(1)
    expect(reportMagicNumbers()).toStrictEqual([{
      file: fileName,
      rule: `${TEXT_INFO}rrd ~ magic numbers${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Extract magic numbers to a constant.${TEXT_RESET}`,
      message: `magic numbers found (line #1 ${BG_WARN}magic number: 2${BG_RESET}) 🚨`,
    }])
  })

  it('should report files with magic number before a new line', () => {
    const script = { content: `function isAdult(age) {
        return age >= 18
        }` } as SFCScriptBlock
    const fileName = 'with-magic-number-before-new-line.vue'
    checkMagicNumbers(script, fileName)
    expect(reportMagicNumbers().length).toBe(1)
    expect(reportMagicNumbers()).toStrictEqual([{
      file: fileName,
      rule: `${TEXT_INFO}rrd ~ magic numbers${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Extract magic numbers to a constant.${TEXT_RESET}`,
      message: `magic numbers found (line #3 ${BG_WARN}magic number: 2${BG_RESET}) 🚨`,
    }])
  })
})
