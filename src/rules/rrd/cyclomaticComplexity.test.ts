import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { describe, expect, it } from 'vitest'
import { DEFAULT_OVERRIDE_CONFIG } from '../../helpers/constants'
import { checkCyclomaticComplexity, reportCyclomaticComplexity } from './cyclomaticComplexity'

describe('checkCyclomaticComplexity', () => {
  it('should not report simple scripts', () => {
    const content = `if (condition) {
        console.log("True");
      }`.repeat(4)
    const script = { content } as SFCScriptBlock
    const fileName = 'simple.vue'
    const complexityModerate = DEFAULT_OVERRIDE_CONFIG.complexityModerate
    checkCyclomaticComplexity(script, fileName, complexityModerate)
    const result = reportCyclomaticComplexity()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should report scripts with moderate complexity', () => {
    const content = `if (condition) {
        console.log("True");
      }`.repeat(6)
    const script = { content } as SFCScriptBlock
    const fileName = 'moderate.vue'
    const complexityModerate = DEFAULT_OVERRIDE_CONFIG.complexityModerate
    checkCyclomaticComplexity(script, fileName, complexityModerate)
    const result = reportCyclomaticComplexity()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>rrd ~ cyclomatic complexity</text_info>`,
      description: `👉 <text_warn>Try to reduce complexity.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/cyclomatic-complexity.html`,
      message: `Cyclomatic complexity is <bg_warn>high (6)</bg_warn> 🚨`,
    }])
  })

  it('should report scripts with high complexity', () => {
    const content = `if (condition) {
        console.log("True");
      }`.repeat(11)
    const script = { content } as SFCScriptBlock
    const fileName = 'high.vue'
    const complexityModerate = DEFAULT_OVERRIDE_CONFIG.complexityModerate
    checkCyclomaticComplexity(script, fileName, complexityModerate)
    const result = reportCyclomaticComplexity()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>rrd ~ cyclomatic complexity</text_info>`,
      description: `👉 <text_warn>Try to reduce complexity.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/cyclomatic-complexity.html`,
      message: `Cyclomatic complexity is <bg_err>very high (11)</bg_err> 🚨`,
    }])
  })
})
