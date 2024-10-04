import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { describe, expect, it } from 'vitest'
import { checkAmountOfComments, reportAmountOfComments } from './amountOfComments'

describe('checkAmountOfComments', () => {
  it('should not report files with comments less than 30% of total content', () => {
    const script = {
      content: `
        const x = 1;
        const y = 2;
        const z = 3;
        // This is a short comment
        const result = x + y + z;
      `,
    } as SFCScriptBlock
    const fileName = 'amounOfComments.vue'
    checkAmountOfComments(script, fileName)
    const result = reportAmountOfComments()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should not report files with no comments', () => {
    const script = {
      content: `
        const x = 1;
        const y = 2;
        const z = x + y;
      `,
    } as SFCScriptBlock
    const fileName = 'noComments.vue'
    checkAmountOfComments(script, fileName)
    const result = reportAmountOfComments()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should report files with comments more than 30% of total content', () => {
    const script = {
      content: `
        const x = 1;
        // This is a long comment
        // that spans multiple lines
        // and takes up more than 30%
        // of the total content
        // in this script block
        const y = 2;
      `,
    } as SFCScriptBlock
    const fileName = 'amounOfComments-problem.vue'
    checkAmountOfComments(script, fileName)
    const result = reportAmountOfComments()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([
      {
        file: fileName,
        rule: `<text_info>rrd ~ amount of comments</text_info>`,
        description: `👉 <text_warn>lots of comments found</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/amount-of-comments.html`,
        message: `The script block contains 62.14% comments, which exceeds the limit of 30%. 🚨`,
      },
    ])
  })

  it('should report files with comments more than 50% of total content', () => {
    const script = {
      content: `
        <script setup>
        /*
          Emiting a Policy (3/4)
          Third, just run the necessary endpoints...
          and trigger policy's action modal
        */
        function finallyEmiting() {
          if (quote.value.isEmitted) {
            isPolicyActionsOpen.value = true;
            return;
          }
        }

        /*
          Emiting a Policy (4/4)
          Lastly, download your certificates and decide where to go next
        */
        function afterParty() {}
        </script>
      `,
    } as SFCScriptBlock
    const fileName = 'amounOfComments-problem.vue'
    checkAmountOfComments(script, fileName)
    const result = reportAmountOfComments()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([
      {
        file: fileName,
        rule: `<text_info>rrd ~ amount of comments</text_info>`,
        description: `👉 <text_warn>lots of comments found</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/amount-of-comments.html`,
        message: `The script block contains 51.47% comments, which exceeds the limit of 30%. 🚨`,
      },
    ])
  })

  it('should report files with only comments', () => {
    const script = {
      content: `
        // This file contains
        // only comments
        /* 
          Multi-line comment
          test case
        */
      `,
    } as SFCScriptBlock
    const fileName = 'onlyComments.vue'
    checkAmountOfComments(script, fileName)
    const result = reportAmountOfComments()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([
      {
        file: fileName,
        rule: `<text_info>rrd ~ amount of comments</text_info>`,
        description: `👉 <text_warn>lots of comments found</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/amount-of-comments.html`,
        message: `The script block contains 84.75% comments, which exceeds the limit of 30%. 🚨`,
      },
    ])
  })
})
