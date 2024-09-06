import { beforeEach, describe, expect, it } from 'vitest'
import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import { checkHtmlImageElements, reportHtmlImageElements, resetHtmlImageElements } from './htmlImageElements'

describe('checkHtmlImageElements', () => {
  beforeEach(() => {
    resetHtmlImageElements()
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
    expect(reportHtmlImageElements().length).toBe(0)
    expect(reportHtmlImageElements()).toStrictEqual([])
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
    expect(reportHtmlImageElements().length).toBe(3)
    expect(reportHtmlImageElements()).toStrictEqual([
      {
        file: fileName,
        rule: `${TEXT_INFO}rrd ~ html image elements${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Use NuxtImg or NuxtPicture instead of HTML img or picture elements in Nuxt projects.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/html-image-elements.html`,
        message: `line #3 ${BG_WARN}img element found${BG_RESET} 🚨`,
      },
      {
        file: fileName,
        rule: `${TEXT_INFO}rrd ~ html image elements${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Use NuxtImg or NuxtPicture instead of HTML img or picture elements in Nuxt projects.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/html-image-elements.html`,
        message: `line #4 ${BG_WARN}picture element found${BG_RESET} 🚨`,
      },
      {
        file: fileName,
        rule: `${TEXT_INFO}rrd ~ html image elements${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Use NuxtImg or NuxtPicture instead of HTML img or picture elements in Nuxt projects.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/html-image-elements.html`,
        message: `line #6 ${BG_WARN}img element found${BG_RESET} 🚨`,
      },
    ])
  })
})
