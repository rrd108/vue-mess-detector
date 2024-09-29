import type { SFCDescriptor } from '@vue/compiler-sfc'
import fs from 'node:fs'
import { describe, expect, it, vi } from 'vitest'
import getProjectRoot from '../../helpers/getProjectRoot'
import { checkRateLimiter, reportRateLimiter } from './rateLimiter'

vi.mock('../../helpers/getProjectRoot')
vi.mock('node:fs', () => ({
  default: { existsSync: vi.fn() },
}))

describe('checkRateLimiter', () => {
  it('should not report when we have no server directory', async () => {
    vi.mocked(getProjectRoot).mockResolvedValue('./mockedRoot')
    vi.mocked(fs.existsSync).mockReturnValue(false)

    const descriptor = { source: '' } as unknown as SFCDescriptor
    const filePath = 'package.json'

    await checkRateLimiter(descriptor, filePath)
    const result = reportRateLimiter()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should not report when server directory exists and package.json has a rate limiter', async () => {
    vi.mocked(getProjectRoot).mockResolvedValue('./mockedRoot')
    vi.mocked(fs.existsSync).mockReturnValue(true)

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
    vi.mocked(getProjectRoot).mockResolvedValue('./mockedRoot')
    vi.mocked(fs.existsSync).mockReturnValue(true)

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
