import { beforeEach, describe, expect, it } from 'vitest'
import type { SFCDescriptor } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import { checkDirectiveShorthands, reportDirectiveShorthands, resetDirectiveShorthands } from './directiveShorthands'

describe('checkDirectiveShorthands', () => {
  beforeEach(() => {
    resetDirectiveShorthands()
  })

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
    expect(reportDirectiveShorthands().length).toBe(0)
    expect(reportDirectiveShorthands()).toStrictEqual([])
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
    expect(reportDirectiveShorthands().length).toBe(3)
    expect(reportDirectiveShorthands()).toStrictEqual([
      {
        file: fileName,
        rule: `${TEXT_INFO}vue-strong ~ directive shorthands not used${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/directive-shorthands.html`,
        message: `line #1 ${BG_WARN}v-slot${BG_RESET} 🚨`,
      },
      {
        file: fileName,
        rule: `${TEXT_INFO}vue-strong ~ directive shorthands not used${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/directive-shorthands.html`,
        message: `line #3 ${BG_WARN}v-bind${BG_RESET} 🚨`,
      },
      {
        file: fileName,
        rule: `${TEXT_INFO}vue-strong ~ directive shorthands not used${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/directive-shorthands.html`,
        message: `line #4 ${BG_WARN}v-on${BG_RESET} 🚨`,
      },
    ])
  })
})
