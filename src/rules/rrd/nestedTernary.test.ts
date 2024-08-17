import { beforeEach, describe, expect, it } from 'vitest'
import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import { checkNestedTernary, reportNestedTernary, resetNestedTernary } from './nestedTernary'

describe('checkNestedTernary', () => {
  beforeEach(() => {
    resetNestedTernary()
  })

  it('should not report files with simle ternary', () => {
    let script = {
      content: `const today = new Date()
      const isMonday = today.getDay() == 1 ? true : false`,
    } as SFCScriptBlock
    const fileName = 'nestedTernary.vue'
    checkNestedTernary(script, fileName)
    expect(reportNestedTernary().length).toBe(0)
    expect(reportNestedTernary()).toStrictEqual([])
  })

  it.skip('should report files with nested ternary', () => {
    const script = {
        content: `const isStrong = pass.length > 12 ? pass.includes('%') ? pass.includes('$') : false : false`,
    } as SFCScriptBlock
    const fileName = 'nestedTernary-problem.vue'
    checkNestedTernary(script, fileName)
    expect(reportNestedTernary().length).toBe(1)
    expect(reportNestedTernary()).toStrictEqual([{
      file: fileName,
      rule: `${TEXT_INFO}rrd ~ nested Ternary${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}/* TODO tip to fix this issue */.${TEXT_RESET} See: https:///* TODO doc link */`,
      message: `line #/* TODO line number from your content above*/ ${BG_WARN}/* TODO message from the rule file */${BG_RESET} 🚨`,
    }])
  })
})
