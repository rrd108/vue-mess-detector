import { describe, expect, it, vi } from 'vitest'
import { SFCScriptBlock } from '@vue/compiler-sfc'
import { checkSimpleComputed, reportSimpleComputed } from './simpleComputed'

const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})

describe('checkSimpleComputed', () => {
  it('should not report files with simple computed properties', () => {
    let script = {
      content: `const isWeekend = computed(() => today.getDay() === 0 || today.getDay() === 6)
      const one = 1
      const isWeekend2 = computed(() => today.getDay() === 0 || today.getDay() === 6)`,
    } as SFCScriptBlock
    let fileName = 'simple-computed.vue'
    checkSimpleComputed(script, fileName)
    expect(reportSimpleComputed()).toBe(0)
    expect(mockConsoleLog).not.toHaveBeenCalled()

    script = {
      content: `const isWeekend = computed(()=>today.getDay() === 0 || today.getDay() === 6)`,
    } as SFCScriptBlock
    checkSimpleComputed(script, fileName)
    expect(reportSimpleComputed()).toBe(0)
    expect(mockConsoleLog).not.toHaveBeenCalled()
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
    checkSimpleComputed(script, fileName)
    expect(reportSimpleComputed()).toBe(1)
    expect(mockConsoleLog).toHaveBeenCalled()
    expect(mockConsoleLog).toHaveBeenLastCalledWith(`- ${fileName} 🚨`)
  })
})
