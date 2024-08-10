import { beforeEach, describe, expect, it } from 'vitest'
import type { SFCTemplateBlock } from '@vue/compiler-sfc'

import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import { checkElementAttributeOrder, reportElementAttributeOrder, resetElementAttributeOrder } from './elementAttributeOrder'

describe('checkElementAttributeOrder', () => {
  beforeEach(() => {
    resetElementAttributeOrder()
  })

  it('should not report files where elements attribute order is correct', () => {
    const template = {
      content: `
                <template>
                    <div v-if="isVisible" id="app" ref="myDiv" v-on:click="handleClick"></div>
                </template>
            `,
    } as SFCTemplateBlock
    const filename = 'element-attribute-order.vue'
    checkElementAttributeOrder(template, filename)
    expect(reportElementAttributeOrder().length).toBe(0)
    expect(reportElementAttributeOrder()).toStrictEqual([])
  })

  it('should report files where elements attribute order are incorrect', () => {
    const template = {
      content: `
                <template>
                    <input v-on:input="handleInput" v-model="inputValue">
                </template>
            `,
    } as SFCTemplateBlock
    const filename = 'element-attribute-order-incorrect.vue'
    checkElementAttributeOrder(template, filename)
    expect(reportElementAttributeOrder().length).toBe(1)
    expect(reportElementAttributeOrder()).toStrictEqual([{
      file: filename,
      rule: `${TEXT_INFO}vue-recommended ~ element attribute order${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}The attributes of elements (including components) should be ordered consistently.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/element-attribute-order.html`,
      message: `tag has attributes out of order ${BG_WARN}(input)${BG_RESET} 🚨`,
    }])
  })

  it('should not report files where elements attribute order is incorrect 2', () => {
    const template = {
      content: `
                <template>
                    <div id="app" v-if="isVisible" ref="myDiv" v-on:click="handleClick"></div>
                </template>
            `,
    } as SFCTemplateBlock
    const filename = 'element-attribute-order-incorrect-2.vue'
    checkElementAttributeOrder(template, filename)
    expect(reportElementAttributeOrder().length).toBe(1)
    expect(reportElementAttributeOrder()).toStrictEqual([{
      file: filename,
      rule: `${TEXT_INFO}vue-recommended ~ element attribute order${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}The attributes of elements (including components) should be ordered consistently.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/vue-recommended/element-attribute-order.html`,
      message: `tag has attributes out of order ${BG_WARN}(div)${BG_RESET} 🚨`,
    }])
  })
})
