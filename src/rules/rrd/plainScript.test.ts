import { beforeEach, describe, expect, it } from 'vitest'
import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import { checkPlainScript, reportPlainScript, resetPlainScript } from './plainScript'

describe('plainScript', () => {
  beforeEach(() => {
    resetPlainScript()
  })

  it('should not report files with <script setup>', () => {
    const script = {
      content: `
        <script setup>
          const message = 'Hello, world!';
        </script>
      `,
      setup: true,
    } as SFCScriptBlock
    const filename = 'with-script-setup.vue'
    checkPlainScript(script, filename)
    expect(reportPlainScript().length).toBe(0)
    expect(reportPlainScript()).toStrictEqual([])
  })

  it('should report files with a plain <script> block', () => {
    const script = {
      content: `
        <script>
          export default {
            data() {
              return {
                message: 'Hello, world!'
              }
            }
          }
        </script>
      `,
      setup: false,
    } as SFCScriptBlock
    const filename = 'plain-script.vue'
    checkPlainScript(script, filename)
    expect(reportPlainScript().length).toBe(1)
    expect(reportPlainScript()).toStrictEqual([{
      file: filename,
      rule: `${TEXT_INFO}rrd ~ Plain <script> blocks${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN} Consider using <script setup> to leverage the new SFC <script> syntax.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/plain-script.html`,
      message: `${BG_WARN}Plain <script> block${BG_RESET} found 🚨`,
    }])
  })
})
