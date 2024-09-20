import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { beforeEach, describe, expect, it } from 'vitest'
import { DEFAULT_OVERRIDE_CONFIG } from '../../helpers/constants'
import { checkSimpleComputed, reportSimpleComputed, resetResults } from './simpleComputed'

describe('checkSimpleComputed', () => {
  beforeEach(() => {
    resetResults()
  })

  it('should not report files with simple computed properties', () => {
    let script = {
      content: `const isWeekend = computed(() => today.getDay() === 0 || today.getDay() === 6)
      const one = 1
      const isWeekend2 = computed(() => today.getDay() === 0 || today.getDay() === 6)`,
    } as SFCScriptBlock
    const fileName = 'simple-computed.vue'
    const maxComputedLength = DEFAULT_OVERRIDE_CONFIG.maxComputedLength
    checkSimpleComputed(script, fileName, maxComputedLength)
    const result = reportSimpleComputed()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])

    script = {
      content: `const isWeekend = computed(()=>today.getDay() === 0 || today.getDay() === 6)`,
    } as SFCScriptBlock
    checkSimpleComputed(script, fileName, maxComputedLength)
    const result2 = reportSimpleComputed()
    expect(result2.length).toBe(0)
    expect(result2).toStrictEqual([])
  })

  it('should report files with complicated computed properties', () => {
    const script = {
      content: `<script setup>
      const total = computed(() => {
        let total = 0
        for (let i = 0; i < items.value.length; i++) {
          total += items.value[i].price
        }
        for (let i = 0; i < items.value.length; i++) {
          total += items.value[i].price
        }
        for (let i = 0; i < items.value.length; i++) {
          total += items.value[i].price
        }        
        return total
      })

      const message = 'Gauranga'
      
      const isWeekend = computed(()=>today.getDay() === 0 || today.getDay() === 6)
    </script>`,
    } as SFCScriptBlock
    const fileName = 'complicated-computed.vue'
    const maxComputedLength = DEFAULT_OVERRIDE_CONFIG.maxComputedLength
    checkSimpleComputed(script, fileName, maxComputedLength)
    const result = reportSimpleComputed()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>vue-strong ~ complicated computed property</text_info>`,
      description: `👉 <text_warn>Refactor the computed properties to smaller ones.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/simple-computed.html`,
      message: `line #2 <bg_warn>computed</bg_warn> 🚨`,
    }])
  })
})
