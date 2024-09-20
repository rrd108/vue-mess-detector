import type { SFCDescriptor } from '@vue/compiler-sfc'
import { beforeEach, describe, expect, it } from 'vitest'
import { checkHugeFiles, reportHugeFiles, resetHugeFiles } from './hugeFiles'

describe('checkHugeFiles', () => {
  beforeEach(() => {
    resetHugeFiles()
  })

  it('should not report vue sfc files with small content', () => {
    const filePath = 'small-file.vue'
    const smallFile = {
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
    checkHugeFiles(smallFile, filePath, true)
    expect(reportHugeFiles().length).toBe(0)
    expect(reportHugeFiles()).toStrictEqual([])
  })

  it('should not report js/ts files with small content', () => {
    const filePath = 'small-file.ts'
    const smallNotVueFile = {
      scriptSetup: {
        content: 'const a = 1\nconst b = 2\nconst c = 3\n'.repeat(100),
      },
    } as SFCDescriptor
    checkHugeFiles(smallNotVueFile, filePath, true)
    expect(reportHugeFiles().length).toBe(0)
    expect(reportHugeFiles()).toStrictEqual([])
  })

  it('should report vue sfc files with large content', () => {
    const largeFile = {
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
    const filePath = 'large-file.vue'
    checkHugeFiles(largeFile, filePath, true)
    expect(reportHugeFiles().length).toBe(1)
    expect(reportHugeFiles()).toStrictEqual([{
      file: filePath,
      rule: `<text_info>rrd ~ huge files</text_info>`,
      description: `👉 <text_warn>Try to split this component into smaller components or extract logic into composables.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/huge-files.html`,
      message: '<bg_warn>large file (350 lines)</bg_warn> 🚨',
    }])
  })

  it('should report a warning for a large js/ts file', () => {
    const largeNotVueFile = {
      scriptSetup: {
        content: 'console.log("hello world")\n'.repeat(400),
      },
    } as SFCDescriptor
    const filePath = 'large-file.ts'
    checkHugeFiles(largeNotVueFile, filePath, true)
    expect(reportHugeFiles().length).toBe(1)
    expect(reportHugeFiles()).toStrictEqual([{
      file: filePath,
      rule: `<text_info>rrd ~ huge files</text_info>`,
      description: `👉 <text_warn>Try to split this component into smaller components or extract logic into composables.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/huge-files.html`,
      message: '<bg_warn>large file (400 lines)</bg_warn> 🚨',
    }])
  })

  it('should report vue sfc files with huge content', () => {
    const hugeFile = {
      filename: 'huge.vue',
      source: '',
      template: {
        type: 'template',
        content: '<template>\n'.repeat(300),
        loc: {
          source: '',
          start: { line: 1, column: 1, offset: 0 },
          end: { line: 300, column: 1, offset: 300 * 9 },
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
    checkHugeFiles(hugeFile, filePath, true)
    const result = reportHugeFiles()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: filePath,
      rule: `<text_info>rrd ~ huge files</text_info>`,
      description: `👉 <text_warn>Try to split this component into smaller components or extract logic into composables.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/huge-files.html`,
      message: '<bg_err>huge file (650 lines)</bg_err> 🚨',
    }])
  })

  it('should report an error for a huge js/ts file', () => {
    const hugeNotVueFile = {
      scriptSetup: {
        content: 'console.log("hello world")\n'.repeat(700),
      },
    } as SFCDescriptor
    const filePath = 'huge-file.ts'
    checkHugeFiles(hugeNotVueFile, filePath, true)
    expect(reportHugeFiles().length).toBe(1)
    expect(reportHugeFiles()).toStrictEqual([{
      file: filePath,
      rule: `<text_info>rrd ~ huge files</text_info>`,
      description: `👉 <text_warn>Try to split this component into smaller components or extract logic into composables.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/huge-files.html`,
      message: '<bg_err>huge file (700 lines)</bg_err> 🚨',
    }])
  })
})
