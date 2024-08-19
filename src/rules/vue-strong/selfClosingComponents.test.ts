import { beforeEach, describe, expect, it } from 'vitest'
import type { SFCDescriptor } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import { checkSelfClosingComponents, reportSelfClosingComponents, resetSelfClosingComponents } from './selfClosingComponents'

describe('checkSelfClosingComponents', () => {
  beforeEach(() => {
    resetSelfClosingComponents()
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
    expect(reportSelfClosingComponents().length).toBe(0)
    expect(reportSelfClosingComponents()).toStrictEqual([])
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
    expect(reportSelfClosingComponents().length).toBe(0)
    expect(reportSelfClosingComponents()).toStrictEqual([])
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
    expect(reportSelfClosingComponents().length).toBe(1)
    expect(reportSelfClosingComponents()).toStrictEqual([{
      file: fileName,
      rule: `${TEXT_INFO}vue-strong ~ component is not self closing${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Components with no content should be self-closing.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/self-closing-components.html`,
      message: `line #2 ${BG_WARN}<MyComponent></MyComponent>${BG_RESET} 🚨`,
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
    expect(reportSelfClosingComponents().length).toBe(1)
    expect(reportSelfClosingComponents()).toStrictEqual([{
      file: fileName,
      rule: `${TEXT_INFO}vue-strong ~ component is not self closing${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Components with no content should be self-closing.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/self-closing-components.html`,
      message: `line #2 ${BG_WARN}></MyComponent>${BG_RESET} 🚨`,
    }])
  })
})
