import { describe, expect, it, vi } from 'vitest'
import { SFCScriptBlock } from '@vue/compiler-sfc'
import { checkParameterCount, reportParameterCount } from './parameterCount'
import { BG_RESET, BG_WARN } from '../asceeCodes'

const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})

describe('checkParameterCount', () => {
  it('should not report files where functions do not exceed the recommended limit', () => {
    const script = {
      content: `
        <script setup>
          function dummyFuncOne() {
            return 'One'
          }
        </script>
      `
    } as SFCScriptBlock;
    const filename = 'no-parameters.vue';
    checkParameterCount(script, filename);
    expect(reportParameterCount()).toBe(0);
    expect(mockConsoleLog).not.toHaveBeenCalled();
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
      `
    } as SFCScriptBlock;
    const filename = 'one-parameter.vue';
    const funcName = 'dummyFuncTwo';
    const paramsCount = 4;
    checkParameterCount(script, filename);
    expect(reportParameterCount()).toBe(1);
    expect(mockConsoleLog).toHaveBeenCalled();
    expect(mockConsoleLog).toHaveBeenLastCalledWith(`- ${BG_WARN}${funcName}${BG_RESET} in file ${filename} 🚨 ${BG_WARN}(${paramsCount})${BG_RESET}`)
    
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
      `
    } as SFCScriptBlock;
    const filename = 'multiple-parameters.vue';
    const funcName = 'dummyFuncTwo';
    const paramsCount = 4;
    checkParameterCount(script, filename);
    expect(reportParameterCount()).toBe(3);
    expect(mockConsoleLog).toHaveBeenCalled();
    expect(mockConsoleLog).toHaveBeenLastCalledWith(`- ${BG_WARN}${funcName}${BG_RESET} in file ${filename} 🚨 ${BG_WARN}(${paramsCount})${BG_RESET}`)
  })
})