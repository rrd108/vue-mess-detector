import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { describe, expect, it } from 'vitest'
import { DEFAULT_OVERRIDE_CONFIG } from '../../helpers/constants'
import { checkScriptLength, reportScriptLength } from './scriptLength'

describe('checkScriptLength', () => {
  it('should not report "long scripts" for a short script', () => {
    const shortScript = { content: '<script setup>\nconsole.log("Hello")\n</script>' } as SFCScriptBlock
    const fileName = 'short.vue'
    const maxLength = DEFAULT_OVERRIDE_CONFIG.maxScriptLength
    checkScriptLength(shortScript, fileName, maxLength)
    const result = reportScriptLength(maxLength)
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should report long scripts for a long script', () => {
    let content = '<scritp setup>'
    for (let i = 0; i < 102; i++) {
      content += `\nconsole.log("Hello ${i}")`
    }
    content += '\n</script>'
    const longScript = { content } as SFCScriptBlock
    const fileName = 'long.vue'
    const maxLength = DEFAULT_OVERRIDE_CONFIG.maxScriptLength
    checkScriptLength(longScript, fileName, maxLength)
    const result = reportScriptLength(maxLength)
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>rrd ~ Long <script> blocks</text_info>`,
      description: `👉 <text_warn>Try to refactor out the logic into composable functions or other files and keep the script block's length under ${maxLength} lines.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/script-length.html`,
      message: `<bg_warn>(104 lines)</bg_warn> 🚨`,
    }])
  })
})
