import { describe, expect, it, vi } from 'vitest'
import { SFCBlock } from '@vue/compiler-sfc'
import { checkTopLevelElementOrder, reportTopLevelElementOrder } from './topLevelElementOrder'

const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})

describe('checkTopLevelElementOrder', () => {
  it('should not report files where top-level element order is correct', () => {
    const script = {
      content: `
        <script setup>
        import { ref } from 'vue';
        let age = ref(22);
        </script>
        <template>
          <h1 class="age-input">{{ age }}</h1>
        </template>
        <style>
        .age-input {
          color: white;
        }
        </style>
      `
    } as SFCBlock;
    const filename = 'sfc-correct-order.vue'
    checkTopLevelElementOrder(script.content, filename)
    expect(reportTopLevelElementOrder()).toBe(0)
    expect(mockConsoleLog).not.toHaveBeenCalled()
  })

  it('should report files where top-level element order is incorrect', () => {
    const script = {
      content: `
        <template>
          <h1 class="age-input">{{ age }}</h1>
        </template>
        <script setup>
        import { ref } from 'vue';
        let age = ref(22);
        </script>
        <style>
        .age-input {
          color: white;
        }
        </style>
      `
    } as SFCBlock;
    const filename = 'sfc-incorrect-order.vue'
    checkTopLevelElementOrder(script.content, filename)
    expect(reportTopLevelElementOrder()).toBe(1)
    expect(mockConsoleLog).toHaveBeenCalled()
    expect(mockConsoleLog).toHaveBeenLastCalledWith(` - ${filename} 🚨`)
  })

  it('should report files where one top-level element order is missing', () => {
    const script = {
      content: `
        <style>
        .age-input {
          color: white;
        }
        </style>
        <template>
          <h1 class="age-input">22</h1>
        </template>
      `
    } as SFCBlock;
    const filename = 'sfc-missing-element.vue'
    checkTopLevelElementOrder(script.content, filename)
    expect(reportTopLevelElementOrder()).toBe(2)
    expect(mockConsoleLog).toHaveBeenCalled()
    expect(mockConsoleLog).toHaveBeenLastCalledWith(` - ${filename} 🚨`)
  })
})