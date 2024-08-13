import { beforeEach, describe, expect, it } from 'vitest'
import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_ERR, BG_RESET, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import { checkIfWithoutCurlyBraces, reportIfWithoutCurlyBraces, resetIfWithoutCurlyBraces } from './ifWithoutCurlyBraces'

describe('ifWithoutCurlyBraces', () => {
  beforeEach(() => {
    resetIfWithoutCurlyBraces()
  })

  it('should not report files where if statements use curly braces', () => {
    const script = {
      content: `
        <script setup>
        if (isLoading) {
          doSomething();
        }
        </script>
      `,
    } as SFCScriptBlock
    const filename = 'if-with-curly-braces.vue'
    checkIfWithoutCurlyBraces(script, filename)
    expect(reportIfWithoutCurlyBraces().length).toBe(0)
    expect(reportIfWithoutCurlyBraces()).toStrictEqual([])
  })

  it('should not report files where if statements are written in a single line with curly braces', () => {
    const script = {
      content: `
        <script setup>
        if (isLoading) { doSomething(); }
        if (isError) { handleError(); }
        </script>
      `,
    } as SFCScriptBlock
    const filename = 'if-with-single-line-curly-braces.vue'
    checkIfWithoutCurlyBraces(script, filename)
    expect(reportIfWithoutCurlyBraces().length).toBe(0)
    expect(reportIfWithoutCurlyBraces()).toStrictEqual([])
  })

  it('should report files where an if statement does not use curly braces', () => {
    const script = {
      content: `
        <script setup>
        if (isLoading) doSomething();
        </script>
      `,
    } as SFCScriptBlock
    const filename = 'if-without-curly-braces.vue'
    const statement = 'if (isLoading) doSomething();'
    checkIfWithoutCurlyBraces(script, filename)
    expect(reportIfWithoutCurlyBraces().length).toBe(1)
    expect(reportIfWithoutCurlyBraces()).toStrictEqual([{
      file: filename,
      rule: `${TEXT_INFO}rrd ~ if without curly braces${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}All if statements must be enclosed in curly braces for better readability and maintainability.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/if-without-curly-braces.html`,
      message: `line #2 if statement without curly braces: ${BG_ERR}${statement}${BG_RESET} 🚨`,
    }])
  })

  it('should report files where multiple if statements do not use curly braces', () => {
    const script = {
      content: `
        <script setup>
        if (isLoading) doSomething();
        if (isError) handleError();
        </script>
      `,
    } as SFCScriptBlock
    const filename = 'multiple-if-without-curly-braces.vue'
    checkIfWithoutCurlyBraces(script, filename)
    expect(reportIfWithoutCurlyBraces().length).toBe(2)
    expect(reportIfWithoutCurlyBraces()).toStrictEqual([{
      file: filename,
      rule: `${TEXT_INFO}rrd ~ if without curly braces${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}All if statements must be enclosed in curly braces for better readability and maintainability.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/if-without-curly-braces.html`,
      message: `line #2 if statement without curly braces: ${BG_ERR}if (isLoading) doSomething();${BG_RESET} 🚨`,
    }, {
      file: filename,
      rule: `${TEXT_INFO}rrd ~ if without curly braces${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}All if statements must be enclosed in curly braces for better readability and maintainability.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/if-without-curly-braces.html`,
      message: `line #3 if statement without curly braces: ${BG_ERR}if (isError) handleError();${BG_RESET} 🚨`,
    }])
  })
})
