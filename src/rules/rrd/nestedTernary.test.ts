import { beforeEach, describe, expect, it } from 'vitest'
import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import { checkNestedTernary, reportNestedTernary, resetNestedTernary } from './nestedTernary'

describe('checkNestedTernary', () => {
  beforeEach(() => {
    resetNestedTernary()
  })

  it('should not report files with simle ternary', () => {
    const script = {
      content: `const today = new Date()
      const isMonday = today.getDay() == 1 ? true : false`,
    } as SFCScriptBlock
    const fileName = 'nestedTernary.vue'
    checkNestedTernary(script, fileName)
    expect(reportNestedTernary().length).toBe(0)
    expect(reportNestedTernary()).toStrictEqual([])
  })

  it('should report files with nested ternary', () => {
    const script = {
      content: `const pass = 'Gauranga%)'
        const isStrong = pass.length > 12 ? pass.includes('%') ? pass.includes('$') : false : false`,
    } as SFCScriptBlock
    const fileName = 'nestedTernary-problem.vue'
    checkNestedTernary(script, fileName)
    expect(reportNestedTernary().length).toBe(1)
    expect(reportNestedTernary()).toStrictEqual([{
      file: fileName,
      rule: `${TEXT_INFO}rrd ~ nested Ternary${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Break the nested ternary into standalone ternaries, if statements, && operators, or a dedicated function.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/nested-ternary.html`,
      message: `line #2 has ${BG_WARN}nested ternary${BG_RESET} 🚨`,
    }])
  })
})
