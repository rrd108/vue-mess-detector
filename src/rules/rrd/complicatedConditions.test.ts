import { beforeEach, describe, expect, it } from 'vitest'
import type { SFCDescriptor } from '@vue/compiler-sfc'
import { checkComplicatedConditions, reportComplicatedConditions, resetComplicatedConditions } from './complicatedConditions'

describe('checkComplicatedConditions', () => {
  beforeEach(() => {
    resetComplicatedConditions()
  })

  it('should not report files with simple conditions', () => {
    const descriptor = {
      script: {
        content: `
        if (isActive && !isDisabled) {
          doSomething();
        }
        const result = isValid ? getValue() : getDefaultValue();
      `,
      },
      template: {
        content: `
        <div v-if="isActive && !isDisabled">
          {{ message }}
        </div>
      `,
      },
    } as SFCDescriptor
    const fileName = 'simpleConditions.vue'
    checkComplicatedConditions(descriptor, fileName)
    expect(reportComplicatedConditions().length).toBe(0)
    expect(reportComplicatedConditions()).toStrictEqual([])
  })

  it('should report files with complicated conditions (warning)', () => {
    const descriptor = {
      script: {
        content: `
        if (isActive && !isDisabled && hasPermission && (isAdmin || isModerator) && checkCondition(x, y)) {
          doSomething();
        }
      `,
      },
    } as SFCDescriptor
    const fileName = 'complicatedConditions-warning.vue'
    checkComplicatedConditions(descriptor, fileName)
    expect(reportComplicatedConditions().length).toBe(1)
    expect(reportComplicatedConditions()[0].message).toContain('script has a complicated condition with 6 blocks')
  })

  it('should report files with very complicated conditions (error)', () => {
    const descriptor = {
      template: {
        content: `
        <div v-if="isActive && !isDisabled && hasPermission && (isAdmin || isModerator) && checkCondition(x, y) && a > b && c < d && e === f && g !== h && i >= j && k <= l">
          {{ message }}
        </div>
      `,
      },
    } as SFCDescriptor
    const fileName = 'complicatedConditions-error.vue'
    checkComplicatedConditions(descriptor, fileName)
    expect(reportComplicatedConditions().length).toBe(1)
    expect(reportComplicatedConditions()[0].message).toContain('template has a complicated condition with 12 blocks')
  })

  it('should report complicated ternary conditions', () => {
    const descriptor = {
      script: {
        content: `
        const result = isActive && !isDisabled && hasPermission && (isAdmin || isModerator) && checkCondition(x, y) ? getValue() : getDefaultValue();
      `,
      },
    } as SFCDescriptor
    const fileName = 'complicatedTernary.vue'
    checkComplicatedConditions(descriptor, fileName)
    expect(reportComplicatedConditions().length).toBe(1)
    expect(reportComplicatedConditions()[0].message).toContain('script has a complicated condition with 6 blocks')
  })

  it('should report multiple complicated conditions', () => {
    const descriptor = {
      script: {
        content: `
        const result = rrd > b && c < d && e === f || g !== h && i >= j && k <= l
      `,
      },
      template: {
        content: `
        <div v-if="a && b && c && d && e && f && g && h && i && j && k">
          {{ message }}
        </div>
      `,
      },
    } as SFCDescriptor
    const fileName = 'multipleComplicatedConditions.vue'
    checkComplicatedConditions(descriptor, fileName)
    expect(reportComplicatedConditions().length).toBe(2)
    expect(reportComplicatedConditions()).toStrictEqual([
      {
        file: fileName,
        rule: `<text_info>rrd ~ complicated conditions</text_info>`,
        description: `👉 <text_warn>Simplify complex conditions by breaking them down into smaller, more manageable parts.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/complicated-conditions.html`,
        message: `line #2 <bg_warn>script has a complicated condition with 6 blocks</bg_warn> 🚨`,
      },
      {
        file: fileName,
        rule: `<text_info>rrd ~ complicated conditions</text_info>`,
        description: `👉 <text_warn>Simplify complex conditions by breaking them down into smaller, more manageable parts.</text_warn> See: https://vue-mess-detector.webmania.cc/rules/rrd/complicated-conditions.html`,
        message: `line #2 <bg_err>template has a complicated condition with 11 blocks</bg_err> 🚨`,
      },
    ])
  })
})
