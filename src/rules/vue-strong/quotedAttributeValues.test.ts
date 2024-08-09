import { beforeEach, describe, expect, it } from 'vitest'
import type { SFCDescriptor } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import { checkQuotedAttributeValues, reportQuotedAttributeValues, resetQuotedAttributeValues } from './quotedAttributeValues'

describe('checkQuotedAttributeValues', () => {
  beforeEach(() => {
    resetQuotedAttributeValues()
  })

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
    expect(reportQuotedAttributeValues().length).toBe(0)
    expect(reportQuotedAttributeValues()).toStrictEqual([])
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
    expect(reportQuotedAttributeValues().length).toBe(1)
    expect(reportQuotedAttributeValues()).toStrictEqual([{
      file: fileName,
      rule: `${TEXT_INFO}vue-strong ~ attribute value is not quoted${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Use quotes for attribute values.${TEXT_RESET} See: https://vuejs.org/style-guide/rules-strongly-recommended.html#quoted-attribute-values`,
      message: `line #2 ${BG_WARN}:style={${BG_RESET} 🚨`,
    }])
  })
})
