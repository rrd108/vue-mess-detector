import { beforeEach, describe, expect, it, vi } from 'vitest'
import { SFCDescriptor } from '@vue/compiler-sfc'
import { checkSelfClosingComponents, reportSelfClosingComponents, resetSelfClosingComponents } from './selfClosingComponents'
import { BG_RESET, BG_WARN } from '../asceeCodes'

const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})

describe('checkSelfClosingComponents', () => {
  beforeEach(() => {
    resetSelfClosingComponents()
    mockConsoleLog.mockClear()
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
    expect(reportSelfClosingComponents()).toBe(0)
    expect(mockConsoleLog).not.toHaveBeenCalled()
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
    expect(reportSelfClosingComponents()).toBe(0)
    expect(mockConsoleLog).not.toHaveBeenCalled()
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
    expect(reportSelfClosingComponents()).toBe(1)
    expect(mockConsoleLog).toHaveBeenCalled()
    expect(mockConsoleLog).toHaveBeenLastCalledWith(`- ${fileName}#2 ${BG_WARN}<MyComponent></MyComponent>${BG_RESET} 🚨`)
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
    expect(reportSelfClosingComponents()).toBe(1)
    expect(mockConsoleLog).toHaveBeenCalled()
    expect(mockConsoleLog).toHaveBeenLastCalledWith(`- ${fileName}#4 ${BG_WARN}></MyComponent>${BG_RESET} 🚨`)
  })
})
