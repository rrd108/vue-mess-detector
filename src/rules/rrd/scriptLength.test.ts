import { describe, it, expect, vi } from 'vitest'
import { SFCScriptBlock } from '@vue/compiler-sfc'
import { checkScriptLength, reportScriptLength } from './scriptLength'
import { BG_RESET, BG_WARN } from '../asceeCodes'

const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})

describe('checkScriptLength', () => {
  it('should not report "long scripts" for a short script', () => {
    const shortScript = { content: '<script setup>\nconsole.log("Hello")\n</script>' } as SFCScriptBlock
    const fileName = 'short.vue'
    checkScriptLength(shortScript, fileName)
    expect(reportScriptLength()).toBe(0)
    expect(mockConsoleLog).not.toHaveBeenCalled()
  })

  it('should report long scripts for a long script', () => {
    let content = '<scritp setup>'
    for (let i = 0; i < 102; i++) {
      content += `\nconsole.log("Hello ${i}")`
    }
    content += '\n</script>'
    const longScript = { content } as SFCScriptBlock
    const fileName = 'long.vue'
    checkScriptLength(longScript, fileName)
    expect(reportScriptLength()).toBe(1)
    expect(mockConsoleLog).toHaveBeenCalled()
    expect(mockConsoleLog).toHaveBeenLastCalledWith(`- long.vue ${BG_WARN}(104 lines)${BG_RESET}`)
  })
})
