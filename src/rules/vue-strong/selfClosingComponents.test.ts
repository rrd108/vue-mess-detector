import type { SFCDescriptor } from '@vue/compiler-sfc'
import { beforeEach, describe, expect, it } from 'vitest'
import { checkSelfClosingComponents, reportSelfClosingComponents, resetResults } from './selfClosingComponents'

describe('checkSelfClosingComponents', () => {
  beforeEach(() => {
    resetResults()
  })

  it('should not report simple html tags', () => {
    const template = `<template>
      <td></td>
    </template>`
    const descriptor = {
      source: template,
      template: {
        content: template,
      },
    } as SFCDescriptor
    const fileName = 'self-close-component.vue'
    checkSelfClosingComponents(descriptor, fileName)
    const result = reportSelfClosingComponents()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should not report files where the components self close', () => {
    const template = `<template>
      <MyComponent />
    </template>`
    const descriptor = {
      source: template,
      template: {
        content: template,
      },
    } as SFCDescriptor
    const fileName = 'self-close-component.vue'
    checkSelfClosingComponents(descriptor, fileName)
    const result = reportSelfClosingComponents()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should report files where the components does not self close - single line', () => {
    const template = `<template>
      <MyComponent></MyComponent>
    </template>`
    const descriptor = {
      source: template,
      template: {
        content: template,
      },
    } as SFCDescriptor
    const fileName = 'not-self-close-component.vue'
    checkSelfClosingComponents(descriptor, fileName)
    const result = reportSelfClosingComponents()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>vue-strong ~ component is not self closing</text_info>`,
      description: `👉 <text_warn>Components with no content should be self-closing.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/self-closing-components.html`,
      message: `line #2 <bg_warn><MyComponent></MyComponent></bg_warn> 🚨`,
    }])
  })

  it('should report files where the components does not self close - multi line', () => {
    const template = `<template>
      <MyComponent
        class="center"
      ></MyComponent>
      </template>`
    const descriptor = {
      source: template,
      template: {
        content: template,
      },
    } as SFCDescriptor
    const fileName = 'not-self-close-component.vue'
    checkSelfClosingComponents(descriptor, fileName)
    const result = reportSelfClosingComponents()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>vue-strong ~ component is not self closing</text_info>`,
      description: `👉 <text_warn>Components with no content should be self-closing.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/self-closing-components.html`,
      message: `line #2 <bg_warn>></MyComponent></bg_warn> 🚨`,
    }])
  })
})
