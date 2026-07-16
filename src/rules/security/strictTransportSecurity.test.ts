import type { SFCDescriptor } from '@vue/compiler-sfc'
import { describe, expect, it } from 'vitest'
import { checkStrictTransportSecurity, reportStrictTransportSecurity } from './strictTransportSecurity'

describe('checkStrictTransportSecurity', () => {
  it('should not report when nuxt.config has Strict-Transport-Security header string', () => {
    const descriptor = {
      source: `
        export default defineNuxtConfig({
          nitro: {
            routeRules: {
              '/**': {
                headers: {
                  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
                },
              },
            },
          },
        })
      `,
    } as SFCDescriptor
    checkStrictTransportSecurity(descriptor, 'nuxt.config.ts')
    const result = reportStrictTransportSecurity()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should not report when nuxt.config has HSTS configured via strictTransportSecurity camelCase', () => {
    const descriptor = {
      source: `
        export default defineNuxtConfig({
          security: {
            headers: {
              strictTransportSecurity: 'max-age=31536000',
            },
          },
        })
      `,
    } as SFCDescriptor
    checkStrictTransportSecurity(descriptor, 'nuxt.config.ts')
    const result = reportStrictTransportSecurity()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should not report when nuxt.config has lowercase strict-transport-security', () => {
    const descriptor = {
      source: `
        export default defineNuxtConfig({
          headers: {
            'strict-transport-security': 'max-age=31536000',
          },
        })
      `,
    } as SFCDescriptor
    checkStrictTransportSecurity(descriptor, 'nuxt.config.ts')
    const result = reportStrictTransportSecurity()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should report when nuxt.config has no HSTS header configured', () => {
    const descriptor = {
      source: `
        export default defineNuxtConfig({
          modules: ['@nuxtjs/tailwindcss'],
        })
      `,
    } as SFCDescriptor
    checkStrictTransportSecurity(descriptor, 'nuxt.config.ts')
    const result = reportStrictTransportSecurity()
    expect(result.length).toBe(1)
    expect(result[0].description).toContain('Strict-Transport-Security')
    expect(result[0].message).toContain('No Strict-Transport-Security')
  })

  it('should not check files that are not nuxt.config', () => {
    const descriptor = {
      source: `export default {}`,
    } as SFCDescriptor
    checkStrictTransportSecurity(descriptor, 'some-other-file.ts')
    const result = reportStrictTransportSecurity()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should report when nuxt.config is empty', () => {
    const descriptor = {
      source: '',
    } as SFCDescriptor
    checkStrictTransportSecurity(descriptor, 'nuxt.config.ts')
    const result = reportStrictTransportSecurity()
    expect(result.length).toBe(1)
    expect(result[0].description).toContain('HSTS')
  })
})
