import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { beforeEach, describe, expect, it } from 'vitest'
import { checkElseCondition, reportElseCondition, resetResults } from './elseCondition'

describe('checkElseCondition', () => {
  beforeEach(() => {
    resetResults()
  })

  it('should not report files without else conditions', () => {
    const script = { content: '<script setup>\nconsole.log("Hello")\n</script>' } as SFCScriptBlock
    const fileName = 'no-else.vue'
    checkElseCondition(script, fileName)
    const result = reportElseCondition()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should report files with one else condition', () => {
    const script = { content: 'if (true) { ... } else { ... }' } as SFCScriptBlock
    const fileName = 'with-else.vue'
    checkElseCondition(script, fileName)
    const result = reportElseCondition()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>rrd ~ else conditions</text_info>`,
      description: `👉 <text_warn>Try to rewrite the conditions in a way that the else clause is not necessary.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/else-condition.html`,
      message: `else clauses found <bg_err>(1)</bg_err> 🚨`,
    }])
  })

  it('should not report files with else conditions in comments', () => {
    const script = { content: `
      <script setup>
        // eslint-disable-next-line no-else-return
        if (true) {
          return 'Hello'
        } //else {
          //return 'World'
        //}
      </script>
    ` } as SFCScriptBlock
    const fileName = 'commented-else.vue'
    checkElseCondition(script, fileName)
    const result = reportElseCondition()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })
})
