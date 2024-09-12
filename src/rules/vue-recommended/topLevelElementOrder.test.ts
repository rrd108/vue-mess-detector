import type { SFCBlock } from '@vue/compiler-sfc'

import { beforeEach, describe, expect, it } from 'vitest'

import { checkTopLevelElementOrder, reportTopLevelElementOrder, resetTopLevelElementOrder } from './topLevelElementOrder'

describe('checkTopLevelElementOrder', () => {
  beforeEach(() => {
    resetTopLevelElementOrder()
  })

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
      `,
    } as SFCBlock
    const filename = 'sfc-correct-order.vue'
    checkTopLevelElementOrder(script.content, filename)
    expect(reportTopLevelElementOrder().length).toBe(0)
    expect(reportTopLevelElementOrder()).toStrictEqual([])
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
      `,
    } as SFCBlock
    const filename = 'sfc-incorrect-order.vue'
    checkTopLevelElementOrder(script.content, filename)
    expect(reportTopLevelElementOrder().length).toBe(1)
    expect(reportTopLevelElementOrder()).toStrictEqual([{
      file: filename,
      rule: `<text_info>vue-recommended ~ top level element order</text_info>`,
      description: `👉 <text_warn>Single-File Components should always order <script>, <template>, and <style> tags consistently.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/top-level-element-order.html`,
      message: `Top level elements are <bg_warn>not following the correct order.</bg_warn> 🚨`,
    }])
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
      `,
    } as SFCBlock
    const filename = 'sfc-missing-element.vue'
    checkTopLevelElementOrder(script.content, filename)
    expect(reportTopLevelElementOrder().length).toBe(1)
    expect(reportTopLevelElementOrder()).toStrictEqual([{
      file: filename,
      rule: `<text_info>vue-recommended ~ top level element order</text_info>`,
      description: `👉 <text_warn>Single-File Components should always order <script>, <template>, and <style> tags consistently.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/top-level-element-order.html`,
      message: `Top level elements are <bg_warn>not following the correct order.</bg_warn> 🚨`,
    }])
  })
})
