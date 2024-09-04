import { beforeEach, describe, expect, it } from 'vitest'
import type { SFCDescriptor } from '@vue/compiler-sfc'
import { BG_ERR, BG_RESET, BG_WARN, TEXT_INFO, TEXT_RESET, TEXT_WARN } from '../asceeCodes'
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
        rule: `${TEXT_INFO}rrd ~ complicated conditions${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Simplify complex conditions by breaking them down into smaller, more manageable parts.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/complicated-conditions.html`,
        message: `line #2 ${BG_WARN}script has a complicated condition with 6 blocks${BG_RESET} 🚨`,
      },
      {
        file: fileName,
        rule: `${TEXT_INFO}rrd ~ complicated conditions${TEXT_RESET}`,
        description: `👉 ${TEXT_WARN}Simplify complex conditions by breaking them down into smaller, more manageable parts.${TEXT_RESET} See: https://vue-mess-detector.webmania.cc/rules/rrd/complicated-conditions.html`,
        message: `line #2 ${BG_ERR}template has a complicated condition with 11 blocks${BG_RESET} 🚨`,
      },
    ])
  })
})
