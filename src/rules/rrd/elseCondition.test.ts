import { describe, expect, it, vi } from 'vitest'
import { SFCScriptBlock } from '@vue/compiler-sfc'
import { checkElseCondition, reportElseCondition } from './elseCondition'
import { BG_RESET, BG_WARN } from '../asceeCodes'

const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})

describe('checkElseCondition', () => {
  it('should not report files without else conditions', () => {
    const script = { content: '<script setup>\nconsole.log("Hello")\n</script>' } as SFCScriptBlock
    const fileName = 'no-else.vue'
    checkElseCondition(script, fileName)
    expect(reportElseCondition()).toBe(0)
    expect(mockConsoleLog).not.toHaveBeenCalled()
  })

  it('should report files with one else condition', () => {
    const script = { content: 'if (true) { ... } else { ... }' } as SFCScriptBlock
    const fileName = 'with-else.vue'
    checkElseCondition(script, fileName)
    expect(reportElseCondition()).toBe(1)
    expect(mockConsoleLog).toHaveBeenCalled()
    expect(mockConsoleLog).toHaveBeenLastCalledWith(`- with-else.vue ${BG_WARN}(1)${BG_RESET}`)
  })
})
