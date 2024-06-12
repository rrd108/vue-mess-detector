import { describe, expect, it, vi } from 'vitest'
import { SFCDescriptor, SFCTemplateBlock } from '@vue/compiler-sfc'
import { checkDirectiveShorthands, reportDirectiveShorthands } from './directiveShorthands'
import { BG_RESET, BG_WARN } from '../asceeCodes'

const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})

describe('checkDirectiveShorthands', () => {
  it('should not report files where directive shorthands are used', () => {
    const template = `<template #header>
      <input
        :value="newTodoText"
        @input="addTodo"
        >
    </template>`
    const descriptor = {
      source: template,
      template: {
        content: template,
      },
    } as SFCDescriptor
    const fileName = 'directive-shorthands.vue'
    checkDirectiveShorthands(descriptor, fileName)
    expect(reportDirectiveShorthands()).toBe(0)
    expect(mockConsoleLog).not.toHaveBeenCalled()
  })

  it('should report files where directive shorthands are not used', () => {
    const template = `<template v-slot:header>
      <input
        v-bind:value="newTodoText"
        v-on:input="addTodo"
        >
    </template>`
    const descriptor = {
      source: template,
      template: {
        content: template,
      },
    } as SFCDescriptor
    const fileName = 'no-directive-shorthands.vue'
    checkDirectiveShorthands(descriptor, fileName)
    expect(reportDirectiveShorthands()).toBe(3)
    expect(mockConsoleLog).toHaveBeenCalled()
    expect(mockConsoleLog).toHaveBeenLastCalledWith(`- ${fileName}:4 ${BG_WARN}v-on${BG_RESET} 🚨`)
  })
})
