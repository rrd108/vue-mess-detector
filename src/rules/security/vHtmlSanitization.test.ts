import type { SFCDescriptor } from '@vue/compiler-sfc'
import { describe, expect, it } from 'vitest'
import { checkVHtmlSanitization, reportVHtmlSanitization } from './vHtmlSanitization'

describe('checkVHtmlSanitization', () => {
  it('should not report when v-html is not used', () => {
    const descriptor = {
      template: {
        content: `<template>
          <div>{{ message }}</div>
        </template>`,
      },
      scriptSetup: { content: 'const message = ref("hello")' },
    } as unknown as SFCDescriptor
    checkVHtmlSanitization(descriptor, 'safe-component.vue')
    const result = reportVHtmlSanitization()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should not report when v-html is used with DOMPurify', () => {
    const descriptor = {
      template: {
        content: `<template>
          <div v-html="sanitizedHtml"></div>
        </template>`,
      },
      scriptSetup: {
        content: `import DOMPurify from 'dompurify'
        const sanitizedHtml = computed(() => DOMPurify.sanitize(rawHtml))`,
      },
    } as unknown as SFCDescriptor
    checkVHtmlSanitization(descriptor, 'with-dompurify.vue')
    const result = reportVHtmlSanitization()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should not report when v-html is used with sanitize-html', () => {
    const descriptor = {
      template: {
        content: `<template>
          <div v-html="sanitized"></div>
        </template>`,
      },
      scriptSetup: {
        content: `import sanitizeHtml from 'sanitize-html'
        const sanitized = computed(() => sanitizeHtml(rawHtml))`,
      },
    } as unknown as SFCDescriptor
    checkVHtmlSanitization(descriptor, 'with-sanitize-html.vue')
    const result = reportVHtmlSanitization()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should not report when v-html is used with xss library', () => {
    const descriptor = {
      template: {
        content: `<template>
          <div v-html="clean"></div>
        </template>`,
      },
      scriptSetup: {
        content: `import xss from 'xss'
        const clean = computed(() => xss(rawHtml))`,
      },
    } as unknown as SFCDescriptor
    checkVHtmlSanitization(descriptor, 'with-xss.vue')
    const result = reportVHtmlSanitization()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should report v-html usage without any sanitization library', () => {
    const descriptor = {
      template: {
        content: `<template>
          <div v-html="rawHtml"></div>
        </template>`,
      },
      scriptSetup: { content: 'const rawHtml = ref("<p>hello</p>")' },
    } as unknown as SFCDescriptor
    checkVHtmlSanitization(descriptor, 'unsafe-v-html.vue')
    const result = reportVHtmlSanitization()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([
      {
        file: 'unsafe-v-html.vue',
        rule: `<text_info>security ~ v-html without sanitization</text_info>`,
        description: `👉 <text_warn>Sanitize HTML before rendering with v-html to prevent XSS attacks. Use DOMPurify or sanitize-html.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/security/v-html-sanitization.html`,
        message: `line #2 <bg_warn>v-html without sanitization</bg_warn> 🚨`,
      },
    ])
  })

  it('should report multiple v-html usages without sanitization', () => {
    const descriptor = {
      template: {
        content: `<template>
          <div v-html="content1"></div>
          <span v-html="content2"></span>
        </template>`,
      },
      scriptSetup: { content: 'const content1 = ref(""); const content2 = ref("")' },
    } as unknown as SFCDescriptor
    checkVHtmlSanitization(descriptor, 'multiple-unsafe.vue')
    const result = reportVHtmlSanitization()
    expect(result.length).toBe(2)
  })

  it('should not report when template is null', () => {
    const descriptor = {
      template: null,
      scriptSetup: { content: 'const rawHtml = ref("<p>hello</p>")' },
    } as unknown as SFCDescriptor
    checkVHtmlSanitization(descriptor, 'no-template.vue')
    const result = reportVHtmlSanitization()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should not report when v-html is used with sanitizeHtml function', () => {
    const descriptor = {
      template: {
        content: `<template>
          <div v-html="clean"></div>
        </template>`,
      },
      scriptSetup: {
        content: `import { sanitizeHtml } from './utils'
        const clean = computed(() => sanitizeHtml(raw))`,
      },
    } as unknown as SFCDescriptor
    checkVHtmlSanitization(descriptor, 'with-sanitize-html-fn.vue')
    const result = reportVHtmlSanitization()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })
})