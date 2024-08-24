import { beforeEach, describe, expect, it } from 'vitest'

import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_ERR, BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
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

  it('should not report files where arrow functions without curly braces do not exceed the recommended limit', () => {
    const script = {
      content: `
        <script setup>
          const getOpenBookings = (page: number) =>
            axios
              .get(\`\${import.meta.env.VITE_APP_API_URL}bookings/listOpen.json?page=\${page}\`, store.tokenHeader)
              .then(res => {
                bookings.value = res.data.bookings
                paginate.value = res.data.paginate
              })
              .catch(err => console.error(err))

          const shortFunction = (a, b) => a + b
        </script>
      `,
    } as SFCScriptBlock
    const fileName = 'arrow-function-size.vue'
    checkFunctionSize(script, fileName)
    expect(reportFunctionSize().length).toBe(0)
    expect(reportFunctionSize()).toStrictEqual([])
  })

  it('should not report files with multiple short functions', () => {
    const script = {
      content: `
      <script setup>
        function shortFunctionOne() { console.log('Short function one'); }
        function shortFunctionTwo() { console.log('Short function two'); }
        const shortArrowFunction = () => console.log('Short arrow function');
      </script>
    `,
    } as SFCScriptBlock
    const fileName = 'multiple-short-functions.vue'
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
      description: `👉 ${TEXT_WARN}Functions must be shorter than ${MAX_FUNCTION_LENGTH} lines.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/function-size.html`,
      message: `function ${BG_WARN}(${funcName})${BG_RESET} is too long: ${BG_WARN}23 lines${BG_RESET} 🚨`,
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
    expect(reportFunctionSize().length).toBe(2)
    expect(reportFunctionSize()).toStrictEqual([{
      file: fileName,
      rule: `${TEXT_INFO}rrd ~ function size${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Functions must be shorter than ${MAX_FUNCTION_LENGTH} lines.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/function-size.html`,
      message: `function ${BG_WARN}(dummyRegularFunction)${BG_RESET} is too long: ${BG_WARN}29 lines${BG_RESET} 🚨`,
    }, {
      file: fileName,
      rule: `${TEXT_INFO}rrd ~ function size${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Functions must be shorter than ${MAX_FUNCTION_LENGTH} lines.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/function-size.html`,
      message: `function ${BG_WARN}(dummyArrowFunction)${BG_RESET} is too long: ${BG_WARN}23 lines${BG_RESET} 🚨`,
    }])
  })

  it('should report files with one arrow function without curly braces exceeding the limit', () => {
    const script = {
      content: `
        <script setup>
          const getOpenBookings = (page: number) =>
            axios
              .get(\`\${import.meta.env.VITE_APP_API_URL}bookings/listOpen.json?page=\${page}\`, store.tokenHeader)
              .then(res => {
                bookings.value = res.data.bookings
                paginate.value = res.data.paginate
                bookings.value = res.data.bookings
                paginate.value = res.data.paginate
                bookings.value = res.data.bookings
                paginate.value = res.data.paginate
                bookings.value = res.data.bookings
                paginate.value = res.data.paginate
                bookings.value = res.data.bookings
                paginate.value = res.data.paginate
                bookings.value = res.data.bookings
                paginate.value = res.data.paginate
                bookings.value = res.data.bookings
                paginate.value = res.data.paginate
                paginate.value = res.data.paginate
                bookings.value = res.data.bookings
                paginate.value = res.data.paginate
                bookings.value = res.data.bookings
                paginate.value = res.data.paginate
                bookings.value = res.data.bookings
                paginate.value = res.data.paginate
                bookings.value = res.data.bookings
                paginate.value = res.data.paginate
                bookings.value = res.data.bookings
                paginate.value = res.data.paginate
                bookings.value = res.data.bookings
                paginate.value = res.data.paginate
                bookings.value = res.data.bookings
                paginate.value = res.data.paginate
                bookings.value = res.data.bookings
                paginate.value = res.data.paginate
                bookings.value = res.data.bookings
                paginate.value = res.data.paginate
              })
              .catch(err => console.error(err))

          const shortFunction = (a, b) => a + b
        </script>
      `,
    } as SFCScriptBlock
    const fileName = 'arrow-function-size.vue'
    checkFunctionSize(script, fileName)
    expect(reportFunctionSize().length).toBe(1)
    expect(reportFunctionSize()).toStrictEqual([{
      file: fileName,
      rule: `${TEXT_INFO}rrd ~ function size${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Functions must be shorter than ${MAX_FUNCTION_LENGTH} lines.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/function-size.html`,
      message: `function ${BG_ERR}(getOpenBookings)${BG_RESET} is too long: ${BG_ERR}41 lines${BG_RESET} 🚨`,
    }])
  })

  it('should report files with correct function name', () => {
    const script = {
      content: `
        import inquirer from 'inquirer';  // it cause some error when this file is ts

        const questions = [{
          type: 'list',
          name: 'ruleset',
          message: 'What ruleset this rule will belongs to?',
          choices: ['vue-essential', 'vue-strong', 'vue-recommended', 'vue-caution', 'rrd'],
        }]

        const createFiles = async (answers) => {
          const pascalCaseRulename = answers.name.charAt(0).toUpperCase() + answers.name.slice(1);
          const humanReadableRulename = answers.name.replace(/([A-Z])/g, ' $1').trim();
          const filePath = './src/rules/\${answers.ruleset}/\${answers.name}.ts';
          let fileContent = await fs.readFile('./src/generator/ruleSkeleton', 'utf8');
          fileContent = fileContent.replace(/_RULENAME_/g, pascalCaseRulename)
            .replace(/_HUMANRULENAME_/g, humanReadableRulename)
            .replace(/_RULESET_/g, answers.ruleset);

          await fs.writeFile(filePath, fileContent, 'utf8');
          console.log('1️⃣  File \${filePath} generated!');

          const testPath = './src/rules/\${answers.ruleset}/\${answers.name}.test.ts';
          let testContent = await fs.readFile('./src/generator/testSkeleton', 'utf8');
          testContent = testContent
            .replace(/_RULENAME_CAMELCASE_/g, answers.name)
            .replace(/_RULENAME_/g, pascalCaseRulename)
            .replace(/_HUMANRULENAME_/g, humanReadableRulename)
            .replace(/_RULESET_/g, answers.ruleset);
          await fs.writeFile(testPath, testContent, 'utf8');
          console.log('2️⃣  Test \${testPath} generated!');
        }`,
    } as SFCScriptBlock
    const fileName = 'arrow-function-size.vue'
    checkFunctionSize(script, fileName)
    expect(reportFunctionSize().length).toBe(1)
    expect(reportFunctionSize()).toStrictEqual([{
      file: fileName,
      rule: `${TEXT_INFO}rrd ~ function size${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Functions must be shorter than ${MAX_FUNCTION_LENGTH} lines.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/function-size.html`,
      message: `function ${BG_WARN}(createFiles)${BG_RESET} is too long: ${BG_WARN}20 lines${BG_RESET} 🚨`,
    }])
  })
})
