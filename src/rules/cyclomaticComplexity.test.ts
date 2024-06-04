import { describe, expect, it, vi } from 'vitest'
import { SFCScriptBlock } from '@vue/compiler-sfc'
import { checkCyclomaticComplexity, reportCyclomaticComplexity } from './cyclomaticComplexity'
import { BG_ERR, BG_RESET, BG_WARN } from '../asceeCodes'

const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})

describe('checkCyclomaticComplexity', () => {
  it('should not report simple scripts', () => {
    const script = { content: 'const message = "Hello"; console.log(message);' } as SFCScriptBlock
    const fileName = 'simple.vue'
    checkCyclomaticComplexity(script, fileName)
    expect(reportCyclomaticComplexity()).toBe(0)
    expect(mockConsoleLog).not.toHaveBeenCalled()
  })

  it('should report scripts with moderate complexity', () => {
    const content = `if (condition) {
        console.log("True");
      }`.repeat(6)
    const script = { content } as SFCScriptBlock
    const fileName = 'moderate.vue'
    checkCyclomaticComplexity(script, fileName)
    expect(reportCyclomaticComplexity()).toBe(1)
    expect(mockConsoleLog).toHaveBeenCalled()
    expect(mockConsoleLog).toHaveBeenLastCalledWith(`- ${fileName} ${BG_WARN}(6)${BG_RESET}`)
  })

  it('should report scripts with high complexity', () => {
    const content = `if (condition) {
        console.log("True");
      }`.repeat(11)
    const script = { content } as SFCScriptBlock
    const fileName = 'high.vue'
    checkCyclomaticComplexity(script, fileName)
    expect(reportCyclomaticComplexity()).toBe(2)
    expect(mockConsoleLog).toHaveBeenCalled()
    expect(mockConsoleLog).toHaveBeenLastCalledWith(`- ${fileName} ${BG_ERR}(11)${BG_RESET}`)
  })
})
