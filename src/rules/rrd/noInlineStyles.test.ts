import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import { beforeEach, describe, expect, it } from 'vitest'
import { checkNoInlineStyles, reportNoInlineStyles, resetResults } from './noInlineStyles'

describe('checkNoInlineStyles', () => {
  beforeEach(() => {
    resetResults()
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
    const result = reportNoInlineStyles()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
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
    const result = reportNoInlineStyles()
    expect(result.length).toBe(2)
    expect(result).toStrictEqual([
      {
        file: fileName,
        rule: `<text_info>rrd ~ no Inline Styles</text_info>`,
        description: `👉 <text_warn>Avoid using inline styles. Consider moving the styles to a CSS or SCSS file, or use a Vue scoped style.</text_warn>`,
        message: `line #2 <bg_warn>Found inline style: style="background: #fff;"</bg_warn> 🚨`,
      },
      {
        file: fileName,
        rule: `<text_info>rrd ~ no Inline Styles</text_info>`,
        description: `👉 <text_warn>Avoid using inline styles. Consider moving the styles to a CSS or SCSS file, or use a Vue scoped style.</text_warn>`,
        message: `line #4 <bg_warn>Found inline style: style="color: red;"</bg_warn> 🚨`,
      },
    ])
  })
})
