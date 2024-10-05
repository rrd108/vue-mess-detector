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
    expect(result.length).toBe(4)
    expect(result).toStrictEqual([
      {
        file: 'component1.vue',
        rule: `<text_info>rrd ~ repeated CSS</text_info>`,
        description: `👉 <text_warn>Avoid repeating CSS properties with the same value more than 3 times across files. Consider using CSS variables or a common class.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/repeated-css-properties.html`,
        message: `Repeated CSS: color:red; in line #2 🚨`,
      },
      {
        file: 'component2.vue',
        rule: `<text_info>rrd ~ repeated CSS</text_info>`,
        description: `👉 <text_warn>Avoid repeating CSS properties with the same value more than 3 times across files. Consider using CSS variables or a common class.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/repeated-css-properties.html`,
        message: `Repeated CSS: color:red; in line #2 🚨`,
      },
      {
        file: 'component3.vue',
        rule: `<text_info>rrd ~ repeated CSS</text_info>`,
        description: `👉 <text_warn>Avoid repeating CSS properties with the same value more than 3 times across files. Consider using CSS variables or a common class.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/repeated-css-properties.html`,
        message: `Repeated CSS: color:red; in line #2 🚨`,
      },
      {
        file: 'component4.vue',
        rule: `<text_info>rrd ~ repeated CSS</text_info>`,
        description: `👉 <text_warn>Avoid repeating CSS properties with the same value more than 3 times across files. Consider using CSS variables or a common class.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/repeated-css-properties.html`,
        message: `Repeated CSS: color:red; in line #2 🚨`,
      },
    ])
  })

  it('should report when css is repeated more than 3 times in the same component', () => {
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
    expect(result.length).toBe(4)
    expect(result).toStrictEqual([
      {
        file: filePath,
        rule: `<text_info>rrd ~ repeated CSS</text_info>`,
        description: `👉 <text_warn>Avoid repeating CSS properties with the same value more than 3 times across files. Consider using CSS variables or a common class.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/repeated-css-properties.html`,
        message: `Repeated CSS: color:red; in line #3 🚨`,
      },
      {
        file: filePath,
        rule: `<text_info>rrd ~ repeated CSS</text_info>`,
        description: `👉 <text_warn>Avoid repeating CSS properties with the same value more than 3 times across files. Consider using CSS variables or a common class.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/repeated-css-properties.html`,
        message: `Repeated CSS: color:red; in line #7 🚨`,
      },
      {
        file: filePath,
        rule: `<text_info>rrd ~ repeated CSS</text_info>`,
        description: `👉 <text_warn>Avoid repeating CSS properties with the same value more than 3 times across files. Consider using CSS variables or a common class.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/repeated-css-properties.html`,
        message: `Repeated CSS: color:red; in line #10 🚨`,
      },
      {
        file: filePath,
        rule: `<text_info>rrd ~ repeated CSS</text_info>`,
        description: `👉 <text_warn>Avoid repeating CSS properties with the same value more than 3 times across files. Consider using CSS variables or a common class.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/repeated-css-properties.html`,
        message: `Repeated CSS: color:red; in line #13 🚨`,
      },
    ])
  })
})
