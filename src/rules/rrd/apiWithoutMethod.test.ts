import type { SFCDescriptor } from '@vue/compiler-sfc'
import { beforeEach, describe, expect, it } from 'vitest'
import { checkApiWithoutMethod, reportApiWithoutMethod, resetApiWithoutMethod } from './apiWithoutMethod'

describe('checkApiWithoutMethod', () => {
  beforeEach(() => {
    resetApiWithoutMethod()
  })

  it('should not report files with HTTP method in filename', () => {
    const descriptor = {
      filename: '/src/server/api/users.post.ts',
      source: '',
    } as SFCDescriptor
    checkApiWithoutMethod(descriptor, descriptor.filename)
    expect(reportApiWithoutMethod().length).toBe(0)
    expect(reportApiWithoutMethod()).toStrictEqual([])
  })

  it('should not report files with method check in content', () => {
    const descriptor = {
      filename: '/src/server/api/users.ts',
      source: `
        export default defineEventHandler((event) => {
          if (event.node.req.method !== 'GET') {
            throw createError({
              statusCode: 405,
              statusMessage: 'Method Not Allowed',
            })
          }
        })
      `,
    } as SFCDescriptor
    checkApiWithoutMethod(descriptor, descriptor.filename)
    expect(reportApiWithoutMethod().length).toBe(0)
    expect(reportApiWithoutMethod()).toStrictEqual([])
  })

  it('should report files without HTTP method in filename or content', () => {
    const descriptor = {
      filename: '/src/server/api/users.ts',
      source: `
        export default defineEventHandler(async event => {
            return [
                { id:1, name: 'rrd', email: 'rrd@webmania.cc' },
            ]
        })`,
    } as SFCDescriptor
    checkApiWithoutMethod(descriptor, descriptor.filename)
    expect(reportApiWithoutMethod().length).toBe(1)
    expect(reportApiWithoutMethod()).toStrictEqual([{
      file: '/src/server/api/users.ts',
      rule: `<text_info>rrd ~ API endpoint without HTTP method</text_info>`,
      description: `👉 <text_warn>Specify the HTTP method in the filename (e.g., users.post.ts) or include a method check in the file content.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/api-without-method.html`,
      message: `API route <bg_warn>without HTTP method</bg_warn> specified in filename or content 🚨`,
    }])
  })
})
