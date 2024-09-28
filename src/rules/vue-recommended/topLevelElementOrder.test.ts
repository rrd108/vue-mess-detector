import type { SFCBlock } from '@vue/compiler-sfc'
import { describe, expect, it } from 'vitest'
import { DEFAULT_OVERRIDE_CONFIG } from '../../helpers/constants'
import { checkTopLevelElementOrder, reportTopLevelElementOrder } from './topLevelElementOrder'

describe('checkTopLevelElementOrder', () => {
  it('should not report files where top-level element order is correct for script-template-style', () => {
    const script = {
      content: `
        <script setup>
        import { ref } from 'vue';
        let age = ref(22);
        </script>
        <template>
          <h1 class="age-input">{{ age }}</h1>
        </template>
        <style scoped>
        .age-input {
          color: white;
        }
        </style>
      `,
    } as SFCBlock
    const filename = 'sfc-correct-order.vue'
    const topLevelElementOrder = DEFAULT_OVERRIDE_CONFIG.topLevelElementOrder
    checkTopLevelElementOrder(script.content, filename, topLevelElementOrder)
    const result = reportTopLevelElementOrder()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should not report files where top-level element order is correct for template-script-style', () => {
    const script = {
      content: `
        <template>
          <h1 class="age-input">{{ age }}</h1>
        </template>
        <script setup>
        import { ref } from 'vue';
        let age = ref(22);
        </script>
        <style scoped>
        .age-input {
          color: white;
        }
        </style>
      `,
    } as SFCBlock
    const filename = 'sfc-correct-order-template-first.vue'
    const topLevelElementOrder = 'template-script-style'
    checkTopLevelElementOrder(script.content, filename, topLevelElementOrder)
    const result = reportTopLevelElementOrder()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should report files where top-level element order is incorrect for script-template-style', () => {
    const script = {
      content: `
        <template>
          <h1 class="age-input">{{ age }}</h1>
        </template>
        <script setup>
        import { ref } from 'vue';
        let age = ref(22);
        </script>
        <style scoped>
        .age-input {
          color: white;
        }
        </style>
      `,
    } as SFCBlock
    const filename = 'sfc-incorrect-order.vue'
    const topLevelElementOrder = DEFAULT_OVERRIDE_CONFIG.topLevelElementOrder
    checkTopLevelElementOrder(script.content, filename, topLevelElementOrder)
    const result = reportTopLevelElementOrder()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: filename,
      rule: `<text_info>vue-recommended ~ top level element order</text_info>`,
      description: `👉 <text_warn>Single-File Components should always order <script setup>, <template>, and <style scoped> tags consistently.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/top-level-element-order.html`,
      message: `Top level elements are <bg_warn>not following the correct order.</bg_warn> 🚨`,
    }])
  })

  it('should report files where one top-level element order is missing', () => {
    const script = {
      content: `
        <style scoped>
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
    const topLevelElementOrder = DEFAULT_OVERRIDE_CONFIG.topLevelElementOrder
    checkTopLevelElementOrder(script.content, filename, topLevelElementOrder)
    const result = reportTopLevelElementOrder()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: filename,
      rule: `<text_info>vue-recommended ~ top level element order</text_info>`,
      description: `👉 <text_warn>Single-File Components should always order <script setup>, <template>, and <style scoped> tags consistently.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/top-level-element-order.html`,
      message: `Top level elements are <bg_warn>not following the correct order.</bg_warn> 🚨`,
    }])
  })
})
