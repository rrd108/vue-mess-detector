import type { SFCDescriptor } from '@vue/compiler-sfc'
import { describe, expect, it } from 'vitest'
import { checkQuotedAttributeValues, reportQuotedAttributeValues } from './quotedAttributeValues'

describe('checkQuotedAttributeValues', () => {
  it('should not report files where template attribute values are quoted', () => {
    const template = `<template>
      <AppSidebar :style="{ width: sidebarWidth + 'px' }">
    </template>`
    const descriptor = {
      source: template,
      template: {
        content: template,
      },
    } as SFCDescriptor
    const fileName = 'quoted-attribue-value.vue'
    checkQuotedAttributeValues(descriptor, fileName)
    const result = reportQuotedAttributeValues()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should report files where template attribute values are not quoted', () => {
    const template = `<template>
      <AppSidebar :style={width:sidebarWidth+'px'}>
    </template>`
    const descriptor = {
      source: template,
      template: {
        content: template,
      },
    } as SFCDescriptor
    const fileName = 'not-quoted-attribue-value.vue'
    checkQuotedAttributeValues(descriptor, fileName)
    const result = reportQuotedAttributeValues()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>vue-strong ~ quoted attribute values</text_info>`,
      description: `👉 <text_warn>Always use quotes for attribute values.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/vue-strong/quoted-attribute-values.html`,
      message: `line #2 <bg_warn>:style={</bg_warn> 🚨`,
    }])
  })
})
