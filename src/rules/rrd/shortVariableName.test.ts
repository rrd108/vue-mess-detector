import { beforeEach, describe, expect, it } from 'vitest'

import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import { MIN_VARIABLE_NAME, checkShortVariableName, reportShortVariableName, resetShortVariableName } from './shortVariableName'

describe('shortVariableName', () => {
  beforeEach(() => {
    resetShortVariableName()
  })

  it('should not report files where variable names are not too short', () => {
    const script = {
      content: `
        <script setup>
        import { ref } from 'vue';
        const isLoading = ref(false);
        </script>
      `,
    } as SFCScriptBlock
    const filename = 'not-short-variable-name.vue'
    checkShortVariableName(script, filename)
    expect(reportShortVariableName().length).toBe(0)
    expect(reportShortVariableName()).toStrictEqual([])
  })

  it('should report files where one variable is too short', () => {
    const script = {
      content: `
        <script setup>
        let age = 10;
        </script>
      `,
    } as SFCScriptBlock
    const filename = 'short-variable-name.vue'
    const variable = 'age'
    checkShortVariableName(script, filename)
    expect(reportShortVariableName().length).toBe(1)
    expect(reportShortVariableName()).toStrictEqual([{
      file: filename,
      rule: `${TEXT_INFO}rrd ~ short variable names${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Variable names must have a minimum length of ${MIN_VARIABLE_NAME}.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/short-variable-name.html`,
      message: `variable: ${BG_WARN}(${variable})${BG_RESET} 🚨`,
    }])
  })

  it('should report files where more than one variable are too short', () => {
    const script = {
      content: `
        <script setup>
        import { ref } from 'vue';
        const age = ref(10);
        let gps = ref(null);
        var isLoading = false;
        const lng = 5;
        </script>
      `,
    } as SFCScriptBlock
    const filename = 'multiple-short-variable-name.vue'
    checkShortVariableName(script, filename)
    expect(reportShortVariableName().length).toBe(3)
    expect(reportShortVariableName()).toStrictEqual([{
      file: filename,
      rule: `${TEXT_INFO}rrd ~ short variable names${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Variable names must have a minimum length of ${MIN_VARIABLE_NAME}.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/short-variable-name.html`,
      message: `variable: ${BG_WARN}(age)${BG_RESET} 🚨`,
    }, {
      file: filename,
      rule: `${TEXT_INFO}rrd ~ short variable names${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Variable names must have a minimum length of ${MIN_VARIABLE_NAME}.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/short-variable-name.html`,
      message: `variable: ${BG_WARN}(gps)${BG_RESET} 🚨`,
    }, {
      file: filename,
      rule: `${TEXT_INFO}rrd ~ short variable names${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Variable names must have a minimum length of ${MIN_VARIABLE_NAME}.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/short-variable-name.html`,
      message: `variable: ${BG_WARN}(lng)${BG_RESET} 🚨`,
    }])
  })
})
