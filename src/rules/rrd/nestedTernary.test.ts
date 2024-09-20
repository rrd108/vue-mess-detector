import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { beforeEach, describe, expect, it } from 'vitest'

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
      rule: `<text_info>rrd ~ nested Ternary</text_info>`,
      description: `👉 <text_warn>Break the nested ternary into standalone ternaries, if statements, && operators, or a dedicated function.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/nested-ternary.html`,
      message: `line #2 has <bg_warn>nested ternary</bg_warn> 🚨`,
    }])
  })

  it.todo('should not report files when optional chaning is used along with a ternary', () => {
    const script = {
      content: `const countDatasets = this.structure?.volume ? this.structure.volume.length : 0;`,
    } as SFCScriptBlock
    const fileName = 'nestedTernary-problem.vue'
    checkNestedTernary(script, fileName)
    expect(reportNestedTernary().length).toBe(0)
    expect(reportNestedTernary()).toStrictEqual([])
  })
})
