import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import { beforeEach, describe, expect, it } from 'vitest'

import { checkVifWithVfor, reportVifWithVfor, resetVIfWithVFor } from './vifWithVfor'

describe('checkVifWithVfor', () => {
  beforeEach(() => {
    resetVIfWithVFor()
  })

  it('should not report files where v-for and v-if is not used together', () => {
    const script = {
      content: `<template>
      <div v-if="isActive">
        <ul>
            <li v-for="user in activeUsers">
                {{ user.name }}
            </li>
        </ul>
      </div>
    </template>`,
    } as SFCTemplateBlock
    const fileName = 'separate-vif-vfor.vue'
    checkVifWithVfor(script, fileName)
    expect(reportVifWithVfor().length).toBe(0)
    expect(reportVifWithVfor()).toStrictEqual([])
  })

  it('should report files where v-for is used with v-if', () => {
    const script = {
      content: `<template>
      <ul>
      <li
        v-for="user in users"
        v-if="user.isActive"
        :key="user.id"
      >
        {{ user.name }}
      </li>
    </ul>
    </template>`,
    } as SFCTemplateBlock
    const fileName = 'vif-with-vfor.vue'
    checkVifWithVfor(script, fileName)
    expect(reportVifWithVfor().length).toBe(1)
    expect(reportVifWithVfor()).toStrictEqual([{
      file: fileName,
      rule: `<text_info>vue-essential ~ v-if used with v-for</text_info>`,
      description: `👉 <text_warn>Move out the v-if to a computed property.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-essential/vif-with-vfor.html`,
      message: `line #3 <bg_err>v-if used with v-for</bg_err> 🚨`,
    }])
  })
})
