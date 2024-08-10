import { beforeEach, describe, expect, it } from 'vitest'
import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_ERR, BG_RESET, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import { checkElseCondition, reportElseCondition, resetElseCondition } from './elseCondition'

describe('checkElseCondition', () => {
  beforeEach(() => {
    resetElseCondition()
  })

  it('should not report files without else conditions', () => {
    const script = { content: '<script setup>\nconsole.log("Hello")\n</script>' } as SFCScriptBlock
    const fileName = 'no-else.vue'
    checkElseCondition(script, fileName)
    expect(reportElseCondition().length).toBe(0)
    expect(reportElseCondition()).toStrictEqual([])
  })

  it('should report files with one else condition', () => {
    const script = { content: 'if (true) { ... } else { ... }' } as SFCScriptBlock
    const fileName = 'with-else.vue'
    checkElseCondition(script, fileName)
    expect(reportElseCondition().length).toBe(1)
    expect(reportElseCondition()).toStrictEqual([{
      file: fileName,
      rule: `${TEXT_INFO}rrd ~ else conditions${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Try to rewrite the conditions in a way that the else clause is not necessary.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/else-condition.html`,
      message: `else clauses found ${BG_ERR}(1)${BG_RESET} 🚨`,
    }])
  })
})
