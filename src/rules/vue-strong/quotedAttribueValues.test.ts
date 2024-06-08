import { describe, expect, it, vi } from 'vitest'
import { SFCDescriptor } from '@vue/compiler-sfc'
import { checkQuotedAttributeValues, reportQuotedAttributeValues } from './quotedAttribueValues'
import { BG_RESET, BG_WARN } from '../asceeCodes'

const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})

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
    expect(reportQuotedAttributeValues()).toBe(0)
    expect(mockConsoleLog).not.toHaveBeenCalled()
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
    expect(reportQuotedAttributeValues()).toBe(1)
    expect(mockConsoleLog).toHaveBeenCalled()
    expect(mockConsoleLog).toHaveBeenLastCalledWith(`- ${fileName}#2 ${BG_WARN}:style={${BG_RESET} 🚨`)
  })
})
