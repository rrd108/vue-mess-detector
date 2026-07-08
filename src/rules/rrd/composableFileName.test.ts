import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { describe, expect, it } from 'vitest'
import { checkComposableFileName, reportComposableFileName } from './composableFileName'

describe('composableFileName', () => {
  it('should not report when composable file name matches exported function name', () => {
    const script = {
      content: `export function useCounter() { return { count: 0 } }`,
    } as SFCScriptBlock
    const filename = 'useCounter.ts'
    checkComposableFileName(script, filename)
    const result = reportComposableFileName()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should not report when composable file name matches exported const name', () => {
    const script = {
      content: `export const useCounter = () => { return { count: 0 } }`,
    } as SFCScriptBlock
    const filename = 'useCounter.ts'
    checkComposableFileName(script, filename)
    const result = reportComposableFileName()
    expect(result.length).toBe(0)
  })

  it('should not report when composable file name matches named export', () => {
    const script = {
      content: `function useCounter() { return { count: 0 } }\nexport { useCounter }`,
    } as SFCScriptBlock
    const filename = 'useCounter.ts'
    checkComposableFileName(script, filename)
    const result = reportComposableFileName()
    expect(result.length).toBe(0)
  })

  it('should report when composable file name does not match exported function name', () => {
    const script = {
      content: `export function useCount() { return { count: 0 } }`,
    } as SFCScriptBlock
    const filename = 'useCounter.ts'
    checkComposableFileName(script, filename)
    const result = reportComposableFileName()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: filename,
      rule: `<text_info>rrd ~ composable file name</text_info>`,
      description: `👉 <text_warn>Composable file name should match the exported function name.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/composable-file-name.html`,
      message: `file: <bg_warn>(useCounter.ts)</bg_warn> exports <bg_warn>(useCount)</bg_warn> 🚨`,
    }])
  })

  it('should not check files that do not start with "use"', () => {
    const script = {
      content: `export function counter() { return { count: 0 } }`,
    } as SFCScriptBlock
    const filename = 'counter.ts'
    checkComposableFileName(script, filename)
    const result = reportComposableFileName()
    expect(result.length).toBe(0)
  })

  it('should not check .vue files', () => {
    const script = {
      content: `export function useCounter() { return { count: 0 } }`,
    } as SFCScriptBlock
    const filename = 'useCounter.vue'
    checkComposableFileName(script, filename)
    const result = reportComposableFileName()
    expect(result.length).toBe(0)
  })

  it('should not report when file has no exported use* function', () => {
    const script = {
      content: `export function helper() { return 42 }`,
    } as SFCScriptBlock
    const filename = 'useHelper.ts'
    checkComposableFileName(script, filename)
    const result = reportComposableFileName()
    expect(result.length).toBe(0)
  })
})
