import { beforeEach, describe, expect, it } from 'vitest'
import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_ERR, BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
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
      rule: `${TEXT_INFO}rrd ~ cyclomatic complexity${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Try to reduce complexity.${TEXT_RESET}`,
      message: `${BG_WARN}(6)${BG_RESET} 🚨`,
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
      rule: `${TEXT_INFO}rrd ~ cyclomatic complexity${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Try to reduce complexity.${TEXT_RESET}`,
      message: `${BG_ERR}(11)${BG_RESET} 🚨`,
    }])
  })
})
