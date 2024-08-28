import { beforeEach, describe, expect, it } from 'vitest'
import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import { BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
import { checkBigVif, reportBigVif, resetBigVif } from './bigVif'

describe('checkBigVif', () => {
  beforeEach(() => {
    resetBigVif()
  })

  it('should not report files with small v-if', () => {
    const template = {
      content: `<button v-if="isReady"></button>
      <button v-if="isNotReady" />
      <div v-if="!isReady">
        Processing <span>data</span>
      </div>`,
    } as SFCTemplateBlock
    const fileName = 'bigVif.vue'
    checkBigVif(template, fileName)
    expect(reportBigVif().length).toBe(0)
    expect(reportBigVif()).toStrictEqual([])
  })

  it('should report files with big v-if', () => {
    const template = {
      content: `<div v-if="!isReady">
        Processing <span>data</span>
        <table>
            <thead>
              <tr>
                  <th>data</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in items">
                  <td>{{ item}}</td>
              </tr>
          </table>
      </div>`,
    } as SFCTemplateBlock
    const fileName = 'bigVif-problem.vue'
    checkBigVif(template, fileName)
    expect(reportBigVif().length).toBe(1)
    expect(reportBigVif()).toStrictEqual([{
      file: fileName,
      rule: `${TEXT_INFO}rrd ~ big v-if${TEXT_RESET}`,
      description: `👉 ${TEXT_WARN}Big v-if can be moved out to its own component.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/big-vif.html`,
      message: `line #1 ${BG_WARN}has a v-if with 14 lines${BG_RESET} 🚨`,
    }])
  })
})
