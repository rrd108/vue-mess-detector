import { beforeEach, describe, expect, it } from 'vitest'

import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_ERR, BG_RESET, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import { MAX_FUNCTION_LENGTH, checkFunctionSize, reportFunctionSize, resetFunctionSize } from './functionSize'

describe('checkFunctionSize', () => {
  beforeEach(() => {
    resetFunctionSize()
  })

  it('should not report files where functions do not exceed the recommended limit', () => {
    const script = {
      content: `
        <script setup>
          function greeting(msg) {
            if (!msg) {
              return
            }

            return {
              message: msg.trim() 
            }
          }
        </script>
      `,
    } as SFCScriptBlock
    const fileName = 'function-size.vue'
    checkFunctionSize(script, fileName)
    expect(reportFunctionSize().length).toBe(0)
    expect(reportFunctionSize()).toStrictEqual([])
  })

  it('should report files with one function exceeding the limit', () => {
    const script = {
      content: `
        <script setup>
          function dummyRegularFunction() {
            const firstName = 'john';
            const lastName = 'doe';
            let age = 30;

            if (age < 18) {
              console.log('Too young for this function!')
            } else {
              console.log('Hello ', firstName)
            }

            //Some more lines of code
            const hobbies = ['reading', 'gaming', 'cooking'];
            for (const hobby of hobbies) {
              console.log('I enjoy ', hobby);
            }

            // Even more lines...
            const getRandomNumber = () => Math.floor(Math.random() * 100);
            const randomNum = getRandomNumber();
            console.log('Random number: ', randomNum);

            // And a final line
            return 'Function execution complete!';
          }

          const sayHello = () => {
            console.log(getGreeting());
          }
        </script>
      `,
    } as SFCScriptBlock
    const fileName = 'function-size.vue'
    const funcName = 'dummyRegularFunction'
    checkFunctionSize(script, fileName)
    expect(reportFunctionSize().length).toBe(1)
    expect(reportFunctionSize()).toStrictEqual([{
      file: fileName,
      rule: `${TEXT_INFO}rrd ~ function size${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Functions must be shorter than ${MAX_FUNCTION_LENGTH} lines${TEXT_RESET}`,
      message: `function ${BG_ERR}(${funcName})${BG_RESET} 🚨`,
    }])
  })

  it('should report files with two functions exceeding the limit', () => {
    const script = {
      content: `
        <script setup>
          function dummyRegularFunction(name = 'Hi') {
            if (!name) {
              return
            }

            let message = '';
            message = 'Just testing this feature';
            message = 'Just testing this feature';
            message = 'Just testing this feature';
            message = 'Just testing this feature';
            message = 'Just testing this feature';
            message = 'Just testing this feature';
            message = 'Just testing this feature';
            message = 'Just testing this feature';
            message = 'Just testing this feature';
            message = 'Just testing this feature';
            message = 'Just testing this feature';
            message = 'Just testing this feature';
            message = 'Just testing this feature';
            message = 'Just testing this feature';
            message = 'Just testing this feature';
            message = 'Just testing this feature';
            message = 'Just testing this feature';
            message = 'Just testing this feature';
            message = 'Just testing this feature';
            message = 'Just testing this feature';
            message = 'Just testing this feature';
            message = 'Just testing this feature';

            return message;
          }

          const dummyArrowFunction = (name) => {
            const firstName = 'john';
            const lastName = 'doe';
            let age = 30;

            if (age < 18) {
              console.log('Too young for this function!')
            } else {
              console.log('Hello ', firstName)
            }

            // Some more lines of code
            const hobbies = ['reading', 'gaming', 'cooking'];
            for (const hobby of hobbies) {
              console.log('I enjoy ', hobby);
            }

            // Even more lines...
            const getRandomNumber = () => Math.floor(Math.random() * 100);
            const randomNum = getRandomNumber();
            console.log('Random number: ', randomNum);

            // And a final line
            return 'Function execution complete!';
          }
        </script>
      `,
    } as SFCScriptBlock
    const fileName = 'function-size.vue'
    checkFunctionSize(script, fileName)
    //  expect(reportFunctionSize().length).toBe(2) TODO temporary disabled for #116
    expect(reportFunctionSize().length).toBe(1)
    expect(reportFunctionSize()).toStrictEqual([{
      file: fileName,
      rule: `${TEXT_INFO}rrd ~ function size${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Functions must be shorter than ${MAX_FUNCTION_LENGTH} lines${TEXT_RESET}`,
      message: `function ${BG_ERR}(dummyRegularFunction)${BG_RESET} 🚨`,
    }/* TODO temporary disabled for #116
    , {
      file: fileName,
      rule: `${TEXT_INFO}rrd ~ function size${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Functions must be shorter than ${MAX_FUNCTION_LENGTH} lines${TEXT_RESET}`,
      message: `function ${BG_ERR}(dummyArrowFunction)${BG_RESET} 🚨`,
    }*/])
  })
})
