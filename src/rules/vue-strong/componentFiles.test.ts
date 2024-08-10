import { beforeEach, describe, expect, it } from 'vitest'
import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import { checkComponentFiles, reportComponentFiles, resetComponentFiles } from './componentFiles'

describe('checkComponentFiles', () => {
  beforeEach(() => {
    resetComponentFiles()
  })

  it('should not report files where each component is its own file', () => {
    const script = {
      content: `
        <script setup>
        console.log('This is just fine');
        </script>
      `,
    } as SFCScriptBlock
    const filename = 'component.vue'
    checkComponentFiles(script, filename)
    expect(reportComponentFiles().length).toBe(0)
    expect(reportComponentFiles()).toStrictEqual([])
  })

  it('should report files each component is not its own file', () => {
    const script = {
      content: `
        <script setup>
        app.component('TodoList', {
          // ...
        })

        app.component('TodoItem', {
          // ...
        })
        </script>
      `,
    } as SFCScriptBlock
    const filename = 'component.vue'
    checkComponentFiles(script, filename)
    expect(reportComponentFiles().length).toBe(2)
    expect(reportComponentFiles()).toStrictEqual([{
      file: filename,
      rule: `${TEXT_INFO}vue-strong ~ component files${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Whenever a build system is available to concatenate files, each component should be in its own file.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-files.html`,
      message: `line #2 ${BG_WARN}(TodoList)${BG_RESET} 🚨`,
    }, {
      file: filename,
      rule: `${TEXT_INFO}vue-strong ~ component files${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Whenever a build system is available to concatenate files, each component should be in its own file.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-files.html`,
      message: `line #6 ${BG_WARN}(TodoItem)${BG_RESET} 🚨`,
    }])
  })
})
