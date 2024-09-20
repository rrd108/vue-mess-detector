import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { beforeEach, describe, expect, it } from 'vitest'
import { DEFAULT_OVERRIDE_CONFIG } from '../../helpers/constants'
import { checkShortVariableName, reportShortVariableName, resetResults } from './shortVariableName'

describe('shortVariableName', () => {
  beforeEach(() => {
    resetResults()
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
    const minVariableName = DEFAULT_OVERRIDE_CONFIG.minVariableName
    checkShortVariableName(script, filename, minVariableName)
    const result = reportShortVariableName(minVariableName)
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
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
    const minVariableName = DEFAULT_OVERRIDE_CONFIG.minVariableName
    checkShortVariableName(script, filename, minVariableName)
    const result = reportShortVariableName(minVariableName)
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: filename,
      rule: `<text_info>rrd ~ short variable names</text_info>`,
      description: `👉 <text_warn>Variable names must have a minimum length of ${minVariableName}.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/short-variable-name.html`,
      message: `variable: <bg_warn>(${variable})</bg_warn> 🚨`,
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
    const minVariableName = DEFAULT_OVERRIDE_CONFIG.minVariableName
    checkShortVariableName(script, filename, minVariableName)
    const result = reportShortVariableName(minVariableName)
    expect(result.length).toBe(3)
    expect(result).toStrictEqual([{
      file: filename,
      rule: `<text_info>rrd ~ short variable names</text_info>`,
      description: `👉 <text_warn>Variable names must have a minimum length of ${minVariableName}.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/short-variable-name.html`,
      message: `variable: <bg_warn>(age)</bg_warn> 🚨`,
    }, {
      file: filename,
      rule: `<text_info>rrd ~ short variable names</text_info>`,
      description: `👉 <text_warn>Variable names must have a minimum length of ${minVariableName}.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/short-variable-name.html`,
      message: `variable: <bg_warn>(gps)</bg_warn> 🚨`,
    }, {
      file: filename,
      rule: `<text_info>rrd ~ short variable names</text_info>`,
      description: `👉 <text_warn>Variable names must have a minimum length of ${minVariableName}.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/short-variable-name.html`,
      message: `variable: <bg_warn>(lng)</bg_warn> 🚨`,
    }])
  })
})
