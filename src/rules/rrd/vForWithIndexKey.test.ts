import { beforeEach, describe, expect, it } from 'vitest'
import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import { checkVForWithIndexKey, reportVForWithIndexKey, resetVForWithIndexKey } from './vForWithIndexKey'

describe('checkVForWithIndexKey', () => {
  beforeEach(() => {
    resetVForWithIndexKey()
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
    expect(reportVForWithIndexKey().length).toBe(0)
    expect(reportVForWithIndexKey()).toStrictEqual([])
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
    expect(reportVForWithIndexKey().length).toBe(0)
    expect(reportVForWithIndexKey()).toStrictEqual([])
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
    expect(reportVForWithIndexKey().length).toBe(1)
    expect(reportVForWithIndexKey()).toStrictEqual([{
      file: fileName,
      rule: `${TEXT_INFO}rrd ~ VFor With Index Key${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Avoid using index as key in v-for loops.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/v-for-with-index-key.html`,
      message: `line #2 ${BG_WARN}index is being used as :key in v-for${BG_RESET} 🚨`,
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
    expect(reportVForWithIndexKey().length).toBe(1)
    expect(reportVForWithIndexKey()).toStrictEqual([{
      file: fileName,
      rule: `${TEXT_INFO}rrd ~ VFor With Index Key${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Avoid using index as key in v-for loops.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/v-for-with-index-key.html`,
      message: `line #2 ${BG_WARN}index is being used as :key in v-for${BG_RESET} 🚨`,
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
    expect(reportVForWithIndexKey().length).toBe(1)
    expect(reportVForWithIndexKey()).toStrictEqual([{
      file: fileName,
      rule: `${TEXT_INFO}rrd ~ VFor With Index Key${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Avoid using index as key in v-for loops.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/v-for-with-index-key.html`,
      message: `line #2 ${BG_WARN}index is being used as :key in v-for${BG_RESET} 🚨`,
    }])
  })
})
