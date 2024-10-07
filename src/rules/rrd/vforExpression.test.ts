import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { describe, expect, it } from 'vitest'
import { checkVforExpression, reportVforExpression } from './vforExpression'

describe('checkVforExpression', () => {
  it('should not report files with v-for has no expression', () => {
    const script = {
      content: `<template>
          <div v-for="item in items" :key="item.id">
            {{ item.name }}
          </div>
        </template>`,
    } as SFCScriptBlock
    const fileName = 'vforNoExpression.vue'
    checkVforExpression(script, fileName)
    const result = reportVforExpression()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should report files with v-for has expression', () => {
    const script = {
        content: `<template>
          <div v-for="item in items.filter((config) => config.level === 2)" :key="item.id">
            {{ item.name }}
          </div>
        </template>`,
    } as SFCScriptBlock
    const fileName = 'vforWithExpression.vue'
    checkVforExpression(script, fileName)
    const result = reportVforExpression()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>rrd ~ vfor Expression</text_info>`,
      description: `👉 <text_warn>/* TODO tip to fix this issue */.</text_warn> See: https:///* TODO add doc link */`,
      message: `line #/* TODO line number from your content above*/ <bg_warn>/* TODO message from the rule file */</bg_warn> 🚨`,
    }])
  })
})
