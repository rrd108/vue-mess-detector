import { beforeEach, describe, expect, it } from 'vitest'

import type { SFCScriptBlock } from '@vue/compiler-sfc'

import { checkSimpleProp, reportSimpleProp, resetSimpleProp } from './simpleProp'

describe('checkSimpleProp', () => {
  beforeEach(() => {
    resetSimpleProp()
  })

  it('should not report files with detailed props definition', () => {
    const script = {
      content: `<script setup>
    const props = defineProps({
        status: String
      })
    </script>`,
    } as SFCScriptBlock
    const fileName = 'proper-prop.vue'
    checkSimpleProp(script, fileName)
    expect(reportSimpleProp().length).toBe(0)
    expect(reportSimpleProp()).toStrictEqual([])
  })

  it('should report files with simple props defeiniton', () => {
    const script = {
      content: `<script setup>
    const props = defineProps(['status'])
    </script>`,
    } as SFCScriptBlock
    const fileName = 'simple-prop.vue'
    checkSimpleProp(script, fileName)
    expect(reportSimpleProp().length).toBe(1)
    expect(reportSimpleProp()).toStrictEqual([{
      file: fileName,
      rule: `<text_info>vue-essential ~ simple prop</text_info>`,
      description: `👉 <text_warn>Add at least type definition.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/simple-prop.html`,
      message: `<bg_err>Props type</bg_err> not defined 🚨`,
    }])
  })
})
