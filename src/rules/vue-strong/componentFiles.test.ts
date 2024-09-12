import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { beforeEach, describe, expect, it } from 'vitest'

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
      rule: `<text_info>vue-strong ~ component files</text_info>`,
      description: `👉 <text_warn>Whenever a build system is available to concatenate files, each component should be in its own file.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-files.html`,
      message: `line #2 <bg_warn>(TodoList)</bg_warn> 🚨`,
    }, {
      file: filename,
      rule: `<text_info>vue-strong ~ component files</text_info>`,
      description: `👉 <text_warn>Whenever a build system is available to concatenate files, each component should be in its own file.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/component-files.html`,
      message: `line #6 <bg_warn>(TodoItem)</bg_warn> 🚨`,
    }])
  })
})
