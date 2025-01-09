import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import { describe, expect, it } from 'vitest'
import { checkMultiAttributeElements, reportMultiAttributeElements } from './multiAttributeElements'

describe('multiAttributeElements', () => {
  it('should not report files when elements have single attribute', () => {
    const template = {
      content: `
        <template>
          <div id="app"></div>
          <div class="container border"></div>
          <button @click="handleClick">Click me</button>
        </template>
      `,
    } as SFCTemplateBlock
    const filename = 'single-attribute-element.vue'
    checkMultiAttributeElements(template, filename)
    const result = reportMultiAttributeElements()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should report files where one element has multiple attributes on the same line', () => {
    const template = {
      content: `
        <template>
          <div id="app" class="container" style="color: red;"></div>
        </template>
      `,
    } as SFCTemplateBlock
    const filename = 'multi-attribute-element.vue'
    const element = 'div'
    checkMultiAttributeElements(template, filename)
    const result = reportMultiAttributeElements()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: filename,
      rule: `<text_info>vue-strong ~ multi-attribute elements</text_info>`,
      description: `👉 <text_warn>Elements with multiple attributes should span multiple lines, with one attribute per line.</text_warn>`,
      message: `Element <bg_warn><${element}></bg_warn> should have its attributes on separate lines 🚨`,
    }])
  })

  it('should report component name properly', () => {
    const template = {
      content: `
        <template>
          <v-dialog v-model="isOpen" width="26rem"></v-dialog>
        </template>
      `,
    } as SFCTemplateBlock
    const filename = 'multi-attribute-element.vue'
    const element = 'v-dialog'
    checkMultiAttributeElements(template, filename)
    const result = reportMultiAttributeElements()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: filename,
      rule: `<text_info>vue-strong ~ multi-attribute elements</text_info>`,
      description: `👉 <text_warn>Elements with multiple attributes should span multiple lines, with one attribute per line.</text_warn>`,
      message: `Element <bg_warn><${element}></bg_warn> should have its attributes on separate lines 🚨`,
    }])
  })

  it('should report files where multiple elements have multiple attributes on the same line', () => {
    const template = {
      content: `
        <template>
          <div id="app" class="container" style="color: red;"></div>
          <button type="button" class="btn" @click="handleClick">Click me</button>
        </template>
      `,
    } as SFCTemplateBlock
    const filename = 'multiple-multi-attribute-elements.vue'
    checkMultiAttributeElements(template, filename)
    const result = reportMultiAttributeElements()
    expect(result.length).toBe(2)
    expect(result).toStrictEqual([{
      file: filename,
      rule: `<text_info>vue-strong ~ multi-attribute elements</text_info>`,
      description: `👉 <text_warn>Elements with multiple attributes should span multiple lines, with one attribute per line.</text_warn>`,
      message: `Element <bg_warn><div></bg_warn> should have its attributes on separate lines 🚨`,
    }, {
      file: filename,
      rule: `<text_info>vue-strong ~ multi-attribute elements</text_info>`,
      description: `👉 <text_warn>Elements with multiple attributes should span multiple lines, with one attribute per line.</text_warn>`,
      message: `Element <bg_warn><button></bg_warn> should have its attributes on separate lines 🚨`,
    }])
  })
})
