import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import { describe, expect, it } from 'vitest'
import { checkHtmlLink, reportHtmlLink } from './htmlLink'

describe('checkHtmlLink', () => {
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
    const result = reportHtmlLink()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
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
    const result = reportHtmlLink()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>rrd ~ html link</text_info>`,
      description: `👉 <text_warn>Use router-link or NuxtLink.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/html-link.html`,
      message: `2 <bg_warn>html link found</bg_warn> 🚨`,
    }])
  })
})
