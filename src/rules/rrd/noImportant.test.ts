import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import { describe, expect, it } from 'vitest'
import { checkNoImportant, reportNoImportant } from './noImportant'

describe('importantUsed', () => {
  it('should not report templates when there is no use of !important', () => {
    const template = {
      content: `
        <template>
          <div style="color: blue"></div>
        </template>
        <style scoped>
            div {
                border: solid;
            }
        </style>
      `,
    } as SFCTemplateBlock
    const filename = 'no-important.vue'
    checkNoImportant(template, filename)
    const result = reportNoImportant()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should not report css files when there is no use of !important', () => {
    const template = {
      content: `
        div {
            color: blue;
        }
      `,
    } as SFCTemplateBlock
    const filename = 'no-important.css'
    checkNoImportant(template, filename)
    const result = reportNoImportant()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should report templates when there is use of !important', () => {
    const template = {
      content: `
        <template>
          <div style="color: blue !important"></div>
        </template>
        <style scoped>
            div {
                border: solid !important;
            }
        </style>
      `,
    } as SFCTemplateBlock
    const filename = 'no-important.vue'
    checkNoImportant(template, filename)
    const result = reportNoImportant()
    expect(result.length).toBe(2)
    expect(result).toStrictEqual([{
      file: filename,
      rule: `<text_info>rdd ~ no !important</text_info>`,
      description: `👉 <text_warn>Avoid !important as it complicates CSS management and disrupts natural cascading.</text_warn>`,
      message: `line #${2} <bg_warn>Found !important</bg_warn> 🚨`,
    }, {
      file: filename,
      rule: `<text_info>rdd ~ no !important</text_info>`,
      description: `👉 <text_warn>Avoid !important as it complicates CSS management and disrupts natural cascading.</text_warn>`,
      message: `line #${6} <bg_warn>Found !important</bg_warn> 🚨`,
    }])
  })

  it('should report css files when there is use of !important', () => {
    const template = {
      content: `
        div {
            color: blue !important;
        }
      `,
    } as SFCTemplateBlock
    const filename = 'no-important.css'
    checkNoImportant(template, filename)
    const result = reportNoImportant()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: filename,
      rule: `<text_info>rdd ~ no !important</text_info>`,
      description: `👉 <text_warn>Avoid !important as it complicates CSS management and disrupts natural cascading.</text_warn>`,
      message: `line #${2} <bg_warn>Found !important</bg_warn> 🚨`,
    }])
  })
})
