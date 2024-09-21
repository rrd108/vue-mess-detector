import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import { describe, expect, it } from 'vitest'
import { checkVforNoKey, reportVforNoKey } from './vforNoKey'

describe('checkVforNoKey', () => {
  it('should not report files where v-for has key property', () => {
    const script = {
      content: `<template>
      <ul>
        <li
            v-for="todo in todos"
            :key="todo.id"
        >
            {{ todo.text }}
        </li>
      </ul>
    </template>`,
    } as SFCTemplateBlock
    const fileName = 'vfor-with-key.vue'
    checkVforNoKey(script, fileName)
    const result = reportVforNoKey()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should report files where v-for has no key property', () => {
    const script = {
      content: `<template>
      <ul>
        <li v-for="todo in todos">
            {{ todo.text }}
        </li>
      </ul>
    </template>`,
    } as SFCTemplateBlock
    const fileName = 'vfor-no-key.vue'
    checkVforNoKey(script, fileName)
    const result = reportVforNoKey()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>vue-essential ~ v-for has no key</text_info>`,
      description: `👉 <text_warn>Add a \`:key\` property to all v-for.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vfor-no-key.html`,
      message: `v-for used <bg_err>without a key</bg_err> 🚨`,
    }])
  })
})
