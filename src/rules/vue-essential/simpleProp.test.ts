import { beforeEach, describe, expect, it } from 'vitest'

import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { BG_ERR, BG_RESET, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
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
      rule: `${TEXT_INFO}vue-essential ~ simple prop${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Add at least type definition.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/vue-essential/simple-prop.html`,
      message: `${BG_ERR}Props type${BG_RESET} not defined 🚨`,
    }])
  })
})
