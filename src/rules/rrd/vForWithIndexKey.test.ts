import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import { beforeEach, describe, expect, it } from 'vitest'
import { checkVForWithIndexKey, reportVForWithIndexKey, resetResults } from './vForWithIndexKey'

describe('checkVForWithIndexKey', () => {
  beforeEach(() => {
    resetResults()
  })

  it('should not report files with a unique identifier as key', () => {
    const template = {
      content: `
        <template>
          <div v-for="item in products" :key="item.id">{{ item.name }}</div>
        </template>
      `,
    } as SFCTemplateBlock
    const fileName = 'vForWithIndexKey.vue'
    checkVForWithIndexKey(template, fileName)
    const result = reportVForWithIndexKey()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should not report files with index where using a unique identifier as key', () => {
    const template = {
      content: `
        <template>
          <div v-for="(item, index) in products" :key="item.id">{{ item.name }}</div>
        </template>
      `,
    } as SFCTemplateBlock
    const fileName = 'vForWithIndexKey.vue'
    checkVForWithIndexKey(template, fileName)
    const result = reportVForWithIndexKey()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should report files with index as key', () => {
    const template = {
      content: `
          <template>
            <div v-for="(item, index) in products" :key="index">
              <p>{{ item.name }}</p>
            </div>
          </template>
        `,
    } as SFCTemplateBlock
    const fileName = 'vForWithIndexKey-problem.vue'
    checkVForWithIndexKey(template, fileName)
    const result = reportVForWithIndexKey()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>rrd ~ VFor With Index Key</text_info>`,
      description: `👉 <text_warn>Avoid using index as key in v-for loops.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/v-for-with-index-key.html`,
      message: `line #2 <bg_warn>index is being used as :key in v-for</bg_warn> 🚨`,
    }])
  })

  it('should report files with index but using other names as key', () => {
    const template = {
      content: `
          <template>
            <div v-for="(item, idx) in products" :key="idx">
              <p>{{ item.name }}</p>
            </div>
          </template>
        `,
    } as SFCTemplateBlock
    const fileName = 'vForWithIndexKey-problem.vue'
    checkVForWithIndexKey(template, fileName)
    const result = reportVForWithIndexKey()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>rrd ~ VFor With Index Key</text_info>`,
      description: `👉 <text_warn>Avoid using index as key in v-for loops.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/v-for-with-index-key.html`,
      message: `line #2 <bg_warn>index is being used as :key in v-for</bg_warn> 🚨`,
    }])
  })

  it('should report files with index but using other names as key v2', () => {
    const template = {
      content: `
          <template>
            <div v-for="(item, i) in products" :key="i">
              <p>{{ item.name }}</p>
            </div>
          </template>
        `,
    } as SFCTemplateBlock
    const fileName = 'vForWithIndexKey-problem.vue'
    checkVForWithIndexKey(template, fileName)
    const result = reportVForWithIndexKey()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>rrd ~ VFor With Index Key</text_info>`,
      description: `👉 <text_warn>Avoid using index as key in v-for loops.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/v-for-with-index-key.html`,
      message: `line #2 <bg_warn>index is being used as :key in v-for</bg_warn> 🚨`,
    }])
  })
})
