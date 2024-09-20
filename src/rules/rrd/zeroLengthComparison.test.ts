import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { describe, expect, it } from 'vitest'
import { checkZeroLengthComparison, reportZeroLengthComparison } from './zeroLengthComparison'

describe('checkZeroLengthComparison', () => {
  it('should not report files with none zero-length comparison', () => {
    const script = {
      content: `
        <script setup>
        if (results.length) {
          console.log('You Won')
        }
        </script>
      `,
    } as SFCScriptBlock
    const fileName = 'zeroLengthComparison.vue'
    checkZeroLengthComparison(script, fileName)
    expect(reportZeroLengthComparison().length).toBe(0)
    expect(reportZeroLengthComparison()).toStrictEqual([])
  })

  it('should report files with with zero-length comparison in script', () => {
    const script = {
      content: `
          <script setup>
          if (results.length > 0) {
            console.log('You Won')
          }
          </script>
        `,
    } as SFCScriptBlock
    const fileName = 'zeroLengthComparison-problem.vue'
    checkZeroLengthComparison(script, fileName)
    expect(reportZeroLengthComparison().length).toBe(1)
    expect(reportZeroLengthComparison()).toStrictEqual([{
      file: fileName,
      rule: `<text_info>rrd ~ Zero Length Comparison</text_info>`,
      description: `👉 <text_warn>In JavaScript, any number greater than 0 is truthy, so you can directly use the length property.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/zero-length-comparison.html`,
      message: `line #2 zero length comparison found <bg_warn>(results)</bg_warn> 🚨`,
    }])
  })

  it('should report files with with zero-length comparison in template', () => {
    const script = {
      content: `
          <script setup>
          import { ref } from 'vue';

          const title = ref('Welcome, check the winner below')
          const trophies = ref([])

          /* other logic here... */
          </script>

          <template>
            <div v-if="trophies.length > 0">
              <!-- Some Html Tags -->
            </div>
          </template>
        `,
    } as SFCScriptBlock
    const fileName = 'zeroLengthComparison-problem.vue'
    checkZeroLengthComparison(script, fileName)
    expect(reportZeroLengthComparison().length).toBe(1)
    expect(reportZeroLengthComparison()).toStrictEqual([{
      file: fileName,
      rule: `<text_info>rrd ~ Zero Length Comparison</text_info>`,
      description: `👉 <text_warn>In JavaScript, any number greater than 0 is truthy, so you can directly use the length property.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/zero-length-comparison.html`,
      message: `line #11 zero length comparison found <bg_warn>(trophies)</bg_warn> 🚨`,
    }])
  })
})
