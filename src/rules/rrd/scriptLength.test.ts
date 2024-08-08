import { beforeEach, describe, expect, it } from 'vitest'
import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import { MAX_SCRIPT_LENGTH, checkScriptLength, reportScriptLength, resetScriptLength } from './scriptLength'

describe('checkScriptLength', () => {
  beforeEach(() => {
    resetScriptLength()
  })

  it('should not report "long scripts" for a short script', () => {
    const shortScript = { content: '<script setup>\nconsole.log("Hello")\n</script>' } as SFCScriptBlock
    const fileName = 'short.vue'
    checkScriptLength(shortScript, fileName)
    expect(reportScriptLength().length).toBe(0)
    expect(reportScriptLength()).toStrictEqual([])
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
    expect(reportScriptLength().length).toBe(1)
    expect(reportScriptLength()).toStrictEqual([{
      file: fileName,
      rule: `${TEXT_INFO}rrd ~ Long <script> blocks${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Try to refactor out the logic into composable functions or other files and keep the script block's length under ${MAX_SCRIPT_LENGTH} lines.${TEXT_RESET}`,
      message: `${BG_WARN}(104 lines)${BG_RESET} 🚨`,
    }])
  })
})
