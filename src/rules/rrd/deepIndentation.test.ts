import { describe, expect, it, vi } from 'vitest'
import { SFCScriptBlock } from '@vue/compiler-sfc'
import { checkDeepIndentation, reportDeepIndentation } from './deepIndentation'
import { BG_RESET, BG_WARN } from '../asceeCodes'

const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})

describe('checkDeepIndentation', () => {
  it('should not report files without deep indentations', () => {
    let script = { content: '<script setup>\n\t\tconsole.log("Hello")\n</script>' } as SFCScriptBlock
    let fileName = 'no-deep-indentation-tab.vue'
    checkDeepIndentation(script, fileName)
    expect(reportDeepIndentation()).toBe(0)
    expect(mockConsoleLog).not.toHaveBeenCalled()

    script = { content: '<script setup>\n        console.log("Hello")\n</script>' } as SFCScriptBlock
    fileName = 'no-deep-indentation-space.vue'
    checkDeepIndentation(script, fileName)
    expect(reportDeepIndentation()).toBe(0)
    expect(mockConsoleLog).not.toHaveBeenCalled()
  })

  it('should report files with deep indentation', () => {
    let script = { content: '\t\t\t\t\tif (true) { ... } else { ... }' } as SFCScriptBlock
    let fileName = 'with-deep-indentation-tab.vue'
    checkDeepIndentation(script, fileName)
    expect(reportDeepIndentation()).toBe(1)
    expect(mockConsoleLog).toHaveBeenCalled()
    expect(mockConsoleLog).toHaveBeenLastCalledWith(`- ${fileName} ${BG_WARN}(1)${BG_RESET}`)

    script = { content: '               if (true) { ... } else { ... }' } as SFCScriptBlock
    fileName = 'with-deep-indentation-space.vue'
    checkDeepIndentation(script, fileName)
    expect(reportDeepIndentation()).toBe(2)
    expect(mockConsoleLog).toHaveBeenCalled()
    expect(mockConsoleLog).toHaveBeenLastCalledWith(`- ${fileName} ${BG_WARN}(1)${BG_RESET}`)
  })
})
