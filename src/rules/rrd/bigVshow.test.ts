import type { SFCTemplateBlock } from '@vue/compiler-sfc'
import { DEFAULT_OVERRIDE_CONFIG } from '../../helpers/constants'
import { describe, expect, it } from 'vitest'
import { checkBigVshow, reportBigVshow } from './bigVshow'

describe('checkBigVshow', () => {
  it('should not report files with small v-show', () => {
    const template = {
      content: `<button v-show="isReady"></button>
      <button v-show="isNotReady" />
      <div v-show="!isReady">
        Processing <span>data</span>
      </div>`,
    } as SFCTemplateBlock
    const fileName = 'bigVshow.vue'
    const maxVshowLines = DEFAULT_OVERRIDE_CONFIG.maxVshowLines
    checkBigVshow(template, fileName, maxVshowLines)
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
    const maxVshowLines = DEFAULT_OVERRIDE_CONFIG.maxVshowLines
    checkBigVshow(template, fileName, maxVshowLines)
    expect(reportBigVshow().length).toBe(1)
    expect(reportBigVshow()).toStrictEqual([{
      file: fileName,
      rule: `<text_info>rrd ~ big v-show</text_info>`,
      description: `👉 <text_warn>Big v-show can be moved out to its own component.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/big-vshow.html`,
      message: `line #1 <bg_warn>has a v-show with 14 lines</bg_warn> 🚨`,
    }])
  })
})
