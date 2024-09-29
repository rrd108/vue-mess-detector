import type { SFCDescriptor } from '@vue/compiler-sfc'
import { describe, expect, it } from 'vitest'
import { checkRateLimiter, reportRateLimiter } from './rateLimiter'

describe('checkRateLimiter', () => {
  it('should not report when server directory exists and package.json has a rate limiter', async () => {
    const descriptor = {
      source: JSON.stringify({
        dependencies: {
          'nuxt-api-shield': '^1.0.0',
        },  
      }),  
    } as unknown as SFCDescriptor  
    const filePath = 'package.json'

    await checkRateLimiter(descriptor, filePath)
    const result = reportRateLimiter()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should report when server directory exists but package.json has no rate limiter', async () => {
    const descriptor = {
      source: JSON.stringify({
        dependencies: {
          'nuxt-token-auth': '^1.0.0',
        },
      }),
    } as unknown as SFCDescriptor
    const filePath = 'package.json'

    await checkRateLimiter(descriptor, filePath)
    const result = reportRateLimiter()
    expect(result.length).toBe(1)
    expect(result[0].description).toContain('Use a rate limiter')
  })
})
