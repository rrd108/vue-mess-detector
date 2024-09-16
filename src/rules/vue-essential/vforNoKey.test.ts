import { beforeEach, describe, expect, it } from 'vitest'
import type { SFCTemplateBlock } from '@vue/compiler-sfc'

import { checkVforNoKey, reportVforNoKey, resetReportVForNoKey } from './vforNoKey'

describe('checkVforNoKey', () => {
  beforeEach(() => {
    resetReportVForNoKey()
  })

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
    expect(reportVforNoKey().length).toBe(0)
    expect(reportVforNoKey()).toStrictEqual([])
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
    expect(reportVforNoKey().length).toBe(1)
    expect(reportVforNoKey()).toStrictEqual([{
      file: fileName,
      rule: `<text_info>vue-essential ~ v-for has no key</text_info>`,
      description: `👉 <text_warn>Add a \`:key\` property to all v-for.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vfor-no-key.html`,
      message: `v-for used <bg_err>without a key</bg_err> 🚨`,
    }])
  })
})
