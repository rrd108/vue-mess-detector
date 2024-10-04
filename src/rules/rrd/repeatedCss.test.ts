import type { SFCStyleBlock } from '@vue/compiler-sfc'
import { beforeEach, describe, expect, it } from 'vitest'
import { checkRepeatedCss, reportRepeatedCss, resetResults } from './repeatedCss'

describe('checkPropsDrilling', () => {
  beforeEach(() => {
    resetResults()
  })

  it('should not report when css is not repeated in the component', () => {
    const style = {
      content: `<style>
          .foo {
            color: red;
          }
          .bar {
            color: blue;
          }
        </style>`,
    } as SFCStyleBlock
    const filePath = 'notRepetaedCssSameComponent.vue'
    checkRepeatedCss([style], filePath)
    const result = reportRepeatedCss()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should report when css is repeated in the component', () => {
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
    expect(result.length).toBe(2)
    expect(result).toStrictEqual([{
      file: filePath,
      rule: `<text_info>rrd ~ repeated CSS</text_info>`,
      description: `👉 <text_warn>Avoid repeating CSS properties with the same value across files. Consider using CSS variables or a common class.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/repeated-css-properties.html`,
      message: `Repeated CSS: color:red; in line #3 🚨`,
    }, {
      file: filePath,
      rule: `<text_info>rrd ~ repeated CSS</text_info>`,
      description: `👉 <text_warn>Avoid repeating CSS properties with the same value across files. Consider using CSS variables or a common class.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/repeated-css-properties.html`,
      message: `Repeated CSS: color:red; in line #7 🚨`,
    }])
  })

  it('should report when css is repeated in different components with the same value', () => {
    const style1 = {
      content: `<style>
            .foo {
              color: red;
            }
          </style>`,
    } as SFCStyleBlock
    const filePath1 = 'repeatedCssDifferentComponent1.vue'
    checkRepeatedCss([style1], filePath1)
    reportRepeatedCss()

    const style2 = {
      content: `<style>
            .bar {
              background-color: red;
              color: red;
            }
          </style>`,
    } as SFCStyleBlock
    const filePath2 = 'repeatedCssDifferentComponent2.vue'
    checkRepeatedCss([style2], filePath2)
    const result2 = reportRepeatedCss()

    expect(result2.length).toBe(2)
    expect(result2).toStrictEqual([{
      file: filePath1,
      rule: `<text_info>rrd ~ repeated CSS</text_info>`,
      description: `👉 <text_warn>Avoid repeating CSS properties with the same value across files. Consider using CSS variables or a common class.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/repeated-css-properties.html`,
      message: `Repeated CSS: color:red; in line #3 🚨`,
    }, {
      file: filePath2,
      rule: `<text_info>rrd ~ repeated CSS</text_info>`,
      description: `👉 <text_warn>Avoid repeating CSS properties with the same value across files. Consider using CSS variables or a common class.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/repeated-css-properties.html`,
      message: `Repeated CSS: color:red; in line #4 🚨`,
    }])
  })
})
