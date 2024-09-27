import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { describe, expect, it } from 'vitest'
import { checkRateLimiter, reportRateLimiter } from './rateLimiter'

describe('checkRateLimiter', () => {
  it('should not report files with /* TODO add test description */', () => {
    const script = {
      content: ` // TODO add code content to test`,
    } as SFCScriptBlock
    const fileName = 'rateLimiter.vue'
    checkRateLimiter(script, fileName)
    const result = reportRateLimiter()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should report files with /* TODO add test description */', () => {
    const script = {
        content: ` // TODO add code content to test`,
    } as SFCScriptBlock
    const fileName = 'rateLimiter-problem.vue'
    checkRateLimiter(script, fileName)
    const result = reportRateLimiter()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>security ~ rate Limiter</text_info>`,
      description: `👉 <text_warn>/* TODO tip to fix this issue */.</text_warn> See: https:///* TODO add doc link */`,
      message: `line #/* TODO line number from your content above*/ <bg_warn>/* TODO message from the rule file */</bg_warn> 🚨`,
    }])
  })
})
