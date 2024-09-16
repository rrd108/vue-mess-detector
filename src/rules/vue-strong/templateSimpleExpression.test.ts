import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import { beforeEach, describe, expect, it } from 'vitest'

import { checkTemplateSimpleExpression, reportTemplateSimpleExpression, resetTemplateSimpleExpression } from './templateSimpleExpression'

describe('checkTemplateSimpleExpression', () => {
  beforeEach(() => {
    resetTemplateSimpleExpression()
  })

  it('should not report files where template expression is simple', () => {
    const template = {
      content: `<template>
      {{ normalizedFullName }}
      {{ chantGauranga }}
    </template>`,
    } as SFCTemplateBlock
    const fileName = 'simple-expression.vue'
    checkTemplateSimpleExpression(template, fileName)
    expect(reportTemplateSimpleExpression().length).toBe(0)
    expect(reportTemplateSimpleExpression()).toStrictEqual([])
  })

  it('should report files where template expression is not simple', () => {
    const template = {
      content: `<template>
      {{
        fullName.split(' ').map((word) => {
            return word[0].toUpperCase() + word.slice(1)
        }).join(' ')
      }}
    </template>`,
    } as SFCTemplateBlock
    const fileName = 'not-simple-expression.vue'
    checkTemplateSimpleExpression(template, fileName)
    expect(reportTemplateSimpleExpression().length).toBe(1)
    expect(reportTemplateSimpleExpression()).toStrictEqual([{
      file: fileName,
      rule: `<text_info>vue-strong ~ lengthy template expression</text_info>`,
      description: `👉 <text_warn>Refactor the expression into a computed property.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/template-simple-expression.html`,
      message: `line #3 <bg_warn>fullName.split(' ').map((word) => {</bg_warn> 🚨`,
    }])
  })
})
