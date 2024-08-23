import { beforeEach, describe, expect, it } from 'vitest'
import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import { checkHtmlLink, reportHtmlLink, resetHtmlLink } from './htmlLink'

describe('checkHtmlLink', () => {
  beforeEach(() => {
    resetHtmlLink()
  })

  it('should not report files without HTML links', () => {
    const template = {
      content: `<template>
            <ul>
                <li><NuxtLink to="/home">Home</NuxtLink></li>
            </ul>
        </template>`,
    } as SFCTemplateBlock
    const fileName = 'no-html-link.vue'
    checkHtmlLink(template, fileName)
    expect(reportHtmlLink().length).toBe(0)
    expect(reportHtmlLink()).toStrictEqual([])
  })

  it('should report files with HTML links', () => {
    const template = {
      content: `<template>
            <ul>
                <li><a href="/home">Home</a></li>
                <li><a href="/about">About</a></li>
            </ul>
        </template>`,
    } as SFCTemplateBlock
    const fileName = 'with-html-link.vue'
    checkHtmlLink(template, fileName)
    expect(reportHtmlLink().length).toBe(1)
    expect(reportHtmlLink()).toStrictEqual([{
      file: fileName,
      rule: `${TEXT_INFO}rrd ~ html link${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Use router-link or NuxtLink.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/html-link.html`,
      message: `2 ${BG_WARN}html link found${BG_RESET} 🚨`,
    }])
  })
})
