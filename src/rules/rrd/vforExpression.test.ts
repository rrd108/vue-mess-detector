import type { SFCTemplateBlock } from '@vue/compiler-sfc'
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
    } as SFCTemplateBlock
    const fileName = 'vforNoExpression.vue'
    checkVforExpression(script, fileName)
    const result = reportVforExpression()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should report files with v-for using an arrow function in expression', () => {
    const expression = 'items.filter((config) => config.level === 2)'
    const template = {
        content: `<template>
          <div v-for="item in ${expression}" :key="item.id">
            {{ item.name }}
          </div>
        </template>`,
    } as SFCTemplateBlock
    const fileName = 'vforWithArrowFunctionExpression.vue'
    checkVforExpression(template, fileName)
    const result = reportVforExpression()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>rrd ~ vfor Expression</text_info>`,
      description: `👉 <text_warn>Move out the expression to a calculated property.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/vfor-expression.html`,
      message: `line #2 <bg_warn>expression: ${expression} in v-for</bg_warn> 🚨`,
    }])
  })

  it('should report files with v-for using a normal function in expression', () => {
    const expression = 'items.filter(function(config) { return config.level === 2 })'
    const template = {
      content: `<template>
        <div v-for="item in ${expression}" :key="item.id">
          {{ item.name }}
        </div>
      </template>`,
    } as SFCTemplateBlock
    const fileName = 'vforWithNormalFunctionExpression.vue'
    checkVforExpression(template, fileName)
    const result = reportVforExpression()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>rrd ~ vfor Expression</text_info>`,
      description: `👉 <text_warn>Move out the expression to a calculated property.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/vfor-expression.html`,
      message: `line #2 <bg_warn>expression: ${expression} in v-for</bg_warn> 🚨`,
    }])
  })
})
