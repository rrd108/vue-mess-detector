import { beforeEach, describe, expect, it } from 'vitest'
import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import { checkDeepIndentation, reportDeepIndentation, resetDeepIndentation } from './deepIndentation'

describe('checkDeepIndentation', () => {
  beforeEach(() => {
    resetDeepIndentation()
  })

  it('should not report files without deep indentations', () => {
    let script = { content: '<script setup>\n\t\tconsole.log("Hello")\n</script>' } as SFCScriptBlock
    let fileName = 'no-deep-indentation-tab.vue'
    checkDeepIndentation(script, fileName)
    expect(reportDeepIndentation().length).toBe(0)
    expect(reportDeepIndentation()).toStrictEqual([])

    script = { content: '<script setup>\n        console.log("Hello")\n</script>' } as SFCScriptBlock
    fileName = 'no-deep-indentation-space.vue'
    checkDeepIndentation(script, fileName)
    expect(reportDeepIndentation().length).toBe(0)
    expect(reportDeepIndentation()).toStrictEqual([])
  })

  it('should report files with deep indentation', () => {
    const script = { content: '\t\t\t\t\tif (true) { ... } else { ... }' } as SFCScriptBlock
    const fileName = 'with-deep-indentation-tab.vue'
    checkDeepIndentation(script, fileName)
    expect(reportDeepIndentation().length).toBe(1)
    expect(reportDeepIndentation()).toStrictEqual([{
      file: fileName,
      rule: `${TEXT_INFO}rrd ~ deep indentation${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Try to refactor your component to child components, to avoid deep indentations..${TEXT_RESET}`,
      message: `line #1 ${BG_WARN}indentation: 5${BG_RESET} 🚨`,
    }])
  })

  it('should report files with deep indentation 2', () => {
    const script = { content: '               if (true) { ... } else { ... }' } as SFCScriptBlock
    const fileName = 'with-deep-indentation-space.vue'
    checkDeepIndentation(script, fileName)
    expect(reportDeepIndentation().length).toBe(1)
    expect(reportDeepIndentation()).toStrictEqual([{
      file: fileName,
      rule: `${TEXT_INFO}rrd ~ deep indentation${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Try to refactor your component to child components, to avoid deep indentations..${TEXT_RESET}`,
      message: `line #1 ${BG_WARN}indentation: 15${BG_RESET} 🚨`,
    }])
  })
})
