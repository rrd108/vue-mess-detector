import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { describe, expect, it } from 'vitest'
import { DEFAULT_OVERRIDE_CONFIG } from '../../helpers/constants'
import { checkParameterCount, reportParameterCount } from './parameterCount'

describe('checkParameterCount', () => {
  it('should not report files where functions do not exceed the recommended limit', () => {
    const script = {
      content: `
        <script setup>
          function dummyFuncOne() {
            return 'One'
          }
        </script>
      `,
    } as SFCScriptBlock
    const filename = 'no-parameters.vue'
    const maxParameterCount = DEFAULT_OVERRIDE_CONFIG.maxParameterCount
    checkParameterCount(script, filename, maxParameterCount)
    const result = reportParameterCount(maxParameterCount)
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should not report files where functions use destructured parameters (single object param)', () => {
    const script = {
      content: `
        <script setup>
          function dummyFuncOne({ param1, param2, param3, param4, param5 }) {
            return 'One'
          }

          const dummyFuncTwo = ({ param1, param2, param3, param4 }) => {
            return 'Two'
          }
        </script>
      `,
    } as SFCScriptBlock
    const filename = 'destructuring-parameters.vue'
    const maxParameterCount = DEFAULT_OVERRIDE_CONFIG.maxParameterCount
    checkParameterCount(script, filename, maxParameterCount)
    const result = reportParameterCount(maxParameterCount)
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should report when multiple destructured params exceed the limit', () => {
    const script = {
      content: `
        <script setup>
          function dummyFuncOne({ a, b }, { c, d }, { e, f }, { g, h }) {
            return 'One'
          }
        </script>
      `,
    } as SFCScriptBlock
    const filename = 'multiple-destructured-params.vue'
    const funcName = 'dummyFuncOne'
    const paramsCount = 4
    const maxParameterCount = DEFAULT_OVERRIDE_CONFIG.maxParameterCount
    checkParameterCount(script, filename, maxParameterCount)
    const result = reportParameterCount(maxParameterCount)
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: filename,
      rule: `<text_info>rrd ~ parameter count</text_info>`,
      description: `👉 <text_warn>Max number of function parameters should be ${maxParameterCount}.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
      message: `function <bg_warn>${funcName}</bg_warn> has <bg_warn>${paramsCount}</bg_warn> parameters 🚨`,
    }])
  })

  it('should correctly count mixed destructured and regular params', () => {
    const script = {
      content: `
        <script setup>
          function dummyFuncOne({ a, b }, { c, d }) {
            return 'One'
          }
        </script>
      `,
    } as SFCScriptBlock
    const filename = 'mixed-params.vue'
    const maxParameterCount = DEFAULT_OVERRIDE_CONFIG.maxParameterCount
    checkParameterCount(script, filename, maxParameterCount)
    const result = reportParameterCount(maxParameterCount)
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should report files where one function exceeds the recommended limit', () => {
    const script = {
      content: `
        <script setup>
          function dummyFuncOne() {
            return 'One'
          }

          const dummyFuncTwo = (param1, param2, param3, param4) => {}
        </script>
      `,
    } as SFCScriptBlock
    const filename = 'one-parameter.vue'
    const funcName = 'dummyFuncTwo'
    const paramsCount = 4
    const maxParameterCount = DEFAULT_OVERRIDE_CONFIG.maxParameterCount
    checkParameterCount(script, filename, maxParameterCount)
    const result = reportParameterCount(maxParameterCount)
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: filename,
      rule: `<text_info>rrd ~ parameter count</text_info>`,
      description: `👉 <text_warn>Max number of function parameters should be ${maxParameterCount}.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
      message: `function <bg_warn>${funcName}</bg_warn> has <bg_warn>${paramsCount}</bg_warn> parameters 🚨`,
    }])
  })

  it('should report files where multiple functions exceed the recommended limit', () => {
    const script = {
      content: `
        <script setup>
          function dummyFuncOne(param1, param2, param3, param4, param5) {
            return 'One'
          }

          const dummyFuncTwo = (param1, param2, param3, param4) => {
            return 'Two'
          }

          const dummyFuncThree = (param1, param2, param3) => {
            return 'Three'
          }
        </script>
      `,
    } as SFCScriptBlock
    const filename = 'multiple-parameters.vue'
    const maxParameterCount = DEFAULT_OVERRIDE_CONFIG.maxParameterCount
    checkParameterCount(script, filename, maxParameterCount)
    const result = reportParameterCount(maxParameterCount)
    expect(result.length).toBe(2)
    expect(result).toStrictEqual([{
      file: filename,
      rule: `<text_info>rrd ~ parameter count</text_info>`,
      description: `👉 <text_warn>Max number of function parameters should be ${maxParameterCount}.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
      message: `function <bg_warn>dummyFuncOne</bg_warn> has <bg_warn>5</bg_warn> parameters 🚨`,
    }, {
      file: filename,
      rule: `<text_info>rrd ~ parameter count</text_info>`,
      description: `👉 <text_warn>Max number of function parameters should be ${maxParameterCount}.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
      message: `function <bg_warn>dummyFuncTwo</bg_warn> has <bg_warn>4</bg_warn> parameters 🚨`,
    }])
  })
})
