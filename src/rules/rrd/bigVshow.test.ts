import { beforeEach, describe, expect, it } from 'vitest'
import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import { checkBigVshow, reportBigVshow, resetBigVshow } from './bigVshow'

describe('checkBigVif', () => {
  beforeEach(() => {
    resetBigVshow()
  })

  it('should not report files with small v-show', () => {
    const template = {
      content: `<button v-show="isReady"></button>
      <button v-show="isNotReady" />
      <div v-show="!isReady">
        Processing <span>data</span>
      </div>`,
    } as SFCTemplateBlock
    const fileName = 'bigVif.vue'
    checkBigVshow(template, fileName)
    expect(reportBigVshow().length).toBe(0)
    expect(reportBigVshow()).toStrictEqual([])
  })

  it('should report files with big v-show', () => {
    const template = {
      content: `<div v-show="!isReady">
        Processing <span>data</span>
        <table>
            <thead>
              <tr>
                  <th>data</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in items">
                  <td>{{ item }}</td>
              </tr>
          </table>
      </div>`,
    } as SFCTemplateBlock
    const fileName = 'bigVshow-problem.vue'
    checkBigVshow(template, fileName)
    expect(reportBigVshow().length).toBe(1)
    expect(reportBigVshow()).toStrictEqual([{
      file: fileName,
      rule: `${TEXT_INFO}rrd ~ big v-show${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Big v-show can be moved out to its own component.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/big-vshow.html`,
      message: `line #1 ${BG_WARN}has a v-show with 14 lines${BG_RESET} 🚨`,
    }])
  })
})
