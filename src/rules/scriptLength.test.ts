import { test, expect, vi } from 'vitest'
import { SFCScriptBlock } from '@vue/compiler-sfc'
import { checkScriptLength, reportScriptLength } from './scriptLength'
import { BG_RESET, BG_WARN } from '../asceeCodes'

const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})

test('scriptLength - should not report "long scripts" for a short script', () => {
  const shortScript: SFCScriptBlock = {
    content: '<script setup>\nconsole.log("Hello")\n</script>',
    type: 'script',
    attrs: {},
    loc: {
      start: {
        line: 0,
        column: 0,
        offset: 0,
      },
      end: {
        line: 0,
        column: 0,
        offset: 0,
      },
      source: '',
    },
  }
  const fileName = 'short.vue'
  checkScriptLength(shortScript, fileName)
  expect(reportScriptLength()).toBe(0)
  expect(mockConsoleLog).not.toHaveBeenCalled()
})

test('scriptLength - should report long scripts for a long script', () => {
  let content = '<scritp setup>'
  for (let i = 0; i < 52; i++) {
    content += `\nconsole.log("Hello ${i}")`
  }
  content += '\n</script>'
  const longScript: SFCScriptBlock = {
    content,
    type: 'script',
    attrs: {},
    loc: {
      start: {
        line: 0,
        column: 0,
        offset: 0,
      },
      end: {
        line: 0,
        column: 0,
        offset: 0,
      },
      source: '',
    },
  }
  const fileName = 'long.vue'
  checkScriptLength(longScript, fileName)
  expect(reportScriptLength()).toBe(1)
  expect(mockConsoleLog).toHaveBeenCalled()
  expect(mockConsoleLog).toHaveBeenLastCalledWith(`- long.vue ${BG_WARN}(54 lines)${BG_RESET}`)
})
