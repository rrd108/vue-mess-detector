import { beforeEach, describe, expect, it } from 'vitest'
import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import { checkTemplateSimpleExpression, reportTemplateSimpleExpression, resetTemplateSimpleExpression } from './templateSimpleExpression'

describe('checkTemplateSimpleExpression', () => {
  beforeEach(() => {
    resetTemplateSimpleExpression()
  })

  it('should not report files where template expression is simple', () => {
    const script = {
      content: `<template>
      {{ normalizedFullName }}
      {{ chantGauranga }}
    </template>`,
    } as SFCTemplateBlock
    const fileName = 'simple-expression.vue'
    checkTemplateSimpleExpression(script, fileName)
    expect(reportTemplateSimpleExpression().length).toBe(0)
    expect(reportTemplateSimpleExpression()).toStrictEqual([])
  })

  it('should report files where template expression is not simple', () => {
    const script = {
      content: `<template>
      {{
        fullName.split(' ').map((word) => {
            return word[0].toUpperCase() + word.slice(1)
        }).join(' ')
      }}
    </template>`,
    } as SFCTemplateBlock
    const fileName = 'not-simple-expression.vue'
    checkTemplateSimpleExpression(script, fileName)
    expect(reportTemplateSimpleExpression().length).toBe(1)
    expect(reportTemplateSimpleExpression()).toStrictEqual([{
      file: fileName,
      rule: `${TEXT_INFO}vue-strong ~ lengthy template expression${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Refactor the expression into a computed property.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/vue-strong/template-simple-expression.html`,
      message: `line #5 ${BG_WARN}fullName.split(' ').map((word) => {${BG_RESET} 🚨`,
    }])
  })
})
