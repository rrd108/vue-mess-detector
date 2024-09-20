import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import { beforeEach, describe, expect, it } from 'vitest'
import { checkHtmlImageElements, reportHtmlImageElements, resetResults } from './htmlImageElements'

describe('checkHtmlImageElements', () => {
  beforeEach(() => {
    resetResults()
  })

  it('should not report files without HTML image elements', () => {
    const template = {
      content: `<template>
        <div>
          <NuxtImg src="/image.jpg" alt="An image" />
          <NuxtPicture src="/image.jpg" alt="A picture" />
        </div>
      </template>`,
    } as SFCTemplateBlock
    const fileName = 'no-html-image-elements.vue'
    checkHtmlImageElements(template, fileName)
    const result = reportHtmlImageElements()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should report files with HTML image elements', () => {
    const template = {
      content: `<template>
        <div>
          <img src="/image.jpg" alt="An image" />
          <picture>
            <source srcset="/image-large.jpg" media="(min-width: 800px)">
            <img src="/image-small.jpg" alt="A picture">
          </picture>
        </div>
      </template>`,
    } as SFCTemplateBlock
    const fileName = 'with-html-image-elements.vue'
    checkHtmlImageElements(template, fileName)
    const result = reportHtmlImageElements()
    expect(result.length).toBe(3)
    expect(result).toStrictEqual([
      {
        file: fileName,
        rule: `<text_info>rrd ~ html image elements</text_info>`,
        description: `👉 <text_warn>Use NuxtImg or NuxtPicture instead of HTML img or picture elements in Nuxt projects.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/html-image-elements.html`,
        message: `line #3 <bg_warn>img element found</bg_warn> 🚨`,
      },
      {
        file: fileName,
        rule: `<text_info>rrd ~ html image elements</text_info>`,
        description: `👉 <text_warn>Use NuxtImg or NuxtPicture instead of HTML img or picture elements in Nuxt projects.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/html-image-elements.html`,
        message: `line #4 <bg_warn>picture element found</bg_warn> 🚨`,
      },
      {
        file: fileName,
        rule: `<text_info>rrd ~ html image elements</text_info>`,
        description: `👉 <text_warn>Use NuxtImg or NuxtPicture instead of HTML img or picture elements in Nuxt projects.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/html-image-elements.html`,
        message: `line #6 <bg_warn>img element found</bg_warn> 🚨`,
      },
    ])
  })
})
