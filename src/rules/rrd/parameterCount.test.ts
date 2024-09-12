import type { SFCScriptBlock } from '@vue/compiler-sfc'

import { beforeEach, describe, expect, it } from 'vitest'

import { checkParameterCount, MAX_PARAMETER_COUNT, reportParameterCount, resetParameterCount } from './parameterCount'

describe('checkParameterCount', () => {
  beforeEach(() => {
    resetParameterCount()
  })

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
    checkParameterCount(script, filename)
    expect(reportParameterCount().length).toBe(0)
    expect(reportParameterCount()).toStrictEqual([])
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
    checkParameterCount(script, filename)
    expect(reportParameterCount().length).toBe(1)
    expect(reportParameterCount()).toStrictEqual([{
      file: filename,
      rule: `<text_info>rrd ~ parameter count</text_info>`,
      description: `👉 <text_warn>Max number of function parameters should be ${MAX_PARAMETER_COUNT}.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
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
    checkParameterCount(script, filename)
    expect(reportParameterCount().length).toBe(2)
    expect(reportParameterCount()).toStrictEqual([{
      file: filename,
      rule: `<text_info>rrd ~ parameter count</text_info>`,
      description: `👉 <text_warn>Max number of function parameters should be ${MAX_PARAMETER_COUNT}.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
      message: `function <bg_warn>dummyFuncOne</bg_warn> has <bg_warn>5</bg_warn> parameters 🚨`,
    }, {
      file: filename,
      rule: `<text_info>rrd ~ parameter count</text_info>`,
      description: `👉 <text_warn>Max number of function parameters should be ${MAX_PARAMETER_COUNT}.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
      message: `function <bg_warn>dummyFuncTwo</bg_warn> has <bg_warn>4</bg_warn> parameters 🚨`,
    }])
  })
})
