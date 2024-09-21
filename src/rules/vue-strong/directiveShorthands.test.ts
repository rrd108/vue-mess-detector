import type { SFCDescriptor } from '@vue/compiler-sfc'
import { describe, expect, it } from 'vitest'
import { checkDirectiveShorthands, reportDirectiveShorthands } from './directiveShorthands'

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
    const result = reportDirectiveShorthands()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
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
    const result = reportDirectiveShorthands()
    expect(result.length).toBe(3)
    expect(result).toStrictEqual([
      {
        file: fileName,
        rule: `<text_info>vue-strong ~ directive shorthands not used</text_info>`,
        description: `👉 <text_warn>Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/directive-shorthands.html`,
        message: `line #1 <bg_warn>v-slot</bg_warn> 🚨`,
      },
      {
        file: fileName,
        rule: `<text_info>vue-strong ~ directive shorthands not used</text_info>`,
        description: `👉 <text_warn>Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/directive-shorthands.html`,
        message: `line #3 <bg_warn>v-bind</bg_warn> 🚨`,
      },
      {
        file: fileName,
        rule: `<text_info>vue-strong ~ directive shorthands not used</text_info>`,
        description: `👉 <text_warn>Use ":" for v-bind:, "@" for v-on: and "#" for v-slot.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/directive-shorthands.html`,
        message: `line #4 <bg_warn>v-on</bg_warn> 🚨`,
      },
    ])
  })
})
