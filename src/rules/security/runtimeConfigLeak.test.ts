import type { SFCDescriptor } from '@vue/compiler-sfc'
import { describe, expect, it } from 'vitest'
import { checkRuntimeConfigLeak, reportRuntimeConfigLeak } from './runtimeConfigLeak'

describe('checkRuntimeConfigLeak', () => {
  it('should not report when nuxt.config has only non-sensitive keys in runtimeConfig.public', () => {
    const descriptor = {
      source: `
        export default defineNuxtConfig({
          runtimeConfig: {
            apiKey: process.env.API_KEY,
            public: {
              siteName: 'My Site',
              apiBase: '/api',
            },
          },
        })
      `,
    } as SFCDescriptor
    checkRuntimeConfigLeak(descriptor, '/nuxt.config.ts')
    const result = reportRuntimeConfigLeak()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should report when nuxt.config has sensitive keys in runtimeConfig.public', () => {
    const descriptor = {
      source: `
        export default defineNuxtConfig({
          runtimeConfig: {
            public: {
              siteName: 'My Site',
              apiKey: process.env.API_KEY,
              secretToken: process.env.SECRET,
            },
          },
        })
      `,
    } as SFCDescriptor
    checkRuntimeConfigLeak(descriptor, '/nuxt.config.ts')
    const result = reportRuntimeConfigLeak()
    expect(result.length).toBe(1)
    expect(result[0].message).toContain('apiKey')
    expect(result[0].message).toContain('secretToken')
  })

  it('should report when nuxt.config has password in runtimeConfig.public', () => {
    const descriptor = {
      source: `
        export default defineNuxtConfig({
          runtimeConfig: {
            public: {
              dbPassword: '123456',
            },
          },
        })
      `,
    } as SFCDescriptor
    checkRuntimeConfigLeak(descriptor, '/nuxt.config.ts')
    const result = reportRuntimeConfigLeak()
    expect(result.length).toBe(1)
    expect(result[0].message).toContain('dbPassword')
  })

  it('should not report when nuxt.config has no runtimeConfig', () => {
    const descriptor = {
      source: `
        export default defineNuxtConfig({
          modules: ['@nuxtjs/tailwindcss'],
        })
      `,
    } as SFCDescriptor
    checkRuntimeConfigLeak(descriptor, '/nuxt.config.ts')
    const result = reportRuntimeConfigLeak()
    expect(result.length).toBe(0)
  })

  it('should not report when nuxt.config has sensitive keys only in private runtimeConfig', () => {
    const descriptor = {
      source: `
        export default defineNuxtConfig({
          runtimeConfig: {
            apiKey: process.env.API_KEY,
            dbPassword: process.env.DB_PASS,
            public: {
              siteName: 'My Site',
            },
          },
        })
      `,
    } as SFCDescriptor
    checkRuntimeConfigLeak(descriptor, '/nuxt.config.ts')
    const result = reportRuntimeConfigLeak()
    expect(result.length).toBe(0)
  })

  it('should report when a Vue component accesses private runtimeConfig without .public', () => {
    const descriptor = {
      scriptSetup: { content: `
        const config = useRuntimeConfig()
        const apiKey = config.apiKey
      ` },
    } as SFCDescriptor
    checkRuntimeConfigLeak(descriptor, '/src/components/MyComponent.vue')
    const result = reportRuntimeConfigLeak()
    expect(result.length).toBe(1)
    expect(result[0].message).toContain('private runtimeConfig')
  })

  it('should report when a Vue component accesses useRuntimeConfig() directly without .public', () => {
    const descriptor = {
      scriptSetup: { content: `
        const token = useRuntimeConfig().secretToken
      ` },
    } as SFCDescriptor
    checkRuntimeConfigLeak(descriptor, '/src/components/Login.vue')
    const result = reportRuntimeConfigLeak()
    expect(result.length).toBe(1)
    expect(result[0].message).toContain('private runtimeConfig')
  })

  it('should not report when a Vue component accesses runtimeConfig.public correctly', () => {
    const descriptor = {
      scriptSetup: { content: `
        const config = useRuntimeConfig()
        const apiBase = config.public.apiBase
      ` },
    } as SFCDescriptor
    checkRuntimeConfigLeak(descriptor, '/src/components/MyComponent.vue')
    const result = reportRuntimeConfigLeak()
    expect(result.length).toBe(0)
  })

  it('should not report when a server-side file accesses private runtimeConfig', () => {
    const descriptor = {
      script: { content: `
        const config = useRuntimeConfig()
        const apiKey = config.apiKey
      ` },
    } as SFCDescriptor
    checkRuntimeConfigLeak(descriptor, '/server/api/auth.post.ts')
    const result = reportRuntimeConfigLeak()
    expect(result.length).toBe(0)
  })
})
