import { beforeEach, describe, expect, it } from 'vitest'
import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { checkCyclomaticComplexity, reportCyclomaticComplexity, resetCyclomaticComplexity } from './cyclomaticComplexity'

describe('checkCyclomaticComplexity', () => {
  beforeEach(() => {
    resetCyclomaticComplexity()
  })

  it('should not report simple scripts', () => {
    const content = `if (condition) {
        console.log("True");
      }`.repeat(4)
    const script = { content } as SFCScriptBlock
    const fileName = 'simple.vue'
    checkCyclomaticComplexity(script, fileName)
    expect(reportCyclomaticComplexity().length).toBe(0)
    expect(reportCyclomaticComplexity()).toStrictEqual([])
  })

  it('should report scripts with moderate complexity', () => {
    const content = `if (condition) {
        console.log("True");
      }`.repeat(6)
    const script = { content } as SFCScriptBlock
    const fileName = 'moderate.vue'
    checkCyclomaticComplexity(script, fileName)
    expect(reportCyclomaticComplexity().length).toBe(1)
    expect(reportCyclomaticComplexity()).toStrictEqual([{
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
    checkCyclomaticComplexity(script, fileName)
    expect(reportCyclomaticComplexity().length).toBe(1)
    expect(reportCyclomaticComplexity()).toStrictEqual([{
      file: fileName,
      rule: `<text_info>rrd ~ cyclomatic complexity</text_info>`,
      description: `👉 <text_warn>Try to reduce complexity.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/cyclomatic-complexity.html`,
      message: `Cyclomatic complexity is <bg_err>very high (11)</bg_err> 🚨`,
    }])
  })
})
