import type { SFCScriptBlock } from '@vue/compiler-sfc'
import { describe, expect, it } from 'vitest'
import { checkNoSkippedTests, reportNoSkippedTests } from './noSkippedTests'

describe('checkNoSkippedTests', () => {
  it('should not report files with no skipped tests', () => {
    const script = {
      content: `
      describe('test', () => {
        it('should pass', () => {
          expect(true).toBe(true)
        })
      })
      `,
    } as SFCScriptBlock
    const fileName = 'no-skipped-tests.test.ts'
    checkNoSkippedTests(script, fileName)
    const result = reportNoSkippedTests()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should not report non-test files', () => {
    const script = {
      content: `
      const navigateSkip = async () => {
        const state = getAuthFlow().getState<'onboarding_username'>();
        const nextState = await state!.actions.skip(null).run();
        getAuthFlow().handlers[nextState.name](nextState as any);
      };
      `,
    } as SFCScriptBlock
    const fileName = 'non-test.ts'
    checkNoSkippedTests(script, fileName)
    const result = reportNoSkippedTests()
    expect(result.length).toBe(0)
    expect(result).toStrictEqual([])
  })

  it('should report files with todo tests', () => {
    const script = {
      content: `
        describe('test', () => {
          it.todo('should pass', () => {
            expect(true).toBe(true)
          })
        })
        `,
    } as SFCScriptBlock
    const fileName = 'todo-tests.test.ts'
    checkNoSkippedTests(script, fileName)
    const result = reportNoSkippedTests()
    expect(result.length).toBe(1)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>rrd ~ no skipped tests</text_info>`,
      description: `👉 <text_warn>Skipped or todo tests were found. These should be addressed before merging.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-skipped-tests.html`,
      message: `line #2 <bg_warn>skip test found: ".todo"</bg_warn> 🚨`,
    }])
  })

  it('should report files with skipped tests', () => {
    const script = {
      content: `
        describe('test', () => {
          it.skip('should pass', () => {
            expect(true).toBe(true)
          })

          it.skipIf('should pass', () => {
            expect(true).toBe(true)
          })
        })
        `,
    } as SFCScriptBlock
    const fileName = 'skipped-tests.test.ts'
    checkNoSkippedTests(script, fileName)
    const result = reportNoSkippedTests()
    expect(result.length).toBe(2)
    expect(result).toStrictEqual([{
      file: fileName,
      rule: `<text_info>rrd ~ no skipped tests</text_info>`,
      description: `👉 <text_warn>Skipped or todo tests were found. These should be addressed before merging.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-skipped-tests.html`,
      message: `line #2 <bg_warn>skip test found: ".skip"</bg_warn> 🚨`,
    }, {
      file: fileName,
      rule: `<text_info>rrd ~ no skipped tests</text_info>`,
      description: `👉 <text_warn>Skipped or todo tests were found. These should be addressed before merging.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/no-skipped-tests.html`,
      message: `line #6 <bg_warn>skip test found: ".skipIf"</bg_warn> 🚨`,
    }])
  })
})
