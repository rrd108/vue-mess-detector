import { beforeEach, describe, expect, it } from 'vitest'
import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import { checkNoInlineStyles, reportNoInlineStyles, resetNoInlineStyles } from './noInlineStyles'

describe('checkNoInlineStyles', () => {
  beforeEach(() => {
    resetNoInlineStyles()
  })

  it('should not report files with inline styles', () => {
    const template = {
      content: `
        <template>
          <div>Hello World!</div>
          <div>
            <span>Hi!</span>
          </div>
        </template>
      `,
    } as SFCTemplateBlock
    const fileName = 'noInlineStyles.vue'
    checkNoInlineStyles(template, fileName)
    expect(reportNoInlineStyles().length).toBe(0)
    expect(reportNoInlineStyles()).toStrictEqual([])
  })

  it('should report files with inline styles', () => {
    const template = {
      content: `
        <template>
          <div style="background: #fff;">Hello World!</div>
          <div>
            <span style="color: red;">Hi!</span>
          </div>
        </template>
      `,
    } as SFCTemplateBlock
    const fileName = 'noInlineStyles-problem.vue'
    checkNoInlineStyles(template, fileName)
    expect(reportNoInlineStyles().length).toBe(2)
    expect(reportNoInlineStyles()).toStrictEqual([
      {
        file: fileName,
        rule: `${TEXT_INFO}rrd ~ no Inline Styles${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Avoid using inline styles. Consider moving the styles to a CSS or SCSS file, or use a Vue scoped style.${TEXT_RESET}`,
        message: `line #2 ${BG_WARN}Found inline style: style="background: #fff;"${BG_RESET} 🚨`,
      },
      {
        file: fileName,
        rule: `${TEXT_INFO}rrd ~ no Inline Styles${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Avoid using inline styles. Consider moving the styles to a CSS or SCSS file, or use a Vue scoped style.${TEXT_RESET}`,
        message: `line #4 ${BG_WARN}Found inline style: style="color: red;"${BG_RESET} 🚨`,
      },
    ])
  })
})
