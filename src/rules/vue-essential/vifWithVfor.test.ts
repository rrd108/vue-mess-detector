import { beforeEach, describe, expect, it } from 'vitest'
import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
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
      rule: `${TEXT_INFO}vue-essential ~ v-if used with v-for${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Move out the v-if to a computed property.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-essential.html#avoid-v-if-with-v-for`,
      message: `${BG_WARN}v-if used with v-for${BG_RESET} 🚨`,
    }])
  })
})
