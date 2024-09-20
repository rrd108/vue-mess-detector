import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { beforeEach, describe, expect, it } from 'vitest'
import { DEFAULT_OVERRIDE_CONFIG } from '../../helpers/constants'
import { checkDeepIndentation, reportDeepIndentation, resetResults } from './deepIndentation'

describe('checkDeepIndentation', () => {
  beforeEach(() => {
    resetResults()
  })

  it('should not report files without deep indentations', () => {
    let script = { content: '<script setup>\n\t\tconsole.log("Hello")\n</script>' } as SFCScriptBlock
    let fileName = 'no-deep-indentation-tab.vue'
    const maxTabs = DEFAULT_OVERRIDE_CONFIG.maxTabs
    checkDeepIndentation(script, fileName, maxTabs)
    const result = reportDeepIndentation()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])

    script = { content: '<script setup>\n        console.log("Hello")\n</script>' } as SFCScriptBlock
    fileName = 'no-deep-indentation-space.vue'
    checkDeepIndentation(script, fileName, maxTabs)
    const result2 = reportDeepIndentation()
    expect(result2.length).toBe(0)
    expect(result2).toStrictEqual([])
  })

  it('should report files with deep tab indentation', () => {
    const script = { content: '\t\t\t\t\tif (true) { ... } else { ... }' } as SFCScriptBlock
    const fileName = 'with-deep-indentation-tab.vue'
    const maxTabs = DEFAULT_OVERRIDE_CONFIG.maxTabs
    checkDeepIndentation(script, fileName, maxTabs)
    const result = reportDeepIndentation()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>rrd ~ deep indentation</text_info>`,
      description: `👉 <text_warn>Try to refactor your component to child components, to avoid deep indentations.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/deep-indentation.html`,
      message: `line #1 <bg_warn>indentation: 5</bg_warn> 🚨`,
    }])
  })

  it('should report files with deep space indentation', () => {
    const script = { content: '               if (true) { ... } else { ... }' } as SFCScriptBlock
    const fileName = 'with-deep-indentation-space.vue'
    const maxTabs = DEFAULT_OVERRIDE_CONFIG.maxTabs
    checkDeepIndentation(script, fileName, maxTabs)
    const result = reportDeepIndentation()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>rrd ~ deep indentation</text_info>`,
      description: `👉 <text_warn>Try to refactor your component to child components, to avoid deep indentations.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/deep-indentation.html`,
      message: `line #1 <bg_warn>indentation: 15</bg_warn> 🚨`,
    }])
  })
})
