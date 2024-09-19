import type { SFCDescriptor } from '@vue/compiler-sfc'
import { beforeEach, describe, expect, it } from 'vitest'
import { checkHugeFiles, reportHugeFiles, resetHugeFiles } from './hugeFiles'

describe('checkHugeFiles', () => {
  beforeEach(() => {
    resetHugeFiles()
  })

  it('should not report for a small file', () => {
    const smallFile = {
      filename: 'small.vue',
      source: '',
      template: {
        type: 'template',
        content: '<template>\n'.repeat(100),
        loc: {
          source: '',
          start: { line: 1, column: 1, offset: 0 },
          end: { line: 100, column: 1, offset: 100 * 10 },
        },
        attrs: {},
      },
      scriptSetup: {
        type: 'script',
        content: '<script setup>\n'.repeat(100),
        loc: {
          source: '',
          start: { line: 1, column: 1, offset: 0 },
          end: { line: 100, column: 1, offset: 100 * 9 },
        },
        attrs: {},
      },
      styles: [{
        type: 'style',
        content: '<style scoped>\n'.repeat(50),
        loc: {
          source: '',
          start: { line: 1, column: 1, offset: 0 },
          end: { line: 50, column: 1, offset: 50 * 8 },
        },
        attrs: {},
      }],
    } as SFCDescriptor
    checkHugeFiles(smallFile, 'small.vue')
    expect(reportHugeFiles().length).toBe(0)
    expect(reportHugeFiles()).toStrictEqual([])
  })

  it('should report a warning for a large file', () => {
    const largeFile = {
      filename: 'large.vue',
      source: '',
      template: {
        type: 'template',
        content: '<template>\n'.repeat(150),
        loc: {
          source: '',
          start: { line: 1, column: 1, offset: 0 },
          end: { line: 150, column: 1, offset: 150 * 10 },
        },
        attrs: {},
      },
      scriptSetup: {
        type: 'script',
        content: '<script setup>\n'.repeat(100),
        loc: {
          source: '',
          start: { line: 1, column: 1, offset: 0 },
          end: { line: 100, column: 1, offset: 100 * 9 },
        },
        attrs: {},
      },
      styles: [{
        type: 'style',
        content: '<style scoped>\n'.repeat(100),
        loc: {
          source: '',
          start: { line: 1, column: 1, offset: 0 },
          end: { line: 100, column: 1, offset: 100 * 8 },
        },
        attrs: {},
      }],
    } as SFCDescriptor
    const filePath = 'large.vue'
    checkHugeFiles(largeFile, filePath)
    const result = reportHugeFiles()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: filePath,
      rule: `<text_info>rrd ~ huge files</text_info>`,
      description: `👉 <text_warn>Try to split this component into smaller components or extract logic into composables.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/huge-files.html`,
      message: '<bg_warn>large file (350 lines)</bg_warn> 🚨',
    }])
  })

  it('should report an error for a huge file', () => {
    const hugeFile = {
      filename: 'huge.vue',
      source: '',
      template: {
        type: 'template',
        content: '<template>\n'.repeat(200),
        loc: {
          source: '',
          start: { line: 1, column: 1, offset: 0 },
          end: { line: 200, column: 1, offset: 200 * 9 },
        },
      },
      scriptSetup: {
        type: 'script',
        content: '<script setup>\n'.repeat(200),
        loc: {
          source: '',
          start: { line: 1, column: 1, offset: 0 },
          end: { line: 200, column: 1, offset: 200 * 9 },
        },
      },
      styles: [{
        type: 'style',
        content: '<style scoped>\n'.repeat(150),
        loc: {
          source: '',
          start: { line: 1, column: 1, offset: 0 },
          end: { line: 150, column: 1, offset: 150 * 8 },
        },
      }],
    } as SFCDescriptor
    const filePath = 'huge.vue'
    checkHugeFiles(hugeFile, filePath)
    const result = reportHugeFiles()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: filePath,
      rule: `<text_info>rrd ~ huge files</text_info>`,
      description: `👉 <text_warn>Try to split this component into smaller components or extract logic into composables.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/huge-files.html`,
      message: '<bg_err>huge file (550 lines)</bg_err> 🚨',
    }])
  })
})
