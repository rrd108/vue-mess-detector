import type { SFCStyleBlock } from '@vue/compiler-sfc'
import { beforeEach, describe, expect, it } from 'vitest'
import { checkRepeatedCss, reportRepeatedCss, resetResults } from './repeatedCss'

describe('checkRepeatedCss', () => {
  beforeEach(() => {
    resetResults()
  })

  it('should not report when css is not repeated more than 3 times across components', () => {
    const style1 = {
      content: `<style>
          .foo { color: red; }
        </style>`,
    } as SFCStyleBlock
    const style2 = {
      content: `<style>
          .bar { color: red; }
        </style>`,
    } as SFCStyleBlock
    const style3 = {
      content: `<style>
          .baz { color: red; }
        </style>`,
    } as SFCStyleBlock

    checkRepeatedCss([style1], 'component1.vue')
    checkRepeatedCss([style2], 'component2.vue')
    checkRepeatedCss([style3], 'component3.vue')

    const result = reportRepeatedCss()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should not report when css is not repeated more than 3 times in the component', () => {
    const style = {
      content: `<style>
          .foo {
            color: red;
          }
          .bar {
            background-color: red;
            color: red;
          }
        </style>`,
    } as SFCStyleBlock
    const filePath = 'repeatedCssSameComponent.vue'
    checkRepeatedCss([style], filePath)
    const result = reportRepeatedCss()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should not report when css is repeated more than 3 times in the same component', () => {
    const style = {
      content: `<style>
          .foo {
            color: red;
          }
          .bar {
            background-color: red;
            color: red;
          }
          .baz {
            color: red;
          }
          .qux {
            color: red;
          }
        </style>`,
    } as SFCStyleBlock
    const filePath = 'repeatedCssSameComponent.vue'
    checkRepeatedCss([style], filePath)
    const result = reportRepeatedCss()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should report when css is repeated more than 3 times across components', () => {
    const style1 = {
      content: `<style>
          .foo { color: red; }
        </style>`,
    } as SFCStyleBlock
    const style2 = {
      content: `<style>
          .bar { color: red; }
        </style>`,
    } as SFCStyleBlock
    const style3 = {
      content: `<style>
          .baz { color: red; }
        </style>`,
    } as SFCStyleBlock
    const style4 = {
      content: `<style>
          .qux { color: red; }
        </style>`,
    } as SFCStyleBlock

    checkRepeatedCss([style1], 'component1.vue')
    checkRepeatedCss([style2], 'component2.vue')
    checkRepeatedCss([style3], 'component3.vue')
    checkRepeatedCss([style4], 'component4.vue')

    const result = reportRepeatedCss()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([
      {
        file: 'component1.vue, component2.vue, component3.vue, component4.vue',
        rule: `<text_info>rrd ~ repeated CSS</text_info>`,
        description: `👉 <text_warn>Avoid repeating CSS properties with the same value more than 3 times across files. Consider using CSS variables or a common class.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/repeated-css.html`,
        message: `repeated CSS: (color:red;) in 4 files 🚨`,
      },
    ])
  })

  it('should report when css is repeated in more than 3 files', () => {
    const style = {
      content: `<style>.foo { color: red; }</style>`,
    } as SFCStyleBlock

    for (let i = 1; i <= 5; i++) {
      checkRepeatedCss([style], `component${i}.vue`)
    }

    const result = reportRepeatedCss()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: 'component1.vue, component2.vue, component3.vue, component4.vue, component5.vue',
      rule: `<text_info>rrd ~ repeated CSS</text_info>`,
      description: `👉 <text_warn>Avoid repeating CSS properties with the same value more than 3 times across files. Consider using CSS variables or a common class.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/repeated-css.html`,
      message: 'repeated CSS: (color:red;) in 5 files 🚨',
    }])
  })

  it('should not report when css is repeated in 3 or fewer files', () => {
    const style = {
      content: `<style>.foo { color: blue; }</style>`,
    } as SFCStyleBlock

    for (let i = 1; i <= 3; i++) {
      checkRepeatedCss([style], `component${i}.vue`)
    }

    const result = reportRepeatedCss()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })
})
