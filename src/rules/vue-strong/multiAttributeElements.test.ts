import { beforeEach, describe, expect, it } from 'vitest'
import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import { checkMultiAttributeElements, reportMultiAttributeElements, resetMultiAttributeElements } from './multiAttributeElements'

describe('multiAttributeElements', () => {
  beforeEach(() => {
    resetMultiAttributeElements()
  })

  it('should not report files where elements have single attributes', () => {
    const template = {
      content: `
        <template>
          <div id="app"></div>
          <button @click="handleClick">Click me</button>
        </template>
      `,
    } as SFCTemplateBlock
    const filename = 'single-attribute-element.vue'
    checkMultiAttributeElements(template, filename)
    expect(reportMultiAttributeElements().length).toBe(0)
    expect(reportMultiAttributeElements()).toStrictEqual([])
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
    expect(reportMultiAttributeElements().length).toBe(1)
    expect(reportMultiAttributeElements()).toStrictEqual([{
      file: filename,
      rule: `${TEXT_INFO}vue-strong ~ multi-attribute elements${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Elements with multiple attributes should span multiple lines, with one attribute per line.${TEXT_RESET}`,
      message: `Element ${BG_WARN}<${element}>${BG_RESET} should have its attributes on separate lines 🚨`,
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
    expect(reportMultiAttributeElements().length).toBe(2)
    expect(reportMultiAttributeElements()).toStrictEqual([{
      file: filename,
      rule: `${TEXT_INFO}vue-strong ~ multi-attribute elements${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Elements with multiple attributes should span multiple lines, with one attribute per line.${TEXT_RESET}`,
      message: `Element ${BG_WARN}<div>${BG_RESET} should have its attributes on separate lines 🚨`,
    }, {
      file: filename,
      rule: `${TEXT_INFO}vue-strong ~ multi-attribute elements${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Elements with multiple attributes should span multiple lines, with one attribute per line.${TEXT_RESET}`,
      message: `Element ${BG_WARN}<button>${BG_RESET} should have its attributes on separate lines 🚨`,
    }])
  })
})
