import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import { describe, expect, it, vi } from 'vitest'
import { BG_RESET, BG_WARN } from '../asceeCodes'
import { checkElementAttributeOrder, reportElementAttributeOrder } from './elementAttributeOrder'

const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})

describe('checkElementAttributeOrder', () => {
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
    expect(reportElementAttributeOrder()).toBe(0)
    expect(mockConsoleLog).not.toHaveBeenCalled()
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
    expect(reportElementAttributeOrder()).toBe(1)
    expect(mockConsoleLog).toHaveBeenCalled()
    expect(mockConsoleLog).toHaveBeenLastCalledWith(
            `- ${filename} tag has attributes out of order ${BG_WARN}(input)${BG_RESET} 🚨`,
    )
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
    expect(reportElementAttributeOrder()).toBe(2)
    expect(mockConsoleLog).toHaveBeenCalled()
    expect(mockConsoleLog).toHaveBeenLastCalledWith(
            `- ${filename} tag has attributes out of order ${BG_WARN}(div)${BG_RESET} 🚨`,
    )
  })
})
