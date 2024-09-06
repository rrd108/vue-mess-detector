import { beforeEach, describe, expect, it } from 'vitest'

import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
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
      rule: `${TEXT_INFO}rrd ~ parameter count${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Max number of function parameters should be ${MAX_PARAMETER_COUNT}.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
      message: `function ${BG_WARN}${funcName}${BG_RESET} has ${BG_WARN}${paramsCount}${BG_RESET} parameters 🚨`,
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
      rule: `${TEXT_INFO}rrd ~ parameter count${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Max number of function parameters should be ${MAX_PARAMETER_COUNT}.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
      message: `function ${BG_WARN}dummyFuncOne${BG_RESET} has ${BG_WARN}5${BG_RESET} parameters 🚨`,
    }, {
      file: filename,
      rule: `${TEXT_INFO}rrd ~ parameter count${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Max number of function parameters should be ${MAX_PARAMETER_COUNT}.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/parameter-count.html`,
      message: `function ${BG_WARN}dummyFuncTwo${BG_RESET} has ${BG_WARN}4${BG_RESET} parameters 🚨`,
    }])
  })
})
